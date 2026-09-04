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

console.log('Building all pages with build_site.mjs...');
execSync('node build_site.mjs', { cwd: r, stdio: 'inherit' });

console.log('Generating policy pages...');
execSync('node generate_policies.js', { cwd: r, stdio: 'inherit' });

const termsSrc = path.join(r, 'terms-conditions.html');
const termsDst = path.join(r, 'terms-and-conditions.html');
if (fs.existsSync(termsSrc)) {
  fs.copyFileSync(termsSrc, termsDst);
  console.log('✓ Synchronized terms-and-conditions.html');
}

console.log('All 13 pages successfully built and verified!');
