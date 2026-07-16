import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  ShieldCheck,
  Award,
  Feather,
  ChevronDown,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  Package,
  ArrowRight,
  Info,
  Scissors,
  Layers,
  ZoomIn,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColor, CustomizationOptions } from '../types';

interface ProductDetailDrawerProps {
  product: Product;
  initialColor: ProductColor;
  onClose: () => void;
  onAddToBag: (
    product: Product,
    selectedColor: ProductColor,
    customization: CustomizationOptions
  ) => void;
}

// ── Style tokens ──────────────────────────────────────────────────────────────
const SECTION_LABEL =
  'text-[7px] sm:text-[8px] tracking-[0.3em] text-[#C9A96E] font-bold uppercase';
const STEP_TITLE =
  'text-[9px] sm:text-[10px] font-bold text-[#1C1C1C] uppercase tracking-[0.2em]';

// ── Step Badge ────────────────────────────────────────────────────────────────
const StepBadge = ({
  num,
  active,
  done,
}: {
  num: number;
  active: boolean;
  done: boolean;
}) => (
  <div
    className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[7px] sm:text-[8px] font-bold shrink-0 transition-all duration-300 ${
      done
        ? 'bg-[#C9A96E] text-white'
        : active
        ? 'bg-[#1C1C1C] text-[#C9A96E] ring-1 ring-[#C9A96E]/30'
        : 'bg-[#F0EBE3] text-[#9E9E9E]'
    }`}
  >
    {done ? <Check size={8} strokeWidth={3} /> : num}
  </div>
);

// ── Divider ───────────────────────────────────────────────────────────────────
const GoldDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
);

// ── Filter util ───────────────────────────────────────────────────────────────
const getFilterStyle = (hex: string) => {
  const map: Record<string, string> = {
    '#1a1a1a': 'brightness-[0.45] contrast-[1.2] grayscale',
    '#3d2516': 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]',
    '#63251e': 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]',
    '#4d5c41': 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]',
    '#1d2a45': 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]',
    '#be814e': 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]',
    '#d9531e': 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]',
    '#181e2b': 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]',
    '#8b8478': 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]',
    '#d9788e': 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]',
    '#1e2433': 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]',
    '#233827': 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]',
  };
  return map[hex.toLowerCase()] ?? '';
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductDetailDrawer({
  product,
  initialColor,
  onClose,
  onAddToBag,
}: ProductDetailDrawerProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(initialColor);
  const [stitching, setStitching] = useState<'contrasting' | 'tonal'>('tonal');
  const [hardware, setHardware] = useState<string>(
    product.hardwareOptions ? product.hardwareOptions[0] : ''
  );
  const [monogramText, setMonogramText] = useState('');
  const [foilColor, setFoilColor] = useState<'gold' | 'silver' | 'blind'>('gold');
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState<string | null>('heritage');
  const [currentStep, setCurrentStep] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  const totalSteps = product.hardwareOptions ? 4 : 3;
  const progressPercent = (currentStep / totalSteps) * 100;

  useEffect(() => {
    setSelectedColor(initialColor);
    setStitching('tonal');
    if (product.hardwareOptions) setHardware(product.hardwareOptions[0]);
    setMonogramText('');
    setFoilColor('gold');
    setQuantity(1);
    setCurrentStep(1);
    setImageLoaded(false);
    setImageZoomed(false);
  }, [product, initialColor]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleMonogramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z.]/g, '');
    if (val.length <= 4) setMonogramText(val);
  };

  const handleAddToBag = useCallback(() => {
    const customOpts: CustomizationOptions = {
      monogramText,
      foilColor,
      stitching,
      hardware: product.hardwareOptions ? hardware : undefined,
    };
    for (let i = 0; i < quantity; i++) {
      onAddToBag(product, selectedColor, customOpts);
    }
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 1600);
  }, [monogramText, foilColor, stitching, hardware, product, selectedColor, quantity, onAddToBag, onClose]);

  const toggleSection = (section: string) =>
    setActiveSection(activeSection === section ? null : section);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* ── Drawer Panel ── */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 280 }}
        className="relative w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8E0D4]"
      >

        {/* ══ STICKY HEADER ═══════════════════════════════════════════════════ */}
        <div className="sticky top-0 z-30 bg-[#1C1C1C] border-b border-[#C9A96E]/20">

          {/* Gold accent top line */}
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
                {/* Price badge */}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[7px] text-[#9E9E9E] uppercase tracking-widest">From</span>
                  <span className="text-sm font-light text-white tracking-wider font-mono">
                    ${product.price.toLocaleString()}
                  </span>
                </div>

                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-[#C9A96E]/20 text-[#9E9E9E] hover:text-white hover:border-[#C9A96E]/50 transition-all duration-200"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Progress stepper */}
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center gap-0 mb-2.5">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, idx) => (
                  <React.Fragment key={step}>
                    <button
                      onClick={() => setCurrentStep(step)}
                      className="flex items-center gap-1.5 group"
                    >
                      <StepBadge
                        num={step}
                        active={currentStep === step}
                        done={currentStep > step}
                      />
                      <span className={`hidden sm:block text-[7px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                        currentStep >= step ? 'text-[#C9A96E]' : 'text-[#6B6B6B]'
                      }`}>
                        {step === 1 ? 'Leather'
                          : step === 2 ? 'Stitch'
                          : step === 3 && product.hardwareOptions ? 'Hardware'
                          : 'Monogram'}
                      </span>
                    </button>
                    {idx < totalSteps - 1 && (
                      <div className={`flex-1 h-px mx-1.5 sm:mx-2 transition-all duration-500 ${
                        currentStep > step ? 'bg-[#C9A96E]' : 'bg-[#3A3A3A]'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full h-[2px] bg-[#2A2A2A] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A96E] to-[#B8860B]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══ SCROLLABLE BODY ══════════════════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth">

          {/* ── HERO IMAGE ─────────────────────────────────────────────────── */}
          <div className="relative bg-[#1C1C1C] overflow-hidden group">
            <div
              className={`transition-all duration-700 ${
                imageZoomed ? 'aspect-[4/3] sm:aspect-[4/3]' : 'aspect-[4/3] sm:aspect-[16/9]'
              }`}
            >
              {/* Loader */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C]">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 border border-[#C9A96E]/30 border-t-[#C9A96E]"
                      style={{ borderRadius: '0%' }}
                    />
                    <span className="text-[7px] text-[#C9A96E]/60 uppercase tracking-widest">
                      Loading...
                    </span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColor.name}
                  src={selectedColor.imageUrl}
                  alt={`${product.name} in ${selectedColor.name}`}
                  className={`object-cover w-full h-full transition-all duration-700 cursor-zoom-in ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  } ${imageZoomed ? 'cursor-zoom-out scale-110' : ''}`}
                  style={{ filter: getFilterStyle(selectedColor.hex) }}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onClick={() => setImageZoomed(!imageZoomed)}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                />
              </AnimatePresence>
            </div>

            {/* Gradient overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Material tag bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 8 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4"
            >
              <div className="flex items-center gap-2">
                <div className="bg-black/70 backdrop-blur-sm border border-[#C9A96E]/30 px-2.5 py-1.5">
                  <p className="text-[7px] sm:text-[8px] tracking-[0.2em] text-[#C9A96E] uppercase font-bold">
                    {product.leatherType}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-white font-light tracking-wider mt-0.5">
                    {selectedColor.name}
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
            </motion.div>

            {/* Zoom hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ delay: 0.6 }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm border border-white/10 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              <ZoomIn size={12} className="text-white/70" strokeWidth={1.5} />
            </motion.div>

            {/* Color thumbnails bottom-right */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex gap-1 sm:gap-1.5">
              {product.colors.slice(0, 6).map((color) => (
                <motion.button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color);
                    setImageLoaded(false);
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-5 h-5 sm:w-6 sm:h-6 border-2 transition-all duration-300 shadow-md ${
                    selectedColor.name === color.name
                      ? 'border-[#C9A96E] scale-110 ring-1 ring-[#C9A96E]/40'
                      : 'border-white/40 hover:border-white/80'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* ── PRODUCT INFO STRIP ─────────────────────────────────────────── */}
          <div className="bg-white border-b border-[#E8E0D4] px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className={SECTION_LABEL + ' mb-1'}>
                  {product.category.replace('-', ' ')}
                </p>
                <h1 className="text-lg sm:text-xl md:text-2xl font-light text-[#1C1C1C] uppercase tracking-[0.15em] font-serif leading-tight">
                  {product.name}
                </h1>
                {/* Stars */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
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
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Worldwide' },
                { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
                { icon: Package, label: 'Gift Wrapped', sub: 'Complimentary' },
                { icon: Award, label: 'Lifetime Stitch', sub: 'Warranty' },
              ].map(({ icon: Icon, label, sub }) => (
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

          {/* ── CONFIGURATION SECTIONS ─────────────────────────────────────── */}
          <div className="p-4 sm:p-6 space-y-1">

            {/* ── STEP 1: Leather Color ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[#E8E0D4] overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#F0EBE3] bg-[#FAF7F2]">
                <StepBadge num={1} active={currentStep === 1} done={currentStep > 1} />
                <div className="flex-1 min-w-0">
                  <p className={STEP_TITLE}>Select Leather Tone</p>
                  <p className="text-[8px] text-[#9E9E9E] font-light mt-0.5 tracking-wider">
                    {product.colors.length} colorways available in {product.leatherType}
                  </p>
                </div>
                {selectedColor && (
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className="w-4 h-4 border border-[#C9A96E]/40"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span className="text-[8px] text-[#C9A96E] font-bold uppercase tracking-wider hidden sm:block">
                      {selectedColor.name.split(' (')[0]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                {/* Selected color description */}
                <AnimatePresence mode="wait">
                  {selectedColor.desc && (
                    <motion.div
                      key={selectedColor.name}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-2.5 mb-4 p-3 bg-[#FAF7F2] border border-[#E8E0D4]"
                    >
                      <Info size={10} className="text-[#C9A96E] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <p className="text-[9px] sm:text-[10px] text-[#6B6B6B] font-light leading-relaxed">
                        {selectedColor.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Color grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.colors.map((color) => {
                    const sel = selectedColor.name === color.name;
                    return (
                      <motion.button
                        key={color.name}
                        onClick={() => {
                          setSelectedColor(color);
                          setImageLoaded(false);
                          setCurrentStep(Math.max(currentStep, 1));
                        }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex items-center gap-2.5 px-3 py-2.5 border text-left transition-all duration-200 group ${
                          sel
                            ? 'border-[#1C1C1C] bg-white shadow-sm'
                            : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/50 hover:bg-white'
                        }`}
                      >
                        {sel && (
                          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#C9A96E]" />
                        )}
                        {/* Square swatch instead of circle */}
                        <div
                          className={`w-5 h-5 shrink-0 border transition-all duration-200 ${
                            sel ? 'border-[#C9A96E]/60 scale-105' : 'border-neutral-200'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[8px] sm:text-[9px] font-semibold text-[#1C1C1C] uppercase tracking-wide truncate leading-tight">
                          {color.name.split(' (')[0]}
                        </span>
                        {sel && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-3.5 h-3.5 bg-[#C9A96E] flex items-center justify-center shrink-0"
                          >
                            <Check size={7} className="text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── STEP 2: Stitching ──────────────────────────────────────── */}
            {product.stitchingOptions && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-white border border-[#E8E0D4] overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#F0EBE3] bg-[#FAF7F2]">
                  <StepBadge num={2} active={currentStep === 2} done={currentStep > 2} />
                  <div>
                    <p className={STEP_TITLE}>Saddle Stitch Thread</p>
                    <p className="text-[8px] text-[#9E9E9E] font-light mt-0.5 tracking-wider">
                      Traditional 2-needle hand stitching
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      value: 'tonal' as const,
                      title: 'Tonal Match',
                      sub: 'Thread colour matched to leather dye — understated & monochromatic.',
                      badge: 'Classic',
                    },
                    {
                      value: 'contrasting' as const,
                      title: 'Ecru Contrast',
                      sub: 'Natural unbleached French flax linen thread — each diagonal stitch visible.',
                      badge: 'Heritage',
                    },
                  ].map((opt) => {
                    const sel = stitching === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        onClick={() => {
                          setStitching(opt.value);
                          setCurrentStep(Math.max(currentStep, 2));
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 border text-left transition-all duration-200 ${
                          sel
                            ? 'border-[#1C1C1C] bg-white shadow-sm'
                            : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                        }`}
                      >
                        {sel && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#B8860B]" />
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
                          <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                            sel ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-[#E8E0D4]'
                          }`}>
                            {sel && <Check size={8} className="text-white" strokeWidth={3} />}
                          </div>
                        </div>
                        <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] font-light leading-relaxed">
                          {opt.sub}
                        </p>
                        {/* Stitch visualisation */}
                        <div className="mt-3 flex items-center gap-0.5">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-[2px] ${i % 2 === 0 ? 'opacity-100' : 'opacity-30'} transition-colors duration-300`}
                              style={{
                                backgroundColor:
                                  opt.value === 'tonal' ? selectedColor.hex : '#E8D5A3',
                              }}
                            />
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Hardware ──────────────────────────────────────── */}
            {product.hardwareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-[#E8E0D4] overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#F0EBE3] bg-[#FAF7F2]">
                  <StepBadge num={3} active={currentStep === 3} done={currentStep > 3} />
                  <div>
                    <p className={STEP_TITLE}>Hardware Finish</p>
                    <p className="text-[8px] text-[#9E9E9E] font-light mt-0.5 tracking-wider">
                      Solid metal fittings, electroplated finish
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap gap-2">
                    {product.hardwareOptions.map((opt) => {
                      const sel = hardware === opt;
                      const hwColors: Record<string, string> = {
                        'Gold': '#C9A96E',
                        'Silver': '#C0C0C0',
                        'Ruthenium': '#3A3A3A',
                        'Palladium': '#E8E8E8',
                        'Antique Gold': '#B8860B',
                        'Rose Gold': '#E8A090',
                      };
                      const dotColor = hwColors[opt] ?? '#9E9E9E';
                      return (
                        <motion.button
                          key={opt}
                          onClick={() => {
                            setHardware(opt);
                            setCurrentStep(Math.max(currentStep, 3));
                          }}
                          whileTap={{ scale: 0.96 }}
                          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 border text-left transition-all duration-200 ${
                            sel
                              ? 'border-[#1C1C1C] bg-white shadow-sm'
                              : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                          }`}
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full border shrink-0"
                            style={{
                              backgroundColor: dotColor,
                              borderColor: sel ? '#1C1C1C' : 'rgba(0,0,0,0.1)',
                            }}
                          />
                          <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                            sel ? 'text-[#1C1C1C]' : 'text-[#9E9E9E]'
                          }`}>
                            {opt}
                          </span>
                          {sel && (
                            <Check size={9} className="text-[#C9A96E] ml-1" strokeWidth={3} />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── MONOGRAM ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white border border-[#E8E0D4] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#F0EBE3] bg-[#FAF7F2]">
                <StepBadge
                  num={totalSteps}
                  active={currentStep === totalSteps}
                  done={false}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={STEP_TITLE}>Bespoke Hot-Stamping</p>
                    <span className="text-[7px] font-bold uppercase tracking-wider text-[#9E9E9E] border border-[#E8E0D4] px-1.5 py-0.5">
                      Optional
                    </span>
                  </div>
                  <p className="text-[8px] text-[#9E9E9E] font-light mt-0.5 tracking-wider">
                    Traditional brass-type hand-pressed initials
                  </p>
                </div>
                <Feather size={12} className="text-[#C9A96E] shrink-0" strokeWidth={1.5} />
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                  {/* Left: Input controls */}
                  <div className="space-y-4">
                    {/* Initials input */}
                    <div>
                      <label className="block text-[8px] sm:text-[9px] tracking-[0.25em] text-[#9E9E9E] uppercase mb-2 font-semibold">
                        Initials <span className="text-[#E8E0D4]">(max 4 characters)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={monogramText}
                          onChange={(e) => {
                            handleMonogramChange(e);
                            setCurrentStep(totalSteps);
                          }}
                          placeholder="E.g. K.T.M"
                          className="w-full bg-[#FAF7F2] border border-[#E8E0D4] focus:bg-white focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/15 text-xs tracking-[0.3em] font-mono px-3.5 py-3 text-[#1C1C1C] focus:outline-none transition-all duration-200 uppercase placeholder:text-[#C9C2B8] placeholder:text-[10px] placeholder:tracking-wider"
                        />
                        {monogramText && (
                          <button
                            onClick={() => setMonogramText('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-[#1C1C1C] transition-colors"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                      <p className="text-[7px] text-[#9E9E9E] mt-1.5 font-light">
                        Letters A–Z and dots only. e.g. "J.P" or "MBK"
                      </p>
                    </div>

                    {/* Foil selection */}
                    <div>
                      <label className="block text-[8px] sm:text-[9px] tracking-[0.25em] text-[#9E9E9E] uppercase mb-2 font-semibold">
                        Gilding Finish
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {([
                          { key: 'gold' as const, label: 'Gold', symbol: '✦', color: '#C9A96E' },
                          { key: 'silver' as const, label: 'Silver', symbol: '◇', color: '#C0C0C0' },
                          { key: 'blind' as const, label: 'Blind', symbol: '▪', color: '#1C1C1C' },
                        ]).map(({ key, label, symbol, color }) => {
                          const sel = foilColor === key;
                          const disabled = !monogramText;
                          return (
                            <button
                              key={key}
                              onClick={() => !disabled && setFoilColor(key)}
                              disabled={disabled}
                              className={`flex flex-col items-center gap-1.5 py-3 border transition-all duration-200 ${
                                disabled
                                  ? 'opacity-35 cursor-not-allowed border-[#E8E0D4] bg-[#FAF7F2]'
                                  : sel
                                  ? 'border-[#1C1C1C] bg-white shadow-sm'
                                  : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                              }`}
                            >
                              <span style={{ color: disabled ? '#C9C2B8' : color }} className="text-base">
                                {symbol}
                              </span>
                              <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-wider ${
                                sel && !disabled ? 'text-[#1C1C1C]' : 'text-[#9E9E9E]'
                              }`}>
                                {label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right: Live preview */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#9E9E9E] uppercase font-semibold">
                      Live Preview
                    </label>

                    <div className="flex-1 flex flex-col items-center justify-center border border-[#E8E0D4] bg-[#FAF7F2] p-3 sm:p-4 min-h-[120px]">
                      {/* Leather card mock */}
                      <div
                        className="relative w-full max-w-[160px] aspect-[8/5] shadow-lg overflow-hidden"
                        style={{ backgroundColor: selectedColor.hex }}
                      >
                        {/* Grain texture overlay */}
                        <div className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 4px)',
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

                        <AnimatePresence mode="wait">
                          {monogramText ? (
                            <motion.div
                              key={`${monogramText}-${foilColor}`}
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.7 }}
                              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <span
                                className={`text-base sm:text-lg tracking-[0.3em] font-serif font-semibold drop-shadow-sm ${
                                  foilColor === 'gold'
                                    ? 'bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] bg-clip-text text-transparent'
                                    : foilColor === 'silver'
                                    ? 'bg-gradient-to-br from-slate-200 via-white to-slate-400 bg-clip-text text-transparent'
                                    : 'text-black/25'
                                }`}
                              >
                                {monogramText}
                              </span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="placeholder"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                            >
                              <Feather size={14} className="text-white/30" strokeWidth={1} />
                              <span className="text-[7px] text-white/30 uppercase tracking-[0.25em] font-light">
                                Your Initials
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {monogramText && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-[7px] text-[#9E9E9E] uppercase tracking-widest font-light"
                        >
                          {foilColor} gilding on {selectedColor.name.split(' (')[0]}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── COLLAPSIBLE: Heritage ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-[#E8E0D4] overflow-hidden"
            >
              <button
                onClick={() => toggleSection('heritage')}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-[#FAF7F2] transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center">
                    <Award size={11} className="text-[#C9A96E]" strokeWidth={1.5} />
                  </div>
                  <p className={STEP_TITLE}>Heritage & Craft Story</p>
                </div>
                <motion.div
                  animate={{ rotate: activeSection === 'heritage' ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={15} className="text-[#C9A96E]" strokeWidth={1.5} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeSection === 'heritage' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <GoldDivider />
                    <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-[#1C1C1C]">
                        <div className="w-px h-full bg-[#C9A96E]/40 self-stretch shrink-0" />
                        <p className="text-[9px] sm:text-[10px] text-neutral-300 font-light italic leading-relaxed">
                          "{product.story}"
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: Scissors, label: '40+ Hours', sub: 'Per piece' },
                          { icon: Layers, label: '5 Coats', sub: 'Beeswax edge' },
                          { icon: ShieldCheck, label: 'Lifetime', sub: 'Stitch warranty' },
                        ].map(({ icon: Icon, label, sub }) => (
                          <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-[#FAF7F2] border border-[#E8E0D4] text-center">
                            <Icon size={12} className="text-[#C9A96E]" strokeWidth={1.5} />
                            <p className="text-[8px] sm:text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wide">{label}</p>
                            <p className="text-[7px] text-[#9E9E9E] font-light">{sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── COLLAPSIBLE: Specifications ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white border border-[#E8E0D4] overflow-hidden"
            >
              <button
                onClick={() => toggleSection('specs')}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-[#FAF7F2] transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center">
                    <Layers size={11} className="text-[#C9A96E]" strokeWidth={1.5} />
                  </div>
                  <p className={STEP_TITLE}>Technical Specifications</p>
                </div>
                <motion.div
                  animate={{ rotate: activeSection === 'specs' ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={15} className="text-[#C9A96E]" strokeWidth={1.5} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeSection === 'specs' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <GoldDivider />
                    <div className="divide-y divide-[#F0EBE3]">
                      {[
                        { label: 'Dimensions', value: product.dimensions ?? 'Custom tailored' },
                        { label: 'Stitching Method', value: 'Traditional 2-needle hand saddle-stitch' },
                        { label: 'Thread', value: 'French Au Chinois waxed linen yarn' },
                        { label: 'Edge Finish', value: '5 coats heated beeswax-infused burnish' },
                        { label: 'Hardware', value: 'Solid brass, electroplated' },
                        { label: 'Origin', value: "Unique Tanery Atelier, Madagascar" },
                        { label: 'Craft Time', value: '40–60 hours per piece' },
                      ].map(({ label, value }) => (
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="h-2" />
          </div>
        </div>

        {/* ══ STICKY FOOTER ═══════════════════════════════════════════════════ */}
        <div className="sticky bottom-0 z-30 bg-white border-t border-[#E8E0D4] shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">

          {/* Configuration summary strip */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-[#F0EBE3] bg-[#FAF7F2]">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
              {[
                {
                  label: selectedColor.name.split(' (')[0],
                  dot: selectedColor.hex,
                },
                { label: stitching === 'tonal' ? 'Tonal Stitch' : 'Ecru Stitch' },
                ...(hardware ? [{ label: hardware }] : []),
                ...(monogramText ? [{ label: `"${monogramText}" ${foilColor}` }] : []),
              ].map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-[#E8E0D4] text-[8px] shrink-0">·</span>}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.dot && (
                      <div
                        className="w-2.5 h-2.5 shrink-0 border border-[#E8E0D4]"
                        style={{ backgroundColor: item.dot }}
                      />
                    )}
                    <span className="text-[7px] sm:text-[8px] text-[#6B6B6B] uppercase tracking-wider font-semibold whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-3">
            {/* Quantity + Price */}
            <div className="flex items-center justify-between">
              {/* Quantity */}
              <div className="flex items-center border border-[#E8E0D4] bg-[#FAF7F2]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#9E9E9E] hover:text-[#1C1C1C] disabled:opacity-30 transition-colors border-r border-[#E8E0D4]"
                >
                  <Minus size={12} />
                </button>
                <span className="px-3 sm:px-4 text-[11px] sm:text-xs font-bold text-[#1C1C1C] min-w-[32px] text-center tracking-wider">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  disabled={quantity >= 5}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#9E9E9E] hover:text-[#1C1C1C] disabled:opacity-30 transition-colors border-l border-[#E8E0D4]"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-[7px] sm:text-[8px] text-[#9E9E9E] uppercase tracking-widest mb-0.5">
                  {quantity > 1 ? `${quantity} × $${product.price.toLocaleString()}` : 'Total'}
                </p>
                <p className="text-lg sm:text-xl font-light text-[#1C1C1C] tracking-wider font-mono">
                  ${(product.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Add to bag button */}
            <motion.button
              onClick={handleAddToBag}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 sm:py-4.5 bg-[#1C1C1C] hover:bg-[#C9A96E] text-white text-[10px] sm:text-[11px] tracking-[0.25em] font-bold uppercase transition-all duration-500 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <ShoppingBag size={14} strokeWidth={1.5} />
              <span>Add to Bag — ${(product.price * quantity).toLocaleString()}</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {/* Trust strip */}
            <div className="flex items-center justify-center gap-4 pt-0.5">
              {[
                { icon: ShieldCheck, text: 'Secure Checkout' },
                { icon: RotateCcw, text: '30-Day Exchange' },
                { icon: Award, text: 'Lifetime Warranty' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1 text-[7px] sm:text-[8px] text-[#9E9E9E] uppercase tracking-wider">
                  <Icon size={9} className="text-[#C9A96E]/70" strokeWidth={1.5} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══ SUCCESS TOAST ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.93 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed bottom-24 sm:bottom-28 left-4 right-4 sm:left-auto sm:right-6 z-[60] sm:max-w-sm"
          >
            <div className="bg-[#1C1C1C] border border-[#C9A96E]/30 shadow-2xl overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#B8860B]" />
              <div className="flex items-center gap-4 px-5 py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
                  className="w-8 h-8 bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center shrink-0"
                >
                  <Check size={14} className="text-[#C9A96E]" strokeWidth={2} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                    Added to Your Bag
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] font-light mt-0.5 tracking-wider truncate">
                    {quantity}× {product.name} · {selectedColor.name.split(' (')[0]}
                    {monogramText ? ` · "${monogramText}"` : ''}
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