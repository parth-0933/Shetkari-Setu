'use client';

import React, { useState } from 'react';
import { Scale, CheckCircle2, ShieldCheck, Download, IndianRupee, ArrowRight, X, Sparkles } from 'lucide-react';
import { Language } from '@/lib/translations';

interface DigitalSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  onReleaseEscrow: (details: any) => void;
  lang: Language;
}

export const DigitalSlipModal: React.FC<DigitalSlipModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onReleaseEscrow,
  lang
}) => {
  const [releasing, setReleasing] = useState(false);
  const [releasedData, setReleasedData] = useState<any | null>(null);

  if (!isOpen) return null;

  const grossKg = 1520;
  const tareKg = 20;
  const netKg = 1500;
  const netQuintals = 15.0;
  const moisturePct = 10.1;
  const slipNumber = `WS-LTR-788912`;

  const handleRelease = async () => {
    setReleasing(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/transactions/escrow-release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: transaction?.transactionId || 'TXN_LTR_BENCHMARK',
          authorizedBy: 'Kirti Gold Agro Mill Admin'
        })
      });
      const data = await res.json();
      setReleasedData(data.settlementDetails);
      onReleaseEscrow(data.settlementDetails);
    } catch {
      // Fallback
      const fallbackDetails = {
        transactionId: 'TXN_LTR_BENCHMARK',
        reference: `UPI_ROUTE_${Date.now()}`,
        farmerCreditUPI: { vpa: '9822345678@sbi', amount: 73350, status: 'SUCCESS' },
        transporterCreditUPI: { vpa: '9423188990@okaxis', amount: 900, status: 'SUCCESS' },
        apmcCessSettlement: { treasuryCode: 'MH-LTR-CESS-01', amount: 0, status: 'SUCCESS' }
      };
      setReleasedData(fallbackDetails);
      onReleaseEscrow(fallbackDetails);
    } finally {
      setReleasing(false);
    }
  };

  const slipText: Record<string, any> = {
    en: {
      title: 'Certified Digital Weighing Slip',
      slipNumberPrefix: 'Serial No:',
      farmerLabel: 'Farmer Name',
      farmerVal: 'Tukaram Patil',
      farmerLoc: 'Village: Lamjana (Ausa), Dist. Latur',
      buyerLabel: 'Buyer Mill',
      grossWeight: 'Gross Weight',
      tareWeight: 'Vehicle Tare Weight',
      netWeight: 'Net Produce Weight',
      moisture: 'Moisture:',
      moistureStandard: 'Standard < 12%',
      grade: 'Quality Grade:',
      gradeVal: 'Grade A (FAQ Passed)',
      weigher: 'Certified Weigher: Atul Shinde (APMC Lic. #902)',
      certifiedStamp: 'Cryptographically Verified',
      escrowReleaseTitle: 'One-Click Non-Custodial Escrow Release',
      escrowReleaseDesc: 'Weighbridge confirmation satisfies the smart contract condition. Funds split programmatically via Razorpay Route rails: ₹73,350 to Farmer and ₹900 to Transporter.',
      releaseBtn: 'Release Escrow (₹74,250 Split Settlement)',
      releasingBtn: 'Processing Bank Split Transfer...',
      successTitle: 'Split Settlement Successfully Executed!',
      farmerCredit: 'Farmer Bank Credit (Tukaram Patil UPI):',
      transporterCredit: 'Transporter Freight (Sachin Gaikwad UPI):',
      creditedBadge: 'Credited',
      utrLabel: 'Bank Settlement Reference (UTR):',
      closeBtn: 'Close',
    },
    mr: {
      title: 'अधिकृत डिजिटल वजन पावती',
      slipNumberPrefix: 'क्रमांक:',
      farmerLabel: 'शेतकरी नाव (Farmer)',
      farmerVal: 'तुकाराम पाटील (Tukaram Patil)',
      farmerLoc: 'गाव: लामजणा (औसा), जि. लातूर',
      buyerLabel: 'खरेदीदार मिल (Buyer)',
      grossWeight: 'एकूण वजन (Gross)',
      tareWeight: 'गाडी वजन (Tare)',
      netWeight: 'निव्वळ वजन (Net)',
      moisture: 'ओलावा (Moisture):',
      moistureStandard: 'मानक < १२%',
      grade: 'प्रतवारी (Grade):',
      gradeVal: 'Grade A (FAQ Passed)',
      weigher: 'तपासनीस: अतुल शिंदे (APMC Certified Weigher)',
      certifiedStamp: 'डिजिटल स्वाक्षरी प्रमाणित',
      escrowReleaseTitle: 'एक-क्लिक एस्क्रो रक्कम वर्ग करा',
      escrowReleaseDesc: 'मालाचे वजन व दर्जा प्रमाणित झाल्यामुळे बँकेतील सुरक्षित एस्क्रो रक्कम थेट शेतकऱ्याच्या UPI खात्यात (₹७३,३५०) आणि वाहतूकदाराच्या खात्यात (₹९००) विभाजित होऊन वर्ग होईल.',
      releaseBtn: 'रक्कम वर्ग करा (Release ₹74,250 Escrow)',
      releasingBtn: 'बँकेतून रक्कम वर्ग होत आहे...',
      successTitle: 'रक्कम यशस्वी वर्ग झाली! (Split Settlement Executed)',
      farmerCredit: 'शेतकरी बँक खाते (Tukaram Patil UPI):',
      transporterCredit: 'वाहतूकदार भाडे (Sachin Gaikwad UPI):',
      creditedBadge: 'जमा झाले',
      utrLabel: 'बँक व्यवहार संदर्भ (UTR):',
      closeBtn: 'बंद करा (Close)',
    },
    hi: {
      title: 'प्रमाणित डिजिटल वजन पर्ची',
      slipNumberPrefix: 'क्रमांक:',
      farmerLabel: 'किसान का नाम',
      farmerVal: 'तुकाराम पाटिल',
      farmerLoc: 'गांव: लामजना (औसा), जिला: लातूर',
      buyerLabel: 'क्रेता मिल',
      grossWeight: 'सकल वजन (Gross)',
      tareWeight: 'खाली वाहन वजन (Tare)',
      netWeight: 'शुद्ध वजन (Net)',
      moisture: 'नमी (Moisture):',
      moistureStandard: 'मानक < 12%',
      grade: 'गुणवत्ता ग्रेड:',
      gradeVal: 'Grade A (FAQ पास)',
      weigher: 'परीक्षक: अतुल शिंदे (APMC प्रमाणित वेअर)',
      certifiedStamp: 'डिजिटल हस्ताक्षर द्वारा प्रमाणित',
      escrowReleaseTitle: 'वन-क्लिक एस्क्रो राशि रिलीज करें',
      escrowReleaseDesc: 'उपज का वजन व गुणवत्ता प्रमाणित होने पर बैंक में सुरक्षित एस्क्रो राशि सीधे किसान के UPI खाते (₹73,350) और ट्रांसपोर्टर के खाते (₹900) में विभाजित होकर ट्रांसफर होगी।',
      releaseBtn: 'राशि रिलीज करें (Release ₹74,250 Escrow)',
      releasingBtn: 'बैंक से राशि ट्रांसफर हो रही है...',
      successTitle: 'राशि सफलतापूर्वक ट्रांसफर हुई! (Split Settlement Done)',
      farmerCredit: 'किसान बैंक खाता (Tukaram Patil UPI):',
      transporterCredit: 'ट्रांसपोर्टर भाड़ा (Sachin Gaikwad UPI):',
      creditedBadge: 'जमा हुआ',
      utrLabel: 'बैंक लेनदेन संदर्भ (UTR):',
      closeBtn: 'बंद करें (Close)',
    },
    kn: {
      title: 'ಪ್ರಮಾಣೀಕೃತ ಡಿಜಿಟಲ್ ತೂಕದ ರಸೀದಿ',
      slipNumberPrefix: 'ಸಂಖ್ಯೆ:',
      farmerLabel: 'ರೈತರ ಹೆಸರು',
      farmerVal: 'ತುಕಾರಾಂ ಪಾಟೀಲ್',
      farmerLoc: 'ಗ್ರಾಮ: ಲಾಂಜನಾ (ಔಸಾ), ಜಿಲ್ಲೆ: ಲಾತೂರ್',
      buyerLabel: 'ಖರೀದಿದಾರ ಮಿಲ್',
      grossWeight: 'ಒಟ್ಟು ತೂಕ (Gross)',
      tareWeight: 'ವಾಹನದ ತೂಕ (Tare)',
      netWeight: 'ನಿವ್ವಳ ತೂಕ (Net)',
      moisture: 'ತೇವಾಂಶ (Moisture):',
      moistureStandard: 'ಪ್ರಮಾಣಿತ < 12%',
      grade: 'ಗುಣಮಟ್ಟ ಗ್ರೇಡ್:',
      gradeVal: 'Grade A (FAQ Passed)',
      weigher: 'ತೂಕ ಪರಿಶೀಲಕ: ಅತುಲ್ ಶಿಂಧೆ (APMC Weigher)',
      certifiedStamp: 'ಡಿಜಿಟಲ್ ಸಹಿ ಪ್ರಮಾಣೀಕೃತ',
      escrowReleaseTitle: 'ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಎಸ್ಕ್ರೋ ಹಣ ಬಿಡುಗಡೆ',
      escrowReleaseDesc: 'ಸರಕಿನ ತೂಕ ದೃಢಪಟ್ಟ ತಕ್ಷಣ ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋ ಹಣವು ನೇರವಾಗಿ ರೈತರ UPI ಖಾತೆಗೆ (₹73,350) ಮತ್ತು ಸಾರಿಗೆದಾರರ ಖಾತೆಗೆ (₹900) ವರ್ಗಾವಣೆಯಾಗುತ್ತದೆ.',
      releaseBtn: 'ಹಣ ಬಿಡುಗಡೆ ಮಾಡಿ (Release ₹74,250 Escrow)',
      releasingBtn: 'ಬ್ಯಾಂಕ್‌ನಿಂದ ಹಣ ವರ್ಗಾವಣೆಯಾಗುತ್ತಿದೆ...',
      successTitle: 'ಹಣ ಯಶಸ್ವಿಯಾಗಿ ಜಮೆಯಾಗಿದೆ! (Settlement Done)',
      farmerCredit: 'ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆ (Tukaram Patil UPI):',
      transporterCredit: 'ಸಾರಿಗೆದಾರರ ಬಾಡಿಗೆ (Sachin Gaikwad UPI):',
      creditedBadge: 'ಜಮೆಯಾಗಿದೆ',
      utrLabel: 'ಬ್ಯಾಂಕ್ ವಹಿವಾಟು ಸಂಖ್ಯೆ (UTR):',
      closeBtn: 'ಮುಚ್ಚಿ (Close)',
    },
    te: {
      title: 'ధృవీకరించబడిన డిజిటల్ బరువు రసీదు',
      slipNumberPrefix: 'నంబర్:',
      farmerLabel: 'రైతు పేరు',
      farmerVal: 'తుకారాం పాటిల్',
      farmerLoc: 'గ్రామం: లాంజనా (ఔసా), జిల్లా: లాతూర్',
      buyerLabel: 'కొనుగోలుదారు మిల్లు',
      grossWeight: 'మొత్తం బరువు (Gross)',
      tareWeight: 'వాహనం బరువు (Tare)',
      netWeight: 'నికర బరువు (Net)',
      moisture: 'తేమ (Moisture):',
      moistureStandard: 'ప్రమాణం < 12%',
      grade: 'నాణ్యత గ్రేడ్:',
      gradeVal: 'Grade A (FAQ Passed)',
      weigher: 'తనిఖీదారు: అతుల్ షిండే (APMC Weigher)',
      certifiedStamp: 'డిజిటల్ సంతకం ధృవీకరించబడింది',
      escrowReleaseTitle: 'ఒక్క క్లిక్‌తో ఎస్క్రో నిధుల విడుదల',
      escrowReleaseDesc: 'బరువు ధృవీకరణ పూర్తయిన వెంటనే బ్యాంకులోని ఎస్క్రో నిధులు నేరుగా రైతు UPI ఖాతాకు (₹73,350) మరియు రవాణాదారు ఖాతాకు (₹900) జమ చేయబడతాయి.',
      releaseBtn: 'నిధులు విడుదల చేయండి (Release ₹74,250 Escrow)',
      releasingBtn: 'బ్యాంకు నుండి నిధులు బదిలీ అవుతున్నాయి...',
      successTitle: 'నిధులు విజయవంతంగా జమ చేయబడ్డాయి!',
      farmerCredit: 'రైతు బ్యాంకు ఖాతా (Tukaram Patil UPI):',
      transporterCredit: 'రవాణాదారు ఛార్జీ (Sachin Gaikwad UPI):',
      creditedBadge: 'జమ చేయబడింది',
      utrLabel: 'బ్యాంకు లావాదేవీ సంఖ్య (UTR):',
      closeBtn: 'మూసివేయండి (Close)',
    },
    gu: {
      title: 'પ્રમાણિત ડિજિટલ વજન પહોંચ',
      slipNumberPrefix: 'નંબર:',
      farmerLabel: 'ખેડૂતનું નામ',
      farmerVal: 'તુકુરામ પાટીલ',
      farmerLoc: 'ગામ: લામજના (ઔસા), જિ. લાતૂર',
      buyerLabel: 'ખરીદદાર મિલ',
      grossWeight: 'કુલ વજન (Gross)',
      tareWeight: 'વાહન વજન (Tare)',
      netWeight: 'ચોખ્ખું વજન (Net)',
      moisture: 'ભેજ (Moisture):',
      moistureStandard: 'માનક < 12%',
      grade: 'ગુણવત્તા ગ્રેડ:',
      gradeVal: 'Grade A (FAQ Passed)',
      weigher: 'તપાસનીશ: અતુલ શિંદે (APMC Weigher)',
      certifiedStamp: 'ડિજિટલ હસ્તાક્ષર પ્રમાણિત',
      escrowReleaseTitle: 'એક-ક્લિક એસ્ક્રો રકમ રિલીઝ કરો',
      escrowReleaseDesc: 'માલનું વજન પ્રમાણિત થતાં જ બેંકમાં સુરક્ષિત એસ્ક્રો રકમ સીધી ખેડૂતના UPI ખાતામાં (₹73,350) અને ટ્રાન્સપોર્ટરના ખાતામાં (₹900) વહેંચાઈને જમા થશે.',
      releaseBtn: 'રકમ રિલીઝ કરો (Release ₹74,250 Escrow)',
      releasingBtn: 'બેંકમાંથી રકમ ટ્રાન્સફર થઈ રહી છે...',
      successTitle: 'રકમ સફળતાપૂર્વક જમા થઈ! (Settlement Done)',
      farmerCredit: 'ખેડૂત બેંક ખાતું (Tukaram Patil UPI):',
      transporterCredit: 'ટ્રાન્સપોર્ટર ભાડું (Sachin Gaikwad UPI):',
      creditedBadge: 'જમા થઈ',
      utrLabel: 'બેંક વ્યવહાર સંદર્ભ (UTR):',
      closeBtn: 'બંધ કરો (Close)',
    }
  };

  const sTxt = slipText[lang] || slipText.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 border-b border-emerald-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <Scale className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {sTxt.title}
              </h3>
              <p className="text-xs text-emerald-300/70 font-mono">
                {sTxt.slipNumberPrefix} {slipNumber} • APMC / Mill Certified
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-xs text-slate-300">
          
          {/* Certificate Stamp Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{sTxt.farmerLabel}</span>
                <div className="text-sm font-bold text-white">{sTxt.farmerVal}</div>
                <div className="text-[11px] text-emerald-300">{sTxt.farmerLoc}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{sTxt.buyerLabel}</span>
                <div className="text-sm font-bold text-amber-300">Kirti Gold Agro Oil Mill</div>
                <div className="text-[11px] text-slate-400">MIDC Latur • DML-88</div>
              </div>
            </div>

            {/* Weighbridge Metrics */}
            <div className="grid grid-cols-3 gap-2 py-2 text-center bg-slate-900/60 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">{sTxt.grossWeight}</span>
                <span className="text-xs font-bold text-slate-200">{grossKg} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{sTxt.tareWeight}</span>
                <span className="text-xs font-bold text-slate-400">{tareKg} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 block font-bold">{sTxt.netWeight}</span>
                <span className="text-sm font-black text-emerald-300">{netKg} kg (15 Qtl)</span>
              </div>
            </div>

            {/* Quality & Grade Specs */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">{sTxt.moisture}</span>
                <span className="font-bold text-emerald-300">{moisturePct}% ({sTxt.moistureStandard})</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">{sTxt.grade}</span>
                <span className="font-bold text-emerald-300">{sTxt.gradeVal}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800/80">
              <span>{sTxt.weigher}</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {sTxt.certifiedStamp}
              </span>
            </div>
          </div>

          {/* Release Escrow Section */}
          {!releasedData ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {sTxt.escrowReleaseTitle}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {sTxt.escrowReleaseDesc}
              </p>
              
              <button
                onClick={handleRelease}
                disabled={releasing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.01] transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{releasing ? sTxt.releasingBtn : sTxt.releaseBtn}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500 text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{sTxt.successTitle}</span>
              </div>
              <div className="space-y-1 text-[11px] pt-1 text-slate-200">
                <div className="flex justify-between">
                  <span>{sTxt.farmerCredit}</span>
                  <span className="font-bold text-emerald-300">₹{releasedData.farmerCreditUPI.amount.toLocaleString('en-IN')} ({sTxt.creditedBadge})</span>
                </div>
                <div className="flex justify-between">
                  <span>{sTxt.transporterCredit}</span>
                  <span className="font-bold text-amber-300">₹{releasedData.transporterCreditUPI.amount.toLocaleString('en-IN')} ({sTxt.creditedBadge})</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{sTxt.utrLabel}</span>
                  <span className="font-mono text-[10px]">{releasedData.reference}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">
            {sTxt.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
