import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Check } from 'lucide-react';

export const SmsSimulatorToast: React.FC = () => {
  const [smsData, setSmsData] = useState<{ phone: string; otp: string; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (event: any) => {
      setSmsData(event.detail);
      setCopied(false);
    };

    window.addEventListener('urja_simulated_sms', handler);
    return () => window.removeEventListener('urja_simulated_sms', handler);
  }, []);

  if (!smsData) return null;

  const handleCopyAndAutofill = () => {
    navigator.clipboard?.writeText(smsData.otp);
    setCopied(true);
    // Dispatch auto-fill event
    window.dispatchEvent(new CustomEvent('urja_autofill_otp', { detail: smsData.otp }));
    setTimeout(() => {
      setSmsData(null);
    }, 1500);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-sun-400/30 animate-bounce-once transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sun-400 font-semibold text-sm">
          <MessageSquare className="w-5 h-5 text-sun-400 animate-pulse" />
          <span>SIMULATED SMS NOTIFICATION</span>
        </div>
        <button
          onClick={() => setSmsData(null)}
          className="text-slate-400 hover:text-white p-1 rounded-full"
          aria-label="Close SMS"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2 text-xs text-slate-300 leading-relaxed font-mono bg-black/40 p-2.5 rounded-lg border border-white/5">
        {smsData.message}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-amber-300 font-medium">
          OTP Code: <span className="text-lg font-bold tracking-widest text-white ml-1 bg-amber-600/40 px-2 py-0.5 rounded">{smsData.otp}</span>
        </div>
        <button
          onClick={handleCopyAndAutofill}
          className="bg-sun-500 hover:bg-sun-600 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Autofilled!</span>
            </>
          ) : (
            <span>Tap to Autofill 123456</span>
          )}
        </button>
      </div>
    </div>
  );
};

