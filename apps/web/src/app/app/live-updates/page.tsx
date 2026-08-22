'use client';
import React, { useState } from 'react';
import { Radio, Plus, CheckCircle2, Clock } from 'lucide-react';

export default function AppLiveUpdatesPage() {
  const [facilities, setFacilities] = useState([
    { name: 'Infinity Swimming Pool', status: 'OPEN', hours: '06:00 AM - 08:00 PM', updated: 'Today, 06:00 AM' },
    { name: 'Spice Route Fine Dining', status: 'OPEN', hours: '07:00 AM - 10:30 PM', updated: 'Today, 07:00 AM' },
    { name: 'Ayurvedic Wellness Spa', status: 'LIMITED', hours: '09:00 AM - 06:00 PM (By Appointment)', updated: 'Yesterday' },
    { name: 'Fitness Gym & Sauna', status: 'CLOSED', hours: 'Maintenance expected until 02:00 PM', updated: 'Today, 08:30 AM' }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Live Property Operations Status</h1>
          <p className="text-xs text-zinc-400 mt-1">Staff console to publish instant status changes for pool, spa, dining, and facilities.</p>
        </div>

        <button className="px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> + Publish Status Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facilities.map((f, idx) => (
          <div key={idx} className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-100">{f.name}</h3>
              <p className="text-xs text-zinc-400">{f.hours}</p>
              <p className="text-[10px] text-zinc-500 font-mono">Updated {f.updated}</p>
            </div>

            <span className={`px-3 py-1 rounded text-xs font-bold font-mono ${
              f.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              f.status === 'LIMITED' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
              'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              ● {f.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
