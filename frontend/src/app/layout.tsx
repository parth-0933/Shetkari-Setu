import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShetkariSetu — शेतकरी सेतू (SIH 2026 Prototype)',
  description: 'Agricultural Market Linkage & Real-time Arbitrage Engine — Govt. of Maharashtra SIH Track',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#25915d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#25915d" />
      </head>
      <body className="antialiased selection:bg-amber-500 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}
