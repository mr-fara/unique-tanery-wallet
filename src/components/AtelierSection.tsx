import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Scissors,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Check,
  Flame,
  Layers,
  Gem,
  Clock,
  ArrowRight,
  Hand,
  Sun,
  Heart,
  Droplet,
  TrendingUp,
  Award,
  Zap,
  Eye,
  Play,
  Pause,
} from 'lucide-react';
import {
  ATELIER_STEPS,
  BRAND_STORY,
  PATINA_STAGES,
  PATINA_INFO,
  FALLBACK_IMAGE,
} from '../data';

// ──────────────────────────────────────────
// Icon resolver for patina knowledge cards
// ──────────────────────────────────────────
const PATINA_ICONS: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  layers: Hand,
  gem: Gem,
};

// ──────────────────────────────────────────
// Real-world patina examples with rich data
// ──────────────────────────────────────────
const PATINA_FACTORS = [
  {
    icon: Hand,
    title: 'Daily Handling',
    desc: 'Natural oils from your fingers polish the surface, creating a soft luster at contact points.',
    impact: 'High',
  },
  {
    icon: Sun,
    title: 'Sunlight Exposure',
    desc: 'UV rays gently deepen the leather color, adding warmth and richness to natural tones.',
    impact: 'Medium',
  },
  {
    icon: Droplet,
    title: 'Moisture & Humidity',
    desc: 'Small amounts of moisture help the leather stay supple and encourage even color development.',
    impact: 'Low',
  },
  {
    icon: Zap,
    title: 'Friction & Use',
    desc: 'Regular use creates unique wear patterns — a personal signature only your wallet will have.',
    impact: 'High',
  },
];

const PATINA_BENEFITS = [
  {
    icon: Award,
    stat: '100%',
    label: 'Unique to You',
    desc: 'No two patinas develop the same way',
  },
  {
    icon: TrendingUp,
    stat: '↑ 40%',
    label: 'Value Growth',
    desc: 'Well-patinated pieces often appreciate',
  },
  {
    icon: Clock,
    stat: '20+',
    label: 'Years of Life',
    desc: 'Full-grain leather ages beautifully',
  },
  {
    icon: Gem,
    stat: '1/1',
    label: 'One-of-a-Kind',
    desc: 'Your story written in leather',
  },
];

// ──────────────────────────────────────────
// Reordered steps: Patina → Hide → Cut → Stitch
// ──────────────────────────────────────────
const ORDERED_STEP_IDS = [
  'living-patina',
  'hide-selection',
  'hand-cutting',
  'saddle-stitching',
];

export default function AtelierSection() {
  // ── Step navigation state ──
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // ── Interactive states per step ──
  const [selectedLeatherFamily, setSelectedLeatherFamily] = useState(0);
  const [stitchCount, setStitchCount] = useState(0);
  const [patinaStage, setPatinaStage] = useState(0);
  const [expandedPatinaCard, setExpandedPatinaCard] = useState<number | null>(null);

  // ── Patina-specific interactive states ──
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);

  // ── Build ordered steps array ──
  const orderedSteps = ORDERED_STEP_IDS.map((id, index) => {
    const step = ATELIER_STEPS.find((s) => s.id === id)!;
    return { ...step, stepNumber: index + 1 };
  });

  // ── Auto-play patina timeline ──
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setPatinaStage((prev) => (prev + 1) % PATINA_STAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // ── Handlers ──
  const handleStitchClick = useCallback(() => {
    if (stitchCount < 8) {
      setStitchCount((prev) => prev + 1);
    }
  }, [stitchCount]);

  const resetStitching = useCallback(() => {
    setStitchCount(0);
  }, []);

  const handleStepChange = (idx: number) => {
    setActiveStepIndex(idx);
    setMobileNavOpen(false);
    setStitchCount(0);
    setSelectedLeatherFamily(0);
    setPatinaStage(0);
    setExpandedPatinaCard(null);
    setSliderPosition(50);
    setIsAutoPlaying(false);
  };

  const activeStep = orderedSteps[activeStepIndex];

  const statItems = [
    { icon: Clock, value: '40+', label: 'Hours per piece' },
    { icon: Layers, value: '100%', label: 'Full-grain leather' },
    { icon: Gem, value: '∞', label: 'Patina potential' },
    { icon: Flame, value: '0', label: 'Machine stitches' },
  ];

  return (
    <section className="bg-stone-50 border-b border-stone-200 py-8 xs:py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        {/* ═══════════════════════════════════════ */}
        {/* HEADER                                   */}
        {/* ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-3 xs:space-y-4 sm:space-y-5 pb-8 xs:pb-10 sm:pb-14 lg:pb-20"
        >
          <div className="flex items-center justify-center gap-2 xs:gap-3">
            <span className="block w-6 xs:w-8 h-px bg-amber-700" />
            <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.25em] xs:tracking-[0.3em] sm:tracking-[0.35em] text-amber-800 font-semibold uppercase">
              Handmade For You
            </span>
            <span className="block w-6 xs:w-8 h-px bg-amber-700" />
          </div>

          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight font-serif leading-tight">
            The UNIQUE TANERY{' '}
            <br className="hidden sm:block" />
            <em className="italic font-light text-amber-800">Slow-Craft Atelier</em>
          </h2>

          <div className="w-10 xs:w-12 h-px bg-amber-700/40 mx-auto" />

          <p className="text-sm xs:text-base sm:text-lg text-stone-500 italic font-light leading-relaxed font-serif max-w-2xl mx-auto px-2 xs:px-4 sm:px-0">
            " {BRAND_STORY.tagline} "
          </p>

          <p className="text-[11px] xs:text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto px-1 xs:px-2 sm:px-0">
            {BRAND_STORY.philosophy}
          </p>

          {/* Mission & Vision pills */}
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2 xs:gap-3 sm:gap-4 pt-2 sm:pt-4">
            <div className="bg-white border border-stone-200 px-3 xs:px-4 py-2.5 xs:py-3 max-w-xs text-left flex-1 mx-auto sm:mx-0 w-full">
              <div className="flex items-center gap-1.5 mb-1 xs:mb-1.5">
                <Heart size={10} className="text-amber-700" strokeWidth={2} />
                <p className="text-[9px] sm:text-[10px] text-amber-800 font-semibold uppercase tracking-[0.15em] xs:tracking-[0.2em]">
                  Our Mission
                </p>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                {BRAND_STORY.mission}
              </p>
            </div>
            <div className="bg-white border border-stone-200 px-3 xs:px-4 py-2.5 xs:py-3 max-w-xs text-left flex-1 mx-auto sm:mx-0 w-full">
              <div className="flex items-center gap-1.5 mb-1 xs:mb-1.5">
                <Sun size={10} className="text-amber-700" strokeWidth={2} />
                <p className="text-[9px] sm:text-[10px] text-amber-800 font-semibold uppercase tracking-[0.15em] xs:tracking-[0.2em]">
                  Our Vision
                </p>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                {BRAND_STORY.vision}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════ */}
        {/* STATS BAR                                */}
        {/* ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-stone-200 border border-stone-200 bg-white mb-5 xs:mb-6 sm:mb-8 lg:mb-12"
        >
          {statItems.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-3 xs:py-4 sm:py-5 px-2 xs:px-3 text-center gap-1 xs:gap-1.5 group hover:bg-stone-50 transition-colors duration-300"
            >
              <Icon
                size={14}
                className="xs:w-4 xs:h-4 text-amber-700 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-light text-neutral-800 tracking-wider">
                {value}
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9px] text-neutral-400 tracking-[0.1em] xs:tracking-[0.15em] uppercase leading-tight">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ═══════════════════════════════════════ */}
        {/* MAIN INTERACTIVE PANEL                   */}
        {/* ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white border border-stone-200 shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[640px]">
            {/* ─────────────────────────────── */}
            {/* LEFT NAVIGATOR                   */}
            {/* ─────────────────────────────── */}
            <div className="lg:col-span-4 xl:col-span-3 bg-stone-50 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col">
              {/* Mobile accordion toggle */}
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="lg:hidden flex items-center justify-between w-full px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-b border-stone-200 bg-white"
              >
                <div className="flex items-center gap-2 xs:gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold">
                    {activeStepIndex + 1}
                  </div>
                  <div className="text-left">
                    <p className="text-[7px] xs:text-[8px] text-amber-800 tracking-widest uppercase font-medium">
                      Step {activeStep.stepNumber}
                    </p>
                    <p className="text-[11px] xs:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                      {activeStep.title}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: mobileNavOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={16} className="text-neutral-400" />
                </motion.div>
              </button>

              {/* Step list */}
              <div
                className={`lg:block ${
                  mobileNavOpen ? 'block' : 'hidden'
                } flex-1 flex flex-col`}
              >
                <div className="p-3 xs:p-4 sm:p-5 lg:p-5 xl:p-7 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                    <div className="hidden lg:block">
                      <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-amber-800 font-semibold uppercase">
                        Craft Journey
                      </span>
                    </div>

                    <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                      {orderedSteps.map((step, idx) => (
                        <li key={step.id}>
                          <motion.button
                            onClick={() => handleStepChange(idx)}
                            className={`w-full text-left px-2.5 xs:px-3 sm:px-4 py-2.5 xs:py-3 sm:py-4 border transition-all duration-300 flex items-start gap-2 xs:gap-3 sm:gap-4 group ${
                              activeStepIndex === idx
                                ? 'border-neutral-800 bg-white shadow-sm'
                                : 'border-transparent hover:border-stone-200 hover:bg-white/60'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[9px] xs:text-[10px] sm:text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                                activeStepIndex === idx
                                  ? 'bg-amber-800 text-white'
                                  : idx < activeStepIndex
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-stone-100 text-neutral-400 group-hover:bg-stone-200'
                              }`}
                            >
                              {idx < activeStepIndex ? (
                                <Check size={11} strokeWidth={3} />
                              ) : (
                                step.stepNumber
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider leading-tight">
                                {step.title}
                              </h4>
                              <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-400 font-light italic block mt-0.5">
                                {step.subtitle}
                              </span>
                            </div>

                            <ChevronRight
                              size={12}
                              className={`xs:w-3.5 xs:h-3.5 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                                activeStepIndex === idx
                                  ? 'text-amber-800 translate-x-0.5'
                                  : 'text-neutral-200 group-hover:text-neutral-400'
                              }`}
                            />
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer — desktop only */}
                  <div className="pt-4 sm:pt-6 border-t border-stone-200 text-left hidden lg:block mt-4 sm:mt-6">
                    <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed font-light">
                      Every UNIQUE TANERY piece is crafted on-demand with absolute
                      devotion.
                    </p>
                    <p className="text-[9px] text-amber-800 font-medium italic mt-2">
                      " {BRAND_STORY.tagline} "
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────── */}
            {/* RIGHT INTERACTIVE WINDOW         */}
            {/* ─────────────────────────────── */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col h-full p-3 xs:p-4 sm:p-6 lg:p-7 xl:p-10 gap-4 xs:gap-5 sm:gap-6"
                >
                  {/* ── Step Heading + Hero Image ── */}
                  <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-1.5 xs:gap-2 text-[8px] xs:text-[9px] sm:text-[10px] text-amber-800 font-medium uppercase tracking-[0.15em] xs:tracking-[0.2em] flex-wrap">
                      <span>Step {activeStep.stepNumber}</span>
                      <span className="text-stone-200">•</span>
                      <span className="text-neutral-400">{activeStep.subtitle}</span>
                    </div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-normal text-neutral-900 uppercase tracking-wider font-serif leading-tight">
                      {activeStep.title}
                    </h3>

                    {/* Step hero image */}
                    <div className="relative overflow-hidden border border-stone-200 group">
                      <img
                        src={activeStep.imageUrl}
                        alt={activeStep.title}
                        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                        className="w-full h-32 xs:h-36 sm:h-44 lg:h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-2 xs:bottom-3 left-2 xs:left-3">
                        <span className="bg-white/90 backdrop-blur-sm px-2 xs:px-2.5 py-0.5 xs:py-1 text-[7px] xs:text-[8px] sm:text-[9px] text-neutral-800 font-semibold uppercase tracking-wider">
                          {activeStep.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] xs:text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl">
                      {activeStep.description}
                    </p>
                  </div>

                  {/* ═══════════════════════════════════════ */}
                  {/* INTERACTIVE WORKBENCH                    */}
                  {/* ═══════════════════════════════════════ */}
                  <div className="flex-1 bg-stone-50 border border-stone-200 p-3 xs:p-4 sm:p-5 lg:p-6 flex flex-col justify-center items-center min-h-[220px] sm:min-h-[260px]">
                    {/* ─────────────────────────────── */}
                    {/* STEP 1 (now): The Living Patina  */}
                    {/* ─────────────────────────────── */}
                    {activeStep.id === 'living-patina' && (
                      <div className="w-full space-y-4 xs:space-y-5 sm:space-y-6">
                        {/* ══════════════════════════════════════ */}
                        {/* HERO: BEFORE / AFTER INTERACTIVE SLIDER */}
                        {/* ══════════════════════════════════════ */}
                        <div className="space-y-2 xs:space-y-3">
                          <div className="text-center space-y-1">
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-amber-800 font-bold uppercase tracking-[0.2em] xs:tracking-[0.25em]">
                              ✦ The Magic of Patina ✦
                            </p>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-500 font-light italic">
                              Drag the slider to reveal the transformation
                            </p>
                          </div>

                          {/* Interactive before/after slider */}
                          <div className="relative w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden border-2 border-amber-200 select-none group">
                            {/* AFTER (aged) — bottom layer */}
                            <img
                              src={PATINA_STAGES[PATINA_STAGES.length - 1].imageUrl}
                              alt="Rich patina after 1 year"
                              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                              className="absolute inset-0 w-full h-full object-cover"
                              draggable={false}
                            />
                            <div className="absolute top-2 right-2 xs:top-3 xs:right-3 z-20">
                              <span className="bg-amber-800 text-white px-2 xs:px-2.5 py-0.5 xs:py-1 text-[7px] xs:text-[8px] sm:text-[9px] font-bold uppercase tracking-wider shadow-lg">
                                After • 1 Year
                              </span>
                            </div>

                            {/* BEFORE (new) — top layer, clipped */}
                            <div
                              className="absolute inset-0 overflow-hidden"
                              style={{ width: `${sliderPosition}%` }}
                            >
                              <img
                                src={PATINA_STAGES[0].imageUrl}
                                alt="Brand new leather"
                                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ width: `${(100 / sliderPosition) * 100}%` }}
                                draggable={false}
                              />
                              <div className="absolute top-2 left-2 xs:top-3 xs:left-3 z-20">
                                <span className="bg-white/95 backdrop-blur-sm text-neutral-800 px-2 xs:px-2.5 py-0.5 xs:py-1 text-[7px] xs:text-[8px] sm:text-[9px] font-bold uppercase tracking-wider shadow-lg">
                                  Before • Day 1
                                </span>
                              </div>
                            </div>

                            {/* Slider handle */}
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-30 pointer-events-none"
                              style={{ left: `${sliderPosition}%` }}
                            >
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-white shadow-2xl border-2 border-amber-800 flex items-center justify-center">
                                <div className="flex items-center gap-0.5">
                                  <ChevronRight
                                    size={10}
                                    className="text-amber-800 -mr-1 rotate-180"
                                    strokeWidth={3}
                                  />
                                  <ChevronRight
                                    size={10}
                                    className="text-amber-800 -ml-1"
                                    strokeWidth={3}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Slider input */}
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={sliderPosition}
                              onChange={(e) =>
                                setSliderPosition(Number(e.target.value))
                              }
                              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                              aria-label="Drag to compare before and after patina"
                            />
                          </div>

                          <p className="text-[8px] xs:text-[9px] text-center text-neutral-400 italic">
                            ← Drag the handle left or right to compare →
                          </p>
                        </div>

                        {/* ══════════════════════════════════════ */}
                        {/* PATINA TIMELINE WITH AUTO-PLAY          */}
                        {/* ══════════════════════════════════════ */}
                        <div className="bg-gradient-to-br from-amber-50/60 via-white to-stone-50 border border-amber-200/60 p-3 xs:p-4 lg:p-5 space-y-3 xs:space-y-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-amber-800 font-bold uppercase tracking-[0.2em]">
                              ⏱ Watch Your Leather Age
                            </p>
                            <button
                              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                              className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 py-1 xs:py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-[7px] xs:text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold transition-colors"
                            >
                              {isAutoPlaying ? (
                                <>
                                  <Pause size={9} strokeWidth={2.5} />
                                  <span>Pause</span>
                                </>
                              ) : (
                                <>
                                  <Play size={9} strokeWidth={2.5} />
                                  <span>Auto-Play</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Stage selector — cards */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2">
                            {PATINA_STAGES.map((stage, i) => (
                              <motion.button
                                key={stage.label}
                                onClick={() => {
                                  setPatinaStage(i);
                                  setIsAutoPlaying(false);
                                }}
                                className={`relative overflow-hidden py-2 xs:py-2.5 sm:py-3 border text-center transition-all duration-300 ${
                                  patinaStage === i
                                    ? 'border-amber-800 bg-white shadow-md'
                                    : 'border-stone-200 hover:border-amber-300 bg-white/80'
                                }`}
                                whileTap={{ scale: 0.96 }}
                              >
                                {patinaStage === i && (
                                  <motion.div
                                    layoutId="patinaStageActive"
                                    className="absolute top-0 left-0 right-0 h-0.5 bg-amber-800"
                                  />
                                )}
                                <span
                                  className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full block mx-auto mb-1 xs:mb-1.5 border transition-transform duration-300 ${
                                    patinaStage === i
                                      ? 'scale-110 border-neutral-400 shadow-md'
                                      : 'border-neutral-200'
                                  }`}
                                  style={{ backgroundColor: stage.color }}
                                />
                                <span className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider text-neutral-700 font-bold uppercase block">
                                  {stage.label}
                                </span>
                                <span className="text-[6px] xs:text-[7px] sm:text-[8px] text-neutral-400 font-light block leading-tight mt-0.5">
                                  {stage.sublabel}
                                </span>
                              </motion.button>
                            ))}
                          </div>

                          {/* Progress bar */}
                          <div className="space-y-1 xs:space-y-1.5">
                            <div className="flex items-center justify-between text-[7px] xs:text-[8px] text-neutral-500 uppercase tracking-wider">
                              <span>Aging progress</span>
                              <span className="font-bold text-amber-800">
                                {Math.round(
                                  ((patinaStage + 1) / PATINA_STAGES.length) * 100
                                )}
                                %
                              </span>
                            </div>
                            <div className="h-2 xs:h-2.5 flex rounded-sm overflow-hidden border border-stone-200 relative">
                              {PATINA_STAGES.map((stage, i) => (
                                <motion.div
                                  key={stage.label}
                                  className="relative flex-1"
                                  style={{ backgroundColor: stage.color }}
                                  animate={{ opacity: i <= patinaStage ? 1 : 0.25 }}
                                  transition={{ duration: 0.5 }}
                                />
                              ))}
                              <motion.div
                                className="absolute top-0 bottom-0 w-1 bg-white border-x border-amber-800 shadow-lg"
                                animate={{
                                  left: `${
                                    ((patinaStage + 1) / PATINA_STAGES.length) * 100 - 2
                                  }%`,
                                }}
                                transition={{ duration: 0.4 }}
                              />
                            </div>
                          </div>

                          {/* Active stage detail */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={patinaStage}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4 }}
                              className="flex flex-col sm:flex-row gap-2.5 xs:gap-3 sm:gap-4 items-start bg-white p-2.5 xs:p-3 sm:p-4 border border-stone-100"
                            >
                              <div className="flex-shrink-0 w-full sm:w-24 md:w-28 lg:w-32 h-24 sm:h-24 md:h-28 lg:h-32 overflow-hidden border border-stone-200 relative">
                                <img
                                  src={PATINA_STAGES[patinaStage].imageUrl}
                                  alt={`Leather at ${PATINA_STAGES[patinaStage].label}`}
                                  onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                                  className="w-full h-full object-cover"
                                />
                                <div
                                  className="absolute bottom-0 left-0 right-0 h-2 xs:h-2.5"
                                  style={{
                                    backgroundColor: PATINA_STAGES[patinaStage].color,
                                  }}
                                />
                              </div>

                              <div className="flex-1 space-y-1 xs:space-y-1.5 min-w-0">
                                <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
                                  <span
                                    className="w-3 h-3 rounded-full flex-shrink-0 border border-neutral-300"
                                    style={{
                                      backgroundColor: PATINA_STAGES[patinaStage].color,
                                    }}
                                  />
                                  <h5 className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-neutral-800 uppercase tracking-wider">
                                    {PATINA_STAGES[patinaStage].label}
                                  </h5>
                                  <span className="text-[8px] xs:text-[9px] text-amber-800 font-medium italic">
                                    · {PATINA_STAGES[patinaStage].sublabel}
                                  </span>
                                </div>
                                <p className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-600 font-light leading-relaxed">
                                  {PATINA_STAGES[patinaStage].description}
                                </p>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* ══════════════════════════════════════ */}
                        {/* WHAT AFFECTS PATINA — FACTOR CARDS      */}
                        {/* ══════════════════════════════════════ */}
                        <div className="space-y-2 xs:space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 xs:w-8 h-px bg-amber-700" />
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-amber-800 font-bold uppercase tracking-[0.2em]">
                              What Shapes Your Patina
                            </p>
                            <div className="flex-1 h-px bg-amber-700/30" />
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 xs:gap-2">
                            {PATINA_FACTORS.map((factor, i) => {
                              const Icon = factor.icon;
                              const isActive = activeFactorIndex === i;
                              return (
                                <motion.button
                                  key={factor.title}
                                  onClick={() => setActiveFactorIndex(i)}
                                  className={`text-left border p-2 xs:p-2.5 sm:p-3 transition-all duration-300 ${
                                    isActive
                                      ? 'border-amber-800 bg-amber-50/50 shadow-sm'
                                      : 'border-stone-200 bg-white hover:border-amber-300'
                                  }`}
                                  whileTap={{ scale: 0.97 }}
                                >
                                  <div className="flex items-center justify-between mb-1 xs:mb-1.5">
                                    <Icon
                                      size={12}
                                      className={`xs:w-3.5 xs:h-3.5 transition-colors ${
                                        isActive ? 'text-amber-800' : 'text-neutral-400'
                                      }`}
                                      strokeWidth={1.5}
                                    />
                                    <span
                                      className={`text-[6px] xs:text-[7px] px-1 xs:px-1.5 py-0.5 uppercase font-bold tracking-wider ${
                                        factor.impact === 'High'
                                          ? 'bg-amber-100 text-amber-800'
                                          : factor.impact === 'Medium'
                                          ? 'bg-stone-100 text-stone-600'
                                          : 'bg-stone-50 text-stone-400'
                                      }`}
                                    >
                                      {factor.impact}
                                    </span>
                                  </div>
                                  <h6 className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-neutral-800 uppercase tracking-wide leading-tight mb-1">
                                    {factor.title}
                                  </h6>
                                  <AnimatePresence>
                                    {isActive && (
                                      <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-500 font-light leading-relaxed overflow-hidden"
                                      >
                                        {factor.desc}
                                      </motion.p>
                                    )}
                                  </AnimatePresence>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        {/* ══════════════════════════════════════ */}
                        {/* WHY PATINA MATTERS — BENEFIT STATS      */}
                        {/* ══════════════════════════════════════ */}
                        <div className="bg-neutral-900 text-white p-3 xs:p-4 sm:p-5 lg:p-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-700/10 rounded-full -translate-y-16 translate-x-16" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-700/10 rounded-full translate-y-12 -translate-x-12" />

                          <div className="relative z-10 space-y-3 xs:space-y-4">
                            <div className="text-center space-y-1">
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-[0.25em]">
                                ✦ Why Patina Matters ✦
                              </p>
                              <h4 className="text-sm xs:text-base sm:text-lg font-serif italic text-white">
                                Your Wallet Becomes Your Story
                              </h4>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3">
                              {PATINA_BENEFITS.map((benefit, i) => {
                                const Icon = benefit.icon;
                                return (
                                  <motion.div
                                    key={benefit.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="text-center p-2 xs:p-2.5 sm:p-3 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-amber-400/40 transition-colors"
                                  >
                                    <Icon
                                      size={14}
                                      className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 mx-auto text-amber-400 mb-1 xs:mb-1.5"
                                      strokeWidth={1.5}
                                    />
                                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-light text-white tracking-wider mb-0.5">
                                      {benefit.stat}
                                    </div>
                                    <div className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-400 font-bold mb-1">
                                      {benefit.label}
                                    </div>
                                    <div className="text-[7px] xs:text-[8px] sm:text-[9px] text-white/60 font-light leading-tight">
                                      {benefit.desc}
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* ══════════════════════════════════════ */}
                        {/* PATINA KNOWLEDGE — EDUCATIONAL CARDS    */}
                        {/* ══════════════════════════════════════ */}
                        <div className="space-y-2 xs:space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 xs:w-8 h-px bg-amber-700" />
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-amber-800 font-bold uppercase tracking-[0.2em]">
                              Learn About Patina
                            </p>
                            <div className="flex-1 h-px bg-amber-700/30" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 xs:gap-2.5">
                            {PATINA_INFO.map((info, i) => {
                              const Icon = PATINA_ICONS[info.icon] || Sparkles;
                              const isExpanded = expandedPatinaCard === i;
                              return (
                                <motion.button
                                  key={info.title}
                                  onClick={() =>
                                    setExpandedPatinaCard(isExpanded ? null : i)
                                  }
                                  className={`text-left border p-2.5 xs:p-3 sm:p-3.5 transition-all duration-300 ${
                                    isExpanded
                                      ? 'border-amber-800 bg-white shadow-md'
                                      : 'border-stone-200 bg-white/60 hover:border-amber-300 hover:bg-white'
                                  }`}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex items-center justify-between mb-1.5 xs:mb-2">
                                    <div className="flex items-center gap-1.5 xs:gap-2">
                                      <div
                                        className={`w-6 h-6 xs:w-7 xs:h-7 rounded-full flex items-center justify-center transition-colors ${
                                          isExpanded
                                            ? 'bg-amber-800 text-white'
                                            : 'bg-amber-50 text-amber-700'
                                        }`}
                                      >
                                        <Icon size={11} strokeWidth={2} />
                                      </div>
                                      <h5 className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                                        {info.title}
                                      </h5>
                                    </div>
                                    <ChevronDown
                                      size={12}
                                      className={`text-neutral-400 transition-transform duration-300 ${
                                        isExpanded ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>

                                  <AnimatePresence>
                                    {isExpanded ? (
                                      <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[9px] xs:text-[10px] sm:text-[11px] text-neutral-600 font-light leading-relaxed overflow-hidden"
                                      >
                                        {info.content}
                                      </motion.p>
                                    ) : (
                                      <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-400 italic">
                                        Tap to reveal →
                                      </p>
                                    )}
                                  </AnimatePresence>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        {/* ══════════════════════════════════════ */}
                        {/* CLOSING — VALUE STATEMENT               */}
                        {/* ══════════════════════════════════════ */}
                        <div className="border-t-2 border-amber-200 pt-3 xs:pt-4 relative">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-stone-50 px-3">
                            <Gem size={12} className="text-amber-700" strokeWidth={1.5} />
                          </div>
                          <div className="text-center space-y-2 xs:space-y-3 max-w-2xl mx-auto pt-1">
                            <p className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-600 font-light leading-relaxed italic font-serif">
                              " {BRAND_STORY.handmadeValue} "
                            </p>
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-6 h-px bg-amber-700" />
                              <p className="text-[8px] xs:text-[9px] text-amber-800 font-bold uppercase tracking-[0.25em]">
                                UNIQUE TANERY
                              </p>
                              <div className="w-6 h-px bg-amber-700" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─────────────────────────────── */}
                    {/* STEP 2 (now): Hide Selection     */}
                    {/* ─────────────────────────────── */}
                    {activeStep.id === 'hide-selection' && (
                      <div className="w-full space-y-3 xs:space-y-4 sm:space-y-5">
                        <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.15em] xs:tracking-[0.2em] text-center">
                          Select a leather family to inspect
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3">
                          {activeStep.interactives?.map((leather, i) => (
                            <motion.button
                              key={leather.name}
                              onClick={() => setSelectedLeatherFamily(i)}
                              className={`p-2.5 xs:p-3 sm:p-4 border text-center transition-all duration-300 ${
                                selectedLeatherFamily === i
                                  ? 'border-neutral-800 bg-white shadow-sm'
                                  : 'border-stone-200 hover:border-stone-300 bg-white/60'
                              }`}
                              whileTap={{ scale: 0.96 }}
                            >
                              <span
                                className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full border block mx-auto mb-1.5 xs:mb-2 shadow-inner transition-transform duration-300 ${
                                  selectedLeatherFamily === i
                                    ? 'scale-110 border-neutral-400'
                                    : 'border-neutral-200'
                                }`}
                                style={{ backgroundColor: leather.color }}
                              />
                              <span className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider text-neutral-700 font-semibold uppercase block leading-tight">
                                {leather.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedLeatherFamily}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-stone-100 p-2.5 xs:p-3 sm:p-4 space-y-1.5 xs:space-y-2"
                          >
                            <div className="flex items-center gap-1.5 xs:gap-2 text-amber-800 font-semibold text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider">
                              <Sparkles size={11} className="xs:w-3 xs:h-3" />
                              <span>
                                {activeStep.interactives?.[selectedLeatherFamily].name}
                                {' — Full-Grain Selected'}
                              </span>
                            </div>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-600 font-light leading-relaxed">
                              <strong className="text-neutral-800 font-medium">
                                Character:{' '}
                              </strong>
                              {
                                activeStep.interactives?.[selectedLeatherFamily]
                                  .textureType
                              }
                            </p>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-400 font-light italic leading-snug">
                              Only the finest portions of each hide make it into
                              UNIQUE TANERY wallets.
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    )}

                    {/* ─────────────────────────────── */}
                    {/* STEP 3 (now): Hand Cutting       */}
                    {/* ─────────────────────────────── */}
                    {activeStep.id === 'hand-cutting' && (
                      <div className="text-center space-y-3 xs:space-y-4 sm:space-y-5 max-w-sm w-full mx-auto">
                        <motion.div
                          animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        >
                          <Scissors
                            className="mx-auto text-amber-800"
                            size={24}
                            strokeWidth={1.5}
                          />
                        </motion.div>

                        <div>
                          <h4 className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
                            Precision Pattern Placement
                          </h4>
                          <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                            Each wallet pattern is laid onto the leather by hand.
                            Our artisans use steel weights and half-moon knives to
                            cut every panel with absolute precision.
                          </p>
                        </div>

                        <div className="space-y-1.5 xs:space-y-2">
                          <div className="h-1.5 sm:h-2 w-full bg-stone-200 rounded-full overflow-hidden relative">
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background:
                                  'linear-gradient(90deg, #92400e 0%, #d97706 50%, #92400e 100%)',
                                backgroundSize: '200% 100%',
                              }}
                              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                          </div>
                          <span className="text-[7px] xs:text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-widest block">
                            100% manual — zero machines
                          </span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2">
                          {['Steel Weights', 'Half-Moon Knife', 'Hand Beveling'].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="text-[7px] xs:text-[8px] sm:text-[9px] px-2 xs:px-2.5 py-0.5 xs:py-1 bg-amber-50 text-amber-800 border border-amber-100 uppercase tracking-wider font-medium"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* ─────────────────────────────── */}
                    {/* STEP 4 (now): Saddle Stitching   */}
                    {/* ─────────────────────────────── */}
                    {activeStep.id === 'saddle-stitching' && (
                      <div className="w-full space-y-3 xs:space-y-4 sm:space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] xs:tracking-[0.15em] text-neutral-400 uppercase">
                            Saddle Stitch Simulation
                          </span>
                          <motion.button
                            onClick={resetStitching}
                            className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider text-amber-800 hover:text-amber-900 uppercase flex items-center gap-1 xs:gap-1.5 transition-colors"
                            whileTap={{ scale: 0.92 }}
                          >
                            <RefreshCw size={9} className="xs:w-2.5 xs:h-2.5" />
                            <span>Reset</span>
                          </motion.button>
                        </div>

                        <div className="bg-white border border-stone-200 p-3 xs:p-4 sm:p-5 relative overflow-hidden">
                          <div className="absolute top-1/2 left-3 xs:left-4 right-3 xs:right-4 h-px bg-stone-300 -translate-y-1/2 border-dashed border-t border-stone-200" />
                          <div className="relative z-10 flex justify-between items-center gap-1 xs:gap-1.5 sm:gap-2 min-h-[52px] xs:min-h-[60px] sm:min-h-[72px]">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <motion.div
                                key={i}
                                initial={false}
                                animate={
                                  i < stitchCount
                                    ? { scale: [0.8, 1.1, 1], opacity: 1 }
                                    : { scale: 1, opacity: 1 }
                                }
                                transition={{ duration: 0.35 }}
                                className={`flex-1 h-6 xs:h-7 sm:h-8 rounded-sm flex items-center justify-center transition-colors duration-300 border ${
                                  i < stitchCount
                                    ? 'bg-amber-50 border-amber-300'
                                    : 'bg-stone-50 border-stone-200'
                                }`}
                              >
                                {i < stitchCount && (
                                  <motion.span
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ opacity: 1, rotate: 12 }}
                                    className="text-[9px] xs:text-[10px] sm:text-xs font-mono font-bold text-amber-800"
                                  >
                                    /
                                  </motion.span>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1 xs:space-y-1.5">
                          <div className="flex items-center justify-between text-[7px] xs:text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider">
                            <span>Thread progress</span>
                            <span className="font-semibold text-neutral-700">
                              {stitchCount} / 8
                            </span>
                          </div>
                          <div className="h-1 xs:h-1.5 bg-stone-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-amber-700 rounded-full"
                              animate={{ width: `${(stitchCount / 8) * 100}%` }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        </div>

                        <motion.button
                          onClick={handleStitchClick}
                          disabled={stitchCount >= 8}
                          className={`w-full py-2.5 xs:py-3 text-[9px] xs:text-[10px] sm:text-xs tracking-[0.15em] xs:tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                            stitchCount >= 8
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'bg-neutral-900 text-white hover:bg-amber-800 active:scale-[0.98]'
                          }`}
                          whileTap={stitchCount < 8 ? { scale: 0.97 } : {}}
                        >
                          {stitchCount >= 8 ? (
                            <>
                              <Check size={12} strokeWidth={2.5} />
                              <span>Seam Completed — Built to Last</span>
                            </>
                          ) : (
                            <>
                              <ArrowRight size={12} />
                              <span>Pass Needle & Cast Stitch</span>
                            </>
                          )}
                        </motion.button>

                        <p className="text-[8px] xs:text-[9px] text-neutral-400 font-light italic text-center leading-snug">
                          Two needles, one thread. If one stitch breaks, others hold.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ── Step Footer ── */}
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 xs:gap-2 pt-3 xs:pt-4 border-t border-stone-100 text-[8px] xs:text-[9px] sm:text-[10px] text-neutral-400">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />
                      <span className="font-medium text-neutral-600 uppercase tracking-wider">
                        {activeStep.subtitle}
                      </span>
                    </div>
                    <span className="font-light italic text-neutral-400">
                      UNIQUE TANERY • {BRAND_STORY.tagline}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}