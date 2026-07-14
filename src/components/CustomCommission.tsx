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
} from 'lucide-react';

const INPUT_BASE =
  'w-full bg-white border text-xs px-3 py-2.5 text-neutral-800 focus:outline-none transition-all duration-300 placeholder:text-neutral-300 rounded-none appearance-none';
const INPUT_NORMAL =
  'border-neutral-200 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800/10 bg-stone-50';
const LABEL_BASE =
  'text-[8px] sm:text-[9px] tracking-[0.25em] text-neutral-400 uppercase block mb-1.5 font-semibold';

const SELECT_BASE = `${INPUT_BASE} cursor-pointer pr-8`;

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
  {
    value: 'watch-strap',
    label: 'Bespoke Watch Strap',
    sub: 'Custom size & lug width',
    icon: Watch,
  },
  {
    value: 'wallet',
    label: 'Bespoke Wallet / Card Case',
    sub: 'Folded or flat format',
    icon: Palette,
  },
  {
    value: 'handbag',
    label: 'Bespoke Handbag',
    sub: 'Dimension amendments',
    icon: Sparkles,
  },
  {
    value: 'gift-accessories',
    label: 'Other Leather Accessories',
    sub: 'Desk & lifestyle pieces',
    icon: Ruler,
  },
];

const LEATHER_OPTIONS = [
  {
    value: 'Barenia Calfskin (Smooth Tan)',
    label: 'Barenia Calfskin',
    sub: 'Smooth, rich tan — most popular',
    color: '#be814e',
  },
  {
    value: 'Epsom Leather (Embossed Grain)',
    label: 'Epsom Cross-Grain',
    sub: 'Rigid & scratch-proof',
    color: '#3d2516',
  },
  {
    value: 'Togo Leather (Natural Pebbles)',
    label: 'Togo Drummed Calfskin',
    sub: 'Pebbled, soft & slouchy',
    color: '#8b6914',
  },
  {
    value: 'Chevre Goatskin (Finely Textured)',
    label: 'Mountain Chevre Goatskin',
    sub: 'Lightweight & durable',
    color: '#4d5c41',
  },
  {
    value: 'Matte Alligator (Symmetrical scale)',
    label: 'Matte Glazed Alligator',
    sub: 'Ultra-luxury selection',
    color: '#233827',
  },
];

export default function CustomCommission() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const selectedLeather = LEATHER_OPTIONS.find(
    (l) => l.value === formData.leather
  );
  const selectedCategory = CATEGORY_OPTIONS.find(
    (c) => c.value === formData.category
  );

  const validate = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!formData.name.trim()) errors.name = 'Name required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = 'Valid email required';
    if (!formData.specifications.trim())
      errors.specifications = 'Please describe your requirements';
    if (formData.category === 'watch-strap' && !formData.wristSize.trim())
      errors.wristSize = 'Wrist size required for strap orders';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <section className="bg-stone-50 border-b border-stone-200 py-12 sm:py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-amber-700" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-amber-800 font-semibold uppercase">
              Bespoke Tailoring on Measure
            </span>
            <span className="block w-8 h-px bg-amber-700" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight font-serif uppercase leading-tight">
            Custom Commissions{' '}
            <em className="italic font-light text-amber-800 not-italic">Atelier</em>
          </h2>

          <div className="w-10 h-px bg-amber-700/40 mx-auto" />

          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto px-2 sm:px-0">
            Our watch straps are bespoke-tailored to your exact watch model, lug
            width, and wrist circumference. Use this portal to coordinate
            directly with our master leathercraft artisan.
          </p>

          {/* Process badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-2">
            {[
              { icon: Mail, text: 'Direct artisan contact' },
              { icon: Clock, text: '24hr response' },
              { icon: Sparkles, text: '2–3 weeks crafting' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider"
              >
                <Icon size={11} className="text-amber-700" strokeWidth={1.5} />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Main Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white border border-stone-200 shadow-sm overflow-hidden"
        >
          <AnimatePresence mode="wait">

            {/* ── FORM ── */}
            {!commissionId ? (
              <motion.div
                key="commission-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {/* Form Header Bar */}
                <div className="px-5 sm:px-8 lg:px-10 py-4 sm:py-5 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                      Commission Request Form
                    </h3>
                    <p className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 tracking-wider">
                      All fields marked are required
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="uppercase tracking-wider font-medium">Accepting Requests</span>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 text-left"
                  id="bespoke-commission-form"
                  noValidate
                >
                  {/* ── Step 1: Contact Info ── */}
                  <fieldset className="space-y-3 sm:space-y-4">
                    <legend className="flex items-center gap-2 pb-3 border-b border-stone-100 w-full">
                      <div className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                        1
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                        Your Contact Details
                      </span>
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={LABEL_BASE}>Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => update('name', e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Jean-Paul Dupont"
                          className={`${INPUT_BASE} ${
                            formErrors.name ? 'border-red-400 bg-red-50/30' : INPUT_NORMAL
                          } ${focusedField === 'name' ? 'ring-1 ring-neutral-800/10' : ''}`}
                        />
                        {formErrors.name && (
                          <p className="flex items-center gap-1 text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                            <AlertCircle size={9} />
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={LABEL_BASE}>Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => update('email', e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="jp@dupont.com"
                          className={`${INPUT_BASE} ${
                            formErrors.email ? 'border-red-400 bg-red-50/30' : INPUT_NORMAL
                          }`}
                        />
                        {formErrors.email && (
                          <p className="flex items-center gap-1 text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                            <AlertCircle size={9} />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Step 2: Product Category ── */}
                  <fieldset className="space-y-3">
                    <legend className="flex items-center gap-2 pb-3 border-b border-stone-100 w-full">
                      <div className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                        2
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                        Product Category
                      </span>
                    </legend>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = formData.category === cat.value;
                        return (
                          <motion.button
                            key={cat.value}
                            type="button"
                            onClick={() => update('category', cat.value)}
                            className={`p-3 sm:p-4 border text-left transition-all duration-300 flex flex-col gap-2 ${
                              isSelected
                                ? 'border-neutral-800 bg-white shadow-sm'
                                : 'border-stone-100 bg-stone-50 hover:border-stone-300 hover:bg-white'
                            }`}
                            whileTap={{ scale: 0.97 }}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div
                                className={`w-6 h-6 flex items-center justify-center rounded-sm transition-colors ${
                                  isSelected ? 'bg-amber-50' : 'bg-stone-100'
                                }`}
                              >
                                <Icon
                                  size={13}
                                  className={isSelected ? 'text-amber-800' : 'text-neutral-400'}
                                  strokeWidth={1.5}
                                />
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-4 h-4 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0"
                                >
                                  <Check size={9} className="text-white" strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                            <div>
                              <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-800 uppercase tracking-wider leading-tight">
                                {cat.label}
                              </p>
                              <p className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 leading-snug">
                                {cat.sub}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* ── Step 3: Leather Selection ── */}
                  <fieldset className="space-y-3">
                    <legend className="flex items-center gap-2 pb-3 border-b border-stone-100 w-full">
                      <div className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                        3
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                        Select Hide & Grain
                      </span>
                    </legend>

                    {/* Leather cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                      {LEATHER_OPTIONS.map((leather) => {
                        const isSelected = formData.leather === leather.value;
                        return (
                          <motion.button
                            key={leather.value}
                            type="button"
                            onClick={() => update('leather', leather.value)}
                            className={`p-3 sm:p-3.5 border text-left transition-all duration-300 flex items-center gap-2.5 sm:gap-3 ${
                              isSelected
                                ? 'border-neutral-800 bg-white shadow-sm'
                                : 'border-stone-100 bg-stone-50 hover:border-stone-300 hover:bg-white'
                            }`}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0 border shadow-sm transition-transform duration-300 ${
                                isSelected ? 'scale-110 border-neutral-400' : 'border-neutral-200'
                              }`}
                              style={{ backgroundColor: leather.color }}
                            />
                            <div className="min-w-0">
                              <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-800 uppercase tracking-wider truncate">
                                {leather.label}
                              </p>
                              <p className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 truncate">
                                {leather.sub}
                              </p>
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto w-4 h-4 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0"
                              >
                                <Check size={9} className="text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Selected leather preview strip */}
                    {selectedLeather && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 border border-stone-100 overflow-hidden"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex-shrink-0 border border-neutral-200 shadow-sm"
                          style={{ backgroundColor: selectedLeather.color }}
                        />
                        <div>
                          <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-800 uppercase tracking-wider">
                            Selected: {selectedLeather.label}
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-neutral-400">
                            {selectedLeather.sub}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </fieldset>

                  {/* ── Step 4: Watch Strap Measurements (conditional) ── */}
                  <AnimatePresence>
                    {formData.category === 'watch-strap' && (
                      <motion.fieldset
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="space-y-3 overflow-hidden"
                      >
                        <legend className="flex items-center gap-2 pb-3 border-b border-amber-100 w-full">
                          <div className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                            4
                          </div>
                          <span className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                            Watch Strap Measurements
                          </span>
                          <span className="text-[8px] text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 uppercase tracking-wider font-medium">
                            Required for strap orders
                          </span>
                        </legend>

                        <div className="bg-amber-50/40 border border-amber-100 p-3 sm:p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            {/* Lug Width */}
                            <div>
                              <label className={LABEL_BASE}>Watch Lug Width</label>
                              <div className="relative">
                                <select
                                  value={formData.lugWidth}
                                  onChange={(e) => update('lugWidth', e.target.value)}
                                  className={`${SELECT_BASE} ${INPUT_NORMAL}`}
                                >
                                  {['18mm', '19mm', '20mm', '21mm', '22mm'].map(
                                    (w) => (
                                      <option key={w} value={w}>
                                        {w}{w === '20mm' ? ' (Standard)' : ''}
                                      </option>
                                    )
                                  )}
                                  <option value="custom">Custom (describe below)</option>
                                </select>
                                <ChevronDown
                                  size={13}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                                />
                              </div>
                            </div>

                            {/* Wrist Size */}
                            <div>
                              <label className={LABEL_BASE}>
                                Wrist Circumference
                              </label>
                              <input
                                type="text"
                                value={formData.wristSize}
                                onChange={(e) => update('wristSize', e.target.value)}
                                placeholder="e.g. 175mm or 7 inches"
                                className={`${INPUT_BASE} ${
                                  formErrors.wristSize
                                    ? 'border-red-400 bg-red-50/30'
                                    : INPUT_NORMAL
                                }`}
                              />
                              {formErrors.wristSize && (
                                <p className="flex items-center gap-1 text-[8px] text-red-500 mt-1">
                                  <AlertCircle size={9} />
                                  {formErrors.wristSize}
                                </p>
                              )}
                            </div>

                            {/* Stitching */}
                            <div>
                              <label className={LABEL_BASE}>Thread Styling</label>
                              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                {[
                                  { value: 'contrasting', label: 'Ecru Linen' },
                                  { value: 'tonal', label: 'Tonal Match' },
                                ].map((opt) => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => update('stitching', opt.value)}
                                    className={`py-2 border text-[8px] sm:text-[9px] uppercase tracking-wider font-medium transition-all duration-300 ${
                                      formData.stitching === opt.value
                                        ? 'border-neutral-800 bg-white text-neutral-800'
                                        : 'border-stone-200 bg-white/60 text-neutral-400 hover:border-stone-300'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.fieldset>
                    )}
                  </AnimatePresence>

                  {/* ── Step 5: Specifications Textarea ── */}
                  <fieldset className="space-y-3">
                    <legend className="flex items-center gap-2 pb-3 border-b border-stone-100 w-full">
                      <div className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                        {formData.category === 'watch-strap' ? '5' : '4'}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                        Custom Requirements
                      </span>
                    </legend>

                    <div>
                      <label className={LABEL_BASE}>
                        Describe your specifications in detail
                      </label>
                      <textarea
                        rows={4}
                        value={formData.specifications}
                        onChange={(e) => update('specifications', e.target.value)}
                        onFocus={() => setFocusedField('specifications')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={
                          formData.category === 'watch-strap'
                            ? 'Please specify your watch brand (e.g. Omega Speedmaster, Rolex Submariner, Patek Philippe) and your preferred buckle finish (Gold, Steel, or no buckle)...'
                            : 'E.g., I would like a custom interior lining in soft lambskin with an extra card pocket on the interior panel...'
                        }
                        className={`${INPUT_BASE} leading-relaxed font-light resize-none ${
                          formErrors.specifications
                            ? 'border-red-400 bg-red-50/30'
                            : INPUT_NORMAL
                        } ${
                          focusedField === 'specifications'
                            ? 'ring-1 ring-neutral-800/10'
                            : ''
                        }`}
                      />
                      {formErrors.specifications && (
                        <p className="flex items-center gap-1 text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                          <AlertCircle size={9} />
                          {formErrors.specifications}
                        </p>
                      )}
                      <p className="text-[8px] text-neutral-400 mt-1.5 font-light">
                        The more detail you provide, the faster our artisan can
                        respond with precise quotes.
                      </p>
                    </div>
                  </fieldset>

                  {/* ── Notice Box ── */}
                  <div className="flex items-start gap-3 p-3.5 sm:p-4 bg-amber-50 border border-amber-100">
                    <Watch
                      size={15}
                      className="text-amber-700 flex-shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div className="space-y-1">
                      <p className="text-[9px] sm:text-[10px] text-amber-800 font-semibold uppercase tracking-wider">
                        Important Notice
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-amber-700/80 font-light leading-relaxed">
                        Bespoke commissions are non-refundable once hide selection
                        and design schematics are confirmed. Each piece requires
                        2–3 weeks of sewing, burnishing, and drying time before
                        dispatch.
                      </p>
                    </div>
                  </div>

                  {/* ── Submit ── */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center justify-center gap-2.5 ${
                        isSubmitting
                          ? 'bg-amber-700 text-white cursor-wait'
                          : 'bg-neutral-900 hover:bg-amber-800 text-white active:scale-[0.98]'
                      }`}
                      id="submit-bespoke-btn"
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Registering Commission...</span>
                        </>
                      ) : (
                        <>
                          <span>Register Commission Inquiry</span>
                          <ArrowRight size={13} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-[8px] sm:text-[9px] text-neutral-400 text-center sm:text-left leading-relaxed">
                      By submitting you agree to our{' '}
                      <button
                        type="button"
                        className="underline hover:text-neutral-600 transition-colors"
                      >
                        bespoke commission terms
                      </button>
                      .
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (

              /* ── SUCCESS SCREEN ── */
              <motion.div
                key="commission-success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="p-6 sm:p-10 lg:p-14 flex flex-col items-center text-center space-y-5 sm:space-y-6"
              >
                {/* Animated check circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center"
                >
                  <Check
                    size={28}
                    className="text-emerald-600"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="space-y-2 max-w-sm"
                >
                  <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-amber-800 font-semibold uppercase block">
                    Commission Registered
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 uppercase tracking-wider font-serif">
                    Awaiting Artisan Review
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                    Hello{' '}
                    <strong className="text-neutral-800">{formData.name}</strong>,
                    your commission has been securely submitted to the Unique Tany
                    leather-crafting registry.
                  </p>
                </motion.div>

                {/* Commission detail card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-full max-w-sm bg-stone-50 border border-stone-200 text-left divide-y divide-stone-100"
                >
                  {[
                    { label: 'Registry ID', value: commissionId, bold: true },
                    {
                      label: 'Category',
                      value:
                        selectedCategory?.label ?? formData.category,
                      bold: false,
                    },
                    {
                      label: 'Leather',
                      value: selectedLeather?.label ?? formData.leather,
                      bold: false,
                    },
                    {
                      label: 'Status',
                      value: 'Queued for Direct Email',
                      accent: true,
                    },
                  ].map(({ label, value, bold, accent }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-4 py-2.5 sm:py-3"
                    >
                      <span className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider font-mono">
                        {label}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-mono text-right max-w-[55%] truncate ${
                          accent
                            ? 'text-amber-800 font-bold uppercase'
                            : bold
                            ? 'font-bold text-neutral-900'
                            : 'text-neutral-600 font-medium'
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* What happens next */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="w-full max-w-sm text-left space-y-2 bg-amber-50 border border-amber-100 p-4"
                >
                  <p className="text-[9px] sm:text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
                    What happens next
                  </p>
                 {[
  'Our lead artisan reviews bespoke requests every afternoon.',
  "Within 24hrs you'll receive digital leather samples & sizing sketches.",
  'Upon approval, crafting begins — 2 to 3 weeks of hand-making.',
].map((step, i) => (
  <div key={i} className="flex items-start gap-2">
    <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center text-[7px] font-bold flex-shrink-0 mt-0.5">
      {i + 1}
    </span>
    <p className="text-[8px] sm:text-[9px] text-amber-700/80 font-light leading-relaxed">
      {step}
    </p>
  </div>
))}
                </motion.div>

                <motion.button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-neutral-300 text-neutral-600 hover:border-neutral-800 hover:text-neutral-900 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 active:scale-[0.97]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <RotateCcw size={12} />
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