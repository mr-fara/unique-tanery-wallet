import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import AtelierSection from './components/AtelierSection';
import CartDrawer from './components/CartDrawer';
import CustomCommission from './components/CustomCommission';
import Footer from './components/Footer';
import { PRODUCTS } from './data';
import { Product, ProductColor, CustomizationOptions, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trash2, ArrowUpRight, Sparkles, SlidersHorizontal, ArrowRight, HelpCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialColorForDetail, setInitialColorForDetail] = useState<ProductColor | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Dynamic filter state
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOpenProductDetail = (product: Product, initialColor: ProductColor) => {
    setSelectedProduct(product);
    setInitialColorForDetail(initialColor);
  };

  const handleAddToBag = (
    product: Product,
    selectedColor: ProductColor,
    customization: CustomizationOptions
  ) => {
    // Generate a unique ID based on options selected
    const cartItemId = `${product.id}-${selectedColor.name}-${customization.stitching}-${customization.hardware || ''}-${customization.monogramText || ''}-${customization.foilColor}`;

    setCart((prevCart) => {
      const existingItemIdx = prevCart.findIndex((item) => item.cartItemId === cartItemId);
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
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter and sort items dynamically
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Filter by category (active tab)
    const categoryMatch = activeTab === 'all' || product.category === activeTab;
    
    // 2. Filter by material
    if (selectedMaterialFilter === 'all') return categoryMatch;
    
    if (selectedMaterialFilter === 'calfskin') {
      return categoryMatch && product.leatherType.toLowerCase().includes('calfskin');
    }
    if (selectedMaterialFilter === 'alligator') {
      return categoryMatch && product.leatherType.toLowerCase().includes('alligator');
    }
    if (selectedMaterialFilter === 'goatskin') {
      return categoryMatch && product.leatherType.toLowerCase().includes('goatskin');
    }
    
    return categoryMatch;
  }).sort((a, b) => {
    if (selectedSort === 'price-low') return a.price - b.price;
    if (selectedSort === 'price-high') return b.price - a.price;
    // Default (featured / bestseller)
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Helper to resolve the correct filters for sidebar item images
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
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal selection:bg-luxury-gold selection:text-white flex flex-col justify-between">
      
      {/* 1. Brand Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto scroll to products/atelier when tab changes to improve user flow
          const targetEl = document.getElementById('main-focus');
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        openWishlist={() => setWishlistOpen(true)}
        wishlistCount={wishlist.length}
      />

      {/* 2. Visual Hero Segment (Shown on 'All' catalog view or when clicking home logo) */}
      {activeTab === 'all' && (
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('catalog-grid-top');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onAtelierClick={() => {
            setActiveTab('atelier');
            setTimeout(() => {
              const el = document.getElementById('main-focus');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}

      {/* 3. Main Target Content Section */}
      <main id="main-focus" className="flex-grow">
        
        {/* Render Atelier immersive experience */}
        {activeTab === 'atelier' && <AtelierSection />}

        {/* Render Bespoke Measurement portal */}
        {activeTab === 'commissions' && <CustomCommission />}

        {/* Render Catalog (All, Bags, Wallets, Straps, Gifts) */}
        {activeTab !== 'atelier' && activeTab !== 'commissions' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" id="catalog-grid-top">
            
            {/* Catalog Subtitle & Editorial Statement */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-luxury-sand pb-6 mb-8 gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] tracking-luxury text-luxury-gold-dark font-medium uppercase">
                  Maroquinerie d'excellence
                </span>
                <h2 className="text-3xl font-normal tracking-wide text-luxury-charcoal font-serif uppercase">
                  {activeTab === 'all' ? 'The Craft Collection' : activeTab === 'bags' ? 'Women’s Fine Bags' : activeTab === 'wallets' ? 'Seamless Wallets' : activeTab === 'watch-straps' ? 'Watch Straps' : 'Premium Gifts'}
                </h2>
                <p className="text-xs text-gray-400 font-light max-w-xl">
                  Each model is designed around absolute lines, featuring selected leather, raw beeswax edge finishes, and the iconic linen saddle-stitch.
                </p>
              </div>

              {/* Filtering Controls panel */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Material Filter */}
                <div className="flex items-center space-x-1.5 border border-luxury-sand bg-white px-3 py-2 rounded-xs">
                  <SlidersHorizontal size={12} className="text-gray-400" />
                  <span className="text-gray-500 font-medium">Material:</span>
                  <select
                    value={selectedMaterialFilter}
                    onChange={(e) => setSelectedMaterialFilter(e.target.value)}
                    className="bg-transparent focus:outline-none text-luxury-charcoal font-semibold cursor-pointer"
                  >
                    <option value="all">All Hides</option>
                    <option value="calfskin">Box Calfskin & Togo</option>
                    <option value="goatskin">Fine Chevre Goatskin</option>
                    <option value="alligator">Matte Alligator</option>
                  </select>
                </div>

                {/* Sorting options */}
                <div className="flex items-center space-x-1.5 border border-luxury-sand bg-white px-3 py-2 rounded-xs">
                  <span className="text-gray-500 font-medium">Sort:</span>
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-transparent focus:outline-none text-luxury-charcoal font-semibold cursor-pointer"
                  >
                    <option value="featured">Featured / Bestsellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-luxury-sand rounded-sm">
                <SlidersHorizontal size={36} className="mx-auto text-luxury-gold/40 mb-3" strokeWidth={1} />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-luxury-charcoal">No Matching Items</h4>
                <p className="text-xs text-gray-400 font-light max-w-xs mx-auto leading-relaxed mt-1">
                  We currently do not have stock or custom molds in this specific grain filter. Request a custom commission measurement instead.
                </p>
                <button
                  onClick={() => { setSelectedMaterialFilter('all'); }}
                  className="mt-4 px-5 py-2 border border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white text-[10px] tracking-luxury uppercase transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProductCard
                      product={product}
                      onViewDetail={handleOpenProductDetail}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlist.includes(product.id)}
                    />
                  </motion.div>
                ))}

                {/* Hermes-inspired Editorial Card inserted in the middle/end to enrich the Grid */}
                <div className="bg-luxury-sand border border-luxury-sand p-8 flex flex-col justify-between text-left sm:col-span-2 lg:col-span-1 min-h-[340px] relative overflow-hidden group">
                  <div className="space-y-4 z-10">
                    <span className="text-[9px] tracking-widest text-luxury-gold-dark font-semibold uppercase block">Atelier Heritage</span>
                    <h3 className="text-xl font-normal text-luxury-charcoal font-serif uppercase tracking-wider">
                      The Story of Natural Dyeing & Vegetable tanning
                    </h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Unique Tany leather dyes utilize vegetable bark, walnut husks, and oak tannin rather than harsh petroleum salts. This produces warm, rich, transparent color tones that do not cover the natural pores and scars of the calfskin hide, allowing each piece to absorb natural sunlight and breathe.
                    </p>
                  </div>
                  <div className="pt-4 z-10">
                    <button
                      onClick={() => {
                        setActiveTab('atelier');
                        setTimeout(() => {
                          const el = document.getElementById('main-focus');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-xs tracking-luxury font-medium text-luxury-orange uppercase hover:underline flex items-center space-x-1"
                    >
                      <span>Explore the slow-dye method</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                  
                  {/* Background decoration lines */}
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 border border-luxury-gold/20 rounded-full group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. Luxury Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        const el = document.getElementById('main-focus');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 5. Product Configurator Detail Drawer */}
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

      {/* 6. Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 7. Wishlist Sidebar Drawer Overlay */}
      <AnimatePresence>
        {wishlistOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <div onClick={() => setWishlistOpen(false)} className="absolute inset-0 bg-black/45 backdrop-blur-xs" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="relative w-full max-w-md bg-luxury-cream h-full shadow-2xl flex flex-col z-10 border-l border-luxury-sand text-left"
            >
              <div className="px-6 py-5 border-b border-luxury-sand bg-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart size={18} className="text-luxury-orange fill-luxury-orange" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] font-sans">Your Favorites ({wishlist.length})</h2>
                </div>
                <button onClick={() => setWishlistOpen(false)} className="p-1.5 hover:text-luxury-orange hover:bg-luxury-sand transition-all rounded-full">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-24 space-y-3">
                    <Heart size={42} className="mx-auto text-gray-300" strokeWidth={1} />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your Wishlist is Empty</h3>
                    <p className="text-[11px] text-gray-400 font-light">Bookmark your favorite leather models to review them side-by-side.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-luxury-sand">
                    {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((p) => (
                      <li key={p.id} className="py-4 flex items-center space-x-4">
                        <div className="w-14 h-14 bg-luxury-sand border border-luxury-sand overflow-hidden relative">
                          <img
                            src={p.colors[0].imageUrl}
                            alt={p.name}
                            className="object-cover w-full h-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-grow text-left space-y-0.5">
                          <span className="text-[9px] text-gray-400 font-medium uppercase">{p.leatherType}</span>
                          <h4 className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider leading-tight">{p.name}</h4>
                          <span className="text-xs font-semibold text-luxury-orange font-mono">${p.price}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => {
                              handleOpenProductDetail(p, p.colors[0]);
                              setWishlistOpen(false);
                            }}
                            className="px-2 py-1 bg-luxury-charcoal hover:bg-luxury-orange text-white text-[8px] font-bold tracking-luxury uppercase transition-all rounded-sm flex items-center justify-center"
                          >
                            <span>Open</span>
                          </button>
                          <button
                            onClick={() => handleToggleWishlist(p.id)}
                            className="text-[8px] text-red-500 font-mono tracking-wide hover:underline text-center"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
