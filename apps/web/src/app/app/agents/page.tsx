'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, Plus, Play, Pause, CheckCircle2 } from 'lucide-react';

export default function AppAgentsPage() {
  const [agents] = useState([
    {
      id: 'agt_concierge_01',
      name: 'Azure Palm Concierge',
      type: 'CONCIERGE',
      property: 'Azure Palm Resort & Spa',
      status: 'ACTIVE',
      model: 'gpt-4o-mini',
      conversations: 1248,
      resolution_rate: '94.2%',
      tools_count: 6,
      channels: ['Web Widget', 'Voice', 'WhatsApp']
    },
    {
      id: 'agt_booking_02',
      name: 'Azure Palm Booking Agent',
      type: 'BOOKING',
      property: 'Azure Palm Resort & Spa',
      status: 'ACTIVE',
      model: 'gpt-4o-mini',
      conversations: 412,
      resolution_rate: '91.8%',
      tools_count: 4,
      channels: ['Web Widget']
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">My Hospitality AI Agents</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage runtime execution states, tool authorizations, and channels across properties.</p>
        </div>

        <Link 
          href="/app/agents/create"
          className="px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Create AI Agent
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono border border-zinc-700">
                  {agent.type}
                </span>

                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {agent.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-zinc-100 mb-1 flex items-center gap-2">
                <Bot className="w-4 h-4 text-zinc-400" /> {agent.name}
              </h2>
              <p className="text-xs text-zinc-400 mb-5">{agent.property} • Model: {agent.model}</p>

              <div className="grid grid-cols-3 gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-xs text-center font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">CONVERSATIONS</span>
                  <span className="text-zinc-100 font-bold">{agent.conversations}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">RESOLUTION</span>
                  <span className="text-emerald-400 font-bold">{agent.resolution_rate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">TOOLS</span>
                  <span className="text-zinc-100 font-bold">{agent.tools_count} Enabled</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-800/80 pt-3 flex items-center justify-between text-xs">
              <div className="flex gap-1">
                {agent.channels.map(c => (
                  <span key={c} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded">
                    {c}
                  </span>
                ))}
              </div>
              <Link href="/guest/agt_concierge_01" className="text-zinc-200 hover:text-white font-medium flex items-center gap-1 text-xs">
                Preview Guest View ➔
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
