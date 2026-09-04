const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/ASAD/.gemini/antigravity/brain/c8d4299b-53ab-4d72-844c-fcb2e1e55021/.user_uploaded';
const destDir = path.join(__dirname, 'assets', 'brand');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { src: 'media_1788493500558.png', dests: ['logo-horizontal-burgundy.png', 'logo-burgundy.png', '1.png'] },
  { src: 'media_1788493500559.png', dests: ['logo-horizontal-cream.png', 'logo-cream.png', '2.png'] },
  { src: 'media_1788493500566.png', dests: ['logo-stacked-burgundy.png', '3.png', 'favicon.png'] },
  { src: 'media_1788493500639.png', dests: ['logo-stacked-cream.png', '4.png'] }
];

mappings.forEach(m => {
  const sourcePath = path.join(srcDir, m.src);
  if (fs.existsSync(sourcePath)) {
    m.dests.forEach(dest => {
      const destPath = path.join(destDir, dest);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${m.src} -> assets/brand/${dest}`);
    });
  } else {
    console.error(`Source missing: ${sourcePath}`);
  }
});
