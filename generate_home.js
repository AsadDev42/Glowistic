const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

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
        "target": "https://www.glowisticpk.com/shop.html?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

const head = getHead(
  'Glowistic | Beauty, Skincare & Personal Care Essentials in Pakistan',
  'Discover Glowistic — authentic beauty, skincare, hair care, personal care, and wellness essentials for everyday routines. Simple choices, feel-good care, and nationwide Cash on Delivery across Pakistan.',
  'index.html',
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
          Beauty, skincare &amp; personal care essentials made for your daily routine.
        </p>
        <p class="hero-editorial-sub">
          Simple choices, feel-good care, and products you'll love using every day.
        </p>
        <div class="hero-actions">
          <a href="shop.html" class="btn btn-primary btn-lg">Shop Glowistic</a>
          <a href="shop.html" class="btn btn-outline btn-lg">Explore Products</a>
        </div>
        <div class="hero-stats-row">
          <div class="hero-stat-item">
            <strong>Original</strong>
            <span>Verified Formulations</span>
          </div>
          <div class="hero-stat-item">
            <strong>Nationwide COD</strong>
            <span>Pay on Doorstep</span>
          </div>
          <div class="hero-stat-item">
            <strong>Everyday Use</strong>
            <span>Pure Family Care</span>
          </div>
        </div>
      </div>
      <div class="hero-media">
        <div class="hero-visual-card">
          <img src="assets/products/oclear-serum.jpg" alt="Glowistic O'Clear Acne Clear Serum" class="hero-featured-img" fetchpriority="high" decoding="async" width="540" height="540" />
          <div class="hero-floating-card">
            <div class="hero-floating-info">
              <span class="badge badge-gold">Featured Essential</span>
              <h4>O'Clear Acne Clear Serum</h4>
              <p>Tea Tree Oil &amp; Salicylic Acid &bull; 30ml</p>
            </div>
            <div class="hero-floating-price">Rs. 1,450</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Value Proposition Strip -->
  <section class="trust-strip">
    <div class="container trust-grid">
      <div class="trust-card">
        <div class="trust-icon-box">💵</div>
        <div>
          <h4>Cash on Delivery</h4>
          <p>Pay conveniently when your package arrives at your home.</p>
        </div>
      </div>
      <div class="trust-card">
        <div class="trust-icon-box">🌿</div>
        <div>
          <h4>Clean Formulations</h4>
          <p>Carefully selected ingredients crafted for everyday confidence.</p>
        </div>
      </div>
      <div class="trust-card">
        <div class="trust-icon-box">📦</div>
        <div>
          <h4>Free Delivery Over Rs. 2,500</h4>
          <p>Enjoy free doorstep courier across all Pakistan cities.</p>
        </div>
      </div>
      <div class="trust-card">
        <div class="trust-icon-box">💬</div>
        <div>
          <h4>Direct WhatsApp Support</h4>
          <p>Friendly personal guidance anytime at 03445422609.</p>
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
        <a href="shop.html?category=haircare" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/reroot-shampoo.jpg" alt="Hair Care Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Hair Care</h3>
            <p class="category-visual-desc">Botanical onion, rosemary, and arnica therapies crafted for scalp vitality and thick roots.</p>
            <span class="category-visual-cta">Explore Hair Care &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=personalcare" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/arnica-shampoo.jpg" alt="Personal Care Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Personal Care</h3>
            <p class="category-visual-desc">Gentle everyday washes and nourishing hygiene essentials for the whole family.</p>
            <span class="category-visual-cta">Explore Personal Care &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=bodycare" class="category-visual-card">
          <div class="category-visual-media">
            <img src="assets/products/lavender-lotion.jpg" alt="Body Care Category" class="category-visual-img" loading="lazy" />
          </div>
          <div class="category-visual-body">
            <h3 class="category-visual-title">Body Care</h3>
            <p class="category-visual-desc">Calming lavender and chamomile lotions for velvety, soothing 24-hour hydration.</p>
            <span class="category-visual-cta">Explore Body Care &rarr;</span>
          </div>
        </a>
        <a href="shop.html?category=wellness" class="category-visual-card">
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
            <p class="category-visual-desc">Rich chocolate granules and homeopathic youth growth courses for healthy weight &amp; energy.</p>
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
      <div id="home-bestsellers-grid" class="products-grid"></div>
      <div style="text-align: center; margin-top: 48px;">
        <a href="shop.html" class="btn btn-outline btn-lg">Browse All Products &rarr;</a>
      </div>
    </div>
  </section>

  <!-- SECTION 4: BRAND STORY -->
  <section class="story-section">
    <div class="container story-grid">
      <div class="story-media-side">
        <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(254, 246, 225, 0.2); box-shadow: var(--shadow-xl);">
          <img src="assets/products/lavender-lotion.jpg" alt="Glowistic Everyday Essentials" style="width: 100%; height: 460px; object-fit: cover;" />
        </div>
      </div>
      <div class="story-content-side">
        <span class="story-tag">Our Brand Story</span>
        <h2 class="story-heading">Everyday Care, Made Simple.</h2>
        <p class="story-text">
          Glowistic brings together beauty, skincare, personal care and wellness essentials designed to make everyday self-care feel simple, enjoyable and accessible.
        </p>
        <p class="story-text" style="font-size: 0.9375rem; opacity: 0.85; margin-bottom: 32px;">
          We believe confidence begins with taking care of yourself. Our formulations prioritize pure, feel-good ingredients and honest pricing so you can build routines you truly look forward to every day.
        </p>
        <a href="about.html" class="btn btn-outline-white btn-lg">Discover Glowistic &rarr;</a>
      </div>
    </div>
  </section>

  <!-- SECTION 5: WHY GLOWISTIC -->
  <section class="section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">The Glowistic Difference</span>
        <h2 class="section-title">Care You Can Count On</h2>
        <p class="section-desc">Designed with intentionality for consistency, comfort, and real daily life.</p>
      </div>
      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon-box">🌱</div>
          <h3 class="pillar-title">Everyday Essentials</h3>
          <p class="pillar-desc">Formulated for seamless daily use in your morning and evening routines without complicated steps.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon-box">✨</div>
          <h3 class="pillar-title">Simple Choices</h3>
          <p class="pillar-desc">Straightforward, honest products that take the confusion and guesswork out of personal care.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon-box">🤍</div>
          <h3 class="pillar-title">Care You Can Feel Good About</h3>
          <p class="pillar-desc">Thoughtful formulations free from harsh stripping chemicals, designed with respect for your skin and hair.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon-box">🎯</div>
          <h3 class="pillar-title">Made for Your Routine</h3>
          <p class="pillar-desc">Tailored to support consistency, confidence, and genuine everyday vitality across all seasons in Pakistan.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: PRODUCT SPOTLIGHT -->
  <section class="spotlight-section">
    <div class="container spotlight-grid">
      <div class="spotlight-media-wrap">
        <img src="assets/products/reroot-growth-pack.jpg" alt="reroot Hair Growth Course" class="spotlight-img" />
        <span class="badge badge-gold spotlight-badge">Complete 1-Month Regimen</span>
      </div>
      <div class="spotlight-content">
        <span class="spotlight-tag">Product Spotlight</span>
        <h2 class="spotlight-title">reroot® Hair Growth Spray &amp; Tablets Pack</h2>
        <p class="spotlight-subtitle">One-Month Hair Strengthening &amp; Regrowth Course</p>
        <p class="spotlight-desc">
          An intensive, synergistic inside-out system combining direct topical scalp stimulation with essential daily nutraceutical support for stronger, denser hair roots.
        </p>
        <div class="spotlight-key-info-grid">
          <div class="spotlight-info-pill"><strong>Format</strong><span>1x 60ml Spray + 2x 60 Tablets</span></div>
          <div class="spotlight-info-pill"><strong>Key Actives</strong><span>Rosemary, Redensyl &amp; Biotin</span></div>
          <div class="spotlight-info-pill"><strong>Target Concern</strong><span>Thinning Hair &amp; Weak Roots</span></div>
          <div class="spotlight-info-pill"><strong>Suitability</strong><span>All Hair Types &bull; Paraben-Safe</span></div>
        </div>
        <div class="spotlight-pricing-row">
          <div class="spotlight-price">Rs. 2,850</div>
          <div class="spotlight-orig-price">Rs. 3,400</div>
          <span class="badge-cod-active">🚚 Eligible for FREE Delivery (COD)</span>
        </div>
        <div class="spotlight-actions">
          <a href="product.html?id=reroot-hair-growth-pack" class="btn btn-primary btn-lg">Shop Now &rarr;</a>
          <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20want%20to%20order%20the%20reroot%20Hair%20Growth%20Pack%20(Rs.%202850)%20via%20Cash%20on%20Delivery." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 7: HOW TO ORDER -->
  <section class="section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Seamless Shopping</span>
        <h2 class="section-title">How to Order with Glowistic</h2>
        <p class="section-desc">Fast, transparent, and completely worry-free with Cash on Delivery nationwide.</p>
      </div>
      <div class="order-steps-grid">
        <div class="order-step-card">
          <div class="step-number-tag">01</div>
          <div class="order-step-icon">🛍️</div>
          <h3 class="order-step-title">Choose Your Product</h3>
          <p class="order-step-desc">Browse our curated essentials and select the solutions tailored to your everyday goals.</p>
        </div>
        <div class="order-step-card">
          <div class="step-number-tag">02</div>
          <div class="order-step-icon">🛒</div>
          <h3 class="order-step-title">Add to Cart</h3>
          <p class="order-step-desc">Pick your quantities and enjoy instant Free Delivery calculation on orders over Rs. 2,500.</p>
        </div>
        <div class="order-step-card">
          <div class="step-number-tag">03</div>
          <div class="order-step-icon">📍</div>
          <h3 class="order-step-title">Enter Delivery Details</h3>
          <p class="order-step-desc">Fill in your shipping address, city, and mobile number. No online card required.</p>
        </div>
        <div class="order-step-card">
          <div class="step-number-tag">04</div>
          <div class="order-step-icon">📦</div>
          <h3 class="order-step-title">Receive Order with COD</h3>
          <p class="order-step-desc">Pay cash comfortably at your doorstep when our courier partner delivers your package.</p>
        </div>
      </div>
      <div class="whatsapp-assist-box">
        <div class="whatsapp-assist-text">
          <h4>Prefer WhatsApp? You can contact us directly.</h4>
          <p>Send us your product list and address on WhatsApp for instant 1-on-1 order booking and support.</p>
        </div>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20place%20an%20order%20directly." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          Order on WhatsApp (03445422609)
        </a>
      </div>
    </div>
  </section>

  <!-- Interactive Routine Finder Quiz -->
  <section id="routine-finder" class="routine-finder-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Personalized Routine Matcher</span>
        <h2 class="section-title">Find Your Everyday Glow Routine</h2>
        <p class="section-desc">Take our 30-second guided quiz to discover the exact products tailored to your goals.</p>
      </div>
      <div class="routine-finder-wrapper" id="routine-quiz-container"></div>
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
      <div class="blog-home-grid">
        <article class="blog-home-card">
          <div class="blog-home-img-wrap">
            <a href="/blog/how-to-build-a-simple-skincare-routine" style="display: block; width: 100%; height: 100%;">
              <img src="assets/blog/skincare-routine.svg" alt="How to Build a Simple Skincare Routine" class="blog-home-img" loading="lazy" />
            </a>
          </div>
          <div class="blog-home-body">
            <div class="blog-meta-row">
              <span class="badge badge-gold">Skincare</span>
              <span class="text-xs text-muted">Sep 02, 2026</span>
            </div>
            <h3 class="blog-home-title"><a href="/blog/how-to-build-a-simple-skincare-routine">How to Build a Simple Skincare Routine</a></h3>
            <p class="blog-home-excerpt">Great skincare does not require ten complex steps. Learn how a gentle cleanse, targeted active, and lightweight moisture create lasting daily radiance.</p>
            <a href="/blog/how-to-build-a-simple-skincare-routine" class="blog-read-link">Read Article &rarr;</a>
          </div>
        </article>
        <article class="blog-home-card">
          <div class="blog-home-img-wrap">
            <a href="/blog/how-to-choose-personal-care-products-for-your-routine" style="display: block; width: 100%; height: 100%;">
              <img src="assets/blog/personal-care.svg" alt="How to Choose Personal Care Products for Your Routine" class="blog-home-img" loading="lazy" />
            </a>
          </div>
          <div class="blog-home-body">
            <div class="blog-meta-row">
              <span class="badge badge-burgundy">Personal Care</span>
              <span class="text-xs text-muted">Aug 28, 2026</span>
            </div>
            <h3 class="blog-home-title"><a href="/blog/how-to-choose-personal-care-products-for-your-routine">How to Choose Personal Care Products for Your Routine</a></h3>
            <p class="blog-home-excerpt">Navigating product labels can be difficult. Learn how to identify skin-kind formulas, recognize honest botanicals, and build an effortless routine.</p>
            <a href="/blog/how-to-choose-personal-care-products-for-your-routine" class="blog-read-link">Read Article &rarr;</a>
          </div>
        </article>
        <article class="blog-home-card">
          <div class="blog-home-img-wrap">
            <a href="/blog/why-everyday-self-care-matters" style="display: block; width: 100%; height: 100%;">
              <img src="assets/blog/self-care.svg" alt="Why Everyday Self-Care Matters" class="blog-home-img" loading="lazy" />
            </a>
          </div>
          <div class="blog-home-body">
            <div class="blog-meta-row">
              <span class="badge badge-green">Wellness</span>
              <span class="text-xs text-muted">Aug 20, 2026</span>
            </div>
            <h3 class="blog-home-title"><a href="/blog/why-everyday-self-care-matters">Why Everyday Self-Care Matters</a></h3>
            <p class="blog-home-excerpt">Confidence begins with taking care of yourself. Explore why small, consistent moments of daily care anchor your well-being and bring calm into busy lives.</p>
            <a href="/blog/why-everyday-self-care-matters" class="blog-read-link">Read Article &rarr;</a>
          </div>
        </article>
      </div>
      <div style="text-align: center;">
        <a href="/blog" class="btn btn-outline btn-lg">Explore Glow Journal &rarr;</a>
      </div>
    </div>
  </section>

  <!-- SECTION 9: FAQ (10 DETAILED QUESTIONS) -->
  <section class="section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Got Questions?</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-desc">Clear, honest answers regarding our products, ordering, and delivery across Pakistan.</p>
      </div>
      <div class="faq-home-wrapper">
        <details class="faq-item" open>
          <summary class="faq-question"><span>1. What products does Glowistic offer?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Glowistic provides an authentic range of everyday essentials across Skincare (O'Clear Acne Serum, Neem Face Wash), Hair Care (reroot® Anti-Hairfall Shampoo, Hair Growth Pack, Arnica Shampoo), Body &amp; Personal Care (Lavender Chamomile Lotion), and Family Wellness &amp; Supplements (Hema-Lin Iron Ampoules, SUPER TON Chocolate Granules, WeGro Ideal Growth).</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>2. Do you offer Cash on Delivery?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Yes! Cash on Delivery (COD) is our primary and active payment method. You can place your order online or via WhatsApp and pay in cash when the parcel arrives at your doorstep.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>3. Are card payments available?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Online debit/credit card payments are currently <strong>Coming Soon</strong> as we finalize secure local banking gateway integrations. For now, please use Cash on Delivery or contact us on WhatsApp for alternative assistance.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>4. How can I place an order through WhatsApp?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Simply click any WhatsApp button or text us at <strong>03445422609</strong> with the product names you want to order and your full delivery address. Our care team will confirm and dispatch your parcel immediately.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>5. How do I know which product is right for me?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">You can take our interactive <a href="#routine-finder" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">Glow Routine Finder Quiz</a> above, read our comprehensive product guides on each product page, or send us a message on WhatsApp for personalized routine recommendations.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>6. Where does Glowistic deliver?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">We deliver nationwide to all cities, towns, and postal codes across Pakistan through registered, reliable courier services.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>7. How long does delivery take?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Standard delivery takes <strong>2 to 4 business days</strong> for major cities (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad, Multan, Quetta) and 3 to 5 business days for other regional areas.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>8. Can I change or cancel my order?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Yes. If you need to update your delivery address, change items, or cancel your order, please message our WhatsApp helpline (<strong>03445422609</strong>) as soon as possible before your package is handed over to the courier.</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>9. How can I contact Glowistic?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">You can contact us via WhatsApp at <strong>03445422609</strong>, visit our <a href="contact.html" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">Contact Page</a>, or reach out on Instagram (<strong>@glowisticpk</strong>) and Facebook (<strong>@glowisticpk.store</strong>).</div>
        </details>
        <details class="faq-item">
          <summary class="faq-question"><span>10. What should I do if I have a question about a product?</span><span class="faq-indicator">+</span></summary>
          <div class="faq-answer">Our customer care team is delighted to help. You can text us directly on WhatsApp with your query, skin type, or hair concern for friendly, non-pushy guidance.</div>
        </details>
      </div>
    </div>
  </section>

  <!-- SECTION 10: FINAL CTA -->
  <section class="final-cta-section">
    <div class="container final-cta-wrapper">
      <span class="badge badge-gold" style="margin-bottom: 16px;">Begin Your Routine</span>
      <h2 class="final-cta-heading">Glow More. Feel Better.</h2>
      <p class="final-cta-copy">
        Make everyday care a little easier with Glowistic.
      </p>
      <div class="final-cta-buttons">
        <a href="shop.html" class="btn btn-secondary btn-lg">Shop Now</a>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>
`;

const finalHtml = `${head}\n<body data-page="home">\n${header}\n<main>\n${body}\n</main>\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml, 'utf8');
console.log('Successfully generated index.html with all 10 sections!');
