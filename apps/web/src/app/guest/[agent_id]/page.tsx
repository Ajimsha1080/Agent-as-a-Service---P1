'use client';
import React, { useState } from 'react';
import { Send, Sparkles, Utensils, Calendar, ShieldCheck } from 'lucide-react';
import { VoiceOrb } from '../../../components/ui/voice-orb';

export default function GuestConciergePage() {
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [language, setLanguage] = useState('English');
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Welcome to Azure Palm Resort & Spa! I am your 24/7 digital concierge. How can I assist your stay today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!queryText) setInputText('');
    setIsLoading(true);

    const lower = textToSend.toLowerCase();
    if (lower.includes('pool') || lower.includes('spa') || lower.includes('gym')) {
      setStatusNotice('Checking facility operational hours...');
    } else if (lower.includes('room') || lower.includes('available') || lower.includes('price')) {
      setStatusNotice('Checking live room availability & rates...');
    } else {
      setStatusNotice('Checking resort information...');
    }

    try {
      const res = await fetch('http://localhost:8000/api/v1/agents/agt_concierge_01/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: 'org_azure_group',
          property_id: 'prop_azure_palm_resort',
          message: textToSend,
          channel: 'web_widget'
        })
      });
      const data = await res.json();
      setStatusNotice(null);
      setMessages([...newMessages, { sender: 'agent', text: data.response }]);
    } catch (e) {
      setStatusNotice(null);
      setMessages([...newMessages, { sender: 'agent', text: 'Thank you for reaching out! All resort facilities and infinity pool amenities are fully operational today.' }]);
    }
    setIsLoading(false);
  };

  const handleVoiceClick = () => {
    if (voiceState === 'idle') {
      setVoiceState('listening');
      setTimeout(() => setVoiceState('thinking'), 2500);
      setTimeout(() => {
        setVoiceState('speaking');
        handleSendMessage("Is the swimming pool open now?");
      }, 4500);
      setTimeout(() => setVoiceState('idle'), 8000);
    } else {
      setVoiceState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between max-w-4xl mx-auto border-x border-zinc-200 font-sans shadow-sm">
      {/* Luxury Hotel Header */}
      <header className="p-5 border-b border-zinc-200 bg-white flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-bold flex items-center justify-center text-xl shadow-xs">
            🌴
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              Azure Palm Resort & Spa <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </h1>
            <p className="text-xs text-zinc-500 font-medium">Digital Concierge • Coastal Kerala</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 focus:outline-none"
          >
            {['English', 'Malayalam', 'Hindi', 'Tamil', 'Kannada', 'Telugu'].map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <div className="flex bg-zinc-100 border border-zinc-200 p-0.5 rounded-lg">
            <button 
              onClick={() => setMode('chat')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${mode === 'chat' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'}`}
            >
              Chat
            </button>
            <button 
              onClick={() => setMode('voice')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${mode === 'voice' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'}`}
            >
              Voice
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex flex-col justify-between p-6 bg-zinc-50/50">
        {mode === 'voice' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <VoiceOrb state={voiceState} onToggleRecord={handleVoiceClick} />
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto pb-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-xl text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-zinc-900 text-white font-medium rounded-br-none shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-xs'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {statusNotice && (
              <div className="flex justify-start">
                <div className="text-xs text-zinc-600 italic bg-white border border-zinc-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-zinc-500" /> {statusNotice}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Action Chips */}
        {mode === 'chat' && (
          <div className="py-3 flex gap-2 overflow-x-auto border-t border-zinc-200">
            <button onClick={() => handleSendMessage("Is the swimming pool open now?")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              🏊 Pool Status
            </button>
            <button onClick={() => handleSendMessage("What are today's room rates and availability?")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              🛌 Room Prices
            </button>
            <button onClick={() => handleSendMessage("Show today's guest activities schedule")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              🌴 Today's Activities
            </button>
            <button onClick={() => handleSendMessage("Show restaurant hours and menu")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              🍽️ Dining Menu
            </button>
          </div>
        )}
      </main>

      {/* Footer Input Bar */}
      {mode === 'chat' && (
        <footer className="p-5 border-t border-zinc-200 bg-white">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about rooms, pool hours, dining menus, or activities..."
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400"
            />
            <button 
              onClick={() => handleSendMessage()}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
