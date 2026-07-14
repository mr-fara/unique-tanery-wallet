import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'tany-atelier-handbag',
    name: 'The Atelier Handbag',
    category: 'bags',
    price: 1850,
    leatherType: 'Full-Grain Box Calfskin',
    description: 'A masterpiece of architectural symmetry. Hand-cut and saddle-stitched by a single artisan, featuring an elegant structured handle and gold-gilded custom-turn lock.',
    story: 'Inspired by the equestrian saddlebags of the French countryside, this handbag represents 40 hours of meticulous hand-stitching. The leather is sourced from a historic family-run tannery in Alsace, treated with natural oils to develop a rich, personal patina over a lifetime.',
    dimensions: 'H 8.5" x W 11" x D 4.5"',
    colors: [
      { name: 'Noir (Black)', hex: '#1a1a1a', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'Sleek, deep black dyed-through box calfskin with a subtle semi-gloss luster.' },
      { name: 'Gold (Tan)', hex: '#a67246', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'Warm amber-caramel tan, the classic color of luxury saddle-craft.' },
      { name: 'Rouge Sellier', hex: '#63251e', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'A rich, deep burgundy with chocolate undertones.' },
      { name: 'Vert Olive', hex: '#4d5c41', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'A sophisticated mossy green with warm earth tones.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    hardwareOptions: ['Solid Brushed Brass (Gold)', 'Polished Palladium (Silver)', 'Blind Debossed'],
    isBestseller: true
  },
  {
    id: 'tany-signature-wallet',
    name: 'Tany Signature Bifold Wallet',
    category: 'wallets',
    price: 380,
    leatherType: 'Vegetable-Tanned Barenia Leather',
    description: 'A classic bifold wallet constructed using a seamless single-panel shell. Entirely saddle-stitched using waxed French linen thread with hand-burnished edges.',
    story: 'Barenia leather is legendary for its raw elegance. It is double-tanned in chrome and bark, then soaked in a bath of six different oils. This process ensures the leather is resistant to scratches; minor scuffs can be buffed out with a simple swipe of a finger, making this wallet an heirloom piece.',
    dimensions: 'H 3.6" x W 4.5" x D 0.4" (closed)',
    colors: [
      { name: 'Gold (Tan)', hex: '#a67246', imageUrl: '/src/assets/images/wallet_premium_1783975856197.jpg', desc: 'Natural gold tan, showcasing the authentic grain and character of Barenia.' },
      { name: 'Ébène (Dark Brown)', hex: '#3d2516', imageUrl: '/src/assets/images/wallet_premium_1783975856197.jpg', desc: 'A rich espresso tone, deep and highly sophisticated.' },
      { name: 'Bleu Saphir', hex: '#1d2a45', imageUrl: '/src/assets/images/wallet_premium_1783975856197.jpg', desc: 'A midnight navy blue that reflects light beautifully.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: true
  },
  {
    id: 'tany-classic-watch-strap',
    name: 'Classic Alligator Watch Strap',
    category: 'watch-straps',
    price: 240,
    leatherType: 'Genuine Matte Alligator & French Zermatt Lining',
    description: 'Tailored watch strap with a tapered silhouette and elegant padding. Lined with hypoallergenic Zermatt leather to resist sweat and moisture while offering pillow-soft comfort.',
    story: 'Each scale of our alligator leather is hand-glazed and selected for symmetrical patterns. We employ the historical "saddle-stitch" which uses two needles on a single piece of thread, ensuring that even if one loop wears down, the rest of the stitching remains fully intact.',
    dimensions: 'Lengths: 115mm / 75mm | Widths available: 18mm, 19mm, 20mm, 21mm, 22mm',
    colors: [
      { name: 'Ebene Brown', hex: '#543b2b', imageUrl: '/src/assets/images/watch_strap_premium_1783975869802.jpg', desc: 'Warm mahogany alligator skin with hand-painted dark brown edges.' },
      { name: 'Noir Éclat', hex: '#111111', imageUrl: '/src/assets/images/watch_strap_premium_1783975869802.jpg', desc: 'Lustrous, deep matte black with sharp tonal hand-stitching.' },
      { name: 'Cognac Gold', hex: '#be814e', imageUrl: '/src/assets/images/watch_strap_premium_1783975869802.jpg', desc: 'Bright, vibrant cognac honey color highlighting the rich scale texture.' }
    ],
    sizes: ['18mm Lug Width', '19mm Lug Width', '20mm Lug Width', '21mm Lug Width', '22mm Lug Width'],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    hardwareOptions: ['Solid Yellow Gold buckle', 'Polished Silver Steel buckle'],
    isBestseller: false
  },
  {
    id: 'tany-premium-giftset',
    name: 'Epsom Cardholder & Key Fob Gift Set',
    category: 'gifts',
    price: 450,
    leatherType: 'Embossed Epsom Calfskin',
    description: 'The ultimate bespoke pairing. Features our multi-slot minimalist cardholder and a solid brass rivet-pinned key fob, beautifully presented in a handmade signature orange box.',
    story: 'Epsom leather is highly appreciated for its rigid, scratch-resistant embossed surface. It holds its vibrant dye colors with unmatched intensity and easily resists water spots. This gift set can be hot-stamped with personalized initials in 24k gold leaf, silver leaf, or blind debossed.',
    dimensions: 'Cardholder: H 2.9" x W 4.1" | Key Fob: L 4.2"',
    colors: [
      { name: 'Signature Gold', hex: '#be814e', imageUrl: '/src/assets/images/gift_set_premium_1783975896862.jpg', desc: 'Bright marigold tan with a beautiful cross-grain Epsom texture.' },
      { name: 'Hermes Orange', hex: '#d9531e', imageUrl: '/src/assets/images/gift_set_premium_1783975896862.jpg', desc: 'A vibrant, spirited orange that radiates luxury and character.' },
      { name: 'Bleu Indigo', hex: '#181e2b', imageUrl: '/src/assets/images/gift_set_premium_1783975896862.jpg', desc: 'An almost-black deep indigo blue that is understated and modern.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: true
  },
  // Additional Premium Items to complete the grid beautifully
  {
    id: 'tany-envelope-clutch',
    name: 'The Envelope Clutch',
    category: 'bags',
    price: 950,
    leatherType: 'Pliable Togo Calfskin',
    description: 'An elegant evening clutch designed as a single folded hide. Secured with an artisanal strap slide closure, showing no visible stitching on the outer perimeter.',
    story: 'Togo leather is a naturally drummed, supple calfskin with a beautiful pebbled grain. It is incredibly soft to the touch but holds its slouchy structured shape. The interior is lined with matching fine lambskin for an ultra-premium sensory experience.',
    dimensions: 'H 6.2" x W 9.5" x D 1.0"',
    colors: [
      { name: 'Taupe Grise', hex: '#8b8478', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'An elegant warm grey-beige, extremely versatile and classic.' },
      { name: 'Noir (Black)', hex: '#1a1a1a', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'Pebbled black Togo leather with silver palladium accents.' },
      { name: 'Rose Azalée', hex: '#d9788e', imageUrl: '/src/assets/images/handbag_premium_1783975882249.jpg', desc: 'A vibrant, romantic soft raspberry pink.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    hardwareOptions: ['Solid Brushed Brass (Gold)', 'Polished Palladium (Silver)'],
    isBestseller: false
  },
  {
    id: 'tany-slim-cardholder',
    name: 'Minimalist Slim Cardholder',
    category: 'wallets',
    price: 180,
    leatherType: 'French Chevre (Goatskin)',
    description: 'Our thinnest cardholder, designed with 4 hand-chamfered credit card slots and a central slip pocket for cash, lined in silk-faille.',
    story: 'Chevre leather is made from mountain goats, which naturally produces an exceptionally durable, scratch-resistant grain that is lighter and stronger than cowhide. The edges are heated and polished with beeswax 5 times to form a flawless edge.',
    dimensions: 'H 2.7" x W 3.9" x D 0.15"',
    colors: [
      { name: 'Bleu Nuit', hex: '#1e2433', imageUrl: '/src/assets/images/wallet_premium_1783975856197.jpg', desc: 'An incredibly rich, deep night blue goatskin with subtle luster.' },
      { name: 'Vert Cyprès', hex: '#233827', imageUrl: '/src/assets/images/wallet_premium_1783975856197.jpg', desc: 'A deep, mysterious forest-cypress green.' },
      { name: 'Gold (Tan)', hex: '#a67246', imageUrl: '/src/assets/images/wallet_premium_1783975856197.jpg', desc: 'Hand-finished honey tan showing the natural pebbled chevre grain.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: false
  }
];

export const HERO_VIDEO_ALT = '/src/assets/images/hero_leather_craft_1783975841486.jpg';

export const BRAND_STORY = {
  quote: "Craft is not about speed. It is about an absolute commitment to longevity. A stitch made by hand is a promise between the artisan and the leather.",
  philosophy: "At Unique Tany, we do not believe in mass production. Our atelier in the heart of the valley operates on the slow-craft philosophy. Each piece of leather is individually hand-selected, hand-cut, and sewn using the ancient saddle-stitching technique. This process requires two needles threaded on opposite ends of a single piece of wax-coated French linen thread, passing back and forth through every hand-punched hole. While a machine stitch unravels if a single thread breaks, our saddle stitches lock in place, ensuring your accessory endures for generations.",
  artisan: "Our small team of master leather-smiths have honed their craft over decades. From the meticulous edge-painting to the customized monogram hot-stamping, we celebrate leather as a living material that tells your unique story."
};

export const ATELIER_STEPS = [
  {
    id: 'hide-selection',
    stepNumber: '01',
    title: 'Selection of the Hides',
    subtitle: 'La Matière Première',
    description: 'We only source full-grain, first-grade hides from historical tanneries in France and Italy. Every hide is inspected under warm light for grain consistency, structure, and tensile strength. We use Barenia, Epsom, Togo, and fine Chevre goatskins, each chosen for its exceptional texture and ability to develop a glorious, rich patina over time.',
    actionName: 'Feel the Textures',
    interactives: [
      { name: 'Barenia', textureType: 'Smooth, oily, self-healing, raw elegance', color: '#a67246', zoomScale: 'smooth' },
      { name: 'Epsom', textureType: 'Embossed cross-grain, rigid, scratch-resistant', color: '#be814e', zoomScale: 'grainy' },
      { name: 'Togo', textureType: 'Naturally pebbled calfskin, soft, slouchy texture', color: '#8b8478', zoomScale: 'pebbled' },
      { name: 'Chevre', textureType: 'Fine mountain goatskin, extremely lightweight and durable', color: '#1e2433', zoomScale: 'fine' }
    ]
  },
  {
    id: 'hand-cutting',
    stepNumber: '02',
    title: 'Pattern Hand-Cutting',
    subtitle: 'Le Tracé et la Coupe',
    description: 'Using heavy steel paperweights and ultra-sharp half-moon knives (l’indispensable), our artisans cut each leather piece individually. No automated lasers, no mass stamp-cutters. This allows the artisan to avoid any natural growth marks or weaker fiber zones in the hide, aligning the grain patterns perfectly across the finished wallet or handbag.',
    actionName: 'Simulate the Cut',
    interactives: []
  },
  {
    id: 'saddle-stitching',
    stepNumber: '03',
    title: 'The Saddle Stitch',
    subtitle: 'La Couture Sellier',
    description: 'The pinnacle of leather craftsmanship. We punch stitching holes at 8 to 10 stitches per inch using an angled pricking iron. Using a wooden sewing clamp held between the knees, the artisan passes a single waxed linen thread back and forth using two needles. This forms an elegant diagonal slant that is as structurally indestructible as it is visually iconic.',
    actionName: 'Try the Hand-Stitch',
    interactives: []
  },
  {
    id: 'edge-burnishing',
    stepNumber: '04',
    title: 'Edge Painting & Polishing',
    subtitle: 'Le Bichonnage des Tranches',
    description: 'Raw leather edges are sensitive to moisture and wear. We apply up to 5 individual layers of custom-blended matte edge paint. Between each coat, the edge is heated with a hot creaser, sanded flat, and hand-rubbed with beeswax and a bone folder. This seals the edge into a glass-like, rounded finish that will never peel or crack.',
    actionName: 'Polish the Edge',
    interactives: []
  }
];
