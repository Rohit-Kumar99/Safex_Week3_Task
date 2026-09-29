import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, AlertTriangle, PackageX, Layers, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';

export default function ProductCard({ product }) {
  const { addItem, getItemQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const currentInCart = getItemQuantity(product.id);
  const remainingStock = Math.max(0, product.stock - currentInCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem(product, selectedQty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedQty(1);
    }, 1500);
  };

  return (
    <article className="group bg-industrial-900 border border-industrial-800 hover:border-industrial-600 transition-all duration-150 flex flex-col justify-between relative overflow-hidden">
      {/* Top Technical Metadata Bar */}
      <div className="p-3 border-b border-industrial-800/80 bg-industrial-950/60 flex items-center justify-between text-xs font-mono text-industrial-400">
        <span className="tracking-wider">{product.sku}</span>
        <span className="uppercase text-[11px] px-1.5 py-0.5 bg-industrial-850 border border-industrial-700 text-industrial-300">
          {product.yardBay.split('—')[0].trim()}
        </span>
      </div>

      {/* Product Image & Stock Badge Overlay */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] bg-industrial-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/90 via-transparent to-transparent pointer-events-none" />

        {/* Stock Status Badge */}
        <div className="absolute top-2 left-2 z-10">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-bold uppercase bg-red-950/90 text-red-400 border border-red-700/60">
              <PackageX className="w-3 h-3" /> Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-bold uppercase bg-amber-950/90 text-amber-400 border border-amber-600/70">
              <AlertTriangle className="w-3 h-3" /> Low Stock: {product.stock} Left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-bold uppercase bg-industrial-900/90 text-industrial-300 border border-industrial-700">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none inline-block"></span>
              Yard Stock: {product.stock}
            </span>
          )}
        </div>

        {/* Quick view arrow */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-industrial-900/90 p-1.5 border border-industrial-700 text-industrial-200">
          <ArrowUpRight className="w-4 h-4 text-safety" />
        </div>
      </Link>

      {/* Main Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider font-mono text-safety mb-1">
            {product.category.replace('-', ' ')}
          </div>

          <h2 className="text-lg font-bold text-white group-hover:text-industrial-100 transition-colors line-clamp-2 leading-snug">
            <Link to={`/product/${product.id}`} className="hover:underline focus:outline-none focus:text-safety">
              {product.name}
            </Link>
          </h2>

          <p className="mt-2 text-xs text-industrial-400 line-clamp-2 leading-relaxed font-sans">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing & Units */}
        <div className="mt-4 pt-3 border-t border-industrial-800/80">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-2xl font-bold font-mono text-white tracking-tight">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-1.5 text-xs text-industrial-400 font-mono">
                {product.unit}
              </span>
            </div>
            {currentInCart > 0 && (
              <span className="text-[11px] font-mono text-safety bg-safety/10 px-1.5 py-0.5 border border-safety/30">
                In Cart: {currentInCart}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-3 flex items-center gap-2">
            {!isOutOfStock && (
              <QuantitySelector
                quantity={selectedQty}
                maxStock={remainingStock > 0 ? remainingStock : 1}
                onChange={setSelectedQty}
                disabled={remainingStock <= 0}
                size="sm"
              />
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock || (currentInCart >= product.stock)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono uppercase font-bold tracking-wider transition-all duration-150 border ${
                isOutOfStock
                  ? 'bg-industrial-850 text-industrial-500 border-industrial-800 cursor-not-allowed'
                  : currentInCart >= product.stock
                  ? 'bg-industrial-850 text-amber-500 border-amber-900/50 cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-safety text-white border-safety hover:bg-safety-hover active:bg-safety-active focus:ring-2 focus:ring-safety'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added ✓</span>
                </>
              ) : isOutOfStock ? (
                <span>Out of Stock</span>
              ) : currentInCart >= product.stock ? (
                <span>Max In Cart</span>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
