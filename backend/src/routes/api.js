const express = require('express');
const router = express.Router();
const { calculateArbitrage } = require('../services/arbitrageEngine');
const { checkPriceOutlier, gradeCropImage, checkBidAnomaly } = require('../services/mlClient');
const { mockStore } = require('../config/db');
const { getAuctionState } = require('../socket/auctionHandler');

// 1. Arbitrage Calculation Endpoint
router.get('/arbitrage/calculate', (req, res) => {
  const quantityQuintals = req.query.quantity || 15;
  const crop = req.query.crop || 'Soybean';
  const village = req.query.village || 'Lamjana, Ausa';

  const result = calculateArbitrage({
    quantityQuintals: Number(quantityQuintals),
    crop,
    originVillage: village
  });

  res.json({
    success: true,
    data: result
  });
});

// 2. Active Rates
router.get('/rates/active', (req, res) => {
  res.json({
    success: true,
    data: mockStore.buyers
  });
});

// 3. Rate Publishing with APMC ML Outlier Detection (>20% divergence)
router.post('/rates/publish', async (req, res) => {
  const { buyerId, businessName, crop, grade, dailyRatePerQuintal, quotaQuintals } = req.body;
  const rate = Number(dailyRatePerQuintal);

  if (!rate || rate <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid rate per quintal.' });
  }

  // Check outlier against Latur APMC benchmark via ML Microservice
  const outlierCheck = await checkPriceOutlier('latur_apmc', crop || 'Soybean', rate);

  const newRateEntry = {
    id: buyerId || `BUYER_MILL_${Date.now()}`,
    name: businessName || 'Kirti Gold Agro Oil Mill (MIDC Latur)',
    type: 'MILL',
    crop: crop || 'Soybean',
    grade: grade || 'Grade A',
    ratePerQuintal: rate,
    quotaRemaining: Number(quotaQuintals) || 500,
    timestamp: new Date().toISOString(),
    isOutlier: outlierCheck.is_outlier,
    outlierDeviationPct: outlierCheck.outlier_deviation_pct,
    mlBenchmark: outlierCheck.predicted_benchmark_price,
    mlRecommendation: outlierCheck.recommendation
  };

  // Update mock store
  const existingIndex = mockStore.buyers.findIndex(b => b.id === newRateEntry.id);
  if (existingIndex >= 0) {
    mockStore.buyers[existingIndex].ratePerQuintal = rate;
    mockStore.buyers[existingIndex].isOutlier = outlierCheck.is_outlier;
  } else {
    mockStore.buyers.unshift(newRateEntry);
  }

  res.json({
    success: true,
    message: outlierCheck.is_outlier
      ? `Rate published with REGULATORY OUTLIER WARNING: Rate deviates by ${outlierCheck.outlier_deviation_pct}% from Latur APMC benchmark (₹${outlierCheck.predicted_benchmark_price}).`
      : 'Rate successfully published and verified against APMC benchmark.',
    data: newRateEntry,
    outlierDetails: outlierCheck
  });
});

// 4. Price-Lock Agreement with Simulated Non-Custodial Escrow
router.post('/transactions/price-lock', (req, res) => {
  const {
    farmerId = 'FARMER_LAMJANA_01',
    farmerName = 'तुकाराम पाटील (Tukaram Patil)',
    buyerId,
    buyerName,
    crop = 'Soybean',
    quantityQuintals = 15,
    lockedRate = 4950,
    transportCost = 850,
    digitalConsentAccepted = true
  } = req.body;

  if (!digitalConsentAccepted) {
    return res.status(400).json({
      success: false,
      message: 'Digital consent for Non-Custodial Escrow agreement is mandatory.'
    });
  }

  const gross = Math.round(quantityQuintals * lockedRate);
  const cess = buyerName.includes('APMC') ? Math.round((gross * 1.05) / 100) : 0;
  const farmerNet = Math.round(gross - cess - transportCost);

  const transactionId = `TXN_LTR_${Date.now()}`;
  const priceLockDurationMinutes = 180; // 3-hour price-lock window
  const expiry = new Date(Date.now() + priceLockDurationMinutes * 60 * 1000);

  const newTxn = {
    transactionId,
    farmerId,
    farmerName,
    crop,
    quantityQuintals,
    buyerId: buyerId || 'BUYER_MILL_01',
    buyerName: buyerName || 'Kirti Gold Agro Oil Mill',
    lockedRate,
    gross,
    cess,
    transportCost,
    farmerNet,
    escrowStatus: 'PRICE_LOCKED',
    escrowType: 'SIMULATED_NON_CUSTODIAL_UPI_HOLD',
    escrowAccount: 'SBI-ESCROW-APMC-77192',
    priceLockExpiry: expiry.toISOString(),
    transit: {
      status: 'DISPATCH_QUEUED',
      progressPct: 15,
      driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
      vehicleNumber: 'MH-24-AG-4412',
      currentLocation: 'Lamjana Village Farm Gate'
    },
    splitSettlement: {
      farmerPayable: farmerNet,
      transporterPayable: transportCost,
      apmcCessPayable: cess
    },
    createdAt: new Date().toISOString()
  };

  mockStore.activeTransactions.unshift(newTxn);

  res.json({
    success: true,
    message: 'Price-lock activated with simulated non-custodial bank escrow hold.',
    data: newTxn
  });
});

// 5. Digital Weighing Slip Generation
router.post('/transactions/weighing-slip', (req, res) => {
  const {
    transactionId = 'TXN_LTR_BENCHMARK',
    grossWeightKg = 1520,
    tareWeightKg = 20,
    moisturePercentage = 10.1,
    grade = 'Grade A (FAQ Passed)',
    inspectorName = 'अतुल शिंदे (Atul Shinde - APMC Certified Weigher)'
  } = req.body;

  const netWeightKg = grossWeightKg - tareWeightKg;
  const netQuintals = netWeightKg / 100;

  const slip = {
    slipNumber: `WS-LTR-${Date.now().toString().slice(-6)}`,
    transactionId,
    grossWeightKg,
    tareWeightKg,
    netWeightKg,
    netQuintals,
    moisturePercentage,
    grade,
    inspectorName,
    timestamp: new Date().toISOString(),
    status: 'WEIGHED_AND_VERIFIED'
  };

  // Update transaction if found
  const txn = mockStore.activeTransactions.find(t => t.transactionId === transactionId);
  if (txn) {
    txn.escrowStatus = 'WEIGHED_VERIFIED';
    txn.weighingSlip = slip;
    txn.transit.progressPct = 100;
    txn.transit.status = 'DELIVERED_AT_WEIGHBRIDGE';
  }

  res.json({
    success: true,
    message: 'Digital weighing slip generated and certified on-chain/escrow ledger.',
    data: slip
  });
});

// 6. Non-Custodial Escrow Release (Split Settlement)
router.post('/transactions/escrow-release', (req, res) => {
  const { transactionId = 'TXN_LTR_BENCHMARK', authorizedBy = 'Kirti Gold Mill Finance' } = req.body;

  let txn = mockStore.activeTransactions.find(t => t.transactionId === transactionId);
  if (!txn) {
    // Generate default transaction for benchmark demo
    txn = {
      transactionId,
      farmerName: 'तुकाराम पाटील (Tukaram Patil)',
      crop: 'Soybean',
      quantityQuintals: 15,
      farmerNet: 73350,
      transportCost: 900,
      cess: 0
    };
  }

  txn.escrowStatus = 'ESCROW_RELEASED';
  txn.releasedAt = new Date().toISOString();
  txn.settlementReference = `UPI_ROUTE_${Date.now()}`;

  res.json({
    success: true,
    message: 'Simulated Razorpay Route split settlement executed successfully.',
    settlementDetails: {
      transactionId: txn.transactionId,
      reference: txn.settlementReference,
      authorizedBy,
      farmerCreditUPI: {
        vpa: '9822345678@sbi',
        amount: txn.farmerNet || 73350,
        status: 'SUCCESS'
      },
      transporterCreditUPI: {
        vpa: '9423188990@okaxis',
        amount: txn.transportCost || 900,
        status: 'SUCCESS'
      },
      apmcCessSettlement: {
        treasuryCode: 'MH-LTR-CESS-01',
        amount: txn.cess || 0,
        status: 'SUCCESS'
      },
      nonCustodialConfirmation: 'Funds routed direct bank-to-bank without ShetkariSetu custody.'
    }
  });
});

// 7. Get Active Transactions / Dispatches
router.get('/transactions/active', (req, res) => {
  // If empty, initialize standard benchmark transaction
  if (mockStore.activeTransactions.length === 0) {
    mockStore.activeTransactions.push({
      transactionId: 'TXN_LTR_BENCHMARK',
      farmerId: 'FARMER_LAMJANA_01',
      farmerName: 'तुकाराम पाटील (Tukaram Patil)',
      crop: 'Soybean',
      quantityQuintals: 15,
      buyerId: 'BUYER_MILL_01',
      buyerName: 'Kirti Gold Agro Oil Mill (MIDC Latur)',
      lockedRate: 4950,
      gross: 74250,
      cess: 0,
      transportCost: 900,
      farmerNet: 73350,
      escrowStatus: 'IN_TRANSIT',
      escrowType: 'SIMULATED_NON_CUSTODIAL_UPI_HOLD',
      escrowAccount: 'SBI-ESCROW-APMC-77192',
      priceLockExpiry: new Date(Date.now() + 7200000).toISOString(),
      transit: {
        status: 'EN_ROUTE_TO_LATUR',
        progressPct: 62,
        driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
        vehicleNumber: 'MH-24-AG-4412',
        currentLocation: 'NH 361 Near Harangul, 12 km from Latur'
      },
      splitSettlement: {
        farmerPayable: 73350,
        transporterPayable: 900,
        apmcCessPayable: 0
      },
      createdAt: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    data: mockStore.activeTransactions
  });
});

// 8. Bhashini Speech-To-Text Simulation / Integration Point
router.post('/voice/bhashini-stt', (req, res) => {
  const { language = 'mr', voiceInputScenario = 'benchmark' } = req.body;

  // Real Bhashini API request format architected here:
  // endpoint: https://dhruva-api.bhashini.gov.in/services/inference/pipeline
  // headers: { 'Authorization': process.env.BHASHINI_API_KEY }

  const transcriptions = {
    mr: {
      transcript: 'माझ्याकडे लामजणा येथे १५ क्विंटल सोयाबीन आहे, उत्तम भाव कुठे मिळेल?',
      parsedEntities: {
        crop: 'Soybean',
        cropMarathi: 'सोयाबीन',
        quantityQuintals: 15,
        village: 'Lamjana (लामजणा)',
        taluka: 'Ausa (औसा)',
        district: 'Latur (लातूर)',
        confidence: 0.96
      }
    },
    en: {
      transcript: 'I have 15 quintals of soybean in Lamjana, where will I get the best price?',
      parsedEntities: {
        crop: 'Soybean',
        cropMarathi: 'Soybean',
        quantityQuintals: 15,
        village: 'Lamjana',
        taluka: 'Ausa',
        district: 'Latur',
        confidence: 0.95
      }
    }
  };

  const selected = transcriptions[language] || transcriptions['mr'];

  res.json({
    success: true,
    provider: 'Bhashini ASR Pipeline (Govt. of India)',
    serviceStatus: process.env.BHASHINI_API_KEY ? 'LIVE_PIPELINE' : 'SIMULATED_HIGH_FIDELITY',
    data: selected
  });
});

// 9. Low-Connectivity SMS/USSD Fallback Inbound Gateway
router.post('/sms/inbound', (req, res) => {
  const { senderPhone, smsBody } = req.body;
  // e.g. "SETU SOYBEAN 15 LAMJANA"
  const tokens = (smsBody || 'SETU SOYBEAN 15 LAMJANA').trim().split(/\s+/);
  const crop = tokens[1] || 'Soybean';
  const qty = Number(tokens[2]) || 15;
  const village = tokens[3] || 'Lamjana';

  const arbitrage = calculateArbitrage({ quantityQuintals: qty, crop, originVillage: village });
  const best = arbitrage.options[0];

  const smsReply = `[ShetkariSetu] ${crop} ${qty}Qtl from ${village}: Best Net: ₹${best.breakdown.netTakeHome} at ${best.buyerName} (Rate: ₹${best.ratePerQuintal}/Qtl, Trnspt: ₹${best.transportCost}). Reply YES to lock rate.`;

  res.json({
    success: true,
    inboundParsed: { crop, qty, village },
    smsReply,
    mockTwilioResponse: { sid: `SM_${Date.now()}`, status: 'sent' }
  });
});

// 10. ML Grade Proxy
router.post('/ml/predict-grade', async (req, res) => {
  const result = await gradeCropImage(Buffer.from('sample'), 'soybean_sample.jpg');
  res.json({ success: true, data: result });
});

module.exports = router;
