const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

console.log('=== BUILDING ALL 14 GLOWISTIC PAGES WITH FULL SEO & SCHEMA ===');

// 1. HOME PAGE (index.html)
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.glowisticpk.com/#organization",
      "name": "Glowistic",
      "url": "https://www.glowisticpk.com",
      "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg",
      "description": "Beauty, skincare, personal care, hair care, and wellness essentials made for everyday routines in Pakistan.",
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

// Re-generate generate_home.js
require('./generate_home.js');

// Now let's update generate_shop.js
const shopSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Shop All Products — Glowistic Official Store",
  "description": "Browse Glowistic beauty, skincare, hair care, personal care, and wellness essentials. Cash on Delivery across Pakistan.",
  "url": "https://www.glowisticpk.com/shop.html"
};
const shopHead = getHead(
  'Shop All Products — Glowistic Official Store',
  'Browse Glowistic beauty, skincare, hair care, personal care, and wellness essentials. Cash on Delivery across Pakistan.',
  'shop.html',
  shopSchema,
  'assets/products/oclear-serum.jpg'
);
const shopHeader = getHeader('shop');
const shopFooter = getFooter();
const shopBody = `
  <!-- Shop Banner -->
  <section style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border); padding: 48px 0 36px;">
    <div class="container">
      <div class="product-breadcrumb">
        <a href="index.html">Home</a> &sol; <span>Shop Catalog</span>
      </div>
      <h1 style="font-size: 2.75rem; color: var(--color-primary); margin-bottom: 8px;">Shop Glowistic</h1>
      <p style="color: var(--color-text-muted); font-size: 1.0625rem; max-width: 680px; line-height: 1.6;">
        Explore beauty, skincare, personal care, hair care and wellness essentials for your everyday routine.
      </p>

      <!-- Trust info strips -->
      <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--color-border-light);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">
          <span>🚚</span> <span>Cash on Delivery (COD) across Pakistan</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">
          <span>✨</span> <span>Free Delivery over Rs. 2,500</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">
          <span>🛡️</span> <span>100% Authentic Verified Formulations</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Shop Main Content Area -->
  <main class="section-padding" style="background-color: var(--color-bg);">
    <div class="container">
      <!-- Search & Category Filters Bar -->
      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px;">
        <div style="position: relative; max-width: 540px; width: 100%;">
          <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--color-text-light);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
          <input type="text" id="shop-search-input" class="search-input" placeholder="Search by product name, category, or active ingredient..." style="font-size: 0.9375rem; padding-left: 42px; width: 100%;" aria-label="Search catalog" />
        </div>

        <div class="catalog-filter-bar">
          <div class="category-tabs" role="tablist">
            <button type="button" class="category-tab-btn is-active" data-category-filter="all">All Products</button>
            <button type="button" class="category-tab-btn" data-category-filter="skincare">Skincare</button>
            <button type="button" class="category-tab-btn" data-category-filter="haircare">Hair Care</button>
            <button type="button" class="category-tab-btn" data-category-filter="wellness">Wellness &amp; Health</button>
            <button type="button" class="category-tab-btn" data-category-filter="bodycare">Body Care</button>
          </div>

          <div style="display: flex; align-items: center; gap: 16px; margin-left: auto; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem;">
              <label for="shop-price-range" style="color: var(--color-text-muted); font-weight: 500;">Max Price:</label>
              <input type="range" id="shop-price-range" min="650" max="5000" step="50" value="5000" style="width: 110px; accent-color: var(--color-primary);" />
              <span id="price-val-display" style="font-weight: 700; color: var(--color-primary); min-width: 65px;">Rs. 5,000</span>
            </div>

            <div class="sort-dropdown-wrap">
              <label for="shop-sort-select" style="font-size: 0.875rem; color: var(--color-text-muted);">Sort:</label>
              <select id="shop-sort-select" class="sort-select">
                <option value="featured">Featured Essentials</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <span id="shop-results-count" style="font-size: 0.875rem; color: var(--color-text-muted); font-weight: 600;">Showing 9 products</span>
        <span class="badge-cod-active">✓ Cash on Delivery Available</span>
      </div>

      <!-- Products Grid (Populated via js/app.js) -->
      <div id="shop-products-grid" class="products-grid"></div>
    </div>
  </main>
`;
fs.writeFileSync(path.join(__dirname, 'shop.html'), `${shopHead}\n<body data-page="shop">\n${shopHeader}\n${shopBody}\n${shopFooter}`, 'utf8');
console.log('Created shop.html');

// 3. PRODUCT DETAIL (product.html)
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Glowistic Everyday Essentials",
  "description": "Verified beauty, skincare, and wellness products with Cash on Delivery across Pakistan.",
  "brand": {
    "@type": "Brand",
    "name": "Glowistic"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "PKR",
    "lowPrice": "650",
    "highPrice": "2850",
    "offerCount": "9",
    "availability": "https://schema.org/InStock"
  }
};
const productHead = getHead(
  'Product Details — Glowistic Official Store',
  'View factual ingredients, authentic packaging, directions for use, and customer care details. Cash on Delivery across Pakistan.',
  'product.html',
  productSchema,
  'assets/products/oclear-serum.jpg'
);
const productHeader = getHeader('product');
const productFooter = getFooter();
const productBody = `
  <!-- Product Detail Container -->
  <main class="container" id="product-detail-container" style="padding-top: 36px; padding-bottom: 60px;">
    <h1 class="product-page-title" style="display:none;">Glowistic Everyday Essentials</h1>
  </main>

  <!-- Complete Your Routine (Related Products) -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Complete Your Routine</span>
        <h2 class="section-title">Frequently Bought Together</h2>
        <p class="section-desc">Synergistic formulations that work harmoniously with your selection.</p>
      </div>
      <div id="product-related-grid" class="products-grid"></div>
    </div>
  </section>
`;
fs.writeFileSync(path.join(__dirname, 'product.html'), `${productHead}\n<body data-page="product">\n${productHeader}\n${productBody}\n${productFooter}`, 'utf8');
console.log('Created product.html');

// 4. CART (cart.html)
const cartSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Your Glowistic Bag — Shopping Cart",
  "url": "https://www.glowisticpk.com/cart.html"
};
const cartHead = getHead(
  'Your Glowistic Bag — Shopping Cart',
  'Review your Glowistic products, calculate free delivery, and proceed to Cash on Delivery checkout.',
  'cart.html',
  cartSchema
);
const cartHeader = getHeader('cart');
const cartFooter = getFooter();
const cartBody = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 70vh;">
    <div class="container">
      <div class="product-breadcrumb" style="margin-bottom: 24px;">
        <a href="index.html">Home</a> &sol; <a href="shop.html">Shop</a> &sol; <span>Shopping Bag</span>
      </div>

      <div class="cart-page-header" style="margin-bottom: 32px;">
        <h1 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 6px;">Your Glowistic Bag</h1>
        <p style="color: var(--color-text-muted); font-size: 1rem;">Simple choices, feel-good routines. Review your everyday essentials below.</p>
      </div>

      <div class="cart-page-layout" id="cart-page-wrapper">
        <div class="cart-page-items-col">
          <div class="cart-free-shipping-card" style="background: var(--color-cream); border: 1px solid var(--color-border); border-radius: 8px; padding: 18px 24px; margin-bottom: 24px;">
            <div id="cart-page-free-shipping-text" style="font-size: 0.9375rem; font-weight: 600; color: var(--color-primary); margin-bottom: 8px;">
              Add Rs. 2,500 for <strong>FREE Delivery across Pakistan</strong>!
            </div>
            <div class="free-shipping-progress-bg" style="height: 8px; background: rgba(80, 15, 23, 0.1);">
              <div class="free-shipping-progress-bar" id="cart-page-free-shipping-bar" style="width: 0%; height: 100%; background: var(--color-gold);"></div>
            </div>
          </div>

          <div class="cart-page-items-list" id="cart-page-items-container"></div>
        </div>

        <div class="cart-page-summary-col">
          <div class="cart-summary-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 10px; padding: 28px; box-shadow: var(--shadow-sm); position: sticky; top: 100px;">
            <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">Order Summary</h3>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9375rem; color: var(--color-text-muted);">
              <span>Subtotal:</span>
              <strong id="cart-page-subtotal" style="color: var(--color-text);">Rs. 0</strong>
            </div>

            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9375rem; color: var(--color-text-muted);">
              <span>Delivery (Cash on Delivery):</span>
              <span id="cart-page-delivery">Rs. 250</span>
            </div>

            <div style="display: flex; justify-content: space-between; padding-top: 14px; margin-top: 14px; border-top: 2px solid var(--color-border); font-size: 1.25rem; font-weight: 700; color: var(--color-primary); margin-bottom: 24px;">
              <span>Total (PKR):</span>
              <span id="cart-page-total">Rs. 0</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              <a href="checkout.html" class="btn btn-primary btn-block btn-lg" id="cart-page-checkout-btn">
                Proceed to Checkout &rarr;
              </a>
              <a href="#" id="cart-page-wa-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
                💬 Quick Order via WhatsApp
              </a>
              <a href="shop.html" class="btn btn-ghost btn-block btn-sm">
                &larr; Continue Shopping
              </a>
            </div>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--color-border-light); font-size: 0.8125rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 6px;">
              <div>✓ <strong>Cash on Delivery:</strong> Pay when your parcel arrives</div>
              <div>🚚 <strong>Fast Courier:</strong> 2 to 4 business days nationwide</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
`;
fs.writeFileSync(path.join(__dirname, 'cart.html'), `${cartHead}\n<body data-page="cart">\n${cartHeader}\n${cartBody}\n${cartFooter}`, 'utf8');
console.log('Created cart.html');

// 5. CHECKOUT (checkout.html)
const checkoutSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Complete Your Order — Cash on Delivery | Glowistic",
  "url": "https://www.glowisticpk.com/checkout.html"
};
const checkoutHead = getHead(
  'Complete Your Order — Cash on Delivery | Glowistic',
  'Fast, simple Cash on Delivery (COD) checkout for shoppers in Pakistan. Pay when your Glowistic parcel arrives.',
  'checkout.html',
  checkoutSchema
);
const checkoutHeader = getHeader('checkout');
const checkoutFooter = getFooter();
const checkoutBody = `
  <main class="checkout-section" style="background-color: var(--color-bg);">
    <div class="container">
      <div class="product-breadcrumb" style="margin-bottom: 20px;">
        <a href="index.html">Home</a> &sol; <a href="cart.html">Bag</a> &sol; <span>Checkout</span>
      </div>

      <div id="checkout-main-wrapper">
        <h1 style="font-size: 2.25rem; color: var(--color-primary); margin-bottom: 8px;">Complete Your Order</h1>
        <p style="color: var(--color-text-muted); font-size: 1rem; margin-bottom: 32px;">
          Fast, mobile-optimized checkout. Pay easily with exact cash upon delivery at your doorstep anywhere in Pakistan.
        </p>

        <form id="glowistic-checkout-form" class="checkout-grid" novalidate>
          <div class="checkout-form-col">
            <div class="checkout-card">
              <div class="checkout-card-header">
                <span class="step-num">1</span>
                <h3>Customer &amp; Delivery Details</h3>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-name">Full Name <span>*</span></label>
                  <input type="text" id="checkout-name" name="fullName" class="form-control" placeholder="Ayesha Khan" required />
                </div>
                <div class="form-group">
                  <label for="checkout-phone">Mobile Phone (11 Digits) <span>*</span></label>
                  <input type="tel" id="checkout-phone" name="phone" class="form-control" placeholder="03445422609" pattern="[0-9]{11}" title="Please enter an 11-digit Pakistani phone number (e.g. 03445422609)" required />
                </div>
              </div>

              <div class="form-group">
                <label for="checkout-email">Email Address <span>*</span></label>
                <input type="email" id="checkout-email" name="email" class="form-control" placeholder="name@example.com" required />
                <small style="color: var(--color-text-muted); font-size: 0.75rem;">Your order receipt and tracking updates will be sent here.</small>
              </div>

              <div class="form-group">
                <label for="checkout-address">Complete Street Address <span>*</span></label>
                <input type="text" id="checkout-address" name="address" class="form-control" placeholder="House / Flat #, Street, Sector / Area" required />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-city">City <span>*</span></label>
                  <input type="text" id="checkout-city" name="city" list="pakistan-cities-list" class="form-control" placeholder="Select or type city" required />
                  <datalist id="pakistan-cities-list"></datalist>
                </div>

                <div class="form-group">
                  <label for="checkout-province">Province / Region <span>*</span></label>
                  <select id="checkout-province" name="province" class="form-control" required>
                    <option value="">Select Province</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-postal">Postal / ZIP Code <span>*</span></label>
                  <input type="text" id="checkout-postal" name="postalCode" class="form-control" placeholder="44000" required />
                </div>
                <div class="form-group">
                  <label for="checkout-notes">Order Notes (Optional)</label>
                  <input type="text" id="checkout-notes" name="orderNotes" class="form-control" placeholder="e.g. Near City Hospital / Leave at gate" />
                </div>
              </div>
            </div>

            <div class="checkout-card">
              <div class="checkout-card-header">
                <span class="step-num">2</span>
                <h3>Payment Method</h3>
              </div>

              <div class="payment-options-grid">
                <label class="payment-method-card is-selected">
                  <input type="radio" name="paymentMethod" value="cod" checked class="payment-radio" />
                  <div class="payment-meta">
                    <div class="payment-title-row">
                      <strong>Cash on Delivery (COD)</strong>
                      <span class="badge badge-green">Recommended</span>
                    </div>
                    <p class="payment-desc">Pay with exact cash when your parcel arrives at your doorstep.</p>
                  </div>
                </label>

                <div class="payment-method-card is-disabled" aria-disabled="true">
                  <input type="radio" name="paymentMethod" value="card" disabled class="payment-radio" />
                  <div class="payment-meta">
                    <div class="payment-title-row">
                      <strong style="color: var(--color-text-muted);">Debit / Credit Card Payment</strong>
                      <span class="payment-badge-coming-soon">Coming Soon</span>
                    </div>
                    <p class="payment-desc">Online card processing is currently being integrated for verified accounts.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="checkout-card" style="padding: 20px 24px;">
              <label style="display: flex; align-items: flex-start; gap: 12px; cursor: pointer;">
                <input type="checkbox" id="checkout-terms" required style="margin-top: 4px; accent-color: var(--color-primary); width: 18px; height: 18px;" />
                <span style="font-size: 0.875rem; color: var(--color-text); line-height: 1.4;">
                  I confirm that the delivery information provided is correct and agree to pay via Cash on Delivery upon parcel handover.
                </span>
              </label>
            </div>
          </div>

          <div class="checkout-summary-col">
            <div class="checkout-card" style="position: sticky; top: 100px;">
              <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
                Order Summary
              </h3>

              <div id="checkout-order-summary"></div>

              <button type="submit" id="checkout-submit-btn" class="btn btn-primary btn-block btn-lg" style="margin-top: 20px;">
                Place COD Order &rarr;
              </button>

              <div style="margin-top: 16px; text-align: center;">
                <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20need%20help%20completing%20my%20order." target="_blank" rel="noopener noreferrer" style="font-size: 0.8125rem; color: var(--color-primary); font-weight: 600;">
                  💬 Need help? Order with assistance on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div id="checkout-confirmation-view" style="display: none;"></div>
    </div>
  </main>
`;
fs.writeFileSync(path.join(__dirname, 'checkout.html'), `${checkoutHead}\n<body data-page="checkout">\n${checkoutHeader}\n${checkoutBody}\n${checkoutFooter}`, 'utf8');
console.log('Created checkout.html');

// 6. CONFIRMATION (confirmation.html)
const confirmationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Thank You for Choosing Glowistic — Order Received",
  "url": "https://www.glowisticpk.com/confirmation.html"
};
const confirmationHead = getHead(
  'Thank You for Choosing Glowistic — Order Received',
  'Your Glowistic order has been received and is being prepared for Cash on Delivery dispatch across Pakistan.',
  'confirmation.html',
  confirmationSchema
);
const confirmationHeader = getHeader('confirmation');
const confirmationFooter = getFooter();
const confirmationBody = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh;">
    <div class="container container-narrow">
      <div id="confirmation-content-box" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 48px; box-shadow: var(--shadow-md); text-align: center;">
        <div style="width: 64px; height: 64px; background: #EBF7EE; color: var(--color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px;">
          ✓
        </div>
        <h1 style="font-size: 2.25rem; color: var(--color-primary); margin-bottom: 8px;">
          Thank You for Choosing Glowistic.
        </h1>
        <p style="font-size: 1.125rem; color: var(--color-text); margin-bottom: 24px;">
          Your order has been received.
        </p>

        <div style="background: var(--color-bg); border-radius: 8px; padding: 16px 20px; display: inline-block; margin-bottom: 32px;">
          <span style="font-size: 0.875rem; color: var(--color-text-muted);">Order Reference Number:</span>
          <strong id="confirm-order-id" style="display: block; font-size: 1.35rem; color: var(--color-primary); letter-spacing: 0.05em; margin-top: 4px;">GLW-2026-XXXX</strong>
        </div>

        <div id="confirm-details-container" style="text-align: left; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 24px 0; margin-bottom: 32px;">
          <!-- Injected dynamically by js/app.js -->
        </div>

        <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 32px;">
          Your order will be processed and delivered using the details you provided.
        </p>

        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="shop.html" class="btn btn-primary btn-lg">Continue Shopping</a>
          <a href="#" id="confirm-whatsapp-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
            Chat with Glowistic on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </main>
`;
fs.writeFileSync(path.join(__dirname, 'confirmation.html'), `${confirmationHead}\n<body data-page="confirmation">\n${confirmationHeader}\n${confirmationBody}\n${confirmationFooter}`, 'utf8');
console.log('Created confirmation.html');

// 7. ABOUT US (about.html)
require('./generate_about.js');

// 8. BLOG (blog.html)
require('./generate_blog.js');

// 9. ARTICLE (article.html)
require('./generate_article.js');

// 10. CONTACT (contact.html)
require('./generate_contact.js');

// 11. POLICIES (shipping, refund, privacy, terms)
require('./generate_policies.js');

console.log('ALL 14 HTML PAGES REBUILT SUCCESSFULLY!');

