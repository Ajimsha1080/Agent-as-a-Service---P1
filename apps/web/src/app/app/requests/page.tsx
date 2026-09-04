'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, CheckCircle2, Clock, AlertTriangle, Plus, Filter, UserCheck, Edit3, X, Sparkles } from 'lucide-react';

export default function HostelRequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: 'MNT-10492',
      resident: 'Alex Johnson',
      room: '304 - Block A',
      category: 'Electrical & Fan',
      description: 'Room ceiling fan is making loud noise and not rotating at full speed.',
      status: 'IN_PROGRESS',
      assigned: 'John Doe (Electrical Staff)',
      date: 'Today, 10:15 AM',
      urgency: 'NORMAL'
    },
    {
      id: 'MNT-10493',
      resident: 'Rahul Verma',
      room: '212 - Block B',
      category: 'Plumbing & Tap',
      description: 'Bathroom tap is leaking continuously in Room 212.',
      status: 'DISPATCHED',
      assigned: 'Suresh Kumar (Plumbing Staff)',
      date: 'Today, 11:30 AM',
      urgency: 'HIGH'
    },
    {
      id: 'MNT-10488',
      resident: 'Priya Sharma',
      room: '105 - Block A',
      category: 'Wi-Fi & Internet',
      description: 'Wi-Fi access point in corridor 1st floor has weak signal.',
      status: 'RESOLVED',
      assigned: 'IT Network Team',
      date: 'Yesterday, 04:00 PM',
      urgency: 'NORMAL'
    }
  ]);

  const [editingRequest, setEditingRequest] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Request Form State
  const [newResident, setNewResident] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newCategory, setNewCategory] = useState('Electrical & Fan');
  const [newDescription, setNewDescription] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    setRequests(prev => prev.map(r => r.id === editingRequest.id ? editingRequest : r));
    showToast(`SUCCESS: Ticket ${editingRequest.id} assigned staff & status updated! AI Agent synchronized.`);
    setEditingRequest(null);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResident.trim() || !newDescription.trim()) return;

    const newReq = {
      id: `MNT-${Math.floor(10000 + Math.random() * 90000)}`,
      resident: newResident,
      room: newRoom || 'Unassigned Room',
      category: newCategory,
      description: newDescription,
      status: 'DISPATCHED',
      assigned: 'Duty Technician',
      date: 'Today, Just now',
      urgency: 'NORMAL'
    };

    setRequests([newReq, ...requests]);
    showToast(`SUCCESS: Logged maintenance ticket ${newReq.id}!`);
    setNewResident('');
    setNewRoom('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const updateStatus = (id: string, newStatus: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    showToast(`Updated ticket ${id} status to ${newStatus}.`);
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
          <h1 className="text-2xl font-bold text-zinc-900">Maintenance & Service Requests</h1>
          <p className="text-xs text-zinc-500 mt-1">Track and manage resident maintenance requests, complaints, and staff assignments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> + Log Request
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">TOTAL REQUESTS</span>
          <div className="text-2xl font-bold text-zinc-900 font-mono">{requests.length} Tickets</div>
          <p className="text-[11px] text-zinc-500 mt-1">Logged by residents & AI tool</p>
        </div>
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">IN PROGRESS</span>
          <div className="text-2xl font-bold text-amber-600 font-mono">
            {requests.filter(r => r.status === 'IN_PROGRESS' || r.status === 'DISPATCHED').length} Tickets
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Assigned to maintenance staff</p>
        </div>
        <div className="yc-card p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">RESOLVED</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {requests.filter(r => r.status === 'RESOLVED').length} Tickets
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Completed & verified</p>
        </div>
      </div>

      {/* Request Table */}
      <div className="yc-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-zinc-900">All Resident Requests</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="text-zinc-500 border-b border-zinc-200 font-mono text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">TICKET ID</th>
                <th className="pb-3 font-semibold">RESIDENT & ROOM</th>
                <th className="pb-3 font-semibold">ISSUE CATEGORY</th>
                <th className="pb-3 font-semibold">ASSIGNED STAFF</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {requests.map(r => (
                <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-4 font-mono font-bold text-zinc-900">{r.id}</td>
                  <td>
                    <div className="font-bold text-zinc-900">{r.resident}</div>
                    <div className="text-[11px] text-zinc-500">{r.room}</div>
                  </td>
                  <td>
                    <div className="font-medium text-zinc-900">{r.category}</div>
                    <div className="text-[11px] text-zinc-500 max-w-xs truncate">{r.description}</div>
                  </td>
                  <td className="font-mono text-zinc-700">{r.assigned}</td>
                  <td>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold ${
                      r.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      r.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-zinc-100 text-zinc-800 border border-zinc-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => setEditingRequest({ ...r })}
                      className="px-3 py-1 bg-zinc-100 text-zinc-800 rounded-lg text-xs font-semibold hover:bg-zinc-200 transition-colors"
                    >
                      Edit / Assign
                    </button>
                    {r.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateStatus(r.id, 'RESOLVED')}
                        className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors"
                      >
                        Mark Resolved ✓
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Assign Request Modal */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="text-base font-bold text-zinc-900">Edit / Assign Staff ({editingRequest.id})</h3>
              <button onClick={() => setEditingRequest(null)} className="text-zinc-400 hover:text-zinc-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Assigned Staff Member</label>
                <input
                  type="text"
                  value={editingRequest.assigned}
                  onChange={(e) => setEditingRequest({ ...editingRequest, assigned: e.target.value })}
                  placeholder="e.g. John Doe (Electrical Staff)"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Ticket Status</label>
                  <select
                    value={editingRequest.status}
                    onChange={(e) => setEditingRequest({ ...editingRequest, status: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none font-mono"
                  >
                    <option value="DISPATCHED">DISPATCHED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Urgency Level</label>
                  <select
                    value={editingRequest.urgency}
                    onChange={(e) => setEditingRequest({ ...editingRequest, urgency: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none"
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Issue Notes / Description</label>
                <textarea
                  rows={2}
                  value={editingRequest.description}
                  onChange={(e) => setEditingRequest({ ...editingRequest, description: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-zinc-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-black"
                >
                  Save Request Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Request Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="text-base font-bold text-zinc-900">Log Maintenance / Service Request</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-zinc-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Resident Name</label>
                  <input
                    type="text"
                    required
                    value={newResident}
                    onChange={(e) => setNewResident(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Room Number</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. Room 304"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Issue Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none"
                >
                  <option value="Electrical & Fan">Electrical & Fan</option>
                  <option value="Plumbing & Tap">Plumbing & Tap</option>
                  <option value="Wi-Fi & Internet">Wi-Fi & Internet</option>
                  <option value="Furniture & Door">Furniture & Door</option>
                  <option value="General Service">General Service</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Issue Description</label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Details of the issue..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-zinc-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-black"
                >
                  Log Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
