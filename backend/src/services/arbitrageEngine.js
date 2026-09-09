/**
 * ShetkariSetu Arbitrage Engine
 * Calculates net take-home price for farmer comparing:
 * 1. Local Sub-Mandi (Ausa / Lamjana)
 * 2. Latur APMC Main Yard
 * 3. Direct Oil Mill (Kirti Gold / ADM)
 *
 * Formula:
 * Gross Revenue = RatePerQuintal * QuantityQuintals
 * APMC Statutory Cess = (RatePerQuintal * QuantityQuintals) * CessRatePct / 100
 * Net Take-Home = Gross Revenue - APMC Cess - Transport Cost
 */

function calculateArbitrage(params) {
  const quantity = Number(params.quantityQuintals) || 15; // Benchmark: 15 quintals
  const crop = params.crop || 'Soybean';
  const originVillage = params.originVillage || 'Lamjana, Ausa';

  // Benchmark options
  const options = [
    {
      id: 'BUYER_MILL_01',
      buyerName: 'Kirti Gold Agro Oil Mill (MIDC Latur)',
      buyerType: 'MILL',
      licenseNumber: 'MH-LTR-DML-2024-88',
      distanceKm: 41,
      ratePerQuintal: 4950,
      cessRatePct: 0.0, // Direct buyer has no APMC cess deduction
      unloadingCharges: 150, // Flat unloading charge
      transportCost: 900,
      transportDistanceLabel: '41 km via NH 361',
      quotaRemainingQuintals: 350,
      trustScore: 4.9,
      aiTrend: {
        trendPct: 3.2,
        recommendation: 'Holding Recommended (+3.2% in 48h)',
        badgeColor: 'emerald',
        insight: 'Oil mills running high crush capacity; demand expected to surge this week.'
      }
    },
    {
      id: 'BUYER_APMC_01',
      buyerName: 'Latur APMC Market Yard (लातूर मुख्य यार्ड)',
      buyerType: 'APMC_ADAT',
      licenseNumber: 'APMC-LTR-YD-012',
      distanceKm: 38,
      ratePerQuintal: 4820,
      cessRatePct: 1.05, // 1.05% APMC market cess
      unloadingCharges: 180,
      transportCost: 850,
      transportDistanceLabel: '38 km via Ausa-Latur Rd',
      quotaRemainingQuintals: 1200,
      trustScore: 4.8,
      aiTrend: {
        trendPct: 2.8,
        recommendation: 'Bullish (+2.8% likely)',
        badgeColor: 'blue',
        insight: 'Latur APMC arrival volumes moderate; strong competitive bidding among Adatyas.'
      }
    },
    {
      id: 'BUYER_LOCAL_01',
      buyerName: 'Ausa / Lamjana Local Mandi (स्थानिक उपबाजार)',
      buyerType: 'LOCAL_MANDI',
      licenseNumber: 'APMC-SUB-AUS-04',
      distanceKm: 12,
      ratePerQuintal: 4400,
      cessRatePct: 1.05,
      unloadingCharges: 120,
      transportCost: 350,
      transportDistanceLabel: '12 km via SH 165',
      quotaRemainingQuintals: 150,
      trustScore: 4.2,
      aiTrend: {
        trendPct: -0.4,
        recommendation: 'Distress / Under-benchmarked',
        badgeColor: 'amber',
        insight: 'Local middlemen extracting high margin; realization is ₹420/qtl lower than benchmark.'
      }
    }
  ];

  const evaluatedOptions = options.map(option => {
    const grossRevenue = Math.round(option.ratePerQuintal * quantity);
    const apmcCess = Math.round((grossRevenue * option.cessRatePct) / 100);
    const netTakeHome = Math.round(grossRevenue - apmcCess - option.transportCost - option.unloadingCharges);
    const netPerQuintal = Math.round(netTakeHome / quantity);

    return {
      ...option,
      quantityQuintals: quantity,
      crop,
      originVillage,
      breakdown: {
        grossRevenue,
        apmcCess,
        transportCost: option.transportCost,
        unloadingCharges: option.unloadingCharges,
        totalDeductions: apmcCess + option.transportCost + option.unloadingCharges,
        netTakeHome,
        netPerQuintal
      }
    };
  });

  // Sort by highest net take home
  evaluatedOptions.sort((a, b) => b.breakdown.netTakeHome - a.breakdown.netTakeHome);

  const bestOption = evaluatedOptions[0];
  const lowestOption = evaluatedOptions[evaluatedOptions.length - 1];
  const arbitrageSurplus = bestOption.breakdown.netTakeHome - lowestOption.breakdown.netTakeHome;

  return {
    scenario: {
      origin: originVillage,
      crop,
      quantityQuintals: quantity,
      timestamp: new Date().toISOString()
    },
    arbitrageSurplus,
    surplusMessage: `ShetkariSetu unlocks an extra ₹${arbitrageSurplus.toLocaleString('en-IN')} net income compared to local distress sale.`,
    options: evaluatedOptions
  };
}

module.exports = {
  calculateArbitrage
};
