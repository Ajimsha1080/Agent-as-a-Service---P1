'use client';
import React from 'react';
import { Key, Save } from 'lucide-react';

export default function PlatformSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Platform Infrastructure Settings</h1>
        <p className="text-xs text-zinc-500 mt-1">Configure global LLM provider keys, Sarvam AI Indic STT/TTS defaults, and multi-tenant security policies.</p>
      </div>

      <div className="yc-card p-6 space-y-6">
        <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
          <Key className="w-4 h-4 text-zinc-700" /> Managed Provider API Keys (Sarvam AI + LiteLLM Layer)
        </h2>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-zinc-700 font-semibold mb-1">Sarvam AI API Key (Indic LLM & Voice)</label>
            <input 
              type="password" 
              value="sk_hfcj1u2e_ZWj7CUgfsUhYTdOs7oHL22My" 
              readOnly
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-zinc-900 font-bold"
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-semibold mb-1">OpenAI API Secret Key</label>
            <input 
              type="password" 
              value="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx" 
              readOnly
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-semibold mb-1">Anthropic API Secret Key</label>
            <input 
              type="password" 
              value="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx" 
              readOnly
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-zinc-900"
            />
          </div>
        </div>

        <button className="yc-btn-primary flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" /> Save Global Credentials
        </button>
      </div>
    </div>
  );
}
