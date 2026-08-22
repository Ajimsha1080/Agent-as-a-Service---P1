'use client';
import React, { useState } from 'react';
import { MessageSquare, User, Bot, CheckCircle2, AlertCircle, PhoneCall, Send, ShieldAlert, Tag, UserCheck } from 'lucide-react';

export default function AppConversationsInboxPage() {
  const [selectedConv, setSelectedConv] = useState('conv_101');
  const [isHumanTakeover, setIsHumanTakeover] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const [conversations, setConversations] = useState([
    {
      id: 'conv_101',
      guest: 'Eleanor Vance',
      room: 'Room 304 - Ocean Suite',
      agent: 'Azure Concierge',
      property: 'Azure Palm Resort',
      lastMessage: 'Is the infinity swimming pool open until 8 PM tonight?',
      time: '10m ago',
      status: 'AI Handled',
      priority: 'Normal',
      tags: ['Pool', 'Amenities']
    },
    {
      id: 'conv_102',
      guest: 'Marcus Brody',
      room: 'Unassigned (Booking Inquiry)',
      agent: 'Azure Booking Agent',
      property: 'Azure Palm Resort',
      lastMessage: 'Can I book a deluxe cottage for 3 nights next weekend?',
      time: '25m ago',
      status: 'Needs Attention',
      priority: 'High',
      tags: ['Booking', 'High Intent']
    },
    {
      id: 'conv_103',
      guest: 'Sophia Chen',
      room: 'Bed 4 - Heritage Dorm',
      agent: 'Azure Hostel Support',
      property: 'Azure Palm Hostel',
      lastMessage: 'What time is the evening backwater kayaking activity?',
      time: '1h ago',
      status: 'Resolved',
      priority: 'Normal',
      tags: ['Kayaking', 'Activities']
    }
  ]);

  const activeConv = conversations.find(c => c.id === selectedConv) || conversations[0];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatInput('');
  };

  return (
    <div className="h-[calc(100vh-120px)] grid grid-cols-1 lg:grid-cols-12 gap-4 font-sans overflow-hidden">
      {/* LEFT COLUMN: Conversation List */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <h2 className="font-bold text-sm text-white">Staff Inbox</h2>
          <span className="px-2 py-0.5 bg-teal-500/10 text-teal-300 text-[10px] font-bold rounded">
            {conversations.length} Active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedConv(c.id)}
              className={`p-4 cursor-pointer transition-all ${
                selectedConv === c.id ? 'bg-slate-800/80 border-l-4 border-teal-500' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">{c.guest}</span>
                <span className="text-[10px] text-slate-500">{c.time}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">{c.lastMessage}</p>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">{c.agent}</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  c.status === 'Needs Attention' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER COLUMN: Intercom-Grade Active Chat Feed */}
      <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden">
        {/* Chat Header with Human Takeover Switch */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center text-xs">
              {activeConv.guest.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{activeConv.guest}</h3>
              <p className="text-[10px] text-slate-400">{activeConv.room} • {activeConv.property}</p>
            </div>
          </div>

          <button
            onClick={() => setIsHumanTakeover(!isHumanTakeover)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isHumanTakeover 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                : 'bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            {isHumanTakeover ? 'Human Staff Controlling' : 'Take Over Conversation'}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-950">
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 text-slate-200 p-4 rounded-2xl text-xs max-w-[80%]">
              Hello! Is the infinity swimming pool open until 8 PM tonight?
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-teal-500 text-slate-950 p-4 rounded-2xl text-xs font-medium max-w-[80%]">
              Good evening! Yes, our temperature-controlled Infinity Pool is open until 8:00 PM today. Towels are available at the poolside kiosk.
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center gap-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={isHumanTakeover ? "Reply directly to guest as staff..." : "Agent auto-pilot active. Take over to type..."}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
          />
          <button 
            onClick={handleSendMessage}
            className="px-4 py-2.5 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Guest CRM Context Drawer */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between text-xs overflow-y-auto space-y-6">
        <div>
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-4 uppercase tracking-wider">
            Guest CRM Profile
          </h3>

          <div className="space-y-4 text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">GUEST NAME</span>
              <span className="text-white font-bold">{activeConv.guest}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">STAY DETAILS</span>
              <span className="text-teal-300 font-semibold">{activeConv.room}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">AI AGENT IN CHARGE</span>
              <span className="text-white">{activeConv.agent}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] mb-1">CONVERSATION TAGS</span>
              <div className="flex gap-1.5 flex-wrap">
                {activeConv.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-slate-800 text-teal-300 text-[10px] rounded font-semibold">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-2">
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl">
            View Reservation Details
          </button>
          <button className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/30">
            ✓ Mark Conversation Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
