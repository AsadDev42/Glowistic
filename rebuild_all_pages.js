const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const r = __dirname;

// Remove refund-policy.html if exists
const refundPath = path.join(r, 'refund-policy.html');
if (fs.existsSync(refundPath)) {
  fs.unlinkSync(refundPath);
  console.log('Removed refund-policy.html');
}

const generators = [
  'generate_home.js',
  'generate_shop.js',
  'generate_product.js',
  'generate_cart.js',
  'generate_checkout.js',
  'generate_confirmation.js',
  'generate_about.js',
  'generate_blog.js',
  'generate_article.js',
  'generate_contact.js',
  'make_shipping.js',
  'make_privacy.js',
  'make_terms.js'
];

generators.forEach(gen => {
  if (fs.existsSync(path.join(r, gen))) {
    console.log(`Running ${gen}...`);
    execSync(`node ${gen}`, { cwd: r, stdio: 'inherit' });
  }
});

console.log('All 13 pages regenerated with updated footer!');
