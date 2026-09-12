/**
 * GLOWISTIC — Main Application Orchestrator
 * www.glowisticpk.com | WhatsApp: 923445422609
 * Centralizes UI events, routing, catalog search, cart drawer, checkout, and page logic.
 */

import { cart, WHATSAPP_PHONE, FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from './state/cart.js';
import { PRODUCTS, CATEGORIES, getProductById, getProductBySlug, getProductsByCategory, searchProducts, getFeaturedProducts } from './data/products.js';
import { getAllArticles, getArticleById, getArticleBySlug, getArticlesByCategory, searchArticles } from './data/articles.js';
import { CheckoutManager } from './modules/checkout.js';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_PHONE}`;

// ─── Utility Helpers ──────────────────────────────────────────────────────────
function formatPrice(n) {
  return `Rs. ${Number(n).toLocaleString('en-PK')}`;
}

function el(id) {
  return document.getElementById(id);
}

function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(message, type = 'success', duration = 3000) {
  const existing = qs('.glowistic-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `glowistic-toast glowistic-toast--${type}`;
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 99999;
    background: ${type === 'success' ? '#500F17' : '#e74c3c'};
    color: #fff; padding: 14px 22px; border-radius: 12px;
    font-size: 0.9rem; font-weight: 500; box-shadow: 0 10px 36px rgba(0,0,0,0.24);
    display: flex; align-items: center; gap: 10px; max-width: 360px;
    animation: slideInToast 0.3s ease;
  `;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${message}`;
  document.body.appendChild(toast);

  if (!qs('style[data-toast-style]')) {
    const style = document.createElement('style');
    style.setAttribute('data-toast-style', '');
    style.textContent = `@keyframes slideInToast { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─── Global: Cart Count & Slide-Out Cart Drawer ───────────────────────────────
function updateCartBadges() {
  const count = cart.getItemCount();
  qsa('.cart-count-badge, .cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

function updateCartDrawer() {
  updateCartBadges();

  const drawer = el('cart-drawer');
  if (!drawer) return;

  const itemsContainer = el('cart-drawer-items');
  const emptyState = el('cart-drawer-empty');
  const footerSection = el('cart-drawer-footer');
  const subtotalEl = el('cart-drawer-subtotal');
  const deliveryEl = el('cart-drawer-delivery');
  const totalEl = el('cart-drawer-total');
  const waBtn = el('cart-drawer-whatsapp-btn');
  const progressEl = el('free-delivery-progress');
  const progressText = el('free-delivery-text');

  const items = cart.getItemsWithDetails();
  const subtotal = cart.getSubtotal();
  const deliveryFee = cart.getDeliveryFee();
  const total = cart.getTotal();
  const remaining = cart.getFreeDeliveryRemaining ? cart.getFreeDeliveryRemaining() : Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  if (items.length === 0) {
    if (itemsContainer) itemsContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (footerSection) footerSection.style.display = 'none';
    if (progressEl) progressEl.style.width = '0%';
    if (progressText) {
      progressText.innerHTML = `Add ${formatPrice(FREE_DELIVERY_THRESHOLD)} for <strong>FREE Delivery</strong>!`;
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (footerSection) footerSection.style.display = 'block';

  // Free shipping progress calculation
  const progressPct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  if (progressEl) progressEl.style.width = `${progressPct}%`;
  if (progressText) {
    if (remaining > 0) {
      progressText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more for <strong>FREE Delivery</strong>!`;
    } else {
      progressText.innerHTML = `🎉 You qualify for <strong>FREE Nationwide Delivery</strong>!`;
    }
  }

  // Render items list inside slide-out drawer
  if (itemsContainer) {
    itemsContainer.innerHTML = items.map(item => `
      <div class="cart-drawer-item" data-id="${item.id}" style="display: grid; grid-template-columns: 68px 1fr auto; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--color-border); align-items: center;">
        <a href="product.html?slug=${item.slug || item.id}" style="display: block;">
          <img src="${(item.image || '').replace(/^\//, '')}" alt="${item.name}" style="width: 68px; height: 68px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border);" onerror="this.src='assets/products/placeholder.jpg'" />
        </a>
        <div>
          <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${item.categoryName || item.category}</div>
          <h4 style="font-size: 0.9rem; margin: 2px 0 4px; line-height: 1.3; font-weight: 600;">
            <a href="product.html?slug=${item.slug || item.id}" style="color: var(--color-heading); text-decoration: none;">${item.name}</a>
          </h4>
          <div style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600;">${formatPrice(item.price)}</div>
          <div style="display: flex; align-items: center; gap: 6px; margin-top: 8px;">
            <button type="button" class="drawer-qty-btn" data-action="dec" data-id="${item.id}" style="width: 26px; height: 26px; border: 1px solid var(--color-border); background: var(--color-bg); border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">−</button>
            <span style="font-size: 0.85rem; font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
            <button type="button" class="drawer-qty-btn" data-action="inc" data-id="${item.id}" style="width: 26px; height: 26px; border: 1px solid var(--color-border); background: var(--color-bg); border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-primary); margin-bottom: 8px;">${formatPrice(item.lineTotal)}</div>
          <button type="button" class="drawer-remove-btn" data-id="${item.id}" style="background: none; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 0.75rem; text-decoration: underline;" title="Remove from bag">Remove</button>
        </div>
      </div>
    `).join('');

    // Attach drawer item stepper & removal listeners
    qsa('.drawer-qty-btn', itemsContainer).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const currentItem = items.find(i => i.id === id);
        if (!currentItem) return;
        if (action === 'inc') cart.updateQuantity(id, currentItem.quantity + 1);
        if (action === 'dec') cart.updateQuantity(id, currentItem.quantity - 1);
      });
    });

    qsa('.drawer-remove-btn', itemsContainer).forEach(btn => {
      btn.addEventListener('click', () => {
        cart.removeItem(btn.dataset.id);
        showToast('Item removed from your bag.');
      });
    });
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee);
  if (totalEl) totalEl.textContent = formatPrice(total);

  if (waBtn) {
    waBtn.href = cart.getWhatsAppOrderUrl ? cart.getWhatsAppOrderUrl() : `${WHATSAPP_BASE}?text=${encodeURIComponent('Hi Glowistic! I would like to order items from my bag.')}`;
  }
}

function openCartDrawer() {
  const drawer = el('cart-drawer');
  const overlay = el('cart-overlay');
  if (drawer) drawer.classList.add('is-open');
  if (overlay) overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  updateCartDrawer();
}

function closeCartDrawer() {
  const drawer = el('cart-drawer');
  const overlay = el('cart-overlay');
  if (drawer) drawer.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

function initCartDrawerListeners() {
  const closeBtn = qs('.cart-close-btn');
  const overlay = el('cart-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  qsa('.cart-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (document.body.dataset.page !== 'cart' && document.body.dataset.page !== 'checkout') {
        e.preventDefault();
        openCartDrawer();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeMobileNav();
      closeCardModal();
    }
  });

  window.addEventListener('glowistic:cart-updated', updateCartDrawer);
  updateCartDrawer();
}

// ─── Global: Mobile Nav Drawer ────────────────────────────────────────────────
function openMobileNav() {
  const drawer = el('mobile-nav-drawer');
  const overlay = qs('.mobile-nav-overlay');
  if (drawer) drawer.classList.add('is-open');
  if (overlay) overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const drawer = el('mobile-nav-drawer');
  const overlay = qs('.mobile-nav-overlay');
  if (drawer) drawer.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

function initMobileNav() {
  const toggleBtn = qs('.mobile-menu-toggle');
  const closeBtn = qs('.mobile-nav-close');
  const overlay = qs('.mobile-nav-overlay');

  if (toggleBtn) toggleBtn.addEventListener('click', openMobileNav);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
  if (overlay) overlay.addEventListener('click', closeMobileNav);

  qsa('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

// ─── Global: Header Catalog Search Dropdown ───────────────────────────────────
function initGlobalSearch() {
  const input = el('global-search-input');
  const dropdown = el('search-results-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
      return;
    }

    const results = searchProducts(q).slice(0, 5);
    if (results.length === 0) {
      dropdown.innerHTML = `<div style="padding: 14px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">No products found for "${q}"</div>`;
      dropdown.style.display = 'block';
      return;
    }

    dropdown.innerHTML = `
      <div style="padding: 8px 0;">
        ${results.map(p => `
          <a href="product.html?slug=${p.slug || p.id}" style="display: grid; grid-template-columns: 44px 1fr auto; gap: 10px; align-items: center; padding: 8px 14px; text-decoration: none; border-bottom: 1px solid var(--color-border); transition: background 0.2s;" onmouseover="this.style.background='var(--color-cream)'" onmouseout="this.style.background=''">
            <img src="${p.image.replace(/^\//, '')}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px; border: 1px solid var(--color-border);" onerror="this.src='assets/products/placeholder.jpg'" />
            <div>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-heading);">${p.name}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${p.categoryName || p.category}</div>
            </div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary);">${formatPrice(p.price)}</div>
          </a>
        `).join('')}
        <a href="shop.html?search=${encodeURIComponent(q)}" style="display: block; text-align: center; padding: 10px; font-size: 0.8rem; font-weight: 600; color: var(--color-primary); text-decoration: none; background: var(--color-surface-hover);">
          View all matching products &rarr;
        </a>
      </div>
    `;
    dropdown.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

// ─── Global: Card Payments Coming Soon Modal ───────────────────────────────────
function closeCardModal() {
  const modal = el('card-payments-modal');
  if (modal) modal.style.display = 'none';
}

function initCardPaymentsModal() {
  const modal = el('card-payments-modal');
  if (!modal) return;

  const closeBtn = el('close-card-modal-btn');
  const dismissBtn = el('dismiss-card-modal-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeCardModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeCardModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCardModal();
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.badge-card-disabled, .payment-badge-coming-soon, .payment-method-card.is-disabled, [data-action="show-card-modal"]');
    if (trigger) {
      e.preventDefault();
      modal.style.display = 'flex';
    }
  });
}

// ─── Global: Subtle Custom Circular Cursor ────────────────────────────────────
function initCustomCursor() {
  const dot = el('cursor-dot');
  const ring = el('cursor-ring');
  if (!dot || !ring) return;

  // Only activate on pointer-fine desktop devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.classList.add('is-visible');
    ring.classList.add('is-visible');

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(renderRing);
    }
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
      requestAnimationFrame(renderRing);
    } else {
      isMoving = false;
    }
  }

  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) {
      dot.classList.remove('is-visible');
      ring.classList.remove('is-visible');
    }
  });

  const interactiveSelector = 'a, button, input, select, textarea, .product-card, .blog-card, [role="button"], label, details summary';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('is-hovered');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('is-hovered');
    }
  });
}

// ─── Product Card Builder ─────────────────────────────────────────────────────
function buildProductCard(product) {
  const origPrice = (product.onSale && product.originalPrice)
    ? `<span class="product-card-orig-price" style="text-decoration: line-through; color: var(--color-text-muted); font-size: 0.85rem; margin-right: 6px;">${formatPrice(product.originalPrice)}</span>`
    : '';

  const badgeHtml = product.badge
    ? `<span class="badge ${product.badgeType === 'gold' ? 'badge-gold' : 'badge-burgundy'} product-card-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2;">${product.badge}</span>`
    : (product.onSale ? `<span class="badge badge-gold product-card-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2;">Sale</span>` : '');

  return `
    <article class="product-card" data-id="${product.id}" data-slug="${product.slug || product.id}" data-category="${product.category}" data-price="${product.price}" data-name="${product.name}" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; position: relative;">
      <div class="product-card-media" style="position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #FAF7F2;">
        <a href="product.html?slug=${product.slug || product.id}" class="product-card-img-link" aria-label="${product.name}" style="display: block; width: 100%; height: 100%;">
          <img src="${product.image.replace(/^\//, '')}" alt="${product.name}" class="product-card-img" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onerror="this.src='assets/products/placeholder.jpg'" />
        </a>
        ${badgeHtml}
      </div>
      <div class="product-card-body" style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
        <div class="product-card-meta-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="product-card-cat" style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${product.categoryName || product.category}</span>
          <span class="product-card-stock in-stock" style="font-size: 0.75rem; color: #2D6A4F; font-weight: 600; display: flex; align-items: center; gap: 4px;"><span class="stock-dot" style="display: inline-block; width: 6px; height: 6px; background: #2D6A4F; border-radius: 50%;"></span> In Stock</span>
        </div>
        <h3 class="product-card-title" style="font-size: 1rem; color: var(--color-heading); margin: 0 0 4px; font-weight: 600; line-height: 1.35;">
          <a href="product.html?slug=${product.slug || product.id}" style="color: inherit; text-decoration: none;">${product.name}</a>
        </h3>
        <p class="product-card-subtitle" style="font-size: 0.8125rem; color: var(--color-text-muted); margin: 0 0 14px; line-height: 1.45; flex: 1;">
          ${product.shortDescription || product.shortDesc || product.subtitle || ''}
        </p>
        <div class="product-card-bottom" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
          <div class="product-card-pricing">
            ${origPrice}
            <strong class="product-card-price" style="color: var(--color-primary); font-size: 1.1rem;">${formatPrice(product.price)}</strong>
          </div>
          <div class="product-card-buttons">
            <button type="button" class="btn btn-primary btn-sm btn-add-cart" data-id="${product.id}" data-slug="${product.slug || product.id}" style="font-size: 0.8125rem; padding: 6px 14px;">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>`;
}

// ─── Attach Product Card Events ───────────────────────────────────────────────
function attachProductCardEvents(container = document) {
  qsa('.btn-add-cart', container).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id || btn.dataset.slug;
      if (!id) return;
      const product = getProductById(id) || getProductBySlug(id);
      if (!product) return;

      cart.addItem(product.id, 1);
      showToast(`${product.name} added to your bag!`);
      openCartDrawer();

      const originalText = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.style.background = '#2D6A4F';
      btn.style.borderColor = '#2D6A4F';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 1400);
    });
  });
}

// ─── Page: HOME ───────────────────────────────────────────────────────────────
function initHomePage() {
  const featuredGrid = el('featured-products-grid');
  if (featuredGrid) {
    const featured = getFeaturedProducts ? getFeaturedProducts(4) : PRODUCTS.slice(0, 4);
    featuredGrid.innerHTML = featured.map(buildProductCard).join('');
    attachProductCardEvents(featuredGrid);
  }
}

// ─── Page: SHOP ───────────────────────────────────────────────────────────────
function initShopPage() {
  const grid = el('shop-products-grid') || el('products-grid');
  const searchInput = el('shop-search-input');
  const sortSelect = el('shop-sort-select');
  const stockOnlyCheck = el('shop-stock-only');
  const priceRange = el('shop-price-range');
  const priceValDisplay = el('price-val-display');
  const resultsCount = el('shop-results-count');
  const emptyState = el('shop-empty-state');
  const clearFiltersBtn = el('btn-clear-filters');
  const bannerTitle = el('shop-banner-title');
  const bannerDesc = el('shop-banner-desc');

  let currentCategory = 'all';
  let currentSort = 'featured';
  let currentSearch = '';
  let inStockOnly = false;
  let maxPrice = priceRange ? parseInt(priceRange.value, 10) : 5000;

  // Extract category from URL pathname (/shop/skincare, /shop/hair-care, etc.)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const shopIdx = pathParts.indexOf('shop');
  if (shopIdx !== -1 && pathParts[shopIdx + 1]) {
    currentCategory = pathParts[shopIdx + 1].toLowerCase();
  } else {
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) currentCategory = params.get('category').toLowerCase();
    if (params.get('cat')) currentCategory = params.get('cat').toLowerCase();
    if (params.get('search')) {
      currentSearch = params.get('search').trim();
      if (searchInput) searchInput.value = currentSearch;
    }
  }

  // Normalize aliases
  if (currentCategory === 'haircare') currentCategory = 'hair-care';
  if (currentCategory === 'wellness') currentCategory = 'wellness-health';
  if (currentCategory === 'bodycare') currentCategory = 'personal-care';

  function updateBanner(cat) {
    if (!bannerTitle || !bannerDesc) return;
    const catDescriptions = {
      'skincare': {
        title: 'Skincare Essentials',
        desc: 'Gentle, targeted everyday formulations — botanical cleansers, clarifying tea tree and salicylic serums, and skin-calming care.'
      },
      'hair-care': {
        title: 'Hair & Scalp Care',
        desc: 'Simple, restorative hair habits — stimulating rosemary and onion shampoos, herbal hair packs, and gentle scalp cleansers.'
      },
      'wellness-health': {
        title: 'Wellness & Health Essentials',
        desc: 'Family nutrition and daily energy essentials — restorative iron tonics and antioxidant malt chocolate granules.'
      },
      'personal-care': {
        title: 'Personal & Body Care',
        desc: 'Everyday body care essentials crafted for comfort — soothing chamomile lotions and nourishing botanicals.'
      },
      'body-care': {
        title: 'Body Care Essentials',
        desc: 'Hydrating body lotions and skin barrier essentials made for daily feel-good routines.'
      },
      'supplements': {
        title: 'Daily Supplements',
        desc: 'Essential nutritional tonics and vitality granules designed to support everyday family health.'
      },
      'all': {
        title: 'Shop Glowistic',
        desc: 'Explore beauty, skincare, personal care, hair care and wellness essentials for your everyday routine.'
      }
    };

    const info = catDescriptions[cat] || catDescriptions['all'];
    bannerTitle.textContent = info.title;
    bannerDesc.textContent = info.desc;
  }

  function setActiveCategoryTab(cat) {
    qsa('[data-category], [data-category-filter]').forEach(btn => {
      const btnCat = (btn.dataset.category || btn.dataset.categoryFilter || '').toLowerCase();
      const isActive = (btnCat === cat) ||
                       (cat === 'hair-care' && btnCat === 'haircare') ||
                       (cat === 'wellness-health' && btnCat === 'wellness') ||
                       (cat === 'personal-care' && (btnCat === 'personalcare' || btnCat === 'bodycare'));
      btn.classList.toggle('is-active', isActive);
    });
  }

  function filterAndRender() {
    if (!grid) return;

    let items = currentSearch
      ? searchProducts(currentSearch)
      : getProductsByCategory(currentCategory);

    // Filter by max price
    items = items.filter(p => p.price <= maxPrice);

    // Filter by stock
    if (inStockOnly) {
      items = items.filter(p => p.inStock);
    }

    // Sort
    if (currentSort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'newest') {
      items.sort((a, b) => b.id.localeCompare(a.id));
    } else if (currentSort === 'name-az') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update count
    if (resultsCount) {
      resultsCount.textContent = `Showing ${items.length} product${items.length !== 1 ? 's' : ''}`;
    }

    // Render or empty
    if (items.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      grid.innerHTML = items.map(buildProductCard).join('\n');
      attachProductCardEvents(grid);
    }
  }

  // Hook up Category Tabs
  qsa('[data-category], [data-category-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      let targetCat = (btn.dataset.category || btn.dataset.categoryFilter || 'all').toLowerCase();
      if (targetCat === 'haircare') targetCat = 'hair-care';
      if (targetCat === 'wellness') targetCat = 'wellness-health';
      if (targetCat === 'bodycare') targetCat = 'personal-care';

      currentCategory = targetCat;
      currentSearch = '';
      if (searchInput) searchInput.value = '';

      setActiveCategoryTab(currentCategory);
      updateBanner(currentCategory);

      // Clean history push
      const newUrl = targetCat === 'all' ? 'shop.html' : `shop.html?category=${targetCat}`;
      window.history.pushState(null, '', newUrl);

      filterAndRender();
    });
  });

  // Search input live filtering
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim();
      filterAndRender();
    });
  }

  // In-Stock toggle
  if (stockOnlyCheck) {
    stockOnlyCheck.addEventListener('change', () => {
      inStockOnly = stockOnlyCheck.checked;
      filterAndRender();
    });
  }

  // Price range slider
  if (priceRange) {
    priceRange.addEventListener('input', () => {
      maxPrice = parseInt(priceRange.value, 10);
      if (priceValDisplay) priceValDisplay.textContent = formatPrice(maxPrice);
      filterAndRender();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      filterAndRender();
    });
  }

  // Clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearch = '';
      inStockOnly = false;
      maxPrice = 5000;
      currentSort = 'featured';

      if (searchInput) searchInput.value = '';
      if (stockOnlyCheck) stockOnlyCheck.checked = false;
      if (priceRange) priceRange.value = 5000;
      if (priceValDisplay) priceValDisplay.textContent = formatPrice(5000);
      if (sortSelect) sortSelect.value = 'featured';

      setActiveCategoryTab('all');
      updateBanner('all');
      window.history.pushState(null, '', 'shop.html');
      filterAndRender();
    });
  }

  // Initialize view
  setActiveCategoryTab(currentCategory);
  updateBanner(currentCategory);
  filterAndRender();
}

// ─── Page: PRODUCT DETAIL ─────────────────────────────────────────────────────
// ─── Page: PRODUCT DETAIL ─────────────────────────────────────────────────────
function initProductPage() {
  // Extract slug from URL pathname (/product/:slug) or query params (?slug=... or ?id=...)
  let slug = '';
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const prodIdx = pathParts.indexOf('product');
  if (prodIdx !== -1 && pathParts[prodIdx + 1]) {
    slug = decodeURIComponent(pathParts[prodIdx + 1]);
  } else {
    const params = new URLSearchParams(window.location.search);
    slug = params.get('slug') || params.get('id') || '';
  }

  const product = (slug ? (getProductBySlug(slug) || getProductById(slug)) : null) || PRODUCTS[0];
  if (!product) return;

  // 1. Dynamic Document Title & SEO
  document.title = `${product.name} | Glowistic`;
  const metaDesc = qs('meta[name="description"]');
  if (metaDesc) metaDesc.content = product.shortDescription || product.tagline || product.subtitle || '';

  // 2. Breadcrumbs
  const breadcrumbCat = el('breadcrumb-category-link');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = product.categoryName || product.category;
    breadcrumbCat.href = `shop.html?category=${product.category}`;
  }
  const breadcrumbName = el('breadcrumb-product-name');
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // 3. Category & Stock Pills
  const catPill = el('product-category-link');
  if (catPill) {
    catPill.textContent = product.categoryName || product.category;
    catPill.href = `shop.html?category=${product.category}`;
  }

  const stockPill = el('product-availability');
  if (stockPill) {
    stockPill.innerHTML = product.inStock
      ? `<span class="pdp-stock-dot"></span> In Stock`
      : `<span class="pdp-stock-dot" style="background:#E74C3C;"></span> Out of Stock`;
    stockPill.style.color = product.inStock ? '#2D6A4F' : '#E74C3C';
  }

  // 4. Titles & Subtitles
  const nameEl = el('product-name');
  if (nameEl) nameEl.textContent = product.name;
  const subtitleEl = el('product-subtitle');
  if (subtitleEl) subtitleEl.textContent = product.subtitle || product.tagline || 'Everyday Care Formula';
  const skuEl = el('product-sku');
  if (skuEl) skuEl.textContent = product.sku || `GLW-${product.id.toUpperCase()}`;

  // 5. Rating
  const ratingScore = el('product-rating-score');
  if (ratingScore) ratingScore.textContent = `${product.rating || 4.9} / 5.0`;
  const ratingCount = el('product-rating-count');
  if (ratingCount) ratingCount.textContent = `(${product.reviewCount || 128}+ happy customers)`;

  // 6. Pricing & Savings
  const priceEl = el('product-price');
  if (priceEl) priceEl.textContent = formatPrice(product.price);
  const origPriceEl = el('product-original-price');
  const savingsPill = el('product-savings-pill');

  if (origPriceEl) {
    if (product.onSale && product.originalPrice) {
      origPriceEl.textContent = formatPrice(product.originalPrice);
      origPriceEl.style.display = 'inline';
    } else {
      origPriceEl.style.display = 'none';
    }
  }

  if (savingsPill) {
    if (product.onSale && product.originalPrice && product.originalPrice > product.price) {
      const diff = product.originalPrice - product.price;
      savingsPill.textContent = `Save ${formatPrice(diff)}`;
      savingsPill.style.display = 'inline-block';
    } else {
      savingsPill.style.display = 'none';
    }
  }

  // 7. Main Image & Gallery Thumbnails
  const mainImg = el('product-main-image');
  const normalizedMainImg = product.image.replace(/^\//, '');
  if (mainImg) {
    mainImg.src = normalizedMainImg;
    mainImg.alt = product.name;
    mainImg.onerror = () => { mainImg.src = 'assets/products/oclear-serum.jpg'; };
  }

  const badgeEl = el('product-detail-badge');
  if (badgeEl) {
    if (product.badge) {
      badgeEl.textContent = product.badge;
      badgeEl.style.display = 'inline-block';
      badgeEl.className = `pdp-badge-pill ${product.badgeType === 'gold' ? 'badge-gold' : 'badge-burgundy'}`;
    } else {
      badgeEl.style.display = 'none';
    }
  }

  const thumbsContainer = el('product-gallery-thumbnails');
  if (thumbsContainer) {
    const galleryImages = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.image];
    thumbsContainer.innerHTML = galleryImages.map((imgSrc, idx) => `
      <button type="button" class="pdp-thumb-btn ${idx === 0 ? 'is-active' : ''}" data-src="${imgSrc.replace(/^\//, '')}" aria-label="${product.name} Thumbnail ${idx + 1}">
        <img src="${imgSrc.replace(/^\//, '')}" alt="${product.name} Thumbnail ${idx + 1}" onerror="this.src='assets/products/oclear-serum.jpg'" />
      </button>
    `).join('');

    qsa('.pdp-thumb-btn', thumbsContainer).forEach(btn => {
      btn.addEventListener('click', () => {
        qsa('.pdp-thumb-btn', thumbsContainer).forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        if (mainImg) mainImg.src = btn.dataset.src;
      });
    });
  }

  // 8. Description
  const descEl = el('product-description');
  if (descEl) descEl.textContent = product.description || product.shortDescription || '';

  // 9. Key Benefits Cards
  const benefitsGrid = el('product-benefits-grid');
  if (benefitsGrid && product.benefits && product.benefits.length > 0) {
    const defaultIcons = ['✨', '🌿', '💧', '🛡️', '🌸'];
    benefitsGrid.innerHTML = product.benefits.slice(0, 3).map((b, idx) => {
      const parts = b.split(':');
      const title = parts.length > 1 ? parts[0].trim() : `Key Benefit ${idx + 1}`;
      const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : b.trim();
      return `
        <div class="pdp-benefit-card">
          <div class="pdp-benefit-icon">${defaultIcons[idx % defaultIcons.length]}</div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      `;
    }).join('');
  }

  // 10. How To Use Steps
  const howToUseGrid = el('product-howtouse-grid');
  if (howToUseGrid && product.howToUse) {
    howToUseGrid.innerHTML = `
      <div class="pdp-step-card">
        <div class="pdp-step-num">1</div>
        <h4>Cleanse</h4>
        <p>Thoroughly cleanse skin with a gentle face wash and pat dry with a clean towel.</p>
      </div>
      <div class="pdp-step-card">
        <div class="pdp-step-num">2</div>
        <h4>Apply Formula</h4>
        <p>${product.howToUse}</p>
      </div>
      <div class="pdp-step-card">
        <div class="pdp-step-num">3</div>
        <h4>Absorb &amp; Lock</h4>
        <p>Allow the active formula to absorb fully for 60 seconds before applying other products.</p>
      </div>
      <div class="pdp-step-card">
        <div class="pdp-step-num">4</div>
        <h4>Everyday Habit</h4>
        <p>Maintain consistent daily use as part of your regular morning or evening care routine.</p>
      </div>
    `;
  }

  // 11. Structured Specs Table
  const specCat = el('spec-category');
  if (specCat) specCat.textContent = product.categoryName || product.category;
  const specActives = el('spec-actives');
  if (specActives) specActives.textContent = product.subtitle || product.tagline || 'Essential Care Actives';
  const specBestFor = el('spec-bestfor');
  if (specBestFor) specBestFor.textContent = product.idealFor || 'Daily routine and all skin types';
  const specVolume = el('spec-volume');
  if (specVolume) specVolume.textContent = product.volume || 'Standard bottle size';

  // 12. Ingredients
  const ingredientsContent = el('product-ingredients-content');
  if (ingredientsContent && product.ingredients) {
    ingredientsContent.textContent = product.ingredients;
  }

  // 13. Quantity Stepper & Dynamic WhatsApp URL Generation
  let quantity = 1;
  const qtyInput = el('product-qty-input');
  const qtyMinus = el('qty-minus');
  const qtyPlus = el('qty-plus');
  const waOrderBtn = el('btn-whatsapp-order');

  function updateWhatsAppLinks() {
    if (waOrderBtn) {
      const orderMessage = `Hi Glowistic, I would like to order:\n${product.name}\nQuantity: ${quantity}\n\nPlease share the next steps for Cash on Delivery.`;
      waOrderBtn.href = `${WHATSAPP_BASE}?text=${encodeURIComponent(orderMessage)}`;
    }
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        if (qtyInput) qtyInput.value = quantity;
        updateWhatsAppLinks();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      if (quantity < 99) {
        quantity++;
        if (qtyInput) qtyInput.value = quantity;
        updateWhatsAppLinks();
      }
    });
  }

  updateWhatsAppLinks();

  // 14. Primary Actions: Add to Cart & Buy Now
  const addCartBtn = el('btn-add-to-cart');
  if (addCartBtn) {
    addCartBtn.dataset.id = product.id;
    addCartBtn.dataset.slug = product.slug || product.id;
    addCartBtn.addEventListener('click', () => {
      cart.addItem(product.id, quantity);
      showToast(`${product.name} (x${quantity}) added to your bag!`);
      openCartDrawer();
    });
  }

  const buyNowBtn = el('btn-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      cart.addItem(product.id, quantity);
      window.location.href = 'checkout.html';
    });
  }

  // 15. Sticky Mobile Purchase Bar
  const stickyBar = el('mobile-sticky-bar');
  const stickyTitle = el('sticky-bar-title');
  const stickyPrice = el('sticky-bar-price');
  const stickyAddBtn = el('sticky-bar-add-btn');
  const stickyWABtn = el('sticky-bar-whatsapp-btn');

  if (stickyTitle) stickyTitle.textContent = product.name;
  if (stickyPrice) stickyPrice.textContent = formatPrice(product.price);
  if (stickyAddBtn) {
    stickyAddBtn.dataset.id = product.id;
    stickyAddBtn.addEventListener('click', () => {
      cart.addItem(product.id, 1);
      showToast(`${product.name} added to your bag!`);
      openCartDrawer();
    });
  }
  if (stickyWABtn) {
    stickyWABtn.href = `${WHATSAPP_BASE}?text=${encodeURIComponent(`Hi Glowistic, I would like to order ${product.name}`)}`;
  }

  if (stickyBar) {
    window.addEventListener('scroll', () => {
      const showSticky = window.scrollY > 420 && window.innerWidth <= 768;
      stickyBar.style.display = showSticky ? 'flex' : 'none';
    }, { passive: true });
  }

  // 16. Interactive FAQ Accordion
  qsa('.pdp-faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.pdp-faq-item');
      if (item) {
        const isOpen = item.classList.contains('is-open');
        item.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      }
    });
  });

  // 17. Related Products Grid ("You May Also Like")
  const relatedGrid = el('product-related-grid') || el('related-products-grid');
  if (relatedGrid) {
    // Prefer products in the same category; fallback to others; exclude current
    let related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category);
    if (related.length < 4) {
      const others = PRODUCTS.filter(p => p.id !== product.id && p.category !== product.category);
      related = [...related, ...others];
    }
    const selected = related.slice(0, 4);
    relatedGrid.innerHTML = selected.map(buildProductCard).join('\n');
    attachProductCardEvents(relatedGrid);
  }
}

// ─── Page: CART ───────────────────────────────────────────────────────────────
function initCartPage() {
  const itemsList = el('cart-page-items-list') || el('cart-items-container');
  const emptyView = el('cart-page-empty-view') || el('cart-empty-state');
  const cartGrid = el('cart-page-grid') || el('cart-summary-section');
  const subtotalEl = el('cart-page-subtotal') || el('cart-subtotal');
  const deliveryEl = el('cart-page-delivery') || el('cart-delivery-fee');
  const totalEl = el('cart-page-total') || el('cart-total');
  const waBtn = el('cart-page-whatsapp-btn') || el('btn-whatsapp-cart');
  const progressEl = el('cart-page-progress') || el('free-delivery-progress');
  const freeTextEl = el('cart-page-free-text') || el('free-delivery-text');

  function render() {
    const items = cart.getItemsWithDetails();
    const subtotal = cart.getSubtotal();
    const deliveryFee = cart.getDeliveryFee();
    const total = cart.getTotal();
    const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

    if (items.length === 0) {
      if (cartGrid) cartGrid.style.display = 'none';
      if (emptyView) emptyView.style.display = 'block';
      if (progressEl) progressEl.style.width = '0%';
      if (freeTextEl) freeTextEl.innerHTML = `Add ${formatPrice(FREE_DELIVERY_THRESHOLD)} for <strong>FREE Delivery</strong>!`;
      return;
    }

    if (emptyView) emptyView.style.display = 'none';
    if (cartGrid) cartGrid.style.display = 'grid';

    // Free delivery tracker
    const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
    if (progressEl) progressEl.style.width = `${pct}%`;
    if (freeTextEl) {
      if (remaining > 0) {
        freeTextEl.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more for <strong>FREE Delivery</strong>!`;
      } else {
        freeTextEl.innerHTML = `🎉 You qualify for <strong>FREE Nationwide Delivery</strong>!`;
      }
    }

    // Render items
    if (itemsList) {
      itemsList.innerHTML = items.map(item => `
        <div class="cart-item-row" data-id="${item.id}" style="display: grid; grid-template-columns: 84px 1fr auto; gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--color-border); align-items: center;">
          <a href="product.html?slug=${item.slug || item.id}">
            <img src="${(item.image || '').replace(/^\//, '')}" alt="${item.name}" style="width: 84px; height: 84px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border);" onerror="this.src='assets/products/placeholder.jpg'" />
          </a>
          <div>
            <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${item.categoryName || item.category}</div>
            <h3 style="font-size: 1.05rem; margin: 2px 0 4px; font-weight: 600;">
              <a href="product.html?slug=${item.slug || item.id}" style="color: var(--color-heading); text-decoration: none;">${item.name}</a>
            </h3>
            <div style="font-size: 0.9375rem; color: var(--color-primary); font-weight: 600;">${formatPrice(item.price)}</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
              <button type="button" class="cart-page-qty-btn" data-action="dec" data-id="${item.id}" style="width: 28px; height: 28px; border: 1px solid var(--color-border); background: var(--color-bg); border-radius: 4px; cursor: pointer;">−</button>
              <span style="font-weight: 600; min-width: 24px; text-align: center;">${item.quantity}</span>
              <button type="button" class="cart-page-qty-btn" data-action="inc" data-id="${item.id}" style="width: 28px; height: 28px; border: 1px solid var(--color-border); background: var(--color-bg); border-radius: 4px; cursor: pointer;">+</button>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-primary); margin-bottom: 8px;">${formatPrice(item.lineTotal)}</div>
            <button type="button" class="cart-page-remove-btn" data-id="${item.id}" style="background: none; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 0.8125rem; text-decoration: underline;">Remove</button>
          </div>
        </div>
      `).join('');

      qsa('.cart-page-qty-btn', itemsList).forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const currentItem = items.find(i => i.id === id);
          if (!currentItem) return;
          if (btn.dataset.action === 'inc') cart.updateQuantity(id, currentItem.quantity + 1);
          if (btn.dataset.action === 'dec') cart.updateQuantity(id, currentItem.quantity - 1);
          render();
        });
      });

      qsa('.cart-page-remove-btn', itemsList).forEach(btn => {
        btn.addEventListener('click', () => {
          cart.removeItem(btn.dataset.id);
          showToast('Item removed from bag.');
          render();
        });
      });
    }

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee);
    if (totalEl) totalEl.textContent = formatPrice(total);

    if (waBtn) {
      waBtn.href = cart.getWhatsAppOrderUrl ? cart.getWhatsAppOrderUrl() : `${WHATSAPP_BASE}?text=${encodeURIComponent('Hi Glowistic, I want to place an order from my bag.')}`;
    }
  }

  render();
  window.addEventListener('glowistic:cart-updated', render);
}

// ─── Page: CHECKOUT ───────────────────────────────────────────────────────────
function initCheckoutPage() {
  const items = cart.getItemsWithDetails();
  if (items.length === 0) {
    window.location.href = 'shop.html';
    return;
  }
  new CheckoutManager('glowistic-checkout-form');
}

// ─── Page: CONFIRMATION ───────────────────────────────────────────────────────
function initConfirmationPage() {
  const raw = localStorage.getItem('glowistic_last_order') || sessionStorage.getItem('glowistic_last_order');
  const detailsBox = el('confirm-details-container') || el('confirmation-content');
  const orderIdEl = el('confirm-order-id') || el('confirmation-order-number');
  const waBtn = el('confirm-whatsapp-btn') || el('btn-whatsapp-confirm');

  if (!raw) {
    if (detailsBox) {
      detailsBox.innerHTML = `
        <div style="text-align: center; padding: 24px;">
          <p style="color: var(--color-text-muted);">No recent order found in this browser session.</p>
          <a href="shop.html" class="btn btn-primary btn-sm" style="margin-top: 12px;">Explore Products</a>
        </div>
      `;
    }
    return;
  }

  let order;
  try {
    order = JSON.parse(raw);
  } catch (e) {
    return;
  }

  if (orderIdEl) orderIdEl.textContent = order.orderNumber || 'GLW-2026';

  if (detailsBox) {
    const cust = order.customer || order;
    const itemsHtml = (order.items || []).map(i => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed var(--color-border); font-size: 0.9375rem;">
        <div>
          <strong>${i.name}</strong> <span style="color: var(--color-text-muted);">× ${i.quantity}</span>
        </div>
        <div style="color: var(--color-primary); font-weight: 600;">${formatPrice(i.price * i.quantity)}</div>
      </div>
    `).join('');

    detailsBox.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;" class="confirm-summary-grid">
        <div>
          <h4 style="font-size: 0.95rem; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Customer Information</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; margin: 0; color: var(--color-text);">
            <strong>${cust.name || 'Valued Customer'}</strong><br/>
            ${cust.phone || ''}<br/>
            ${cust.email || ''}
          </p>
        </div>
        <div>
          <h4 style="font-size: 0.95rem; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Delivery Details (COD)</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; margin: 0; color: var(--color-text);">
            ${[cust.address, cust.area, cust.city, cust.province].filter(Boolean).join(', ')}<br/>
            <strong>Payment:</strong> Cash on Delivery (COD)
          </p>
        </div>
      </div>

      <h4 style="font-size: 0.95rem; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Items Ordered</h4>
      <div style="margin-bottom: 20px;">
        ${itemsHtml}
      </div>

      <div style="background: var(--color-bg); padding: 14px 18px; border-radius: 8px; font-size: 0.9375rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Subtotal:</span>
          <strong>${formatPrice(order.subtotal || 0)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Delivery (COD):</span>
          <span>${order.deliveryFee === 0 ? '<strong style="color: #2D6A4F;">FREE</strong>' : formatPrice(order.deliveryFee || 0)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--color-border); font-size: 1.15rem; color: var(--color-primary);">
          <strong>Total Payable in Cash:</strong>
          <strong>${formatPrice(order.total || 0)}</strong>
        </div>
      </div>
    `;
  }

  if (waBtn) {
    const msg = `Hi Glowistic, I placed order #${order.orderNumber}. Could you please confirm delivery details?`;
    waBtn.href = `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
  }
}

// ─── Page: BLOG (The Glow Journal) ────────────────────────────────────────────
function initBlogPage() {
  const grid = el('blog-articles-grid') || el('blog-grid');
  const searchInput = el('blog-search-input');
  const countEl = el('blog-results-count');
  let currentCategory = 'all';
  let currentSearch = '';

  const allArticles = getAllArticles();

  function buildArticleCard(article) {
    const imgSrc = (article.image || '').replace(/^\//, '');
    const imgAlt = article.alt || article.title;
    return `
      <article class="blog-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--shadow-sm); cursor: pointer;" onclick="if(!event.target.closest('a')){window.location.href='article.html?slug=${article.slug || article.id}';}" role="link" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.location.href='article.html?slug=${article.slug || article.id}';}">
        <div style="aspect-ratio: 16 / 10; width: 100%; overflow: hidden; position: relative;">
          <a href="article.html?slug=${article.slug || article.id}" style="display: block; width: 100%; height: 100%; text-decoration: none;" aria-label="${article.title}">
            <img src="${imgSrc}" alt="${imgAlt}" loading="lazy"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
              onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'"
              onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" />
          </a>
        </div>
        <div style="padding: 24px; flex: 1; display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px;">
            <span class="badge badge-burgundy" style="font-size: 0.725rem; letter-spacing: 0.5px; text-transform: uppercase;">${article.category}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">${article.date}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 600; color: var(--color-heading); margin: 0 0 10px; line-height: 1.35; flex: 1;">
            <a href="article.html?slug=${article.slug || article.id}" style="color: inherit; text-decoration: none;">
              ${article.title}
            </a>
          </h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; margin: 0 0 20px;">
            ${article.excerpt}
          </p>
          <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.785rem; color: var(--color-text-muted);">By ${article.author}</span>
            <a href="article.html?slug=${article.slug || article.id}" class="btn btn-outline btn-sm blog-read-link" style="font-weight: 600;">Read Article &rarr;</a>
          </div>
        </div>
      </article>`;
  }

  function renderBlog() {
    let articles = currentSearch
      ? searchArticles(currentSearch)
      : getArticlesByCategory(currentCategory);

    if (countEl) {
      countEl.textContent = `Showing ${articles.length} article${articles.length !== 1 ? 's' : ''}`;
    }

    const featuredBanner = el('blog-featured-banner');
    if (featuredBanner && articles.length > 0) {
      const topArticle = (currentCategory === 'all' && !currentSearch) ? allArticles[0] : articles[0];
      const featImg = el('featured-banner-img');
      const featCat = el('featured-banner-cat');
      const featTitle = el('featured-banner-title-link');
      const featExcerpt = el('featured-banner-excerpt');
      const featBtn = el('featured-banner-cta-btn');

      if (featImg) {
        featImg.src = (topArticle.image || '').replace(/^\//, '');
        featImg.alt = topArticle.alt || topArticle.title;
        featImg.onerror = () => { featImg.onerror = null; featImg.src = 'assets/blog/fallback-blog.svg'; };
      }
      if (featCat) featCat.textContent = topArticle.category;
      if (featTitle) {
        featTitle.textContent = topArticle.title;
        featTitle.href = `article.html?slug=${topArticle.slug || topArticle.id}`;
      }
      if (featExcerpt) featExcerpt.textContent = topArticle.excerpt;
      if (featBtn) featBtn.href = `article.html?slug=${topArticle.slug || topArticle.id}`;
    }

    if (grid) {
      if (articles.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px;">
            <div style="font-size: 2.25rem; margin-bottom: 12px;">📝</div>
            <h3 style="color: var(--color-primary); margin-bottom: 8px;">No articles found</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem;">Try searching for another skincare or wellness topic, or select "All".</p>
          </div>`;
      } else {
        grid.innerHTML = articles.map(buildArticleCard).join('');
      }
    }
  }

  qsa('[data-blog-category], [data-category-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = (btn.dataset.blogCategory || btn.dataset.categoryFilter || 'all').toLowerCase();
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      qsa('[data-blog-category], [data-category-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
      renderBlog();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim();
      renderBlog();
    });
  }

  renderBlog();
}

// ─── Page: ARTICLE (Editorial Magazine) ───────────────────────────────────────
function initArticlePage() {
  let slug = '';
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const blogIdx = pathParts.indexOf('blog');
  if (blogIdx !== -1 && pathParts[blogIdx + 1]) {
    slug = decodeURIComponent(pathParts[blogIdx + 1]);
  } else {
    const params = new URLSearchParams(window.location.search);
    slug = params.get('slug') || params.get('id') || '';
  }

  const article = (slug ? (getArticleBySlug(slug) || getArticleById(slug)) : null) || getAllArticles()[0];
  if (!article) return;

  // Dynamic SEO Metadata
  document.title = `${article.seoTitle || article.title} | The Glow Journal`;

  const metaDesc = qs('meta[name="description"]');
  if (metaDesc) metaDesc.content = article.metaDescription;

  const setField = (id, val) => { const e = el(id); if (e) e.textContent = val; };
  setField('article-breadcrumb-category', article.category);
  setField('article-breadcrumb-title', article.title);
  setField('article-cat-badge', article.category);
  setField('article-title', article.title);
  setField('article-intro', article.intro || article.excerpt);
  setField('article-author', article.author || 'Glowistic Editorial Team');

  const pubDateEl = el('article-date');
  if (pubDateEl) {
    pubDateEl.textContent = `Published ${article.date}`;
  }

  const updDateEl = el('article-updated-date');
  if (updDateEl && article.updatedDate) {
    const formatted = new Date(article.updatedDate).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
    updDateEl.textContent = `Updated ${formatted}`;
  }

  const readingTimeEl = el('article-reading-time');
  if (readingTimeEl && article.content) {
    const words = article.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    const minutes = Math.max(2, Math.round(words / 180));
    readingTimeEl.textContent = `${minutes} min read`;
  }

  const heroImg = el('article-featured-img');
  if (heroImg) {
    heroImg.src = (article.image || '').replace(/^\//, '');
    heroImg.alt = article.alt || article.title;
    heroImg.onerror = () => { heroImg.onerror = null; heroImg.src = 'assets/blog/fallback-blog.svg'; };
  }

  const bodyContent = el('article-body-content');
  if (bodyContent) {
    bodyContent.innerHTML = article.content;
  }

  // Social Sharing
  const articleUrl = encodeURIComponent(`https://www.glowisticpk.com/blog/${article.slug || article.id}`);
  const articleTitle = encodeURIComponent(article.title);

  const shareWA = el('share-whatsapp');
  if (shareWA) shareWA.href = `https://wa.me/?text=${articleTitle}%20-%20${articleUrl}`;

  const shareFB = el('share-facebook');
  if (shareFB) shareFB.href = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;

  const shareTwitter = el('share-twitter');
  if (shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?text=${articleTitle}&url=${articleUrl}`;

  const shareCopy = el('share-copy-link');
  if (shareCopy) {
    shareCopy.addEventListener('click', (e) => {
      e.preventDefault();
      const directUrl = `https://www.glowisticpk.com/blog/${article.slug || article.id}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(directUrl)
          .then(() => showToast('Article link copied to clipboard!'))
          .catch(() => showToast('Link: ' + directUrl));
      } else {
        showToast('Link: ' + directUrl);
      }
    });
  }

  // End CTA WhatsApp
  const endWA = el('article-end-whatsapp');
  if (endWA) {
    const msg = encodeURIComponent(`Hi Glowistic, I read "${article.title}" on The Glow Journal and would like product recommendations for my routine.`);
    endWA.href = `${WHATSAPP_BASE}?text=${msg}`;
  }

  // Related Articles (Sidebar & Bottom)
  const allOtherArticles = getAllArticles().filter(a => a.id !== article.id);
  const sameCategoryArticles = allOtherArticles.filter(a => a.category === article.category);
  const related = (sameCategoryArticles.length >= 2 ? sameCategoryArticles : allOtherArticles).slice(0, 3);

  const sidebarRelated = el('article-sidebar-related');
  if (sidebarRelated) {
    sidebarRelated.innerHTML = related.map(art => {
      const artImg = (art.image || '').replace(/^\//, '');
      const artAlt = art.alt || art.title;
      return `
        <a href="article.html?slug=${art.slug || art.id}" style="display: grid; grid-template-columns: 64px 1fr; gap: 12px; align-items: center; text-decoration: none; padding: 10px 0; border-bottom: 1px solid var(--color-border); transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
          <img src="${artImg}" alt="${artAlt}" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-border);" onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" />
          <div>
            <span style="font-size: 0.7rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${art.category}</span>
            <h5 style="font-size: 0.85rem; color: var(--color-heading); margin: 2px 0 0; line-height: 1.35; font-weight: 600;">${art.title}</h5>
          </div>
        </a>
      `;
    }).join('');
  }

  const bottomRelated = el('article-related-grid');
  if (bottomRelated) {
    bottomRelated.innerHTML = related.map(art => {
      const artImg = (art.image || '').replace(/^\//, '');
      const artAlt = art.alt || art.title;
      return `
        <div class="blog-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; cursor: pointer;" onclick="if(!event.target.closest('a')){window.location.href='article.html?slug=${art.slug || art.id}';}" role="link" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.location.href='article.html?slug=${art.slug || art.id}';}">
          <div style="aspect-ratio: 16 / 10; width: 100%; overflow: hidden;">
            <a href="article.html?slug=${art.slug || art.id}" style="display: block; width: 100%; height: 100%;" tabindex="-1" aria-hidden="true">
              <img src="${artImg}" alt="${artAlt}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='assets/blog/fallback-blog.svg';" />
            </a>
          </div>
          <div style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
            <span class="badge badge-burgundy" style="align-self: flex-start; font-size: 0.7rem; margin-bottom: 8px;">${art.category}</span>
            <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-heading); margin: 0 0 8px; line-height: 1.35; flex: 1;">
              <a href="article.html?slug=${art.slug || art.id}" style="color: inherit; text-decoration: none;">${art.title}</a>
            </h4>
            <p style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; margin: 0 0 14px;">${art.excerpt}</p>
            <a href="article.html?slug=${art.slug || art.id}" class="btn btn-outline btn-sm blog-read-link" style="align-self: flex-start;">Read Article &rarr;</a>
          </div>
        </div>
      `;
    }).join('');
  }
}

// ─── Page: CONTACT ────────────────────────────────────────────────────────────
function initContactPage() {
  const form = el('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }
    setTimeout(() => {
      showToast('Thank you! Your message has been received.');
      form.reset();
      if (submitBtn) {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }
    }, 800);
  });
}

// ─── Sticky Header Scroll State ───────────────────────────────────────────────
function initStickyHeader() {
  const header = qs('.site-header');
  if (!header) return;
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ─── Page Dispatcher ──────────────────────────────────────────────────────────
function initPageSpecifics() {
  const page = document.body.dataset.page;
  switch (page) {
    case 'home':          initHomePage();         break;
    case 'shop':          initShopPage();         break;
    case 'product':       initProductPage();      break;
    case 'cart':          initCartPage();         break;
    case 'checkout':      initCheckoutPage();     break;
    case 'confirmation':  initConfirmationPage(); break;
    case 'contact':       initContactPage();      break;
    case 'blog':          initBlogPage();         break;
    case 'article':       initArticlePage();      break;
    default:              break;
  }
}

// ─── Application Bootstrap ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initGlobalSearch();
  initCartDrawerListeners();
  initCardPaymentsModal();
  initCustomCursor();
  initPageSpecifics();
});
