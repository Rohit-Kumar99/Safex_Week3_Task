import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Building,
  ShieldCheck,
  AlertTriangle,
  PackageOpen,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartLineItem from '../components/CartLineItem';

export default function Cart() {
  const { items, totalItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState('flatbed'); // 'flatbed' | 'pickup'

  const shippingCost = shippingMethod === 'flatbed' ? 75.00 : 0.00;
  const taxRate = 0.0825; // 8.25% standard commercial materials tax
  const estimatedTax = Math.round(subtotal * taxRate * 100) / 100;
  const grandTotal = Math.round((subtotal + shippingCost + estimatedTax) * 100) / 100;

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout', { state: { shippingMethod, shippingCost, estimatedTax, grandTotal } });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-industrial-900 border border-industrial-800 flex items-center justify-center mx-auto mb-6">
          <PackageOpen className="w-10 h-10 text-industrial-500" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-safety mb-2">
          Depot Order Status: Zero Allocation
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
          YOUR MATERIAL MANIFEST IS EMPTY
        </h1>
        <p className="mt-3 text-sm text-industrial-400 font-sans max-w-md mx-auto">
          No commercial aggregates, structural fasteners, or jobsite equipment have been committed to this order.
        </p>

        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-safety hover:bg-safety-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors border border-safety"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Depot Inventory (19 Items)</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-industrial-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-safety">
            Dispatch Queue Review
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mt-1">
            ACTIVE MATERIAL MANIFEST
          </h1>
          <p className="mt-1 text-xs font-mono text-industrial-400">
            {totalItems} total line units staged for commitment.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-industrial-900 border border-industrial-800 text-xs font-mono text-industrial-400 hover:text-red-400 hover:border-red-900 transition-colors w-fit"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Entire Manifest</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Line Items (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="space-y-3">
            {items.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center text-xs font-mono">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-industrial-400 hover:text-safety transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping Depot Inventory</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Logistics Options (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-industrial-900 border border-industrial-800 p-6 sticky top-24">
            <h2 className="text-lg font-heading font-bold text-white uppercase tracking-wider pb-3 border-b border-industrial-800">
              Order Financial Summary
            </h2>

            {/* Logistics Option Radio */}
            <div className="mt-4 pt-2">
              <label className="block text-xs font-mono uppercase text-industrial-400 mb-2">
                Fulfillment Logistics
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShippingMethod('flatbed')}
                  className={`w-full p-3 text-left border flex items-center justify-between transition-colors ${
                    shippingMethod === 'flatbed'
                      ? 'border-safety bg-industrial-850 text-white'
                      : 'border-industrial-800 bg-industrial-950 text-industrial-400 hover:border-industrial-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-safety shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-bold">Jobsite Flatbed Drop</div>
                      <div className="text-[10px] text-industrial-400">Knuckle-boom spot unloading</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-white">$75.00</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('pickup')}
                  className={`w-full p-3 text-left border flex items-center justify-between transition-colors ${
                    shippingMethod === 'pickup'
                      ? 'border-safety bg-industrial-850 text-white'
                      : 'border-industrial-800 bg-industrial-950 text-industrial-400 hover:border-industrial-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-safety shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-bold">Direct Depot Dock Pickup</div>
                      <div className="text-[10px] text-industrial-400">Rail Yard Bay 04 (Free)</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400">FREE</span>
                </button>
              </div>
            </div>

            {/* Calculation Lines */}
            <div className="mt-6 pt-4 border-t border-industrial-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-industrial-300">
                <span>Materials Subtotal:</span>
                <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-industrial-300">
                <span>Logistics / Freight:</span>
                <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'FREE (Depot)'}</span>
              </div>

              <div className="flex justify-between text-industrial-300">
                <span>Est. Commercial Tax (8.25%):</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-industrial-800 flex justify-between items-baseline">
                <span className="text-sm font-bold uppercase text-white">Estimated Total:</span>
                <span className="text-2xl font-black text-safety">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                disabled={items.length === 0}
                className="w-full py-3.5 px-4 bg-safety hover:bg-safety-hover disabled:bg-industrial-800 disabled:text-industrial-500 disabled:cursor-not-allowed text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-safety shadow-lg focus:ring-2 focus:ring-safety"
              >
                <span>Proceed to Jobsite Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Guarantee Tag */}
            <div className="mt-4 pt-4 border-t border-industrial-800 flex items-start gap-2 text-[11px] font-mono text-industrial-400">
              <ShieldCheck className="w-4 h-4 text-safety shrink-0 mt-0.5" />
              <span>Real-time yard inventory reservation active during checkout session.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
