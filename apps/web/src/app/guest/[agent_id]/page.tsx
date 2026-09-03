'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Send, Sparkles, Utensils, Calendar, ShieldCheck } from 'lucide-react';
import { VoiceOrb } from '../../../components/ui/voice-orb';

const WELCOME_GREETINGS: Record<string, string> = {
  English: 'Welcome to Azure Palm Resort & Spa! I am your 24/7 digital concierge. How can I assist your stay today?',
  Malayalam: 'അസൂർ പാം റിസോർട്ട് & സ്പാ-യിലേക്ക് സ്വാഗതം! ഞാൻ നിങ്ങളുടെ ഡിജിറ്റൽ കോൺസിയർജ് ആണ്. ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?',
  Hindi: 'अज़ूर पाम रिज़ॉर्ट और स्पा में आपका स्वागत है! मैं आपका 24/7 डिजिटल कंसीयज हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?',
  Tamil: 'அஸூர் பாம் ரிசார்ட் & ஸ்பாவுக்கு நல்வரவு! நான் உங்கள் 24/7 டிஜிட்டல் கான்சியர்ஜ். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
  Telugu: 'అజూర్ పామ్ రిసార్ట్ & స్పాకి സ്വാగతం! నేను మీ 24/7 డిజిటల్ కాన్సియర్జ్. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?',
  Kannada: 'ಅಜೂರ್ ಪಾಮ್ ರೆಸಾರ್ಟ್ ಮತ್ತು ಸ್ಪಾಗೆ ಸುಸ್ವಾಗತ! ನಾನು ನಿಮ್ಮ 24/7 ಡಿಜಿಟಲ್ ಕಾನ್ಸಿಯರ್ಜ್. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?'
};

const FALLBACK_RESPONSES: Record<string, string> = {
  English: 'Thank you for reaching out! All resort facilities and infinity pool amenities are fully operational today.',
  Malayalam: 'ഞങ്ങളുമായി ബന്ധപ്പെട്ടതിന് നന്ദി! എല്ലാ റിസോർട്ട് സൗകര്യങ്ങളും ഇൻഫിനിറ്റി പൂളും ഇന്ന് പ്രവർത്തിക്കുന്നു.',
  Hindi: 'हमसे संपर्क करने के लिए धन्यवाद! रिज़ॉर्ट की सभी सुविधाएँ और स्विमिंग पूल आज पूरी तरह से चालू हैं।',
  Tamil: 'எங்களை தொடர்புகொண்டதற்கு நன்றி! அனைத்து ரிசார்ட் வசதிகளும் இன்று இயங்குகின்றன.',
  Telugu: 'మమ్మల్ని సంప్రదించినందుకు ధన్యవాదాలు! రిసార్ట్ సౌకర్యాలన్నీ ఈరోజు అందుబాటులో ఉన్నాయి.',
  Kannada: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು! ರೆಸಾರ್ಟ್‌ನ ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು ಇಂದು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.'
};

const ACTION_CHIPS: Record<string, { pool: string; rooms: string; activities: string; dining: string }> = {
  English: { pool: '🏊 Pool Status', rooms: '🛌 Room Prices', activities: "🌴 Today's Activities", dining: '🍽️ Dining Menu' },
  Malayalam: { pool: '🏊 പൂൾ വിവരങ്ങൾ', rooms: '🛌 മുറി നിരക്കുകൾ', activities: '🌴 ഇന്നത്തെ പരിപാടികൾ', dining: '🍽️ ഡൈനിംഗ് മെനു' },
  Hindi: { pool: '🏊 स्विमिंग पूल स्थिति', rooms: '🛌 कमरे के दाम', activities: '🌴 आज की गतिविधियां', dining: '🍽️ रेस्टोरेंट मेन्यू' },
  Tamil: { pool: '🏊 நீச்சல் குளம்', rooms: '🛌 அறை கட்டணம்', activities: '🌴 இன்றைய நிகழ்ச்சிகள்', dining: '🍽️ உணவக மெனு' },
  Telugu: { pool: '🏊 స్విమ్మింగ్ పూల్', rooms: '🛌 గది ధరలు', activities: '🌴 నేటి కార్యక్రమాలు', dining: '🍽️ రెస్టారెంట్ మెనూ' },
  Kannada: { pool: '🏊 ಈಜು ಕೊಳದ ಮಾಹಿತಿ', rooms: '🛌 ಕೊಠಡಿ ದರಗಳು', activities: '🌴 ಇಂದಿನ ಚಟುವಟಿಕೆಗಳು', dining: '🍽️ ಉಪಹಾರ ಗೃಹ' }
};

const PLACEHOLDERS: Record<string, string> = {
  English: 'Ask about rooms, pool hours, dining menus, or activities...',
  Malayalam: 'മുറികൾ, പൂൾ സമയങ്ങൾ, ഡൈനിംഗ് മെനു അല്ലെങ്കിൽ പരിപാടികളെക്കുറിച്ച് ചോദിക്കുക...',
  Hindi: 'कमरों, पूल के समय, रेस्टोरेंट या गतिविधियों के बारे में पूछें...',
  Tamil: 'அறைகள், குளம் நேரம், உணவகம் அல்லது செயல்பாடுகள் பற்றி கேட்கவும்...',
  Telugu: 'గదులు, పూల్ సమయాలు, డైనింగ్ లేదా కార్యక్రమాల గురించి అడగండి...',
  Kannada: 'ಕೊಠಡಿಗಳು, ಈಜು ಕೊಳ ಸಮಯ, ಉಪಹಾರ ಅಥವಾ ಚಟುವಟಿಕೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...'
};

export default function GuestConciergePage() {
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [language, setLanguage] = useState('English');
  const languageRef = useRef('English');

  const [messages, setMessages] = useState([
    { sender: 'agent', text: WELCOME_GREETINGS.English }
  ]);
  const [propertyTitle, setPropertyTitle] = useState('Azure Palm Resort & Spa');
  const [propertySubtitle, setPropertySubtitle] = useState('Digital Concierge • Coastal Kerala');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/properties/prop_azure_palm_resort')
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setPropertyTitle(data.name);
          if (data.address) {
            const loc = data.address.split(',').slice(-2).join(',').strip?.() || data.address;
            setPropertySubtitle(`Digital Concierge • ${loc}`);
          }
        }
      })
      .catch(() => {});
  }, []);

  const getLanguageTag = (lang: string) => {
    switch (lang) {
      case 'Malayalam': return 'ml-IN';
      case 'Hindi': return 'hi-IN';
      case 'Tamil': return 'ta-IN';
      case 'Telugu': return 'te-IN';
      case 'Kannada': return 'kn-IN';
      default: return 'en-US';
    }
  };

  const getApiEndpoint = () => {
    return typeof window !== 'undefined' ? 'http://127.0.0.1:8000/api/v1/agents/agt_concierge_01/chat' : 'http://127.0.0.1:8000/api/v1/agents/agt_concierge_01/chat';
  };

  const sendVoiceMessage = async (queryText: string): Promise<string | null> => {
    const activeLang = languageRef.current || language;
    try {
      const res = await fetch(getApiEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: 'org_azure_group',
          property_id: 'prop_azure_palm_resort',
          message: activeLang !== 'English' ? `[Language: ${activeLang}] ${queryText}` : queryText,
          channel: 'voice_session',
          language: activeLang
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'user', text: queryText }, { sender: 'agent', text: data.response }]);
      return data.response;
    } catch (e) {
      console.error("Voice execution error:", e);
      const fb = FALLBACK_RESPONSES[activeLang] || FALLBACK_RESPONSES.English;
      setMessages(prev => [...prev, { sender: 'user', text: queryText }, { sender: 'agent', text: fb }]);
      return fb;
    }
  };

  const speakResponse = async (text: string) => {
    const activeLang = languageRef.current || language;
    setVoiceState('speaking');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: activeLang })
      });
      const data = await res.json();
      if (data && data.audio_base64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio_base64}`);
        audio.onended = () => setVoiceState('idle');
        audio.onerror = () => fallbackBrowserSpeech(text, activeLang);
        await audio.play();
        return;
      }
    } catch (e) {
      console.error("Sarvam TTS streaming error:", e);
    }
    fallbackBrowserSpeech(text, activeLang);
  };

  const fallbackBrowserSpeech = (text: string, activeLang: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageTag(activeLang);
      utterance.onend = () => setVoiceState('idle');
      utterance.onerror = () => setVoiceState('idle');
      window.speechSynthesis.speak(utterance);
    } else {
      setVoiceState('idle');
    }
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const activeLang = languageRef.current || language;
    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!queryText) setInputText('');
    setIsLoading(true);

    const lower = textToSend.toLowerCase();
    if (lower.includes('pool') || lower.includes('spa') || lower.includes('gym') || lower.includes('പൂൾ') || lower.includes('पूल')) {
      setStatusNotice(activeLang === 'Malayalam' ? 'പൂൾ വിവരങ്ങൾ പരിശോധിക്കുന്നു...' : activeLang === 'Hindi' ? 'पूल की जानकारी जांची जा रही है...' : 'Checking facility operational hours...');
    } else if (lower.includes('room') || lower.includes('available') || lower.includes('price') || lower.includes('മുറി') || lower.includes('कमरा')) {
      setStatusNotice(activeLang === 'Malayalam' ? 'തത്സമയ മുറി നിരക്കുകൾ പരിശോധിക്കുന്നു...' : activeLang === 'Hindi' ? 'कमरों की लाइव उपलब्धता जांची जा रही है...' : 'Checking live room availability & rates...');
    } else {
      setStatusNotice(activeLang === 'Malayalam' ? 'വിവരങ്ങൾ ശേഖരിക്കുന്നു...' : activeLang === 'Hindi' ? 'जानकारी ली जा रही है...' : 'Checking resort information...');
    }

    try {
      const res = await fetch(getApiEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: 'org_azure_group',
          property_id: 'prop_azure_palm_resort',
          message: activeLang !== 'English' ? `[Language: ${activeLang}] ${textToSend}` : textToSend,
          channel: 'web_widget',
          language: activeLang
        })
      });
      const data = await res.json();
      setStatusNotice(null);
      setMessages([...newMessages, { sender: 'agent', text: data.response }]);
    } catch (e) {
      setStatusNotice(null);
      const fallbackMsg = FALLBACK_RESPONSES[activeLang] || FALLBACK_RESPONSES.English;
      setMessages([...newMessages, { sender: 'agent', text: fallbackMsg }]);
    }
    setIsLoading(false);
  };

  const handleVoiceClick = () => {
    const activeLang = languageRef.current || language;
    if (voiceState !== 'idle') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setVoiceState('idle');
      return;
    }

    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = getLanguageTag(activeLang);
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setVoiceState('listening');

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceState('thinking');
        const reply = await sendVoiceMessage(transcript);
        if (reply) {
          speakResponse(reply);
        } else {
          setVoiceState('idle');
        }
      };

      recognition.onerror = () => {
        fallbackVoiceSimulation();
      };

      recognition.start();
    } else {
      fallbackVoiceSimulation();
    }
  };

  const triggerSampleVoiceTurn = (queryText: string) => {
    setVoiceState('listening');
    setTimeout(() => setVoiceState('thinking'), 1500);
    setTimeout(async () => {
      const reply = await sendVoiceMessage(queryText);
      if (reply) speakResponse(reply);
      else setVoiceState('idle');
    }, 3000);
  };

  const fallbackVoiceSimulation = () => {
    triggerSampleVoiceTurn("What are today's room rates and availability?");
  };

  const currentChips = ACTION_CHIPS[language] || ACTION_CHIPS.English;
  const currentPlaceholder = PLACEHOLDERS[language] || PLACEHOLDERS.English;

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between max-w-4xl mx-auto border-x border-zinc-200 font-sans shadow-sm">
      {/* 1-Click Unified Portal Switcher */}
      <div className="flex items-center justify-between bg-zinc-100 p-2 border-b border-zinc-200 text-xs font-semibold px-4">
        <span className="text-zinc-500 font-mono text-[11px] font-semibold">PORTAL SWITCHER:</span>
        <div className="flex items-center gap-1">
          <Link href="/app/dashboard" className="px-3 py-1 rounded-lg text-zinc-600 hover:text-zinc-900 transition-colors">
            🏨 Hostel SaaS Admin
          </Link>
          <Link href="/guest/agt_hostel_01" className="px-3 py-1 rounded-lg bg-zinc-900 text-white shadow-xs">
            💬 Resident AI Chat
          </Link>
          <Link href="/platform/dashboard" className="px-3 py-1 rounded-lg text-zinc-600 hover:text-zinc-900 transition-colors">
            🛡️ Super Admin
          </Link>
        </div>
      </div>

      {/* Luxury Hotel Header */}
      <header className="p-5 border-b border-zinc-200 bg-white flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-bold flex items-center justify-center text-xl shadow-xs">
            🌴
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              {propertyTitle} <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </h1>
            <p className="text-xs text-zinc-500 font-medium">{propertySubtitle}</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <select 
            value={language}
            onChange={(e) => {
              const newLang = e.target.value;
              languageRef.current = newLang;
              setLanguage(newLang);
              setMessages(prev => {
                if (prev.length === 1 && prev[0].sender === 'agent') {
                  return [{ sender: 'agent', text: WELCOME_GREETINGS[newLang] || WELCOME_GREETINGS.English }];
                }
                return prev;
              });
              if (newLang !== 'English') {
                setStatusNotice(`Sarvam AI ${newLang} Engine connected.`);
              } else {
                setStatusNotice(null);
              }
            }}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 focus:outline-none font-semibold"
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
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
            <VoiceOrb state={voiceState} onToggleRecord={handleVoiceClick} />
            <p className="text-xs text-zinc-500 font-mono text-center max-w-sm">
              {voiceState === 'idle' && `Click microphone or sample button below to speak in ${language}`}
              {voiceState === 'listening' && `Listening to microphone in ${language}...`}
              {voiceState === 'thinking' && `Sarvam AI processing real-time turn...`}
              {voiceState === 'speaking' && `Sarvam AI speaking in ${language}...`}
            </p>

            {voiceState === 'idle' && (
              <div className="flex gap-2 flex-wrap justify-center">
                <button 
                  onClick={() => triggerSampleVoiceTurn("What are today's room rates and availability?")}
                  className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 shadow-xs"
                >
                  🎙️ {currentChips.rooms}
                </button>
                <button 
                  onClick={() => triggerSampleVoiceTurn("Is the swimming pool open now?")}
                  className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 shadow-xs"
                >
                  {currentChips.pool}
                </button>
                <button 
                  onClick={() => triggerSampleVoiceTurn("Show today's guest activities schedule")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold hover:bg-zinc-100 shadow-xs"
                >
                  {currentChips.activities}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-2xs ${
                  m.sender === 'user' 
                    ? 'bg-zinc-900 text-white rounded-br-none' 
                    : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none'
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
              {currentChips.pool}
            </button>
            <button onClick={() => handleSendMessage("What are today's room rates and availability?")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              {currentChips.rooms}
            </button>
            <button onClick={() => handleSendMessage("Show today's guest activities schedule")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              {currentChips.activities}
            </button>
            <button onClick={() => handleSendMessage("Show restaurant hours and menu")} className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-100 whitespace-nowrap shadow-xs">
              {currentChips.dining}
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
              placeholder={currentPlaceholder}
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 font-sans"
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
