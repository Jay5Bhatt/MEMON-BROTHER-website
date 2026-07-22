/* ============================================================
   MEMON BROTHERS — Checkout
   Flow (no payment gateway):
   1. Customer details → 2. Pay manually to our UPI ID →
   3. Upload payment screenshot → 4. Confirm on WhatsApp.
   ============================================================ */

import { STORE, formatINR } from './data.js';
import * as cart from './store.js';
import { icons, toast } from './ui.js';

const PREFIX = '../';
let screenshotName = '';

export function mountCheckout() {
  const root = document.getElementById('checkoutRoot');
  if (!root) return;

  const state = cart.getState();

  if (!state.items.length) {
    root.innerHTML = `
      <div class="container section page-hero" style="text-align:center">
        <span class="section-label" style="justify-content:center">Checkout</span>
        <h1 style="margin-top:1rem">Your cart is empty</h1>
        <p class="lead" style="margin:1rem auto 2rem">Add something beautiful before checking out.</p>
        <a class="btn btn-gold" href="../index.html#featured">Explore the Collection</a>
      </div>`;
    return;
  }

  const shipping = state.subtotal >= 1999 ? 0 : 99;
  const total = state.subtotal + shipping;

  root.innerHTML = `
    <div class="container section page-hero" style="padding-top:calc(var(--header-h) + var(--space-6))">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span class="sep">/</span>
        <span aria-current="page">Checkout</span>
      </nav>

      <div class="steps" aria-label="Checkout steps">
        <div class="step active">1 · Details</div>
        <div class="step active">2 · Pay via UPI</div>
        <div class="step">3 · Confirm</div>
      </div>

      <div class="checkout-grid">
        <form id="checkoutForm" class="form-card" novalidate>
          <h3>Delivery Details</h3>
          <div class="form-grid" style="margin-bottom: var(--space-6)">
            <div class="form-field">
              <label for="co-name">Full Name *</label>
              <input id="co-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required>
              <span class="error-text" data-err="name"></span>
            </div>
            <div class="form-field">
              <label for="co-phone">Phone Number *</label>
              <input id="co-phone" name="phone" type="tel" inputmode="numeric" placeholder="10-digit mobile" autocomplete="tel" required>
              <span class="error-text" data-err="phone"></span>
            </div>
            <div class="form-field full">
              <label for="co-address">Delivery Address *</label>
              <textarea id="co-address" name="address" placeholder="House / street / area / city / state / PIN code" required></textarea>
              <span class="error-text" data-err="address"></span>
            </div>
            <div class="form-field full">
              <label for="co-notes">Order Notes (optional)</label>
              <input id="co-notes" name="notes" type="text" placeholder="Gift wrap, delivery instructions…">
            </div>
          </div>

          <div class="pay-panel">
            <h3>Pay via UPI</h3>
            <p>Complete the payment to our UPI ID below using any UPI app (GPay, PhonePe, Paytm…), then upload your payment screenshot.</p>
            <div class="upi-box">
              <div>
                <small>Pay to UPI ID</small>
                <b id="upiId">${STORE.upiId}</b>
              </div>
              <button type="button" class="btn btn-ghost btn-sm" data-copy-upi>${icons.copy} Copy</button>
            </div>
            <div class="upi-box" style="border-style:solid">
              <div>
                <small>Amount Payable</small>
                <b>${formatINR(total)}</b>
              </div>
            </div>

            <label class="upload-zone" data-upload tabindex="0" role="button" aria-label="Upload payment screenshot">
              ${icons.upload}
              <span data-upload-label>Tap to upload payment screenshot</span>
              <span class="body-small" style="font-size:var(--fs-micro)">PNG / JPG from your UPI app</span>
              <input type="file" accept="image/*" data-upload-input>
            </label>
            <span class="error-text" data-err="shot"></span>
          </div>

          <div style="margin-top: var(--space-6)">
            <button class="btn btn-gold" type="submit" style="width:100%">
              Place Order on WhatsApp ${icons.arrow}
            </button>
          </div>
          <p class="form-note">You'll be redirected to WhatsApp with your complete order summary. Our team confirms your payment screenshot and dispatches your order.</p>
        </form>

        <aside class="summary-card" aria-label="Order summary">
          <h3>Order Summary</h3>
          <div class="summary-items">
            ${state.items.map(({ product: p, qty }) => `
              <div class="summary-item">
                <img src="${PREFIX}${p.images[0]}" alt="${p.name}">
                <div>
                  <div class="n">${p.name}</div>
                  <div class="q">Qty ${qty} × ${formatINR(p.price)}</div>
                </div>
                <div class="p">${formatINR(p.price * qty)}</div>
              </div>`).join('')}
          </div>
          <div class="summary-rows">
            <div class="row"><span>Subtotal</span><span>${formatINR(state.subtotal)}</span></div>
            <div class="row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatINR(shipping)}</span></div>
            <div class="row total"><span>Total</span><b>${formatINR(total)}</b></div>
          </div>
        </aside>
      </div>
    </div>`;

  /* Copy UPI */
  root.querySelector('[data-copy-upi]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(STORE.upiId);
      toast('UPI ID copied');
    } catch {
      toast(STORE.upiId);
    }
  });

  /* Screenshot upload */
  const zone = root.querySelector('[data-upload]');
  const input = root.querySelector('[data-upload-input]');
  const label = root.querySelector('[data-upload-label]');
  const acceptFile = (file) => {
    if (!file || !file.type.startsWith('image/')) { toast('Please choose an image file'); return; }
    screenshotName = file.name;
    const url = URL.createObjectURL(file);
    zone.querySelector('svg')?.remove();
    let img = zone.querySelector('img');
    if (!img) { img = document.createElement('img'); zone.prepend(img); }
    img.src = url;
    img.alt = 'Payment screenshot preview';
    label.innerHTML = `<span class="ok-text">${icons.check.replace('width="1.6"', 'width="1.6" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px"')} Screenshot attached — ${file.name}</span>`;
  };
  input.addEventListener('change', () => acceptFile(input.files[0]));
  zone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
  ['dragover', 'dragenter'].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.remove('drag'); }));
  zone.addEventListener('drop', (e) => acceptFile(e.dataTransfer.files[0]));

  /* Submit → WhatsApp */
  const form = root.querySelector('#checkoutForm');
  const setErr = (key, msg) => {
    const el = form.querySelector(`[data-err="${key}"]`);
    if (el) el.textContent = msg || '';
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').trim();
    const phone = (data.get('phone') || '').trim();
    const address = (data.get('address') || '').trim();
    const notes = (data.get('notes') || '').trim();

    let ok = true;
    const mark = (id, bad) => form.querySelector(id).classList.toggle('field-error', bad);

    setErr('name'); setErr('phone'); setErr('address'); setErr('shot');
    if (!name) { setErr('name', 'Please enter your name'); mark('#co-name', true); ok = false; } else mark('#co-name', false);
    if (!/^\d{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
      setErr('phone', 'Enter a valid 10-digit number'); mark('#co-phone', true); ok = false;
    } else mark('#co-phone', false);
    if (address.length < 10) { setErr('address', 'Please enter your complete address'); mark('#co-address', true); ok = false; } else mark('#co-address', false);
    if (!screenshotName) { setErr('shot', 'Please attach your payment screenshot'); ok = false; }

    if (!ok) { toast('Please complete the highlighted fields'); return; }

    const lines = [];
    lines.push('*NEW ORDER — MEMON BROTHERS*');
    lines.push('———————————————');
    lines.push(`*Customer*`);
    lines.push(`Name: ${name}`);
    lines.push(`Phone: ${phone}`);
    lines.push(`Address: ${address}`);
    if (notes) lines.push(`Notes: ${notes}`);
    lines.push('———————————————');
    lines.push(`*Order*`);
    state.items.forEach(({ product: p, qty }, i) => {
      lines.push(`${i + 1}. ${p.name} — ${qty} × ${formatINR(p.price)} = ${formatINR(p.price * qty)}`);
    });
    lines.push('———————————————');
    lines.push(`Subtotal: ${formatINR(state.subtotal)}`);
    lines.push(`Shipping: ${shipping === 0 ? 'Free' : formatINR(shipping)}`);
    lines.push(`*Total Paid: ${formatINR(total)}*`);
    lines.push('———————————————');
    lines.push(`Payment: UPI (${STORE.upiId})`);
    lines.push(`Screenshot: ${screenshotName} (sending next in this chat)`);

    const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;

    form.querySelectorAll('.step').forEach((s) => s.classList.add('done'));
    toast('Opening WhatsApp with your order…');
    cart.clear();
    window.open(url, '_blank', 'noopener');
  });
}
