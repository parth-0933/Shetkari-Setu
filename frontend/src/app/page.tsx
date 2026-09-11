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
  CheckCircle2,
  User,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { lang, dict } = useLanguage();
  const { farmerUser, adatUser } = useAuth();
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

  const stageIcons = [Sprout, TrendingUp, ShieldCheck, Truck, Scale];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
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
                {dict.activeBenchmark}
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {dict.appTitle} — <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">{dict.heroHighlight || dict.appTitle}</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/80 max-w-3xl leading-relaxed">
              {dict.heroSubtitle}
            </p>

            {/* Ground Benchmark Scenario Card */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-emerald-600/40 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{dict.originLabel}</span>
                  <strong className="text-white">{dict.originVal}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Sprout className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{dict.produceLabel}</span>
                  <strong className="text-white">{dict.produceVal}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{dict.surplusLabel}</span>
                  <strong className="text-emerald-300 text-sm font-black">{dict.surplusVal}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{dict.complianceLabel}</span>
                  <strong className="text-white">{dict.complianceVal}</strong>
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
                <span>{dict.openFarmerPortalBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleStart90SecDemo}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-emerald-200 font-bold text-sm flex items-center gap-2 transition-all hover:border-emerald-400"
              >
                <Play className={`w-4 h-4 text-amber-400 ${isPlayingDemo ? 'animate-spin' : ''}`} />
                <span>{dict.liveDemo90SecBtn}</span>
              </button>

              <Link
                href="/login"
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-200 font-bold text-sm flex items-center gap-2 transition-all hover:border-amber-400 shadow-md"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>लॉगिन / नोंदणी</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 90-Second Walkthrough Stage Visualizer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>{dict.pipelineTitle}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {dict.pipelineSubtitle}
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              {dict.stepActive} {activeStep} {dict.stepActiveSuffix}
            </div>
          </div>

          {/* Step Progress Indicators */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-3">
            {dict.stages?.map((s: any, idx: number) => {
              const Icon = stageIcons[idx] || Sprout;
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
              {dict.stages?.[activeStep - 1]?.prompt}
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
                <span>{dict.runStageDirectlyBtn}</span>
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
              {dict.portalCards?.farmer?.title}
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {dict.portalCards?.farmer?.desc}
            </p>

            {/* Profile / Login status */}
            {farmerUser?.isLoggedIn ? (
              <div className="mt-3 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 font-semibold flex items-center justify-between">
                <span>👤 {farmerUser.name}</span>
                <span className="text-[10px] text-amber-300 font-bold">लॉगिन सक्रिय</span>
              </div>
            ) : (
              <div className="mt-3 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-700/60 text-[11px] text-slate-400 font-medium">
                लॉगिन / नोंदणी करून सुरू करा
              </div>
            )}

            <div className="mt-4 flex items-center text-xs font-bold text-emerald-400 gap-1">
              <span>{farmerUser?.isLoggedIn ? dict.portalCards?.farmer?.enterBtn : 'नोंदणी करा व सुरू करा'}</span>
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
              {dict.portalCards?.mill?.title}
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {dict.portalCards?.mill?.desc}
            </p>

            {/* Profile / Login status */}
            {adatUser?.isLoggedIn ? (
              <div className="mt-3 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-[11px] text-amber-300 font-semibold flex items-center justify-between">
                <span>🏢 {adatUser.businessName}</span>
                <span className="text-[10px] text-emerald-300 font-bold">परवाना सक्रिय</span>
              </div>
            ) : (
              <div className="mt-3 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-700/60 text-[11px] text-slate-400 font-medium">
                परवाना नोंदणी करून सुरू करा
              </div>
            )}

            <div className="mt-4 flex items-center text-xs font-bold text-amber-400 gap-1">
              <span>{adatUser?.isLoggedIn ? dict.portalCards?.mill?.enterBtn : 'नोंदणी करा व सुरू करा'}</span>
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
              {dict.portalCards?.transporter?.title}
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {dict.portalCards?.transporter?.desc}
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-sky-400 gap-1">
              <span>{dict.portalCards?.transporter?.enterBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* Compliance Footer Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>{dict.legalBanner?.title}</strong> {dict.legalBanner?.desc}
            </span>
          </div>
          <Link
            href="/compliance"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold flex items-center gap-1 transition-colors flex-shrink-0"
          >
            <span>{dict.legalBanner?.readMoreBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>
    </div>
  );
}
