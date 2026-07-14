import { Mail, Phone, MapPin, Award, Shield, Compass } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-luxury-charcoal text-luxury-cream border-t border-luxury-charcoal pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Three Brand Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800 text-left">
          
          <div className="flex items-start space-x-3.5">
            <Award className="text-luxury-gold mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-sans">
                L’Art du Point Sellier
              </h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                Every wallet and handbag is stitched using the classical saddle-stitch method with two needles. If a thread breaks, the stitch remains completely locked.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <Shield className="text-luxury-gold mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-sans">
                Responsibly Sourced Hides
              </h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                Our leathers are exclusively co-produced with premium French and Italian meat industries, tanned in compliance with stringent REACH environment codes.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <Compass className="text-luxury-gold mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-sans">
                The Heritage Guarantee
              </h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                Unique Tany provides a complimentary lifetime restitching warranty for all items. We believe leather is alive and should outlast generations.
              </p>
            </div>
          </div>

        </div>

        {/* Middle Section: Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-12 text-left">
          
          {/* Brand Presentation */}
          <div className="space-y-4">
            <h3 className="text-sm font-normal tracking-[0.2em] text-white font-serif uppercase">
              Unique Tany
            </h3>
            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
              We are a dedicated local atelier celebrating slow, meditative leather craftsmanship. Hand-cut, hand-stitched, and hand-painted under golden natural light.
            </p>
            <div className="space-y-2 text-[10px] text-gray-400 font-mono">
              <div className="flex items-center space-x-2">
                <MapPin size={12} className="text-luxury-gold" />
                <span>Atelier: L’Avenue des Artisans, Paris</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={12} className="text-luxury-gold" />
                <span>concierge@uniquetany.com</span>
              </div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-wider text-white uppercase font-sans">
              The Collections
            </h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li>
                <button onClick={() => onNavClick('bags')} className="hover:text-luxury-gold transition-colors">
                  Women’s Fine Handbags
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('wallets')} className="hover:text-luxury-gold transition-colors">
                  Seamless Bifold Wallets
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('watch-straps')} className="hover:text-luxury-gold transition-colors">
                  Bespoke Padded Watch Straps
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('gifts')} className="hover:text-luxury-gold transition-colors">
                  Personalized Gift Wallet Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care / Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-wider text-white uppercase font-sans">
              Artisan Services
            </h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li>
                <button onClick={() => onNavClick('commissions')} className="hover:text-luxury-gold transition-colors">
                  Bespoke Watch Strap Measurement Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('atelier')} className="hover:text-luxury-gold transition-colors">
                  The Saddle Stitching Tutorial
                </button>
              </li>
              <li>
                <a href="#care" className="hover:text-luxury-gold transition-colors">
                  Vegetable-Tanned Leather Care Guide
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-luxury-gold transition-colors">
                  Worldwide Customs & Duties Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-wider text-white uppercase font-sans">
              Atelier Dispatch
            </h4>
            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
              Receive brief notifications regarding limited hide acquisitions (such as fine Epsom dyes) and custom production queues.
            </p>
            <div className="flex border-b border-gray-700 pb-1.5 pt-1">
              <input
                type="email"
                placeholder="artisan@domain.com"
                className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-full font-light"
              />
              <button className="text-[10px] font-semibold tracking-luxury text-luxury-gold hover:text-white transition-colors">
                SUBMIT
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & locale list */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-500 tracking-widest uppercase">
          <div className="mb-4 sm:mb-0">
            <span>© 2026 UNIQUE TANY. MAROQUINIER DEPUIS 2026. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex space-x-4">
            <span>PARIS</span>
            <span>•</span>
            <span>NEW YORK</span>
            <span>•</span>
            <span>SEOUL</span>
            <span>•</span>
            <span>TOKYO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
