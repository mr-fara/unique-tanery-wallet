import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Star, ChevronLeft, ChevronRight, Quote,
  Shield, Globe, Heart, Award, CheckCircle,
  Truck, Lock, ThumbsUp, Pause, Play,
  Clock, Users, MapPin, Sparkles,
} from 'lucide-react';

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════

const TRUST_METRICS = [
  { icon: Star,     value: 4.9,   suffix: '/5', label: 'Average Rating',   decimals: 1 },
  { icon: Users,    value: 12000, suffix: '+',  label: 'Happy Customers',  decimals: 0 },
  { icon: MapPin,   value: 28,    suffix: '+',  label: 'Countries Served', decimals: 0 },
  { icon: ThumbsUp, value: 98,    suffix: '%',  label: 'Recommend Us',     decimals: 0 },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'James Carter',
    country: 'United Kingdom',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    verified: true,
    product: 'Adam Wallet',
    productImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=120&h=120&fit=crop',
    purchaseDate: 'March 2022',
    yearsUsing: 2,
    rating: 5,
    review: "This wallet exceeded every expectation. The stitching is flawless, the leather smells incredible, and it has developed a beautiful patina over time. I've owned luxury wallets from international brands, but this is easily my favourite.",
  },
  {
    id: 2,
    name: 'Sarah Williams',
    country: 'Australia',
    flag: '🇦🇺',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    verified: true,
    product: 'Aurora Wallet',
    productImage: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=120&h=120&fit=crop',
    purchaseDate: 'July 2023',
    yearsUsing: 1,
    rating: 5,
    review: "The attention to detail is unbelievable. Every stitch feels handcrafted. You immediately know you're holding something made with passion. I bought a second one as a gift, and my friend was absolutely thrilled.",
  },
  {
    id: 3,
    name: 'Mohamed Rizwan',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    verified: true,
    product: 'Leo Wallet',
    productImage: 'https://images.unsplash.com/photo-1612902456551-404b5b8e5a8f?w=120&h=120&fit=crop',
    purchaseDate: 'January 2021',
    yearsUsing: 3,
    rating: 5,
    review: "I've been using this wallet daily for nearly three years. It still looks beautiful and becomes even better with age. The patina that has developed is stunning — it tells the story of my everyday life.",
  },
  {
    id: 4,
    name: 'Elena Rossi',
    country: 'Italy',
    flag: '🇮🇹',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    verified: true,
    product: 'Nero Cardholder',
    productImage: 'https://images.unsplash.com/photo-1606503153255-59d8b2e4b0ef?w=120&h=120&fit=crop',
    purchaseDate: 'September 2023',
    yearsUsing: 1,
    rating: 5,
    review: "Coming from Italy where leather goods are a way of life, I was skeptical. But this cardholder immediately won me over. The full-grain leather is extraordinary, and the minimalist design is perfection.",
  },
  {
    id: 5,
    name: 'David Tanaka',
    country: 'Japan',
    flag: '🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    verified: true,
    product: 'Zen Bifold',
    productImage: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=120&h=120&fit=crop',
    purchaseDate: 'May 2022',
    yearsUsing: 2,
    rating: 5,
    review: "The craftsmanship is on par with the finest Japanese artisanal goods. Every detail speaks of care, precision, and respect for the material. This wallet is a masterpiece of slow craft.",
  },
  {
    id: 6,
    name: 'Amara Okafor',
    country: 'Canada',
    flag: '🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    verified: true,
    product: 'Atlas Travel Wallet',
    productImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop',
    purchaseDate: 'November 2022',
    yearsUsing: 2,
    rating: 5,
    review: "I travel constantly for work and this wallet has been through 15+ countries with me. The leather has aged beautifully and it always gets compliments at business meetings. Worth every penny.",
  },
];

const GALLERY_IMAGES = [
  { src: '/image/home.mg.1.jpg', alt: 'Wallet in pocket',    label: 'Daily Carry'      },
  { src: '/image/home.mg.2.jpg', alt: 'Wallet on desk',      label: 'Office Ready'     },
  { src: '/image/home.mg.3.jpg', alt: 'Travel photo',        label: 'World Traveler'   },
  { src: '/image/home.mg.4.jpg', alt: 'Coffee shop',         label: 'Coffee Moments'   },
  { src: '/image/home.mg.5.jpg', alt: 'Business meeting',    label: 'Business Class'   },
  { src: '/image/home.mg.6.jpg', alt: 'Gift unboxing',       label: 'Perfect Gift'     },
  { src: '/image/home.mg.7.jpg', alt: 'Leather aging',       label: 'Beautiful Aging'  },
];

const TRUST_BADGES = [
  { icon: Award,        label: '100% Handcrafted'        },
  { icon: Shield,       label: 'Premium Leather'         },
  { icon: Heart,        label: 'Lifetime Craft'          },
  { icon: Truck,        label: 'Worldwide Shipping'      },
  { icon: Lock,         label: 'Secure Checkout'         },
  { icon: CheckCircle,  label: 'Satisfaction Guaranteed' },
];

const FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==';

// Ease curve reused everywhere
const EASE = [0.22, 1, 0.36, 1] as const;

// ═══════════════════════════════════════════
// HOOK — animated counter (RAF-based, stable)
// ═══════════════════════════════════════════

function useAnimatedCounter(end: number, duration: number, decimals: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Number((eased * end).toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, decimals, active]);

  return count;
}

// ═══════════════════════════════════════════
// METRIC CARD
// ═══════════════════════════════════════════

const MetricCard = ({
  metric,
  index,
  isInView,
}: {
  metric: (typeof TRUST_METRICS)[0];
  index: number;
  isInView: boolean;
}) => {
  const count = useAnimatedCounter(metric.value, 1800 + index * 200, metric.decimals, isInView);
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: EASE }}
      className="relative rounded-2xl border border-stone-100 bg-white shadow-sm hover:shadow-md
                 hover:border-amber-200 transition-shadow duration-300 p-5 sm:p-6 lg:p-8
                 flex flex-col items-center justify-center text-center
                 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] overflow-hidden group"
    >
      {/* hover glow — CSS only, no JS */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-28 h-28 bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      {/* Icon row */}
      <div className="h-9 sm:h-10 flex items-center justify-center mb-2 sm:mb-3">
        {index === 0 ? (
          <div className="flex items-center gap-0.5">
            {[0,1,2,3,4].map((i) => (
              <Star key={i} size={13} className="text-amber-400 fill-amber-400 sm:w-[15px] sm:h-[15px]" />
            ))}
          </div>
        ) : (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-50 border border-amber-100
                          flex items-center justify-center">
            <Icon size={15} className="text-amber-500" strokeWidth={1.6} />
          </div>
        )}
      </div>

      {/* Number */}
      <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-stone-800 tracking-tight mb-1 leading-none">
        {metric.decimals > 0 ? count.toFixed(metric.decimals) : Math.floor(count).toLocaleString()}
        <span className="text-amber-500">{metric.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-[9px] sm:text-[10px] lg:text-xs text-stone-400 uppercase tracking-[0.16em] font-medium">
        {metric.label}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════
// TESTIMONIAL CARD  (no internal motion = fast)
// ═══════════════════════════════════════════

const TestimonialCard = ({ t }: { t: (typeof TESTIMONIALS)[0] }) => (
  <div className="flex-shrink-0 w-[88vw] sm:w-[380px] md:w-[400px] lg:w-[420px]
                  group relative">
    <div className="relative h-full overflow-hidden rounded-2xl border border-stone-100 bg-white
                    shadow-sm hover:shadow-xl transition-all duration-400 ease-out p-6 sm:p-7
                    hover:-translate-y-1 hover:border-amber-200 flex flex-col gap-4">

      {/* ambient top glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40
                      bg-amber-400/[0.06] rounded-full blur-3xl
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="absolute top-5 right-5">
        <Quote size={26} className="text-amber-200 group-hover:text-amber-300 transition-colors duration-400" strokeWidth={1} />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-100 ring-offset-2">
            <img src={t.avatar} alt={t.name} onError={(e) => (e.currentTarget.src = FALLBACK)}
                 className="w-full h-full object-cover" loading="lazy" />
          </div>
          {t.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-500
                            rounded-full flex items-center justify-center border-2 border-white">
              <CheckCircle size={9} className="text-white" strokeWidth={3} />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-stone-800 leading-tight">{t.name}</h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-sm leading-none">{t.flag}</span>
            <span className="text-[10px] text-stone-400">{t.country}</span>
          </div>
        </div>
      </div>

      {/* Verified badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                      bg-emerald-50 border border-emerald-100 w-fit">
        <CheckCircle size={9} className="text-emerald-500" strokeWidth={2.5} />
        <span className="text-[8px] text-emerald-600 uppercase tracking-[0.15em] font-semibold">
          Verified Purchase
        </span>
      </div>

      {/* Review */}
      <blockquote className="text-[12px] sm:text-[13px] text-stone-500 font-light leading-[1.85] italic flex-1">
        "{t.review}"
      </blockquote>

      {/* Product footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-100 bg-stone-50 flex-shrink-0">
          <img src={t.productImage} alt={t.product} onError={(e) => (e.currentTarget.src = FALLBACK)}
               className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-stone-300 uppercase tracking-[0.15em] mb-0.5">Purchased</p>
          <p className="text-[11px] sm:text-xs text-stone-700 font-medium truncate">{t.product}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-100">
          <Clock size={9} className="text-amber-500" />
          <span className="text-[8px] text-amber-600 font-semibold whitespace-nowrap">
            {t.yearsUsing}yr{t.yearsUsing > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════
// GALLERY ITEM  (CSS hover only — no JS state)
// ═══════════════════════════════════════════

const GalleryItem = ({ img, index }: { img: (typeof GALLERY_IMAGES)[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.94 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
    className="relative group overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3]"
  >
    <img
      src={img.src}
      alt={img.alt}
      onError={(e) => (e.currentTarget.src = FALLBACK)}
      className="w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform
                 group-hover:scale-110"
      loading="lazy"
    />
    {/* overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    {/* label */}
    <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3
                     text-[9px] sm:text-[10px] text-white font-semibold uppercase tracking-wider
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 drop-shadow-sm">
      {img.label}
    </span>
  </motion.div>
);

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════

export default function TestimonialSection() {
  const [current, setCurrent]         = useState(0);
  const [autoPlay, setAutoPlay]       = useState(true);
  const [cardWidth, setCardWidth]     = useState(420);
  const [gap, setGap]                 = useState(24);

  const dragRef    = useRef({ active: false, startX: 0 });
  const autoRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: '-60px' });

  const total = TESTIMONIALS.length;

  // ── Responsive card size ──────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w < 480) { setCardWidth(w * 0.88); setGap(16); }
      else if (w < 640) { setCardWidth(360);       setGap(20); }
      else if (w < 768) { setCardWidth(380);       setGap(20); }
      else if (w < 1024){ setCardWidth(400);       setGap(24); }
      else               { setCardWidth(420);       setGap(24); }
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  // ── Auto-play ─────────────────────────────
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % total), 4500);
    return () => clearInterval(id);
  }, [autoPlay, total]);

  // ── Navigation ────────────────────────────
  const go = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // ── Keyboard ──────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // ── Pause then resume helper ───────────────
  const pauseThenResume = useCallback(() => {
    setAutoPlay(false);
    if (autoRef.current) clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => setAutoPlay(true), 8000);
  }, []);

  // ── Drag handlers (ref-based, no extra state) ──
  const onDragStart = useCallback((clientX: number) => {
    dragRef.current = { active: true, startX: clientX };
    setAutoPlay(false);
  }, []);

  const onDragEnd = useCallback((clientX: number) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const diff = dragRef.current.startX - clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    pauseThenResume();
  }, [next, prev, pauseThenResume]);

  const offsetX = current * (cardWidth + gap);

  return (
    <section className="relative overflow-hidden bg-white">

      {/* ── Dot texture (pure CSS) ──────────── */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #a0856c 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── Background decorative images (single each, CSS responsive) ── */}
      <img
        src="/image/bg1.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute top-0 right-0 pointer-events-none select-none z-0
                   w-[220px] sm:w-[300px] lg:w-[500px] xl:w-[600px]
                   h-auto object-contain opacity-[0.08]"
        style={{
          maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.85) 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.85) 40%, transparent 100%)',
        }}
      />
      <img
        src="/image/bg2.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute bottom-0 left-0 pointer-events-none select-none z-0
                   w-[320px] sm:w-[440px] lg:w-[520px] xl:w-[620px]
                   h-auto object-contain opacity-[0.07]"
        style={{
          maskImage: 'linear-gradient(to top right, rgba(0,0,0,0.85) 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,0.85) 40%, transparent 100%)',
        }}
      />

      {/* ── Ambient orbs (will-change omitted — transforms only) ── */}
      <motion.div
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 70%)' }}
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.03) 0%, transparent 70%)' }}
        animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════ */}
      {/* CONTENT                              */}
      {/* ════════════════════════════════════ */}
      <div className="relative z-10 py-16 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">

          {/* ── HEADER ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            bg-amber-50 border border-amber-200 mb-5 sm:mb-6">
              <Sparkles size={11} className="text-amber-500" />
              <span className="text-[10px] sm:text-[11px] text-amber-600 uppercase tracking-[0.2em] font-semibold">
                Trusted by 12,000+ Customers Worldwide
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-light
                           text-stone-800 tracking-tight leading-[1.15] mb-4 sm:mb-5">
              Crafted by Hand.
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700
                               bg-clip-text text-transparent">
                Trusted for a Lifetime.
              </span>
            </h2>

            <div className="w-10 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-5" />

            <p className="text-sm sm:text-base text-stone-400 font-light leading-[1.9] max-w-xl mx-auto">
              Every UNIQUE TANNERY wallet is handcrafted from premium full-grain leather
              by skilled artisans. Read authentic stories from customers who carry our
              craftsmanship every single day.
            </p>
          </motion.div>

          {/* ── TRUST METRICS ─────────────── */}
          <div
            ref={metricsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5
                       mb-14 sm:mb-20 md:mb-24"
          >
            {TRUST_METRICS.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} isInView={metricsInView} />
            ))}
          </div>

          {/* ── TESTIMONIAL CAROUSEL ──────── */}
          <div className="mb-14 sm:mb-20 md:mb-24">

            {/* header row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex items-end justify-between mb-7 sm:mb-9"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-stone-800 tracking-wide">
                  Customer Stories
                </h3>
                <p className="text-[10px] sm:text-xs text-stone-400 mt-1 uppercase tracking-[0.15em]">
                  Real experiences from real people
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[{ fn: prevSlide, label: 'Previous', Icon: ChevronLeft },
                  { fn: nextSlide, label: 'Next',     Icon: ChevronRight }].map(({ fn, label, Icon }) => (
                  <button
                    key={label}
                    onClick={() => { fn === prevSlide ? prev() : next(); pauseThenResume(); }}
                    aria-label={label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white
                               shadow-sm flex items-center justify-center text-stone-400
                               hover:text-stone-700 hover:border-amber-300 hover:shadow-md
                               transition-all duration-250 active:scale-95"
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* track */}
            <div
              className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onMouseDown={(e) => onDragStart(e.clientX)}
              onMouseUp={(e)   => onDragEnd(e.clientX)}
              onMouseLeave={(e) => dragRef.current.active && onDragEnd(e.clientX)}
              onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
              onTouchEnd={(e)   => onDragEnd(e.changedTouches[0].clientX)}
              onMouseEnter={() => setAutoPlay(false)}
            >
              <motion.div
                className="flex"
                animate={{ x: -offsetX }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ gap: `${gap}px` }}
              >
                {TESTIMONIALS.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </motion.div>
            </div>

            {/* progress + dots */}
            <div className="mt-7 sm:mt-9 flex flex-col items-center gap-4">
              {/* bar */}
              <div className="w-full max-w-xs h-0.5 bg-stone-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  animate={{ width: `${((current + 1) / total) * 100}%` }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </div>

              {/* dots + play/pause */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { go(i); pauseThenResume(); }}
                    aria-label={`Slide ${i + 1}`}
                    className="p-1 focus:outline-none"
                  >
                    <motion.div
                      className="rounded-full"
                      animate={{
                        width:           current === i ? 24 : 7,
                        height:          7,
                        backgroundColor: current === i ? 'rgb(217 119 6)' : 'rgb(231 229 228)',
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  </button>
                ))}

                <button
                  onClick={() => setAutoPlay((p) => !p)}
                  aria-label={autoPlay ? 'Pause' : 'Resume'}
                  className="ml-2 w-6 h-6 rounded-full border border-stone-200 bg-white
                             flex items-center justify-center text-stone-400
                             hover:text-stone-700 hover:border-amber-300 transition-all duration-250"
                >
                  {autoPlay ? <Pause size={9} /> : <Play size={9} />}
                </button>
              </div>
            </div>
          </div>

          {/* ── GALLERY ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-14 sm:mb-20 md:mb-24"
          >
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <Globe size={13} className="text-amber-500" />
                <span className="text-[10px] sm:text-[11px] text-amber-600 uppercase tracking-[0.22em] font-semibold">
                  Customer Gallery
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-stone-800 tracking-wide">
                Loved Around The World
              </h3>
              <div className="w-8 h-px bg-amber-300 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <GalleryItem key={i} img={img} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ── TRUST BADGES ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-100
                            bg-stone-50 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-20
                              bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="text-center mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Shield size={13} className="text-amber-500" />
                    <span className="text-[10px] sm:text-[11px] text-amber-600 uppercase tracking-[0.22em] font-semibold">
                      Our Promise
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-stone-800 tracking-wide">
                    Quality You Can Trust
                  </h3>
                  <div className="w-8 h-px bg-amber-300 mx-auto mt-3" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {TRUST_BADGES.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                        className="group text-center p-4 rounded-xl border border-stone-100 bg-white
                                   shadow-sm hover:shadow-md hover:border-amber-200
                                   transition-all duration-300"
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-50 border border-amber-100
                                        flex items-center justify-center
                                        group-hover:bg-amber-100 group-hover:border-amber-200 transition-all duration-300">
                          <Icon size={16} className="text-amber-500 group-hover:text-amber-600 transition-colors duration-300"
                                strokeWidth={1.6} />
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium leading-snug
                                      group-hover:text-stone-700 transition-colors duration-300">
                          {badge.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// dummy refs to satisfy the arrow-fn map above
const prevSlide = () => {};
const nextSlide = () => {};