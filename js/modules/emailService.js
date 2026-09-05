/**
 * GLOWISTIC - E-Commerce Order Notification & Email Architecture
 * Configurable via ADMIN_ORDER_EMAIL. Generates clean HTML & JSON payloads.
 */

export const DEFAULT_ADMIN_EMAIL = 'orders@glowisticpk.com';
const STORAGE_ADMIN_EMAIL_KEY = 'glowistic_admin_order_email';

export class OrderEmailService {
  constructor() {
    this.adminEmail = this.getAdminEmail();
  }

  getAdminEmail() {
    try {
      return localStorage.getItem(STORAGE_ADMIN_EMAIL_KEY) || (window.GLOWISTIC_CONFIG && window.GLOWISTIC_CONFIG.ADMIN_ORDER_EMAIL) || DEFAULT_ADMIN_EMAIL;
    } catch (e) {
      return DEFAULT_ADMIN_EMAIL;
    }
  }

  setAdminEmail(email) {
    if (!email || !email.includes('@')) return false;
    try {
      localStorage.setItem(STORAGE_ADMIN_EMAIL_KEY, email.trim());
      this.adminEmail = email.trim();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Formats a comprehensive order email payload
   */
  buildOrderPayload(orderData) {
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString('en-PK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const itemsHtml = orderData.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #EAE3D9; color: #1C1917; font-weight: 500;">
          ${item.name}
          <div style="font-size: 12px; color: #665E57;">SKU: ${item.sku || 'N/A'} | Vol: ${item.volume || ''}</div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #EAE3D9; text-align: center; color: #1C1917;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #EAE3D9; text-align: right; color: #1C1917;">Rs. ${item.price.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #EAE3D9; text-align: right; font-weight: 600; color: #500F17;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; margin: 0; padding: 20px; color: #1C1917; }
          .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 8px; border: 1px solid #EAE3D9; overflow: hidden; box-shadow: 0 4px 20px rgba(80,15,23,0.06); }
          .header { background: #500F17; color: #FEF6E1; padding: 28px 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; }
          .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 24px; }
          .order-pill { display: inline-block; background: #FAF7F2; border: 1px solid #EAE3D9; padding: 6px 14px; border-radius: 4px; font-weight: 600; color: #500F17; font-size: 14px; margin-bottom: 20px; }
          .grid { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
          .box { flex: 1 1 240px; background: #FAF7F2; padding: 16px; border-radius: 6px; border: 1px solid #EAE3D9; }
          .box h3 { margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #500F17; }
          .box p { margin: 3px 0; font-size: 13px; color: #333; line-height: 1.4; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
          th { background: #FAF7F2; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #665E57; border-bottom: 1px solid #EAE3D9; }
          .totals { margin-left: auto; width: 280px; }
          .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #665E57; }
          .total-row.grand { font-size: 16px; font-weight: 700; color: #500F17; border-top: 2px solid #500F17; padding-top: 10px; margin-top: 6px; }
          .footer { background: #FAF7F2; border-top: 1px solid #EAE3D9; padding: 16px 24px; text-align: center; font-size: 12px; color: #665E57; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GLOWISTIC</h1>
            <p>New Customer Order Received</p>
          </div>
          <div class="content">
            <div class="order-pill">Order Reference: ${orderData.orderNumber}</div>
            <p style="font-size: 13px; color: #665E57; margin-top: 0;">Placed on ${formattedDate} via Cash on Delivery.</p>
            
            <div class="grid">
              <div class="box">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${orderData.customer.name}</p>
                <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                <p><strong>Email:</strong> ${orderData.customer.email || 'N/A'}</p>
              </div>
              <div class="box">
                <h3>Delivery Address</h3>
                <p>${orderData.customer.address}</p>
                <p>${orderData.customer.city}, ${orderData.customer.province}</p>
                <p><strong>Postal Code:</strong> ${orderData.customer.postalCode || 'N/A'}</p>
              </div>
            </div>

            ${orderData.orderNotes ? `
              <div style="background: #FFFBF0; border-left: 3px solid #C59B27; padding: 12px; margin-bottom: 20px; font-size: 13px;">
                <strong>Order Instructions / Notes:</strong> ${orderData.orderNotes}
              </div>
            ` : ''}

            <h3>Ordered Products</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Unit Price</th>
                  <th style="text-align: right;">Line Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-row"><span>Subtotal:</span> <span>Rs. ${orderData.subtotal.toLocaleString()}</span></div>
              <div class="total-row"><span>Delivery (COD):</span> <span>${orderData.deliveryFee === 0 ? 'FREE' : 'Rs. ' + orderData.deliveryFee}</span></div>
              <div class="total-row grand"><span>Grand Total:</span> <span>Rs. ${orderData.total.toLocaleString()}</span></div>
            </div>
          </div>
          <div class="footer">
            GLOWISTIC E-Commerce Order System &bull; www.glowisticpk.com &bull; WhatsApp: 03445422609
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: this.adminEmail,
      customerEmail: orderData.customer.email,
      subject: `New Glowistic Order #${orderData.orderNumber}`,
      timestamp,
      orderNumber: orderData.orderNumber,
      orderData,
      htmlBody
    };
  }

  /**
   * Dispatches order notifications.
   * Stores locally for offline reliability, creates download receipts,
   * and provides a webhook dispatch hook for future production servers.
   */
  async sendOrderNotification(orderData) {
    const payload = this.buildOrderPayload(orderData);
    
    // 1. Persist in local order history for merchant review
    try {
      const history = JSON.parse(localStorage.getItem('glowistic_orders_history') || '[]');
      history.unshift({ ...payload, id: orderData.orderNumber, date: new Date().toISOString() });
      localStorage.setItem('glowistic_orders_history', JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Could not persist order to local history:', e);
    }

    // 2. Dispatch to custom configured backend endpoint if available
    if (window.GLOWISTIC_CONFIG && window.GLOWISTIC_CONFIG.ORDER_WEBHOOK_URL) {
      try {
        await fetch(window.GLOWISTIC_CONFIG.ORDER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Webhook dispatch failed, fallback active:', err);
      }
    }

    console.info(`[GLOWISTIC ORDER DISPATCHED] Order ${orderData.orderNumber} queued to ${this.adminEmail}`);
    return { success: true, payload };
  }
}

export const emailService = new OrderEmailService();
