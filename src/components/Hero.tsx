import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAtelierClick: () => void;
}

export default function Hero({ onExploreClick, onAtelierClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-luxury-sand py-12 lg:py-20 border-b border-luxury-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 text-left"
            >
              <span className="text-[10px] tracking-[0.4em] text-luxury-gold-dark font-medium uppercase block">
                The Pinnacle of Saddle Stitching
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-luxury-charcoal tracking-tight font-serif">
                Crafted for a <br />
                <span className="italic font-light text-luxury-tan">Lifetime of Stories</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-xl">
                Unique Tany leather goods are sculpted individually by hand, using the ancient saddle-stitching technique that no sewing machine can ever replicate. Made from the world's most selected full-grain French and Italian calfskins.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="group px-8 py-4 bg-luxury-charcoal text-luxury-cream text-xs tracking-luxury font-medium uppercase hover:bg-luxury-orange transition-all duration-300 flex items-center justify-center space-x-2"
                id="hero-explore-btn"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onAtelierClick}
                className="px-8 py-4 border border-luxury-charcoal text-luxury-charcoal text-xs tracking-luxury font-medium uppercase hover:bg-luxury-charcoal hover:text-white transition-all duration-300 flex items-center justify-center"
                id="hero-atelier-btn"
              >
                ENTER THE ATELIER
              </button>
            </motion.div>

            {/* High-End Craft Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8"
            >
              <div className="flex flex-col space-y-1.5 text-left">
                <ShieldCheck size={18} className="text-luxury-gold-dark" strokeWidth={1.5} />
                <h4 className="text-[11px] font-medium tracking-wider text-luxury-charcoal uppercase">Indestructible</h4>
                <p className="text-[10px] text-gray-500 font-light leading-snug">Authentic saddle stitch never unravels.</p>
              </div>
              <div className="flex flex-col space-y-1.5 text-left">
                <Award size={18} className="text-luxury-gold-dark" strokeWidth={1.5} />
                <h4 className="text-[11px] font-medium tracking-wider text-luxury-charcoal uppercase">Premier Selection</h4>
                <p className="text-[10px] text-gray-500 font-light leading-snug">Finest French & Italian tanneries.</p>
              </div>
              <div className="flex flex-col space-y-1.5 text-left">
                <HeartHandshake size={18} className="text-luxury-gold-dark" strokeWidth={1.5} />
                <h4 className="text-[11px] font-medium tracking-wider text-luxury-charcoal uppercase">100% Hand-cut</h4>
                <p className="text-[10px] text-gray-500 font-light leading-snug">Individually tailored by artisans.</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Image Section */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-square xl:aspect-[16/10] bg-zinc-100 shadow-xl border border-white"
            >
              <img
                src="/src/assets/images/hero_leather_craft_1783975841486.jpg"
                alt="Unique Tany Saddle Stitching Handcrafted Leather Wallet"
                className="object-cover w-full h-full filter brightness-[0.93] contrast-[1.02]"
                referrerPolicy="no-referrer"
              />
              {/* Floating Overlay Card (Luxury Accent) */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 sm:p-6 max-w-xs border border-luxury-sand text-left hidden sm:block">
                <p className="text-[9px] tracking-widest text-luxury-gold-dark font-semibold uppercase mb-1">
                  Featured Craft
                </p>
                <h3 className="text-sm font-medium text-luxury-charcoal uppercase tracking-wider mb-2">
                  The French Linen Stitch
                </h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Every Single stitch is made by hand using beeswax-coated linen thread, creating a diagonal lock seam.
                </p>
              </div>
            </motion.div>

            {/* Subtle luxury geometric details */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-luxury-gold/30 pointer-events-none hidden lg:block" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-luxury-gold/30 pointer-events-none hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
}
