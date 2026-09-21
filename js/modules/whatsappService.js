/**
 * GLOWISTIC - WhatsApp Cloud API (Meta Business) Order Notification Service
 * Dispatches automated WhatsApp alerts to the store owner (+923136895852)
 * upon successful customer checkout.
 */

import { GLOWISTIC_CONFIG } from '../config.js';

export const DEFAULT_ADMIN_WHATSAPP = '923136895852';

/**
 * Normalizes phone numbers to standard E.164 digits without "+" or spaces,
 * as required by Meta WhatsApp Cloud API (e.g. 923136895852).
 */
export function cleanWhatsAppNumber(phone) {
  if (!phone) return '';
  let digits = String(phone).replace(/[^0-9]/g, '');

  if (digits.startsWith('00')) {
    digits = digits.substring(2);
  }

  if (digits.startsWith('0') && digits.length === 11) {
    digits = '92' + digits.substring(1);
  }

  return digits;
}

/**
 * Formats a clean date string in Pakistan Standard Time (PKT).
 */
export function formatOrderDateTimePKT(dateString) {
  try {
    const d = dateString ? new Date(dateString) : new Date();
    if (isNaN(d.getTime())) return new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    return new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(d);
  } catch {
    return new Date().toLocaleString('en-PK');
  }
}

/**
 * Builds a structured, high-conversion WhatsApp notification text.
 */
export function buildOrderWhatsAppMessage(orderData) {
  const dateStr = formatOrderDateTimePKT(orderData.createdAt);
  const cust = orderData.customer || orderData;
  const cleanCustomerPhone = cleanWhatsAppNumber(cust.phone);
  const customerWaLink = cleanCustomerPhone ? `https://wa.me/${cleanCustomerPhone}` : 'N/A';

  const items = orderData.items || [];
  const itemsText = items.map((item, idx) => {
    const unitPrice = typeof item.price === 'number'
      ? item.price
      : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
    const itemTotal = item.lineTotal ?? (unitPrice * item.quantity);
    const subtitle = item.subtitle ? `\n   _${item.subtitle}_` : '';
    return `${idx + 1}. *${item.name}*${subtitle}\n   Qty: ${item.quantity} × Rs. ${unitPrice.toLocaleString()} = *Rs. ${itemTotal.toLocaleString()}*`;
  }).join('\n\n');

  const deliveryStr = orderData.deliveryFee === 0 || orderData.deliveryCharges === 0
    ? 'FREE'
    : `Rs. ${(orderData.deliveryFee || orderData.deliveryCharges || 0).toLocaleString()}`;

  const addressDetails = [
    cust.address,
    cust.city,
    cust.province,
    cust.postalCode && `Postal: ${cust.postalCode}`
  ].filter(Boolean).join(', ');

  const notesSection = orderData.orderNotes
    ? `\n\n📝 *CUSTOMER NOTE:*\n${orderData.orderNotes}`
    : '';

  return `🛍️ *NEW ORDER ALERT - Glowistic*
━━━━━━━━━━━━━━━━━━━━
🆔 *Order ID:* ${orderData.orderNumber}
📅 *Date:* ${dateStr} (PKT)
⚡ *Status:* Confirmed (Cash on Delivery)

👤 *CUSTOMER DETAILS:*
• *Name:* ${cust.name}
• *Phone:* ${cust.phone}
• *Direct WhatsApp:* ${customerWaLink}
• *Email:* ${cust.email || 'N/A'}
• *Address:* ${addressDetails}${notesSection}

📦 *ORDERED ITEMS (${items.length}):*
${itemsText}

💰 *PAYMENT SUMMARY:*
• *Subtotal:* Rs. ${(orderData.subtotal || 0).toLocaleString()}
• *Delivery:* ${deliveryStr}
• *Total Amount:* *Rs. ${(orderData.total || orderData.totalAmount || 0).toLocaleString()}*
• *Payment Method:* *Cash on Delivery (COD)*
━━━━━━━━━━━━━━━━━━━━
_Glowistic E-Commerce Automated Alert System_`;
}

export class WhatsAppNotificationService {
  constructor() {
    this.config = this.resolveConfig();
  }

  resolveConfig() {
    const winConf = (typeof window !== 'undefined' && window.GLOWISTIC_CONFIG) || {};
    return {
      phoneNumberId: winConf.WHATSAPP_PHONE_NUMBER_ID || GLOWISTIC_CONFIG.WHATSAPP_PHONE_NUMBER_ID || '',
      accessToken: winConf.WHATSAPP_ACCESS_TOKEN || GLOWISTIC_CONFIG.WHATSAPP_ACCESS_TOKEN || '',
      targetNumber: cleanWhatsAppNumber(
        winConf.WHATSAPP_ORDER_ALERT_NUMBER || GLOWISTIC_CONFIG.WHATSAPP_ORDER_ALERT_NUMBER || DEFAULT_ADMIN_WHATSAPP
      ),
      apiVersion: winConf.WHATSAPP_API_VERSION || GLOWISTIC_CONFIG.WHATSAPP_API_VERSION || 'v20.0',
      webhookUrl: winConf.WHATSAPP_WEBHOOK_URL || GLOWISTIC_CONFIG.WHATSAPP_WEBHOOK_URL || '',
    };
  }

  /**
   * Dispatches automated order notification to the business owner (+923136895852).
   * Guaranteed zero-throw fault isolation to protect the customer checkout experience.
   */
  async sendOrderNotification(orderData) {
    const config = this.resolveConfig();
    const messageBody = buildOrderWhatsAppMessage(orderData);

    // Save copy to local storage for administrative inspection
    try {
      if (typeof localStorage !== 'undefined') {
        const history = JSON.parse(localStorage.getItem('glowistic_whatsapp_alerts') || '[]');
        history.unshift({
          orderNumber: orderData.orderNumber,
          to: config.targetNumber,
          sentAt: new Date().toISOString(),
          messageBody
        });
        localStorage.setItem('glowistic_whatsapp_alerts', JSON.stringify(history.slice(0, 30)));
      }
    } catch (e) {
      /* ignore storage error */
    }

    // 1. If Webhook / Serverless Proxy is configured (e.g. Cloudflare Worker)
    if (config.webhookUrl) {
      try {
        console.log(`[WhatsApp Service] Relaying order ${orderData.orderNumber} to proxy webhook...`);
        const res = await fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: config.targetNumber,
            message: messageBody,
            order: orderData
          }),
        });
        if (res.ok) {
          console.log(`[WhatsApp Service] Successfully dispatched order ${orderData.orderNumber} via webhook.`);
          return { success: true, provider: 'webhook-proxy' };
        }
      } catch (proxyErr) {
        console.warn('[WhatsApp Service] Webhook proxy error:', proxyErr);
      }
    }

    // 2. Direct Meta WhatsApp Cloud API call
    if (!config.phoneNumberId || !config.accessToken) {
      console.warn(
        `[WhatsApp Service] Notification skipped for ${orderData.orderNumber}: ` +
        'WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN is not configured.'
      );
      return {
        success: false,
        skipped: true,
        error: 'Missing Phone Number ID or Access Token in GLOWISTIC_CONFIG'
      };
    }

    const endpoint = `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`;
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: config.targetNumber,
      type: 'text',
      text: {
        preview_url: false,
        body: messageBody,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[WhatsApp Cloud API Error] HTTP ${response.status}:`, errorText);
        return { success: false, error: `HTTP ${response.status}: ${errorText}` };
      }

      const resData = await response.json();
      console.log(`[WhatsApp Cloud API Success] Order ${orderData.orderNumber} alert sent to +${config.targetNumber}:`, resData);
      return { success: true, messageId: resData?.messages?.[0]?.id };
    } catch (err) {
      console.error('[WhatsApp Cloud API Exception]:', err?.message || err);
      return { success: false, error: err?.message || 'Network exception' };
    }
  }
}

export const whatsappService = new WhatsAppNotificationService();
