/**
 * GLOWISTIC - E-Commerce Cart State Manager
 * Persisted in localStorage, handles Pakistan COD calculations and WhatsApp messaging.
 */
import { getProductById } from '../data/products.js';

const STORAGE_KEY = 'glowistic_cart_v1';
export const FREE_DELIVERY_THRESHOLD = 2500;
export const STANDARD_DELIVERY_FEE = 200;
export const WHATSAPP_PHONE = '923445422609';

class CartStore {
  constructor() {
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      this.dispatchUpdate();
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }

  dispatchUpdate() {
    const event = new CustomEvent('glowistic:cart-updated', {
      detail: {
        items: this.getItemsWithDetails(),
        count: this.getItemCount(),
        subtotal: this.getSubtotal(),
        deliveryFee: this.getDeliveryFee(),
        total: this.getTotal(),
        freeDeliveryRemaining: this.getFreeDeliveryRemaining()
      }
    });
    window.dispatchEvent(event);
  }

  addItem(productId, quantity = 1) {
    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ id: productId, quantity: Math.max(1, quantity) });
    }
    this.saveCart();
    return this.getItemsWithDetails();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity = quantity;
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  getItemsWithDetails() {
    return this.items.map(item => {
      const product = getProductById(item.id);
      if (!product) return null;
      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity
      };
    }).filter(Boolean);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.getItemsWithDetails().reduce((sum, item) => sum + item.lineTotal, 0);
  }

  getDeliveryFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  }

  getTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  getFreeDeliveryRemaining() {
    const subtotal = this.getSubtotal();
    return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  }

  /**
   * Generates a pre-formatted WhatsApp order message
   */
  generateWhatsAppOrderMessage(customerInfo = {}) {
    const items = this.getItemsWithDetails();
    if (items.length === 0) {
      return "Hi Glowistic, I would like to know more about your products.";
    }

    let msg = `*NEW GLOWISTIC ORDER ENQUIRY*\n`;
    msg += `------------------------------------\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}*\n`;
      msg += `   Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()} = Rs. ${item.lineTotal.toLocaleString()}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `*Subtotal:* Rs. ${this.getSubtotal().toLocaleString()}\n`;
    msg += `*Delivery Fee:* ${this.getDeliveryFee() === 0 ? 'FREE' : 'Rs. ' + this.getDeliveryFee()}\n`;
    msg += `*Grand Total:* Rs. ${this.getTotal().toLocaleString()} (COD)\n`;
    
    if (customerInfo.name) {
      msg += `\n*Customer Details:*\n`;
      msg += `Name: ${customerInfo.name}\n`;
      if (customerInfo.phone) msg += `Phone: ${customerInfo.phone}\n`;
      if (customerInfo.city) msg += `City: ${customerInfo.city}\n`;
      if (customerInfo.address) msg += `Address: ${customerInfo.address}\n`;
    }
    
    msg += `\nPlease confirm my order. Thank you!`;
    return msg;
  }

  getWhatsAppOrderUrl(customerInfo = {}) {
    const text = encodeURIComponent(this.generateWhatsAppOrderMessage(customerInfo));
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  }
}

export const cart = new CartStore();
