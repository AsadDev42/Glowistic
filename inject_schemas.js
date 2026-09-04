const fs = require('fs');
const path = require('path');
const r = __dirname;

const files = [
  {
    name: 'generate_cart.js',
    title: 'Your Glowistic Bag — Shopping Cart',
    desc: 'Review your selected Glowistic essentials with Cash on Delivery across Pakistan.',
    canonical: 'cart.html',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Your Glowistic Bag — Shopping Cart',
      'url': 'https://www.glowisticpk.com/cart.html'
    }
  },
  {
    name: 'generate_checkout.js',
    title: 'Complete Your Order — Cash on Delivery | Glowistic',
    desc: 'Secure Cash on Delivery checkout for authentic Glowistic skincare, hair care, and wellness essentials.',
    canonical: 'checkout.html',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Complete Your Order — Cash on Delivery | Glowistic',
      'url': 'https://www.glowisticpk.com/checkout.html'
    }
  },
  {
    name: 'generate_confirmation.js',
    title: 'Thank You for Choosing Glowistic — Order Received',
    desc: 'Order confirmation and details for your Glowistic purchase.',
    canonical: 'confirmation.html',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Thank You for Choosing Glowistic — Order Received',
      'url': 'https://www.glowisticpk.com/confirmation.html'
    }
  },
  {
    name: 'generate_shop.js',
    title: 'Shop All Products — Glowistic Official Store',
    desc: 'Discover Glowistic beauty, skincare, personal care, hair care, and wellness essentials with Cash on Delivery nationwide.',
    canonical: 'shop.html',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Shop All Products — Glowistic Official Store',
      'url': 'https://www.glowisticpk.com/shop.html'
    }
  },
  {
    name: 'generate_product.js',
    title: 'Product Details — Glowistic Official Store',
    desc: 'Authentic beauty, skincare, and personal care products for daily routines in Pakistan.',
    canonical: 'product.html',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Glowistic Everyday Essentials',
      'url': 'https://www.glowisticpk.com/product.html'
    }
  }
];

files.forEach(f => {
  const filePath = path.join(r, f.name);
  let src = fs.readFileSync(filePath, 'utf8');
  src = src.replace(/const head = getHead\([\s\S]*?\);/, `const head = getHead(
  ${JSON.stringify(f.title)},
  ${JSON.stringify(f.desc)},
  ${JSON.stringify(f.canonical)},
  ${JSON.stringify(f.schema, null, 2)}
);`);
  fs.writeFileSync(filePath, src, 'utf8');
});

console.log('Successfully updated schemas in generator scripts.');
