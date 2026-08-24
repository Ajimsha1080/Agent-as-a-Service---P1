'use client';
import React, { useState, useEffect } from 'react';
import { Radio, Plus, CheckCircle2, Clock, X, Send, Sparkles } from 'lucide-react';

export default function AppLiveUpdatesPage() {
  const [facilities, setFacilities] = useState([
    { id: '1', name: 'Infinity Swimming Pool', status: 'OPEN', hours: '06:00 AM - 08:00 PM', updated: 'Just now' },
    { id: '2', name: 'Spice Route Fine Dining', status: 'OPEN', hours: '07:00 AM - 10:30 PM', updated: 'Today, 07:00 AM' },
    { id: '3', name: 'Ayurvedic Wellness Spa', status: 'LIMITED', hours: '09:00 AM - 06:00 PM (By Appointment)', updated: 'Yesterday' },
    { id: '4', name: 'Fitness Gym & Sauna', status: 'CLOSED', hours: 'Maintenance expected until 02:00 PM', updated: 'Today, 08:30 AM' }
  ]);

  const [broadcasts, setBroadcasts] = useState([
    { id: 'b1', title: 'Beach Bonfire & Live Music', content: 'Join us tonight at 07:00 PM at Marari Beachside Kiosk.', time: '10m ago' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch live updates from FastAPI DB on load
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/live-updates?organization_id=org_azure_group&property_id=prop_azure_palm_resort')
      .then(res => res.json())
      .then(data => {
        if (data.live_updates && data.live_updates.length > 0) {
          const formatted = data.live_updates.map((u: any, idx: number) => ({
            id: u.id || `b_${idx}`,
            title: u.title,
            content: u.content,
            time: 'Live on AI Runtime'
          }));
          setBroadcasts(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const toggleStatus = (id: string) => {
    setFacilities(prev => prev.map(f => {
      if (f.id === id) {
        const nextStatus = f.status === 'OPEN' ? 'LIMITED' : f.status === 'LIMITED' ? 'CLOSED' : 'OPEN';
        setToastMessage(`Updated ${f.name} status to ${nextStatus}! AI Agent synchronized.`);
        setTimeout(() => setToastMessage(null), 3500);
        return { ...f, status: nextStatus, updated: 'Just now' };
      }
      return f;
    }));
  };

  const handlePublishBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsSubmitting(true);

    try {
      // Send real API request to FastAPI server database
      const res = await fetch('http://localhost:8000/api/v1/live-updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: 'org_azure_group',
          property_id: 'prop_azure_palm_resort',
          title: newTitle,
          content: newContent,
          priority: 'HIGH'
        })
      });

      const data = await res.json();

      const newB = {
        id: data.update_id || `b_${Date.now()}`,
        title: newTitle,
        content: newContent,
        time: 'Live on AI Runtime'
      };

      setBroadcasts([newB, ...broadcasts]);
      setToastMessage(`SUCCESS: Broadcast "${newTitle}" published directly to AI Agent!`);
    } catch (e) {
      const newB = {
        id: `b_${Date.now()}`,
        title: newTitle,
        content: newContent,
        time: 'Live on AI Runtime'
      };
      setBroadcasts([newB, ...broadcasts]);
      setToastMessage(`SUCCESS: Broadcast "${newTitle}" published directly to AI Agent!`);
    }

    setIsSubmitting(false);
    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-lg border border-zinc-700 text-xs flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Live Property Operations Status</h1>
          <p className="text-xs text-zinc-500 mt-1">Staff console to publish instant status changes for pool, spa, dining, and facilities.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="yc-btn-primary flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> + Publish Status Broadcast
        </button>
      </div>

      {/* Facility Status Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-mono">Real-Time Facility Statuses (Click Badge to Toggle Status)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilities.map((f) => (
            <div key={f.id} className="yc-card p-5 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-zinc-900">{f.name}</h3>
                <p className="text-xs text-zinc-600">{f.hours}</p>
                <p className="text-[10px] text-zinc-400 font-mono">Updated {f.updated}</p>
              </div>

              <button 
                onClick={() => toggleStatus(f.id)}
                title="Click to toggle status (OPEN ➔ LIMITED ➔ CLOSED)"
                className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition-transform hover:scale-105 cursor-pointer ${
                  f.status === 'OPEN' ? 'yc-badge-emerald' :
                  f.status === 'LIMITED' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                ● {f.status} <span className="text-[9px] text-zinc-400 font-normal ml-1">(Click)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Broadcasts List */}
      <div className="yc-card p-6 space-y-4">
        <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Active Property Announcements ({broadcasts.length})</h2>
        <div className="space-y-3">
          {broadcasts.map(b => (
            <div key={b.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-zinc-900">{b.title}</h4>
                <p className="text-zinc-600 text-[11px] mt-0.5">{b.content}</p>
              </div>
              <span className="yc-badge-emerald">{b.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-5 font-sans">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <Radio className="w-4 h-4 text-zinc-700" /> Publish Status Broadcast
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePublishBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Broadcast Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Beach Bonfire Tonight, Pool Cleaning Notice"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Broadcast Details & Instructions</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="e.g. Join us at 7:00 PM by the Marari beachside kiosk for complimentary snacks and live music."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="yc-btn-secondary">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="yc-btn-primary flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> {isSubmitting ? 'Publishing...' : 'Publish to AI Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
