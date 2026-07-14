import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, MessageSquare, Watch, Heart, HelpCircle, FileText } from 'lucide-react';

export default function CustomCommission() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'watch-strap',
    leather: 'Barenia Calfskin (Smooth Tan)',
    specifications: '',
    wristSize: '',
    lugWidth: '20mm',
    stitching: 'contrasting',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissionId, setCommissionId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = 'BESPOKE-' + Math.floor(Math.random() * 9000 + 1000);
      setCommissionId(randomId);
    }, 1200);
  };

  const handleReset = () => {
    setCommissionId('');
    setFormData({
      name: '',
      email: '',
      category: 'watch-strap',
      leather: 'Barenia Calfskin (Smooth Tan)',
      specifications: '',
      wristSize: '',
      lugWidth: '20mm',
      stitching: 'contrasting',
    });
  };

  return (
    <section className="bg-luxury-cream border-b border-luxury-sand py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-[10px] tracking-[0.4em] text-luxury-gold-dark font-medium uppercase block">
            Bespoke Tailoring on Measure
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-luxury-charcoal tracking-tight font-serif uppercase">
            Custom Commissions Atelier
          </h2>
          <div className="w-12 h-px bg-luxury-gold mx-auto my-3" />
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            Can’t find your perfect fit? Our watch straps are bespoke-tailored to suit your exact luxury watch model, lug specifications, and wrist circumference. Use this secure portal to coordinate directly with our master leathercraft artisan.
          </p>
        </div>

        <div className="bg-white border border-luxury-sand p-6 sm:p-10 shadow-sm text-left">
          <AnimatePresence mode="wait">
            {!commissionId ? (
              <motion.form
                key="commission-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="bespoke-commission-form"
              >
                {/* Name & Email Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-luxury text-gray-400 uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean-Paul Dupont"
                      className="w-full bg-luxury-cream border border-gray-200 text-xs px-3 py-2.5 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-luxury text-gray-400 uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jp@dupont.com"
                      className="w-full bg-luxury-cream border border-gray-200 text-xs px-3 py-2.5 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    />
                  </div>
                </div>

                {/* Categories and Leathers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-luxury text-gray-400 uppercase block mb-1">Product Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-luxury-cream border border-gray-200 text-xs px-3 py-2.5 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    >
                      <option value="watch-strap">Bespoke Watch Strap (Custom size/lug)</option>
                      <option value="wallet">Bespoke Folding Wallet or Cards case</option>
                      <option value="handbag">Bespoke Handbag dimensions amendments</option>
                      <option value="gift-accessories">Other Desk/Lifestyle leather accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-luxury text-gray-400 uppercase block mb-1">Select Hide and Grain</label>
                    <select
                      value={formData.leather}
                      onChange={(e) => setFormData({ ...formData, leather: e.target.value })}
                      className="w-full bg-luxury-cream border border-gray-200 text-xs px-3 py-2.5 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                    >
                      <option value="Barenia Calfskin (Smooth Tan)">Barenia Calfskin (Smooth, Rich Tan)</option>
                      <option value="Epsom Leather (Embossed Grain)">Epsom Cross-Grain Leather (Rigid & Scratch-proof)</option>
                      <option value="Togo Leather (Natural Pebbles)">Togo Drummed Calfskin (Pebbled, slouchy, soft)</option>
                      <option value="Chevre Goatskin (Finely Textured)">Mountain Chevre Goatskin (Lightweight & durable)</option>
                      <option value="Matte Alligator (Symmetrical scale)">Matte Glazed Alligator (Ultra-luxury selection)</option>
                    </select>
                  </div>
                </div>

                {/* Conditional Fields: Watch Strap measurements */}
                {formData.category === 'watch-strap' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-luxury-sand border border-luxury-sand space-y-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div>
                      <label className="text-[10px] tracking-luxury text-gray-500 uppercase block mb-1">Watch Lug Width</label>
                      <select
                        value={formData.lugWidth}
                        onChange={(e) => setFormData({ ...formData, lugWidth: e.target.value })}
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none"
                      >
                        <option value="18mm">18mm width</option>
                        <option value="19mm">19mm width</option>
                        <option value="20mm">20mm width (Standard luxury size)</option>
                        <option value="21mm">21mm width</option>
                        <option value="22mm">22mm width</option>
                        <option value="custom">Other custom specs (Describe below)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-luxury text-gray-500 uppercase block mb-1">Wrist Circumference (mm)</label>
                      <input
                        type="text"
                        required
                        value={formData.wristSize}
                        onChange={(e) => setFormData({ ...formData, wristSize: e.target.value })}
                        placeholder="E.g. 175mm or 7 inches"
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-luxury text-gray-500 uppercase block mb-1">Stitching Choice</label>
                      <select
                        value={formData.stitching}
                        onChange={(e) => setFormData({ ...formData, stitching: e.target.value })}
                        className="w-full bg-white border border-gray-200 text-xs px-3 py-2 text-luxury-charcoal focus:outline-none"
                      >
                        <option value="contrasting">Ecru Linen Stitching (Contrasting)</option>
                        <option value="tonal">Matching Tonal Stitching</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Additional Specifications */}
                <div>
                  <label className="text-[10px] tracking-luxury text-gray-400 uppercase block mb-1">
                    Describe your Custom requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    placeholder={
                      formData.category === 'watch-strap'
                        ? 'Please specify your watch brand (e.g. Omega Speedmaster, Rolex Submariner, Patek Philippe) and your preferred buckle color (Gold, Silver/Steel, or No buckle).'
                        : 'E.g., I would love a custom interior lining color (such as soft lambskin in Rose lipstick dye) and an extra pocket added to the interior panel of the wallet...'
                    }
                    className="w-full bg-luxury-cream border border-gray-200 text-xs px-3 py-2.5 text-luxury-charcoal focus:outline-none focus:border-luxury-charcoal leading-relaxed font-light"
                  />
                </div>

                {/* Signature Warning notes */}
                <div className="flex items-start space-x-2.5 p-3.5 bg-luxury-sand text-[10px] text-gray-500 leading-normal font-light">
                  <Watch size={16} className="text-luxury-tan flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Please note:</strong> Bespoke commissions represent tailored craftsmanship. Once hide selection and design schematics are finalized via direct email with our artisan, custom items are non-refundable and require 2 to 3 weeks of sewing, burnishing, and drying time before dispatch.
                  </span>
                </div>

                {/* Submit Action */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-luxury-charcoal hover:bg-luxury-orange text-white text-xs tracking-luxury font-medium uppercase transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto"
                    id="submit-bespoke-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                        <span>REGISTERING COMMISSION...</span>
                      </>
                    ) : (
                      <span>REGISTER CUSTOM COMMISSION INQUIRY</span>
                    )}
                  </button>
                </div>

              </motion.form>
            ) : (
              <motion.div
                key="commission-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-700 mx-auto">
                  <Check size={28} />
                </div>

                <div className="space-y-1.5 max-w-md">
                  <span className="text-[9px] tracking-[0.3em] text-luxury-gold-dark font-medium uppercase">Commission Registered</span>
                  <h3 className="text-xl font-normal text-luxury-charcoal uppercase tracking-wider font-serif">Awaiting Artisan Review</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Hello <strong className="text-luxury-charcoal">{formData.name}</strong>, your custom commission inquiry has been securely submitted to the Unique Tany leather-crafting registry.
                  </p>
                </div>

                <div className="bg-luxury-sand p-4 border border-luxury-sand w-full max-w-sm space-y-2 text-xs font-mono rounded-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">REGISTRY ID:</span>
                    <span className="font-bold text-luxury-charcoal">{commissionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CATEGORY:</span>
                    <span className="font-semibold text-luxury-charcoal uppercase">{formData.category.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">STATUS:</span>
                    <span className="font-bold text-luxury-orange">QUEUED FOR DIRECT EMAIL</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 italic max-w-xs leading-normal">
                  Our lead artisan, Tany, reviews bespoke requests every afternoon. We will email you detailed digital leather hide samples and sizing sketches within 24 hours.
                </p>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white text-[10px] tracking-luxury uppercase font-medium transition-all duration-300"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
