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
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Tenant Organizations Registry</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage paying SaaS customer accounts, subscriptions, properties count, and status.</p>
        </div>

        <button className="yc-btn-primary flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Provision Organization
        </button>
      </div>

      <div className="yc-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Customer Accounts ({filtered.length})</h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter organizations..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 focus:outline-none font-mono"
            />
          </div>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-200">
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
          <tbody className="divide-y divide-zinc-200 text-zinc-800">
            {filtered.map(o => (
              <tr key={o.id}>
                <td className="py-3 font-bold text-zinc-900">
                  {o.name}
                  <span className="block text-[10px] text-zinc-500 font-normal">{o.slug}</span>
                </td>
                <td>
                  <span className="yc-badge">
                    {o.plan}
                  </span>
                </td>
                <td>{o.properties} Properties</td>
                <td className="font-bold text-zinc-900">{o.agents} Active</td>
                <td className="font-bold text-zinc-900">{o.mrr}</td>
                <td><span className="yc-badge-emerald">● {o.status}</span></td>
                <td className="text-right space-x-2">
                  <button className="p-1 hover:bg-zinc-100 rounded text-zinc-500 hover:text-zinc-900"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:bg-zinc-100 rounded text-zinc-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
