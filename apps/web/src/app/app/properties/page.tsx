'use client';
import React from 'react';
import Link from 'next/link';
import { Building2, Plus, Bot, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AppPropertiesPage() {
  const properties = [
    {
      id: 'prop_azure_palm_resort',
      name: 'Azure Palm Resort & Spa',
      type: 'Luxury Eco Resort',
      location: 'Coastal Beach Road, Marari, Kerala, India',
      timezone: 'Asia/Kolkata (IST)',
      currency: 'USD ($)',
      agents_count: 3,
      rooms_count: 48,
      status: 'ACTIVE'
    },
    {
      id: 'prop_azure_palm_hostel',
      name: 'Azure Palm Hostel',
      type: 'Boutique Heritage Hostel',
      location: 'Fort Kochi Heritage Zone, Kerala, India',
      timezone: 'Asia/Kolkata (IST)',
      currency: 'USD ($)',
      agents_count: 1,
      rooms_count: 24,
      status: 'ACTIVE'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Properties Management</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure resorts, hotels, hostels, and vacation properties bound to your organization.</p>
        </div>

        <button className="px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map(p => (
          <div key={p.id} className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono border border-zinc-700">
                  {p.type}
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {p.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-zinc-100 mb-1">{p.name}</h2>
              <p className="text-xs text-zinc-400 flex items-center gap-1 mb-5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {p.location}
              </p>

              <div className="grid grid-cols-2 gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">DEPLOYED AGENTS</span>
                  <span className="text-zinc-100 font-bold text-xs flex items-center gap-1.5 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-zinc-400" /> {p.agents_count} Active
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-semibold">TOTAL ROOMS / BEDS</span>
                  <span className="text-zinc-100 font-bold text-xs flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" /> {p.rooms_count} Units
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-800/80 pt-3 flex items-center justify-between text-xs">
              <span className="text-zinc-500 text-[11px] font-mono">{p.timezone}</span>
              <Link href="/app/agents/create" className="text-zinc-200 hover:text-white font-medium flex items-center gap-1 text-xs">
                + Create Agent <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
