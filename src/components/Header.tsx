import { useState } from 'react';
import { Menu, X, ShoppingBag, Heart, Search } from 'lucide-react';
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

  const navItems = [
    { id: 'all', label: 'ALL COLLECTIONS' },
    { id: 'bags', label: "WOMEN'S BAGS" },
    { id: 'wallets', label: 'WALLETS & CARDS' },
    { id: 'watch-straps', label: 'WATCH STRAPS' },
    { id: 'gifts', label: 'GIFT WALLETS & SETS' },
    { id: 'atelier', label: 'THE ATELIER' },
    { id: 'commissions', label: 'BESPOKE COMMISSIONS' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-neutral-300 text-center py-2 px-4 overflow-hidden">
        <motion.span
          className="block text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="hidden sm:inline">
            Saddle Stitching & Pure Leather Craft • Complimentary Bespoke Wrapping • Shipping Worldwide
          </span>
          <span className="sm:hidden">
            Pure Leather Craft • Worldwide Shipping
          </span>
        </motion.span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">

          {/* Left Section */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-neutral-700 hover:text-amber-700 transition-colors duration-300 rounded-lg hover:bg-neutral-50 active:bg-neutral-100"
              id="mobile-menu-btn"
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center space-x-5 text-[11px] tracking-[0.15em] text-neutral-500">
              <button
                onClick={() => handleNavClick('atelier')}
                className="hover:text-amber-700 transition-colors duration-300 uppercase"
              >
                Craft Philosophy
              </button>
              <span className="text-neutral-200 select-none">|</span>
              <button
                onClick={() => handleNavClick('commissions')}
                className="hover:text-amber-700 transition-colors duration-300 uppercase"
              >
                Bespoke
              </button>
            </div>
          </div>

          {/* Center Brand */}
          <motion.div
            className="flex flex-col items-center justify-center text-center select-none cursor-pointer absolute left-1/2 -translate-x-1/2"
            onClick={() => handleNavClick('all')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-light tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-neutral-800 font-serif leading-tight">
              Unique Tanery
            </h1>
            <motion.span
              className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] text-amber-700/80 font-medium uppercase mt-0.5 sm:mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="hidden sm:inline">Maroquinerie de Luxe • Fait Main</span>
              <span className="sm:hidden">Fait Main</span>
            </motion.span>
          </motion.div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
            {/* Search Button */}
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-600 hover:text-amber-700 transition-colors duration-300 rounded-lg hover:bg-neutral-50 active:bg-neutral-100"
              title="Search"
              whileTap={{ scale: 0.92 }}
            >
              <Search size={18} strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </motion.button>

            {/* Wishlist Button */}
            <motion.button
              onClick={openWishlist}
              className="p-2 text-neutral-600 hover:text-amber-700 transition-colors duration-300 relative rounded-lg hover:bg-neutral-50 active:bg-neutral-100"
              title="Wishlist"
              id="wishlist-btn"
              whileTap={{ scale: 0.92 }}
            >
              <Heart size={18} strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white text-[7px] sm:text-[8px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Cart Button */}
            <motion.button
              onClick={openCart}
              className="p-2 text-neutral-600 hover:text-amber-700 transition-colors duration-300 relative flex items-center space-x-1 rounded-lg hover:bg-neutral-50 active:bg-neutral-100"
              title="Shopping Bag"
              id="cart-btn"
              whileTap={{ scale: 0.92 }}
            >
              <ShoppingBag size={18} strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wider hidden md:inline text-neutral-500">
                BAG
              </span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[7px] sm:text-[8px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Search Bar Expandable */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-neutral-100"
            >
              <div className="py-3 sm:py-4">
                <div className="relative max-w-lg mx-auto">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search collections..."
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm tracking-wider border border-neutral-200 rounded-none bg-neutral-50 focus:bg-white focus:border-amber-700 focus:outline-none transition-all duration-300 placeholder:text-neutral-400 placeholder:tracking-widest placeholder:uppercase placeholder:text-[10px] sm:placeholder:text-[11px]"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:block border-t border-neutral-100">
          <ul className="flex justify-center items-center py-4 space-x-6 xl:space-x-10">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-[10px] xl:text-[11px] font-medium tracking-[0.18em] py-1.5 transition-all duration-300 uppercase ${
                    activeTab === item.id
                      ? 'text-amber-700'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {item.label}
                  {/* Active Indicator */}
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-amber-700"
                    initial={false}
                    animate={{
                      scaleX: activeTab === item.id ? 1 : 0,
                      opacity: activeTab === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ originX: 0.5 }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-[calc(4rem+2rem)] sm:top-[calc(5rem+2rem)] bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-neutral-100 shadow-xl z-40 max-h-[calc(100vh-8rem)] overflow-y-auto"
            >
              <div className="px-4 sm:px-6 pt-3 pb-6 sm:pt-4 sm:pb-8">
                {/* Navigation Items */}
                <ul className="space-y-0.5">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`block w-full text-left text-[11px] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.18em] py-3 sm:py-3.5 px-3 sm:px-4 transition-all duration-300 rounded-lg uppercase ${
                          activeTab === item.id
                            ? 'text-amber-700 bg-amber-50 border-l-2 border-l-amber-700'
                            : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="my-4 sm:my-6 border-t border-neutral-100" />

                {/* Secondary Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6">
                    <button
                      onClick={() => handleNavClick('atelier')}
                      className="text-[11px] sm:text-xs tracking-[0.15em] text-neutral-500 hover:text-amber-700 transition-colors duration-300 uppercase text-center py-2"
                    >
                      Our Heritage
                    </button>
                    <span className="hidden sm:inline text-neutral-200 self-center select-none">•</span>
                    <button
                      onClick={() => handleNavClick('commissions')}
                      className="text-[11px] sm:text-xs tracking-[0.15em] text-neutral-500 hover:text-amber-700 transition-colors duration-300 uppercase text-center py-2"
                    >
                      Bespoke Orders
                    </button>
                  </div>

                  {/* Brand Footer in Mobile Menu */}
                  <div className="text-center pt-3 sm:pt-4 border-t border-neutral-50">
                    <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.25em] sm:tracking-[0.3em] leading-relaxed">
                      Unique Tany
                    </p>
                    <p className="text-[8px] sm:text-[9px] text-neutral-300 tracking-[0.2em] mt-1">
                      Handcrafted with devotion
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}