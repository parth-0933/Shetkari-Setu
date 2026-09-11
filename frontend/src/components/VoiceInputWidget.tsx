'use client';

import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, CheckCircle2, RefreshCw, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

interface VoiceInputWidgetProps {
  onFormFilled: (data: { crop: string; quantity: number; village: string }) => void;
  lowBandwidth: boolean;
}

export const VoiceInputWidget: React.FC<VoiceInputWidgetProps> = ({
  onFormFilled,
  lowBandwidth
}) => {
  const { lang, dict, speakText } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [detectedEntities, setDetectedEntities] = useState<any | null>(null);

  const samplePhrases: Record<Language, { text: string; audioResponse: string }> = {
    mr: {
      text: 'माझ्याकडे लामजणा येथे १५ क्विंटल सोयाबीन आहे, उत्तम भाव कुठे मिळेल?',
      audioResponse: '१५ क्विंटल सोयाबीन नोंदवले गेले आहे. सर्वोत्तम भाव कीर्ती गोल्ड मिल लातूर येथे ४,९५० रुपये प्रति क्विंटल आहे.'
    },
    hi: {
      text: 'मेरे पास लामजना में 15 क्विंटल सोयाबीन है, सबसे अच्छा भाव कहां मिलेगा?',
      audioResponse: '15 क्विंटल सोयाबीन दर्ज हो गया है। सबसे अच्छा भाव कीर्ति गोल्ड मिल लातूर में 4,950 रुपये प्रति क्विंटल है।'
    },
    en: {
      text: 'I have 15 quintals of soybean in Lamjana, where can I get the best price?',
      audioResponse: '15 quintals of soybean registered. The best price is at Kirti Gold Mill Latur at 4,950 rupees per quintal.'
    },
    kn: {
      text: 'ನನ್ನ ಬಳಿ ಲಾಂಜನಾದಲ್ಲಿ 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ ಇದೆ, ಉತ್ತಮ ಬೆಲೆ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?',
      audioResponse: '15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ ದಾಖಲಾಗಿದೆ. ಅತ್ಯುತ್ತಮ ಬೆಲೆ ಕೀರ್ತಿ ಗೋಲ್ಡ್ ಮಿಲ್ ಲಾತೂರ್‌ನಲ್ಲಿ 4,950 ರೂಪಾಯಿ ಆಗಿದೆ.'
    },
    te: {
      text: 'నా వద్ద లాంజనాలో 15 క్వింటాళ్ల సోయాబీన్ ఉంది, మంచి ధర ఎక్కడ లభిస్తుంది?',
      audioResponse: '15 క్వింటాళ్ల సోయాబీన్ నమోదు చేయబడింది. కీర్తి గోల్డ్ మిల్లు లాతూరులో క్వింటాలుకు 4,950 రూపాయల అత్యుత్తమ ధర ఉంది.'
    },
    gu: {
      text: 'મારી પાસે લામજનામાં 15 ક્વિન્ટલ સોયાબીન છે, સૌથી સારો ભાવ ક્યાં મળશે?',
      audioResponse: '15 ક્વિન્ટલ સોયાબીન નોંધાયું છે. સૌથી સારો ભાવ કીર્તિ ગોલ્ડ મિલ લાતૂર ખાતે 4,950 રૂપિયા પ્રતિ ક્વિન્ટલ છે.'
    }
  };

  const currentSample = samplePhrases[lang] || samplePhrases.mr;

  const handleSimulateVoice = async () => {
    setIsRecording(true);
    setTranscript(null);
    setDetectedEntities(null);

    // Simulate speech audio input
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
        
        const capturedText = currentSample.text;
        setTranscript(capturedText);

        const parsed = {
          crop: 'Soybean',
          cropTranslated: lang === 'mr' || lang === 'hi' ? 'सोयाबीन' : lang === 'kn' ? 'ಸೋಯಾಬೀನ್' : lang === 'te' ? 'సోయాబీన్' : lang === 'gu' ? 'સોયાબીન' : 'Soybean',
          quantityQuintals: 15,
          village: 'Lamjana, Ausa',
          confidence: 0.96
        };
        setDetectedEntities(parsed);

        onFormFilled({
          crop: parsed.crop,
          quantity: parsed.quantityQuintals,
          village: parsed.village
        });

        // Trigger Audio Speech Response in native language!
        speakText(currentSample.audioResponse);

      } catch (err) {
        setTranscript(currentSample.text);
        setDetectedEntities({
          crop: 'Soybean',
          quantityQuintals: 15,
          village: 'Lamjana, Ausa',
          confidence: 0.95
        });
        onFormFilled({ crop: 'Soybean', quantity: 15, village: 'Lamjana, Ausa' });
        speakText(currentSample.audioResponse);
      } finally {
        setProcessing(false);
      }
    }, 1500);
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
                भाषिणी Bhashini AI
              </span>
            </h3>
            <p className="text-[11px] text-emerald-300/70">{dict.voiceSubtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => speakText(currentSample.audioResponse)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs flex items-center gap-1 transition-colors"
          title="Play Audio Voice Feedback / आवाज ऐका"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Audio</span>
        </button>
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
            <span>{isRecording ? dict.listening : processing ? 'AI Processing Speech...' : currentSample.text}</span>
          </button>
          
          <p className="mt-1.5 text-[11px] text-slate-400">
            {lang === 'mr' && 'व्हॉइस किंवा व्हॉट्सॲप ऑडिओने शेतकरी कोणत्याही भारतीय भाषेत सहज बोलू शकतात.'}
            {lang === 'hi' && 'किसान किसी भी भारतीय भाषा में बोलकर तुरंत सर्वोत्तम भाव खोज सकते हैं।'}
            {lang === 'en' && 'Enables farmers in remote rural regions to discover prices hands-free in any Indian language.'}
            {lang === 'kn' && 'ರೈತರು ಯಾವುದೇ ಭಾರತೀಯ ಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿಯ ಮೂಲಕ ಸುಲಭವಾಗಿ ಮಾರುಕಟ್ಟೆ ದರಗಳನ್ನು ತಿಳಿಯಬಹುದು.'}
            {lang === 'te' && 'రైతులు ఏ భారతీయ భాషలోనైనా మాట్లాడి వెంటనే ఉత్తమ మార్కెట్ ధరలను తెలుసుకోవచ్చు.'}
            {lang === 'gu' && 'ખેડૂતો કોઈપણ ભારતીય ભાષામાં બોલીને તરત જ શ્રેષ્ઠ બજાર ભાવ શોધી શકે છે.'}
          </p>
        </div>
      </div>

      {/* Real-time Parsed Speech Feedback */}
      {transcript && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-900/40 border border-emerald-600/40 text-xs animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                Bhashini Speech-to-Text Pipeline:
              </span>
              <p className="text-emerald-100 font-medium italic mt-0.5">"{transcript}"</p>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-800/60 px-2 py-0.5 rounded-full border border-emerald-600/50">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              96% Match
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
