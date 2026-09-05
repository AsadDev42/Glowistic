const fs = require('fs');
const path = require('path');

function getHead(title, desc, canonicalPath = '', schemaObj = null, ogImage = 'assets/brand/logo-burgundy.png') {
  const canonicalUrl = canonicalPath ? `https://www.glowisticpk.com/${canonicalPath}` : 'https://www.glowisticpk.com';
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://www.glowisticpk.com/${ogImage.replace(/^\//, '')}`;
  const schemaMarkup = schemaObj ? `\n  <script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n  </script>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/png" href="assets/brand/favicon.png" />
  <link rel="icon" type="image/svg+xml" href="assets/brand/favicon.svg" />
  <link rel="apple-touch-icon" href="assets/brand/logo-stacked-burgundy.png" />
  
  <!-- Open Graph / Social Sharing -->
  <meta property="og:site_name" content="Glowistic" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${fullOgImage}" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${fullOgImage}" />

  <!-- Performance & Fonts Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />

  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/components.css" />
  <link rel="stylesheet" href="css/cursor.css" />${schemaMarkup}
</head>`;
}

function getHeader(activePage) {
  const announcementSet = `
        <span class="announcement-item">🚚 <strong>Cash on Delivery (COD)</strong> available all across Pakistan</span>
        <span class="announcement-dot" aria-hidden="true"></span>
        <span class="announcement-item">✨ <strong>FREE Delivery</strong> on orders over Rs. 2,500</span>
        <span class="announcement-dot" aria-hidden="true"></span>
        <span class="announcement-item">💬 WhatsApp Order Support: <strong>03445422609</strong></span>
        <span class="announcement-dot" aria-hidden="true"></span>`;

  return `
  <div class="announcement-bar" role="region" aria-label="Store Announcement">
    <div class="announcement-marquee">
      <div class="announcement-marquee-track">
        <div class="announcement-marquee-group">
          ${announcementSet}
          ${announcementSet}
          ${announcementSet}
        </div>
        <div class="announcement-marquee-group" aria-hidden="true">
          ${announcementSet}
          ${announcementSet}
          ${announcementSet}
        </div>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="container header-inner">
      <button type="button" class="mobile-menu-toggle header-icon-btn" aria-label="Open Navigation Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>

      <a href="index.html" class="header-brand" aria-label="Glowistic Home">
        <img src="assets/brand/logo-burgundy.png" alt="Glowistic" class="header-logo" width="160" height="32" />
      </a>

      <nav class="header-nav" aria-label="Main Navigation">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'is-active' : ''}"><span>Home</span></a>
        <a href="shop.html" class="nav-link ${activePage === 'shop' ? 'is-active' : ''}"><span>Shop All</span></a>
        <a href="about.html" class="nav-link ${activePage === 'about' ? 'is-active' : ''}"><span>About Us</span></a>
        <a href="blog.html" class="nav-link ${activePage === 'blog' ? 'is-active' : ''}"><span>Glow Journal</span></a>
        <a href="contact.html" class="nav-link ${activePage === 'contact' ? 'is-active' : ''}"><span>Contact</span></a>
      </nav>

      <div class="header-actions">
        <div class="search-container" id="global-search-container">
          <div class="search-input-wrap">
            <span class="search-icon-inside" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input type="text" id="global-search-input" class="search-input" placeholder="Search catalog..." autocomplete="off" aria-label="Search catalog" />
          </div>
          <div id="search-results-dropdown" class="search-results-dropdown"></div>
        </div>

        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="header-whatsapp-cta" aria-label="WhatsApp Help">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
          <span>WhatsApp Help</span>
        </a>

        <a href="cart.html" class="header-icon-btn cart-toggle-btn" aria-label="Shopping Cart">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="cart-count-badge">0</span>
        </a>
      </div>
    </div>
  </header>

  <div class="mobile-nav-overlay"></div>
  <aside id="mobile-nav-drawer" class="mobile-nav-drawer" aria-label="Mobile Navigation">
    <div class="mobile-nav-header">
      <img src="assets/brand/logo-burgundy.png" alt="Glowistic" class="mobile-nav-logo" width="160" height="34" />
      <button type="button" class="mobile-nav-close" aria-label="Close Mobile Navigation">&times;</button>
    </div>
    <div class="mobile-nav-body">
      <nav class="mobile-nav-links">
        <a href="index.html" class="mobile-nav-link ${activePage === 'home' ? 'is-active' : ''}">Home</a>
        <a href="shop.html" class="mobile-nav-link ${activePage === 'shop' ? 'is-active' : ''}">Shop All</a>
        <a href="about.html" class="mobile-nav-link ${activePage === 'about' ? 'is-active' : ''}">About Us</a>
        <a href="blog.html" class="mobile-nav-link ${activePage === 'blog' ? 'is-active' : ''}">Glow Journal</a>
        <a href="contact.html" class="mobile-nav-link ${activePage === 'contact' ? 'is-active' : ''}">Contact</a>
      </nav>
    </div>
    <div class="mobile-nav-footer">
      <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
        💬 Order via WhatsApp (03445422609)
      </a>
    </div>
  </aside>`;
}

function getFooter() {
  return `
  <!-- Final Glowistic 5-Column Footer -->
  <footer class="site-footer">
    <div class="container footer-container">
      <div class="footer-top-grid">
        <!-- Column 1: Glowistic -->
        <div class="footer-col footer-brand-col">
          <a href="index.html" class="footer-brand-link" aria-label="Glowistic Home">
            <img src="assets/brand/logo-cream.png" alt="Glowistic" class="footer-logo" width="210" height="42" />
          </a>
          <p class="footer-brand-tagline">"Our everyday glow starts here."</p>
          <p class="footer-brand-desc">
            Beauty, skincare, personal care, hair care, and wellness essentials made for everyday routines. Simple choices. Feel-good care. Products you will love using every day.
          </p>
        </div>

        <!-- Column 2: Shop -->
        <div class="footer-col">
          <h4>Shop</h4>
          <ul class="footer-links">
            <li><a href="shop.html">All Products</a></li>
            <li><a href="shop.html?category=skincare">Skincare</a></li>
            <li><a href="shop.html?category=hair-care">Hair Care</a></li>
            <li><a href="shop.html?category=personal-care">Personal Care</a></li>
            <li><a href="shop.html?category=personal-care">Body Care</a></li>
            <li><a href="shop.html?category=wellness-health">Wellness &amp; Health</a></li>
            <li><a href="shop.html?category=supplements">Supplements</a></li>
          </ul>
        </div>

        <!-- Column 3: Explore -->
        <div class="footer-col">
          <h4>Explore</h4>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="blog.html">The Glow Journal</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="index.html#faq-section">FAQs</a></li>
            <li><a href="shop.html">Routine Finder</a></li>
          </ul>
        </div>

        <!-- Column 4: Customer Care -->
        <div class="footer-col">
          <h4>Customer Care</h4>
          <ul class="footer-links">
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="index.html#faq-section">FAQs</a></li>
            <li><a href="shipping-policy.html">Shipping &amp; Delivery</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
          </ul>
        </div>

        <!-- Column 5: Connect -->
        <div class="footer-col footer-col-connect">
          <h4>Connect</h4>
          <p class="footer-connect-intro">Reach our beauty &amp; wellness concierge anytime on official channels.</p>
          <div class="footer-connect-list">
            <!-- WhatsApp -->
            <div class="footer-connect-row">
              <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20an%20inquiry%20about%20my%20order." target="_blank" rel="noopener noreferrer" class="connect-icon-badge" aria-label="WhatsApp Concierge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              <div class="connect-text-group">
                <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20an%20inquiry%20about%20my%20order." target="_blank" rel="noopener noreferrer" class="connect-primary-link">
                  WhatsApp Concierge
                </a>
                <a href="tel:03445422609" class="connect-secondary-link" aria-label="Call 03445422609">
                  03445422609
                </a>
              </div>
            </div>

            <!-- Instagram -->
            <a href="https://www.instagram.com/glowisticpk/?hl=en" target="_blank" rel="noopener noreferrer" class="footer-connect-row" aria-label="Instagram @glowistickpk">
              <span class="connect-icon-badge" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </span>
              <div class="connect-text-group">
                <span class="connect-primary-text">@glowistickpk</span>
              </div>
            </a>

            <!-- Facebook -->
            <a href="https://www.facebook.com/glowisticpk.store/" target="_blank" rel="noopener noreferrer" class="footer-connect-row" aria-label="Facebook Glowistic Official">
              <span class="connect-icon-badge" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
              <div class="connect-text-group">
                <span class="connect-primary-text">Glowistic Official</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div class="footer-bottom-inner">
          <p class="copyright-text">&copy; 2026 Glowistic. All rights reserved.</p>
          <div class="footer-bottom-badges">
            <span class="badge-cod-footer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Cash on Delivery Active</span>
            </span>
            <span class="badge-card-disabled">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Card Payments Coming Soon</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Helpline Button -->
  <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." 
     class="floating-whatsapp-btn" 
     target="_blank" 
     rel="noopener noreferrer" 
     aria-label="Chat with Glowistic on WhatsApp" 
     title="Chat with Glowistic on WhatsApp">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/>
    </svg>
    <span class="floating-whatsapp-tooltip">Chat with us</span>
  </a>

  <!-- Slide-out Cart Drawer -->
  <div class="cart-overlay" id="cart-overlay"></div>
  <aside class="cart-drawer" id="cart-drawer" aria-label="Shopping Cart Drawer">
    <div class="cart-drawer-header">
      <h3>Your Glowistic Bag</h3>
      <button type="button" class="cart-close-btn" aria-label="Close Shopping Bag">&times;</button>
    </div>

    <div class="cart-free-shipping-box">
      <div class="free-shipping-text" id="free-delivery-text">
        Add Rs. 2,500 for <strong>FREE Delivery</strong>!
      </div>
      <div class="free-shipping-progress-bg">
        <div class="free-shipping-progress-bar" id="free-delivery-progress" style="width: 0%;"></div>
      </div>
    </div>

    <div class="cart-drawer-items" id="cart-drawer-items">
      <!-- Items dynamically populated by js/app.js -->
    </div>

    <div class="cart-drawer-empty" id="cart-drawer-empty" style="display: none;">
      <div class="empty-cart-icon">🛍️</div>
      <h4>Your bag is currently empty</h4>
      <p>Discover our clean, practical essentials for your daily routine.</p>
      <a href="shop.html" class="btn btn-primary btn-sm">Explore Products</a>
    </div>

    <div class="cart-drawer-footer" id="cart-drawer-footer">
      <div class="cart-summary-line">
        <span>Subtotal:</span>
        <strong id="cart-drawer-subtotal">Rs. 0</strong>
      </div>
      <div class="cart-summary-line">
        <span>Delivery (Cash on Delivery):</span>
        <span id="cart-drawer-delivery">Rs. 200</span>
      </div>
      <div class="cart-summary-line grand">
        <span>Total:</span>
        <strong id="cart-drawer-total">Rs. 0</strong>
      </div>
      <div class="cart-drawer-actions">
        <a href="checkout.html" class="btn btn-primary btn-block btn-lg">Proceed to Checkout &rarr;</a>
        <a href="cart.html" class="btn btn-outline btn-block btn-sm">View Full Bag</a>
        <a href="#" id="cart-drawer-whatsapp-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block btn-sm">
          Order via WhatsApp (03445422609)
        </a>
      </div>
    </div>
  </aside>

  <!-- Card Payments Modal -->
  <div class="modal-overlay" id="card-payments-modal" style="display: none; position: fixed; inset: 0; background: rgba(80, 15, 23, 0.45); backdrop-filter: blur(4px); z-index: 100000; align-items: center; justify-content: center; padding: 20px;">
    <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; max-width: 440px; width: 100%; padding: 32px 24px; text-align: center; box-shadow: var(--shadow-xl); position: relative;">
      <button type="button" class="modal-close-btn" id="close-card-modal-btn" style="position: absolute; top: 14px; right: 14px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
      <div style="width: 56px; height: 56px; border-radius: 50%; background: #FDF2E9; color: #D35400; font-size: 1.6rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">🔒</div>
      <h3 style="font-family: var(--font-heading); color: var(--color-primary); font-size: 1.35rem; margin-bottom: 10px;">Card Payments Coming Soon</h3>
      <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.6; margin-bottom: 24px;">
        We're working on secure online card payments.<br/>
        For now, you can place your order using Cash on Delivery or contact us on WhatsApp.
      </p>
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20an%20inquiry%20about%20ordering%20and%20payments." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
          💬 Chat on WhatsApp
        </a>
        <button type="button" class="btn btn-outline btn-sm" id="dismiss-card-modal-btn">Close</button>
      </div>
    </div>
  </div>

  <!-- Subtle Circular Cursor Elements -->
  <div class="glowistic-cursor-dot" id="cursor-dot"></div>
  <div class="glowistic-cursor-ring" id="cursor-ring"></div>

  <!-- Scripts -->
  <script type="module" src="js/app.js"></script>
</body>
</html>`;
}

module.exports = {
  getHead,
  getHeader,
  getFooter
};
