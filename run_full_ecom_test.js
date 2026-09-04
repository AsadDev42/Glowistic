const path = require('path');
const storeDir = 'C:\\Users\\ASAD\\.gemini\\antigravity\\scratch\\glowistic-store';

console.log('=== RUNNING COMPREHENSIVE E-COMMERCE & APPLICATION TESTS ===');

// Mock localStorage for Node test environment
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = v.toString(); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { for (let k in mockStorage) delete mockStorage[k]; }
};

// Mock window and dispatchEvent
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  location: { search: '' }
};
global.CustomEvent = class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } };

// 1. Test Products
const { getAllProducts, getProductById, getProductsByCategory, getFeaturedProducts } = require(path.join(storeDir, 'js/data/products.js'));
const allProducts = getAllProducts();
console.log('✔ Products loaded:', allProducts.length);
if (allProducts.length !== 9) throw new Error('Expected 9 authentic products');

const oclear = getProductById('oclear-acne-serum');
console.log('✔ Product getById (O\'Clear):', oclear ? oclear.name : 'FAIL');
if (!oclear || oclear.price !== 1450) throw new Error('O\'Clear product verification failed');

const haircareProducts = getProductsByCategory('haircare');
console.log('✔ Products by category (haircare):', haircareProducts.length);
if (haircareProducts.length !== 3) throw new Error('Expected 3 haircare products');

// 2. Test Articles
const { GLOW_ARTICLES } = require(path.join(storeDir, 'js/data/articles.js'));
console.log('✔ Articles loaded:', GLOW_ARTICLES.length);
if (GLOW_ARTICLES.length !== 6) throw new Error('Expected 6 authentic articles');

// 3. Test Cart Module
const { cart, FREE_DELIVERY_THRESHOLD } = require(path.join(storeDir, 'js/state/cart.js'));
cart.clearCart();

console.log('Initial cart count:', cart.getItemCount());
cart.addItem('neem-face-wash', 2); // 650 * 2 = 1300
console.log('Cart subtotal (2x Neem): Rs.', cart.getSubtotal()); // 1300
console.log('Cart delivery fee (<2500): Rs.', cart.getDeliveryFee()); // 200
console.log('Cart total: Rs.', cart.getTotal()); // 1500
if (cart.getSubtotal() !== 1300 || cart.getDeliveryFee() !== 200 || cart.getTotal() !== 1500) {
  throw new Error('Initial cart subtotal / delivery calculation failed');
}

cart.addItem('oclear-acne-serum', 1); // + 1450 => 2750
console.log('Updated Cart subtotal: Rs.', cart.getSubtotal()); // 2750
console.log('Updated Delivery fee (>=2500): Rs.', cart.getDeliveryFee()); // 0 (FREE!)
console.log('Updated Cart total: Rs.', cart.getTotal()); // 2750
if (cart.getDeliveryFee() !== 0 || cart.getTotal() !== 2750) throw new Error('Free delivery calculation failed');

cart.updateQuantity('neem-face-wash', 1); // 650 + 1450 = 2100
console.log('After qty update subtotal: Rs.', cart.getSubtotal()); // 2100
console.log('After qty update delivery fee (<2500): Rs.', cart.getDeliveryFee()); // 200
if (cart.getDeliveryFee() !== 200 || cart.getTotal() !== 2300) throw new Error('Under threshold delivery fee calculation failed');

cart.removeItem('neem-face-wash'); // 1450 left
console.log('After item remove subtotal: Rs.', cart.getSubtotal()); // 1450
if (cart.getItemCount() !== 1) throw new Error('Cart remove item failed');

// 4. Test Email Service
const { emailService } = require(path.join(storeDir, 'js/modules/emailService.js'));
const testOrder = {
  orderNumber: 'GLW-2026-9999',
  createdAt: new Date().toISOString(),
  customer: {
    name: 'Fatima Ali',
    phone: '03001234567',
    email: 'fatima@example.com',
    address: 'House 42, St 5, F-8/2',
    city: 'Islamabad',
    province: 'Islamabad Capital Territory'
  },
  items: cart.getItemsWithDetails(),
  subtotal: cart.getSubtotal(),
  deliveryFee: cart.getDeliveryFee(),
  total: cart.getTotal()
};

emailService.sendOrderNotification(testOrder).then(res => {
  console.log('✔ Email notification service test passed:', res.status);
  console.log('\n========================================');
  console.log('ALL E-COMMERCE LOGIC UNIT TESTS PASSED!');
  console.log('========================================');
}).catch(err => {
  console.error('Email notification service failed:', err);
  process.exit(1);
});
