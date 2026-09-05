/**
 * GLOWISTIC - Interactive Routine Finder Quiz
 * Helps customers find their ideal daily care system in 2 quick steps.
 */
import { getProductById } from '../data/products.js';
import { cart } from '../state/cart.js';

export class RoutineQuiz {
  constructor(containerId = 'routine-quiz-container') {
    this.container = document.getElementById(containerId);
    this.currentStep = 1;
    this.answers = {
      goal: null,
      level: 'complete'
    };
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    if (!this.container) return;

    if (this.currentStep === 1) {
      this.container.innerHTML = `
        <div class="quiz-card fade-in">
          <div class="quiz-header">
            <span class="quiz-step-badge">Step 1 of 2</span>
            <h3 class="quiz-title">What is your primary daily care focus?</h3>
            <p class="quiz-subtitle">Select what you would like to improve in your everyday routine.</p>
          </div>
          <div class="quiz-options-grid">
            <button type="button" class="quiz-opt-btn" data-goal="acne">
              <span class="quiz-opt-icon">✨</span>
              <div class="quiz-opt-text">
                <strong>Clear Acne & Active Breakouts</strong>
                <small>Blemish defense, gentle purification & oil balance</small>
              </div>
            </button>
            <button type="button" class="quiz-opt-btn" data-goal="hairfall">
              <span class="quiz-opt-icon">🌿</span>
              <div class="quiz-opt-text">
                <strong>Stop Hair Fall & Boost Growth</strong>
                <small>Thickening, follicle stimulation & root nutrition</small>
              </div>
            </button>
            <button type="button" class="quiz-opt-btn" data-goal="vitality">
              <span class="quiz-opt-icon">⚡</span>
              <div class="quiz-opt-text">
                <strong>Daily Energy, Iron & Vitality</strong>
                <small>Combat tiredness, support haemoglobin & cellular stamina</small>
              </div>
            </button>
            <button type="button" class="quiz-opt-btn" data-goal="bodycare">
              <span class="quiz-opt-icon">🌸</span>
              <div class="quiz-opt-text">
                <strong>Full Body & Scalp Nourishment</strong>
                <small>Lavender hand/body calm & soothing Arnica shampoo</small>
              </div>
            </button>
            <button type="button" class="quiz-opt-btn" data-goal="growth">
              <span class="quiz-opt-icon">🦒</span>
              <div class="quiz-opt-text">
                <strong>Kids & Teens Growth & Nutrition</strong>
                <small>Bone support, appetite enhancement & family tonic</small>
              </div>
            </button>
          </div>
        </div>
      `;
      this.attachStep1Listeners();
    } else if (this.currentStep === 2) {
      this.container.innerHTML = `
        <div class="quiz-card fade-in">
          <div class="quiz-header">
            <span class="quiz-step-badge">Step 2 of 2</span>
            <h3 class="quiz-title">How comprehensive would you like your routine?</h3>
            <p class="quiz-subtitle">Both options are formulated for visible everyday results.</p>
          </div>
          <div class="quiz-options-grid">
            <button type="button" class="quiz-opt-btn" data-level="complete">
              <span class="quiz-opt-icon">⭐</span>
              <div class="quiz-opt-text">
                <strong>Complete Synergistic Routine (Recommended)</strong>
                <small>Combines topical + internal or dual-action products for optimal results</small>
              </div>
            </button>
            <button type="button" class="quiz-opt-btn" data-level="essential">
              <span class="quiz-opt-icon">🌱</span>
              <div class="quiz-opt-text">
                <strong>Single Star Essential</strong>
                <small>Start with the single most impactful product for your goal</small>
              </div>
            </button>
          </div>
          <div class="quiz-footer">
            <button type="button" class="btn btn-outline btn-sm quiz-back-btn">&larr; Back</button>
          </div>
        </div>
      `;
      this.attachStep2Listeners();
    } else if (this.currentStep === 3) {
      this.renderRecommendation();
    }
  }

  attachStep1Listeners() {
    this.container.querySelectorAll('[data-goal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.answers.goal = btn.getAttribute('data-goal');
        this.currentStep = 2;
        this.render();
      });
    });
  }

  attachStep2Listeners() {
    this.container.querySelectorAll('[data-level]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.answers.level = btn.getAttribute('data-level');
        this.currentStep = 3;
        this.render();
      });
    });

    const backBtn = this.container.querySelector('.quiz-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.currentStep = 1;
        this.render();
      });
    }
  }

  getRecommendedProducts() {
    const { goal, level } = this.answers;

    if (goal === 'acne') {
      return level === 'complete' 
        ? [getProductById('neem-face-wash'), getProductById('oclear-acne-serum')]
        : [getProductById('oclear-acne-serum')];
    } else if (goal === 'hairfall') {
      return level === 'complete'
        ? [getProductById('reroot-onion-rosemary-shampoo'), getProductById('reroot-hair-growth-pack')]
        : [getProductById('reroot-onion-rosemary-shampoo')];
    } else if (goal === 'vitality') {
      return level === 'complete'
        ? [getProductById('hema-lin-oral-liquid'), getProductById('super-ton-chocolate-granules')]
        : [getProductById('hema-lin-oral-liquid')];
    } else if (goal === 'bodycare') {
      return level === 'complete'
        ? [getProductById('lavender-chamomile-lotion'), getProductById('hair-n-scalp-shampoo-arnica')]
        : [getProductById('lavender-chamomile-lotion')];
    } else if (goal === 'growth') {
      return level === 'complete'
        ? [getProductById('wegro-ideal-growth'), getProductById('super-ton-chocolate-granules')]
        : [getProductById('wegro-ideal-growth')];
    }
    return [getProductById('oclear-acne-serum')];
  }

  renderRecommendation() {
    const products = this.getRecommendedProducts().filter(Boolean);
    const bundleTotal = products.reduce((sum, p) => sum + p.price, 0);

    const productCardsHtml = products.map(p => `
      <div class="quiz-result-product">
        <img src="${p.image}" alt="${p.name}" class="quiz-result-img" />
        <div class="quiz-result-info">
          <span class="badge badge-${p.badgeType || 'gold'}">${p.categoryName}</span>
          <h4 class="quiz-result-name">${p.name}</h4>
          <p class="quiz-result-sub">${p.subtitle}</p>
          <div class="quiz-result-price">Rs. ${p.price.toLocaleString()}</div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="quiz-card quiz-result-card fade-in">
        <div class="quiz-result-badge">✨ Your Customized Routine Match</div>
        <h3 class="quiz-title">Your Everyday Glow Routine</h3>
        <p class="quiz-subtitle">Specially curated for your daily goals. Formulated for high bioavailability & everyday comfort.</p>
        
        <div class="quiz-results-list">
          ${productCardsHtml}
        </div>

        <div class="quiz-result-total-box">
          <div class="quiz-total-row">
            <span>Routine Bundle Total:</span>
            <strong>Rs. ${bundleTotal.toLocaleString()}</strong>
          </div>
          <div class="quiz-shipping-tag">
            ${bundleTotal >= 2500 ? '🎉 Eligible for FREE Cash on Delivery' : '🚚 Standard Cash on Delivery across Pakistan'}
          </div>
        </div>

        <div class="quiz-result-actions">
          <button type="button" class="btn btn-primary btn-block add-bundle-btn">
            Add Full Routine to Cart
          </button>
          <button type="button" class="btn btn-outline btn-block reset-quiz-btn">
            &larr; Retake Routine Finder
          </button>
        </div>
      </div>
    `;

    const addBundleBtn = this.container.querySelector('.add-bundle-btn');
    if (addBundleBtn) {
      addBundleBtn.addEventListener('click', () => {
        products.forEach(p => cart.addItem(p.id, 1));
        addBundleBtn.innerHTML = '✓ Routine Added to Cart!';
        addBundleBtn.disabled = true;
        setTimeout(() => {
          // Open cart drawer
          const cartDrawer = document.getElementById('cart-drawer');
          if (cartDrawer) cartDrawer.classList.add('is-open');
        }, 400);
      });
    }

    const resetBtn = this.container.querySelector('.reset-quiz-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.currentStep = 1;
        this.render();
      });
    }
  }
}
