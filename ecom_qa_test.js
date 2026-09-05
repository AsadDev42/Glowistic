const path = require('path');
const storeDir = 'C:\\Users\\ASAD\\.gemini\\antigravity\\scratch\\glowistic-store';

console.log('=== GLOWISTIC E-COMMERCE & LOGIC QA AUDIT ===');

// 1. Test Products Data
const { PRODUCTS, getAllProducts, getProductById, getProductsByCategory, getFeaturedProducts } = require(path.join(storeDir, 'js/data/products.js'));

console.log('Total Products:', PRODUCTS ? PRODUCTS.length : 'undefined');
const all = getAllProducts();
console.log('getAllProducts count:', all.length);

let prodIssues = 0;
all.forEach(p => {
  if (!p.id || !p.name || !p.price || !p.image || !p.category) {
    console.error('Invalid product record:', p);
    prodIssues++;
  }
  if (p.price < 500 || p.price > 5000) {
    console.warn('Suspicious price for', p.id, p.price);
  }
});
console.log('Product Data Integrity Issues:', prodIssues);

// 2. Test Articles Data
const { GLOW_ARTICLES, getAllArticles, getArticleBySlug } = require(path.join(storeDir, 'js/data/articles.js'));
const articles = GLOW_ARTICLES || getAllArticles();
console.log('\nTotal Articles:', articles.length);
let artIssues = 0;
articles.forEach(a => {
  if (!a.id || !a.slug || !a.title || !a.category || !a.content) {
    console.error('Invalid article record:', a.slug);
    artIssues++;
  }
  if (a.content.length < 500) {
    console.warn('Article content seems short (<500 chars):', a.slug);
  }
});
console.log('Article Data Integrity Issues:', artIssues);

// 3. Test Email Service
const { emailService } = require(path.join(storeDir, 'js/modules/emailService.js'));
console.log('\nTesting Email Service...');
const mockOrder = {
  orderNumber: 'GLW-2026-TEST',
  customer: {
    fullName: 'Test Customer',
    phone: '03445422609',
    email: 'test@example.com',
    address: '123 Test St',
    city: 'Islamabad',
    province: 'Federal Capital'
  },
  items: [
    { name: "O'Clear Acne Clear Serum", price: 1450, quantity: 2, lineTotal: 2900 }
  ],
  subtotal: 2900,
  deliveryFee: 0,
  total: 2900,
  paymentMethod: 'Cash on Delivery',
  createdAt: new Date().toISOString()
};

emailService.sendOrderNotification(mockOrder).then(res => {
  console.log('Email Service Response:', res);
}).catch(err => {
  console.error('Email Service Error:', err);
});

