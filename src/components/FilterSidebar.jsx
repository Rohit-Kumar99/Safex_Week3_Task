import React from 'react';
import { X, Filter, RotateCcw, CheckSquare, Square } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  inStockOnly,
  onToggleInStockOnly,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
  totalResults,
}) {
  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-safety" />
          <h2 className="text-base font-bold font-heading uppercase text-white tracking-wide">
            Depot Filter Criteria
          </h2>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs font-mono text-industrial-400 hover:text-safety transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label htmlFor="depot-sort" className="block text-xs font-mono uppercase text-industrial-400 mb-2">
          Sort Catalog By
        </label>
        <select
          id="depot-sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-industrial-900 border border-industrial-700 text-white text-xs font-mono py-2 px-3 focus:outline-none focus:border-safety transition-colors"
        >
          <option value="featured">Featured / Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Product Name (A - Z)</option>
          <option value="stock-desc">Yard Stock: Highest First</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <div className="text-xs font-mono uppercase text-industrial-400 mb-2.5">
          Material Category
        </div>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-mono text-left transition-colors border ${
                  isSelected
                    ? 'bg-industrial-800 text-safety border-safety font-bold'
                    : 'bg-industrial-900/60 text-industrial-300 border-industrial-850 hover:bg-industrial-800 hover:text-white hover:border-industrial-700'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-[11px] px-1.5 py-0.2 bg-industrial-950 border border-industrial-800 text-industrial-400">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Availability Filter */}
      <div className="pt-2 border-t border-industrial-800">
        <div className="text-xs font-mono uppercase text-industrial-400 mb-2">
          Yard Availability
        </div>
        <button
          type="button"
          onClick={() => onToggleInStockOnly(!inStockOnly)}
          className="flex items-center gap-2 text-xs font-mono text-industrial-200 hover:text-white cursor-pointer select-none group"
        >
          {inStockOnly ? (
            <CheckSquare className="w-4 h-4 text-safety" />
          ) : (
            <Square className="w-4 h-4 text-industrial-500 group-hover:text-industrial-400" />
          )}
          <span>In-Stock Depot Units Only</span>
        </button>
        <p className="mt-1 text-[11px] text-industrial-500 font-mono">
          Excludes backorders and pending factory deliveries.
        </p>
      </div>

      {/* Price Cap Filter */}
      <div className="pt-2 border-t border-industrial-800">
        <div className="flex items-center justify-between text-xs font-mono uppercase text-industrial-400 mb-2">
          <span>Max Unit Price</span>
          <span className="text-white font-bold">${priceRange}</span>
        </div>
        <input
          type="range"
          min="5"
          max="400"
          step="5"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-safety bg-industrial-800 h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-mono text-industrial-500 mt-1">
          <span>$5</span>
          <span>$200</span>
          <span>$400+</span>
        </div>
      </div>

      {/* Live Catalog Matching Indicator */}
      <div className="p-3 bg-industrial-950 border border-industrial-800 text-xs font-mono text-industrial-400">
        Matching Depot Inventory: <span className="text-safety font-bold">{totalResults}</span> items
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 bg-industrial-900 border border-industrial-800 p-4 h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop and Bottom Sheet / Slide-out */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-industrial-950 border-l border-industrial-800 p-5 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-industrial-800">
                <span className="font-heading text-lg font-bold text-white tracking-wide">
                  FILTER SPECIFICATIONS
                </span>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 text-industrial-400 hover:text-white border border-industrial-800 hover:border-industrial-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {content}
            </div>

            <div className="pt-6 mt-6 border-t border-industrial-800">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-2.5 bg-safety hover:bg-safety-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                Apply Criteria ({totalResults} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
