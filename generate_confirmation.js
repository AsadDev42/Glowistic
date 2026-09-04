const fs = require('fs');
const path = require('path');
const { getHead, getHeader, getFooter } = require('./make_layout');

const head = getHead(
  "Thank You for Choosing Glowistic — Order Received",
  "Order confirmation and details for your Glowistic purchase.",
  "confirmation.html",
  {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Thank You for Choosing Glowistic — Order Received",
  "url": "https://www.glowisticpk.com/confirmation.html"
}
);

const header = getHeader('confirmation');
const footer = getFooter();

const body = `
  <main class="section-padding" style="background-color: var(--color-bg); min-height: 75vh; padding: 50px 0 90px;">
    <div class="container container-narrow">
      <div id="confirmation-content-box" class="confirmation-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 48px 36px; box-shadow: var(--shadow-md); text-align: center;">
        
        <!-- Clean Success Check Icon -->
        <div style="width: 68px; height: 68px; background: #EBF7EE; color: var(--color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 20px; box-shadow: 0 4px 12px rgba(45, 106, 79, 0.15);">
          ✓
        </div>
        
        <h1 style="font-size: 2.25rem; color: var(--color-primary); margin-bottom: 8px; font-family: var(--font-serif); font-weight: 600;">
          Thank You for Choosing Glowistic.
        </h1>
        
        <p style="font-size: 1.125rem; color: var(--color-text); margin-bottom: 28px; font-weight: 500;">
          Your order has been received.
        </p>

        <!-- Order Reference Badge -->
        <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 14px 24px; display: inline-block; margin-bottom: 32px;">
          <span style="font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Order Number</span>
          <strong id="confirm-order-id" style="font-size: 1.35rem; color: var(--color-primary); letter-spacing: 0.05em; font-family: var(--font-mono, monospace);">GLW-2026-XXXX</strong>
        </div>

        <!-- Dynamic Order Details (Hydrated by JS) -->
        <div id="confirm-details-container" style="text-align: left; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 28px 0; margin-bottom: 28px;">
          <!-- Injected dynamically by js/app.js -->
        </div>

        <!-- Order Processing Note -->
        <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 32px;">
          Your order will be processed and delivered using the details you provided.
        </p>

        <!-- CTAs -->
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="shop.html" class="btn btn-primary btn-lg" style="min-width: 200px;">
            Continue Shopping
          </a>
          <a href="#" id="confirm-whatsapp-btn" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg" style="min-width: 240px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
            Chat with Glowistic on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </main>
`;

const finalHtml = `${head}\n<body data-page="confirmation">\n${header}\n${body}\n${footer}`;

fs.writeFileSync(path.join(__dirname, 'confirmation.html'), finalHtml, 'utf8');
console.log('Successfully generated confirmation.html');
