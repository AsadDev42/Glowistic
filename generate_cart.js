const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const head = getHead(
  "Your Glowistic Bag — Shopping Cart",
  "Review your selected Glowistic essentials with Cash on Delivery across Pakistan.",
  "cart.html",
  {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Your Glowistic Bag — Shopping Cart",
  "url": "https://www.glowisticpk.com/cart.html"
}
);

const header = getHeader('cart');
const footer = getFooter();

const body = `
  <!-- Cart Main Section -->
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 70vh;">
    <div class="container">
      <div class="product-breadcrumb" style="margin-bottom: 20px;">
        <a href="index.html">Home</a> &sol; <span>Your Bag</span>
      </div>

      <h1 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 24px;">Your Glowistic Bag</h1>

      <!-- Free Shipping Tracker -->
      <div class="cart-free-shipping-box" style="margin-bottom: 32px; border-radius: 10px;">
        <div class="free-shipping-text" id="cart-page-free-text">
          Add Rs. 2,500 for <strong>FREE Delivery</strong>!
        </div>
        <div class="free-shipping-progress-bg">
          <div class="free-shipping-progress-bar" id="cart-page-progress" style="width: 0%;"></div>
        </div>
      </div>

      <!-- Main Cart Grid -->
      <div id="cart-page-grid" style="display: grid; grid-template-columns: 1fr 380px; gap: 36px; align-items: flex-start;">
        <!-- Left Column: Items List -->
        <div id="cart-page-items-container">
          <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <div id="cart-page-items-list">
              <!-- Rendered dynamically by js/app.js -->
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary Card -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 28px; box-shadow: var(--shadow-sm); position: sticky; top: 100px;">
          <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
            Order Summary
          </h3>

          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9375rem; color: var(--color-text);">
            <span>Subtotal:</span>
            <strong id="cart-page-subtotal" style="color: var(--color-primary);">Rs. 0</strong>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 0.9375rem; color: var(--color-text);">
            <span>Delivery (COD):</span>
            <span id="cart-page-delivery">Rs. 250</span>
          </div>

          <div style="display: flex; justify-content: space-between; padding-top: 16px; border-top: 2px dashed var(--color-border); margin-bottom: 24px; font-size: 1.15rem; color: var(--color-primary);">
            <strong>Estimated Total:</strong>
            <strong id="cart-page-total" style="font-size: 1.35rem;">Rs. 0</strong>
          </div>

          <!-- Trust Badges -->
          <div style="background: var(--color-bg); border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text);">
              <span>💵</span> <strong>Cash on Delivery (COD) Available</strong>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text-muted);">
              <span>🔒</span> <span>Card Payments Coming Soon</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <a href="checkout.html" class="btn btn-primary btn-block btn-lg">Proceed to Checkout</a>
            <a href="shop.html" class="btn btn-outline btn-block">Continue Shopping</a>
            <a href="#" id="cart-page-whatsapp-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
              💬 Instant Order on WhatsApp
            </a>
          </div>

          <div style="margin-top: 20px; text-align: center; font-size: 0.8125rem; color: var(--color-text-muted);">
            Need help with your order? <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20need%20help%20with%20my%20order." id="cart-page-chat-help-btn" target="_blank" rel="noopener noreferrer" style="color: #15803D; font-weight: 600; text-decoration: underline;">Chat on WhatsApp</a>
          </div>
        </div>
      </div>

      <!-- Empty State View (Initially Hidden) -->
      <div id="cart-page-empty-view" style="display: none; text-align: center; padding: 80px 20px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px;">
        <div style="font-size: 4rem; margin-bottom: 16px;">🛍️</div>
        <h2 style="font-size: 1.75rem; color: var(--color-primary); margin-bottom: 8px;">Your bag is waiting for a little glow.</h2>
        <p style="color: var(--color-text-muted); font-size: 1rem; max-width: 480px; margin: 0 auto 28px;">
          Explore our everyday beauty, skincare, and family wellness essentials to build your feel-good routine.
        </p>
        <a href="shop.html" class="btn btn-primary btn-lg">Explore Products &rarr;</a>
      </div>
    </div>
  </main>
`;

const finalHtml = `${head}\n<body data-page="cart">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'cart.html'), finalHtml, 'utf8');
console.log('Successfully generated cart.html');

