'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, Plus, Play, Pause, CheckCircle2 } from 'lucide-react';

export default function AppAgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgents() {
      const predefinedAgentsList = [
        { id: 'agt_concierge_01', name: 'Azure Palm Concierge', agent_type: 'CONCIERGE', status: 'ACTIVE', description: 'Predefined head AI concierge assisting guests with amenities, pool hours, dining, and reservations.' },
        { id: 'agt_booking_02', name: 'Room Vacancy & Reservation Agent', agent_type: 'BOOKING', status: 'ACTIVE', description: 'Predefined booking agent for checking room rates, availability, and placing guest reservations.' },
        { id: 'agt_dining_03', name: 'Dining & Spa Experience Agent', agent_type: 'DINING', status: 'ACTIVE', description: 'Predefined dining assistant for restaurant menus, table reservations, and Ayurvedic spa bookings.' },
        { id: 'agt_support_04', name: 'Front Desk Escalation Agent', agent_type: 'SUPPORT', status: 'ACTIVE', description: 'Predefined support agent handling guest complaints and escalating to live front desk staff.' }
      ];
      try {
        const res = await fetch('http://localhost:8000/api/v1/agents?organization_id=org_azure_group');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAgents(data);
          } else {
            setAgents(predefinedAgentsList);
          }
        }
      } catch (err) {
        console.error("Error fetching live agents:", err);
        setAgents(predefinedAgentsList);
      } finally {
        setLoading(false);
      }
    }
    loadAgents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Predefined Hospitality AI Agents</h1>
          <p className="text-xs text-zinc-500 mt-1">Managed enterprise AI agent workforce ready for immediate property deployment.</p>
        </div>

        <span className="yc-badge-emerald font-mono text-xs px-3 py-1 font-semibold">
          ● 4 Predefined Enterprise Agents Ready
        </span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-zinc-400">Loading AI agents from database...</div>
      ) : agents.length === 0 ? (
        <div className="py-12 text-center text-xs text-zinc-500">No active AI agents deployed yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="yc-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="yc-badge">
                    {agent.agent_type || 'CONCIERGE'}
                  </span>

                  <span className="yc-badge-emerald">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {agent.status || 'ACTIVE'}
                  </span>
                </div>

                <h2 className="text-base font-bold text-zinc-900 mb-1 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-zinc-600" /> {agent.name}
                </h2>
                <p className="text-xs text-zinc-500 mb-5">{agent.property_id || agent.property || 'Azure Palm Resort'} • Model: sarvam-2b</p>

                <div className="grid grid-cols-3 gap-3 bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-xs text-center font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-semibold">AGENT ID</span>
                    <span className="text-zinc-900 font-bold font-mono">{agent.id}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-semibold">TYPE</span>
                    <span className="text-emerald-700 font-bold">{agent.agent_type || 'CONCIERGE'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-semibold">TOOLS</span>
                    <span className="text-zinc-900 font-bold">6 Enabled</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-200 pt-3 flex items-center justify-between text-xs">
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] rounded border border-zinc-200">
                    Web Widget
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] rounded border border-zinc-200">
                    Voice
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] rounded border border-zinc-200">
                    WhatsApp
                  </span>
                </div>
                <Link href={`/guest/${agent.id}`} className="text-zinc-900 hover:text-black font-semibold flex items-center gap-1 text-xs">
                  Preview Guest View ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
