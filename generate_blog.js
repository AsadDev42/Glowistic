const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');
const { GLOW_ARTICLES } = require('./js/data/articles.js');

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "The Glow Journal — Glowistic",
  "description": "Simple, useful insights for better everyday beauty, skincare, hair care and wellness routines.",
  "url": "https://www.glowisticpk.com/blog.html",
  "publisher": {
    "@type": "Organization",
    "name": "Glowistic",
    "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg"
  },
  "blogPost": GLOW_ARTICLES.map(article => ({
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.metaDescription,
    "image": `https://www.glowisticpk.com/${article.image}`,
    "datePublished": article.publishedDate,
    "dateModified": article.updatedDate,
    "url": `https://www.glowisticpk.com/article.html?id=${article.id}`,
    "author": {
      "@type": "Organization",
      "name": "Glowistic Editorial Team"
    }
  }))
};

const head = getHead(
  'The Glow Journal — Skincare, Hair Care & Wellness Guides | Glowistic',
  'Simple, useful insights for better everyday beauty, skincare, hair care and wellness routines from The Glow Journal.',
  'blog.html',
  blogSchema
);

const header = getHeader('blog');
const footer = getFooter();

const featuredArticle = GLOW_ARTICLES[0];

function buildArticleCardHtml(article) {
  return `
    <article class="blog-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: var(--shadow-sm);">
      <a href="article.html?id=${article.id}" style="display: block; aspect-ratio: 16 / 10; width: 100%; overflow: hidden; text-decoration: none;" aria-label="${article.title}">
        <img src="/${article.image.replace(/^\//, '')}" alt="${article.alt || article.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='/assets/blog/fallback-blog.svg';" />
      </a>
      <div style="padding: 24px; flex: 1; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px;">
          <span class="badge badge-burgundy" style="font-size: 0.725rem; letter-spacing: 0.5px; text-transform: uppercase;">${article.category}</span>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">${article.date}</span>
        </div>
        <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--color-heading); margin: 0 0 10px; line-height: 1.35; flex: 1;">
          <a href="article.html?id=${article.id}" style="color: inherit; text-decoration: none;" class="blog-title-link">
            ${article.title}
          </a>
        </h3>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0 0 20px;">
          ${article.excerpt}
        </p>
        <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.785rem; color: var(--color-text-light);">By ${article.author}</span>
          <a href="article.html?id=${article.id}" class="btn btn-outline btn-sm" style="font-weight: 600;">Read Article &rarr;</a>
        </div>
      </div>
    </article>
  `;
}

const initialGridHtml = GLOW_ARTICLES.map(buildArticleCardHtml).join('\n');

const body = `
  <!-- EDITORIAL HERO -->
  <section style="background: linear-gradient(180deg, #FDF9F7 0%, var(--color-surface) 100%); border-bottom: 1px solid var(--color-border); padding: 56px 0 44px;">
    <div class="container container-narrow" style="text-align: center;">
      <span class="badge badge-gold" style="margin-bottom: 12px; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase;">Editorial &amp; Guides</span>
      <h1 style="font-size: clamp(2.2rem, 5vw, 3.25rem); color: var(--color-primary); margin-bottom: 14px; font-family: var(--font-heading); font-weight: 700; letter-spacing: -0.5px;">
        The Glow Journal
      </h1>
      <p style="font-size: 1.125rem; color: var(--color-text-muted); line-height: 1.65; max-width: 620px; margin: 0 auto;">
        Simple, useful insights for better everyday beauty, skincare and self-care routines.
      </p>
    </div>
  </section>

  <!-- BLOG MAIN CONTENT -->
  <main class="section-padding" style="background-color: var(--color-bg); padding-top: 36px; padding-bottom: 80px;">
    <div class="container">
      
      <!-- Search & Category Filters Bar -->
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 20px 24px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 18px; box-shadow: var(--shadow-sm);">
        <!-- Category Filter Buttons -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="blog-category-filters" role="group" aria-label="Filter articles by category">
          <button type="button" class="btn btn-outline btn-sm is-active" data-blog-category="all">All</button>
          <button type="button" class="btn btn-outline btn-sm" data-blog-category="Skincare">Skincare</button>
          <button type="button" class="btn btn-outline btn-sm" data-blog-category="Hair Care">Hair Care</button>
          <button type="button" class="btn btn-outline btn-sm" data-blog-category="Personal Care">Personal Care</button>
          <button type="button" class="btn btn-outline btn-sm" data-blog-category="Wellness">Wellness</button>
          <button type="button" class="btn btn-outline btn-sm" data-blog-category="Beauty Tips">Beauty Tips</button>
          <button type="button" class="btn btn-outline btn-sm" data-blog-category="Glowistic">Glowistic</button>
        </div>

        <!-- Search Input -->
        <div style="width: 280px; max-width: 100%; position: relative;">
          <input type="text" id="blog-search-input" class="form-control" placeholder="Search articles or topics..." style="padding: 10px 16px 10px 38px; font-size: 0.875rem; border-radius: 8px;" aria-label="Search articles" />
          <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-light); pointer-events: none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
      </div>

      <!-- Prominent Featured Article Banner -->
      <section aria-label="Featured Article">
        <div id="blog-featured-banner" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; overflow: hidden; margin-bottom: 48px; display: grid; grid-template-columns: 1.25fr 1fr; box-shadow: var(--shadow-md); transition: transform 0.2s ease;">
          <div style="height: 380px; overflow: hidden; position: relative;">
            <a href="article.html?id=${featuredArticle.id}" style="display: block; width: 100%; height: 100%;" aria-label="${featuredArticle.title}">
              <img id="featured-banner-img" src="/${featuredArticle.image.replace(/^\//, '')}" alt="${featuredArticle.alt || featuredArticle.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='/assets/blog/fallback-blog.svg';" />
            </a>
          </div>
          <div style="padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
              <span class="badge badge-gold" style="font-size: 0.75rem; letter-spacing: 0.5px;">⭐ Featured Guide</span>
              <span class="badge badge-burgundy" id="featured-banner-cat" style="font-size: 0.725rem;">${featuredArticle.category}</span>
            </div>
            <h2 style="font-size: clamp(1.4rem, 2.5vw, 1.85rem); color: var(--color-primary); line-height: 1.3; margin: 0 0 14px; font-family: var(--font-heading); font-weight: 700;">
              <a href="article.html?id=${featuredArticle.id}" id="featured-banner-title-link" style="color: inherit; text-decoration: none;">
                ${featuredArticle.title}
              </a>
            </h2>
            <p id="featured-banner-excerpt" style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.65; margin: 0 0 24px;">
              ${featuredArticle.excerpt}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--color-border);">
              <div style="font-size: 0.8125rem; color: var(--color-text-light);">
                By <strong style="color: var(--color-text);">${featuredArticle.author}</strong> &bull; ${featuredArticle.date}
              </div>
              <a href="article.html?id=${featuredArticle.id}" id="featured-banner-cta-btn" class="btn btn-primary btn-sm">Read Featured Guide &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Title for All Articles -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; color: var(--color-primary); font-family: var(--font-heading); font-weight: 600; margin: 0;">
          All Articles &amp; Care Guides
        </h2>
        <span id="blog-results-count" style="font-size: 0.875rem; color: var(--color-text-muted); font-weight: 500;">
          Showing 6 articles
        </span>
      </div>

      <!-- Articles Grid (Displays 6 Articles) -->
      <div id="blog-articles-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
        ${initialGridHtml}
      </div>

      <!-- Newsletter / Routine Advisory Box -->
      <div style="margin-top: 64px; background: linear-gradient(135deg, #500F17 0%, #30060B 100%); color: #FFF; border-radius: 16px; padding: 48px; text-align: center; box-shadow: var(--shadow-lg);">
        <span class="badge badge-gold" style="margin-bottom: 12px; display: inline-block;">Everyday Care Assistance</span>
        <h3 style="font-size: clamp(1.4rem, 2.5vw, 1.85rem); color: var(--color-cream); margin: 0 0 12px; font-family: var(--font-heading);">
          Need Personalized Product Guidance?
        </h3>
        <p style="font-size: 0.95rem; opacity: 0.9; max-width: 540px; margin: 0 auto 24px; line-height: 1.6;">
          Chat directly with our team on WhatsApp for honest recommendations tailored to your daily beauty, skincare, and wellness routine.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <a href="shop.html" class="btn btn-secondary">Shop All Products</a>
          <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20product%20recommendations%20for%20my%20routine." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            Chat on WhatsApp (03445422609)
          </a>
        </div>
      </div>

    </div>
  </main>

  <style>
    @media (max-width: 991px) {
      #blog-featured-banner {
        grid-template-columns: 1fr !important;
      }
      #blog-featured-banner > div:first-child {
        height: 260px !important;
      }
      #blog-articles-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
      }
    }
    @media (max-width: 640px) {
      #blog-articles-grid {
        grid-template-columns: 1fr !important;
      }
      #blog-category-filters {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 6px;
      }
    }
  </style>
`;

const finalHtml = `${head}\n<body data-page="blog">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'blog.html'), finalHtml, 'utf8');
console.log('Successfully generated blog.html with 6 articles and featured section');
