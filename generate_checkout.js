const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const head = getHead(
  "Complete Your Order — Cash on Delivery | Glowistic",
  "Secure Cash on Delivery checkout for authentic Glowistic skincare, hair care, and wellness essentials.",
  "checkout.html",
  {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Complete Your Order — Cash on Delivery | Glowistic",
  "url": "https://www.glowisticpk.com/checkout.html"
}
);

const header = getHeader('checkout');
const footer = getFooter();

const body = `
  <main class="checkout-section" style="padding: 40px 0 80px; background-color: var(--color-bg);">
    <div class="container">
      <div class="product-breadcrumb" style="margin-bottom: 20px;">
        <a href="index.html">Home</a> &sol; <a href="cart.html">Bag</a> &sol; <span>Checkout</span>
      </div>

      <h1 style="font-size: 2.25rem; color: var(--color-primary); margin-bottom: 8px;">Complete Your Order</h1>
      <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin-bottom: 32px;">
        Fast nationwide delivery. Pay cash upon arrival at your doorstep.
      </p>

      <div class="checkout-grid">
        <!-- Form Column -->
        <div class="checkout-form-col">
          <form id="glowistic-checkout-form">
            <!-- 1. Customer Details -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <span class="step-num">1</span>
                <h3>Customer Details</h3>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-name">Full Name <span>*</span></label>
                  <input type="text" id="checkout-name" name="fullName" class="form-control" placeholder="Ayesha Khan" required />
                </div>
                <div class="form-group">
                  <label for="checkout-phone">Mobile / WhatsApp Number <span>*</span></label>
                  <input type="tel" id="checkout-phone" name="phone" class="form-control" placeholder="03445422609" pattern="[0-9]{11}" title="Please enter an 11-digit Pakistani phone number (e.g. 03445422609)" required />
                </div>
              </div>

              <div class="form-group">
                <label for="checkout-email">Email Address <span>*</span></label>
                <input type="email" id="checkout-email" name="email" class="form-control" placeholder="name@example.com" required />
              </div>
            </div>

            <!-- 2. Delivery Address -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <span class="step-num">2</span>
                <h3>Delivery Address (Pakistan)</h3>
              </div>

              <div class="form-group">
                <label for="checkout-address">Complete Address <span>*</span></label>
                <input type="text" id="checkout-address" name="address" class="form-control" placeholder="House / Flat #, Street, Sector / Area" required />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-city">City <span>*</span></label>
                  <input type="text" id="checkout-city" name="city" list="pakistan-cities-list" class="form-control" placeholder="Select or type city" required />
                  <datalist id="pakistan-cities-list"></datalist>
                </div>
                <div class="form-group">
                  <label for="checkout-province">Province <span>*</span></label>
                  <select id="checkout-province" name="province" class="form-control" required>
                    <option value="" disabled selected>Select Province</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-postal">Postal Code <span>*</span></label>
                  <input type="text" id="checkout-postal" name="postalCode" class="form-control" placeholder="44000" required />
                </div>
                <div class="form-group">
                  <label for="checkout-notes">Order Notes <small class="text-muted">(Optional)</small></label>
                  <input type="text" id="checkout-notes" name="orderNotes" class="form-control" placeholder="e.g. Near City Hospital / Leave at gate" />
                </div>
              </div>
            </div>

            <!-- 3. Payment Method -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <span class="step-num">3</span>
                <h3>Payment Method</h3>
              </div>

              <div class="payment-options-grid">
                <!-- COD Active Option -->
                <label class="payment-method-card is-selected">
                  <input type="radio" name="paymentMethod" value="cod" checked class="payment-radio" />
                  <div class="payment-meta">
                    <div class="payment-title-row">
                      <strong>Cash on Delivery (COD)</strong>
                      <span class="badge-cod-active">Active</span>
                    </div>
                    <p class="payment-desc">Pay when your order arrives. Standard nationwide dispatch in 2 to 4 business days.</p>
                  </div>
                </label>

                <!-- Disabled Card Option -->
                <div class="payment-method-card is-disabled">
                  <input type="radio" name="paymentMethod" value="card" disabled class="payment-radio" />
                  <div class="payment-meta">
                    <div class="payment-title-row">
                      <strong>Card Payment</strong>
                      <span class="payment-badge-coming-soon">Coming Soon</span>
                    </div>
                    <p class="payment-desc">Online card payments are currently integrating. Please select Cash on Delivery or contact WhatsApp for assistance.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirmation Terms Checkbox -->
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 0.875rem; color: var(--color-text);">
                <input type="checkbox" id="checkout-terms-checkbox" required style="accent-color: var(--color-primary); margin-top: 3px; width: 16px; height: 16px;" />
                <span>I confirm that the delivery information provided is correct.</span>
              </label>
            </div>

            <!-- Submit Button & State -->
            <button type="submit" id="checkout-submit-btn" class="btn btn-primary btn-block btn-lg">
              Place COD Order
            </button>
            <div id="checkout-loading-msg" style="display: none; text-align: center; margin-top: 12px; font-weight: 600; color: var(--color-primary);">
              ⏳ Placing your order...
            </div>
            <p style="text-align: center; font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 12px;">
              🛡️ Safe &amp; verified. No upfront payment required.
            </p>
          </form>
        </div>

        <!-- Summary Column -->
        <div class="checkout-summary-col">
          <div class="checkout-card" style="position: sticky; top: 100px;">
            <h3 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 18px; padding-bottom: 10px; border-bottom: 1px solid var(--color-border);">
              Order Summary
            </h3>
            <div id="checkout-order-summary"></div>
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--color-border); font-size: 0.8125rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 8px;">
              <div>🚚 <strong>Fast Dispatch:</strong> Dispatched in 24 hours</div>
              <div>💬 <strong>WhatsApp Helpline:</strong> 03445422609</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
`;

const finalHtml = `${head}\n<body data-page="checkout">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'checkout.html'), finalHtml, 'utf8');
console.log('Successfully generated checkout.html');
