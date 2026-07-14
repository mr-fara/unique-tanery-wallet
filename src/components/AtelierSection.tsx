import { useState, useCallback } from 'react';
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
} from 'lucide-react';
import { ATELIER_STEPS, BRAND_STORY } from '../data';

export default function AtelierSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedLeatherFamily, setSelectedLeatherFamily] = useState(0);
  const [stitchCount, setStitchCount] = useState(0);
  const [edgeLayerCount, setEdgeLayerCount] = useState(1);
  const [edgeIsPolished, setEdgeIsPolished] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    // Reset interactive states when switching
    setStitchCount(0);
    setEdgeLayerCount(1);
    setEdgeIsPolished(false);
    setSelectedLeatherFamily(0);
  };

  const activeStep = ATELIER_STEPS[activeStepIndex];

  const statItems = [
    { icon: Clock, value: '40+', label: 'Hours per piece' },
    { icon: Layers, value: '5', label: 'Edge coat layers' },
    { icon: Gem, value: '100%', label: 'Full-grain leather' },
    { icon: Flame, value: '0', label: 'Machine stitches' },
  ];

  return (
    <section className="bg-stone-50 border-b border-stone-200 py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5 pb-10 sm:pb-14 lg:pb-20"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-amber-700" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-amber-800 font-semibold uppercase">
              Notre Philosophie de Longévité
            </span>
            <span className="block w-8 h-px bg-amber-700" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight font-serif leading-tight">
            The Unique Tany <br className="hidden sm:block" />
            <em className="italic font-light text-amber-800">Slow-Craft Atelier</em>
          </h2>

          <div className="w-12 h-px bg-amber-700/40 mx-auto" />

          <p className="text-base sm:text-lg text-stone-500 italic font-light leading-relaxed font-serif max-w-2xl mx-auto px-4 sm:px-0">
            "{BRAND_STORY.quote}"
          </p>

          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto px-2 sm:px-0">
            {BRAND_STORY.philosophy}
          </p>
        </motion.div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-stone-200 border border-stone-200 bg-white mb-6 sm:mb-8 lg:mb-12"
        >
          {statItems.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-4 sm:py-5 px-3 text-center gap-1.5 group hover:bg-stone-50 transition-colors duration-300"
            >
              <Icon
                size={16}
                className="text-amber-700 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <span className="text-lg sm:text-xl md:text-2xl font-light text-neutral-800 tracking-wider">
                {value}
              </span>
              <span className="text-[8px] sm:text-[9px] text-neutral-400 tracking-[0.15em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Main Interactive Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white border border-stone-200 shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[620px]">

            {/* ── Left Navigator ── */}
            <div className="lg:col-span-4 bg-stone-50 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col">

              {/* Mobile: Accordion Toggle */}
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="lg:hidden flex items-center justify-between w-full px-4 sm:px-6 py-4 border-b border-stone-200 bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold">
                    {activeStepIndex + 1}
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] text-amber-800 tracking-widest uppercase font-medium">
                      Step {activeStep.stepNumber}
                    </p>
                    <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                      {activeStep.title}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: mobileNavOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} className="text-neutral-400" />
                </motion.div>
              </button>

              {/* Step List */}
              <AnimatePresence>
                <div
                  className={`lg:block ${mobileNavOpen ? 'block' : 'hidden'} flex-1 flex flex-col`}
                >
                  <div className="p-4 sm:p-5 lg:p-6 xl:p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-4 sm:space-y-5">
                      <div className="hidden lg:block">
                        <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-amber-800 font-semibold uppercase">
                          Interactive Journey
                        </span>
                      </div>

                      <ul className="space-y-2 sm:space-y-3">
                        {ATELIER_STEPS.map((step, idx) => (
                          <li key={step.id}>
                            <motion.button
                              onClick={() => handleStepChange(idx)}
                              className={`w-full text-left px-3 sm:px-4 py-3 sm:py-4 border transition-all duration-300 flex items-start gap-3 sm:gap-4 group ${
                                activeStepIndex === idx
                                  ? 'border-neutral-800 bg-white shadow-sm'
                                  : 'border-transparent hover:border-stone-200 hover:bg-white/60'
                              }`}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Step number indicator */}
                              <div
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                                  activeStepIndex === idx
                                    ? 'bg-amber-800 text-white'
                                    : idx < activeStepIndex
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-stone-100 text-neutral-400 group-hover:bg-stone-200'
                                }`}
                              >
                                {idx < activeStepIndex ? (
                                  <Check size={12} strokeWidth={3} />
                                ) : (
                                  step.stepNumber
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider leading-tight">
                                  {step.title}
                                </h4>
                                <span className="text-[9px] sm:text-[10px] text-neutral-400 font-light italic block mt-0.5">
                                  {step.subtitle}
                                </span>
                              </div>

                              <ChevronRight
                                size={14}
                                className={`flex-shrink-0 mt-0.5 transition-all duration-300 ${
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

                    {/* Footer note — desktop only */}
                    <div className="pt-6 border-t border-stone-200 text-left hidden lg:block mt-6">
                      <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed font-light">
                        Unique Tany pieces are crafted on-demand. Explore each
                        stage above to understand the precision behind every
                        stitch.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatePresence>
            </div>

            {/* ── Right Interactive Window ── */}
            <div className="lg:col-span-8 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col h-full p-4 sm:p-6 lg:p-8 xl:p-10 gap-5 sm:gap-6"
                >
                  {/* Step Heading */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-amber-800 font-medium uppercase tracking-[0.2em]">
                      <span>Method {activeStep.stepNumber}</span>
                      <span className="text-stone-200">•</span>
                      <span className="text-neutral-400">{activeStep.subtitle}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-neutral-900 uppercase tracking-wider font-serif leading-tight">
                      {activeStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl">
                      {activeStep.description}
                    </p>
                  </div>

                  {/* ── Interactive Workbench ── */}
                  <div className="flex-1 bg-stone-50 border border-stone-200 p-4 sm:p-5 lg:p-6 flex flex-col justify-center items-center min-h-[220px] sm:min-h-[260px]">

                    {/* Step 1: Leather Selection */}
                    {activeStep.id === 'hide-selection' && (
                      <div className="w-full space-y-4 sm:space-y-5">
                        <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] text-center">
                          Select a leather family to inspect
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                          {activeStep.interactives?.map((leather, i) => (
                            <motion.button
                              key={leather.name}
                              onClick={() => setSelectedLeatherFamily(i)}
                              className={`p-3 sm:p-4 border text-center transition-all duration-300 ${
                                selectedLeatherFamily === i
                                  ? 'border-neutral-800 bg-white shadow-sm'
                                  : 'border-stone-200 hover:border-stone-300 bg-white/60'
                              }`}
                              whileTap={{ scale: 0.96 }}
                            >
                              <span
                                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border block mx-auto mb-2 shadow-inner transition-transform duration-300 ${
                                  selectedLeatherFamily === i
                                    ? 'scale-110 border-neutral-400'
                                    : 'border-neutral-200'
                                }`}
                                style={{ backgroundColor: leather.color }}
                              />
                              <span className="text-[8px] sm:text-[9px] tracking-wider text-neutral-700 font-semibold uppercase block">
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
                            className="bg-white border border-stone-100 p-3 sm:p-4 space-y-2"
                          >
                            <div className="flex items-center gap-2 text-amber-800 font-semibold text-[9px] sm:text-[10px] uppercase tracking-wider">
                              <Sparkles size={13} />
                              <span>
                                {activeStep.interactives?.[selectedLeatherFamily].name} Leather Selected
                              </span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-neutral-600 font-light leading-relaxed">
                              <strong className="text-neutral-800 font-medium">Character: </strong>
                              {activeStep.interactives?.[selectedLeatherFamily].textureType}
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light italic leading-snug">
                              Only the finest portions of each skin are selected. Loose-grain areas are discarded.
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Step 2: Hand Cutting */}
                    {activeStep.id === 'hand-cutting' && (
                      <div className="text-center space-y-4 sm:space-y-5 max-w-sm w-full mx-auto">
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
                            size={28}
                            strokeWidth={1.5}
                          />
                        </motion.div>

                        <div>
                          <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
                            Tailoring Pattern Placement
                          </h4>
                          <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                            An artisan inspects each calfskin skin-by-skin, then
                            lays heavy polished brass templates. With an angled
                            half-moon knife, we trace and cut with absolute
                            precision.
                          </p>
                        </div>

                        {/* Shimmer blade bar */}
                        <div className="space-y-2">
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
                          <span className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-widest block">
                            Blade alignment: 100% manual calibration
                          </span>
                        </div>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-2">
                          {['Brass Templates', 'Half-Moon Knife', 'Zero Machines'].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="text-[8px] sm:text-[9px] px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-100 uppercase tracking-wider font-medium"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Saddle Stitch Simulation */}
                    {activeStep.id === 'saddle-stitching' && (
                      <div className="w-full space-y-4 sm:space-y-5">
                        {/* Header row */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] sm:text-[10px] tracking-[0.15em] text-neutral-400 uppercase">
                            Saddle Clamp Simulation
                          </span>
                          <motion.button
                            onClick={resetStitching}
                            className="text-[8px] sm:text-[9px] tracking-wider text-amber-800 hover:text-amber-900 uppercase flex items-center gap-1.5 transition-colors"
                            whileTap={{ scale: 0.92 }}
                          >
                            <RefreshCw size={10} />
                            <span>Reset</span>
                          </motion.button>
                        </div>

                        {/* Stitch canvas */}
                        <div className="bg-white border border-stone-200 p-4 sm:p-5 relative overflow-hidden">
                          {/* Leather seam line */}
                          <div className="absolute top-1/2 left-4 right-4 h-px bg-stone-300 -translate-y-1/2 border-dashed border-t border-stone-200" />

                          {/* Stitch nodes */}
                          <div className="relative z-10 flex justify-between items-center gap-1.5 sm:gap-2 min-h-[60px] sm:min-h-[72px]">
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
                                className={`flex-1 h-7 sm:h-8 rounded-sm flex items-center justify-center transition-colors duration-300 border ${
                                  i < stitchCount
                                    ? 'bg-amber-50 border-amber-300'
                                    : 'bg-stone-50 border-stone-200'
                                }`}
                              >
                                {i < stitchCount && (
                                  <motion.span
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ opacity: 1, rotate: 12 }}
                                    className="text-[10px] sm:text-xs font-mono font-bold text-amber-800"
                                  >
                                    /
                                  </motion.span>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Stitch progress bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider">
                            <span>Thread progress</span>
                            <span className="font-semibold text-neutral-700">
                              {stitchCount} / 8
                            </span>
                          </div>
                          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-amber-700 rounded-full"
                              animate={{ width: `${(stitchCount / 8) * 100}%` }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        </div>

                        {/* Stitch button */}
                        <motion.button
                          onClick={handleStitchClick}
                          disabled={stitchCount >= 8}
                          className={`w-full py-3 text-[10px] sm:text-xs tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                            stitchCount >= 8
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'bg-neutral-900 text-white hover:bg-amber-800 active:scale-[0.98]'
                          }`}
                          whileTap={stitchCount < 8 ? { scale: 0.97 } : {}}
                        >
                          {stitchCount >= 8 ? (
                            <>
                              <Check size={13} strokeWidth={2.5} />
                              <span>Seam Completed</span>
                            </>
                          ) : (
                            <>
                              <ArrowRight size={13} />
                              <span>Pass Needle & Cast Stitch</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    )}

                    {/* Step 4: Edge Burnishing */}
                    {activeStep.id === 'edge-burnishing' && (
                      <div className="w-full space-y-4 sm:space-y-5 max-w-md mx-auto">
                        <div className="text-center space-y-1">
                          <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                            Edge-Glazing Process
                          </h4>
                          <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light leading-relaxed">
                            Multiple thin dye layers are fused into the leather edge using a heated iron, then sealed with warm beeswax.
                          </p>
                        </div>

                        {/* Layer slider */}
                        <div className="bg-white border border-stone-200 p-4 sm:p-5 space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <label className="text-[9px] sm:text-[10px] tracking-[0.15em] text-neutral-500 uppercase flex-shrink-0">
                              Dye Coats
                            </label>
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="range"
                                min="1"
                                max="5"
                                value={edgeLayerCount}
                                onChange={(e) =>
                                  setEdgeLayerCount(Number(e.target.value))
                                }
                                className="flex-1 accent-amber-800 cursor-pointer h-1.5"
                              />
                              <span className="text-sm font-semibold text-neutral-800 w-8 text-right">
                                {edgeLayerCount}/5
                              </span>
                            </div>
                          </div>

                          {/* Edge visual preview */}
                          <div className="space-y-2">
                            <p className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider">
                              Edge cross-section preview
                            </p>
                            <div className="h-12 sm:h-14 bg-stone-100 border border-stone-200 rounded-sm relative overflow-hidden flex items-center px-3">
                              {/* Raw leather base */}
                              <div className="absolute inset-0 flex items-center">
                                <div className="h-5 sm:h-6 w-full rounded-sm bg-[#cb9c7a] relative overflow-hidden">
                                  <motion.div
                                    className="absolute inset-y-0 left-0 bg-neutral-800 rounded-sm"
                                    animate={{ width: `${(edgeLayerCount / 5) * 100}%` }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                  />
                                  {edgeIsPolished && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Layer count label */}
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-neutral-500">
                                  {edgeLayerCount >= 5 ? 'Max Seal' : `${edgeLayerCount} layer${edgeLayerCount > 1 ? 's' : ''}`}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Polish button */}
                          <motion.button
                            onClick={() => setEdgeIsPolished(!edgeIsPolished)}
                            className={`w-full py-2.5 sm:py-3 border text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                              edgeIsPolished
                                ? 'bg-amber-800 text-white border-amber-800'
                                : 'bg-transparent text-neutral-600 border-neutral-300 hover:border-neutral-600'
                            }`}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Flame size={13} strokeWidth={1.5} />
                            <span>
                              {edgeIsPolished ? 'Wax Seal Applied ✓' : 'Apply Beeswax Polish'}
                            </span>
                          </motion.button>
                        </div>

                        {/* Status indicators */}
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            {
                              label: 'Coat layers',
                              status: edgeLayerCount >= 5 ? 'Complete' : 'Pending',
                              done: edgeLayerCount >= 5,
                            },
                            {
                              label: 'Wax finish',
                              status: edgeIsPolished ? 'Glazed' : 'Raw',
                              done: edgeIsPolished,
                            },
                          ].map(({ label, status, done }) => (
                            <div
                              key={label}
                              className={`flex items-center gap-2 px-3 py-2 border text-[8px] sm:text-[9px] uppercase tracking-wider transition-colors duration-300 ${
                                done
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                  : 'border-stone-200 bg-stone-50 text-neutral-400'
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                  done ? 'bg-emerald-500' : 'bg-neutral-300'
                                }`}
                              />
                              <span>
                                {label}: <strong>{status}</strong>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Step Footer ── */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t border-stone-100 text-[9px] sm:text-[10px] text-neutral-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />
                      <span className="font-medium text-neutral-600 uppercase tracking-wider">
                        {activeStep.subtitle}
                      </span>
                    </div>
                    <span className="font-light italic text-neutral-400">
                      Unique Tany • Crafted with absolute devotion
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