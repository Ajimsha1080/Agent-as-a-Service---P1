'use client';
import React, { useState } from 'react';
import { Bot, CheckCircle2, ChevronRight, Rocket, FileText, RefreshCw } from 'lucide-react';

export default function AgentBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStepIndex, setDeployStepIndex] = useState(0);
  const [deploymentResult, setDeploymentResult] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Azure Palm Concierge',
    agent_type: 'Hospitality Concierge',
    property_id: 'Azure Palm Resort',
    description: 'Head AI concierge assisting guests with amenities, pool hours, dining, and reservations.',
    tone: 'Luxury',
    response_style: 'Balanced',
    primary_language: 'English',
    greeting: 'Welcome to Azure Palm Resort! How can I assist your stay today?',
    documents: [
      { name: 'Resort Guest Guide 2026.pdf', type: 'PDF', status: 'Ready', chunks: 24, updated: 'Today' },
      { name: 'Spice Route Restaurant Menu.pdf', type: 'PDF', status: 'Ready', chunks: 12, updated: 'Yesterday' }
    ],
    tools: [
      { id: 'availability', name: 'Room Availability', desc: 'Check real-time room vacancy and capacity', source: 'Booking System', enabled: true },
      { id: 'pricing', name: 'Current Room Pricing', desc: 'Retrieve dynamic room rates and offers', source: 'PMS Engine', enabled: true },
      { id: 'facilities', name: 'Facility Operational Status', desc: 'Check pool, spa, and gym hours in real-time', source: 'Staff Console', enabled: true },
      { id: 'human_support', name: 'Human Staff Handoff', desc: 'Escalate low confidence queries to front desk', source: 'Staff Inbox', enabled: true }
    ],
    channels: [
      { id: 'website', name: 'Website Chat Widget', status: 'Connected', desc: 'Embeddable JS snippet for hotel website' },
      { id: 'voice', name: 'Browser & Mobile Voice', status: 'Not configured', desc: 'Multi-lingual Whisper STT & ElevenLabs TTS' }
    ]
  });

  const steps = [
    '1. Basics', '2. Personality', '3. Knowledge', '4. Tools', 
    '5. Live Data', '6. Channels', '7. Guardrails', '8. Test', '9. Deploy'
  ];

  const deploySteps = [
    'Validating configuration...',
    'Preparing runtime environment...',
    'Registering agent identity...',
    'Connecting pgvector knowledge base...',
    'Enabling authorized tools...',
    'Activating stateful Shared Agent Runtime...'
  ];

  const handleDeployClick = () => {
    setIsDeploying(true);
    setDeployStepIndex(0);

    const interval = setInterval(() => {
      setDeployStepIndex(prev => {
        if (prev >= deploySteps.length - 1) {
          clearInterval(interval);
          setIsDeploying(false);
          setDeploymentResult({
            agent_id: 'agt_azure_palm_concierge_01',
            status: 'ACTIVE',
            api_endpoint: 'https://api.hospitalityagentcloud.com/v1/agents/agt_azure_palm_concierge_01/chat',
            widget_script: '<script src="https://cdn.hospitalityagentcloud.com/v1/widget.js" data-agent-id="agt_azure_palm_concierge_01" defer></script>'
          });
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };

  const toggleTool = (toolId: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.map(t => t.id === toolId ? { ...t, enabled: !t.enabled } : t)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans">
      <div className="border-b border-zinc-800/80 pb-5">
        <h1 className="text-2xl font-bold text-zinc-100">No-Code AI Agent Builder</h1>
        <p className="text-xs text-zinc-400 mt-1">Configure, test, and deploy a production hospitality agent in 9 simple steps.</p>
      </div>

      {/* Step Navigation Progress */}
      <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800/80 p-2 rounded-xl overflow-x-auto gap-1">
        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;
          return (
            <div 
              key={label} 
              onClick={() => setCurrentStep(stepNum)}
              className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm' : isDone ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{label}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
        {/* STEP 1: BASICS */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4 text-xs">
              <h2 className="text-sm font-bold text-zinc-100">STEP 1: Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1.5">Agent Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1.5">Agent Type</label>
                  <select 
                    value={formData.agent_type}
                    onChange={(e) => setFormData({...formData, agent_type: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                  >
                    <option value="Hospitality Concierge">Hospitality Concierge</option>
                    <option value="Booking Agent">Booking Agent</option>
                    <option value="Support Agent">Support Agent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1.5">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>

            {/* LIVE AGENT PREVIEW */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between text-xs">
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-3">AGENT IDENTITY PREVIEW</span>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 text-zinc-100 flex items-center justify-center font-bold text-lg">
                    🤖
                  </div>
                  <h3 className="font-bold text-zinc-100">{formData.name}</h3>
                  <p className="text-zinc-400 text-[11px]">{formData.agent_type}</p>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono inline-block">
                    ● DRAFT MODE
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PERSONALITY */}
        {currentStep === 2 && (
          <div className="space-y-6 text-xs">
            <h2 className="text-sm font-bold text-zinc-100">STEP 2: Personality Controls</h2>
            
            <div>
              <label className="block text-zinc-400 font-medium mb-2">Tone of Voice</label>
              <div className="grid grid-cols-4 gap-3">
                {['Friendly', 'Professional', 'Luxury', 'Casual'].map(t => (
                  <button
                    key={t}
                    onClick={() => setFormData({...formData, tone: t})}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-colors text-center ${
                      formData.tone === t 
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: KNOWLEDGE */}
        {currentStep === 3 && (
          <div className="space-y-5 text-xs">
            <h2 className="text-sm font-bold text-zinc-100">STEP 3: Knowledge Base Upload</h2>
            <div className="p-6 border-2 border-dashed border-zinc-800 rounded-xl text-center bg-zinc-950 space-y-2">
              <FileText className="w-6 h-6 text-zinc-400 mx-auto" />
              <p className="font-semibold text-zinc-100">Drag & Drop Property Documents (PDF, DOCX, TXT)</p>
            </div>
          </div>
        )}

        {/* STEP 4: TOOLS */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-sm font-bold text-zinc-100">STEP 4: Authorized Dynamic Tools</h2>
            <div className="grid grid-cols-2 gap-3">
              {formData.tools.map(tool => (
                <div 
                  key={tool.id} 
                  onClick={() => toggleTool(tool.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start justify-between ${
                    tool.enabled ? 'bg-zinc-950 border-zinc-700' : 'bg-zinc-950/40 border-zinc-800 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-bold text-zinc-100">{tool.name}</span>
                    <p className="text-[11px] text-zinc-400">{tool.desc}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tool.enabled ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-800 text-zinc-500'}`}>
                    {tool.enabled ? 'ON' : 'OFF'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 9: DEPLOY */}
        {currentStep === 9 && (
          <div className="space-y-5 text-xs">
            <h2 className="text-sm font-bold text-zinc-100">STEP 9: Deploy Agent to Production</h2>
            {!deploymentResult ? (
              isDeploying ? (
                <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 font-mono text-zinc-300">
                  <div className="flex items-center gap-2 font-bold text-zinc-100">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Deploying Agent...
                  </div>
                  {deploySteps.slice(0, deployStepIndex + 1).map((s, i) => (
                    <p key={i}>➔ {s}</p>
                  ))}
                </div>
              ) : (
                <button 
                  onClick={handleDeployClick}
                  className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Rocket className="w-4 h-4" /> Click "Deploy Agent"
                </button>
              )
            ) : (
              <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 font-mono">
                <span className="text-emerald-400 font-bold">✓ AGENT DEPLOYED & ACTIVE</span>
                <pre className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 text-[11px] overflow-x-auto">
                  {deploymentResult.widget_script}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Step Navigation Bar */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4">
          <button 
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold disabled:opacity-40"
          >
            ← Previous
          </button>
          
          {currentStep < 9 && (
            <button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              Next Step <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
