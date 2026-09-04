const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const head = getHead(
  "Shop All Products — Glowistic Official Store",
  "Discover Glowistic beauty, skincare, personal care, hair care, and wellness essentials with Cash on Delivery nationwide.",
  "shop.html",
  {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Shop All Products — Glowistic Official Store",
  "url": "https://www.glowisticpk.com/shop.html"
}
);

const header = getHeader('shop');
const footer = getFooter();

const body = `
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
      <div style="display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap;">
        <span class="badge badge-burgundy">✓ Cash on Delivery Available</span>
        <span class="badge badge-gold">✨ FREE Delivery Over Rs. 2,500</span>
        <span class="badge badge-cream">🔒 Card Payments Coming Soon</span>
      </div>
    </div>
  </section>

  <!-- Shop Main -->
  <main class="section-padding">
    <div class="container">
      <!-- Search & Filter Controls -->
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: var(--shadow-sm);">
        <!-- Prominent Search Bar -->
        <div style="margin-bottom: 20px;">
          <div class="search-input-wrap" style="max-width: 100%;">
            <span class="search-icon-inside">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input type="text" id="shop-search-input" class="search-input" placeholder="Search by product name, category, or active ingredient (e.g. Salicylic, Rosemary, Neem)..." style="font-size: 0.9375rem; padding-left: 42px;" />
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <!-- Category Tabs -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="shop-category-tabs">
            <button type="button" class="btn btn-outline btn-sm is-active" data-category-filter="all">All</button>
            <button type="button" class="btn btn-outline btn-sm" data-category-filter="skincare">Skincare</button>
            <button type="button" class="btn btn-outline btn-sm" data-category-filter="haircare">Hair Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-category-filter="personalcare">Personal Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-category-filter="bodycare">Body Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-category-filter="wellness">Wellness</button>
            <button type="button" class="btn btn-outline btn-sm" data-category-filter="supplements">Supplements</button>
          </div>

          <!-- Price, Availability & Sort -->
          <div style="display: flex; align-items: center; gap: 18px; flex-wrap: wrap;">
            <!-- Availability Filter -->
            <label style="display: flex; align-items: center; gap: 6px; font-size: 0.875rem; cursor: pointer; color: var(--color-text); user-select: none;">
              <input type="checkbox" id="shop-stock-only" style="accent-color: var(--color-primary); width: 15px; height: 15px; cursor: pointer;" />
              <span>In Stock Only</span>
            </label>

            <!-- Price Range -->
            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem;">
              <span>Max Price:</span>
              <input type="range" id="shop-price-range" min="500" max="5000" step="100" value="5000" style="accent-color: var(--color-primary); width: 110px;" />
              <strong id="price-val-display" style="color: var(--color-primary); font-size: 0.875rem;">Rs. 5,000</strong>
            </div>

            <!-- Sort Select -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <label for="shop-sort-select" style="font-size: 0.875rem; color: var(--color-text-muted);">Sort:</label>
              <select id="shop-sort-select" class="form-control" style="padding: 6px 12px; font-size: 0.875rem; width: auto; background: var(--color-surface);">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Count & Empty State Container -->
      <div id="shop-results-count" style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 24px;">
        Showing products...
      </div>

      <!-- Products Grid -->
      <div id="shop-products-grid" class="products-grid"></div>

      <!-- Journal CTA Strip at end of shop -->
      <div style="margin-top: 64px; background: var(--color-cream); border: 1px solid var(--color-border); border-radius: 12px; padding: 40px; text-align: center;">
        <span class="badge badge-burgundy" style="margin-bottom: 12px;">The Glow Journal</span>
        <h3 style="font-size: 1.5rem; color: var(--color-primary); margin-bottom: 8px;">Need Guidance on Building Your Routine?</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9375rem; max-width: 560px; margin: 0 auto 20px;">
          Read our expert ingredient breakdowns, hair health guides, and everyday wellness routines in the Glow Journal.
        </p>
        <a href="blog.html" class="btn btn-primary">Read Care Guides &rarr;</a>
      </div>
    </div>
  </main>
`;

const finalHtml = `${head}\n<body data-page="shop">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'shop.html'), finalHtml, 'utf8');
console.log('Successfully generated shop.html');
