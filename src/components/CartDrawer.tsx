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

const INPUT_BASE =
  'w-full bg-white border text-xs px-3 py-2.5 text-neutral-800 focus:outline-none transition-all duration-300 placeholder:text-neutral-300';
const INPUT_NORMAL = 'border-neutral-200 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800/10';
const INPUT_ERROR = 'border-red-400 focus:border-red-500 bg-red-50/30';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isGiftWrapped, setIsGiftWrapped] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset step when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCheckoutStep('cart'), 300);
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const packagingFee = isGiftWrapped ? 15 : 0;
  const shippingFee = subtotal > 500 ? 0 : 35;
  const grandTotal = subtotal + packagingFee + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'cardNumber') {
      formatted = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();
    } else if (name === 'cardExpiry') {
      formatted = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/^(\d{2})(\d)/, '$1/$2');
    } else if (name === 'cardCvc') {
      formatted = value.replace(/\D/g, '').slice(0, 3);
    } else if (name === 'zip') {
      formatted = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData((prev) => ({ ...prev, [name]: formatted }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = 'Valid email required';
    if (!formData.address.trim()) errors.address = 'Delivery address required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.zip.trim() || formData.zip.length < 5)
      errors.zip = 'Valid ZIP/Postal code';
    if (formData.cardNumber.replace(/\s/g, '').length < 16)
      errors.cardNumber = 'Enter valid 16-digit card number';
    if (!formData.cardExpiry.trim() || formData.cardExpiry.length < 5)
      errors.cardExpiry = 'MM/YY format';
    if (!formData.cardCvc.trim() || formData.cardCvc.length < 3)
      errors.cardCvc = 'CVC required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId('UT-' + Math.floor(Math.random() * 900000 + 100000));
      setCheckoutStep('success');
      onClearCart();
    }, 1800);
  };

  const handleRemoveItem = useCallback(
    (id: string) => {
      setRemovingId(id);
      setTimeout(() => {
        onRemoveItem(id);
        setRemovingId(null);
      }, 350);
    },
    [onRemoveItem]
  );

  const resetDrawerState = () => {
    onClose();
  };

  const getFilterStyle = (hex: string) => {
    switch (hex.toLowerCase()) {
      case '#1a1a1a':
        return 'brightness-[0.45] contrast-[1.2] grayscale';
      case '#3d2516':
        return 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]';
      case '#63251e':
        return 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]';
      case '#4d5c41':
        return 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]';
      case '#1d2a45':
        return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]';
      case '#be814e':
        return 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]';
      case '#d9531e':
        return 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]';
      case '#181e2b':
        return 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]';
      case '#8b8478':
        return 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]';
      case '#d9788e':
        return 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]';
      case '#1e2433':
        return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]';
      case '#233827':
        return 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]';
      default:
        return '';
    }
  };

  const stepTitles = {
    cart: 'Shopping Bag',
    checkout: 'Secure Checkout',
    success: 'Order Confirmed',
  };

  const trustBadges = [
    { icon: Lock, text: '256-bit SSL' },
    { icon: Truck, text: 'Free over $500' },
    { icon: Package, text: 'Gift Wrapped' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={resetDrawerState}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="relative w-full max-w-[100vw] sm:max-w-sm md:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-neutral-100"
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-100 bg-white">
              <div className="flex items-center justify-between">
                {/* Left: back button or bag icon */}
                <div className="flex items-center gap-2.5 min-w-0">
                  {checkoutStep === 'checkout' ? (
                    <motion.button
                      onClick={() => setCheckoutStep('cart')}
                      className="p-1.5 -ml-1.5 text-neutral-400 hover:text-neutral-800 transition-colors rounded-full hover:bg-neutral-50"
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowLeft size={17} strokeWidth={1.5} />
                    </motion.button>
                  ) : (
                    <ShoppingBag
                      size={17}
                      className="text-neutral-600 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                  )}

                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-sm font-semibold text-neutral-800 uppercase tracking-[0.18em] leading-tight truncate">
                      {stepTitles[checkoutStep]}
                    </h2>
                    {checkoutStep === 'cart' && cartItems.length > 0 && (
                      <p className="text-[9px] text-neutral-400 tracking-wider mt-0.5">
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Step breadcrumb pills */}
                {checkoutStep !== 'success' && (
                  <div className="hidden sm:flex items-center gap-1.5 mx-4">
                    {(['cart', 'checkout'] as const).map((step, idx) => (
                      <React.Fragment key={step}>
                        <div
                          className={`text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full transition-colors duration-300 ${
                            checkoutStep === step
                              ? 'bg-neutral-900 text-white font-semibold'
                              : idx < ['cart', 'checkout'].indexOf(checkoutStep)
                              ? 'bg-emerald-100 text-emerald-700 font-medium'
                              : 'bg-neutral-100 text-neutral-400'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        {idx < 1 && (
                          <ChevronRight size={10} className="text-neutral-300" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                <motion.button
                  onClick={resetDrawerState}
                  className="p-2 -mr-1 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50 transition-all duration-300 rounded-full flex-shrink-0"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* ── Scrollable Content ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">

                {/* ── SCREEN 1: Cart ── */}
                {checkoutStep === 'cart' && (
                  <motion.div
                    key="cart-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    {cartItems.length === 0 ? (
                      /* Empty State */
                      <div className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24 space-y-4 min-h-[60vh]">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center">
                          <ShoppingBag
                            size={28}
                            className="text-neutral-300"
                            strokeWidth={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider">
                            Your Bag is Empty
                          </h3>
                          <p className="text-[11px] sm:text-xs text-neutral-400 font-light max-w-[220px] leading-relaxed">
                            Explore our collection to begin crafting your heirloom leather piece.
                          </p>
                        </div>
                        <motion.button
                          onClick={onClose}
                          className="mt-2 px-6 py-3 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-amber-800 transition-colors duration-300 active:scale-[0.97]"
                          whileTap={{ scale: 0.97 }}
                        >
                          Browse Collection
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {/* Cart Items */}
                        <ul className="divide-y divide-neutral-50 px-4 sm:px-5">
                          <AnimatePresence>
                            {cartItems.map((item) => (
                              <motion.li
                                key={item.cartItemId}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{
                                  opacity: removingId === item.cartItemId ? 0 : 1,
                                  x: removingId === item.cartItemId ? 40 : 0,
                                  height: removingId === item.cartItemId ? 0 : 'auto',
                                }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35 }}
                                className="py-4 sm:py-5 flex items-start gap-3 sm:gap-4 overflow-hidden"
                              >
                                {/* Image */}
                                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.selectedColor.imageUrl}
                                    alt={item.product.name}
                                    className="object-cover w-full h-full"
                                    style={{
                                      filter: getFilterStyle(item.selectedColor.hex),
                                    }}
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0 space-y-1.5 text-left">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider leading-snug truncate">
                                      {item.product.name}
                                    </h4>
                                    <span className="text-xs font-semibold text-neutral-900 flex-shrink-0">
                                      ${(item.product.price * item.quantity).toLocaleString()}
                                    </span>
                                  </div>

                                  <p className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
                                    {item.product.leatherType} •{' '}
                                    {item.selectedColor.name.split(' (')[0]}
                                  </p>

                                  {/* Customizations */}
                                  {item.customization && (
                                    <div className="bg-stone-50 border border-stone-100 px-2.5 py-2 text-[8px] sm:text-[9px] text-neutral-500 space-y-0.5 font-mono">
                                      <div>
                                        Stitch:{' '}
                                        {item.customization.stitching === 'tonal'
                                          ? 'Tonal Match'
                                          : 'Ecru Linen'}
                                      </div>
                                      {item.customization.hardware && (
                                        <div>Hardware: {item.customization.hardware}</div>
                                      )}
                                      {item.customization.monogramText && (
                                        <div>
                                          Monogram:{' '}
                                          <span className="font-bold text-neutral-800 font-serif">
                                            {item.customization.monogramText}
                                          </span>{' '}
                                          ({item.customization.foilColor})
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Qty + Remove */}
                                  <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center border border-neutral-200 bg-white">
                                      <motion.button
                                        onClick={() =>
                                          onUpdateQuantity(
                                            item.cartItemId,
                                            item.quantity - 1
                                          )
                                        }
                                        disabled={item.quantity <= 1}
                                        className="p-1.5 sm:p-2 text-neutral-400 hover:text-neutral-800 disabled:opacity-30 transition-colors"
                                        whileTap={{ scale: 0.85 }}
                                      >
                                        <Minus size={10} />
                                      </motion.button>
                                      <span className="text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 text-neutral-800 min-w-[28px] text-center tabular-nums">
                                        {item.quantity}
                                      </span>
                                      <motion.button
                                        onClick={() =>
                                          onUpdateQuantity(
                                            item.cartItemId,
                                            item.quantity + 1
                                          )
                                        }
                                        disabled={item.quantity >= 5}
                                        className="p-1.5 sm:p-2 text-neutral-400 hover:text-neutral-800 disabled:opacity-30 transition-colors"
                                        whileTap={{ scale: 0.85 }}
                                      >
                                        <Plus size={10} />
                                      </motion.button>
                                    </div>

                                    <motion.button
                                      onClick={() =>
                                        handleRemoveItem(item.cartItemId)
                                      }
                                      className="p-1.5 sm:p-2 text-neutral-300 hover:text-red-500 transition-colors rounded-sm hover:bg-red-50"
                                      whileTap={{ scale: 0.85 }}
                                    >
                                      <Trash2 size={13} strokeWidth={1.5} />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>

                        {/* Gift Packaging Toggle */}
                        <div className="mx-4 sm:mx-5 my-3 border border-stone-100 bg-stone-50">
                          <label className="flex items-start gap-3 p-3 sm:p-4 cursor-pointer group">
                            <div className="flex-shrink-0 mt-0.5">
                              <div
                                className={`w-4.5 h-4.5 sm:w-5 sm:h-5 border rounded-sm flex items-center justify-center transition-all duration-300 ${
                                  isGiftWrapped
                                    ? 'bg-amber-800 border-amber-800'
                                    : 'border-neutral-300 group-hover:border-neutral-500'
                                }`}
                                onClick={() => setIsGiftWrapped(!isGiftWrapped)}
                              >
                                <AnimatePresence>
                                  {isGiftWrapped && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                    >
                                      <CheckCircle
                                        size={11}
                                        className="text-white"
                                        strokeWidth={3}
                                      />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <Gift
                                    size={13}
                                    className="text-amber-800"
                                    strokeWidth={1.5}
                                  />
                                  <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                                    Premium Gift Packaging
                                  </h4>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 ml-2">
                                  +$15
                                </span>
                              </div>
                              <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light leading-relaxed mt-1">
                                Signature orange box, acid-free tissue & dark brown silk ribbon.
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-4 sm:gap-6 px-4 py-3 border-t border-neutral-50">
                          {trustBadges.map(({ icon: Icon, text }) => (
                            <div
                              key={text}
                              className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider"
                            >
                              <Icon
                                size={11}
                                className="text-neutral-300"
                                strokeWidth={1.5}
                              />
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── SCREEN 2: Checkout Form ── */}
                {checkoutStep === 'checkout' && (
                  <motion.form
                    key="checkout-form"
                    onSubmit={handleSubmitCheckout}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="p-4 sm:p-5 space-y-5 text-left"
                    noValidate
                  >
                    {/* Shipping Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Truck size={14} className="text-amber-800" strokeWidth={1.5} />
                        <h3 className="text-[10px] sm:text-xs font-bold text-neutral-800 uppercase tracking-[0.18em]">
                          Shipping Details
                        </h3>
                      </div>

                      <div className="space-y-2.5">
                        {/* Full Name */}
                        <div>
                          <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Jean-Pierre Dupont"
                            className={`${INPUT_BASE} ${formErrors.name ? INPUT_ERROR : INPUT_NORMAL}`}
                          />
                          {formErrors.name && (
                            <p className="text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className={`${INPUT_BASE} ${formErrors.email ? INPUT_ERROR : INPUT_NORMAL}`}
                          />
                          {formErrors.email && (
                            <p className="text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Address */}
                        <div>
                          <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                            Delivery Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="12 Rue du Faubourg Saint-Honoré"
                            className={`${INPUT_BASE} ${formErrors.address ? INPUT_ERROR : INPUT_NORMAL}`}
                          />
                          {formErrors.address && (
                            <p className="text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                              {formErrors.address}
                            </p>
                          )}
                        </div>

                        {/* City + ZIP */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Paris"
                              className={`${INPUT_BASE} ${formErrors.city ? INPUT_ERROR : INPUT_NORMAL}`}
                            />
                            {formErrors.city && (
                              <p className="text-[8px] text-red-500 mt-1">
                                {formErrors.city}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                              ZIP / Postal
                            </label>
                            <input
                              type="text"
                              name="zip"
                              value={formData.zip}
                              onChange={handleInputChange}
                              placeholder="75001"
                              className={`${INPUT_BASE} ${formErrors.zip ? INPUT_ERROR : INPUT_NORMAL}`}
                            />
                            {formErrors.zip && (
                              <p className="text-[8px] text-red-500 mt-1">
                                {formErrors.zip}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-neutral-100" />

                    {/* Payment Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard size={14} className="text-amber-800" strokeWidth={1.5} />
                        <h3 className="text-[10px] sm:text-xs font-bold text-neutral-800 uppercase tracking-[0.18em]">
                          Payment Details
                          <span className="text-neutral-400 font-normal ml-1.5 normal-case tracking-normal text-[8px]">
                            (Simulated)
                          </span>
                        </h3>
                      </div>

                      <div className="space-y-2.5">
                        {/* Card Number */}
                        <div>
                          <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className={`${INPUT_BASE} font-mono tracking-widest ${formErrors.cardNumber ? INPUT_ERROR : INPUT_NORMAL}`}
                          />
                          {formErrors.cardNumber && (
                            <p className="text-[8px] sm:text-[9px] text-red-500 mt-1 font-medium">
                              {formErrors.cardNumber}
                            </p>
                          )}
                        </div>

                        {/* Expiry + CVC */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                              Expiry
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`${INPUT_BASE} font-mono tracking-widest ${formErrors.cardExpiry ? INPUT_ERROR : INPUT_NORMAL}`}
                            />
                            {formErrors.cardExpiry && (
                              <p className="text-[8px] text-red-500 mt-1">
                                {formErrors.cardExpiry}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-medium">
                              CVC
                            </label>
                            <input
                              type="password"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                              placeholder="•••"
                              maxLength={3}
                              className={`${INPUT_BASE} font-mono tracking-widest ${formErrors.cardCvc ? INPUT_ERROR : INPUT_NORMAL}`}
                            />
                            {formErrors.cardCvc && (
                              <p className="text-[8px] text-red-500 mt-1">
                                {formErrors.cardCvc}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Note */}
                    <div className="flex items-start gap-2.5 p-3 bg-emerald-50 border border-emerald-100">
                      <ShieldCheck
                        size={15}
                        className="text-emerald-700 flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <p className="text-[8px] sm:text-[9px] text-emerald-700 font-medium leading-relaxed">
                        256-bit SSL encrypted. This is a demo sandbox — no real payment processed.
                      </p>
                    </div>

                    {/* Hidden submit trigger */}
                    <input type="submit" id="hidden-submit-btn" className="hidden" />

                    {/* Bottom spacer for fixed footer */}
                    <div className="h-2" />
                  </motion.form>
                )}

                {/* ── SCREEN 3: Success ── */}
                {checkoutStep === 'success' && (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center text-center px-5 sm:px-6 py-12 sm:py-16 space-y-5 min-h-[70vh]"
                  >
                    {/* Animated check */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 16, stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center"
                    >
                      <CheckCircle
                        size={32}
                        className="text-emerald-600"
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-amber-800 font-semibold uppercase block">
                        Merci — Thank You
                      </span>
                      <h3 className="text-lg sm:text-xl font-normal text-neutral-900 uppercase tracking-wider font-serif">
                        Order Confirmed
                      </h3>
                      <p className="text-[10px] sm:text-xs text-neutral-500 font-light max-w-[240px] sm:max-w-xs leading-relaxed">
                        A master artisan at our atelier will begin hand-crafting your piece tomorrow morning.
                      </p>
                    </motion.div>

                    {/* Order details card */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="bg-white border border-stone-200 w-full max-w-xs space-y-3 p-4 text-left"
                    >
                      {[
                        {
                          label: 'Order Number',
                          value: orderId,
                          className: 'font-bold text-neutral-900 text-xs',
                        },
                        {
                          label: 'Est. Dispatch',
                          value: '5–7 Business Days',
                          className: 'text-amber-800 font-semibold text-[10px] sm:text-xs',
                        },
                        {
                          label: 'Carrier',
                          value: 'DHL Express Air Cargo',
                          className: 'text-neutral-600 text-[10px] sm:text-xs',
                        },
                      ].map(({ label, value, className }) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-[8px] sm:text-[9px] text-neutral-400 uppercase tracking-wider font-mono">
                            {label}
                          </span>
                          <span className={`font-mono ${className}`}>{value}</span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      className="text-[9px] sm:text-[10px] text-neutral-400 italic max-w-[230px] sm:max-w-xs leading-relaxed"
                    >
                      A receipt and craftsmanship progress photos will be sent to your email.
                    </motion.p>

                    <motion.button
                      onClick={resetDrawerState}
                      className="w-full max-w-xs py-3.5 bg-neutral-900 hover:bg-amber-800 text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 active:scale-[0.98]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Continue Browsing
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Sticky Footer ── */}
            <AnimatePresence>
              {cartItems.length > 0 && checkoutStep !== 'success' && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="flex-shrink-0 bg-white border-t border-neutral-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-20"
                >
                  {/* Price Breakdown */}
                  <div className="px-4 sm:px-5 pt-4 pb-3 space-y-2">
                    {[
                      {
                        label: 'Subtotal',
                        value: `$${subtotal.toLocaleString()}`,
                        subtle: false,
                      },
                      {
                        label: 'Gift Packaging',
                        value: packagingFee === 0 ? 'Declined' : `+$${packagingFee}`,
                        subtle: true,
                      },
                      {
                        label: 'Shipping',
                        value:
                          shippingFee === 0
                            ? 'Free'
                            : `$${shippingFee}`,
                        subtle: shippingFee === 0,
                      },
                    ].map(({ label, value, subtle }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">
                          {label}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs font-medium ${
                            subtle ? 'text-neutral-400' : 'text-neutral-700'
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-neutral-100 pt-2.5 flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs text-neutral-600 uppercase tracking-wider font-semibold">
                        Total
                      </span>
                      <span className="text-base sm:text-lg font-bold text-amber-800 font-mono tabular-nums">
                        ${grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    {checkoutStep === 'cart' ? (
                      <motion.button
                        onClick={() => setCheckoutStep('checkout')}
                        className="w-full py-3.5 sm:py-4 bg-neutral-900 hover:bg-amber-800 text-white text-[10px] sm:text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                        id="to-checkout-btn"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Lock size={12} strokeWidth={2} />
                        <span>Proceed to Secure Checkout</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => {
                          const btn = document.getElementById('hidden-submit-btn');
                          if (btn) btn.click();
                        }}
                        disabled={isSubmitting}
                        className={`w-full py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] ${
                          isSubmitting
                            ? 'bg-amber-700 text-white cursor-wait'
                            : 'bg-amber-800 hover:bg-neutral-900 text-white'
                        }`}
                        id="submit-order-btn"
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Processing Order...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={13} strokeWidth={2} />
                            <span>Confirm Order — ${grandTotal.toLocaleString()}</span>
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