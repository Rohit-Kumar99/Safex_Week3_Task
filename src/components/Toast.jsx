import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { feedbackMessage, clearFeedback } = useCart();

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        clearFeedback();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage, clearFeedback]);

  if (!feedbackMessage) return null;

  const isError = feedbackMessage.type === 'error';
  const isWarning = feedbackMessage.type === 'warning';
  const isSuccess = feedbackMessage.type === 'success';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-fade-in shadow-2xl"
    >
      <div
        className={`border-l-4 p-4 bg-industrial-900 border text-white shadow-xl ${
          isError
            ? 'border-l-red-500 border-red-900/60'
            : isWarning
            ? 'border-l-safety border-industrial-700'
            : isSuccess
            ? 'border-l-emerald-500 border-industrial-700'
            : 'border-l-industrial-400 border-industrial-700'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {isError && <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
            {isWarning && <AlertCircle className="w-5 h-5 text-safety shrink-0 mt-0.5" />}
            {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {!isError && !isWarning && !isSuccess && <Info className="w-5 h-5 text-industrial-300 shrink-0 mt-0.5" />}
            
            <div>
              <div className="text-xs uppercase tracking-wider font-mono font-bold text-industrial-300 mb-0.5">
                {feedbackMessage.title || 'Depot Notice'}
              </div>
              <p className="text-sm text-industrial-100 font-sans leading-snug">
                {feedbackMessage.text}
              </p>
            </div>
          </div>

          <button
            onClick={clearFeedback}
            className="text-industrial-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
