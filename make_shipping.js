const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const shippingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Shipping & Delivery | Glowistic",
  "description": "Place your order, share your delivery details, and we'll take care of getting your Glowistic products to you.",
  "url": "https://www.glowisticpk.com/shipping-policy.html"
};

const shippingHead = getHead(
  'Shipping & Delivery | Glowistic',
  'Place your order, share your delivery details, and we\'ll take care of getting your Glowistic products to you.',
  'shipping-policy.html',
  shippingSchema
);

const shippingHeader = getHeader('shipping-policy');
const shippingFooter = getFooter();

const shippingBody = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh;">
    <div class="container container-narrow">
      <div class="product-breadcrumb" style="margin-bottom: 24px;">
        <a href="index.html">Home</a> &sol; <span>Shipping &amp; Delivery</span>
      </div>

      <article class="policy-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 48px; box-shadow: var(--shadow-sm);">
        <header style="margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid var(--color-border);">
          <span class="badge badge-burgundy" style="margin-bottom: 12px;">Orders &amp; Delivery</span>
          <h1 style="font-size: 2.75rem; color: var(--color-primary); margin-bottom: 12px; line-height: 1.2;">Shipping &amp; Delivery</h1>
          <p style="color: var(--color-text-muted); font-size: 1.125rem; line-height: 1.7; margin: 0;">
            Place your order, share your delivery details, and we'll take care of getting your Glowistic products to you.
          </p>
        </header>

        <!-- SECTION 1: How Delivery Works -->
        <section class="policy-section" style="margin-bottom: 40px;">
          <h2 style="font-size: 1.625rem; color: var(--color-primary); margin-bottom: 24px;">1. How Delivery Works</h2>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 16px;">
            <!-- Step 1 -->
            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 24px 20px; text-align: center; position: relative;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 16px;">1</div>
              <h3 style="font-size: 1.125rem; color: var(--color-primary); margin-bottom: 8px;">Choose Your Products</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.5; margin: 0;">
                Explore our everyday beauty, skincare, and wellness essentials and select what fits your routine.
              </p>
            </div>

            <!-- Step 2 -->
            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 24px 20px; text-align: center; position: relative;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 16px;">2</div>
              <h3 style="font-size: 1.125rem; color: var(--color-primary); margin-bottom: 8px;">Place Your Order</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.5; margin: 0;">
                Review your items in the shopping bag and proceed to our fast, simple checkout.
              </p>
            </div>

            <!-- Step 3 -->
            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 24px 20px; text-align: center; position: relative;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 16px;">3</div>
              <h3 style="font-size: 1.125rem; color: var(--color-primary); margin-bottom: 8px;">Provide Your Delivery Details</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.5; margin: 0;">
                Enter your complete shipping address, phone number, and city so we can route your order accurately.
              </p>
            </div>

            <!-- Step 4 -->
            <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 24px 20px; text-align: center; position: relative;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 16px;">4</div>
              <h3 style="font-size: 1.125rem; color: var(--color-primary); margin-bottom: 8px;">We Deliver Your Order</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.5; margin: 0;">
                Your parcel is prepared, dispatched, and delivered right to your doorstep with Cash on Delivery.
              </p>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Cash on Delivery (Visually Prominent) -->
        <section class="policy-section" style="margin-bottom: 36px;">
          <div style="background: linear-gradient(135deg, var(--color-cream-light) 0%, var(--color-cream) 100%); border: 2px solid var(--color-accent); border-radius: 12px; padding: 28px 32px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 1.75rem;">💵</span>
              <h2 style="font-size: 1.5rem; color: var(--color-primary); margin: 0;">Cash on Delivery Available</h2>
            </div>
            <p style="font-size: 1.0625rem; color: var(--color-text); line-height: 1.7; margin: 0 0 12px 0; font-weight: 500;">
              Glowistic currently offers Cash on Delivery. You can place your order online and pay when your order is delivered.
            </p>
            <p style="font-size: 0.9375rem; color: var(--color-text-muted); margin: 0;">
              No online advance payment or card details required. Simply keep the exact amount ready upon parcel arrival.
            </p>
          </div>
        </section>

        <!-- SECTION 3: Delivery Information -->
        <section class="policy-section">
          <h2>3. Delivery Information</h2>
          <p>
            To ensure smooth parcel handover and timely dispatch, customers need to provide the following details when placing an order:
          </p>
          <ul>
            <li><strong>Full Name:</strong> The recipient's complete name.</li>
            <li><strong>Phone Number:</strong> An active mobile number reachable by delivery personnel.</li>
            <li><strong>Complete Delivery Address:</strong> House or apartment number, street name, and prominent nearby landmark.</li>
            <li><strong>City:</strong> City or town name.</li>
            <li><strong>Province:</strong> Province or administrative area.</li>
            <li><strong>Postal Code:</strong> Area postal code where applicable.</li>
          </ul>
          <div style="background: var(--color-bg); border-left: 4px solid var(--color-primary); padding: 14px 18px; border-radius: 0 8px 8px 0; margin-top: 16px;">
            <p style="margin: 0; font-size: 0.9375rem; color: var(--color-text); font-weight: 500;">
              💡 <em>"Please make sure your contact number and delivery address are accurate so your order can reach you without unnecessary delays."</em>
            </p>
          </div>
        </section>

        <!-- SECTION 4: Order Processing -->
        <section class="policy-section">
          <h2>4. Order Processing</h2>
          <p>
            Once you place an order, Glowistic will review and process your order using the information provided at checkout. We may contact you through phone or WhatsApp if confirmation or additional information is required.
          </p>
        </section>

        <!-- SECTION 5: Delivery -->
        <section class="policy-section">
          <h2>5. Delivery</h2>
          <p>
            After your order has been processed, it will be arranged for delivery to the address provided during checkout.
          </p>
          <div class="policy-editable-box" style="background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 8px; padding: 16px 20px; margin-top: 14px;">
            <span class="policy-editable-badge" style="font-size: 0.75rem; background: var(--color-primary); color: #fff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Configurable Delivery Notice</span>
            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">
              [Delivery timelines and transit estimates can be configured or updated here by the store management as operational parameters expand].
            </p>
          </div>
        </section>

        <!-- SECTION 6: Delivery Areas -->
        <section class="policy-section">
          <h2>6. Delivery Areas</h2>
          <p>
            Glowistic delivers within Pakistan.
          </p>
          <div class="policy-editable-box" style="background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 8px; padding: 16px 20px; margin-top: 14px;">
            <span class="policy-editable-badge" style="font-size: 0.75rem; background: var(--color-primary); color: #fff; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Configurable Coverage</span>
            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">
              [Specific cities, service hubs, and regional destination lists can be updated here by the business owner as needed].
            </p>
          </div>
        </section>

        <!-- SECTION 7: Delivery Charges -->
        <section class="policy-section">
          <h2>7. Delivery Charges</h2>
          <p>
            Delivery charges are calculated and displayed dynamically during checkout based on your order total and configured store rules.
          </p>
          <div style="background: var(--color-cream-light); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px 20px; margin-top: 12px;">
            <p style="margin: 0; font-size: 0.9375rem; color: var(--color-text);">
              🚚 <strong>Configurable Delivery Fee:</strong> You will always see the exact delivery charge displayed in your shopping bag and order summary before confirming your purchase.
            </p>
          </div>
        </section>

        <!-- SECTION 8: Need Help With Your Delivery? -->
        <section class="policy-section">
          <h2>8. Need Help With Your Delivery?</h2>
          <p>
            If you have a question about your order or delivery, contact Glowistic through WhatsApp.
          </p>
          <div style="margin-top: 16px;">
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20about%20my%20delivery." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              💬 Chat on WhatsApp (03445422609)
            </a>
          </div>
        </section>

        <!-- SECTION 9: Order Status & Contact -->
        <section class="policy-section" style="margin-bottom: 36px;">
          <h2>9. Order Status</h2>
          <p>
            For questions about your order, please contact us through WhatsApp and provide your order number.
          </p>
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 20px 24px; margin-top: 14px;">
            <p style="margin: 0 0 10px 0; font-size: 0.9375rem; color: var(--color-text);">
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
            <h3 style="color: var(--color-primary); margin-bottom: 6px; font-size: 1.35rem;">Need help before placing your order?</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin: 0;">
              Our team is ready to answer any questions about our products, delivery, and orders.
            </p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="contact.html" class="btn btn-primary btn-lg">
              Contact Glowistic
            </a>
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20about%20my%20order." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </div>
  </main>
`;

fs.writeFileSync(path.join(__dirname, 'shipping-policy.html'), `${shippingHead}\n<body data-page="shipping-policy">\n${shippingHeader}\n${shippingBody}\n${shippingFooter}`, 'utf8');
console.log('Successfully generated dedicated shipping-policy.html');
