import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, HardHat, Warehouse, ShieldAlert, Award, Layers } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);

  // Exclude 'all' for the category tiles
  const departmentTiles = [
    {
      id: 'cement-aggregates',
      name: 'Cement & Structural Aggregates',
      desc: 'ASTM C150 Type I/II Portland cement, 5000 PSI high-strength gravel mixes, and 1-ton bulk sand totes.',
      count: '4 Products In Yard',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hand-tools',
      name: 'Hand & Layout Measurement Tools',
      desc: 'Forged high-carbon framing hammers, rare-earth magnetic levels, and heavy-duty 35ft layout tapes.',
      count: '4 Products In Yard',
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'power-tools',
      name: 'Heavy Demolition & Power Equipment',
      desc: '15-Amp magnesium worm drive saws, SDS-Max demolition hammers, and 60V cordless brushless grinders.',
      count: '4 Products In Yard',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fittings-fasteners',
      name: 'Structural Fasteners & Concrete Anchors',
      desc: 'ASTM A153 hot-dip galvanized nails, Grade 8 structural hex bolts, and seismic-rated wedge anchors.',
      count: '4 Products In Yard',
      image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Heavy Industrial Hero Section */}
      <section className="relative bg-industrial-950 border-b border-industrial-800 overflow-hidden industrial-grid-bg">
        {/* Subtle industrial hazard top band */}
        <div className="h-1.5 w-full bg-safety"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl">
            {/* Depot Positioning Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-900 border border-industrial-700 text-safety text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-safety"></span>
              Central Midwest Distribution Rail Yard 04
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
              COMMERCIAL-GRADE <br />
              <span className="text-safety">MATERIALS &amp; HARDWARE.</span> <br />
              ZERO RETAIL FLUFF.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-industrial-300 font-sans max-w-2xl leading-relaxed">
              Engineered for trade contractors, structural framers, and heavy civil jobsites. Real-time depot yard inventory telemetry, ASTM mill-certified fasteners, and flatbed jobsite delivery with same-day dispatch.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-safety text-white hover:bg-safety-hover font-mono text-sm font-bold uppercase tracking-wider transition-colors shadow-lg border border-safety focus:ring-2 focus:ring-safety"
              >
                <span>Access Depot Catalog (19 Items)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/cart"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-industrial-900 text-industrial-100 hover:text-white hover:bg-industrial-850 font-mono text-sm uppercase tracking-wider border border-industrial-700 transition-colors"
              >
                <span>View Order Manifest</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-industrial-800 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
              <div>
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-xs text-industrial-400 uppercase mt-0.5">Live Yard Telemetry</div>
              </div>
              <div>
                <div className="text-2xl font-black text-safety">2:00 PM</div>
                <div className="text-xs text-industrial-400 uppercase mt-0.5">Same-Day Cutoff</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">ASTM/ICC</div>
                <div className="text-xs text-industrial-400 uppercase mt-0.5">Tested &amp; Spec'd</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">NET 30</div>
                <div className="text-xs text-industrial-400 uppercase mt-0.5">Contractor Terms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles (Distinct Visual Blocks, Not Icon Circles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-industrial-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-safety">
              Yard Storage Sectors
            </div>
            <h2 className="text-3xl font-heading font-black text-white tracking-wide mt-1">
              PRIMARY DEPOT DEPARTMENTS
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-industrial-400 hover:text-safety uppercase tracking-wider transition-colors"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentTiles.map((tile) => (
            <Link
              key={tile.id}
              to={`/shop?category=${tile.id}`}
              className="group relative bg-industrial-900 border border-industrial-800 hover:border-safety transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] bg-industrial-950 overflow-hidden">
                <img
                  src={tile.image}
                  alt={tile.name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-industrial-950/60 group-hover:bg-industrial-950/40 transition-colors" />
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold uppercase bg-industrial-900 px-2 py-0.5 text-industrial-300 border border-industrial-700">
                  {tile.count}
                </span>
              </div>

              {/* Information body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-safety transition-colors leading-tight">
                    {tile.name}
                  </h3>
                  <p className="mt-2 text-xs text-industrial-400 font-sans leading-relaxed">
                    {tile.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-industrial-800 flex items-center justify-between text-xs font-mono text-safety uppercase">
                  <span>Browse Sector</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Heavy Products Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-industrial-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-safety">
              Contractor High Turn Rate
            </div>
            <h2 className="text-3xl font-heading font-black text-white tracking-wide mt-1">
              CURRENT DEPOT HIGHLIGHTS
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-industrial-400 hover:text-safety uppercase tracking-wider transition-colors"
          >
            <span>Explore Entire 19-Item Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Real Trade Trust & Specifications Section (No generic star badge row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-industrial-900 border border-industrial-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase text-safety tracking-widest">
              Direct Trade Supply Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight mt-2">
              WHY COMMERCIAL FRAMERS &amp; BUILDERS RELY ON FORGE &amp; FOUNDRY
            </h2>
            <p className="mt-4 text-sm text-industrial-300 font-sans leading-relaxed">
              We operate as a materials depot, not a consumer boutique. When an excavation crew or framing superintendent orders 40 bags of high-early cement and 20,000 structural framing nails, they cannot afford inventory discrepancies or backorder surprises.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-industrial-800 font-mono text-xs">
            <div className="p-4 bg-industrial-950 border border-industrial-800">
              <div className="text-safety font-bold uppercase mb-1">01. Verifiable Stock Quotas</div>
              <p className="text-industrial-400 font-sans text-xs">
                Our digital cart is bound directly to actual warehouse bins and yard bays. You will never be allowed to order materials that do not exist physically in Bay 04.
              </p>
            </div>

            <div className="p-4 bg-industrial-950 border border-industrial-800">
              <div className="text-safety font-bold uppercase mb-1">02. Crane &amp; Boom Flatbed Unloading</div>
              <p className="text-industrial-400 font-sans text-xs">
                Heavy orders exceeding 1 ton (sand sacks, cement pallets) dispatched via dedicated hydraulic knuckle-boom flatbeds with rooftop or floor-level spotting.
              </p>
            </div>

            <div className="p-4 bg-industrial-950 border border-industrial-800">
              <div className="text-safety font-bold uppercase mb-1">03. Exact ASTM/ICC Traceability</div>
              <p className="text-industrial-400 font-sans text-xs">
                Complete compliance submittal packets, mill test reports, and MSDS safety sheets furnished instantaneously with every order manifest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
