'use client';

import React, { useState } from 'react';
import { TrendingUp, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, MapPin, Award, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

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
  onLockPrice: (option: ArbitrageOption) => void;
  lowBandwidth: boolean;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({
  option,
  isBest,
  onLockPrice,
  lowBandwidth
}) => {
  const { lang, dict } = useLanguage();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getBuyerTypeLabel = (type: string) => {
    const labels: Record<string, Record<Language, string>> = {
      MILL: {
        en: 'Direct Oil Mill (DML Licensed)',
        mr: 'थेट ऑईल मिल (डायरेक्ट खरेदी परवाना)',
        hi: 'सीधी ऑइल मिल (DML लाइसेंस प्राप्त)',
        kn: 'ನೇರ ಆಯಿಲ್ ಮಿಲ್ (ಪರವಾನಗಿ)',
        te: 'ప్రత్యక్ష ఆయిల్ మిల్లు (లైసెన్స్)',
        gu: 'સીધી ઓઇલ મિલ (DML લાયસન્સ)'
      },
      APMC_ADAT: {
        en: 'Latur APMC Main Yard (Licensed Adat)',
        mr: 'लातूर APMC मुख्य यार्ड (नोंदणीकृत अडत)',
        hi: 'लातूर APMC मुख्य यार्ड (पंजीकृत आढ़त)',
        kn: 'ಲಾತೂರ್ APMC ಮುಖ್ಯ ಯಾರ್ಡ್',
        te: 'లాతూర్ APMC ప్రధాన మార్కెట్',
        gu: 'લાતૂર APMC મુખ્ય યાર્ડ (લાઇસન્સ)'
      },
      LOCAL_MANDI: {
        en: 'Local Sub-Mandi Yard',
        mr: 'स्थानिक उपबाजार',
        hi: 'स्थानीय उप-मंडी यार्ड',
        kn: 'ಸ್ಥಳೀಯ ಉಪ-ಮಾರುಕಟ್ಟೆ',
        te: 'స్థానిక ఉప-మార్కెట్',
        gu: 'સ્થાનિક સબ-મંડી યાર્ડ'
      }
    };
    return labels[type]?.[lang] || labels[type]?.en || 'Market Buyer';
  };

  const bestBadgeText: Record<Language, string> = {
    en: 'Max Net Take-Home',
    mr: 'सर्वोत्तम निव्वळ नफा',
    hi: 'अधिकतम शुद्ध लाभ',
    kn: 'ಗರಿಷ್ಠ ನಿವ್ವಳ ಲಾಭ',
    te: 'గరిష్ట నికర లాభం',
    gu: 'મહત્તમ ચોખ્ખો નફો'
  };

  const netTakeHomeDirectBankLabel: Record<Language, string> = {
    en: 'Net Take-Home (Direct Bank Credit):',
    mr: 'निव्वळ हातात येणारी रक्कम (थेट बँक खात्यात):',
    hi: 'शुद्ध हाथ में आने वाली राशि (सीधे बैंक खाते में):',
    kn: 'ನಿವ್ವಳ ಕೈಗೆ ಸಿಗುವ ಮೊತ್ತ (ಬ್ಯಾಂಕ್ ಜಮೆ):',
    te: 'చేతికందే నికర మొత్తం (బ్యాంకు జమ):',
    gu: 'ચોખ્ખી રકમ (સીધી બેંક જમા):'
  };

  const buyerDetails: Record<string, Record<Language, { name: string; route: string; rec: string; insight: string }>> = {
    BUYER_MILL_01: {
      en: {
        name: 'Kirti Gold Agro Oil Mill (MIDC Latur)',
        route: '41 km (via NH 361)',
        rec: 'Holding Recommended (+3.2% in 48h)',
        insight: 'Latur oil mills running high crush capacity; demand expected to surge this week.'
      },
      mr: {
        name: 'कीर्ती गोल्ड ॲग्रो ऑईल मिल (MIDC लातूर)',
        route: '४१ किमी (NH 361 महामार्ग)',
        rec: 'साठवणूक शिफारस (+३.२% पुढील ४८ तासांत)',
        insight: 'लातूर ऑईल मिल क्रशिंग क्षमता उच्च; मागणी वाढण्याची शक्यता.'
      },
      hi: {
        name: 'कीर्ति गोल्ड एग्रो ऑइल मिल (MIDC लातूर)',
        route: '41 किमी (NH 361 हाईवे)',
        rec: 'होल्डिंग की सलाह (+3.2% 48 घंटे में)',
        insight: 'लातूर ऑइल मिल क्रशिंग क्षमता उच्च; मांग बढ़ने की संभावना।'
      },
      kn: {
        name: 'ಕೀರ್ತಿ ಗೋಲ್ಡ್ ಆಗ್ರೋ ಆಯಿಲ್ ಮಿಲ್ (MIDC ಲಾತೂರ್)',
        route: '41 ಕಿಮೀ (NH 361 ಹೆದ್ದಾರಿ)',
        rec: 'ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳಲು ಶಿಫಾರಸು (+3.2%)',
        insight: 'ಲಾತೂರ್ ಆಯಿಲ್ ಮಿಲ್ ಕ್ರಶಿಂಗ್ ಸಾಮರ್ಥ್ಯ ಹೆಚ್ಚಿದ್ದು, ಬೇಡಿಕೆ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ.'
      },
      te: {
        name: 'కీర్తి గోల్డ్ ఆగ్రో ఆయిల్ మిల్లు (MIDC లాతూర్)',
        route: '41 కి.మీ (NH 361 హైవే)',
        rec: 'నిల్వ ఉంచడం శ్రేయస్కరం (+3.2%)',
        insight: 'లాతూర్ ఆయిల్ మిల్లులో క్రషింగ్ సామర్థ్యం ఎక్కువ; డిమాండ్ పెరిగే అవకాశం ఉంది.'
      },
      gu: {
        name: 'કીર્તિ ગોલ્ડ એગ્રો ઓઇલ મિલ (MIDC લાતૂર)',
        route: '41 કિમી (NH 361 હાઇવે)',
        rec: 'સ્ટોક રાખવાની ભલામણ (+3.2%)',
        insight: 'લાતૂર ઓઇલ મિલ ક્રશિંગ ક્ષમતા ઊંચી; માંગ વધવાની શક્યતા.'
      }
    },
    BUYER_APMC_01: {
      en: {
        name: 'Latur APMC Market Yard (Main Yard Adat)',
        route: '38 km (via Ausa-Latur Rd)',
        rec: 'Bullish (+2.8% likely)',
        insight: 'Arrival volumes moderate; strong competitive bidding among licensed Adatyas.'
      },
      mr: {
        name: 'लातूर APMC मुख्य यार्ड (नोंदणीकृत अडत)',
        route: '३८ किमी (औसा-लातूर मार्ग)',
        rec: 'दरवाढ संभव (+२.८%)',
        insight: 'लातूर बाजारात आवक मध्यम; अडत्यांमध्ये चुरस.'
      },
      hi: {
        name: 'लातूर APMC मुख्य मंडी (पंजीकृत आढ़त)',
        route: '38 किमी (औसा-लातूर मार्ग)',
        rec: 'तेजी संभव (+2.8%)',
        insight: 'लातूर मंडी में आवक मध्यम; आढ़तियों में प्रतिस्पर्धा।'
      },
      kn: {
        name: 'ಲಾತೂರ್ APMC ಮುಖ್ಯ ಯಾರ್ಡ್ (ಆಡತ್)',
        route: '38 ಕಿಮೀ (ಔಸಾ-ಲಾತೂರ್ ರಸ್ತೆ)',
        rec: 'ಬೆಲೆ ಏರಿಕೆ ಸಾಧ್ಯತೆ (+2.8%)',
        insight: 'ಮಾರುಕಟ್ಟೆಗೆ ಸರಕು ಸಾಧಾರಣವಾಗಿದ್ದು, ವರ್ತಕರಲ್ಲಿ ಸ್ಪರ್ಧೆ ಇದೆ.'
      },
      te: {
        name: 'లాతూర్ APMC ప్రధాన మార్కెట్ (ఆడత్)',
        route: '38 కి.మీ (ఔసా-లాతూర్ రోడ్డు)',
        rec: 'ధరల పెరుగుదల అవకాశం (+2.8%)',
        insight: 'లాతూర్ మార్కెట్లో రాక సాధారణం; వ్యాపారులలో తీవ్ర పోటీ.'
      },
      gu: {
        name: 'લાતૂર APMC મુખ્ય યાર્ડ (લાઇસન્સ આડત)',
        route: '38 કિમી (ઔસા-લાતૂર રોડ)',
        rec: 'ભાવ વધવાની શક્યતા (+2.8%)',
        insight: 'લાતૂર યાર્ડમાં આવક મધ્યમ; વેપારીઓમાં હરીફાઈ.'
      }
    },
    BUYER_LOCAL_01: {
      en: {
        name: 'Ausa / Lamjana Sub-Mandi (Local Yard)',
        route: '12 km (Local Village Road)',
        rec: 'Distress / Under-benchmarked (-₹420)',
        insight: 'Intermediary margins high; buying rate ₹420 below APMC benchmark.'
      },
      mr: {
        name: 'औसा / लामजणा स्थानिक उपबाजार',
        route: '१२ किमी (स्थानिक रस्ता)',
        rec: 'तोट्याची विक्री (बेंचमार्कपेक्षा -₹४२०)',
        insight: 'मध्यस्थांचे मार्जिन जास्त; बेंचमार्कपेक्षा ₹४२० कमी दर.'
      },
      hi: {
        name: 'औसा / लामजना स्थानीय उप-मंडी',
        route: '12 किमी (ग्रामीण संपर्क मार्ग)',
        rec: 'कम भाव (बेंचमार्क से -₹420)',
        insight: 'बिचौलियों का मार्जिन अधिक; बेंचमार्क से ₹420 कम दर।'
      },
      kn: {
        name: 'ಔಸಾ / ಲಾಂಜನಾ ಸ್ಥಳೀಯ ಉಪ-ಮಾರುಕಟ್ಟೆ',
        route: '12 ಕಿಮೀ (ಗ್ರಾಮೀಣ ರಸ್ತೆ)',
        rec: 'ಕಡಿಮೆ ಬೆಲೆ (ಮಾನದಂಡಕ್ಕಿಂತ -₹420)',
        insight: 'ದಲ್ಲಾಳಿಗಳ ಕಮಿಷನ್ ಹೆಚ್ಚು; ಮಾನದಂಡಕ್ಕಿಂತ ₹420 ಕಡಿಮೆ ದರ.'
      },
      te: {
        name: 'ఔసా / లాంజనా స్థానిక ఉప-మార్కెట్',
        route: '12 కి.మీ (గ్రామీణ రహదారి)',
        rec: 'తక్కువ ధర (ప్రమాణం కంటే -₹420)',
        insight: 'దళారుల కమీషన్ ఎక్కువ; ప్రమాణ ధర కంటే ₹420 తక్కువ.'
      },
      gu: {
        name: 'ઔસા / લામજના સ્થાનિક સબ-યાર્ડ',
        route: '12 કિમી (સ્થાનિક ગ્રામ્ય રસ્તો)',
        rec: 'ઓછો ભાવ (બેન્ચમાર્કથી -₹420)',
        insight: 'વચેટિયાઓનું કમિશન વધુ; બેન્ચમાર્ક કરતાં ₹420 ઓછો ભાવ.'
      }
    }
  };

  const localizedBuyer = buyerDetails[option.id]?.[lang] || buyerDetails[option.id]?.en;
  const displayBuyerName = localizedBuyer?.name || option.buyerName;
  const displayRoute = localizedBuyer?.route || option.transportDistanceLabel;
  const displayRec = localizedBuyer?.rec || option.aiTrend.recommendation;
  const displayInsight = localizedBuyer?.insight || option.aiTrend.insight;

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
            <span>{bestBadgeText[lang] || bestBadgeText.en}</span>
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
          <h3 className="text-base font-bold text-white mt-1.5">{displayBuyerName}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
            <span>{displayRoute}</span>
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
              {displayRec}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">ML Conf: 91%</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-300/80 leading-relaxed">
          {displayInsight}
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
              <span>{netTakeHomeDirectBankLabel[lang] || netTakeHomeDirectBankLabel.en}</span>
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
