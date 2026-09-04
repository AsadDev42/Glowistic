const fs = require('fs');
const path = require('path');

const prodPath = path.join(__dirname, 'generate_product.js');
let content = fs.readFileSync(prodPath, 'utf8');
content = content.replace(
  '<!-- Injected dynamically by js/app.js -->',
  '<h1 class="sr-only">Product Details — Glowistic</h1>\n    <!-- Injected dynamically by js/app.js -->'
);
fs.writeFileSync(prodPath, content, 'utf8');
