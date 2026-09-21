const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const policies = [
  {
    file: 'shipping-policy.html',
    pageId: 'shipping-policy',
    title: 'Shipping & Delivery Policy | Glowistic',
    desc: 'Nationwide Cash on Delivery shipping terms, delivery timelines, address confirmation, and courier dispatch across Pakistan.',
    canonical: 'shipping-policy',
    badge: 'Customer Care & Logistics',
    h1: 'Shipping & Delivery Policy',
    intro: 'Dependable, straightforward nationwide delivery across Pakistan with Cash on Delivery (COD).',
    content: `
      <div class="policy-notice-banner" style="background: #EBF7EE; border-left: 4px solid var(--color-success, #2D6A4F); padding: 16px 20px; border-radius: 6px; margin-bottom: 28px; font-size: 0.95rem; color: #1E4633;">
        <strong>✓ Cash on Delivery (COD) Nationwide:</strong> All orders are dispatched via verified registered courier partners with parcel tracking.
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">1. Cash on Delivery (COD) Overview</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          Glowistic operates primarily on a trusted Cash on Delivery model throughout Pakistan. You do not need a credit or debit card to order from us. When our courier partner delivers your package to your doorstep, you simply inspect the outer parcel and hand the exact cash amount to the delivery courier.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">2. Delivery Process &amp; Address Confirmation</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          Once you place an order on our website, our customer support team will contact you via WhatsApp or SMS to confirm your delivery address and contact details prior to handing the parcel over to our courier partner. This step prevents delayed or failed deliveries and ensures your package arrives smoothly.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">3. Delivery Timelines</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          We dispatch orders within 24 business hours following phone/WhatsApp confirmation:
        </p>
        <ul style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem; padding-left: 20px; margin-top: 8px;">
          <li><strong>Major Metros (Lahore, Karachi, Islamabad, Rawalpindi):</strong> 2 to 3 business days.</li>
          <li><strong>Other Cities &amp; Regional Districts:</strong> 3 to 4 business days.</li>
          <li><strong>Remote or Rural Postal Zones:</strong> 4 to 5 business days.</li>
        </ul>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">4. Shipping Charges &amp; Free Delivery Threshold</h2>
        <ul style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem; padding-left: 20px;">
          <li><strong>Standard Flat-Rate Delivery:</strong> Rs. 250 anywhere in Pakistan for orders below Rs. 2,500.</li>
          <li><strong>FREE Nationwide Delivery:</strong> Automatically applied at checkout on all orders with a subtotal of <strong>Rs. 2,500 or more</strong>.</li>
        </ul>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">5. Customer Responsibility for Incomplete or Incorrect Addresses</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          Please ensure that your house or flat number, street name, sector/area, nearest landmark, and active mobile number are accurate when completing checkout. Couriers will make up to two delivery attempts. In the event of an unreachable phone or incorrect address, the package will be returned to our fulfillment warehouse.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">6. Order Cancellation &amp; WhatsApp Concierge</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          If you need to update your address or cancel an order, please contact our team immediately on WhatsApp at <strong>03445422609</strong> before the parcel has been dispatched. Once dispatched with the courier, orders cannot be cancelled mid-transit.
        </p>
      </div>

      <div class="policy-cta-box" style="margin-top: 36px; padding: 24px; background: var(--color-cream); border-radius: 12px; border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h3 style="color: var(--color-primary); margin: 0 0 4px; font-size: 1.15rem;">Have a Question About Your Shipment?</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin: 0;">Our WhatsApp concierge is available for real-time tracking assistance.</p>
        </div>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20about%20shipping%20and%20delivery." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          Chat on WhatsApp (03445422609)
        </a>
      </div>
    `
  },
  {
    file: 'privacy-policy.html',
    pageId: 'privacy-policy',
    title: 'Privacy Policy | Glowistic',
    desc: 'How Glowistic collects, safeguards, and respects your personal and delivery information.',
    canonical: 'privacy-policy',
    badge: 'Privacy & Data Protection',
    h1: 'Privacy Policy',
    intro: 'Your personal information is handled with care, confidentiality, and respect at Glowistic.',
    content: `
      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">1. What Information We Collect</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          When you place an order with Glowistic, we collect only the essential details required to process, fulfill, and deliver your parcel:
        </p>
        <ul style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem; padding-left: 20px; margin-top: 8px;">
          <li>Your full name</li>
          <li>Your phone / WhatsApp contact number</li>
          <li>Your email address (for order receipts and notifications)</li>
          <li>Your complete delivery address (city, area, house/flat #, landmark)</li>
          <li>Any specific order delivery notes you provide</li>
        </ul>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">2. How Your Information Is Used</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          Your data is used strictly to verify orders, generate courier airway bills, dispatch parcels, and respond to your customer service inquiries on WhatsApp or phone. We do not sell, rent, or trade your personal data to any third parties.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">3. Sharing with Logistics Partners</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          In order to fulfill your order, we share your delivery name, address, and mobile number exclusively with our verified courier delivery partners (e.g. TCS, Trax, Leopards). They are authorized to use this information solely for the purpose of delivering your parcel.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">4. Data Security &amp; Retention</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          We maintain administrative, technical, and physical safeguards to protect your personal details against unauthorized access. If you wish to update or remove your details from our records, please contact our support team.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">5. Contact Regarding Privacy</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          For any questions regarding this Privacy Policy or your data, please message us on WhatsApp at <strong>03445422609</strong> or reach out via our official Contact page.
        </p>
      </div>
    `
  },
  {
    file: 'terms-conditions.html',
    pageId: 'terms-conditions',
    title: 'Terms & Conditions | Glowistic',
    desc: 'Official terms and conditions governing orders, website use, and Cash on Delivery purchases on Glowistic.',
    canonical: 'terms-conditions',
    badge: 'Legal & Terms',
    h1: 'Terms & Conditions',
    intro: 'Please review these terms governing your purchase and use of the Glowistic storefront.',
    content: `
      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">1. Acceptance of Terms</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          By browsing, placing an order, or using www.glowisticpk.com, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">2. Products &amp; Pricing</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          All product prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable sales taxes. Glowistic makes every effort to ensure accurate images, descriptions, and ingredients lists for all beauty, skincare, personal care, and wellness items.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">3. Cash on Delivery Orders</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          When placing a Cash on Delivery order, you agree to receive the package at the provided address and pay the total order amount in cash to the delivery courier. Placing an order with false information or refusing delivery without reasonable cause causes operational loss and may result in order blacklisting.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">4. Cosmetic &amp; Wellness Use</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          All products offered on Glowistic are everyday cosmetic, personal care, and wellness preparations. They are not intended to diagnose, cure, treat, or prevent any medical condition. Please review product ingredients and directions on packaging and conduct a patch test prior to first use.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">5. Governing Law</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          These Terms &amp; Conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan.
        </p>
      </div>

      <div class="policy-section" style="margin-bottom: 28px;">
        <h2 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 10px;">6. Support &amp; Inquiries</h2>
        <p style="color: var(--color-text); line-height: 1.7; font-size: 0.95rem;">
          For any questions regarding our terms, please contact our customer support team directly on WhatsApp at <strong>03445422609</strong>.
        </p>
      </div>
    `
  }
];

policies.forEach(p => {
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": p.title,
    "description": p.desc,
    "url": "https://www.glowisticpk.com/" + p.canonical
  };

  const head = getHead(p.title, p.desc, p.canonical, schemaObj);
  const header = getHeader(p.pageId);
  const footer = getFooter();

  const body = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh; padding-top: 36px; padding-bottom: 80px;">
    <div class="container container-narrow">
      <div class="product-breadcrumb" style="margin-bottom: 24px;">
        <a href="index.html">Home</a> &sol; <span>${p.h1}</span>
      </div>

      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 48px; box-shadow: var(--shadow-sm);" class="policy-card">
        <span class="badge badge-burgundy" style="margin-bottom: 12px;">${p.badge}</span>
        <h1 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 12px;">${p.h1}</h1>
        <p style="color: var(--color-text-muted); font-size: 1.0625rem; line-height: 1.6; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border);">
          ${p.intro}
        </p>

        ${p.content}
      </div>
    </div>
  </main>
`;

  fs.writeFileSync(path.join(__dirname, p.file), `${head}\n<body data-page="${p.pageId}">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('Generated ' + p.file);
});

