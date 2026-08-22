'use client';
import React from 'react';
import { Settings, Save, Shield, Globe } from 'lucide-react';

export default function AppSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Organization Settings</h1>
        <p className="text-sm text-slate-400">Manage hospitality group branding, custom domain, default currency, and staff permissions.</p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-teal-400" /> Branding & Custom Domain
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Organization Name</label>
            <input 
              type="text" 
              value="Azure Hospitality Group" 
              readOnly
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Custom Domain (White-Label Tier)</label>
            <input 
              type="text" 
              value="concierge.azurepalmresort.com" 
              readOnly
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono"
            />
          </div>
        </div>

        <button className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Organization Settings
        </button>
      </div>
    </div>
  );
}
