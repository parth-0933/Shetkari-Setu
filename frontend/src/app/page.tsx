'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Store,
  Truck,
  ShieldCheck,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Scale,
  MapPin,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Zap,
  Globe
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Language, t } from '@/lib/translations';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('mr');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const dict = t[lang];

  // 90-Second Walkthrough Auto-Runner
  const handleStart90SecDemo = () => {
    setIsPlayingDemo(true);
    setActiveStep(1);

    const stepIntervals = [
      setTimeout(() => setActiveStep(2), 2500),
      setTimeout(() => setActiveStep(3), 5000),
      setTimeout(() => setActiveStep(4), 7500),
      setTimeout(() => {
        setActiveStep(5);
        setIsPlayingDemo(false);
      }, 10000)
    ];

    return () => stepIntervals.forEach(clearTimeout);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(lang === 'mr' ? 'en' : 'mr')}
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth(!lowBandwidth)}
        isOnline={isOnline}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-8">
        
        {/* Hero Section with Ground Benchmark Scenario */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900/60 border border-emerald-500/50 p-6 sm:p-10 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                SIH 2026 Prototype — Govt. of Maharashtra Track
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/40 text-emerald-300 border border-emerald-600/40">
                Latur Ground Benchmark Scenario
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {dict.appTitle} — <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">शेतकरी सेतू</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/80 max-w-3xl leading-relaxed">
              {lang === 'mr'
                ? 'माहितीचा अभाव, मध्यस्थांचे आर्थिक शोषण आणि वाहतूक अडथळे दूर करून शेतकऱ्यांना थेट उच्च बाजारभावाची हमी देणारे व्यासपीठ. लामजणा गावातील (औसा, लातूर) १५ क्विंटल सोयाबीन विक्रीचे प्रत्यक्ष मॉडेल.'
                : 'Eliminating price asymmetry, intermediary exploitation, and transport friction. Ground benchmark: a farmer in Lamjana village (Ausa Taluka, Latur) selling 15 quintals of soybean.'}
            </p>

            {/* Ground Benchmark Scenario Card */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-emerald-600/40 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">मूळ ठिकाण (Origin)</span>
                  <strong className="text-white">लामजणा, ता. औसा, जि. लातूर</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Sprout className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">शेतमाल व प्रमाण (Produce)</span>
                  <strong className="text-white">१५ क्विंटल सोयाबीन (Grade A)</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">अनलॉक झालेला नफा (Net Surplus)</span>
                  <strong className="text-emerald-300 text-sm font-black">+₹७,७०० निव्वळ जास्त</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">कायदेशीर हमी (Compliance)</span>
                  <strong className="text-white">Non-Custodial Escrow (DML-88)</strong>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/farmer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-emerald-950 font-black text-sm shadow-xl shadow-emerald-950/60 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Sprout className="w-4 h-4" />
                <span>शेतकरी कक्ष सुरू करा (Open Farmer Portal)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleStart90SecDemo}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-emerald-200 font-bold text-sm flex items-center gap-2 transition-all hover:border-emerald-400"
              >
                <Play className={`w-4 h-4 text-amber-400 ${isPlayingDemo ? 'animate-spin' : ''}`} />
                <span>९०-सेकंद थेट डेमो वॉकथ्रू (90-Sec Live Demo)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 90-Second Walkthrough Stage Visualizer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>९०-सेकंद मूल्यांकन वॉकथ्रू टप्पे (SIH Evaluation Pipeline)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                परीक्षकांसाठी लामजणा ते लातूर संपूर्ण व्यवहाराचा ५-टप्प्यांचा प्रवाह
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              टप्पा {activeStep} / ५ सक्रिय
            </div>
          </div>

          {/* Step Progress Indicators */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                step: 1,
                title: '१. भाषिणी व्हॉइस इनपुट',
                desc: 'लामजणा शेतकरी १५ क्विंटल सोयाबीन मराठीत बोलून नोंदवतो.',
                icon: Sprout
              },
              {
                step: 2,
                title: '२. आर्बिट्राज तुलना',
                desc: 'स्थानिक मंडी vs लातूर APMC vs कीर्ती गोल्ड मिल थेट नफा तुलना.',
                icon: TrendingUp
              },
              {
                step: 3,
                title: '३. भाव लॉक व कायदेशीर संमती',
                desc: 'Non-Custodial एस्क्रो हमीसह ३ तासांसाठी दर लॉक.',
                icon: ShieldCheck
              },
              {
                step: 4,
                title: '४. १०-मि. वाहतूक लिलाव',
                desc: 'Socket.io रिव्हर्स ऑक्शन + ₹६५० फ्लोअर प्राईस संरक्षण.',
                icon: Truck
              },
              {
                step: 5,
                title: '५. वजन पावती व एस्क्रो रिलीज',
                desc: 'डिजिटल वजन पावती + UPI Route स्प्लिट सेटलमेंट.',
                icon: Scale
              }
            ].map((s) => {
              const Icon = s.icon;
              const isCurrent = activeStep === s.step;
              const isDone = activeStep > s.step;

              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400'
                      : isDone
                      ? 'bg-slate-950/60 border-emerald-800/50 text-slate-300'
                      : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-400' : isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2">{s.title}</h4>
                  <p className="text-[10px] mt-1 text-slate-400 leading-snug">{s.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Action for Active Step */}
          <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              {activeStep === 1 && '👉 टप्पा १: शेतकरी कक्षात भाषिणी व्हॉइस इनपुट वापरून फॉर्म भरा.'}
              {activeStep === 2 && '👉 टप्पा २: कीर्ती गोल्ड मिलचा निव्वळ भाव ₹७३,३५० (स्थानिकपेक्षा +₹७,७००) तपासा.'}
              {activeStep === 3 && '👉 टप्पा ३: डिजिटल संमती मोडल तपासा (Non-Custodial Escrow & APMC कायदेशीर सुसंगतता).'}
              {activeStep === 4 && '👉 टप्पा ४: वाहतूकदार कक्षात बोली लावा व ₹६०० टाकून फ्लोअर प्राईस रिजेक्शन तपासा.'}
              {activeStep === 5 && '👉 टप्पा ५: ऑईल मिल कक्षात डिजिटल वजन पावती तयार करून थेट एस्क्रो रक्कम रिलीज करा.'}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={
                  activeStep <= 3
                    ? '/farmer'
                    : activeStep === 4
                    ? '/transporter'
                    : '/mill'
                }
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>हा टप्पा थेट चालवा</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* The 3 Core Portals Direct Launch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Portal A: Farmer Portal */}
          <Link
            href="/farmer"
            className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/50 border border-slate-800 hover:border-emerald-500/60 shadow-xl transition-all hover:scale-[1.02]"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-4 group-hover:text-emerald-300 transition-colors">
              १. शेतकरी कक्ष (Farmer Portal)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              भाषिणी व्हॉइस इनपुट, थेट आर्बिट्राज तुलना (Mandi vs APMC vs Mill), AI भाव अंदाज, पारदर्शक खर्च वजावट, PWA ऑफलाइन IndexedDB व SMS पर्याय.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-400 gap-1">
              <span>प्रवेश करा</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Portal B: Mill & Adat Portal */}
          <Link
            href="/mill"
            className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-slate-800 hover:border-amber-500/60 shadow-xl transition-all hover:scale-[1.02]"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-4 group-hover:text-amber-300 transition-colors">
              २. अडत व मिल कक्ष (Adat & Mill Portal)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              दैनिक दर प्रकाशन, ML-संचलित &gt;२०% APMC आउटलायर इशारा, येणाऱ्या शेतीमालाचे लाइव्ह काउंटडाउन, डिजिटल वजन पावती व UPI Route एस्क्रो रिलीज.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-400 gap-1">
              <span>प्रवेश करा</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Portal C: Transporter Reverse Auction */}
          <Link
            href="/transporter"
            className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950/40 border border-slate-800 hover:border-sky-500/60 shadow-xl transition-all hover:scale-[1.02]"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-sky-950 transition-colors">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-4 group-hover:text-sky-300 transition-colors">
              ३. वाहतूकदार लिलाव (Transporter Engine)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              १०-मिनिटांचा थेट Socket.io रिव्हर्स ऑक्शन, -₹२०/-₹५० झटपट बोली, ₹६५० फ्लोअर प्राईस संरक्षण (हार्ड सर्वर व्हॅलिडेशन), AI संगनमत शोध.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-sky-400 gap-1">
              <span>प्रवेश करा</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* Compliance Footer Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>कायदेशीर संरक्षण:</strong> महाराष्ट्र APMC कायदा व RBI पेमेंट एग्रीगेटर मार्गदर्शक तत्त्वांशी १००% सुसंगत नॉन-कस्टोडियल मॉडेल.
            </span>
          </div>
          <Link
            href="/compliance"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold flex items-center gap-1 transition-colors flex-shrink-0"
          >
            <span>COMPLIANCE.md व कायदेशीर विश्लेषण वाचा</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>
    </div>
  );
}
