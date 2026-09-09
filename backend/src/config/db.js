const mongoose = require('mongoose');

let isConnected = false;

// Mock Store for Zero-Setup Offline / Local Hackathon Demo Execution
const mockStore = {
  farmer: {
    id: 'FARMER_LAMJANA_01',
    name: 'तुकाराम पाटील (Tukaram Patil)',
    phone: '+91 98223 45678',
    village: 'Lamjana (लामजणा)',
    taluka: 'Ausa (औसा)',
    district: 'Latur (लातूर)',
    coordinates: [76.6215, 18.2571],
    preferredLanguage: 'mr',
    crop: 'Soybean',
    quantityQuintals: 15
  },
  buyers: [
    {
      id: 'BUYER_MILL_01',
      name: 'Kirti Gold Agro Oil Mill (कीर्ती गोल्ड ऑईल मिल)',
      type: 'MILL',
      license: 'MH-LTR-DML-2024-88',
      locationName: 'MIDC Latur',
      distanceKm: 41,
      ratePerQuintal: 4950,
      cessRatePct: 0.0, // Direct purchasing license — zero APMC cess
      transportCost: 900,
      quotaRemaining: 350,
      trustScore: 4.9,
      aiTrend: { trendPct: 3.2, recommendation: 'Hold / Premium Buyer', isOutlier: false }
    },
    {
      id: 'BUYER_APMC_01',
      name: 'Latur APMC Market Yard (लातूर कृषी उत्पन्न बाजार समिती)',
      type: 'APMC_ADAT',
      license: 'APMC-LTR-YD-012',
      locationName: 'Latur Market Yard',
      distanceKm: 38,
      ratePerQuintal: 4820,
      cessRatePct: 1.05, // 1.05% Statutory APMC user cess
      transportCost: 850,
      quotaRemaining: 1200,
      trustScore: 4.8,
      aiTrend: { trendPct: 2.8, recommendation: 'High Volume Benchmark', isOutlier: false }
    },
    {
      id: 'BUYER_LOCAL_01',
      name: 'Ausa / Lamjana Local Mandi (स्थानिक उपबाजार - औसा)',
      type: 'LOCAL_MANDI',
      license: 'APMC-SUB-AUS-04',
      locationName: 'Ausa Sub-Market',
      distanceKm: 12,
      ratePerQuintal: 4400,
      cessRatePct: 1.05,
      transportCost: 350,
      quotaRemaining: 150,
      trustScore: 4.2,
      aiTrend: { trendPct: -0.5, recommendation: 'Distress / Low Realization', isOutlier: false }
    }
  ],
  transporters: [
    {
      id: 'TRANS_01',
      driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
      vehicleNumber: 'MH-24-AG-4412',
      vehicleType: 'Mahindra Bolero Maxi Truck',
      capacityQuintals: 25,
      phone: '+91 94231 88990',
      currentLocation: 'Ausa Fata, 6 km from Lamjana',
      trustScore: 4.8,
      completedTrips: 112
    },
    {
      id: 'TRANS_02',
      driverName: 'ज्ञानेश्वर कांबळे (Dnyaneshwar Kamble)',
      vehicleNumber: 'MH-24-V-9081',
      vehicleType: 'Tata 407 LCV',
      capacityQuintals: 35,
      phone: '+91 98601 22345',
      currentLocation: 'Lamjana Crossing, 2 km from farm',
      trustScore: 4.9,
      completedTrips: 148
    },
    {
      id: 'TRANS_03',
      driverName: 'महेश जाधव (Mahesh Jadhav)',
      vehicleNumber: 'MH-24-F-3320',
      vehicleType: 'Ashok Leyland Dost',
      capacityQuintals: 20,
      phone: '+91 97654 11223',
      currentLocation: 'Hasegaon, 11 km from Lamjana',
      trustScore: 4.6,
      completedTrips: 76
    }
  ],
  activeTransactions: []
};

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log('[ShetkariSetu DB] No MONGODB_URI provided in env. Running in High-Performance In-Memory Zero-Setup Mode.');
    return { isConnected: false, mode: 'IN_MEMORY' };
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log('[ShetkariSetu DB] Successfully connected to MongoDB Atlas with 2dsphere indexes.');
    return { isConnected: true, mode: 'MONGODB_ATLAS' };
  } catch (err) {
    console.warn('[ShetkariSetu DB] MongoDB connection error:', err.message);
    console.log('[ShetkariSetu DB] Falling back automatically to In-Memory resilient store.');
    return { isConnected: false, mode: 'IN_MEMORY_FALLBACK' };
  }
}

module.exports = {
  connectDB,
  mockStore,
  isDBConnected: () => isConnected
};
