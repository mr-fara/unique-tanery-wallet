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
  Phone,
  MapPin,
  Award,
  Scissors,
  Layers,
  Package,
  ChevronRight,
  Info,
  User,
  FileText,
} from 'lucide-react';

// ── Style tokens ──────────────────────────────────────────────────────────────
const INPUT_BASE =
  'w-full bg-white border text-[11px] sm:text-xs px-3.5 py-3 text-neutral-800 focus:outline-none transition-all duration-200 placeholder:text-neutral-300 rounded-none appearance-none leading-relaxed tracking-wide';
const INPUT_OK =
  'border-[#E8E0D4] bg-[#FAF7F2] focus:bg-white focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/15';
const INPUT_ERR =
  'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-1 focus:ring-red-400/20';
const LABEL =
  'block text-[8px] sm:text-[9px] tracking-[0.28em] text-[#9E9E9E] uppercase mb-1.5 font-semibold';
const SELECT_BASE = `${INPUT_BASE} cursor-pointer pr-8`;

// ── Field Error ───────────────────────────────────────────────────────────────
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="flex items-center gap-1 mt-1.5 text-[8px] sm:text-[9px] text-red-500 font-medium">
      <AlertCircle size={9} strokeWidth={2.5} />
      {msg}
    </p>
  ) : null;

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  leather: string;
  color: string;
  hardware: string;
  lining: string;
  specifications: string;
  wristSize: string;
  lugWidth: string;
  stitching: string;
  timeline: string;
  budget: string;
  referenceImages: string;
}

const DEFAULT_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  category: 'watch-strap',
  leather: 'Barenia Calfskin',
  color: '',
  hardware: 'gold',
  lining: 'natural',
  specifications: '',
  wristSize: '',
  lugWidth: '20mm',
  stitching: 'contrasting',
  timeline: 'standard',
  budget: '',
  referenceImages: '',
};

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORY_OPTIONS = [
  {
    value: 'watch-strap',
    label: 'Bespoke Watch Strap',
    sub: 'Hand-stitched to lug width',
    detail: 'From 18mm to 22mm lug width, custom length',
    icon: Watch,
    time: '10–14 days',
  },
  {
    value: 'wallet',
    label: 'Wallet / Card Holder',
    sub: 'Bifold, trifold or slim',
    detail: 'Interior layout fully customisable',
    icon: Layers,
    time: '14–18 days',
  },
  {
    value: 'handbag',
    label: 'Bespoke Handbag',
    sub: 'Structure, size & hardware',
    detail: 'Full dimension amendment possible',
    icon: Package,
    time: '3–5 weeks',
  },
  {
    value: 'gift-accessories',
    label: 'Accessories & Gifts',
    sub: 'Desk, travel & lifestyle',
    detail: 'Key fobs, passport holders & more',
    icon: Sparkles,
    time: '7–12 days',
  },
];

const LEATHER_OPTIONS = [
  {
    value: 'Barenia Calfskin',
    label: 'Barenia Calfskin',
    origin: 'France',
    sub: 'Smooth, warm tan — develops beautiful patina',
    color: '#C8845A',
    grade: 'Prestige',
  },
  {
    value: 'Epsom Leather',
    label: 'Epsom Cross-Grain',
    origin: 'France',
    sub: 'Rigid, scratch-resistant embossed grain',
    color: '#2C1810',
    grade: 'Classic',
  },
  {
    value: 'Togo Drummed',
    label: 'Togo Drummed',
    origin: 'Germany',
    sub: 'Pebbled texture, soft & lightweight',
    color: '#8B6914',
    grade: 'Classic',
  },
  {
    value: 'Chevre Goatskin',
    label: 'Chevre Goatskin',
    origin: 'Madagascar',
    sub: 'Finely textured, extremely durable',
    color: '#4A5C3A',
    grade: 'Prestige',
  },
  {
    value: 'Matte Alligator',
    label: 'Matte Alligator',
    origin: 'Louisiana',
    sub: 'Symmetric scale pattern — ultra luxury',
    color: '#1A2C1A',
    grade: 'Haute',
  },
  {
    value: 'Box Calf',
    label: 'Box Calf',
    origin: 'England',
    sub: 'Mirror-polished, structured & firm',
    color: '#1C1C1C',
    grade: 'Heritage',
  },
];

const HARDWARE_OPTIONS = [
  { value: 'gold', label: 'Brushed Gold', color: '#C9A96E' },
  { value: 'silver', label: 'Palladium Silver', color: '#C0C0C0' },
  { value: 'ruthenium', label: 'Ruthenium Dark', color: '#3A3A3A' },
  { value: 'none', label: 'No Hardware', color: '#E8E0D4' },
];

const LINING_OPTIONS = [
  { value: 'natural', label: 'Natural Goatskin' },
  { value: 'lambskin', label: 'Soft Lambskin' },
  { value: 'suede', label: 'Alcantara Suede' },
  { value: 'canvas', label: 'Cotton Canvas' },
];

const TIMELINE_OPTIONS = [
  { value: 'standard', label: 'Standard', detail: 'Est. 2–3 weeks', price: 'Included' },
  { value: 'priority', label: 'Priority', detail: 'Est. 10–12 days', price: '+18%' },
  { value: 'express', label: 'Express', detail: 'Est. 5–7 days', price: '+35%' },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Artisan Review',
    desc: 'Your brief is reviewed by our lead craftsman each afternoon',
    icon: Scissors,
  },
  {
    num: '02',
    title: 'Design Schematics',
    desc: 'Digital leather samples & hand-drawn sketches sent within 24hrs',
    icon: Ruler,
  },
  {
    num: '03',
    title: 'Hand Crafting',
    desc: '2–3 weeks of stitching, burnishing and natural drying',
    icon: Award,
  },
  {
    num: '04',
    title: 'Quality & Dispatch',
    desc: 'Final inspection, bespoke packaging and worldwide courier',
    icon: Package,
  },
];

const ATELIER_FACTS = [
  { label: 'Est.', value: '1891' },
  { label: 'Artisans', value: '12' },
  { label: 'Countries', value: '40+' },
  { label: 'Commissions', value: '3,200+' },
];

// ── Section Divider ───────────────────────────────────────────────────────────
const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 py-1">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8E0D4]" />
    <span className="text-[8px] tracking-[0.3em] text-[#C9A96E] font-bold uppercase shrink-0">
      {label}
    </span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E8E0D4]" />
  </div>
);

// ── Step Header ───────────────────────────────────────────────────────────────
const StepHeader = ({
  num,
  icon: Icon,
  title,
  subtitle,
  badge,
}: {
  num: string;
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  badge?: string;
}) => (
  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-[#F0EBE3]">
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1C1C1C] flex items-center justify-center">
        <Icon size={14} className="text-[#C9A96E]" strokeWidth={1.5} />
      </div>
      <span className="text-[7px] font-bold text-[#C9A96E] tracking-widest font-mono">{num}</span>
    </div>
    <div className="flex-1 pt-0.5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-[10px] sm:text-[11px] font-bold text-[#1C1C1C] uppercase tracking-[0.2em]">
          {title}
        </h3>
        {badge && (
          <span className="text-[7px] font-bold uppercase tracking-wider text-[#C9A96E] border border-[#C9A96E]/40 bg-[#C9A96E]/5 px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-[9px] sm:text-[10px] text-[#9E9E9E] font-light mt-0.5 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function CustomCommission() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredLeather, setHoveredLeather] = useState<string | null>(null);

  const selectedLeather = LEATHER_OPTIONS.find((l) => l.value === formData.leather);
  const selectedCategory = CATEGORY_OPTIONS.find((c) => c.value === formData.category);
  const isWatchStrap = formData.category === 'watch-strap';
  const totalSteps = isWatchStrap ? 4 : 3;

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email address required';
    if (!formData.specifications.trim()) e.specifications = 'Please describe your requirements in detail';
    if (isWatchStrap && !formData.wristSize.trim()) e.wristSize = 'Wrist circumference required for strap orders';
    setFormErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCommissionId('UT-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000));
    }, 2000);
  };

  const handleReset = () => {
    setCommissionId('');
    setFormData(DEFAULT_FORM);
    setFormErrors({});
    setActiveStep(1);
  };

  const update = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <section className="min-h-screen bg-[#FAF7F2] py-0">

      {/* ══ HERO BAND ════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#1C1C1C] overflow-hidden">
        {/* Background texture lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px)',
          }}
        />
        {/* Gold accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">

            {/* Left: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-4 sm:space-y-5 max-w-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#C9A96E]" />
                <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#C9A96E] font-bold uppercase">
                  Maroquinerie sur mesure
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white font-serif uppercase leading-[1.1] tracking-wide">
                Bespoke<br />
                <span className="italic text-[#C9A96E]">Commission</span>
              </h1>

              <p className="text-[11px] sm:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
                Every piece begins with a conversation. Our master artisans work
                directly with you to craft a leather object that transcends the
                standard — shaped by your specifications, finished by hand.
              </p>

              {/* Atelier stats */}
              <div className="flex flex-wrap gap-5 sm:gap-8 pt-2">
                {ATELIER_FACTS.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-lg sm:text-2xl font-light text-white font-serif">{value}</span>
                    <span className="text-[8px] tracking-[0.25em] text-neutral-500 uppercase font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Process Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="hidden lg:flex flex-col gap-3 min-w-[280px] xl:min-w-[320px]"
            >
              <p className="text-[8px] tracking-[0.3em] text-[#C9A96E] uppercase font-bold mb-1">
                The Atelier Process
              </p>
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-7 h-7 border border-[#C9A96E]/30 flex items-center justify-center group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/10 transition-all duration-300">
                        <Icon size={11} className="text-[#C9A96E]" strokeWidth={1.5} />
                      </div>
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="w-px h-3 bg-[#C9A96E]/20" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[7px] font-mono font-bold text-[#C9A96E]/60">{step.num}</span>
                        <span className="text-[9px] font-bold text-white uppercase tracking-[0.15em]">{step.title}</span>
                      </div>
                      <p className="text-[8px] text-neutral-500 font-light mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
      </div>

      {/* ══ MAIN LAYOUT ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">

          {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
          <div className="hidden xl:flex flex-col gap-5 w-64 2xl:w-72 shrink-0">

            {/* Atelier Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-[#E8E0D4] overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-[#C9A96E] to-[#B8860B]" />
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[8px] tracking-[0.28em] text-[#9E9E9E] uppercase font-semibold mb-2">
                    Direct Atelier Contact
                  </p>
                  <p className="text-[10px] text-[#1C1C1C] font-medium">Unique Tanery Atelier</p>
                  <p className="text-[9px] text-[#9E9E9E] font-light">Master Leathercraft Studio</p>
                </div>
                <div className="space-y-2.5 pt-1 border-t border-[#F0EBE3]">
                  {[
                    { icon: Mail, text: 'atelier@uniquetanery.com' },
                    { icon: Phone, text: '+261 20 22 123 456' },
                    { icon: MapPin, text: 'Antananarivo, Madagascar' },
                    { icon: Clock, text: 'Mon–Sat, 08:00–17:00 EAST' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-2">
                      <Icon size={10} className="text-[#C9A96E] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="text-[9px] text-[#6B6B6B] font-light leading-snug">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-[#E8E0D4] p-5 space-y-3"
            >
              <p className="text-[8px] tracking-[0.28em] text-[#9E9E9E] uppercase font-semibold">
                Our Guarantees
              </p>
              {[
                { icon: ShieldCheck, text: 'Lifetime stitching warranty on all bespoke pieces' },
                { icon: Award, text: '100% natural & ethically sourced leather hides' },
                { icon: Sparkles, text: 'Free monogram engraving on all commissions' },
                { icon: Package, text: 'Signature wooden gift box included' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={9} className="text-[#C9A96E]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[9px] text-[#6B6B6B] font-light leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>

            {/* Mobile process steps */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1C1C1C] p-5 space-y-3"
            >
              <p className="text-[8px] tracking-[0.28em] text-[#C9A96E] uppercase font-bold">
                Crafting Timeline
              </p>
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex items-start gap-2.5">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-5 h-5 border border-[#C9A96E]/30 flex items-center justify-center">
                        <Icon size={9} className="text-[#C9A96E]" strokeWidth={1.5} />
                      </div>
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="w-px h-2 bg-[#C9A96E]/20 my-0.5" />
                      )}
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-white uppercase tracking-wider">{step.title}</p>
                      <p className="text-[7px] text-neutral-500 font-light leading-snug mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Leather Swatch Preview */}
            {selectedLeather && (
              <motion.div
                key={selectedLeather.value}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#E8E0D4] overflow-hidden"
              >
                <div
                  className="h-24"
                  style={{ backgroundColor: selectedLeather.color }}
                />
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wider">
                      {selectedLeather.label}
                    </p>
                    <span className={`text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                      selectedLeather.grade === 'Haute'
                        ? 'bg-[#1C1C1C] text-[#C9A96E]'
                        : selectedLeather.grade === 'Prestige'
                        ? 'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/30'
                        : 'bg-[#FAF7F2] text-[#9E9E9E] border border-[#E8E0D4]'
                    }`}>
                      {selectedLeather.grade}
                    </span>
                  </div>
                  <p className="text-[8px] text-[#9E9E9E] font-light leading-relaxed">
                    {selectedLeather.sub}
                  </p>
                  <p className="text-[7px] text-[#C9A96E] font-semibold uppercase tracking-wider">
                    Origin: {selectedLeather.origin}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── MAIN FORM AREA ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">

              {/* ════════════ FORM ════════════ */}
              {!commissionId ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Form Header Bar */}
                  <div className="bg-white border border-[#E8E0D4] mb-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#F0EBE3]">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-[#C9A96E]" />
                        <div>
                          <h2 className="text-[10px] sm:text-[11px] font-bold text-[#1C1C1C] uppercase tracking-[0.2em]">
                            Commission Request Form
                          </h2>
                          <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] mt-0.5 tracking-wider font-light">
                            All fields marked with · are required for a precise artisan quote
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[7px] sm:text-[8px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 uppercase tracking-wider font-bold">
                          Accepting Commissions
                        </span>
                      </div>
                    </div>

                    {/* Step progress bar */}
                    <div className="flex border-b border-[#F0EBE3]">
                      {['Client Details', 'Product & Materials', 'Specifications', ...(isWatchStrap ? ['Measurements'] : [])].map(
                        (label, i) => {
                          const stepNum = i + 1;
                          const isActive = activeStep === stepNum;
                          const isDone = activeStep > stepNum;
                          return (
                            <button
                              key={label}
                              onClick={() => setActiveStep(stepNum)}
                              className={`flex-1 px-2 py-3 text-center border-r last:border-r-0 border-[#F0EBE3] transition-all duration-200 group ${
                                isActive
                                  ? 'bg-[#FAF7F2]'
                                  : 'hover:bg-[#FAF7F2]/50'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1.5">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold transition-all duration-200 ${
                                  isDone
                                    ? 'bg-[#C9A96E] text-white'
                                    : isActive
                                    ? 'bg-[#1C1C1C] text-white'
                                    : 'bg-[#E8E0D4] text-[#9E9E9E]'
                                }`}>
                                  {isDone ? <Check size={7} strokeWidth={3} /> : stepNum}
                                </div>
                                <span className={`hidden sm:block text-[8px] font-semibold uppercase tracking-wider transition-colors ${
                                  isActive ? 'text-[#1C1C1C]' : isDone ? 'text-[#C9A96E]' : 'text-[#9E9E9E]'
                                }`}>
                                  {label}
                                </span>
                              </div>
                              {isActive && (
                                <motion.div
                                  layoutId="step-underline"
                                  className="mt-2.5 h-[2px] bg-[#C9A96E] mx-auto w-1/2"
                                />
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-1">

                    {/* ── STEP 1: Client Details ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white border border-[#E8E0D4] p-5 sm:p-6 lg:p-8 space-y-5"
                    >
                      <StepHeader
                        num="01"
                        icon={User}
                        title="Client Contact Details"
                        subtitle="Your information is kept strictly private and used only for commission coordination."
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={LABEL}>Full Name <span className="text-[#C9A96E]">·</span></label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => update('name', e.target.value)}
                            placeholder="Jean-Paul Dupont"
                            className={`${INPUT_BASE} ${formErrors.name ? INPUT_ERR : INPUT_OK}`}
                          />
                          <FieldError msg={formErrors.name} />
                        </div>
                        <div>
                          <label className={LABEL}>Email Address <span className="text-[#C9A96E]">·</span></label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => update('email', e.target.value)}
                            placeholder="jp@dupont.com"
                            className={`${INPUT_BASE} ${formErrors.email ? INPUT_ERR : INPUT_OK}`}
                          />
                          <FieldError msg={formErrors.email} />
                        </div>
                        <div>
                          <label className={LABEL}>Phone (Optional)</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            placeholder="+1 212 000 0000"
                            className={`${INPUT_BASE} ${INPUT_OK}`}
                          />
                        </div>
                        <div>
                          <label className={LABEL}>Country of Delivery</label>
                          <div className="relative">
                            <select
                              value={formData.country}
                              onChange={(e) => update('country', e.target.value)}
                              className={`${SELECT_BASE} ${INPUT_OK}`}
                            >
                              <option value="">Select country...</option>
                              {['United States', 'United Kingdom', 'France', 'Germany', 'Japan', 'Australia', 'Canada', 'Switzerland', 'Italy', 'Other'].map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Info notice */}
                      <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] border border-[#E8E0D4]">
                        <Info size={12} className="text-[#C9A96E] mt-0.5 shrink-0" strokeWidth={1.5} />
                        <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] font-light leading-relaxed">
                          We respond to all commission inquiries within 24 business hours. For urgent requests,
                          please mention your timeline in the specifications field below.
                        </p>
                      </div>
                    </motion.div>

                    {/* ── STEP 2: Product & Materials ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="bg-white border border-[#E8E0D4] p-5 sm:p-6 lg:p-8 space-y-6"
                    >
                      <StepHeader
                        num="02"
                        icon={Palette}
                        title="Product Category & Materials"
                        subtitle="Select the type of piece, your preferred leather hide, and finishing details."
                      />

                      {/* Category Selection */}
                      <div className="space-y-2.5">
                        <label className={LABEL}>Product Type <span className="text-[#C9A96E]">·</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {CATEGORY_OPTIONS.map((cat) => {
                            const Icon = cat.icon;
                            const sel = formData.category === cat.value;
                            return (
                              <motion.button
                                key={cat.value}
                                type="button"
                                onClick={() => update('category', cat.value)}
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-4 border text-left transition-all duration-250 group ${
                                  sel
                                    ? 'border-[#1C1C1C] bg-white shadow-sm'
                                    : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/50 hover:bg-white'
                                }`}
                              >
                                {sel && (
                                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#B8860B]" />
                                )}
                                <div className="flex items-start justify-between mb-3">
                                  <div className={`w-8 h-8 flex items-center justify-center border transition-colors ${
                                    sel ? 'border-[#C9A96E]/40 bg-[#C9A96E]/8' : 'border-[#E8E0D4] bg-white'
                                  }`}>
                                    <Icon size={13} className={sel ? 'text-[#C9A96E]' : 'text-[#9E9E9E]'} strokeWidth={1.5} />
                                  </div>
                                  <AnimatePresence>
                                    {sel && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="w-5 h-5 bg-[#1C1C1C] flex items-center justify-center"
                                      >
                                        <Check size={9} className="text-[#C9A96E]" strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <p className="text-[9px] sm:text-[10px] font-bold text-[#1C1C1C] uppercase tracking-[0.15em] mb-1">
                                  {cat.label}
                                </p>
                                <p className="text-[8px] text-[#9E9E9E] font-light leading-snug mb-2">
                                  {cat.detail}
                                </p>
                                <div className="flex items-center gap-1">
                                  <Clock size={8} className="text-[#C9A96E]" strokeWidth={1.5} />
                                  <span className="text-[7px] text-[#C9A96E] font-semibold uppercase tracking-wider">{cat.time}</span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      <SectionDivider label="Leather Selection" />

                      {/* Leather Selection */}
                      <div className="space-y-2.5">
                        <label className={LABEL}>Hide & Grain <span className="text-[#C9A96E]">·</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {LEATHER_OPTIONS.map((leather) => {
                            const sel = formData.leather === leather.value;
                            const hovered = hoveredLeather === leather.value;
                            return (
                              <motion.button
                                key={leather.value}
                                type="button"
                                onClick={() => update('leather', leather.value)}
                                onMouseEnter={() => setHoveredLeather(leather.value)}
                                onMouseLeave={() => setHoveredLeather(null)}
                                whileTap={{ scale: 0.97 }}
                                className={`relative p-3 border text-left flex gap-3 items-start transition-all duration-200 ${
                                  sel
                                    ? 'border-[#1C1C1C] bg-white shadow-sm'
                                    : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                                }`}
                              >
                                {/* Color swatch */}
                                <div
                                  className={`w-8 h-10 shrink-0 border transition-all duration-200 ${
                                    sel ? 'border-[#C9A96E]/50 shadow-sm' : 'border-neutral-200'
                                  }`}
                                  style={{ backgroundColor: leather.color }}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-1 mb-0.5">
                                    <p className="text-[8px] sm:text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wider leading-tight">
                                      {leather.label}
                                    </p>
                                    {sel && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3.5 h-3.5 bg-[#C9A96E] flex items-center justify-center shrink-0"
                                      >
                                        <Check size={7} className="text-white" strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </div>
                                  <p className="text-[7px] text-[#9E9E9E] leading-snug mb-1.5">{leather.sub}</p>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[6px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                                      leather.grade === 'Haute'
                                        ? 'bg-[#1C1C1C] text-[#C9A96E]'
                                        : leather.grade === 'Prestige'
                                        ? 'text-[#C9A96E] border border-[#C9A96E]/30'
                                        : 'text-[#9E9E9E] border border-[#E8E0D4]'
                                    }`}>{leather.grade}</span>
                                    <span className="text-[6px] text-[#9E9E9E]">· {leather.origin}</span>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      <SectionDivider label="Finishing Details" />

                      {/* Hardware + Lining */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Hardware */}
                        <div className="space-y-2.5">
                          <label className={LABEL}>Hardware Finish</label>
                          <div className="grid grid-cols-2 gap-2">
                            {HARDWARE_OPTIONS.map((hw) => {
                              const sel = formData.hardware === hw.value;
                              return (
                                <button
                                  key={hw.value}
                                  type="button"
                                  onClick={() => update('hardware', hw.value)}
                                  className={`flex items-center gap-2.5 p-2.5 border text-left transition-all duration-200 ${
                                    sel
                                      ? 'border-[#1C1C1C] bg-white'
                                      : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40'
                                  }`}
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full border shrink-0 ${sel ? 'border-[#1C1C1C]' : 'border-neutral-200'}`}
                                    style={{ backgroundColor: hw.color }}
                                  />
                                  <span className="text-[8px] font-semibold text-[#1C1C1C] uppercase tracking-wide leading-tight">
                                    {hw.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Lining */}
                        <div className="space-y-2.5">
                          <label className={LABEL}>Interior Lining</label>
                          <div className="grid grid-cols-2 gap-2">
                            {LINING_OPTIONS.map((ln) => {
                              const sel = formData.lining === ln.value;
                              return (
                                <button
                                  key={ln.value}
                                  type="button"
                                  onClick={() => update('lining', ln.value)}
                                  className={`py-2.5 px-3 border text-[8px] font-semibold uppercase tracking-wide text-left transition-all duration-200 ${
                                    sel
                                      ? 'border-[#1C1C1C] bg-white text-[#1C1C1C]'
                                      : 'border-[#E8E0D4] bg-[#FAF7F2] text-[#9E9E9E] hover:border-[#C9A96E]/40 hover:text-[#1C1C1C]'
                                  }`}
                                >
                                  {ln.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* ── STEP 3: Watch Strap Measurements (conditional) ── */}
                    <AnimatePresence>
                      {isWatchStrap && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="bg-white border border-[#E8E0D4] p-5 sm:p-6 lg:p-8 space-y-5">
                            <StepHeader
                              num="03"
                              icon={Watch}
                              title="Strap Measurements"
                              subtitle="Precise measurements ensure a perfect fit. Measure your wrist with a soft tape or a piece of string."
                              badge="Required for strap orders"
                            />

                            {/* Visual guide */}
                            <div className="flex items-start gap-3 p-4 bg-[#1C1C1C]">
                              <Ruler size={14} className="text-[#C9A96E] shrink-0 mt-0.5" strokeWidth={1.5} />
                              <div className="space-y-1">
                                <p className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">Measurement Guide</p>
                                <p className="text-[8px] text-neutral-400 font-light leading-relaxed">
                                  Wrap a soft tape measure around your wrist where you normally wear a watch.
                                  Add 5–10mm for a comfortable fit. For the lug width, check your watch case
                                  where the strap meets the case — this is usually engraved or in the manual.
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {/* Lug Width */}
                              <div>
                                <label className={LABEL}>Lug Width <span className="text-[#C9A96E]">·</span></label>
                                <div className="relative">
                                  <select
                                    value={formData.lugWidth}
                                    onChange={(e) => update('lugWidth', e.target.value)}
                                    className={`${SELECT_BASE} ${INPUT_OK}`}
                                  >
                                    {['16mm', '17mm', '18mm', '19mm', '20mm (Standard)', '21mm', '22mm', '24mm', 'Custom'].map((w) => (
                                      <option key={w} value={w}>{w}</option>
                                    ))}
                                  </select>
                                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] pointer-events-none" />
                                </div>
                              </div>

                              {/* Wrist Size */}
                              <div>
                                <label className={LABEL}>Wrist Circumference <span className="text-[#C9A96E]">·</span></label>
                                <input
                                  type="text"
                                  value={formData.wristSize}
                                  onChange={(e) => update('wristSize', e.target.value)}
                                  placeholder="e.g. 175mm or 6.9 in"
                                  className={`${INPUT_BASE} ${formErrors.wristSize ? INPUT_ERR : INPUT_OK}`}
                                />
                                <FieldError msg={formErrors.wristSize} />
                              </div>

                              {/* Thread Styling */}
                              <div>
                                <label className={LABEL}>Saddle Stitch Thread</label>
                                <div className="flex flex-col gap-1.5">
                                  {[
                                    { value: 'contrasting', label: 'Ecru Linen (Contrasting)' },
                                    { value: 'tonal', label: 'Tonal Match' },
                                    { value: 'black', label: 'Black Waxed Thread' },
                                  ].map((opt) => (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => update('stitching', opt.value)}
                                      className={`py-2 px-3 border text-[8px] font-semibold tracking-wide text-left uppercase transition-all duration-200 flex items-center justify-between ${
                                        formData.stitching === opt.value
                                          ? 'border-[#1C1C1C] bg-white text-[#1C1C1C]'
                                          : 'border-[#E8E0D4] bg-[#FAF7F2] text-[#9E9E9E] hover:border-[#C9A96E]/40'
                                      }`}
                                    >
                                      <span>{opt.label}</span>
                                      {formData.stitching === opt.value && (
                                        <Check size={9} className="text-[#C9A96E]" strokeWidth={3} />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Watch brand field */}
                            <div>
                              <label className={LABEL}>Watch Brand & Reference (Optional)</label>
                              <input
                                type="text"
                                value={formData.color}
                                onChange={(e) => update('color', e.target.value)}
                                placeholder="e.g. Rolex Submariner ref. 116610, Omega Speedmaster Professional..."
                                className={`${INPUT_BASE} ${INPUT_OK}`}
                              />
                              <p className="text-[8px] text-[#9E9E9E] mt-1.5 font-light">
                                Helps our artisan confirm lug geometry and buckle compatibility.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── STEP 4 / 3: Specifications & Timeline ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-white border border-[#E8E0D4] p-5 sm:p-6 lg:p-8 space-y-5"
                    >
                      <StepHeader
                        num={isWatchStrap ? '04' : '03'}
                        icon={FileText}
                        title="Commission Specifications"
                        subtitle="Describe your vision in as much detail as possible. Our artisan will use this as the foundation for your piece."
                      />

                      {/* Main textarea */}
                      <div>
                        <label className={LABEL}>
                          Detailed Requirements <span className="text-[#C9A96E]">·</span>
                        </label>
                        <textarea
                          rows={5}
                          value={formData.specifications}
                          onChange={(e) => update('specifications', e.target.value)}
                          placeholder={
                            isWatchStrap
                              ? 'Describe your ideal strap: preferred taper (e.g. 20mm to 18mm), buckle finish, holes spacing, any special requests such as deployant clasp or quick-release spring bars...'
                              : 'E.g., I would like a slim bifold wallet in Barenia tan with 6 card slots, a central cash pocket, no coin pocket, and a hand-burnished edge in matching tan. Interior lining in ecru natural lambskin...'
                          }
                          className={`${INPUT_BASE} resize-none font-light ${formErrors.specifications ? INPUT_ERR : INPUT_OK}`}
                        />
                        <div className="flex items-center justify-between mt-1.5">
                          <FieldError msg={formErrors.specifications} />
                          <span className="text-[7px] text-[#9E9E9E] font-light ml-auto">
                            {formData.specifications.length} characters
                          </span>
                        </div>
                      </div>

                      <SectionDivider label="Additional Options" />

                      {/* Timeline + Budget row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Timeline */}
                        <div className="space-y-2">
                          <label className={LABEL}>Production Timeline</label>
                          <div className="space-y-1.5">
                            {TIMELINE_OPTIONS.map((t) => {
                              const sel = formData.timeline === t.value;
                              return (
                                <button
                                  key={t.value}
                                  type="button"
                                  onClick={() => update('timeline', t.value)}
                                  className={`w-full flex items-center justify-between px-3.5 py-3 border text-left transition-all duration-200 ${
                                    sel
                                      ? 'border-[#1C1C1C] bg-white'
                                      : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#C9A96E]/40 hover:bg-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                                      sel ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-[#E8E0D4]'
                                    }`} />
                                    <div>
                                      <p className="text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wider">{t.label}</p>
                                      <p className="text-[7px] text-[#9E9E9E] font-light">{t.detail}</p>
                                    </div>
                                  </div>
                                  <span className={`text-[8px] font-bold tracking-wider ${
                                    sel ? 'text-[#C9A96E]' : 'text-[#9E9E9E]'
                                  }`}>{t.price}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Budget + Reference */}
                        <div className="space-y-4">
                          <div>
                            <label className={LABEL}>Approximate Budget (USD)</label>
                            <div className="relative">
                              <select
                                value={formData.budget}
                                onChange={(e) => update('budget', e.target.value)}
                                className={`${SELECT_BASE} ${INPUT_OK}`}
                              >
                                <option value="">Select range...</option>
                                {[
                                  'Under $300',
                                  '$300 – $600',
                                  '$600 – $1,200',
                                  '$1,200 – $2,500',
                                  '$2,500 – $5,000',
                                  '$5,000+',
                                  'No budget limit',
                                ].map((b) => (
                                  <option key={b} value={b}>{b}</option>
                                ))}
                              </select>
                              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label className={LABEL}>Reference Images / Inspiration</label>
                            <input
                              type="text"
                              value={formData.referenceImages}
                              onChange={(e) => update('referenceImages', e.target.value)}
                              placeholder="Pinterest URL, Google Drive link, etc."
                              className={`${INPUT_BASE} ${INPUT_OK}`}
                            />
                            <p className="text-[7px] text-[#9E9E9E] mt-1.5 font-light leading-relaxed">
                              Share any links to images that inspire your commission.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Important notice */}
                      <div className="flex items-start gap-3.5 p-4 bg-[#1C1C1C] mt-2">
                        <ShieldCheck size={14} className="text-[#C9A96E] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="space-y-1">
                          <p className="text-[8px] sm:text-[9px] text-white font-bold uppercase tracking-[0.2em]">
                            Bespoke Commission Terms
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-neutral-400 font-light leading-relaxed">
                            Bespoke commissions are non-refundable once design schematics are confirmed and
                            approved by both parties. A 50% deposit is required before crafting begins.
                            Each piece requires 2–3 weeks of hand-stitching, edge burnishing, and natural
                            conditioning before dispatch.
                          </p>
                        </div>
                      </div>

                      {/* Submit row */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                          className={`flex-1 sm:flex-none sm:px-10 py-4 text-[9px] sm:text-[10px] tracking-[0.25em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2.5 ${
                            isSubmitting
                              ? 'bg-[#C9A96E] text-white cursor-wait'
                              : 'bg-[#1C1C1C] hover:bg-[#C9A96E] text-white group'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              <span>Registering Commission...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Commission Inquiry</span>
                              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                            </>
                          )}
                        </motion.button>

                        <div className="flex items-center gap-2">
                          <ShieldCheck size={11} className="text-[#C9A96E] shrink-0" strokeWidth={1.5} />
                          <p className="text-[7px] sm:text-[8px] text-[#9E9E9E] font-light leading-relaxed">
                            Encrypted & secure. By submitting you agree to our{' '}
                            <button type="button" className="underline hover:text-[#1C1C1C] transition-colors">
                              bespoke commission terms
                            </button>
                            .
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (

                /* ════════════ SUCCESS STATE ════════════ */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="bg-white border border-[#E8E0D4] overflow-hidden"
                >
                  {/* Success header band */}
                  <div className="bg-[#1C1C1C] px-6 sm:px-10 py-6 sm:py-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center shrink-0"
                      >
                        <Check size={22} className="text-[#C9A96E]" strokeWidth={1.5} />
                      </motion.div>
                      <div>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#C9A96E] font-bold uppercase mb-1"
                        >
                          Commission Successfully Registered
                        </motion.p>
                        <motion.h3
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.28 }}
                          className="text-lg sm:text-2xl font-light text-white uppercase tracking-wider font-serif"
                        >
                          Awaiting Artisan Review
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.36 }}
                          className="text-[9px] sm:text-[10px] text-neutral-400 font-light mt-1"
                        >
                          Hello <span className="text-white font-medium">{formData.name}</span> — your
                          request has been securely submitted to the Unique Tanery crafting registry.
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 lg:p-10 space-y-6">

                    {/* Commission summary table */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="border border-[#E8E0D4] overflow-hidden"
                    >
                      <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#E8E0D4]">
                        <p className="text-[8px] font-bold text-[#1C1C1C] uppercase tracking-[0.2em]">
                          Commission Summary
                        </p>
                      </div>
                      <div className="divide-y divide-[#F0EBE3]">
                        {[
                          { label: 'Registry ID', value: commissionId, highlight: true },
                          { label: 'Client', value: formData.name },
                          { label: 'Contact', value: formData.email },
                          { label: 'Product', value: selectedCategory?.label ?? formData.category },
                          { label: 'Leather', value: selectedLeather?.label ?? formData.leather },
                          { label: 'Hardware', value: HARDWARE_OPTIONS.find(h => h.value === formData.hardware)?.label ?? formData.hardware },
                          { label: 'Timeline', value: TIMELINE_OPTIONS.find(t => t.value === formData.timeline)?.label + ' — ' + TIMELINE_OPTIONS.find(t => t.value === formData.timeline)?.detail },
                          { label: 'Status', value: 'Queued for Artisan Review', accent: true },
                        ].map(({ label, value, highlight, accent }) => (
                          <div key={label} className="flex items-center justify-between px-4 py-3">
                            <span className="text-[8px] sm:text-[9px] text-[#9E9E9E] uppercase tracking-wider font-mono shrink-0">
                              {label}
                            </span>
                            <span className={`text-[8px] sm:text-[9px] font-mono text-right max-w-[55%] truncate ${
                              accent ? 'text-[#C9A96E] font-bold uppercase tracking-wider'
                              : highlight ? 'font-bold text-[#1C1C1C] tracking-wider'
                              : 'text-[#6B6B6B]'
                            }`}>
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* What happens next */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.42 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                    >
                      {PROCESS_STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={step.num}
                            className="relative flex flex-col gap-2.5 p-4 bg-[#FAF7F2] border border-[#E8E0D4]"
                          >
                            {i < PROCESS_STEPS.length - 1 && (
                              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-10">
                                <ChevronRight size={12} className="text-[#E8E0D4]" />
                              </div>
                            )}
                            <div className="w-7 h-7 bg-[#1C1C1C] flex items-center justify-center">
                              <Icon size={11} className="text-[#C9A96E]" strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[7px] font-bold text-[#C9A96E] uppercase tracking-widest mb-0.5">{step.num}</p>
                              <p className="text-[8px] sm:text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wide mb-1">{step.title}</p>
                              <p className="text-[7px] sm:text-[8px] text-[#9E9E9E] font-light leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>

                    {/* Rating + Reset */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0EBE3]"
                    >
                      <div className="flex flex-col items-center sm:items-start gap-1.5">
                        <p className="text-[7px] sm:text-[8px] text-[#9E9E9E] uppercase tracking-widest font-semibold">
                          Rate Your Inquiry Experience
                        </p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className="text-[#C9A96E]" fill="currentColor" />
                          ))}
                        </div>
                      </div>

                      <motion.button
                        onClick={handleReset}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3 border border-[#E8E0D4] hover:border-[#1C1C1C] text-[#6B6B6B] hover:text-[#1C1C1C] text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-bold transition-all duration-300"
                      >
                        <RotateCcw size={11} />
                        Submit Another Commission
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}