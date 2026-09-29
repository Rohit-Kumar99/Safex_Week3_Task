import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  AlertTriangle,
  PackageX,
  Package,
  Layers,
  FileCheck,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem, getItemQuantity } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <PackageX className="w-16 h-16 text-safety mx-auto mb-4" />
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-wider">
          SKU Manifest Record Not Found
        </h1>
        <p className="mt-2 text-sm font-mono text-industrial-400">
          The requested item ID <code className="text-safety">"{id}"</code> does not exist in the active depot database.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-safety hover:bg-safety-hover text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Depot Catalog</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const currentInCart = getItemQuantity(product.id);
  const maxAddable = Math.max(0, product.stock - currentInCart);

  const handleAddToCart = () => {
    if (isOutOfStock || maxAddable <= 0) return;
    addItem(product, selectedQty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedQty(1);
    }, 1500);
  };

  // Related products from same category, excluding current product
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-8 overflow-x-auto pb-2">
        <Link to="/" className="hover:text-white transition-colors">
          Depot
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-white transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-white text-safety uppercase transition-colors">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-industrial-200 truncate">{product.sku}</span>
      </nav>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Product Image & Yard Bay (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[4/3] bg-industrial-950 border border-industrial-800 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent pointer-events-none" />

            {/* In-image stock badge */}
            <div className="absolute top-3 left-3">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase bg-red-950 text-red-400 border border-red-700">
                  <PackageX className="w-3.5 h-3.5" /> Out of Stock (Restock in 48h)
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase bg-amber-950 text-amber-400 border border-amber-600">
                  <AlertTriangle className="w-3.5 h-3.5" /> Low Yard Stock: {product.stock} Units Remaining
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase bg-industrial-900 text-industrial-200 border border-industrial-700">
                  <span className="w-2 h-2 bg-emerald-500 inline-block"></span>
                  Depot Available: {product.stock} Units
                </span>
              )}
            </div>
          </div>

          {/* Depot Staging Location Info Box */}
          <div className="p-4 bg-industrial-900 border border-industrial-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-industrial-400">
              <span>Yard Allocation Bay:</span>
              <strong className="text-white">{product.yardBay}</strong>
            </div>
            <div className="flex items-center justify-between text-industrial-400">
              <span>Estimated Shipping Weight:</span>
              <strong className="text-white">{product.weight}</strong>
            </div>
            <div className="flex items-center justify-between text-industrial-400">
              <span>Dispatch Cutoff:</span>
              <strong className="text-safety">{product.leadTime}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs, Pricing, Cart Action (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-industrial-400 mb-2">
              <span className="bg-industrial-850 px-2 py-0.5 border border-industrial-700 text-white font-bold">
                {product.sku}
              </span>
              <span>•</span>
              <span className="uppercase text-safety font-bold">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Trade pricing block */}
            <div className="mt-4 p-4 bg-industrial-900 border border-industrial-800 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm font-mono text-industrial-400">
                  {product.unit}
                </span>
              </div>

              <div className="text-right text-xs font-mono text-industrial-400">
                <div>Contractor Trade Pricing</div>
                <div className="text-industrial-300">Sales Tax calculated at checkout</div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 space-y-4 text-sm text-industrial-300 leading-relaxed font-sans">
              <p>{product.description}</p>
              {product.tradeNotes && (
                <div className="p-3 bg-industrial-950 border-l-2 border-safety text-xs font-mono text-industrial-300">
                  <strong className="text-safety uppercase">Contractor Field Note:</strong> {product.tradeNotes}
                </div>
              )}
            </div>

            {/* Add to Cart Control Bar */}
            <div className="mt-8 p-5 bg-industrial-900 border border-industrial-800">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {!isOutOfStock && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase text-industrial-400">
                      Order Units:
                    </span>
                    <QuantitySelector
                      quantity={selectedQty}
                      maxStock={maxAddable > 0 ? maxAddable : 1}
                      onChange={setSelectedQty}
                      disabled={maxAddable <= 0}
                      size="md"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || maxAddable <= 0}
                  className={`flex-1 py-3 px-6 text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all duration-150 border flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? 'bg-industrial-850 text-industrial-500 border-industrial-800 cursor-not-allowed'
                      : maxAddable <= 0
                      ? 'bg-industrial-850 text-amber-500 border-amber-900/50 cursor-not-allowed'
                      : justAdded
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-safety text-white border-safety hover:bg-safety-hover active:bg-safety-active focus:ring-2 focus:ring-safety'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Manifest ✓</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Backorder Only (0 in Yard)</span>
                  ) : maxAddable <= 0 ? (
                    <span>Max Depot Allocation Committed</span>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Commit {selectedQty} to Order Manifest</span>
                    </>
                  )}
                </button>
              </div>

              {/* In cart telemetry indicator */}
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-industrial-400 pt-3 border-t border-industrial-800/80">
                <span>
                  Currently in Cart: <strong className="text-white">{currentInCart}</strong> units
                </span>
                <span>
                  Remaining Available Depot Stock: <strong className={maxAddable < 5 ? 'text-safety' : 'text-white'}>{maxAddable}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="mt-8">
            <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider mb-3">
              Engineering &amp; Compliance Specifications
            </h3>
            <div className="border border-industrial-800 bg-industrial-950 divide-y divide-industrial-850 font-mono text-xs">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5">
                  <span className="text-industrial-400 font-bold uppercase">{spec.label}</span>
                  <span className="text-industrial-100">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products from Category */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-10 border-t border-industrial-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wider">
              Complementary {product.category.replace('-', ' ')} Materials
            </h2>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-mono text-safety hover:underline uppercase"
            >
              View Sector &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
