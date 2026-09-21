/**
 * GLOWISTIC - Global Store Configuration
 * Controls WhatsApp notifications, store alerts, and environment settings.
 */

export const GLOWISTIC_CONFIG = {
  // WhatsApp Business Order Alert Receiver (+923136895852)
  WHATSAPP_ORDER_ALERT_NUMBER: '923136895852',

  // Meta WhatsApp Cloud API Version
  WHATSAPP_API_VERSION: 'v20.0',

  // Phone Number ID from Meta Developer Console (WhatsApp -> API Setup)
  WHATSAPP_PHONE_NUMBER_ID: '',

  // Meta Cloud API Access Token
  WHATSAPP_ACCESS_TOKEN: '',

  // Optional: Serverless Proxy / Webhook URL (e.g. Cloudflare Worker)
  // If set, requests are routed through this webhook to keep the Meta token hidden
  WHATSAPP_WEBHOOK_URL: '',
};

// Merge with any window or localStorage injected configuration
if (typeof window !== 'undefined') {
  window.GLOWISTIC_CONFIG = Object.assign({}, GLOWISTIC_CONFIG, window.GLOWISTIC_CONFIG || {});
}

export default GLOWISTIC_CONFIG;
