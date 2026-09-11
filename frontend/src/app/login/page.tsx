'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { AuthForm } from '@/components/AuthForm';
import { Sprout, Store, ShieldCheck, CheckCircle2, Banknote, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function LoginContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const initialRole = roleParam?.toLowerCase() === 'adat' || roleParam?.toLowerCase() === 'mill' ? 'ADAT' : 'FARMER';

  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

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

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth(!lowBandwidth)}
        isOnline={isOnline}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-center justify-center">
        
        {/* Intro Banner */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>शेतकरी सेतू — अधिकृत लॉगिन व नोंदणी (SIH 2026)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            नोंदणी करा व <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">पोर्टल सुरू करा</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            शेतकरी व आडत मालकांसाठी सुरक्षित व्यासपीठ. बँक खाते ऐच्छिक असून मालाची डिलिव्हरी झाल्यावर थेट रोख रक्कम मिळण्याची सुविधा उपलब्ध आहे.
          </p>

          {/* Key Feature Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <Banknote className="w-3.5 h-3.5 text-amber-400" />
              <span>थेट रोख (Cash) किंवा UPI</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>लातूर जिल्ह्यातील सर्व गावे</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>१-क्लिक चाचणी डेटा</span>
            </span>
          </div>
        </div>

        {/* The Authentication Form */}
        <AuthForm initialRole={initialRole} redirectOnSuccess={true} />

      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">लोड होत आहे...</div>}>
      <LoginContent />
    </Suspense>
  );
}
