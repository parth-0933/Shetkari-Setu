'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FarmerProfile {
  id?: string;
  name: string;
  phone: string;
  village: string;
  villageMr?: string;
  taluka: string;
  talukaMr?: string;
  district: string;
  crop: string;
  quantityQuintals: number;
  paymentPreference: 'CASH' | 'UPI' | 'BANK'; // Cash on Delivery or Bank/UPI
  bankAccount?: string; // Optional - NOT compulsory
  ifscCode?: string; // Optional
  upiId?: string; // Optional
  landAcres?: string;
  farmerId?: string;
  isLoggedIn: boolean;
  loginTimestamp?: string;
}

export interface AdatProfile {
  id?: string;
  businessName: string;
  ownerName: string;
  entityType: 'MILL' | 'APMC_ADAT' | 'GRAIN_TRADER';
  licenseNumber: string;
  mandiLocation: string;
  phone: string;
  gstNo?: string;
  paymentModeOffered: 'CASH' | 'DIGITAL' | 'BOTH'; // Direct cash upon weighing or bank/UPI
  bankAccount?: string; // Optional
  isLoggedIn: boolean;
  loginTimestamp?: string;
}

export const BENCHMARK_FARMER: FarmerProfile = {
  id: 'FARMER_LAMJANA_01',
  name: 'तुकाराम पाटील (Tukaram Patil)',
  phone: '+91 98223 45678',
  village: 'Lamjana',
  villageMr: 'लामजणा',
  taluka: 'Ausa',
  talukaMr: 'औसा',
  district: 'Latur (लातूर)',
  crop: 'Soybean',
  quantityQuintals: 15,
  paymentPreference: 'CASH', // User requested: direct cash when product arrives or optional bank
  bankAccount: '',
  ifscCode: '',
  upiId: 'tukaram.patil@okhdfcbank',
  landAcres: '5 Acres (बागायती)',
  farmerId: 'MH-LTR-FRM-2026-081',
  isLoggedIn: true,
};

export const BENCHMARK_MILL: AdatProfile = {
  id: 'BUYER_MILL_01',
  businessName: 'Kirti Gold Agro Oil Mill (कीर्ती गोल्ड ऑईल मिल)',
  ownerName: 'राजेश काबरा (Rajesh Kabra)',
  entityType: 'MILL',
  licenseNumber: 'MH-LTR-DML-2024-88',
  mandiLocation: 'MIDC Latur (लातूर एमआयडीसी)',
  phone: '+91 94220 12345',
  gstNo: '27AABCK1234F1Z5',
  paymentModeOffered: 'BOTH', // Offers direct cash at weighbridge OR instant RTGS/UPI
  isLoggedIn: true,
};

export const BENCHMARK_APMC_ADAT: AdatProfile = {
  id: 'BUYER_APMC_01',
  businessName: 'Latur APMC Market Yard Adat (लातूर कृषी उत्पन्न बाजार समिती आडत)',
  ownerName: 'सुरेश देशमुख (Suresh Deshmukh)',
  entityType: 'APMC_ADAT',
  licenseNumber: 'APMC-LTR-YD-012',
  mandiLocation: 'Latur Market Yard (मुख्य बाजार आवार)',
  phone: '+91 98601 54321',
  gstNo: '27AADCD9876K1Z9',
  paymentModeOffered: 'CASH', // Traditional APMC spot cash upon weighing slip
  isLoggedIn: true,
};

interface AuthContextType {
  farmerUser: FarmerProfile | null;
  adatUser: AdatProfile | null;
  loginFarmer: (data: Partial<FarmerProfile>) => Promise<void>;
  logoutFarmer: () => void;
  loginAdat: (data: Partial<AdatProfile>) => Promise<void>;
  logoutAdat: () => void;
  isFarmerAuthLoading: boolean;
  isAdatAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FARMER_STORAGE_KEY = 'shetkarisetu_farmer_profile';
const ADAT_STORAGE_KEY = 'shetkarisetu_adat_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmerUser, setFarmerUser] = useState<FarmerProfile | null>(null);
  const [adatUser, setAdatUser] = useState<AdatProfile | null>(null);
  const [isFarmerAuthLoading, setIsFarmerAuthLoading] = useState(true);
  const [isAdatAuthLoading, setIsAdatAuthLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFarmer = localStorage.getItem(FARMER_STORAGE_KEY);
      if (savedFarmer) {
        const parsed = JSON.parse(savedFarmer);
        if (parsed && parsed.isLoggedIn) {
          setFarmerUser(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to restore farmer session', e);
    } finally {
      setIsFarmerAuthLoading(false);
    }

    try {
      const savedAdat = localStorage.getItem(ADAT_STORAGE_KEY);
      if (savedAdat) {
        const parsed = JSON.parse(savedAdat);
        if (parsed && parsed.isLoggedIn) {
          setAdatUser(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to restore adat session', e);
    } finally {
      setIsAdatAuthLoading(false);
    }
  }, []);

  const loginFarmer = async (data: Partial<FarmerProfile>) => {
    const profile: FarmerProfile = {
      id: data.id || `FRM_${Date.now()}`,
      name: data.name?.trim() || 'तुकाराम पाटील',
      phone: data.phone?.trim() || '+91 98223 45678',
      village: data.village?.trim() || 'Lamjana',
      villageMr: data.villageMr || 'लामजणा',
      taluka: data.taluka?.trim() || 'Ausa',
      talukaMr: data.talukaMr || 'औसा',
      district: data.district?.trim() || 'Latur',
      crop: data.crop || 'Soybean',
      quantityQuintals: Number(data.quantityQuintals) || 15,
      paymentPreference: data.paymentPreference || 'CASH',
      bankAccount: data.bankAccount?.trim() || '',
      ifscCode: data.ifscCode?.trim() || '',
      upiId: data.upiId?.trim() || '',
      landAcres: data.landAcres || '5 Acres',
      farmerId: data.farmerId || `MH-LTR-FRM-${Math.floor(1000 + Math.random() * 9000)}`,
      isLoggedIn: true,
      loginTimestamp: new Date().toISOString(),
    };

    setFarmerUser(profile);
    try {
      localStorage.setItem(FARMER_STORAGE_KEY, JSON.stringify(profile));
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/auth/farmer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
    } catch (err) {
      console.warn('Backend farmer auth sync failed; saved locally:', err);
    }
  };

  const logoutFarmer = () => {
    setFarmerUser(null);
    try {
      localStorage.removeItem(FARMER_STORAGE_KEY);
    } catch {}
  };

  const loginAdat = async (data: Partial<AdatProfile>) => {
    const profile: AdatProfile = {
      id: data.id || `ADAT_${Date.now()}`,
      businessName: data.businessName?.trim() || 'Kirti Gold Agro Oil Mill',
      ownerName: data.ownerName?.trim() || 'राजेश काबरा',
      entityType: data.entityType || 'MILL',
      licenseNumber: data.licenseNumber?.trim() || 'MH-LTR-DML-2024-88',
      mandiLocation: data.mandiLocation?.trim() || 'MIDC Latur',
      phone: data.phone?.trim() || '+91 94220 12345',
      gstNo: data.gstNo?.trim() || '',
      paymentModeOffered: data.paymentModeOffered || 'BOTH',
      bankAccount: data.bankAccount?.trim() || '',
      isLoggedIn: true,
      loginTimestamp: new Date().toISOString(),
    };

    setAdatUser(profile);
    try {
      localStorage.setItem(ADAT_STORAGE_KEY, JSON.stringify(profile));
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/auth/adat/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
    } catch (err) {
      console.warn('Backend adat auth sync failed; saved locally:', err);
    }
  };

  const logoutAdat = () => {
    setAdatUser(null);
    try {
      localStorage.removeItem(ADAT_STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        farmerUser,
        adatUser,
        loginFarmer,
        logoutFarmer,
        loginAdat,
        logoutAdat,
        isFarmerAuthLoading,
        isAdatAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
