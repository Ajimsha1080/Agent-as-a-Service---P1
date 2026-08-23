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
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Live Property Operations Status</h1>
          <p className="text-xs text-zinc-500 mt-1">Staff console to publish instant status changes for pool, spa, dining, and facilities.</p>
        </div>

        <button className="yc-btn-primary flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> + Publish Status Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facilities.map((f, idx) => (
          <div key={idx} className="yc-card p-5 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-900">{f.name}</h3>
              <p className="text-xs text-zinc-600">{f.hours}</p>
              <p className="text-[10px] text-zinc-400 font-mono">Updated {f.updated}</p>
            </div>

            <span className={`px-3 py-1 rounded text-xs font-bold font-mono ${
              f.status === 'OPEN' ? 'yc-badge-emerald' :
              f.status === 'LIMITED' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              'bg-red-100 text-red-800 border border-red-200'
            }`}>
              ● {f.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
