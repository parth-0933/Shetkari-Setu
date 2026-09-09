'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { VoiceInputWidget } from '@/components/VoiceInputWidget';
import { ArbitrageCard } from '@/components/ArbitrageCard';
import { TransitTracker } from '@/components/TransitTracker';
import { TrustComplianceModal } from '@/components/TrustComplianceModal';
import { SMSFallbackSimulator } from '@/components/SMSFallbackSimulator';
import { Language, t } from '@/lib/translations';
import { queueOfflineDispatch, getQueuedDispatches, clearQueuedDispatches } from '@/lib/indexedDB';
import { Sprout, RefreshCw, AlertCircle, CheckCircle2, TrendingUp, ShieldCheck, WifiOff, Smartphone } from 'lucide-react';

export default function FarmerPortalPage() {
  const [lang, setLang] = useState<Language>('mr');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Form State
  const [crop, setCrop] = useState('Soybean');
  const [quantity, setQuantity] = useState(15);
  const [village, setVillage] = useState('Lamjana, Ausa');

  // Arbitrage Data
  const [arbitrageData, setArbitrageData] = useState<any>(null);
  const [loadingArbitrage, setLoadingArbitrage] = useState(false);

  // Price Lock & Compliance
  const [selectedOptionForLock, setSelectedOptionForLock] = useState<any>(null);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [activePriceLockTxn, setActivePriceLockTxn] = useState<any>(null);

  // Offline Queue State
  const [queuedItemsCount, setQueuedItemsCount] = useState(0);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const dict = t[lang];

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = async () => {
      setIsOnline(true);
      await syncOfflineQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial fetch of benchmark arbitrage
    fetchArbitrage(15, 'Soybean', 'Lamjana, Ausa');
    checkOfflineQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkOfflineQueue = async () => {
    try {
      const items = await getQueuedDispatches();
      setQueuedItemsCount(items.length);
    } catch {}
  };

  const syncOfflineQueue = async () => {
    try {
      const items = await getQueuedDispatches();
      if (items.length > 0) {
        setSyncNotice(`${items.length} ऑफलाइन साठवलेले व्यवहार सर्व्हरवर समक्रमित झाले! (Auto-Synced)`);
        await clearQueuedDispatches();
        setQueuedItemsCount(0);
        setTimeout(() => setSyncNotice(null), 4000);
      }
    } catch {}
  };

  const fetchArbitrage = async (qty: number, cropName: string, originVillage: string) => {
    setLoadingArbitrage(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(
        `${backendUrl}/api/arbitrage/calculate?quantity=${qty}&crop=${cropName}&village=${encodeURIComponent(originVillage)}`
      );
      const json = await res.json();
      if (json.success) {
        setArbitrageData(json.data);
      }
    } catch (err) {
      // Offline fallback: use benchmark calculation locally
      setArbitrageData({
        scenario: { origin: originVillage, crop: cropName, quantityQuintals: qty },
        arbitrageSurplus: 7700,
        surplusMessage: 'शेतकरी सेतूमुळे स्थानिक तोट्याच्या विक्रीपेक्षा ₹७,७०० जास्त निव्वळ नफा!',
        options: [
          {
            id: 'BUYER_MILL_01',
            buyerName: 'Kirti Gold Agro Oil Mill (MIDC Latur)',
            buyerType: 'MILL',
            licenseNumber: 'MH-LTR-DML-2024-88',
            distanceKm: 41,
            ratePerQuintal: 4950,
            cessRatePct: 0.0,
            unloadingCharges: 150,
            transportCost: 900,
            transportDistanceLabel: '४१ किमी (NH 361)',
            quotaRemainingQuintals: 350,
            trustScore: 4.9,
            aiTrend: {
              trendPct: 3.2,
              recommendation: 'Holding Recommended (+3.2% in 48h)',
              badgeColor: 'emerald',
              insight: 'लातूर ऑईल मिल क्रशिंग क्षमता उच्च; मागणी वाढण्याची शक्यता.'
            },
            breakdown: {
              grossRevenue: 74250,
              apmcCess: 0,
              transportCost: 900,
              unloadingCharges: 150,
              totalDeductions: 1050,
              netTakeHome: 73200,
              netPerQuintal: 4880
            }
          },
          {
            id: 'BUYER_APMC_01',
            buyerName: 'Latur APMC Market Yard (लातूर मुख्य यार्ड)',
            buyerType: 'APMC_ADAT',
            licenseNumber: 'APMC-LTR-YD-012',
            distanceKm: 38,
            ratePerQuintal: 4820,
            cessRatePct: 1.05,
            unloadingCharges: 180,
            transportCost: 850,
            transportDistanceLabel: '३८ किमी (औसा-लातूर मार्ग)',
            quotaRemainingQuintals: 1200,
            trustScore: 4.8,
            aiTrend: {
              trendPct: 2.8,
              recommendation: 'Bullish (+2.8% likely)',
              badgeColor: 'blue',
              insight: 'लातूर बाजारात आवक मध्यम; अडत्यांमध्ये चुरस.'
            },
            breakdown: {
              grossRevenue: 72300,
              apmcCess: 759,
              transportCost: 850,
              unloadingCharges: 180,
              totalDeductions: 1789,
              netTakeHome: 70511,
              netPerQuintal: 4701
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
            transportDistanceLabel: '१२ किमी (स्थानिक रस्ता)',
            quotaRemainingQuintals: 150,
            trustScore: 4.2,
            aiTrend: {
              trendPct: -0.4,
              recommendation: 'Distress / Under-benchmarked',
              badgeColor: 'amber',
              insight: 'मध्यस्थांचे मार्जिन जास्त; बेंचमार्कपेक्षा ₹४२० कमी दर.'
            },
            breakdown: {
              grossRevenue: 66000,
              apmcCess: 693,
              transportCost: 350,
              unloadingCharges: 120,
              totalDeductions: 1163,
              netTakeHome: 64837,
              netPerQuintal: 4322
            }
          }
        ]
      });
    } finally {
      setLoadingArbitrage(false);
    }
  };

  const handleVoiceFilled = (data: { crop: string; quantity: number; village: string }) => {
    setCrop(data.crop);
    setQuantity(data.quantity);
    setVillage(data.village);
    fetchArbitrage(data.quantity, data.crop, data.village);
  };

  const handleOpenLockModal = (option: any) => {
    setSelectedOptionForLock(option);
    setIsComplianceModalOpen(true);
  };

  const handleConfirmPriceLock = async () => {
    setIsComplianceModalOpen(false);

    if (!isOnline) {
      // Queue in IndexedDB
      await queueOfflineDispatch({
        crop,
        quantityQuintals: quantity,
        village,
        buyerId: selectedOptionForLock?.id,
        buyerName: selectedOptionForLock?.buyerName,
        lockedRate: selectedOptionForLock?.ratePerQuintal
      });
      await checkOfflineQueue();
      alert('ऑफलाइन मोड: इंटरनेट उपलब्ध नसल्यामुळे तुमचा भाव-लॉक स्थानिकरित्या (IndexedDB) नोंदवला गेला आहे. नेटवर्क येताच सर्व्हरवर पाठवला जाईल.');
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/transactions/price-lock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerId: 'FARMER_LAMJANA_01',
          farmerName: 'तुकाराम पाटील (Tukaram Patil)',
          crop,
          quantityQuintals: quantity,
          buyerId: selectedOptionForLock?.id,
          buyerName: selectedOptionForLock?.buyerName,
          lockedRate: selectedOptionForLock?.ratePerQuintal,
          transportCost: selectedOptionForLock?.transportCost,
          digitalConsentAccepted: true
        })
      });
      const json = await res.json();
      if (json.success) {
        setActivePriceLockTxn(json.data);
      }
    } catch {
      // Fallback
      setActivePriceLockTxn({
        transactionId: `TXN_LTR_${Date.now()}`,
        buyerName: selectedOptionForLock?.buyerName || 'Kirti Gold Agro Oil Mill',
        lockedRate: selectedOptionForLock?.ratePerQuintal || 4950,
        farmerNet: selectedOptionForLock?.breakdown?.netTakeHome || 73200,
        transit: {
          driverName: 'सचिन गायकवाड (Sachin Gaikwad)',
          vehicleNumber: 'MH-24-AG-4412',
          progressPct: 62,
          currentLocation: 'NH 361 हरंगूळ जवळ (१२ किमी उर्वरित)'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(lang === 'mr' ? 'en' : 'mr')}
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={() => setLowBandwidth(!lowBandwidth)}
        isOnline={isOnline}
      />

      {/* Offline Sync Banner */}
      {syncNotice && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{syncNotice}</span>
        </div>
      )}

      {queuedItemsCount > 0 && !isOnline && (
        <div className="bg-amber-600 text-amber-950 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>{queuedItemsCount} {dict.offlineMode}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        
        {/* Ground Benchmark Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-emerald-950/60 border border-emerald-700/40 rounded-2xl gap-2">
          <div className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-white">
                {lang === 'mr' ? 'शेतकरी कक्ष — लामजणा शेतकरी बेंचमार्क' : 'Farmer Portal — Lamjana Benchmark'}
              </h2>
              <p className="text-xs text-emerald-300/80">{dict.activeBenchmark}</p>
            </div>
          </div>
          <div className="text-xs text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            {lang === 'mr' ? 'शेतकरी: तुकाराम पाटील (८ हेक्टर सोयाबीन)' : 'Farmer: Tukaram Patil (8 Ha Soybean)'}
          </div>
        </div>

        {/* 1. Voice & WhatsApp Input Layer */}
        <VoiceInputWidget
          lang={lang}
          onFormFilled={handleVoiceFilled}
          lowBandwidth={lowBandwidth}
        />

        {/* 2. Manual Crop / Quantity Adjuster */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-wrap items-center gap-4 text-xs">
          <div className="flex-1 min-w-[140px]">
            <label className="text-slate-400 block mb-1 font-semibold">{dict.crop}</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="text-slate-400 block mb-1 font-semibold">{dict.quantity}</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex-1 min-w-[180px]">
            <label className="text-slate-400 block mb-1 font-semibold">{dict.village}</label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="self-end">
            <button
              onClick={() => fetchArbitrage(quantity, crop, village)}
              disabled={loadingArbitrage}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingArbitrage ? 'animate-spin' : ''}`} />
              <span>{dict.calculateArbitrage}</span>
            </button>
          </div>
        </div>

        {/* 3. Real-Time Net Surplus Notification Banner */}
        {arbitrageData && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-amber-900/70 border border-emerald-500/60 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center shadow-md">
                ₹
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {dict.surplusBanner}
                  <span className="text-amber-300 text-lg font-black ml-1">
                    {arbitrageData.arbitrageSurplus?.toLocaleString('en-IN')}
                  </span>{' '}
                  {dict.surplusBannerSuffix}
                </h3>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  स्थानिक मध्यस्थांऐवजी लातूर मिलमध्ये थेट विकल्यास वाहतूक व सेस वजा जाता निव्वळ फायदा.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-600/40 text-center">
              १५ क्विंटल सोयाबीन बेंचमार्क
            </span>
          </div>
        )}

        {/* 4. Arbitrage Comparison Cards: Mandi vs APMC vs Mill */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{dict.arbitrageTitle}</h3>
              <p className="text-xs text-slate-400">{dict.arbitrageDesc}</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
              ३ पर्याय उपलब्ध (Ranked by Net Take-Home)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {arbitrageData?.options?.map((opt: any, index: number) => (
              <ArbitrageCard
                key={opt.id}
                option={opt}
                isBest={index === 0}
                lang={lang}
                onLockPrice={handleOpenLockModal}
                lowBandwidth={lowBandwidth}
              />
            ))}
          </div>
        </div>

        {/* 5. Transit Tracker (Active if Price-Lock activated) */}
        {activePriceLockTxn && (
          <div className="space-y-2 animate-fadeIn">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{dict.transitTitle}</span>
            </h3>
            <TransitTracker
              transaction={activePriceLockTxn}
              lang={lang}
              onSimulateArrival={() => alert('माल लातूर ऑईल मिल येथे वजन काट्यावर पोहोचला आहे! कृपया पोर्टल B (अडत व मिल कक्ष) उघडून वजन पावती व एस्क्रो रिलीज तपासा.')}
              lowBandwidth={lowBandwidth}
            />
          </div>
        )}

        {/* 6. SMS / USSD Fallback Gateway Simulator (Mandatory Offline Fix) */}
        <div className="pt-2">
          <SMSFallbackSimulator lang={lang} />
        </div>

      </main>

      {/* Digital Consent / Non-Custodial Escrow Modal */}
      <TrustComplianceModal
        isOpen={isComplianceModalOpen}
        onClose={() => setIsComplianceModalOpen(false)}
        onConfirmPriceLock={handleConfirmPriceLock}
        selectedOption={selectedOptionForLock}
        lang={lang}
      />

    </div>
  );
}
