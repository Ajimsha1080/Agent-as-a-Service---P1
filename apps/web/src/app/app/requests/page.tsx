'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, CheckCircle2, Clock, AlertTriangle, Plus, Filter, UserCheck } from 'lucide-react';

export default function HostelRequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: 'MNT-10492',
      resident: 'Alex Johnson',
      room: '304 - Block A',
      category: 'Electrical & Fan',
      description: 'Room ceiling fan is making loud noise and not rotating at full speed.',
      status: 'IN_PROGRESS',
      assigned: 'John Doe (Electrical Staff)',
      date: 'Today, 10:15 AM',
      urgency: 'NORMAL'
    },
    {
      id: 'MNT-10493',
      resident: 'Rahul Verma',
      room: '212 - Block B',
      category: 'Plumbing & Tap',
      description: 'Bathroom tap is leaking continuously in Room 212.',
      status: 'DISPATCHED',
      assigned: 'Suresh Kumar (Plumbing Staff)',
      date: 'Today, 11:30 AM',
      urgency: 'HIGH'
    },
    {
      id: 'MNT-10488',
      resident: 'Priya Sharma',
      room: '105 - Block A',
      category: 'Wi-Fi & Internet',
      description: 'Wi-Fi access point in corridor 1st floor has weak signal.',
      status: 'RESOLVED',
      assigned: 'IT Network Team',
      date: 'Yesterday, 04:00 PM',
      urgency: 'NORMAL'
    }
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Maintenance & Service Requests</h1>
          <p className="text-xs text-zinc-500 mt-1">Track and manage resident maintenance requests, complaints, and staff assignments.</p>
        </div>

        <span className="yc-badge-emerald font-mono text-xs px-3.5 py-1 font-semibold">
          ● {requests.filter(r => r.status !== 'RESOLVED').length} Active Open Requests
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">TOTAL REQUESTS</span>
          <div className="text-2xl font-bold text-zinc-900 font-mono">{requests.length} Tickets</div>
          <p className="text-[11px] text-zinc-500 mt-1">Logged by residents & AI tool</p>
        </div>
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">IN PROGRESS</span>
          <div className="text-2xl font-bold text-amber-600 font-mono">
            {requests.filter(r => r.status === 'IN_PROGRESS' || r.status === 'DISPATCHED').length} Tickets
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Assigned to maintenance staff</p>
        </div>
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">RESOLVED</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {requests.filter(r => r.status === 'RESOLVED').length} Tickets
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Completed & verified</p>
        </div>
      </div>

      {/* Request Table */}
      <div className="yc-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-zinc-900">All Resident Requests</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="text-zinc-500 border-b border-zinc-200 font-mono text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">TICKET ID</th>
                <th className="pb-3 font-semibold">RESIDENT & ROOM</th>
                <th className="pb-3 font-semibold">ISSUE CATEGORY</th>
                <th className="pb-3 font-semibold">ASSIGNED STAFF</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {requests.map(r => (
                <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-4 font-mono font-bold text-zinc-900">{r.id}</td>
                  <td>
                    <div className="font-bold text-zinc-900">{r.resident}</div>
                    <div className="text-[11px] text-zinc-500">{r.room}</div>
                  </td>
                  <td>
                    <div className="font-medium text-zinc-900">{r.category}</div>
                    <div className="text-[11px] text-zinc-500 max-w-xs truncate">{r.description}</div>
                  </td>
                  <td className="font-mono text-zinc-700">{r.assigned}</td>
                  <td>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold ${
                      r.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      r.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-zinc-100 text-zinc-800 border border-zinc-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    {r.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => updateStatus(r.id, 'RESOLVED')}
                        className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors"
                      >
                        Mark Resolved ✓
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-xs">Completed</span>
                    )}
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
