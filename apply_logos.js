const fs = require('fs');
const path = require('path');
const r = __dirname;

// 1. UPDATE make_layout.js
let layoutSrc = fs.readFileSync(path.join(r, 'make_layout.js'), 'utf8');

// Update getHead default ogImage
layoutSrc = layoutSrc.replace("ogImage = 'assets/brand/logo-burgundy.svg'", "ogImage = 'assets/brand/logo-burgundy.png'");
layoutSrc = layoutSrc.replace('<link rel="icon" type="image/svg+xml" href="assets/brand/favicon.svg" />', '<link rel="icon" type="image/png" href="assets/brand/favicon.png" />\n  <link rel="icon" type="image/svg+xml" href="assets/brand/favicon.svg" />\n  <link rel="apple-touch-icon" href="assets/brand/logo-stacked-burgundy.png" />');

// Update header logo
layoutSrc = layoutSrc.replace(
  '<img src="assets/brand/logo-burgundy.svg" alt="Glowistic" class="header-logo" />',
  '<img src="assets/brand/logo-burgundy.png" alt="Glowistic" class="header-logo" width="190" height="38" />'
);

// Update mobile nav logo
layoutSrc = layoutSrc.replace(
  '<img src="assets/brand/logo-burgundy.svg" alt="Glowistic" class="mobile-nav-logo" />',
  '<img src="assets/brand/logo-burgundy.png" alt="Glowistic" class="mobile-nav-logo" width="160" height="34" />'
);

// Update footer logo
layoutSrc = layoutSrc.replace(
  '<img src="assets/brand/logo-cream.svg" alt="Glowistic" class="footer-logo" />',
  '<img src="assets/brand/logo-cream.png" alt="Glowistic" class="footer-logo" width="210" height="42" />'
);

fs.writeFileSync(path.join(r, 'make_layout.js'), layoutSrc, 'utf8');

// 2. UPDATE generate_about.js to include stacked logo emblem
let aboutSrc = fs.readFileSync(path.join(r, 'generate_about.js'), 'utf8');
if (!aboutSrc.includes('logo-stacked-burgundy.png')) {
  aboutSrc = aboutSrc.replace(
    '<span class="section-tag">Our Story</span>',
    '<div style="text-align: center; margin-bottom: 28px;">\n          <img src="assets/brand/logo-stacked-burgundy.png" alt="Glowistic Emblem" style="height: 110px; width: auto; object-fit: contain; margin: 0 auto;" />\n        </div>\n        <span class="section-tag">Our Story</span>'
  );
  fs.writeFileSync(path.join(r, 'generate_about.js'), aboutSrc, 'utf8');
}

// 3. UPDATE generate_article.js to include stacked cream logo in sidebar
let articleSrc = fs.readFileSync(path.join(r, 'generate_article.js'), 'utf8');
articleSrc = articleSrc.replace(
  '<img src="assets/brand/logo-cream.svg" alt="Glowistic" style="height: 32px; margin: 0 auto 16px;" />',
  '<img src="assets/brand/logo-stacked-cream.png" alt="Glowistic" style="height: 56px; width: auto; object-fit: contain; margin: 0 auto 16px;" />'
);
fs.writeFileSync(path.join(r, 'generate_article.js'), articleSrc, 'utf8');

// 4. UPDATE css/main.css for crisp logo rendering
let cssSrc = fs.readFileSync(path.join(r, 'css', 'main.css'), 'utf8');
cssSrc = cssSrc.replace(/\.header-logo\s*\{[^}]*\}/, `.header-logo {
  height: 38px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  display: block;
}`);
cssSrc = cssSrc.replace(/\.footer-logo\s*\{[^}]*\}/, `.footer-logo {
  height: 42px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
  margin-bottom: 18px;
}`);
fs.writeFileSync(path.join(r, 'css', 'main.css'), cssSrc, 'utf8');

console.log('Successfully updated logo references and styling across the codebase!');
