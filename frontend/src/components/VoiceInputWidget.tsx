'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { Language, t } from '@/lib/translations';

interface VoiceInputWidgetProps {
  lang: Language;
  onFormFilled: (data: { crop: string; quantity: number; village: string }) => void;
  lowBandwidth: boolean;
}

export const VoiceInputWidget: React.FC<VoiceInputWidgetProps> = ({
  lang,
  onFormFilled,
  lowBandwidth
}) => {
  const dict = t[lang];
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [detectedEntities, setDetectedEntities] = useState<any | null>(null);

  const handleSimulateVoice = async () => {
    setIsRecording(true);
    setTranscript(null);
    setDetectedEntities(null);

    // Simulate voice recording wave for 1.8 seconds
    setTimeout(async () => {
      setIsRecording(false);
      setProcessing(true);

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${backendUrl}/api/voice/bhashini-stt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: lang, voiceInputScenario: 'benchmark' })
        });
        const json = await res.json();
        
        if (json.success) {
          setTranscript(json.data.transcript);
          setDetectedEntities(json.data.parsedEntities);
          onFormFilled({
            crop: json.data.parsedEntities.crop,
            quantity: json.data.parsedEntities.quantityQuintals,
            village: json.data.parsedEntities.village
          });
        }
      } catch (err) {
        // High-fidelity local fallback
        const fallbackText = lang === 'mr' 
          ? 'माझ्याकडे लामजणा येथे १५ क्विंटल सोयाबीन आहे, उत्तम भाव कुठे मिळेल?'
          : 'I have 15 quintals of soybean in Lamjana, where will I get the best price?';
        setTranscript(fallbackText);
        setDetectedEntities({
          crop: 'Soybean',
          cropMarathi: 'सोयाबीन',
          quantityQuintals: 15,
          village: 'Lamjana (लामजणा)',
          confidence: 0.96
        });
        onFormFilled({ crop: 'Soybean', quantity: 15, village: 'Lamjana, Ausa' });
      } finally {
        setProcessing(false);
      }
    }, 1600);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900/90 to-emerald-900/40 rounded-2xl border border-emerald-700/40 p-5 shadow-xl backdrop-blur-md">
      
      {/* Header with Bhashini Tag */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-800/40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-1.5">
              <span>{dict.voiceTitle}</span>
              <span className="px-2 py-0.2 text-[9px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                भाषिणी Bhashini ASR
              </span>
            </h3>
            <p className="text-[11px] text-emerald-300/70">{dict.voiceSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Voice Trigger Console */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Animated Mic Button */}
        <div className="relative flex-shrink-0">
          {isRecording && !lowBandwidth && (
            <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-40"></div>
          )}
          <button
            onClick={handleSimulateVoice}
            disabled={isRecording || processing}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isRecording
                ? 'bg-rose-600 text-white scale-110 shadow-rose-900/50'
                : 'bg-gradient-to-tr from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white shadow-emerald-900/40 hover:scale-105 active:scale-95'
            }`}
          >
            {isRecording ? (
              <Mic className="w-8 h-8 animate-pulse" />
            ) : processing ? (
              <RefreshCw className="w-8 h-8 animate-spin text-white" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Action Button & Explainer */}
        <div className="flex-1 w-full text-center sm:text-left">
          <button
            onClick={handleSimulateVoice}
            disabled={isRecording || processing}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-700/60 border border-emerald-500/40 text-emerald-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-emerald-400 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isRecording ? dict.listening : processing ? 'AI Processing Speech...' : dict.voiceSimulateBtn}</span>
          </button>
          
          <p className="mt-1.5 text-[11px] text-slate-400">
            {lang === 'mr' 
              ? 'ग्रामिण भागात शेतकरी न लिहिता फक्त व्हॉट्सॲप ऑडिओप्रमाणे बोलून भाव शोधू शकतात.'
              : 'Allows farmers in remote areas to discover rates hands-free via WhatsApp audio format.'}
          </p>
        </div>
      </div>

      {/* Real-time Parsed Speech Feedback */}
      {transcript && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-900/40 border border-emerald-600/40 text-xs animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                भाषिणी ASR Output:
              </span>
              <p className="text-emerald-100 font-medium italic mt-0.5">"{transcript}"</p>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-800/60 px-2 py-0.5 rounded-full border border-emerald-600/50">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              96% Conf.
            </span>
          </div>

          {detectedEntities && (
            <div className="mt-2.5 pt-2 border-t border-emerald-800/40 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-emerald-800/50 text-emerald-200">
                🌿 {dict.crop}: <strong>{detectedEntities.crop}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-800/50 text-emerald-200">
                ⚖️ {dict.quantity}: <strong>{detectedEntities.quantityQuintals} Quintals</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-800/50 text-emerald-200">
                📍 {dict.village}: <strong>{detectedEntities.village}</strong>
              </span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
