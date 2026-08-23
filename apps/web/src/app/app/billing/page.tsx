'use client';
import React from 'react';
import { CreditCard, CheckCircle2, DollarSign } from 'lucide-react';

export default function AppBillingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Subscription & SaaS Metering</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage your active subscription plan, conversation limits, and monthly billing.</p>
        </div>

        <button className="yc-btn-primary">
          Upgrade to Enterprise Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="yc-card p-6 space-y-4">
          <span className="yc-badge">
            CURRENT PLAN: BUSINESS
          </span>
          <div>
            <h3 className="text-3xl font-bold text-zinc-900 font-mono">$499 <span className="text-xs text-zinc-500 font-normal">/ month</span></h3>
            <p className="text-xs text-zinc-500 mt-1">Renews automatically on Sept 15, 2026</p>
          </div>
        </div>

        <div className="yc-card p-6 space-y-3 col-span-2 font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-900 font-bold border-b border-zinc-200 pb-2">
            <span>ENTITLEMENT USAGE</span>
            <span>LIMITS</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-zinc-600 mb-1">
                <span>Monthly Conversations (1,660 / 100,000)</span>
                <span className="font-bold text-zinc-900">1.6%</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-zinc-200">
                <div className="bg-zinc-900 h-full w-[1.6%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-600 mb-1">
                <span>Active AI Agents (4 / 15)</span>
                <span className="font-bold text-zinc-900">26.6%</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-zinc-200">
                <div className="bg-zinc-900 h-full w-[26.6%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
