import fs from 'fs';
import path from 'path';

const projectDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const productsPath = path.join(projectDir, 'js/data/products.js');
const articlesPath = path.join(projectDir, 'js/data/articles.js');
const layoutPath = path.join(projectDir, 'make_layout.js');

const { PRODUCTS, getFeaturedProducts } = await import('file:///' + productsPath.replace(/\\/g, '/'));
const { GLOW_ARTICLES } = await import('file:///' + articlesPath.replace(/\\/g, '/'));
const { createRequire } = await import('module');
const require = createRequire(import.meta.url);
const { getHead, getHeader, getFooter } = require(layoutPath);

function formatPrice(n) {
  return `Rs. ${Number(n).toLocaleString('en-PK')}`;
}

function renderProductCard(p) {
  const origPrice = (p.onSale && p.originalPrice)
    ? `<span class="product-card-orig-price" style="text-decoration: line-through; color: var(--color-text-muted); font-size: 0.85rem; margin-right: 6px;">${formatPrice(p.originalPrice)}</span>`
    : '';

  const badgeHtml = p.badge
    ? `<span class="badge ${p.badgeType === 'gold' ? 'badge-gold' : 'badge-burgundy'} product-card-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2;">${p.badge}</span>`
    : (p.onSale ? `<span class="badge badge-gold product-card-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2;">Sale</span>` : '');

  return `
    <article class="product-card" data-id="${p.id}" data-slug="${p.slug || p.id}" data-category="${p.category}" data-price="${p.price}" data-name="${p.name}" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; position: relative;">
      <div class="product-card-media" style="position: relative; height: 220px; overflow: hidden; background: #FAF7F2;">
        <a href="product.html?slug=${p.slug || p.id}" class="product-card-img-link" aria-label="${p.name}" style="display: block; width: 100%; height: 100%;">
          <img src="${p.image.replace(/^\//, '')}" alt="${p.name}" class="product-card-img" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onerror="this.src='assets/products/placeholder.jpg'" />
        </a>
        ${badgeHtml}
      </div>
      <div class="product-card-body" style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
        <div class="product-card-meta-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="product-card-cat" style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${p.categoryName || p.category}</span>
          <span class="product-card-stock in-stock" style="font-size: 0.75rem; color: #2D6A4F; font-weight: 600; display: flex; align-items: center; gap: 4px;"><span class="stock-dot" style="display: inline-block; width: 6px; height: 6px; background: #2D6A4F; border-radius: 50%;"></span> In Stock</span>
        </div>
        <h3 class="product-card-title" style="font-size: 1rem; color: var(--color-heading); margin: 0 0 4px; font-weight: 600; line-height: 1.35;">
          <a href="product.html?slug=${p.slug || p.id}" style="color: inherit; text-decoration: none;">${p.name}</a>
        </h3>
        <p class="product-card-subtitle" style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0 0 14px; line-height: 1.45; flex: 1;">
          ${p.shortDescription || p.shortDesc || p.subtitle || ''}
        </p>
        <div class="product-card-bottom" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
          <div class="product-card-pricing">
            ${origPrice}
            <strong class="product-card-price" style="color: var(--color-primary); font-size: 1.1rem;">${formatPrice(p.price)}</strong>
          </div>
          <div class="product-card-buttons">
            <button type="button" class="btn btn-primary btn-sm btn-add-cart" data-id="${p.id}" data-slug="${p.slug || p.id}" style="font-size: 0.8125rem; padding: 6px 14px;">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>`;
}

function renderBlogCard(a) {
  const imgUrl = `/${a.image.replace(/^\//, '')}`;
  const altText = a.alt || a.title;
  return `
    <article class="blog-card blog-home-card" data-category="${a.category}" data-id="${a.id}" data-slug="${a.slug}" onclick="if(!event.target.closest('a')){window.location.href='article.html?slug=${a.slug}';}" onkeydown="if(event.key==='Enter'||event.key===' '){window.location.href='article.html?slug=${a.slug}';}" role="link" tabindex="0" aria-label="Read article: ${a.title}">
      <div class="blog-card-img-wrap blog-home-img-wrap">
        <a href="article.html?slug=${a.slug}" tabindex="-1" aria-hidden="true" style="display: block; width: 100%; height: 100%;">
          <img src="${imgUrl}" alt="${altText}" class="blog-card-img blog-home-img" loading="lazy" onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" />
        </a>
      </div>
      <div class="blog-card-body blog-home-body">
        <div class="blog-meta-row">
          <span class="badge badge-burgundy" style="font-size: 0.725rem; letter-spacing: 0.5px; text-transform: uppercase;">${a.category}</span>
          <span class="blog-date">${a.date}</span>
        </div>
        <h3 class="blog-card-title blog-home-title">
          <a href="article.html?slug=${a.slug}">${a.title}</a>
        </h3>
        <p class="blog-card-excerpt blog-home-excerpt">
          ${a.excerpt}
        </p>
        <a href="article.html?slug=${a.slug}" class="blog-read-link" aria-label="Read article: ${a.title}">
          <span>Read Article</span> <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>`;
}

console.log('Building all pages...');

// ==========================================
// 1. HOME (index.html)
// ==========================================
{
  const featured = getFeaturedProducts ? getFeaturedProducts(4) : PRODUCTS.slice(0, 4);
  const featuredCards = featured.map(renderProductCard).join('\n');

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.glowisticpk.com/#organization",
        "name": "Glowistic",
        "url": "https://www.glowisticpk.com",
        "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg",
        "description": "Beauty, skincare, personal care, hair care and wellness essentials made for everyday routines in Pakistan.",
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
          "target": "https://www.glowisticpk.com/shop?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  const head = getHead(
    'Glowistic | Beauty, Skincare & Personal Care Essentials in Pakistan',
    'Discover Glowistic — authentic beauty, skincare, hair care, personal care, and wellness essentials for everyday routines. Simple choices, feel-good care, and nationwide Cash on Delivery across Pakistan.',
    '',
    homeSchema,
    'assets/products/oclear-serum.jpg'
  );

  const header = getHeader('home');
  const footer = getFooter();

  const body = `
  <!-- SECTION 1: HERO -->
  <section class="hero-section">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="hero-tag">
          <span>✨</span>
          <span>Simple Choices. Feel-Good Care.</span>
        </div>
        <h1 class="hero-title">
          Our Everyday Glow
          <span>Starts Here.</span>
        </h1>
        <p class="hero-description">
          Beauty, skincare, personal care and wellness essentials made for everyday routines. Simple, honest, and delivered with Cash on Delivery nationwide across Pakistan.
        </p>
        <div class="hero-actions">
          <a href="shop.html" class="btn btn-primary btn-lg">Explore Essentials &rarr;</a>
          <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
        <div class="hero-trust-strip">
          <div class="trust-item">
            <span class="trust-icon">💵</span>
            <span>Cash on Delivery</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🚚</span>
            <span>Fast Nationwide Dispatch</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">✨</span>
            <span>Free Delivery over Rs. 2,500</span>
          </div>
        </div>
      </div>
      <div class="hero-media">
        <div class="hero-image-wrapper">
          <img src="assets/products/oclear-serum.jpg" alt="O'Clear Acne Clear Serum — Glowistic" class="hero-main-img" width="540" height="540" />
          <div class="hero-floating-badge">
            <span class="badge-tag">Customer Favorite</span>
            <strong>O'Clear Acne Serum</strong>
            <span>Rs. 1,450 (COD Available)</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: SHOP BY CATEGORY -->
  <section class="section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Curated Collections</span>
        <h2 class="section-title">Care for Every Part of Your Routine</h2>
        <p class="section-desc">Thoughtfully designed solutions to nourish your skin, hair, body, and overall family vitality.</p>
      </div>
      <div class="category-visual-grid">
        <a href="shop.html?category=skincare" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/neem-facewash.jpg" alt="Skincare Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Skincare</h3>
            <p class="category-visual-desc">Purifying neem cleansers and targeted salicylic serums for clear, balanced daily skin.</p>
            <span class="category-visual-cta">Explore Skincare &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=hair-care" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/reroot-shampoo.jpg" alt="Hair Care Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Hair Care</h3>
            <p class="category-visual-desc">Botanical onion, rosemary, and arnica therapies crafted for scalp vitality and thick roots.</p>
            <span class="category-visual-cta">Explore Hair Care &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=personal-care" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/arnica-shampoo.jpg" alt="Personal Care Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Personal Care</h3>
            <p class="category-visual-desc">Gentle everyday washes and nourishing hygiene essentials for the whole family.</p>
            <span class="category-visual-cta">Explore Personal Care &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=personal-care" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/lavender-lotion.jpg" alt="Body Care Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Body Care</h3>
            <p class="category-visual-desc">Calming lavender and chamomile lotions for velvety, soothing 24-hour hydration.</p>
            <span class="category-visual-cta">Explore Body Care &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=wellness-health" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/hema-lin.jpg" alt="Wellness Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Wellness</h3>
            <p class="category-visual-desc">Easy-to-drink iron ampoules and vitality tonics to combat fatigue and support stamina.</p>
            <span class="category-visual-cta">Explore Wellness &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=supplements" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/super-ton.jpg" alt="Supplements Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Supplements</h3>
            <p class="category-visual-desc">Rich chocolate granules and pediatric growth courses for healthy weight &amp; energy.</p>
            <span class="category-visual-cta">Explore Supplements &rarr;</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- SECTION 3: FEATURED PRODUCTS -->
  <section id="featured-products" class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Featured Selection</span>
        <h2 class="section-title">Glowistic Favorites</h2>
        <p class="section-desc">Everyday essentials chosen to fit naturally into your routine.</p>
      </div>
      <div id="featured-products-grid" class="products-grid">
        ${featuredCards}
      </div>
      <div style="text-align: center; margin-top: 48px;">
        <a href="shop.html" class="btn btn-outline btn-lg">Browse All Products &rarr;</a>
      </div>
    </div>
  </section>

  <!-- SECTION 4: BRAND STORY -->
  <section class="section-padding" style="background-color: var(--color-bg);">
    <div class="container">
      <div class="story-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
        <div class="story-content">
          <span class="section-tag">About Glowistic</span>
          <h2 class="section-title" style="text-align: left; margin-bottom: 20px;">Everyday Care Starts with Glowistic.</h2>
          <div style="background: var(--color-surface); border-left: 4px solid var(--color-primary); padding: 18px 24px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
            <p style="font-size: 1.1rem; color: var(--color-primary); font-weight: 500; line-height: 1.6; margin: 0;">
              &ldquo;Glowistic was created around a simple idea: everyday self-care should feel simple, accessible and enjoyable.&rdquo;
            </p>
          </div>
          <p style="color: var(--color-text); line-height: 1.8; margin-bottom: 20px;">
            We believe that taking care of yourself shouldn't be complicated, intimidating, or overpriced. From botanical shampoos and targeted blemish serums to daily multivitamins and soothing body lotions, our products are curated for authentic everyday life.
          </p>
          <a href="about.html" class="btn btn-primary">Read Our Story &rarr;</a>
        </div>
        <div class="story-media" style="position: relative;">
          <img src="assets/products/reroot-growth-pack.jpg" alt="Glowistic Product Family" style="width: 100%; border-radius: 14px; border: 1px solid var(--color-border); box-shadow: var(--shadow-md);" />
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: BLOG / GLOW JOURNAL -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Care Insights &amp; Guides</span>
        <h2 class="section-title">From the Glow Journal</h2>
        <p class="section-desc">Simple guides, helpful tips and everyday care inspiration.</p>
      </div>
      <div class="blog-home-grid blog-grid" style="margin-bottom: 40px;">
        ${GLOW_ARTICLES.slice(0, 3).map(renderBlogCard).join('\n')}
      </div>
      <div style="text-align: center;">
        <a href="blog.html" class="btn btn-outline btn-lg">Explore Glow Journal &rarr;</a>
      </div>
    </div>
  </section>

  <!-- SECTION 9: FAQ (ACCORDION) -->
  <section id="faq-section" class="section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Got Questions?</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-desc">Clear, honest answers regarding our products, ordering, and delivery across Pakistan.</p>
      </div>
      <div class="faq-home-wrapper" style="max-width: 800px; margin: 0 auto;">
        <details class="faq-item" open style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 12px; padding: 16px 20px;">
          <summary style="font-weight: 600; color: var(--color-primary); cursor: pointer; display: flex; justify-content: space-between;"><span>1. What products does Glowistic offer?</span><span>+</span></summary>
          <p style="margin-top: 12px; color: var(--color-text); line-height: 1.6; font-size: 0.9375rem;">Glowistic provides authentic essentials across Skincare (O'Clear Acne Serum, Neem Face Wash), Hair Care (reroot® Anti-Hairfall Shampoo, Hair Growth Pack, Arnica Shampoo), Body &amp; Personal Care (Lavender Chamomile Lotion), and Family Wellness &amp; Supplements (Hema-Lin Iron Ampoules, SUPER TON Chocolate Granules, WeGro Ideal Growth).</p>
        </details>
        <details class="faq-item" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 12px; padding: 16px 20px;">
          <summary style="font-weight: 600; color: var(--color-primary); cursor: pointer; display: flex; justify-content: space-between;"><span>2. Do you offer Cash on Delivery?</span><span>+</span></summary>
          <p style="margin-top: 12px; color: var(--color-text); line-height: 1.6; font-size: 0.9375rem;">Yes! Cash on Delivery (COD) is our primary and active payment method nationwide across Pakistan. You can place your order online or via WhatsApp and pay in cash when the courier delivers to your door.</p>
        </details>
        <details class="faq-item" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 12px; padding: 16px 20px;">
          <summary style="font-weight: 600; color: var(--color-primary); cursor: pointer; display: flex; justify-content: space-between;"><span>3. What is your delivery timeframe?</span><span>+</span></summary>
          <p style="margin-top: 12px; color: var(--color-text); line-height: 1.6; font-size: 0.9375rem;">Orders are dispatched within 24 hours of phone/WhatsApp confirmation. Delivery takes 2-3 business days for major cities (Lahore, Karachi, Islamabad, Rawalpindi) and 3-4 business days for other regional districts.</p>
        </details>
        <details class="faq-item" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 12px; padding: 16px 20px;">
          <summary style="font-weight: 600; color: var(--color-primary); cursor: pointer; display: flex; justify-content: space-between;"><span>4. How much is delivery?</span><span>+</span></summary>
          <p style="margin-top: 12px; color: var(--color-text); line-height: 1.6; font-size: 0.9375rem;">Standard flat-rate shipping is Rs. 200. Delivery is completely <strong>FREE on all orders of Rs. 2,500 or more</strong>!</p>
        </details>
        <details class="faq-item" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 12px; padding: 16px 20px;">
          <summary style="font-weight: 600; color: var(--color-primary); cursor: pointer; display: flex; justify-content: space-between;"><span>5. Can I order directly via WhatsApp?</span><span>+</span></summary>
          <p style="margin-top: 12px; color: var(--color-text); line-height: 1.6; font-size: 0.9375rem;">Absolutely! You can message our dedicated customer concierge at <strong>03445422609</strong> with your desired products and address, and we will confirm and book your order immediately.</p>
        </details>
      </div>
    </div>
  </section>
  `;

  fs.writeFileSync(path.join(projectDir, 'index.html'), `${head}\n<body data-page="home">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled index.html');
}

// ==========================================
// 2. SHOP (shop.html)
// ==========================================
{
  const head = getHead(
    "Shop All Products — Glowistic Official Store",
    "Discover Glowistic beauty, skincare, personal care, hair care, and wellness essentials with Cash on Delivery nationwide.",
    "shop",
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Shop All Products — Glowistic Official Store",
      "url": "https://www.glowisticpk.com/shop"
    }
  );

  const header = getHeader('shop');
  const footer = getFooter();
  const preRenderedCards = PRODUCTS.map(renderProductCard).join('\n');

  const body = `
  <!-- Shop Banner -->
  <section style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border); padding: 48px 0 36px;">
    <div class="container">
      <div class="product-breadcrumb">
        <a href="index.html">Home</a> &sol; <span>Shop Catalog</span>
      </div>
      <h1 id="shop-banner-title" style="font-size: 2.75rem; color: var(--color-primary); margin-bottom: 8px;">Shop Glowistic</h1>
      <p id="shop-banner-desc" style="color: var(--color-text-muted); font-size: 1.0625rem; max-width: 680px; line-height: 1.6;">
        Explore beauty, skincare, personal care, hair care and wellness essentials for your everyday routine.
      </p>

      <!-- Trust info strips -->
      <div style="display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap;">
        <span class="badge badge-burgundy">✓ Cash on Delivery Available</span>
        <span class="badge badge-gold">✨ FREE Delivery Over Rs. 2,500</span>
        <span class="badge badge-cream" data-action="show-card-modal" style="cursor: pointer;">🔒 Card Payments Coming Soon</span>
      </div>
    </div>
  </section>

  <!-- Shop Main -->
  <main class="section-padding">
    <div class="container">
      <!-- Search & Filter Controls -->
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: var(--shadow-sm);">
        <!-- Search Bar -->
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
            <button type="button" class="btn btn-outline btn-sm is-active" data-category="all" data-category-filter="all">All</button>
            <button type="button" class="btn btn-outline btn-sm" data-category="skincare" data-category-filter="skincare">Skincare</button>
            <button type="button" class="btn btn-outline btn-sm" data-category="hair-care" data-category-filter="haircare">Hair Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-category="personal-care" data-category-filter="personalcare">Personal Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-category="wellness-health" data-category-filter="wellness">Wellness &amp; Health</button>
            <button type="button" class="btn btn-outline btn-sm" data-category="supplements" data-category-filter="supplements">Supplements</button>
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
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="name-az">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div id="shop-results-count" style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 24px;">
        Showing ${PRODUCTS.length} products
      </div>

      <!-- Empty State -->
      <div id="shop-empty-state" style="display: none; text-align: center; padding: 60px 20px; background: var(--color-surface); border: 1px dashed var(--color-border); border-radius: 12px; margin: 24px 0;">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.25rem; color: var(--color-heading); margin-bottom: 6px;">No products found</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9375rem; margin-bottom: 18px;">Try changing your filters or search.</p>
        <button type="button" id="btn-clear-filters" class="btn btn-outline btn-sm">Clear Filters</button>
      </div>

      <!-- Products Grid -->
      <div id="shop-products-grid" class="products-grid">
        ${preRenderedCards}
      </div>
    </div>
  </main>
  `;

  fs.writeFileSync(path.join(projectDir, 'shop.html'), `${head}\n<body data-page="shop">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled shop.html');
}

// ==========================================
// 3. PRODUCT DETAIL (product.html)
// ==========================================
{
  const p = PRODUCTS[0]; // Initial pre-render: O'Clear Acne Clear Serum
  const head = getHead(
    `${p.name} — Glowistic Official Store`,
    p.shortDescription || p.shortDesc,
    `product/${p.slug}`,
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "image": `https://www.glowisticpk.com/${p.image}`,
      "description": p.description,
      "sku": p.sku,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "PKR",
        "price": p.price,
        "availability": "https://schema.org/InStock"
      }
    }
  );

  const header = getHeader('shop');
  const footer = getFooter();

  const origPriceHtml = p.onSale && p.originalPrice
    ? `<span id="product-original-price" class="pdp-price-original">${formatPrice(p.originalPrice)}</span>`
    : `<span id="product-original-price" class="pdp-price-original" style="display: none;"></span>`;

  const savings = (p.onSale && p.originalPrice && p.originalPrice > p.price)
    ? (p.originalPrice - p.price)
    : 0;
  
  const savingsPillHtml = savings > 0
    ? `<span id="product-savings-pill" class="pdp-discount-pill">Save ${formatPrice(savings)}</span>`
    : `<span id="product-savings-pill" class="pdp-discount-pill" style="display: none;"></span>`;

  const waMsg = encodeURIComponent(
    `Hi Glowistic, I would like to order:\n${p.name}\nQuantity: 1\n\nPlease share the next steps for Cash on Delivery.`
  );

  const body = `
    <!-- BREADCRUMB -->
    <div class="pdp-breadcrumb-wrap">
      <nav id="product-breadcrumb" class="pdp-breadcrumb product-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span class="sep">/</span>
        <a href="shop.html">Shop</a>
        <span class="sep">/</span>
        <a id="breadcrumb-category-link" href="shop.html?category=${p.category}">${p.categoryName || p.category}</a>
        <span class="sep">/</span>
        <span id="breadcrumb-product-name" class="current">${p.name}</span>
      </nav>
    </div>

    <!-- PRODUCT HERO SECTION (Two-Column Desktop / Stacked Mobile) -->
    <section class="pdp-hero-grid">
      <!-- LEFT: Gallery Column -->
      <div class="pdp-gallery-col">
        <div class="pdp-gallery-sticky">
          <!-- Main Image Card -->
          <div class="pdp-main-image-card" id="main-image-card">
            <span id="product-detail-badge" class="pdp-badge-pill ${p.badgeType === 'gold' ? 'badge-gold' : 'badge-burgundy'}" style="${p.badge ? '' : 'display:none;'}">${p.badge || ''}</span>
            <img id="product-main-image" src="/${p.image.replace(/^\//, '')}" alt="${p.name}" class="pdp-main-image" onerror="this.src='assets/products/oclear-serum.jpg'" />
          </div>

          <!-- Thumbnails -->
          <div id="product-gallery-thumbnails" class="pdp-thumbnails-wrap">
            ${(p.gallery && p.gallery.length > 0 ? p.gallery : [p.image]).map((gImg, gIdx) => `
            <button type="button" class="pdp-thumb-btn ${gIdx === 0 ? 'is-active' : ''}" data-src="/${gImg.replace(/^\//, '')}" aria-label="${p.name} View ${gIdx + 1}">
              <img src="/${gImg.replace(/^\//, '')}" alt="${p.name} Thumbnail ${gIdx + 1}" onerror="this.src='assets/products/placeholder.jpg'" />
            </button>`).join('\n')}
          </div>

          <!-- Trust Badges Strip -->
          <div class="pdp-trust-strip">
            <div class="pdp-trust-item">
              <span class="pdp-trust-icon">🚚</span>
              <div class="pdp-trust-text">
                <strong>Nationwide COD</strong>
                <span>Cash on Delivery across Pakistan</span>
              </div>
            </div>
            <div class="pdp-trust-item">
              <span class="pdp-trust-icon">✨</span>
              <div class="pdp-trust-text">
                <strong>Free Delivery</strong>
                <span>On all orders over Rs. 2,500</span>
              </div>
            </div>
            <div class="pdp-trust-item">
              <span class="pdp-trust-icon">💬</span>
              <div class="pdp-trust-text">
                <strong>WhatsApp Orders</strong>
                <span>Instant concierge at 03445422609</span>
              </div>
            </div>
            <div class="pdp-trust-item">
              <span class="pdp-trust-icon">🔒</span>
              <div class="pdp-trust-text">
                <strong>100% Authentic</strong>
                <span>Verified original packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Product Info & Purchase Actions -->
      <div class="pdp-info-col">
        <!-- Badges Row -->
        <div class="pdp-meta-row">
          <a id="product-category-link" href="shop.html?category=${p.category}" class="pdp-cat-pill">${p.categoryName || p.category}</a>
          <span id="product-availability" class="pdp-stock-pill">
            <span class="pdp-stock-dot"></span> In Stock
          </span>
          <span class="pdp-sku-badge" id="product-sku">${p.sku || 'GLW-SKN-001'}</span>
        </div>

        <!-- Product Title & Subtitle -->
        <h1 id="product-name" class="pdp-title">${p.name}</h1>
        <p id="product-subtitle" class="pdp-subtitle">${p.subtitle || p.tagline || 'Everyday Care Formula'}</p>

        <!-- Rating Row -->
        <div class="pdp-rating-row">
          <div class="pdp-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <span class="pdp-rating-score" id="product-rating-score">${p.rating || 4.9} / 5.0</span>
          <span class="pdp-rating-count" id="product-rating-count">(${p.reviewCount || 128}+ happy customers)</span>
        </div>

        <!-- Price Section -->
        <div class="pdp-pricing-card">
          <div class="pdp-price-row">
            <strong id="product-price" class="pdp-price-current">${formatPrice(p.price)}</strong>
            ${origPriceHtml}
            ${savingsPillHtml}
          </div>
          <div class="pdp-cod-strip">
            <span>✓ <strong>Cash on Delivery Available</strong> — Pay at your doorstep anywhere in Pakistan</span>
          </div>
        </div>

        <!-- Compact Delivery Highlights -->
        <div class="pdp-delivery-highlights">
          <div class="pdp-delivery-item">
            <span>🚚</span>
            <div><strong>Cash on Delivery:</strong> Available across Pakistan with registered courier partners.</div>
          </div>
          <div class="pdp-delivery-item">
            <span>✨</span>
            <div><strong>Free Delivery:</strong> Automatically applied on orders over Rs. 2,500.</div>
          </div>
          <div class="pdp-delivery-item">
            <span>💬</span>
            <div><strong>WhatsApp Order Support:</strong> Real-time guidance at <strong>03445422609</strong>.</div>
          </div>
        </div>

        <!-- Purchase Actions Box -->
        <div class="pdp-actions-box">
          <!-- Quantity Row -->
          <div class="pdp-qty-row">
            <span class="pdp-qty-label">Quantity:</span>
            <div class="pdp-stepper">
              <button type="button" id="qty-minus" class="pdp-stepper-btn" aria-label="Decrease Quantity">&minus;</button>
              <input type="number" id="product-qty-input" class="pdp-stepper-input" value="1" min="1" max="99" aria-label="Selected Quantity" readonly />
              <button type="button" id="qty-plus" class="pdp-stepper-btn" aria-label="Increase Quantity">&plus;</button>
            </div>
          </div>

          <!-- Primary CTAs: Add to Cart & Buy Now -->
          <div class="pdp-button-grid">
            <button type="button" id="btn-add-to-cart" class="btn btn-primary btn-lg" data-id="${p.id}" data-slug="${p.slug}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>Add to Cart</span>
            </button>
            <button type="button" id="btn-buy-now" class="btn btn-outline btn-lg" data-id="${p.id}" data-slug="${p.slug}">
              <span>Buy Now</span>
            </button>
          </div>

          <!-- Secondary CTA: WhatsApp Order -->
          <a id="btn-whatsapp-order" href="https://wa.me/923445422609?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg btn-block" aria-label="Order via WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
            <span>Order via WhatsApp (03445422609)</span>
          </a>

          <!-- Card Payment Notice -->
          <div class="pdp-card-notice">
            <span>🔒 Card payments coming soon. Cash on Delivery is currently active.</span>
            <button type="button" data-action="show-card-modal" class="btn-ghost btn-sm" style="text-decoration: underline; padding: 0 4px; font-size: 0.8125rem;">Learn more</button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 1: PRODUCT DESCRIPTION -->
    <section class="pdp-section" id="pdp-about-section">
      <h2 class="pdp-section-title">About This Product</h2>
      <p class="pdp-section-sub">Thoughtfully formulated for dependable everyday care and visible results.</p>
      <div id="product-description" class="pdp-desc-text">
        ${p.description}
      </div>
    </section>

    <!-- SECTION 2: KEY BENEFITS -->
    <section class="pdp-section" id="pdp-benefits-section">
      <h2 class="pdp-section-title">Key Benefits</h2>
      <p class="pdp-section-sub">Targeted botanical and dermatological performance for your skin routine.</p>
      <div class="pdp-benefits-grid product-benefits-list" id="product-benefits-grid">
        <div class="pdp-benefit-card">
          <div class="pdp-benefit-icon">✨</div>
          <h3>Fights Acne</h3>
          <p>Helps reduce active breakouts and prevents future clogged pores.</p>
        </div>
        <div class="pdp-benefit-card">
          <div class="pdp-benefit-icon">🌿</div>
          <h3>Soothes &amp; Calms</h3>
          <p>Botanical Tea Tree Oil helps calm redness and soothe irritation.</p>
        </div>
        <div class="pdp-benefit-card">
          <div class="pdp-benefit-icon">💧</div>
          <h3>Clearer, Healthier Skin</h3>
          <p>Salicylic Acid gently exfoliates and visibly improves skin texture.</p>
        </div>
      </div>
    </section>

    <!-- SECTION 3: HOW TO USE -->
    <section class="pdp-section" id="pdp-howtouse-section">
      <h2 class="pdp-section-title">How To Use</h2>
      <p class="pdp-section-sub">Simple steps for getting the most out of your everyday care routine.</p>
      <div class="pdp-steps-grid" id="product-howtouse-grid">
        <div class="pdp-step-card">
          <div class="pdp-step-num">1</div>
          <h4>Cleanse</h4>
          <p>Cleanse face thoroughly (ideally with Glowistic Neem Face Wash) and pat dry.</p>
        </div>
        <div class="pdp-step-card">
          <div class="pdp-step-num">2</div>
          <h4>Dispense</h4>
          <p>Apply 3 to 4 drops of O'Clear Serum directly onto face and neck.</p>
        </div>
        <div class="pdp-step-card">
          <div class="pdp-step-num">3</div>
          <h4>Pat Gently</h4>
          <p>Gently press and pat into skin with fingertips until fully absorbed.</p>
        </div>
        <div class="pdp-step-card">
          <div class="pdp-step-num">4</div>
          <h4>Moisturize &amp; Protect</h4>
          <p>Follow with your everyday moisturizer, plus daytime sunscreen.</p>
        </div>
      </div>
    </section>

    <!-- SECTION 4: PRODUCT DETAILS & INGREDIENTS -->
    <section class="pdp-section" id="pdp-specs-section">
      <h2 class="pdp-section-title">Product Details &amp; Formulation</h2>
      <p class="pdp-section-sub">Complete transparency on size, skin compatibility and authentic ingredients.</p>

      <div class="pdp-specs-card" id="product-specs-table">
        <div class="pdp-spec-row">
          <div class="pdp-spec-label">Product Category</div>
          <div class="pdp-spec-val" id="spec-category">${p.categoryName || 'Skincare'}</div>
        </div>
        <div class="pdp-spec-row">
          <div class="pdp-spec-label">Key Actives</div>
          <div class="pdp-spec-val" id="spec-actives">${p.subtitle || 'Tea Tree Oil & Salicylic Acid'}</div>
        </div>
        <div class="pdp-spec-row">
          <div class="pdp-spec-label">Skin Type</div>
          <div class="pdp-spec-val" id="spec-skintype">All Skin Types, especially acne-prone and sensitive</div>
        </div>
        <div class="pdp-spec-row">
          <div class="pdp-spec-label">Best For</div>
          <div class="pdp-spec-val" id="spec-bestfor">${p.idealFor || 'Acne-prone skin, blemishes, blackheads, and uneven skin texture'}</div>
        </div>
        <div class="pdp-spec-row">
          <div class="pdp-spec-label">Net Volume / Size</div>
          <div class="pdp-spec-val" id="spec-volume">${p.volume || '30 ml e'}</div>
        </div>
      </div>

      <!-- Ingredients Box -->
      <div class="pdp-ingredients-box">
        <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0 0 10px; font-weight: 600;">Authentic Packaging Ingredients:</h3>
        <p id="product-ingredients-content" class="pdp-ingredients-text">${p.ingredients || 'Aqua, Butylene Glycol, Salicylic Acid, Niacinamide, Betaine, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Cellulose, Panthenol, Glycerin, Allantoin, Boswellia Serrata Resin Extract, Vitamin E, Sodium Hyaluronate.'}</p>
        <p class="pdp-safety-note">
          <strong>Safety Note:</strong> For external cosmetic use only. Avoid contact with eyes. Conduct a patch test on a small area of the jawline prior to first application. Store in a cool, dry place away from direct sunlight.
        </p>
      </div>
    </section>

    <!-- SECTION 5: CUSTOMER REVIEWS -->
    <section class="pdp-section" id="pdp-reviews-section">
      <h2 class="pdp-section-title">Customer Reviews</h2>
      <p class="pdp-section-sub">Real feedback from customers across Pakistan.</p>

      <!-- Rating Summary Card -->
      <div class="pdp-reviews-hero">
        <div class="pdp-reviews-score">
          <div class="pdp-reviews-num" id="reviews-summary-num">4.9</div>
          <div class="pdp-stars" style="font-size: 1.35rem; margin-bottom: 6px;">★★★★★</div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted);" id="reviews-summary-count">Based on 128+ verified ratings</div>
        </div>
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <strong style="color: var(--color-heading); font-size: 1rem;">98% of customers recommend this product</strong>
            <span style="font-size: 0.8125rem; color: var(--color-primary); font-weight: 600;">Verified Purchases</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            Glowistic customers consistently praise the gentle, non-greasy absorption and soothing breakout support.
          </p>
        </div>
      </div>

      <!-- Review Cards Grid -->
      <div class="pdp-reviews-grid" id="product-reviews-grid">
        <div class="pdp-review-card">
          <div class="pdp-review-header">
            <span class="pdp-reviewer-name">Fatima Z. — Lahore</span>
            <span class="pdp-review-verified">✓ Verified Buyer</span>
          </div>
          <div class="pdp-stars" style="font-size: 0.85rem; margin-bottom: 6px;">★★★★★</div>
          <p class="pdp-review-comment">
            "Gentle on my skin and absorbed very quickly without leaving any sticky residue. Within two weeks, my acne redness calmed down significantly."
          </p>
        </div>
        <div class="pdp-review-card">
          <div class="pdp-review-header">
            <span class="pdp-reviewer-name">Ayesha K. — Karachi</span>
            <span class="pdp-review-verified">✓ Verified Buyer</span>
          </div>
          <div class="pdp-stars" style="font-size: 0.85rem; margin-bottom: 6px;">★★★★★</div>
          <p class="pdp-review-comment">
            "Ordered via Cash on Delivery and arrived in 2 days. The tea tree scent is authentic and not overpowering. Works great for daily morning routine."
          </p>
        </div>
        <div class="pdp-review-card">
          <div class="pdp-review-header">
            <span class="pdp-reviewer-name">Bilal M. — Islamabad</span>
            <span class="pdp-review-verified">✓ Verified Buyer</span>
          </div>
          <div class="pdp-stars" style="font-size: 0.85rem; margin-bottom: 6px;">★★★★★</div>
          <p class="pdp-review-comment">
            "Very pleased with the packaging and customer service on WhatsApp. Helps unclog pores around the nose and forehead without drying the skin."
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 6: FREQUENTLY ASKED QUESTIONS -->
    <section class="pdp-section" id="pdp-faq-section">
      <h2 class="pdp-section-title">Frequently Asked Questions</h2>
      <p class="pdp-section-sub">Everything you need to know about ordering, delivery, and usage.</p>

      <div class="pdp-faq-list" id="product-faq-list">
        <div class="pdp-faq-item is-open">
          <button type="button" class="pdp-faq-question" aria-expanded="true">
            <span>Is Cash on Delivery (COD) available across Pakistan?</span>
            <span class="pdp-faq-icon">+</span>
          </button>
          <div class="pdp-faq-answer">
            Yes! Cash on Delivery (COD) is available nationwide across all major cities and regional districts. You do not need to make any advance payment; simply pay the courier upon receiving your parcel.
          </div>
        </div>

        <div class="pdp-faq-item">
          <button type="button" class="pdp-faq-question" aria-expanded="false">
            <span>How long does delivery take?</span>
            <span class="pdp-faq-icon">+</span>
          </button>
          <div class="pdp-faq-answer">
            Orders are dispatched within 24 business hours. For major metros (Lahore, Karachi, Islamabad, Rawalpindi), delivery takes 2-3 business days. For other regional districts, it takes 3-4 business days.
          </div>
        </div>

        <div class="pdp-faq-item">
          <button type="button" class="pdp-faq-question" aria-expanded="false">
            <span>Can I place my order directly through WhatsApp?</span>
            <span class="pdp-faq-icon">+</span>
          </button>
          <div class="pdp-faq-answer">
            Yes! You can click the "Order via WhatsApp" button on this page or message us directly at <strong>03445422609</strong>. Our team will assist with your order details and confirm dispatch.
          </div>
        </div>

        <div class="pdp-faq-item">
          <button type="button" class="pdp-faq-question" aria-expanded="false">
            <span>When will credit and debit card payments be available?</span>
            <span class="pdp-faq-icon">+</span>
          </button>
          <div class="pdp-faq-answer">
            We are actively integrating bank payment gateways for seamless card checkout. For now, Cash on Delivery (COD) remains the primary and most convenient checkout method.
          </div>
        </div>

        <div class="pdp-faq-item">
          <button type="button" class="pdp-faq-question" aria-expanded="false">
            <span>How often should I use this product?</span>
            <span class="pdp-faq-icon">+</span>
          </button>
          <div class="pdp-faq-answer">
            For best results, incorporate into your daily routine. Apply 3-4 drops after cleansing in the morning and evening, followed by a moisturizer and daytime sunscreen.
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 7: RELATED PRODUCTS ("You May Also Like") -->
    <section class="pdp-section" id="pdp-related-section" style="background-color: var(--color-surface); border-radius: 16px; margin: 40px 0;">
      <div style="padding: 0 16px;">
        <h2 class="pdp-section-title">You May Also Like</h2>
        <p class="pdp-section-sub">Formulations that work harmoniously with your everyday routine.</p>
        <div id="product-related-grid" class="products-grid">
          ${PRODUCTS.slice(1, 5).map(renderProductCard).join('\n')}
        </div>
      </div>
    </section>

    <!-- SECTION 8: WHATSAPP CONCIERGE CTA -->
    <section class="pdp-bottom-wa" id="product-wa-cta">
      <h3>Have Questions About Your Routine?</h3>
      <p>Our dedicated Glowistic team is ready to help you pick the right products for your specific skin and hair needs.</p>
      <a id="link-whatsapp-inquiry" href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20routine%20advice%20for%20my%20skin." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
        💬 Chat on WhatsApp (03445422609)
      </a>
    </section>
  `;

  const stickyBar = `
  <!-- SECTION 12: MOBILE STICKY PURCHASE BAR -->
  <div id="mobile-sticky-bar" class="pdp-mobile-sticky-bar mobile-sticky-bar" style="display: none;">
    <div class="mobile-sticky-inner">
      <div class="mobile-sticky-info">
        <h4 id="sticky-bar-title" class="mobile-sticky-title">${p.name}</h4>
        <div id="sticky-bar-price" class="mobile-sticky-price">${formatPrice(p.price)}</div>
      </div>
      <div class="mobile-sticky-actions">
        <button type="button" id="sticky-bar-add-btn" class="btn btn-primary btn-sm" data-id="${p.id}">Add</button>
        <a id="sticky-bar-whatsapp-btn" href="https://wa.me/923445422609?text=${encodeURIComponent('Hi Glowistic, I want to order ' + p.name)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="WhatsApp Order">💬</a>
      </div>
    </div>
  </div>
  `;

  const finalHtml = `${head}\n<body data-page="product">\n${header}\n<main class="pdp-container" id="product-detail-container">\n${body}\n</main>\n${stickyBar}\n${footer}`;
  fs.writeFileSync(path.join(projectDir, 'product.html'), finalHtml, 'utf8');
  console.log('✓ Compiled product.html with complete redesigned PDP layout');
}

// ==========================================
// 4. BLOG (blog.html)
// ==========================================
{
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Glow Journal — Glowistic",
    "description": "Simple, useful insights for better everyday beauty, skincare, hair care and wellness routines.",
    "url": "https://www.glowisticpk.com/blog"
  };

  const head = getHead(
    "The Glow Journal — Everyday Care Guides & Routine Insights | Glowistic",
    "Simple, useful insights for better everyday beauty, skincare, hair care and wellness routines from The Glow Journal.",
    "blog",
    blogSchema
  );

  const header = getHeader('blog');
  const footer = getFooter();
  const topArticle = GLOW_ARTICLES[0];
  const preRenderedBlogCards = GLOW_ARTICLES.map(renderBlogCard).join('\n');

  const body = `
  <!-- HERO -->
  <section class="blog-hero-section" style="background: linear-gradient(180deg, #FBF8F3 0%, var(--color-surface) 100%); border-bottom: 1px solid var(--color-border); padding: 56px 0 44px;">
    <div class="container container-narrow" style="text-align: center;">
      <div class="product-breadcrumb" style="justify-content: center; margin-bottom: 16px;">
        <a href="index.html">Home</a> &sol; <span>The Glow Journal</span>
      </div>
      <span class="badge badge-burgundy" style="margin-bottom: 12px; font-size: 0.8125rem;">Editorial &amp; Wellness Journal</span>
      <h1 style="font-size: 3rem; color: var(--color-primary); margin-bottom: 14px; font-family: var(--font-serif); font-weight: 600;">The Glow Journal</h1>
      <p style="font-size: 1.15rem; color: var(--color-text); line-height: 1.6; max-width: 620px; margin: 0 auto;">
        Simple, useful insights for better everyday beauty, skincare and self-care routines.
      </p>
    </div>
  </section>

  <!-- FEATURED ARTICLE BANNER -->
  <section class="section-padding" style="padding-bottom: 0;">
    <div class="container">
      <div id="blog-featured-banner" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; overflow: hidden; display: grid; grid-template-columns: 1.15fr 1fr; gap: 0; box-shadow: var(--shadow-sm);" class="blog-featured-grid">
        <style>
          @media (max-width: 860px) {
            .blog-featured-grid {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
        <div style="height: 360px; overflow: hidden; background: #FAF7F2;">
          <a href="/blog/${topArticle.slug}">
            <img id="featured-banner-img" src="/${topArticle.image.replace(/^\//, '')}" alt="${topArticle.alt || topArticle.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" />
          </a>
        </div>
        <div style="padding: 40px; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <span class="badge badge-gold" id="featured-banner-cat">${topArticle.category}</span>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Featured Guide</span>
          </div>
          <h2 style="font-size: 1.85rem; line-height: 1.25; margin-bottom: 14px; font-family: var(--font-serif); font-weight: 600;">
            <a id="featured-banner-title-link" href="/blog/${topArticle.slug}" style="color: var(--color-heading); text-decoration: none;">
              ${topArticle.title}
            </a>
          </h2>
          <p id="featured-banner-excerpt" style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 24px;">
            ${topArticle.excerpt}
          </p>
          <div>
            <a id="featured-banner-cta-btn" href="/blog/${topArticle.slug}" class="btn btn-primary">Read Complete Guide &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN BLOG SECTION -->
  <main class="section-padding">
    <div class="container">
      <!-- Search & Category Filters -->
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 20px 24px; margin-bottom: 36px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <!-- Category Tabs -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="blog-category-tabs">
            <button type="button" class="btn btn-outline btn-sm is-active" data-blog-category="all" data-category-filter="all">All</button>
            <button type="button" class="btn btn-outline btn-sm" data-blog-category="Skincare" data-category-filter="skincare">Skincare</button>
            <button type="button" class="btn btn-outline btn-sm" data-blog-category="Hair Care" data-category-filter="haircare">Hair Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-blog-category="Personal Care" data-category-filter="personalcare">Personal Care</button>
            <button type="button" class="btn btn-outline btn-sm" data-blog-category="Wellness" data-category-filter="wellness">Wellness</button>
            <button type="button" class="btn btn-outline btn-sm" data-blog-category="Beauty Tips" data-category-filter="beauty-tips">Beauty Tips</button>
            <button type="button" class="btn btn-outline btn-sm" data-blog-category="Glowistic" data-category-filter="glowistic">Glowistic</button>
          </div>

          <!-- Search Input -->
          <div style="min-width: 260px;">
            <div class="search-input-wrap">
              <span class="search-icon-inside">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input type="text" id="blog-search-input" class="search-input" placeholder="Search articles..." style="padding-left: 38px; font-size: 0.875rem;" />
            </div>
          </div>
        </div>
      </div>

      <!-- Count -->
      <div id="blog-results-count" style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 24px;">
        Showing ${GLOW_ARTICLES.length} articles
      </div>

      <!-- 3-Column Articles Grid -->
      <div id="blog-articles-grid" class="blog-articles-grid blog-grid">
        ${preRenderedBlogCards}
      </div>
    </div>
  </main>
  `;

  fs.writeFileSync(path.join(projectDir, 'blog.html'), `${head}\n<body data-page="blog">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled blog.html');
}

// ==========================================
// 5. ARTICLE DETAIL (article.html)
// ==========================================
{
  const a = GLOW_ARTICLES[0];
  const head = getHead(
    `${a.seoTitle || a.title} | The Glow Journal`,
    a.metaDescription,
    `blog/${a.slug}`,
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": a.title,
      "description": a.metaDescription,
      "image": `https://www.glowisticpk.com/${a.image}`,
      "author": {
        "@type": "Organization",
        "name": a.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Glowistic"
      }
    },
    a.image
  );

  const header = getHeader('blog');
  const footer = getFooter();

  const body = `
  <article class="article-page-container" style="background-color: var(--color-bg); padding-top: 36px; padding-bottom: 80px;">
    <div class="container">
      <!-- Breadcrumb -->
      <div class="product-breadcrumb" style="margin-bottom: 28px;">
        <a href="index.html">Home</a> &sol; <a href="blog.html">The Glow Journal</a> &sol; <a id="article-breadcrumb-category" href="blog.html">${a.category}</a> &sol; <span id="article-breadcrumb-title">${a.title}</span>
      </div>

      <!-- Article Header -->
      <header class="article-header" style="max-width: 820px; margin: 0 auto 36px; text-align: center;">
        <span id="article-cat-badge" class="badge badge-burgundy" style="margin-bottom: 16px; font-size: 0.8125rem; letter-spacing: 0.5px;">${a.category}</span>
        <h1 id="article-title" style="font-size: 2.85rem; color: var(--color-primary); line-height: 1.2; margin-bottom: 18px; font-family: var(--font-serif); font-weight: 600;">
          ${a.title}
        </h1>
        <p id="article-intro" style="font-size: 1.15rem; color: var(--color-text); line-height: 1.65; margin-bottom: 24px;">
          ${a.intro || a.excerpt}
        </p>

        <!-- Meta Bar -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; font-size: 0.875rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 14px 0;">
          <span>By <strong id="article-author" style="color: var(--color-primary);">${a.author}</strong></span>
          <span>&bull;</span>
          <span id="article-date">${a.date}</span>
          <span>&bull;</span>
          <span id="article-reading-time">3 min read</span>
        </div>
      </header>

      <!-- Featured Hero Image -->
      <div style="max-width: 920px; margin: 0 auto 48px; border-radius: 16px; overflow: hidden; border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); aspect-ratio: 16/10; background: #FAF7F2;">
        <img id="article-featured-img" src="/${a.image.replace(/^\//, '')}" alt="${a.alt || a.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" />
      </div>

      <!-- Article Layout: Content + Desktop Sidebar -->
      <div style="display: grid; grid-template-columns: 1fr; gap: 48px; max-width: 1080px; margin: 0 auto;" class="article-body-layout">
        <style>
          @media (min-width: 960px) {
            .article-body-layout {
              grid-template-columns: 1fr 320px !important;
            }
          }
        </style>

        <!-- Main Editorial Content -->
        <div class="article-prose" style="font-size: 1.05rem; line-height: 1.85; color: var(--color-text);">
          <div id="article-body-content">
            ${a.content}
          </div>

          <!-- Social Sharing Strip -->
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <strong style="color: var(--color-primary); font-size: 0.95rem;">Share this guide:</strong>
            <div style="display: flex; gap: 10px;">
              <a href="#" id="share-whatsapp" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 6px;">
                💬 WhatsApp
              </a>
              <a href="#" id="share-facebook" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                Facebook
              </a>
              <a href="#" id="share-twitter" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                Twitter/X
              </a>
              <button type="button" id="share-copy-link" class="btn btn-outline btn-sm">
                Copy Link
              </button>
            </div>
          </div>

          <!-- End of Article CTA -->
          <div style="margin-top: 48px; padding: 36px 32px; background: var(--color-surface); border-radius: 14px; border: 1px solid var(--color-border); text-align: center; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 1.5rem; color: var(--color-primary); margin-bottom: 8px; font-family: var(--font-serif);">Ready to build your everyday routine?</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 24px; max-width: 480px; margin-left: auto; margin-right: auto;">
              Explore our honest skincare, hair care, and wellness essentials delivered right to your doorstep with Cash on Delivery.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="shop.html" class="btn btn-primary">Explore Glowistic</a>
              <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20read%20an%20article%20on%20The%20Glow%20Journal%20and%20need%20routine%20recommendations." id="article-end-whatsapp" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <!-- Sidebar (Desktop Right Column, Mobile Below) -->
        <aside class="article-sidebar">
          <!-- WhatsApp Routine Concierge Card -->
          <div style="background: #EBF7EE; border: 1.5px solid #A3D9B5; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
            <h4 style="font-size: 1.1rem; color: #1E4633; margin: 0 0 6px;">Need Personal Advice?</h4>
            <p style="font-size: 0.85rem; color: #2D6A4F; line-height: 1.5; margin: 0 0 16px;">
              Our beauty and wellness team is available on WhatsApp for product guidance.
            </p>
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20need%20advice%20on%20building%20my%20routine." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block btn-sm">
              Message on WhatsApp
            </a>
          </div>

          <!-- Related Guides in Sidebar -->
          <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 28px;">
            <h4 style="font-size: 1.05rem; color: var(--color-primary); margin: 0 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border);">
              Related Articles
            </h4>
            <div id="article-sidebar-related">
              ${GLOW_ARTICLES.slice(1, 4).map(art => `
                <a href="/blog/${art.slug}" style="display: grid; grid-template-columns: 64px 1fr; gap: 12px; align-items: center; text-decoration: none; padding: 10px 0; border-bottom: 1px solid var(--color-border);">
                  <img src="/${art.image.replace(/^\//, '')}" alt="${art.alt || art.title}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border);" onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" />
                  <div>
                    <span style="font-size: 0.7rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${art.category}</span>
                    <h5 style="font-size: 0.85rem; color: var(--color-heading); margin: 2px 0 0; line-height: 1.35; font-weight: 600;">${art.title}</h5>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Categories List -->
          <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="font-size: 1.05rem; color: var(--color-primary); margin: 0 0 14px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border);">
              Care Categories
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
              <a href="shop.html?category=skincare" style="color: var(--color-text); text-decoration: none;">&bull; Skincare Routine</a>
              <a href="shop.html?category=hair-care" style="color: var(--color-text); text-decoration: none;">&bull; Hair & Scalp Health</a>
              <a href="shop.html?category=personal-care" style="color: var(--color-text); text-decoration: none;">&bull; Everyday Personal Care</a>
              <a href="shop.html?category=wellness-health" style="color: var(--color-text); text-decoration: none;">&bull; Nutrition &amp; Energy</a>
            </div>
          </div>
        </aside>
      </div>

      <!-- Bottom Related Articles (3 Cards) -->
      <div style="margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--color-border);">
        <h3 style="font-size: 1.75rem; color: var(--color-primary); text-align: center; margin-bottom: 32px; font-family: var(--font-serif);">
          More from The Glow Journal
        </h3>
        <div id="article-related-grid" class="blog-grid">
          ${GLOW_ARTICLES.slice(1, 4).map(renderBlogCard).join('')}
        </div>
      </div>
    </div>
  </article>
  `;

  fs.writeFileSync(path.join(projectDir, 'article.html'), `${head}\n<body data-page="article">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled article.html');
}

// ==========================================
// 6. ABOUT (about.html)
// ==========================================
{
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Glowistic — Everyday Care Starts with Glowistic",
    "description": "Beauty, skincare, personal care and wellness essentials made for everyday routines in Pakistan.",
    "url": "https://www.glowisticpk.com/about"
  };

  const head = getHead(
    'About Us — Everyday Care Starts with Glowistic',
    'Learn about Glowistic — beauty, skincare, personal care and wellness essentials made for everyday routines in Pakistan.',
    'about',
    aboutSchema
  );

  const header = getHeader('about');
  const footer = getFooter();

  const body = `
  <!-- SECTION 1: HERO -->
  <section class="about-hero-section" style="background: linear-gradient(180deg, #FBF8F3 0%, var(--color-surface) 100%); border-bottom: 1px solid var(--color-border); padding: 72px 0 64px;">
    <div class="container container-narrow" style="text-align: center;">
      <span class="badge badge-burgundy" style="margin-bottom: 18px; font-size: 0.8125rem; letter-spacing: 0.08em;">Our Everyday Glow Starts Here</span>
      <h1 style="font-size: 3rem; color: var(--color-primary); line-height: 1.15; margin-bottom: 18px; font-family: var(--font-serif); font-weight: 600;">
        Everyday Care Starts with Glowistic.
      </h1>
      <p style="font-size: 1.15rem; color: var(--color-text); line-height: 1.7; max-width: 680px; margin: 0 auto 32px; font-weight: 400;">
        Beauty, skincare, personal care and wellness essentials made for everyday routines.
      </p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="shop.html" class="btn btn-primary btn-lg">Explore Our Essentials</a>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>

  <!-- SECTION 2: OUR STORY -->
  <section class="section-padding" style="background-color: var(--color-bg); padding: 80px 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center;" class="about-story-grid">
        <style>
          @media (max-width: 860px) {
            .about-story-grid { grid-template-columns: 1fr !important; }
          }
        </style>
        <div>
          <span class="section-tag" style="margin-bottom: 12px; display: inline-block;">Our Story</span>
          <h2 style="font-size: 2.25rem; color: var(--color-primary); line-height: 1.25; margin-bottom: 20px; font-family: var(--font-serif); font-weight: 600;">
            Simple Choices. Feel-Good Care.
          </h2>
          <div style="background: var(--color-surface); border-left: 4px solid var(--color-primary); padding: 18px 24px; border-radius: 0 8px 8px 0; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
            <p style="font-size: 1.125rem; color: var(--color-primary); font-weight: 500; line-height: 1.6; margin: 0;">
              &ldquo;Glowistic was created around a simple idea: everyday self-care should feel simple, accessible and enjoyable.&rdquo;
            </p>
          </div>
          <p style="font-size: 0.95rem; color: var(--color-text); line-height: 1.8; margin-bottom: 16px;">
            In a fast-paced world filled with overwhelming multi-step routines and exaggerated marketing claims, daily personal care often feels complicated. We believe that true confidence begins with simple habits you actually look forward to every day.
          </p>
          <p style="font-size: 0.95rem; color: var(--color-text); line-height: 1.8;">
            Whether it's washing your face after a long commute, deeply nourishing your hair roots, moisturizing dry hands, or supporting family energy, Glowistic connects you with practical, dependable essentials.
          </p>
        </div>
        <div>
          <img src="assets/products/oclear-serum.jpg" alt="Glowistic Everyday Care" style="width: 100%; border-radius: 14px; border: 1px solid var(--color-border); box-shadow: var(--shadow-md);" />
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: WHAT WE BELIEVE (4 PRINCIPLES) -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 80px 0;">
    <div class="container">
      <div class="section-header" style="text-align: center; margin-bottom: 56px;">
        <span class="section-tag">Core Principles</span>
        <h2 class="section-title">What We Believe</h2>
        <p class="section-desc">The guiding values behind every product we curate and recommend.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;">
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2rem; margin-bottom: 16px;">🌿</div>
          <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Simple Choices</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            You don't need dozens of overlapping products. We focus on straightforward formulas that fulfill genuine everyday needs without confusing routines.
          </p>
        </div>

        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2rem; margin-bottom: 16px;">☀️</div>
          <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Everyday Care</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            True glow isn't created overnight—it thrives on gentle daily consistency. Our products are made to be gentle enough for continuous, comfortable daily use.
          </p>
        </div>

        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2rem; margin-bottom: 16px;">✨</div>
          <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Feel-Good Routines</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            Personal care should be a pleasant, uplifting pause in your day. Pleasant textures, gentle botanicals, and real comfort you look forward to morning and night.
          </p>
        </div>

        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 2rem; margin-bottom: 16px;">🤝</div>
          <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Customer First</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            From nationwide Cash on Delivery to prompt WhatsApp concierge support, your convenience, trust, and peace of mind guide everything we do.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: MORE THAN PRODUCTS -->
  <section class="section-padding" style="background-color: var(--color-bg); padding: 80px 0;">
    <div class="container container-narrow" style="text-align: center;">
      <span class="section-tag" style="margin-bottom: 12px; display: inline-block;">Our Purpose</span>
      <h2 style="font-size: 2.25rem; color: var(--color-primary); margin-bottom: 18px; font-family: var(--font-serif); font-weight: 600;">More Than Products</h2>
      <p style="font-size: 1.0625rem; color: var(--color-text); line-height: 1.8; margin-bottom: 32px;">
        Glowistic is focused on helping customers discover practical products for their everyday routines. We want to take the guesswork out of beauty, personal care, and wellness—providing transparent ingredient details, straightforward directions, and dedicated support so you can build routines with complete confidence.
      </p>
      <a href="shop.html" class="btn btn-primary btn-lg">Explore Our Catalog &rarr;</a>
    </div>
  </section>

  <!-- SECTION 5: EXPLORE OUR CATEGORIES -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); padding: 80px 0;">
    <div class="container">
      <div class="section-header" style="text-align: center; margin-bottom: 48px;">
        <span class="section-tag">Catalog</span>
        <h2 class="section-title">Explore Our Categories</h2>
        <p class="section-desc">Care for every part of your routine—from hair roots to skincare and family wellness.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <a href="shop.html?category=skincare" style="text-decoration: none; color: inherit; display: block;">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="height: 180px; overflow: hidden; background: #FAF7F2; display: flex; align-items: center; justify-content: center;">
              <img src="assets/products/neem-facewash.jpg" alt="Skincare Collection" style="height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 18px;">
              <h3 style="font-size: 1.1rem; color: var(--color-primary); margin: 0 0 4px; font-weight: 600;">Skincare &rarr;</h3>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">Targeted acne clarifying serums, purifying neem cleansers &amp; balancing care.</p>
            </div>
          </div>
        </a>

        <a href="shop.html?category=hair-care" style="text-decoration: none; color: inherit; display: block;">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="height: 180px; overflow: hidden; background: #FAF7F2; display: flex; align-items: center; justify-content: center;">
              <img src="assets/products/reroot-shampoo.jpg" alt="Hair Care Collection" style="height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 18px;">
              <h3 style="font-size: 1.1rem; color: var(--color-primary); margin: 0 0 4px; font-weight: 600;">Hair Care &rarr;</h3>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">Botanical onion &amp; rosemary oils, anti-hair-fall shampoos &amp; scalp care.</p>
            </div>
          </div>
        </a>

        <a href="shop.html?category=personal-care" style="text-decoration: none; color: inherit; display: block;">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="height: 180px; overflow: hidden; background: #FAF7F2; display: flex; align-items: center; justify-content: center;">
              <img src="assets/products/lavender-lotion.jpg" alt="Personal & Body Care" style="height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 18px;">
              <h3 style="font-size: 1.1rem; color: var(--color-primary); margin: 0 0 4px; font-weight: 600;">Personal &amp; Body Care &rarr;</h3>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">Hydrating lavender body lotions and gentle family washes.</p>
            </div>
          </div>
        </a>

        <a href="shop.html?category=wellness-health" style="text-decoration: none; color: inherit; display: block;">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="height: 180px; overflow: hidden; background: #FAF7F2; display: flex; align-items: center; justify-content: center;">
              <img src="assets/products/hema-lin.jpg" alt="Wellness Collection" style="height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 18px;">
              <h3 style="font-size: 1.1rem; color: var(--color-primary); margin: 0 0 4px; font-weight: 600;">Wellness &amp; Health &rarr;</h3>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">Vitality iron ampoules, chocolate malt granules &amp; daily family supplements.</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
  `;

  fs.writeFileSync(path.join(projectDir, 'about.html'), `${head}\n<body data-page="about">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled about.html');
}

// ==========================================
// 7. CONTACT (contact.html)
// ==========================================
{
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us & WhatsApp Helpline — Glowistic",
    "description": "Have a question about a product, order or your routine? We're here to help on WhatsApp 03445422609 and official channels.",
    "url": "https://www.glowisticpk.com/contact"
  };

  const head = getHead(
    "Contact Us & WhatsApp Helpline — Let's Talk Glow | Glowistic",
    "Have a question about a product, order or your routine? We're here to help on WhatsApp 03445422609 and official channels.",
    'contact',
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
      <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: flex-start;" class="contact-grid">
        <style>
          @media (max-width: 860px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        </style>
        <!-- Left Column: Channels -->
        <div>
          <!-- WhatsApp Card -->
          <div style="background: #EBFBF0; border: 1.5px solid rgba(34, 197, 94, 0.35); border-radius: 12px; padding: 28px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 44px; height: 44px; background: #25D366; color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">💬</div>
              <div>
                <h3 style="font-size: 1.125rem; color: #15803D; margin: 0;">WhatsApp Live Support</h3>
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
            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.9rem;">
              <div>
                <strong style="color: var(--color-heading); display: block;">Official Store:</strong>
                <a href="https://www.glowisticpk.com" style="color: var(--color-primary);">www.glowisticpk.com</a>
              </div>
              <div>
                <strong style="color: var(--color-heading); display: block;">Instagram:</strong>
                <a href="https://www.instagram.com/glowisticpk" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary);">@glowisticpk</a>
              </div>
              <div>
                <strong style="color: var(--color-heading); display: block;">Facebook:</strong>
                <a href="https://www.facebook.com/glowisticpk.store" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary);">Glowistic Official</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Message Form -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 36px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 1.35rem; color: var(--color-primary); margin-bottom: 8px;">Send a Direct Message</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 24px;">
            Fill out the form below and our team will get back to you promptly.
          </p>

          <form id="contact-form">
            <div class="form-group" style="margin-bottom: 18px;">
              <label for="contact-name" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Your Name <span>*</span></label>
              <input type="text" id="contact-name" name="name" class="form-control" placeholder="Ayesha Khan" required />
            </div>

            <div class="form-group" style="margin-bottom: 18px;">
              <label for="contact-email" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Email Address <span>*</span></label>
              <input type="email" id="contact-email" name="email" class="form-control" placeholder="name@example.com" required />
            </div>

            <div class="form-group" style="margin-bottom: 24px;">
              <label for="contact-message" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Message <span>*</span></label>
              <textarea id="contact-message" name="message" rows="5" class="form-control" placeholder="How can we assist your routine today?" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </main>
  `;

  fs.writeFileSync(path.join(projectDir, 'contact.html'), `${head}\n<body data-page="contact">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled contact.html');
}

// ==========================================
// 8. CART (cart.html)
// ==========================================
{
  const head = getHead(
    "Your Glowistic Bag — Shopping Cart",
    "Review your selected Glowistic essentials with Cash on Delivery across Pakistan.",
    "cart",
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Your Glowistic Bag — Shopping Cart",
      "url": "https://www.glowisticpk.com/cart"
    }
  );

  const header = getHeader('cart');
  const footer = getFooter();

  const body = `
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
      <div id="cart-page-grid" style="display: grid; grid-template-columns: 1fr; gap: 36px; align-items: flex-start;" class="cart-layout-grid">
        <style>
          @media (min-width: 860px) {
            .cart-layout-grid { grid-template-columns: 1fr 380px !important; }
          }
        </style>
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
            <span id="cart-page-delivery">Rs. 200</span>
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
            <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text-muted); cursor: pointer;" data-action="show-card-modal">
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
        </div>
      </div>

      <!-- Empty State View -->
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

  fs.writeFileSync(path.join(projectDir, 'cart.html'), `${head}\n<body data-page="cart">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled cart.html');
}

// ==========================================
// 9. CHECKOUT (checkout.html)
// ==========================================
{
  const head = getHead(
    "Complete Your Order — Cash on Delivery | Glowistic",
    "Secure Cash on Delivery checkout for authentic Glowistic skincare, hair care, and wellness essentials.",
    "checkout",
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Complete Your Order — Cash on Delivery | Glowistic",
      "url": "https://www.glowisticpk.com/checkout"
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

      <div class="checkout-grid" style="display: grid; grid-template-columns: 1fr; gap: 36px;" class="checkout-layout-grid">
        <style>
          @media (min-width: 860px) {
            .checkout-grid { grid-template-columns: 1fr 380px !important; }
          }
        </style>
        <!-- Form Column -->
        <div class="checkout-form-col">
          <form id="glowistic-checkout-form">
            <!-- 1. Customer Details -->
            <div class="checkout-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <div class="checkout-card-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
                <span class="step-num" style="width: 28px; height: 28px; background: var(--color-primary); color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: bold;">1</span>
                <h3 style="margin: 0; color: var(--color-primary); font-size: 1.15rem;">Customer Details</h3>
              </div>

              <div class="form-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 16px;">
                <div class="form-group">
                  <label for="checkout-name" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Full Name <span>*</span></label>
                  <input type="text" id="checkout-name" name="fullName" class="form-control" placeholder="Ayesha Khan" required />
                </div>
                <div class="form-group">
                  <label for="checkout-phone" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Mobile / WhatsApp Number <span>*</span></label>
                  <input type="tel" id="checkout-phone" name="phone" class="form-control" placeholder="03445422609" pattern="[0-9]{11}" title="Please enter an 11-digit Pakistani phone number (e.g. 03445422609)" required />
                </div>
              </div>

              <div class="form-group">
                <label for="checkout-email" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Email Address <span>*</span></label>
                <input type="email" id="checkout-email" name="email" class="form-control" placeholder="name@example.com" required />
              </div>
            </div>

            <!-- 2. Delivery Address -->
            <div class="checkout-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <div class="checkout-card-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
                <span class="step-num" style="width: 28px; height: 28px; background: var(--color-primary); color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: bold;">2</span>
                <h3 style="margin: 0; color: var(--color-primary); font-size: 1.15rem;">Delivery Address (Pakistan)</h3>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label for="checkout-address" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">House / Flat #, Street <span>*</span></label>
                <input type="text" id="checkout-address" name="address" class="form-control" placeholder="House / Flat #, Street" required />
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label for="checkout-area" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Area / Sector / Colony <span>*</span></label>
                <input type="text" id="checkout-area" name="area" class="form-control" placeholder="e.g. DHA Phase 5 / F-10 / Gulberg" required />
              </div>

              <div class="form-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                <div class="form-group">
                  <label for="checkout-city" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">City <span>*</span></label>
                  <input type="text" id="checkout-city" name="city" list="pakistan-cities-list" class="form-control" placeholder="Select or type city" required />
                  <datalist id="pakistan-cities-list"></datalist>
                </div>
                <div class="form-group">
                  <label for="checkout-province" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Province <span>*</span></label>
                  <select id="checkout-province" name="province" class="form-control" required>
                    <option value="" disabled selected>Select Province</option>
                  </select>
                </div>
              </div>

              <div class="form-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <div class="form-group">
                  <label for="checkout-postal" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Postal Code <span>*</span></label>
                  <input type="text" id="checkout-postal" name="postalCode" class="form-control" placeholder="44000" required />
                </div>
                <div class="form-group">
                  <label for="checkout-notes" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Order Notes <small class="text-muted">(Optional)</small></label>
                  <input type="text" id="checkout-notes" name="orderNotes" class="form-control" placeholder="e.g. Near City Hospital / Leave at gate" />
                </div>
              </div>
            </div>

            <!-- 3. Payment Method -->
            <div class="checkout-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <div class="checkout-card-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
                <span class="step-num" style="width: 28px; height: 28px; background: var(--color-primary); color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: bold;">3</span>
                <h3 style="margin: 0; color: var(--color-primary); font-size: 1.15rem;">Payment Method</h3>
              </div>

              <div class="payment-options-grid" style="display: flex; flex-direction: column; gap: 12px;">
                <!-- COD Option -->
                <label class="payment-method-card is-selected" style="background: #F4FAF6; border: 2px solid #2D6A4F; border-radius: 8px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; cursor: pointer;">
                  <input type="radio" name="paymentMethod" value="cod" checked style="accent-color: #2D6A4F; margin-top: 4px;" />
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <strong style="color: #1E4633;">Cash on Delivery (COD)</strong>
                      <span class="badge-cod-active" style="background: #2D6A4F; color: #FFF; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;">Active</span>
                    </div>
                    <p style="font-size: 0.85rem; color: #2D6A4F; margin: 4px 0 0;">Pay when your order arrives. Standard nationwide dispatch in 2 to 4 business days.</p>
                  </div>
                </label>

                <!-- Disabled Card Option -->
                <div class="payment-method-card is-disabled" data-action="show-card-modal" style="background: var(--color-bg); border: 1px dashed var(--color-border); border-radius: 8px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; cursor: pointer;">
                  <input type="radio" name="paymentMethod" value="card" disabled style="margin-top: 4px;" />
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <strong style="color: var(--color-text-muted);">Card Payment</strong>
                      <span class="payment-badge-coming-soon" style="background: #FDF2E9; color: #D35400; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;">Coming Soon</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 4px 0 0;">Online card payments are currently integrating. Click to learn more.</p>
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

            <button type="submit" id="checkout-submit-btn" class="btn btn-primary btn-block btn-lg">
              Place COD Order
            </button>
            <div id="checkout-loading-msg" style="display: none; text-align: center; margin-top: 12px; font-weight: 600; color: var(--color-primary);">
              ⏳ Placing your order...
            </div>
          </form>
        </div>

        <!-- Summary Column -->
        <div class="checkout-summary-col">
          <div class="checkout-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px; position: sticky; top: 100px;">
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

  fs.writeFileSync(path.join(projectDir, 'checkout.html'), `${head}\n<body data-page="checkout">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled checkout.html');
}

// ==========================================
// 10. CONFIRMATION (confirmation.html)
// ==========================================
{
  const head = getHead(
    "Thank You for Choosing Glowistic — Order Received",
    "Order confirmation and details for your Glowistic purchase.",
    "confirmation",
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Thank You for Choosing Glowistic — Order Received",
      "url": "https://www.glowisticpk.com/confirmation"
    }
  );

  const header = getHeader('confirmation');
  const footer = getFooter();

  const body = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh; padding: 50px 0 90px;">
    <div class="container container-narrow">
      <div id="confirmation-content-box" class="confirmation-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 48px 36px; box-shadow: var(--shadow-md); text-align: center;">
        <!-- Clean Success Check Icon -->
        <div style="width: 68px; height: 68px; background: #EBF7EE; color: var(--color-success, #2D6A4F); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px; box-shadow: 0 4px 12px rgba(45, 106, 79, 0.15);">
          ✓
        </div>
        
        <h1 style="font-size: 2.25rem; color: var(--color-primary); margin-bottom: 8px; font-family: var(--font-serif); font-weight: 600;">
          Thank You for Choosing Glowistic.
        </h1>
        
        <p style="font-size: 1.125rem; color: var(--color-text); margin-bottom: 28px; font-weight: 500;">
          Your order has been received.
        </p>

        <!-- Order Reference Badge -->
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 14px 24px; display: inline-block; margin-bottom: 32px;">
          <span style="font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Order Number</span>
          <strong id="confirm-order-id" style="font-size: 1.35rem; color: var(--color-primary); letter-spacing: 0.05em; font-family: monospace;">GLW-2026-XXXX</strong>
        </div>

        <!-- Dynamic Order Details (Hydrated by JS) -->
        <div id="confirm-details-container" style="text-align: left; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 28px 0; margin-bottom: 28px;">
          <!-- Injected dynamically by js/app.js -->
        </div>

        <!-- Order Processing Note -->
        <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 32px;">
          Your order will be processed and delivered using the details you provided.
        </p>

        <!-- CTAs -->
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="shop.html" class="btn btn-primary btn-lg" style="min-width: 200px;">
            Continue Shopping
          </a>
          <a href="#" id="confirm-whatsapp-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg" style="min-width: 240px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
            Chat with Glowistic on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </main>
  `;

  fs.writeFileSync(path.join(projectDir, 'confirmation.html'), `${head}\n<body data-page="confirmation">\n${header}\n${body}\n${footer}`, 'utf8');
  console.log('✓ Compiled confirmation.html');
}

console.log('All pages built successfully!');

// Also duplicate terms-conditions.html to terms-and-conditions.html for universal link support
const termsSrc = path.join(projectDir, 'terms-conditions.html');
const termsDst = path.join(projectDir, 'terms-and-conditions.html');
if (fs.existsSync(termsSrc)) {
  fs.copyFileSync(termsSrc, termsDst);
  console.log('✓ Synchronized terms-and-conditions.html');
}
