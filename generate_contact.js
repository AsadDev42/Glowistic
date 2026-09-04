const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const contactSchema = {
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
);

const header = getHeader('contact');
const footer = getFooter();

const body = `
  <!-- HERO -->
  <section style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border); padding: 50px 0;">
    <div class="container container-narrow" style="text-align: center;">
      <span class="badge badge-burgundy" style="margin-bottom: 12px;">Customer Support Desk</span>
      <h1 style="font-size: 2.75rem; color: var(--color-primary); margin-bottom: 12px;">Let's Talk Glow.</h1>
      <p style="font-size: 1.0625rem; color: var(--color-text-muted);">
        Have a question about a product, order or your routine? We're here to help.
      </p>
    </div>
  </section>

  <!-- CONTACT CONTENT -->
  <main class="section-padding">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: flex-start;">
        <!-- Left Column: Contact Channels -->
        <div>
          <!-- WhatsApp Card -->
          <div style="background: #EBFBF0; border: 1.5px solid rgba(34, 197, 94, 0.35); border-radius: 12px; padding: 28px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; background: #25D366; color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">💬</div>
              <div>
                <h3 style="font-size: 1.125rem; color: #15803D;">WhatsApp Live Support</h3>
                <span style="font-size: 0.8125rem; color: #166534;">Fastest response for orders & queries</span>
              </div>
            </div>
            <p style="font-size: 0.875rem; color: #166534; line-height: 1.5; margin-bottom: 16px;">
              Helpline: <strong>03445422609</strong>
            </p>
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
              Chat on WhatsApp
            </a>
          </div>

          <!-- Official Links Card -->
          <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 28px; margin-bottom: 24px;">
            <h3 style="font-size: 1.125rem; color: var(--color-primary); margin-bottom: 16px;">Official Channels</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <a href="https://www.instagram.com/glowisticpk/?hl=en" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; color: inherit;">
                <span style="font-size: 1.25rem;">📸</span>
                <div>
                  <strong style="font-size: 0.875rem; color: var(--color-text);">Instagram</strong>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">@glowisticpk</div>
                </div>
              </a>
              <a href="https://www.facebook.com/glowisticpk.store/" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; color: inherit;">
                <span style="font-size: 1.25rem;">📘</span>
                <div>
                  <strong style="font-size: 0.875rem; color: var(--color-text);">Facebook</strong>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">@glowisticpk.store</div>
                </div>
              </a>
              <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px;">
                <span style="font-size: 1.25rem;">🌐</span>
                <div>
                  <strong style="font-size: 0.875rem; color: var(--color-text);">Official Website</strong>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">www.glowisticpk.com</div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Shortcut Box -->
          <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; text-align: center;">
            <h4 style="font-size: 1rem; color: var(--color-primary); margin-bottom: 6px;">Looking for a quick answer?</h4>
            <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 14px;">
              Check our most common questions about Cash on Delivery, order timelines, and formulations.
            </p>
            <a href="#faqs" class="btn btn-outline btn-sm">Visit FAQs &darr;</a>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 36px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 6px;">Send Us a Message</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 24px;">
            Fill in your details below and our team will get back to you promptly.
          </p>

          <form id="contact-inquiry-form" onsubmit="event.preventDefault(); document.getElementById('contact-form-success').style.display='block'; this.reset();">
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">Your Full Name <span>*</span></label>
                <input type="text" id="contact-name" class="form-control" placeholder="Ayesha Khan" required />
              </div>
              <div class="form-group">
                <label for="contact-phone">Phone / WhatsApp <span>*</span></label>
                <input type="tel" id="contact-phone" class="form-control" placeholder="03XXXXXXXXX" required />
              </div>
            </div>

            <div class="form-group">
              <label for="contact-email">Email Address <span>*</span></label>
              <input type="email" id="contact-email" class="form-control" placeholder="name@example.com" required />
            </div>

            <div class="form-group">
              <label for="contact-subject">Subject</label>
              <select id="contact-subject" class="form-control">
                <option value="product">Product &amp; Routine Inquiry</option>
                <option value="order">Order Tracking Assistance</option>
                <option value="general">General Feedback</option>
              </select>
            </div>

            <div class="form-group">
              <label for="contact-msg">Message <span>*</span></label>
              <textarea id="contact-msg" class="form-control" rows="5" placeholder="How can we help with your everyday routine?" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">
              Send Message
            </button>

            <div id="contact-form-success" style="display: none; margin-top: 16px; padding: 14px; background: #EBF7EE; border: 1px solid rgba(45, 106, 79, 0.3); border-radius: 6px; color: var(--color-success); font-size: 0.875rem; text-align: center;">
              ✓ Thank you! Your message has been sent. Our team will contact you shortly.
            </div>
          </form>
        </div>
      </div>

      <!-- FAQ Section -->
      <section id="faqs" style="margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--color-border);">
        <div class="section-header">
          <span class="section-tag">Quick Answers</span>
          <h2 class="section-title">Delivery &amp; Ordering FAQs</h2>
        </div>

        <div style="max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px;">
          <details class="accordion-item" open>
            <summary class="accordion-header">
              <span>Do you offer Cash on Delivery (COD) all over Pakistan?</span>
              <span class="acc-icon">+</span>
            </summary>
            <div class="accordion-content">
              Yes, absolutely! We offer Cash on Delivery across all cities and towns in Pakistan. You pay in cash when the courier delivers your parcel.
            </div>
          </details>

          <details class="accordion-item">
            <summary class="accordion-header">
              <span>What is the shipping cost?</span>
              <span class="acc-icon">+</span>
            </summary>
            <div class="accordion-content">
              Shipping is 100% FREE on all orders of Rs. 2,500 or more. For orders below Rs. 2,500, a standard flat shipping fee of Rs. 200 applies anywhere in Pakistan.
            </div>
          </details>

          <details class="accordion-item">
            <summary class="accordion-header">
              <span>How can I place an order directly on WhatsApp?</span>
              <span class="acc-icon">+</span>
            </summary>
            <div class="accordion-content">
              Simply send us a message at <strong>03445422609</strong> with the product names and your delivery address. Our care team will confirm and dispatch your parcel.
            </div>
          </details>
        </div>
      </section>

      <!-- Compact Shop CTA Strip -->
      <div style="margin-top: 56px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 36px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <div>
          <h4 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 4px;">Ready to Explore Everyday Essentials?</h4>
          <p style="font-size: 0.875rem; color: var(--color-text-muted);">Discover clean skincare, botanical hair care, and family wellness.</p>
        </div>
        <a href="shop.html" class="btn btn-primary">Shop Glowistic Catalog &rarr;</a>
      </div>
    </div>
  </main>
`;

const finalHtml = `${head}\n<body data-page="contact">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'contact.html'), finalHtml, 'utf8');
console.log('Successfully generated contact.html');
