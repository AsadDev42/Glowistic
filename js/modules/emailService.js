/**
 * GLOWISTIC - E-Commerce Order Notification & Email Architecture
 * Sends COD order details to the Vercel serverless function (/api/send-order-email),
 * which renders the branded HTML email and delivers it to the store owner.
 */

export const ORDER_EMAIL_ENDPOINT = '/api/send-order-email';
const REQUEST_TIMEOUT_MS = 10000;

export class OrderEmailService {
  getEndpoint() {
    if (window.GLOWISTIC_CONFIG && window.GLOWISTIC_CONFIG.ORDER_EMAIL_ENDPOINT) {
      return window.GLOWISTIC_CONFIG.ORDER_EMAIL_ENDPOINT;
    }
    // If running on GitHub Pages or local testing, route to the live Vercel API
    if (typeof window !== 'undefined' && window.location && (window.location.hostname.includes('github.io') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return 'https://glowisticpk.com/api/send-order-email';
    }
    return ORDER_EMAIL_ENDPOINT;
  }

  /**
   * Keeps only the fields the email needs (no product descriptions, galleries, etc.)
   */
  buildOrderPayload(orderData) {
    return {
      orderNumber: orderData.orderNumber,
      createdAt: orderData.createdAt || new Date().toISOString(),
      customer: orderData.customer,
      orderNotes: orderData.orderNotes || '',
      paymentMethod: 'Cash on Delivery',
      items: orderData.items.map(item => ({
        name: item.name,
        subtitle: item.subtitle,
        sku: item.sku,
        volume: item.volume,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      total: orderData.total
    };
  }

  /**
   * Dispatches the order email. Never throws, so a mail failure cannot block checkout.
   */
  async sendOrderNotification(orderData) {
    const payload = this.buildOrderPayload(orderData);

    // Persist in local order history as an offline fallback
    try {
      const history = JSON.parse(localStorage.getItem('glowistic_orders_history') || '[]');
      history.unshift({ ...payload, date: new Date().toISOString() });
      localStorage.setItem('glowistic_orders_history', JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Could not persist order to local history:', e);
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS) : null;

    try {
      const res = await fetch(this.getEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: controller ? controller.signal : undefined
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) {
        console.warn('[GLOWISTIC ORDER EMAIL] Server could not send email:', result.error || res.status);
        return { success: false, payload };
      }
      console.info(`[GLOWISTIC ORDER EMAIL] Order ${payload.orderNumber} emailed to store owner`);
      return { success: true, payload };
    } catch (err) {
      console.warn('[GLOWISTIC ORDER EMAIL] Dispatch failed:', err);
      return { success: false, payload };
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
}

export const emailService = new OrderEmailService();
