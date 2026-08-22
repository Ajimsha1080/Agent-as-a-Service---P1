'use client';
import React from 'react';

export default function PlatformPropertiesPage() {
  const globalProperties = [
    { id: '1', name: 'Azure Palm Resort & Spa', org: 'Azure Hospitality Group', type: 'Resort', location: 'Kerala, India', agents: 3 },
    { id: '2', name: 'Azure Palm Hostel', org: 'Azure Hospitality Group', type: 'Hostel', location: 'Fort Kochi, India', agents: 1 },
    { id: '3', name: 'Grand Palace Paris', org: 'Grand Palace Hotels', type: 'Hotel', location: 'Paris, France', agents: 8 },
    { id: '4', name: 'Grand Palace Tokyo', org: 'Grand Palace Hotels', type: 'Hotel', location: 'Tokyo, Japan', agents: 12 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold text-zinc-100">Global Properties Registry</h1>
        <p className="text-xs text-zinc-400 mt-1">All 128 registered resorts, hotels, and hostels across 42 tenant accounts.</p>
      </div>

      <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-4">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-800/80">
            <tr>
              <th className="pb-3">PROPERTY NAME</th>
              <th className="pb-3">ORGANIZATION</th>
              <th className="pb-3">TYPE</th>
              <th className="pb-3">LOCATION</th>
              <th className="pb-3">ACTIVE AGENTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {globalProperties.map(p => (
              <tr key={p.id}>
                <td className="py-3 font-medium text-zinc-100">{p.name}</td>
                <td className="text-purple-300">{p.org}</td>
                <td><span className="px-2 py-0.5 bg-zinc-800 rounded text-zinc-300 text-[10px]">{p.type}</span></td>
                <td>{p.location}</td>
                <td className="font-bold text-zinc-100">{p.agents} Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
