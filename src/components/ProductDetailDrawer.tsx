import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  ShieldCheck,
  Award,
  Feather,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  Package,
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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setSelectedColor(initialColor);
    setStitching('tonal');
    if (product.hardwareOptions) {
      setHardware(product.hardwareOptions[0]);
    }
    setMonogramText('');
    setFoilColor('gold');
    setQuantity(1);
    setCurrentStep(1);
    setImageLoaded(false);
  }, [product, initialColor]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleMonogramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z.]/g, '');
    if (val.length <= 4) {
      setMonogramText(val);
    }
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
    }, 1400);
  }, [
    monogramText,
    foilColor,
    stitching,
    hardware,
    product,
    selectedColor,
    quantity,
    onAddToBag,
    onClose,
  ]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const getFilterStyle = (hex: string) => {
    switch (hex.toLowerCase()) {
      case '#1a1a1a':
        return 'brightness-[0.45] contrast-[1.2] grayscale';
      case '#3d2516':
        return 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]';
      case '#63251e':
        return 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]';
      case '#4d5c41':
        return 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]';
      case '#1d2a45':
        return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]';
      case '#be814e':
        return 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]';
      case '#d9531e':
        return 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]';
      case '#181e2b':
        return 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]';
      case '#8b8478':
        return 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]';
      case '#d9788e':
        return 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]';
      case '#1e2433':
        return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]';
      case '#233827':
        return 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]';
      default:
        return '';
    }
  };

  const totalSteps = product.hardwareOptions ? 4 : 3;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10"
      >
        {/* ── Sticky Header ── */}
        <div className="sticky top-0 bg-white/98 backdrop-blur-md z-20 border-b border-neutral-100 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-amber-800 font-semibold uppercase">
                Configurateur d'Atelier
              </span>
              <h2 className="text-sm sm:text-base font-medium text-neutral-800 uppercase tracking-wider font-serif truncate">
                Configure Your Piece
              </h2>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 -mr-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-300 rounded-full flex-shrink-0"
              whileTap={{ scale: 0.9 }}
              id="close-drawer-btn"
            >
              <X size={20} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 sm:mt-4">
            <div className="flex items-center justify-between mb-1.5">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                (step) => (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(step)}
                    className={`flex items-center gap-1.5 transition-all duration-300 ${
                      step <= currentStep
                        ? 'text-amber-800'
                        : 'text-neutral-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-bold transition-all duration-300 ${
                        step < currentStep
                          ? 'bg-amber-800 text-white'
                          : step === currentStep
                          ? 'bg-amber-50 border-2 border-amber-800 text-amber-800'
                          : 'bg-neutral-50 border border-neutral-200 text-neutral-400'
                      }`}
                    >
                      {step < currentStep ? (
                        <Check size={10} strokeWidth={3} />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-medium hidden sm:inline">
                      {step === 1
                        ? 'Leather'
                        : step === 2
                        ? 'Stitch'
                        : step === 3 && product.hardwareOptions
                        ? 'Hardware'
                        : 'Monogram'}
                    </span>
                  </button>
                )
              )}
            </div>
            <div className="w-full h-0.5 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-800 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 text-left">
            {/* ── Product Image ── */}
            <div className="relative overflow-hidden bg-stone-100 border border-stone-200">
              <div className="aspect-[4/3] sm:aspect-[16/10]">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-amber-800/30 border-t-amber-800 rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  key={selectedColor.name}
                  src={selectedColor.imageUrl}
                  alt={`${product.name} in ${selectedColor.name}`}
                  className={`object-cover w-full h-full transition-all duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ filter: getFilterStyle(selectedColor.hex) }}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Material Tag */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 border border-stone-200 text-[8px] sm:text-[10px] tracking-[0.15em] text-neutral-700 uppercase"
              >
                {product.leatherType} • {selectedColor.name}
              </motion.div>

              {/* Thumbnail strip */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-1 sm:gap-1.5">
                {product.colors.slice(0, 5).map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      setImageLoaded(false);
                    }}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-300 shadow-sm ${
                      selectedColor.name === color.name
                        ? 'border-white scale-110 ring-2 ring-amber-800'
                        : 'border-white/60 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* ── Product Info ── */}
            <div className="space-y-3 border-b border-neutral-100 pb-5 sm:pb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-neutral-900 uppercase tracking-wider font-serif leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-neutral-400 tracking-wider">
                      (Artisan Crafted)
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg sm:text-xl font-medium text-neutral-900 tracking-wider">
                    ${product.price}
                  </span>
                  <span className="block text-[8px] sm:text-[9px] text-emerald-700 tracking-wider font-medium uppercase mt-1 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">
                    In Stock
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Quick info badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: RotateCcw, text: '30-Day Returns' },
                  { icon: Package, text: 'Gift Wrapped' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-neutral-400 tracking-wider uppercase"
                  >
                    <Icon
                      size={11}
                      className="text-neutral-300"
                      strokeWidth={1.5}
                    />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Step 1: Leather Color ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-[0.18em]">
                  Select Your Leather Tone
                </h3>
              </div>

              {selectedColor.desc && (
                <p className="text-[10px] sm:text-[11px] text-neutral-500 font-light leading-relaxed pl-7">
                  {selectedColor.desc}
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pl-7">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      setImageLoaded(false);
                      setCurrentStep(Math.max(currentStep, 1));
                    }}
                    className={`px-2.5 py-2 sm:px-3 sm:py-2.5 border flex items-center gap-2 transition-all duration-300 ${
                      selectedColor.name === color.name
                        ? 'border-neutral-800 bg-white shadow-sm ring-1 ring-neutral-200'
                        : 'border-neutral-100 hover:border-neutral-300 bg-stone-50/50'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border flex-shrink-0 shadow-sm transition-transform duration-300 ${
                        selectedColor.name === color.name
                          ? 'border-neutral-400 scale-110'
                          : 'border-neutral-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[9px] sm:text-[10px] text-neutral-700 tracking-wider truncate">
                      {color.name.split(' (')[0]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ── Step 2: Stitching ── */}
            {product.stitchingOptions && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 transition-colors duration-300 ${
                      currentStep >= 2
                        ? 'bg-amber-800 text-white'
                        : 'bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    2
                  </div>
                  <h3 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-[0.18em]">
                    Choose Thread Styling
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                  {[
                    {
                      value: 'tonal' as const,
                      title: 'Tonal Match',
                      desc: 'Thread matches leather dye for an understated, monochromatic style.',
                    },
                    {
                      value: 'contrasting' as const,
                      title: 'Ecru Contrast',
                      desc: 'Natural unbleached French flax thread highlighting each diagonal saddle-stitch.',
                    },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => {
                        setStitching(option.value);
                        setCurrentStep(Math.max(currentStep, 2));
                      }}
                      className={`p-3 sm:p-4 border text-left transition-all duration-300 ${
                        stitching === option.value
                          ? 'border-neutral-800 bg-white shadow-sm'
                          : 'border-neutral-100 hover:border-neutral-300 bg-stone-50/50'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center w-full mb-2">
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-800">
                          {option.title}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            stitching === option.value
                              ? 'bg-amber-800 border-amber-800'
                              : 'border-neutral-200'
                          }`}
                        >
                          {stitching === option.value && (
                            <Check
                              size={9}
                              className="text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light leading-relaxed">
                        {option.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 3: Hardware (if available) ── */}
            {product.hardwareOptions && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 transition-colors duration-300 ${
                      currentStep >= 3
                        ? 'bg-amber-800 text-white'
                        : 'bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    3
                  </div>
                  <h3 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-[0.18em]">
                    Hardware Finish
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 pl-7">
                  {product.hardwareOptions.map((opt) => (
                    <motion.button
                      key={opt}
                      onClick={() => {
                        setHardware(opt);
                        setCurrentStep(Math.max(currentStep, 3));
                      }}
                      className={`px-3 py-2 sm:px-4 sm:py-2.5 border text-[9px] sm:text-[10px] tracking-wider transition-all duration-300 uppercase ${
                        hardware === opt
                          ? 'border-neutral-800 bg-white font-semibold shadow-sm'
                          : 'border-neutral-100 hover:border-neutral-300 text-neutral-500 bg-stone-50/50'
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Monogram Section ── */}
            <div className="space-y-4 pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 transition-colors duration-300 ${
                    currentStep >= totalSteps
                      ? 'bg-amber-800 text-white'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {totalSteps}
                </div>
                <Feather
                  size={14}
                  className="text-amber-800"
                  strokeWidth={1.5}
                />
                <h3 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-[0.18em]">
                  Bespoke Hot-Stamping
                  <span className="text-neutral-400 font-normal ml-1.5 normal-case tracking-normal">
                    (Optional)
                  </span>
                </h3>
              </div>

              <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light leading-relaxed pl-7">
                Hand-pressed brass initials stamped directly into the leather
                using traditional hot-brass type.
              </p>

              <div className="ml-7 bg-stone-50 border border-stone-100 p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                  {/* Input & Foil */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                        Enter Initials (Max 4)
                      </label>
                      <input
                        type="text"
                        value={monogramText}
                        onChange={(e) => {
                          handleMonogramChange(e);
                          setCurrentStep(totalSteps);
                        }}
                        placeholder="E.g. K.T.M"
                        className="w-full bg-white border border-neutral-200 text-xs tracking-[0.2em] font-mono px-3 py-2.5 text-neutral-800 focus:outline-none focus:border-amber-800 focus:ring-1 focus:ring-amber-800/20 transition-all duration-300 uppercase placeholder:text-neutral-300 placeholder:text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                        Gilding Finish
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            { key: 'gold', label: 'Gold', icon: '✦' },
                            { key: 'silver', label: 'Silver', icon: '◇' },
                            { key: 'blind', label: 'Blind', icon: '▪' },
                          ] as const
                        ).map(({ key, label, icon }) => (
                          <button
                            key={key}
                            onClick={() => setFoilColor(key)}
                            disabled={!monogramText}
                            className={`px-1.5 py-2 border text-[8px] sm:text-[9px] tracking-wider uppercase transition-all duration-300 flex flex-col items-center gap-0.5 ${
                              !monogramText
                                ? 'opacity-40 cursor-not-allowed border-neutral-100'
                                : foilColor === key
                                ? 'border-neutral-800 bg-white font-semibold text-neutral-800'
                                : 'border-neutral-200 hover:border-neutral-400 text-neutral-500 bg-white/60'
                            }`}
                          >
                            <span className="text-[10px]">{icon}</span>
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white border border-neutral-100 rounded-sm">
                    <span className="text-[7px] sm:text-[8px] tracking-[0.3em] text-neutral-300 font-medium uppercase mb-2 sm:mb-3">
                      Live Preview
                    </span>
                    <div
                      className="w-full max-w-[140px] sm:max-w-[160px] aspect-[8/5] shadow-md relative flex items-center justify-center overflow-hidden transition-colors duration-500 rounded-sm"
                      style={{
                        backgroundColor: selectedColor.hex,
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Texture overlay */}
                      <div className="absolute inset-0 bg-black/10 mix-blend-overlay opacity-60 pointer-events-none" />

                      <AnimatePresence mode="wait">
                        {monogramText ? (
                          <motion.span
                            key={`${monogramText}-${foilColor}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className={`text-sm sm:text-base tracking-[0.25em] font-serif font-semibold ${
                              foilColor === 'gold'
                                ? 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] bg-clip-text text-transparent drop-shadow-sm'
                                : foilColor === 'silver'
                                ? 'bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 bg-clip-text text-transparent'
                                : 'text-black/30'
                            }`}
                          >
                            {monogramText}
                          </motion.span>
                        ) : (
                          <span className="text-[8px] sm:text-[9px] text-white/30 tracking-wider font-light uppercase">
                            Your Initials
                          </span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Heritage Story (collapsible) ── */}
            <div className="border-t border-neutral-100 pt-4">
              <button
                onClick={() => toggleSection('heritage')}
                className="w-full flex items-center justify-between py-2 group"
              >
                <div className="flex items-center gap-2">
                  <Award
                    size={14}
                    className="text-amber-800"
                    strokeWidth={1.5}
                  />
                  <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-[0.15em]">
                    Heritage & Story
                  </h4>
                </div>
                <motion.div
                  animate={{ rotate: activeSection === 'heritage' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={16}
                    className="text-neutral-300 group-hover:text-neutral-500"
                  />
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
                    <div className="bg-stone-50 p-4 sm:p-5 border border-stone-100 space-y-3 mt-2">
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 font-light italic leading-relaxed">
                        "{product.story}"
                      </p>
                      <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-amber-800 font-medium uppercase">
                        <Award size={12} />
                        <span>40+ hours of hand-craftsmanship per piece</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Specifications (collapsible) ── */}
            <div className="border-t border-neutral-100 pt-4">
              <button
                onClick={() => toggleSection('specs')}
                className="w-full flex items-center justify-between py-2 group"
              >
                <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-[0.15em]">
                  Specifications
                </h4>
                <motion.div
                  animate={{ rotate: activeSection === 'specs' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={16}
                    className="text-neutral-300 group-hover:text-neutral-500"
                  />
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
                    <ul className="text-[10px] sm:text-xs text-neutral-500 space-y-2 py-3 font-light">
                      {[
                        `Dimensions: ${product.dimensions || 'Custom tailored'}`,
                        'Stitching: Traditional 2-needle hand saddle-stitch',
                        'Thread: French Au Chinois waxed linen yarn',
                        'Edge: 5 coats heated beeswax-infused seal',
                        "Origin: Handmade in Unique Tany's atelier",
                      ].map((spec) => (
                        <li key={spec} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-800 mt-1.5 flex-shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom spacer */}
            <div className="h-4" />
          </div>
        </div>

        {/* ── Sticky Footer ── */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-100 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="p-4 sm:p-5 space-y-3">
            {/* Quantity + Price Row */}
            <div className="flex items-center justify-between">
              {/* Quantity Selector */}
              <div className="flex items-center border border-neutral-200 bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 sm:p-2.5 text-neutral-400 hover:text-neutral-800 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={13} />
                </button>
                <span className="px-3 sm:px-4 text-xs sm:text-sm font-medium text-neutral-800 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="p-2 sm:p-2.5 text-neutral-400 hover:text-neutral-800 transition-colors"
                  disabled={quantity >= 5}
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider">
                  Total
                </p>
                <p className="text-base sm:text-lg font-medium text-neutral-900 tracking-wider">
                  ${(product.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Add to Bag Button */}
            <motion.button
              onClick={handleAddToBag}
              className="w-full py-3.5 sm:py-4 bg-neutral-900 hover:bg-amber-800 text-stone-100 text-[10px] sm:text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-500 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              whileTap={{ scale: 0.98 }}
              id="add-to-bag-drawer-btn"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              <span>
                Add to Bag — $
                {(product.price * quantity).toLocaleString()}
              </span>
            </motion.button>

            {/* Trust strip */}
            <div className="flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-widest font-light pt-0.5">
              <ShieldCheck size={11} strokeWidth={1.5} />
              <span>Handmade Individually • 30-Day Exchange</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Success Toast ── */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-6 z-[60] sm:max-w-sm"
          >
            <div className="bg-neutral-900 text-white text-[10px] sm:text-xs tracking-wider py-3.5 sm:py-4 px-5 sm:px-6 shadow-2xl border border-amber-800/30 flex items-center gap-3 uppercase">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring' }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
              >
                <Check size={11} className="text-white" strokeWidth={3} />
              </motion.div>
              <div>
                <p className="font-medium">Added to Your Bag</p>
                <p className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 normal-case tracking-wider">
                  {quantity}× {product.name} in {selectedColor.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}