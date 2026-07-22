/* ============================================================
   MEMON BROTHERS — Catalog data & store configuration
   ------------------------------------------------------------
   Product names and prices are taken from the source image
   filenames (e.g. "Fossil_price-999" → Fossil, ₹999).
   To add a product: drop its image in assets/products/ and
   add an entry to PRODUCTS below.
   Set STORE.upiId once the real UPI ID is available.
   ============================================================ */

export const STORE = {
  name: 'Memon Brothers',
  owner: 'Ayaz Memon',
  whatsapp: '918200156757',
  whatsappDisplay: '+91 82001 56757',
  instagram: 'memon_.brothers.02',
  instagramUrl: 'https://www.instagram.com/memon_.brothers.02',
  upiId: 'ayazmemon2114-1@oksbi',
  currency: 'INR',
  locale: 'en-IN',
};

export const COLLECTIONS = {
  watches: {
    title: 'Watches',
    videos: ['assets/videos/watches.mp4', 'assets/videos/watches-2.mp4'],
    tags: ['The Watches Film', 'Watches — Chapter II'],
  },
  perfumes: {
    title: 'Perfumes',
    videos: ['assets/videos/perfumes.mp4', 'assets/videos/perfumes-2.mp4'],
    tags: ['The Perfumes Film', 'Perfumes — Chapter II'],
  },
  sunglasses: {
    title: 'Sunglasses',
    videos: ['assets/videos/sunglasses.mp4'],
    tags: ['The Sunglasses Film'],
  },
};

export const PRODUCTS = [
  // ---------------- Watches ----------------
  {
    id: 'w-fossil',
    name: 'Fossil',
    category: 'watches',
    price: 999, mrp: 1499,
    flag: 'Bestseller', featured: true, added: '2026-06-18',
    images: ['assets/products/fossil.jpg'],
    description: 'A clean white-dial chronograph on a tan suede-leather strap — effortless everyday elegance from Fossil.',
    attrs: { Dial: 'White, chronograph', Strap: 'Tan suede leather', Movement: 'Quartz chronograph', Style: 'Casual classic' },
  },
  {
    id: 'w-hublot',
    name: 'Hublot',
    category: 'watches',
    price: 5500, mrp: 7999,
    flag: 'Limited', featured: true, added: '2026-07-02',
    images: ['assets/products/hublot.jpg'],
    description: 'A striking rose-gold case over a deep-blue dial with a matching blue rubber strap — bold, modern, unmistakable.',
    attrs: { Case: 'Rose-gold tone', Dial: 'Deep blue', Strap: 'Blue rubber', Movement: 'Automatic' },
  },
  {
    id: 'w-michael-kors',
    name: 'Michael Kors',
    category: 'watches',
    price: 7999, mrp: 10999,
    flag: 'Premium', featured: true, added: '2026-06-28',
    images: ['assets/products/michael-kors.jpg'],
    description: 'Full gold-tone bracelet watch with a black chronograph dial and Roman numerals — a statement of pure luxury.',
    attrs: { Case: 'Gold-tone steel', Dial: 'Black chronograph, Roman numerals', Strap: 'Gold bracelet', Movement: 'Quartz chronograph' },
  },
  {
    id: 'w-tubular',
    name: 'Tubular',
    category: 'watches',
    price: 1599, mrp: 2299,
    flag: 'New', featured: false, added: '2026-07-05',
    images: ['assets/products/tubular.jpg'],
    description: 'A tonneau-cased automatic with an open-worked black dial and stitched leather strap — mechanical character on show.',
    attrs: { Case: 'Tonneau, blue-black', Dial: 'Skeleton, black', Strap: 'Black stitched leather', Movement: 'Automatic' },
  },

  // ---------------- Perfumes ----------------
  {
    id: 'p-cool-water',
    name: 'Cool Water',
    category: 'perfumes',
    price: 1499, mrp: 1999,
    flag: 'Bestseller', featured: true, added: '2026-06-10',
    images: ['assets/products/cool-water.jpg'],
    description: 'Crisp aquatic freshness with lavender, mint and sandalwood — the timeless classic, reborn as an extrait. 100ml.',
    attrs: { Size: '100ml', Family: 'Aquatic Aromatic', Notes: 'Mint, lavender, sandalwood', Longevity: '7–9 hours' },
  },
  {
    id: 'p-hawas-ice',
    name: 'Hawas Ice',
    category: 'perfumes',
    price: 1499, mrp: 1999,
    flag: 'New', featured: true, added: '2026-07-01',
    images: ['assets/products/hawas-ice.jpg'],
    description: 'An icy burst of bergamot and apple over amber woods — fresh, magnetic and made for warm evenings. 100ml.',
    attrs: { Size: '100ml', Family: 'Fresh Woody', Notes: 'Bergamot, apple, amberwood', Longevity: '8–10 hours' },
  },
  {
    id: 'p-ysl-y',
    name: 'YSL-Y',
    category: 'perfumes',
    price: 1499, mrp: 1999,
    flag: '', featured: true, added: '2026-05-22',
    images: ['assets/products/ysl-y.jpg'],
    description: 'The iconic Y — crisp apple and ginger over deep woods and incense. Clean, confident, unmistakably modern. 100ml.',
    attrs: { Size: '100ml', Family: 'Woody Aromatic', Notes: 'Apple, ginger, incense', Longevity: '8–10 hours' },
  },

  // ---------------- Sunglasses ----------------
  {
    id: 's-cartier',
    name: 'Cartier',
    category: 'sunglasses',
    price: 600, mrp: 999,
    flag: 'Bestseller', featured: true, added: '2026-06-15',
    images: ['assets/products/cartier.jpg'],
    description: 'Rimless gold-trimmed frames with rich wooden temples — quiet luxury with an Italian finish.',
    attrs: { Frame: 'Rimless, gold trim', Temples: 'Wood', Lens: 'Clear, UV400', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-marc-jacobs',
    name: 'Marc Jacobs',
    category: 'sunglasses',
    price: 600, mrp: 999,
    flag: 'New', featured: false, added: '2026-07-01',
    images: ['assets/products/marc-jacobs.jpg'],
    description: 'A bold black navigator with gold double-bridge detailing and dark smoke lenses — sharp and contemporary.',
    attrs: { Frame: 'Black acetate, gold bridge', Lens: 'Smoke, UV400', Fit: 'Medium–large', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-rayban',
    name: 'Rayban',
    category: 'sunglasses',
    price: 600, mrp: 999,
    flag: '', featured: false, added: '2026-04-14',
    images: ['assets/products/rayban.jpg'],
    description: 'Deep-blue wayfarer-style frames with polarized lenses and red temple accents — a sport-luxury icon.',
    attrs: { Frame: 'Blue composite', Lens: 'Polarized, UV400', Fit: 'Medium', Includes: 'Hard case & cloth' },
  },
];

export const byId = (id) => PRODUCTS.find((p) => p.id === id);
export const byCategory = (cat) => PRODUCTS.filter((p) => p.category === cat);
export const featured = () => PRODUCTS.filter((p) => p.featured);

export function formatINR(n) {
  return new Intl.NumberFormat(STORE.locale, {
    style: 'currency',
    currency: STORE.currency,
    maximumFractionDigits: 0,
  }).format(n);
}
