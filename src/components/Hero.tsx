import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Award, HeartHandshake, Play } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAtelierClick: () => void;
}

export default function Hero({ onExploreClick, onAtelierClick }: HeroProps) {
  const credentials = [
    {
      icon: ShieldCheck,
      title: 'Indestructible',
      desc: 'Authentic saddle stitch never unravels.',
    },
    {
      icon: Award,
      title: 'Premier Selection',
      desc: 'Finest French & Italian tanneries.',
    },
    {
      icon: HeartHandshake,
      title: '100% Hand-cut',
      desc: 'Individually tailored by artisans.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-stone-50 border-b border-stone-200">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #92400e 0px,
            #92400e 1px,
            transparent 1px,
            transparent 12px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">

          {/* ── Left: Text Content ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1">

            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-amber-700" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] text-amber-800 font-semibold uppercase">
                The Pinnacle of Saddle Stitching
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal leading-[1.15] sm:leading-[1.12] text-neutral-900 tracking-tight font-serif">
                Crafted for a{' '}
                <br className="hidden sm:block" />
                <em className="italic font-light text-amber-800 not-italic">
                  Lifetime of Stories
                </em>
              </h1>

              <p className="text-xs sm:text-sm md:text-sm text-neutral-500 font-light leading-relaxed max-w-lg pt-1">
                Unique Tany leather goods are sculpted individually by hand,
                using the ancient saddle-stitching technique that no sewing
                machine can replicate. Made from the world's most selected
                full-grain French and Italian calfskins.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 pt-1"
            >
              <button
                onClick={onExploreClick}
                id="hero-explore-btn"
                className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 bg-neutral-900 text-stone-100 text-[10px] sm:text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-500 flex items-center justify-center gap-2.5 hover:bg-amber-800 active:scale-[0.98]"
              >
                <span>Explore Collections</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              <button
                onClick={onAtelierClick}
                id="hero-atelier-btn"
                className="group px-6 sm:px-8 py-3.5 sm:py-4 border border-neutral-300 text-neutral-700 text-[10px] sm:text-[11px] tracking-[0.2em] font-medium uppercase hover:border-neutral-900 hover:text-neutral-900 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              >
                <Play
                  size={11}
                  className="group-hover:text-amber-800 transition-colors duration-300"
                  strokeWidth={2}
                />
                <span>Enter the Atelier</span>
              </button>
            </motion.div>

            {/* Craft Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 border-t border-stone-200 pt-6 sm:pt-8"
            >
              {credentials.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-1.5 sm:gap-2 text-left group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-sm bg-amber-50 group-hover:bg-amber-100 transition-colors duration-300">
                    <Icon
                      size={15}
                      className="text-amber-800"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-neutral-800 uppercase leading-tight">
                    {title}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light leading-snug hidden sm:block">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual Section ── */}
          <div className="lg:col-span-7 xl:col-span-7 relative order-1 lg:order-2">

            {/* Decorative corner lines */}
            <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 border-t-2 border-l-2 border-amber-700/20 pointer-events-none z-10 hidden sm:block" />
            <div className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 border-b-2 border-r-2 border-amber-700/20 pointer-events-none z-10 hidden sm:block" />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="relative overflow-hidden shadow-2xl"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Main Image */}
              <img
                src="/src/assets/images/hero_leather_craft_1783975841486.jpg"
                alt="Unique Tany Saddle Stitching Handcrafted Leather Wallet"
                className="object-cover w-full h-full brightness-[0.92] contrast-[1.03] scale-[1.01] hover:scale-[1.04] transition-transform duration-700"
              />

              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Floating Craft Badge — top left */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-amber-800 text-amber-50 px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2"
              >
                <span className="text-[8px] sm:text-[9px] tracking-[0.2em] font-semibold uppercase">
                  Fait Main
                </span>
                <span className="block w-px h-3 bg-amber-500/60" />
                <span className="text-[8px] sm:text-[9px] tracking-[0.15em] font-light opacity-80">
                  Since 2012
                </span>
              </motion.div>

              {/* Floating Info Card — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-md p-3 sm:p-4 md:p-5 max-w-[160px] sm:max-w-[210px] md:max-w-[240px] border border-stone-100 shadow-lg text-left hidden xs:block"
              >
                <p className="text-[8px] sm:text-[9px] tracking-[0.25em] text-amber-800 font-semibold uppercase mb-1">
                  Featured Craft
                </p>
                <h3 className="text-[11px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider leading-snug mb-1.5 sm:mb-2">
                  The French Linen Stitch
                </h3>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-light leading-relaxed hidden sm:block">
                  Every stitch is made by hand using beeswax-coated linen
                  thread, creating a diagonal lock seam.
                </p>
                <div className="mt-2 sm:mt-3 flex items-center gap-1.5">
                  <span className="block w-5 h-px bg-amber-700" />
                  <span className="text-[8px] tracking-[0.2em] text-amber-800 uppercase font-medium">
                    Discover
                  </span>
                </div>
              </motion.div>

              {/* Stats strip — bottom full width on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm px-4 py-3 flex justify-around sm:hidden"
              >
                {[
                  { value: '12+', label: 'Years' },
                  { value: '100%', label: 'Hand-made' },
                  { value: '50+', label: 'Countries' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-[13px] font-semibold text-amber-400 tracking-wider">
                      {value}
                    </p>
                    <p className="text-[8px] text-neutral-400 tracking-widest uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats strip — desktop below image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="hidden sm:grid grid-cols-3 divide-x divide-stone-200 border border-stone-200 bg-white mt-4"
            >
              {[
                { value: '12+', label: 'Years of Craft' },
                { value: '100%', label: 'Hand-made' },
                { value: '50+', label: 'Countries Shipped' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center py-3 sm:py-4 px-2 group hover:bg-stone-50 transition-colors duration-300"
                >
                  <p className="text-base sm:text-lg md:text-xl font-light text-amber-800 tracking-wider">
                    {value}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-neutral-400 tracking-[0.15em] uppercase mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}