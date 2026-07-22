/* ============================================================
   MEMON BROTHERS — Cart store (localStorage-backed)
   ============================================================ */

import { byId } from './data.js';

const KEY = 'mb_cart_v1';
const listeners = new Set();

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items.filter((i) => byId(i.id)) : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((fn) => fn(getState()));
}

export function getState() {
  const items = read().map((i) => ({ ...i, product: byId(i.id) }));
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  return { items, count, subtotal };
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function add(id, qty = 1) {
  const items = read();
  const found = items.find((i) => i.id === id);
  if (found) found.qty = Math.min(found.qty + qty, 99);
  else items.push({ id, qty });
  write(items);
}

export function setQty(id, qty) {
  let items = read();
  if (qty <= 0) items = items.filter((i) => i.id !== id);
  else {
    const found = items.find((i) => i.id === id);
    if (found) found.qty = Math.min(qty, 99);
  }
  write(items);
}

export function remove(id) {
  write(read().filter((i) => i.id !== id));
}

export function clear() {
  write([]);
}
