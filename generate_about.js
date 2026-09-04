const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Glowistic — Everyday Care Starts with Glowistic",
  "description": "Beauty, skincare, personal care and wellness essentials made for everyday routines in Pakistan.",
  "url": "https://www.glowisticpk.com/about.html"
};

const head = getHead(
  'About Us — Everyday Care Starts with Glowistic',
  'Learn about Glowistic — beauty, skincare, personal care and wellness essentials made for everyday routines in Pakistan.',
  'about.html',
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
      <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center;">
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
            In a fast-paced world filled with overwhelming multi-step routines, exaggerated marketing claims, and confusing ingredient lists, daily personal care often feels complicated. We believe that true confidence begins with simple habits you actually look forward to every day.
          </p>
          <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.8; margin-bottom: 24px;">
            Glowistic brings together honest, dependable essentials across <strong>beauty, skincare, personal care, hair care, body care, and family wellness</strong>. From clarifying tea tree and neem facial cleansers to botanical onion and rosemary hair oils, soothing lavender chamomile body lotions, and revitalizing wellness syrups, our products are crafted to fit naturally into real lifestyles.
          </p>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--color-success); font-size: 1.25rem;">✓</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">Everyday Formulations</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--color-success); font-size: 1.25rem;">✓</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">Direct Personal Care</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--color-success); font-size: 1.25rem;">✓</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">Nationwide COD</span>
            </div>
          </div>
        </div>

        <div style="position: relative;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); padding: 12px;">
              <img src="assets/products/oclear-serum.jpg" alt="O'Clear Acne Clear Serum" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px;" />
              <div style="padding: 10px 4px 4px; text-align: center;">
                <strong style="display: block; font-size: 0.875rem; color: var(--color-primary);">Everyday Skincare</strong>
                <span style="font-size: 0.75rem; color: var(--color-text-muted);">Gentle BHA &amp; Tea Tree</span>
              </div>
            </div>
            <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); padding: 12px; margin-top: 24px;">
              <img src="assets/products/reroot-growth-pack.jpg" alt="ReRoot Onion &amp; Rosemary Hair Oil" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px;" />
              <div style="padding: 10px 4px 4px; text-align: center;">
                <strong style="display: block; font-size: 0.875rem; color: var(--color-primary);">Botanical Hair Care</strong>
                <span style="font-size: 0.75rem; color: var(--color-text-muted);">Onion &amp; Rosemary Extract</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: WHAT WE BELIEVE (4 PRINCIPLES) -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 80px 0;">
    <div class="container">
      <div class="section-header" style="text-align: center; margin-bottom: 48px;">
        <span class="section-tag">Our Core Philosophy</span>
        <h2 class="section-title" style="font-size: 2.25rem;">What We Believe</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 8px auto 0;">
          Four core principles guide every choice we make and every product in our catalog.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
        <!-- Principle 1: Simple Choices -->
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; transition: transform 0.2s ease, box-shadow 0.2s ease;" class="hover-card">
          <div style="width: 48px; height: 48px; background: #FEF6E1; border: 1px solid #E6D2B5; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 18px;">
            ✨
          </div>
          <h3 style="font-size: 1.2rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Simple Choices</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.65; margin: 0;">
            Clear, straightforward product options that remove confusion. We focus on transparent formulations that make it easy to choose what your routine needs without guesswork.
          </p>
        </div>

        <!-- Principle 2: Everyday Care -->
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; transition: transform 0.2s ease, box-shadow 0.2s ease;" class="hover-card">
          <div style="width: 48px; height: 48px; background: #EBF7EE; border: 1px solid #C4E8CD; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 18px;">
            🌿
          </div>
          <h3 style="font-size: 1.2rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Everyday Care</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.65; margin: 0;">
            Formulations designed specifically for consistency. Easy to use, gentle on your skin and scalp, and practical enough to maintain morning and evening without disruption.
          </p>
        </div>

        <!-- Principle 3: Feel-Good Routines -->
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; transition: transform 0.2s ease, box-shadow 0.2s ease;" class="hover-card">
          <div style="width: 48px; height: 48px; background: #F5EBE6; border: 1px solid #E8D0C5; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 18px;">
            🤍
          </div>
          <h3 style="font-size: 1.2rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Feel-Good Routines</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.65; margin: 0;">
            Self-care is a moment to recharge. Our products feature soothing botanical scents, refreshing textures, and gentle comfort so taking care of yourself feels genuinely rewarding.
          </p>
        </div>

        <!-- Principle 4: Customer First -->
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 32px 24px; transition: transform 0.2s ease, box-shadow 0.2s ease;" class="hover-card">
          <div style="width: 48px; height: 48px; background: #EDE8E3; border: 1px solid #D6CBC1; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 18px;">
            🤝
          </div>
          <h3 style="font-size: 1.2rem; color: var(--color-primary); margin-bottom: 10px; font-weight: 600;">Customer First</h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.65; margin: 0;">
            Convenient Cash on Delivery all across Pakistan, transparent product pricing, and responsive WhatsApp consultation whenever you need product recommendations.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: MORE THAN PRODUCTS -->
  <section class="section-padding" style="background-color: var(--color-bg); padding: 80px 0;">
    <div class="container container-narrow">
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 48px 40px; box-shadow: var(--shadow-sm); text-align: center;">
        <span class="section-tag" style="margin-bottom: 12px; display: inline-block;">Beyond Just Shopping</span>
        <h2 style="font-size: 2rem; color: var(--color-primary); margin-bottom: 16px; font-family: var(--font-serif); font-weight: 600;">
          More Than Products
        </h2>
        <p style="font-size: 1.0625rem; color: var(--color-text); line-height: 1.8; max-width: 720px; margin: 0 auto 20px;">
          Glowistic is focused on helping customers discover practical products for their everyday routines.
        </p>
        <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.8; max-width: 680px; margin: 0 auto 32px;">
          We believe that beauty and wellness are not one-time fixes or luxury privileges—they are daily acts of personal nourishment. We guide you through how to use each formula, which ingredients suit your skin type or hair condition, and how to build a routine that lasts.
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left; margin-top: 24px;">
          <div style="background: var(--color-bg); padding: 20px; border-radius: 8px; border: 1px solid var(--color-border-light);">
            <strong style="color: var(--color-primary); display: block; font-size: 0.9375rem; margin-bottom: 4px;">🎯 Practical Guidance</strong>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5;">Clear instructions on how and when to apply each essential.</span>
          </div>
          <div style="background: var(--color-bg); padding: 20px; border-radius: 8px; border: 1px solid var(--color-border-light);">
            <strong style="color: var(--color-primary); display: block; font-size: 0.9375rem; margin-bottom: 4px;">🔍 Factual Ingredients</strong>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5;">Authentic packaging formulations with zero hidden active lists.</span>
          </div>
          <div style="background: var(--color-bg); padding: 20px; border-radius: 8px; border: 1px solid var(--color-border-light);">
            <strong style="color: var(--color-primary); display: block; font-size: 0.9375rem; margin-bottom: 4px;">💬 Direct Advice</strong>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5;">Direct WhatsApp beauty concierge at your service.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: EXPLORE OUR CATEGORIES -->
  <section class="section-padding" style="background-color: var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 80px 0;">
    <div class="container">
      <div class="section-header" style="text-align: center; margin-bottom: 48px;">
        <span class="section-tag">Complete Collections</span>
        <h2 class="section-title" style="font-size: 2.25rem;">Explore Our Categories</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 8px auto 0;">
          Care for every part of your routine—from hair roots to skincare and family wellness.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <!-- Category 1: Skincare -->
        <a href="shop.html?category=skincare" style="text-decoration: none; color: inherit; display: block;" class="category-showcase-card">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div style="height: 200px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 12px;">
              <img src="assets/products/oclear-serum.jpg" alt="Skincare Collection" style="height: 100%; width: auto; object-fit: contain;" />
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0; font-weight: 600;">Skincare</h3>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);">&rarr;</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
                Targeted acne clearing serums, purifying neem cleansers &amp; clarifying formulas.
              </p>
            </div>
          </div>
        </a>

        <!-- Category 2: Hair Care -->
        <a href="shop.html?category=haircare" style="text-decoration: none; color: inherit; display: block;" class="category-showcase-card">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div style="height: 200px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 12px;">
              <img src="assets/products/reroot-growth-pack.jpg" alt="Hair Care Collection" style="height: 100%; width: auto; object-fit: contain;" />
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0; font-weight: 600;">Hair Care</h3>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);">&rarr;</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
                Botanical onion &amp; rosemary oils, anti-hair-fall shampoos &amp; scalp treatments.
              </p>
            </div>
          </div>
        </a>

        <!-- Category 3: Personal Care -->
        <a href="shop.html?category=personalcare" style="text-decoration: none; color: inherit; display: block;" class="category-showcase-card">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div style="height: 200px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 12px;">
              <img src="assets/products/arnica-shampoo.jpg" alt="Personal Care Collection" style="height: 100%; width: auto; object-fit: contain;" />
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0; font-weight: 600;">Personal Care</h3>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);">&rarr;</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
                Everyday botanical shampoos, cleansing solutions &amp; daily family grooming essentials.
              </p>
            </div>
          </div>
        </a>

        <!-- Category 4: Body Care -->
        <a href="shop.html?category=bodycare" style="text-decoration: none; color: inherit; display: block;" class="category-showcase-card">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div style="height: 200px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 12px;">
              <img src="assets/products/lavender-lotion.jpg" alt="Body Care Collection" style="height: 100%; width: auto; object-fit: contain;" />
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0; font-weight: 600;">Body Care</h3>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);">&rarr;</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
                Deep moisture body lotions enriched with French lavender &amp; soothing chamomile.
              </p>
            </div>
          </div>
        </a>

        <!-- Category 5: Wellness -->
        <a href="shop.html?category=wellness" style="text-decoration: none; color: inherit; display: block;" class="category-showcase-card">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div style="height: 200px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 12px;">
              <img src="assets/products/super-ton.jpg" alt="Wellness Collection" style="height: 100%; width: auto; object-fit: contain;" />
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0; font-weight: 600;">Wellness</h3>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);">&rarr;</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
                Daily restorative tonics, iron deficiency syrups &amp; stamina building nutrition.
              </p>
            </div>
          </div>
        </a>

        <!-- Category 6: Supplements -->
        <a href="shop.html?category=supplements" style="text-decoration: none; color: inherit; display: block;" class="category-showcase-card">
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div style="height: 200px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 12px;">
              <img src="assets/products/wegro.jpg" alt="Supplements Collection" style="height: 100%; width: auto; object-fit: contain;" />
            </div>
            <div style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-size: 1.15rem; color: var(--color-primary); margin: 0; font-weight: 600;">Supplements</h3>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);">&rarr;</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
                Balanced growth granules, essential mineral support &amp; vitality supplements.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- SECTION 6: WHY GLOWISTIC -->
  <section class="section-padding" style="background-color: var(--color-bg); padding: 80px 0;">
    <div class="container">
      <div class="section-header" style="text-align: center; margin-bottom: 48px;">
        <span class="section-tag">The Glowistic Difference</span>
        <h2 class="section-title" style="font-size: 2.25rem;">Why Glowistic</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 8px auto 0;">
          Clear, honest value propositions tailored for your convenience and trust.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 1.8rem; margin-bottom: 12px;">🚚</div>
          <h3 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px; font-weight: 600;">Cash on Delivery Across Pakistan</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            Shop with total peace of mind. Pay cash at your doorstep upon parcel arrival with zero advance payments required.
          </p>
        </div>

        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 1.8rem; margin-bottom: 12px;">🛡️</div>
          <h3 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px; font-weight: 600;">Authentic Lab-Formulated Essentials</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            Every single product is authentic, factory-sealed, and formulated with proven botanical and dermatological ingredients.
          </p>
        </div>

        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 1.8rem; margin-bottom: 12px;">💬</div>
          <h3 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px; font-weight: 600;">Direct WhatsApp Concierge</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            Have questions about your routine? Chat directly with our beauty and care support at <strong>03445422609</strong> for quick guidance.
          </p>
        </div>

        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 28px; box-shadow: var(--shadow-sm);">
          <div style="font-size: 1.8rem; margin-bottom: 12px;">✨</div>
          <h3 style="font-size: 1.15rem; color: var(--color-primary); margin-bottom: 8px; font-weight: 600;">Free Delivery Over Rs. 2,500</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">
            Build your complete morning or evening care routine and enjoy automatic free shipping to any city in Pakistan.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 7: FINAL CTA -->
  <section class="section-padding" style="background: linear-gradient(180deg, var(--color-surface) 0%, #FEF6E1 100%); border-top: 1px solid var(--color-border); padding: 80px 0;">
    <div class="container container-narrow" style="text-align: center;">
      <span class="badge badge-burgundy" style="margin-bottom: 16px;">Begin Your Routine</span>
      <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 16px; font-family: var(--font-serif); font-weight: 600;">
        Find Something That Fits Your Routine.
      </h2>
      <p style="font-size: 1.1rem; color: var(--color-text); line-height: 1.7; max-width: 600px; margin: 0 auto 32px;">
        Explore our curated beauty, skincare, and wellness products or connect with our personal care specialists on WhatsApp.
      </p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="shop.html" class="btn btn-primary btn-lg" style="min-width: 200px;">
          Shop Glowistic
        </a>
        <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg" style="min-width: 240px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
          Talk to Us on WhatsApp
        </a>
      </div>
    </div>
  </section>
`;

const finalHtml = `${head}\n<body data-page="about">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'about.html'), finalHtml, 'utf8');
console.log('Successfully generated about.html');

