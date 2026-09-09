export type Language = 'mr' | 'en';

export const t = {
  mr: {
    appTitle: 'शेतकरी सेतू',
    tagline: 'महाराष्ट्र शासन शेतीमाल बाजार जोडणी व भाव शोध प्रणाली',
    switchLang: 'English',
    farmerPortal: 'शेतकरी कक्ष',
    millPortal: 'अडत व ऑईल मिल कक्ष',
    transporterPortal: 'वाहतूकदार लिलाव केंद्र',
    compliance: 'कायदेशीर सुसंगतता',
    activeBenchmark: 'जमिनीवरील संदर्भ: लामजणा (औसा) ते लातूर - १५ क्विंटल सोयाबीन',
    
    // Voice / Input
    voiceTitle: 'सोपे मराठी / हिंदी व्हॉइस इनपुट',
    voiceSubtitle: 'माईक दाबा किंवा खालील बटणाने व्हॉट्सॲप शैलीत बोला',
    voiceSimulateBtn: 'बोला: "माझ्याकडे लामजणा येथे १५ क्विंटल सोयाबीन आहे"',
    listening: 'ऐकत आहे... भाषांतर प्रक्रिया सुरू...',
    crop: 'पीक',
    quantity: 'वजन / प्रमाण',
    village: 'गाव व तालुका',
    calculateArbitrage: 'उत्तम बाजारभाव व निव्वळ नफा शोधा',

    // Arbitrage
    arbitrageTitle: 'बाजारभाव तुलना व निव्वळ हातात येणारी रक्कम',
    arbitrageDesc: 'स्थानिक मंडी, लातूर APMC आणि ऑईल मिल मधील थेट फरक (खर्च व सेस वजा जाता)',
    surplusBanner: 'शेतकरी सेतूमुळे स्थानिक तोट्याच्या विक्रीपेक्षा ₹',
    surplusBannerSuffix: 'जास्त निव्वळ नफा!',
    grossRate: 'खरेदी दर',
    netTakeHome: 'निव्वळ हातात मिळणारा दर',
    transportCost: 'वाहतूक खर्च',
    apmcCess: 'APMC सेस (१.०५%)',
    lockPriceBtn: 'भाव लॉक करा व गाडी बुक करा',
    viewBreakdown: 'खर्चाचा संपूर्ण तपशील',
    aiInsightTitle: 'AI भाव अंदाज व सल्ला',

    // Transit & Price Lock
    transitTitle: 'थेट वाहन ट्रॅकिंग व भाव-लॉक करार',
    priceLockActive: 'भाव लॉक सक्रिय (एसक्रो हमी)',
    timeLeft: 'उर्वरित वेळ',
    truckLocation: 'गाडीचे स्थान',
    driver: 'चालक',
    vehicleNo: 'गाडी क्र.',
    escrowStatus: 'बँक एस्क्रो स्थिती',
    escrowHeld: 'रक्कम सुरक्षित राखीव (Non-Custodial)',

    // Mill Portal
    millTitle: 'अडत व ऑईल मिल दर प्रकाशन',
    publishRate: 'आजचा खरेदी दर जाहीर करा',
    quota: 'कोटा (क्विंटल)',
    grade: 'प्रतवारी',
    outlierAlert: 'सावधान: हा दर अधिकृत APMC बेंचमार्कपेक्षा २०% पेक्षा जास्त विचलित आहे!',
    incomingDispatches: 'येणारा शेतीमाल व भाव-लॉक करार',
    generateWeighSlip: 'डिजिटल वजन पावती तयार करा',
    releaseEscrow: 'एसक्रो रक्कम थेट वर्ग करा (UPI Route)',

    // Transporter Portal
    auctionTitle: '१० मिनिटांचा थेट उलटा लिलाव (Reverse Auction)',
    lowestBid: 'सध्याची सर्वात कमी बोली',
    floorPriceAlert: 'किमान आधार दर संरक्षण: ₹६५० खाली बोली लावण्यास सक्त बंदी आहे.',
    placeBid: 'बोली लावा',
    tripDetails: 'फेरी तपशील: लामजणा -> लातूर (४१ किमी)',
    cargoDetails: 'माल: १५ क्विंटल सोयाबीन',
    anomalyAlert: 'संशयास्पद बोली / संगनमत संशय',

    // Offline
    offlineMode: 'ऑफलाइन मोड सक्रिय — अर्ज स्थानिकरित्या सुरक्षित साठवला आहे.',
    synced: 'सर्व व्यवहार ऑनलाइन सर्व्हरवर समक्रमित झाले आहेत.',
    lowBandwidth: 'कमी डेटा मोड (Low Bandwidth)'
  },
  en: {
    appTitle: 'ShetkariSetu',
    tagline: 'Govt. of Maharashtra — Agricultural Market Linkage & Price Discovery',
    switchLang: 'मराठी',
    farmerPortal: 'Farmer Portal',
    millPortal: 'Adat & Mill Portal',
    transporterPortal: 'Transporter Engine',
    compliance: 'Trust & Compliance',
    activeBenchmark: 'Ground Benchmark: Lamjana (Ausa) to Latur — 15 Quintals Soybean',

    // Voice / Input
    voiceTitle: 'Voice / WhatsApp Style Crop Input',
    voiceSubtitle: 'Tap the mic or test voice simulation for farmer input',
    voiceSimulateBtn: 'Simulate Voice: "15 Quintals Soybean in Lamjana"',
    listening: 'Listening to Bhashini STT pipeline...',
    crop: 'Crop',
    quantity: 'Quantity (Quintals)',
    village: 'Origin Village / Taluka',
    calculateArbitrage: 'Find Best Net Take-Home Price',

    // Arbitrage
    arbitrageTitle: 'Real-Time Arbitrage & Net Take-Home Comparison',
    arbitrageDesc: 'Compare Local Mandi vs Latur APMC vs Oil Mill (Gross - Cess - Transport)',
    surplusBanner: 'ShetkariSetu unlocks an extra ₹',
    surplusBannerSuffix: 'net profit vs local distress selling!',
    grossRate: 'Buying Rate',
    netTakeHome: 'Net Take-Home Rate',
    transportCost: 'Transport Cost',
    apmcCess: 'APMC Cess (1.05%)',
    lockPriceBtn: 'Lock Price & Book Transport',
    viewBreakdown: 'Transparent Cost Breakdown',
    aiInsightTitle: 'AI Price Forecast & Hold/Sell Advisory',

    // Transit & Price Lock
    transitTitle: 'Live Transit Tracker & Price-Lock Agreement',
    priceLockActive: 'Price Lock Active (Bank Escrow)',
    timeLeft: 'Time Remaining',
    truckLocation: 'Vehicle Location',
    driver: 'Driver',
    vehicleNo: 'Vehicle No',
    escrowStatus: 'Escrow Status',
    escrowHeld: 'Non-Custodial Bank Hold Secured',

    // Mill Portal
    millTitle: 'Adat & Mill Daily Rate Publisher',
    publishRate: 'Publish Daily Buying Rate',
    quota: 'Quota (Quintals)',
    grade: 'Grade',
    outlierAlert: 'Warning: Diverges >20% from official APMC benchmark!',
    incomingDispatches: 'Incoming Dispatches & Active Price-Locks',
    generateWeighSlip: 'Generate Digital Weighing Slip',
    releaseEscrow: 'Release Escrow (Razorpay Route Split)',

    // Transporter Portal
    auctionTitle: '10-Minute Timed Reverse Auction',
    lowestBid: 'Current Lowest Transport Bid',
    floorPriceAlert: 'Floor Price Protection: Bids below ₹650 are strictly rejected.',
    placeBid: 'Submit Bid',
    tripDetails: 'Trip: Lamjana Village -> Latur MIDC (41 km)',
    cargoDetails: 'Cargo: 15 Quintals Soybean',
    anomalyAlert: 'Bid Stream Anomaly / Collusion Alert',

    // Offline
    offlineMode: 'Offline Mode Active — Submission queued in local IndexedDB.',
    synced: 'All offline submissions successfully synchronized.',
    lowBandwidth: 'Low Bandwidth Mode'
  }
};
