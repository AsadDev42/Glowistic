const fs = require('fs');
const path = require('path');

// 1. Update make_layout.js
const makeLayoutPath = path.join(__dirname, 'make_layout.js');
let makeLayout = fs.readFileSync(makeLayoutPath, 'utf8');

const oldCareBlock = `        <!-- Column 4: Customer Care -->
        <div class="footer-col">
          <h4>Customer Care</h4>
          <ul class="footer-links">
            <li><a href="shipping-policy.html">Shipping Policy</a></li>
            <li><a href="refund-policy.html">Return &amp; Refund Policy</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms-conditions.html">Terms &amp; Conditions</a></li>
            <li><a href="contact.html">Track Order via WhatsApp</a></li>
          </ul>
        </div>`;

const newCareBlock = `        <!-- Column 4: Customer Care -->
        <div class="footer-col">
          <h4>Customer Care</h4>
          <ul class="footer-links">
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="index.html#faq-section">FAQs</a></li>
            <li><a href="shipping-policy.html">Shipping &amp; Delivery</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms-conditions.html">Terms &amp; Conditions</a></li>
          </ul>
        </div>`;

makeLayout = makeLayout.replace(oldCareBlock, newCareBlock);
fs.writeFileSync(makeLayoutPath, makeLayout, 'utf8');

// 2. Update build_helpers.js if it exists
const buildHelpersPath = path.join(__dirname, 'build_helpers.js');
if (fs.existsSync(buildHelpersPath)) {
  let buildHelpers = fs.readFileSync(buildHelpersPath, 'utf8');
  buildHelpers = buildHelpers.replace(oldCareBlock, newCareBlock);
  fs.writeFileSync(buildHelpersPath, buildHelpers, 'utf8');
}

console.log('Updated make_layout.js and build_helpers.js footer template.');
