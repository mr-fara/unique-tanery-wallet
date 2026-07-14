import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Scissors, HelpCircle, Eye, Hammer, RefreshCw } from 'lucide-react';
import { ATELIER_STEPS, BRAND_STORY } from '../data';

export default function AtelierSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  // Interactive Step 1: Leather family toggles
  const [selectedLeatherFamily, setSelectedLeatherFamily] = useState(0);
  
  // Interactive Step 3: Stitching simulation state
  const [stitchCount, setStitchCount] = useState(0);
  const [stitchHistory, setStitchHistory] = useState<number[]>([]);
  
  // Interactive Step 4: Edge finish slider state
  const [edgeLayerCount, setEdgeLayerCount] = useState(1);
  const [edgeIsPolished, setEdgeIsPolished] = useState(false);

  const handleStitchClick = () => {
    if (stitchCount < 8) {
      setStitchCount(prev => prev + 1);
      setStitchHistory(prev => [...prev, prev.length]);
    }
  };

  const resetStitching = () => {
    setStitchCount(0);
    setStitchHistory([]);
  };

  const handlePolishToggle = () => {
    setEdgeIsPolished(!edgeIsPolished);
  };

  const activeStep = ATELIER_STEPS[activeStepIndex];

  return (
    <section className="bg-luxury-cream border-b border-luxury-sand py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Philosophy Header (Editorial style) */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pb-16 sm:pb-20">
          <span className="text-[10px] tracking-[0.4em] text-luxury-gold-dark font-medium uppercase block">
            Notre Philosophie de Longévité
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-luxury-charcoal tracking-tight font-serif leading-tight">
            The Unique Tany Slow-Craft Atelier
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto my-4" />
          <p className="text-lg sm:text-xl text-luxury-tan italic font-light leading-relaxed font-serif max-w-2xl mx-auto">
            "{BRAND_STORY.quote}"
          </p>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            {BRAND_STORY.philosophy}
          </p>
        </div>

        {/* The 4-Step Interactive Atelier Experience */}
        <div className="bg-white border border-luxury-sand shadow-sm grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Step Navigator */}
          <div className="lg:col-span-4 border-r border-luxury-sand p-6 sm:p-8 flex flex-col justify-between bg-luxury-sand/20">
            <div className="space-y-6 text-left">
              <span className="text-[9px] tracking-widest text-luxury-gold-dark font-semibold uppercase block">
                Interactive Journey
              </span>
              
              <ul className="space-y-4">
                {ATELIER_STEPS.map((step, idx) => (
                  <li key={step.id}>
                    <button
                      onClick={() => setActiveStepIndex(idx)}
                      className={`w-full text-left p-4 border transition-all duration-300 flex items-start space-x-4 ${
                        activeStepIndex === idx
                          ? 'border-luxury-charcoal bg-white shadow-sm scale-[1.02]'
                          : 'border-transparent hover:border-luxury-sand bg-transparent'
                      }`}
                    >
                      <span className={`font-mono text-sm font-semibold tracking-wider ${
                        activeStepIndex === idx ? 'text-luxury-orange' : 'text-gray-400'
                      }`}>
                        {step.stepNumber}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-wider">
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-light italic uppercase block">
                          {step.subtitle}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-luxury-sand text-left hidden lg:block">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-light leading-relaxed">
                Unique Tany pieces are crafted on-demand. Click on each stage above to understand the precision we put into every stitch.
              </p>
            </div>
          </div>

          {/* Right Interactive Window */}
          <div className="lg:col-span-8 p-6 sm:p-12 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 text-left h-full flex flex-col justify-between"
              >
                
                {/* Text Description */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-[10px] text-luxury-gold-dark font-medium uppercase tracking-widest">
                    <span>Atelier Method {activeStep.stepNumber}</span>
                    <span>•</span>
                    <span>{activeStep.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-normal text-luxury-charcoal uppercase tracking-wider font-serif">
                    {activeStep.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>

                {/* Step Specific Interactive Workbenches */}
                <div className="my-6 p-6 bg-luxury-sand border border-luxury-sand rounded-sm flex-grow flex flex-col justify-center items-center min-h-[260px]">
                  
                  {/* Step 1: Hide Selection Interactive */}
                  {activeStep.id === 'hide-selection' && (
                    <div className="w-full space-y-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {activeStep.interactives?.map((leather, i) => (
                          <button
                            key={leather.name}
                            onClick={() => setSelectedLeatherFamily(i)}
                            className={`p-3 border text-center transition-all duration-300 ${
                              selectedLeatherFamily === i
                                ? 'border-luxury-charcoal bg-white font-medium shadow-xs scale-102'
                                : 'border-gray-200 hover:border-gray-300 bg-white/40'
                            }`}
                          >
                            <span 
                              className="w-4 h-4 rounded-full border border-gray-300 block mx-auto mb-1.5 shadow-inner"
                              style={{ backgroundColor: leather.color }}
                            />
                            <span className="text-[10px] tracking-wider text-luxury-charcoal font-semibold uppercase">{leather.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Display Selected Leather Details */}
                      <div className="bg-white p-4 border border-white space-y-2">
                        <div className="flex items-center space-x-2 text-luxury-gold-dark font-semibold text-[10px] uppercase tracking-wider">
                          <Sparkles size={14} />
                          <span>Selected Skin: {activeStep.interactives?.[selectedLeatherFamily].name} Leather</span>
                        </div>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">
                          <strong className="text-luxury-charcoal">Character:</strong> {activeStep.interactives?.[selectedLeatherFamily].textureType}
                        </p>
                        <p className="text-[11px] text-gray-400 font-light italic leading-snug">
                          Only selected portions of each skin are utilized. The rest is discarded to avoid loose grain structure.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Cutting Simulator */}
                  {activeStep.id === 'hand-cutting' && (
                    <div className="text-center space-y-4 max-w-sm">
                      <Scissors className="mx-auto text-luxury-gold-dark animate-bounce" size={28} strokeWidth={1.5} />
                      <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-wider">Tailoring Pattern Placement</h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">
                        An artisan inspects the thickness of the calfskin skin-by-skin, and lays heavy polished brass card templates. With an angled half-moon knife, we trace and cut. The tactile resistance ensures unmatched precision.
                      </p>
                      <div className="pt-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 left-0 bottom-0 bg-luxury-tan w-full animate-[shimmer_2s_infinite_linear]" style={{ backgroundImage: 'linear-gradient(90deg, #8a5a36 0%, #be814e 50%, #8a5a36 100%)', backgroundSize: '200% 100%' }} />
                        </div>
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-1.5 block">Blade alignment calibration: 100% manual</span>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Saddle Stitch Simulation */}
                  {activeStep.id === 'saddle-stitching' && (
                    <div className="w-full space-y-5 text-center">
                      <div className="flex justify-between items-center max-w-md mx-auto">
                        <span className="text-[10px] tracking-luxury text-gray-400 uppercase">Saddle Clamp Representation</span>
                        <button 
                          onClick={resetStitching}
                          className="text-[9px] tracking-widest text-luxury-orange hover:underline uppercase flex items-center space-x-1"
                        >
                          <RefreshCw size={10} />
                          <span>Reset Thread</span>
                        </button>
                      </div>

                      {/* Thread representation canvas */}
                      <div className="bg-white border border-gray-150 p-6 max-w-md mx-auto flex items-center justify-center space-x-2 relative min-h-[90px]">
                        
                        {/* Leather seam divider */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-300 transform -translate-y-1/2 border-dashed border-t" />

                        {/* Stitch nodes */}
                        <div className="flex justify-around items-center w-full z-10">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-6 h-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                                i < stitchCount 
                                  ? 'bg-amber-100 border border-luxury-gold scale-105' 
                                  : 'bg-gray-100 border border-gray-200'
                              }`}
                            >
                              {i < stitchCount && (
                                <span className="text-[8px] font-mono font-bold text-luxury-tan transform rotate-12">
                                  /
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Control Button */}
                      <div className="space-y-2">
                        <button
                          onClick={handleStitchClick}
                          disabled={stitchCount >= 8}
                          className={`px-6 py-2.5 text-xs tracking-luxury font-medium uppercase transition-colors ${
                            stitchCount >= 8
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-luxury-charcoal text-white hover:bg-luxury-orange'
                          }`}
                        >
                          {stitchCount >= 8 ? 'Seam Completed (Locked)' : 'Pass Needle & Cast Stitch'}
                        </button>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest block">
                          Stitch Count: <span className="font-semibold text-luxury-charcoal">{stitchCount} / 8</span> (Notice the slanted linen pattern)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Edge finishing simulation */}
                  {activeStep.id === 'edge-burnishing' && (
                    <div className="w-full space-y-6 max-w-md">
                      <div className="space-y-2 text-center">
                        <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-wider">The Edge-Glazing Process</h4>
                        <p className="text-[11px] text-gray-500 font-light leading-normal">
                          We apply multiple thin layers of matte dye, fusing it into the leather using a heated iron, then seal with warm beeswax.
                        </p>
                      </div>

                      <div className="bg-white border p-6 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] tracking-luxury text-gray-500 uppercase">Paint Coats: {edgeLayerCount} / 4</label>
                          <input
                            type="range"
                            min="1"
                            max="4"
                            value={edgeLayerCount}
                            onChange={(e) => setEdgeLayerCount(Number(e.target.value))}
                            className="w-1/2 accent-luxury-gold cursor-pointer"
                          />
                        </div>

                        {/* Edge Visual preview */}
                        <div className="h-16 border rounded-sm flex items-center justify-between overflow-hidden p-2 bg-luxury-sand">
                          <div className="flex flex-col text-left space-y-0.5">
                            <span className="text-[9px] text-gray-400 uppercase font-semibold">Raw Fiber edge</span>
                            <div className="h-3 w-32 bg-[#cb9c7a] rounded-sm relative overflow-hidden shadow-inner">
                              {/* Overlay color representing layers */}
                              <div 
                                className="absolute inset-0 bg-[#2b1f1d] transition-all duration-500"
                                style={{ width: `${(edgeLayerCount / 4) * 100}%` }}
                              />
                            </div>
                          </div>

                          <button 
                            onClick={handlePolishToggle}
                            className={`px-3 py-1.5 border text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${
                              edgeIsPolished 
                                ? 'bg-luxury-gold text-white border-luxury-gold' 
                                : 'bg-transparent text-gray-500 border-gray-300 hover:border-luxury-charcoal'
                            }`}
                          >
                            {edgeIsPolished ? '✨ Edge Wax-Glazed' : 'Polish with Wax'}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-around items-center text-[10px] text-gray-400 tracking-widest uppercase">
                        <span>LAYERS: {edgeLayerCount >= 4 ? '🔒 MAX' : '⏳ PENDING'}</span>
                        <span>•</span>
                        <span>FINISH: {edgeIsPolished ? '👑 GLASSY GLOW' : '⚠️ RAW TEXTURE'}</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Craft details signature footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-luxury-sand text-[11px] text-gray-500">
                  <div className="flex items-center space-x-1.5 mb-2 sm:mb-0">
                    <span className="w-1.5 h-1.5 bg-luxury-orange rounded-full" />
                    <span className="font-medium text-luxury-charcoal uppercase tracking-wider">{activeStep.subtitle}</span>
                  </div>
                  <span className="font-light italic">
                    Unique Tany • Handcrafted with absolute devotion.
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
