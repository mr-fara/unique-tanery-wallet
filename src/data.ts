import { Product } from './types';

// Fallback image shown automatically if any single photo ID is ever retired.
// Use it as the `onError` target on your <img> tags:
//   <img src={color.imageUrl} onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)} />
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000';

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
      { name: 'Noir (Black)', hex: '#1a1a1a', imageUrl: 'https://i.pinimg.com/736x/47/5b/ed/475bed595da5fe9802fcf2f3bacabb3c.jpg', desc: 'Sleek, deep black dyed-through box calfskin with a subtle semi-gloss luster.' },
      { name: 'Gold (Tan)', hex: '#a67246', imageUrl: 'https://i.pinimg.com/736x/9d/8f/13/9d8f137959ec2e443a1a953900ffa6d4.jpg', desc: 'Warm amber-caramel tan, the classic color of luxury saddle-craft.' },
      { name: 'Rouge Sellier', hex: '#63251e', imageUrl: 'https://i.pinimg.com/736x/0a/34/c3/0a34c32d527f5683c0726bcc7ee743e8.jpg', desc: 'A rich, deep burgundy with chocolate undertones.' },
      { name: 'Vert Olive', hex: '#4d5c41', imageUrl: 'https://i.pinimg.com/736x/1b/82/3c/1b823cb4d2e913667a0cd6ca6ea82747.jpg', desc: 'A sophisticated mossy green with warm earth tones.' }
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
      { name: 'Gold (Tan)', hex: '#a67246', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000', desc: 'Natural gold tan, showcasing the authentic grain and character of Barenia.' },
      { name: 'Ébène (Dark Brown)', hex: '#3d2516', imageUrl: 'https://i.pinimg.com/736x/95/eb/08/95eb082ed6fd755c2fdbed0b167556c3.jpg', desc: 'A rich espresso tone, deep and highly sophisticated.' },
      { name: 'Bleu Saphir', hex: '#1d2a45', imageUrl: 'https://i.pinimg.com/736x/6f/44/66/6f4466940370804c49cfa8dd4e7acc09.jpg', desc: 'A midnight navy blue that reflects light beautifully.' }
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
      { name: 'Ebene Brown', hex: '#543b2b', imageUrl: 'https://i.pinimg.com/1200x/9d/5f/ed/9d5fedc2cf882852f2143373af569b32.jpg', desc: 'Warm mahogany alligator skin with hand-painted dark brown edges.' },
      { name: 'Noir Éclat', hex: '#111111', imageUrl: 'https://i.pinimg.com/1200x/76/1e/20/761e204742c9470b06859f88aceb82a7.jpg', desc: 'Lustrous, deep matte black with sharp tonal hand-stitching.' },
      { name: 'Cognac Gold', hex: '#be814e', imageUrl: 'https://i.pinimg.com/1200x/3c/ad/48/3cad48f7247e5c5b45778f5a37db72ef.jpg', desc: 'Bright, vibrant cognac honey color highlighting the rich scale texture.' }
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
      { name: 'Signature Gold', hex: '#be814e', imageUrl: 'https://i.pinimg.com/1200x/d6/67/bd/d667bdb3eee784b778b9a949cb73d581.jpg', desc: 'Bright marigold tan with a beautiful cross-grain Epsom texture.' },
      { name: 'Hermes Orange', hex: '#d9531e', imageUrl: 'https://i.pinimg.com/736x/e9/64/ab/e964ab319f0af4a02e86a3884b298f34.jpg', desc: 'A vibrant, spirited orange that radiates luxury and character.' },
      { name: 'Bleu Indigo', hex: '#181e2b', imageUrl: 'https://i.pinimg.com/736x/dc/d1/94/dcd1946f28acceb6b126051002a6e3d5.jpg', desc: 'An almost-black deep indigo blue that is understated and modern.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: true
  },
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
      { name: 'Taupe Grise', hex: '#8b8478', imageUrl: 'https://i.pinimg.com/1200x/37/93/37/379337d30ebdcdcaa010779533741187.jpg', desc: 'An elegant warm grey-beige, extremely versatile and classic.' },
      { name: 'Noir (Black)', hex: '#1a1a1a', imageUrl: 'https://i.pinimg.com/1200x/92/1d/50/921d50f4ce622fd69bd2c16a9840e662.jpg', desc: 'Pebbled black Togo leather with silver palladium accents.' },
      { name: 'Rose Azalée', hex: '#d9788e', imageUrl: 'https://i.pinimg.com/736x/69/e0/f4/69e0f4c736e8cdeeaa101ae999ec7f1e.jpg', desc: 'A vibrant, romantic soft raspberry pink.' }
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
      { name: 'Bleu Nuit', hex: '#1e2433', imageUrl: 'https://i.pinimg.com/1200x/6d/48/be/6d48be1f75faa79b4b351d60ba305226.jpg', desc: 'An incredibly rich, deep night blue goatskin with subtle luster.' },
      { name: 'Vert Cyprès', hex: '#233827', imageUrl: 'https://i.pinimg.com/736x/27/e2/da/27e2dab341e584d678ef782d16e2b669.jpg', desc: 'A deep, mysterious forest-cypress green.' },
      { name: 'Gold (Tan)', hex: '#a67246', imageUrl: 'https://i.pinimg.com/736x/48/ba/f7/48baf78aee0abb04f8127ef7a7316a40.jpg', desc: 'Hand-finished honey tan showing the natural pebbled chevre grain.' }
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: false
  }
];

export const HERO_VIDEO_ALT = 'https://images.unsplash.com/photo-1473188588955-719acbf43f47?auto=format&fit=crop&q=80&w=1600';

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
    description: 'We only source full-grain, first-grade hides from historical tanneries in France and Italy. Every hide is inspected under warm light for grain consistency, structure, and tensile strength.',
    actionName: 'Feel the Textures',
    imageUrl: 'https://i.pinimg.com/736x/24/ca/4a/24ca4a1eb6f5722cf68afea4d981de2f.jpg',
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
    description: 'Using heavy steel paperweights and ultra-sharp half-moon knives, our artisans cut each leather piece individually. No automated lasers, no mass stamp-cutters.',
    actionName: 'Simulate the Cut',
    imageUrl: 'https://i.pinimg.com/1200x/4f/54/82/4f548209ae13d7f6b875e177a11f3231.jpg',
    interactives: []
  },
  {
    id: 'saddle-stitching',
    stepNumber: '03',
    title: 'The Saddle Stitch',
    subtitle: 'La Couture Sellier',
    description: 'The pinnacle of leather craftsmanship. We punch stitching holes at 8 to 10 stitches per inch using an angled pricking iron. This forms an indestructible diagonal slant.',
    actionName: 'Try the Hand-Stitch',
    imageUrl: 'https://i.pinimg.com/736x/5a/5f/7a/5a5f7afcf63834b9ff4d11630d26364a.jpg',
    interactives: []
  },
  {
    id: 'edge-burnishing',
    stepNumber: '04',
    title: 'Edge Painting & Polishing',
    subtitle: 'Le Bichonnage des Tranches',
    description: 'Raw leather edges are sensitive to moisture and wear. We apply up to 5 individual layers of custom-blended matte edge paint for a glass-like finish.',
    actionName: 'Polish the Edge',
    imageUrl: 'https://i.pinimg.com/1200x/5f/eb/88/5feb888adf18004420f7286fe214e781.jpg',
    interactives: []
  }
];