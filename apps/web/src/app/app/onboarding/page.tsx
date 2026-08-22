'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Building2, BookOpen, Bot, Rocket, Sparkles, Play } from 'lucide-react';

export default function OnboardingWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    propertyName: 'Azure Palm Resort & Spa',
    propertyType: 'resort',
    address: 'Marari Beach, Kerala, India',
    agentName: 'Azure Concierge',
    enabledTools: ['availability', 'facility_status', 'booking']
  });

  const steps = [
    { num: 1, title: 'Create Property', desc: 'Set property name and location' },
    { num: 2, title: 'Property Information', desc: 'Upload guest guide or policies' },
    { num: 3, title: 'Connect Availability', desc: 'Enable live room & pool tools' },
    { num: 4, title: 'Create AI Agent', desc: 'Define name, type & personality' },
    { num: 5, title: 'Test Agent', desc: 'Try sample guest inquiries' },
    { num: 6, title: 'Deploy', desc: 'Activate agent in production' }
  ];

  const progressPct = Math.round((currentStep / steps.length) * 100);

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push('/app/dashboard');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      {/* Onboarding Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono font-semibold uppercase tracking-wider">
          <span>✨ Welcome to Hospitality Agent Cloud</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-100">Let's launch your first AI concierge.</h1>
        <p className="text-xs text-zinc-400">Complete this 6-step guided wizard to deploy an AI agent for your property in under 3 minutes.</p>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-zinc-300 uppercase tracking-wider text-[11px]">ONBOARDING PROGRESS</span>
          <span className="text-zinc-100 font-mono text-[11px]">{progressPct}% Completed</span>
        </div>
        <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
          <div 
            style={{ width: `${progressPct}%` }}
            className="bg-zinc-100 h-full transition-all duration-300"
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-5">
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">STEP 1: Create Property</h2>
                <p className="text-[11px] text-zinc-400">Enter basic details for your resort, hotel, or hostel.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-medium mb-1.5">Property Name</label>
                <input 
                  type="text" 
                  value={formData.propertyName}
                  onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1.5">Property Category</label>
                <select 
                  value={formData.propertyType}
                  onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                >
                  <option value="resort">Luxury Resort & Spa</option>
                  <option value="hotel">Boutique Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="apartment">Serviced Apartments</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">STEP 2: Add Property Information</h2>
                <p className="text-[11px] text-zinc-400">Upload your guest guide, policies, or restaurant menu PDF.</p>
              </div>
            </div>

            <div className="p-6 border-2 border-dashed border-zinc-800 rounded-xl text-center bg-zinc-950 space-y-2">
              <BookOpen className="w-6 h-6 text-zinc-400 mx-auto" />
              <p className="text-xs font-semibold text-zinc-100">Demo File Loaded: Azure Palm Resort Guest Guide 2026.pdf</p>
              <p className="text-[11px] text-emerald-400 font-mono">✓ Parsed into 24 vector chunks with pgvector tenant metadata.</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">STEP 3: Connect Live Tools & Availability</h2>
                <p className="text-[11px] text-zinc-400">Enable real-time tools for room availability, prices, and pool hours.</p>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-200">✓ Room Vacancy & Availability Tool</span>
                <span className="text-emerald-400 font-semibold font-mono">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-200">✓ Facility Operational Status (Pool/Spa)</span>
                <span className="text-emerald-400 font-semibold font-mono">Connected</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">STEP 4: Create AI Agent</h2>
                <p className="text-[11px] text-zinc-400">Define agent name and primary communication language.</p>
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-zinc-400 font-medium mb-1.5">Agent Name</label>
              <input 
                type="text" 
                value={formData.agentName}
                onChange={(e) => setFormData({...formData, agentName: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center">
                <Play className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">STEP 5: Test Agent Inquiries</h2>
                <p className="text-[11px] text-zinc-400">Simulate a guest question before publishing to production.</p>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-xs space-y-2">
              <p className="font-semibold text-zinc-200">Test Query: "Is the swimming pool open now?"</p>
              <p className="text-zinc-400 italic">Agent Response: "The Infinity Swimming Pool is currently Open (06:00 AM - 08:00 PM)."</p>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4 text-center py-4">
            <Rocket className="w-8 h-8 text-zinc-100 mx-auto" />
            <h2 className="text-base font-bold text-zinc-100">STEP 6: Deploy Your AI Agent</h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Your agent is fully configured. Click below to activate your agent on the Shared Agent Runtime.
            </p>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
          <button 
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors"
          >
            ← Back
          </button>

          <button 
            onClick={handleNext}
            className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            {currentStep === 6 ? 'Complete Setup & Open Dashboard →' : 'Continue to Next Step'} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
