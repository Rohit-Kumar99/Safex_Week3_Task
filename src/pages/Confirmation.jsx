import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  Package,
  Truck,
  MapPin,
  Calendar,
  FileText,
  Building,
  Phone,
  HardHat,
} from 'lucide-react';

export default function Confirmation() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  // Fallback demo order in case user directly refreshes or navigates to /confirmation
  const displayOrder = orderData || {
    orderNumber: `ORD-${Date.now().toString().slice(-6)}-4412`,
    date: new Date().toISOString(),
    customer: {
      fullName: 'Marcus Vance',
      companyName: 'Apex Structural Framing LLC',
      email: 'm.vance@apexstructural.com',
      phone: '216-555-0194',
      streetAddress: '1420 W 25th St, Tower Site Gate 3',
      city: 'Cleveland',
      postalCode: '44102',
      orderNotes: 'Deliver via West alley entrance. Forklift spotting needed for cement pallets.',
      paymentMethod: 'trade-account',
    },
    items: [
      {
        id: 'cem-01',
        product: {
          name: 'Portland Cement Type I/II High-Early Strength',
          sku: 'CEM-POR-94',
          unit: 'per 94 lb bag',
        },
        quantity: 10,
        price: 14.85,
      },
      {
        id: 'fst-01',
        product: {
          name: '3-1/2 Inch 16D Hot-Dip Galvanized Smooth Framing Nails',
          sku: 'FST-NAL-16DG',
          unit: 'per box (2,000 ct)',
        },
        quantity: 2,
        price: 68.50,
      }
    ],
    shippingMethod: 'flatbed',
    shippingCost: 75.00,
    estimatedTax: 23.55,
    subtotal: 285.50,
    grandTotal: 384.05,
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(displayOrder.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Confirmation Banner */}
      <div className="bg-industrial-900 border-l-4 border-l-emerald-500 border border-industrial-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Commercial Order Transmitted &amp; Committed
              </div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight mt-1">
                DISPATCH MANIFEST #{displayOrder.orderNumber}
              </h1>
              <p className="mt-1 text-xs font-mono text-industrial-400">
                Staged in Central Rail Yard Bay 04 • Logged: {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-industrial-850 hover:bg-industrial-800 border border-industrial-700 text-xs font-mono text-white uppercase transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Bill of Lading</span>
            </button>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-safety hover:bg-safety-hover border border-safety text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors"
            >
              <span>Back to Depot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Manifest Specification Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Destination Box */}
        <div className="p-5 bg-industrial-900 border border-industrial-800 space-y-2">
          <div className="flex items-center gap-2 text-safety font-bold uppercase pb-2 border-b border-industrial-800">
            <MapPin className="w-4 h-4" />
            <span>Jobsite Delivery Target</span>
          </div>
          <div className="text-white font-bold text-sm">
            {displayOrder.customer.fullName}
          </div>
          {displayOrder.customer.companyName && (
            <div className="text-industrial-300 font-medium">
              {displayOrder.customer.companyName}
            </div>
          )}
          <div className="text-industrial-400">
            {displayOrder.customer.streetAddress}
          </div>
          <div className="text-industrial-400">
            {displayOrder.customer.city}, OH {displayOrder.customer.postalCode}
          </div>
          <div className="text-industrial-400 pt-1">
            Phone: <strong className="text-white">{displayOrder.customer.phone}</strong>
          </div>
        </div>

        {/* Dispatch Logistics */}
        <div className="p-5 bg-industrial-900 border border-industrial-800 space-y-2">
          <div className="flex items-center gap-2 text-safety font-bold uppercase pb-2 border-b border-industrial-800">
            <Truck className="w-4 h-4" />
            <span>Logistics &amp; Rigging</span>
          </div>
          <div className="text-industrial-300">
            Method:{' '}
            <strong className="text-white">
              {displayOrder.shippingMethod === 'flatbed'
                ? 'Knuckle-Boom Flatbed Delivery'
                : 'Direct Depot Dock Pickup'}
            </strong>
          </div>
          <div className="text-industrial-300">
            Estimated Dispatch:{' '}
            <strong className="text-emerald-400">Same-Day Departure (Prior to 16:00)</strong>
          </div>
          <div className="text-industrial-300">
            Staging Depot:{' '}
            <strong className="text-white">Cleveland Rail Yard Bay 04</strong>
          </div>
          {displayOrder.customer.orderNotes && (
            <div className="pt-2 text-[11px] text-industrial-400 border-t border-industrial-800">
              <span className="text-safety uppercase">Site Note:</span> {displayOrder.customer.orderNotes}
            </div>
          )}
        </div>

        {/* Settlement Status */}
        <div className="p-5 bg-industrial-900 border border-industrial-800 space-y-2">
          <div className="flex items-center gap-2 text-safety font-bold uppercase pb-2 border-b border-industrial-800">
            <FileText className="w-4 h-4" />
            <span>Billing &amp; Audit Status</span>
          </div>
          <div className="text-industrial-300">
            Settlement Method:{' '}
            <strong className="text-white uppercase">
              {displayOrder.customer.paymentMethod.replace('-', ' ')}
            </strong>
          </div>
          <div className="text-industrial-300">
            Payment Status: <strong className="text-emerald-400">Authorized / Net 30 Invoiced</strong>
          </div>
          <div className="text-industrial-300">
            Invoice Dispatch: <strong className="text-white">{displayOrder.customer.email}</strong>
          </div>
          <div className="text-industrial-400 pt-2 text-[11px]">
            Tax Exemption / Resale certificates checked against Ohio trade registry.
          </div>
        </div>
      </div>

      {/* Itemized Materials Table */}
      <div className="mt-8 bg-industrial-900 border border-industrial-800 overflow-hidden">
        <div className="p-4 bg-industrial-950 border-b border-industrial-800 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Itemized Material Allocations
          </span>
          <span className="text-xs font-mono text-industrial-400">
            {displayOrder.items.length} Committed SKU Lines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-industrial-950/80 border-b border-industrial-800 text-industrial-400 uppercase">
              <tr>
                <th className="py-3 px-4">SKU / Item</th>
                <th className="py-3 px-4 text-center">Unit Price</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-800/80">
              {displayOrder.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-industrial-850/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{item.product.name}</div>
                    <div className="text-[11px] text-industrial-400">
                      SKU: {item.product.sku} • {item.product.unit}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-industrial-300">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-white">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-white">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Recap Footer */}
        <div className="p-6 bg-industrial-950/90 border-t border-industrial-800 font-mono text-xs">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-industrial-300">
              <span>Materials Subtotal:</span>
              <span className="text-white">${displayOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-industrial-300">
              <span>Flatbed / Yard Freight:</span>
              <span className="text-white">
                {displayOrder.shippingCost > 0 ? `$${displayOrder.shippingCost.toFixed(2)}` : 'FREE'}
              </span>
            </div>
            <div className="flex justify-between text-industrial-300">
              <span>State Commercial Tax (8.25%):</span>
              <span className="text-white">${displayOrder.estimatedTax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-industrial-800 flex justify-between text-sm font-bold">
              <span className="text-white uppercase">Total Authorized:</span>
              <span className="text-safety text-lg">${displayOrder.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
