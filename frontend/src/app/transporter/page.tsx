'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ReverseAuctionConsole } from '@/components/ReverseAuctionConsole';
import { useLanguage } from '@/context/LanguageContext';
import { Truck, MapPin, Award, CheckCircle2, ShieldCheck, Navigation, Phone, Calendar, IndianRupee } from 'lucide-react';

export default function TransporterPortalPage() {
  const { lang, dict } = useLanguage();
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const transporterText: Record<string, any> = {
    en: {
      driverName: 'Sachin Gaikwad',
      vehicleNo: 'MH-24-AG-4412',
      vehicleDesc: 'Bolero Maxi Truck • Capacity: 25 Quintals • Ausa Phata (6 km from Lamjana)',
      rating: '⭐ 4.8 / 5.0',
      tripsCompleted: '112 Trips',
      ratingLabel: 'Trust Rating',
      tripsLabel: 'Trips Completed',
      pickupTitle: 'Pickup GPS',
      pickupLocation: 'Tukaram Patil Farm, Lamjana',
      pickupGps: 'Lat: 18.257° N, Long: 76.621° E',
      destTitle: 'Destination',
      destLocation: 'Kirti Gold Agro Oil Mill, MIDC Latur',
      destRoute: 'Distance: 41 km (via NH 361 Highway)',
      escrowTitle: 'Freight Guarantee (Escrow Secured)',
      escrowDesc: 'Secured in Scheduled Bank Escrow',
      escrowSub: 'Instant UPI split release upon certified weighing slip',
    },
    mr: {
      driverName: 'सचिन गायकवाड',
      vehicleNo: 'MH-24-AG-4412',
      vehicleDesc: 'बोलेरो मॅक्सी ट्रक • क्षमता: २५ क्विंटल • औसा फाटा (लामजणापासून ६ किमी)',
      rating: '⭐ ४.८ / ५.०',
      tripsCompleted: '११२ फेऱ्या',
      ratingLabel: 'विश्वासार्हता',
      tripsLabel: 'यशस्वी फेऱ्या',
      pickupTitle: 'पिकअप स्थान (Pickup GPS)',
      pickupLocation: 'तुकाराम पाटील यांचे शेत, लामजणा',
      pickupGps: 'अक्षांश: 18.257° N, रेखांश: 76.621° E',
      destTitle: 'डिलिव्हरी ठिकाण (Destination)',
      destLocation: 'कीर्ती गोल्ड ॲग्रो ऑईल मिल, MIDC लातूर',
      destRoute: 'अंतर: ४१ किमी (NH 361 महामार्ग)',
      escrowTitle: 'भाडे सुरक्षितता (Escrow Secured)',
      escrowDesc: 'बँक एस्क्रोमध्ये सुरक्षित राखीव',
      escrowSub: 'वजन झाल्यावर थेट UPI खात्यात वर्ग',
    },
    hi: {
      driverName: 'सचिन गायकवाड़',
      vehicleNo: 'MH-24-AG-4412',
      vehicleDesc: 'बोलेरो मैक्सी ट्रक • क्षमता: 25 क्विंटल • औसा फाटा (लामजना से 6 किमी)',
      rating: '⭐ 4.8 / 5.0',
      tripsCompleted: '112 फेरे',
      ratingLabel: 'रेटिंग',
      tripsLabel: 'सफल फेरे',
      pickupTitle: 'पिकअप स्थान (Pickup GPS)',
      pickupLocation: 'तुकाराम पाटिल का खेत, लामजना',
      pickupGps: 'अक्षांश: 18.257° N, देशांतर: 76.621° E',
      destTitle: 'गंतव्य (Destination)',
      destLocation: 'कीर्ति गोल्ड एग्रो ऑइल मिल, MIDC लातूर',
      destRoute: 'दूरी: 41 किमी (NH 361 हाईवे)',
      escrowTitle: 'भाड़ा सुरक्षा (Escrow Secured)',
      escrowDesc: 'बैंक एस्क्रो में सुरक्षित आरक्षित',
      escrowSub: 'वजन पर्ची होते ही सीधे UPI खाते में जमा',
    },
    kn: {
      driverName: 'ಸಚಿನ್ ಗಾಯಕ್ವಾಡ್',
      vehicleNo: 'MH-24-AG-4412',
      vehicleDesc: 'ಬೊಲೆರೊ ಮ್ಯಾಕ್ಸಿ ಟ್ರಕ್ • ಸಾಮರ್ಥ್ಯ: 25 ಕ್ವಿಂಟಾಲ್ • ಔಸಾ ಫಾಟಾ (ಲಾಂಜನಾದಿಂದ 6 ಕಿಮೀ)',
      rating: '⭐ 4.8 / 5.0',
      tripsCompleted: '112 ಪ್ರವಾಸಗಳು',
      ratingLabel: 'ರೇಟಿಂಗ್',
      tripsLabel: 'ಯಶಸ್ವಿ ಟ್ರಿಪ್‌ಗಳು',
      pickupTitle: 'ಪಿಕಪ್ ಸ್ಥಳ (GPS)',
      pickupLocation: 'ತುಕಾರಾಂ ಪಾಟೀಲ್ ಅವರ ತೋಟ, ಲಾಂಜನಾ',
      pickupGps: 'ಅಕ್ಷಾಂಶ: 18.257° N, ರೇಖಾಂಶ: 76.621° E',
      destTitle: 'ತಲುಪುವ ಸ್ಥಳ',
      destLocation: 'ಕೀರ್ತಿ ಗೋಲ್ಡ್ ಆಗ್ರೋ ಆಯಿಲ್ ಮಿಲ್, MIDC ಲಾತೂರ್',
      destRoute: 'ದೂರ: 41 ಕಿಮೀ (NH 361 ಹೆದ್ದಾರಿ)',
      escrowTitle: 'ಬಾಡಿಗೆ ಭದ್ರತೆ (Escrow)',
      escrowDesc: 'ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋದಲ್ಲಿ ಸುರಕ್ಷಿತ',
      escrowSub: 'ತೂಕದ ನಂತರ ತಕ್ಷಣ UPI ಖಾತೆಗೆ ಜಮೆ',
    },
    te: {
      driverName: 'సచిన్ గైక్వాడ్',
      vehicleNo: 'MH-24-AG-4412',
      vehicleDesc: 'బొలెరో మ్యాక్సీ ట్రక్ • సామర్థ్యం: 25 క్వింటాళ్లు • ఔసా ఫాటా (లాంజనా నుండి 6 కి.మీ)',
      rating: '⭐ 4.8 / 5.0',
      tripsCompleted: '112 ట్రిప్పులు',
      ratingLabel: 'రేటింగ్',
      tripsLabel: 'పూర్తయిన ట్రిప్పులు',
      pickupTitle: 'పికప్ లొకేషన్ (GPS)',
      pickupLocation: 'తుకారాం పాటిల్ పొలం, లాంజనా',
      pickupGps: 'అక్షాంశం: 18.257° N, రేఖాంశం: 76.621° E',
      destTitle: 'గమ్యస్థానం',
      destLocation: 'కీర్తి గోల్డ్ ఆగ్రో ఆయిల్ మిల్లు, MIDC లాతూర్',
      destRoute: 'దూరం: 41 కి.మీ (NH 361 హైవే)',
      escrowTitle: 'రవాణా ఛార్జీల భద్రత (Escrow)',
      escrowDesc: 'బ్యాంక్ ఎస్క్రోలో భద్రపరచబడింది',
      escrowSub: 'బరువు చూసిన వెంటనే UPI ఖాతాలోకి జమ',
    },
    gu: {
      driverName: 'સચિન ગાયકવાડ',
      vehicleNo: 'MH-24-AG-4412',
      vehicleDesc: 'બોલેરો મેક્સી ટ્રક • ક્ષમતા: 25 ક્વિન્ટલ • ઔસા ફાંટા (લામજનાથી 6 કિમી)',
      rating: '⭐ 4.8 / 5.0',
      tripsCompleted: '112 ફેરા',
      ratingLabel: 'રેટિંગ',
      tripsLabel: 'સફળ ફેરા',
      pickupTitle: 'પિકઅપ સ્થળ (GPS)',
      pickupLocation: 'તુકુરામ પાટીલનું ખેતર, લામજના',
      pickupGps: 'અક્ષાંશ: 18.257° N, રેખાંશ: 76.621° E',
      destTitle: 'ડિલિવરી સ્થળ',
      destLocation: 'કીર્તિ ગોલ્ડ એગ્રો ઓઇલ મિલ, MIDC લાતૂર',
      destRoute: 'અંતર: 41 કિમી (NH 361 હાઇવે)',
      escrowTitle: 'ભાડું સુરક્ષા (Escrow Secured)',
      escrowDesc: 'બેંક એસ્ક્રોમાં સુરક્ષિત',
      escrowSub: 'વજન થતાં જ સીધું UPI ખાતામાં જમા',
    }
  };

  const tTxt = transporterText[lang] || transporterText.en;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
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
                <h2 className="text-lg font-bold text-white">{tTxt.driverName}</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-800/60 text-sky-300 rounded-full border border-sky-600/40">
                  {tTxt.vehicleNo}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {tTxt.vehicleDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-950/70 px-4 py-2 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">{tTxt.ratingLabel}</span>
              <span className="text-sm font-bold text-amber-300">{tTxt.rating}</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-400 block">{tTxt.tripsLabel}</span>
              <span className="text-sm font-bold text-emerald-400">{tTxt.tripsCompleted}</span>
            </div>
          </div>
        </div>

        {/* Trip GPS Acceptance Card (Pickup Details) */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start space-x-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{tTxt.pickupTitle}</span>
              <div className="font-bold text-white">{tTxt.pickupLocation}</div>
              <span className="text-[11px] text-emerald-300">{tTxt.pickupGps}</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Navigation className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{tTxt.destTitle}</span>
              <div className="font-bold text-white">{tTxt.destLocation}</div>
              <span className="text-[11px] text-slate-400">{tTxt.destRoute}</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{tTxt.escrowTitle}</span>
              <div className="font-bold text-white">{tTxt.escrowDesc}</div>
              <span className="text-[11px] text-emerald-300">{tTxt.escrowSub}</span>
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
