'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sprout,
  Store,
  User,
  Phone,
  MapPin,
  Scale,
  ShieldCheck,
  Building,
  CreditCard,
  Banknote,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Volume2,
  FileText,
  BadgeCheck,
  ChevronDown,
  Info
} from 'lucide-react';
import {
  useAuth,
  BENCHMARK_FARMER,
  BENCHMARK_MILL,
  BENCHMARK_APMC_ADAT,
  FarmerProfile,
  AdatProfile
} from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LATUR_DISTRICT_VILLAGES, TALUKAS_IN_LATUR, VillageInfo } from '@/lib/villages';

interface AuthFormProps {
  initialRole?: 'FARMER' | 'ADAT';
  lockRole?: boolean;
  onSuccess?: () => void;
  redirectOnSuccess?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  initialRole = 'FARMER',
  lockRole = false,
  onSuccess,
  redirectOnSuccess = true,
}) => {
  const router = useRouter();
  const { lang, speakText } = useLanguage();
  const { loginFarmer, loginAdat } = useAuth();

  const [role, setRole] = useState<'FARMER' | 'ADAT'>(initialRole);
  const [submitting, setSubmitting] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  // Village Filter by Taluka
  const [selectedTaluka, setSelectedTaluka] = useState('ALL');
  const [customVillageActive, setCustomVillageActive] = useState(false);

  // Farmer Form State
  const [farmerData, setFarmerData] = useState<Partial<FarmerProfile>>({
    name: '',
    phone: '',
    village: 'Lamjana',
    villageMr: 'लामजणा',
    taluka: 'Ausa',
    talukaMr: 'औसा',
    district: 'Latur',
    crop: 'Soybean',
    quantityQuintals: 15,
    paymentPreference: 'CASH', // Cash by default - no bank compulsory!
    bankAccount: '',
    ifscCode: '',
    upiId: '',
    landAcres: '5 Acres',
  });

  // Adat Form State
  const [adatData, setAdatData] = useState<Partial<AdatProfile>>({
    businessName: '',
    ownerName: '',
    entityType: 'MILL',
    licenseNumber: '',
    mandiLocation: 'MIDC Latur',
    phone: '',
    paymentModeOffered: 'BOTH',
    gstNo: '',
    bankAccount: '',
  });

  // Filtered villages
  const availableVillages = useMemo(() => {
    if (selectedTaluka === 'ALL') return LATUR_DISTRICT_VILLAGES;
    return LATUR_DISTRICT_VILLAGES.filter((v) => v.taluka === selectedTaluka);
  }, [selectedTaluka]);

  // Handle Village Select
  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'CUSTOM') {
      setCustomVillageActive(true);
      setFarmerData((prev) => ({ ...prev, village: '', villageMr: '' }));
      return;
    }
    setCustomVillageActive(false);
    const found = LATUR_DISTRICT_VILLAGES.find((v) => v.name === val);
    if (found) {
      setFarmerData((prev) => ({
        ...prev,
        village: found.name,
        villageMr: found.nameMr,
        taluka: found.taluka,
        talukaMr: found.talukaMr,
      }));
    }
  };

  // 1-Click Autofill Handlers
  const fillFarmerBenchmark = () => {
    setFarmerData({ ...BENCHMARK_FARMER });
    setCustomVillageActive(false);
  };

  const fillMillBenchmark = () => {
    setAdatData({ ...BENCHMARK_MILL });
  };

  const fillApmcBenchmark = () => {
    setAdatData({ ...BENCHMARK_APMC_ADAT });
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const dataToSave: Partial<FarmerProfile> = {
      ...farmerData,
      name: farmerData.name?.trim() || 'तुकाराम पाटील',
      phone: farmerData.phone?.trim() || '+91 98223 45678',
      village: farmerData.village?.trim() || 'Lamjana',
      villageMr: farmerData.villageMr || farmerData.village || 'लामजणा',
      taluka: farmerData.taluka?.trim() || 'Ausa',
      talukaMr: farmerData.talukaMr || 'औसा',
      district: 'Latur',
      crop: farmerData.crop || 'Soybean',
      quantityQuintals: Number(farmerData.quantityQuintals) || 15,
      paymentPreference: farmerData.paymentPreference || 'CASH',
      bankAccount: farmerData.bankAccount?.trim() || '',
      ifscCode: farmerData.ifscCode?.trim() || '',
      upiId: farmerData.upiId?.trim() || '',
    };

    await loginFarmer(dataToSave);
    setSubmitting(false);
    setSuccessAnim(true);

    setTimeout(() => {
      if (onSuccess) onSuccess();
      if (redirectOnSuccess) router.push('/farmer');
    }, 600);
  };

  const handleAdatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const dataToSave: Partial<AdatProfile> = {
      ...adatData,
      businessName: adatData.businessName?.trim() || 'Kirti Gold Agro Oil Mill',
      ownerName: adatData.ownerName?.trim() || 'राजेश काबरा',
      licenseNumber: adatData.licenseNumber?.trim() || 'MH-LTR-DML-2024-88',
      mandiLocation: adatData.mandiLocation?.trim() || 'MIDC Latur',
      phone: adatData.phone?.trim() || '+91 94220 12345',
      paymentModeOffered: adatData.paymentModeOffered || 'BOTH',
    };

    await loginAdat(dataToSave);
    setSubmitting(false);
    setSuccessAnim(true);

    setTimeout(() => {
      if (onSuccess) onSuccess();
      if (redirectOnSuccess) router.push('/mill');
    }, 600);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Role Switch Tabs */}
      {!lockRole && (
        <div className="grid grid-cols-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6 gap-2">
          <button
            type="button"
            onClick={() => setRole('FARMER')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              role === 'FARMER'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sprout className="w-4 h-4 text-emerald-300" />
            <span>शेतकरी लॉगिन (Farmer Login)</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('ADAT')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              role === 'ADAT'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-950/50 border border-amber-400/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Store className="w-4 h-4 text-amber-300" />
            <span>आडत / मिल मालक (Adat / Mill)</span>
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">
              {role === 'FARMER' ? 'शेतकरी ओळख व नोंदणी' : 'आडत व मिल मालक नोंदणी'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
              {role === 'FARMER' ? 'Portal A' : 'Portal B'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {role === 'FARMER'
              ? 'नाव, मोबाईल व गाव निवडा. बँक खाते अनिवार्य नाही — माल पोहोचल्यावर थेट रोख रक्कमही घेता येईल.'
              : 'दुकान/मिलचे नाव, मोबाईल व परवाना क्रमांक नोंदवून खरेदी दर जाहीर करा.'}
          </p>
        </div>

        {/* Audio Helper */}
        <button
          type="button"
          onClick={() =>
            speakText(
              role === 'FARMER'
                ? 'शेतकरी मित्रांनो, आपले नाव, मोबाईल क्रमांक आणि लातूर जिल्ह्यातील आपले गाव निवडा. बँक खाते अनिवार्य नाही, आपण थेट रोख रक्कमही निवडू शकता.'
                : 'आडत व्यापारी व मिल मालकांनी आपल्या दुकानाचे नाव, मोबाईल आणि परवाना क्रमांक नोंदवावा.'
            )
          }
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
          title="सूचना ऐका (Listen Instructions)"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FARMER LOGIN FORM */}
      {/* ========================================================================= */}
      {role === 'FARMER' && (
        <form onSubmit={handleFarmerSubmit} className="mt-5 space-y-4">
          
          {/* Quick Benchmark Autofill Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-300 block">
                  SIH 2026 चाचणी: १-क्लिक जलद नोंदणी
                </span>
                <span className="text-[11px] text-slate-300">
                  तुकाराम पाटील • लामजणा (औसा) • १५ क्विंटल सोयाबीन • रोख / बँक
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={fillFarmerBenchmark}
              className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 flex-shrink-0 active:scale-95"
            >
              <span>⚡ १-क्लिक चाचणी भरा</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>शेतकऱ्याचे पूर्ण नाव (Full Name) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="उदा. तुकाराम पाटील"
                value={farmerData.name || ''}
                onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>मोबाईल क्रमांक (Mobile Number) *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98223 45678"
                value={farmerData.phone || ''}
                onChange={(e) => setFarmerData({ ...farmerData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            {/* Taluka Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>तालुका निवडा (Latur District Taluka)</span>
              </label>
              <select
                value={selectedTaluka}
                onChange={(e) => setSelectedTaluka(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400 transition-colors"
              >
                {TALUKAS_IN_LATUR.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Village Selector from Latur District */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>गाव निवडा (Select Village from District) *</span>
              </label>
              {!customVillageActive ? (
                <select
                  value={farmerData.village || 'Lamjana'}
                  onChange={handleVillageChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                >
                  {availableVillages.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.nameMr} ({v.name}) — {v.talukaMr} • {v.distanceToLaturKm} किमी
                    </option>
                  ))}
                  <option value="CUSTOM">➕ इतर गाव प्रविष्ट करा (Enter Other Village)</option>
                </select>
              ) : (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    required
                    placeholder="आपल्या गावाचे नाव प्रविष्ट करा"
                    value={farmerData.village || ''}
                    onChange={(e) =>
                      setFarmerData({
                        ...farmerData,
                        village: e.target.value,
                        villageMr: e.target.value,
                      })
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomVillageActive(false)}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    सूची
                  </button>
                </div>
              )}
            </div>

            {/* Crop Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>विक्रीसाठी पीक (Crop to Sell)</span>
              </label>
              <select
                value={farmerData.crop || 'Soybean'}
                onChange={(e) => setFarmerData({ ...farmerData, crop: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400 transition-colors"
              >
                <option value="Soybean">सोयाबीन (Soybean - Grade A Bold)</option>
                <option value="Cotton">कापूस (Cotton - Long Staple)</option>
                <option value="Tur">तूर / अरहर (Tur / Red Gram)</option>
                <option value="Chana">हरभरा (Chana / Bengal Gram)</option>
                <option value="Moong">मूग (Green Gram)</option>
                <option value="Urad">उडीद (Black Gram)</option>
              </select>
            </div>

            {/* Volume in Quintals */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>अंदाजे विक्री प्रमाण (Quintals) *</span>
              </label>
              <input
                type="number"
                min={1}
                max={500}
                required
                value={farmerData.quantityQuintals || 15}
                onChange={(e) =>
                  setFarmerData({ ...farmerData, quantityQuintals: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          {/* PAYMENT PREFERENCE: DIRECT CASH OR BANK/UPI (NOT COMPULSORY) */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
              <Banknote className="w-4 h-4 text-amber-400" />
              <span>पैसे मिळवण्याची पद्धत (Payment Preference) *</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Direct Cash on Delivery */}
              <div
                onClick={() => setFarmerData({ ...farmerData, paymentPreference: 'CASH' })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  farmerData.paymentPreference === 'CASH'
                    ? 'bg-amber-950/40 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">💵 थेट रोख रक्कम (Direct Cash)</span>
                  </div>
                  {farmerData.paymentPreference === 'CASH' && (
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1.5 leading-snug">
                  माल मिल/आडतवर पोहोचून वजन झाल्यावर <strong>लगेच रोख पैसे मिळतील</strong>. बँक खात्याची गरज नाही!
                </p>
              </div>

              {/* Option 2: Bank / UPI */}
              <div
                onClick={() => setFarmerData({ ...farmerData, paymentPreference: 'UPI' })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  farmerData.paymentPreference === 'UPI' || farmerData.paymentPreference === 'BANK'
                    ? 'bg-emerald-950/40 border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">🏦 बँक खाते / UPI द्वारे (Digital)</span>
                  </div>
                  {(farmerData.paymentPreference === 'UPI' || farmerData.paymentPreference === 'BANK') && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1.5 leading-snug">
                  थेट बँक खात्यात किंवा UPI द्वारे एस्क्रो रक्कम जमा (ऐच्छिक / Optional).
                </p>
              </div>
            </div>

            {/* Optional Bank Account Fields - Only if Bank/UPI selected */}
            {(farmerData.paymentPreference === 'UPI' || farmerData.paymentPreference === 'BANK') && (
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                <div>
                  <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1 mb-1">
                    <span>UPI आयडी (ऐच्छिक / Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 9822345678@upi किंवा tukaram@okhdfc"
                    value={farmerData.upiId || ''}
                    onChange={(e) => setFarmerData({ ...farmerData, upiId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1 mb-1">
                    <span>बँक खाते क्रमांक (ऐच्छिक / Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="बँक खाते क्रमांक (जर उपलब्ध असेल तर)"
                    value={farmerData.bankAccount || ''}
                    onChange={(e) => setFarmerData({ ...farmerData, bankAccount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notice: No Bank Compulsion */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              💡 <strong>महत्त्वाची नोंद:</strong> बँक खाते अनिवार्य नाही. आडत्याकडून वजन पावती निघाल्यावर आपण रोख रक्कम स्वीकारू शकता.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-emerald-950 font-black text-sm shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {successAnim ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-950 animate-bounce" />
                <span>नोंदणी पूर्ण! शेतकरी पोर्टल सुरू होत आहे...</span>
              </>
            ) : submitting ? (
              <span>माहिती साठवत आहे...</span>
            ) : (
              <>
                <Sprout className="w-4 h-4" />
                <span>नोंदणी करा व शेतकरी पोर्टल सुरू करा (Enter Farmer Portal)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* ========================================================================= */}
      {/* ADAT & MILL OWNER LOGIN FORM */}
      {/* ========================================================================= */}
      {role === 'ADAT' && (
        <form onSubmit={handleAdatSubmit} className="mt-5 space-y-4">
          
          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={fillMillBenchmark}
              className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/40 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">⚡ कीर्ती गोल्ड ऑईल मिल</span>
                <Building className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] text-slate-300 block mt-0.5">
                लातूर MIDC • DML परवाना क्र. 88 (Direct Mill)
              </span>
            </button>

            <button
              type="button"
              onClick={fillApmcBenchmark}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300">⚡ लातूर APMC आडत व्यापारी</span>
                <Store className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] text-slate-300 block mt-0.5">
                लातूर मार्केट यार्ड • APMC आडत परवाना क्र. 012
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Business / Shop Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>दुकान / मिलचे नाव (Business / Mill Name) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="कीर्ती गोल्ड ॲग्रो ऑईल मिल"
                value={adatData.businessName || ''}
                onChange={(e) => setAdatData({ ...adatData, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Owner / Signatory Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>मालकाचे / आडत्याचे नाव (Owner Name) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="राजेश काबरा"
                value={adatData.ownerName || ''}
                onChange={(e) => setAdatData({ ...adatData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>मोबाईल क्रमांक (Mobile Number) *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 94220 12345"
                value={adatData.phone || ''}
                onChange={(e) => setAdatData({ ...adatData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Entity Type */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>संस्थेचा प्रकार (Entity Type)</span>
              </label>
              <select
                value={adatData.entityType || 'MILL'}
                onChange={(e) =>
                  setAdatData({ ...adatData, entityType: e.target.value as any })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="MILL">थेट प्रक्रिया मिल (Direct Processing Mill - DML)</option>
                <option value="APMC_ADAT">APMC परवानाधारक आडत्या (Commission Agent)</option>
                <option value="GRAIN_TRADER">नोंदणीकृत धान्य व्यापारी (Grain Merchant)</option>
              </select>
            </div>

            {/* License Number */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>शासकीय परवाना क्रमांक (APMC / DML License No.) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="MH-LTR-DML-2024-88 किंवा APMC-LTR-YD-012"
                value={adatData.licenseNumber || ''}
                onChange={(e) => setAdatData({ ...adatData, licenseNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Mandi / Yard Location */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>मार्केट यार्ड / ठिकाण (Mandi Location) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="MIDC Latur किंवा Latur Market Yard"
                value={adatData.mandiLocation || ''}
                onChange={(e) => setAdatData({ ...adatData, mandiLocation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Payment Mode Offered by Adat / Mill */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
              <Banknote className="w-4 h-4 text-amber-400" />
              <span>शेतकऱ्यास देण्याची सुविधा (Payment Modes Provided) *</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setAdatData({ ...adatData, paymentModeOffered: 'CASH' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  adatData.paymentModeOffered === 'CASH'
                    ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs text-white">💵 थेट रोख रक्कम</div>
                <div className="text-[10px] text-slate-400 mt-1">काट्यावर रोख पेमेंट</div>
              </button>

              <button
                type="button"
                onClick={() => setAdatData({ ...adatData, paymentModeOffered: 'DIGITAL' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  adatData.paymentModeOffered === 'DIGITAL'
                    ? 'bg-emerald-950/60 border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs text-white">🏦 बँक / UPI</div>
                <div className="text-[10px] text-slate-400 mt-1">डिजिटल ट्रान्सफर</div>
              </button>

              <button
                type="button"
                onClick={() => setAdatData({ ...adatData, paymentModeOffered: 'BOTH' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  adatData.paymentModeOffered === 'BOTH'
                    ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs text-white">🤝 दोन्ही उपलब्ध</div>
                <div className="text-[10px] text-slate-400 mt-1">शेतकऱ्याच्या पसंतीनुसार</div>
              </button>
            </div>
          </div>

          {/* Optional Bank Account for Adat */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>पेमेंट बँक खाते (Optional / ऐच्छिक)</span>
            </label>
            <input
              type="text"
              placeholder="बँक खाते क्रमांक किंवा GST नंबर (ऐच्छिक)"
              value={adatData.bankAccount || ''}
              onChange={(e) => setAdatData({ ...adatData, bankAccount: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/60 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {successAnim ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-slate-950 animate-bounce" />
                <span>नोंदणी झाली! मिल व आडत पोर्टल सुरू होत आहे...</span>
              </>
            ) : submitting ? (
              <span>माहिती पडताळत आहे...</span>
            ) : (
              <>
                <Store className="w-4 h-4" />
                <span>नोंदणी पूर्ण करा व मिल पोर्टल उघडा (Enter Mill Portal)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
