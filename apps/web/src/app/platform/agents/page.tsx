'use client';
import React from 'react';
import { Bot } from 'lucide-react';

export default function PlatformAgentsPage() {
  const agentRuntimes = [
    { id: 'agt_concierge_01', name: 'Azure Palm Concierge', org: 'Azure Group', type: 'CONCIERGE', model: 'gpt-4o-mini', status: 'ACTIVE', node: 'node-us-east-1a' },
    { id: 'agt_booking_02', name: 'Azure Palm Booking Agent', org: 'Azure Group', type: 'BOOKING', model: 'gpt-4o-mini', status: 'ACTIVE', node: 'node-us-east-1b' },
    { id: 'agt_voice_03', name: 'Azure Palm Voice Agent', org: 'Azure Group', type: 'VOICE', model: 'gpt-4o-mini', status: 'ACTIVE', node: 'node-us-east-1a' },
    { id: 'agt_paris_concierge', name: 'Grand Palace Concierge', org: 'Grand Palace', type: 'CONCIERGE', model: 'gpt-4o-mini', status: 'ACTIVE', node: 'node-eu-west-1a' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold text-zinc-100">Platform Agent Runtimes</h1>
        <p className="text-xs text-zinc-400 mt-1">All 312 stateful LangGraph agent runtimes executed on the Shared Multi-Tenant Cluster.</p>
      </div>

      <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-4">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-800/80">
            <tr>
              <th className="pb-3">AGENT RUNTIME NAME</th>
              <th className="pb-3">ORGANIZATION</th>
              <th className="pb-3">TYPE</th>
              <th className="pb-3">MODEL</th>
              <th className="pb-3">NODE CLUSTER</th>
              <th className="pb-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {agentRuntimes.map(a => (
              <tr key={a.id}>
                <td className="py-3 font-medium text-zinc-100 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" /> {a.name}
                </td>
                <td className="text-purple-300">{a.org}</td>
                <td><span className="px-2 py-0.5 bg-zinc-800 rounded text-zinc-300 text-[10px]">{a.type}</span></td>
                <td>{a.model}</td>
                <td className="text-zinc-500">{a.node}</td>
                <td><span className="text-emerald-400 font-bold">● {a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
