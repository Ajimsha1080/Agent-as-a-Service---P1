'use client';
import React from 'react';
import { Building2, Bot, MessageSquare, DollarSign, Cpu, Activity, ShieldAlert, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function PlatformDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Operator Banner Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 text-[10px] font-mono font-semibold uppercase tracking-wider mb-2">
            <span>⚡ Platform Operator Control Plane</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Platform Owner Telemetry</h1>
          <p className="text-xs text-zinc-500 mt-1">Global SaaS ARR/MRR metrics, AI infrastructure cost engine, and multi-tenant cluster health.</p>
        </div>

        <div className="flex gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700">Cluster: us-east-1-prod</span>
          <span className="yc-badge-emerald">● SLA 99.99%</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total MRR / ARR</span>
            <DollarSign className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$48,500</div>
          <p className="text-xs text-emerald-600 mt-1.5 font-mono">ARR: $582,000 (+24% YoY)</p>
        </div>

        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Organizations</span>
            <Building2 className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">42</div>
          <p className="text-xs text-zinc-500 mt-1.5">128 Properties Deployed</p>
        </div>

        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Agent Runtimes</span>
            <Bot className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">312</div>
          <p className="text-xs text-emerald-600 mt-1.5">● Shared Cluster Healthy</p>
        </div>

        <div className="yc-card p-5">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Global Infra Cost</span>
            <Cpu className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 font-mono">$4,280</div>
          <p className="text-xs text-zinc-500 mt-1.5 font-mono">88.8% Gross Margin</p>
        </div>
      </div>

      {/* Telemetry Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="yc-card p-6 space-y-4">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Top SaaS Customers & Revenue</h3>
          <table className="w-full text-left text-xs font-mono">
            <thead className="text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="pb-3">ORGANIZATION</th>
                <th className="pb-3">PLAN</th>
                <th className="pb-3">PROPERTIES</th>
                <th className="pb-3">MRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              <tr>
                <td className="py-3 font-bold text-zinc-900">Grand Palace Hotels</td>
                <td><span className="yc-badge">ENTERPRISE</span></td>
                <td>14 Properties</td>
                <td className="text-zinc-900 font-bold">$2,499/mo</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-zinc-900">Azure Hospitality Group</td>
                <td><span className="yc-badge">BUSINESS</span></td>
                <td>2 Properties</td>
                <td className="text-zinc-900 font-bold">$499/mo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="yc-card p-6 space-y-4">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" /> Platform Infrastructure Logs
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-800">PostgreSQL pgvector Reindexed</p>
                <p className="text-[10px] text-zinc-500">Tenant metadata partitions reindexed across 42 schemas.</p>
              </div>
              <span className="text-[10px] text-zinc-400">10m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
