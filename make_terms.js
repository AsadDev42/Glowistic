const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms & Conditions | Glowistic",
  "description": "Please review these terms before placing an order with Glowistic.",
  "url": "https://www.glowisticpk.com/terms-conditions.html"
};

const termsHead = getHead(
  'Terms & Conditions | Glowistic',
  'Please review these terms before placing an order with Glowistic.',
  'terms-conditions.html',
  termsSchema
);

const termsHeader = getHeader('terms-conditions');
const termsFooter = getFooter();

const termsBody = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh;">
    <div class="container container-narrow">
      <div class="product-breadcrumb" style="margin-bottom: 24px;">
        <a href="index.html">Home</a> &sol; <span>Terms &amp; Conditions</span>
      </div>

      <article class="policy-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 48px; box-shadow: var(--shadow-sm);">
        <header style="margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid var(--color-border);">
          <span class="badge badge-burgundy" style="margin-bottom: 12px;">Customer Agreement &amp; Store Terms</span>
          <h1 style="font-size: 2.75rem; color: var(--color-primary); margin-bottom: 12px; line-height: 1.2;">Terms &amp; Conditions</h1>
          <p style="color: var(--color-text-muted); font-size: 1.125rem; line-height: 1.7; margin: 0;">
            Please review these terms before placing an order with Glowistic.
          </p>
        </header>

        <!-- Section 1: About Glowistic -->
        <section class="policy-section">
          <h2>1. About Glowistic</h2>
          <p>
            Glowistic operates an online store offering beauty, skincare, personal care, hair care, and wellness products for everyday routines across Pakistan.
          </p>
          <p>
            These Terms &amp; Conditions apply to all visitors, users, and customers who access our website at <a href="https://www.glowisticpk.com" style="color: var(--color-primary); font-weight: 600;">www.glowisticpk.com</a> or place an order with us.
          </p>
        </section>

        <!-- Section 2: Products -->
        <section class="policy-section">
          <h2>2. Products</h2>
          <p>
            Product information, images, descriptions, availability, and pricing are provided on our website to assist customers in making informed purchasing decisions.
          </p>
          <p>
            We strive to display product details, packaging, and descriptions accurately. However, product availability and prices may change without prior notice. Glowistic does not make unsupported or exaggerated claims regarding product results.
          </p>
        </section>

        <!-- Section 3: Placing an Order -->
        <section class="policy-section">
          <h2>3. Placing an Order</h2>
          <p>
            Customers can browse and place orders directly through the Glowistic website. When placing an order, customers are responsible for providing accurate and complete information, including:
          </p>
          <ul>
            <li><strong>Name:</strong> Full customer name for delivery identification.</li>
            <li><strong>Phone Number:</strong> Active mobile number reachable by courier riders.</li>
            <li><strong>Email:</strong> Valid email address for order notifications.</li>
            <li><strong>Delivery Address:</strong> Complete street address, house/flat/office number.</li>
            <li><strong>City:</strong> City or town name in Pakistan.</li>
            <li><strong>Province:</strong> Province/region.</li>
            <li><strong>Postal Code:</strong> Area postal code where applicable.</li>
          </ul>
        </section>

        <!-- Section 4: Order Confirmation -->
        <section class="policy-section">
          <h2>4. Order Confirmation</h2>
          <p>
            After placing an order on our website, the customer may receive confirmation through the contact information provided (such as an onscreen confirmation, email summary, or WhatsApp message).
          </p>
          <p>
            Glowistic may contact the customer to confirm order or delivery information where necessary prior to order processing and dispatch.
          </p>
        </section>

        <!-- Section 5: Cash on Delivery -->
        <section class="policy-section">
          <h2>5. Cash on Delivery</h2>
          <p>
            <strong>Glowistic currently offers Cash on Delivery.</strong>
          </p>
          <p>
            Customers pay the complete invoice amount in cash when their order is delivered to their doorstep.
          </p>
        </section>

        <!-- Section 6: Card Payments -->
        <section class="policy-section">
          <h2>6. Card Payments</h2>
          <p>
            <strong>Online card payments are currently unavailable and will be introduced in the future.</strong>
          </p>
          <div style="background: var(--color-cream-light); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px 20px; margin: 16px 0;">
            <p style="margin: 0; font-size: 0.9375rem; color: var(--color-primary); font-weight: 600;">
              💳 Card Payments Coming Soon
            </p>
            <p style="margin: 6px 0 0 0; font-size: 0.875rem; color: var(--color-text-muted);">
              Card payment is not selectable at checkout at this time. All orders are fulfilled securely via Cash on Delivery.
            </p>
          </div>
        </section>

        <!-- Section 7: Delivery -->
        <section class="policy-section">
          <h2>7. Delivery</h2>
          <p>
            Glowistic will process confirmed orders and arrange delivery to the delivery information provided by the customer through registered courier logistics networks across Pakistan.
          </p>
          <p>
            Customers should ensure that their delivery information and contact number are correct and that someone is available at the destination to receive the package and complete the Cash on Delivery payment.
          </p>
        </section>

        <!-- Section 8: Order Cancellation / Changes -->
        <section class="policy-section">
          <h2>8. Order Cancellation / Changes</h2>
          <p>
            Customers who need to make changes to an order should contact Glowistic as soon as possible through WhatsApp. Order changes may not be possible once the order has been processed or dispatched.
          </p>
        </section>

        <!-- Section 9: Product Information -->
        <section class="policy-section">
          <h2>9. Product Information</h2>
          <p>
            Customers should read product descriptions and available product information before ordering.
          </p>
          <p>
            For products involving personal care, skincare, supplements or wellness, customers should follow the product's provided usage instructions. Glowistic does not make medical promises, guarantees of cure, or clinical claims. If you have known allergies, sensitivities, or medical conditions, consult a healthcare professional before introducing new items into your routine.
          </p>
        </section>

        <!-- Section 10: Website Usage -->
        <section class="policy-section">
          <h2>10. Website Usage</h2>
          <p>
            Customers should use the website lawfully and should not attempt to disrupt, misuse or interfere with website functionality, security protocols, or ordering systems.
          </p>
        </section>

        <!-- Section 11: Changes to Terms -->
        <section class="policy-section">
          <h2>11. Changes to Terms</h2>
          <p>
            Glowistic may update these terms from time to time. Any updates or revisions will be posted directly to this page.
          </p>
        </section>

        <!-- Section 12: Contact -->
        <section class="policy-section" style="margin-bottom: 36px;">
          <h2>12. Contact</h2>
          <p>
            If you have questions regarding these Terms &amp; Conditions or need assistance with your order, please contact Glowistic:
          </p>
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 20px 24px; margin-top: 12px;">
            <p style="margin: 0 0 8px 0; font-size: 1rem; font-weight: 700; color: var(--color-primary);">Glowistic</p>
            <p style="margin: 0 0 6px 0; font-size: 0.9375rem; color: var(--color-text);">
              💬 <strong>WhatsApp:</strong> <a href="https://wa.me/923445422609" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); font-weight: 600;">03445422609</a>
            </p>
            <p style="margin: 0; font-size: 0.9375rem; color: var(--color-text);">
              🌐 <strong>Website:</strong> <a href="https://www.glowisticpk.com" style="color: var(--color-primary); font-weight: 600;">www.glowisticpk.com</a>
            </p>
          </div>
        </section>

        <!-- FINAL CTA BOX -->
        <div class="policy-cta-box" style="background: var(--color-cream); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div>
            <h3 style="color: var(--color-primary); margin-bottom: 6px; font-size: 1.35rem;">Need help before placing your order?</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">
              Our customer care team is available to assist you with products, orders, and delivery inquiries.
            </p>
          </div>
          <div>
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20before%20placing%20my%20order." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              Chat with Glowistic
            </a>
          </div>
        </div>
      </article>
    </div>
  </main>
`;

fs.writeFileSync(path.join(__dirname, 'terms-conditions.html'), `${termsHead}\n<body data-page="terms-conditions">\n${termsHeader}\n${termsBody}\n${termsFooter}`, 'utf8');
console.log('Successfully generated dedicated terms-conditions.html');
