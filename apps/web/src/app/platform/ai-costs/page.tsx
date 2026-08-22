'use client';
import React from 'react';
import { Cpu, DollarSign, Zap } from 'lucide-react';

export default function PlatformAICostsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold text-zinc-100">AI Infrastructure & Provider Cost Engine</h1>
        <p className="text-xs text-zinc-400 mt-1">Track raw LLM token consumption, Whisper STT/ElevenLabs TTS voice costs, and gross margins across model providers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Monthly LLM Spend</span>
            <Cpu className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">$4,280.45</div>
          <p className="text-xs text-emerald-400 mt-1.5 font-mono">Gross Margin: 88.8%</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Voice STT / TTS Spend</span>
            <Zap className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">$856.10</div>
          <p className="text-xs text-zinc-400 mt-1.5">42,800 Voice Mins</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Cost per 1k Conversations</span>
            <DollarSign className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">$2.89</div>
          <p className="text-xs text-zinc-400 mt-1.5 font-mono">LiteLLM Managed Engine</p>
        </div>
      </div>

      <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-4">
        <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider font-mono">Provider Breakdown</h3>
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-800/80">
            <tr>
              <th className="pb-3">PROVIDER</th>
              <th className="pb-3">MODELS USED</th>
              <th className="pb-3">TOKENS / MINS</th>
              <th className="pb-3">TOTAL SPEND</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            <tr>
              <td className="py-3 font-medium text-zinc-100">OpenAI</td>
              <td>gpt-4o, gpt-4o-mini</td>
              <td>18.4M tokens</td>
              <td className="text-purple-300 font-bold">$2,840.00</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-zinc-100">Anthropic</td>
              <td>claude-3-5-sonnet</td>
              <td>4.2M tokens</td>
              <td className="text-purple-300 font-bold">$1,440.45</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-zinc-100">ElevenLabs</td>
              <td>Multilingual v2 TTS</td>
              <td>42,800 mins</td>
              <td className="text-purple-300 font-bold">$856.10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
