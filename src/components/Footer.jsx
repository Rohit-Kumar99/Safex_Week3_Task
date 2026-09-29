import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Truck, ShieldCheck, Clock, MapPin, Phone, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-industrial-950 border-t-2 border-industrial-800 text-industrial-300 font-sans mt-20">
      {/* Heavy Industrial Dispatch Features Bar */}
      <div className="border-b border-industrial-800 bg-industrial-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-3 bg-industrial-950 border border-industrial-800">
              <Truck className="w-5 h-5 text-safety shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  Same-Day Yard Dispatch
                </h4>
                <p className="text-xs text-industrial-400 mt-1">
                  Orders placed by 2:00 PM EST qualify for flatbed delivery or express depot dock pickup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-industrial-950 border border-industrial-800">
              <ShieldCheck className="w-5 h-5 text-safety shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  ASTM &amp; ICC-ES Certified
                </h4>
                <p className="text-xs text-industrial-400 mt-1">
                  All structural aggregates, cements, and Grade 8 fasteners include mill test reports on request.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-industrial-950 border border-industrial-800">
              <HardHat className="w-5 h-5 text-safety shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  Trade Credit Accounts (Net 30)
                </h4>
                <p className="text-xs text-industrial-400 mt-1">
                  Contractor trade accounts with jobsite invoicing and volume pallet pricing available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-safety flex items-center justify-center text-white">
                <HardHat className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-lg text-white tracking-wider">
                FORGE &amp; FOUNDRY SUPPLY
              </span>
            </div>
            <p className="text-xs text-industrial-400 leading-relaxed font-sans">
              Central industrial distribution depot delivering commercial-grade aggregates, structural fasteners, heavy-duty demolition tools, and protective coatings directly to commercial jobsites and trade contractors.
            </p>
            <div className="text-[11px] font-mono text-safety uppercase">
              • Contractor Depot License #FF-7729-CON
            </div>
          </div>

          {/* Depot Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-safety" />
              Central Depot &amp; Yard
            </h4>
            <div className="text-xs font-mono text-industrial-400 space-y-1">
              <p>Forge &amp; Foundry Rail Yard 04</p>
              <p>8400 Industrial Parkway, Dock 12</p>
              <p>Cleveland, OH 44102</p>
            </div>

            <div className="pt-2 text-xs font-mono text-industrial-400 space-y-1">
              <div className="flex items-center gap-1.5 text-industrial-300 font-bold">
                <Clock className="w-3.5 h-3.5 text-safety" />
                Yard Operating Hours
              </div>
              <p>Mon – Fri: 05:30 – 17:00 EST</p>
              <p>Saturday: 06:00 – 12:00 EST</p>
              <p className="text-industrial-500">Sunday: Closed for Stock Audits</p>
            </div>
          </div>

          {/* Quick Trade Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              Depot Departments
            </h4>
            <ul className="text-xs font-mono space-y-2 text-industrial-400">
              <li>
                <Link to="/shop" className="hover:text-safety transition-colors">
                  &gt; Cement &amp; Structural Aggregates
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-safety transition-colors">
                  &gt; Heavy Power Tools &amp; Cordless
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-safety transition-colors">
                  &gt; Hot-Dip Galvanized Fasteners
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-safety transition-colors">
                  &gt; Commercial Floor Epoxies &amp; Sealants
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-safety transition-colors">
                  &gt; Active Order Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Contractor Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-safety" />
              Contractor Support
            </h4>
            <div className="p-3 bg-industrial-900 border border-industrial-800 text-xs font-mono">
              <div className="text-industrial-400">Direct Phone Desk</div>
              <div className="text-sm font-bold text-white mt-0.5">1-800-555-FORGE</div>
              <div className="text-[11px] text-industrial-400 mt-2">Yard Dispatch Desk</div>
              <div className="text-xs text-white">dispatch@forgefoundrysupply.com</div>
            </div>
            <p className="text-[11px] text-industrial-500 font-mono">
              All commercial orders governed by standard trade supply terms and hazardous materials transportation safety codes.
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-6 border-t border-industrial-800 text-center text-xs font-mono text-industrial-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FORGE &amp; FOUNDRY SUPPLY CO. All rights reserved. Commercial Building Materials Storefront.</p>
          <div className="flex items-center gap-4 text-industrial-400">
            <span>Vite + React</span>
            <span>•</span>
            <span>Context API useReducer</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
