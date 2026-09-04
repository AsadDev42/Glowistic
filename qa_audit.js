const fs = require('fs');
const path = require('path');

const storeDir = __dirname;
const htmlFiles = fs.readdirSync(storeDir).filter(f => f.endsWith('.html'));

console.log('=== GLOWISTIC AUTOMATED QA AUDIT ===');
console.log('Auditing', htmlFiles.length, 'HTML pages in', storeDir);

const auditResults = {
  pages: {},
  brokenLinks: [],
  missingImages: [],
  missingAlt: [],
  missingSeo: [],
  missingSchema: [],
  missingLabels: []
};

htmlFiles.forEach(file => {
  const filePath = path.join(storeDir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const pageResult = {
    file,
    hasTitle: /<title>([^<]+)<\/title>/i.test(html),
    titleText: (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || '',
    hasMetaDesc: /<meta\s+name=["']description["']/i.test(html),
    hasCanonical: /<link\s+rel=["']canonical["']/i.test(html),
    hasOgTitle: /<meta\s+property=["']og:title["']/i.test(html),
    hasOgImage: /<meta\s+property=["']og:image["']/i.test(html),
    hasSchema: /<script\s+type=["']application\/ld\+json["']/i.test(html),
    hasH1: /<h1[^>]*>/i.test(html),
    h1Count: (html.match(/<h1[^>]*>/gi) || []).length,
    links: [],
    images: []
  };

  if (!pageResult.hasTitle) auditResults.missingSeo.push({ file, issue: 'Missing title' });
  if (!pageResult.hasMetaDesc) auditResults.missingSeo.push({ file, issue: 'Missing meta description' });
  if (!pageResult.hasCanonical) auditResults.missingSeo.push({ file, issue: 'Missing canonical link' });
  if (!pageResult.hasOgTitle) auditResults.missingSeo.push({ file, issue: 'Missing og:title' });
  if (!pageResult.hasSchema) auditResults.missingSchema.push(file);

  // Check internal links
  const hrefRegex = /href=["']([^"'#]+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const link = match[1];
    if (!link.startsWith('http') && !link.startsWith('mailto:') && !link.startsWith('tel:') && !link.startsWith('javascript:')) {
      const cleanLink = link.split('?')[0];
      const targetPath = path.join(storeDir, cleanLink);
      if (!fs.existsSync(targetPath)) {
        auditResults.brokenLinks.push({ file, link, cleanLink });
      }
    }
  }

  // Check images and alt attributes
  const imgRegex = /<img\s+([^>]+)>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    const imgTag = match[1];
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    
    if (srcMatch) {
      const src = srcMatch[1];
      if (!src.startsWith('http') && !src.startsWith('data:')) {
        const cleanSrc = src.split('?')[0];
        const targetPath = path.join(storeDir, cleanSrc);
        if (!fs.existsSync(targetPath)) {
          auditResults.missingImages.push({ file, src });
        }
      }
    }

    if (!altMatch || altMatch[1].trim() === '') {
      auditResults.missingAlt.push({ file, imgTag });
    }
  }

  auditResults.pages[file] = pageResult;
});

console.log('\n--- SEO & METADATA AUDIT ---');
console.log('Missing SEO tags:', JSON.stringify(auditResults.missingSeo, null, 2));
console.log('Pages missing Schema.org JSON-LD:', JSON.stringify(auditResults.missingSchema, null, 2));

console.log('\n--- BROKEN LINKS AUDIT ---');
console.log('Broken Links found:', auditResults.brokenLinks.length);
if (auditResults.brokenLinks.length > 0) {
  console.log(JSON.stringify(auditResults.brokenLinks, null, 2));
}

console.log('\n--- IMAGE INTEGRITY AUDIT ---');
console.log('Missing Images found:', auditResults.missingImages.length);
if (auditResults.missingImages.length > 0) {
  console.log(JSON.stringify(auditResults.missingImages, null, 2));
}
console.log('Images missing Alt attribute:', auditResults.missingAlt.length);

console.log('\n--- H1 & TITLE AUDIT ---');
Object.entries(auditResults.pages).forEach(([f, p]) => {
  console.log(f.padEnd(24), 'H1 count:', p.h1Count, '| Title:', p.titleText);
});
