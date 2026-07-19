import { Product } from './types';

// ──────────────────────────────────────────────────────────
// Fallback image (used if any single photo ID is retired)
// Usage: <img src={color.imageUrl} onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)} />
// ──────────────────────────────────────────────────────────
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000';

// ──────────────────────────────────────────────────────────
// PRODUCTS
// ──────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: 'tany-atelier-handbag',
    name: 'The Atelier Handbag',
    category: 'bags',
    price: 1850,
    leatherType: 'Full-Grain Box Calfskin',
    description:
      'A masterpiece of architectural symmetry. Hand-cut and saddle-stitched by a single artisan, featuring an elegant structured handle and gold-gilded custom-turn lock.',
    story:
      'Inspired by the equestrian saddlebags of the French countryside, this handbag represents 40 hours of meticulous hand-stitching. The leather is sourced from a historic family-run tannery in Alsace, treated with natural oils to develop a rich, personal patina over a lifetime.',
    dimensions: 'H 8.5" x W 11" x D 4.5"',
    colors: [
      {
        name: 'Noir (Black)',
        hex: '#1a1a1a',
        imageUrl:
          'https://i.pinimg.com/736x/47/5b/ed/475bed595da5fe9802fcf2f3bacabb3c.jpg',
        desc: 'Sleek, deep black dyed-through box calfskin with a subtle semi-gloss luster.',
      },
      {
        name: 'Gold (Tan)',
        hex: '#a67246',
        imageUrl:
          'https://i.pinimg.com/736x/9d/8f/13/9d8f137959ec2e443a1a953900ffa6d4.jpg',
        desc: 'Warm amber-caramel tan, the classic color of luxury saddle-craft.',
      },
      {
        name: 'Rouge Sellier',
        hex: '#63251e',
        imageUrl:
          'https://i.pinimg.com/736x/0a/34/c3/0a34c32d527f5683c0726bcc7ee743e8.jpg',
        desc: 'A rich, deep burgundy with chocolate undertones.',
      },
      {
        name: 'Vert Olive',
        hex: '#4d5c41',
        imageUrl:
          'https://i.pinimg.com/736x/1b/82/3c/1b823cb4d2e913667a0cd6ca6ea82747.jpg',
        desc: 'A sophisticated mossy green with warm earth tones.',
      },
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    hardwareOptions: [
      'Solid Brushed Brass (Gold)',
      'Polished Palladium (Silver)',
      'Blind Debossed',
    ],
    isBestseller: true,
  },
  {
    id: 'tany-signature-wallet',
    name: 'Tany Signature Bifold Wallet',
    category: 'wallets',
    price: 380,
    leatherType: 'Vegetable-Tanned Barenia Leather',
    description:
      'A classic bifold wallet constructed using a seamless single-panel shell. Entirely saddle-stitched using waxed French linen thread with hand-burnished edges.',
    story:
      'Barenia leather is legendary for its raw elegance. It is double-tanned in chrome and bark, then soaked in a bath of six different oils. This process ensures the leather is resistant to scratches; minor scuffs can be buffed out with a simple swipe of a finger, making this wallet an heirloom piece that develops a magnificent patina.',
    dimensions: 'H 3.6" x W 4.5" x D 0.4" (closed)',
    colors: [
      {
        name: 'Gold (Tan)',
        hex: '#a67246',
        imageUrl:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000',
        desc: 'Natural gold tan, showcasing the authentic grain and character of Barenia.',
      },
      {
        name: 'Ébène (Dark Brown)',
        hex: '#3d2516',
        imageUrl:
          'https://i.pinimg.com/736x/95/eb/08/95eb082ed6fd755c2fdbed0b167556c3.jpg',
        desc: 'A rich espresso tone, deep and highly sophisticated.',
      },
      {
        name: 'Bleu Saphir',
        hex: '#1d2a45',
        imageUrl:
          'https://i.pinimg.com/736x/6f/44/66/6f4466940370804c49cfa8dd4e7acc09.jpg',
        desc: 'A midnight navy blue that reflects light beautifully.',
      },
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: true,
  },
  {
    id: 'tany-classic-watch-strap',
    name: 'Classic Alligator Watch Strap',
    category: 'watch-straps',
    price: 240,
    leatherType: 'Genuine Matte Alligator & French Zermatt Lining',
    description:
      'Tailored watch strap with a tapered silhouette and elegant padding. Lined with hypoallergenic Zermatt leather to resist sweat and moisture while offering pillow-soft comfort.',
    story:
      'Each scale of our alligator leather is hand-glazed and selected for symmetrical patterns. We employ the historical "saddle-stitch" which uses two needles on a single piece of thread, ensuring that even if one loop wears down, the rest of the stitching remains fully intact.',
    dimensions:
      'Lengths: 115mm / 75mm | Widths available: 18mm, 19mm, 20mm, 21mm, 22mm',
    colors: [
      {
        name: 'Ebene Brown',
        hex: '#543b2b',
        imageUrl:
          'https://i.pinimg.com/1200x/9d/5f/ed/9d5fedc2cf882852f2143373af569b32.jpg',
        desc: 'Warm mahogany alligator skin with hand-painted dark brown edges.',
      },
      {
        name: 'Noir Éclat',
        hex: '#111111',
        imageUrl:
          'https://i.pinimg.com/1200x/76/1e/20/761e204742c9470b06859f88aceb82a7.jpg',
        desc: 'Lustrous, deep matte black with sharp tonal hand-stitching.',
      },
      {
        name: 'Cognac Gold',
        hex: '#be814e',
        imageUrl:
          'https://i.pinimg.com/1200x/3c/ad/48/3cad48f7247e5c5b45778f5a37db72ef.jpg',
        desc: 'Bright, vibrant cognac honey color highlighting the rich scale texture.',
      },
    ],
    sizes: [
      '18mm Lug Width',
      '19mm Lug Width',
      '20mm Lug Width',
      '21mm Lug Width',
      '22mm Lug Width',
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    hardwareOptions: [
      'Solid Yellow Gold buckle',
      'Polished Silver Steel buckle',
    ],
    isBestseller: false,
  },
  {
    id: 'tany-premium-giftset',
    name: 'Epsom Cardholder & Key Fob Gift Set',
    category: 'gifts',
    price: 450,
    leatherType: 'Embossed Epsom Calfskin',
    description:
      'The ultimate bespoke pairing. Features our multi-slot minimalist cardholder and a solid brass rivet-pinned key fob, beautifully presented in a handmade signature orange box.',
    story:
      'Epsom leather is highly appreciated for its rigid, scratch-resistant embossed surface. It holds its vibrant dye colors with unmatched intensity and easily resists water spots. This gift set can be hot-stamped with personalized initials in 24k gold leaf, silver leaf, or blind debossed.',
    dimensions: 'Cardholder: H 2.9" x W 4.1" | Key Fob: L 4.2"',
    colors: [
      {
        name: 'Signature Gold',
        hex: '#be814e',
        imageUrl:
          'https://i.pinimg.com/1200x/d6/67/bd/d667bdb3eee784b778b9a949cb73d581.jpg',
        desc: 'Bright marigold tan with a beautiful cross-grain Epsom texture.',
      },
      {
        name: 'Tanery Orange',
        hex: '#d9531e',
        imageUrl:
          'https://i.pinimg.com/736x/e9/64/ab/e964ab319f0af4a02e86a3884b298f34.jpg',
        desc: 'A vibrant, spirited orange that radiates luxury and character.',
      },
      {
        name: 'Bleu Indigo',
        hex: '#181e2b',
        imageUrl:
          'https://i.pinimg.com/736x/dc/d1/94/dcd1946f28acceb6b126051002a6e3d5.jpg',
        desc: 'An almost-black deep indigo blue that is understated and modern.',
      },
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: true,
  },
  {
    id: 'tany-envelope-clutch',
    name: 'The Envelope Clutch',
    category: 'bags',
    price: 950,
    leatherType: 'Pliable Togo Calfskin',
    description:
      'An elegant evening clutch designed as a single folded hide. Secured with an artisanal strap slide closure, showing no visible stitching on the outer perimeter.',
    story:
      'Togo leather is a naturally drummed, supple calfskin with a beautiful pebbled grain. It is incredibly soft to the touch but holds its slouchy structured shape. The interior is lined with matching fine lambskin for an ultra-premium sensory experience.',
    dimensions: 'H 6.2" x W 9.5" x D 1.0"',
    colors: [
      {
        name: 'Taupe Grise',
        hex: '#8b8478',
        imageUrl:
          'https://i.pinimg.com/1200x/37/93/37/379337d30ebdcdcaa010779533741187.jpg',
        desc: 'An elegant warm grey-beige, extremely versatile and classic.',
      },
      {
        name: 'Noir (Black)',
        hex: '#1a1a1a',
        imageUrl:
          'https://i.pinimg.com/1200x/92/1d/50/921d50f4ce622fd69bd2c16a9840e662.jpg',
        desc: 'Pebbled black Togo leather with silver palladium accents.',
      },
      {
        name: 'Rose Azalée',
        hex: '#d9788e',
        imageUrl:
          'https://i.pinimg.com/736x/69/e0/f4/69e0f4c736e8cdeeaa101ae999ec7f1e.jpg',
        desc: 'A vibrant, romantic soft raspberry pink.',
      },
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    hardwareOptions: [
      'Solid Brushed Brass (Gold)',
      'Polished Palladium (Silver)',
    ],
    isBestseller: false,
  },
  {
    id: 'tany-slim-cardholder',
    name: 'Minimalist Slim Cardholder',
    category: 'wallets',
    price: 180,
    leatherType: 'French Chevre (Goatskin)',
    description:
      'Our thinnest cardholder, designed with 4 hand-chamfered credit card slots and a central slip pocket for cash, lined in silk-faille.',
    story:
      'Chevre leather is made from mountain goats, which naturally produces an exceptionally durable, scratch-resistant grain that is lighter and stronger than cowhide. The edges are heated and polished with beeswax 5 times to form a flawless edge that develops a beautiful patina over years of use.',
    dimensions: 'H 2.7" x W 3.9" x D 0.15"',
    colors: [
      {
        name: 'Bleu Nuit',
        hex: '#1e2433',
        imageUrl:
          'https://i.pinimg.com/1200x/6d/48/be/6d48be1f75faa79b4b351d60ba305226.jpg',
        desc: 'An incredibly rich, deep night blue goatskin with subtle luster.',
      },
      {
        name: 'Vert Cyprès',
        hex: '#233827',
        imageUrl:
          'https://i.pinimg.com/736x/27/e2/da/27e2dab341e584d678ef782d16e2b669.jpg',
        desc: 'A deep, mysterious forest-cypress green.',
      },
      {
        name: 'Gold (Tan)',
        hex: '#a67246',
        imageUrl:
          'https://i.pinimg.com/736x/48/ba/f7/48baf78aee0abb04f8127ef7a7316a40.jpg',
        desc: 'Hand-finished honey tan showing the natural pebbled chevre grain.',
      },
    ],
    customizable: true,
    stitchingOptions: ['Matching Tonal Thread', 'Contrasting Ecru Linen Thread'],
    isBestseller: false,
  },
];

// ──────────────────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────────────────
export const HERO_VIDEO_ALT =
  'https://images.unsplash.com/photo-1473188588955-719acbf43f47?auto=format&fit=crop&q=80&w=1600';

// ──────────────────────────────────────────────────────────
// BRAND STORY — UNIQUE TANERY
// ──────────────────────────────────────────────────────────
export const BRAND_STORY = {
  // Signature tagline
  tagline: 'Embrace the Class',
  quote: 'Embrace the Class',

  // About us
  philosophy:
    'At UNIQUE TANERY, we specialize in crafting luxury leather wallets and cardholders that blend timeless craftsmanship with modern design. Each piece is carefully handmade using the finest full-grain leather, ensuring durability and a sophisticated finish. The attention to detail in both the products and the service is remarkable.',

  // Extended about section
  aboutExtended:
    'Our commitment to quality and sustainability shines through every stitch, and with every product we aim to deliver more than just an accessory — we offer a lasting piece of craftsmanship that improves with time. Our leather goods are designed to grow in value, developing a unique patina that makes each item one-of-a-kind. We take pride in our tradition of excellence, delivering luxury and personalization that stand the test of time.',

  // Mission
  mission:
    'Creating branded, handcrafted wallets and cardholders that combine tradition, luxury, and durability — designed to build character with every use and become more valuable over time.',

  // Vision
  vision:
    'To craft luxury leather goods that embody elegance, durability, and timeless quality, developing a patina that tells a story of value and craftsmanship.',

  // The value of handmade
  handmadeValue:
    "Handmade wallets are unique, durable, and crafted with care, making them far more valuable than mass-produced alternatives. Each piece is made from high-quality leather, offering a timeless design that only gets better with age. With attention to detail and personalized craftsmanship, a handmade wallet is not just a functional accessory — it's an investment in quality and style that lasts for years.",

  // Artisan story
  artisan:
    'Our small team of master leather-smiths have honed their craft over decades. From the meticulous edge-painting to the customized monogram hot-stamping, we celebrate leather as a living material that tells your unique story — one that only becomes richer with time.',
};

// ──────────────────────────────────────────────────────────
// PATINA — Living Leather Evolution
// (used inside AtelierSection Step 4 & standalone Patina section)
// ──────────────────────────────────────────────────────────
export const PATINA_STAGES = [
  {
    label: 'Day 1',
    sublabel: 'Brand New',
    color: '#D4A574',
    description:
      'Fresh, clean leather with a uniform color and slightly stiff feel. The surface has a natural matte finish with the full-grain texture clearly visible. Your journey with the leather begins here — pristine and full of potential.',
    imageUrl:
      'https://i.pinimg.com/736x/9d/8f/13/9d8f137959ec2e443a1a953900ffa6d4.jpg',
  },
  {
    label: '3 Months',
    sublabel: 'Breaking In',
    color: '#B8864E',
    description:
      'The leather begins to soften beautifully at fold points and contact areas. Subtle darkening appears where your hands naturally hold the wallet. The first hints of your personal character emerge in the grain.',
    imageUrl:
      'https://i.pinimg.com/736x/48/ba/f7/48baf78aee0abb04f8127ef7a7316a40.jpg',
  },
  {
    label: '6 Months',
    sublabel: 'Character Forming',
    color: '#9A6B3A',
    description:
      'Rich color deepening with visible wear patterns unique to you. Natural oils from your hands create a soft, warm sheen. The leather becomes supple and contours perfectly to your pocket — it is becoming yours.',
    imageUrl:
      'https://i.pinimg.com/1200x/d6/67/bd/d667bdb3eee784b778b9a949cb73d581.jpg',
  },
  {
    label: '1 Year+',
    sublabel: 'Full Patina',
    color: '#7A4E2D',
    description:
      'Deep, lustrous patina with unique character that no machine can replicate. Your wallet is now truly one-of-a-kind — a personal artifact that tells the story of your daily life. This is the reward of true craftsmanship.',
    imageUrl:
      'https://i.pinimg.com/736x/95/eb/08/95eb082ed6fd755c2fdbed0b167556c3.jpg',
  },
];

export const PATINA_INFO = [
  {
    title: 'What is Patina?',
    content:
      'Patina is the beautiful, natural transformation leather undergoes over time. With use, exposure to light, oils, and the environment, leather develops a unique, rich color and sheen, becoming more valuable and personalized. It is the soul of full-grain leather made visible.',
    icon: 'sparkles',
  },
  {
    title: 'How to Build Patina?',
    content:
      'Simply use your leather wallet regularly. The more you carry and interact with it, the more character it gains. Natural oils from your hands and exposure to sunlight will accelerate the process, enhancing its beauty with every passing day. No special treatment needed — just live with it.',
    icon: 'layers',
  },
  {
    title: 'Why is Patina Valuable?',
    content:
      'A well-developed patina makes your leather item unique, telling a story of wear and craftsmanship. The longer the patina builds, the more your wallet becomes a one-of-a-kind piece, increasing its charm and value. It is the ultimate proof of quality — only real full-grain leather patinas this way.',
    icon: 'gem',
  },
];

// ──────────────────────────────────────────────────────────
// ATELIER STEPS — The UNIQUE TANERY Slow-Craft Journey
// ──────────────────────────────────────────────────────────
export const ATELIER_STEPS = [
  {
    id: 'hide-selection',
    stepNumber: '01',
    title: 'Selection of the Hides',
    subtitle: 'Full-Grain Sourcing',
    description:
      'At UNIQUE TANERY, we only source full-grain, first-grade hides from historical tanneries in France and Italy. Every hide is inspected under warm light for grain consistency, structure, and tensile strength. Only the finest sections make it into our wallets and cardholders — this is the foundation of a leather goods that will patina beautifully for decades.',
    actionName: 'Feel the Textures',
    imageUrl:
      'https://i.pinimg.com/736x/24/ca/4a/24ca4a1eb6f5722cf68afea4d981de2f.jpg',
    interactives: [
      {
        name: 'Barenia',
        textureType:
          'Smooth, oily, self-healing raw elegance. Legendary for developing the richest, most dramatic patina — the connoisseur\'s choice for wallets.',
        color: '#a67246',
        zoomScale: 'smooth',
      },
      {
        name: 'Epsom',
        textureType:
          'Embossed cross-grain, rigid and scratch-resistant. Holds vibrant color intensity and develops a subtle, refined patina over time.',
        color: '#be814e',
        zoomScale: 'grainy',
      },
      {
        name: 'Togo',
        textureType:
          'Naturally pebbled calfskin, soft and slouchy. Ages into a supple, warm-toned classic that becomes an extension of you.',
        color: '#8b8478',
        zoomScale: 'pebbled',
      },
      {
        name: 'Chevre',
        textureType:
          'Fine mountain goatskin — extremely lightweight and durable. Perfect for slim cardholders, developing a soft glossy patina at contact points.',
        color: '#1e2433',
        zoomScale: 'fine',
      },
    ],
  },
  {
    id: 'hand-cutting',
    stepNumber: '02',
    title: 'Pattern Hand-Cutting',
    subtitle: 'Precision by Hand',
    description:
      'Using heavy steel paperweights and ultra-sharp half-moon knives, our artisans cut each leather piece individually. No automated lasers, no mass stamp-cutters — just the steady hand of a master craftsman ensuring every wallet panel is cut with absolute precision. This is where the personality of each UNIQUE TANERY piece begins.',
    actionName: 'Simulate the Cut',
    imageUrl:
      'https://i.pinimg.com/1200x/4f/54/82/4f548209ae13d7f6b875e177a11f3231.jpg',
    interactives: [],
  },
  {
    id: 'saddle-stitching',
    stepNumber: '03',
    title: 'The Saddle Stitch',
    subtitle: 'Two Needles, One Thread',
    description:
      'The pinnacle of leather craftsmanship. We punch stitching holes at 8 to 10 stitches per inch using an angled pricking iron. Two needles pass through each hole in opposite directions, forming an indestructible diagonal slant. Unlike machine lockstitch — where one broken thread unravels the seam — our saddle stitches lock in place, ensuring your wallet endures for generations.',
    actionName: 'Try the Hand-Stitch',
    imageUrl:
      'https://i.pinimg.com/736x/5a/5f/7a/5a5f7afcf63834b9ff4d11630d26364a.jpg',
    interactives: [],
  },
  {
    id: 'living-patina',
    stepNumber: '04',
    title: 'The Living Patina',
    subtitle: 'Beauty That Evolves',
    description:
      'Patina is the beautiful, natural transformation leather undergoes over time. With use, exposure to light, oils, and the environment, your UNIQUE TANERY leather develops a unique, rich color and sheen — becoming more valuable and personalized with every passing day. This is why our wallets are not just accessories; they are investments in a story only you can write.',
    actionName: 'Explore the Patina',
    imageUrl:
      'https://i.pinimg.com/736x/95/eb/08/95eb082ed6fd755c2fdbed0b167556c3.jpg',
    interactives: [],
  },
];

// ──────────────────────────────────────────────────────────
// EDGE FINISHING (optional — kept for backwards compatibility
// if you still want the old edge-burnishing step available)
// ──────────────────────────────────────────────────────────
export const EDGE_FINISHING_STEP = {
  id: 'edge-burnishing',
  stepNumber: '05',
  title: 'Edge Painting & Polishing',
  subtitle: 'The Perfect Finish',
  description:
    'Raw leather edges are sensitive to moisture and wear. We apply up to 5 individual layers of custom-blended matte edge paint, sanded and heat-sealed between each coat, for a glass-like finish that protects your wallet for a lifetime.',
  actionName: 'Polish the Edge',
  imageUrl:
    'https://i.pinimg.com/1200x/5f/eb/88/5feb888adf18004420f7286fe214e781.jpg',
  interactives: [],
};

// ──────────────────────────────────────────────────────────
// STATS (used in AtelierSection stats bar)
// ──────────────────────────────────────────────────────────
export const ATELIER_STATS = [
  { icon: 'clock', value: '40+', label: 'Hours per piece' },
  { icon: 'layers', value: '100%', label: 'Full-grain leather' },
  { icon: 'gem', value: '∞', label: 'Patina potential' },
  { icon: 'flame', value: '0', label: 'Machine stitches' },
];