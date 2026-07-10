/* ==========================================================
   NOVA — Electronics Store — script.js
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Product data ---------------- */
  const PRODUCTS = [
    { id:'p1', name:'Aria X4 Wireless Headphones', cat:'audio',      price:249.00, badge:'NEW',    specs:['40MM DRIVER','38H BATTERY','ANC −32DB'], icon:'headphones' },
    { id:'p2', name:'Orbit Mini Speaker',           cat:'audio',      price:84.70,  badge:'−30%',   specs:['12W OUTPUT','IPX7','18H BATTERY'],       icon:'speaker' },
    { id:'p3', name:'Fold Riser Laptop Stand',      cat:'accessories',price:39.00,  badge:null,     specs:['ALUMINUM','6 ANGLES','280G'],            icon:'stand' },
    { id:'p4', name:'Type-S Mechanical Keyboard',   cat:'computing',  price:129.00, badge:'BESTSELLER', specs:['HOT-SWAP','75% LAYOUT','BT + USB-C'], icon:'keyboard' },
    { id:'p5', name:'Halo 6K Action Camera',        cat:'imaging',    price:319.00, badge:null,     specs:['6K/30FPS','WATERPROOF 10M','128GB'],     icon:'camera' },
    { id:'p6', name:'Pulse Fitness Band',           cat:'wearables',  price:69.00,  badge:'NEW',    specs:['7-DAY BATTERY','SPO2','AMOLED'],         icon:'band' },
    { id:'p7', name:'Beam Smart Bulb (4-pack)',     cat:'smart-home', price:44.00,  badge:null,     specs:['16M COLORS','MATTER','VOICE READY'],     icon:'bulb' },
    { id:'p8', name:'Trace Mechanical Mouse',       cat:'computing',  price:59.00,  badge:null,     specs:['26K DPI','5 BUTTONS','70H BATTERY'],     icon:'mouse' },
    { id:'p9', name:'Vista Ultrawide Monitor 34"',  cat:'computing',  price:429.00, badge:'BESTSELLER', specs:['144HZ','QHD+','USB-C 90W'],           icon:'monitor' },
    { id:'p10',name:'Nimbus ANC Earbuds',           cat:'audio',      price:139.00, badge:null,     specs:['ANC −28DB','24H TOTAL','WIRELESS CHG'], icon:'earbuds' },
    { id:'p11',name:'Guard Video Doorbell',         cat:'smart-home', price:99.00,  badge:'NEW',    specs:['2K HDR','NIGHT VISION','LOCAL STORAGE'],icon:'doorbell' },
    { id:'p12',name:'Chrono Hybrid Smartwatch',     cat:'wearables',  price:189.00, badge:null,     specs:['14-DAY BATTERY','GPS','5ATM'],           icon:'watch' },
  ];

  const ICONS = {
    headphones:'<path d="M14 30v-8a10 10 0 0 1 20 0v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="9" y="28" width="9" height="12" rx="3" stroke="currentColor" stroke-width="2"/><rect x="30" y="28" width="9" height="12" rx="3" stroke="currentColor" stroke-width="2"/>',
    speaker:'<rect x="14" y="6" width="20" height="36" rx="6" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="17" r="4" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="31" r="6" stroke="currentColor" stroke-width="2"/>',
    stand:'<path d="M8 34h32M14 34l6-16h8l6 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    keyboard:'<rect x="6" y="14" width="36" height="20" rx="3" stroke="currentColor" stroke-width="2"/><path d="M12 22h2M18 22h2M24 22h2M30 22h2M14 28h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    camera:'<rect x="6" y="14" width="36" height="24" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="26" r="7" stroke="currentColor" stroke-width="2"/><path d="M17 14l2.5-4h9L31 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    band:'<rect x="16" y="14" width="16" height="20" rx="5" stroke="currentColor" stroke-width="2"/><path d="M20 14V8M28 14V8M20 40v-6M28 40v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    bulb:'<circle cx="24" cy="18" r="10" stroke="currentColor" stroke-width="2"/><path d="M19 28h10M20 33h8M21 38h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    mouse:'<rect x="14" y="8" width="20" height="32" rx="10" stroke="currentColor" stroke-width="2"/><line x1="24" y1="8" x2="24" y2="20" stroke="currentColor" stroke-width="2"/>',
    monitor:'<rect x="6" y="10" width="36" height="22" rx="2" stroke="currentColor" stroke-width="2"/><path d="M18 40h12M24 32v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    earbuds:'<circle cx="16" cy="20" r="6" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="20" r="6" stroke="currentColor" stroke-width="2"/><path d="M16 26v4a4 4 0 0 0 4 4M32 26v4a4 4 0 0 1-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    doorbell:'<rect x="16" y="6" width="16" height="30" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="17" r="4" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="29" r="1.6" fill="currentColor"/>',
    watch:'<rect x="15" y="14" width="18" height="20" rx="5" stroke="currentColor" stroke-width="2"/><path d="M19 14v-4h10v4M19 34v4h10v-4" stroke="currentColor" stroke-width="2"/>',
  };

  const fmt = n => `$${n.toFixed(2)}`;

  /* ---------------- Render product grid ---------------- */
  const grid = document.getElementById('productGrid');

  function renderProducts(filter = 'all'){
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
    grid.innerHTML = list.map(p => `
      <article class="product-card" data-cat="${p.cat}">
        <div class="product-card__media">
          ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
          <svg viewBox="0 0 48 48" fill="none">${ICONS[p.icon] || ''}</svg>
        </div>
        <div class="product-card__body">
          <span class="product-card__cat">${p.cat.replace('-', ' ')}</span>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__specs">${p.specs.join(' &nbsp;·&nbsp; ')}</p>
          <div class="product-card__foot">
            <span class="price">${fmt(p.price)}</span>
            <button class="btn btn--dark btn--sm add-to-cart" data-name="${p.name}" data-price="${p.price}">Add</button>
          </div>
        </div>
      </article>
    `).join('');
  }
  renderProducts();

  /* ---------------- Filters ---------------- */
  const filterBar = document.getElementById('filters');
  filterBar.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if(!chip) return;
    filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    renderProducts(chip.dataset.filter);
  });

  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', e => {
      const filter = card.dataset.filter;
      const target = filterBar.querySelector(`[data-filter="${filter}"]`);
      if(target){
        e.preventDefault();
        target.click();
        document.getElementById('shop').scrollIntoView({ behavior:'smooth' });
      }
    });
  });

  /* ---------------- Cart ---------------- */
  let cart = [];
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountEl = document.getElementById('cartCount');

  function renderCart(){
    if(cart.length === 0){
      cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Add a device to get started.</p>`;
    } else {
      cartItemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item__swatch">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">${ICONS.headphones}</svg>
          </div>
          <div class="cart-item__info">
            <strong>${item.name}</strong>
            <span>${fmt(item.price)}</span>
          </div>
          <button class="cart-item__remove" data-index="${i}" aria-label="Remove">✕</button>
        </div>
      `).join('');
    }
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    cartTotalEl.textContent = fmt(total);
    cartCountEl.textContent = cart.length;
  }
  renderCart();

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart');
    if(!btn) return;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    cart.push({ name, price });
    renderCart();
    showToast(`${name} added to cart`);
    openCart();
  });

  cartItemsEl.addEventListener('click', e => {
    const btn = e.target.closest('.cart-item__remove');
    if(!btn) return;
    cart.splice(Number(btn.dataset.index), 1);
    renderCart();
  });

  /* ---------------- Cart drawer + overlay ---------------- */
  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');

  function openCart(){
    cartDrawer.classList.add('is-open');
    overlay.classList.add('is-open');
  }
  function closeCart(){
    cartDrawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
  }
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', () => { closeCart(); closeSearch(); closeMobileNav(); });

  /* ---------------- Search panel ---------------- */
  const searchPanel = document.getElementById('searchPanel');
  function openSearch(){
    searchPanel.classList.add('is-open');
    document.getElementById('searchInput').focus();
  }
  function closeSearch(){ searchPanel.classList.remove('is-open'); }
  document.getElementById('searchToggle').addEventListener('click', () => {
    searchPanel.classList.contains('is-open') ? closeSearch() : openSearch();
  });
  document.getElementById('searchClose').addEventListener('click', closeSearch);

  /* ---------------- Mobile nav ---------------- */
  const nav = document.getElementById('nav');
  function closeMobileNav(){ nav.classList.remove('is-open'); }
  document.getElementById('menuToggle').addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  /* ---------------- Accordion ---------------- */
  document.getElementById('accordion').addEventListener('click', e => {
    const trigger = e.target.closest('.accordion__trigger');
    if(!trigger) return;
    const item = trigger.closest('.accordion__item');
    const wasOpen = item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('is-open'));
    if(!wasOpen) item.classList.add('is-open');
  });

  /* ---------------- Countdown timer ---------------- */
  let remaining = 72 * 3600 + 14 * 60 + 8; // 72h demo countdown
  const cdH = document.getElementById('cd-h');
  const cdM = document.getElementById('cd-m');
  const cdS = document.getElementById('cd-s');
  function tick(){
    if(remaining <= 0) return;
    remaining--;
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    cdH.textContent = String(h).padStart(2, '0');
    cdM.textContent = String(m).padStart(2, '0');
    cdS.textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------- Newsletter ---------------- */
  document.getElementById('newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('Thanks — check your inbox to confirm.');
    e.target.reset();
  });

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function showToast(message){
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  /* ---------------- Header shadow on scroll ---------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 8 ? '0 1px 0 rgba(16,19,26,.06)' : 'none';
  });

});