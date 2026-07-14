import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Check,
  Watch,
  Ruler,
  Palette,
  ChevronDown,
  AlertCircle,
  Sparkles,
  Clock,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Star,
} from 'lucide-react';

// ── Shared style tokens ──
const INPUT_BASE =
  'w-full bg-white border text-xs px-3 py-2.5 sm:py-3 text-neutral-800 focus:outline-none transition-all duration-200 placeholder:text-neutral-300 rounded-none appearance-none leading-relaxed';
const INPUT_OK =
  'border-neutral-200 bg-stone-50 focus:bg-white focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700/10';
const INPUT_ERR =
  'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-1 focus:ring-red-400/20';
const LABEL =
  'block text-[8px] sm:text-[9px] tracking-[0.25em] text-neutral-400 uppercase mb-1.5 font-semibold';
const SELECT_BASE = `${INPUT_BASE} cursor-pointer pr-8`;

// ── Tiny reusable error row ──
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="flex items-center gap-1 mt-1 text-[8px] sm:text-[9px] text-red-500 font-medium">
      <AlertCircle size={9} strokeWidth={2.5} />
      {msg}
    </p>
  ) : null;

interface FormData {
  name: string;
  email: string;
  category: string;
  leather: string;
  specifications: string;
  wristSize: string;
  lugWidth: string;
  stitching: string;
}

const DEFAULT_FORM: FormData = {
  name: '',
  email: '',
  category: 'watch-strap',
  leather: 'Barenia Calfskin (Smooth Tan)',
  specifications: '',
  wristSize: '',
  lugWidth: '20mm',
  stitching: 'contrasting',
};

const CATEGORY_OPTIONS = [
  { value: 'watch-strap', label: 'Bespoke Watch Strap', sub: 'Custom size & lug width', icon: Watch },
  { value: 'wallet', label: 'Wallet / Card Case', sub: 'Folded or flat format', icon: Palette },
  { value: 'handbag', label: 'Bespoke Handbag', sub: 'Dimension amendments', icon: Sparkles },
  { value: 'gift-accessories', label: 'Other Accessories', sub: 'Desk & lifestyle pieces', icon: Ruler },
];

const LEATHER_OPTIONS = [
  { value: 'Barenia Calfskin (Smooth Tan)', label: 'Barenia Calfskin', sub: 'Smooth, rich tan', color: '#be814e' },
  { value: 'Epsom Leather (Embossed Grain)', label: 'Epsom Cross-Grain', sub: 'Rigid & scratch-proof', color: '#3d2516' },
  { value: 'Togo Leather (Natural Pebbles)', label: 'Togo Drummed', sub: 'Pebbled & slouchy', color: '#8b6914' },
  { value: 'Chevre Goatskin (Finely Textured)', label: 'Chevre Goatskin', sub: 'Lightweight & durable', color: '#4d5c41' },
  { value: 'Matte Alligator (Symmetrical scale)', label: 'Matte Alligator', sub: 'Ultra-luxury', color: '#233827' },
];

const PROCESS_BADGES = [
  { icon: Mail, text: 'Direct artisan contact' },
  { icon: Clock, text: '24hr response' },
  { icon: Sparkles, text: '2–3 weeks crafting' },
  { icon: ShieldCheck, text: 'Secure portal' },
];

const NEXT_STEPS = [
  'Our lead artisan reviews bespoke requests every afternoon.',
  "Within 24 hrs you will receive digital leather samples & sizing sketches.",
  'Upon approval, crafting begins — 2 to 3 weeks of hand-making.',
];

export default function CustomCommission() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const selectedLeather = LEATHER_OPTIONS.find((l) => l.value === formData.leather);
  const selectedCategory = CATEGORY_OPTIONS.find((c) => c.value === formData.category);
  const isWatchStrap = formData.category === 'watch-strap';

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!formData.name.trim()) e.name = 'Name required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email required';
    if (!formData.specifications.trim()) e.specifications = 'Please describe your requirements';
    if (isWatchStrap && !formData.wristSize.trim()) e.wristSize = 'Wrist size required for strap orders';
    setFormErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCommissionId('BESPOKE-' + Math.floor(Math.random() * 9000 + 1000));
    }, 1600);
  };

  const handleReset = () => {
    setCommissionId('');
    setFormData(DEFAULT_FORM);
    setFormErrors({});
  };

  const update = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // ── Numbered step legend ──
  const StepLegend = ({ num, title, badge }: { num: string; title: string; badge?: string }) => (
    <legend className="flex flex-wrap items-center gap-2 pb-3 sm:pb-4 border-b border-stone-100 w-full">
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-[8px] sm:text-[9px] font-bold flex-shrink-0">
        {num}
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-neutral-800 uppercase tracking-wider">
        {title}
      </span>
      {badge && (
        <span className="text-[7px] sm:text-[8px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 uppercase tracking-wider font-semibold rounded-sm">
          {badge}
        </span>
      )}
    </legend>
  );

  return (
    <section className="bg-stone-50 border-b border-stone-200 py-12 sm:py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">

        {/* ══ HEADER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 sm:w-8 h-px bg-amber-700" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] text-amber-800 font-bold uppercase">
              Bespoke Tailoring on Measure
            </span>
            <span className="w-6 sm:w-8 h-px bg-amber-700" />
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight font-serif uppercase leading-snug">
            Custom Commissions{' '}
            <span className="italic font-light text-amber-800">Atelier</span>
          </h2>

          <div className="w-10 h-px bg-amber-700/30 mx-auto" />

          {/* Subtitle */}
          <p className="text-[11px] sm:text-sm text-neutral-500 font-light leading-relaxed max-w-lg mx-auto">
            Our pieces are bespoke-tailored to your exact specifications. Use
            this portal to coordinate directly with our master leathercraft
            artisan.
          </p>

          {/* Process badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 pt-1">
            {PROCESS_BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider"
              >
                <Icon size={10} className="text-amber-700" strokeWidth={1.5} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ══ MAIN CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="bg-white border border-stone-200 shadow-sm overflow-hidden"
        >
          <AnimatePresence mode="wait">

            {/* ══════════════ FORM ══════════════ */}
            {!commissionId ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Form bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-7 lg:px-10 py-3.5 sm:py-4 border-b border-stone-100 bg-stone-50/70">
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-neutral-800 uppercase tracking-[0.15em]">
                      Commission Request Form
                    </h3>
                    <p className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 tracking-wider">
                      Fill each step to receive a precise artisan quote
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[7px] sm:text-[8px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 self-start sm:self-auto flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                    <span className="uppercase tracking-wider font-semibold">Accepting Requests</span>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="p-4 sm:p-7 lg:p-10 space-y-7 sm:space-y-8 text-left"
                  noValidate
                >

                  {/* ── 1. Contact Info ── */}
                  <fieldset className="space-y-3 sm:space-y-4">
                    <StepLegend num="1" title="Your Contact Details" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={LABEL}>Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => update('name', e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Jean-Paul Dupont"
                          className={`${INPUT_BASE} ${formErrors.name ? INPUT_ERR : INPUT_OK} ${focusedField === 'name' ? 'ring-1 ring-neutral-700/10' : ''}`}
                        />
                        <FieldError msg={formErrors.name} />
                      </div>
                      <div>
                        <label className={LABEL}>Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => update('email', e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="jp@dupont.com"
                          className={`${INPUT_BASE} ${formErrors.email ? INPUT_ERR : INPUT_OK}`}
                        />
                        <FieldError msg={formErrors.email} />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── 2. Product Category ── */}
                  <fieldset className="space-y-3">
                    <StepLegend num="2" title="Product Category" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const Icon = cat.icon;
                        const sel = formData.category === cat.value;
                        return (
                          <motion.button
                            key={cat.value}
                            type="button"
                            onClick={() => update('category', cat.value)}
                            className={`p-2.5 sm:p-3.5 border text-left flex flex-col gap-2 transition-all duration-250 ${
                              sel
                                ? 'border-neutral-800 bg-white shadow-sm'
                                : 'border-stone-100 bg-stone-50 hover:border-stone-300 hover:bg-white'
                            }`}
                            whileTap={{ scale: 0.96 }}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-sm flex-shrink-0 transition-colors ${sel ? 'bg-amber-50' : 'bg-stone-100'}`}>
                                <Icon size={11} className={sel ? 'text-amber-800' : 'text-neutral-400'} strokeWidth={1.5} />
                              </div>
                              <AnimatePresence>
                                {sel && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0"
                                  >
                                    <Check size={8} className="text-white" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <div>
                              <p className="text-[8px] sm:text-[9px] font-bold text-neutral-800 uppercase tracking-wider leading-snug">
                                {cat.label}
                              </p>
                              <p className="text-[7px] sm:text-[8px] text-neutral-400 mt-0.5 leading-snug hidden sm:block">
                                {cat.sub}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* ── 3. Leather Selection ── */}
                  <fieldset className="space-y-3">
                    <StepLegend num="3" title="Select Hide & Grain" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                      {LEATHER_OPTIONS.map((leather) => {
                        const sel = formData.leather === leather.value;
                        return (
                          <motion.button
                            key={leather.value}
                            type="button"
                            onClick={() => update('leather', leather.value)}
                            className={`p-2.5 sm:p-3 border text-left flex items-center gap-2.5 transition-all duration-250 ${
                              sel
                                ? 'border-neutral-800 bg-white shadow-sm'
                                : 'border-stone-100 bg-stone-50 hover:border-stone-300 hover:bg-white'
                            }`}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0 border shadow-sm transition-transform duration-250 ${sel ? 'scale-110 border-neutral-400' : 'border-neutral-200'}`}
                              style={{ backgroundColor: leather.color }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[8px] sm:text-[9px] font-bold text-neutral-800 uppercase tracking-wider truncate">
                                {leather.label}
                              </p>
                              <p className="text-[7px] sm:text-[8px] text-neutral-400 mt-0.5 truncate">
                                {leather.sub}
                              </p>
                            </div>
                            <AnimatePresence>
                              {sel && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0 ml-auto"
                                >
                                  <Check size={8} className="text-white" strokeWidth={3} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Selected leather preview */}
                    <AnimatePresence>
                      {selectedLeather && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 border border-stone-100">
                            <div
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 border border-neutral-200 shadow-sm"
                              style={{ backgroundColor: selectedLeather.color }}
                            />
                            <div>
                              <p className="text-[8px] sm:text-[9px] font-bold text-neutral-800 uppercase tracking-wider">
                                Selected: {selectedLeather.label}
                              </p>
                              <p className="text-[7px] sm:text-[8px] text-neutral-400 mt-0.5">
                                {selectedLeather.sub}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </fieldset>

                  {/* ── 4. Watch Strap Measurements (conditional) ── */}
                  <AnimatePresence>
                    {isWatchStrap && (
                      <motion.fieldset
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3">
                          <StepLegend num="4" title="Watch Strap Measurements" badge="Required for strap" />
                          <div className="bg-amber-50/50 border border-amber-100 p-3 sm:p-4 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                              {/* Lug Width */}
                              <div>
                                <label className={LABEL}>Lug Width</label>
                                <div className="relative">
                                  <select
                                    value={formData.lugWidth}
                                    onChange={(e) => update('lugWidth', e.target.value)}
                                    className={`${SELECT_BASE} ${INPUT_OK}`}
                                  >
                                    {['18mm', '19mm', '20mm', '21mm', '22mm'].map((w) => (
                                      <option key={w} value={w}>
                                        {w}{w === '20mm' ? ' (Standard)' : ''}
                                      </option>
                                    ))}
                                    <option value="custom">Custom (see below)</option>
                                  </select>
                                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                                </div>
                              </div>

                              {/* Wrist Size */}
                              <div>
                                <label className={LABEL}>Wrist Circumference</label>
                                <input
                                  type="text"
                                  value={formData.wristSize}
                                  onChange={(e) => update('wristSize', e.target.value)}
                                  placeholder="e.g. 175mm or 7 inches"
                                  className={`${INPUT_BASE} ${formErrors.wristSize ? INPUT_ERR : INPUT_OK}`}
                                />
                                <FieldError msg={formErrors.wristSize} />
                              </div>

                              {/* Thread Styling */}
                              <div>
                                <label className={LABEL}>Thread Styling</label>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {[
                                    { value: 'contrasting', label: 'Ecru Linen' },
                                    { value: 'tonal', label: 'Tonal Match' },
                                  ].map((opt) => (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => update('stitching', opt.value)}
                                      className={`py-2 sm:py-2.5 border text-[7px] sm:text-[8px] uppercase tracking-wider font-semibold transition-all duration-200 ${
                                        formData.stitching === opt.value
                                          ? 'border-neutral-800 bg-white text-neutral-800'
                                          : 'border-stone-200 bg-white/60 text-neutral-400 hover:border-stone-400'
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.fieldset>
                    )}
                  </AnimatePresence>

                  {/* ── 5 / 4: Specifications ── */}
                  <fieldset className="space-y-3">
                    <StepLegend num={isWatchStrap ? '5' : '4'} title="Custom Requirements" />
                    <div>
                      <label className={LABEL}>Describe your specifications in detail</label>
                      <textarea
                        rows={4}
                        value={formData.specifications}
                        onChange={(e) => update('specifications', e.target.value)}
                        onFocus={() => setFocusedField('specs')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={
                          isWatchStrap
                            ? 'Specify your watch brand (e.g. Omega Speedmaster, Rolex Submariner) and preferred buckle finish (Gold, Steel, or no buckle)...'
                            : 'E.g., I would like a custom interior lining in soft lambskin with an extra card pocket on the interior panel...'
                        }
                        className={`${INPUT_BASE} resize-none font-light ${formErrors.specifications ? INPUT_ERR : INPUT_OK} ${focusedField === 'specs' ? 'ring-1 ring-neutral-700/10' : ''}`}
                      />
                      <FieldError msg={formErrors.specifications} />
                      <p className="text-[7px] sm:text-[8px] text-neutral-400 mt-1.5 font-light">
                        More detail = faster artisan response with precise quotes.
                      </p>
                    </div>
                  </fieldset>

                  {/* ── Notice ── */}
                  <div className="flex items-start gap-3 p-3.5 sm:p-4 bg-amber-50 border border-amber-100">
                    <Watch size={14} className="text-amber-700 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="space-y-1 min-w-0">
                      <p className="text-[8px] sm:text-[9px] text-amber-800 font-bold uppercase tracking-wider">
                        Important Notice
                      </p>
                      <p className="text-[8px] sm:text-[9px] text-amber-700/80 font-light leading-relaxed">
                        Bespoke commissions are non-refundable once design schematics are confirmed.
                        Each piece requires 2–3 weeks of sewing, burnishing, and drying before dispatch.
                      </p>
                    </div>
                  </div>

                  {/* ── Submit row ── */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 sm:flex-none sm:px-8 py-3.5 sm:py-4 text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-amber-700 text-white cursor-wait'
                          : 'bg-neutral-900 hover:bg-amber-800 text-white'
                      }`}
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Registering Commission...</span>
                        </>
                      ) : (
                        <>
                          <span>Register Commission Inquiry</span>
                          <ArrowRight size={12} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-[7px] sm:text-[8px] text-neutral-400 text-center sm:text-left leading-relaxed">
                      By submitting you agree to our{' '}
                      <button type="button" className="underline hover:text-neutral-600 transition-colors">
                        bespoke commission terms
                      </button>
                      .
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (

              /* ══════════════ SUCCESS ══════════════ */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-5 sm:p-10 lg:p-14 flex flex-col items-center text-center space-y-5 sm:space-y-6"
              >
                {/* Check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.08 }}
                  className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center"
                >
                  <Check size={26} className="text-emerald-600" strokeWidth={1.5} />
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.45 }}
                  className="space-y-2 max-w-sm"
                >
                  <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-amber-800 font-bold uppercase block">
                    Commission Registered
                  </span>
                  <h3 className="text-lg sm:text-2xl font-light text-neutral-900 uppercase tracking-wider font-serif">
                    Awaiting Artisan Review
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                    Hello <strong className="text-neutral-800 font-semibold">{formData.name}</strong>,
                    your commission has been securely submitted to the Unique Tany leather-crafting registry.
                  </p>
                </motion.div>

                {/* Commission detail table */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.45 }}
                  className="w-full max-w-xs sm:max-w-sm bg-stone-50 border border-stone-200 text-left divide-y divide-stone-100"
                >
                  {[
                    { label: 'Registry ID', value: commissionId, bold: true },
                    { label: 'Category', value: selectedCategory?.label ?? formData.category, bold: false },
                    { label: 'Leather', value: selectedLeather?.label ?? formData.leather, bold: false },
                    { label: 'Status', value: 'Queued for Direct Email', accent: true },
                  ].map(({ label, value, bold, accent }) => (
                    <div key={label} className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3">
                      <span className="text-[7px] sm:text-[8px] text-neutral-400 uppercase tracking-wider font-mono flex-shrink-0">
                        {label}
                      </span>
                      <span className={`text-[8px] sm:text-[9px] font-mono text-right max-w-[55%] truncate ${
                        accent ? 'text-amber-800 font-bold uppercase'
                        : bold ? 'font-bold text-neutral-900'
                        : 'text-neutral-600 font-medium'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* What happens next */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52 }}
                  className="w-full max-w-xs sm:max-w-sm text-left bg-amber-50 border border-amber-100 p-3.5 sm:p-4 space-y-2.5"
                >
                  <p className="text-[8px] sm:text-[9px] font-bold text-amber-800 uppercase tracking-wider">
                    What happens next
                  </p>
                  {NEXT_STEPS.map((stepText, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center text-[7px] font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-[8px] sm:text-[9px] text-amber-700/80 font-light leading-relaxed">
                        {stepText}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Star rating */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <p className="text-[7px] sm:text-[8px] text-neutral-400 uppercase tracking-widest">
                    Rate your experience
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="text-amber-400" fill="currentColor" />
                    ))}
                  </div>
                </motion.div>

                {/* Reset button */}
                <motion.button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-neutral-200 text-neutral-600 hover:border-neutral-800 hover:text-neutral-900 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <RotateCcw size={11} />
                  Submit Another Request
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}