/* ============================================================
   MEMON BROTHERS — Catalog data & store configuration
   ------------------------------------------------------------
   DROP-IN GUIDE:
   • Replace image paths in `images` with real product photos.
   • Update name / price / mrp / description per product.
   • Put promo films in assets/videos/ and set the `video`
     fields on COLLECTIONS below.
   • Set STORE.upiId once the UPI ID is available.
   ============================================================ */

export const STORE = {
  name: 'Memon Brothers',
  owner: 'Ayaz Memon',
  whatsapp: '918200156757',
  whatsappDisplay: '+91 82001 56757',
  instagram: 'memon_.brothers.02',
  instagramUrl: 'https://www.instagram.com/memon_.brothers.02',
  upiId: 'memonbrothers@upi', // TODO: replace with the real UPI ID
  currency: 'INR',
  locale: 'en-IN',
};

export const COLLECTIONS = {
  watches: {
    title: 'Watches',
    tagline: 'Timepieces with presence',
    intro: 'Precision movements, sculpted cases and quiet confidence — watches chosen to outlast trends.',
    video: 'assets/videos/watches.mp4', // TODO: drop in promo film
    tag: 'The Watches Film',
  },
  perfumes: {
    title: 'Perfumes',
    tagline: 'Scents that linger',
    intro: 'Deep ambers, rare ouds and bright citruses — fragrances composed for evenings that matter.',
    video: 'assets/videos/perfumes.mp4', // TODO: drop in promo film
    tag: 'The Perfumes Film',
  },
  sunglasses: {
    title: 'Sunglasses',
    tagline: 'Frames of character',
    intro: 'Hand-finished acetate and precision lenses — eyewear that changes how the world sees you.',
    video: 'assets/videos/sunglasses.mp4', // TODO: drop in promo film
    tag: 'The Sunglasses Film',
  },
};

export const PRODUCTS = [
  // ---------------- Watches ----------------
  {
    id: 'w-aurum-chrono',
    name: 'Aurum Chronograph',
    category: 'watches',
    price: 4999, mrp: 6999,
    flag: 'Bestseller', featured: true, added: '2026-06-18',
    images: ['assets/products/watch-1.jpg'],
    description: 'A commanding 42mm chronograph with a brushed bronze bezel, sapphire-coated glass and a supple leather strap. Built for boardrooms and celebrations alike.',
    attrs: { Case: '42mm stainless steel', Glass: 'Sapphire-coated', Movement: 'Quartz chronograph', Strap: 'Genuine leather', 'Water Resistance': '5 ATM' },
  },
  {
    id: 'w-noir-heritage',
    name: 'Noir Heritage Automatic',
    category: 'watches',
    price: 7499, mrp: 9499,
    flag: 'New', featured: true, added: '2026-07-02',
    images: ['assets/products/watch-2.jpg'],
    description: 'Matte-black dial, gold indices and an exhibition case-back revealing the automatic heart within. Understated, and unmistakably premium.',
    attrs: { Case: '40mm matte black', Glass: 'Mineral crystal', Movement: 'Automatic', Strap: 'Milanese mesh', 'Water Resistance': '3 ATM' },
  },
  {
    id: 'w-regal-gold',
    name: 'Regal Gold Classic',
    category: 'watches',
    price: 5999, mrp: 7999,
    flag: '', featured: false, added: '2026-05-11',
    images: ['assets/products/watch-3.jpg'],
    description: 'A timeless gold-tone dress watch with a slim profile and sunburst dial — the finishing note for formal evenings.',
    attrs: { Case: '38mm gold-tone', Glass: 'Hardened mineral', Movement: 'Quartz', Strap: 'Gold-tone bracelet', 'Water Resistance': '3 ATM' },
  },
  {
    id: 'w-eclipse-gmt',
    name: 'Eclipse GMT',
    category: 'watches',
    price: 8999, mrp: 11999,
    flag: 'Limited', featured: true, added: '2026-06-28',
    images: ['assets/products/watch-4.jpg'],
    description: 'Dual-time functionality wrapped in a two-tone bronze case. For those whose ambitions cross time zones.',
    attrs: { Case: '43mm two-tone', Glass: 'Sapphire-coated', Movement: 'GMT quartz', Strap: 'Steel bracelet', 'Water Resistance': '10 ATM' },
  },
  {
    id: 'w-ivory-moon',
    name: 'Ivory Moonphase',
    category: 'watches',
    price: 6499, mrp: 8499,
    flag: '', featured: false, added: '2026-04-20',
    images: ['assets/products/watch-5.jpg'],
    description: 'A poetic moonphase complication on an ivory dial, paired with a deep-brown croc-pattern strap.',
    attrs: { Case: '41mm polished steel', Glass: 'Mineral crystal', Movement: 'Quartz moonphase', Strap: 'Croc-pattern leather', 'Water Resistance': '3 ATM' },
  },
  {
    id: 'w-onyx-sport',
    name: 'Onyx Sport Diver',
    category: 'watches',
    price: 5499, mrp: 7299,
    flag: '', featured: false, added: '2026-03-15',
    images: ['assets/products/watch-6.jpg'],
    description: 'A rugged diver with unidirectional bezel, luminous markers and 200m water resistance — luxury that performs.',
    attrs: { Case: '44mm black PVD', Glass: 'Sapphire-coated', Movement: 'Quartz', Strap: 'Silicone sport', 'Water Resistance': '20 ATM' },
  },

  // ---------------- Perfumes ----------------
  {
    id: 'p-oud-royale',
    name: 'Oud Royale',
    category: 'perfumes',
    price: 1899, mrp: 2499,
    flag: 'Bestseller', featured: true, added: '2026-06-10',
    images: ['assets/products/perfume-1.jpg'],
    description: 'Smoked oud, amber resin and a whisper of saffron. A regal oriental that announces itself without a word. 100ml EDP.',
    attrs: { Size: '100ml EDP', Family: 'Oriental Woody', Notes: 'Oud, amber, saffron', Longevity: '8–10 hours' },
  },
  {
    id: 'p-amber-noir',
    name: 'Amber Noir',
    category: 'perfumes',
    price: 1599, mrp: 1999,
    flag: '', featured: true, added: '2026-05-22',
    images: ['assets/products/perfume-2.jpg'],
    description: 'Golden amber wrapped in dark vanilla and tonka — warm, magnetic and made for after hours. 100ml EDP.',
    attrs: { Size: '100ml EDP', Family: 'Amber', Notes: 'Amber, vanilla, tonka', Longevity: '7–9 hours' },
  },
  {
    id: 'p-citrus-imperial',
    name: 'Citrus Imperial',
    category: 'perfumes',
    price: 1299, mrp: 1699,
    flag: 'New', featured: false, added: '2026-07-05',
    images: ['assets/products/perfume-3.jpg'],
    description: 'Sicilian bergamot, neroli and white musk — a crisp, aristocratic freshness for warm days. 100ml EDT.',
    attrs: { Size: '100ml EDT', Family: 'Citrus Aromatic', Notes: 'Bergamot, neroli, musk', Longevity: '5–7 hours' },
  },
  {
    id: 'p-velvet-rose',
    name: 'Velvet Rose Oud',
    category: 'perfumes',
    price: 2199, mrp: 2799,
    flag: 'Limited', featured: true, added: '2026-06-25',
    images: ['assets/products/perfume-4.jpg'],
    description: 'Damask rose folded into soft oud and patchouli — opulent, romantic, unforgettable. 75ml Extrait.',
    attrs: { Size: '75ml Extrait', Family: 'Floral Oriental', Notes: 'Rose, oud, patchouli', Longevity: '10+ hours' },
  },
  {
    id: 'p-musk-tahara',
    name: 'Musk Tahara',
    category: 'perfumes',
    price: 999, mrp: 1399,
    flag: '', featured: false, added: '2026-04-08',
    images: ['assets/products/perfume-5.jpg'],
    description: 'Pure white musk with a creamy, skin-like softness. Clean, intimate and endlessly wearable. 50ml.',
    attrs: { Size: '50ml', Family: 'Musk', Notes: 'White musk, cotton', Longevity: '6–8 hours' },
  },
  {
    id: 'p-leather-spice',
    name: 'Leather & Spice',
    category: 'perfumes',
    price: 1799, mrp: 2299,
    flag: '', featured: false, added: '2026-03-19',
    images: ['assets/products/perfume-6.jpg'],
    description: 'Tanned leather, cardamom and smoked cedar — a bold signature for the modern gentleman. 100ml EDP.',
    attrs: { Size: '100ml EDP', Family: 'Leather Spicy', Notes: 'Leather, cardamom, cedar', Longevity: '8–10 hours' },
  },

  // ---------------- Sunglasses ----------------
  {
    id: 's-aviator-royale',
    name: 'Aviator Royale',
    category: 'sunglasses',
    price: 1499, mrp: 1999,
    flag: 'Bestseller', featured: true, added: '2026-06-15',
    images: ['assets/products/sunglasses-1.jpg'],
    description: 'The eternal aviator, refined — gold frame, gradient bronze lenses and full UV400 protection.',
    attrs: { Frame: 'Gold alloy', Lens: 'Gradient bronze, UV400', Fit: 'Medium', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-noir-square',
    name: 'Noir Square',
    category: 'sunglasses',
    price: 1299, mrp: 1799,
    flag: '', featured: false, added: '2026-05-09',
    images: ['assets/products/sunglasses-2.jpg'],
    description: 'A bold matte-black square frame with smoke lenses — sharp lines, sharper impression.',
    attrs: { Frame: 'Matte acetate', Lens: 'Smoke, UV400', Fit: 'Medium–large', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-round-gold',
    name: 'Round Gold Vintage',
    category: 'sunglasses',
    price: 1399, mrp: 1899,
    flag: 'New', featured: true, added: '2026-07-01',
    images: ['assets/products/sunglasses-3.jpg'],
    description: 'Slim gold rounds with bottle-green lenses — vintage soul, contemporary finish.',
    attrs: { Frame: 'Gold metal', Lens: 'Green, UV400', Fit: 'Small–medium', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-tortoise-club',
    name: 'Tortoise Clubmaster',
    category: 'sunglasses',
    price: 1599, mrp: 2099,
    flag: '', featured: false, added: '2026-04-14',
    images: ['assets/products/sunglasses-4.jpg'],
    description: 'Honey-tortoise acetate with brass detailing and warm brown lenses. A scholar’s classic.',
    attrs: { Frame: 'Tortoise acetate', Lens: 'Brown, UV400', Fit: 'Medium', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-midnight-cat',
    name: 'Midnight Cat-Eye',
    category: 'sunglasses',
    price: 1349, mrp: 1799,
    flag: '', featured: false, added: '2026-03-27',
    images: ['assets/products/sunglasses-5.jpg'],
    description: 'A sculpted cat-eye in glossy black with gradient grey lenses — effortless drama.',
    attrs: { Frame: 'Gloss acetate', Lens: 'Gradient grey, UV400', Fit: 'Medium', Includes: 'Hard case & cloth' },
  },
  {
    id: 's-onyx-shield',
    name: 'Onyx Shield',
    category: 'sunglasses',
    price: 1699, mrp: 2299,
    flag: 'Limited', featured: false, added: '2026-06-30',
    images: ['assets/products/sunglasses-6.jpg'],
    description: 'A single-lens shield silhouette with mirrored bronze finish — sport-luxury at its boldest.',
    attrs: { Frame: 'Black composite', Lens: 'Mirrored bronze, UV400', Fit: 'Large', Includes: 'Hard case & cloth' },
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
