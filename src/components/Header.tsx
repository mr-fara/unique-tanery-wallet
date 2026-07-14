import { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openWishlist: () => void;
  wishlistCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openWishlist,
  wishlistCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navItems = [
    { id: 'all', label: 'All Collections' },
    { id: 'bags', label: "Women's Bags" },
    { id: 'wallets', label: 'Wallets & Cards' },
    { id: 'watch-straps', label: 'Watch Straps' },
    { id: 'gifts', label: 'Gift Sets' },
    { id: 'atelier', label: 'The Atelier' },
    { id: 'commissions', label: 'Bespoke' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-500 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* ── Top Banner ── */}
      <div className="bg-neutral-900 text-neutral-400 text-center overflow-hidden">
        <motion.div
          className="py-1.5 sm:py-2 px-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Small mobile banner */}
          <p className="block sm:hidden text-[8px] tracking-[0.2em] uppercase font-light">
            Pure Leather Craft • Free Shipping over $500
          </p>
          {/* Medium+ banner */}
          <p className="hidden sm:block md:hidden text-[9px] tracking-[0.18em] uppercase font-light">
            Saddle Stitching & Pure Leather • Complimentary Wrapping • Worldwide Shipping
          </p>
          {/* Large banner */}
          <p className="hidden md:block text-[10px] tracking-[0.2em] uppercase font-light">
            Saddle Stitching & Pure Leather Craft • Complimentary Bespoke Wrapping • Shipping Worldwide
          </p>
        </motion.div>
      </div>

      {/* ── Main Header Bar ── */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-[72px]">

          {/* Left: Mobile menu + desktop links */}
          <div className="flex items-center gap-1 min-w-0 flex-shrink-0 z-10">
            {/* Mobile hamburger */}
            <motion.button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setSearchOpen(false);
              }}
              className="lg:hidden p-2 -ml-2 text-neutral-700 hover:text-amber-700 rounded-lg hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Desktop left links */}
            <div className="hidden lg:flex items-center gap-4 text-[10px] xl:text-[11px] tracking-[0.16em] text-neutral-500 ml-1">
              <button
                onClick={() => handleNavClick('atelier')}
                className="hover:text-amber-700 transition-colors duration-300 uppercase py-1"
              >
                Craft Philosophy
              </button>
              <span className="text-neutral-200 select-none text-[8px]">|</span>
              <button
                onClick={() => handleNavClick('commissions')}
                className="hover:text-amber-700 transition-colors duration-300 uppercase py-1"
              >
                Bespoke
              </button>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <motion.button
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center select-none z-0"
            onClick={() => handleNavClick('all')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.32em] text-neutral-800 font-serif leading-none whitespace-nowrap">
              UNIQUE TANERY
            </h1>
            <motion.span
              className="mt-0.5 sm:mt-1"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="hidden md:block text-[8px] lg:text-[9px] tracking-[0.35em] text-amber-700/70 font-medium uppercase">
                Maroquinerie de Luxe • Fait Main
              </span>
              <span className="hidden sm:block md:hidden text-[7px] tracking-[0.3em] text-amber-700/70 font-medium uppercase">
                Luxe Leather • Fait Main
              </span>
              <span className="block sm:hidden text-[7px] tracking-[0.25em] text-amber-700/70 font-medium uppercase">
                Fait Main
              </span>
            </motion.span>
          </motion.button>

          {/* Right: Action icons */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-shrink-0 z-10">
            {/* Search */}
            <motion.button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg transition-all duration-300 ${
                searchOpen
                  ? 'text-amber-700 bg-amber-50'
                  : 'text-neutral-600 hover:text-amber-700 hover:bg-neutral-50'
              }`}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              {searchOpen ? (
                <X size={17} strokeWidth={1.5} />
              ) : (
                <Search size={17} strokeWidth={1.5} />
              )}
            </motion.button>

            {/* Wishlist */}
            <motion.button
              onClick={openWishlist}
              className="p-2 text-neutral-600 hover:text-amber-700 rounded-lg hover:bg-neutral-50 transition-colors relative"
              whileTap={{ scale: 0.9 }}
              id="wishlist-btn"
              aria-label="Wishlist"
            >
              <Heart size={17} strokeWidth={1.5} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white text-[7px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Cart / Bag */}
            <motion.button
              onClick={openCart}
              className="p-2 text-neutral-600 hover:text-amber-700 rounded-lg hover:bg-neutral-50 transition-colors relative flex items-center gap-1"
              whileTap={{ scale: 0.9 }}
              id="cart-btn"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span className="hidden md:inline text-[10px] font-medium tracking-wider text-neutral-500">
                BAG
              </span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[7px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Search Drawer ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-neutral-100"
            >
              <div className="py-3 sm:py-4">
                <div className="relative max-w-md mx-auto">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collections..."
                    className="w-full pl-9 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm tracking-wider border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700/20 transition-all duration-300 placeholder:text-neutral-400 placeholder:uppercase placeholder:text-[9px] sm:placeholder:text-[10px] placeholder:tracking-widest"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden lg:block border-t border-neutral-100">
          <ul className="flex justify-center items-center py-3 xl:py-3.5 gap-4 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-[10px] xl:text-[11px] font-medium tracking-[0.18em] py-1 transition-all duration-300 uppercase whitespace-nowrap ${
                    activeTab === item.id
                      ? 'text-amber-700'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-amber-700 rounded-full"
                    initial={false}
                    animate={{
                      scaleX: activeTab === item.id ? 1 : 0,
                      opacity: activeTab === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ transformOrigin: '50% 50%' }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
              style={{ top: 'var(--header-height, 0px)' }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.nav
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-neutral-100 shadow-2xl z-40 overflow-hidden"
            >
              <div className="max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain">
                {/* Active tab indicator */}
                <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-1">
                  <p className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-[0.25em] font-medium">
                    Currently viewing:
                    <span className="text-amber-700 ml-1.5 font-semibold">
                      {navItems.find((n) => n.id === activeTab)?.label}
                    </span>
                  </p>
                </div>

                {/* Nav items */}
                <ul className="px-3 sm:px-5 py-2 sm:py-3 space-y-0.5">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-200 group ${
                          activeTab === item.id
                            ? 'bg-amber-50 text-amber-800 border-l-[3px] border-l-amber-700 pl-2.5 sm:pl-3.5'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                        }`}
                      >
                        <span
                          className={`text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase ${
                            activeTab === item.id ? 'font-semibold' : 'font-medium'
                          }`}
                        >
                          {item.label}
                        </span>
                        <ChevronRight
                          size={13}
                          className={`transition-all duration-200 ${
                            activeTab === item.id
                              ? 'text-amber-700 translate-x-0'
                              : 'text-neutral-300 -translate-x-1 group-hover:translate-x-0 group-hover:text-neutral-500'
                          }`}
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="mx-5 sm:mx-7 border-t border-neutral-100" />

                {/* Secondary links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="px-4 sm:px-6 py-4 sm:py-5 space-y-4"
                >
                  <div className="flex items-center justify-center gap-4 sm:gap-6">
                    <button
                      onClick={() => handleNavClick('atelier')}
                      className="text-[10px] sm:text-[11px] tracking-[0.15em] text-neutral-500 hover:text-amber-700 transition-colors uppercase py-1"
                    >
                      Our Heritage
                    </button>
                    <span className="text-neutral-200 text-[8px] select-none">•</span>
                    <button
                      onClick={() => handleNavClick('commissions')}
                      className="text-[10px] sm:text-[11px] tracking-[0.15em] text-neutral-500 hover:text-amber-700 transition-colors uppercase py-1"
                    >
                      Bespoke Orders
                    </button>
                  </div>

                  {/* Brand footer */}
                  <div className="text-center pt-2 sm:pt-3 border-t border-neutral-50">
                    <p className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-[0.3em]">
                      Unique Tany
                    </p>
                    <p className="text-[7px] sm:text-[8px] text-neutral-300 tracking-[0.2em] mt-0.5">
                      Handcrafted with devotion
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}