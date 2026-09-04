const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy | Glowistic",
  "description": "Learn how Glowistic collects and uses information when you visit our website or place an order.",
  "url": "https://www.glowisticpk.com/privacy-policy.html"
};

const privacyHead = getHead(
  'Privacy Policy | Glowistic',
  'Your privacy matters to us. Learn how Glowistic collects and uses information when you visit our website or place an order.',
  'privacy-policy.html',
  privacySchema
);

const privacyHeader = getHeader('privacy-policy');
const privacyFooter = getFooter();

const privacyBody = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh;">
    <div class="container container-narrow">
      <div class="product-breadcrumb" style="margin-bottom: 24px;">
        <a href="index.html">Home</a> &sol; <span>Privacy Policy</span>
      </div>

      <article class="policy-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 48px; box-shadow: var(--shadow-sm);">
        <header style="margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid var(--color-border);">
          <span class="badge badge-burgundy" style="margin-bottom: 12px;">Customer Privacy &amp; Trust</span>
          <h1 style="font-size: 2.75rem; color: var(--color-primary); margin-bottom: 12px; line-height: 1.2;">Privacy Policy</h1>
          <p style="color: var(--color-text-muted); font-size: 1.125rem; line-height: 1.7; margin: 0;">
            Your privacy matters to us. Learn how Glowistic collects and uses information when you visit our website or place an order.
          </p>
        </header>

        <!-- Section 1: Introduction -->
        <section class="policy-section">
          <h2>1. Introduction</h2>
          <p>
            Glowistic is a Pakistan-based beauty, skincare, personal care, hair care, and wellness e-commerce brand. We respect our customers' privacy and are committed to protecting the personal information shared with us through our website (<strong>www.glowisticpk.com</strong>).
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use it to fulfill your orders, and how we keep your details safe during your shopping experience.
          </p>
        </section>

        <!-- Section 2: Information We Collect -->
        <section class="policy-section">
          <h2>2. Information We Collect</h2>
          <p>
            When you browse our store, place an order, or reach out to our team, Glowistic may collect the following information:
          </p>
          <ul>
            <li><strong>Full Name:</strong> To identify you and address your parcel correctly.</li>
            <li><strong>Phone Number:</strong> For order verification, delivery coordination, and customer support.</li>
            <li><strong>Email Address:</strong> To send order confirmations, receipts, and customer service updates.</li>
            <li><strong>Delivery Address:</strong> Complete street address, house/flat number, and area for doorstep delivery.</li>
            <li><strong>City, Province &amp; Postal Code:</strong> To accurately route parcels across Pakistani courier networks.</li>
            <li><strong>Order Details:</strong> Product selections, quantities, volumes, and total order value.</li>
            <li><strong>Order Notes:</strong> Optional delivery instructions or nearest landmark details provided by you.</li>
          </ul>
        </section>

        <!-- Section 3: How We Use Information -->
        <section class="policy-section">
          <h2>3. How We Use Information</h2>
          <p>
            Customer information collected by Glowistic is used exclusively for legitimate business and customer service purposes, including:
          </p>
          <ul>
            <li>Processing, packing, and dispatching your orders.</li>
            <li>Arranging reliable doorstep delivery via registered courier partners across Pakistan.</li>
            <li>Contacting you regarding order status, verification, and dispatch updates.</li>
            <li>Responding to your questions, routine inquiries, and customer care requests.</li>
            <li>Providing responsive after-sales support.</li>
            <li>Improving website functionality, catalog navigation, and the overall shopping experience.</li>
          </ul>
        </section>

        <!-- Section 4: Order Communication -->
        <section class="policy-section">
          <h2>4. Order Communication</h2>
          <p>
            To ensure smooth delivery and prevent failed parcel handovers, Glowistic may contact customers through:
          </p>
          <ul>
            <li><strong>Phone Calls:</strong> For address verification before parcel dispatch.</li>
            <li><strong>WhatsApp (03445422609):</strong> For fast order confirmation, tracking updates, and direct customer assistance.</li>
            <li><strong>Email:</strong> For automated order summaries and written customer service correspondence.</li>
          </ul>
        </section>

        <!-- Section 5: Payment Information -->
        <section class="policy-section">
          <h2>5. Payment Information</h2>
          <p>
            Glowistic currently operates on a <strong>Cash on Delivery (COD)</strong> basis for all orders across Pakistan. You pay with exact cash directly to the courier rider upon parcel handover at your doorstep.
          </p>
          <div style="background: var(--color-cream-light); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px 20px; margin: 16px 0;">
            <p style="margin: 0; font-size: 0.9375rem; color: var(--color-text);">
              💳 <strong>Online Card Payments:</strong> Digital debit and credit card payment options are currently <strong>"Coming Soon"</strong>. Glowistic does not collect, process, or store any debit or credit card numbers, bank credentials, or CVV codes on this website.
            </p>
          </div>
        </section>

        <!-- Section 6: Cookies -->
        <section class="policy-section">
          <h2>6. Cookies &amp; Browser Technologies</h2>
          <p>
            Our website may use standard cookies and local browser storage to provide essential website functionality. These technologies help remember items placed in your shopping bag as you navigate between pages, maintain your routine quiz selections, and deliver a faster, more convenient browsing experience.
          </p>
          <p>
            You can modify your browser settings to decline or clear cookies at any time; however, some shopping bag features may require cookies to function properly.
          </p>
        </section>

        <!-- Section 7: Third-Party Services -->
        <section class="policy-section">
          <h2>7. Third-Party Services</h2>
          <p>
            Glowistic only shares customer data with third-party logistics and courier delivery partners who are directly responsible for transporting and handing over your parcel to your delivery address in Pakistan.
          </p>
          <p>
            We only share the necessary shipping details (your name, delivery address, contact phone number, and COD payable amount). We do not sell, rent, or trade customer information to external marketing agencies or unauthorized third parties.
          </p>
        </section>

        <!-- Section 8: Data Protection -->
        <section class="policy-section">
          <h2>8. Data Protection</h2>
          <p>
            We take reasonable and appropriate administrative and technical measures to protect customer information against unauthorized access, disclosure, loss, or misuse. Access to customer order records is restricted to authorized personnel who need the information to fulfill orders and provide customer support.
          </p>
        </section>

        <!-- Section 9: Customer Rights -->
        <section class="policy-section">
          <h2>9. Customer Rights</h2>
          <p>
            You have the right to know what personal details we have on file for your orders. Customers can contact Glowistic at any time to:
          </p>
          <ul>
            <li>Review the contact or delivery details provided during checkout.</li>
            <li>Request corrections or updates to your delivery address.</li>
            <li>Ask questions regarding how your data is handled.</li>
          </ul>
        </section>

        <!-- Section 10: Contact -->
        <section class="policy-section" style="margin-bottom: 36px;">
          <h2>10. Contact Glowistic</h2>
          <p>
            If you have any questions, inquiries, or feedback regarding this Privacy Policy or your personal information, please connect with us through our official channels:
          </p>
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 20px 24px; margin-top: 12px;">
            <p style="margin: 0 0 8px 0; font-size: 1rem; font-weight: 700; color: var(--color-primary);">Glowistic</p>
            <p style="margin: 0 0 6px 0; font-size: 0.9375rem; color: var(--color-text);">
              💬 <strong>WhatsApp Helpline:</strong> <a href="https://wa.me/923445422609" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 600;">03445422609</a>
            </p>
            <p style="margin: 0; font-size: 0.9375rem; color: var(--color-text);">
              🌐 <strong>Official Website:</strong> <a href="https://www.glowisticpk.com" style="color: var(--color-primary); font-weight: 600;">www.glowisticpk.com</a>
            </p>
          </div>
        </section>

        <!-- FINAL CTA BOX -->
        <div class="policy-cta-box" style="background: var(--color-cream); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div>
            <h3 style="color: var(--color-primary); margin-bottom: 6px; font-size: 1.35rem;">Have a question about your privacy?</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">
              Our customer care team is available to assist you with any questions regarding your personal details.
            </p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="contact.html" class="btn btn-primary btn-lg">
              Contact Glowistic
            </a>
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20about%20my%20privacy." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </div>
  </main>
`;

fs.writeFileSync(path.join(__dirname, 'privacy-policy.html'), `${privacyHead}\n<body data-page="privacy-policy">\n${privacyHeader}\n${privacyBody}\n${privacyFooter}`, 'utf8');
console.log('Successfully generated dedicated privacy-policy.html');
