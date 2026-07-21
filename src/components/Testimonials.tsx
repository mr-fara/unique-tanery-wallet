import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Shield,
  Globe,
  Heart,
  Award,
  CheckCircle,
  Truck,
  Lock,
  ThumbsUp,
  Pause,
  Play,
  Clock,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════

const TRUST_METRICS = [
  { icon: Star, value: 4.9, suffix: '/5', label: 'Average Rating', prefix: '', decimals: 1 },
  { icon: Users, value: 12000, suffix: '+', label: 'Happy Customers', prefix: '', decimals: 0 },
  { icon: MapPin, value: 28, suffix: '+', label: 'Countries Served', prefix: '', decimals: 0 },
  { icon: ThumbsUp, value: 98, suffix: '%', label: 'Recommend Us', prefix: '', decimals: 0 },
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
  { src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', alt: 'Wallet in pocket', label: 'Daily Carry' },
  { src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop', alt: 'Wallet on office desk', label: 'Office Ready' },
  { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop', alt: 'Travel photo', label: 'World Traveler' },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop', alt: 'Coffee shop', label: 'Coffee Moments' },
  { src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop', alt: 'Business meeting', label: 'Business Class' },
  { src: 'https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=400&h=300&fit=crop', alt: 'Gift unboxing', label: 'Perfect Gift' },
  { src: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=400&h=300&fit=crop', alt: 'Leather aging', label: 'Beautiful Aging' },
];

const TRUST_BADGES = [
  { icon: Award, label: '100% Handcrafted' },
  { icon: Shield, label: 'Premium Leather' },
  { icon: Heart, label: 'Lifetime Craft' },
  { icon: Truck, label: 'Worldwide Shipping' },
  { icon: Lock, label: 'Secure Checkout' },
  { icon: CheckCircle, label: 'Satisfaction Guaranteed' },
];

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==';

// ═══════════════════════════════════════════
// ANIMATED COUNTER HOOK
// ═══════════════════════════════════════════

function useAnimatedCounter(
  end: number,
  duration: number,
  decimals: number,
  shouldStart: boolean
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Number((eased * end).toFixed(decimals)));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, decimals, shouldStart]);

  return count;
}

// ═══════════════════════════════════════════
// METRIC CARD
// ═══════════════════════════════════════════

function MetricCard({
  metric,
  index,
  isInView,
}: {
  metric: (typeof TRUST_METRICS)[0];
  index: number;
  isInView: boolean;
}) {
  const count = useAnimatedCounter(
    metric.value,
    2000 + index * 300,
    metric.decimals,
    isInView
  );
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="group relative w-full rounded-2xl border border-stone-100 bg-white shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-500 p-5 sm:p-6 lg:p-8 flex items-center justify-center text-center overflow-hidden min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]">
  
  {/* Hover glow */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
  </div>

  <div className="relative z-10 flex flex-col items-center justify-center w-full">
    
    {/* Icon / Stars — fixed height so all cards align */}
    <div className="h-9 sm:h-10 flex items-center justify-center mb-2 sm:mb-3">
      {index === 0 ? (
        <div className="flex items-center justify-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.8 + i * 0.08,
                duration: 0.35,
                type: 'spring',
              }}
            >
              <Star
                size={13}
                className="text-amber-400 fill-amber-400 sm:w-[15px] sm:h-[15px]"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
          <Icon
            size={15}
            className="text-amber-500 sm:w-[17px] sm:h-[17px] lg:w-[19px] lg:h-[19px]"
            strokeWidth={1.6}
          />
        </div>
      )}
    </div>

    {/* Number */}
    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-stone-800 tracking-tight mb-1 leading-none">
      {metric.prefix}
      {metric.decimals > 0
        ? count.toFixed(metric.decimals)
        : Math.floor(count).toLocaleString()}
      <span className="text-amber-500">{metric.suffix}</span>
    </div>

    {/* Label */}
    <p className="text-[9px] sm:text-[10px] lg:text-xs text-stone-400 uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium text-center leading-relaxed">
      {metric.label}
    </p>
  </div>
</div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// TESTIMONIAL CARD
// ═══════════════════════════════════════════

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  return (
    <div className="group relative flex-shrink-0 w-[88vw] sm:w-[380px] md:w-[400px] lg:w-[420px] h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 ease-out p-6 sm:p-7 hover:-translate-y-1 hover:border-amber-200">
        {/* Ambient top glow on hover */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-400/[0.06] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Quote icon */}
        <div className="absolute top-5 right-5">
          <Quote
            size={26}
            className="text-amber-200 group-hover:text-amber-300 transition-colors duration-500"
            strokeWidth={1}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-4 h-full">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="text-amber-400 fill-amber-400"
              />
            ))}
          </div>

          {/* Customer info */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden ring-2 ring-amber-100 ring-offset-2 ring-offset-white">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {testimonial.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle size={9} className="text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-stone-800 leading-tight">
                {testimonial.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm leading-none">{testimonial.flag}</span>
                <span className="text-[10px] text-stone-400">{testimonial.country}</span>
              </div>
            </div>
          </div>

          {/* Verified badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 w-fit">
            <CheckCircle size={9} className="text-emerald-500" strokeWidth={2.5} />
            <span className="text-[8px] text-emerald-600 uppercase tracking-[0.15em] font-semibold">
              Verified Purchase
            </span>
          </div>

          {/* Review */}
          <blockquote className="text-[12px] sm:text-[13px] text-stone-500 font-light leading-[1.85] italic flex-1">
            "{testimonial.review}"
          </blockquote>

          {/* Product info */}
          <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-100 bg-stone-50 flex-shrink-0">
              <img
                src={testimonial.productImage}
                alt={testimonial.product}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-stone-300 uppercase tracking-[0.15em] mb-0.5">
                Purchased
              </p>
              <p className="text-[11px] sm:text-xs text-stone-700 font-medium truncate">
                {testimonial.product}
              </p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-100 flex-shrink-0">
              <Clock size={9} className="text-amber-500" />
              <span className="text-[8px] text-amber-600 font-semibold whitespace-nowrap">
                {testimonial.yearsUsing}yr{testimonial.yearsUsing > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════

export default function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [galleryHover, setGalleryHover] = useState<number | null>(null);
  const [cardWidth, setCardWidth] = useState(420);
  const [gap, setGap] = useState(24);

  const carouselRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: '-60px' });

  const totalSlides = TESTIMONIALS.length;

  // Responsive card width
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardWidth(w * 0.88);
        setGap(16);
      } else if (w < 640) {
        setCardWidth(360);
        setGap(20);
      } else if (w < 768) {
        setCardWidth(380);
        setGap(20);
      } else if (w < 1024) {
        setCardWidth(400);
        setGap(24);
      } else {
        setCardWidth(420);
        setGap(24);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  // Drag
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const offsetX = currentSlide * (cardWidth + gap);

  return (
    <section className="relative overflow-hidden bg-white">

      {/* ═══════════════════════════════════════════ */}
      {/* BACKGROUND DECORATIVE PNG IMAGES            */}
      {/* ═══════════════════════════════════════════ */}

      {/* bg1.png — Top Right */}
      {/* Mobile: smaller, less opacity | Large: bigger, slightly more visible */}
      <div
        className="
          absolute top-0 right-0
          pointer-events-none select-none
          z-0
        "
        aria-hidden="true"
      >
        {/* Mobile size (default) */}
        <motion.img
          src="/image/bg1.png"
          alt=""
          className="
            block sm:hidden
            w-[250px] h-auto
            object-contain
            opacity-[0.01]
          "
          style={{
            maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)',
          }}
          initial={{ opacity: 0, x: 40, y: -20 }}
          animate={{ opacity: 0.10, x: 0, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          draggable={false}
        />
        {/* Tablet size */}
        <motion.img
          src="/image/bg1.png"
          alt=""
          className="
            hidden sm:block lg:hidden
            w-[320px] h-auto
            object-contain
            opacity-[0.09]
          "
          style={{
            maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.45) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.45) 80%, transparent 100%)',
          }}
          initial={{ opacity: 0, x: 40, y: -20 }}
          animate={{ opacity: 0.09, x: 0, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          draggable={false}
        />
        {/* Large screen size */}
        <motion.img
          src="/image/bg1.png"
          alt=""
          className="
            hidden lg:block
            w-[520px] xl:w-[620px] 2xl:w-[700px]
            h-auto
            object-contain
            opacity-[0.08]
          "
          style={{
            maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 80%, transparent 100%)',
            filter: 'sepia(0.15) saturate(0.8)',
          }}
          initial={{ opacity: 0, x: 60, y: -30 }}
          animate={{ opacity: 0.08, x: 0, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          draggable={false}
        />
      </div>

      {/* bg2.png — Bottom Left */}
      {/* Mobile: smaller, less opacity | Large: bigger, slightly more visible */}
      <div
        className="
          absolute bottom-0 left-0
          pointer-events-none select-none
          z-0
        "
        aria-hidden="true"
      >
        {/* Mobile size (default) */}
        <motion.img
          src="/image/bg2.png"
          alt=""
          className="
            block sm:hidden
            w-[400px] h-auto
            object-contain
            opacity-[0.09]
          "
          style={{
            maskImage: 'linear-gradient(to top right, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.45) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.45) 80%, transparent 100%)',
          }}
          initial={{ opacity: 0, x: -40, y: 30 }}
          animate={{ opacity: 0.09, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          draggable={false}
        />
        {/* Tablet size */}
        <motion.img
          src="/image/bg2.png"
          alt=""
          className="
            hidden sm:block lg:hidden
            w-[800px] h-auto
            object-contain
            opacity-[0.08]
          "
          style={{
            maskImage: 'linear-gradient(to top right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 80%, transparent 100%)',
          }}
          initial={{ opacity: 0, x: -40, y: 30 }}
          animate={{ opacity: 0.08, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          draggable={false}
        />
        {/* Large screen size */}
        <motion.img
          src="/image/bg2.png"
          alt=""
          className="
            hidden lg:block
            w-[500px] xl:w-[600px] 2xl:w-[680px]
            h-auto
            object-contain
            opacity-[0.07]
          "
          style={{
            maskImage: 'linear-gradient(to top right, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.35) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.35) 80%, transparent 100%)',
            filter: 'sepia(0.15) saturate(0.8)',
          }}
          initial={{ opacity: 0, x: -60, y: 40 }}
          animate={{ opacity: 0.07, x: 0, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          draggable={false}
        />
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* EXISTING BACKGROUND LAYERS (kept intact)    */}
      {/* ═══════════════════════════════════════════ */}

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #a0856c 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-0 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.03) 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════ */}
      {/* CONTENT                                      */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative z-10 py-16 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">

          {/* ─────────────────────────────────── */}
          {/* HEADER                               */}
          {/* ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5 sm:mb-6"
            >
              <Sparkles size={11} className="text-amber-500" />
              <span className="text-[10px] sm:text-[11px] text-amber-600 uppercase tracking-[0.2em] font-semibold">
                Trusted by 12,000+ Customers Worldwide
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-light text-stone-800 tracking-tight leading-[1.15] mb-4 sm:mb-5">
              Crafted by Hand.
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
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

          {/* ─────────────────────────────────── */}
          {/* TRUST METRICS                        */}
          {/* ─────────────────────────────────── */}
          <div
            ref={metricsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-14 sm:mb-20 md:mb-24"
          >
            {TRUST_METRICS.map((metric, i) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={i}
                isInView={metricsInView}
              />
            ))}
          </div> 

          {/* ─────────────────────────────────── */}
          {/* TESTIMONIAL CAROUSEL                 */}
          {/* ─────────────────────────────────── */}
          <div className="mb-14 sm:mb-20 md:mb-24">
            {/* Carousel header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                <motion.button
                  onClick={prevSlide}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-amber-300 hover:shadow-md transition-all duration-300"
                  aria-label="Previous"
                >
                  <ChevronLeft size={15} />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-amber-300 hover:shadow-md transition-all duration-300"
                  aria-label="Next"
                >
                  <ChevronRight size={15} />
                </motion.button>
              </div>
            </motion.div>

            {/* Carousel track */}
            <div
              ref={carouselRef}
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseUp={(e) => handleDragEnd(e.clientX)}
              onMouseLeave={(e) => isDragging && handleDragEnd(e.clientX)}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
              onMouseEnter={() => setIsAutoPlaying(false)}
            >
              <motion.div
                className="flex"
                animate={{ x: -offsetX }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ gap: `${gap}px` }}
              >
                {TESTIMONIALS.map((testimonial, i) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={i}
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress bar + dots + auto-play */}
            <div className="mt-7 sm:mt-9 flex flex-col items-center gap-4">
              {/* Progress bar */}
              <div className="w-full max-w-xs h-0.5 bg-stone-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Dots + controls */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goToSlide(i);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 8000);
                    }}
                    className="relative p-1 focus:outline-none"
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    <motion.div
                      className="rounded-full"
                      animate={{
                        width: currentSlide === i ? 24 : 7,
                        height: 7,
                        backgroundColor:
                          currentSlide === i
                            ? 'rgb(217 119 6)'
                            : 'rgb(231 229 228)',
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </button>
                ))}

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="ml-2 w-6 h-6 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-amber-300 transition-all duration-300"
                  aria-label={isAutoPlaying ? 'Pause' : 'Resume'}
                >
                  {isAutoPlaying ? <Pause size={9} /> : <Play size={9} />}
                </button>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────── */}
          {/* PHOTO GALLERY                        */}
          {/* ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 sm:mb-20 md:mb-24"
          >
            {/* Gallery header */}
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

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.055 }}
                  className="relative group overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] cursor-pointer"
                  onMouseEnter={() => setGalleryHover(i)}
                  onMouseLeave={() => setGalleryHover(null)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <AnimatePresence>
                    {galleryHover === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3"
                      >
                        <span className="text-[9px] sm:text-[10px] text-white font-semibold uppercase tracking-wider drop-shadow-sm">
                          {img.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─────────────────────────────────── */}
          {/* TRUST BADGES                         */}
          {/* ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-100 bg-stone-50 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Subtle inner glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />

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
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.07 }}
                        className="group text-center p-4 rounded-xl border border-stone-100 bg-white shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-400 cursor-default"
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center group-hover:bg-amber-100 group-hover:border-amber-200 transition-all duration-400">
                          <Icon
                            size={16}
                            className="text-amber-500 group-hover:text-amber-600 transition-colors duration-400"
                            strokeWidth={1.6}
                          />
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium leading-snug group-hover:text-stone-700 transition-colors duration-400">
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