const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const head = getHead(
  "Product Details — Glowistic Official Store",
  "Authentic beauty, skincare, and personal care products for daily routines in Pakistan.",
  "product.html",
  {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Glowistic Everyday Essentials",
  "url": "https://www.glowisticpk.com/product.html"
}
);

const header = getHeader('product');
const footer = getFooter();

const body = `
  <!-- Product Detail Container -->
  <main class="container" id="product-detail-container" style="padding-top: 36px; padding-bottom: 60px;">
    <h1 class="sr-only">Product Details — Glowistic</h1>
    <!-- Injected dynamically by js/app.js -->
  </main>

  <!-- Complete Your Routine (Related Products) -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Complete Your Routine</span>
        <h2 class="section-title">Complementary Routine Essentials</h2>
        <p class="section-desc">Carefully selected formulations that work harmoniously with your choice.</p>
      </div>
      <div id="product-related-grid" class="products-grid"></div>
    </div>
  </section>

  <!-- Sticky Mobile Purchase Bar -->
  <div id="mobile-sticky-bar" class="mobile-sticky-bar">
    <div class="sticky-bar-info">
      <strong id="sticky-bar-price" style="color: var(--color-primary); font-size: 1.125rem;">Rs. 0</strong>
      <span id="sticky-bar-title" style="font-size: 0.75rem; color: var(--color-text-muted); display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px;">Product Name</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button type="button" id="sticky-bar-add-btn" class="btn btn-primary btn-sm">Add to Cart</button>
      <a href="#" id="sticky-bar-whatsapp-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="WhatsApp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
      </a>
    </div>
  </div>
`;

const finalHtml = `${head}\n<body data-page="product">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'product.html'), finalHtml, 'utf8');
console.log('Successfully generated product.html');
