'use client';
import React, { useState } from 'react';
import { Users, Building2, Search, CheckCircle2, ShieldCheck, UserPlus, Edit3, X, Sparkles } from 'lucide-react';

export default function HostelResidentsPage() {
  const [residents, setResidents] = useState([
    { id: 'res_101', name: 'Alex Johnson', room: '304', block: 'Block A', status: 'ACTIVE', fee_status: 'PAID', check_in: '2026-01-15', phone: '+1 (555) 234-5678' },
    { id: 'res_102', name: 'Rahul Verma', room: '212', block: 'Block B', status: 'ACTIVE', fee_status: 'PAID', check_in: '2026-01-20', phone: '+1 (555) 876-5432' },
    { id: 'res_103', name: 'Priya Sharma', room: '105', block: 'Block A', status: 'ACTIVE', fee_status: 'PAID', check_in: '2026-02-01', phone: '+1 (555) 345-6789' },
    { id: 'res_104', name: 'David Miller', room: '402', block: 'Block C', status: 'ACTIVE', fee_status: 'DUE', check_in: '2026-02-10', phone: '+1 (555) 901-2345' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingResident, setEditingResident] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Resident Form State
  const [newName, setNewName] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newBlock, setNewBlock] = useState('Block A');
  const [newPhone, setNewPhone] = useState('');
  const [newFeeStatus, setNewFeeStatus] = useState('PAID');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResident) return;

    setResidents(prev => prev.map(r => r.id === editingResident.id ? editingResident : r));
    showToast(`SUCCESS: Resident details for ${editingResident.name} updated!`);
    setEditingResident(null);
  };

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRoom.trim()) return;

    const newR = {
      id: `res_${Date.now()}`,
      name: newName,
      room: newRoom,
      block: newBlock,
      status: 'ACTIVE',
      fee_status: newFeeStatus,
      check_in: 'Today',
      phone: newPhone || '+1 (555) 000-0000'
    };

    setResidents([...residents, newR]);
    showToast(`SUCCESS: Registered resident ${newName} to Room ${newRoom}!`);
    setNewName('');
    setNewRoom('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.room.includes(searchTerm) ||
    r.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-zinc-900">Hostel Resident Directory</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage hostel residents, room allocations, fee payment statuses, and contact profiles.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" /> + Register Resident
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by resident name, room number, or block..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-800 focus:outline-none focus:border-zinc-400"
          />
        </div>

        <span className="yc-badge-emerald font-mono text-xs px-3.5 py-1 font-semibold">
          ● {residents.length} Active Residents
        </span>
      </div>

      {/* Resident Directory Table */}
      <div className="yc-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-zinc-900">Resident Roster</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="text-zinc-500 border-b border-zinc-200 font-mono text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">RESIDENT NAME</th>
                <th className="pb-3 font-semibold">ROOM & BLOCK</th>
                <th className="pb-3 font-semibold">CHECK-IN DATE</th>
                <th className="pb-3 font-semibold">FEE STATUS</th>
                <th className="pb-3 font-semibold">CONTACT PHONE</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {filteredResidents.map(r => (
                <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-3.5 font-bold text-zinc-900">{r.name}</td>
                  <td>
                    <span className="font-mono font-semibold text-zinc-900">Room {r.room}</span>
                    <span className="text-zinc-500 ml-1">({r.block})</span>
                  </td>
                  <td className="font-mono text-zinc-600">{r.check_in}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      r.fee_status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {r.fee_status}
                    </span>
                  </td>
                  <td className="font-mono text-zinc-600">{r.phone}</td>
                  <td className="text-right">
                    <button
                      onClick={() => setEditingResident({ ...r })}
                      className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors"
                    >
                      Edit Resident
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Resident Modal */}
      {editingResident && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="text-base font-bold text-zinc-900">Edit Resident Profile ({editingResident.name})</h3>
              <button onClick={() => setEditingResident(null)} className="text-zinc-400 hover:text-zinc-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Resident Full Name</label>
                <input
                  type="text"
                  value={editingResident.name}
                  onChange={(e) => setEditingResident({ ...editingResident, name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Room Number</label>
                  <input
                    type="text"
                    value={editingResident.room}
                    onChange={(e) => setEditingResident({ ...editingResident, room: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Block Allocation</label>
                  <select
                    value={editingResident.block}
                    onChange={(e) => setEditingResident({ ...editingResident, block: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none"
                  >
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Fee Payment Status</label>
                  <select
                    value={editingResident.fee_status}
                    onChange={(e) => setEditingResident({ ...editingResident, fee_status: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none"
                  >
                    <option value="PAID">PAID</option>
                    <option value="DUE">DUE</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Phone Number</label>
                  <input
                    type="text"
                    value={editingResident.phone}
                    onChange={(e) => setEditingResident({ ...editingResident, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setEditingResident(null)}
                  className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-black"
                >
                  Save Resident Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Resident Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="text-base font-bold text-zinc-900">Register New Hostel Resident</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-zinc-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddResident} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Resident Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Marcus Chen"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Room Number</label>
                  <input
                    type="text"
                    required
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. 501"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Block Allocation</label>
                  <select
                    value={newBlock}
                    onChange={(e) => setNewBlock(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none"
                  >
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Fee Payment Status</label>
                  <select
                    value={newFeeStatus}
                    onChange={(e) => setNewFeeStatus(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none"
                  >
                    <option value="PAID">PAID</option>
                    <option value="DUE">DUE</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Contact Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-900 focus:outline-none focus:border-zinc-400 font-mono"
                  />
                </div>
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
                  Register Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
