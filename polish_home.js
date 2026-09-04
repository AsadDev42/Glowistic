const fs = require('fs');
const path = require('path');
const r = __dirname;

// 1. Refine generate_home.js
let homeSrc = fs.readFileSync(path.join(r, 'generate_home.js'), 'utf8');

// Ensure Primary CTA in Hero is exactly "Shop Glowistic"
homeSrc = homeSrc.replace(
  '<a href="#featured-products" class="btn btn-primary btn-lg">Shop Glowistic &rarr;</a>',
  '<a href="shop.html" class="btn btn-primary btn-lg">Shop Glowistic</a>'
);

// Ensure Supporting copy in Final CTA is exact
homeSrc = homeSrc.replace(
  'Make everyday care a little easier with Glowistic. Thoughtful essentials crafted for you and your family.',
  'Make everyday care a little easier with Glowistic.'
);

// Ensure Final CTA primary button is "Shop Now"
homeSrc = homeSrc.replace(
  '<a href="shop.html" class="btn btn-secondary btn-lg">Shop Now &rarr;</a>',
  '<a href="shop.html" class="btn btn-secondary btn-lg">Shop Now</a>'
);

fs.writeFileSync(path.join(r, 'generate_home.js'), homeSrc, 'utf8');

// 2. Add subtle hero motion in css/main.css
let cssSrc = fs.readFileSync(path.join(r, 'css', 'main.css'), 'utf8');

const heroMotionCss = `
/* -------------------------------------------------------------
   Subtle Hero Product Image Motion
------------------------------------------------------------- */
@keyframes heroFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.hero-visual-card {
  animation: heroFloat 5.5s ease-in-out infinite;
  will-change: transform;
}

.hero-visual-card:hover {
  animation-play-state: paused;
}
`;

if (!cssSrc.includes('@keyframes heroFloat')) {
  cssSrc += `\n${heroMotionCss}`;
  fs.writeFileSync(path.join(r, 'css', 'main.css'), cssSrc, 'utf8');
}

console.log('Successfully polished generate_home.js and main.css!');
