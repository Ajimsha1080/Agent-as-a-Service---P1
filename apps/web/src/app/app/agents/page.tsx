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
      model: 'sarvam-2b',
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
      model: 'sarvam-2b',
      conversations: 412,
      resolution_rate: '91.8%',
      tools_count: 4,
      channels: ['Web Widget']
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">My Hospitality AI Agents</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage runtime execution states, tool authorizations, and channels across properties.</p>
        </div>

        <Link 
          href="/app/agents/create"
          className="yc-btn-primary flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Create AI Agent
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="yc-card p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="yc-badge">
                  {agent.type}
                </span>

                <span className="yc-badge-emerald">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {agent.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-zinc-900 mb-1 flex items-center gap-2">
                <Bot className="w-4 h-4 text-zinc-600" /> {agent.name}
              </h2>
              <p className="text-xs text-zinc-500 mb-5">{agent.property} • Model: {agent.model}</p>

              <div className="grid grid-cols-3 gap-3 bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-xs text-center font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">CONVERSATIONS</span>
                  <span className="text-zinc-900 font-bold">{agent.conversations}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">RESOLUTION</span>
                  <span className="text-emerald-700 font-bold">{agent.resolution_rate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">TOOLS</span>
                  <span className="text-zinc-900 font-bold">{agent.tools_count} Enabled</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-200 pt-3 flex items-center justify-between text-xs">
              <div className="flex gap-1">
                {agent.channels.map(c => (
                  <span key={c} className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] rounded border border-zinc-200">
                    {c}
                  </span>
                ))}
              </div>
              <Link href="/guest/agt_concierge_01" className="text-zinc-900 hover:text-black font-semibold flex items-center gap-1 text-xs">
                Preview Guest View ➔
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
