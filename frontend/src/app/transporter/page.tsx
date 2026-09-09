'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ReverseAuctionConsole } from '@/components/ReverseAuctionConsole';
import { Language, t } from '@/lib/translations';
import { Truck, MapPin, Award, CheckCircle2, ShieldCheck, Navigation, Phone, Calendar, IndianRupee } from 'lucide-react';

export default function TransporterPortalPage() {
  const [lang, setLang] = useState<Language>('mr');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const dict = t[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(lang === 'mr' ? 'en' : 'mr')}
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth(!lowBandwidth)}
        isOnline={isOnline}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        
        {/* Transporter Profile Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">सचिन गायकवाड (Sachin Gaikwad)</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-800/60 text-sky-300 rounded-full border border-sky-600/40">
                  MH-24-AG-4412
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                बोलेरो मॅक्सी ट्रक • क्षमता: २५ क्विंटल • औसा फाटा (लामजणापासून ६ किमी)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-950/70 px-4 py-2 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">विश्वासार्हता (Rating)</span>
              <span className="text-sm font-bold text-amber-300">⭐ ४.८ / ५.०</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-400 block">यशस्वी फेऱ्या</span>
              <span className="text-sm font-bold text-emerald-400">११२ फेऱ्या</span>
            </div>
          </div>
        </div>

        {/* Trip GPS Acceptance Card (Pickup Details) */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start space-x-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">पिकअप स्थान (Pickup GPS)</span>
              <div className="font-bold text-white">तुकाराम पाटील यांचे शेत, लामजणा</div>
              <span className="text-[11px] text-emerald-300">अक्षांश: 18.257° N, रेखांश: 76.621° E</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Navigation className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">डिलिव्हरी ठिकाण (Destination)</span>
              <div className="font-bold text-white">कीर्ती गोल्ड ॲग्रो ऑईल मिल, MIDC लातूर</div>
              <span className="text-[11px] text-slate-400">अंतर: ४१ किमी (NH 361 महामार्ग)</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">भाडे सुरक्षितता (Escrow Secured)</span>
              <div className="font-bold text-white">बँक एस्क्रोमध्ये सुरक्षित राखीव</div>
              <span className="text-[11px] text-emerald-300">वजन झाल्यावर थेट UPI खात्यात वर्ग</span>
            </div>
          </div>
        </div>

        {/* Socket.io Reverse Auction Console */}
        <ReverseAuctionConsole
          tripId="TRIP_LAMJANA_LATUR_01"
          lang={lang}
          lowBandwidth={lowBandwidth}
        />

      </main>
    </div>
  );
}
