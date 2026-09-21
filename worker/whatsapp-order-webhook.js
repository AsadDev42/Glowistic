/**
 * GLOWISTIC - Cloudflare Worker / Serverless Proxy for WhatsApp Cloud API
 * 
 * WHY USE THIS:
 * GitHub Pages is a public static website. If you put your Meta Access Token
 * directly in client-side JavaScript, anyone can see it in DevTools or GitHub can flag it.
 * Deploying this free 1-minute Cloudflare Worker keeps your Access Token hidden on the server.
 * 
 * HOW TO DEPLOY (100% Free):
 * 1. Go to https://workers.cloudflare.com and create a new Worker.
 * 2. Paste this code into the Worker editor.
 * 3. In Worker Settings -> Variables -> add Environment Variables:
 *    - WHATSAPP_PHONE_NUMBER_ID
 *    - WHATSAPP_ACCESS_TOKEN
 *    - WHATSAPP_ORDER_ALERT_NUMBER (Default: 923136895852)
 * 4. Copy your Worker URL (e.g. https://glowistic-wa.yourname.workers.dev)
 * 5. In js/config.js set:
 *    WHATSAPP_WEBHOOK_URL: 'https://glowistic-wa.yourname.workers.dev'
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    try {
      const data = await request.json();
      const messageBody = data.message;
      const targetNumber = (data.to || env.WHATSAPP_ORDER_ALERT_NUMBER || "923136895852").replace(/[^0-9]/g, "");

      const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID;
      const accessToken = env.WHATSAPP_ACCESS_TOKEN;
      const apiVersion = env.WHATSAPP_API_VERSION || "v20.0";

      if (!phoneNumberId || !accessToken) {
        return new Response(JSON.stringify({ error: "Server missing Meta credentials" }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: targetNumber,
          type: "text",
          text: { preview_url: false, body: messageBody },
        }),
      });

      const resBody = await response.text();
      return new Response(resBody, {
        status: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  },
};
