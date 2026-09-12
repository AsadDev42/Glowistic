import fs from 'fs';
import path from 'path';

const projectDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const productsPath = path.join(projectDir, 'js', 'data', 'products.js');
const productsModule = await import(`file:///${productsPath.replace(/\\/g, '/')}`);
const { PRODUCTS, CATEGORIES } = productsModule;

function pngSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function jpgSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  return null;
}

function imageSize(assetPath) {
  const filePath = path.join(projectDir, assetPath.replace(/\//g, path.sep));
  const ext = path.extname(filePath).toLowerCase();
  const size = ext === '.png' ? pngSize(filePath) : jpgSize(filePath);
  if (!size) return { width: 0, height: 1, ratio: 0 };
  return { ...size, ratio: size.width / size.height };
}

function pickCover(gallery) {
  return [...gallery].sort((a, b) => imageSize(b).ratio - imageSize(a).ratio)[0];
}

const updatedProducts = PRODUCTS.map((product) => {
  const gallery = [...(product.gallery || [product.image])];
  const cover = pickCover(gallery);
  const nextGallery = [cover, ...gallery.filter((item) => item !== cover)];
  return {
    ...product,
    image: cover,
    gallery: nextGallery,
  };
});

const content = `/**
 * GLOWISTIC - Product Catalog
 * Synced from the supplied product detail PDF and product image ZIP.
 */

export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const PRODUCTS = ${JSON.stringify(updatedProducts, null, 2)};

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductById(id) {
  if (!id) return null;
  const clean = String(id).toLowerCase().trim();
  return PRODUCTS.find(p => p.id.toLowerCase() === clean || p.slug.toLowerCase() === clean);
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  const clean = String(slug).toLowerCase().trim();
  return PRODUCTS.find(p =>
    p.slug.toLowerCase() === clean ||
    p.id.toLowerCase() === clean ||
    p.slug.replace(/-/g, '') === clean.replace(/-/g, '') ||
    p.id.replace(/-/g, '') === clean.replace(/-/g, '')
  );
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  const c = category.toLowerCase().replace(/[-_]/g, '');
  if (c === 'skincare') return PRODUCTS.filter(p => p.category === 'skincare');
  if (c === 'haircare') return PRODUCTS.filter(p => p.category === 'haircare');
  if (c === 'personalcare') return PRODUCTS.filter(p => p.category === 'personalcare' || p.category === 'bodycare' || p.category === 'skincare');
  if (c === 'bodycare') return PRODUCTS.filter(p => p.category === 'bodycare');
  if (c === 'wellness' || c === 'wellnesshealth') return PRODUCTS.filter(p => p.category === 'wellness');
  if (c === 'supplements') return PRODUCTS.filter(p => p.category === 'supplements');
  return PRODUCTS.filter(p => p.category === category || (p.tags && p.tags.includes(category)));
}

export function getFeaturedProducts(count = 4) {
  const feat = PRODUCTS.filter(p => p.featured);
  return feat.length >= count ? feat.slice(0, count) : PRODUCTS.slice(0, count);
}

export function searchProducts(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
    (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
    (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
    (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
    (p.description && p.description.toLowerCase().includes(q)) ||
    (p.ingredients && p.ingredients.toLowerCase().includes(q)) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
    (p.features && p.features.some(f => f.toLowerCase().includes(q))) ||
    (p.benefits && p.benefits.some(b => b.toLowerCase().includes(q)))
  );
}
`;

fs.writeFileSync(productsPath, content, 'utf8');

console.log('Updated product covers to the widest available image for each product.');
for (const product of updatedProducts) {
  const size = imageSize(product.image);
  console.log(`${product.id}: ${product.image} (${size.width}x${size.height})`);
}
