/**
 * GLOWISTIC - Pakistan Cash on Delivery (COD) Checkout Module
 */
import { cart } from '../state/cart.js';
import { emailService } from './emailService.js';
import { whatsappService } from './whatsappService.js';

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan'
];

export const MAJOR_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Jhang',
  'Rahim Yar Khan',
  'Gujrat',
  'Mardan',
  'Kasur',
  'Dera Ghazi Khan',
  'Sahiwal',
  'Wah Cantt',
  'Mirpur',
  'Muzaffarabad'
];

export class CheckoutManager {
  constructor(formId = 'glowistic-checkout-form') {
    this.form = document.getElementById(formId);
    this.orderSummaryContainer = document.getElementById('checkout-order-summary');
    this.confirmationContainer = document.getElementById('checkout-confirmation-view');
    this.init();
  }

  init() {
    this.renderOrderSummary();
    this.populateCitiesAndProvinces();
    this.attachFormSubmit();

    // Listen for cart changes if any
    window.addEventListener('glowistic:cart-updated', () => {
      this.renderOrderSummary();
    });
  }

  populateCitiesAndProvinces() {
    const provinceSelect = document.getElementById('checkout-province');
    if (provinceSelect && provinceSelect.options.length <= 1) {
      PAKISTAN_PROVINCES.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        provinceSelect.appendChild(opt);
      });
    }

    const cityDatalist = document.getElementById('pakistan-cities-list');
    if (cityDatalist && cityDatalist.children.length === 0) {
      MAJOR_CITIES.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        cityDatalist.appendChild(opt);
      });
    }
  }

  renderOrderSummary() {
    if (!this.orderSummaryContainer) return;

    const items = cart.getItemsWithDetails();
    if (items.length === 0) {
      this.orderSummaryContainer.innerHTML = `
        <div class="checkout-empty-cart">
          <p>Your shopping cart is currently empty.</p>
          <a href="shop.html" class="btn btn-primary btn-sm">Return to Shop</a>
        </div>
      `;
      const submitBtn = document.getElementById('checkout-submit-btn');
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    const submitBtn = document.getElementById('checkout-submit-btn');
    if (submitBtn) submitBtn.disabled = false;

    const itemsHtml = items.map(item => `
      <div class="checkout-item-row">
        <div class="checkout-item-left">
          <div class="checkout-item-img-wrap">
            <img src="${item.image}" alt="${item.name}" />
            <span class="checkout-item-badge">${item.quantity}</span>
          </div>
          <div class="checkout-item-meta">
            <h4 class="checkout-item-name">${item.name}</h4>
            <span class="checkout-item-sub">${item.subtitle}</span>
          </div>
        </div>
        <div class="checkout-item-price">Rs. ${item.lineTotal.toLocaleString()}</div>
      </div>
    `).join('');

    const subtotal = cart.getSubtotal();
    const deliveryFee = cart.getDeliveryFee();
    const total = cart.getTotal();

    this.orderSummaryContainer.innerHTML = `
      <div class="checkout-items-list">
        ${itemsHtml}
      </div>

      <div class="checkout-totals-box">
        <div class="checkout-total-line">
          <span>Subtotal</span>
          <span>Rs. ${subtotal.toLocaleString()}</span>
        </div>
        <div class="checkout-total-line">
          <span>Delivery (Cash on Delivery)</span>
          <span>${deliveryFee === 0 ? '<strong class="text-success">FREE</strong>' : 'Rs. ' + deliveryFee}</span>
        </div>
        ${deliveryFee > 0 ? `
          <div class="checkout-free-shipping-hint">
            Add Rs. ${(2500 - subtotal).toLocaleString()} more for FREE Delivery!
          </div>
        ` : ''}
        <div class="checkout-total-line grand-total">
          <span>Total (PKR)</span>
          <span class="grand-amount">Rs. ${total.toLocaleString()}</span>
        </div>
      </div>
    `;
  }

  attachFormSubmit() {
    if (!this.form) return;

    let isSubmitting = false;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (isSubmitting) return;

      const items = cart.getItemsWithDetails();
      if (items.length === 0) {
        alert('Your cart is empty. Please add products before placing an order.');
        return;
      }

      const formData = new FormData(this.form);
      const customer = {
        name: formData.get('fullName')?.toString().trim() || '',
        phone: formData.get('phone')?.toString().trim() || '',
        email: formData.get('email')?.toString().trim() || '',
        address: formData.get('address')?.toString().trim() || '',
        city: formData.get('city')?.toString().trim() || '',
        province: formData.get('province')?.toString().trim() || '',
        postalCode: formData.get('postalCode')?.toString().trim() || ''
      };

      // Form Validations
      if (!customer.name || customer.name.length < 2) {
        alert('Please enter your full name.');
        document.getElementById('checkout-name')?.focus();
        return;
      }

      const cleanPhone = customer.phone.replace(/[\s-]/g, '');
      const phoneRegex = /^(03\d{9}|\+923\d{9}|923\d{9})$/;
      if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 11-digit Pakistani mobile number (e.g. 03445422609).');
        document.getElementById('checkout-phone')?.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customer.email)) {
        alert('Please enter a valid email address.');
        document.getElementById('checkout-email')?.focus();
        return;
      }

      if (!customer.address || customer.address.length < 5) {
        alert('Please provide your complete delivery address (House/Flat #, Street, Area).');
        document.getElementById('checkout-address')?.focus();
        return;
      }

      if (!customer.city) {
        alert('Please specify your delivery city.');
        document.getElementById('checkout-city')?.focus();
        return;
      }

      if (!customer.province) {
        alert('Please select your delivery province.');
        document.getElementById('checkout-province')?.focus();
        return;
      }

      if (!customer.postalCode || customer.postalCode.length < 3) {
        alert('Please enter a valid postal code.');
        document.getElementById('checkout-postal')?.focus();
        return;
      }

      const termsCheck = document.getElementById('checkout-terms-checkbox') || document.getElementById('checkout-terms');
      if (termsCheck && !termsCheck.checked) {
        alert('Please confirm that the delivery information provided is correct.');
        termsCheck.focus();
        return;
      }

      // Duplicate Order Prevention Check (within last 60 seconds)
      const lastOrderRaw = localStorage.getItem('glowistic_last_order');
      if (lastOrderRaw) {
        try {
          const lastOrder = JSON.parse(lastOrderRaw);
          const timeDiff = Date.now() - new Date(lastOrder.createdAt).getTime();
          const isSameCustomer = lastOrder.customer?.phone === customer.phone;
          const isSameTotal = lastOrder.total === cart.getTotal();

          if (timeDiff < 60000 && isSameCustomer && isSameTotal) {
            console.warn('Duplicate order submission detected. Redirecting to existing order confirmation:', lastOrder.orderNumber);
            cart.clearCart();
            window.location.href = 'confirmation.html';
            return;
          }
        } catch (err) {
          console.error('Error checking duplicate order:', err);
        }
      }

      isSubmitting = true;
      const submitBtn = document.getElementById('checkout-submit-btn');
      const loadingMsg = document.getElementById('checkout-loading-msg');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Placing your order...';
      }
      if (loadingMsg) {
        loadingMsg.style.display = 'block';
      }

      const orderNotes = formData.get('orderNotes')?.toString().trim() || '';
      const paymentMethod = 'Cash on Delivery';

      // Generate Unique Order Number: GLW-2026-XXXX
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `GLW-2026-${randomId}`;

      const orderData = {
        orderNumber,
        createdAt: new Date().toISOString(),
        customer,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        province: customer.province,
        postalCode: customer.postalCode,
        orderNotes,
        paymentMethod: 'Cash on Delivery',
        items,
        subtotal: cart.getSubtotal(),
        deliveryFee: cart.getDeliveryFee(),
        total: cart.getTotal()
      };

      try {
        // 1. Store Order Data in localStorage & sessionStorage
        localStorage.setItem('glowistic_last_order', JSON.stringify(orderData));
        sessionStorage.setItem('glowistic_last_order', JSON.stringify(orderData));
        const orderHistory = JSON.parse(localStorage.getItem('glowistic_orders') || '[]');
        orderHistory.unshift(orderData);
        localStorage.setItem('glowistic_orders', JSON.stringify(orderHistory.slice(0, 20)));

        // 2. Dispatch Order Notification via Email Service (without exposing credentials)
        await emailService.sendOrderNotification(orderData);

        // 3. Dispatch Automated WhatsApp Order Alert to Owner (+923136895852)
        try {
          await whatsappService.sendOrderNotification(orderData);
        } catch (waErr) {
          console.error('[Glowistic WhatsApp Dispatch Warning]', waErr);
        }

        // 4. Clear user cart
        cart.clearCart();

        // 5. Redirect to Order Confirmation page
        window.location.href = 'confirmation.html';
      } catch (error) {
        console.error('Order processing error:', error);
        alert('An issue occurred while placing your order. Please try ordering directly via WhatsApp or refreshing the page.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Place COD Order';
        }
        if (loadingMsg) {
          loadingMsg.style.display = 'none';
        }
        isSubmitting = false;
      }
    });
  }

  renderConfirmation(order) {
    const mainWrapper = document.getElementById('checkout-main-wrapper');
    if (mainWrapper) mainWrapper.style.display = 'none';

    if (this.confirmationContainer) {
      const itemsListHtml = order.items.map(item => `
        <div class="confirm-item-row">
          <span>${item.name} &times; ${item.quantity}</span>
          <strong>Rs. ${(item.price * item.quantity).toLocaleString()}</strong>
        </div>
      `).join('');

      const waOrderMsg = encodeURIComponent(
        `Hi Glowistic, I just placed order #${order.orderNumber} and would like to confirm my order.`
      );

      this.confirmationContainer.innerHTML = `
        <div class="order-success-card fade-in">
          <div class="order-success-icon">✓</div>
          <span class="order-success-badge">Order Received</span>
          <h2 class="order-success-title">Thank You for Choosing Glowistic.</h2>
          <p class="order-success-msg">
            Your order has been received and is being prepared for dispatch.
          </p>

          <div class="order-detail-summary-box">
            <div class="order-info-grid">
              <div class="order-info-col">
                <span class="label">Order Number</span>
                <span class="val font-mono" style="color: var(--color-primary); font-size: 1.125rem;">#${order.orderNumber}</span>
              </div>
              <div class="order-info-col">
                <span class="label">Customer Name</span>
                <span class="val">${order.customer.name}</span>
              </div>
              <div class="order-info-col">
                <span class="label">Payment Method</span>
                <span class="val">Cash on Delivery</span>
              </div>
              <div class="order-info-col">
                <span class="label">Delivery Address</span>
                <span class="val">${order.customer.address}, ${order.customer.city}, ${order.customer.province}</span>
              </div>
            </div>

            <div class="order-items-breakdown">
              <h4>Ordered Items</h4>
              ${itemsListHtml}
              <div class="confirm-item-row confirm-subtotal">
                <span>Subtotal:</span>
                <span>Rs. ${order.subtotal.toLocaleString()}</span>
              </div>
              <div class="confirm-item-row">
                <span>Delivery Fee (Cash on Delivery):</span>
                <span>${order.deliveryFee === 0 ? '<strong class="text-success">FREE</strong>' : 'Rs. ' + order.deliveryFee}</span>
              </div>
              <div class="confirm-item-row confirm-grand">
                <span>Total Amount:</span>
                <span>Rs. ${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div class="order-dispatch-note">
            <div class="dispatch-icon">🚚</div>
            <div>
              <strong>Nationwide Doorstep Delivery</strong>
              <p>Your order will be processed and delivered using the details you provided. Our courier partner will contact you at <strong>${order.customer.phone}</strong> before arrival.</p>
            </div>
          </div>

          <div class="order-success-actions">
            <a href="shop.html" class="btn btn-primary btn-lg">
              Continue Shopping
            </a>
            <a href="https://wa.me/923445422609?text=${waOrderMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.535-1.745-.73-2.868-2.52-2.955-2.637-.088-.117-.714-.95-.714-1.815 0-.865.452-1.291.614-1.468.162-.177.353-.221.471-.221.118 0 .235.001.338.006.109.006.255-.041.399.303.147.353.501 1.22.545 1.308.044.088.073.191.015.308-.059.117-.088.19-.177.293-.088.103-.186.23-.265.31-.088.088-.181.185-.078.361.103.176.458.756.983 1.225.677.604 1.248.791 1.425.879.176.088.279.074.382-.044.103-.118.441-.515.559-.691.118-.176.235-.147.397-.088.162.059 1.03.486 1.206.574.177.088.294.132.338.206.044.074.044.428-.1.833z"/></svg>
              Chat with Glowistic on WhatsApp
            </a>
            <button type="button" onclick="window.print()" class="btn btn-outline btn-sm">
              🖨️ Print / Save Receipt
            </button>
          </div>
        </div>
      `;
      this.confirmationContainer.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

