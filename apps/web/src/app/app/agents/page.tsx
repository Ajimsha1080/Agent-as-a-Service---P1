'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, Play, CheckCircle2, Code, Sparkles, Copy, Check } from 'lucide-react';

export default function AppAgentsPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState(false);

  // Simple configuration state
  const [agentName, setAgentName] = useState('Hostel AI Agent');
  const [description, setDescription] = useState('Autonomous Hostel AI Assistant for resident questions, mess menu, notices, and room maintenance.');
  const [hostelName, setHostelName] = useState('Azure Palm Hostel & Campus Residence');

  const [enabledTools] = useState([
    { id: 't1', name: 'Food Menu & Timings', desc: 'Queries today\'s mess menu and meal schedule', enabled: true },
    { id: 't2', name: 'Notices & Announcements', desc: 'Fetches active hostel gate and event notices', enabled: true },
    { id: 't3', name: 'Hostel Facilities', desc: 'Checks laundry, gym, common room status', enabled: true },
    { id: 't4', name: 'Room & Availability', desc: 'Provides room types and occupancy info', enabled: true },
    { id: 't5', name: 'Maintenance Requests', desc: 'Creates maintenance tickets for room issues', enabled: true },
    { id: 't6', name: 'Resident Information', desc: 'Verifies resident room allocations privately', enabled: true },
    { id: 't7', name: 'Staff Escalation', desc: 'Hands off complex issues to hostel warden', enabled: true }
  ]);

  const embedSnippet = `<script 
  src="http://localhost:3001/widget.js" 
  data-agent-id="agt_hostel_01" 
  data-property="Azure Palm Hostel">
</script>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">AI Assistant</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage your single Hostel AI Assistant, knowledge sources, connected live tools, and embed snippet.</p>
        </div>

        <span className="yc-badge-emerald font-mono text-xs px-3.5 py-1 font-semibold">
          ● Hostel AI Agent Active & Deployed
        </span>
      </div>

      {/* Main Agent Identity Card */}
      <div className="yc-card p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-bold text-2xl shadow-xs">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">{agentName}</h2>
                <span className="yc-badge-emerald font-mono text-[10px]">● ACTIVE</span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
            </div>
          </div>

          <Link href="/guest/agt_hostel_01" className="yc-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 self-start md:self-auto">
            Test Resident View ➔
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">HOSTEL PROPERTY</span>
            <span className="text-zinc-900 font-bold">{hostelName}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">KNOWLEDGE STATUS</span>
            <span className="text-emerald-700 font-bold">4 Docs Indexed (RAG)</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">CONNECTED LIVE TOOLS</span>
            <span className="text-zinc-900 font-bold">7 Active (Real-Time DB)</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">DEPLOYMENT</span>
            <span className="text-emerald-600 font-bold">Web Chat & Indic Voice</span>
          </div>
        </div>
      </div>

      {/* Simplified 3-Step Configuration Wizard */}
      <div className="yc-card p-6 space-y-6">
        <h2 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-3">
          Simplified Assistant Setup
        </h2>

        {/* Wizard Step Selector Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex-1 p-3 rounded-xl border text-left transition-all ${
              activeStep === 1 ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <div className="text-[10px] font-mono uppercase font-semibold opacity-70">STEP 1</div>
            <div className="text-xs font-bold mt-0.5">Basic Information</div>
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`flex-1 p-3 rounded-xl border text-left transition-all ${
              activeStep === 2 ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <div className="text-[10px] font-mono uppercase font-semibold opacity-70">STEP 2</div>
            <div className="text-xs font-bold mt-0.5">Knowledge Sources</div>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`flex-1 p-3 rounded-xl border text-left transition-all ${
              activeStep === 3 ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <div className="text-[10px] font-mono uppercase font-semibold opacity-70">STEP 3</div>
            <div className="text-xs font-bold mt-0.5">Live Tools & Deploy</div>
          </button>
        </div>

        {/* STEP 1 CONTENT */}
        {activeStep === 1 && (
          <div className="space-y-4 max-w-lg text-xs font-sans">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Agent Name</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Hostel Name</label>
              <input
                type="text"
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
              />
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT */}
        {activeStep === 2 && (
          <div className="space-y-4 text-xs font-sans">
            <p className="text-zinc-600">The AI assistant uses your uploaded documents for answers about hostel rules, visitor policies, and FAQs.</p>

            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
              <div className="font-bold text-zinc-900">Indexed Knowledge Documents (4)</div>
              <ul className="space-y-1 text-zinc-600 list-disc pl-4 font-mono text-[11px]">
                <li>Azure Hostel Resident Rules & Visitor Policy 2026.pdf</li>
                <li>Frequently Asked Questions (Hostel FAQs).txt</li>
                <li>General Hostel Facilities & Contact Directory.pdf</li>
                <li>Hostel Official Website (https://azurehostel.edu/info)</li>
              </ul>
            </div>

            <Link href="/app/knowledge" className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-xl font-semibold text-xs hover:bg-black">
              Manage Knowledge Base ➔
            </Link>
          </div>
        )}

        {/* STEP 3 CONTENT */}
        {activeStep === 3 && (
          <div className="space-y-6 text-xs font-sans">
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Enabled Operational Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enabledTools.map(t => (
                  <div key={t.id} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-zinc-900">{t.name}</div>
                      <div className="text-[11px] text-zinc-500">{t.desc}</div>
                    </div>
                    <span className="yc-badge-emerald text-[10px]">● ENABLED</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Embed HTML Code Snippet */}
            <div className="p-5 bg-zinc-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Code className="w-4 h-4" /> Deploy Widget Snippet
                </span>
                <button
                  onClick={copyEmbedCode}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="font-mono text-[11px] text-zinc-300 overflow-x-auto p-3 bg-black/50 rounded-xl border border-zinc-800">
                {embedSnippet}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
