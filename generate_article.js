const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');
const { GLOW_ARTICLES } = require('./js/data/articles.js');

const defaultArticle = GLOW_ARTICLES[0];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": defaultArticle.title,
  "description": defaultArticle.metaDescription,
  "image": `https://www.glowisticpk.com/${defaultArticle.image}`,
  "author": {
    "@type": "Organization",
    "name": defaultArticle.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Glowistic",
    "logo": "https://www.glowisticpk.com/assets/brand/logo-burgundy.svg"
  },
  "datePublished": defaultArticle.publishedDate,
  "dateModified": defaultArticle.updatedDate,
  "mainEntityOfPage": `https://www.glowisticpk.com/article.html?id=${defaultArticle.id}`
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.glowisticpk.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "The Glow Journal",
      "item": "https://www.glowisticpk.com/blog.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": defaultArticle.title,
      "item": `https://www.glowisticpk.com/article.html?id=${defaultArticle.id}`
    }
  ]
};

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [articleSchema, breadcrumbSchema]
};

const head = getHead(
  `${defaultArticle.seoTitle} | Glowistic`,
  defaultArticle.metaDescription,
  `article.html?id=${defaultArticle.id}`,
  combinedSchema,
  defaultArticle.image
);

const header = getHeader('blog');
const footer = getFooter();

// Default 3 related articles (excluding defaultArticle)
const initialRelated = GLOW_ARTICLES.slice(1, 4);

const initialSidebarRelatedHtml = initialRelated.map(art => `
  <a href="article.html?id=${art.id}" style="display: grid; grid-template-columns: 64px 1fr; gap: 12px; align-items: center; text-decoration: none; padding: 8px 0; border-bottom: 1px solid var(--color-border); transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
    <img src="/${art.image.replace(/^\//, '')}" alt="${art.alt || art.title}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" onerror="this.onerror=null; this.src='/assets/blog/fallback-blog.svg';" />
    <div>
      <span style="font-size: 0.7rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${art.category}</span>
      <h5 style="font-size: 0.85rem; color: var(--color-heading); margin: 2px 0 0; line-height: 1.35; font-weight: 600;">${art.title}</h5>
    </div>
  </a>
`).join('\n');

const initialBottomRelatedHtml = initialRelated.map(art => `
  <div class="blog-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
    <div style="aspect-ratio: 16 / 10; width: 100%; overflow: hidden;">
      <a href="article.html?id=${art.id}">
        <img src="/${art.image.replace(/^\//, '')}" alt="${art.alt || art.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='/assets/blog/fallback-blog.svg';" />
      </a>
    </div>
    <div style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
      <span class="badge badge-burgundy" style="align-self: flex-start; font-size: 0.7rem; margin-bottom: 8px;">${art.category}</span>
      <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-heading); margin: 0 0 8px; line-height: 1.35; flex: 1;">
        <a href="article.html?id=${art.id}" style="color: inherit; text-decoration: none;">${art.title}</a>
      </h4>
      <p style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; margin: 0 0 14px;">${art.excerpt}</p>
      <a href="article.html?id=${art.id}" class="btn btn-outline btn-sm blog-read-link" style="align-self: flex-start;">Read Article &rarr;</a>
    </div>
  </div>
`).join('\n');

const body = `
  <!-- EDITORIAL MAGAZINE ARTICLE CONTAINER -->
  <main class="section-padding" style="background-color: var(--color-bg); padding-top: 32px; padding-bottom: 80px;">
    <div class="container">

      <!-- Breadcrumb Navigation -->
      <nav class="product-breadcrumb" style="margin-bottom: 28px;" aria-label="Breadcrumb">
        <a href="index.html">Home</a> &sol; 
        <a href="blog.html">The Glow Journal</a> &sol; 
        <span id="article-breadcrumb-category">${defaultArticle.category}</span> &sol; 
        <span id="article-breadcrumb-title" style="color: var(--color-text); font-weight: 500;">${defaultArticle.title}</span>
      </nav>

      <!-- Magazine Grid: Main Editorial Column + Sticky Sidebar -->
      <div id="article-magazine-grid" class="article-magazine-layout">
        
        <!-- Main Article Column (Optimized reading width) -->
        <article class="article-main-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 48px 44px; box-shadow: var(--shadow-sm);">
          
          <!-- ARTICLE HEADER -->
          <header class="article-header" style="margin-bottom: 32px; border-bottom: 1px solid var(--color-border); padding-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
              <span class="badge badge-burgundy" id="article-cat-badge" style="font-size: 0.75rem; letter-spacing: 0.5px; text-transform: uppercase;">
                ${defaultArticle.category}
              </span>
              <span class="badge badge-gold" id="article-reading-time" style="font-size: 0.725rem;">
                3 min read
              </span>
            </div>

            <h1 id="article-title" style="font-size: clamp(2rem, 3.8vw, 2.75rem); color: var(--color-primary); line-height: 1.22; margin: 0 0 16px; font-family: var(--font-heading); font-weight: 700; letter-spacing: -0.5px;">
              ${defaultArticle.title}
            </h1>

            <!-- Short Introduction in Header -->
            <p id="article-intro" class="article-intro-text" style="font-size: 1.15rem; color: var(--color-text-muted); line-height: 1.65; margin: 0 0 22px; font-style: italic;">
              ${defaultArticle.intro}
            </p>

            <!-- Metadata Row: Author, Published Date, Updated Date -->
            <div class="article-meta-row" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.85rem; color: var(--color-text-light);">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <span>✍️ Written by <strong id="article-author" style="color: var(--color-text); font-weight: 600;">${defaultArticle.author}</strong></span>
                <span>&bull;</span>
                <time id="article-date" datetime="${defaultArticle.publishedDate}">Published ${defaultArticle.date}</time>
              </div>
              <div id="article-updated-date" style="font-size: 0.8125rem; color: var(--color-text-muted);">
                Updated September 04, 2026
              </div>
            </div>
          </header>

          <!-- HERO IMAGE (Large Editorial Featured Image) -->
          <div class="article-featured-image-wrap" style="aspect-ratio: 16 / 10; width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 40px; border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);">
            <img id="article-featured-img" src="/${defaultArticle.image.replace(/^\//, '')}" alt="${defaultArticle.alt || defaultArticle.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='/assets/blog/fallback-blog.svg';" />
          </div>

          <!-- ARTICLE BODY PROSE (Constrained width for reading comfort, H2, H3, bullet lists, highlight boxes) -->
          <div id="article-body-content" class="article-prose-container">
            ${defaultArticle.content}
          </div>

          <!-- TASTEFUL SOCIAL SHARING BAR -->
          <div class="article-share-section" style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary);"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary);">Share this care guide:</span>
            </div>
            
            <div class="article-share-buttons" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="https://wa.me/?text=How%20to%20Build%20a%20Simple%20Everyday%20Skincare%20Routine%20-%20https%3A%2F%2Fwww.glowisticpk.com%2Farticle.html%3Fid%3Dhow-to-build-a-simple-everyday-skincare-routine" id="share-whatsapp" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="Share on WhatsApp">
                💬 WhatsApp
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.glowisticpk.com%2Farticle.html%3Fid%3Dhow-to-build-a-simple-everyday-skincare-routine" id="share-facebook" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="Share on Facebook">
                Facebook
              </a>
              <a href="https://twitter.com/intent/tweet?text=How%20to%20Build%20a%20Simple%20Everyday%20Skincare%20Routine&url=https%3A%2F%2Fwww.glowisticpk.com%2Farticle.html%3Fid%3Dhow-to-build-a-simple-everyday-skincare-routine" id="share-twitter" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="Share on X / Twitter">
                Twitter/X
              </a>
              <button type="button" id="share-copy-link" class="btn btn-outline btn-sm" aria-label="Copy Article Link">
                📋 Copy Link
              </button>
            </div>
          </div>

          <!-- END-OF-ARTICLE CTA BANNER -->
          <div class="article-end-cta" style="margin-top: 44px; background: linear-gradient(135deg, #FDF9F7 0%, #F5EDE8 100%); border: 1px solid var(--color-border); border-radius: 14px; padding: 36px 32px; text-align: center;">
            <span class="badge badge-burgundy" style="margin-bottom: 10px; font-size: 0.725rem;">Glowistic Everyday Care</span>
            <h3 style="font-size: clamp(1.3rem, 2.2vw, 1.65rem); color: var(--color-primary); font-family: var(--font-heading); font-weight: 700; margin: 0 0 10px;">
              Ready to build your everyday routine?
            </h3>
            <p style="font-size: 0.925rem; color: var(--color-text-muted); max-width: 520px; margin: 0 auto 24px; line-height: 1.6;">
              Explore our honest skincare, hair strengthening, and family wellness essentials with Cash on Delivery nationwide.
            </p>
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="shop.html" class="btn btn-primary">Explore Glowistic</a>
              <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20read%20your%20article%20and%20would%20like%20product%20recommendations." id="article-end-whatsapp" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </article>

        <!-- SIDEBAR ON DESKTOP (Moves below article on mobile) -->
        <aside class="article-sidebar" style="display: flex; flex-direction: column; gap: 24px;">
          
          <!-- Shop Glowistic CTA Card -->
          <div class="sidebar-card sidebar-shop-cta" style="background: linear-gradient(135deg, #500F17 0%, #30060B 100%); color: #FFF; border-radius: 14px; padding: 32px 24px; text-align: center; box-shadow: var(--shadow-md);">
            <img src="assets/brand/logo-stacked-cream.png" alt="Glowistic" style="height: 60px; width: auto; object-fit: contain; margin: 0 auto 16px;" onerror="this.src='assets/brand/logo-cream.png'" />
            <h4 style="font-size: 1.15rem; color: var(--color-cream); font-family: var(--font-heading); margin: 0 0 8px; font-weight: 600;">
              Our Everyday Glow Starts Here.
            </h4>
            <p style="font-size: 0.825rem; opacity: 0.88; line-height: 1.5; margin: 0 0 20px;">
              Clean, practical essentials designed for your daily routine. Cash on Delivery across Pakistan.
            </p>
            <a href="shop.html" class="btn btn-secondary btn-block btn-sm">Shop Glowistic &rarr;</a>
          </div>

          <!-- Popular Categories Card -->
          <div class="sidebar-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 24px; box-shadow: var(--shadow-sm);">
            <h4 style="font-size: 1rem; color: var(--color-primary); font-family: var(--font-heading); font-weight: 600; margin: 0 0 16px; padding-bottom: 10px; border-bottom: 1px solid var(--color-border);">
              Popular Categories
            </h4>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <a href="shop.html?category=skincare" class="sidebar-cat-link">
                <span>&bull; Skincare Essentials</span>
                <span class="sidebar-cat-arrow">&rarr;</span>
              </a>
              <a href="shop.html?category=haircare" class="sidebar-cat-link">
                <span>&bull; Hair Strengthening</span>
                <span class="sidebar-cat-arrow">&rarr;</span>
              </a>
              <a href="shop.html?category=wellness" class="sidebar-cat-link">
                <span>&bull; Daily Wellness &amp; Iron</span>
                <span class="sidebar-cat-arrow">&rarr;</span>
              </a>
              <a href="shop.html?category=personalcare" class="sidebar-cat-link">
                <span>&bull; Personal &amp; Body Care</span>
                <span class="sidebar-cat-arrow">&rarr;</span>
              </a>
              <a href="shop.html?category=supplements" class="sidebar-cat-link">
                <span>&bull; Vital Tonics &amp; Syrups</span>
                <span class="sidebar-cat-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Related Articles in Sidebar -->
          <div class="sidebar-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 24px; box-shadow: var(--shadow-sm);">
            <h4 style="font-size: 1rem; color: var(--color-primary); font-family: var(--font-heading); font-weight: 600; margin: 0 0 14px; padding-bottom: 10px; border-bottom: 1px solid var(--color-border);">
              Related Care Guides
            </h4>
            <div id="article-sidebar-related">
              ${initialSidebarRelatedHtml}
            </div>
          </div>

          <!-- WhatsApp Order Support Sidebar Card -->
          <div class="sidebar-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 22px; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 8px;">💬</div>
            <h5 style="font-size: 0.95rem; color: var(--color-heading); font-weight: 600; margin: 0 0 6px;">Need Personal Advice?</h5>
            <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0 0 14px; line-height: 1.4;">
              Reach our friendly team anytime on WhatsApp for routine questions.
            </p>
            <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20have%20a%20question%20about%20building%20my%20routine." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm btn-block">
              Chat on WhatsApp
            </a>
          </div>

        </aside>

      </div>

      <!-- RELATED ARTICLES SECTION (3 articles prominently displayed below main content) -->
      <section style="margin-top: 64px;" aria-label="Related Articles">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <div>
            <span class="badge badge-gold" style="font-size: 0.725rem; margin-bottom: 6px; display: inline-block;">Continue Reading</span>
            <h3 style="font-size: 1.5rem; color: var(--color-primary); font-family: var(--font-heading); font-weight: 700; margin: 0;">
              More from The Glow Journal
            </h3>
          </div>
          <a href="blog.html" class="btn btn-outline btn-sm">View All Articles &rarr;</a>
        </div>

        <div id="article-related-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          ${initialBottomRelatedHtml}
        </div>
      </section>

    </div>
  </main>

  <style>
    /* Premium Editorial Magazine Styles */
    .article-magazine-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 340px;
      gap: 44px;
      align-items: flex-start;
    }

    .article-sidebar {
      position: sticky;
      top: 90px;
    }

    .sidebar-cat-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--color-text);
      text-decoration: none;
      padding: 8px 6px;
      font-size: 0.875rem;
      border-radius: 6px;
      transition: background 0.2s, color 0.2s;
    }

    .sidebar-cat-link:hover {
      background: var(--color-cream);
      color: var(--color-primary);
    }

    .sidebar-cat-arrow {
      font-size: 0.8rem;
      color: var(--color-text-light);
      transition: transform 0.2s;
    }

    .sidebar-cat-link:hover .sidebar-cat-arrow {
      transform: translateX(3px);
      color: var(--color-primary);
    }

    /* Article Prose Styling: Typography prioritized for comfortable reading */
    .article-prose-container {
      max-width: 740px;
      font-size: 1.0625rem;
      line-height: 1.85;
      color: var(--color-text);
    }

    .article-prose-container p {
      margin-bottom: 1.4rem;
    }

    .article-prose-container p.article-lead {
      font-size: 1.15rem;
      line-height: 1.75;
      color: var(--color-heading);
      font-weight: 400;
      margin-bottom: 1.8rem;
    }

    .article-prose-container h2 {
      font-size: 1.65rem;
      color: var(--color-primary);
      font-family: var(--font-heading);
      font-weight: 700;
      margin: 2.2rem 0 1rem;
      line-height: 1.3;
      letter-spacing: -0.3px;
    }

    .article-prose-container h3 {
      font-size: 1.25rem;
      color: var(--color-heading);
      font-family: var(--font-heading);
      font-weight: 600;
      margin: 1.8rem 0 0.8rem;
      line-height: 1.35;
    }

    .article-prose-container strong {
      color: var(--color-heading);
      font-weight: 600;
    }

    .article-bullet-list {
      padding-left: 24px;
      margin-bottom: 1.6rem;
      line-height: 1.8;
    }

    .article-bullet-list li {
      margin-bottom: 8px;
    }

    .article-highlight-box {
      background: var(--color-cream);
      border-left: 4px solid var(--color-primary);
      border-radius: 0 10px 10px 0;
      padding: 22px 26px;
      margin: 2rem 0;
      box-shadow: var(--shadow-sm);
    }

    .article-highlight-box .highlight-title {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 1.05rem;
      margin-bottom: 8px;
      font-family: var(--font-heading);
    }

    .article-highlight-box p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.65;
      color: var(--color-text);
    }

    /* Mobile Responsiveness: Move sidebar content below article */
    @media (max-width: 991px) {
      .article-magazine-layout {
        grid-template-columns: 1fr !important;
        gap: 36px !important;
      }
      .article-main-card {
        padding: 32px 24px !important;
      }
      .article-featured-image-wrap {
        height: 280px !important;
      }
      .article-sidebar {
        position: static !important;
        margin-top: 16px;
      }
      #article-related-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    @media (max-width: 640px) {
      .article-main-card {
        padding: 24px 16px !important;
      }
      .article-featured-image-wrap {
        height: 220px !important;
      }
      #article-related-grid {
        grid-template-columns: 1fr !important;
      }
      .article-share-section {
        flex-direction: column;
        align-items: flex-start !important;
      }
    }
  </style>
`;

const finalHtml = `${head}\n<body data-page="article">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'article.html'), finalHtml, 'utf8');
console.log('Successfully generated article.html with premium magazine layout, sidebar, and SEO schemas');
