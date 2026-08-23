'use client';
import React, { useState } from 'react';
import { Upload, FileText, Trash2, Search } from 'lucide-react';

export default function AppKnowledgeBasePage() {
  const [documents, setDocuments] = useState([
    { id: 'doc_1', title: 'Azure Palm Resort Guest Policy Guide 2026.pdf', type: 'PDF', status: 'READY', chunks: 24, updated: 'Today, 03:45 PM', size: '2.4 MB' },
    { id: 'doc_2', title: 'Spice Route Fine Dining Menu & Allergens.pdf', type: 'PDF', status: 'READY', chunks: 12, updated: 'Yesterday', size: '1.1 MB' },
    { id: 'doc_3', title: 'Ayurvedic Spa & Panchakarma Treatments.docx', type: 'DOCX', status: 'READY', chunks: 18, updated: '3 days ago', size: '850 KB' },
    { id: 'doc_4', title: 'Water Sports & Backwater Kayaking Guide.txt', type: 'TXT', status: 'PROCESSING', chunks: 8, updated: 'Just now', size: '140 KB' }
  ]);

  const [search, setSearch] = useState('');
  const filteredDocs = documents.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Knowledge Base & RAG Indexing</h1>
          <p className="text-xs text-zinc-500 mt-1">Upload property guides, policy manuals, menus, and FAQs indexed with pgvector tenant metadata.</p>
        </div>

        <button className="yc-btn-primary flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5" /> Upload Document
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="p-8 bg-zinc-50 border border-dashed border-zinc-300 rounded-xl text-center space-y-2 cursor-pointer hover:border-zinc-400 transition-colors">
        <Upload className="w-6 h-6 text-zinc-600 mx-auto" />
        <h3 className="text-xs font-bold text-zinc-900">Drag & Drop Property Documents (PDF, DOCX, TXT, CSV)</h3>
        <p className="text-[11px] text-zinc-500 max-w-md mx-auto">
          Documents are automatically parsed, cleaned, chunked, and embedded into pgvector with tenant isolation metadata.
        </p>
      </div>

      {/* Documents Table */}
      <div className="yc-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Indexed Documents ({filteredDocs.length})</h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter documents..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 focus:outline-none font-mono"
            />
          </div>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead className="text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="pb-3">DOCUMENT TITLE</th>
              <th className="pb-3">TYPE</th>
              <th className="pb-3">CHUNKS</th>
              <th className="pb-3">STATUS</th>
              <th className="pb-3">LAST UPDATED</th>
              <th className="pb-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 text-zinc-800">
            {filteredDocs.map(doc => (
              <tr key={doc.id}>
                <td className="py-3 font-bold text-zinc-900 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate max-w-md">{doc.title}</span>
                </td>
                <td><span className="yc-badge">{doc.type}</span></td>
                <td className="font-bold text-zinc-900">{doc.chunks} Chunks</td>
                <td>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doc.status === 'READY' ? 'yc-badge-emerald' : 'bg-amber-100 text-amber-800 animate-pulse border border-amber-200'
                  }`}>
                    ● {doc.status}
                  </span>
                </td>
                <td className="text-zinc-500">{doc.updated}</td>
                <td className="text-right">
                  <button onClick={() => handleDelete(doc.id)} className="p-1 hover:bg-zinc-100 text-zinc-500 hover:text-red-600 rounded transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
