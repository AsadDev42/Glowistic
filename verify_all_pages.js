const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'shop.html',
  'product.html',
  'cart.html',
  'checkout.html',
  'confirmation.html',
  'about.html',
  'blog.html',
  'article.html',
  'contact.html',
  'shipping-policy.html',
  'privacy-policy.html',
  'terms-conditions.html'
];

let allPassed = true;

pages.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error('MISSING FILE:', file);
    allPassed = false;
    return;
  }
  const html = fs.readFileSync(file, 'utf8');

  const checks = [
    { name: 'Glowistic Tagline', test: html.includes('"Our everyday glow starts here."') },
    { name: 'Shop Column', test: html.includes('<h4>Shop</h4>') },
    { name: 'Explore Column', test: html.includes('<h4>Explore</h4>') },
    { name: 'Customer Care Column', test: html.includes('<h4>Customer Care</h4>') },
    { name: 'Customer Care: Contact Us Link', test: html.includes('href="contact.html">Contact Us</a>') },
    { name: 'Customer Care: FAQs Link', test: html.includes('href="index.html#faq-section">FAQs</a>') },
    { name: 'Customer Care: Shipping & Delivery Link', test: html.includes('href="shipping-policy.html">Shipping &amp; Delivery</a>') || html.includes('href="shipping-policy.html">Shipping & Delivery</a>') },
    { name: 'Customer Care: Privacy Policy Link', test: html.includes('href="privacy-policy.html">Privacy Policy</a>') },
    { name: 'Customer Care: Terms & Conditions Link', test: html.includes('href="terms-conditions.html">Terms &amp; Conditions</a>') || html.includes('href="terms-conditions.html">Terms & Conditions</a>') },
    { name: 'NO Refund Link', test: !html.includes('refund-policy.html') },
    { name: 'Connect Column', test: html.includes('<h4>Connect</h4>') },
    { name: 'WhatsApp Link', test: html.includes('https://wa.me/923445422609') },
    { name: 'Instagram Link', test: html.includes('https://www.instagram.com/glowisticpk') },
    { name: 'Facebook Link', test: html.includes('https://www.facebook.com/glowisticpk.store') },
    { name: 'WhatsApp Number Display', test: html.includes('03445422609') },
    { name: 'Copyright Bottom', test: html.includes('&copy; 2026 Glowistic. All rights reserved.') || html.includes('© 2026 Glowistic. All rights reserved.') }
  ];

  const failed = checks.filter(c => !c.test);
  if (failed.length > 0) {
    console.warn(`[WARN] ${file} failed checks:`, failed.map(f => f.name).join(', '));
    allPassed = false;
  } else {
    console.log(`[PASS] ${file} - All footer verification checks passed!`);
  }
});

if (allPassed) {
  console.log('\n======================================================');
  console.log('ALL 13 PAGES PASSED 100% FOOTER VERIFICATION CHECKS!');
  console.log('======================================================');
} else {
  console.error('\nSome checks failed.');
  process.exit(1);
}
