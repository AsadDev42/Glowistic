const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // If a relative static asset request arrives with a nested prefix (e.g. /product/css/...), strip it
  if (pathname.startsWith('/product/css/') || pathname.startsWith('/product/js/') || pathname.startsWith('/product/assets/') || pathname.startsWith('/product/images/')) {
    pathname = pathname.replace(/^\/product/, '');
  } else if (pathname.startsWith('/blog/css/') || pathname.startsWith('/blog/js/') || pathname.startsWith('/blog/assets/') || pathname.startsWith('/blog/images/')) {
    pathname = pathname.replace(/^\/blog/, '');
  } else if (pathname.startsWith('/shop/css/') || pathname.startsWith('/shop/js/') || pathname.startsWith('/shop/assets/') || pathname.startsWith('/shop/images/')) {
    pathname = pathname.replace(/^\/shop/, '');
  }

  // Clean route rewrites for extensionless URLs
  const reqExt = path.extname(pathname);
  if (!reqExt) {
    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    } else if (pathname.startsWith('/product/') || pathname === '/product') {
      pathname = '/product.html';
    } else if (pathname.startsWith('/shop/') || pathname === '/shop') {
      pathname = '/shop.html';
    } else if (pathname.startsWith('/blog/') && pathname !== '/blog/') {
      pathname = '/article.html';
    } else if (pathname === '/blog' || pathname === '/blog/') {
      pathname = '/blog.html';
    } else if (pathname === '/terms-and-conditions' || pathname === '/terms-and-conditions/') {
      pathname = '/terms-conditions.html';
    }
  }

  let filePath = path.join(ROOT, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Try appending .html
      const htmlPath = filePath + '.html';
      if (fs.existsSync(htmlPath)) {
        filePath = htmlPath;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`404 Not Found: ${pathname}`);
        return;
      }
    } else if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': data.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('========================================================');
  console.log(` GLOWISTIC Local Storefront Server Live!`);
  console.log(` Local URL:    http://localhost:${PORT}`);
  console.log(` Network URL:  http://127.0.0.1:${PORT}`);
  console.log('========================================================');
});
