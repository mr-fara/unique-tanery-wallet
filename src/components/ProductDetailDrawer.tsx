import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import {
  X, Check, ShoppingBag, ShieldCheck, Award, ChevronDown,
  Minus, Plus, Star, Truck, RotateCcw, Package, ArrowRight,
  Scissors, Layers, ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CustomizationOptions } from '../types';

interface ProductDetailDrawerProps {
  product: Product;
  onClose: () => void;
  onAddToBag: (product: Product, customization: CustomizationOptions) => void;
}

// ── Static style tokens (defined once, never re-created) ──────────────────────
const SECTION_LABEL = 'text-[7px] sm:text-[8px] tracking-[0.3em] text-[#C9A96E] font-bold uppercase';
const STEP_TITLE = 'text-[9px] sm:text-[10px] font-bold text-[#1C1C1C] uppercase tracking-[0.2em]';

// ── Static data (defined outside component — zero re-creation cost) ───────────
const SERVICE_BADGES = [
  { icon: Truck,      label: 'Free Shipping', sub: 'Worldwide' },
  { icon: RotateCcw,  label: '30-Day Returns', sub: 'No questions asked' },
  { icon: Package,    label: 'Gift Wrapped',   sub: 'Complimentary' },
  { icon: Award,      label: 'Lifetime Stitch', sub: 'Warranty' },
] as const;

const TRUST_BADGES = [
  { icon: ShieldCheck, text: 'Secure Checkout' },
  { icon: RotateCcw,   text: '30-Day Exchange' },
  { icon: Award,       text: 'Lifetime Warranty' },
] as const;

const SPECS_STATIC = [
  { label: 'Stitching Method', value: 'Traditional 2-needle hand saddle-stitch' },
  { label: 'Thread',           value: 'French Au Chinois waxed linen yarn' },
  { label: 'Edge Finish',      value: '5 coats heated beeswax-infused burnish' },
  { label: 'Hardware',         value: 'Solid brass, electroplated' },
  { label: 'Origin',           value: 'Unique Tanery Atelier, Madagascar' },
  { label: 'Craft Time',       value: '40–60 hours per piece' },
] as const;

const HW_COLORS: Record<string, string> = {
  Gold: '#C9A96E', Silver: '#C0C0C0', Ruthenium: '#3A3A3A',
  Palladium: '#E8E8E8', 'Antique Gold': '#B8860B', 'Rose Gold': '#E8A090',
};

const STITCH_OPTIONS = [
  {
    value: 'tonal' as const,
    title: 'Tonal Match',
    badge: 'Classic',
    sub: 'Thread colour matched to leather dye — understated & monochromatic.',
    dotColor: '#8B7355',
  },
  {
    value: 'contrasting' as const,
    title: 'Ecru Contrast',
    badge: 'Heritage',
    sub: 'Natural unbleached French flax linen thread — each diagonal stitch visible.',
    dotColor: '#E8D5A3',
  },
] as const;

const CRAFT_STATS = [
  { icon: Scissors,   label: '40+ Hours', sub: 'Per piece' },
  { icon: Layers,     label: '5 Coats',   sub: 'Beeswax edge' },
  { icon: ShieldCheck, label: 'Lifetime', sub: 'Stitch warranty' },
] as const;

// ── Minimal spring / transition presets ───────────────────────────────────────
const DRAWER_SPRING  = { type: 'spring', damping: 32, stiffness: 280 } as const;
const TOAST_SPRING   = { type: 'spring', damping: 22, stiffness: 300 } as const;
const FADE_FAST      = { duration: 0.2 } as const;
const FADE_MED       = { duration: 0.3, ease: 'easeOut' } as const;
const COLLAPSE_TRANS = { duration: 0.25, ease: 'easeInOut' } as const;

// ── Sub-components (memoised to prevent parent re-render cascade) ─────────────

const StepBadge = memo(function StepBadge({
  num, active, done,
}: { num: number; active: boolean; done: boolean }) {
  return (
    <div className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[7px] sm:text-[8px] font-bold shrink-0 transition-colors duration-200 ${
      done  ? 'bg-[#C9A96E] text-white'
      : active ? 'bg-[#1C1C1C] text-[#C9A96E] ring-1 ring-[#C9A96E]/30'
      : 'bg-[#F0EBE3] text-[#9E9E9E]'
    }`}>
      {done ? <Check size={8} strokeWidth={3} /> : num}
    </div>
  );
});

const GoldDivider = memo(function GoldDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />;
});

// Thumbnail strip — isolated so image switching doesn't repaint the whole drawer
const ThumbnailStrip = memo(function ThumbnailStrip({
  images, activeIndex, onSelect,
}: { images: string[]; activeIndex: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-2 overflow-hidden transition-all duration-200 ${
            activeIndex === idx
              ? 'border-[#C9A96E] scale-105 ring-1 ring-[#C9A96E]/30'
              : 'border-white/20 hover:border-white/60 opacity-60 hover:opacity-100'
          }`}
        >
          <img
            src={img}
            alt={`View ${idx + 1}`}
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          {activeIndex === idx && (
            <div className="absolute inset-0 bg-[#C9A96E]/10 pointer-events-none" />
          )}
        </button>
      ))}
    </div>
  );
});

// Dot strip — also isolated
const DotStrip = memo(function DotStrip({
  count, activeIndex, onSelect,
}: { count: number; activeIndex: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {Array.from({ length: count }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`block rounded-full transition-all duration-200 ${
            activeIndex === idx
              ? 'w-4 h-1.5 bg-[#C9A96E]'
              : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
          }`}
        />
      ))}
    </div>
  );
});

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductDetailDrawer({
  product, onClose, onAddToBag,
}: ProductDetailDrawerProps) {

  // Computed once per product, not every render
  const allImages = useMemo(
    () => [product.imageUrl, ...product.secondaryImages],
    [product.imageUrl, product.secondaryImages]
  );

  // ── State ─────────────────────────────────────────────────────────────────
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded]           = useState(false);
  const [imageZoomed, setImageZoomed]           = useState(false);
  const [stitching, setStitching]               = useState<'contrasting' | 'tonal'>('tonal');
  const [hardware, setHardware]                 = useState<string>(
    product.hardwareOptions?.[0] ?? ''
  );
  const [quantity, setQuantity]                 = useState(1);
  const [activeSection, setActiveSection]       = useState<string | null>('heritage');
  const [currentStep, setCurrentStep]           = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const totalSteps      = product.hardwareOptions ? 2 : 1;
  const progressPercent = (currentStep / totalSteps) * 100;

  // ── Reset on product change ───────────────────────────────────────────────
  useEffect(() => {
    setActiveImageIndex(0);
    setImageLoaded(false);
    setImageZoomed(false);
    setStitching('tonal');
    if (product.hardwareOptions) setHardware(product.hardwareOptions[0]);
    setQuantity(1);
    setCurrentStep(1);
  }, [product]);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ── Image navigation ──────────────────────────────────────────────────────
  const selectImage = useCallback((idx: number) => {
    setImageLoaded(false);
    setActiveImageIndex(idx);
  }, []);

  const goToPrev = useCallback(() => {
    setImageLoaded(false);
    setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setImageLoaded(false);
    setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // ── Keyboard — stable deps, registered once ───────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goToPrev, goToNext, onClose]);

  // ── Add to bag ────────────────────────────────────────────────────────────
  const handleAddToBag = useCallback(() => {
    const opts: CustomizationOptions = {
      stitching,
      hardware: product.hardwareOptions ? hardware : undefined,
    };
    for (let i = 0; i < quantity; i++) onAddToBag(product, opts);
    setShowNotification(true);
    setTimeout(() => { setShowNotification(false); onClose(); }, 1600);
  }, [stitching, hardware, product, quantity, onAddToBag, onClose]);

  const toggleSection = useCallback((s: string) => {
    setActiveSection(prev => (prev === s ? null : s));
  }, []);

  const toggleZoom = useCallback(() => setImageZoomed(z => !z), []);

  // ── Derived values (no re-computation on unrelated state) ─────────────────
  const totalPrice  = product.price * quantity;
  const stitchLabel = stitching === 'tonal' ? 'Tonal Stitch' : 'Ecru Stitch';

  const specs = useMemo(() => [
    { label: 'Dimensions', value: product.dimensions ?? 'Custom tailored' },
    ...SPECS_STATIC,
  ], [product.dimensions]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={FADE_FAST}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* ── Drawer ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={DRAWER_SPRING}
        className="relative w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8E0D4]"
      >

        {/* ══ STICKY HEADER ════════════════════════════════════════════ */}
        <div className="sticky top-0 z-30 bg-[#1C1C1C] border-b border-[#C9A96E]/20">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3 min-w-0">
                <div className="w-px h-8 bg-[#C9A96E]/40 shrink-0" />
                <div className="min-w-0">
                  <p className={SECTION_LABEL}>Configurateur d'Atelier</p>
                  <h2 className="text-xs sm:text-sm font-light text-white uppercase tracking-[0.2em] font-serif truncate mt-0.5">
                    {product.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[7px] text-[#9E9E9E] uppercase tracking-widest">From</span>
                  <span className="text-sm font-light text-white tracking-wider font-mono">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-[#C9A96E]/20 text-[#9E9E9E] hover:text-white hover:border-[#C9A96E]/50 transition-colors duration-200"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Progress stepper */}
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center gap-0 mb-2.5">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, idx) => (
                  <span key={step} className="contents">
                    <button
                      onClick={() => setCurrentStep(step)}
                      className="flex items-center gap-1.5"
                    >
                      <StepBadge num={step} active={currentStep === step} done={currentStep > step} />
                      <span className={`hidden sm:block text-[7px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                        currentStep >= step ? 'text-[#C9A96E]' : 'text-[#6B6B6B]'
                      }`}>
                        {step === 1 ? 'Stitch' : 'Hardware'}
                      </span>
                    </button>
                    {idx < totalSteps - 1 && (
                      <div className={`flex-1 h-px mx-1.5 sm:mx-2 transition-colors duration-300 ${
                        currentStep > step ? 'bg-[#C9A96E]' : 'bg-[#3A3A3A]'
                      }`} />
                    )}
                  </span>
                ))}
              </div>

              {/* Progress bar — only width animates, nothing else */}
              <div className="w-full h-[2px] bg-[#2A2A2A] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A96E] to-[#B8860B]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══ SCROLLABLE BODY ══════════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* ── HERO IMAGE GALLERY ─────────────────────────────────── */}
          <div className="relative bg-[#1C1C1C] overflow-hidden group aspect-[4/3] sm:aspect-[16/9]">

            {/* Skeleton loader — CSS only, no JS animation */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C] z-10">
                <div className="w-8 h-8 border border-[#C9A96E]/30 border-t-[#C9A96E] animate-spin" />
              </div>
            )}

            {/* Single img — no AnimatePresence, CSS transition only */}
            <img
              key={activeImageIndex}
              src={allImages[activeImageIndex]}
              alt={`${product.name} — view ${activeImageIndex + 1} of ${allImages.length}`}
              className={`object-cover w-full h-full cursor-zoom-in transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${imageZoomed ? 'scale-110 cursor-zoom-out' : 'scale-100'} transition-transform duration-500 will-change-transform`}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onClick={toggleZoom}
              loading="eager"
              decoding="async"
            />

            {/* Bottom gradient */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            {/* Arrow navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-[#C9A96E]/40 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                  <ChevronLeft size={14} strokeWidth={1.5} />
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-[#C9A96E]/40 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                  <ChevronRight size={14} strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Zoom button */}
            <button
              onClick={toggleZoom}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm border border-white/10 hover:border-[#C9A96E]/40 p-1.5 opacity-0 group-hover:opacity-100 transition-colors duration-200 text-white/70 hover:text-white"
            >
              {imageZoomed ? <ZoomOut size={12} strokeWidth={1.5} /> : <ZoomIn size={12} strokeWidth={1.5} />}
            </button>

            {/* Material tag */}
            <div className="absolute bottom-16 left-3 sm:bottom-[72px] sm:left-4 z-10 flex items-center gap-2">
              <div className="bg-black/70 backdrop-blur-sm border border-[#C9A96E]/30 px-2.5 py-1.5">
                <p className="text-[7px] sm:text-[8px] tracking-[0.2em] text-[#C9A96E] uppercase font-bold">
                  {product.leatherType}
                </p>
                <p className="text-[8px] sm:text-[9px] text-white font-light tracking-wider mt-0.5">
                  View {activeImageIndex + 1} of {allImages.length}
                </p>
              </div>
              {product.isBestseller && (
                <div className="bg-[#C9A96E] px-2 py-1">
                  <p className="text-[6px] sm:text-[7px] text-white font-bold uppercase tracking-wider">
                    Bestseller
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail + dots */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between gap-3">
              <ThumbnailStrip
                images={allImages}
                activeIndex={activeImageIndex}
                onSelect={selectImage}
              />
              <DotStrip
                count={allImages.length}
                activeIndex={activeImageIndex}
                onSelect={selectImage}
              />
            </div>
          </div>

          {/* ── PRODUCT INFO ───────────────────────────────────────── */}
          <div className="bg-white border-b border-[#E8E0D4] px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className={`${SECTION_LABEL} mb-1`}>{product.category.replace('-', ' ')}</p>
                <h1 className="text-lg sm:text-xl md:text-2xl font-light text-[#1C1C1C] uppercase tracking-[0.15em] font-serif leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-0.5">
                    {[0,1,2,3,4].map(i => (
                      <Star key={i} size={9} className="text-[#C9A96E]" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[8px] text-[#9E9E9E] tracking-wider">(Artisan Crafted)</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[7px] text-[#9E9E9E] uppercase tracking-widest mb-0.5">Price</p>
                <p className="text-xl sm:text-2xl font-light text-[#1C1C1C] tracking-wider font-mono">
                  ${product.price.toLocaleString()}
                </p>
                <span className="inline-block mt-1 text-[7px] sm:text-[8px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 uppercase tracking-wider font-bold">
                  In Stock
                </span>
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-[#6B6B6B] font-light leading-relaxed mt-3 sm:mt-4">
              {product.description}
            </p>

            {/* Service badges */}
            <div className="flex flex-wrap gap-3 sm:gap-5 mt-3 pt-3 border-t border-[#F0EBE3]">
              {SERVICE_BADGES.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-6 h-6 bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center shrink-0">
                    <Icon size={10} className="text-[#C9A96E]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-[#1C1C1C] uppercase tracking-wider leading-none">{label}</p>
                    <p className="text-[7px] text-[#9E9E9E] font-light mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONFIGURATION ──────────────────────────────────────── */}
          <div className="p-4 sm:p-6 space-y-1">

            {/* STEP 1: Stitching */}
            {product.stitchingOptions && (
              <div className="bg-white border border-[#E8E0D4] overflow-hidden">
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#F0EBE3] bg-[#FAF7F2]">
                  <StepBadge num={1} active={currentStep === 1} done={currentStep > 1} />
                  <div>
                    <p className={STEP_TITLE}>Saddle Stitch Thread</p>
                    <p className="text-[8px] text-[#9E9E9E] font-light mt-0.5 tracking-wider">
                      Traditional 2-needle hand stitching
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STITCH_OPTIONS.map(opt => {
                    const sel = stitching === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setStitching(opt.value);
                          setCurrentStep(s => Math.max(s, 1));
                        }}
                        className={`relative p-4 border text-left transition-colors duration-200 ${
                          sel
                            ? 'border-[#1C1C1C] bg-white shadow-sm'
                            : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                        }`}
                      >
                        {sel && (
                          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#B8860B]" />
                        )}
                        <div className="flex items-start justify-between mb-2">
                          <div className="space-y-0.5">
                            <p className="text-[9px] sm:text-[10px] font-bold text-[#1C1C1C] uppercase tracking-[0.15em]">
                              {opt.title}
                            </p>
                            <span className="inline-block text-[6px] sm:text-[7px] font-bold uppercase tracking-wider text-[#C9A96E] border border-[#C9A96E]/30 px-1.5 py-0.5">
                              {opt.badge}
                            </span>
                          </div>
                          <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                            sel ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-[#E8E0D4]'
                          }`}>
                            {sel && <Check size={8} className="text-white" strokeWidth={3} />}
                          </div>
                        </div>
                        <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] font-light leading-relaxed">
                          {opt.sub}
                        </p>
                        {/* Stitch preview — pure CSS, no motion */}
                        <div className="mt-3 flex items-center gap-0.5">
                          {Array.from({ length: 12 }, (_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-[2px] ${i % 2 === 0 ? 'opacity-100' : 'opacity-30'}`}
                              style={{ backgroundColor: opt.dotColor }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Hardware */}
            {product.hardwareOptions && (
              <div className="bg-white border border-[#E8E0D4] overflow-hidden">
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#F0EBE3] bg-[#FAF7F2]">
                  <StepBadge num={2} active={currentStep === 2} done={currentStep > 2} />
                  <div>
                    <p className={STEP_TITLE}>Hardware Finish</p>
                    <p className="text-[8px] text-[#9E9E9E] font-light mt-0.5 tracking-wider">
                      Solid metal fittings, electroplated finish
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-wrap gap-2">
                  {product.hardwareOptions.map(opt => {
                    const sel = hardware === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setHardware(opt);
                          setCurrentStep(s => Math.max(s, 2));
                        }}
                        className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 border text-left transition-colors duration-200 ${
                          sel
                            ? 'border-[#1C1C1C] bg-white shadow-sm'
                            : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                        }`}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full border shrink-0"
                          style={{
                            backgroundColor: HW_COLORS[opt] ?? '#9E9E9E',
                            borderColor: sel ? '#1C1C1C' : 'rgba(0,0,0,0.1)',
                          }}
                        />
                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                          sel ? 'text-[#1C1C1C]' : 'text-[#9E9E9E]'
                        }`}>{opt}</span>
                        {sel && <Check size={9} className="text-[#C9A96E] ml-1" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COLLAPSIBLE: Heritage */}
            <CollapsibleSection
              id="heritage"
              active={activeSection === 'heritage'}
              onToggle={toggleSection}
              icon={Award}
              title="Heritage & Craft Story"
            >
              <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[#1C1C1C]">
                  <div className="w-px self-stretch bg-[#C9A96E]/40 shrink-0" />
                  <p className="text-[9px] sm:text-[10px] text-neutral-300 font-light italic leading-relaxed">
                    "{product.story}"
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {CRAFT_STATS.map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-[#FAF7F2] border border-[#E8E0D4] text-center">
                      <Icon size={12} className="text-[#C9A96E]" strokeWidth={1.5} />
                      <p className="text-[8px] sm:text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wide">{label}</p>
                      <p className="text-[7px] text-[#9E9E9E] font-light">{sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {product.secondaryImages.slice(0, 3).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectImage(idx + 1)}
                      className="aspect-square overflow-hidden border border-[#E8E0D4] hover:border-[#C9A96E]/50 transition-colors duration-200 group/img"
                    >
                      <img
                        src={img}
                        alt={`${product.name} detail ${idx + 1}`}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[7px] text-[#9E9E9E] text-center uppercase tracking-widest font-light">
                  Click any image to view full size ↑
                </p>
              </div>
            </CollapsibleSection>

            {/* COLLAPSIBLE: Specifications */}
            <CollapsibleSection
              id="specs"
              active={activeSection === 'specs'}
              onToggle={toggleSection}
              icon={Layers}
              title="Technical Specifications"
            >
              <div className="divide-y divide-[#F0EBE3]">
                {specs.map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 px-4 sm:px-5 py-3">
                    <span className="text-[8px] sm:text-[9px] text-[#9E9E9E] uppercase tracking-wider font-mono shrink-0 mt-0.5">
                      {label}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-[#1C1C1C] font-medium text-right leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <div className="h-2" />
          </div>
        </div>

        {/* ══ STICKY FOOTER ════════════════════════════════════════════ */}
        <div className="sticky bottom-0 z-30 bg-white border-t border-[#E8E0D4] shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">

          {/* Config summary */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-[#F0EBE3] bg-[#FAF7F2]">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
              <span className="text-[7px] sm:text-[8px] text-[#6B6B6B] uppercase tracking-wider font-semibold shrink-0">
                {stitchLabel}
              </span>
              {hardware && (
                <>
                  <span className="text-[#E8E0D4] text-[8px] shrink-0">·</span>
                  <span className="text-[7px] sm:text-[8px] text-[#6B6B6B] uppercase tracking-wider font-semibold shrink-0">
                    {hardware}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-3">
            {/* Quantity + Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-[#E8E0D4] bg-[#FAF7F2]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#9E9E9E] hover:text-[#1C1C1C] disabled:opacity-30 transition-colors border-r border-[#E8E0D4]"
                >
                  <Minus size={12} />
                </button>
                <span className="px-3 sm:px-4 text-[11px] sm:text-xs font-bold text-[#1C1C1C] min-w-[32px] text-center tracking-wider">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(5, q + 1))}
                  disabled={quantity >= 5}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#9E9E9E] hover:text-[#1C1C1C] disabled:opacity-30 transition-colors border-l border-[#E8E0D4]"
                >
                  <Plus size={12} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-[7px] sm:text-[8px] text-[#9E9E9E] uppercase tracking-widest mb-0.5">
                  {quantity > 1 ? `${quantity} × $${product.price.toLocaleString()}` : 'Total'}
                </p>
                <p className="text-lg sm:text-xl font-light text-[#1C1C1C] tracking-wider font-mono">
                  ${totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToBag}
              className="w-full py-4 bg-[#1C1C1C] hover:bg-[#C9A96E] text-white text-[10px] sm:text-[11px] tracking-[0.25em] font-bold uppercase transition-colors duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {/* Shimmer — CSS only */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <ShoppingBag size={14} strokeWidth={1.5} />
              <span>Add to Bag — ${totalPrice.toLocaleString()}</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Trust */}
            <div className="flex items-center justify-center gap-4">
              {TRUST_BADGES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1 text-[7px] sm:text-[8px] text-[#9E9E9E] uppercase tracking-wider">
                  <Icon size={9} className="text-[#C9A96E]/70" strokeWidth={1.5} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══ SUCCESS TOAST ════════════════════════════════════════════ */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={TOAST_SPRING}
            className="fixed bottom-24 sm:bottom-28 left-4 right-4 sm:left-auto sm:right-6 z-[60] sm:max-w-sm"
          >
            <div className="bg-[#1C1C1C] border border-[#C9A96E]/30 shadow-2xl overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#B8860B]" />
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-8 h-8 bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-[#C9A96E]" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                    Added to Your Bag
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] font-light mt-0.5 tracking-wider truncate">
                    {quantity}× {product.name} · {stitchLabel}{hardware ? ` · ${hardware}` : ''}
                  </p>
                </div>
                <ShoppingBag size={14} className="text-[#C9A96E] shrink-0" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Reusable collapsible — isolated memo so other sections don't re-render ────
const CollapsibleSection = memo(function CollapsibleSection({
  id, active, onToggle, icon: Icon, title, children,
}: {
  id: string;
  active: boolean;
  onToggle: (id: string) => void;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  const handleToggle = useCallback(() => onToggle(id), [id, onToggle]);

  return (
    <div className="bg-white border border-[#E8E0D4] overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-[#FAF7F2] transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center">
            <Icon size={11} className="text-[#C9A96E]" strokeWidth={1.5} />
          </div>
          <p className="text-[9px] sm:text-[10px] font-bold text-[#1C1C1C] uppercase tracking-[0.2em]">
            {title}
          </p>
        </div>
        <motion.div
          animate={{ rotate: active ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={15} className="text-[#C9A96E]" strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <GoldDivider />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});