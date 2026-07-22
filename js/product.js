/* ============================================================
   MEMON BROTHERS — Product detail page
   ============================================================ */

import { byId, byCategory, COLLECTIONS, formatINR } from './data.js';
import { icons } from './ui.js';
import { productCard } from './home.js';

const PREFIX = '../';

export function mountProductPage() {
  const root = document.getElementById('productRoot');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = byId(id);

  if (!p) {
    root.innerHTML = `
      <div class="container section page-hero" style="text-align:center">
        <h1>Product not found</h1>
        <p class="lead" style="margin:1rem auto 2rem">This piece may have sold out or moved.</p>
        <a class="btn btn-gold" href="../index.html#featured">Back to the Collection</a>
      </div>`;
    return;
  }

  document.title = `${p.name} — Memon Brothers`;
  const catTitle = COLLECTIONS[p.category].title;
  const discount = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  const images = [...p.images, ...p.images].slice(0, Math.max(4, p.images.length)); // gallery slots

  root.innerHTML = `
    <div class="container section page-hero" style="padding-top:calc(var(--header-h) + var(--space-6))">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span class="sep">/</span>
        <a href="../index.html#${p.category}">${catTitle}</a><span class="sep">/</span>
        <span aria-current="page">${p.name}</span>
      </nav>

      <div class="pd-grid">
        <div class="pd-gallery reveal in">
          <div class="pd-main"><img id="pdMainImg" src="${PREFIX}${p.images[0]}" alt="${p.name}"></div>
          <div class="pd-thumbs" role="tablist" aria-label="Product images">
            ${images.map((src, i) => `
              <button role="tab" class="${i === 0 ? 'active' : ''}" data-thumb="${PREFIX}${src}" aria-label="Image ${i + 1}">
                <img src="${PREFIX}${src}" alt="" loading="lazy">
              </button>`).join('')}
          </div>
        </div>

        <div class="pd-info reveal in">
          <span class="pd-cat">${catTitle}${p.flag ? ` · ${p.flag}` : ''}</span>
          <h1>${p.name}</h1>
          <div class="pd-price">
            ${p.mrp > p.price ? `<s>${formatINR(p.mrp)}</s>` : ''}${formatINR(p.price)}
            ${discount ? `<span class="save">Save ${discount}%</span>` : ''}
          </div>
          <p class="pd-desc">${p.description}</p>

          <div class="pd-attrs">
            ${Object.entries(p.attrs).map(([k, v]) => `
              <div class="row"><b>${k}</b><span>${v}</span></div>`).join('')}
          </div>

          <div class="pd-buy">
            <div class="qty" aria-label="Quantity">
              <button data-pd-dec aria-label="Decrease quantity">−</button>
              <output id="pdQty">1</output>
              <button data-pd-inc aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-ghost" data-add="${p.id}" data-qty-source>Add to Cart</button>
            <button class="btn btn-gold" data-buy="${p.id}" data-qty-source>Buy Now</button>
          </div>

          <div class="pd-assure">
            <span>${icons.shield} Quality Assured</span>
            <span>${icons.truck} Fast Dispatch</span>
            <span>${icons.whatsapp} WhatsApp Support</span>
          </div>
        </div>
      </div>

      <section style="margin-top: var(--space-9)">
        <div class="section-head">
          <div class="titles">
            <span class="section-label">Continue Exploring</span>
            <h2>You may also like</h2>
          </div>
        </div>
        <div class="product-grid" id="relatedGrid"></div>
      </section>
    </div>`;

  // Gallery
  const main = root.querySelector('#pdMainImg');
  root.querySelectorAll('[data-thumb]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-thumb]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      main.src = btn.dataset.thumb;
      main.style.animation = 'none';
      void main.offsetWidth;
      main.style.animation = '';
    });
  });

  // Quantity + source-aware buy buttons
  const qtyOut = root.querySelector('#pdQty');
  let qty = 1;
  const sync = () => {
    qtyOut.textContent = qty;
    root.querySelectorAll('[data-qty-source]').forEach((b) => (b.dataset.qty = qty));
  };
  root.querySelector('[data-pd-inc]').addEventListener('click', () => { qty = Math.min(qty + 1, 99); sync(); });
  root.querySelector('[data-pd-dec]').addEventListener('click', () => { qty = Math.max(qty - 1, 1); sync(); });
  sync();

  // Related
  const related = byCategory(p.category).filter((x) => x.id !== p.id).slice(0, 4);
  root.querySelector('#relatedGrid').innerHTML = related
    .map((r, i) => productCard(r, i * 0.08).replaceAll('pages/product.html', 'product.html').replaceAll('assets/', '../assets/'))
    .join('');
}
