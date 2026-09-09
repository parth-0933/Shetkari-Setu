const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const { connectDB } = require('./config/db');
const { setupAuctionSocket } = require('./socket/auctionHandler');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);

// Enable CORS for Next.js frontend (default ports 3000, 3001, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Mount routes
app.use('/api', apiRoutes);

// Root & Health Check
app.get('/', (req, res) => {
  res.json({
    service: 'ShetkariSetu Real-Time Linkage Backend',
    version: '1.0.0 (SIH 2026)',
    status: 'online',
    activeScenario: 'Lamjana (Ausa, Latur) -> Latur APMC / Kirti Gold Oil Mill (15 Quintals Soybean)'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Initialize Socket.io Reverse Auction Engine
setupAuctionSocket(io);

// Start Server & Connect Database
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`🚀 ShetkariSetu Backend Engine listening on port ${PORT}`);
    console.log(`📡 Socket.io Reverse Auction Rooms Active`);
    console.log(`📍 Ground Benchmark: Lamjana -> Latur (15 Qtl Soybean)`);
    console.log(`⚖️ Statutory Floor Price: ₹650 strictly enforced`);
    console.log(`========================================================`);
  });
}

startServer();

module.exports = { app, server };
