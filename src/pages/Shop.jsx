import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, AlertTriangle, PackageX } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(400);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category changes with URL query parameter
  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat && urlCat !== selectedCategory) {
      setSelectedCategory(urlCat);
    }
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setPriceRange(400);
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Stock filter
      if (inStockOnly && item.stock <= 0) {
        return false;
      }

      // Max price filter
      if (item.price > priceRange) {
        return false;
      }

      // Text search (name, SKU, specs, description)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'stock-desc':
          return b.stock - a.stock;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [selectedCategory, inStockOnly, priceRange, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Title */}
      <div className="mb-8 pb-6 border-b border-industrial-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-safety">
              Yard Catalog Manifest
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mt-1">
              {activeCategoryObj ? activeCategoryObj.name : 'All Depot Materials'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-industrial-400 font-sans max-w-2xl">
              Real-time commercial materials database. All prices are contractor direct pricing.
              Select items below to commit to active jobsite manifest.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="p-2 bg-industrial-900 border border-industrial-800 text-industrial-300">
              Active Items: <strong className="text-white">{filteredProducts.length}</strong> / 19
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2 px-3 bg-industrial-900 border border-industrial-700 text-safety hover:bg-industrial-850"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Filter Toggles */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-industrial-400" />
            <input
              type="text"
              placeholder="Search by SKU (e.g. CEM-POR-94), product name, or specification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-industrial-900 border border-industrial-700 pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-industrial-500 focus:outline-none focus:border-safety transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-industrial-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Products Grid */}
      <div className="flex items-start gap-8">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          inStockOnly={inStockOnly}
          onToggleInStockOnly={setInStockOnly}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-industrial-900 border border-industrial-800 p-12 text-center">
              <PackageX className="w-12 h-12 text-industrial-500 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">
                No Materials Match Specified Filter Criteria
              </h3>
              <p className="mt-2 text-xs font-mono text-industrial-400 max-w-md mx-auto">
                No active yard materials correspond to the current category, price range (${priceRange}), or search query.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-safety hover:bg-safety-hover text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filter Parameters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
