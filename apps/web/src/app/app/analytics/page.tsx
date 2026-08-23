'use client';
import React from 'react';
import { BarChart3, TrendingUp, DollarSign, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';

export default function AppAnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Business Outcome Analytics</h1>
          <p className="text-xs text-zinc-500 mt-1">Measure AI automation support volume, guest resolution rate, and booking conversions.</p>
        </div>

        <div className="flex gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 font-semibold">Period: Last 30 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Total Guest Conversations</span>
          <div className="text-2xl font-bold text-zinc-900 font-mono">4,850</div>
          <p className="text-xs text-emerald-600 mt-1 font-semibold">+14.2% vs last month</p>
        </div>

        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">AI Resolution Rate</span>
          <div className="text-2xl font-bold text-zinc-900 font-mono">94.2%</div>
          <p className="text-xs text-zinc-500 mt-1">5.8% Human Escalations</p>
        </div>

        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Influenced Room Bookings</span>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$38,400</div>
          <p className="text-xs text-emerald-600 mt-1 font-semibold">112 Guest Bookings</p>
        </div>

        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Average AI Response Time</span>
          <div className="text-2xl font-bold text-zinc-900 font-mono">340 ms</div>
          <p className="text-xs text-zinc-500 mt-1">Sub-second Latency</p>
        </div>
      </div>
    </div>
  );
}
