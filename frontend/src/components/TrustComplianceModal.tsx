'use client';

import React, { useState } from 'react';
import { ShieldCheck, Scale, Landmark, FileText, CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/translations';

interface TrustComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPriceLock: () => void;
  selectedOption: any;
  lang: Language;
}

export const TrustComplianceModal: React.FC<TrustComplianceModalProps> = ({
  isOpen,
  onClose,
  onConfirmPriceLock,
  selectedOption,
  lang
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen || !selectedOption) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 border-b border-emerald-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'mr' ? 'कायदेशीर डिजिटल संमती व एस्क्रो करार' : 'Trust & Compliance — Non-Custodial Agreement'}
              </h3>
              <p className="text-xs text-emerald-300/70">
                {lang === 'mr' ? 'महाराष्ट्र APMC कायदा व RBI मार्गदर्शक तत्त्वांचे पालन' : 'Maharashtra APMC Act & RBI Digital Escrow Compliance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-xs text-slate-300">
          
          {/* Selected Option Summary */}
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-700/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300">
                {lang === 'mr' ? 'निवडलेला खरेदीदार:' : 'Selected Counterparty:'}
              </span>
              <div className="text-sm font-bold text-white mt-0.5">{selectedOption.buyerName}</div>
              <div className="text-emerald-300 text-[11px]">
                {lang === 'mr' ? 'परवाना क्र:' : 'Statutory License:'} {selectedOption.licenseNumber}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">{lang === 'mr' ? 'लॉक दर' : 'Locked Rate'}</span>
              <span className="text-lg font-black text-emerald-300">₹{selectedOption.ratePerQuintal}/Qtl</span>
            </div>
          </div>

          {/* Core Regulatory Explainer 1: Non-Custodial Escrow */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>
                {lang === 'mr'
                  ? '१. रक्कम थेट बँक खात्यात (Non-Custodial Escrow)'
                  : '1. Simulated Non-Custodial Escrow Architecture'}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {lang === 'mr'
                ? 'शेतकरी सेतू हे व्यासपीठ शेतकऱ्यांचे पैसे स्वतःच्या खात्यात कधीही ठेवत नाही. खरेदीदाराची रक्कम शेड्युल्ड बँकेच्या अधिकृत एस्क्रो खात्यात (उदा. Razorpay Route / UPI Escrow Rails प्रमाणे) सुरक्षित राखीव ठेवली जाते. मालाचे वजन झाल्यावर थेट शेतकऱ्याच्या बँक खात्यात वर्ग होते.'
                : 'ShetkariSetu acts strictly as a Technology Service Provider (TSP) and does not take custody of transaction funds. Buyer funds are held directly in an RBI-compliant bank escrow pool (simulated via Razorpay Route pattern) and programmatically split upon weighbridge confirmation.'}
            </p>
          </div>

          {/* Core Regulatory Explainer 2: APMC Law Alignment */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>
                {lang === 'mr'
                  ? '२. APMC कायद्याशी सुसंगतता (No Illegal Disintermediation)'
                  : '2. Full Alignment with Maharashtra APMC Rules'}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {lang === 'mr'
                ? 'हे व्यासपीठ APMC यंत्रणेला बगल देत नाही, तर परवानाधारक अडते व थेट खरेदी परवानाधारक (Direct Marketing License) ऑईल मिल कंपन्यांसोबत काम करते. APMC सेस (१.०५%) पूर्ण पारदर्शकतेने नोंदवला जातो.'
                : 'The platform operates alongside licensed APMC traders and certified direct processors (DML holders) rather than circumventing them. Mandated statutory cess (1.05%) is transparently calculated and audited in the settlement stream.'}
            </p>
          </div>

          {/* Settlement Breakdown Preview */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h4 className="text-[11px] font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'mr' ? 'रक्कम वाटप सूत्र (Split Settlement)' : 'Programmatic Split Breakdown'}</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                <span className="text-[10px] text-slate-400 block">{lang === 'mr' ? 'शेतकरी वाटा' : 'Farmer Net'}</span>
                <span className="font-bold text-emerald-300">₹{selectedOption.breakdown.netTakeHome.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{lang === 'mr' ? 'वाहतूकदार' : 'Transporter'}</span>
                <span className="font-bold text-amber-300">₹{selectedOption.transportCost}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{lang === 'mr' ? 'मंडी सेस' : 'Mandi Cess'}</span>
                <span className="font-bold text-slate-300">
                  {selectedOption.cessRatePct > 0 ? `₹${selectedOption.breakdown.apmcCess}` : '₹0 (Direct)'}
                </span>
              </div>
            </div>
          </div>

          {/* Checkbox Consent */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 cursor-pointer hover:bg-emerald-950/60 transition-colors">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-emerald-600 text-emerald-500 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <span className="text-[11px] text-emerald-100 font-medium leading-relaxed">
              {lang === 'mr'
                ? 'मी प्रमाणित करतो/करते की वरील अटी मला मान्य आहेत. मालाची गुणवत्ता (FAQ ओलावा < १०%) असल्यास हा भाव ३ तास सुरक्षित राहील.'
                : 'I accept the terms of the Non-Custodial Tripartite Price-Lock Memorandum. Quality grade FAQ moisture threshold (<10%) applies.'}
            </span>
          </label>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            {lang === 'mr' ? 'रद्द करा' : 'Cancel'}
          </button>
          <button
            onClick={() => {
              if (agreed) onConfirmPriceLock();
            }}
            disabled={!agreed}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
              agreed
                ? 'bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white shadow-emerald-950/50 hover:scale-[1.02]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{lang === 'mr' ? 'होय, भाव लॉक करा' : 'Activate Price-Lock'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
