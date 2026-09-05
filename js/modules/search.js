/**
 * GLOWISTIC - Live Search & Catalog Filter Engine
 */
import { searchProducts, getAllProducts, getProductsByCategory } from '../data/products.js';
import { cart } from '../state/cart.js';

export class SearchEngine {
  constructor() {
    this.searchInput = document.getElementById('global-search-input');
    this.searchResults = document.getElementById('search-results-dropdown');
    this.searchModal = document.getElementById('search-modal');
  }

  init() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
      this.searchInput.addEventListener('focus', () => {
        if (this.searchInput.value.trim().length > 0) {
          this.handleSearch(this.searchInput.value);
        }
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (this.searchResults && !e.target.closest('#global-search-container')) {
        this.searchResults.classList.remove('is-active');
      }
    });
  }

  handleSearch(query) {
    if (!this.searchResults) return;

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      this.searchResults.innerHTML = '';
      this.searchResults.classList.remove('is-active');
      return;
    }

    const matches = searchProducts(trimmed);
    if (matches.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-empty-state">
          <p>No products found for "<strong>${this.escapeHtml(trimmed)}</strong>"</p>
          <small>Try searching for "serum", "shampoo", "neem", "iron", or "granules"</small>
        </div>
      `;
      this.searchResults.classList.add('is-active');
      return;
    }

    const itemsHtml = matches.map(p => `
      <a href="product.html?id=${p.id}" class="search-item">
        <img src="${p.image}" alt="${p.name}" class="search-item-thumb" />
        <div class="search-item-details">
          <span class="search-item-cat">${p.categoryName}</span>
          <h4 class="search-item-title">${p.name}</h4>
          <span class="search-item-price">Rs. ${p.price.toLocaleString()}</span>
        </div>
      </a>
    `).join('');

    this.searchResults.innerHTML = `
      <div class="search-results-header">Found ${matches.length} result${matches.length > 1 ? 's' : ''}</div>
      <div class="search-results-list">${itemsHtml}</div>
      <div class="search-results-footer">
        <a href="shop.html?search=${encodeURIComponent(trimmed)}" class="search-view-all">View all results in Shop &rarr;</a>
      </div>
    `;
    this.searchResults.classList.add('is-active');
  }

  escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}
