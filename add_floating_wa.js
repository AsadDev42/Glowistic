const fs = require('fs');
const path = require('path');
const r = __dirname;

// 1. Update make_layout.js to include floating WhatsApp button in getFooter()
let layoutSrc = fs.readFileSync(path.join(r, 'make_layout.js'), 'utf8');

const floatingWhatsappHtml = `
  <!-- Floating WhatsApp Helpline Button -->
  <a href="https://wa.me/923445422609?text=Hi%20Glowistic%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products." 
     class="floating-whatsapp-btn" 
     target="_blank" 
     rel="noopener noreferrer" 
     aria-label="Chat with Glowistic on WhatsApp" 
     title="Chat with Glowistic on WhatsApp">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/>
    </svg>
    <span class="floating-whatsapp-tooltip">Chat with us</span>
  </a>
`;

if (!layoutSrc.includes('floating-whatsapp-btn')) {
  layoutSrc = layoutSrc.replace(
    '<!-- Slide-out Cart Drawer -->',
    `${floatingWhatsappHtml}\n\n  <!-- Slide-out Cart Drawer -->`
  );
  fs.writeFileSync(path.join(r, 'make_layout.js'), layoutSrc, 'utf8');
}

// 2. Update css/main.css to include floating WhatsApp styling
let cssSrc = fs.readFileSync(path.join(r, 'css', 'main.css'), 'utf8');

const floatingWhatsappCss = `
/* -------------------------------------------------------------
   Floating WhatsApp Button
------------------------------------------------------------- */
.floating-whatsapp-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 58px;
  height: 58px;
  background-color: #25D366;
  color: #FFFFFF !important;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
  z-index: 990;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, background-color 0.2s ease;
  text-decoration: none;
}

.floating-whatsapp-btn:hover {
  transform: translateY(-4px) scale(1.06);
  box-shadow: 0 10px 28px rgba(37, 211, 102, 0.6);
  background-color: #20BA5A;
}

.floating-whatsapp-tooltip {
  position: absolute;
  right: 68px;
  background: var(--color-primary, #500F17);
  color: #FFFFFF;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.floating-whatsapp-tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  border-width: 5px 0 5px 5px;
  border-style: solid;
  border-color: transparent transparent transparent var(--color-primary, #500F17);
}

.floating-whatsapp-btn:hover .floating-whatsapp-tooltip {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .floating-whatsapp-btn {
    bottom: 20px;
    right: 18px;
    width: 52px;
    height: 52px;
  }
  .floating-whatsapp-tooltip {
    display: none;
  }
}
`;

if (!cssSrc.includes('.floating-whatsapp-btn')) {
  cssSrc += `\n${floatingWhatsappCss}`;
  fs.writeFileSync(path.join(r, 'css', 'main.css'), cssSrc, 'utf8');
}

console.log('Floating WhatsApp button added to layout & styles!');
