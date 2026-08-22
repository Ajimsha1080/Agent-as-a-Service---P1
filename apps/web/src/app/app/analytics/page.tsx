'use client';
import React from 'react';
import { BarChart3, TrendingUp, DollarSign, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';

export default function AppAnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Business Outcome Analytics</h1>
          <p className="text-xs text-zinc-400 mt-1">Measure AI automation support volume, guest resolution rate, and booking conversions.</p>
        </div>

        <div className="flex gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">Period: Last 30 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Total Guest Conversations</span>
          <div className="text-2xl font-bold text-zinc-100">4,850</div>
          <p className="text-xs text-emerald-400 mt-1">+14.2% vs last month</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">AI Resolution Rate</span>
          <div className="text-2xl font-bold text-zinc-100">94.2%</div>
          <p className="text-xs text-zinc-400 mt-1">5.8% Human Escalations</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Influenced Room Bookings</span>
          <div className="text-2xl font-bold text-zinc-100">$38,400</div>
          <p className="text-xs text-emerald-400 mt-1">112 Guest Bookings</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Average AI Response Time</span>
          <div className="text-2xl font-bold text-zinc-100 font-mono">340 ms</div>
          <p className="text-xs text-zinc-400 mt-1">Sub-second Latency</p>
        </div>
      </div>
    </div>
  );
}
