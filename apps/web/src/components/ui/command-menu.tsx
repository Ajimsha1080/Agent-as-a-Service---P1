'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Bot, Building2, BookOpen, Radio, MessageSquare, BarChart3, CreditCard, Plus, ArrowRight, X, ShieldCheck 
} from 'lucide-react';

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { label: 'View Predefined AI Agents', href: '/app/agents', icon: Bot, category: 'Quick Actions' },
    { label: 'Open Staff Guest Inbox', href: '/app/conversations', icon: MessageSquare, category: 'Quick Actions' },
    { label: 'Upload Property Knowledge', href: '/app/knowledge', icon: BookOpen, category: 'Quick Actions' },
    { label: 'Publish Live Announcement', href: '/app/live-updates', icon: Radio, category: 'Quick Actions' },
    { label: 'Executive Dashboard Overview', href: '/app/dashboard', icon: Building2, category: 'Navigation' },
    { label: 'AI Agents Registry', href: '/app/agents', icon: Bot, category: 'Navigation' },
    { label: 'Preview Guest Concierge', href: '/guest/agt_concierge_01', icon: Bot, category: 'Navigation' },
    { label: 'Multi-Dimensional Analytics', href: '/app/analytics', icon: BarChart3, category: 'Navigation' },
    { label: 'Usage & SaaS Billing', href: '/app/billing', icon: CreditCard, category: 'Navigation' },
    { label: 'Platform Operator Control Plane', href: '/platform/dashboard', icon: ShieldCheck, category: 'Operator' },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setSearch('');
    router.push(href);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[99999] flex items-start justify-center pt-28 px-4 font-sans">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-4 h-4 text-teal-400 shrink-0" />
          <input 
            type="text" 
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search (e.g. Create Agent, Conversations, Knowledge)..."
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
          />
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">No matching commands found.</div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(action.href)}
                  className="p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-teal-400 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white group-hover:text-teal-300">{action.label}</span>
                      <span className="block text-[10px] text-slate-500">{action.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-teal-400 transition-all" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-500">
          <span>Use <strong>↑ ↓</strong> to navigate, <strong>Enter</strong> to select</span>
          <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-[10px]">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
