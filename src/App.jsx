import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 bg-industrial-900 border border-industrial-800 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-safety" />
      </div>
      <h1 className="text-3xl font-heading font-black text-white uppercase tracking-wider">
        404 — UNRESOLVED DEPOT SECTOR
      </h1>
      <p className="mt-2 text-xs font-mono text-industrial-400">
        The requested URL routing does not match any yard storage sector or depot manifest terminal.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-safety hover:bg-safety-hover text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Central Dispatch</span>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-industrial-950 text-industrial-100 selection:bg-safety selection:text-white">
          <Nav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
