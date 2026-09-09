'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Clock, ShieldCheck, Phone, CheckCircle, Navigation, AlertTriangle } from 'lucide-react';
import { Language, t } from '@/lib/translations';

interface TransitTrackerProps {
  transaction: any;
  lang: Language;
  onSimulateArrival: () => void;
  lowBandwidth: boolean;
}

export const TransitTracker: React.FC<TransitTrackerProps> = ({
  transaction,
  lang,
  onSimulateArrival,
  lowBandwidth
}) => {
  const dict = t[lang];
  const [secondsRemaining, setSecondsRemaining] = useState(10740); // ~3 hours
  const [progress, setProgress] = useState(transaction?.transit?.progressPct || 62);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const driverName = transaction?.transit?.driverName || 'सचिन गायकवाड (Sachin Gaikwad)';
  const vehicleNumber = transaction?.transit?.vehicleNumber || 'MH-24-AG-4412';
  const buyerName = transaction?.buyerName || 'Kirti Gold Agro Oil Mill (MIDC Latur)';
  const lockedRate = transaction?.lockedRate || 4950;
  const farmerNet = transaction?.farmerNet || 73350;

  return (
    <div className="bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-5 shadow-2xl overflow-hidden backdrop-blur-md">
      
      {/* Top Header: Price Lock Countdown & Escrow State */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <Truck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-800/50 text-emerald-300 rounded-full border border-emerald-600/40">
                {dict.priceLockActive}
              </span>
              <span className="text-[10px] text-amber-300 font-mono">
                {transaction?.transactionId || 'TXN_LTR_BENCHMARK'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">
              {buyerName} — {dict.grossRate}: ₹{lockedRate}/Qtl
            </h3>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center space-x-3 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] text-slate-400 block">{dict.timeLeft}</span>
            <span className="text-xs font-black font-mono text-amber-300">
              {formatTime(secondsRemaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Visual GPS Progress Bar */}
      <div className="mt-5">
        <div className="flex justify-between text-xs text-slate-300 mb-2">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <Navigation className="w-3.5 h-3.5" />
            <span>लामजणा शेत (Lamjana Farm)</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">४१ किमी प्रवास (41 km Route)</span>
          <span className="font-semibold text-amber-400">
            लातूर मिल (Latur Mill Yard)
          </span>
        </div>

        {/* The Animated Progress Track */}
        <div className="relative w-full h-3.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Real-time Location Pin Status */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-emerald-300 font-medium">
            चालू स्थान: {transaction?.transit?.currentLocation || 'NH 361 हरंगूळ जवळ (१२ किमी उर्वरित)'}
          </span>
          <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
            {progress}% पूर्ण
          </span>
        </div>
      </div>

      {/* Driver & Escrow Card */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
        
        {/* Driver Details */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">{dict.driver}</span>
            <div className="font-bold text-white mt-0.5">{driverName}</div>
            <div className="text-[11px] text-emerald-300 font-mono">{vehicleNumber} • Bolero Maxi</div>
          </div>
          <a
            href="tel:+919423188990"
            className="p-2 rounded-lg bg-emerald-800/50 hover:bg-emerald-700/60 text-emerald-300 border border-emerald-600/40 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Non-Custodial Escrow State */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{dict.escrowStatus}</span>
          <div className="flex items-center gap-1.5 font-bold text-emerald-300 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{dict.escrowHeld}</span>
          </div>
          <div className="text-[11px] text-amber-300 font-semibold">
            शेतकरी हक्काची रक्कम: ₹{farmerNet.toLocaleString('en-IN')} (SBI Escrow Hold)
          </div>
        </div>

      </div>

      {/* Quick Demo Walkthrough Trigger: Simulate Arrival at Weighbridge */}
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/60">
        <span className="text-[11px] text-slate-400 italic">
          (डेमोसाठी वाहन थेट पोहोचवून वजन पावती तपासू शकता)
        </span>
        <button
          onClick={() => {
            setProgress(100);
            onSimulateArrival();
          }}
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
        >
          माल पोहोचला (Simulate Delivery)
        </button>
      </div>

    </div>
  );
};
