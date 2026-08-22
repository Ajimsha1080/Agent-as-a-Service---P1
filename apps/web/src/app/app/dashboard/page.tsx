'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Bot, Users, BarChart3, ArrowUpRight, TrendingUp, CheckCircle2,
  Clock, ShieldCheck, Zap, Plus, Sparkles, AlertCircle, Play, ChevronRight, BookOpen, Radio, MessageSquare
} from 'lucide-react';

export default function SaaSUserDashboard() {
  const [activeProperty, setActiveProperty] = useState('Azure Palm Resort & Spa');

  const properties = [
    { id: 'prop_resort', name: 'Azure Palm Resort & Spa', type: 'Luxury Resort & Spa', rooms: 48, activeAgents: 3, conversationsToday: 142, resolutionRate: '94.2%', status: 'OPERATIONAL' },
    { id: 'prop_hostel', name: 'Azure Palm Hostel', type: 'Boutique Hostel', rooms: 120, activeAgents: 1, conversationsToday: 68, resolutionRate: '91.8%', status: 'OPERATIONAL' }
  ];

  const agents = [
    { id: 'agt_concierge_01', name: 'Azure Concierge', type: 'Hospitality Concierge', property: 'Azure Palm Resort & Spa', status: 'ACTIVE', model: 'sarvam-2b', conversations: 1248, accuracy: '96.4%', avgLatency: '340ms' },
    { id: 'agt_booking_02', name: 'Booking Assistant', type: 'Room Reservations', property: 'Azure Palm Resort & Spa', status: 'ACTIVE', model: 'sarvam-2b', conversations: 412, accuracy: '98.1%', avgLatency: '310ms' },
    { id: 'agt_voice_03', name: 'Voice Concierge', type: 'Multi-lingual Voice', property: 'Azure Palm Resort & Spa', status: 'ACTIVE', model: 'sarvam-2b', conversations: 184, accuracy: '92.5%', avgLatency: '420ms' },
    { id: 'agt_hostel_04', name: 'Hostel Night AI', type: 'Front Desk Night AI', property: 'Azure Palm Hostel', status: 'ACTIVE', model: 'sarvam-2b', conversations: 290, accuracy: '95.0%', avgLatency: '290ms' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="yc-badge">TENANT: AZURE HOSPITALITY GROUP</span>
            <span className="yc-badge-emerald">● REAL-TIME ONLINE</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Good morning, Azure Group</h1>
          <p className="text-xs text-zinc-600 mt-1">Here is your hospitality AI workforce telemetry and live guest support performance.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/app/onboarding" className="yc-btn-secondary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700" /> Run Setup Wizard
          </Link>
          <Link href="/app/agents/create" className="yc-btn-primary flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Deploy New Agent
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="yc-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Properties</span>
            <Building2 className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900 font-mono">2 Properties</div>
            <p className="text-[11px] text-zinc-500 mt-1">48 Suites • 120 Hostel Beds</p>
          </div>
        </div>

        <div className="yc-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active AI Agents</span>
            <Bot className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900 font-mono">4 Runtimes</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">100% Operational Status</p>
          </div>
        </div>

        <div className="yc-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Monthly Guest Conversations</span>
            <MessageSquare className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900 font-mono">2,134</div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">+18.4% vs last month</p>
          </div>
        </div>

        <div className="yc-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">AI Resolution Rate</span>
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900 font-mono">94.2%</div>
            <p className="text-[11px] text-zinc-500 mt-1">5.8% Staff Handoffs</p>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="yc-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Properties Overview</h2>
            <p className="text-xs text-zinc-500">Managed hospitality sites under Azure Group.</p>
          </div>
          <Link href="/app/properties" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center gap-1">
            View All Properties <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="pb-3 font-semibold">PROPERTY NAME</th>
                <th className="pb-3 font-semibold">TYPE</th>
                <th className="pb-3 font-semibold">ACTIVE AGENTS</th>
                <th className="pb-3 font-semibold">24H CONVERSATIONS</th>
                <th className="pb-3 font-semibold">AI RESOLUTION</th>
                <th className="pb-3 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {properties.map(p => (
                <tr key={p.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-3 font-bold text-zinc-900">{p.name}</td>
                  <td><span className="yc-badge">{p.type}</span></td>
                  <td className="font-bold text-zinc-900">{p.activeAgents} Agents</td>
                  <td>{p.conversationsToday} turns</td>
                  <td className="text-emerald-600 font-bold">{p.resolutionRate}</td>
                  <td className="text-right"><span className="yc-badge-emerald">● {p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active AI Agents Table */}
      <div className="yc-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Active Agent Workforce</h2>
            <p className="text-xs text-zinc-500">Shared runtime instances handling guest support and bookings.</p>
          </div>
          <Link href="/app/agents" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center gap-1">
            Manage Agents <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map(a => (
            <div key={a.id} className="p-4 bg-white border border-zinc-200 rounded-xl space-y-3 hover:border-zinc-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900">{a.name}</h3>
                    <p className="text-[11px] text-zinc-500">{a.property}</p>
                  </div>
                </div>
                <span className="yc-badge-emerald">● {a.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 text-[11px] font-mono">
                <div>
                  <span className="text-zinc-400 block">TOTAL TURNS</span>
                  <span className="font-bold text-zinc-800">{a.conversations}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">ACCURACY</span>
                  <span className="font-bold text-emerald-600">{a.accuracy}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">LATENCY</span>
                  <span className="font-bold text-zinc-800">{a.avgLatency}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Link href={`/app/agents/${a.id}/playground`} className="px-3 py-1 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-[11px] font-medium rounded-md transition-colors">
                  Playground
                </Link>
                <Link href="/app/conversations" className="px-3 py-1 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-[11px] font-medium rounded-md transition-colors">
                  Inbox
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
