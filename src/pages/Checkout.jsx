import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ShieldCheck,
  Truck,
  Building,
  CreditCard,
  FileText,
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft,
  HardHat,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartLineItem from '../components/CartLineItem';

// Zod Validation Schema for Contractor Checkout
const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name or contractor representative name is required (min 3 chars)'),
  companyName: z.string().optional(),
  email: z
    .string()
    .min(1, 'Commercial email is required')
    .email('Please enter a valid business email address (e.g. name@contracting.com)'),
  phone: z
    .string()
    .min(1, 'Jobsite contact phone is required')
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      'Please enter a valid 10-digit phone number (e.g. 555-123-4567)'
    ),
  streetAddress: z
    .string()
    .min(5, 'Delivery or staging street address is required (min 5 chars)'),
  city: z
    .string()
    .min(2, 'City or municipality is required'),
  postalCode: z
    .string()
    .min(1, 'Postal or ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Postal code must be a valid 5-digit ZIP code (e.g. 44102)'),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(['trade-account', 'card-on-file', 'dock-cod'], {
    required_error: 'Select a trade payment settlement method',
  }),
});

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Retrieve logistics passed from Cart or fallback
  const passedShippingMethod = location.state?.shippingMethod || 'flatbed';
  const shippingCost = passedShippingMethod === 'flatbed' ? 75.00 : 0.00;
  const taxRate = 0.0825;
  const estimatedTax = Math.round(subtotal * taxRate * 100) / 100;
  const grandTotal = Math.round((subtotal + shippingCost + estimatedTax) * 100) / 100;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      orderNotes: '',
      paymentMethod: 'trade-account',
    },
  });

  // Edge case #3 guard: Direct navigation with empty cart is blocked
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="p-6 bg-industrial-900 border border-industrial-800">
          <AlertCircle className="w-12 h-12 text-safety mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-black text-white uppercase tracking-wider">
            Checkout Manifest Access Denied: Cart Is Empty
          </h1>
          <p className="mt-2 text-sm font-mono text-industrial-400">
            Cannot initialize a settlement session without committed materials in your order.
          </p>
          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-safety hover:bg-safety-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Depot Inventory</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = (formData) => {
    setIsSubmitting(true);

    /*
     * REAL-WORLD INTEGRATION POINT:
     * -------------------------------------------------------------
     * In a production environment with an ERP or payment provider
     * (e.g., Stripe Custom, QuickBooks Commerce, SAP Ariba):
     *
     * const response = await fetch('/api/orders/create', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({
     *     customer: formData,
     *     items: items,
     *     logistics: { method: passedShippingMethod, cost: shippingCost },
     *     total: grandTotal,
     *   })
     * });
     * const result = await response.json();
     * -------------------------------------------------------------
     */

    // Simulate network latency and order authorization
    setTimeout(() => {
      // Generate realistic commercial order confirmation manifest
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderData = {
        orderNumber,
        date: new Date().toISOString(),
        customer: formData,
        items: [...items],
        shippingMethod: passedShippingMethod,
        shippingCost,
        estimatedTax,
        subtotal,
        grandTotal,
      };

      // Clear the cart per spec on successful submission
      clearCart();
      setIsSubmitting(false);

      // Navigate to real confirmation route
      navigate('/confirmation', { state: { orderData }, replace: true });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="mb-8 pb-4 border-b border-industrial-800">
        <div className="text-xs font-mono uppercase tracking-widest text-safety">
          Jobsite Settlement &amp; Dispatch Routing
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mt-1">
          CONTRACTOR CHECKOUT MANIFEST
        </h1>
        <p className="mt-1 text-xs font-mono text-industrial-400">
          Verify delivery location and contractor credentials. All orders recorded in Depot Audit Log.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
            {/* Fieldset 1: Contact Identity */}
            <div className="p-6 bg-industrial-900 border border-industrial-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-industrial-800">
                <HardHat className="w-4 h-4 text-safety" />
                <h2 className="text-base font-heading font-bold text-white uppercase tracking-wider">
                  1. Contractor &amp; Representative Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                    Representative Full Name <span className="text-safety">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Marcus Vance"
                    {...register('fullName')}
                    className={`w-full bg-industrial-950 border px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-industrial-700 focus:border-safety'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[11px] font-mono text-red-400">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                    Contracting Business / Firm Name <span className="text-industrial-500">(Optional)</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="e.g. Apex Structural Framing LLC"
                    {...register('companyName')}
                    className="w-full bg-industrial-950 border border-industrial-700 px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none focus:border-safety transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                    Commercial Email Address <span className="text-safety">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="rep@contracting.com"
                    {...register('email')}
                    className={`w-full bg-industrial-950 border px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-industrial-700 focus:border-safety'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] font-mono text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                    Jobsite Contact Phone <span className="text-safety">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="216-555-0194"
                    {...register('phone')}
                    className={`w-full bg-industrial-950 border px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-industrial-700 focus:border-safety'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] font-mono text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Fieldset 2: Delivery & Jobsite Staging */}
            <div className="p-6 bg-industrial-900 border border-industrial-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-industrial-800">
                <Truck className="w-4 h-4 text-safety" />
                <h2 className="text-base font-heading font-bold text-white uppercase tracking-wider">
                  2. Destination &amp; Jobsite Staging Address
                </h2>
              </div>

              {/* Street Address */}
              <div>
                <label htmlFor="streetAddress" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                  Jobsite Street Address or Depot Staging Lane <span className="text-safety">*</span>
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  placeholder="e.g. 1420 W 25th St, Tower Site Gate 3"
                  {...register('streetAddress')}
                  className={`w-full bg-industrial-950 border px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none transition-colors ${
                    errors.streetAddress ? 'border-red-500 focus:border-red-500' : 'border-industrial-700 focus:border-safety'
                  }`}
                />
                {errors.streetAddress && (
                  <p className="mt-1 text-[11px] font-mono text-red-400">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                    City <span className="text-safety">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Cleveland"
                    {...register('city')}
                    className={`w-full bg-industrial-950 border px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none transition-colors ${
                      errors.city ? 'border-red-500 focus:border-red-500' : 'border-industrial-700 focus:border-safety'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-[11px] font-mono text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                    5-Digit Postal / ZIP Code <span className="text-safety">*</span>
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    maxLength={10}
                    placeholder="44102"
                    {...register('postalCode')}
                    className={`w-full bg-industrial-950 border px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none transition-colors ${
                      errors.postalCode ? 'border-red-500 focus:border-red-500' : 'border-industrial-700 focus:border-safety'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-[11px] font-mono text-red-400">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label htmlFor="orderNotes" className="block text-xs font-mono uppercase text-industrial-300 mb-1">
                  Jobsite Crane Clearances / Delivery Gate Instructions <span className="text-industrial-500">(Optional)</span>
                </label>
                <textarea
                  id="orderNotes"
                  rows={3}
                  placeholder="e.g. Knuckle-boom clearance available from West alley. Ring site superintendent on arrival."
                  {...register('orderNotes')}
                  className="w-full bg-industrial-950 border border-industrial-700 px-3 py-2 text-xs font-mono text-white placeholder-industrial-600 focus:outline-none focus:border-safety transition-colors"
                />
              </div>
            </div>

            {/* Fieldset 3: Payment Settlement Terms */}
            <div className="p-6 bg-industrial-900 border border-industrial-800 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-industrial-800">
                <CreditCard className="w-4 h-4 text-safety" />
                <h2 className="text-base font-heading font-bold text-white uppercase tracking-wider">
                  3. Commercial Settlement Method
                </h2>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-industrial-950 border border-industrial-800 hover:border-industrial-700 cursor-pointer">
                  <input
                    type="radio"
                    value="trade-account"
                    {...register('paymentMethod')}
                    className="accent-safety"
                  />
                  <div className="font-mono text-xs">
                    <div className="font-bold text-white">Commercial Trade Account (Net 30 Invoicing)</div>
                    <div className="text-industrial-400 text-[11px]">Billed to approved contractor line of credit.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-industrial-950 border border-industrial-800 hover:border-industrial-700 cursor-pointer">
                  <input
                    type="radio"
                    value="card-on-file"
                    {...register('paymentMethod')}
                    className="accent-safety"
                  />
                  <div className="font-mono text-xs">
                    <div className="font-bold text-white">Commercial Purchasing Card on File</div>
                    <div className="text-industrial-400 text-[11px]">Immediate card authorization on dispatch.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-industrial-950 border border-industrial-800 hover:border-industrial-700 cursor-pointer">
                  <input
                    type="radio"
                    value="dock-cod"
                    {...register('paymentMethod')}
                    className="accent-safety"
                  />
                  <div className="font-mono text-xs">
                    <div className="font-bold text-white">Depot Dock Cashier (Pickup Settlement)</div>
                    <div className="text-industrial-400 text-[11px]">Pay upon physical material release at Bay 04.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Action Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-4 px-6 bg-safety hover:bg-safety-hover disabled:bg-industrial-800 disabled:text-industrial-500 disabled:cursor-not-allowed text-white text-sm font-mono font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-3 border border-safety shadow-xl focus:ring-2 focus:ring-safety"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Committing Material Allocation &amp; Authorizing Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize &amp; Place Commercial Order (${grandTotal.toFixed(2)})</span>
                  </>
                )}
              </button>

              <p className="mt-2 text-center text-[11px] font-mono text-industrial-500">
                By submitting this order manifest, contractor agrees to Depot Terms of Commercial Trade and freight acceptance protocols.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Review (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-industrial-900 border border-industrial-800 p-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
              <h2 className="text-lg font-heading font-bold text-white uppercase tracking-wider">
                Manifest Review
              </h2>
              <Link to="/cart" className="text-xs font-mono text-safety hover:underline">
                Edit Manifest
              </Link>
            </div>

            {/* Miniature Item List */}
            <div className="mt-4 max-h-72 overflow-y-auto divide-y divide-industrial-800/80 pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs font-mono">
                  <div className="min-w-0 pr-3">
                    <div className="text-white font-bold truncate">{item.product.name}</div>
                    <div className="text-industrial-400 text-[11px]">
                      {item.quantity} × ${item.price.toFixed(2)} ({item.product.unit})
                    </div>
                  </div>
                  <div className="text-white font-bold shrink-0">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="mt-6 pt-4 border-t border-industrial-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-industrial-300">
                <span>Materials Total:</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-industrial-300">
                <span>Selected Logistics:</span>
                <span>
                  {passedShippingMethod === 'flatbed' ? 'Jobsite Flatbed ($75.00)' : 'Depot Dock Pickup (FREE)'}
                </span>
              </div>

              <div className="flex justify-between text-industrial-300">
                <span>Sales Tax (8.25%):</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-industrial-800 flex justify-between items-baseline">
                <span className="text-sm font-bold uppercase text-white">Total Authorization:</span>
                <span className="text-2xl font-black text-safety">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Depot Verification Notice */}
            <div className="mt-6 p-3 bg-industrial-950 border border-industrial-800 text-[11px] font-mono text-industrial-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-safety shrink-0 mt-0.5" />
              <span>
                Inventory lock is held for 15 minutes. Once placed, materials are staged immediately in Bay 04.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
