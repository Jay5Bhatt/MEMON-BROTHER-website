# MEMON BROTHERS — Luxury E-Commerce Website

A premium, handcrafted e-commerce experience for **Memon Brothers** — curated
watches, fine perfumes and designer sunglasses. Built as a fast, dependency-free
static site (no build step) with a design system derived from the brand logo.

## Run Locally

Any static server works. Two easy options:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open http://localhost:8000

## Structure

```
index.html            Homepage (hero, about, why-us, featured, 3 collections,
                      instagram, contact, footer)
pages/
  product.html        Product detail page (?id=<product-id>)
  checkout.html       Checkout — UPI payment + WhatsApp order flow
css/
  main.css            Complete design system + all components
js/
  data.js             Store config + full product catalogue  ← EDIT THIS
  store.js            Cart state (localStorage)
  ui.js               Shared chrome: header, cart drawer, toast, reveals
  home.js             Homepage rendering, search / filter / sort
  product.js          Product page logic
  checkout.js         Checkout flow (validation, UPI, WhatsApp summary)
assets/
  logo.jpg            Brand logo
  products/           Placeholder product & lifestyle imagery (replace)
  videos/             Drop promo films here (watches.mp4, perfumes.mp4, sunglasses.mp4)
```

## Dropping In Real Content

Everything below lives in **js/data.js** and the **assets/** folders — no
markup changes needed.

| Content | Where |
|---|---|
| Product images | Replace files in `assets/products/` (keep names, or update `images` in `data.js`) |
| Names / prices / descriptions | `PRODUCTS` array in `js/data.js` |
| Promo videos | Put `watches.mp4`, `perfumes.mp4`, `sunglasses.mp4` in `assets/videos/` |
| UPI ID | `STORE.upiId` in `js/data.js` |
| WhatsApp / Instagram / owner | `STORE` in `js/data.js` |

Videos autoplay muted, loop, lazy-load when scrolled into view, and show an
elegant placeholder until the real file is added.

## Checkout Flow

No payment gateway — by design:

1. Customer enters name, phone, delivery address, optional notes.
2. Pays manually to the displayed UPI ID.
3. Uploads the payment screenshot.
4. Clicks "Place Order on WhatsApp" — a complete order summary
   (customer, items, quantities, totals, payment confirmation) opens in
   WhatsApp to **+91 82001 56757**, and the cart clears.

Free shipping on orders ₹1,999+ (₹99 below) — configurable in `js/checkout.js`.

## Design System

Palette derived from the logo: aubergine-black `#190b1c`, matte black
`#10060f`, antique gold `#c08a44`, bronze `#885f38`, ivory `#f3e9d7`.
Typography: **Fraunces** (display serif) + **Outfit** (sans).
All tokens live at the top of `css/main.css`.
