/**
 * ShetkariSetu Real-Time Reverse Auction Engine (Socket.io)
 * Enforces:
 * 1. Room per trip ('trip:TRIP_LAMJANA_LATUR_01')
 * 2. 10-minute countdown synchronized on server
 * 3. HARD SERVER-SIDE FLOOR PRICE VALIDATION: Reject any bid < ₹650
 * 4. ML Anomaly / Collusion Detection trigger on suspicious sequences
 */

const { checkBidAnomaly } = require('../services/mlClient');

// Active auctions state map
const activeAuctions = {
  'TRIP_LAMJANA_LATUR_01': {
    tripId: 'TRIP_LAMJANA_LATUR_01',
    route: 'Lamjana Village (Ausa) -> Kirti Gold Oil Mill / Latur APMC',
    distanceKm: 41,
    cargo: '15 Quintals Soybean (Grade A)',
    openingCeilingPrice: 1200,
    currentLowestBid: 850,
    currentWinner: {
      transporterId: 'TRANS_01',
      driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
      vehicleNumber: 'MH-24-AG-4412',
      vehicleType: 'Mahindra Bolero Maxi Truck',
      rating: 4.8
    },
    floorPrice: 650, // Statutory floor price — strictly enforced
    secondsRemaining: 600, // 10 minutes
    status: 'ACTIVE',
    bidHistory: [
      {
        id: 'bid_1',
        transporterId: 'TRANS_03',
        driverName: 'महेश जाधव (Mahesh Jadhav)',
        vehicleNumber: 'MH-24-F-3320',
        amount: 1100,
        timestamp: new Date(Date.now() - 180000).toISOString()
      },
      {
        id: 'bid_2',
        transporterId: 'TRANS_02',
        driverName: 'ज्ञानेश्वर कांबळे (Dnyaneshwar Kamble)',
        vehicleNumber: 'MH-24-V-9081',
        amount: 950,
        timestamp: new Date(Date.now() - 120000).toISOString()
      },
      {
        id: 'bid_3',
        transporterId: 'TRANS_01',
        driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
        vehicleNumber: 'MH-24-AG-4412',
        amount: 850,
        timestamp: new Date(Date.now() - 45000).toISOString()
      }
    ],
    anomalyInfo: {
      score: 0.08,
      isCollusion: false,
      riskLevel: 'LOW',
      reasons: ['Healthy competitive decrements observed']
    }
  }
};

function setupAuctionSocket(io) {
  // Synchronized ticker
  setInterval(() => {
    for (const tripId in activeAuctions) {
      const auction = activeAuctions[tripId];
      if (auction.status === 'ACTIVE' && auction.secondsRemaining > 0) {
        auction.secondsRemaining -= 1;
        io.to(`trip:${tripId}`).emit('auction:tick', {
          tripId,
          secondsRemaining: auction.secondsRemaining
        });
        if (auction.secondsRemaining === 0) {
          auction.status = 'COMPLETED';
          io.to(`trip:${tripId}`).emit('auction:completed', auction);
        }
      }
    }
  }, 1000);

  io.on('connection', (socket) => {
    // 1. Join Trip Room
    socket.on('join:trip', (tripId) => {
      socket.join(`trip:${tripId}`);
      const auction = activeAuctions[tripId] || activeAuctions['TRIP_LAMJANA_LATUR_01'];
      socket.emit('auction:state', auction);
    });

    // 2. Submit Bid with HARD SERVER-SIDE FLOOR PRICE VALIDATION
    socket.on('bid:submit', async (data) => {
      const { tripId, transporterId, driverName, vehicleNumber, amount } = data;
      const auction = activeAuctions[tripId];

      if (!auction) {
        return socket.emit('bid:error', { message: 'Auction trip not found.' });
      }

      if (auction.status !== 'ACTIVE') {
        return socket.emit('bid:error', { message: 'Auction is already closed.' });
      }

      const numAmount = Number(amount);

      // HARD SERVER-SIDE VALIDATION: FLOOR PRICE PROTECTION
      if (isNaN(numAmount) || numAmount < auction.floorPrice) {
        console.warn(`[Security Alert] Rejected bid of ₹${numAmount} below statutory floor price ₹${auction.floorPrice}`);
        return socket.emit('bid:error', {
          code: 'FLOOR_PRICE_BREACH',
          message: `Floor Price Protection: Bids below ₹${auction.floorPrice} are strictly prohibited by fair transport regulations.`,
          floorPrice: auction.floorPrice
        });
      }

      // Check if bid is lower than current lowest
      if (numAmount >= auction.currentLowestBid) {
        return socket.emit('bid:error', {
          code: 'BID_TOO_HIGH',
          message: `Your bid must be lower than the current lowest bid of ₹${auction.currentLowestBid}.`
        });
      }

      // Record bid
      const newBid = {
        id: `bid_${Date.now()}`,
        transporterId: transporterId || 'TRANS_01',
        driverName: driverName || 'सचिन गायकवाड (Sachin Gaikwad)',
        vehicleNumber: vehicleNumber || 'MH-24-AG-4412',
        amount: numAmount,
        timestamp: new Date().toISOString()
      };

      auction.bidHistory.push(newBid);
      auction.currentLowestBid = numAmount;
      auction.currentWinner = {
        transporterId: newBid.transporterId,
        driverName: newBid.driverName,
        vehicleNumber: newBid.vehicleNumber,
        rating: 4.8
      };

      // Call ML Anomaly / Collusion Detection
      try {
        const anomalyResult = await checkBidAnomaly(tripId, auction.bidHistory.map(b => ({
          bidder_id: b.transporterId,
          amount: b.amount,
          timestamp: b.timestamp
        })));
        auction.anomalyInfo = {
          score: anomalyResult.anomaly_score,
          isCollusion: anomalyResult.is_collusion_suspected,
          riskLevel: anomalyResult.risk_level,
          reasons: anomalyResult.flagged_reasons
        };
      } catch (e) {
        // Continue if anomaly check errors
      }

      // Broadcast new state to all in room
      io.to(`trip:${tripId}`).emit('auction:bid_update', {
        auction,
        newBid,
        anomalyInfo: auction.anomalyInfo
      });
    });

    // 3. Reset Auction for Live Demo Walkthrough
    socket.on('auction:reset_demo', (tripId) => {
      const targetId = tripId || 'TRIP_LAMJANA_LATUR_01';
      activeAuctions[targetId].secondsRemaining = 600;
      activeAuctions[targetId].currentLowestBid = 850;
      activeAuctions[targetId].status = 'ACTIVE';
      activeAuctions[targetId].bidHistory = [
        {
          id: 'bid_1',
          transporterId: 'TRANS_03',
          driverName: 'महेश जाधव (Mahesh Jadhav)',
          vehicleNumber: 'MH-24-F-3320',
          amount: 1100,
          timestamp: new Date(Date.now() - 180000).toISOString()
        },
        {
          id: 'bid_2',
          transporterId: 'TRANS_02',
          driverName: 'ज्ञानेश्वर कांबळे (Dnyaneshwar Kamble)',
          vehicleNumber: 'MH-24-V-9081',
          amount: 950,
          timestamp: new Date(Date.now() - 120000).toISOString()
        },
        {
          id: 'bid_3',
          transporterId: 'TRANS_01',
          driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
          vehicleNumber: 'MH-24-AG-4412',
          amount: 850,
          timestamp: new Date(Date.now() - 45000).toISOString()
        }
      ];
      activeAuctions[targetId].anomalyInfo = {
        score: 0.08,
        isCollusion: false,
        riskLevel: 'LOW',
        reasons: ['Healthy competitive decrements observed']
      };
      io.to(`trip:${targetId}`).emit('auction:state', activeAuctions[targetId]);
    });
  });
}

function getAuctionState(tripId) {
  return activeAuctions[tripId] || activeAuctions['TRIP_LAMJANA_LATUR_01'];
}

module.exports = {
  setupAuctionSocket,
  getAuctionState,
  activeAuctions
};
