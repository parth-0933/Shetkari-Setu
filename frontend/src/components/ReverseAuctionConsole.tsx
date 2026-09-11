'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Clock, ShieldAlert, ShieldCheck, IndianRupee, ArrowDownRight, Send, AlertTriangle, RotateCcw } from 'lucide-react';
import { getSocket } from '@/lib/socket';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

interface ReverseAuctionConsoleProps {
  tripId: string;
  lowBandwidth: boolean;
}

export const ReverseAuctionConsole: React.FC<ReverseAuctionConsoleProps> = ({
  tripId,
  lowBandwidth
}) => {
  const { lang, dict } = useLanguage();
  const [auction, setAuction] = useState<any>({
    tripId: 'TRIP_LAMJANA_LATUR_01',
    currentLowestBid: 850,
    floorPrice: 650,
    secondsRemaining: 600,
    status: 'ACTIVE',
    currentWinner: {
      transporterId: 'TRANS_01',
      driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
      vehicleNumber: 'MH-24-AG-4412',
      rating: 4.8
    },
    bidHistory: [
      { id: '1', driverName: 'महेश जाधव (Mahesh Jadhav)', vehicleNumber: 'MH-24-F-3320', amount: 1100, timestamp: '10:02 AM' },
      { id: '2', driverName: 'ज्ञानेश्वर कांबळे (Dnyaneshwar Kamble)', vehicleNumber: 'MH-24-V-9081', amount: 950, timestamp: '10:04 AM' },
      { id: '3', driverName: 'सचिन गायकवाड (Sachin Gaikwad)', vehicleNumber: 'MH-24-AG-4412', amount: 850, timestamp: '10:07 AM' }
    ],
    anomalyInfo: {
      score: 0.08,
      isCollusion: false,
      riskLevel: 'LOW',
      reasons: ['Healthy competitive decrements observed']
    }
  });

  const [customBid, setCustomBid] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    socket.emit('join:trip', tripId);

    socket.on('auction:state', (data: any) => {
      if (data) setAuction(data);
    });

    socket.on('auction:tick', (data: any) => {
      setAuction((prev: any) => ({ ...prev, secondsRemaining: data.secondsRemaining }));
    });

    socket.on('auction:bid_update', (data: any) => {
      setAuction(data.auction);
      setErrorMessage(null);
    });

    socket.on('bid:error', (data: any) => {
      setErrorMessage(data.message);
      setSubmitting(false);
    });

    return () => {
      socket.off('auction:state');
      socket.off('auction:tick');
      socket.off('auction:bid_update');
      socket.off('bid:error');
    };
  }, [tripId]);

  const handleDecrement = (decrementAmount: number) => {
    const targetAmount = auction.currentLowestBid - decrementAmount;
    submitBid(targetAmount);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(customBid);
    if (!amount) return;
    submitBid(amount);
  };

  const submitBid = (amount: number) => {
    setErrorMessage(null);
    setSubmitting(true);

    if (amount < auction.floorPrice) {
      setErrorMessage(dict.floorPriceAlert);
      setSubmitting(false);
      return;
    }

    if (amount >= auction.currentLowestBid) {
      setErrorMessage(lang === 'en' ? `Your bid must be lower than ₹${auction.currentLowestBid}` : `तुमची बोली सध्याच्या ₹${auction.currentLowestBid} पेक्षा कमी असावी.`);
      setSubmitting(false);
      return;
    }

    const socket = getSocket();
    socket.emit('bid:submit', {
      tripId,
      transporterId: 'TRANS_DEMO_ME',
      driverName: lang === 'en' ? 'You (Current Transporter)' : 'तुम्ही (Current Transporter)',
      vehicleNumber: 'MH-24-TR-5555',
      amount
    });

    setTimeout(() => {
      setSubmitting(false);
      setCustomBid('');
    }, 400);
  };

  const handleResetDemo = () => {
    const socket = getSocket();
    socket.emit('auction:reset_demo', tripId);
    setErrorMessage(null);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Localized texts
  const tLabels = {
    auctionSubtitle: {
      en: '10-Minute Timed Reverse Auction',
      mr: '१० मिनिटे उलटा लिलाव (Reverse Auction)',
      hi: '10 मिनट की लाइव रिवर्स नीलामी',
      kn: '10 ನಿಮಿಷಗಳ ಲೈವ್ ರಿವರ್ಸ್ ಹರಾಜು',
      te: '10 నిమిషాల రివర్స్ వేలం',
      gu: '10 મિનિટની રિવર્સ હરાજી'
    },
    tripHeading: {
      en: 'Lamjana Agricultural Freight Auction (Lamjana to Latur)',
      mr: 'लामजणा शेतमाल वाहतूक लिलाव (Lamjana to Latur)',
      hi: 'लामजना कृषि परिवहन नीलामी (लामजना से लातूर)',
      kn: 'ಲಾಂಜನಾ ಕೃಷಿ ಸರಕು ಸಾಗಣೆ ಹರಾಜು (ಲಾಂಜನಾದಿಂದ ಲಾತೂರ್)',
      te: 'లాంజనా వ్యవసాయ సరుకు రవాణా వేలం (లాంజనా నుండి లాతూర్)',
      gu: 'લામજના કૃષિ માલવાહક હરાજી (લામજના થી લાતૂર)'
    },
    tripMeta: {
      en: 'Distance: 41 km • Cargo: 15 Quintals Soybean (Bolero / Tata Ace class)',
      mr: 'अंतर: ४१ किमी • माल: १५ क्विंटल सोयाबीन (बोलेरो / छोटा हत्ती श्रेणी)',
      hi: 'दूरी: 41 किमी • माल: 15 क्विंटल सोयाबीन (बोलेरो / पिकअप श्रेणी)',
      kn: 'ಅಂತರ: 41 ಕಿ.ಮೀ • ಸರಕು: 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್',
      te: 'దూరం: 41 కి.మీ • సరుకు: 15 క్విಂಟాళ్ల సోయాబీన్',
      gu: 'અંતર: 41 કિમી • માલ: 15 ક્વિન્ટલ સોયાબીન'
    },
    perTrip: {
      en: '/ Entire Trip (41 km)',
      mr: '/ संपूर्ण फेरी (४१ किमी)',
      hi: '/ पूरी यात्रा (41 किमी)',
      kn: '/ ಪೂರ್ಣ ಪ್ರಯಾಣ (41 ಕಿ.ಮೀ)',
      te: '/ పూర్తి ప్రయాణం (41 కి.మీ)',
      gu: '/ સંપૂર્ણ યાત્રા (41 કિમી)'
    },
    leading: {
      en: 'Leading Bidder:',
      mr: 'आघाडीवर:',
      hi: 'अग्रणी बोलीदाता:',
      kn: 'ಮುಂಚೂಣಿಯಲ್ಲಿ:',
      te: 'ముందంజలో:',
      gu: 'આગળ પડતી બોલી:'
    },
    floorTitle: {
      en: 'Statutory Floor Price Protection',
      mr: 'किमान आधार दर संरक्षण (Floor Price Protection)',
      hi: 'न्यूनतम दर संरक्षण (Floor Price Protection)',
      kn: 'ಕನಿಷ್ಠ ಬೆಲೆ ರಕ್ಷಣೆ',
      te: 'కనీస ధర రక్షణ',
      gu: 'લઘુત્તમ ભાવ સુરક્ષા'
    },
    floorDesc: {
      en: 'To prevent predatory exploitation of transporters, bids below ₹650 are strictly rejected at the server level.',
      mr: 'वाहतूकदारांचे आर्थिक शोषण रोखण्यासाठी ₹६५० च्या खाली कोणतीही बोली सर्वर स्तरावर स्वीकारली जात नाही.',
      hi: 'ट्रांसपोर्टरों के आर्थिक शोषण को रोकने के लिए ₹650 से कम की बोली सर्वर स्तर पर खारिज की जाती है।',
      kn: 'ಸಾರಿಗೆದಾರರ ಶೋಷಣೆ ತಡೆಯಲು ₹650 ಕ್ಕಿಂತ ಕಡಿಮೆ ಬಿಡ್ ಸರ್ವರ್ ಮಟ್ಟದಲ್ಲಿ ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ.',
      te: 'రవాణాదారుల ఆర్థిక రక్షణ కోసం ₹650 కంటే తక్కువ బిడ్ సర్వర్ స్థాయిలో తిరస్కరించబడుతుంది.',
      gu: 'ટ્રાન્સપોર્ટરોનું શોષણ રોકવા ₹650 થી ઓછી બોલી સર્વર સ્તરે નકારવામાં આવે છે.'
    },
    floorLimitLabel: {
      en: 'Floor Price Limit:',
      mr: 'किमान मर्यादा:',
      hi: 'न्यूनतम सीमा:',
      kn: 'ಕನಿಷ್ಠ ಮಿತಿ:',
      te: 'కనీస పరిమిತಿ:',
      gu: 'લઘુત્તમ મર્યાદા:'
    },
    legalGuarantee: {
      en: '(Statutory Guarantee)',
      mr: '(कायदेशीर हमी)',
      hi: '(कानूनी गारंटी)',
      kn: '(ಕಾನೂನು ಖಾತರಿ)',
      te: '(చట్టపరమైన హామీ)',
      gu: '(કાનૂની ગેરંટી)'
    },
    bidConsoleTitle: {
      en: 'Place Your Bid Console',
      mr: 'बोली लावा (Place Your Bid Console)',
      hi: 'बोली लगाएं (Bid Console)',
      kn: 'ಬಿಡ್ ಕನ್ಸೋಲ್',
      te: 'బిడ్ కన్సోల్',
      gu: 'બોલી કન્સોલ'
    },
    dec20: {
      en: 'Decrement -₹20',
      mr: '- ₹२० ने कमी करा',
      hi: '- ₹20 कम करें',
      kn: '- ₹20 ಕಡಿಮೆ ಮಾಡಿ',
      te: '- ₹20 తగ్గించండి',
      gu: '- ₹20 ઘટાડો'
    },
    dec50: {
      en: 'Decrement -₹50',
      mr: '- ₹५० ने कमी करा',
      hi: '- ₹50 कम करें',
      kn: '- ₹50 ಕಡಿಮೆ ಮಾಡಿ',
      te: '- ₹50 తగ్గించండి',
      gu: '- ₹50 ઘટાડો'
    },
    test600: {
      en: 'Test: ₹600 (Floor Breach Test)',
      mr: 'चाचणी: ₹६०० (Floor Breach Test)',
      hi: 'परीक्षण: ₹600 (Floor Breach Test)',
      kn: 'ಪರೀಕ್ಷೆ: ₹600 (ಮಿತಿ ಉಲ್ಲಂಘನೆ ಪರೀಕ್ಷೆ)',
      te: 'పరీక్ష: ₹600 (పరిమితి ఉల్లంಘన)',
      gu: 'પરીક્ષણ: ₹600 (ફ્લોર બ્રીચ ટેસ્ટ)'
    },
    customPlaceholder: {
      en: `Enter bid (e.g. ${auction.currentLowestBid - 10})`,
      mr: `बोली टाका (उदा. ${auction.currentLowestBid - 10})`,
      hi: `बोली दर्ज करें (उदा. ${auction.currentLowestBid - 10})`,
      kn: `ಬಿಡ್ ನಮೂದಿಸಿ (ಉದಾ. ${auction.currentLowestBid - 10})`,
      te: `బిడ్ నమోదు చేయండి (ఉదా. ${auction.currentLowestBid - 10})`,
      gu: `બોલી દાખલ કરો (દા.ત. ${auction.currentLowestBid - 10})`
    },
    liveBidStream: {
      en: 'Live Bid Stream',
      mr: 'थेट बोली क्रमवारी (Live Bid Stream)',
      hi: 'लाइव बोली क्रम (Live Bid Stream)',
      kn: 'ಲೈವ್ ಬಿಡ್ ಪಟ್ಟಿ',
      te: 'లైవ్ బిడ్ల జాబితా',
      gu: 'લાઇવ બોલી ક્રમ'
    },
    resetDemo: {
      en: 'Reset Auction Demo',
      mr: 'लिलाव पूर्ववत करा (Reset Demo)',
      hi: 'नीलामी रीसेट करें (Reset Demo)',
      kn: 'ಹರಾಜು ಮರುಹೊಂದಿಸಿ',
      te: 'వేలం రీసెట్ చేయండి',
      gu: 'હરાજી રીસેટ કરો'
    }
  };

  const getT = (key: keyof typeof tLabels) => tLabels[key]?.[lang] || tLabels[key]?.en || '';

  return (
    <div className="bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-md">
      
      {/* Header & 10-Minute Timed Clock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Socket.io Live Room: {tripId}
            </span>
            <span className="text-xs text-slate-400">{getT('auctionSubtitle')}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1">
            {getT('tripHeading')}
          </h2>
          <p className="text-xs text-emerald-300/80 mt-0.5">
            {getT('tripMeta')}
          </p>
        </div>

        {/* Timed Counter */}
        <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
          <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{dict.timeLeft}</span>
            <span className="text-lg font-black font-mono text-amber-300">
              {formatTimer(auction.secondsRemaining || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Lowest Bid Banner & Floor Price Alert */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Lowest Bid Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/80 to-slate-950 border border-emerald-500/60 shadow-lg">
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
            {dict.lowestBid}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-300 flex items-center">
              <IndianRupee className="w-7 h-7 inline" />
              {auction.currentLowestBid}
            </span>
            <span className="text-xs text-slate-400 font-medium">{getT('perTrip')}</span>
          </div>
          <div className="mt-2 text-xs text-slate-300 flex items-center gap-1.5">
            <span>{getT('leading')}</span>
            <strong className="text-white">{auction.currentWinner?.driverName}</strong>
            <span className="text-emerald-400 font-mono">({auction.currentWinner?.vehicleNumber})</span>
          </div>
        </div>

        {/* Statutory Floor Price Protection Card (Mandatory Rule) */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 flex flex-col justify-between">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300">
                {getT('floorTitle')}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {getT('floorDesc')}
              </p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[11px]">
            <span className="text-slate-400">{getT('floorLimitLabel')}</span>
            <span className="font-bold text-amber-400 font-mono">₹{auction.floorPrice} {getT('legalGuarantee')}</span>
          </div>
        </div>

      </div>

      {/* ML Bid Anomaly / Collusion Alert Banner */}
      {auction.anomalyInfo && (
        <div className={`mt-4 p-3 rounded-xl border text-xs flex items-center justify-between ${
          auction.anomalyInfo.isCollusion
            ? 'bg-rose-950/70 border-rose-500/70 text-rose-200'
            : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
        }`}>
          <div className="flex items-center gap-2">
            {auction.anomalyInfo.isCollusion ? (
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
            <div>
              <span className="font-bold">
                {auction.anomalyInfo.isCollusion ? 'AI Anomaly Flagged: ' : 'AI Security: '}
              </span>
              <span>{auction.anomalyInfo.reasons?.[0] || 'Competitive decrement pattern verified.'}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 rounded border border-slate-700">
            Risk: {auction.anomalyInfo.riskLevel}
          </span>
        </div>
      )}

      {/* Error Message if Floor Price Breached */}
      {errorMessage && (
        <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-xs text-rose-200 font-semibold animate-shake">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Bid Submission Console: Quick Decrement Buttons (-₹50, -₹20) + Custom Input */}
      <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          {getT('bidConsoleTitle')}
        </h4>

        {/* Quick Decrement Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
          <button
            type="button"
            onClick={() => handleDecrement(20)}
            disabled={submitting || (auction.currentLowestBid - 20 < auction.floorPrice)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-40"
          >
            <ArrowDownRight className="w-4 h-4 text-emerald-400" />
            <span>{getT('dec20')}</span>
            <span className="text-[10px] text-slate-400 font-mono">(₹{auction.currentLowestBid - 20})</span>
          </button>

          <button
            type="button"
            onClick={() => handleDecrement(50)}
            disabled={submitting || (auction.currentLowestBid - 50 < auction.floorPrice)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-40"
          >
            <ArrowDownRight className="w-4 h-4 text-emerald-400" />
            <span>{getT('dec50')}</span>
            <span className="text-[10px] text-slate-400 font-mono">(₹{auction.currentLowestBid - 50})</span>
          </button>

          {/* Test Floor Price Violation (For Judges / Demo) */}
          <button
            type="button"
            onClick={() => submitBid(600)}
            className="col-span-2 sm:col-span-1 py-2.5 px-3 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-700/60 text-xs font-bold text-rose-300 flex items-center justify-center gap-1 transition-all active:scale-95"
            title="Attempts to bid ₹600 (below ₹650) to demonstrate server-side floor rejection"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{getT('test600')}</span>
          </button>
        </div>

        {/* Custom Bid Input */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
            <input
              type="number"
              value={customBid}
              onChange={(e) => setCustomBid(e.target.value)}
              placeholder={getT('customPlaceholder')}
              className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !customBid}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? '...' : dict.placeBid}</span>
          </button>
        </form>
      </div>

      {/* Real-time Bid Stream History */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {getT('liveBidStream')}
          </h4>
          <button
            onClick={handleResetDemo}
            className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{getT('resetDemo')}</span>
          </button>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {auction.bidHistory?.slice().reverse().map((bid: any, idx: number) => (
            <div
              key={bid.id || idx}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                idx === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  idx === 0 ? 'bg-emerald-500 text-emerald-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  #{idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-white">{bid.driverName}</div>
                  <div className="text-[10px] text-slate-400">{bid.vehicleNumber}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-emerald-300 text-sm font-mono">
                  ₹{bid.amount}
                </div>
                <div className="text-[10px] text-slate-500">
                  {bid.timestamp ? new Date(bid.timestamp).toLocaleTimeString() : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
