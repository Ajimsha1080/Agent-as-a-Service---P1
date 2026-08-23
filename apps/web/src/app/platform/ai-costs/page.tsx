'use client';
import React from 'react';
import { Cpu, DollarSign, Zap } from 'lucide-react';

export default function PlatformAICostsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-bold text-zinc-900">AI Infrastructure & Provider Cost Engine</h1>
        <p className="text-xs text-zinc-500 mt-1">Track raw LLM token consumption, Sarvam AI Indic voice costs, and gross margins across model providers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Monthly LLM Spend</span>
            <Cpu className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$4,280.45</div>
          <p className="text-xs text-emerald-600 mt-1.5 font-mono font-semibold">Gross Margin: 88.8%</p>
        </div>

        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Voice STT / TTS Spend</span>
            <Zap className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$856.10</div>
          <p className="text-xs text-zinc-500 mt-1.5 font-mono">42,800 Voice Mins</p>
        </div>

        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2 font-mono">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Cost per 1k Conversations</span>
            <DollarSign className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$2.89</div>
          <p className="text-xs text-zinc-500 mt-1.5 font-mono">Sarvam AI + LiteLLM</p>
        </div>
      </div>

      <div className="yc-card p-6 space-y-4">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Provider Breakdown</h3>
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="pb-3">PROVIDER</th>
              <th className="pb-3">MODELS USED</th>
              <th className="pb-3">TOKENS / MINS</th>
              <th className="pb-3">TOTAL SPEND</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 text-zinc-800">
            <tr>
              <td className="py-3 font-bold text-zinc-900">Sarvam AI</td>
              <td>sarvam-2b (Indic LLM & STT/TTS)</td>
              <td>12.5M tokens / 28.5k mins</td>
              <td className="text-zinc-900 font-bold">$1,240.00</td>
            </tr>
            <tr>
              <td className="py-3 font-bold text-zinc-900">OpenAI</td>
              <td>gpt-4o, gpt-4o-mini</td>
              <td>18.4M tokens</td>
              <td className="text-zinc-900 font-bold">$2,840.00</td>
            </tr>
            <tr>
              <td className="py-3 font-bold text-zinc-900">Anthropic</td>
              <td>claude-3-5-sonnet</td>
              <td>4.2M tokens</td>
              <td className="text-zinc-900 font-bold">$1,440.45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
