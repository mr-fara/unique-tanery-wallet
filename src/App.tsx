import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import AtelierSection from './components/AtelierSection';
import TestimonialSection from './components/Testimonials';
import CartDrawer from './components/CartDrawer';
import CustomCommission from './components/CustomCommission';
import Footer from './components/Footer';
import { PRODUCTS } from './data';
import { Product, ProductColor, CustomizationOptions, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, SlidersHorizontal, ArrowRight, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialColorForDetail, setInitialColorForDetail] =
    useState<ProductColor | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOpenProductDetail = (
    product: Product,
    initialColor: ProductColor
  ) => {
    setSelectedProduct(product);
    setInitialColorForDetail(initialColor);
  };

  const handleAddToBag = (
    product: Product,
    selectedColor: ProductColor,
    customization: CustomizationOptions
  ) => {
    const cartItemId = `${product.id}-${selectedColor.name}-${customization.stitching}-${customization.hardware || ''}-${customization.monogramText || ''}-${customization.foilColor}`;
    setCart((prevCart) => {
      const existingItemIdx = prevCart.findIndex(
        (item) => item.cartItemId === cartItemId
      );
      if (existingItemIdx > -1) {
        const updated = [...prevCart];
        updated[existingItemIdx].quantity += 1;
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          product,
          quantity: 1,
          selectedColor,
          customization,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const handleClearCart = () => setCart([]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch =
      activeTab === 'all' || product.category === activeTab;
    if (selectedMaterialFilter === 'all') return categoryMatch;
    if (selectedMaterialFilter === 'calfskin')
      return (
        categoryMatch &&
        product.leatherType.toLowerCase().includes('calfskin')
      );
    if (selectedMaterialFilter === 'alligator')
      return (
        categoryMatch &&
        product.leatherType.toLowerCase().includes('alligator')
      );
    if (selectedMaterialFilter === 'goatskin')
      return (
        categoryMatch &&
        product.leatherType.toLowerCase().includes('goatskin')
      );
    return categoryMatch;
  }).sort((a, b) => {
    if (selectedSort === 'price-low') return a.price - b.price;
    if (selectedSort === 'price-high') return b.price - a.price;
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCatalogTitle = () => {
    switch (activeTab) {
      case 'bags':
        return "Women's Fine Bags";
      case 'wallets':
        return 'Seamless Wallets';
      case 'watch-straps':
        return 'Watch Straps';
      case 'gifts':
        return 'Premium Gifts';
      default:
        return 'The Craft Collection';
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => scrollToSection('main-focus'), 100);
  };

  return (
    <div className="relative min-h-screen text-[#1C1C1C] selection:bg-[#C9A96E] selection:text-white flex flex-col">

      {/* ── Background Images: mobile (bg5) & desktop (bg6) ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
      >
        {/* Mobile background: bg5.png (shown below md) */}
        <div
          className="absolute inset-0 block md:hidden"
          style={{
            backgroundImage: 'url(/image/bg5.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll',
          }}
        />
        {/* Desktop background: bg6.png (shown at md and above) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: 'url(/image/bg6.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* ── Warm cream tint overlay (tones image to match brand palette) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(250, 247, 242, 0.82)',
          }}
        />

        {/* ── Subtle noise/texture feel via gradient layers ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(250,247,242,0.55) 0%, rgba(250,247,242,0.10) 30%, rgba(250,247,242,0.10) 70%, rgba(250,247,242,0.75) 100%)',
          }}
        />

        {/* ── Gold vignette edges ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(180,140,80,0.13) 100%)',
          }}
        />

        {/* ── Subtle top gold bar accent ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,110,0.6) 40%, rgba(201,169,110,0.6) 60%, transparent)',
          }}
        />
      </div>

      {/* ── All page content ── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Header ── */}
        <Header
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setTimeout(() => scrollToSection('main-focus'), 100);
          }}
          cartCount={cartCount}
          openCart={() => setCartOpen(true)}
          openWishlist={() => setWishlistOpen(true)}
          wishlistCount={wishlist.length}
        />

        {/* ── Hero (all tab only) ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero
                onExploreClick={() => scrollToSection('catalog-grid-top')}
                onAtelierClick={() => {
                  setActiveTab('atelier');
                  setTimeout(() => scrollToSection('main-focus'), 100);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <main id="main-focus" className="flex-grow w-full">

          {/* Atelier */}
          <AnimatePresence mode="wait">
            {activeTab === 'atelier' && (
              <motion.div
                key="atelier"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
              >
                <AtelierSection />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Commissions */}
          <AnimatePresence mode="wait">
            {activeTab === 'commissions' && (
              <motion.div
                key="commissions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
              >
                <CustomCommission />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Catalog Grid ── */}
          <AnimatePresence mode="wait">
            {activeTab !== 'atelier' && activeTab !== 'commissions' && (
              <motion.div
                key="catalog"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full"
                id="catalog-grid-top"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-8 py-10 sm:py-14 lg:py-16">

                  {/* ── Section Header ── */}
                  <div className="mb-8 sm:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6 mb-5">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[9px] xs:text-[10px] tracking-[0.25em] text-[#B8860B] font-semibold uppercase">
                          Maroquinerie d'excellence
                        </span>
                        <h2 className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-normal tracking-wide text-[#1C1C1C] font-serif uppercase leading-tight">
                          {getCatalogTitle()}
                        </h2>
                        <p className="text-[11px] sm:text-xs text-[#9E9E9E] font-light max-w-md leading-relaxed">
                          Each model is designed around absolute lines, featuring
                          selected leather, raw beeswax edge finishes, and the
                          iconic linen saddle-stitch.
                        </p>
                      </div>
                      <div className="self-start sm:self-end shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[#E8E0D4] text-[10px] font-semibold tracking-wider text-[#9E9E9E] uppercase">
                          <span className="text-[#C9A96E] font-bold text-xs">
                            {filteredProducts.length}
                          </span>
                          {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-[#E8E0D4] via-[#C9A96E]/30 to-[#E8E0D4]" />
                  </div>

                  {/* ── Filter Bar ── */}
                  <div className="mb-8 sm:mb-10">
                    {/* Mobile: toggle button */}
                    <div className="flex sm:hidden justify-between items-center mb-3">
                      <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#E8E0D4] text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1C] active:bg-[#FAF7F2] transition-colors"
                      >
                        <SlidersHorizontal size={13} className="text-[#C9A96E]" />
                        Filters & Sort
                        {(selectedMaterialFilter !== 'all' || selectedSort !== 'featured') && (
                          <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                        )}
                      </button>
                      {(selectedMaterialFilter !== 'all' || selectedSort !== 'featured') && (
                        <button
                          onClick={() => {
                            setSelectedMaterialFilter('all');
                            setSelectedSort('featured');
                          }}
                          className="text-[10px] text-[#C9A96E] font-medium tracking-wide hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Mobile: expandable filter panel */}
                    <AnimatePresence>
                      {filterOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden sm:hidden mb-4"
                        >
                          <div className="bg-white/90 backdrop-blur-sm border border-[#E8E0D4] p-4 space-y-4">
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] font-semibold text-[#9E9E9E] uppercase">
                                Material
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { val: 'all', label: 'All Hides' },
                                  { val: 'calfskin', label: 'Box Calfskin' },
                                  { val: 'goatskin', label: 'Chevre Goatskin' },
                                  { val: 'alligator', label: 'Alligator' },
                                ].map((opt) => (
                                  <button
                                    key={opt.val}
                                    onClick={() => setSelectedMaterialFilter(opt.val)}
                                    className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-wide border transition-all ${
                                      selectedMaterialFilter === opt.val
                                        ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                                        : 'bg-white/70 text-[#6B6B6B] border-[#E8E0D4] hover:border-[#C9A96E]'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] font-semibold text-[#9E9E9E] uppercase">
                                Sort by
                              </label>
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  { val: 'featured', label: 'Featured / Bestsellers' },
                                  { val: 'price-low', label: 'Price: Low to High' },
                                  { val: 'price-high', label: 'Price: High to Low' },
                                ].map((opt) => (
                                  <button
                                    key={opt.val}
                                    onClick={() => setSelectedSort(opt.val)}
                                    className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-wide border transition-all text-left ${
                                      selectedSort === opt.val
                                        ? 'bg-[#C9A96E] text-white border-[#C9A96E]'
                                        : 'bg-white/70 text-[#6B6B6B] border-[#E8E0D4] hover:border-[#C9A96E]'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => setFilterOpen(false)}
                              className="w-full py-2.5 bg-[#1C1C1C] text-white text-[10px] font-bold tracking-[0.2em] uppercase"
                            >
                              Apply Filters
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Desktop: inline filter bar */}
                    <div className="hidden sm:flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <SlidersHorizontal size={12} className="text-[#C9A96E]" />
                        <span className="text-[10px] font-semibold text-[#9E9E9E] uppercase tracking-wider mr-1">
                          Material:
                        </span>
                        {[
                          { val: 'all', label: 'All Hides' },
                          { val: 'calfskin', label: 'Box Calfskin' },
                          { val: 'goatskin', label: 'Goatskin' },
                          { val: 'alligator', label: 'Alligator' },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => setSelectedMaterialFilter(opt.val)}
                            className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide border transition-all duration-200 ${
                              selectedMaterialFilter === opt.val
                                ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                                : 'bg-white/80 backdrop-blur-sm text-[#6B6B6B] border-[#E8E0D4] hover:border-[#C9A96E] hover:text-[#1C1C1C]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <div className="h-6 w-px bg-[#E8E0D4]" />
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E8E0D4] px-3 py-1.5">
                        <span className="text-[10px] font-semibold text-[#9E9E9E] uppercase tracking-wider">
                          Sort:
                        </span>
                        <select
                          value={selectedSort}
                          onChange={(e) => setSelectedSort(e.target.value)}
                          className="bg-transparent focus:outline-none text-[10px] font-semibold text-[#1C1C1C] cursor-pointer uppercase tracking-wide"
                        >
                          <option value="featured">Featured</option>
                          <option value="price-low">Price ↑</option>
                          <option value="price-high">Price ↓</option>
                        </select>
                      </div>
                      {(selectedMaterialFilter !== 'all' || selectedSort !== 'featured') && (
                        <button
                          onClick={() => {
                            setSelectedMaterialFilter('all');
                            setSelectedSort('featured');
                          }}
                          className="flex items-center gap-1 text-[10px] text-[#C9A96E] font-medium tracking-wide hover:underline"
                        >
                          <X size={10} />
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Product Grid ── */}
                  {filteredProducts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 sm:py-24 bg-white/80 backdrop-blur-sm border border-[#E8E0D4]"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#E8E0D4] rounded-full bg-[#FAF7F2]">
                        <SlidersHorizontal size={24} className="text-[#C9A96E]/60" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1C1C1C] mb-2">
                        No Matching Pieces
                      </h4>
                      <p className="text-[11px] text-[#9E9E9E] font-light max-w-xs mx-auto leading-relaxed mb-6">
                        We currently do not have stock in this specific grain filter.
                        Try another material or request a custom commission.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => setSelectedMaterialFilter('all')}
                          className="px-6 py-2.5 border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                        >
                          Clear Filters
                        </button>
                        <button
                          onClick={() => handleTabChange('commissions')}
                          className="px-6 py-2.5 bg-[#C9A96E] hover:bg-[#B8860B] text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                        >
                          Request Commission
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
                        {filteredProducts.map((product, index) => (
                          <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: index * 0.05 }}
                            className="h-full"
                          >
                            <ProductCard
                              product={product}
                              onViewDetail={handleOpenProductDetail}
                              onToggleWishlist={handleToggleWishlist}
                              isWishlisted={wishlist.includes(product.id)}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* ── Editorial Card ── */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-4 sm:mt-6 relative overflow-hidden bg-[#EDE8DF]/90 backdrop-blur-sm border border-[#E8E0D4] group"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-1 p-6 sm:p-8 lg:p-10 space-y-4 z-10 relative">
                            <span className="inline-block text-[9px] tracking-[0.3em] text-[#B8860B] font-bold uppercase">
                              Atelier Heritage
                            </span>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-[#1C1C1C] font-serif uppercase tracking-wide leading-tight max-w-sm">
                              The Story of Natural Dyeing & Vegetable Tanning
                            </h3>
                            <p className="text-[11px] sm:text-xs text-[#6B6B6B] font-light leading-relaxed max-w-lg">
                              Unique Tany leather dyes utilize vegetable bark, walnut
                              husks, and oak tannin rather than harsh petroleum salts.
                              This produces warm, rich, transparent color tones that do
                              not cover the natural pores and scars of the calfskin hide,
                              allowing each piece to absorb natural sunlight and breathe
                              with age.
                            </p>
                            <button
                              onClick={() => handleTabChange('atelier')}
                              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#C9A96E] uppercase hover:gap-3 transition-all duration-300 group/btn mt-2"
                            >
                              <span>Explore the slow-dye method</span>
                              <ArrowRight
                                size={12}
                                className="group-hover/btn:translate-x-1 transition-transform duration-300"
                              />
                            </button>
                          </div>
                          <div className="hidden sm:flex items-center justify-center w-40 lg:w-56 relative border-l border-[#E8E0D4] overflow-hidden">
                            <div className="absolute inset-0 bg-[#E8E0D4]/60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full border border-[#C9A96E]/25 group-hover:scale-110 transition-transform duration-1000" />
                              <div className="absolute w-20 h-20 lg:w-28 lg:h-28 rounded-full border border-[#C9A96E]/15" />
                            </div>
                            <span className="relative z-10 text-[9px] tracking-[0.4em] text-[#B8860B]/60 font-semibold uppercase rotate-90 whitespace-nowrap">
                              Since 1891
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* ── Bottom CTA strip ── */}
                  <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#E8E0D4]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8">
                      <div className="text-center sm:text-left space-y-1">
                        <p className="text-[10px] tracking-[0.25em] text-[#9E9E9E] uppercase font-semibold">
                          Need something unique?
                        </p>
                        <p className="text-sm sm:text-base font-serif text-[#1C1C1C] uppercase tracking-wide">
                          Commission a bespoke piece
                        </p>
                      </div>
                      <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleTabChange('commissions')}
                          className="px-6 sm:px-8 py-3 bg-[#1C1C1C] hover:bg-[#333] text-white text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group/cta"
                        >
                          <span>Begin Commission</span>
                          <ArrowRight
                            size={12}
                            className="group-hover/cta:translate-x-1 transition-transform duration-300"
                          />
                        </button>
                        <button
                          onClick={() => handleTabChange('atelier')}
                          className="px-6 sm:px-8 py-3 border border-[#E8E0D4] hover:border-[#C9A96E] bg-white/80 backdrop-blur-sm text-[#1C1C1C] text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
                        >
                          Visit Atelier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ── Testimonial Section ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <TestimonialSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' && (
            <motion.div
              key="footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Footer
                onNavClick={(tab) => {
                  setActiveTab(tab);
                  setTimeout(() => scrollToSection('main-focus'), 100);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Product Detail Drawer ── */}
      <AnimatePresence>
        {selectedProduct && initialColorForDetail && (
          <ProductDetailDrawer
            product={selectedProduct}
            initialColor={initialColorForDetail}
            onClose={() => {
              setSelectedProduct(null);
              setInitialColorForDetail(null);
            }}
            onAddToBag={handleAddToBag}
          />
        )}
      </AnimatePresence>

      {/* ── Cart Drawer ── */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* ── Wishlist Drawer ── */}
      <AnimatePresence>
        {wishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setWishlistOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8E0D4]"
            >
              {/* Panel Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E0D4] bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center">
                    <Heart size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
                  </div>
                  <div>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1C1C1C]">
                      Your Favorites
                    </h2>
                    <p className="text-[9px] text-[#9E9E9E] tracking-wider">
                      {wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} saved
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#E8E0D4] transition-colors rounded-full text-[#6B6B6B] hover:text-[#1C1C1C]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-grow overflow-y-auto">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 px-6 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full border border-[#E8E0D4] bg-white flex items-center justify-center">
                      <Heart size={28} className="text-[#E8E0D4]" strokeWidth={1} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1C1C1C]">
                        Nothing Saved Yet
                      </h3>
                      <p className="text-[11px] text-[#9E9E9E] font-light leading-relaxed max-w-[200px] mx-auto">
                        Bookmark your favourite leather models to review them side-by-side.
                      </p>
                    </div>
                    <button
                      onClick={() => setWishlistOpen(false)}
                      className="mt-2 px-6 py-2.5 border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  <div className="p-4 sm:p-6 space-y-1">
                    <AnimatePresence>
                      {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((p) => (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-[#E8E0D4] hover:border-[#C9A96E]/50 transition-colors group/item"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FAF7F2] border border-[#E8E0D4] overflow-hidden shrink-0 relative">
                            <img
                              src={p.colors[0].imageUrl}
                              alt={p.name}
                              className="object-cover w-full h-full group-hover/item:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-grow min-w-0 space-y-0.5">
                            <span className="block text-[8px] sm:text-[9px] text-[#9E9E9E] font-semibold uppercase tracking-wider truncate">
                              {p.leatherType}
                            </span>
                            <h4 className="text-[10px] sm:text-[11px] font-bold text-[#1C1C1C] uppercase tracking-wide leading-tight truncate">
                              {p.name}
                            </h4>
                            <span className="block text-xs font-bold text-[#C9A96E] font-mono">
                              ${p.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                handleOpenProductDetail(p, p.colors[0]);
                                setWishlistOpen(false);
                              }}
                              className="px-2.5 py-1.5 bg-[#1C1C1C] hover:bg-[#C9A96E] text-white text-[8px] font-bold tracking-[0.15em] uppercase transition-all duration-200"
                            >
                              Open
                            </button>
                            <button
                              onClick={() => handleToggleWishlist(p.id)}
                              className="px-2.5 py-1.5 border border-[#E8E0D4] hover:border-red-300 hover:bg-red-50 text-[8px] font-semibold tracking-wider text-[#9E9E9E] hover:text-red-500 uppercase transition-all duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Panel Footer */}
              {wishlist.length > 0 && (
                <div className="px-4 sm:px-6 py-4 border-t border-[#E8E0D4] bg-white shrink-0 space-y-2">
                  <button
                    onClick={() => setWishlistOpen(false)}
                    className="w-full py-3 bg-[#1C1C1C] hover:bg-[#333] text-white text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => setWishlist([])}
                    className="w-full py-2 text-[9px] font-medium text-[#9E9E9E] hover:text-red-500 uppercase tracking-wider transition-colors"
                  >
                    Clear All Favorites
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}