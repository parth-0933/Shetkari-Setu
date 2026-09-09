'use client';

import React, { useState } from 'react';
import { TrendingUp, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, MapPin, Award, IndianRupee } from 'lucide-react';
import { Language, t } from '@/lib/translations';

interface OptionBreakdown {
  grossRevenue: number;
  apmcCess: number;
  transportCost: number;
  unloadingCharges: number;
  totalDeductions: number;
  netTakeHome: number;
  netPerQuintal: number;
}

interface ArbitrageOption {
  id: string;
  buyerName: string;
  buyerType: string;
  licenseNumber: string;
  distanceKm: number;
  ratePerQuintal: number;
  cessRatePct: number;
  transportCost: number;
  transportDistanceLabel: string;
  quotaRemainingQuintals: number;
  trustScore: number;
  aiTrend: {
    trendPct: number;
    recommendation: string;
    badgeColor: string;
    insight: string;
  };
  breakdown: OptionBreakdown;
}

interface ArbitrageCardProps {
  option: ArbitrageOption;
  isBest: boolean;
  lang: Language;
  onLockPrice: (option: ArbitrageOption) => void;
  lowBandwidth: boolean;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({
  option,
  isBest,
  lang,
  onLockPrice,
  lowBandwidth
}) => {
  const dict = t[lang];
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getBuyerTypeLabel = (type: string) => {
    switch (type) {
      case 'MILL':
        return lang === 'mr' ? 'थेट ऑईल मिल (डायरेक्ट खरेदी परवाना)' : 'Direct Oil Mill (DML Licensed)';
      case 'APMC_ADAT':
        return lang === 'mr' ? 'लातूर APMC मुख्य यार्ड (नोंदणीकृत अडत)' : 'Latur APMC Main Yard (Licensed Adat)';
      default:
        return lang === 'mr' ? 'स्थानिक उपबाजार' : 'Local Sub-Mandi Yard';
    }
  };

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 ${
        isBest
          ? 'bg-gradient-to-b from-emerald-950/90 via-slate-900/95 to-emerald-900/50 border-emerald-500/70 shadow-2xl shadow-emerald-950/70 ring-1 ring-emerald-400/40'
          : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700/80 shadow-lg'
      } p-5 overflow-hidden`}
    >
      {/* Best Deal Badge */}
      {isBest && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-amber-500 to-emerald-500 text-emerald-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'सर्वोत्तम निव्वळ नफा' : 'Max Net Take-Home'}</span>
          </div>
        </div>
      )}

      {/* Buyer Header & License */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-800/40 text-emerald-300 border border-emerald-600/30">
              {getBuyerTypeLabel(option.buyerType)}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {option.licenseNumber}
            </span>
          </div>
          <h3 className="text-base font-bold text-white mt-1.5">{option.buyerName}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
            <span>{option.transportDistanceLabel}</span>
            <span className="text-slate-500">•</span>
            <span>⭐ {option.trustScore} Trust</span>
          </p>
        </div>

        {/* Buying Rate vs Net Rate */}
        <div className="mt-2 sm:mt-0 text-left sm:text-right">
          <div className="text-xs text-slate-400">{dict.grossRate}: <span className="line-through text-slate-500">₹{option.ratePerQuintal}/Qtl</span></div>
          <div className="text-xl sm:text-2xl font-black text-emerald-300 flex items-center sm:justify-end">
            <IndianRupee className="w-5 h-5 text-emerald-400 inline" />
            <span>{option.breakdown.netTakeHome.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[11px] font-bold text-amber-300">
            (₹{option.breakdown.netPerQuintal.toLocaleString('en-IN')} / Qtl Net)
          </div>
        </div>
      </div>

      {/* AI Trend & Confidence Indicator (SIH Innovation Factor) */}
      <div className="mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">{dict.aiInsightTitle}:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
              option.aiTrend.trendPct > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {option.aiTrend.recommendation}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">ML Conf: 91%</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-300/80 leading-relaxed">
          {option.aiTrend.insight}
        </p>
      </div>

      {/* Deductions Summary Row */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs py-2 px-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
        <div>
          <span className="text-[10px] text-slate-400 block">{dict.grossRate}</span>
          <span className="font-bold text-slate-200">₹{option.ratePerQuintal}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">{dict.transportCost}</span>
          <span className="font-bold text-rose-400">-₹{option.transportCost}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">{dict.apmcCess}</span>
          <span className="font-bold text-amber-400">
            {option.cessRatePct > 0 ? `-₹${option.breakdown.apmcCess}` : '₹0 (Direct)'}
          </span>
        </div>
      </div>

      {/* Toggle Cost Breakdown */}
      <div className="mt-3">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          <span>{dict.viewBreakdown}</span>
          {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showBreakdown && (
          <div className="mt-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1.5 animate-fadeIn">
            <div className="flex justify-between text-slate-300">
              <span>Gross Revenue (15 Qtl × ₹{option.ratePerQuintal}):</span>
              <span className="font-semibold text-white">₹{option.breakdown.grossRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-rose-300">
              <span>APMC Statutory Cess ({option.cessRatePct}%):</span>
              <span>-₹{option.breakdown.apmcCess.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-rose-300">
              <span>Transporter Freight (Lamjana to {option.distanceKm} km):</span>
              <span>-₹{option.breakdown.transportCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-rose-300">
              <span>Yard Unloading & Weighing:</span>
              <span>-₹{option.breakdown.unloadingCharges.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-300 text-sm">
              <span>Net Take-Home (थेट बँक खात्यात):</span>
              <span>₹{option.breakdown.netTakeHome.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Lock Price Button */}
      <div className="mt-4">
        <button
          onClick={() => onLockPrice(option)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
            isBest
              ? 'bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white shadow-emerald-950/50 hover:scale-[1.01]'
              : 'bg-emerald-900/70 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{dict.lockPriceBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
