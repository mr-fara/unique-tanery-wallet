import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, ShieldAlert, Award, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColor, CustomizationOptions } from '../types';

interface ProductDetailDrawerProps {
  product: Product;
  initialColor: ProductColor;
  onClose: () => void;
  onAddToBag: (product: Product, selectedColor: ProductColor, customization: CustomizationOptions) => void;
}

export default function ProductDetailDrawer({
  product,
  initialColor,
  onClose,
  onAddToBag,
}: ProductDetailDrawerProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(initialColor);
  const [stitching, setStitching] = useState<'contrasting' | 'tonal'>('tonal');
  const [hardware, setHardware] = useState<string>(product.hardwareOptions ? product.hardwareOptions[0] : '');
  const [monogramText, setMonogramText] = useState('');
  const [foilColor, setFoilColor] = useState<'gold' | 'silver' | 'blind'>('gold');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setSelectedColor(initialColor);
    setStitching('tonal');
    if (product.hardwareOptions) {
      setHardware(product.hardwareOptions[0]);
    }
    setMonogramText('');
    setFoilColor('gold');
  }, [product, initialColor]);

  // Max 3 characters for initials, capitalize them automatically
  const handleMonogramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z.]/g, '');
    if (val.length <= 4) {
      setMonogramText(val);
    }
  };

  const handleAddToBag = () => {
    const customOpts: CustomizationOptions = {
      monogramText,
      foilColor,
      stitching,
      hardware: product.hardwareOptions ? hardware : undefined,
    };
    onAddToBag(product, selectedColor, customOpts);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 1200);
  };

  // Helper to get matching filter style for main display
  const getFilterStyle = (hex: string) => {
    switch (hex.toLowerCase()) {
      case '#1a1a1a': return 'brightness-[0.45] contrast-[1.2] grayscale';
      case '#3d2516': return 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]';
      case '#63251e': return 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]';
      case '#4d5c41': return 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]';
      case '#1d2a45': return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]';
      case '#be814e': return 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]';
      case '#d9531e': return 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]';
      case '#181e2b': return 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]';
      case '#8b8478': return 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]';
      case '#d9788e': return 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]';
      case '#1e2433': return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]';
      case '#233827': return 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-500" 
      />

      {/* Detail Slideout Drawer */}
      <div className="relative w-full max-w-2xl bg-luxury-cream h-full shadow-2xl overflow-y-auto flex flex-col z-10 border-l border-luxury-sand">
        
        {/* Sticky Header inside slideout */}
        <div className="sticky top-0 bg-luxury-cream/95 backdrop-blur-md z-20 px-6 py-4 border-b border-luxury-sand flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-[10px] tracking-widest text-luxury-gold-dark font-semibold uppercase">Configurateur d'Atelier</span>
            <h2 className="text-lg font-medium text-luxury-charcoal uppercase tracking-wider font-serif">Configure Your Piece</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-luxury-orange hover:bg-luxury-sand transition-all rounded-full"
            id="close-drawer-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-8 flex-grow text-left">
          
          {/* Main Showcase Image */}
          <div className="relative aspect-[4/3] bg-luxury-sand border border-luxury-sand flex items-center justify-center overflow-hidden">
            <img
              src={selectedColor.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
              style={{ filter: getFilterStyle(selectedColor.hex) }}
              referrerPolicy="no-referrer"
            />
            
            {/* Color/Material Label */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-luxury-sand text-[10px] tracking-luxury text-luxury-charcoal uppercase">
              {product.leatherType} • {selectedColor.name}
            </div>
          </div>

          {/* Product Header & Pricing */}
          <div className="space-y-2 border-b border-luxury-sand pb-6">
            <h1 className="text-3xl font-normal text-luxury-charcoal uppercase tracking-wider font-serif">
              {product.name}
            </h1>
            <div className="flex justify-between items-center pt-1">
              <span className="text-lg font-medium text-luxury-charcoal tracking-widest">
                ${product.price}
              </span>
              <span className="text-[10px] text-emerald-700 tracking-wider font-medium uppercase bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-150">
                In Stock & Tailored To Order
              </span>
            </div>
            <p className="text-sm text-gray-600 font-light leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* 1. Leather Color Options */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-luxury">
              Step 1: Select Your Leather Tone
            </h3>
            <p className="text-[11px] text-gray-500 font-light leading-normal">{selectedColor.desc}</p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 border flex items-center space-x-2 transition-all duration-300 ${
                    selectedColor.name === color.name
                      ? 'border-luxury-charcoal bg-white font-medium ring-2 ring-luxury-sand ring-offset-1'
                      : 'border-gray-200 hover:border-luxury-charcoal bg-luxury-cream/40'
                  }`}
                >
                  <span
                    className="w-4.5 h-4.5 rounded-full block border border-gray-300 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-luxury-charcoal tracking-wider">
                    {color.name.split(' (')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Saddle Stitching Thread Config */}
          {product.stitchingOptions && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-luxury">
                Step 2: Choose Thread Styling
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStitching('tonal')}
                  className={`p-4 border text-left flex flex-col justify-between transition-all duration-300 ${
                    stitching === 'tonal'
                      ? 'border-luxury-charcoal bg-white shadow-sm'
                      : 'border-gray-200 hover:border-luxury-charcoal bg-luxury-cream/40'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-semibold uppercase tracking-wider text-luxury-charcoal">Tonal Match</span>
                    {stitching === 'tonal' && <span className="w-4 h-4 bg-luxury-charcoal rounded-full flex items-center justify-center text-white text-[9px]"><Check size={10} /></span>}
                  </div>
                  <p className="text-[10px] text-gray-500 font-light mt-2 leading-relaxed">
                    Stitched with linen thread that precisely matches the leather dye, for an understated, elegant monochromatic style.
                  </p>
                </button>

                <button
                  onClick={() => setStitching('contrasting')}
                  className={`p-4 border text-left flex flex-col justify-between transition-all duration-300 ${
                    stitching === 'contrasting'
                      ? 'border-luxury-charcoal bg-white shadow-sm'
                      : 'border-gray-200 hover:border-luxury-charcoal bg-luxury-cream/40'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-semibold uppercase tracking-wider text-luxury-charcoal">Ecru Linen Contrast</span>
                    {stitching === 'contrasting' && <span className="w-4 h-4 bg-luxury-charcoal rounded-full flex items-center justify-center text-white text-[9px]"><Check size={10} /></span>}
                  </div>
                  <p className="text-[10px] text-gray-500 font-light mt-2 leading-relaxed">
                    Sewn with natural unbleached Ecru French flax thread. Highlights each diagonal saddle-stitch, showing off the master craftsmanship.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* 3. Hardware Choice (If Available) */}
          {product.hardwareOptions && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-luxury">
                Step 3: Hardware Finish
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.hardwareOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setHardware(opt)}
                    className={`px-4 py-2.5 border text-xs tracking-wider transition-all duration-300 uppercase ${
                      hardware === opt
                        ? 'border-luxury-charcoal bg-white font-medium shadow-sm'
                        : 'border-gray-200 hover:border-luxury-charcoal bg-luxury-cream/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Luxury Monogramming & Gilded Hot Stamping */}
          <div className="space-y-4 pt-4 border-t border-luxury-sand">
            <div className="flex items-center space-x-2">
              <Feather size={16} className="text-luxury-gold-dark" strokeWidth={1.5} />
              <h3 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-luxury">
                Bespoke Hot-Stamping (Optional Monogram)
              </h3>
            </div>
            <p className="text-[11px] text-gray-500 font-light leading-relaxed">
              Customize your unique piece with hand-pressed brass initials. Our artisans use traditional hot-brass type to stamp your initials directly into the leather skin.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-luxury-sand p-4 border border-luxury-sand">
              {/* Input & Controls */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] tracking-luxury text-gray-500 uppercase block mb-1">Enter Initials (A-Z, max 3 or 4)</label>
                  <input
                    type="text"
                    value={monogramText}
                    onChange={handleMonogramChange}
                    placeholder="E.g. K.T.M"
                    className="w-full bg-white border border-gray-300 text-xs tracking-[0.2em] font-mono px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal uppercase"
                  />
                </div>

                {/* Foil Selection */}
                <div>
                  <label className="text-[10px] tracking-luxury text-gray-500 uppercase block mb-1">Gilding Foil Finish</label>
                  <div className="flex space-x-2">
                    {(['gold', 'silver', 'blind'] as const).map((foil) => (
                      <button
                        key={foil}
                        onClick={() => setFoilColor(foil)}
                        disabled={!monogramText}
                        className={`px-2.5 py-1.5 border text-[9px] tracking-widest uppercase transition-all duration-300 flex-grow ${
                          !monogramText ? 'opacity-50 cursor-not-allowed border-gray-100' :
                          foilColor === foil
                            ? 'border-luxury-charcoal bg-white font-medium text-luxury-charcoal'
                            : 'border-gray-200 hover:border-luxury-charcoal text-gray-500 bg-white/40'
                        }`}
                      >
                        {foil === 'gold' ? '✨ Gold Leaf' : foil === 'silver' ? '💿 Silver Leaf' : '🔲 Blind Deboss'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Monogram Preview */}
              <div className="flex flex-col items-center justify-center text-center p-4 bg-white/80 border border-white rounded-sm">
                <span className="text-[9px] tracking-widest text-gray-400 font-medium uppercase mb-2">Live Stamp Preview</span>
                <div 
                  className="w-32 h-20 shadow-md relative flex items-center justify-center overflow-hidden transition-colors duration-500"
                  style={{ backgroundColor: selectedColor.hex, border: '1px solid rgba(0,0,0,0.1)' }}
                >
                  {/* Leather Texture Overlay */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay opacity-80 pointer-events-none" />
                  
                  {/* The Stamped initials */}
                  <AnimatePresence mode="wait">
                    {monogramText ? (
                      <motion.span
                        key={`${monogramText}-${foilColor}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`text-sm tracking-[0.25em] font-serif font-semibold drop-shadow-[0.5px_0.5px_0px_rgba(0,0,0,0.4)] ${
                          foilColor === 'gold'
                            ? 'text-luxury-gold filter brightness-110 drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.5)] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] bg-clip-text text-transparent'
                            : foilColor === 'silver'
                            ? 'text-slate-300 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 bg-clip-text text-transparent'
                            : 'text-black/40 drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.15)] shadow-inner'
                        }`}
                      >
                        {monogramText}
                      </motion.span>
                    ) : (
                      <span className="text-[10px] text-white/40 tracking-wider font-light">
                        STAMP IS EMPTY
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Heritage Story segment */}
          <div className="bg-luxury-sand p-6 border-y border-luxury-sand space-y-3">
            <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-luxury">
              The Heritage of {product.name}
            </h4>
            <p className="text-[11px] text-gray-600 font-light italic leading-relaxed">
              "{product.story}"
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-luxury-gold-dark font-medium uppercase pt-2">
              <Award size={14} />
              <span>40+ hours of hand-craftsmanship per piece</span>
            </div>
          </div>

          {/* Details & Specs list */}
          <div className="space-y-2 pb-6">
            <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-luxury">
              Specifications
            </h4>
            <ul className="text-xs text-gray-500 space-y-1.5 font-light">
              <li>• Dimensions: {product.dimensions || 'Custom tailored'}</li>
              <li>• Stitching style: Traditional 2-needle hand saddle-stitch</li>
              <li>• Linen Thread: French Au Chinois waxed linen yarn</li>
              <li>• Edge coating: 5 coats of heated, beeswax-infused edge seal</li>
              <li>• Origin: Handmade in Unique Tany’s slow-craft atelier</li>
            </ul>
          </div>

        </div>

        {/* Action Button Footer */}
        <div className="sticky bottom-0 bg-white border-t border-luxury-sand p-6 space-y-3 z-20 shadow-lg">
          <button
            onClick={handleAddToBag}
            className="w-full py-4 bg-luxury-charcoal hover:bg-luxury-orange text-luxury-cream text-xs tracking-luxury font-medium uppercase transition-colors duration-300 flex items-center justify-center space-x-2"
            id="add-to-bag-drawer-btn"
          >
            <ShoppingBag size={14} />
            <span>ADD TO SHOPPING BAG — ${product.price}</span>
          </button>
          
          <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-400 uppercase tracking-widest font-light">
            <ShieldAlert size={12} />
            <span>Handmade individually • Exchangeable within 30 days</span>
          </div>
        </div>

      </div>

      {/* Adding to bag confirmation toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-luxury-charcoal text-white text-xs tracking-luxury py-3.5 px-6 shadow-2xl border border-luxury-gold flex items-center space-x-2.5 uppercase"
          >
            <span className="w-2 h-2 bg-luxury-gold rounded-full animate-ping" />
            <span>SUCCESSFULLY ADDED TO YOUR BAG</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
