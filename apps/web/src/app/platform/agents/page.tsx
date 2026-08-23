'use client';
import React from 'react';
import { Bot } from 'lucide-react';

export default function PlatformAgentsPage() {
  const agentRuntimes = [
    { id: 'agt_concierge_01', name: 'Azure Palm Concierge', org: 'Azure Group', type: 'CONCIERGE', model: 'sarvam-2b', status: 'ACTIVE', node: 'node-us-east-1a' },
    { id: 'agt_booking_02', name: 'Azure Palm Booking Agent', org: 'Azure Group', type: 'BOOKING', model: 'sarvam-2b', status: 'ACTIVE', node: 'node-us-east-1b' },
    { id: 'agt_voice_03', name: 'Azure Palm Voice Agent', org: 'Azure Group', type: 'VOICE', model: 'sarvam-2b', status: 'ACTIVE', node: 'node-us-east-1a' },
    { id: 'agt_paris_concierge', name: 'Grand Palace Concierge', org: 'Grand Palace', type: 'CONCIERGE', model: 'sarvam-2b', status: 'ACTIVE', node: 'node-eu-west-1a' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Platform Agent Runtimes</h1>
        <p className="text-xs text-zinc-500 mt-1">All 312 stateful LangGraph agent runtimes executed on the Shared Multi-Tenant Cluster.</p>
      </div>

      <div className="yc-card p-6 space-y-4">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="pb-3">AGENT RUNTIME NAME</th>
              <th className="pb-3">ORGANIZATION</th>
              <th className="pb-3">TYPE</th>
              <th className="pb-3">MODEL</th>
              <th className="pb-3">NODE CLUSTER</th>
              <th className="pb-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 text-zinc-800">
            {agentRuntimes.map(a => (
              <tr key={a.id}>
                <td className="py-3 font-bold text-zinc-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-zinc-600" /> {a.name}
                </td>
                <td className="text-zinc-700 font-semibold">{a.org}</td>
                <td><span className="yc-badge">{a.type}</span></td>
                <td className="text-zinc-900 font-bold">{a.model}</td>
                <td className="text-zinc-500">{a.node}</td>
                <td><span className="yc-badge-emerald">● {a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
