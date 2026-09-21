const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

// 1. UPDATE generate_home.js
const homeContent = fs.readFileSync(path.join(__dirname, 'generate_home.js'), 'utf8');
const updatedHome = homeContent.replace(
  /const head = getHead\([\s\S]*?\);/,
  `const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.glowisticpk.com/#organization",
      "name": "Glowistic",
      "url": "https://www.glowisticpk.com",
      "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg",
      "description": "Beauty, skincare, personal care, hair care and wellness essentials made for everyday routines in Pakistan.",
      "telephone": "+923445422609",
      "sameAs": [
        "https://www.instagram.com/glowisticpk",
        "https://www.facebook.com/glowisticpk.store"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.glowisticpk.com/#website",
      "url": "https://www.glowisticpk.com",
      "name": "Glowistic",
      "publisher": { "@id": "https://www.glowisticpk.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.glowisticpk.com/shop.html?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

const head = getHead(
  'Glowistic | Beauty, Skincare & Personal Care Essentials in Pakistan',
  'Discover Glowistic — authentic beauty, skincare, hair care, personal care, and wellness essentials for everyday routines. Simple choices, feel-good care, and nationwide Cash on Delivery across Pakistan.',
  'index.html',
  homeSchema,
  'assets/products/oclear-serum.jpg'
);`
);
fs.writeFileSync(path.join(__dirname, 'generate_home.js'), updatedHome, 'utf8');

// 2. UPDATE generate_about.js
const aboutContent = fs.readFileSync(path.join(__dirname, 'generate_about.js'), 'utf8');
const updatedAbout = aboutContent.replace(
  /const head = getHead\([\s\S]*?\);/,
  `const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Glowistic — Everyday Care Starts with Glowistic",
  "description": "Beauty, skincare, personal care and wellness essentials made for everyday routines in Pakistan.",
  "url": "https://www.glowisticpk.com/about.html"
};

const head = getHead(
  'About Us — Everyday Care Starts with Glowistic',
  'Learn about Glowistic — beauty, skincare, personal care and wellness essentials made for everyday routines in Pakistan.',
  'about.html',
  aboutSchema
);`
);
fs.writeFileSync(path.join(__dirname, 'generate_about.js'), updatedAbout, 'utf8');

// 3. UPDATE generate_blog.js
const blogContent = fs.readFileSync(path.join(__dirname, 'generate_blog.js'), 'utf8');
const updatedBlog = blogContent.replace(
  /const head = getHead\([\s\S]*?\);/,
  `const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "The Glow Journal — Glowistic",
  "description": "Simple, useful insights for better everyday beauty, skincare, hair care and wellness routines.",
  "url": "https://www.glowisticpk.com/blog.html",
  "publisher": {
    "@type": "Organization",
    "name": "Glowistic",
    "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg"
  }
};

const head = getHead(
  'The Glow Journal — Skincare, Hair Care & Wellness Guides | Glowistic',
  'Simple, useful insights for better everyday beauty, skincare, hair care and wellness routines from The Glow Journal.',
  'blog.html',
  blogSchema
);`
);
fs.writeFileSync(path.join(__dirname, 'generate_blog.js'), updatedBlog, 'utf8');

// 4. UPDATE generate_article.js
const articleContent = fs.readFileSync(path.join(__dirname, 'generate_article.js'), 'utf8');
const updatedArticle = articleContent.replace(
  /const head = getHead\([\s\S]*?\);/,
  `const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Glow Journal Editorial",
  "author": {
    "@type": "Organization",
    "name": "Glowistic Editorial Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Glowistic",
    "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg"
  },
  "datePublished": "2026-09-01",
  "dateModified": "2026-09-04"
};

const head = getHead(
  'Article — The Glow Journal | Glowistic',
  'Read practical everyday beauty, skincare, hair care, and wellness insights from The Glow Journal editorial team.',
  'article.html',
  articleSchema
);`
);
fs.writeFileSync(path.join(__dirname, 'generate_article.js'), updatedArticle, 'utf8');

// 5. UPDATE generate_contact.js
const contactContent = fs.readFileSync(path.join(__dirname, 'generate_contact.js'), 'utf8');
const updatedContact = contactContent.replace(
  /const head = getHead\([\s\S]*?\);/,
  `const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Us & WhatsApp Helpline — Glowistic",
  "description": "Have a question about a product, order or your routine? We're here to help on WhatsApp 03445422609 and official channels.",
  "url": "https://www.glowisticpk.com/contact.html"
};

const head = getHead(
  "Contact Us & WhatsApp Helpline — Let's Talk Glow | Glowistic",
  "Have a question about a product, order or your routine? We're here to help on WhatsApp 03445422609 and official channels.",
  'contact.html',
  contactSchema
);`
);
fs.writeFileSync(path.join(__dirname, 'generate_contact.js'), updatedContact, 'utf8');

// 6. UPDATE generate_policies.js
const policiesCode = `
const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const policies = [
  {
    file: 'shipping-policy.html',
    pageId: 'shipping-policy',
    title: 'Shipping & Delivery Policy | Glowistic',
    desc: 'Nationwide Cash on Delivery shipping terms, delivery timelines, and courier handling across Pakistan.',
    canonical: 'shipping-policy.html',
    badge: 'Customer Care & Logistics',
    h1: 'Shipping & Delivery Policy',
    intro: 'Clear, dependable delivery across all cities, towns and regional areas in Pakistan.',
    content: \`
      <div class="policy-notice-banner">
        <strong>Cash on Delivery (COD) Nationwide:</strong> All orders are dispatched via registered courier partners with parcel tracking.
      </div>
      <div class="policy-section">
        <h2>1. Coverage &amp; Delivery Network</h2>
        <p>Glowistic delivers to over 200+ cities and regions across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and surrounding areas.</p>
      </div>
      <div class="policy-section">
        <h2>2. Delivery Charges &amp; Free Shipping Threshold</h2>
        <ul>
          <li><strong>Standard Nationwide Delivery:</strong> Flat Rs. 250 on orders under Rs. 2,500.</li>
          <li><strong>Free Nationwide Delivery:</strong> Automatically applied to all orders of <strong>Rs. 2,500 or more</strong>.</li>
        </ul>
      </div>
      <div class="policy-section">
        <h2>3. Estimated Transit Timelines</h2>
        <ul>
          <li><strong>Major Metros (Lahore, Karachi, Islamabad/Rawalpindi):</strong> 2 to 3 business days.</li>
          <li><strong>Other Cities &amp; Regional Districts:</strong> 3 to 5 business days.</li>
        </ul>
      </div>
      <div class="policy-section">
        <h2>4. Order Verification &amp; Dispatch Protocol</h2>
        <p>To prevent failed deliveries, our customer care team may contact you via WhatsApp or SMS to confirm your delivery address before parcel dispatch.</p>
      </div>
      <div class="policy-editable-box">
        <span class="policy-editable-badge">Customizable Policy Section</span>
        <p><strong>Courier Partners &amp; Tracking:</strong> [Business Owner Note: Courier tracking portal links and designated partners can be updated here as courier partnerships expand].</p>
      </div>
      <div class="policy-cta-box">
        <div>
          <h3 style="color: var(--color-primary); margin-bottom: 4px;">Have a Delivery Question?</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">Our WhatsApp concierge is available for real-time tracking assistance.</p>
        </div>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20about%20shipping." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          Chat on WhatsApp (03445422609)
        </a>
      </div>
    \`
  },
  {
    file: 'refund-policy.html',
    pageId: 'refund-policy',
    title: 'Return & Refund Policy | Glowistic',
    desc: 'Customer satisfaction guarantee, damaged parcel reporting, and return guidelines for Glowistic orders in Pakistan.',
    canonical: 'refund-policy.html',
    badge: 'Hygiene & Customer Care',
    h1: 'Return & Refund Policy',
    intro: 'We stand behind the quality of our everyday beauty and wellness essentials.',
    content: \`
      <div class="policy-notice-banner">
        <strong>48-Hour Inspection Window:</strong> Please inspect your parcel upon arrival and report any transit damage promptly.
      </div>
      <div class="policy-section">
        <h2>1. Damaged or Leaked Items</h2>
        <p>If your order arrives damaged, leaking, or with broken packaging, please message our WhatsApp helpline at <strong>03445422609</strong> within 48 hours of delivery with clear photos or video of the issue. We will arrange a free replacement without hassle.</p>
      </div>
      <div class="policy-section">
        <h2>2. Hygiene &amp; Safety Standards</h2>
        <p>Due to health, personal care, and cosmetic hygiene regulations in Pakistan, items that have been opened, unsealed, or used cannot be returned unless verified to be defective.</p>
      </div>
      <div class="policy-section">
        <h2>3. Replacement &amp; Resolution Process</h2>
        <ul>
          <li><strong>Resolution Time:</strong> Replacement claims are reviewed within 24 business hours.</li>
          <li><strong>Zero Cost to Customer:</strong> Approved replacements for damaged goods are re-dispatched free of delivery charges.</li>
        </ul>
      </div>
      <div class="policy-editable-box">
        <span class="policy-editable-badge">Customizable Policy Section</span>
        <p><strong>Refund Methods &amp; Accounts:</strong> [Business Owner Note: Insert final bank transfer / JazzCash / EasyPaisa refund processing details here].</p>
      </div>
      <div class="policy-cta-box">
        <div>
          <h3 style="color: var(--color-primary); margin-bottom: 4px;">Need Assistance with an Order?</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">Connect directly with our care team for personalized support.</p>
        </div>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20request%20support%20for%20my%20order." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          Contact Care Team
        </a>
      </div>
    \`
  },
  {
    file: 'privacy-policy.html',
    pageId: 'privacy-policy',
    title: 'Privacy Policy | Glowistic',
    desc: 'How Glowistic protects your personal data, delivery details, and order confidentiality in Pakistan.',
    canonical: 'privacy-policy.html',
    badge: 'Data Protection & Trust',
    h1: 'Privacy Policy',
    intro: 'Your personal information and privacy are handled with complete confidentiality and care.',
    content: \`
      <div class="policy-section">
        <h2>1. Information We Collect</h2>
        <p>When you place an order or contact Glowistic, we collect necessary customer details including your full name, phone number, delivery address, city, province, and optional order notes solely to fulfill your order and provide customer support.</p>
      </div>
      <div class="policy-section">
        <h2>2. Use of Information</h2>
        <ul>
          <li>Processing, dispatching, and delivering your Cash on Delivery orders.</li>
          <li>Courier routing and phone coordination for doorstep delivery.</li>
          <li>Customer service communications and order confirmations via WhatsApp or SMS.</li>
        </ul>
      </div>
      <div class="policy-section">
        <h2>3. Data Protection &amp; Third Parties</h2>
        <p>We do not sell, rent, or trade your personal information. Delivery details are shared exclusively with authorized courier logistics partners for parcel transit.</p>
      </div>
      <div class="policy-editable-box">
        <span class="policy-editable-badge">Customizable Policy Section</span>
        <p><strong>Marketing &amp; Cookies:</strong> [Business Owner Note: Update marketing consent, newsletter subscriptions, or analytics policies according to your final marketing stack].</p>
      </div>
      <div class="policy-cta-box">
        <div>
          <h3 style="color: var(--color-primary); margin-bottom: 4px;">Privacy Inquiries</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">Reach out anytime if you have questions regarding your data.</p>
        </div>
        <a href="contact.html" class="btn btn-primary">Contact Us</a>
      </div>
    \`
  },
  {
    file: 'terms-conditions.html',
    pageId: 'terms-conditions',
    title: 'Terms & Conditions | Glowistic',
    desc: 'Terms of service, product information guidelines, and ordering conditions for Glowistic customers in Pakistan.',
    canonical: 'terms-conditions.html',
    badge: 'Legal & Terms of Use',
    h1: 'Terms & Conditions',
    intro: 'Clear terms governing orders, product use, and website access at www.glowisticpk.com.',
    content: \`
      <div class="policy-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing www.glowisticpk.com or placing an order through our website or WhatsApp concierge, you agree to these Terms &amp; Conditions.</p>
      </div>
      <div class="policy-section">
        <h2>2. Pricing &amp; Currency</h2>
        <p>All prices displayed on Glowistic are in Pakistani Rupees (PKR) and include applicable product pricing. Delivery charges are calculated transparently at checkout.</p>
      </div>
      <div class="policy-section">
        <h2>3. Product Information &amp; Everyday Use</h2>
        <p>Glowistic provides beauty, skincare, personal care, and wellness essentials. Product descriptions, ingredients, and directions for use are provided for everyday self-care routines and do not constitute medical advice. Please conduct a patch test before first use.</p>
      </div>
      <div class="policy-section">
        <h2>4. Cash on Delivery Commitment</h2>
        <p>Customers placing Cash on Delivery orders agree to provide accurate delivery details and ensure exact payment upon parcel handover.</p>
      </div>
      <div class="policy-editable-box">
        <span class="policy-editable-badge">Customizable Policy Section</span>
        <p><strong>Governing Law &amp; Jurisdiction:</strong> [Business Owner Note: Insert designated Pakistani legal jurisdiction and dispute resolution terms here].</p>
      </div>
      <div class="policy-cta-box">
        <div>
          <h3 style="color: var(--color-primary); margin-bottom: 4px;">Questions on Terms?</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">Contact our team for any clarifications.</p>
        </div>
        <a href="contact.html" class="btn btn-primary">Contact Support</a>
      </div>
    \`
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

  const body = \`
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh;">
    <div class="container container-narrow">
      <div class="product-breadcrumb" style="margin-bottom: 24px;">
        <a href="index.html">Home</a> &sol; <span>\${p.h1}</span>
      </div>

      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 48px; box-shadow: var(--shadow-sm);" class="policy-card">
        <span class="badge badge-burgundy" style="margin-bottom: 12px;">\${p.badge}</span>
        <h1 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 12px;">\${p.h1}</h1>
        <p style="color: var(--color-text-muted); font-size: 1.0625rem; line-height: 1.6; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border);">
          \${p.intro}
        </p>

        \${p.content}
      </div>
    </div>
  </main>
\`;

  fs.writeFileSync(path.join(__dirname, p.file), \`\${head}\\n<body data-page="\${p.pageId}">\\n\${header}\\n\${body}\\n\${footer}\`, 'utf8');
  console.log('Generated ' + p.file);
});
`;
fs.writeFileSync(path.join(__dirname, 'generate_policies.js'), policiesCode, 'utf8');

console.log('Successfully updated all generators.');

