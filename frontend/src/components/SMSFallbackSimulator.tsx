'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { Language } from '@/lib/translations';

interface SMSFallbackSimulatorProps {
  lang: Language;
}

export const SMSFallbackSimulator: React.FC<SMSFallbackSimulatorProps> = ({ lang }) => {
  const [smsText, setSmsText] = useState('SETU SOYBEAN 15 LAMJANA');
  const [phone, setPhone] = useState('+91 98223 45678');
  const [messages, setMessages] = useState<Array<{ sender: 'farmer' | 'system'; text: string; time: string }>>([
    {
      sender: 'farmer',
      text: 'SETU SOYBEAN 15 LAMJANA',
      time: '10:14 AM'
    },
    {
      sender: 'system',
      text: '[शेतकरी सेतू] १५ क्विंटल सोयाबीन (लामजणा): सर्वोत्तम निव्वळ दर ₹४,९५०/क्विंटल (कीर्ती गोल्ड मिल, लातूर). निव्वळ नफा: ₹७३,३५० (स्थानिक विक्रीपेक्षा ₹७,७०० जास्त). भाव लॉक करण्यासाठी YES 1 पाठवा.',
      time: '10:14 AM'
    }
  ]);
  const [sending, setSending] = useState(false);

  const handleSendSMS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsText.trim()) return;

    const newMsg = smsText;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'farmer', text: newMsg, time: now }]);
    setSmsText('');
    setSending(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/sms/inbound`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderPhone: phone, smsBody: newMsg })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'system',
          text: data.smsReply || '[ShetkariSetu] Your crop request has been received.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'system',
            text: '[शेतकरी सेतू] १५ क्विंटल सोयाबीन (लामजणा): सर्वोत्तम भाव ₹४,९५० कीर्ती गोल्ड मिल लातूर. निव्वळ हातात: ₹७३,३५०. वाहन पाठवण्यासाठी LOCK पाठवा.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>SMS / USSD ग्रामीण पर्याय (Offline Fallback Gateway)</span>
              <span className="px-2 py-0.2 text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                Feature Phone Ready
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              स्मार्टफोन किंवा 4G इंटरनेट नसलेल्या शेतकऱ्यांसाठी साधा SMS गेटवे (Twilio / NIC SMS Gateway)
            </p>
          </div>
        </div>
      </div>

      {/* Feature Phone Message Stream */}
      <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 max-h-56 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.sender === 'farmer' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs font-medium ${
                m.sender === 'farmer'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
              <span className="text-[9px] opacity-70 block text-right mt-1">{m.time}</span>
            </div>
          </div>
        ))}
        {sending && (
          <div className="text-[11px] text-slate-400 italic">SMS गेटवे प्रतिसाद देत आहे...</div>
        )}
      </div>

      {/* SMS Sender Form */}
      <form onSubmit={handleSendSMS} className="mt-3 flex gap-2">
        <input
          type="text"
          value={smsText}
          onChange={(e) => setSmsText(e.target.value)}
          placeholder="उदा. SETU SOYBEAN 15 LAMJANA"
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={sending || !smsText}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SMS पाठवा</span>
        </button>
      </form>
      
      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
        <span>शॉर्टकोड: <strong>५६१६१ (56161)</strong></span>
        <span>किमान डेटा किंवा २जी नेटवर्कवर कार्यरत</span>
      </div>
    </div>
  );
};
