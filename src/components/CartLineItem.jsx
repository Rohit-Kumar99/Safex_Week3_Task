import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, AlertCircle, Package } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../context/CartContext';

export default function CartLineItem({ item, readonly = false }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity, price } = item;
  const lineTotal = Math.round(price * quantity * 100) / 100;
  const isMaxStock = quantity >= product.stock;

  return (
    <div className="p-4 bg-industrial-900 border border-industrial-800 transition-colors hover:border-industrial-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Product Thumbnail + Identity */}
        <div className="flex items-start gap-3 w-full sm:w-auto">
          <Link
            to={`/product/${product.id}`}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-industrial-950 border border-industrial-800 shrink-0 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-mono text-industrial-400">
              <span>{product.sku}</span>
              <span>•</span>
              <span className="text-safety uppercase">{product.category.replace('-', ' ')}</span>
            </div>

            <h3 className="text-base font-bold text-white hover:text-safety transition-colors truncate">
              <Link to={`/product/${product.id}`}>
                {product.name}
              </Link>
            </h3>

            <div className="mt-1 text-xs text-industrial-400 font-mono">
              <span className="text-white font-bold">${price.toFixed(2)}</span> / {product.unit}
            </div>

            <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-industrial-400">
              <Package className="w-3 h-3 text-industrial-500" />
              <span>Depot: {product.yardBay}</span>
            </div>
          </div>
        </div>

        {/* Right: Quantity Controls + Line Total + Remove */}
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-industrial-800">
          {!readonly ? (
            <div className="flex flex-col items-start sm:items-end gap-1">
              <div className="flex items-center gap-2">
                <QuantitySelector
                  quantity={quantity}
                  maxStock={product.stock}
                  onChange={(newQty) => updateQuantity(item.id, newQty)}
                  size="sm"
                />
                
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${product.name} from cart`}
                  className="p-1.5 text-industrial-400 hover:text-red-400 hover:bg-industrial-800 border border-transparent hover:border-industrial-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {isMaxStock && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400">
                  <AlertCircle className="w-3 h-3" /> Max depot stock ({product.stock})
                </span>
              )}
            </div>
          ) : (
            <div className="text-xs font-mono text-industrial-300">
              Qty: <span className="font-bold text-white text-sm">{quantity}</span>
            </div>
          )}

          {/* Line Total */}
          <div className="text-right min-w-[90px]">
            <div className="text-lg font-mono font-bold text-white tracking-tight">
              ${lineTotal.toFixed(2)}
            </div>
            <div className="text-[10px] font-mono text-industrial-400">
              ${price.toFixed(2)} ea
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
