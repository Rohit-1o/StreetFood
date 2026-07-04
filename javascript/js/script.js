const CART_KEY = 'desiswaad-cart';
const USER_KEY = 'desiswaad-current-user';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function showToast(message) {
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function getDefaultPrice(name) {
  const normalized = name.toLowerCase();
  if (normalized.includes('burger')) return 120;
  if (normalized.includes('biryani') || normalized.includes('butter') || normalized.includes('thali') || normalized.includes('fish')) return 180;
  if (normalized.includes('pav') || normalized.includes('poha') || normalized.includes('vada') || normalized.includes('idli') || normalized.includes('dosa') || normalized.includes('upma') || normalized.includes('chai') || normalized.includes('sabudana') || normalized.includes('misal') || normalized.includes('omelette') || normalized.includes('paratha')) return 60;
  if (normalized.includes('pulao') || normalized.includes('dal') || normalized.includes('rajma') || normalized.includes('chole') || normalized.includes('paneer') || normalized.includes('tikka') || normalized.includes('kulcha') || normalized.includes('egg')) return 140;
  if (normalized.includes('sandwich') || normalized.includes('fries') || normalized.includes('puri') || normalized.includes('samosa') || normalized.includes('patato') || normalized.includes('bhel') || normalized.includes('cheese')) return 70;
  return 100;
}

function renderCart() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartMessage = document.getElementById('cartMessage');
  const cartTotal = document.getElementById('cartTotal');
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount) cartCount.textContent = totalQty;
  if (cartTotal) cartTotal.textContent = `₹${totalAmount}`;
  if (cartItems) {
    if (!cart.length) {
      cartItems.innerHTML = '<li class="empty-cart">No items yet.</li>';
    } else {
      cartItems.innerHTML = cart.map((item) => `
        <li class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <div class="cart-item-meta">Price: ₹${item.price}</div>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="qty-controls">
              <button class="qty-minus" data-name="${item.name}" aria-label="decrease">-</button>
              <span>${item.quantity}</span>
              <button class="qty-plus" data-name="${item.name}" aria-label="increase">+</button>
            </div>
            <strong>₹${item.price * item.quantity}</strong>
          </div>
        </li>
      `).join('');
    }
  }

  if (cartMessage) {
    cartMessage.textContent = cart.length ? 'Ready to place your order.' : 'Your cart is empty.';
  }
}

function addToCart(name, price) {
  const cart = getCart();
  const itemName = name || 'Food Item';
  const itemPrice = Number(price) || getDefaultPrice(itemName);
  const existing = cart.find((item) => item.name === itemName);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
  }

  saveCart(cart);
  renderCart();
  showToast(`Thank you! ${itemName} has been added to your order.`);
}

function openCart() {
  document.body.classList.add('cart-open');
  renderCart();
}

function closeCart() {
  document.body.classList.remove('cart-open');
}

function openPayment() {
  const cart = getCart();
  if (!cart.length) {
    showToast('Your cart is empty.');
    return;
  }

  document.getElementById('paymentModal').classList.add('show');
  document.getElementById('modalOverlay').classList.add('show');
  document.getElementById('paymentContent').innerHTML = `
    <h3>Payment</h3>
    <p>Complete your order securely.</p>
    <form id="paymentForm">
      <div class="field-box">
        <label>Name on card</label>
        <input type="text" name="cardName" required>
      </div>
      <div class="field-box">
        <label>Card number</label>
        <input type="text" name="cardNumber" maxlength="16" required>
      </div>
      <div class="row g-2">
        <div class="field-box col-6">
          <label>Expiry</label>
          <input type="text" name="expiry" placeholder="MM/YY" required>
        </div>
        <div class="field-box col-6">
          <label>CVV</label>
          <input type="text" name="cvv" maxlength="4" required>
        </div>
      </div>
      <div class="d-flex gap-2 mt-3">
        <button type="button" class="btn btn-outline-secondary" id="paymentBackBtn">Back</button>
        <button type="submit" class="submit-btn">Pay Now</button>
        <button type="button" class="btn btn-outline-dark" id="orderNowBtn">Order</button>
      </div>
    </form>
  `;

  const paymentForm = document.getElementById('paymentForm');
  paymentForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    // Save order to orders list
    const cart = getCart();
    const total = cart.reduce((s,i)=>s+i.price*i.quantity,0);
    const orders = JSON.parse(localStorage.getItem('desiswaad-orders') || '[]');
    const id = orders.length ? (orders[orders.length-1].id + 1) : 1;
    const order = { id, items: cart, total, date: new Date().toLocaleString() };
    orders.push(order);
    localStorage.setItem('desiswaad-orders', JSON.stringify(orders));

    document.getElementById('paymentContent').innerHTML = `
      <div class="thank-you-card">
        <h3>Thank you for your order!</h3>
        <p>Your delicious food is being prepared and will be on its way soon.</p>
        <div class="d-flex gap-2 justify-content-center mt-3">
          <a href="orders.html"><button class="submit-btn" id="viewOrdersBtn" type="button">View Orders</button></a>
          <button class="submit-btn" id="closePaymentBtn" type="button">Done</button>
        </div>
      </div>
    `;
    saveCart([]);
    renderCart();
    document.getElementById('closePaymentBtn')?.addEventListener('click', closePayment);
  });

  // Order Now button: place order and redirect to success page
  document.getElementById('orderNowBtn')?.addEventListener('click', () => {
    const cart = getCart();
    if (!cart.length) { showToast('Your cart is empty.'); return; }
    const total = cart.reduce((s,i)=>s+i.price*i.quantity,0);
    const orders = JSON.parse(localStorage.getItem('desiswaad-orders') || '[]');
    const id = orders.length ? (orders[orders.length-1].id + 1) : 1;
    const order = { id, items: cart, total, date: new Date().toLocaleString() };
    orders.push(order);
    localStorage.setItem('desiswaad-orders', JSON.stringify(orders));
    saveCart([]);
    renderCart();
    // go to full page thank-you
    window.location.href = 'order-success.html';
  });

  // Back button from payment returns to cart (keeps cart open)
  document.getElementById('paymentBackBtn')?.addEventListener('click', () => {
    closePaymentOnly();
    openCart();
  });
}

function closePaymentOnly() {
  document.getElementById('paymentModal').classList.remove('show');
  document.getElementById('modalOverlay').classList.remove('show');
}

function closePayment() {
  document.getElementById('paymentModal').classList.remove('show');
  document.getElementById('modalOverlay').classList.remove('show');
  closeCart();
}

function updateAuthUI() {
  const authButtons = document.getElementById('authButtons');
  const currentUser = localStorage.getItem(USER_KEY);

  if (!authButtons) return;

  if (currentUser) {
    authButtons.innerHTML = `
      <span class="user-pill">Hi, ${currentUser}</span>
      <button class="btn btn-outline-dark ms-2" id="logoutBtn" type="button">Logout</button>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(USER_KEY);
        window.location.reload();
      });
    }
  }
}

function initCartUI() {
  if (document.getElementById('cartDrawer')) return;

  const cartDrawer = document.createElement('div');
  cartDrawer.id = 'cartDrawer';
  cartDrawer.className = 'cart-drawer';
  cartDrawer.innerHTML = `
    <div class="cart-drawer-header">
      <h4>Your Cart</h4>
      <button class="cart-close" id="closeCartBtn" type="button">×</button>
    </div>
    <div class="cart-body">
      <p id="cartMessage">Your cart is empty.</p>
      <ul id="cartItems"></ul>
      <div class="cart-total-row">
        <span>Total</span>
        <strong id="cartTotal">₹0</strong>
      </div>
      <button class="btn btn-main w-100 mt-3" id="checkoutBtn" type="button">Proceed to Pay</button>
    </div>
  `;

  const overlay = document.createElement('div');
  overlay.id = 'modalOverlay';
  overlay.className = 'modal-overlay';

  const paymentModal = document.createElement('div');
  paymentModal.id = 'paymentModal';
  paymentModal.className = 'payment-modal';
  paymentModal.innerHTML = '<div id="paymentContent"></div>';

  const cartFab = document.createElement('button');
  cartFab.id = 'cartFab';
  cartFab.className = 'cart-fab';
  cartFab.type = 'button';
  cartFab.innerHTML = '🛒 <span id="cartCount">0</span>';

  document.body.appendChild(cartDrawer);
  document.body.appendChild(overlay);
  document.body.appendChild(paymentModal);
  // removed bottom FAB for a cleaner, professional header experience
}

document.addEventListener('DOMContentLoaded', () => {
  initCartUI();
  renderCart();
  updateAuthUI();

  const params = new URLSearchParams(window.location.search);
  const productName = params.get('name');
  const productPrice = params.get('price');
  const productDesc = params.get('desc');
  const productImage = params.get('image');
  const productCategory = params.get('category');

  if (window.location.pathname.includes('product-details.html') && productName) {
    document.getElementById('productName').textContent = decodeURIComponent(productName);
    document.getElementById('productPrice').textContent = `₹${decodeURIComponent(productPrice || '0')}`;
    document.getElementById('productDescription').textContent = decodeURIComponent(productDesc || 'Freshly prepared food with authentic flavors.');
    document.getElementById('productCategory').textContent = decodeURIComponent(productCategory || 'Dish');
    const imageEl = document.getElementById('productImage');
    if (imageEl && productImage) imageEl.src = decodeURIComponent(productImage);

    document.getElementById('detailAddCartBtn')?.addEventListener('click', () => {
      addToCart(decodeURIComponent(productName), Number(productPrice));
    });
  }

  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.name, Number(button.dataset.price));
    });
  });

  document.addEventListener('click', (e) => {
    const icon = e.target.closest('.cart-icon');
    if (!icon) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    icon.removeAttribute('onclick');

    const card = icon.closest('.food-card');
    const heading = card?.querySelector('h5, h6')?.textContent?.trim() || 'Food Item';
    const price = Number(icon.dataset.price) || getDefaultPrice(heading);
    addToCart(heading, price);
  }, true);

  // Hook navbar cart toggle if present
  const cartToggle = document.getElementById('cartToggle');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const modalOverlay = document.getElementById('modalOverlay');

  cartToggle?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
  closeCartBtn?.addEventListener('click', closeCart);
  modalOverlay?.addEventListener('click', closePayment);
  checkoutBtn?.addEventListener('click', openPayment);

  // quantity controls delegation
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.qty-plus')) {
      const name = e.target.dataset.name;
      changeQty(name, +1);
    }
    if (e.target.matches('.qty-minus')) {
      const name = e.target.dataset.name;
      changeQty(name, -1);
    }
  });

  // arrow up button
  const arrowUp = document.createElement('button');
  arrowUp.className = 'arrow-up';
  arrowUp.title = 'Back to top';
  arrowUp.innerHTML = '↑';
  document.body.appendChild(arrowUp);
  arrowUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) document.body.classList.add('show-arrow'); else document.body.classList.remove('show-arrow');
  });
});

function changeQty(name, delta) {
  const cart = getCart();
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity = Math.max(0, item.quantity + delta);
  const idx = cart.findIndex(i => i.name === name);
  if (item.quantity === 0) cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
}

window.addToCart = addToCart;