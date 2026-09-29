import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, HardHat, PhoneCall, Menu, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Nav() {
  const { totalItems, subtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-industrial-950/95 backdrop-blur-md border-b border-industrial-800">
      {/* Top Industrial Dispatch Bar */}
      <div className="bg-industrial-900 border-b border-industrial-800 px-4 py-1.5 text-[11px] font-mono text-industrial-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-safety"></span>
            <span className="text-industrial-300 font-semibold tracking-wider uppercase">
              DEPOT DISPATCH DESK:
            </span>
            <span>Commercial orders submitted by 2:00 PM ship same-day from Central Yard Bay 04</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-industrial-400">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-safety" />
              <span>Contractor Hotline: <strong className="text-white">1-800-555-FORGE</strong></span>
            </span>
            <span>•</span>
            <span className="text-safety uppercase font-semibold">Live Stock Telemetry Active</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Identity */}
          <Link to="/" onClick={closeMobile} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-safety flex items-center justify-center text-white shrink-0 group-hover:bg-safety-hover transition-colors">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-black text-xl sm:text-2xl text-white tracking-wider leading-none flex items-center gap-1.5">
                <span>FORGE &amp; FOUNDRY</span>
                <span className="text-safety text-xs font-mono px-1 border border-safety/40">DEPOT</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-industrial-400 uppercase mt-0.5">
                Commercial Materials &amp; Trade Hardware
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-mono uppercase tracking-wider">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 transition-colors border-b-2 ${
                  isActive
                    ? 'text-safety border-safety font-bold bg-industrial-900/50'
                    : 'text-industrial-300 border-transparent hover:text-white hover:border-industrial-700'
                }`
              }
            >
              Depot Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `px-3.5 py-2 transition-colors border-b-2 ${
                  isActive
                    ? 'text-safety border-safety font-bold bg-industrial-900/50'
                    : 'text-industrial-300 border-transparent hover:text-white hover:border-industrial-700'
                }`
              }
            >
              Shop Catalog
            </NavLink>
          </nav>

          {/* Cart Trigger Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              onClick={closeMobile}
              className={`flex items-center gap-2.5 px-3.5 py-2 border transition-all duration-150 ${
                location.pathname === '/cart'
                  ? 'bg-safety text-white border-safety shadow-lg'
                  : 'bg-industrial-900 text-industrial-100 border-industrial-700 hover:border-safety hover:bg-industrial-850'
              }`}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span
                    aria-label={`${totalItems} items in cart`}
                    className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] px-1 bg-safety text-white font-mono font-bold text-[10px] flex items-center justify-center border border-industrial-950"
                  >
                    {totalItems}
                  </span>
                )}
              </div>

              <div className="hidden sm:flex flex-col text-left font-mono">
                <span className="text-[10px] uppercase text-industrial-400 leading-none">Order Cart</span>
                <span className="text-xs font-bold text-white leading-none mt-0.5">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-industrial-300 hover:text-white border border-industrial-800 bg-industrial-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-industrial-950 border-b border-industrial-800 px-4 py-5 animate-fade-in font-mono text-xs uppercase">
          <div className="space-y-3">
            <Link
              to="/"
              onClick={closeMobile}
              className="block p-3 bg-industrial-900 border border-industrial-800 text-industrial-100 font-bold hover:border-safety"
            >
              Depot Home
            </Link>
            <Link
              to="/shop"
              onClick={closeMobile}
              className="block p-3 bg-industrial-900 border border-industrial-800 text-industrial-100 font-bold hover:border-safety"
            >
              Shop Catalog (19 Items)
            </Link>
            <Link
              to="/cart"
              onClick={closeMobile}
              className="block p-3 bg-industrial-900 border border-safety text-safety font-bold flex items-center justify-between"
            >
              <span>View Order Cart</span>
              <span>${subtotal.toFixed(2)} ({totalItems})</span>
            </Link>
          </div>

          <div className="mt-5 pt-4 border-t border-industrial-800 text-[11px] text-industrial-400 space-y-1">
            <p>Direct Yard Dispatch: Bay 04</p>
            <p>Hotline: 1-800-555-FORGE</p>
          </div>
        </div>
      )}
    </header>
  );
}
