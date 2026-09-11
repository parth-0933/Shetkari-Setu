'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Scale, Landmark, FileText, CheckCircle2, AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CompliancePage() {
  const { lang, dict } = useLanguage();
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth(!lowBandwidth)}
        isOnline={isOnline}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-black text-white">
                {lang === 'mr' ? 'कायदेशीर सुसंगतता व विश्वास आराखडा' : 'Regulatory Feasibility & Trust Architecture'}
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              महाराष्ट्र कृषी उत्पन्न पणन (विकास व विनियमन) कायदा, १९६३ व RBI डिजिटल पेमेंट मार्गदर्शक तत्त्वे
            </p>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>मुख्य पानावर परत जा</span>
          </Link>
        </div>

        {/* The 2 Core Pillars Evaluators Probe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pillar 1: Non-Custodial Escrow */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/50 shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Landmark className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              १. नॉन-कस्टोडियल एस्क्रो मॉडेल (Non-Custodial Escrow)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>आक्षेप:</strong> अनेक स्टार्टअप्स शेतकरी किंवा खरेदीदारांचे पैसे स्वतःच्या खात्यात ठेवतात, जे रिझर्व्ह बँकेच्या (RBI Payment Aggregator) नियमांचे थेट उल्लंघन ठरते.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 space-y-1">
              <strong className="text-white block">शेतकरी सेतूचा उपाय (Razorpay Route / UPI Escrow):</strong>
              <p className="text-[11px] text-slate-400">
                प्लॅटफॉर्म केवळ तंत्रज्ञान मध्यस्थ आहे (Technology Service Provider). पैसे थेट शेड्युल्ड कमर्शियल बँकेच्या सुरक्षित एस्क्रो पूलमधून वजन पावती झाल्यावर शेतकरी व वाहतूकदाराच्या खात्यात आपोआप (Split Settlement) जमा होतात.
              </p>
            </div>
          </div>

          {/* Pillar 2: APMC Rules Alignment */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-amber-500/50 shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              २. APMC कायद्याशी सुसंगतता (Working alongside APMCs)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>आक्षेप:</strong> APMC यंत्रणेला आणि परवानाधारक अडत्यांना पूर्णपणे वगळून (Disintermediation) थेट शेतीमाल खरेदी करणे कायदेशीरदृष्ट्या आक्षेपार्ह ठरते.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 space-y-1">
              <strong className="text-white block">शेतकरी सेतूचा उपाय:</strong>
              <p className="text-[11px] text-slate-400">
                हे व्यासपीठ परवानाधारक APMC अडत्यांना स्वतःचे पोर्टल देते आणि थेट खरेदी परवाना (Direct Marketing License - DML) धारक ऑईल मिल्ससोबत जोडणी करते. APMC १.०५% सेसचा संपूर्ण हिशोब पारदर्शक ठेवला जातो.
              </p>
            </div>
          </div>

        </div>

        {/* Detailed Compliance Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>कायदेशीर तुलना व सुरक्षितता तक्ता (Statutory Compliance Matrix)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3">कायदेशीर पैलू (Legal Aspect)</th>
                  <th className="p-3">पारंपरिक आक्षेप (Common Risk)</th>
                  <th className="p-3 text-emerald-400">शेतकरी सेतूची रचना (Architecture)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-white">APMC बाजार सेस (Market Cess)</td>
                  <td className="p-3 text-rose-300">मंडी कर चुकवल्याचा आरोप</td>
                  <td className="p-3 text-emerald-300">आर्बिट्राज इंजिनमध्ये १.०५% सेस थेट वजा करून शासनाला वर्ग करण्याची तरतूद.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">थेट खरेदी अधिकार (Direct Marketing)</td>
                  <td className="p-3 text-rose-300">बेकायदेशीर खरेदीचा संशय</td>
                  <td className="p-3 text-emerald-300">केवळ अधिकृत DML (डायरेक्ट मार्केटिंग लायसन्स) धारक ऑईल मिल्सनाच थेट खरेदीची परवानगी.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">पैसे वाटप (Escrow Settlement)</td>
                  <td className="p-3 text-rose-300">अवैध कस्टडी (PA License breach)</td>
                  <td className="p-3 text-emerald-300">नॉन-कस्टोडियल UPI Route मॉडेल; शेतकरी सेतू एका पैशाचीही कस्टडी घेत नाही.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">तक्रार निवारण (Dispute Redressal)</td>
                  <td className="p-3 text-rose-300">वजन व भावावरून वाद</td>
                  <td className="p-3 text-emerald-300">डिजिटल वजन पावती व अधिकृत APMC तोलाईदाराची डिजिटल स्वाक्षरी.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reference to Repo Documentation */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            संपूर्ण कायदेशीर मसुदा व कलमांचा संदर्भ प्रकल्पाच्या <code className="text-amber-300 font-mono">COMPLIANCE.md</code> फाईलमध्ये उपलब्ध आहे.
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            SIH 2026 Ready
          </span>
        </div>

      </main>
    </div>
  );
}
