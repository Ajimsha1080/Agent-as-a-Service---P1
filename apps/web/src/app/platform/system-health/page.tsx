'use client';
import React from 'react';
import { Activity, Server, Database, Cpu } from 'lucide-react';

export default function PlatformSystemHealthPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Platform System Health & Cluster Status</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time health monitoring of FastAPI gateway nodes, pgvector partitions, and Redis cache clusters.</p>
        </div>

        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/20 flex items-center gap-1.5 font-mono">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> 100% Uptime (99.99% SLA)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Server className="w-4 h-4 text-zinc-400" />
            <h3 className="font-bold text-zinc-100 text-xs">Agent Worker Pool</h3>
          </div>
          <p className="text-2xl font-bold text-zinc-100">12 Workers</p>
          <p className="text-[11px] text-emerald-400">CPU Usage: 24% • RAM: 4.2 GB / 32 GB</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Database className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-zinc-100 text-xs">pgvector Partition</h3>
          </div>
          <p className="text-2xl font-bold text-zinc-100">42 Schemas</p>
          <p className="text-[11px] text-emerald-400">Query Latency: 12ms • Healthy</p>
        </div>

        <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Cpu className="w-4 h-4 text-zinc-400" />
            <h3 className="font-bold text-zinc-100 text-xs">Redis Cache</h3>
          </div>
          <p className="text-2xl font-bold text-zinc-100">100% Hit Rate</p>
          <p className="text-[11px] text-emerald-400">Memory: 320 MB / 4 GB</p>
        </div>
      </div>
    </div>
  );
}
