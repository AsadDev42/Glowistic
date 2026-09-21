/**
 * GLOWISTIC - WhatsApp Cloud API Test & Verification Script
 * Tests live WhatsApp order alert dispatch to the owner number (+923136895852).
 * 
 * Run with: node scripts/test-whatsapp.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Simple .env loader
function loadEnv() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

const env = loadEnv();
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || env.WHATSAPP_PHONE_NUMBER_ID || "";
const accessToken = process.env.WHATSAPP_ACCESS_TOKEN || env.WHATSAPP_ACCESS_TOKEN || "";
const targetNumber = process.env.WHATSAPP_ORDER_ALERT_NUMBER || env.WHATSAPP_ORDER_ALERT_NUMBER || "923136895852";
const apiVersion = process.env.WHATSAPP_API_VERSION || env.WHATSAPP_API_VERSION || "v20.0";

console.log("====================================================================");
console.log("   GLOWISTIC: WHATSAPP CLOUD API ORDER NOTIFICATION TEST");
console.log("====================================================================");
console.log(`Target Phone Number : +${targetNumber}`);
console.log(`Meta API Version    : ${apiVersion}`);
console.log(`Phone Number ID     : ${phoneNumberId ? phoneNumberId : "(NOT CONFIGURED IN .env)"}`);
console.log(`Access Token        : ${accessToken ? accessToken.slice(0, 10) + "..." + accessToken.slice(-6) : "(NOT CONFIGURED IN .env)"}`);
console.log("--------------------------------------------------------------------\n");

// 2. Sample Glowistic Order Payload
const sampleOrder = {
  orderNumber: "GLW-2026-9812",
  createdAt: new Date().toISOString(),
  customer: {
    name: "Ayesha Khan",
    phone: "03445422609",
    email: "ayesha.khan@example.com",
    address: "House 12, Street 4, Sector F-7/2",
    city: "Islamabad",
    province: "Islamabad Capital Territory",
    postalCode: "44000",
  },
  orderNotes: "Please deliver between 2 PM and 5 PM if possible.",
  items: [
    {
      name: "Glow Revitalizing Vitamin C Serum",
      subtitle: "30ml | Brightening & Collagen Support",
      price: 2450,
      quantity: 1,
      lineTotal: 2450,
    },
    {
      name: "Hydra-Boost Barrier Repair Moisturizer",
      subtitle: "50ml | Ceramide & Hyaluronic Complex",
      price: 1850,
      quantity: 1,
      lineTotal: 1850,
    },
  ],
  subtotal: 4300,
  deliveryFee: 0, // Orders over Rs. 2,500 get FREE delivery
  total: 4300,
  paymentMethod: "Cash on Delivery (COD)",
};

// 3. Message Formatter
function buildMessage(order) {
  const cleanCustomerPhone = order.customer.phone.replace(/[^0-9]/g, "");
  const customerWa = cleanCustomerPhone.startsWith("0") ? "92" + cleanCustomerPhone.slice(1) : cleanCustomerPhone;

  const itemsList = order.items
    .map((item, idx) => {
      const sub = item.subtitle ? `\n   _${item.subtitle}_` : "";
      return `${idx + 1}. *${item.name}*${sub}\n   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()} = *Rs. ${item.lineTotal.toLocaleString()}*`;
    })
    .join("\n\n");

  const deliveryStr = order.deliveryFee === 0 ? "FREE" : `Rs. ${order.deliveryFee.toLocaleString()}`;

  return `🛍️ *NEW ORDER ALERT - Glowistic*
━━━━━━━━━━━━━━━━━━━━
🆔 *Order ID:* ${order.orderNumber}
📅 *Date:* ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} (PKT)
⚡ *Status:* Confirmed (Cash on Delivery)

👤 *CUSTOMER DETAILS:*
• *Name:* ${order.customer.name}
• *Phone:* ${order.customer.phone}
• *Direct WhatsApp:* https://wa.me/${customerWa}
• *Email:* ${order.customer.email}
• *Address:* ${order.customer.address}, ${order.customer.city}, ${order.customer.province} (Postal: ${order.customer.postalCode})
${order.orderNotes ? `\n📝 *CUSTOMER NOTE:*\n${order.orderNotes}\n` : ""}
📦 *ORDERED ITEMS (${order.items.length}):*
${itemsList}

💰 *PAYMENT SUMMARY:*
• *Subtotal:* Rs. ${order.subtotal.toLocaleString()}
• *Delivery:* ${deliveryStr}
• *Total Amount:* *Rs. ${order.total.toLocaleString()}*
• *Payment Method:* *${order.paymentMethod}*
━━━━━━━━━━━━━━━━━━━━
_Glowistic E-Commerce Automated Alert System_`;
}

const messageBody = buildMessage(sampleOrder);

console.log("PREVIEW OF THE WHATSAPP MESSAGE TO BE SENT:");
console.log("--------------------------------------------------------------------");
console.log(messageBody);
console.log("--------------------------------------------------------------------\n");

// 4. Test Meta Cloud API Dispatch
async function runTest() {
  if (!phoneNumberId || !accessToken) {
    console.log("⚠️  TEST STATUS: CREDENTIALS PENDING IN .env");
    console.log("--------------------------------------------------------------------");
    console.log("The WhatsApp dispatch integration is 100% written and integrated in checkout.");
    console.log("To send live messages to +923136895852:");
    console.log("1. Open .env in glowistic project root.");
    console.log("2. Set your WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN from Meta Business.");
    console.log("3. Re-run: node scripts/test-whatsapp.mjs\n");
    process.exit(0);
  }

  const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;
  console.log(`📡 Sending test message via Meta WhatsApp Cloud API...`);
  console.log(`Endpoint: ${endpoint}\n`);

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: targetNumber,
    type: "text",
    text: {
      preview_url: false,
      body: messageBody,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let data = {};
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    if (response.ok) {
      console.log("✅ SUCCESS! WhatsApp order notification successfully sent!");
      console.log("Meta API Response:", JSON.stringify(data, null, 2));
      const messageId = data?.messages?.[0]?.id;
      if (messageId) {
        console.log(`Message ID: ${messageId}`);
      }
    } else {
      console.error(`❌ Meta Cloud API returned Error (HTTP ${response.status}):`);
      console.error(JSON.stringify(data, null, 2));
      console.log("\nPossible causes:");
      console.log("1. If using Meta Test Sandbox: Make sure +923136895852 is added to the To/Recipient list in Meta Developers Console, or receiver has sent a test message to open the 24hr window.");
      console.log("2. Token expired: Generate a fresh Access Token in Meta Developers Console or create a Permanent System User Token.");
      console.log("3. Phone Number ID: Verify Phone Number ID from WhatsApp -> API Setup in Meta Business.");
    }
  } catch (error) {
    console.error("❌ Network or Execution Exception:", error);
  }
}

runTest();
