export type Language = 'mr' | 'hi' | 'en' | 'kn' | 'te' | 'gu';

export interface LanguageInfo {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  region: string;
}

export const AVAILABLE_LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🌐', region: 'Global' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: '🇮🇳', region: 'महाराष्ट्र' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', flag: '🇮🇳', region: 'राष्ट्रीय' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'ಕರ್ನಾಟಕ / ಗಡಿ' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳', region: 'తెలంగాణ / సరిహద్దు' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', flag: '🇮🇳', region: 'ગુજરાત / વેપાર' },
];

export const t: Record<Language, any> = {
  en: {
    appTitle: 'ShetkariSetu',
    heroHighlight: 'Direct Farmer Market Linkage',
    tagline: 'Govt. of Maharashtra — Agricultural Market Linkage & Price Discovery',
    farmerPortal: 'Farmer Portal',
    millPortal: 'Adat & Mill Portal',
    transporterPortal: 'Transporter Engine',
    compliance: 'Trust & Compliance',
    activeBenchmark: 'Ground Benchmark: Lamjana (Ausa) to Latur — 15 Quintals Soybean',
    
    // Hero & Home Section
    heroSubtitle: 'Eliminating price asymmetry, intermediary exploitation, and transport friction. Ground benchmark: a farmer in Lamjana village (Ausa Taluka, Latur) selling 15 quintals of soybean.',
    originLabel: 'Origin',
    originVal: 'Lamjana, Ausa Taluka, Latur',
    produceLabel: 'Produce & Volume',
    produceVal: '15 Quintals Soybean (Grade A)',
    surplusLabel: 'Unlocked Net Surplus',
    surplusVal: '+₹7,700 Net Profit',
    complianceLabel: 'Legal Protection',
    complianceVal: 'Non-Custodial Escrow (DML-88)',
    openFarmerPortalBtn: 'Open Farmer Portal',
    liveDemo90SecBtn: '90-Sec Live Demo Walkthrough',
    pipelineTitle: '90-Second SIH Evaluation Pipeline',
    pipelineSubtitle: '5-step benchmark transaction walkthrough from Lamjana to Latur for evaluators',
    stepActive: 'Step',
    stepActiveSuffix: 'of 5 Active',
    runStageDirectlyBtn: 'Launch This Step',
    stages: [
      {
        step: 1,
        title: '1. Bhashini Voice Input',
        desc: 'Lamjana farmer states crop, quantity, and origin via hands-free voice note.',
        prompt: '👉 Step 1: Use Bhashini voice simulation in the Farmer Portal to register produce.'
      },
      {
        step: 2,
        title: '2. Arbitrage Comparison',
        desc: 'Compares Local Mandi vs Latur APMC vs Kirti Gold Mill net take-home price.',
        prompt: '👉 Step 2: Compare Kirti Gold Mill net return (₹73,350 vs ₹65,650 local distress).'
      },
      {
        step: 3,
        title: '3. Price-Lock & Consent',
        desc: 'Activates 3-hour price-lock backed by simulated non-custodial bank escrow.',
        prompt: '👉 Step 3: Review Trust & Compliance agreement (APMC rules & UPI escrow hold).'
      },
      {
        step: 4,
        title: '4. 10-Min Reverse Auction',
        desc: 'Socket.io reverse auction with ₹650 statutory floor price protection.',
        prompt: '👉 Step 4: Submit bids in Transporter portal and test ₹600 floor price rejection.'
      },
      {
        step: 5,
        title: '5. Weigh Slip & Escrow',
        desc: 'Digital weighing slip certification + Razorpay Route split settlement.',
        prompt: '👉 Step 5: In Mill Portal, generate digital weighing slip and release escrow funds.'
      }
    ],
    portalCards: {
      farmer: {
        title: '1. Farmer Portal',
        desc: 'Multilingual Bhashini voice input, live Net Take-Home arbitrage, AI price trend forecasts, transparent fee breakdown, PWA offline queue, and SMS fallback.',
        enterBtn: 'Open Portal'
      },
      mill: {
        title: '2. Adat & Mill Portal',
        desc: 'Daily rate publishing, ML-backed >20% APMC outlier alert, incoming dispatch countdown queue, digital weighing slip, and UPI Route escrow release.',
        enterBtn: 'Open Portal'
      },
      transporter: {
        title: '3. Transporter Engine',
        desc: '10-minute live Socket.io reverse auction, quick decrement bids (-₹20/-₹50), hard server-side floor price protection (≥ ₹650), and collusion anomaly flags.',
        enterBtn: 'Open Portal'
      }
    },
    legalBanner: {
      title: 'Legal Protection:',
      desc: '100% compliant with Maharashtra APMC Act, 1963 and RBI Payment Aggregator Guidelines (Non-Custodial Escrow).',
      readMoreBtn: 'Read COMPLIANCE.md'
    },

    // Voice / Input
    voiceTitle: 'Bhashini Multilingual Voice Input (Govt. AI)',
    voiceSubtitle: 'Tap mic or simulate WhatsApp-style voice note',
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
    surplusExplainer: 'Selling directly to the oil mill instead of local middlemen yields higher profit after transport & statutory cess.',
    benchmarkBadge: '15 Quintals Soybean Benchmark',
    optionsAvailable: '3 Options Available (Ranked by Net Take-Home)',
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
    lowBandwidth: 'Low Bandwidth Mode (Lite)'
  },

  mr: {
    appTitle: 'शेतकरी सेतू',
    heroHighlight: 'थेट शेतकरी बाजार जोडणी',
    tagline: 'महाराष्ट्र शासन — शेतीमाल बाजार जोडणी व भाव शोध प्रणाली',
    farmerPortal: 'शेतकरी कक्ष',
    millPortal: 'अडत व ऑईल मिल कक्ष',
    transporterPortal: 'वाहतूकदार लिलाव केंद्र',
    compliance: 'कायदेशीर सुसंगतता',
    activeBenchmark: 'जमिनीवरील संदर्भ: लामजणा (औसा) ते लातूर - १५ क्विंटल सोयाबीन',
    
    // Hero & Home Section
    heroSubtitle: 'माहितीचा अभाव, मध्यस्थांचे आर्थिक शोषण आणि वाहतूक अडथळे दूर करून शेतकऱ्यांना थेट उच्च बाजारभावाची हमी देणारे व्यासपीठ. लामजणा गावातील (औसा, लातूर) १५ क्विंटल सोयाबीन विक्रीचे प्रत्यक्ष मॉडेल.',
    originLabel: 'मूळ ठिकाण',
    originVal: 'लामजणा, ता. औसा, जि. लातूर',
    produceLabel: 'शेतमाल व प्रमाण',
    produceVal: '१५ क्विंटल सोयाबीन (Grade A)',
    surplusLabel: 'अनलॉक झालेला नफा',
    surplusVal: '+₹७,७०० निव्वळ जास्त',
    complianceLabel: 'कायदेशीर हमी',
    complianceVal: 'Non-Custodial Escrow (DML-88)',
    openFarmerPortalBtn: 'शेतकरी कक्ष सुरू करा',
    liveDemo90SecBtn: '९०-सेकंद थेट डेमो वॉकथ्रू',
    pipelineTitle: '९०-सेकंद मूल्यांकन वॉकथ्रू टप्पे (SIH Pipeline)',
    pipelineSubtitle: 'परीक्षकांसाठी लामजणा ते लातूर संपूर्ण व्यवहाराचा ५-टप्प्यांचा थेट प्रवाह',
    stepActive: 'टप्पा',
    stepActiveSuffix: '/ ५ सक्रिय',
    runStageDirectlyBtn: 'हा टप्पा थेट चालवा',
    stages: [
      {
        step: 1,
        title: '१. भाषिणी व्हॉइस इनपुट',
        desc: 'लामजणा शेतकरी १५ क्विंटल सोयाबीन मराठीत बोलून नोंदवतो.',
        prompt: '👉 टप्पा १: शेतकरी कक्षात भाषिणी व्हॉइस इनपुट वापरून फॉर्म भरा.'
      },
      {
        step: 2,
        title: '२. आर्बिट्राज तुलना',
        desc: 'स्थानिक मंडी vs लातूर APMC vs कीर्ती गोल्ड मिल थेट नफा तुलना.',
        prompt: '👉 टप्पा २: कीर्ती गोल्ड मिलचा निव्वळ भाव ₹७३,३५० (स्थानिकपेक्षा +₹७,७००) तपासा.'
      },
      {
        step: 3,
        title: '३. भाव लॉक व कायदेशीर संमती',
        desc: 'Non-Custodial एस्क्रो हमीसह ३ तासांसाठी दर सुरक्षित लॉक.',
        prompt: '👉 टप्पा ३: डिजिटल संमती मोडल तपासा (Non-Custodial Escrow & APMC कायदेशीर सुसंगतता).'
      },
      {
        step: 4,
        title: '४. १०-मि. वाहतूक लिलाव',
        desc: 'Socket.io रिव्हर्स ऑक्शन + ₹६५० फ्लोअर प्राईस संरक्षण.',
        prompt: '👉 टप्पा ४: वाहतूकदार कक्षात बोली लावा व ₹६०० टाकून फ्लोअर प्राईस रिजेक्शन तपासा.'
      },
      {
        step: 5,
        title: '५. वजन पावती व एस्क्रो रिलीज',
        desc: 'डिजिटल वजन पावती + UPI Route स्प्लिट सेटलमेंट.',
        prompt: '👉 टप्पा ५: ऑईल मिल कक्षात डिजिटल वजन पावती तयार करून थेट एस्क्रो रक्कम रिलीज करा.'
      }
    ],
    portalCards: {
      farmer: {
        title: '१. शेतकरी कक्ष (Farmer Portal)',
        desc: 'भाषिणी व्हॉइस इनपुट, थेट आर्बिट्राज तुलना (Mandi vs APMC vs Mill), AI भाव अंदाज, पारदर्शक खर्च वजावट, PWA ऑफलाइन IndexedDB व SMS पर्याय.',
        enterBtn: 'प्रवेश करा'
      },
      mill: {
        title: '२. अडत व मिल कक्ष (Adat & Mill Portal)',
        desc: 'दैनिक दर प्रकाशन, ML-संचलित >२०% APMC आउटलायर इशारा, येणाऱ्या शेतीमालाचे लाइव्ह काउंटडाउन, डिजिटल वजन पावती व UPI Route एस्क्रो रिलीज.',
        enterBtn: 'प्रवेश करा'
      },
      transporter: {
        title: '३. वाहतूकदार लिलाव (Transporter Engine)',
        desc: '१०-मिनिटांचा थेट Socket.io रिव्हर्स ऑक्शन, -₹२०/-₹५० झटपट बोली, ₹६५० फ्लोअर प्राईस संरक्षण (हार्ड सर्वर व्हॅलिडेशन), AI संगनमत शोध.',
        enterBtn: 'प्रवेश करा'
      }
    },
    legalBanner: {
      title: 'कायदेशीर संरक्षण:',
      desc: 'महाराष्ट्र APMC कायदा व RBI पेमेंट एग्रीगेटर मार्गदर्शक तत्त्वांशी १००% सुसंगत नॉन-कस्टोडियल मॉडेल.',
      readMoreBtn: 'COMPLIANCE.md वाचा'
    },

    // Voice / Input
    voiceTitle: 'भाषिणी बहुभाषिक व्हॉइस इनपुट (Bhashini AI)',
    voiceSubtitle: 'माईक दाबा किंवा खालील बटणाने व्हॉट्सॲप शैलीत बोला',
    voiceSimulateBtn: 'बोला: "माझ्याकडे लामजणा येथे १५ क्विंटल सोयाबीन आहे"',
    listening: 'ऐकत आहे... भाषांतर प्रक्रिया सुरू...',
    crop: 'पीक',
    quantity: 'वजन / प्रमाण (क्विंटल)',
    village: 'गाव व तालुका',
    calculateArbitrage: 'उत्तम बाजारभाव व निव्वळ नफा शोधा',

    // Arbitrage
    arbitrageTitle: 'बाजारभाव तुलना व निव्वळ हातात येणारी रक्कम',
    arbitrageDesc: 'स्थानिक मंडी, लातूर APMC आणि ऑईल मिल मधील थेट फरक (खर्च व सेस वजा जाता)',
    surplusBanner: 'शेतकरी सेतूमुळे स्थानिक तोट्याच्या विक्रीपेक्षा ₹',
    surplusBannerSuffix: 'जास्त निव्वळ नफा!',
    surplusExplainer: 'स्थानिक मध्यस्थांऐवजी लातूर मिलमध्ये थेट विकल्यास वाहतूक व सेस वजा जाता निव्वळ फायदा.',
    benchmarkBadge: '१५ क्विंटल सोयाबीन बेंचमार्क',
    optionsAvailable: '३ पर्याय उपलब्ध (निव्वळ नफ्यानुसार क्रमवारी)',
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
    lowBandwidth: 'कमी डेटा मोड (Lite Mode)'
  },

  hi: {
    appTitle: 'शेतकरी सेतु',
    heroHighlight: 'सीधा किसान बाज़ार संपर्क',
    tagline: 'महाराष्ट्र शासन — कृषि उपज बाजार लिंकेज एवं मूल्य खोज प्रणाली',
    farmerPortal: 'किसान पोर्टल',
    millPortal: 'आढ़त व ऑइल मिल पोर्टल',
    transporterPortal: 'ट्रांसपोर्टर नीलामी केंद्र',
    compliance: 'कानूनी अनुपालन',
    activeBenchmark: 'ग्राउंड बेंचमार्क: लामजना (औसा) से लातूर — 15 क्विंटल सोयाबीन',

    // Hero & Home Section
    heroSubtitle: 'सूचना की कमी, बिचौलियों का शोषण और परिवहन बाधाओं को समाप्त कर किसानों को सीधे उच्च बाजार मूल्य दिलाने वाला मंच। लामजना गांव (औसा, लातूर) से 15 क्विंटल सोयाबीन बिक्री का लाइव मॉडल।',
    originLabel: 'मूल स्थान',
    originVal: 'लामजना, तह. औसा, जिला लातूर',
    produceLabel: 'उपज एवं मात्रा',
    produceVal: '15 क्विंटल सोयाबीन (Grade A)',
    surplusLabel: 'प्राप्त शुद्ध मुनाफा',
    surplusVal: '+₹7,700 शुद्ध अधिक',
    complianceLabel: 'कानूनी सुरक्षा',
    complianceVal: 'Non-Custodial Escrow (DML-88)',
    openFarmerPortalBtn: 'किसान पोर्टल खोलें',
    liveDemo90SecBtn: '90-सेकंड लाइव डेमो वॉकथ्रू',
    pipelineTitle: '90-सेकंड मूल्यांकन वॉकथ्रू चरण (SIH Pipeline)',
    pipelineSubtitle: 'परीक्षकों के लिए लामजना से लातूर पूर्ण लेनदेन का 5-चरणीय लाइव प्रवाह',
    stepActive: 'चरण',
    stepActiveSuffix: '/ 5 सक्रिय',
    runStageDirectlyBtn: 'यह चरण तुरंत चलाएं',
    stages: [
      {
        step: 1,
        title: '1. भाषिणी वॉयस इनपुट',
        desc: 'लामजना किसान 15 क्विंटल सोयाबीन बोलकर पंजीकृत करता है।',
        prompt: '👉 चरण 1: किसान पोर्टल में भाषिणी वॉयस इनपुट से फॉर्म भरें।'
      },
      {
        step: 2,
        title: '2. आर्बिट्राज तुलना',
        desc: 'स्थानीय मंडी vs लातूर APMC vs कीर्ति गोल्ड मिल शुद्ध लाभ तुलना।',
        prompt: '👉 चरण 2: कीर्ति गोल्ड मिल का शुद्ध भाव ₹73,350 (स्थानीय से +₹7,700) जांचें।'
      },
      {
        step: 3,
        title: '3. मूल्य लॉक व कानूनी सहमति',
        desc: 'Non-Custodial एस्क्रो गारंटी के साथ 3 घंटे के लिए दर सुरक्षित लॉक।',
        prompt: '👉 चरण 3: डिजिटल सहमति मॉडल देखें (APMC नियम व बैंक एस्क्रो)।'
      },
      {
        step: 4,
        title: '4. 10-मिनट परिवहन नीलामी',
        desc: 'Socket.io रिवर्स नीलामी + ₹650 फ्लोर प्राइस सुरक्षा।',
        prompt: '👉 चरण 4: ट्रांसपोर्टर पोर्टल में बोली लगाएं व ₹600 पर फ्लोर प्राइस रिजेक्शन देखें।'
      },
      {
        step: 5,
        title: '5. तौल पर्ची व एस्क्रो रिलीज',
        desc: 'डिजिटल तौल पर्ची + UPI Route स्प्लिट सेटलमेंट।',
        prompt: '👉 चरण 5: मिल पोर्टल में डिजिटल वजन पर्ची बनाकर सीधे राशि ट्रांसफर करें।'
      }
    ],
    portalCards: {
      farmer: {
        title: '1. किसान पोर्टल (Farmer Portal)',
        desc: 'भाषिणी वॉयस इनपुट, लाइव आर्बिट्राज तुलना (मंडी vs APMC vs मिल), AI मूल्य पूर्वानुमान, पारदर्शी खर्च कटौती, PWA ऑफलाइन कतार व SMS सुविधा।',
        enterBtn: 'प्रवेश करें'
      },
      mill: {
        title: '2. आढ़त व मिल पोर्टल (Adat & Mill)',
        desc: 'दैनिक दर प्रकाशन, ML-संचालित >20% APMC आउटलायर चेतावनी, आने वाले वाहनों की लाइव ट्रैकिंग, डिजिटल वजन पर्ची व UPI Route एस्क्रो रिलीज।',
        enterBtn: 'प्रवेश करें'
      },
      transporter: {
        title: '3. ट्रांसपोर्टर नीलामी (Transporter)',
        desc: '10-मिनट लाइव Socket.io रिवर्स नीलामी, -₹20/-₹50 त्वरित बोली, ₹650 फ्लोर प्राइस संरक्षण (हार्ड सर्वर वैलिडेशन), AI मिलीभगत पहचान।',
        enterBtn: 'प्रवेश करें'
      }
    },
    legalBanner: {
      title: 'कानूनी सुरक्षा:',
      desc: 'महाराष्ट्र APMC अधिनियम, 1963 एवं RBI पेमेंट एग्रीगेटर दिशानिर्देशों के 100% अनुकूल नॉन-कस्टोडियल मॉडल।',
      readMoreBtn: 'COMPLIANCE.md पढ़ें'
    },

    // Voice / Input
    voiceTitle: 'भाषिणी बहुभाषी वॉयस इनपुट (Bhashini AI)',
    voiceSubtitle: 'माइक दबाएं या व्हाट्सएप शैली में ऑडियो बोलें',
    voiceSimulateBtn: 'बोलें: "मेरे पास लामजना में 15 क्विंटल सोयाबीन है"',
    listening: 'सुन रहे हैं... AI अनुवाद जारी है...',
    crop: 'फसल',
    quantity: 'मात्रा (क्विंटल)',
    village: 'गांव एवं तहसील',
    calculateArbitrage: 'सर्वोत्तम शुद्ध लाभ खोजें',

    // Arbitrage
    arbitrageTitle: 'बाजार भाव तुलना एवं शुद्ध हाथ में आने वाली राशि',
    arbitrageDesc: 'स्थानीय मंडी vs लातूर APMC vs ऑइल मिल सीधा अंतर (सेस व भाड़ा काटकर)',
    surplusBanner: 'शेतकरी सेतु से स्थानीय मजबूरी बिक्री से ₹',
    surplusBannerSuffix: 'अधिक शुद्ध मुनाफा!',
    surplusExplainer: 'स्थानीय बिचौलियों के बजाय मिल में सीधे बेचने पर भाड़ा व सेस काटकर शुद्ध अधिक लाभ।',
    benchmarkBadge: '15 क्विंटल सोयाबीन बेंचमार्क',
    optionsAvailable: '3 विकल्प उपलब्ध (शुद्ध लाभ के आधार पर क्रमबद्ध)',
    grossRate: 'खरीद दर',
    netTakeHome: 'शुद्ध हाथ में मिलने वाला भाव',
    transportCost: 'परिवहन किराया',
    apmcCess: 'APMC सेस (1.05%)',
    lockPriceBtn: 'भाव लॉक करें और गाड़ी बुक करें',
    viewBreakdown: 'कटौती का पूरा विवरण',
    aiInsightTitle: 'AI मूल्य पूर्वानुमान व सलाह',

    // Transit & Price Lock
    transitTitle: 'लाइव वाहन ट्रैकिंग एवं मूल्य-लॉक अनुबंध',
    priceLockActive: 'मूल्य लॉक सक्रिय (बैंक एस्क्रो गारंटी)',
    timeLeft: 'शेष समय',
    truckLocation: 'वाहन की स्थिति',
    driver: 'चालक',
    vehicleNo: 'गाड़ी संख्या',
    escrowStatus: 'बैंक एस्क्रो स्थिति',
    escrowHeld: 'राशि बैंक में सुरक्षित (Non-Custodial)',

    // Mill Portal
    millTitle: 'आढ़त व मिल दैनिक दर प्रकाशन',
    publishRate: 'आज का खरीद भाव प्रकाशित करें',
    quota: 'कोटा (क्विंटल)',
    grade: 'गुणवत्ता ग्रेड',
    outlierAlert: 'चेतावनी: यह दर सरकारी APMC बेंचमार्क से 20% से अधिक विचलित है!',
    incomingDispatches: 'आने वाला माल व सक्रिय मूल्य-लॉक',
    generateWeighSlip: 'डिजिटल तौल पर्ची तैयार करें',
    releaseEscrow: 'एस्क्रो राशि सीधे ट्रांसफर करें (UPI Route)',

    // Transporter Portal
    auctionTitle: '10 मिनट की लाइव रिवर्स नीलामी (Reverse Auction)',
    lowestBid: 'वर्तमान न्यूनतम बोली',
    floorPriceAlert: 'न्यूनतम दर संरक्षण: ₹650 से कम बोली लगाने पर कानूनी रोक है।',
    placeBid: 'बोली लगाएं',
    tripDetails: 'यात्रा: लामजना -> लातूर MIDC (41 किमी)',
    cargoDetails: 'माल: 15 क्विंटल सोयाबीन',
    anomalyAlert: 'संदिग्ध बोली / मिलीभगत चेतावनी (AI Flag)',

    // Offline
    offlineMode: 'ऑफलाइन मोड सक्रिय — विवरण स्थानीय IndexedDB में सुरक्षित है।',
    synced: 'सभी ऑफलाइन आवेदन ऑनलाइन सर्वर पर सिंक हो गए हैं।',
    lowBandwidth: 'कम डेटा मोड (Lite Mode)'
  },

  kn: {
    appTitle: 'ಶೇತ್ಕರಿ ಸೇತು',
    heroHighlight: 'ನೇರ ರೈತ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ',
    tagline: 'ಮಹಾರಾಷ್ಟ್ರ ಸರ್ಕಾರ — ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ ಮತ್ತು ಬೆಲೆ ಪತ್ತೆ ವ್ಯವಸ್ಥೆ',
    farmerPortal: 'ರೈತರ ಪೋರ್ಟಲ್',
    millPortal: 'ಅಡತ್ ಮತ್ತು ಮಿಲ್ ಪೋರ್ಟಲ್',
    transporterPortal: 'ಸಾರಿಗೆದಾರರ ಹರಾಜು ಕೇಂದ್ರ',
    compliance: 'ಕಾನೂನು ಅನುಸರಣೆ',
    activeBenchmark: 'ಮಾದರಿ ಸನ್ನಿವೇಶ: ಲಾಂಜನಾ (ಔಸಾ) ದಿಂದ ಲಾತೂರ್ — 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್',

    heroSubtitle: 'ಮಾಹಿತಿಯ ಕೊರತೆ ಮತ್ತು ದಲ್ಲಾಳಿಗಳ ಶೋಷಣೆಯನ್ನು ನಿವಾರಿಸಿ ರೈತರಿಗೆ ನೇರವಾಗಿ ಹೆಚ್ಚಿನ ಬೆಲೆ ಒದಗಿಸುವ ವೇದಿಕೆ. ಲಾಂಜನಾ ಗ್ರಾಮದಿಂದ 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ ಮಾರಾಟದ ಮಾದರಿ.',
    originLabel: 'ಮೂಲ ಸ್ಥಳ',
    originVal: 'ಲಾಂಜನಾ, ತಾಲ್ಲೂಕು ಔಸಾ, ಲಾತೂರ್',
    produceLabel: 'ಬೆಳೆ ಮತ್ತು ಪ್ರಮಾಣ',
    produceVal: '15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ (Grade A)',
    surplusLabel: 'ಗಳಿಸಿದ ನಿವ್ವಳ ಲಾಭ',
    surplusVal: '+₹7,700 ಹೆಚ್ಚಿನ ಲಾಭ',
    complianceLabel: 'ಕಾನೂನು ರಕ್ಷಣೆ',
    complianceVal: 'Non-Custodial Escrow (DML-88)',
    openFarmerPortalBtn: 'ರೈತರ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    liveDemo90SecBtn: '90-ಸೆಕೆಂಡ್ ಲೈವ್ ಡೆಮೊ ವೀಕ್ಷಣೆ',
    pipelineTitle: '90-ಸೆಕೆಂಡ್‌ಗಳ SIH ಮೌಲ್ಯಮಾಪನ ಹಂತಗಳು',
    pipelineSubtitle: 'ಲಾಂಜನಾದಿಂದ ಲಾತೂರುವರೆಗಿನ 5-ಹಂತದ ನೇರ ವ್ಯವಹಾರ ಪ್ರಕ್ರಿಯೆ',
    stepActive: 'ಹಂತ',
    stepActiveSuffix: '/ 5 ಸಕ್ರಿಯವಾಗಿದೆ',
    runStageDirectlyBtn: 'ಈ ಹಂತವನ್ನು ಚಲಾಯಿಸಿ',
    stages: [
      {
        step: 1,
        title: '1. ಭಾಷಿಣಿ ಧ್ವನಿ ಇನ್ಪುಟ್',
        desc: 'ರೈತರು ಧ್ವನಿ ಮೂಲಕ 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ ನೋಂದಾಯಿಸುತ್ತಾರೆ.',
        prompt: '👉 ಹಂತ 1: ರೈತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಭಾಷಿಣಿ ಧ್ವನಿ ಮೂಲಕ ವಿವರ ನಮೂದಿಸಿ.'
      },
      {
        step: 2,
        title: '2. ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ',
        desc: 'ಸ್ಥಳೀಯ ಮಂಡಿ vs ಲಾತೂರ್ APMC vs ಮಿಲ್ ನಿವ್ವಳ ಲಾಭ ಹೋಲಿಕೆ.',
        prompt: '👉 ಹಂತ 2: ಕೀರ್ತಿ ಗೋಲ್ಡ್ ಮಿಲ್‌ನಿಂದ ದೊರೆಯುವ ₹73,350 ನಿವ್ವಳ ಆದಾಯ ಪರಿಶೀಲಿಸಿ.'
      },
      {
        step: 3,
        title: '3. ಬೆಲೆ ಲಾಕ್ ಮತ್ತು ಒಪ್ಪಂದ',
        desc: 'ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋ ಭದ್ರತೆಯೊಂದಿಗೆ 3 ಗಂಟೆಗಳ ಕಾಲ ಬೆಲೆ ಲಾಕ್.',
        prompt: '👉 ಹಂತ 3: ಡಿಜಿಟಲ್ ಸಮ್ಮತಿ ಪರಿಶೀಲಿಸಿ (APMC ನಿಯಮಗಳು ಮತ್ತು ಎಸ್ಕ್ರೋ).'
      },
      {
        step: 4,
        title: '4. 10-ನಿಮಿಷಗಳ ರಿವರ್ಸ್ ಹರಾಜು',
        desc: 'Socket.io ಹರಾಜು + ₹650 ಕನಿಷ್ಠ ಬೆಲೆ ರಕ್ಷಣೆ.',
        prompt: '👉 ಹಂತ 4: ಸಾರಿಗೆ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಬಿಡ್ ಸಲ್ಲಿಸಿ, ₹600 ನಿರ್ಬಂಧ ಪರಿಶೀಲಿಸಿ.'
      },
      {
        step: 5,
        title: '5. ತೂಕದ ರಸೀದಿ & ಹಣ ಬಿಡುಗಡೆ',
        desc: 'ಡಿಜಿಟಲ್ ರಸೀದಿ + UPI Route ಮೂಲಕ ಹಣ ನೇರ ವರ್ಗಾವಣೆ.',
        prompt: '👉 ಹಂತ 5: ಮಿಲ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತೂಕದ ರಸೀದಿ ಸೃಷ್ಟಿಸಿ ಹಣ ಬಿಡುಗಡೆ ಮಾಡಿ.'
      }
    ],
    portalCards: {
      farmer: {
        title: '1. ರೈತರ ಪೋರ್ಟಲ್ (Farmer)',
        desc: 'ಭಾಷಿಣಿ ಧ್ವನಿ ಇನ್ಪುಟ್, ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ, AI ಬೆಲೆ ಮುನ್ಸೂಚನೆ, ಪಾರದರ್ಶಕ ವೆಚ್ಚ ಕಡಿತ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಸೌಲಭ್ಯ.',
        enterBtn: 'ಪ್ರವೇಶಿಸಿ'
      },
      mill: {
        title: '2. ಅಡತ್ & ಮಿಲ್ ಪೋರ್ಟಲ್ (Mill)',
        desc: 'ದೈನಂದಿನ ದರ ಪ್ರಕಟಣೆ, ML >20% ಎಚ್ಚರಿಕೆ, ನೇರ ವಾಹನ ಟ್ರ್ಯಾಕಿಂಗ್, ಡಿಜಿಟಲ್ ತೂಕದ ರಸೀದಿ ಮತ್ತು ಎಸ್ಕ್ರೋ ಬಿಡುಗಡೆ.',
        enterBtn: 'ಪ್ರವೇಶಿಸಿ'
      },
      transporter: {
        title: '3. ಸಾರಿಗೆದಾರರ ಹರಾಜು (Transporter)',
        desc: '10 ನಿಮಿಷಗಳ ಲೈವ್ ಹರಾಜು, -₹20/-₹50 ತ್ವರಿತ ಬಿಡ್, ₹650 ಕನಿಷ್ಠ ಬೆಲೆ ರಕ್ಷಣೆ ಮತ್ತು AI ಭದ್ರತೆ.',
        enterBtn: 'ಪ್ರವೇಶಿಸಿ'
      }
    },
    legalBanner: {
      title: 'ಕಾನೂನು ಭದ್ರತೆ:',
      desc: 'ಮಹಾರಾಷ್ಟ್ರ APMC ಕಾಯ್ದೆ ಮತ್ತು RBI ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ 100% ಅನುಗುಣವಾಗಿರುವ ನಾನ್-ಕಸ್ಟೋಡಿಯಲ್ ವ್ಯವಸ್ಥೆ.',
      readMoreBtn: 'COMPLIANCE.md ಓದಿ'
    },

    // Voice / Input
    voiceTitle: 'ಭಾಷಿಣಿ ಧ್ವನಿ ಇನ್ಪುಟ್ (Bhashini AI)',
    voiceSubtitle: 'ಮೈಕ್ ಒತ್ತಿ ಅಥವಾ ಧ್ವನಿ ಮೂಲಕ ತಿಳಿಸಿ',
    voiceSimulateBtn: 'ಧ್ವನಿ: "ನನ್ನ ಬಳಿ ಲಾಂಜನಾದಲ್ಲಿ 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ ಇದೆ"',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ...',
    crop: 'ಬೆಳೆ',
    quantity: 'ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್)',
    village: 'ಗ್ರಾಮ ಮತ್ತು ತಾಲ್ಲೂಕು',
    calculateArbitrage: 'ಉತ್ತಮ ನಿವ್ವಳ ಲಾಭ ಹುಡುಕಿ',

    // Arbitrage
    arbitrageTitle: 'ಮಾರುಕಟ್ಟೆ ದರ ಹೋಲಿಕೆ ಮತ್ತು ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಆದಾಯ',
    arbitrageDesc: 'ಸ್ಥಳೀಯ ಮಂಡಿ vs ಲಾತೂರ್ APMC vs ಆಯಿಲ್ ಮಿಲ್ ನೇರ ವ್ಯತ್ಯಾಸ',
    surplusBanner: 'ಶೇತ್ಕರಿ ಸೇತು ಮೂಲಕ ಸ್ಥಳೀಯ ಮಾರಾಟಕ್ಕಿಂತ ₹',
    surplusBannerSuffix: 'ಹೆಚ್ಚಿನ ನಿವ್ವಳ ಲಾಭ!',
    surplusExplainer: 'ಸ್ಥಳೀಯ ದಲ್ಲಾಳಿಗಳ ಬದಲಿಗೆ ನೇರವಾಗಿ ಮಿಲ್‌ನಲ್ಲಿ ಮಾರಾಟ ಮಾಡುವುದರಿಂದ ಸಾರಿಗೆ ಮತ್ತು ಸೆಸ್ ಕಳೆದ ನಂತರ ಹೆಚ್ಚಿನ ನಿವ್ವಳ ಲಾಭ.',
    benchmarkBadge: '15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್ ಮಾನದಂಡ',
    optionsAvailable: '3 ಆಯ್ಕೆಗಳು ಲಭ್ಯವಿದೆ (ನಿವ್ವಳ ಲಾಭದ ಶ್ರೇಯಾಂಕ)',
    grossRate: 'ಖರೀದಿ ದರ',
    netTakeHome: 'ನಿವ್ವಳ ಕೈಗೆ ಸಿಗುವ ದರ',
    transportCost: 'ಸಾರಿಗೆ ವೆಚ್ಚ',
    apmcCess: 'APMC ಸೆಸ್ (1.05%)',
    lockPriceBtn: 'ದರ ಲಾಕ್ ಮಾಡಿ ವಾಹನ ಬುಕ್ ಮಾಡಿ',
    viewBreakdown: 'ವೆಚ್ಚಗಳ ಸಂಪೂರ್ಣ ವಿವರ',
    aiInsightTitle: 'AI ಬೆಲೆ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಸಲಹೆ',

    // Transit & Price Lock
    transitTitle: 'ನೇರ ವಾಹನ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ದರ-ಲಾಕ್ ಒಪ್ಪಂದ',
    priceLockActive: 'ದರ ಲಾಕ್ ಸಕ್ರಿಯವಾಗಿದೆ (ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋ ಭದ್ರತೆ)',
    timeLeft: 'ಉಳಿದ ಸಮಯ',
    truckLocation: 'ವಾಹನದ ಸ್ಥಳ',
    driver: 'ಚಾಲಕ',
    vehicleNo: 'ವಾಹನ ಸಂಖ್ಯೆ',
    escrowStatus: 'ಬ್ಯಾಂಕ್ ಎಸ್ಕ್ರೋ ಸ್ಥಿತಿ',
    escrowHeld: 'ಹಣ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಸುರಕ್ಷಿತ (Non-Custodial)',

    // Mill Portal
    millTitle: 'ದೈನಂದಿನ ಖರೀದಿ ದರ ಪ್ರಕಟಣೆ',
    publishRate: 'ಇಂದಿನ ದರ ಪ್ರಕಟಿಸಿ',
    quota: 'ಕೋಟಾ (ಕ್ವಿಂಟಾಲ್)',
    grade: 'ಗುಣಮಟ್ಟ ಗ್ರೇಡ್',
    outlierAlert: 'ಎಚ್ಚರಿಕೆ: ಈ ದರವು APMC ಮಾನದಂಡಕ್ಕಿಂತ 20% ಗಿಂತ ಹೆಚ್ಚು ಭಿನ್ನವಾಗಿದೆ!',
    incomingDispatches: 'ಬರುತ್ತಿರುವ ಸರಕು ಮತ್ತು ಸಕ್ರಿಯ ದರ-ಲಾಕ್',
    generateWeighSlip: 'ಡಿಜಿಟಲ್ ತೂಕದ ರಸೀದಿ ತಯಾರಿಸಿ',
    releaseEscrow: 'ಎಸ್ಕ್ರೋ ಹಣ ಬಿಡುಗಡೆ ಮಾಡಿ (UPI Route)',

    // Transporter Portal
    auctionTitle: '10 ನಿಮಿಷಗಳ ಲೈವ್ ರಿವರ್ಸ್ ಹರಾಜು',
    lowestBid: 'ಪ್ರಸ್ತುತ ಕನಿಷ್ಠ ಬಿಡ್',
    floorPriceAlert: 'ಕನಿಷ್ಠ ಬೆಲೆ ರಕ್ಷಣೆ: ₹650 ಕ್ಕಿಂತ ಕಡಿಮೆ ಬಿಡ್ ಅನುಮತಿಸಲಾಗುವುದಿಲ್ಲ.',
    placeBid: 'ಬಿಡ್ ಸಲ್ಲಿಸಿ',
    tripDetails: 'ಪ್ರಯಾಣ: ಲಾಂಜನಾ -> ಲಾತೂರ್ MIDC (41 ಕಿ.ಮೀ)',
    cargoDetails: 'ಸರಕು: 15 ಕ್ವಿಂಟಾಲ್ ಸೋಯಾಬೀನ್',
    anomalyAlert: 'ಅನುಮಾನಾಸ್ಪದ ಬಿಡ್ ಎಚ್ಚರಿಕೆ',

    // Offline
    offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯ — ವಿವರಗಳು ಸಾಧನದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿವೆ.',
    synced: 'ಎಲ್ಲಾ ಸಲ್ಲಿಕೆಗಳು ಯಶಸ್ವಿಯಾಗಿ ಸಿಂಕ್ ಆಗಿವೆ.',
    lowBandwidth: 'ಕಡಿಮೆ ಡೇಟಾ ಮೋಡ್ (Lite)'
  },

  te: {
    appTitle: 'శేత్కరీ సేతు',
    heroHighlight: 'రైతు ప్రత్యక్ష మార్కెట్ అనుసంధానం',
    tagline: 'మహారాష్ట్ర ప్రభుత్వం — వ్యవసాయ మార్కెట్ అనుసంధానం & ధరల గుర్తింపు',
    farmerPortal: 'రైతు పోర్టల్',
    millPortal: 'ఆడత్ & మిల్లు పోర్టల్',
    transporterPortal: 'రవాణాదారుల వేలం కేంద్రం',
    compliance: 'చట్టపరమైన నిబంధనలు',
    activeBenchmark: 'లక్ష్యం: లాంజనా (ఔసా) నుండి లాతూర్ — 15 క్వింటాళ్ల సోయాబీన్',

    heroSubtitle: 'సమాచార లోపం మరియు దళారుల దోపిడీని అరికట్టి రైతులకు నేరుగా గరిష్ట మార్కెట్ ధరను అందించే వేదిక. లాంజనా గ్రామం నుండి 15 క్వింటాళ్ల సోయాబీన్ విక్రయ నమూనా.',
    originLabel: 'మూల ప్రదేశం',
    originVal: 'లాంజనా, ఔసా తాలూకా, లాతూర్',
    produceLabel: 'పంట & పరిమాణం',
    produceVal: '15 క్వింటాళ్ల సోయాబీన్ (Grade A)',
    surplusLabel: 'లభించిన నికర లాభం',
    surplusVal: '+₹7,700 అదనపు లాభం',
    complianceLabel: 'చట్టపరమైన హామీ',
    complianceVal: 'Non-Custodial Escrow (DML-88)',
    openFarmerPortalBtn: 'రైతు పోర్టల్ తెరవండి',
    liveDemo90SecBtn: '90-సెకన్ల లైవ్ డెమో',
    pipelineTitle: '90-సెకన్ల SIH మూల్యాంకన దశలు',
    pipelineSubtitle: 'లాంజనా నుండి లాతూర్ వరకు 5-దశల ప్రత్యక్ష లావాదేవీల ప్రవాహం',
    stepActive: 'దశ',
    stepActiveSuffix: '/ 5 సక్రియంగా ఉంది',
    runStageDirectlyBtn: 'ఈ దశను నేరుగా ప్రారంభించండి',
    stages: [
      {
        step: 1,
        title: '1. భాషిణి వాయిస్ ఇన్‌పుట్',
        desc: 'రైతు వాయిస్ ద్వారా 15 క్వింటాళ్ల సోయాబీన్‌ను నమోదు చేస్తారు.',
        prompt: '👉 దశ 1: రైతు పోర్టల్‌లో వాయిస్ ద్వారా పంట నమోదు చేయండి.'
      },
      {
        step: 2,
        title: '2. మార్కెట్ ధరల పోలిక',
        desc: 'స్థానిక మార్కెట్ vs లాతూర్ APMC vs మిల్లు నికర లాభ పోలిక.',
        prompt: '👉 దశ 2: కీర్తి గోల్డ్ మిల్లులో ₹73,350 నికర రాబడిని తనిఖీ చేయండి.'
      },
      {
        step: 3,
        title: '3. ధర లాక్ & ఒప్పందం',
        desc: 'బ్యాంక్ ఎస్క్రో రక్షణతో 3 గంటల పాటు ధర సురక్షిత లాక్.',
        prompt: '👉 దశ 3: చట్టపరమైన ఒప్పందం & APMC నిబంధనలను సమీక్షించండి.'
      },
      {
        step: 4,
        title: '4. 10-నిమిషాల వేలం',
        desc: 'Socket.io వేలం + ₹650 కనీస ధర రక్షణ.',
        prompt: '👉 దశ 4: రవాణా పోర్టల్‌లో బిడ్ చేయండి, ₹600 పరిమితి చూడండి.'
      },
      {
        step: 5,
        title: '5. తూకం రసీదు & నిధుల విడుదల',
        desc: 'డిజిటల్ రసీదు + UPI Route ద్వారా నేరుగా ఖాతాలోకి జమ.',
        prompt: '👉 దశ 5: మిల్లు పోర్టల్‌లో రసీదు ధృవీకరించి ఎస్క్రో నిధులను విడుదల చేయండి.'
      }
    ],
    portalCards: {
      farmer: {
        title: '1. రైతు పోర్టల్ (Farmer)',
        desc: 'భాషిణి వాయిస్ ఇన్‌పుట్, ధరల పోలిక, AI ధర అంచనా, పారదర్శక రవాణా లెక్కలు మరియు ఆఫ్‌లైన్ సౌకర్యం.',
        enterBtn: 'ప్రవేశించండి'
      },
      mill: {
        title: '2. ఆడత్ & మిల్లు పోర్టల్ (Mill)',
        desc: 'రోజువారీ కొనుగోలు ధరలు, ML >20% హెచ్చరిక, లైవ్ వాహన పర్యవేక్షణ, డిజిటల్ తూకం రసీదు మరియు ఎస్క్రో విడుదల.',
        enterBtn: 'ప్రవేశించండి'
      },
      transporter: {
        title: '3. రవాణాదారుల వేలం (Transporter)',
        desc: '10 నిమిషాల లైవ్ వేలం, -₹20/-₹50 తక్షణ బిడ్లు, ₹650 కనీస ధర రక్షణ మరియు AI నిఘా.',
        enterBtn: 'ప్రవేశించండి'
      }
    },
    legalBanner: {
      title: 'చట్టపరమైన రక్షణ:',
      desc: 'మహారాష్ట్ర APMC చట్టం మరియు RBI నిబంధనలకు 100% అనుగుణమైన నాన్-కస్టోడియల్ విధానం.',
      readMoreBtn: 'COMPLIANCE.md చదవండి'
    },

    // Voice / Input
    voiceTitle: 'భాషిణి బహుభాషా వాయిస్ ఇన్‌పుట్ (Bhashini AI)',
    voiceSubtitle: 'మైక్ నొక్కి లేదా ఆడియో ద్వారా చెప్పండి',
    voiceSimulateBtn: 'చెప్పండి: "నా వద్ద లాంజనాలో 15 క్వింటాళ్ల సోయాబీన్ ఉంది"',
    listening: 'వింటున్నాము... AI అనువాదం జరుగుతోంది...',
    crop: 'పంట',
    quantity: 'పరిమాణం (క్వింటాళ్లు)',
    village: 'గ్రామం మరియు తాలూకా',
    calculateArbitrage: 'ఉత్తమ నికర లాభాన్ని కనుగొనండి',

    // Arbitrage
    arbitrageTitle: 'మార్కెట్ ధరల పోలిక మరియు నికర చేతికందే మొత్తం',
    arbitrageDesc: 'స్థానిక మార్కెట్ vs లాతూర్ APMC vs ఆయిల్ మిల్లు ప్రత్యక్ష వ్యత్యాసం',
    surplusBanner: 'శేత్కరీ సేతు ద్వారా స్థానిక విక్రయం కంటే ₹',
    surplusBannerSuffix: 'ఎక్కువ నికర లాభం!',
    surplusExplainer: 'స్థానిక దళారుల కంటే నేరుగా మిల్లుకు అమ్మడం వల్ల రవాణా మరియు సెస్ మినహాయించిన తర్వాత నికర ఎక్కువ లాభం.',
    benchmarkBadge: '15 క్వింటాళ్ల సోయాబీన్ ప్రమాణం',
    optionsAvailable: '3 ఎంపికలు అందుబాటులో ఉన్నాయి (నికర లాభం క్రమం)',
    grossRate: 'కొనుగోలు ధర',
    netTakeHome: 'నికరంగా చేతికందే రేటు',
    transportCost: 'రవాణా ఖర్చు',
    apmcCess: 'APMC సెస్ (1.05%)',
    lockPriceBtn: 'ధర లాక్ చేసి వాహనాన్ని బుక్ చేయండి',
    viewBreakdown: 'ఖర్చుల పూర్తి వివరాలు',
    aiInsightTitle: 'AI ధర అంచనా & సలహా',

    // Transit & Price Lock
    transitTitle: 'లైవ్ వాహన ట్రాకింగ్ మరియు ధర-లాక్ ఒప్పందం',
    priceLockActive: 'ధర లాక్ సక్రియంగా ఉంది (బ్యాంక్ ఎస్క్రో హామీ)',
    timeLeft: 'మిగిలిన సమయం',
    truckLocation: 'వాహనం ఉన్న ప్రదేశం',
    driver: 'డ్రైవర్',
    vehicleNo: 'వాహనం నంబర్',
    escrowStatus: 'బ్యాంక్ ఎస్క్రో స్థితి',
    escrowHeld: 'మొత్తం బ్యాంకులో సురక్షితం (Non-Custodial)',

    // Mill Portal
    millTitle: 'రోజువారీ కొనుగోలు ధరల ప్రకటన',
    publishRate: 'నేటి ధరను ప్రకటించండి',
    quota: 'కోటా (క్వింటాళ్లు)',
    grade: 'నాణ్యత గ్రేడ్',
    outlierAlert: 'హెచ్చరిక: ఈ ధర APMC ప్రమాణం కంటే 20% ఎక్కువగా తేడా ఉంది!',
    incomingDispatches: 'వస్తున్న సరుకు & ధర-లాక్ ఆర్డర్లు',
    generateWeighSlip: 'డిజిటల్ బరువు రసీదు సృష్టించండి',
    releaseEscrow: 'ఎస్క్రో నిధులు విడుదల చేయండి (UPI Route)',

    // Transporter Portal
    auctionTitle: '10 నిమిషాల లైవ్ రివర్స్ వేలం',
    lowestBid: 'ప్రస్తుత అత్యల్ప బిడ్',
    floorPriceAlert: 'కనీస ధర రక్షణ: ₹650 కంటే తక్కువ బిడ్ చట్టవిరుద్ధం.',
    placeBid: 'బిడ్ దాఖలు చేయండి',
    tripDetails: 'ప్రయాణం: లాంజనా -> లాతూర్ MIDC (41 కి.మీ)',
    cargoDetails: 'సరుకు: 15 క్వింటాళ్ల సోయాబీన్',
    anomalyAlert: 'అనుమానాస్పద బిడ్ హెచ్చరిక',

    // Offline
    offlineMode: 'ఆఫ్‌లైన్ మోడ్ సక్రియంగా ఉంది — వివరాలు స్థానికంగా భద్రపరచబడ్డాయి.',
    synced: 'అన్ని దరఖాస్తులు విజయవంతంగా సర్వర్‌తో సమకాలీకరించబడ్డాయి.',
    lowBandwidth: 'తక్కువ డేటా మోడ్ (Lite)'
  },

  gu: {
    appTitle: 'શેતકરી સેતુ',
    heroHighlight: 'સીધું ખેડૂત બજાર જોડાણ',
    tagline: 'મહારાષ્ટ્ર સરકાર — કૃષિ બજાર જોડાણ અને ભાવ શોધ પ્રણાલી',
    farmerPortal: 'ખેડૂત પોર્ટલ',
    millPortal: 'આડત અને ઓઇલ મિલ પોર્ટલ',
    transporterPortal: 'ટ્રાન્સપોર્ટર હરાજી કેન્દ્ર',
    compliance: 'કાનૂની પાલન',
    activeBenchmark: 'ગ્રાઉન્ડ બેન્ચમાર્ક: લામજના (ઔસા) થી લાતૂર — 15 ક્વિન્ટલ સોયાબીન',

    heroSubtitle: 'માહિતીનો અભાવ અને વચેટિયાઓના શોષણને દૂર કરીને ખેડૂતોને સીધો ઊંચો બજાર ભાવ આપતું મંચ. લામજના ગામમાંથી 15 ક્વિન્ટલ સોયાબીન વેચાણનું જીવંત મોડેલ.',
    originLabel: 'મૂળ સ્થાન',
    originVal: 'લામજના, તા. ઔસા, જિ. લાતૂર',
    produceLabel: 'પાક અને જથ્થો',
    produceVal: '15 ક્વિન્ટલ સોયાબીન (Grade A)',
    surplusLabel: 'મળેલ ચોખ્ખો નફો',
    surplusVal: '+₹7,700 વધુ નફો',
    complianceLabel: 'કાનૂની ગેરંટી',
    complianceVal: 'Non-Custodial Escrow (DML-88)',
    openFarmerPortalBtn: 'ખેડૂત પોર્ટલ શરૂ કરો',
    liveDemo90SecBtn: '90-સેકન્ડ લાઇવ ડેમો વૉકથ્રૂ',
    pipelineTitle: '90-સેકન્ડ SIH મૂલ્યાંકન તબક્કા',
    pipelineSubtitle: 'પરીક્ષકો માટે લામજનાથી લાતૂર સુધીનો 5-તબક્કાનો જીવંત વ્યવહાર પ્રવાહ',
    stepActive: 'તબક્કો',
    stepActiveSuffix: '/ 5 સક્રિય',
    runStageDirectlyBtn: 'આ તબક્કો સીધો ચલાવો',
    stages: [
      {
        step: 1,
        title: '1. ભાષિણી વૉઇસ ઇનપુટ',
        desc: 'ખેડૂત બોલીને 15 ક્વિન્ટલ સોયાબીનની નોંધણી કરે છે.',
        prompt: '👉 તબક્કો 1: ખેડૂત પોર્ટલમાં ભાષિણી વૉઇસ ઇનપુટથી વિગતો ભરો.'
      },
      {
        step: 2,
        title: '2. બજાર ભાવ સરખામણી',
        desc: 'સ્થાનિક મંડી vs લાતૂર APMC vs મિલ ચોખ્ખા નફાની સરખામણી.',
        prompt: '👉 તબક્કો 2: કીર્તિ ગોલ્ડ મિલનો ₹73,350 ચોખ્ખો ભાવ તપાસો.'
      },
      {
        step: 3,
        title: '3. ભાવ લૉક અને કરાર',
        desc: 'બેંક એસ્ક્રો ગેરંટી સાથે 3 કલાક માટે ભાવ સુરક્ષિત લૉક.',
        prompt: '👉 તબક્કો 3: ડિજિટલ સંમતિ અને APMC નિયમોની સમીક્ષા કરો.'
      },
      {
        step: 4,
        title: '4. 10-મિનિટ રિવર્સ હરાજી',
        desc: 'Socket.io હરાજી + ₹650 લઘુત્તમ ભાવ સુરક્ષા.',
        prompt: '👉 તબક્કો 4: ટ્રાન્સપોર્ટર પોર્ટલમાં બોલી લગાવો, ₹600 પ્રતિબંધ જુઓ.'
      },
      {
        step: 5,
        title: '5. વજન પહોંચ & એસ્ક્રો રિલીઝ',
        desc: 'ડિજિટલ પહોંચ + UPI Route દ્વારા સીધી રકમ ટ્રાન્સફર.',
        prompt: '👉 તબક્કો 5: મિલ પોર્ટલમાં વજન પહોંચ પ્રમાણિત કરી એસ્ક્રો રકમ રિલીઝ કરો.'
      }
    ],
    portalCards: {
      farmer: {
        title: '1. ખેડૂત પોર્ટલ (Farmer)',
        desc: 'ભાષિણી વૉઇસ ઇનપુટ, બજાર સરખામણી, AI ભાવ અનુમાન, પારદર્શક કપાત અને ઑફલાઇન સગવડ.',
        enterBtn: 'પ્રવેશ કરો'
      },
      mill: {
        title: '2. આડત & મિલ પોર્ટલ (Mill)',
        desc: 'દૈનિક ભાવ પ્રકાશન, ML >20% ચેતવણી, વાહન ટ્રેકિંગ, ડિજિટલ વજન પહોંચ અને એસ્ક્રો રિલીઝ.',
        enterBtn: 'પ્રવેશ કરો'
      },
      transporter: {
        title: '3. ટ્રાન્સપોર્ટર હરાજી (Transporter)',
        desc: '10 મિનિટની લાઇવ હરાજી, -₹20/-₹50 ત્વરિત બોલી, ₹650 લઘુત્તમ ભાવ સુરક્ષા અને AI તકેદારી.',
        enterBtn: 'પ્રવેશ કરો'
      }
    },
    legalBanner: {
      title: 'કાનૂની સુરક્ષા:',
      desc: 'મહારાષ્ટ્ર APMC કાયદો અને RBI માર્ગદર્શિકા સાથે 100% સુસંગત નોન-કસ્ટોડિયલ મોડેલ.',
      readMoreBtn: 'COMPLIANCE.md વાંચો'
    },

    // Voice / Input
    voiceTitle: 'ભાષિણી બહુભાષી વૉઇસ ઇનપુટ (Bhashini AI)',
    voiceSubtitle: 'માઇક દબાવો અથવા વ્હોટ્સએપ શૈલીમાં બોલો',
    voiceSimulateBtn: 'બોલો: "મારી પાસે લામજનામાં 15 ક્વિન્ટલ સોયાબીન છે"',
    listening: 'સાંભળી રહ્યા છીએ... પ્રક્રિયા ચાલુ છે...',
    crop: 'પાક',
    quantity: 'જથ્થો (ક્વિન્ટલ)',
    village: 'ગામ અને તાલુકો',
    calculateArbitrage: 'શ્રેષ્ઠ ચોખ્ખો નફો શોધો',

    // Arbitrage
    arbitrageTitle: 'બજાર ભાવ સરખામણી અને હાથમાં આવતી ચોખ્ખી રકમ',
    arbitrageDesc: 'સ્થાનિક મંડી vs લાતૂર APMC vs ઓઇલ મિલ સીધો તફાવત',
    surplusBanner: 'શેતકરી સેતુ દ્વારા સ્થાનિક વેચાણ કરતાં ₹',
    surplusBannerSuffix: 'વધુ ચોખ્ખો નફો!',
    surplusExplainer: 'સ્થાનિક વચેટિયાઓના બદલે સીધા મિલમાં વેચવાથી ભાડું અને સેસ કાપીને વધુ ચોખ્ખો નફો.',
    benchmarkBadge: '15 ક્વિન્ટલ સોયાબીન બેન્ચમાર્ક',
    optionsAvailable: '3 વિકલ્પો ઉપલબ્ધ (ચોખ્ખા નફા અનુસાર ક્રમ)',
    grossRate: 'ખરીદ દર',
    netTakeHome: 'ચોખ્ખો હાથમાં મળતો દર',
    transportCost: 'પરિવહન ખર્ચ',
    apmcCess: 'APMC સેસ (1.05%)',
    lockPriceBtn: 'ભાવ લૉક કરો અને વાહન બુક કરો',
    viewBreakdown: 'કપાતની સંપૂર્ણ વિગતો',
    aiInsightTitle: 'AI ભાવ અનુમાન અને સલાહ',

    // Transit & Price Lock
    transitTitle: 'લાઇવ વાહન ટ્રેકિંગ અને ભાવ-લૉક કરાર',
    priceLockActive: 'ભાવ લૉક સક્રિય છે (બેંક એસ્ક્રો ગેરંટી)',
    timeLeft: 'બાકી રહેલ સમય',
    truckLocation: 'વાહનનું સ્થાન',
    driver: 'ડ્રાઇવર',
    vehicleNo: 'વાહન નંબર',
    escrowStatus: 'બેંક એસ્ક્રો સ્થિતિ',
    escrowHeld: 'રકમ બેંકમાં સુરક્ષિત (Non-Custodial)',

    // Mill Portal
    millTitle: 'દૈનિક ખરીદ ભાવ પ્રકાશન',
    publishRate: 'આજનો ખરીદ ભાવ જાહેર કરો',
    quota: 'ક્વોટા (ક્વિન્ટલ)',
    grade: 'ગુણવત્તા ગ્રેડ',
    outlierAlert: 'ચેતવણી: આ દર APMC બેન્ચમાર્ક કરતાં 20% થી વધુ વિચલિત છે!',
    incomingDispatches: 'આવતો માલ અને સક્રિય ભાવ-લૉક',
    generateWeighSlip: 'ડિજિટલ વજન પહોંચ બનાવો',
    releaseEscrow: 'એસ્ક્રો રકમ સીધી ટ્રાન્સફર કરો (UPI Route)',

    // Transporter Portal
    auctionTitle: '10 મિનિટની લાઇવ રિવર્સ હરાજી',
    lowestBid: 'હાલની સૌથી નીચી બોલી',
    floorPriceAlert: 'લઘુત્તમ ભાવ સુરક્ષા: ₹650 થી ઓછી બોલી પર કાનૂની પ્રતિબંધ છે.',
    placeBid: 'બોલી લગાવો',
    tripDetails: 'યાત્રા: લામજના -> લાતૂર MIDC (41 કિમી)',
    cargoDetails: 'માલ: 15 ક્વિન્ટલ સોયાબીન',
    anomalyAlert: 'શંકાસ્પદ બોલી / મિલીભગતના સંકેત',

    // Offline
    offlineMode: 'ઑફલાઇન મોડ સક્રિય — વિગતો ઉપકરણમાં સુરક્ષિત છે.',
    synced: 'બધા ઑફલાઇન આવેદનો ઑનલાઇન સર્વર સાથે સિંક થયા છે.',
    lowBandwidth: 'ઓછા ડેટા વાળો મોડ (Lite)'
  }
};
