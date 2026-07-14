import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ShieldCheck, Gift, CheckCircle } from 'lucide-react';
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
  
  // Checkout Form fields
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

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const packagingFee = isGiftWrapped ? 15 : 0;
  const shippingFee = subtotal > 500 ? 0 : 35;
  const grandTotal = subtotal + packagingFee + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email required';
    if (!formData.address.trim()) errors.address = 'Required';
    if (!formData.city.trim()) errors.city = 'Required';
    if (!formData.zip.trim() || formData.zip.length < 5) errors.zip = 'Valid ZIP required';
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Valid 16-digit card required';
    if (!formData.cardExpiry.trim()) errors.cardExpiry = 'Required';
    if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) errors.cardCvc = 'Required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomOrderId = 'UT-' + Math.floor(Math.random() * 900000 + 100000);
      setOrderId(randomOrderId);
      setCheckoutStep('success');
      onClearCart();
    }, 1500);
  };

  const resetDrawerState = () => {
    setCheckoutStep('cart');
    onClose();
  };

  // Helper to apply filters to cart list previews
  const getFilterStyle = (hex: string) => {
    switch (hex.toLowerCase()) {
      case '#1a1a1a': return 'brightness-[0.45] contrast-[1.2] grayscale';
      case '#3d2516': return 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]';
      case '#63251e': return 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]';
      case '#4d5c41': return 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]';
      case '#1d2a45': return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]';
      case '#be814e': return 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]';
      case '#d9531e': return 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]';
      case '#181e2b': return 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]';
      case '#8b8478': return 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]';
      case '#d9788e': return 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]';
      case '#1e2433': return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]';
      case '#233827': return 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]';
      default: return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={resetDrawerState}
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" 
      />

      {/* Cart Container */}
      <div className="relative w-full max-w-md bg-luxury-cream h-full shadow-2xl flex flex-col z-10 border-l border-luxury-sand">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-luxury-sand bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2 text-left">
            <ShoppingBag size={18} className="text-luxury-charcoal" />
            <h2 className="text-sm font-semibold text-luxury-charcoal uppercase tracking-[0.2em] font-sans">
              {checkoutStep === 'cart' ? 'YOUR SHOPPING BAG' : checkoutStep === 'checkout' ? 'SECURE CHECKOUT' : 'ORDER CONFIRMED'}
            </h2>
          </div>
          <button 
            onClick={resetDrawerState}
            className="p-1.5 text-gray-500 hover:text-luxury-orange rounded-full hover:bg-luxury-sand transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Screens */}
        <div className="flex-grow overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: Cart Items List */}
            {checkoutStep === 'cart' && (
              <motion.div
                key="cart-items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 h-full flex flex-col justify-between"
              >
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                    <ShoppingBag size={48} className="text-luxury-gold/50" strokeWidth={1} />
                    <h3 className="text-sm font-semibold text-luxury-charcoal uppercase tracking-wider">Your Bag is Empty</h3>
                    <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
                      Unique Tany wallets, handbags, and straps are tailored-to-order. Explore our collection to begin crafting your heirloom.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-luxury-charcoal text-white text-[10px] tracking-luxury uppercase font-medium hover:bg-luxury-orange transition-colors"
                    >
                      Browse Goods
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 flex-grow">
                    <ul className="divide-y divide-luxury-sand max-h-[380px] overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <li key={item.cartItemId} className="py-4 flex items-start space-x-4 text-left">
                          
                          {/* Item Image */}
                          <div className="w-16 h-16 bg-luxury-sand border border-luxury-sand overflow-hidden relative flex-shrink-0">
                            <img
                              src={item.selectedColor.imageUrl}
                              alt={item.product.name}
                              className="object-cover w-full h-full"
                              style={{ filter: getFilterStyle(item.selectedColor.hex) }}
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Item Info */}
                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between">
                              <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-wider font-sans leading-tight">
                                {item.product.name}
                              </h4>
                              <span className="text-xs font-semibold text-luxury-charcoal pl-2">
                                ${item.product.price * item.quantity}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                              Leather: {item.product.leatherType} ({item.selectedColor.name.split(' (')[0]})
                            </p>

                            {/* Customizations display */}
                            {item.customization && (
                              <div className="bg-luxury-sand/50 p-2 border border-luxury-sand rounded-xs text-[9px] text-gray-500 space-y-0.5 mt-1 font-mono">
                                <div>• STITCHING: {item.customization.stitching === 'tonal' ? 'Matching Tonal' : 'Ecru Linen'}</div>
                                {item.customization.hardware && <div>• HARDWARE: {item.customization.hardware}</div>}
                                {item.customization.monogramText && (
                                  <div>
                                    • MONOGRAM: <span className="font-bold text-luxury-charcoal font-serif">{item.customization.monogramText}</span> ({item.customization.foilColor.toUpperCase()})
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center space-x-1.5 border border-gray-200 bg-white px-1 py-0.5 rounded-sm">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="p-1 hover:text-luxury-orange"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="text-xs font-mono font-medium px-2">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                  className="p-1 hover:text-luxury-orange"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.cartItemId)}
                                className="text-gray-400 hover:text-red-500 p-1"
                                title="Remove item"
                              >
                                <Trash2 size={12} strokeWidth={1.5} />
                              </button>
                            </div>

                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Gift Wrapping Toggle */}
                    <div className="border-t border-b border-luxury-sand py-4 space-y-2 text-left">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-2.5">
                          <Gift size={16} className="text-luxury-orange mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-xs font-semibold text-luxury-charcoal uppercase tracking-wider">Premium Gift Packaging</h4>
                            <p className="text-[10px] text-gray-500 font-light leading-normal">
                              Presented in our signature warm orange box, nestled in acid-free tissue paper, and bound with customized dark brown silk ribbon.
                            </p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isGiftWrapped}
                          onChange={(e) => setIsGiftWrapped(e.target.checked)}
                          className="mt-1 accent-luxury-orange cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* SCREEN 2: Secure Checkout Form */}
            {checkoutStep === 'checkout' && (
              <motion.form
                key="checkout-form"
                onSubmit={handleSubmitCheckout}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 text-left"
              >
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider">Shipping Details</h3>
                  <div className="w-full h-px bg-luxury-sand" />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    />
                    {formErrors.name && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.name}</span>}
                  </div>

                  <div>
                    <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    />
                    {formErrors.email && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.email}</span>}
                  </div>

                  <div>
                    <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    />
                    {formErrors.address && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.address}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                      />
                      {formErrors.city && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.city}</span>}
                    </div>
                    <div>
                      <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">ZIP / Postal Code</label>
                      <input
                        type="text"
                        name="zip"
                        required
                        maxLength={6}
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                      />
                      {formErrors.zip && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.zip}</span>}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider">Payment Details (Simulated)</h3>
                  <div className="w-full h-px bg-luxury-sand" />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    />
                    {formErrors.cardNumber && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                      />
                      {formErrors.cardExpiry && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.cardExpiry}</span>}
                    </div>
                    <div>
                      <label className="text-[9px] tracking-widest text-gray-400 uppercase block mb-1">CVC Code</label>
                      <input
                        type="password"
                        name="cardCvc"
                        required
                        maxLength={3}
                        placeholder="•••"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                      />
                      {formErrors.cardCvc && <span className="text-[9px] text-red-500 font-medium font-mono">{formErrors.cardCvc}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 p-3 bg-luxury-sand text-[9px] text-gray-500 font-mono">
                  <ShieldCheck size={14} className="text-emerald-700 flex-shrink-0" />
                  <span>256-bit SSL secure simulated sandbox. No real funds will be processed.</span>
                </div>

                {/* Submit actions is handled by drawer footer */}
                <input type="submit" id="hidden-submit-btn" className="hidden" />
              </motion.form>
            )}

            {/* SCREEN 3: Success Screen */}
            {checkoutStep === 'success' && (
              <motion.div
                key="checkout-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-5 text-left h-full"
              >
                <CheckCircle size={54} className="text-emerald-700 animate-pulse" strokeWidth={1.5} />
                <div className="space-y-1.5">
                  <span className="text-[9px] tracking-[0.3em] text-luxury-gold-dark font-medium uppercase">Thank You</span>
                  <h3 className="text-xl font-normal text-luxury-charcoal uppercase tracking-wider font-serif">Order Confirmed</h3>
                  <p className="text-xs text-gray-500 font-light max-w-xs leading-relaxed">
                    Your bespoke leather pieces are now allocated in our system. A master artisan at our atelier will begin hand-crafting your items tomorrow morning.
                  </p>
                </div>

                <div className="bg-white p-4 border border-luxury-sand w-full space-y-2 rounded-xs">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">ORDER NUMBER:</span>
                    <span className="font-bold text-luxury-charcoal">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">EST. DISPATCH:</span>
                    <span className="font-semibold text-luxury-orange">IN 5-7 BUSINESS DAYS</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">CARRIER:</span>
                    <span className="font-medium text-gray-600">DHL Express Air Cargo</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 italic max-w-xs leading-normal">
                  A receipt and status updates with HD craftsmanship photos of your wallet during its stitching stages will be sent to your email.
                </p>

                <button
                  onClick={resetDrawerState}
                  className="w-full py-3.5 bg-luxury-charcoal hover:bg-luxury-orange text-white text-xs tracking-luxury uppercase font-medium transition-colors"
                >
                  Continue Browsing
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Pricing Summary & Checkout Button (Sticky Bottom) */}
        {cartItems.length > 0 && checkoutStep !== 'success' && (
          <div className="sticky bottom-0 bg-white border-t border-luxury-sand p-6 space-y-4 z-20 shadow-lg">
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-luxury-charcoal">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Signature Orange Packaging</span>
                <span className="font-medium text-luxury-charcoal">
                  {packagingFee === 0 ? 'Declined' : `$${packagingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="font-medium text-luxury-charcoal">
                  {shippingFee === 0 ? 'FREE (Orders over $500)' : `$${shippingFee}`}
                </span>
              </div>
              <div className="h-px bg-luxury-sand my-2" />
              <div className="flex justify-between text-sm font-semibold text-luxury-charcoal">
                <span>Total Estimé</span>
                <span className="text-base text-luxury-orange font-bold font-mono">${grandTotal}</span>
              </div>
            </div>

            {/* CTA action buttons */}
            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-4 bg-luxury-charcoal hover:bg-luxury-orange text-white text-xs tracking-luxury font-medium uppercase transition-colors flex items-center justify-center space-x-1.5 shadow-md"
                id="to-checkout-btn"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  type="button"
                  className="px-4 py-4 border border-gray-200 text-gray-500 hover:text-luxury-charcoal hover:border-luxury-charcoal text-xs tracking-luxury uppercase font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    const submitBtn = document.getElementById('hidden-submit-btn');
                    if (submitBtn) submitBtn.click();
                  }}
                  type="button"
                  disabled={isSubmitting}
                  className="flex-grow py-4 bg-luxury-orange text-white text-xs tracking-luxury font-medium uppercase hover:bg-luxury-charcoal transition-colors flex items-center justify-center space-x-2 shadow-md"
                  id="submit-order-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                      <span>ALLOCATING CRAFT HIDES...</span>
                    </>
                  ) : (
                    <span>CONFIRM ORDER OF CARDS & WALLETS</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
