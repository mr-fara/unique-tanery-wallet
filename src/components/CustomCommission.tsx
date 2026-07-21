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
  X,
  ZoomIn,
  MessageCircle,
} from 'lucide-react';

// ── WhatsApp Config ───────────────────────────────────────────────────────────
// 075 636 4542 → international format (Sri Lanka +94)
const WHATSAPP_NUMBER = '94756364542';

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
  design: string;
  leather: string;
  color: string;
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
  design: 'Classic Heritage',
  leather: 'Barenia Calfskin',
  color: '',
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

// ── NEW: Design Selection Options ─────────────────────────────────────────────
const DESIGN_OPTIONS = [
  {
    value: 'Classic Heritage',
    label: 'Classic Heritage',
    sub: 'Timeless silhouette with traditional saddle stitching',
    grade: 'Signature',
    image:
      'https://ceylonleathercrafts.com/cdn/shop/files/ChatGPT_Image_Jun_10_2026_01_28_38_PM_1170x.png?v=1781078336',
    description:
      'Our Classic Heritage design honours traditional leathercraft. Clean lines, hand-burnished edges, and prominent saddle stitching create a piece that feels both timeless and enduring. Ideal for those who appreciate understated, old-world elegance.',
    characteristics: ['Traditional saddle stitch', 'Hand-burnished edges', 'Timeless silhouette', 'Understated elegance'],
  },
  {
    value: 'Minimal Modern',
    label: 'Minimal Modern',
    sub: 'Clean-cut edges, hidden seams & sleek profile',
    grade: 'Contemporary',
    image:
      'https://ceylonleathercrafts.com/cdn/shop/files/ChatGPT_Image_Jun_10_2026_01_24_53_PM_1170x.png?v=1781078113',
    description:
      'Minimal Modern strips the design down to its purest form. Hidden seams, ultra-slim profiles, and precisely cut edges deliver a contemporary aesthetic that pairs beautifully with modern lifestyles. Less is truly more.',
    characteristics: ['Hidden seam construction', 'Ultra-slim profile', 'Precision-cut edges', 'Contemporary aesthetic'],
  },
  {
    value: 'Artisan Rustic',
    label: 'Artisan Rustic',
    sub: 'Raw textures, visible grain & organic character',
    grade: 'Handcraft',
    image:
      'https://ceylonleathercrafts.com/cdn/shop/files/ChatGPT_Image_Jun_10_2026_02_45_31_PM_1170x.png?v=1781082953',
    description:
      'Artisan Rustic celebrates the natural beauty of leather. Raw-edge finishes, visible grain, and organic textures give each piece a warm, handcrafted character that becomes richer and more personal with every use.',
    characteristics: ['Raw-edge finish', 'Visible natural grain', 'Organic textures', 'Ages with character'],
  },
  {
    value: 'Executive Luxe',
    label: 'Executive Luxe',
    sub: 'Refined structure with premium detailing',
    grade: 'Premium',
    image:
      'https://ceylonleathercrafts.com/cdn/shop/files/ChatGPT_Image_Jun_10_2026_02_22_57_PM_1170x.png?v=1781081607',
    description:
      'Executive Luxe is crafted for those who demand refinement. Structured panels, precision detailing, and a polished finish create a commanding presence — perfect for the boardroom, formal occasions, and discerning collectors.',
    characteristics: ['Structured panels', 'Precision detailing', 'Polished finish', 'Commanding presence'],
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
    image: '/image/leather1.jpg',
    popupImages: ['/image/leather1.jpg', '/image/leather2.jpg', '/image/leather3.jpg'],
    description:
      'Barenia is one of the most prestigious leathers in the world, produced exclusively in France. Its smooth, supple surface develops a rich, warm patina with use, making each piece uniquely personal over time. Naturally tanned using traditional methods, it is remarkably resistant to water and scratches.',
    characteristics: ['Smooth hand feel', 'Develops deep patina', 'Water-resistant', 'Naturally tanned'],
  },
  {
    value: 'Epsom Leather',
    label: 'Epsom Cross-Grain',
    origin: 'France',
    sub: 'Rigid, scratch-resistant embossed grain',
    color: '#2C1810',
    grade: 'Classic',
    image: '/image/leather2.jpg',
    popupImages: ['/image/leather2.jpg', '/image/leather3.jpg', '/image/leather4.jpg'],
    description:
      'Epsom is a calfskin leather embossed with a fine, regular cross-grain pattern. This process makes the leather highly rigid, lightweight, and extremely resistant to scratches and moisture. It holds its shape beautifully and is one of the most recognisable luxury leather textures in the world.',
    characteristics: ['Embossed cross-grain', 'Scratch-resistant', 'Shape-retaining', 'Lightweight'],
  },
  {
    value: 'Togo Drummed',
    label: 'Togo Drummed',
    origin: 'Germany',
    sub: 'Pebbled texture, soft & lightweight',
    color: '#8B6914',
    grade: 'Classic',
    image: '/image/leather3.jpg',
    popupImages: ['/image/leather3.jpg', '/image/leather4.jpg', '/image/leather5.jpg'],
    description:
      'Togo is a fine-grained, pebbled calfskin leather produced in Germany. Its soft, supple texture and lightweight nature make it incredibly comfortable to carry. The natural grain pattern provides excellent scratch resistance and gives each piece a distinctive, tactile character.',
    characteristics: ['Pebbled grain', 'Soft & supple', 'Lightweight', 'Scratch-resistant'],
  },
  {
    value: 'Chevre Goatskin',
    label: 'Chevre Goatskin',
    origin: 'Madagascar',
    sub: 'Finely textured, extremely durable',
    color: '#4A5C3A',
    grade: 'Prestige',
    image: '/image/leather4.jpg',
    popupImages: ['/image/leather4.jpg', '/image/leather5.jpg', '/image/leather6.jpg'],
    description:
      'Chevre goatskin from Madagascar is celebrated for its exceptional durability and fine, chevron-like grain pattern. Lighter and stronger than most cowhides, it withstands daily wear beautifully. Its characteristic sheen and tight, even grain give it an understated elegance that improves with age.',
    characteristics: ['Chevron grain pattern', 'Highly durable', 'Natural sheen', 'Age-improving'],
  },
  {
    value: 'Matte Alligator',
    label: 'Matte Alligator',
    origin: 'Louisiana',
    sub: 'Symmetric scale pattern — ultra luxury',
    color: '#1A2C1A',
    grade: 'Haute',
    image: '/image/leather5.jpg',
    popupImages: ['/image/leather5.jpg', '/image/leather6.jpg', '/image/leather7.jpg'],
    description:
      'Louisiana alligator leather represents the absolute pinnacle of leathercraft. Each hide features a perfectly symmetric scale pattern unique to every animal. The matte finish reveals the natural texture in its purest form, exuding quiet luxury and extraordinary craftsmanship. CITES certified and ethically sourced.',
    characteristics: ['Symmetric scales', 'CITES certified', 'Ultra-luxury grade', 'Unique per hide'],
  },
  {
    value: 'Box Calf',
    label: 'Box Calf',
    origin: 'England',
    sub: 'Mirror-polished, structured & firm',
    color: '#1C1C1C',
    grade: 'Heritage',
    image: '/image/leather6.jpg',
    popupImages: ['/image/leather6.jpg', '/image/leather7.jpg', '/image/leather8.jpg'],
    description:
      'Box Calf is a firm, chrome-tanned calfskin from England with a characteristic high-gloss, mirror-like finish. Developed in the 19th century for fine shoes and accessories, it is known for its structural integrity and deep, lustrous shine. It burnishes beautifully at the edges and ages with great dignity.',
    characteristics: ['Mirror-polished', 'Chrome-tanned', 'Firm structure', 'Edge-burnishes beautifully'],
  },
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

// ── Generic Detail Popup (used for both Design & Leather) ────────────────────
const DetailPopup = ({
  title,
  sub,
  grade,
  origin,
  images,
  description,
  characteristics,
  swatchColor,
  onClose,
  onSelect,
  isSelected,
}: {
  title: string;
  sub: string;
  grade: string;
  origin?: string;
  images: string[];
  description: string;
  characteristics: string[];
  swatchColor?: string;
  onClose: () => void;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A96E] to-[#B8860B] z-10" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#1C1C1C] flex items-center justify-center hover:bg-[#C9A96E] transition-colors duration-200"
        >
          <X size={13} className="text-white" strokeWidth={2} />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Main image */}
          <div className="relative h-56 sm:h-72 overflow-hidden bg-neutral-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={images[activeImage]}
                alt={title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute bottom-3 left-3">
              <span className={`text-[7px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                grade === 'Haute'
                  ? 'bg-[#1C1C1C] text-[#C9A96E]'
                  : grade === 'Prestige' || grade === 'Premium' || grade === 'Signature'
                  ? 'bg-[#C9A96E] text-white'
                  : 'bg-white/90 text-[#1C1C1C]'
              }`}>
                {grade}
              </span>
            </div>

            {origin && (
              <div className="absolute bottom-3 right-3">
                <span className="text-[7px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-black/60 text-white backdrop-blur-sm">
                  {origin}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 px-5 pt-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-12 overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                    activeImage === i ? 'border-[#C9A96E]' : 'border-transparent hover:border-[#E8E0D4]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {activeImage === i && <div className="absolute inset-0 bg-[#C9A96E]/10" />}
                </button>
              ))}
              <div className="flex items-center gap-1 ml-auto">
                <ZoomIn size={9} className="text-[#9E9E9E]" />
                <span className="text-[7px] text-[#9E9E9E] font-light">Click to preview</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h3 className="text-sm sm:text-base font-bold text-[#1C1C1C] uppercase tracking-[0.15em]">
                  {title}
                </h3>
                {swatchColor && (
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <div
                      className="w-4 h-4 border border-neutral-200"
                      style={{ backgroundColor: swatchColor }}
                    />
                    <span className="text-[8px] text-[#9E9E9E] font-light">Colour reference</span>
                  </div>
                )}
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#9E9E9E] font-light leading-relaxed">
                {sub}
              </p>
            </div>

            <p className="text-[9px] sm:text-[10px] text-[#4A4A4A] font-light leading-relaxed border-l-2 border-[#C9A96E]/30 pl-3">
              {description}
            </p>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#9E9E9E] mb-2">
                Key Characteristics
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {characteristics.map((char) => (
                  <div key={char} className="flex items-center gap-2 p-2 bg-[#FAF7F2] border border-[#E8E0D4]">
                    <div className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0" />
                    <span className="text-[8px] text-[#4A4A4A] font-light">{char}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border border-[#E8E0D4] bg-[#FAF7F2]">
              <div className="w-px h-8 bg-[#C9A96E]" />
              {origin && (
                <>
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#9E9E9E]">Origin</p>
                    <p className="text-[9px] font-semibold text-[#1C1C1C] uppercase tracking-wider">{origin}</p>
                  </div>
                  <div className="w-px h-8 bg-[#E8E0D4] ml-4" />
                </>
              )}
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#9E9E9E]">Grade</p>
                <p className="text-[9px] font-semibold text-[#C9A96E] uppercase tracking-wider">{grade}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <motion.button
                type="button"
                onClick={() => { onSelect(); onClose(); }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 py-3.5 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-[#C9A96E] text-white'
                    : 'bg-[#1C1C1C] hover:bg-[#C9A96E] text-white'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check size={11} strokeWidth={2.5} />
                    Selected
                  </>
                ) : (
                  <>
                    Select This Option
                    <ArrowRight size={11} />
                  </>
                )}
              </motion.button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 border border-[#E8E0D4] text-[9px] font-bold uppercase tracking-[0.2em] text-[#9E9E9E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function CustomCommission() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissionId, setCommissionId] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [activeStep, setActiveStep] = useState(1);
  const [leatherPopup, setLeatherPopup] = useState<string | null>(null);
  const [designPopup, setDesignPopup] = useState<string | null>(null);

  const selectedLeather = LEATHER_OPTIONS.find((l) => l.value === formData.leather);
  const selectedDesign = DESIGN_OPTIONS.find((d) => d.value === formData.design);
  const selectedCategory = CATEGORY_OPTIONS.find((c) => c.value === formData.category);
  const isWatchStrap = formData.category === 'watch-strap';
  const popupLeather = LEATHER_OPTIONS.find((l) => l.value === leatherPopup);
  const popupDesign = DESIGN_OPTIONS.find((d) => d.value === designPopup);

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email address required';
    if (!formData.specifications.trim()) e.specifications = 'Please describe your requirements in detail';
    if (isWatchStrap && !formData.wristSize.trim()) e.wristSize = 'Wrist circumference required for strap orders';
    setFormErrors(e);
    return !Object.keys(e).length;
  };

  // ── Build WhatsApp message with all commission details ──
  const buildWhatsAppMessage = (registryId: string): string => {
    const timeline = TIMELINE_OPTIONS.find((t) => t.value === formData.timeline);
    const stitchingLabels: Record<string, string> = {
      contrasting: 'Ecru Linen (Contrasting)',
      tonal: 'Tonal Match',
      black: 'Black Waxed Thread',
    };

    const lines = [
      '🏷️ *NEW BESPOKE COMMISSION INQUIRY*',
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      `📋 *Registry ID:* ${registryId}`,
      '',
      '👤 *CLIENT DETAILS*',
      `• Name: ${formData.name}`,
      `• Email: ${formData.email}`,
      formData.phone ? `• Phone: ${formData.phone}` : '',
      formData.country ? `• Country: ${formData.country}` : '',
      '',
      '🛠️ *PRODUCT & MATERIALS*',
      `• Product: ${selectedCategory?.label ?? formData.category}`,
      `• Design Style: ${selectedDesign?.label ?? formData.design} (${selectedDesign?.grade ?? ''})`,
      `• Leather: ${selectedLeather?.label ?? formData.leather}`,
      `• Leather Origin: ${selectedLeather?.origin ?? '-'}`,
      `• Leather Grade: ${selectedLeather?.grade ?? '-'}`,
      '',
    ];

    if (isWatchStrap) {
      lines.push(
        '⌚ *STRAP MEASUREMENTS*',
        `• Lug Width: ${formData.lugWidth}`,
        `• Wrist Size: ${formData.wristSize}`,
        `• Stitch Thread: ${stitchingLabels[formData.stitching] ?? formData.stitching}`,
        formData.color ? `• Watch Ref: ${formData.color}` : '',
        ''
      );
    }

    lines.push(
      '📝 *SPECIFICATIONS*',
      formData.specifications,
      '',
      '⏱️ *TIMELINE & BUDGET*',
      `• Timeline: ${timeline?.label ?? formData.timeline} (${timeline?.detail ?? ''}) — ${timeline?.price ?? ''}`,
      formData.budget ? `• Budget: ${formData.budget}` : '• Budget: Not specified',
      formData.referenceImages ? `• References: ${formData.referenceImages}` : '',
      '',
      '━━━━━━━━━━━━━━━━━━━━',
      '✨ Sent via Unique Tanery Commission Form'
    );

    return lines.filter((l) => l !== '').join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const registryId =
      'UT-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000);

    setTimeout(() => {
      setIsSubmitting(false);
      setCommissionId(registryId);

      // ── Redirect to WhatsApp with full commission details ──
      const message = buildWhatsAppMessage(registryId);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }, 1500);
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
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">

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

              <div className="flex flex-wrap gap-5 sm:gap-8 pt-2">
                {ATELIER_FACTS.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-lg sm:text-2xl font-light text-white font-serif">{value}</span>
                    <span className="text-[8px] tracking-[0.25em] text-neutral-500 uppercase font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
      </div>

      {/* ══ MAIN LAYOUT ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">

          {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
          <div className="hidden xl:flex flex-col gap-5 w-64 2xl:w-72 shrink-0">

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
                    { icon: Phone, text: '075 636 4542' },
                    { icon: MessageCircle, text: 'WhatsApp inquiries welcome' },
                    { icon: Clock, text: 'Mon–Sat, 08:00–17:00' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-2">
                      <Icon size={10} className="text-[#C9A96E] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="text-[9px] text-[#6B6B6B] font-light leading-snug">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

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

            {/* Selected Design + Leather Preview */}
            {selectedDesign && (
              <motion.div
                key={'d-' + selectedDesign.value}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#E8E0D4] overflow-hidden"
              >
                <div className="relative h-24 overflow-hidden">
                  <img src={selectedDesign.image} alt={selectedDesign.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wider">
                      {selectedDesign.label}
                    </p>
                    <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/30">
                      {selectedDesign.grade}
                    </span>
                  </div>
                  <p className="text-[8px] text-[#9E9E9E] font-light leading-relaxed">{selectedDesign.sub}</p>
                  <p className="text-[7px] text-[#C9A96E] font-semibold uppercase tracking-wider">
                    Selected Design Style
                  </p>
                </div>
              </motion.div>
            )}

            {selectedLeather && (
              <motion.div
                key={'l-' + selectedLeather.value}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#E8E0D4] overflow-hidden"
              >
                <div className="relative h-24 overflow-hidden">
                  <img src={selectedLeather.image} alt={selectedLeather.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
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
                  <p className="text-[8px] text-[#9E9E9E] font-light leading-relaxed">{selectedLeather.sub}</p>
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
                            All fields marked with · are required — inquiry sent directly via WhatsApp
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
                                isActive ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/50'
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
                            placeholder="+94 75 000 0000"
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
                              {['Sri Lanka', 'United States', 'United Kingdom', 'France', 'Germany', 'Japan', 'Australia', 'Canada', 'Switzerland', 'Italy', 'Other'].map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] border border-[#E8E0D4]">
                        <MessageCircle size={12} className="text-[#C9A96E] mt-0.5 shrink-0" strokeWidth={1.5} />
                        <p className="text-[8px] sm:text-[9px] text-[#9E9E9E] font-light leading-relaxed">
                          When you submit this form, your full commission details will open directly in
                          WhatsApp so you can chat with our artisan instantly. We respond within 24 business hours.
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
                        subtitle="Select the type of piece, your preferred design style, and leather hide."
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

                      {/* ══ NEW: DESIGN SELECTION ══ */}
                      <SectionDivider label="Design Selection" />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className={LABEL}>
                            Design Style <span className="text-[#C9A96E]">·</span>
                          </label>
                          <span className="text-[7px] text-[#9E9E9E] font-light flex items-center gap-1">
                            <ZoomIn size={8} className="text-[#C9A96E]" />
                            Tap any card to view detail
                          </span>
                        </div>

                        {/* Selected design banner */}
                        <AnimatePresence>
                          {selectedDesign && (
                            <motion.div
                              key={selectedDesign.value}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-3 px-3.5 py-2.5 bg-[#1C1C1C] border border-[#1C1C1C]"
                            >
                              <div className="relative w-8 h-8 overflow-hidden shrink-0">
                                <img
                                  src={selectedDesign.image}
                                  alt={selectedDesign.label}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">
                                  {selectedDesign.label}
                                </p>
                                <p className="text-[7px] text-neutral-400 font-light">{selectedDesign.grade} Design</p>
                              </div>
                              <Check size={11} className="text-[#C9A96E]" strokeWidth={2.5} />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Design grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {DESIGN_OPTIONS.map((design, idx) => {
                            const sel = formData.design === design.value;
                            return (
                              <motion.button
                                key={design.value}
                                type="button"
                                onClick={() => setDesignPopup(design.value)}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className={`relative group text-left overflow-hidden border-2 transition-all duration-200 ${
                                  sel
                                    ? 'border-[#C9A96E] shadow-md'
                                    : 'border-transparent hover:border-[#C9A96E]/40'
                                }`}
                              >
                                {/* Image */}
                                <div className="relative h-32 sm:h-36 overflow-hidden bg-neutral-200">
                                  <img
                                    src={design.image}
                                    alt={design.label}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                                      <ZoomIn size={13} className="text-[#1C1C1C]" />
                                    </div>
                                  </div>

                                  <AnimatePresence>
                                    {sel && (
                                      <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute top-2 right-2 w-6 h-6 bg-[#C9A96E] flex items-center justify-center shadow-md"
                                      >
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="absolute top-2 left-2">
                                    <span className="text-[6px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#C9A96E] text-white">
                                      {design.grade}
                                    </span>
                                  </div>
                                </div>

                                {/* Card info */}
                                <div className={`p-2.5 transition-colors duration-200 ${
                                  sel ? 'bg-[#FAF7F2] border-t border-[#C9A96E]/30' : 'bg-white border-t border-[#F0EBE3] group-hover:bg-[#FAF7F2]'
                                }`}>
                                  <p className="text-[8px] sm:text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wider leading-tight mb-0.5">
                                    {design.label}
                                  </p>
                                  <p className="text-[7px] text-[#9E9E9E] font-light leading-snug mb-1.5 line-clamp-2">
                                    {design.sub}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[6px] text-[#C9A96E] font-semibold uppercase tracking-wider">
                                      Design Style
                                    </span>
                                    <span className="text-[6px] text-[#9E9E9E] font-light flex items-center gap-0.5">
                                      <ZoomIn size={7} />
                                      View
                                    </span>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        <p className="text-[8px] text-[#9E9E9E] font-light text-center pt-1">
                          Click any design card to view full detail and select your preferred style.
                        </p>
                      </div>

                      {/* ══ LEATHER SELECTION ══ */}
                      <SectionDivider label="Leather Selection" />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className={LABEL}>
                            Hide & Grain <span className="text-[#C9A96E]">·</span>
                          </label>
                          <span className="text-[7px] text-[#9E9E9E] font-light flex items-center gap-1">
                            <ZoomIn size={8} className="text-[#C9A96E]" />
                            Tap any card to view detail
                          </span>
                        </div>

                        {/* Selected leather banner */}
                        <AnimatePresence>
                          {selectedLeather && (
                            <motion.div
                              key={selectedLeather.value}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-3 px-3.5 py-2.5 bg-[#1C1C1C] border border-[#1C1C1C]"
                            >
                              <div className="relative w-8 h-8 overflow-hidden shrink-0">
                                <img
                                  src={selectedLeather.image}
                                  alt={selectedLeather.label}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">
                                  {selectedLeather.label}
                                </p>
                                <p className="text-[7px] text-neutral-400 font-light">{selectedLeather.origin} · {selectedLeather.grade}</p>
                              </div>
                              <Check size={11} className="text-[#C9A96E]" strokeWidth={2.5} />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Leather grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {LEATHER_OPTIONS.map((leather, idx) => {
                            const sel = formData.leather === leather.value;
                            return (
                              <motion.button
                                key={leather.value}
                                type="button"
                                onClick={() => setLeatherPopup(leather.value)}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className={`relative group text-left overflow-hidden border-2 transition-all duration-200 ${
                                  sel
                                    ? 'border-[#C9A96E] shadow-md'
                                    : 'border-transparent hover:border-[#C9A96E]/40'
                                }`}
                              >
                                <div className="relative h-28 sm:h-32 overflow-hidden bg-neutral-200">
                                  <img
                                    src={leather.image}
                                    alt={leather.label}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                                      <ZoomIn size={13} className="text-[#1C1C1C]" />
                                    </div>
                                  </div>

                                  <AnimatePresence>
                                    {sel && (
                                      <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute top-2 right-2 w-6 h-6 bg-[#C9A96E] flex items-center justify-center shadow-md"
                                      >
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="absolute top-2 left-2">
                                    <span className={`text-[6px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                                      leather.grade === 'Haute'
                                        ? 'bg-[#1C1C1C] text-[#C9A96E]'
                                        : leather.grade === 'Prestige'
                                        ? 'bg-[#C9A96E] text-white'
                                        : leather.grade === 'Heritage'
                                        ? 'bg-white/90 text-[#1C1C1C]'
                                        : 'bg-white/80 text-[#6B6B6B]'
                                    }`}>
                                      {leather.grade}
                                    </span>
                                  </div>
                                </div>

                                <div className={`p-2.5 transition-colors duration-200 ${
                                  sel ? 'bg-[#FAF7F2] border-t border-[#C9A96E]/30' : 'bg-white border-t border-[#F0EBE3] group-hover:bg-[#FAF7F2]'
                                }`}>
                                  <p className="text-[8px] sm:text-[9px] font-bold text-[#1C1C1C] uppercase tracking-wider leading-tight mb-0.5">
                                    {leather.label}
                                  </p>
                                  <p className="text-[7px] text-[#9E9E9E] font-light leading-snug mb-1.5 line-clamp-2">
                                    {leather.sub}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[6px] text-[#C9A96E] font-semibold uppercase tracking-wider">
                                      {leather.origin}
                                    </span>
                                    <span className="text-[6px] text-[#9E9E9E] font-light flex items-center gap-0.5">
                                      <ZoomIn size={7} />
                                      View
                                    </span>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        <p className="text-[8px] text-[#9E9E9E] font-light text-center pt-1">
                          Click any leather card to view full detail, images, and select your hide.
                        </p>
                      </div>
                    </motion.div>

                    {/* ── Watch Strap Measurements ── */}
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

                    {/* ── Specifications & Timeline ── */}
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
                              : 'E.g., I would like a slim bifold wallet in Barenia tan with 6 card slots, a central cash pocket, no coin pocket, and a hand-burnished edge in matching tan...'
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

                      {/* Bespoke terms notice */}
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

                      {/* Submit row — WhatsApp */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                          className={`flex-1 sm:flex-none sm:px-10 py-4 text-[9px] sm:text-[10px] tracking-[0.25em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2.5 ${
                            isSubmitting
                              ? 'bg-[#25D366] text-white cursor-wait'
                              : 'bg-[#1C1C1C] hover:bg-[#25D366] text-white group'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              <span>Opening WhatsApp...</span>
                            </>
                          ) : (
                            <>
                              <MessageCircle size={13} />
                              <span>Send Inquiry via WhatsApp</span>
                              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                            </>
                          )}
                        </motion.button>

                        <div className="flex items-center gap-2">
                          <MessageCircle size={11} className="text-[#25D366] shrink-0" strokeWidth={1.5} />
                          <p className="text-[7px] sm:text-[8px] text-[#9E9E9E] font-light leading-relaxed">
                            Your commission details will open in WhatsApp chat with our atelier
                            (<span className="font-semibold text-[#1C1C1C]">075 636 4542</span>) for instant response.
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
                  <div className="bg-[#1C1C1C] px-6 sm:px-10 py-6 sm:py-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0"
                      >
                        <MessageCircle size={22} className="text-[#25D366]" strokeWidth={1.5} />
                      </motion.div>
                      <div>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#C9A96E] font-bold uppercase mb-1"
                        >
                          Inquiry Sent via WhatsApp
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
                          commission details have been opened in WhatsApp. If the chat did not open,{' '}
                          <button
                            onClick={() => {
                              const message = buildWhatsAppMessage(commissionId);
                              window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            className="text-[#25D366] underline font-medium"
                          >
                            click here to resend
                          </button>.
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 lg:p-10 space-y-6">
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
                          { label: 'Design Style', value: selectedDesign?.label ?? formData.design },
                          { label: 'Leather', value: selectedLeather?.label ?? formData.leather },
                          { label: 'Timeline', value: TIMELINE_OPTIONS.find(t => t.value === formData.timeline)?.label + ' — ' + TIMELINE_OPTIONS.find(t => t.value === formData.timeline)?.detail },
                          { label: 'Status', value: 'Sent to WhatsApp — Awaiting Reply', accent: true },
                        ].map(({ label, value, highlight, accent }) => (
                          <div key={label} className="flex items-center justify-between px-4 py-3">
                            <span className="text-[8px] sm:text-[9px] text-[#9E9E9E] uppercase tracking-wider font-mono shrink-0">
                              {label}
                            </span>
                            <span className={`text-[8px] sm:text-[9px] font-mono text-right max-w-[55%] truncate ${
                              accent ? 'text-[#25D366] font-bold uppercase tracking-wider'
                              : highlight ? 'font-bold text-[#1C1C1C] tracking-wider'
                              : 'text-[#6B6B6B]'
                            }`}>
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

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

      {/* ══ DESIGN POPUP ═════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {designPopup && popupDesign && (
          <DetailPopup
            title={popupDesign.label}
            sub={popupDesign.sub}
            grade={popupDesign.grade}
            images={[popupDesign.image]}
            description={popupDesign.description}
            characteristics={popupDesign.characteristics}
            onClose={() => setDesignPopup(null)}
            onSelect={() => update('design', popupDesign.value)}
            isSelected={formData.design === popupDesign.value}
          />
        )}
      </AnimatePresence>

      {/* ══ LEATHER POPUP ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {leatherPopup && popupLeather && (
          <DetailPopup
            title={popupLeather.label}
            sub={popupLeather.sub}
            grade={popupLeather.grade}
            origin={popupLeather.origin}
            images={popupLeather.popupImages}
            description={popupLeather.description}
            characteristics={popupLeather.characteristics}
            swatchColor={popupLeather.color}
            onClose={() => setLeatherPopup(null)}
            onSelect={() => update('leather', popupLeather.value)}
            isSelected={formData.leather === popupLeather.value}
          />
        )}
      </AnimatePresence>
    </section>
  );
}