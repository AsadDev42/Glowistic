/**
 * GLOWISTIC - COD Order Email Notification (Vercel Serverless Function)
 * POST /api/send-order-email
 *
 * Sends a fully designed HTML order email to the store owner via Resend.
 * Required Vercel env var:  RESEND_API_KEY
 * Optional env vars:        ORDER_EMAIL_TO   (default: Glowisticpk@gmail.com)
 *                           ORDER_EMAIL_FROM (default: Glowistic Orders <onboarding@resend.dev>)
 */

const DEFAULT_TO = 'Glowisticpk@gmail.com';
const DEFAULT_FROM = 'Glowistic Orders <onboarding@resend.dev>';
const SITE_URL = 'https://glowisticpk.com';
const MAX_ITEMS = 50;

const esc = (value) => String(value == null ? '' : value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const str = (value, max = 300) => String(value == null ? '' : value).trim().slice(0, max);
const num = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const rs = (value) => `Rs. ${num(value).toLocaleString('en-PK')}`;

function sanitizeOrder(body) {
  const c = body.customer || body;
  const customer = {
    name: str(c.name, 120),
    phone: str(c.phone, 30),
    email: str(c.email, 160),
    address: str(c.address, 400),
    city: str(c.city, 80),
    province: str(c.province, 80),
    postalCode: str(c.postalCode, 20)
  };

  const items = (Array.isArray(body.items) ? body.items : []).slice(0, MAX_ITEMS).map((item) => {
    const price = num(item.price);
    const quantity = Math.max(1, Math.min(999, Math.floor(num(item.quantity)) || 1));
    return {
      name: str(item.name, 160),
      subtitle: str(item.subtitle, 160),
      sku: str(item.sku, 40),
      volume: str(item.volume, 40),
      image: str(item.image, 300),
      price,
      quantity,
      lineTotal: price * quantity
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryFee = num(body.deliveryFee);

  return {
    orderNumber: str(body.orderNumber, 40).replace(/[^A-Za-z0-9-]/g, ''),
    createdAt: str(body.createdAt, 40),
    orderNotes: str(body.orderNotes, 1000),
    paymentMethod: 'Cash on Delivery',
    customer,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };
}

function validateOrder(order) {
  if (!order.orderNumber) return 'Missing order number';
  if (order.customer.name.length < 2) return 'Missing customer name';
  if (!/^(03\d{9}|\+923\d{9}|923\d{9})$/.test(order.customer.phone.replace(/[\s-]/g, ''))) return 'Invalid phone number';
  if (order.customer.address.length < 5) return 'Missing delivery address';
  if (!order.customer.city) return 'Missing city';
  if (order.items.length === 0) return 'Order has no items';
  return null;
}

function toWhatsAppNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('92')) return digits;
  if (digits.startsWith('0')) return `92${digits.slice(1)}`;
  return digits;
}

function imageUrl(src) {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}/${src.replace(/^\/+/, '')}`;
}

function buildEmailHtml(order) {
  const { customer } = order;
  const placedAt = new Date(order.createdAt || Date.now());
  const dateText = (isNaN(placedAt) ? new Date() : placedAt).toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const waNumber = toWhatsAppNumber(customer.phone);
  const waText = encodeURIComponent(`Assalam-o-Alaikum ${customer.name}! Glowistic here. Confirming your order #${order.orderNumber} of ${rs(order.total)} (Cash on Delivery).`);
  const mapsQuery = encodeURIComponent(`${customer.address}, ${customer.city}, ${customer.province}, Pakistan`);

  const itemRows = order.items.map((item) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #EFE7DC;vertical-align:top;width:64px;">
        ${item.image ? `<img src="${esc(imageUrl(item.image))}" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border-radius:8px;border:1px solid #EFE7DC;object-fit:cover;background:#FAF7F2;">` : ''}
      </td>
      <td style="padding:14px 12px;border-bottom:1px solid #EFE7DC;vertical-align:top;">
        <div style="font-size:14px;font-weight:600;color:#1C1917;line-height:1.35;">${esc(item.name)}</div>
        ${item.subtitle ? `<div style="font-size:12px;color:#8A7F75;margin-top:2px;">${esc(item.subtitle)}</div>` : ''}
        <div style="font-size:11px;color:#A0968C;margin-top:4px;letter-spacing:.3px;">
          ${item.sku ? `SKU ${esc(item.sku)}` : ''}${item.sku && item.volume ? ' &middot; ' : ''}${esc(item.volume)}
        </div>
        <div style="font-size:12px;color:#665E57;margin-top:6px;">${item.quantity} &times; ${rs(item.price)}</div>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #EFE7DC;vertical-align:top;text-align:right;white-space:nowrap;font-size:14px;font-weight:700;color:#500F17;">
        ${rs(item.lineTotal)}
      </td>
    </tr>`).join('');

  const detailRow = (label, value) => `
    <tr>
      <td style="padding:6px 0;font-size:12px;color:#8A7F75;text-transform:uppercase;letter-spacing:.8px;width:120px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:14px;color:#1C1917;vertical-align:top;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>New COD Order #${esc(order.orderNumber)}</title>
</head>
<body style="margin:0;padding:0;background:#F4EFE8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1C1917;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">New COD order ${esc(order.orderNumber)} from ${esc(customer.name)}, ${esc(customer.city)} &mdash; collect ${rs(order.total)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4EFE8;">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#FFFFFF;border-radius:14px;overflow:hidden;border:1px solid #EAE3D9;">

        <!-- Header -->
        <tr>
          <td style="background:#500F17;padding:30px 28px 26px;text-align:center;">
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;letter-spacing:6px;color:#FEF6E1;font-weight:700;">GLOWISTIC</div>
            <div style="font-size:11px;letter-spacing:3px;color:#E8C77A;text-transform:uppercase;margin-top:6px;">New Order Received</div>
          </td>
        </tr>

        <!-- Summary band -->
        <tr>
          <td style="background:#FBF3E4;padding:20px 28px;border-bottom:1px solid #EAE3D9;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:middle;">
                  <div style="font-size:11px;color:#8A7F75;text-transform:uppercase;letter-spacing:1px;">Order</div>
                  <div style="font-size:20px;font-weight:800;color:#500F17;font-family:Consolas,Menlo,monospace;">#${esc(order.orderNumber)}</div>
                  <div style="font-size:12px;color:#665E57;margin-top:2px;">${esc(dateText)} &middot; ${itemCount} item${itemCount === 1 ? '' : 's'}</div>
                </td>
                <td style="vertical-align:middle;text-align:right;">
                  <div style="display:inline-block;background:#1F7A4D;color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 10px;border-radius:999px;">Cash on Delivery</div>
                  <div style="font-size:11px;color:#8A7F75;margin-top:8px;text-transform:uppercase;letter-spacing:1px;">Amount to collect</div>
                  <div style="font-size:22px;font-weight:800;color:#1C1917;">${rs(order.total)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Customer -->
        <tr>
          <td style="padding:26px 28px 8px;">
            <div style="font-size:12px;font-weight:700;color:#500F17;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">Customer &amp; Delivery</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${detailRow('Name', `<strong>${esc(customer.name)}</strong>`)}
              ${detailRow('Phone', `<a href="tel:${esc(customer.phone.replace(/[\s-]/g, ''))}" style="color:#500F17;text-decoration:none;font-weight:600;">${esc(customer.phone)}</a>`)}
              ${detailRow('Email', customer.email ? `<a href="mailto:${esc(customer.email)}" style="color:#500F17;text-decoration:none;">${esc(customer.email)}</a>` : '<span style="color:#A0968C;">Not provided</span>')}
              ${detailRow('Address', esc(customer.address))}
              ${detailRow('City', `${esc(customer.city)}${customer.province ? `, ${esc(customer.province)}` : ''}`)}
              ${detailRow('Postal Code', esc(customer.postalCode) || '<span style="color:#A0968C;">N/A</span>')}
            </table>
          </td>
        </tr>

        ${order.orderNotes ? `
        <tr>
          <td style="padding:10px 28px 0;">
            <div style="background:#FFFBF0;border-left:4px solid #C59B27;border-radius:6px;padding:12px 14px;font-size:13px;color:#4A3F35;line-height:1.5;">
              <strong style="color:#8A6A12;">Customer note:</strong> ${esc(order.orderNotes)}
            </div>
          </td>
        </tr>` : ''}

        <!-- Quick actions -->
        <tr>
          <td style="padding:18px 28px 6px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 8px 8px 0;"><a href="https://wa.me/${esc(waNumber)}?text=${waText}" style="display:inline-block;background:#25D366;color:#FFFFFF;font-size:13px;font-weight:700;text-decoration:none;padding:10px 16px;border-radius:8px;">WhatsApp Customer</a></td>
                <td style="padding:0 8px 8px 0;"><a href="tel:${esc(customer.phone.replace(/[\s-]/g, ''))}" style="display:inline-block;background:#500F17;color:#FEF6E1;font-size:13px;font-weight:700;text-decoration:none;padding:10px 16px;border-radius:8px;">Call</a></td>
                <td style="padding:0 0 8px 0;"><a href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" style="display:inline-block;background:#FFFFFF;color:#500F17;border:1px solid #D9CBB8;font-size:13px;font-weight:700;text-decoration:none;padding:9px 16px;border-radius:8px;">Open Map</a></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Items -->
        <tr>
          <td style="padding:18px 28px 0;">
            <div style="font-size:12px;font-weight:700;color:#500F17;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Ordered Products</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${itemRows}
            </table>
          </td>
        </tr>

        <!-- Totals -->
        <tr>
          <td style="padding:14px 28px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:5px 0;font-size:14px;color:#665E57;">Subtotal</td>
                <td style="padding:5px 0;font-size:14px;color:#1C1917;text-align:right;">${rs(order.subtotal)}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-size:14px;color:#665E57;">Delivery</td>
                <td style="padding:5px 0;font-size:14px;text-align:right;${order.deliveryFee === 0 ? 'color:#1F7A4D;font-weight:700;' : 'color:#1C1917;'}">${order.deliveryFee === 0 ? 'FREE' : rs(order.deliveryFee)}</td>
              </tr>
              <tr>
                <td style="padding:14px 0 0;border-top:2px solid #500F17;font-size:16px;font-weight:800;color:#500F17;">Grand Total (COD)</td>
                <td style="padding:14px 0 0;border-top:2px solid #500F17;font-size:20px;font-weight:800;color:#500F17;text-align:right;">${rs(order.total)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#FAF7F2;border-top:1px solid #EAE3D9;padding:18px 28px;text-align:center;font-size:12px;color:#8A7F75;line-height:1.6;">
            Automatic order alert from <a href="${SITE_URL}" style="color:#500F17;text-decoration:none;font-weight:600;">glowisticpk.com</a><br>
            Reply to this email to contact the customer directly.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function buildEmailText(order) {
  const { customer } = order;
  const lines = [
    `NEW COD ORDER #${order.orderNumber}`,
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email || 'N/A'}`,
    `Address: ${customer.address}, ${customer.city}, ${customer.province} ${customer.postalCode}`,
    order.orderNotes ? `Notes: ${order.orderNotes}` : '',
    '',
    'Items:',
    ...order.items.map((i) => `- ${i.name} x${i.quantity} = ${rs(i.lineTotal)}`),
    '',
    `Subtotal: ${rs(order.subtotal)}`,
    `Delivery: ${order.deliveryFee === 0 ? 'FREE' : rs(order.deliveryFee)}`,
    `TOTAL (Cash on Delivery): ${rs(order.total)}`
  ];
  return lines.filter((l, idx, arr) => l !== '' || arr[idx - 1] !== '').join('\n');
}

module.exports = async function handler(req, res) {
  // Enable CORS so orders from GitHub Pages and custom domain can send emails
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[order-email] RESEND_API_KEY is not configured');
    return res.status(500).json({ success: false, error: 'Email service not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ success: false, error: 'Invalid JSON body' });
  }

  const order = sanitizeOrder(body.orderData || body);
  const validationError = validateOrder(order);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const payload = {
    from: process.env.ORDER_EMAIL_FROM || DEFAULT_FROM,
    to: [process.env.ORDER_EMAIL_TO || DEFAULT_TO],
    subject: `🛍️ New COD Order #${order.orderNumber} — ${order.customer.name} (${order.customer.city}) — ${rs(order.total)}`,
    html: buildEmailHtml(order),
    text: buildEmailText(order)
  };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.customer.email)) {
    payload.reply_to = order.customer.email;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `order-${order.orderNumber}-${order.customer.phone.replace(/\D/g, '')}`
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('[order-email] Resend error', response.status, result);
      return res.status(502).json({ success: false, error: 'Email provider rejected the request' });
    }
    return res.status(200).json({ success: true, id: result.id || null });
  } catch (err) {
    console.error('[order-email] Network error', err);
    return res.status(502).json({ success: false, error: 'Could not reach email provider' });
  }
};

// Exported for local preview/testing
module.exports.buildEmailHtml = buildEmailHtml;
module.exports.sanitizeOrder = sanitizeOrder;
