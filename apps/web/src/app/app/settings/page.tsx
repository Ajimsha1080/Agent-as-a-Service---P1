'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, Save, Shield, Phone, Sparkles, Building2, UserCheck, Key, Users, MessageSquare, ChevronRight } from 'lucide-react';

export default function AppSettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [hostelName, setHostelName] = useState('Azure Palm Hostel & Campus Residence');
  const [address, setAddress] = useState('Campus North Gate Road, University Sector 4');
  const [contactEmail, setContactEmail] = useState('warden@azurehostel.edu');
  const [contactPhone, setContactPhone] = useState('+1 (555) 019-2834');
  const [emergencyPhone, setEmergencyPhone] = useState('+1 (555) 911-0000 (24/7 Security & Medical)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('SUCCESS: Hostel Profile & Settings saved to database!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-lg border border-zinc-700 text-xs flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Hostel Settings</h1>
        <p className="text-xs text-zinc-500 mt-1">Manage hostel profile, contact information, emergency contacts, AI settings, staff permissions, and integration credentials.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs font-sans">
        {/* 1. Hostel Profile */}
        <div className="yc-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Building2 className="w-4 h-4 text-zinc-700" /> 1. Hostel Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Hostel Name</label>
              <input
                type="text"
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Address / Location</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact Information & Emergency Contacts */}
        <div className="yc-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Phone className="w-4 h-4 text-zinc-700" /> 2. Contact & Emergency Phone Numbers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Warden Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Office Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="font-semibold text-zinc-700">Emergency Contact Hotline (Medical & Security)</label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono font-bold text-red-700"
            />
          </div>
        </div>

        {/* 3. AI Assistant & Staff Permissions */}
        <div className="yc-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Shield className="w-4 h-4 text-zinc-700" /> 3. AI Assistant Settings & Staff Permissions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
              <span className="font-bold text-zinc-900 block">Staff Role: Chief Warden</span>
              <span className="text-[11px] text-zinc-500">Full administrative access to Live Information & Settings.</span>
            </div>

            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
              <span className="font-bold text-zinc-900 block">Staff Role: Maintenance Staff</span>
              <span className="text-[11px] text-zinc-500">Access restricted to Requests & Ticket resolution.</span>
            </div>
          </div>
        </div>

        {/* 4. Advanced Administrative Records & Secondary Workflows */}
        <div className="yc-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Key className="w-4 h-4 text-zinc-700" /> 4. Advanced Administrative Records & Secondary Workflows
          </h2>
          <p className="text-xs text-zinc-500">
            Resident records and maintenance requests are managed automatically by the Hostel AI Agent. You can inspect advanced records below when manual administrative review is needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/app/residents"
              className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 group-hover:text-black">Resident Roster</h3>
                  <span className="text-[11px] text-zinc-500">148 registered residents & room allocations</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900" />
            </Link>

            <Link
              href="/app/requests"
              className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 group-hover:text-black">Hostel Maintenance Requests</h3>
                  <span className="text-[11px] text-zinc-500">View & resolve reported maintenance tickets</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900" />
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl font-semibold text-xs hover:bg-black transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
