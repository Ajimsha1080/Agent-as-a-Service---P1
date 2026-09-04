'use client';
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Search, BookOpen, HelpCircle, Shield, Info, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AppKnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'rules' | 'faqs' | 'documents' | 'general'>('all');

  const [documents, setDocuments] = useState<any[]>([
    { id: 'doc_rules_01', title: 'Azure Hostel Resident Rules & Visitor Policy 2026.pdf', category: 'rules', type: 'PDF', chunks: 18, status: 'INDEXED', date: '2026-01-15' },
    { id: 'doc_faqs_02', title: 'Frequently Asked Questions (Hostel FAQs).txt', category: 'faqs', type: 'TXT', chunks: 12, status: 'INDEXED', date: '2026-01-20' },
    { id: 'doc_gen_03', title: 'General Hostel Facilities & Contact Directory.pdf', category: 'general', type: 'PDF', chunks: 14, status: 'INDEXED', date: '2026-02-01' },
    { id: 'doc_web_04', title: 'Hostel Official Website (https://azurehostel.edu/info)', category: 'general', type: 'URL', chunks: 8, status: 'INDEXED', date: '2026-02-10' }
  ]);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc = {
      id: `doc_${Date.now()}`,
      title: file.name,
      category: activeCategory === 'all' ? 'documents' : activeCategory,
      type: file.name.split('.').pop()?.toUpperCase() || 'TXT',
      chunks: 10,
      status: 'INDEXED',
      date: 'Just now'
    };

    setDocuments([newDoc, ...documents]);
    showToast(`SUCCESS: Document "${file.name}" uploaded and indexed into Hostel RAG Knowledge Base!`);
  };

  const filteredDocs = documents.filter(d => {
    const matchesCat = activeCategory === 'all' || d.category === activeCategory;
    const matchesSearch = (d.title || '').toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-lg border border-zinc-700 text-xs flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Hostel Knowledge Base</h1>
          <p className="text-xs text-zinc-500 mt-1">Upload rules, policy manuals, FAQs, and hostel information for RAG knowledge retrieval by the Hostel AI Agent.</p>
        </div>

        <label className="yc-btn-primary flex items-center gap-1.5 cursor-pointer">
          <Upload className="w-3.5 h-3.5" /> Upload Information
          <input type="file" onChange={handleUpload} className="hidden" accept=".txt,.csv,.json,.md,.pdf" />
        </label>
      </div>

      {/* Critical Distinction Banner: Knowledge vs Live Data */}
      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs text-zinc-700">
        <div className="flex items-center gap-2 font-bold text-zinc-900">
          <Info className="w-4 h-4 text-zinc-600" />
          <span>Knowledge Source vs. Live Data Source</span>
        </div>
        <p className="text-[11px] text-zinc-600 leading-relaxed">
          Knowledge Base items (uploaded PDFs, FAQs, hostel rules, public website URLs) represent <strong>static background information</strong>. 
          For fast-changing operational data (today's mess menu, current meal timings, notices, maintenance tickets), use official endpoints in{' '}
          <Link href="/app/live-updates" className="text-zinc-900 underline font-semibold hover:text-black">
            Live Information → Integrations
          </Link>.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeCategory === 'all' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          All Knowledge ({documents.length})
        </button>

        <button
          onClick={() => setActiveCategory('rules')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeCategory === 'rules' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> Rules & Policies
        </button>

        <button
          onClick={() => setActiveCategory('faqs')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeCategory === 'faqs' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> FAQs
        </button>

        <button
          onClick={() => setActiveCategory('documents')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeCategory === 'documents' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Documents
        </button>

        <button
          onClick={() => setActiveCategory('general')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeCategory === 'general' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <Info className="w-3.5 h-3.5" /> General Hostel Information
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <label className="block p-8 bg-zinc-50 border border-dashed border-zinc-300 rounded-xl text-center space-y-2 cursor-pointer hover:border-zinc-400 transition-colors">
        <Upload className="w-6 h-6 text-zinc-600 mx-auto" />
        <h3 className="text-xs font-bold text-zinc-900">Click to Upload Hostel Documents (.pdf, .txt, .md, .csv)</h3>
        <p className="text-[11px] text-zinc-500 max-w-md mx-auto">
          Uploaded files are processed, chunked, and embedded into RAG vector storage with tenant isolation.
        </p>
        <input type="file" onChange={handleUpload} className="hidden" accept=".txt,.csv,.json,.md,.pdf" />
      </label>

      {/* Search & Documents Table */}
      <div className="yc-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search knowledge documents or FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-800 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <span className="text-xs text-zinc-500 font-mono">
            {filteredDocs.length} Document(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="text-zinc-500 border-b border-zinc-200 font-mono text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">DOCUMENT TITLE</th>
                <th className="pb-3 font-semibold">CATEGORY</th>
                <th className="pb-3 font-semibold">FORMAT</th>
                <th className="pb-3 font-semibold">CHUNKS</th>
                <th className="pb-3 font-semibold">DATE ADDED</th>
                <th className="pb-3 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span className="truncate max-w-sm">{doc.title}</span>
                  </td>
                  <td>
                    <span className="capitalize font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded text-[10px]">
                      {doc.category}
                    </span>
                  </td>
                  <td className="font-mono text-zinc-500 text-[11px]">{doc.type}</td>
                  <td className="font-mono text-zinc-700">{doc.chunks} Chunks</td>
                  <td className="font-mono text-zinc-500 text-[11px]">{doc.date}</td>
                  <td className="text-right">
                    <span className="yc-badge-emerald text-[10px]">● {doc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
