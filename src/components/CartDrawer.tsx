import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Gift,
  CheckCircle,
  ArrowLeft,
  Lock,
  Truck,
  Package,
  CreditCard,
  ChevronRight,
  AlertCircle,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

// ── Shared input style constants ──
const LABEL = 'block text-[8px] sm:text-[9px] tracking-[0.22em] text-neutral-400 uppercase mb-1.5 font-semibold';
const INPUT =
  'w-full border text-xs px-3 py-2.5 text-neutral-800 focus:outline-none transition-all duration-200 placeholder:text-neutral-300 bg-white rounded-none appearance-none';
const INPUT_OK = 'border-neutral-200 focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700/10';
const INPUT_ERR = 'border-red-400 bg-red-50/40 focus:border-red-500';

// ── Small inline error ──
const Err = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="flex items-center gap-1 mt-1 text-[8px] sm:text-[9px] text-red-500 font-medium">
      <AlertCircle size={9} strokeWidth={2.5} />
      {msg}
    </p>
  ) : null;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isGiftWrapped, setIsGiftWrapped] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCvc: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // ── Lock body scroll ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Reset step after close ──
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => { setStep('cart'); setErrors({}); }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Pricing ──
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const packagingFee = isGiftWrapped ? 15 : 0;
  const shippingFee = subtotal >= 500 ? 0 : 35;
  const grandTotal = subtotal + packagingFee + shippingFee;

  // ── Input formatting ──
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'cardNumber') v = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    else if (name === 'cardExpiry') v = value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
    else if (name === 'cardCvc') v = value.replace(/\D/g, '').slice(0, 3);
    else if (name === 'zip') v = value.replace(/\D/g, '').slice(0, 6);
    setForm(p => ({ ...p, [name]: v }));
    if (errors[name as keyof typeof form]) setErrors(p => ({ ...p, [name]: '' }));
  };

  // ── Validation ──
  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Full name required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.address.trim()) e.address = 'Address required';
    if (!form.city.trim()) e.city = 'City required';
    if (form.zip.length < 4) e.zip = 'Valid ZIP / postal code';
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter valid 16-digit number';
    if (form.cardExpiry.length < 5) e.cardExpiry = 'MM/YY required';
    if (form.cardCvc.length < 3) e.cardCvc = 'CVC required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setOrderId('UT-' + Math.floor(Math.random() * 900000 + 100000));
      setIsSubmitting(false);
      setStep('success');
      onClearCart();
    }, 1800);
  };

  // ── Remove with animation ──
  const removeItem = useCallback((id: string) => {
    setRemovingId(id);
    setTimeout(() => { onRemoveItem(id); setRemovingId(null); }, 380);
  }, [onRemoveItem]);

  // ── Leather filter styles ──
  const filterFor = (hex: string) => ({
    '#1a1a1a': 'brightness-[0.45] contrast-[1.2] grayscale',
    '#3d2516': 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]',
    '#63251e': 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]',
    '#4d5c41': 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]',
    '#1d2a45': 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]',
    '#be814e': 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]',
    '#d9531e': 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]',
    '#181e2b': 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]',
    '#8b8478': 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]',
    '#d9788e': 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]',
    '#1e2433': 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]',
    '#233827': 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]',
  }[hex.toLowerCase()] ?? '');

  const stepLabel = { cart: 'Shopping Bag', checkout: 'Secure Checkout', success: 'Order Confirmed' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">

          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* ── Drawer Panel ── */}
          <motion.div
            className="relative z-10 flex flex-col w-full sm:w-[390px] md:w-[420px] lg:w-[440px] h-full bg-white shadow-2xl border-l border-neutral-100"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >

            {/* ══ HEADER ══ */}
            <div className="flex-shrink-0 border-b border-neutral-100 bg-white">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4">

                {/* Left: icon + title */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {step === 'checkout' ? (
                      <motion.button
                        key="back"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setStep('cart')}
                        className="p-1.5 -ml-1 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                        whileTap={{ scale: 0.88 }}
                      >
                        <ArrowLeft size={16} strokeWidth={1.8} />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="bag"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ShoppingBag size={16} strokeWidth={1.5} className="text-neutral-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="min-w-0">
                    <h2 className="text-[11px] sm:text-xs font-bold text-neutral-800 uppercase tracking-[0.2em] leading-none">
                      {stepLabel[step]}
                    </h2>
                    {step === 'cart' && cartItems.length > 0 && (
                      <p className="text-[8px] sm:text-[9px] text-neutral-400 mt-0.5 tracking-wider">
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Center: step pills */}
                {step !== 'success' && (
                  <div className="hidden sm:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
                    {(['cart', 'checkout'] as const).map((s, i) => (
                      <React.Fragment key={s}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-all duration-300 ${
                          step === s
                            ? 'bg-neutral-900 text-white'
                            : i < ['cart', 'checkout'].indexOf(step)
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-100 text-neutral-400'
                        }`}>
                          {i < ['cart', 'checkout'].indexOf(step)
                            ? <CheckCircle size={11} strokeWidth={2.5} />
                            : i + 1}
                        </div>
                        {i < 1 && <ChevronRight size={10} className="text-neutral-300" />}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Right: close */}
                <motion.button
                  onClick={onClose}
                  className="p-2 -mr-1 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors flex-shrink-0"
                  whileTap={{ scale: 0.88 }}
                >
                  <X size={17} strokeWidth={1.8} />
                </motion.button>
              </div>

              {/* Progress bar */}
              {step !== 'success' && (
                <div className="h-[2px] bg-neutral-100">
                  <motion.div
                    className="h-full bg-amber-700"
                    animate={{ width: step === 'cart' ? '50%' : '100%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>

            {/* ══ SCROLLABLE BODY ══ */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">

                {/* ─── CART SCREEN ─── */}
                {step === 'cart' && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28 }}
                  >
                    {cartItems.length === 0 ? (

                      /* Empty bag */
                      <div className="flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28 min-h-[55vh] space-y-4">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center"
                        >
                          <ShoppingBag size={26} className="text-neutral-300" strokeWidth={1.2} />
                        </motion.div>
                        <div className="space-y-1.5">
                          <h3 className="text-xs sm:text-sm font-bold text-neutral-700 uppercase tracking-[0.15em]">
                            Your Bag is Empty
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light max-w-[200px] leading-relaxed">
                            Explore our handcrafted leather collection.
                          </p>
                        </div>
                        <motion.button
                          onClick={onClose}
                          className="px-6 py-3 bg-neutral-900 hover:bg-amber-800 text-white text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold transition-colors duration-300"
                          whileTap={{ scale: 0.97 }}
                        >
                          Browse Collection
                        </motion.button>
                      </div>

                    ) : (
                      <div>

                        {/* ── Cart Items ── */}
                        <ul className="divide-y divide-neutral-50 px-4 sm:px-5">
                          <AnimatePresence initial={false}>
                            {cartItems.map((item) => {
                              const isRemoving = removingId === item.cartItemId;
                              return (
                                <motion.li
                                  key={item.cartItemId}
                                  layout
                                  animate={{ opacity: isRemoving ? 0 : 1, x: isRemoving ? 50 : 0 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
                                  transition={{ duration: 0.35 }}
                                  className="py-4 sm:py-5 flex gap-3 sm:gap-4 overflow-hidden"
                                >
                                  {/* Thumb */}
                                  <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] flex-shrink-0 bg-stone-100 border border-stone-200 overflow-hidden">
                                    <img
                                      src={item.selectedColor.imageUrl}
                                      alt={item.product.name}
                                      className="w-full h-full object-cover"
                                      style={{ filter: filterFor(item.selectedColor.hex) }}
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>

                                  {/* Info */}
                                  <div className="flex-1 min-w-0 space-y-1.5 text-left">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className="text-[10px] sm:text-[11px] font-bold text-neutral-800 uppercase tracking-wider leading-tight line-clamp-2">
                                        {item.product.name}
                                      </h4>
                                      <span className="text-[11px] sm:text-xs font-bold text-neutral-900 flex-shrink-0 tabular-nums">
                                        ${(item.product.price * item.quantity).toLocaleString()}
                                      </span>
                                    </div>

                                    <p className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-[0.15em] font-medium">
                                      {item.product.leatherType} · {item.selectedColor.name.split(' (')[0]}
                                    </p>

                                    {/* Customization chip */}
                                    {item.customization && (
                                      <div className="inline-flex flex-wrap gap-1">
                                        {[
                                          item.customization.stitching === 'tonal' ? 'Tonal Stitch' : 'Ecru Stitch',
                                          item.customization.hardware,
                                          item.customization.monogramText
                                            ? `${item.customization.monogramText} · ${item.customization.foilColor}`
                                            : null,
                                        ].filter(Boolean).map((tag) => (
                                          <span
                                            key={tag}
                                            className="text-[7px] sm:text-[8px] bg-stone-100 text-neutral-500 px-1.5 py-0.5 font-mono uppercase tracking-wider"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}

                                    {/* Qty + delete */}
                                    <div className="flex items-center justify-between pt-0.5">
                                      <div className="flex items-center border border-neutral-200 bg-white h-7 sm:h-8">
                                        <motion.button
                                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                          disabled={item.quantity <= 1}
                                          className="px-2 h-full text-neutral-400 hover:text-neutral-800 disabled:opacity-25 transition-colors"
                                          whileTap={{ scale: 0.82 }}
                                        >
                                          <Minus size={9} strokeWidth={2.5} />
                                        </motion.button>
                                        <span className="text-[11px] font-semibold text-neutral-800 px-2.5 tabular-nums min-w-[22px] text-center">
                                          {item.quantity}
                                        </span>
                                        <motion.button
                                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                          disabled={item.quantity >= 5}
                                          className="px-2 h-full text-neutral-400 hover:text-neutral-800 disabled:opacity-25 transition-colors"
                                          whileTap={{ scale: 0.82 }}
                                        >
                                          <Plus size={9} strokeWidth={2.5} />
                                        </motion.button>
                                      </div>

                                      <motion.button
                                        onClick={() => removeItem(item.cartItemId)}
                                        className="p-1.5 sm:p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                        whileTap={{ scale: 0.82 }}
                                      >
                                        <Trash2 size={13} strokeWidth={1.5} />
                                      </motion.button>
                                    </div>
                                  </div>
                                </motion.li>
                              );
                            })}
                          </AnimatePresence>
                        </ul>

                        {/* ── Gift Toggle ── */}
                        <div className="mx-4 sm:mx-5 mb-3 mt-1 border border-stone-100 bg-stone-50/60">
                          <button
                            type="button"
                            onClick={() => setIsGiftWrapped(!isGiftWrapped)}
                            className="w-full flex items-start gap-3 p-3.5 sm:p-4 text-left"
                          >
                            {/* Custom checkbox */}
                            <div className={`mt-0.5 w-4 h-4 sm:w-[18px] sm:h-[18px] border rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                              isGiftWrapped
                                ? 'bg-amber-800 border-amber-800'
                                : 'border-neutral-300 hover:border-neutral-500'
                            }`}>
                              <AnimatePresence>
                                {isGiftWrapped && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                                  >
                                    <CheckCircle size={10} className="text-white" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                  <Gift size={12} className="text-amber-800 flex-shrink-0" strokeWidth={1.5} />
                                  <span className="text-[9px] sm:text-[10px] font-bold text-neutral-800 uppercase tracking-[0.15em]">
                                    Premium Gift Packaging
                                  </span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-500 flex-shrink-0">
                                  +$15
                                </span>
                              </div>
                              <p className="text-[8px] sm:text-[9px] text-neutral-400 font-light mt-1 leading-relaxed">
                                Signature orange box, acid-free tissue & dark silk ribbon.
                              </p>
                            </div>
                          </button>
                        </div>

                        {/* ── Trust Row ── */}
                        <div className="flex items-center justify-center gap-4 sm:gap-5 px-4 py-3 border-t border-neutral-50 flex-wrap">
                          {[
                            { icon: Lock, label: '256-bit SSL' },
                            { icon: Truck, label: 'Free over $500' },
                            { icon: Package, label: 'Gift Ready' },
                          ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5 text-[7px] sm:text-[8px] text-neutral-400 uppercase tracking-wider">
                              <Icon size={10} strokeWidth={1.5} className="text-neutral-300" />
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ─── CHECKOUT SCREEN ─── */}
                {step === 'checkout' && (
                  <motion.form
                    key="checkout"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 space-y-5 text-left"
                    noValidate
                  >

                    {/* Shipping */}
                    <section className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                        <Truck size={13} className="text-amber-800" strokeWidth={1.5} />
                        <h3 className="text-[9px] sm:text-[10px] font-bold text-neutral-700 uppercase tracking-[0.2em]">
                          Shipping Details
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className={LABEL}>Full Name</label>
                            <input name="name" type="text" value={form.name} onChange={handleInput}
                              placeholder="Jean-Pierre Dupont"
                              className={`${INPUT} ${errors.name ? INPUT_ERR : INPUT_OK}`} />
                            <Err msg={errors.name} />
                          </div>
                          <div>
                            <label className={LABEL}>Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleInput}
                              placeholder="you@email.com"
                              className={`${INPUT} ${errors.email ? INPUT_ERR : INPUT_OK}`} />
                            <Err msg={errors.email} />
                          </div>
                        </div>

                        <div>
                          <label className={LABEL}>Delivery Address</label>
                          <input name="address" type="text" value={form.address} onChange={handleInput}
                            placeholder="12 Rue du Faubourg Saint-Honoré"
                            className={`${INPUT} ${errors.address ? INPUT_ERR : INPUT_OK}`} />
                          <Err msg={errors.address} />
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className={LABEL}>City</label>
                            <input name="city" type="text" value={form.city} onChange={handleInput}
                              placeholder="Paris"
                              className={`${INPUT} ${errors.city ? INPUT_ERR : INPUT_OK}`} />
                            <Err msg={errors.city} />
                          </div>
                          <div>
                            <label className={LABEL}>ZIP / Postal</label>
                            <input name="zip" type="text" value={form.zip} onChange={handleInput}
                              placeholder="75001"
                              className={`${INPUT} ${errors.zip ? INPUT_ERR : INPUT_OK}`} />
                            <Err msg={errors.zip} />
                          </div>
                        </div>
                      </div>
                    </section>

                    <div className="border-t border-neutral-100" />

                    {/* Payment */}
                    <section className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                        <CreditCard size={13} className="text-amber-800" strokeWidth={1.5} />
                        <h3 className="text-[9px] sm:text-[10px] font-bold text-neutral-700 uppercase tracking-[0.2em]">
                          Payment
                          <span className="ml-1.5 text-[8px] font-normal text-neutral-400 normal-case tracking-normal">
                            (Simulated sandbox)
                          </span>
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className={LABEL}>Card Number</label>
                          <input name="cardNumber" type="text" value={form.cardNumber} onChange={handleInput}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className={`${INPUT} font-mono tracking-[0.12em] ${errors.cardNumber ? INPUT_ERR : INPUT_OK}`} />
                          <Err msg={errors.cardNumber} />
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className={LABEL}>Expiry</label>
                            <input name="cardExpiry" type="text" value={form.cardExpiry} onChange={handleInput}
                              placeholder="MM / YY" maxLength={5}
                              className={`${INPUT} font-mono tracking-widest ${errors.cardExpiry ? INPUT_ERR : INPUT_OK}`} />
                            <Err msg={errors.cardExpiry} />
                          </div>
                          <div>
                            <label className={LABEL}>CVC</label>
                            <input name="cardCvc" type="password" value={form.cardCvc} onChange={handleInput}
                              placeholder="•••" maxLength={3}
                              className={`${INPUT} font-mono tracking-widest ${errors.cardCvc ? INPUT_ERR : INPUT_OK}`} />
                            <Err msg={errors.cardCvc} />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* SSL note */}
                    <div className="flex items-start gap-2.5 p-3 sm:p-3.5 bg-emerald-50 border border-emerald-100">
                      <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <p className="text-[8px] sm:text-[9px] text-emerald-700 leading-relaxed font-medium">
                        256-bit SSL encrypted connection. Demo sandbox — no real charges will be made.
                      </p>
                    </div>

                    {/* Hidden trigger for footer button */}
                    <input type="submit" id="__submit__" className="hidden" />
                    <div className="h-1" />
                  </motion.form>
                )}

                {/* ─── SUCCESS SCREEN ─── */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center px-5 sm:px-6 py-12 sm:py-16 min-h-[65vh] justify-center space-y-5"
                  >
                    {/* Check circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.08 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center"
                    >
                      <CheckCircle size={30} className="text-emerald-500" strokeWidth={1.5} />
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 }}
                      className="space-y-1.5"
                    >
                      <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-amber-800 font-bold uppercase block">
                        Merci — Thank You
                      </span>
                      <h3 className="text-lg sm:text-xl font-light text-neutral-900 uppercase tracking-[0.12em] font-serif">
                        Order Confirmed
                      </h3>
                      <p className="text-[10px] sm:text-xs text-neutral-500 font-light max-w-[230px] sm:max-w-xs leading-relaxed">
                        A master artisan will begin hand-crafting your piece tomorrow morning.
                      </p>
                    </motion.div>

                    {/* Order card */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38 }}
                      className="w-full max-w-[280px] sm:max-w-xs bg-white border border-stone-200 divide-y divide-stone-100 text-left"
                    >
                      {[
                        { label: 'Order No.', value: orderId, accent: false, bold: true },
                        { label: 'Dispatch', value: '5–7 Business Days', accent: true, bold: false },
                        { label: 'Carrier', value: 'DHL Express', accent: false, bold: false },
                      ].map(({ label, value, accent, bold }) => (
                        <div key={label} className="flex items-center justify-between px-3.5 py-2.5">
                          <span className="text-[7px] sm:text-[8px] text-neutral-400 uppercase tracking-wider font-mono">
                            {label}
                          </span>
                          <span className={`text-[9px] sm:text-[10px] font-mono ${
                            bold ? 'font-bold text-neutral-900'
                            : accent ? 'font-semibold text-amber-800'
                            : 'text-neutral-600'
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Star rating prompt */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.52 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <p className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider">
                        Your experience so far?
                      </p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} className="text-amber-400" fill="currentColor" />
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={onClose}
                      className="w-full max-w-[280px] sm:max-w-xs py-3.5 bg-neutral-900 hover:bg-amber-800 text-white text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.62 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Continue Browsing
                    </motion.button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ══ STICKY FOOTER ══ */}
            <AnimatePresence>
              {cartItems.length > 0 && step !== 'success' && (
                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 bg-white border-t border-neutral-100 shadow-[0_-6px_24px_rgba(0,0,0,0.07)] z-20"
                >
                  {/* Price rows */}
                  <div className="px-4 sm:px-5 pt-3.5 pb-2.5 space-y-2">
                    {[
                      { label: 'Subtotal', value: `$${subtotal.toLocaleString()}`, muted: false },
                      { label: 'Gift Packaging', value: packagingFee ? `+$${packagingFee}` : 'Declined', muted: true },
                      { label: 'Shipping', value: shippingFee === 0 ? 'Free ✦' : `$${shippingFee}`, muted: shippingFee === 0 },
                    ].map(({ label, value, muted }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider">{label}</span>
                        <span className={`text-[9px] sm:text-[10px] font-medium ${muted ? 'text-neutral-400' : 'text-neutral-700'}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-neutral-100 pt-2 flex justify-between items-center">
                      <span className="text-[9px] sm:text-[10px] font-bold text-neutral-700 uppercase tracking-wider">Total</span>
                      <span className="text-base sm:text-[18px] font-bold text-amber-800 tabular-nums font-mono">
                        ${grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    {step === 'cart' ? (
                      <motion.button
                        onClick={() => setStep('checkout')}
                        className="w-full py-3.5 sm:py-4 bg-neutral-900 hover:bg-amber-800 text-white text-[9px] sm:text-[10px] tracking-[0.22em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2"
                        whileTap={{ scale: 0.98 }}
                        id="to-checkout-btn"
                      >
                        <Lock size={11} strokeWidth={2.5} />
                        Proceed to Secure Checkout
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => document.getElementById('__submit__')?.click()}
                        className={`w-full py-3.5 sm:py-4 text-[9px] sm:text-[10px] tracking-[0.22em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                          isSubmitting
                            ? 'bg-amber-700 text-white cursor-wait'
                            : 'bg-amber-800 hover:bg-neutral-900 text-white'
                        }`}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        id="submit-order-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                              className="w-3.5 h-3.5 border-[2.5px] border-white/30 border-t-white rounded-full"
                            />
                            Processing Order...
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={12} strokeWidth={2.5} />
                            Confirm Order — ${grandTotal.toLocaleString()}
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}