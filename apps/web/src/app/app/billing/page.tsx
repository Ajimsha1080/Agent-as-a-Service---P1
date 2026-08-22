'use client';
import React from 'react';
import { CreditCard, CheckCircle2, DollarSign } from 'lucide-react';

export default function AppBillingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Subscription & SaaS Metering</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage your active subscription plan, conversation limits, and monthly billing.</p>
        </div>

        <button className="px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg shadow-sm transition-colors">
          Upgrade to Enterprise Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-4">
          <span className="px-2.5 py-1 bg-zinc-800 text-zinc-200 font-bold text-[10px] rounded font-mono border border-zinc-700">
            CURRENT PLAN: BUSINESS
          </span>
          <div>
            <h3 className="text-3xl font-bold text-zinc-100">$499 <span className="text-xs text-zinc-500 font-normal">/ month</span></h3>
            <p className="text-xs text-zinc-400 mt-1">Renews automatically on Sept 15, 2026</p>
          </div>
        </div>

        <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-3 col-span-2 font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-200 font-bold border-b border-zinc-800/80 pb-2">
            <span>ENTITLEMENT USAGE</span>
            <span>LIMITS</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>Monthly Conversations (1,660 / 100,000)</span>
                <span>1.6%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-zinc-100 h-full w-[1.6%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>Active AI Agents (4 / 15)</span>
                <span>26.6%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-zinc-100 h-full w-[26.6%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
