'use client';
import React from 'react';
import { Cpu, Zap, TrendingUp, DollarSign } from 'lucide-react';

export default function AppUsagePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Organization Usage Metering</h1>
        <p className="text-sm text-slate-400">Track token consumption, voice gateway minutes, and dynamic tool calls per property and agent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total LLM Tokens Consumed</span>
            <Cpu className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">482,000 Tokens</div>
          <p className="text-xs text-teal-400 mt-2">Period: August 2026</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Voice Minutes Consumed</span>
            <Zap className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">142 Mins</div>
          <p className="text-xs text-slate-400 mt-2">Whisper STT + ElevenLabs TTS</p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Estimated AI Cost</span>
            <DollarSign className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">$48.90</div>
          <p className="text-xs text-slate-400 mt-2">Included in Business Plan</p>
        </div>
      </div>
    </div>
  );
}
