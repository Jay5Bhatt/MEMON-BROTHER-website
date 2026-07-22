/* ============================================================
   MEMON BROTHERS — Shared UI: icons, header, cart drawer,
   toast, scroll reveals, lazy video.
   ============================================================ */

import { STORE, formatINR, byId } from './data.js';
import * as cart from './store.js';

const I = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const icons = {
  bag: I('<path d="M6 7h12l1.2 13.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>'),
  close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
  menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  trash: I('<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13h8l1-13"/>'),
  check: I('<path d="M4 12.5 9.5 18 20 6.5"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>'),
  arrow: I('<path d="M5 12h14m-6-6 6 6-6 6"/>'),
  instagram: I('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>'),
  whatsapp: I('<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M9.3 8.8c.3-.7.7-.7 1-.6l.9 1.6c.1.3 0 .6-.2.9l-.4.5c.5 1.1 1.5 2 2.6 2.5l.5-.5c.3-.3.6-.3.9-.2l1.6.9c.2.4.1.8-.5 1.1-.9.4-2 .4-3.6-.4a11.6 11.6 0 0 1-3.5-3c-.9-1.1-1.1-2.2-.7-3.1Z" fill="currentColor" stroke="none"/>'),
  user: I('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>'),
  shield: I('<path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>'),
  truck: I('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>'),
  gem: I('<path d="M7 4h10l4 5-9 11L3 9l4-5Z"/><path d="M3 9h18M9 4l3 5 3-5M12 9v11"/>'),
  headset: I('<path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19a4 4 0 0 1-4 3h-2"/>'),
  upload: I('<path d="M12 16V4m0 0 4 4m-4-4-4 4"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'),
  copy: I('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'),
  star: I('<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.7 6.6 19.6l1.1-6L3.2 9.4l6.1-.8L12 3Z"/>'),
};

export function waLink(message) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ---------- Header ---------- */
export function mountHeader(active = '') {
  const el = document.querySelector('[data-header]');
  if (!el) return;
  const links = [
    ['Home', 'index.html#top', 'home'],
    ['About', 'index.html#about', 'about'],
    ['Watches', 'index.html#watches', 'watches'],
    ['Perfumes', 'index.html#perfumes', 'perfumes'],
    ['Sunglasses', 'index.html#sunglasses', 'sunglasses'],
    ['Contact', 'index.html#contact', 'contact'],
  ];
  const prefix = el.dataset.root || '';
  el.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="${prefix}index.html#top" aria-label="Memon Brothers home">
        <img class="brand-mark" src="${prefix}assets/logo.jpg" alt="Memon Brothers logo" width="42" height="42">
        <span class="brand-name">MEMON<span>BROTHERS</span></span>
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Primary">
        ${links.map(([label, href, key]) => `<a href="${prefix}${href}" class="${key === active ? 'active' : ''}">${label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <a class="icon-btn" href="${STORE.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
        <button class="icon-btn" data-cart-open aria-label="Open cart">${icons.bag}<span class="cart-count" data-cart-count></span></button>
        <button class="icon-btn nav-toggle" aria-label="Menu" aria-expanded="false">${icons.menu}</button>
      </div>
    </div>`;

  const header = el.closest('.site-header') || el;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = el.querySelector('.nav-toggle');
  const nav = el.querySelector('#mainNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') nav.classList.remove('open');
  });
}

/* ---------- Cart drawer ---------- */
export function mountCartDrawer() {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="overlay" data-overlay></div>
    <aside class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" data-drawer>
      <div class="cart-head">
        <h3>Your Cart</h3>
        <button class="icon-btn" data-cart-close aria-label="Close cart">${icons.close}</button>
      </div>
      <div class="cart-items" data-cart-items></div>
      <div class="cart-foot">
        <div class="cart-total"><span>Subtotal</span><b data-cart-total>₹0</b></div>
        <button class="btn btn-gold" data-checkout>Proceed to Checkout ${icons.arrow}</button>
        <p class="note">Taxes included · Pay securely via UPI at checkout</p>
      </div>
    </aside>`;
  document.body.appendChild(wrap);

  const overlay = wrap.querySelector('[data-overlay]');
  const drawer = wrap.querySelector('[data-drawer]');
  const itemsEl = wrap.querySelector('[data-cart-items]');
  const totalEl = wrap.querySelector('[data-cart-total]');
  const prefix = document.querySelector('[data-header]')?.dataset.root || '';

  const open = () => { overlay.classList.add('open'); drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { overlay.classList.remove('open'); drawer.classList.remove('open'); document.body.style.overflow = ''; };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cart-open]')) open();
    if (e.target.closest('[data-cart-close]') || e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  wrap.querySelector('[data-checkout]').addEventListener('click', () => {
    if (!cart.getState().items.length) { toast('Your cart is empty'); return; }
    location.href = `${prefix}pages/checkout.html`;
  });

  function render({ items, subtotal }) {
    if (!items.length) {
      itemsEl.innerHTML = `<div class="cart-empty">${icons.bag}<p>Your cart is empty.<br>Discover something extraordinary.</p></div>`;
    } else {
      itemsEl.innerHTML = items.map(({ product: p, qty }) => `
        <div class="cart-item" data-id="${p.id}">
          <img src="${prefix}${p.images[0]}" alt="${p.name}">
          <div>
            <div class="ci-name">${p.name}</div>
            <div class="ci-price">${formatINR(p.price)}</div>
            <div class="qty" aria-label="Quantity">
              <button data-dec aria-label="Decrease quantity">−</button>
              <output>${qty}</output>
              <button data-inc aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="ci-remove" data-remove aria-label="Remove ${p.name}">${icons.trash}</button>
        </div>`).join('');
    }
    totalEl.textContent = formatINR(subtotal);
  }

  itemsEl.addEventListener('click', (e) => {
    const row = e.target.closest('.cart-item');
    if (!row) return;
    const id = row.dataset.id;
    const qty = cart.getState().items.find((i) => i.id === id)?.qty ?? 0;
    if (e.target.closest('[data-inc]')) cart.setQty(id, qty + 1);
    if (e.target.closest('[data-dec]')) cart.setQty(id, qty - 1);
    if (e.target.closest('[data-remove]')) { cart.remove(id); toast('Removed from cart'); }
  });

  cart.subscribe(render);
  render(cart.getState());
}

/* ---------- Cart badge ---------- */
export function mountCartBadge() {
  const badges = document.querySelectorAll('[data-cart-count]');
  const render = ({ count }) => badges.forEach((b) => {
    b.textContent = count;
    b.classList.toggle('show', count > 0);
  });
  cart.subscribe(render);
  render(cart.getState());
}

/* ---------- Add-to-cart / buy-now delegation ---------- */
export function mountBuyButtons() {
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    const buyBtn = e.target.closest('[data-buy]');
    if (addBtn) {
      const id = addBtn.dataset.add;
      const qty = Number(addBtn.dataset.qty || 1);
      cart.add(id, qty);
      toast(`${byId(id).name} added to cart`);
      document.querySelector('[data-cart-open]')?.dispatchEvent(new Event('click', { bubbles: true }));
    }
    if (buyBtn) {
      cart.add(buyBtn.dataset.buy, Number(buyBtn.dataset.qty || 1));
      const prefix = document.querySelector('[data-header]')?.dataset.root || '';
      location.href = `${prefix}pages/checkout.html`;
    }
  });
}

/* ---------- Toast ---------- */
let toastTimer;
export function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.innerHTML = `${icons.check}<span></span>`;
  el.querySelector('span').textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- Scroll reveals ----------
   One delegated observer: works for .reveal elements added at
   any time (initial render, dynamic grids, filtered results). */
let revealObserver = null;
let revealWatched = null;

function getRevealObserver() {
  if (!('IntersectionObserver' in window)) return null;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
  }
  return revealObserver;
}

export function observeReveals(scope = document) {
  const io = getRevealObserver();
  scope.querySelectorAll('.reveal:not(.in)').forEach((el) => {
    if (!io) { el.classList.add('in'); return; }
    io.observe(el);
  });
}

export function mountReveals() {
  observeReveals(document);
  if (!revealWatched) {
    revealWatched = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        if (n.matches?.('.reveal:not(.in)')) observeReveals(n.parentNode || document);
        else if (n.querySelector?.('.reveal:not(.in)')) observeReveals(n);
      }));
    });
    revealWatched.observe(document.body, { childList: true, subtree: true });
  }
}

/* ---------- Lazy video ----------
   Delegated observer + MutationObserver so videos injected
   after boot (collection promos) are picked up too. */
let lazyVideoObserver = null;
let lazyVideoWatched = null;

function handleVideoEntries(entries) {
  entries.forEach((en) => {
    const v = en.target;
    if (en.isIntersecting) {
      if (!v.getAttribute('src') && v.dataset.src) { v.src = v.dataset.src; v.load(); }
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}

export function observeLazyVideos(scope = document) {
  if (!('IntersectionObserver' in window)) {
    scope.querySelectorAll('video[data-lazy]').forEach((v) => {
      if (!v.getAttribute('src') && v.dataset.src) { v.src = v.dataset.src; v.load(); }
      v.play().catch(() => {});
    });
    return;
  }
  if (!lazyVideoObserver) {
    lazyVideoObserver = new IntersectionObserver(handleVideoEntries, { rootMargin: '300px' });
  }
  scope.querySelectorAll('video[data-lazy]').forEach((v) => lazyVideoObserver.observe(v));
}

export function mountLazyVideos() {
  observeLazyVideos(document);
  if (!lazyVideoWatched && 'MutationObserver' in window) {
    lazyVideoWatched = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        if (n.matches?.('video[data-lazy]')) observeLazyVideos(n.parentNode || document);
        else if (n.querySelector?.('video[data-lazy]')) observeLazyVideos(n);
      }));
    });
    lazyVideoWatched.observe(document.body, { childList: true, subtree: true });
  }
}

/* ---------- Preloader ---------- */
export function mountPreloader() {
  const pre = document.querySelector('.preloader');
  if (!pre) return;
  window.addEventListener('load', () => setTimeout(() => pre.classList.add('done'), 350));
  setTimeout(() => pre.classList.add('done'), 3200); // safety
}

/* ---------- Boot shared chrome ---------- */
export function bootChrome(active = '') {
  mountHeader(active);
  mountCartDrawer();
  mountCartBadge();
  mountBuyButtons();
  mountReveals();
  mountLazyVideos();
  mountPreloader();
}
