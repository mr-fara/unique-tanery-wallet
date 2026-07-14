import { useState } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, HelpCircle } from 'lucide-react';
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

  const navItems = [
    { id: 'all', label: 'ALL COLLECTIONS' },
    { id: 'bags', label: 'WOMEN’S BAGS' },
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
    <header className="sticky top-0 z-40 bg-luxury-cream border-b border-luxury-sand backdrop-blur-md bg-opacity-95">
      {/* Top Banner (Hermes Style) */}
      <div className="bg-luxury-charcoal text-luxury-sand text-[10px] tracking-widest text-center py-2 px-4 uppercase font-light">
        <span>Saddle Stitching & Pure Leather Craft • Complimentary Bespoke Wrapping • Shipping Worldwide</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Left Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 text-[11px] tracking-luxury text-gray-500">
            <button 
              onClick={() => handleNavClick('atelier')}
              className="hover:text-luxury-orange transition-colors duration-300 flex items-center space-x-1.5"
            >
              <span>THE慢CRAFT PHILOSOPHY</span>
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => handleNavClick('commissions')}
              className="hover:text-luxury-orange transition-colors duration-300"
            >
              BESPOKE MEASUREMENTS
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-luxury-charcoal hover:text-luxury-orange transition-colors"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Centered Brand Title & Logo (Refined Luxury Aesthetic) */}
          <div className="flex flex-col items-center justify-center text-center select-none cursor-pointer" onClick={() => handleNavClick('all')}>
            <h1 className="text-2xl sm:text-3xl font-normal tracking-[0.25em] text-luxury-charcoal font-serif">
              UNIQUE TANY
            </h1>
            <span className="text-[9px] tracking-[0.4em] text-luxury-gold-dark font-medium uppercase mt-1">
              Maroquinerie de Luxe • Fait Main
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 text-luxury-charcoal hover:text-luxury-orange transition-colors duration-300 hidden sm:inline-block" title="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={openWishlist}
              className="p-2 text-luxury-charcoal hover:text-luxury-orange transition-colors duration-300 relative" 
              title="Wishlist"
              id="wishlist-btn"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-luxury-gold text-luxury-cream text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="p-2 text-luxury-charcoal hover:text-luxury-orange transition-colors duration-300 relative flex items-center space-x-1"
              title="Shopping Bag"
              id="cart-btn"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-[11px] font-medium tracking-wider hidden sm:inline text-gray-600">BAG</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-luxury-orange text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Desktop Elegant Navigation Bar */}
        <nav className="hidden lg:flex justify-center border-t border-luxury-sand py-4">
          <ul className="flex space-x-10 text-[11px] font-medium tracking-[0.2em] text-gray-600">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`hover:text-luxury-orange transition-colors duration-300 relative py-1 ${
                    activeTab === item.id 
                      ? 'text-luxury-orange font-semibold border-b border-luxury-orange' 
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sliding Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-luxury-sand bg-luxury-cream overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left text-xs font-medium tracking-luxury py-2 border-b border-luxury-sand ${
                        activeTab === item.id ? 'text-luxury-orange font-semibold pl-2 border-l-2 border-l-luxury-orange' : 'text-gray-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-luxury-sand space-y-4">
                <div className="flex justify-around text-xs tracking-luxury text-gray-500">
                  <button onClick={() => handleNavClick('atelier')} className="hover:text-luxury-orange">
                    Our Heritage
                  </button>
                  <span>•</span>
                  <button onClick={() => handleNavClick('commissions')} className="hover:text-luxury-orange">
                    Bespoke Orders
                  </button>
                </div>
                <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
                  Unique Tany • Handcrafted with devotion
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
