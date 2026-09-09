'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Store, Truck, ShieldCheck, Globe, Wifi, WifiOff, Zap, LayoutDashboard } from 'lucide-react';
import { Language, t } from '@/lib/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  lowBandwidth: boolean;
  onToggleLowBandwidth: () => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  lowBandwidth,
  onToggleLowBandwidth,
  isOnline
}) => {
  const pathname = usePathname();
  const dict = t[lang];

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

          {/* Controls: Language, Low-Bandwidth, Offline Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Low Bandwidth Toggle */}
            <button
              onClick={onToggleLowBandwidth}
              title="Toggle Low Bandwidth Mode (Disables heavy graphics for 2G rural networks)"
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                lowBandwidth
                  ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-900/30'
                  : 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/40 hover:bg-emerald-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lowBandwidth ? '2G / Lite Active' : 'Lite Mode'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-200 text-xs font-semibold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{dict.switchLang}</span>
            </button>

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
                  <span>Offline (PWA)</span>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
