'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, t, AVAILABLE_LANGUAGES, LanguageInfo } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: any;
  availableLanguages: LanguageInfo[];
  speakText: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('mr');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shetkarisetu_lang') as Language;
      if (saved && AVAILABLE_LANGUAGES.some((l) => l.code === saved)) {
        setLangState(saved);
      }
    } catch {}
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('shetkarisetu_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {}
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const langCodes: Record<Language, string> = {
        mr: 'mr-IN',
        hi: 'hi-IN',
        en: 'en-IN',
        kn: 'kn-IN',
        te: 'te-IN',
        gu: 'gu-IN',
      };

      utterance.lang = langCodes[lang] || 'hi-IN';
      utterance.rate = 0.95; // Clear pace for rural comprehension
      utterance.pitch = 1.0;

      // Find best voice match if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes('IN'));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  const dict = t[lang] || t.mr;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        dict,
        availableLanguages: AVAILABLE_LANGUAGES,
        speakText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
