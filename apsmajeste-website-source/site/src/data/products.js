/* ============================================================
   APS MAJESTE — Product catalog (single source of truth)
   Used by products.html, product.html, and structured data.
   ============================================================ */

export const PRODUCTS = [
  {
    slug: 'rose-damascena-elixir',
    name: 'Rose Damascena Elixir',
    category: 'Serum',
    categorySlug: 'serums',
    price: 128,
    size: '30 ml',
    tag: 'Bestseller',
    bg: 'rose',
    short: 'A concentrated botanical serum cold-pressed from Bulgarian Rosa damascena petals to visibly renew radiance.',
    description:
      'A concentrated botanical serum crafted in small batches from Bulgarian Rosa damascena petals harvested at dawn. Cold-pressed within hours of picking, this elixir preserves the full spectrum of the rose’s active compounds — polyphenols, flavonoids, and a natural retinoid alternative — to visibly renew radiance, soften fine lines, and restore the skin’s lipid barrier. Lightweight and fast-absorbing, it layers seamlessly under moisturizer and makeup, leaving a delicate, true-rose scent that dissipates within minutes.',
    benefits: [
      'Visibly improves radiance and even tone within 4 weeks',
      'Cold-pressed to preserve 200+ active botanical compounds',
      'Suitable for sensitive, mature, and post-treatment skin',
      'Vegan, cruelty-free, and free from synthetic fragrance',
    ],
    ingredients: [
      'Rosa Damascena Flower Oil (Bulgarian Rose)',
      'Rosa Canina Fruit Oil (Rosehip)',
      'Squalane (Olive-derived)',
      'Tocopherol (Vitamin E)',
      'Bakuchiol',
    ],
    usage:
      'Apply 3–4 drops to clean, dry skin morning and evening. Press gently into the face, neck, and décolletage. Follow with moisturizer and SPF during the day.',
    pairings: ['hydra-veil-moisturizer', 'jasmine-night-recovery'],
    rating: 4.9,
    reviews: 1284,
  },
  {
    slug: 'jasmine-night-recovery',
    name: 'Jasmine Night Recovery Oil',
    category: 'Facial Oil',
    categorySlug: 'oils',
    price: 142,
    size: '30 ml',
    tag: 'New',
    bg: 'amber',
    short: 'An overnight facial oil blending jasmine, marula, and camellia to repair, soften, and replenish the skin barrier.',
    description:
      'A luxurious overnight facial oil designed to work in synergy with the skin’s natural repair cycle. Jasmine absolute, cold-pressed marula, and camellia seed oils deliver a concentrated dose of omega fatty acids 3, 6, and 9, while bisabolol calms visible redness. Wake to skin that feels supple, replenished, and quietly luminous — never greasy.',
    benefits: [
      'Supports overnight barrier repair and moisture retention',
      'Reduces the appearance of redness and stress fatigue',
      'Non-comedogenic and suitable for all skin types',
      'Hand-blended in Provence in batches of 200',
    ],
    ingredients: [
      'Squalane (Olive-derived)',
      'Jasminum Grandiflorum Flower Extract',
      'Marula Oil (Sclerocarya Birrea)',
      'Camellia Oleifera Seed Oil',
      'Bisabolol (Chamomile-derived)',
    ],
    usage:
      'Warm 4–5 drops between palms and press into clean skin as the final step of your evening routine. Use nightly or as a weekly intensive treatment.',
    pairings: ['rose-damascena-elixir', 'neroli-radiance-face-wash'],
    rating: 4.8,
    reviews: 642,
  },
  {
    slug: 'neroli-radiance-face-wash',
    name: 'Neroli Radiance Face Wash',
    category: 'Face Wash',
    categorySlug: 'cleansers',
    price: 58,
    size: '150 ml',
    tag: 'New',
    bg: 'sage',
    short: 'A gentle gel face wash that lifts impurities and excess oil without stripping, leaving skin balanced and softly luminous.',
    description:
      'A gentle gel-to-foam face wash formulated for daily use on all skin types. Neroli and green tea extracts calm and brighten, while a mild amino-acid surfactant derived from coconut lifts impurities, makeup, and excess oil without disrupting the skin’s moisture barrier. Skin feels clean, soft, and comfortably balanced — never tight or squeaky. Subtle neroli aroma turns a daily habit into a small ritual.',
    benefits: [
      'pH-balanced (5.5) to protect the skin’s acid mantle',
      'Removes makeup, SPF, and excess oil in one cleanse',
      'Sulfate-free, soap-free, and non-stripping',
      'Suitable for morning and evening use on all skin types',
    ],
    ingredients: [
      'Aqua (Water)',
      'Cocamidopropyl Betaine (Coconut-derived)',
      'Sodium Lauroyl Glutamate (Amino-acid surfactant)',
      'Citrus Aurantium (Neroli) Flower Water',
      'Camellia Sinensis (Green Tea) Leaf Extract',
      'Glycerin',
      'Panthenol (Provitamin B5)',
    ],
    usage:
      'Massage a pea-sized amount onto damp skin in circular motions for 30 seconds. Rinse thoroughly with lukewarm water. Use morning and evening. Follow with serum and moisturizer.',
    pairings: ['rose-damascena-elixir', 'hydra-veil-moisturizer'],
    rating: 4.8,
    reviews: 389,
  },
  {
    slug: 'hydra-veil-moisturizer',
    name: 'Hydra Veil Moisturizer',
    category: 'Moisturizer',
    categorySlug: 'moisturizers',
    price: 94,
    size: '50 ml',
    tag: 'Bestseller',
    bg: 'cream',
    short: 'A weightless gel-cream moisturizer with hyaluronic acid and glycerin for 48-hour hydration.',
    description:
      'A weightless gel-cream moisturizer engineered for 48-hour hydration without weight or shine. Triple-weight hyaluronic acid draws moisture into every layer of the skin, while glycerin and panthenol seal it in. The result is a dewy, smooth canvas that wears beautifully under makeup or alone — perfect for normal, combination, and oily skin types.',
    benefits: [
      'Provides 48-hour continuous hydration in clinical testing',
      'Lightweight gel-cream texture absorbs in seconds',
      'Non-comedogenic and oil-free',
      'Layered hyaluronic acid for surface and deep hydration',
    ],
    ingredients: [
      'Aqua (Water)',
      'Glycerin',
      'Sodium Hyaluronate (3 molecular weights)',
      'Panthenol (Provitamin B5)',
      'Niacinamide',
    ],
    usage:
      'Apply a pea-sized amount to clean skin morning and evening, after serum and before SPF. Layer generously in dry climates.',
    pairings: ['rose-damascena-elixir', 'jasmine-night-recovery'],
    rating: 4.7,
    reviews: 968,
  },
  {
    slug: 'amber-oud-eau-de-parfum',
    name: 'Amber Oud Eau de Parfum',
    category: 'Perfume',
    categorySlug: 'fragrances',
    price: 215,
    size: '50 ml',
    tag: 'Signature',
    bg: 'noir',
    short: 'A warm, resinous eau de parfum blending oud, amber, and sandalwood for a long-lasting sillage.',
    description:
      'A warm, resinous eau de parfum that opens with bergamot and pink pepper, settles into the smoky depth of Indian oud and Indonesian sandalwood, and dries down to a soft, golden amber. Composed at 22% concentration for exceptional sillage and longevity. Each bottle is hand-finished and numbered in our Provence atelier.',
    benefits: [
      'High 22% fragrance concentration for 10+ hour wear',
      'Layered composition with 18 natural and nature-identical ingredients',
      'Unisex — designed to evolve uniquely on each wearer',
      'Refillable 50ml flacon with weighted glass and brass cap',
    ],
    ingredients: [
      'Alcohol Denat.',
      'Parfum (Fragrance)',
      'Bergamot Oil',
      'Oud Oil (Agarwood)',
      'Sandalwood Oil',
      'Amber Absolute',
    ],
    usage:
      'Spritz onto pulse points — wrists, neck, behind the ears — from a distance of 6 inches. Do not rub. Reapply as desired.',
    pairings: ['santal-blush-body-oil', 'velvet-noir-eau-de-parfum'],
    rating: 4.9,
    reviews: 312,
  },
  {
    slug: 'velvet-noir-eau-de-parfum',
    name: 'Velvet Noir Eau de Parfum',
    category: 'Perfume',
    categorySlug: 'fragrances',
    price: 225,
    size: '50 ml',
    tag: 'New',
    bg: 'noir',
    short: 'A sensual floral-oriental perfume weaving black rose, incense, and vanilla bourbon into an unmistakable signature.',
    description:
      'A sensual floral-oriental eau de parfum that opens with black pepper and bergamot, blooms into a heart of black rose and incense, and settles into a warm base of vanilla bourbon, tonka, and musk. Composed at 24% concentration for depth and staying power. Velvet Noir is the more nocturnal companion to Amber Oud — designed for evenings that linger.',
    benefits: [
      '24% fragrance concentration for 12+ hour wear',
      'Built around rare black rose absolute from Turkey',
      'Refillable 50ml flacon with weighted glass and brass cap',
      'Hand-finished and numbered in our Provence atelier',
    ],
    ingredients: [
      'Alcohol Denat.',
      'Parfum (Fragrance)',
      'Black Rose Absolute',
      'Bergamot Oil',
      'Olibanum (Incense) Resin',
      'Vanilla Bourbon Extract',
      'Tonka Bean Absolute',
    ],
    usage:
      'Spritz onto pulse points — wrists, neck, behind the ears — from a distance of 6 inches. Do not rub. Layer over Santal Blush Body Oil for added depth.',
    pairings: ['santal-blush-body-oil', 'amber-oud-eau-de-parfum'],
    rating: 4.9,
    reviews: 187,
  },
  {
    slug: 'santal-blush-body-oil',
    name: 'Santal Blush Body Oil',
    category: 'Body',
    categorySlug: 'body',
    price: 88,
    size: '150 ml',
    tag: '',
    bg: 'blush',
    short: 'A dry-touch body oil infused with sandalwood and rosehip to nourish skin and leave a soft veil of scent.',
    description:
      'A fast-absorbing dry-touch body oil that nourishes the skin with a blend of sandalwood, rosehip, and jojoba oils. Lightweight yet deeply moisturizing, it leaves a soft, satin finish and a delicate, lingering warmth — a quiet luxury for everyday ritual.',
    benefits: [
      'Absorbs in under 60 seconds with no greasy residue',
      'Rich in omega 3, 6, and 9 for skin elasticity',
      'Subtle scent layers beautifully with our perfumes',
      'Recyclable glass bottle with pump dispenser',
    ],
    ingredients: [
      'Simmondsia Chinensis (Jojoba) Seed Oil',
      'Rosa Canina (Rosehip) Fruit Oil',
      'Santalum Album (Sandalwood) Oil',
      'Tocopherol (Vitamin E)',
      'Caprylic/Capric Triglyceride',
    ],
    usage:
      'Massage onto damp skin after showering to lock in moisture. Allow 60 seconds to absorb before dressing.',
    pairings: ['amber-oud-eau-de-parfum', 'velvet-noir-eau-de-parfum'],
    rating: 4.8,
    reviews: 274,
  },
];

export const CATEGORIES = [
  { slug: 'all', label: 'All' },
  { slug: 'serums', label: 'Serums' },
  { slug: 'oils', label: 'Facial Oils' },
  { slug: 'cleansers', label: 'Face Wash' },
  { slug: 'moisturizers', label: 'Moisturizers' },
  { slug: 'fragrances', label: 'Perfumes' },
  { slug: 'body', label: 'Body' },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function formatPrice(value) {
  return `$${value.toFixed(0)}`;
}
