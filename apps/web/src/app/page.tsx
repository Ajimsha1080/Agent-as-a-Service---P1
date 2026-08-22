'use client';
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-teal-500/20">
            H
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Hospitality Agent Cloud
            </h1>
            <p className="text-xs text-teal-400 font-medium">Enterprise Agent-as-a-Service (AaaS)</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
          <a href="#architecture" className="hover:text-teal-400 transition-colors">Architecture</a>
          <a href="#pricing" className="hover:text-teal-400 transition-colors">Pricing</a>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold shadow-lg shadow-teal-500/20 transition-all">
            Launch Platform Dashboard →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-8">
          <span>✨ Enterprise Hospitality AI Runtimes</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
          Deploy AI Hospitality Agents in Minutes.{' '}
          <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Zero Infrastructure Code.
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
          The all-in-one Agent-as-a-Service SaaS platform for resorts, hotels, hostels, and vacation rentals. Fully managed RAG, dynamic live data, voice receptionists, and WhatsApp integrations with enterprise tenant isolation.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link href="/dashboard/agents/builder" className="px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-0.5">
            Build Your First Agent No-Code
          </Link>
          <Link href="/dashboard/agents/playground" className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-all">
            Try Live Agent Playground
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-2xl mb-6">
              🏨
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Multi-Tenant AaaS Architecture</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Create multiple organizations, properties, and specialized agents (Concierge, Booking, Voice, Support) with strict PostgreSQL RLS data isolation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-2xl mb-6">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Data Routing</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dynamic tool routing for live pool status, current room pricing, today's activities, and instant property announcements to eliminate hallucinations.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-2xl mb-6">
              🎙️
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Voice & WhatsApp Channels</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Multi-lingual browser voice, AI phone receptionists, WhatsApp webhooks, and embeddable web chat widgets connected to a unified agent runtime.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-8 text-center text-xs text-slate-500">
        © 2026 Hospitality Agent Cloud Inc. Enterprise Agent-as-a-Service Platform. All rights reserved.
      </footer>
    </div>
  );
}
