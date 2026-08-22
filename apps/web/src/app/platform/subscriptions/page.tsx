'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PlatformSubscriptionsPage() {
  const plans = [
    { name: 'STARTER', price: '$149/mo', agents: 2, properties: 1, convs: '5,000/mo', voice: 'Disabled' },
    { name: 'PROFESSIONAL', price: '$299/mo', agents: 5, properties: 2, convs: '20,000/mo', voice: 'Enabled' },
    { name: 'BUSINESS', price: '$499/mo', agents: 15, properties: 5, convs: '100,000/mo', voice: 'Enabled' },
    { name: 'ENTERPRISE', price: '$2,499/mo', agents: 'Unlimited', properties: 'Unlimited', convs: 'Custom SLA', voice: 'Dedicated VPC' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold text-zinc-100">SaaS Subscription Plans & Entitlements</h1>
        <p className="text-xs text-zinc-400 mt-1">Configure global subscription tiers, conversation caps, agent limits, and pricing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {plans.map(p => (
          <div key={p.name} className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 font-bold rounded text-[10px] font-mono">
                {p.name}
              </span>
              <h3 className="text-2xl font-bold text-zinc-100 mt-4">{p.price}</h3>
              <ul className="mt-5 space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Max {p.agents} Agents</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Max {p.properties} Properties</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> {p.convs} Conversations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Voice Gateway: {p.voice}</li>
              </ul>
            </div>
            <button className="mt-6 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 rounded-lg border border-zinc-700 transition-colors">
              Edit Entitlements
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
