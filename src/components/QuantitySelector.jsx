import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity = 1,
  maxStock = 999,
  onChange,
  disabled = false,
  size = 'md',
  onLimitReached,
}) {
  const isMin = quantity <= 1;
  const isMax = quantity >= maxStock;

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (disabled || isMin) return;
    onChange(quantity - 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (disabled) return;
    if (isMax) {
      if (onLimitReached) onLimitReached(maxStock);
      return;
    }
    onChange(quantity + 1);
  };

  const handleInputChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (rawVal === '') {
      onChange(1);
      return;
    }
    let parsed = parseInt(rawVal, 10);
    if (isNaN(parsed) || parsed < 1) parsed = 1;
    if (parsed > maxStock) {
      parsed = maxStock;
      if (onLimitReached) onLimitReached(maxStock);
    }
    onChange(parsed);
  };

  const btnSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const inputSizes = {
    sm: 'w-10 h-7 text-xs',
    md: 'w-14 h-9 text-sm',
    lg: 'w-16 h-11 text-base',
  };

  return (
    <div className="inline-flex items-center border border-industrial-700 bg-industrial-900 select-none">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || isMin}
        aria-label="Decrease quantity"
        className={`${btnSizes[size]} flex items-center justify-center text-industrial-300 hover:text-white hover:bg-industrial-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-industrial-700 focus:outline-none focus:ring-1 focus:ring-safety`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label="Item quantity"
        className={`${inputSizes[size]} bg-transparent text-center font-mono font-bold text-white focus:outline-none focus:bg-industrial-850`}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || isMax}
        aria-label="Increase quantity"
        className={`${btnSizes[size]} flex items-center justify-center text-industrial-300 hover:text-white hover:bg-industrial-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-l border-industrial-700 focus:outline-none focus:ring-1 focus:ring-safety`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
