'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Store, Truck, ShieldCheck, Globe, Wifi, WifiOff, Zap, LayoutDashboard, ChevronDown, Check, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  lowBandwidth: boolean;
  onToggleLowBandwidth: () => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lowBandwidth,
  onToggleLowBandwidth,
  isOnline
}) => {
  const pathname = usePathname();
  const { lang, setLang, dict, availableLanguages } = useLanguage();
  const { farmerUser, adatUser } = useAuth();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangInfo = availableLanguages.find((l) => l.code === lang) || availableLanguages[0];

  const navItems = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/farmer', label: dict.farmerPortal, icon: Sprout },
    { href: '/mill', label: dict.millPortal, icon: Store },
    { href: '/transporter', label: dict.transporterPortal, icon: Truck },
    { href: '/compliance', label: dict.compliance, icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-emerald-950/85 border-b border-emerald-800/40 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Benchmark Pill */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-emerald-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                  {dict.appTitle}
                </span>
                <span className="hidden md:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-emerald-800/60 text-emerald-300 rounded-full border border-emerald-600/40 uppercase">
                  SIH 2026 Govt. of MH
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-inner'
                      : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls: Language Dropdown, Low-Bandwidth, Offline Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Low Bandwidth Toggle */}
            <button
              onClick={onToggleLowBandwidth}
              title="Toggle Low Bandwidth Mode (Disables heavy graphics for rural 2G networks)"
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                lowBandwidth
                  ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-900/30'
                  : 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/40 hover:bg-emerald-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lowBandwidth ? '2G / Lite Active' : 'Lite Mode'}</span>
            </button>

            {/* User Profile or Login Pill */}
            {farmerUser?.isLoggedIn ? (
              <Link
                href="/farmer"
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-emerald-900/80 border border-emerald-500/50 hover:border-emerald-400 text-emerald-200 text-xs font-bold transition-all shadow-md active:scale-95"
                title={`शेतकरी: ${farmerUser.name} (${farmerUser.villageMr || farmerUser.village})`}
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="hidden sm:inline max-w-[90px] truncate">{farmerUser.name.split(' ')[0]}</span>
                <span className="text-[10px] bg-emerald-700/60 px-1 py-0.2 rounded text-emerald-200">शेतकरी</span>
              </Link>
            ) : adatUser?.isLoggedIn ? (
              <Link
                href="/mill"
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-amber-900/80 border border-amber-500/50 hover:border-amber-400 text-amber-200 text-xs font-bold transition-all shadow-md active:scale-95"
                title={`आडत/मिल: ${adatUser.businessName}`}
              >
                <Store className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="hidden sm:inline max-w-[90px] truncate">{adatUser.businessName.split(' ')[0]}</span>
                <span className="text-[10px] bg-amber-700/60 px-1 py-0.2 rounded text-amber-200">आडत</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 border border-emerald-400/40"
                title="शेतकरी व आडत लॉगिन (Login)"
              >
                <User className="w-3.5 h-3.5" />
                <span>लॉगिन</span>
              </Link>
            )}

            {/* Functional Multi-Indian Language Dropdown Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-900/90 to-slate-900 border border-emerald-500/50 hover:border-emerald-400 text-white text-xs font-bold transition-all shadow-md active:scale-95"
                title="Select Indian Language / भाषा निवडा"
              >
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold">{currentLangInfo.flag} {currentLangInfo.nativeLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Menu Modal */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-slate-900 border border-emerald-500/60 rounded-2xl shadow-2xl overflow-hidden py-1.5 z-50 animate-fadeIn backdrop-blur-xl">
                  <div className="px-3 py-2 border-b border-slate-800 bg-slate-950/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      भारतीय भाषा निवडा (Select Language)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      भाषिणी AI भाषांतर प्रणाली
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto py-1">
                    {availableLanguages.map((l) => {
                      const isSelected = l.code === lang;
                      return (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => {
                            setLang(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-emerald-800/40 text-emerald-200 font-bold border-l-4 border-emerald-400'
                              : 'text-slate-300 hover:bg-emerald-950/60 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="text-base">{l.flag}</span>
                            <div>
                              <div className="font-bold text-white leading-tight">{l.nativeLabel}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{l.label} • {l.region}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Connectivity Status Pill */}
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-[11px] font-medium border ${
                isOnline
                  ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-400'
                  : 'bg-rose-950/80 border-rose-600/60 text-rose-300 animate-pulse'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-rose-400" />
                  <span>Offline</span>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
