/* ============================================================
   MEMON BROTHERS — Homepage: product rendering, featured,
   collections, search / filter / sort.
   ============================================================ */

import { PRODUCTS, COLLECTIONS, byCategory, featured, formatINR } from './data.js';
import { icons, toast, observeReveals } from './ui.js';

const PREFIX = '';

export function productCard(p, delay = 0) {
  const href = `${PREFIX}pages/product.html?id=${p.id}`;
  return `
    <article class="product-card reveal" style="--reveal-delay:${delay}s">
      <a class="product-media" href="${href}" aria-label="View ${p.name}">
        ${p.flag ? `<span class="product-flag">${p.flag}</span>` : ''}
        <img src="${PREFIX}${p.images[0]}" alt="${p.name}" loading="lazy" width="800" height="1000">
      </a>
      <div class="product-info">
        <span class="product-cat">${COLLECTIONS[p.category].title}</span>
        <h3 class="product-name"><a href="${href}">${p.name}</a></h3>
        <div class="product-price">
          ${p.mrp > p.price ? `<s>${formatINR(p.mrp)}</s>` : ''}${formatINR(p.price)}
        </div>
        <div class="product-actions">
          <button class="btn btn-ghost" data-add="${p.id}">Add to Cart</button>
          <button class="btn btn-gold" data-buy="${p.id}">Buy Now</button>
        </div>
      </div>
    </article>`;
}

function promoVideo(cat) {
  const c = COLLECTIONS[cat];
  return `
    <div class="promo-video reveal">
      <video data-lazy data-src="${PREFIX}${c.video}" muted loop playsinline preload="none"
             aria-label="${c.title} promotional film"
             onerror="this.closest('.promo-video').classList.add('no-video'); this.remove();"></video>
      <div class="veil"></div>
      <span class="tag">${c.tag}</span>
      <div class="placeholder-note" data-video-placeholder hidden>
        Promotional film — drop ${c.video.split('/').pop()} into assets/videos/
      </div>
    </div>`;
}

function renderCollection(cat, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = byCategory(cat).map((p, i) => productCard(p, (i % 4) * 0.08)).join('');
}

export function mountHome() {
  // Featured
  const feat = document.getElementById('featuredGrid');
  if (feat) feat.innerHTML = featured().map((p, i) => productCard(p, (i % 4) * 0.08)).join('');

  // Collection video slots
  document.querySelectorAll('[data-promo]').forEach((slot) => {
    slot.innerHTML = promoVideo(slot.dataset.promo);
  });
  document.querySelectorAll('video[data-lazy]').forEach((v) => {
    v.addEventListener('error', () => {
      const wrap = v.closest('.promo-video');
      wrap.querySelector('[data-video-placeholder]').hidden = false;
      v.remove();
    });
  });

  renderCollection('watches', 'watchesGrid');
  renderCollection('perfumes', 'perfumesGrid');
  renderCollection('sunglasses', 'sunglassesGrid');

  // Instagram tiles
  const insta = document.getElementById('instaGrid');
  if (insta) {
    insta.innerHTML = Array.from({ length: 6 }, (_, i) => `
      <a class="insta-item reveal" style="--reveal-delay:${i * 0.06}s"
         href="https://www.instagram.com/memon_.brothers.02" target="_blank" rel="noopener"
         aria-label="Open Instagram post ${i + 1}">
        <img src="${PREFIX}assets/products/insta-${i + 1}.jpg" alt="Memon Brothers Instagram showcase ${i + 1}" loading="lazy">
        ${icons.instagram}
      </a>`).join('');
  }

  mountShopToolbar();
}

/* ---------- Search / filter / sort ---------- */
function mountShopToolbar() {
  const bar = document.querySelector('[data-shop-toolbar]');
  if (!bar) return;

  const state = { q: '', cat: 'all', sort: 'featured' };

  const apply = () => {
    let list = [...PRODUCTS];
    if (state.cat !== 'all') list = list.filter((p) => p.category === state.cat);
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        COLLECTIONS[p.category].title.toLowerCase().includes(q));
    }
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'alpha': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'newest': list.sort((a, b) => new Date(b.added) - new Date(a.added)); break;
      default: list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    const grids = {
      watches: document.getElementById('watchesGrid'),
      perfumes: document.getElementById('perfumesGrid'),
      sunglasses: document.getElementById('sunglassesGrid'),
    };
    const active = state.q || state.sort !== 'featured' || state.cat !== 'all';

    Object.entries(grids).forEach(([cat, grid]) => {
      const items = list.filter((p) => p.category === cat);
      grid.innerHTML = items.length
        ? items.map((p, i) => productCard(p, (i % 4) * 0.05)).join('')
        : (active ? `<p class="no-results">No ${COLLECTIONS[cat].title.toLowerCase()} match your search.</p>` : '');
      grid.closest('section').style.display = (!active || state.cat === 'all' || state.cat === cat) ? '' : 'none';
    });

    observeReveals(document);
  };

  bar.addEventListener('input', (e) => {
    if (e.target.matches('[data-search]')) { state.q = e.target.value.trim(); apply(); }
  });
  bar.addEventListener('change', (e) => {
    if (e.target.matches('[data-filter-cat]')) { state.cat = e.target.value; apply(); }
    if (e.target.matches('[data-sort]')) { state.sort = e.target.value; apply(); }
  });
}

/* ---------- Contact form → WhatsApp ---------- */
export function mountContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').trim();
    const phone = (data.get('phone') || '').trim();
    const message = (data.get('message') || '').trim();
    if (!name || !message) { toast('Please fill in your name and message'); return; }
    const text = `Hello Memon Brothers!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone || '—')}%0A%0A${encodeURIComponent(message)}`;
    window.open(`https://wa.me/918200156757?text=${text}`, '_blank', 'noopener');
    form.querySelector('.form-status').textContent = 'Opening WhatsApp…';
    form.reset();
  });
}
