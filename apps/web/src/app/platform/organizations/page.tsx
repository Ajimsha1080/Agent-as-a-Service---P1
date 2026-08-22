'use client';
import React, { useState } from 'react';
import { Building2, Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function PlatformOrganizationsPage() {
  const [orgs] = useState([
    { id: 'org_azure_group', name: 'Azure Hospitality Group', slug: 'azure-hospitality-group', plan: 'BUSINESS', mrr: '$499/mo', properties: 2, agents: 4, status: 'ACTIVE' },
    { id: 'org_grand_palace', name: 'Grand Palace Hotels & Resorts', slug: 'grand-palace-hotels', plan: 'ENTERPRISE', mrr: '$2,499/mo', properties: 14, agents: 38, status: 'ACTIVE' },
    { id: 'org_coastal_hostels', name: 'Coastal Paradise Hostels', slug: 'coastal-paradise-hostels', plan: 'STARTER', mrr: '$149/mo', properties: 1, agents: 2, status: 'ACTIVE' }
  ]);

  const [search, setSearch] = useState('');
  const filtered = orgs.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Tenant Organizations Registry</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage paying SaaS customer accounts, subscriptions, properties count, and status.</p>
        </div>

        <button className="px-3.5 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Provision Organization
        </button>
      </div>

      <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider font-mono">Customer Accounts ({filtered.length})</h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter organizations..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none font-mono"
            />
          </div>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-800/80">
            <tr>
              <th className="pb-3">ORGANIZATION NAME</th>
              <th className="pb-3">PLAN</th>
              <th className="pb-3">PROPERTIES</th>
              <th className="pb-3">ACTIVE AGENTS</th>
              <th className="pb-3">MRR</th>
              <th className="pb-3">STATUS</th>
              <th className="pb-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {filtered.map(o => (
              <tr key={o.id}>
                <td className="py-3 font-medium text-zinc-100">
                  {o.name}
                  <span className="block text-[10px] text-zinc-500">{o.slug}</span>
                </td>
                <td>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    o.plan === 'ENTERPRISE' ? 'bg-purple-500/10 text-purple-300' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {o.plan}
                  </span>
                </td>
                <td>{o.properties} Properties</td>
                <td className="font-bold text-zinc-100">{o.agents} Active</td>
                <td className="font-bold text-purple-300">{o.mrr}</td>
                <td><span className="text-emerald-400 font-bold">● {o.status}</span></td>
                <td className="text-right space-x-2">
                  <button className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
