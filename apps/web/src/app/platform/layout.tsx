'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, Bot, ShieldCheck, DollarSign, Cpu, Activity, Settings, ChevronLeft, ChevronRight, Search, Bell, Layers, FileText 
} from 'lucide-react';
import { ThemeToggle } from '../../components/ui/theme-toggle';

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Platform Overview', href: '/platform/dashboard', icon: Activity },
    { name: 'Organizations', href: '/platform/organizations', icon: Building2 },
    { name: 'Global Properties', href: '/platform/properties', icon: Building2 },
    { name: 'Platform Agents', href: '/platform/agents', icon: Bot },
    { name: 'Subscriptions', href: '/platform/subscriptions', icon: DollarSign },
    { name: 'AI Cost Engine', href: '/platform/ai-costs', icon: Cpu },
    { name: 'System Health', href: '/platform/system-health', icon: ShieldCheck },
    { name: 'Operator Settings', href: '/platform/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex font-sans selection:bg-zinc-200">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} border-r border-zinc-200 bg-white flex flex-col justify-between transition-all duration-200 relative shrink-0`}>
        <div>
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-6 w-5 h-5 rounded-full bg-white border border-zinc-300 text-zinc-500 flex items-center justify-center hover:text-zinc-900 hover:bg-zinc-100 transition-all z-20 shadow-xs"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>

          {/* Operator Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-extrabold text-base shadow-xs shrink-0">
              ⚡
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h2 className="font-bold text-sm text-zinc-900 truncate">Platform Operator</h2>
                <span className="text-[10px] text-zinc-500 font-mono font-semibold tracking-wider uppercase block">SUPER ADMIN CTRL</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 border border-zinc-200'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Super Admin User Footer */}
        <div className="p-4 border-t border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-xs font-bold text-zinc-700 shrink-0">
              SA
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-zinc-900 truncate">Super Admin</p>
                <p className="text-[10px] text-zinc-500 truncate">operator@platform.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-zinc-50/50">
        {/* Operator Global Header */}
        <header className="border-b border-zinc-200 bg-white/90 px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="yc-badge">
              🛡️ /platform/* (Operator UI)
            </span>
            <span className="text-xs text-zinc-500 font-mono">Node Cluster: us-east-1-prod</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <ThemeToggle />
            <Link href="/app/dashboard" className="yc-btn-secondary">
              Switch to Org Admin Portal →
            </Link>
          </div>
        </header>

        <main className="p-8 flex-1 font-sans">
          {children}
        </main>
      </div>
    </div>
  );
}
