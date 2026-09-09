const mongoose = require('mongoose');

// GeoJSON Point Sub-schema
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true
  }
}, { _id: false });

// 1. Farmer Schema
const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  village: { type: String, default: 'Lamjana' },
  taluka: { type: String, default: 'Ausa' },
  district: { type: String, default: 'Latur' },
  location: {
    type: pointSchema,
    default: { type: 'Point', coordinates: [76.6215, 18.2571] } // Lamjana GPS
  },
  preferredLanguage: { type: String, enum: ['mr', 'en'], default: 'mr' },
  trustScore: { type: Number, default: 4.8 },
  createdAt: { type: Date, default: Date.now }
});
farmerSchema.index({ location: '2dsphere' });

// 2. Mandi / APMC Schema
const mandiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['APMC_MARKET_YARD', 'LOCAL_SUB_MARKET', 'PRIVATE_MARKET'], default: 'APMC_MARKET_YARD' },
  code: { type: String, required: true, unique: true },
  district: { type: String, default: 'Latur' },
  location: {
    type: pointSchema,
    required: true
  },
  cessRatePercentage: { type: Number, default: 1.05 }, // 1.05% APMC statutory cess
  activeBenchmarkRate: { type: Number, default: 4820 }, // ₹/quintal for Soybean
  arrivalVolumeTonnes: { type: Number, default: 1200 },
  createdAt: { type: Date, default: Date.now }
});
mandiSchema.index({ location: '2dsphere' });

// 3. Mill Owner / Adat Schema
const millOwnerSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  category: { type: String, enum: ['OIL_MILL', 'ADATYA_COMMISSION_AGENT', 'PROCESSING_PLANT'], default: 'OIL_MILL' },
  phone: { type: String, required: true },
  location: {
    type: pointSchema,
    required: true
  },
  dailyRatePerQuintal: { type: Number, default: 4950 },
  quotaQuintals: { type: Number, default: 500 },
  remainingQuotaQuintals: { type: Number, default: 350 },
  acceptedGrades: [{ type: String, default: 'Grade A' }],
  isOutlierFlagged: { type: Boolean, default: false },
  outlierDivergencePct: { type: Number, default: 0 },
  trustScore: { type: Number, default: 4.9 },
  complianceVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
millOwnerSchema.index({ location: '2dsphere' });

// 4. Transporter Schema
const transporterSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, default: 'Bolero Maxi Truck / Tata Ace' },
  capacityQuintals: { type: Number, default: 25 },
  phone: { type: String, required: true },
  currentLocation: {
    type: pointSchema,
    default: { type: 'Point', coordinates: [76.5800, 18.3000] }
  },
  trustScore: { type: Number, default: 4.7 },
  completedTrips: { type: Number, default: 84 },
  isAvailable: { type: Boolean, default: true }
});
transporterSchema.index({ currentLocation: '2dsphere' });

// 5. Bid Schema (Reverse Auction per trip)
const bidSchema = new mongoose.Schema({
  tripId: { type: String, required: true, index: true },
  transporterId: { type: String, required: true },
  transporterName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  amount: { type: Number, required: true }, // in ₹
  timestamp: { type: Date, default: Date.now },
  isAnomalous: { type: Boolean, default: false },
  anomalyReason: { type: String, default: '' },
  status: { type: String, enum: ['ACTIVE', 'ACCEPTED', 'REJECTED', 'OUTBID'], default: 'ACTIVE' }
});

// 6. Transaction / Dispatch / Price-Lock Schema
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  farmerId: { type: String, default: 'FARMER_LAMJANA_01' },
  farmerName: { type: String, default: 'Tukaram Patil' },
  crop: { type: String, default: 'Soybean' },
  quantityQuintals: { type: Number, default: 15 },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerType: { type: String, enum: ['MILL', 'APMC_ADAT', 'LOCAL_MANDI'], required: true },
  agreedPricePerQuintal: { type: Number, required: true },
  grossValue: { type: Number, required: true },
  mandiCessDeduction: { type: Number, default: 0 },
  transportFee: { type: Number, default: 850 },
  netPayableToFarmer: { type: Number, required: true },
  
  // Simulated Non-Custodial Escrow Attributes
  escrowStatus: {
    type: String,
    enum: ['PRICE_LOCKED', 'IN_TRANSIT', 'WEIGHED_VERIFIED', 'ESCROW_RELEASED', 'CANCELLED'],
    default: 'PRICE_LOCKED'
  },
  escrowReference: { type: String, default: '' },
  escrowSplitSettlement: {
    farmerAmount: { type: Number, default: 0 },
    transporterAmount: { type: Number, default: 0 },
    mandiCessAmount: { type: Number, default: 0 }
  },
  priceLockExpiry: { type: Date },
  
  // Transit Tracking
  assignedTransporter: {
    transporterId: String,
    driverName: String,
    phone: String,
    vehicleNumber: String,
    progressPercentage: { type: Number, default: 0 },
    currentCoordinates: [Number] // [lng, lat]
  },
  
  // Digital Weighing Slip
  weighingSlip: {
    slipNumber: String,
    grossWeightKg: Number,
    tareWeightKg: Number,
    netWeightKg: Number,
    moisturePercentage: Number,
    gradeDetermined: String,
    verifiedBy: String,
    timestamp: Date
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Farmer: mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema),
  Mandi: mongoose.models.Mandi || mongoose.model('Mandi', mandiSchema),
  MillOwner: mongoose.models.MillOwner || mongoose.model('MillOwner', millOwnerSchema),
  Transporter: mongoose.models.Transporter || mongoose.model('Transporter', transporterSchema),
  Bid: mongoose.models.Bid || mongoose.model('Bid', bidSchema),
  Transaction: mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
};
