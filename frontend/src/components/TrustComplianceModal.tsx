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

  const trustText: Record<string, any> = {
    en: {
      title: 'Trust & Compliance — Non-Custodial Agreement',
      subtitle: 'Maharashtra APMC Act & RBI Digital Escrow Compliance',
      selectedBuyer: 'Selected Counterparty:',
      license: 'Statutory License:',
      lockedRate: 'Locked Rate',
      rule1Title: '1. Simulated Non-Custodial Escrow Architecture',
      rule1Desc: 'ShetkariSetu acts strictly as a Technology Service Provider (TSP) and does not take custody of transaction funds. Buyer funds are held directly in an RBI-compliant bank escrow pool (simulated via Razorpay Route pattern) and programmatically split upon weighbridge confirmation.',
      rule2Title: '2. Full Alignment with Maharashtra APMC Rules',
      rule2Desc: 'The platform operates alongside licensed APMC traders and certified direct processors (DML holders) rather than circumventing them. Mandated statutory cess (1.05%) is transparently calculated and audited in the settlement stream.',
      splitTitle: 'Programmatic Split Breakdown',
      farmerNet: 'Farmer Net',
      transporterShare: 'Transporter',
      mandiCess: 'Mandi Cess',
      consentLabel: 'I accept the terms of the Non-Custodial Tripartite Price-Lock Memorandum. Quality grade FAQ moisture threshold (<10%) applies.',
      cancelBtn: 'Cancel',
      confirmBtn: 'Lock Price & Activate 3h Escrow',
    },
    mr: {
      title: 'कायदेशीर डिजिटल संमती व एस्क्रो करार',
      subtitle: 'महाराष्ट्र APMC कायदा व RBI मार्गदर्शक तत्त्वांचे पालन',
      selectedBuyer: 'निवडलेला खरेदीदार:',
      license: 'परवाना क्र:',
      lockedRate: 'लॉक दर',
      rule1Title: '१. रक्कम थेट बँक खात्यात (Non-Custodial Escrow)',
      rule1Desc: 'शेतकरी सेतू हे व्यासपीठ शेतकऱ्यांचे पैसे स्वतःच्या खात्यात कधीही ठेवत नाही. खरेदीदाराची रक्कम शेड्युल्ड बँकेच्या अधिकृत एस्क्रो खात्यात (उदा. Razorpay Route / UPI Escrow Rails प्रमाणे) सुरक्षित राखीव ठेवली जाते. मालाचे वजन झाल्यावर थेट शेतकऱ्याच्या बँक खात्यात वर्ग होते.',
      rule2Title: '२. APMC कायद्याशी सुसंगतता (No Illegal Disintermediation)',
      rule2Desc: 'हे व्यासपीठ APMC यंत्रणेला बगल देत नाही, तर परवानाधारक अडते व थेट खरेदी परवानाधारक (Direct Marketing License) ऑईल मिल कंपन्यांसोबत काम करते. APMC सेस (१.०५%) पूर्ण पारदर्शकतेने नोंदवला जातो.',
      splitTitle: 'रक्कम वाटप सूत्र (Split Settlement)',
      farmerNet: 'शेतकरी वाटा',
      transporterShare: 'वाहतूकदार',
      mandiCess: 'मंडी सेस',
      consentLabel: 'मी प्रमाणित करतो/करते की वरील अटी मला मान्य आहेत. मालाची गुणवत्ता (FAQ ओलावा < १०%) असल्यास हा भाव ३ तास सुरक्षित राहील.',
      cancelBtn: 'रद्द करा',
      confirmBtn: 'भाव लॉक करा व ३-तास एस्क्रो सुरू करा',
    },
    hi: {
      title: 'कानूनी डिजिटल सहमति एवं एस्क्रो अनुबंध',
      subtitle: 'महाराष्ट्र APMC अधिनियम एवं RBI दिशानिर्देशों का पूर्ण अनुपालन',
      selectedBuyer: 'चयनित क्रेता:',
      license: 'लाइसेंस क्र:',
      lockedRate: 'लॉक दर',
      rule1Title: '1. राशि सीधे बैंक खाते में (Non-Custodial Escrow)',
      rule1Desc: 'शेतकरी सेतु प्लेटफॉर्म किसानों का पैसा कभी भी अपने खाते में नहीं रखता। क्रेता की राशि अनुसूचित बैंक के अधिकृत एस्क्रो खाते में सुरक्षित रखी जाती है और वजन पर्ची मिलते ही सीधे किसान के खाते में ट्रांसफर होती है।',
      rule2Title: '2. APMC कानून के साथ पूर्ण समन्वय',
      rule2Desc: 'यह मंच APMC व्यवस्था को बायपास नहीं करता, बल्कि पंजीकृत आढ़तियों और लाइसेंस प्राप्त प्रोसेसरों के साथ कार्य करता है। अनिवार्य APMC उपकर (1.05%) पूरी पारदर्शिता से काटा जाता है।',
      splitTitle: 'राशि विभाजन सूत्र (Split Settlement)',
      farmerNet: 'किसान का हिस्सा',
      transporterShare: 'ट्रांसपोर्टर',
      mandiCess: 'मंडी सेस',
      consentLabel: 'मैं प्रमाणित करता/करती हूं कि उपर्युक्त शर्तें मुझे स्वीकार हैं। गुणवत्ता मानक (नमी < 10%) होने पर यह दर 3 घंटे सुरक्षित रहेगी।',
      cancelBtn: 'रद्द करें',
      confirmBtn: 'भाव लॉक करें एवं 3-घंटे एस्क्रो शुरू करें',
    },
    kn: {
      title: 'ಕಾನೂನು ಡಿಜಿಟಲ್ ಸಮ್ಮತಿ & ಎಸ್ಕ್ರೋ ಒಪ್ಪಂದ',
      subtitle: 'ಮಹಾರಾಷ್ಟ್ರ APMC ಕಾಯ್ದೆ ಮತ್ತು RBI ನಿಯಮಗಳ ಅನುಸರಣೆ',
      selectedBuyer: 'ಆಯ್ಕೆಮಾಡಿದ ಖರೀದಿದಾರ:',
      license: 'ಪರವಾನಗಿ ಸಂ:',
      lockedRate: 'ಲಾಕ್ ಮಾಡಿದ ದರ',
      rule1Title: '1. ನೇರ ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋ ವ್ಯವಸ್ಥೆ (Non-Custodial)',
      rule1Desc: 'ಶೇತ್ಕರಿ ಸೇತು ಹಣವನ್ನು ತನ್ನ ಖಾತೆಯಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳುವುದಿಲ್ಲ. ಖರೀದಿದಾರರ ಹಣ ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋ ಖಾತೆಯಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ ಮತ್ತು ತೂಕ ದೃಢಪಟ್ಟ ನಂತರ ನೇರವಾಗಿ ಜಮೆಯಾಗುತ್ತದೆ.',
      rule2Title: '2. APMC ನಿಯಮಗಳಿಗೆ ಸಂಪೂರ್ಣ ಬದ್ಧತೆ',
      rule2Desc: 'ವೇದಿಕೆಯು ಪರವಾನಗಿ ಪಡೆದ ವರ್ತಕರು ಮತ್ತು ಮಿಲ್‌ಗಳೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. APMC ಸೆಸ್ (1.05%) ಅನ್ನು ಪಾರದರ್ಶಕವಾಗಿ ಕಡಿತಗೊಳಿಸಲಾಗುತ್ತದೆ.',
      splitTitle: 'ಹಣ ವಿಭಜನೆ ಸೂತ್ರ (Split Settlement)',
      farmerNet: 'ರೈತರ ಪಾಲು',
      transporterShare: 'ಸಾರಿಗೆದಾರರು',
      mandiCess: 'ಮಂಡಿ ಸೆಸ್',
      consentLabel: 'ನಾನು ಮೇಲಿನ ನಿಯಮಗಳನ್ನು ಒಪ್ಪುತ್ತೇನೆ. ಗುಣಮಟ್ಟದ ಮಾನದಂಡ ಅನ್ವಯವಾಗುತ್ತದೆ ಮತ್ತು ಬೆಲೆ 3 ಗಂಟೆಗಳ ಕಾಲ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.',
      cancelBtn: 'ರದ್ದುಮಾಡಿ',
      confirmBtn: 'ಬೆಲೆ ಲಾಕ್ ಮಾಡಿ & ಎಸ್ಕ್ರೋ ಸಕ್ರಿಯಗೊಳಿಸಿ',
    },
    te: {
      title: 'చట్టపరమైన డిజిటల్ సమ్మతి & ఎస్క్రో ఒప్పందం',
      subtitle: 'మహారాష్ట్ర APMC చట్టం & RBI నిబంధనల అనుసరణ',
      selectedBuyer: 'ఎంచుకున్న కొనుగోలుదారు:',
      license: 'లైసెన్స్ నం:',
      lockedRate: 'లాక్ చేసిన ధర',
      rule1Title: '1. ప్రత్యక్ష బ్యాంక్ ఎస్క్రో విధానం (Non-Custodial)',
      rule1Desc: 'శేత్కరీ సేతు లావాదేవీల నిధులను తన వద్ద ఉంచుకోదు. నిధులు నేరుగా బ్యాంక్ ఎస్క్రో ఖాతాలో ఉంటాయి మరియు బరువు ధృవీకరించిన వెంటనే ఖాతాలోకి జమ అవుతాయి.',
      rule2Title: '2. APMC చట్టానికి సంపూర్ణ అనుకూలత',
      rule2Desc: 'ప్లాట్‌ఫారమ్ లైసెన్స్ పొందిన వ్యాపారులు మరియు మిల్లులతో కలిసి పనిచేస్తుంది. APMC సెస్ (1.05%) పారదర్శకంగా లెక్కించబడుతుంది.',
      splitTitle: 'నిధుల విభజన విధానం (Split Settlement)',
      farmerNet: 'రైతు నికర మొత్తం',
      transporterShare: 'రవాణాదారు',
      mandiCess: 'మండీ సెస్',
      consentLabel: 'నేను పై నిబంధనలను అంగీకరిస్తున్నాను. నాణ్యతా ప్రమాణాలు వర్తిస్తాయి మరియు ఈ ధర 3 గంటలు సురక్షితంగా ఉంటుంది.',
      cancelBtn: 'రద్దు చేయండి',
      confirmBtn: 'ధర లాక్ చేసి 3 గంటల ఎస్క్రో ప్రారంభించండి',
    },
    gu: {
      title: 'કાનૂની ડિજિટલ સંમતિ અને એસ્ક્રો કરાર',
      subtitle: 'મહારાષ્ટ્ર APMC કાયદો અને RBI માર્ગદર્શિકાનું પાલન',
      selectedBuyer: 'પસંદ કરેલ ખરીદદાર:',
      license: 'લાયસન્સ નં:',
      lockedRate: 'લોક કરેલ દર',
      rule1Title: '1. સીધી બેંક એસ્ક્રો વ્યવસ્થા (Non-Custodial)',
      rule1Desc: 'શેતકરી સેતુ પૈસા પોતાના ખાતામાં ક્યારેય રાખતું નથી. ખરીદદારની રકમ બેંક એસ્ક્રો ખાતામાં સુરક્ષિત રહે છે અને વજન થતાં જ સીધી ખાતામાં જમા થાય છે.',
      rule2Title: '2. APMC કાયદાનું સંપૂર્ણ પાલન',
      rule2Desc: 'આ મંચ માન્ય વેપારીઓ અને પ્રોસેસરો સાથે મળીને કામ કરે છે. APMC સેસ (1.05%) સંપૂર્ણ પારદર્શિતાથી નોંધવામાં આવે છે.',
      splitTitle: 'રકમ વહેંચણી સૂત્ર (Split Settlement)',
      farmerNet: 'ખેડૂતનો હિસ્સો',
      transporterShare: 'ટ્રાન્સપોર્ટર',
      mandiCess: 'મંડી સેસ',
      consentLabel: 'હું ઉપરોક્ત શરતો સ્વીકારું છું. ગુણવત્તા માનક લાગુ પડશે અને આ ભાવ 3 કલાક સુધી સુરક્ષિત રહેશે.',
      cancelBtn: 'રદ કરો',
      confirmBtn: 'ભાવ લોક કરો અને 3-કલાક એસ્ક્રો શરૂ કરો',
    }
  };

  const tTxt = trustText[lang] || trustText.en;

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
                {tTxt.title}
              </h3>
              <p className="text-xs text-emerald-300/70">
                {tTxt.subtitle}
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
                {tTxt.selectedBuyer}
              </span>
              <div className="text-sm font-bold text-white mt-0.5">{selectedOption.buyerName}</div>
              <div className="text-emerald-300 text-[11px]">
                {tTxt.license} {selectedOption.licenseNumber}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">{tTxt.lockedRate}</span>
              <span className="text-lg font-black text-emerald-300">₹{selectedOption.ratePerQuintal}/Qtl</span>
            </div>
          </div>

          {/* Core Regulatory Explainer 1: Non-Custodial Escrow */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>
                {tTxt.rule1Title}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {tTxt.rule1Desc}
            </p>
          </div>

          {/* Core Regulatory Explainer 2: APMC Law Alignment */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>
                {tTxt.rule2Title}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {tTxt.rule2Desc}
            </p>
          </div>

          {/* Settlement Breakdown Preview */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h4 className="text-[11px] font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{tTxt.splitTitle}</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                <span className="text-[10px] text-slate-400 block">{tTxt.farmerNet}</span>
                <span className="font-bold text-emerald-300">₹{selectedOption.breakdown.netTakeHome.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{tTxt.transporterShare}</span>
                <span className="font-bold text-amber-300">₹{selectedOption.transportCost}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{tTxt.mandiCess}</span>
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
              {tTxt.consentLabel}
            </span>
          </label>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            {tTxt.cancelBtn}
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
            <span>{tTxt.confirmBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
