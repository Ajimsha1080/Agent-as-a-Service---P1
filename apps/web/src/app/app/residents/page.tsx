'use client';
import React, { useState } from 'react';
import { Users, Building2, Search, CheckCircle2, ShieldCheck, UserPlus } from 'lucide-react';

export default function HostelResidentsPage() {
  const [residents, setResidents] = useState([
    { id: 'res_101', name: 'Alex Johnson', room: '304', block: 'Block A', status: 'ACTIVE', fee_status: 'PAID', check_in: '2026-01-15', phone: '+1 (555) 234-5678' },
    { id: 'res_102', name: 'Rahul Verma', room: '212', block: 'Block B', status: 'ACTIVE', fee_status: 'PAID', check_in: '2026-01-20', phone: '+1 (555) 876-5432' },
    { id: 'res_103', name: 'Priya Sharma', room: '105', block: 'Block A', status: 'ACTIVE', fee_status: 'PAID', check_in: '2026-02-01', phone: '+1 (555) 345-6789' },
    { id: 'res_104', name: 'David Miller', room: '402', block: 'Block C', status: 'ACTIVE', fee_status: 'DUE', check_in: '2026-02-10', phone: '+1 (555) 901-2345' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.room.includes(searchTerm) ||
    r.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Hostel Resident Directory</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage hostel residents, room allocations, fee payment statuses, and contact profiles.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="yc-badge-emerald font-mono text-xs px-3.5 py-1 font-semibold">
            ● {residents.length} Registered Residents
          </span>
        </div>
      </div>

      {/* Search & Actions Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by resident name, room number, or block..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-800 focus:outline-none focus:border-zinc-400"
          />
        </div>
      </div>

      {/* Resident Directory Table */}
      <div className="yc-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-zinc-900">Resident Roster</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="text-zinc-500 border-b border-zinc-200 font-mono text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">RESIDENT NAME</th>
                <th className="pb-3 font-semibold">ROOM & BLOCK</th>
                <th className="pb-3 font-semibold">CHECK-IN DATE</th>
                <th className="pb-3 font-semibold">FEE STATUS</th>
                <th className="pb-3 font-semibold">CONTACT PHONE</th>
                <th className="pb-3 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {filteredResidents.map(r => (
                <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-3.5 font-bold text-zinc-900">{r.name}</td>
                  <td>
                    <span className="font-mono font-semibold text-zinc-900">Room {r.room}</span>
                    <span className="text-zinc-500 ml-1">({r.block})</span>
                  </td>
                  <td className="font-mono text-zinc-600">{r.check_in}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      r.fee_status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {r.fee_status}
                    </span>
                  </td>
                  <td className="font-mono text-zinc-600">{r.phone}</td>
                  <td className="text-right">
                    <span className="yc-badge-emerald text-[10px]">● {r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
