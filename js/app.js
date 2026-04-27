/**
 * 文悦阁 - app.js
 */
(function() {
  'use strict';

  const CART_KEY = 'stationery_cart';
  const STOCK_KEY = 'stationery_stock';
  const ORDERS_KEY = 'stationery_orders';

  /* ─── Products ─── */
  const PRODUCTS = [
    // 笔类
    { id: 's01', name: '晨光中性笔黑色', category: '笔类', price: 2.5, original: 4, emoji: '🖊️', unit: '1支', desc: '晨光经典中性笔，0.5mm黑色墨迹，书写流畅，适合学生办公', stock: 200, sales: 3256, badge: 'hot', tags: ['晨光', '0.5mm', '黑色'] },
    { id: 's02', name: '三菱多色圆珠笔套装', category: '笔类', price: 18.8, original: 28, emoji: '🖊️', unit: '1套6色', desc: '日本三菱6色圆珠笔套装，颜色鲜艳，书写顺滑，礼盒装', stock: 80, sales: 1234, badge: 'sale', tags: ['三菱', '6色套装', '日本'] },
    { id: 's03', name: '钢笔墨水礼盒', category: '笔类', price: 68, original: 98, emoji: '✒️', unit: '1套含墨水', desc: '复古钢笔礼盒，含钢笔1支+墨水1瓶，书写体验极佳，送礼自用皆宜', stock: 40, sales: 567, badge: 'new', tags: ['礼盒装', '含墨水', '送礼'] },
    // 纸张类
    { id: 's04', name: '得力A4复印纸', category: '纸张类', price: 22.8, original: 32, emoji: '📄', unit: '1包500张', desc: '得力A4复印纸，70g/m²，白色双面打印，高性价比办公用纸', stock: 150, sales: 4521, badge: 'hot', tags: ['得力', 'A4', '500张/包'] },
    { id: 's05', name: '精美手账笔记本', category: '纸张类', price: 12.8, original: 18.8, emoji: '📒', unit: '1本', desc: '创意手账笔记本，方格内页，皮面精装，180度平摊，高颜值学习文具', stock: 90, sales: 2109, badge: 'new', tags: ['手账', '方格', '皮面'] },
    { id: 's06', name: '无空白练习本套装', category: '纸张类', price: 9.9, original: null, emoji: '📓', unit: '5本套装', desc: '小学生语数英练习本套装，横线格式，经济实惠，适合新学期', stock: 120, sales: 1876, badge: null, tags: ['练习本', '5本套装', '学生'] },
    // 收纳类
    { id: 's07', name: '多功能桌面收纳盒', category: '收纳类', price: 28.8, original: 38, emoji: '📁', unit: '1个', desc: '桌面抽屉式收纳盒，分类存放文具，ABS材质，简洁大方，桌面整洁神器', stock: 65, sales: 1543, badge: 'hot', tags: ['收纳', '桌面', '抽屉式'] },
    { id: 's08', name: '大容量笔袋', category: '收纳类', price: 18.8, original: 28, emoji: '🧮', unit: '1个', desc: '双层大容量笔袋，防水布艺，可装30支笔，侧面拉链口袋，方便实用', stock: 85, sales: 987, badge: 'sale', tags: ['笔袋', '双层', '防水'] },
    { id: 's09', name: '透明资料袋A4', category: '收纳类', price: 5.8, original: 9.9, emoji: '📂', unit: '5个装', desc: '透明PVC资料袋A4尺寸，防水防潮，5个装，经济实惠，文件整理必备', stock: 200, sales: 2341, badge: 'sale', tags: ['资料袋', 'A4', '5个装'] },
    // 办公工具
    { id: 's10', name: '得力订书机', category: '办公工具', price: 8.8, original: 12.8, emoji: '📎', unit: '1个', desc: '得力省力订书机，金属+ABS材质，可装100颗订书钉，结实耐用', stock: 100, sales: 3211, badge: 'hot', tags: ['得力', '省力', '金属'] },
    { id: 's11', name: '12位计算器', category: '办公工具', price: 15.8, original: null, emoji: '🧮', unit: '1个', desc: '12位太阳能计算器，大屏幕显示，财务会计专用，灵敏按键，使用寿命长', stock: 70, sales: 1456, badge: null, tags: ['计算器', '12位', '太阳能'] },
    { id: 's12', name: '磁钉白板擦', category: '办公工具', price: 6.8, original: 9.9, emoji: '🧼', unit: '1个', desc: '白板磁钉套装，含白板擦1个+磁钉6个，办公教学两用，清洁干净', stock: 110, sales: 876, badge: 'new', tags: ['白板', '磁钉', '套装'] },
    { id: 's13', name: '迷你桌面印章机', category: '办公工具', price: 22.8, original: 32, emoji: '🔏', unit: '1套', desc: '自印姓名印章，刻字可定制，小巧便携，学习办公收纳标记神器', stock: 45, sales: 678, badge: 'new', tags: ['印章', '定制', '便携'] }
  ];

  /* ─── Stock ─── */
  function getStock() {
    const saved = localStorage.getItem(STOCK_KEY);
    if (!saved) {
      const initial = {};
      PRODUCTS.forEach(p => initial[p.id] = p.stock);
      return initial;
    }
    return JSON.parse(saved);
  }
  function saveStock(stock) { localStorage.setItem(STOCK_KEY, JSON.stringify(stock)); }

  /* ─── Cart ─── */
  function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }

  /* ─── Orders ─── */
  function getOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
  function saveOrders(orders) { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }

  /* ─── State ─── */
  let currentCat = 'all', searchKw = '', sortType = 'default';

  /* ─── DOM ─── */
  const $ = id => document.getElementById(id);
  let grid, emptyState, cartSidebar, cartOverlay, cartItems, cartEmpty, cartFooter, cartCount, totalPriceEl;
  let detailOverlay, checkoutOverlay;

  /* ─── Init ─── */
  function init() {
    grid = $('productsGrid'); emptyState = $('emptyState');
    cartSidebar = $('cartSidebar'); cartOverlay = $('cartOverlay');
    cartItems = $('cartItems'); cartEmpty = $('cartEmpty'); cartFooter = $('cartFooter');
    cartCount = $('cartCount'); totalPriceEl = $('totalPrice');
    detailOverlay = $('detailOverlay'); checkoutOverlay = $('checkoutOverlay');
    bindEvents();
    render();
    updateCartCount();
  }

  /* ─── Render ─── */
  function render() {
    let list = [...PRODUCTS];
    if (currentCat !== 'all') list = list.filter(p => p.category === currentCat);
    if (searchKw) {
      const kw = searchKw.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(kw) || p.desc.toLowerCase().includes(kw) || (p.tags || []).some(t => t.toLowerCase().includes(kw)));
    }
    switch (sortType) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'sales': list.sort((a, b) => b.sales - a.sales); break;
    }

    grid.innerHTML = '';
    emptyState.style.display = list.length ? 'none' : 'block';

    list.forEach(p => {
      const s = getStock()[p.id] ?? p.stock;
      const outOfStock = s <= 0;
      const badgeHtml = p.badge ? `<span class="badge badge-${p.badge}">${p.badge==='hot'?'🔥热卖':p.badge==='new'?'✨新品':'⚡特惠'}</span>` : '';
      const card = document.createElement('div');
      card.className = 'product-card' + (outOfStock ? ' out-of-stock' : '');
      card.innerHTML = `
        <div class="product-img" data-cat="${p.category}">
          ${badgeHtml}<span>${p.emoji}</span>
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-unit">📦 ${p.unit}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-bottom">
            <div>
              <span class="product-price">¥${p.price.toFixed(1)}</span>
              ${p.original > p.price ? `<span class="product-original">¥${p.original.toFixed(1)}</span>` : ''}
            </div>
            <button class="add-cart-btn" data-id="${p.id}" ${outOfStock?'disabled':''} title="${outOfStock?'缺货':'加入购物车'}">+</button>
          </div>
        </div>`;
      card.addEventListener('click', e => { if (!e.target.closest('.add-cart-btn')) openDetail(p.id); });
      card.querySelector('.add-cart-btn').addEventListener('click', e => { e.stopPropagation(); addToCart(p.id); });
      grid.appendChild(card);
    });
  }

  /* ─── Cart ─── */
  function openCart() { renderCart(); cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; }

  function renderCart() {
    const cart = getCart();
    const stock = getStock();
    cartItems.innerHTML = '';
    if (!cart.length) { cartEmpty.style.display = 'flex'; cartFooter.style.display = 'none'; return; }
    cartEmpty.style.display = 'none'; cartFooter.style.display = 'block';
    let total = 0;
    cart.forEach(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      if (!p) return;
      const maxQty = stock[p.id] ?? p.stock;
      const displayQty = Math.min(item.qty, maxQty > 0 ? maxQty : item.qty);
      const subtotal = p.price * displayQty;
      total += subtotal;
      cartItems.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-img" style="background:${getCatBg(p.category)}">${p.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-unit">${p.unit}</div>
            <div class="cart-item-price">¥${p.price.toFixed(1)} × ${displayQty}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-id="${p.id}" data-action="dec">−</button>
              <span class="qty-num">${displayQty}</span>
              <button class="qty-btn" data-id="${p.id}" data-action="inc">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${p.id}">🗑️</button>
        </div>`;
    });
    totalPriceEl.textContent = `¥${total.toFixed(2)}`;
  }

  function getCatBg(cat) {
    const m = { '笔类':'#e3f2fd','纸张类':'#fffde7','收纳类':'#f3e5f5','办公工具':'#e8f5e9' };
    return m[cat] || '#f0f4f8';
  }

  function addToCart(id) {
    const stock = getStock();
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    const maxQty = stock[id] ?? PRODUCTS.find(p => p.id === id).stock;
    if (existing) {
      if (existing.qty >= maxQty) { showToast('已达库存上限', 'error'); return; }
      existing.qty++;
    } else {
      if (maxQty <= 0) { showToast('库存不足', 'error'); return; }
      cart.push({ id, qty: 1 });
    }
    saveCart(cart);
    showToast('已加入购物车', 'success');
  }

  function changeQty(id, action) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    const stock = getStock();
    const maxQty = stock[id] ?? PRODUCTS.find(p => p.id === id).stock;
    if (action === 'inc') {
      if (cart[idx].qty >= maxQty) { showToast('已达库存上限', 'error'); return; }
      cart[idx].qty++;
    } else {
      if (cart[idx].qty <= 1) { cart.splice(idx, 1); } else { cart[idx].qty--; }
    }
    saveCart(cart);
    renderCart();
  }

  function removeFromCart(id) { saveCart(getCart().filter(i => i.id !== id)); renderCart(); }
  function clearCart() { if (!confirm('确定要清空购物车吗？')) return; saveCart([]); renderCart(); showToast('购物车已清空', 'success'); }
  function updateCartCount() {
    const total = getCart().reduce((s, i) => s + i.qty, 0);
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? 'flex' : 'none';
  }

  /* ─── Detail ─── */
  function openDetail(id) {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (!p) return;
    const s = getStock()[p.id] ?? p.stock;
    const outOfStock = s <= 0;
    const tagHtml = (p.tags || []).map(t => `<span class="detail-tag">${t}</span>`).join('');
    $('detailBody').innerHTML = `
      <div class="detail-cover" style="background:${getCatBg(p.category)}">${p.emoji}</div>
      <div class="detail-name">${p.name}</div>
      <div class="detail-bottom">
        <span class="detail-price">¥${p.price.toFixed(1)}</span>
        ${p.original > p.price ? `<span class="detail-original">¥${p.original.toFixed(1)}</span>` : ''}
        <span class="detail-unit">📦 ${p.unit}</span>
        <span class="detail-stock">库存：${s}件</span>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">商品描述</div>
        <div class="detail-section-content">${p.desc}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">商品标签</div>
        <div class="detail-tags">${tagHtml}</div>
      </div>
      <div class="detail-actions">
        <button class="btn-add-cart" id="detailAddCart" data-id="${p.id}" ${outOfStock?'disabled':''}>${outOfStock?'已售罄':'🛒 加入购物车'}</button>
      </div>`;
    $('detailAddCart').addEventListener('click', () => { addToCart(p.id); closeModal(detailOverlay); });
    openModal(detailOverlay);
  }

  /* ─── Checkout ─── */
  function openCheckout() {
    const cart = getCart();
    if (!cart.length) { showToast('购物车是空的', 'error'); return; }
    closeCart();
    let summary = '<div>商品明细：</div>';
    let total = 0;
    cart.forEach(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      if (!p) return;
      const stock = getStock();
      const s = stock[p.id] ?? p.stock;
      const qty = Math.min(item.qty, s > 0 ? s : item.qty);
      const sub = p.price * qty;
      total += sub;
      summary += `<div>${p.emoji} ${p.name}（${p.unit}）× ${qty} = ¥${sub.toFixed(2)}</div>`;
    });
    summary += `<div style="margin-top:8px;font-weight:800;color:var(--primary);">合计：¥${total.toFixed(2)}</div>`;
    $('checkoutSummary').innerHTML = summary;
    $('checkoutForm').reset();
    document.querySelectorAll('#checkoutForm .form-group').forEach(g => g.classList.remove('error'));
    openModal(checkoutOverlay);
  }
  function closeCheckout() { closeModal(checkoutOverlay); }

  function submitOrder() {
    const name = $('coName').value.trim();
    const phone = $('coPhone').value.trim();
    const address = $('coAddress').value.trim();
    const note = $('coNote').value.trim();
    let valid = true;

    document.querySelectorAll('#checkoutForm .form-group').forEach(g => g.classList.remove('error'));
    if (!name) { $('coName').closest('.form-group').classList.add('error'); valid = false; }
    if (!/^1[3-9]\d{9}$/.test(phone)) { $('coPhone').closest('.form-group').classList.add('error'); valid = false; }
    if (!address || address.length < 5) { $('coAddress').closest('.form-group').classList.add('error'); valid = false; }
    if (!valid) return;

    const cart = getCart();
    const stock = getStock();
    for (const item of cart) {
      const s = stock[item.id] ?? PRODUCTS.find(p => p.id === item.id).stock;
      if (item.qty > s) {
        const p = PRODUCTS.find(p => p.id === item.id);
        showToast(`${p.name} 库存不足（剩余${s}件）！`, 'error');
        return;
      }
    }
    cart.forEach(item => {
      stock[item.id] = (stock[item.id] ?? PRODUCTS.find(p => p.id === item.id).stock) - item.qty;
    });
    saveStock(stock);

    const orders = getOrders();
    orders.push({
      id: Date.now().toString(36),
      items: [...cart],
      total: cart.reduce((s, i) => s + PRODUCTS.find(p => p.id === i.id).price * i.qty, 0),
      name, phone, address, note,
      time: new Date().toLocaleString('zh-CN')
    });
    saveOrders(orders);
    saveCart([]);
    closeCheckout();
    render();
    updateCartCount();
    showToast('✅ 订单提交成功！', 'success');
  }

  /* ─── Modals ─── */
  function openModal(overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal(overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  /* ─── Toast ─── */
  function showToast(msg, type = '') {
    const toast = $('toast');
    $('toastMsg').textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ─── Bind ─── */
  function bindEvents() {
    $('searchInput').addEventListener('input', () => { searchKw = $('searchInput').value.trim(); render(); });
    $('sortSelect').addEventListener('change', () => { sortType = $('sortSelect').value; render(); });

    document.querySelectorAll('.filter-item[data-cat]').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.filter-item[data-cat]').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        currentCat = el.dataset.cat;
        render();
      });
    });

    $('cartBtn').addEventListener('click', openCart);
    $('cartClose').addEventListener('click', closeCart);
    $('cartOverlay').addEventListener('click', closeCart);
    $('btnCheckout').addEventListener('click', openCheckout);
    $('btnClearCart').addEventListener('click', clearCart);

    cartItems.addEventListener('click', e => {
      const btn = e.target.closest('.qty-btn');
      if (btn) { changeQty(btn.dataset.id, btn.dataset.action); return; }
      const rm = e.target.closest('.cart-item-remove');
      if (rm) removeFromCart(rm.dataset.id);
    });

    $('detailClose').addEventListener('click', () => closeModal(detailOverlay));
    detailOverlay.addEventListener('click', e => { if (e.target === detailOverlay) closeModal(detailOverlay); });

    $('checkoutClose').addEventListener('click', closeCheckout);
    $('coCancel').addEventListener('click', closeCheckout);
    $('coSubmit').addEventListener('click', submitOrder);
    checkoutOverlay.addEventListener('click', e => { if (e.target === checkoutOverlay) closeCheckout(); });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal(detailOverlay);
        closeModal(checkoutOverlay);
        if (cartSidebar.classList.contains('open')) closeCart();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();