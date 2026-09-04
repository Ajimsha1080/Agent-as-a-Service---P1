'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, Bot, BookOpen, Radio, BarChart3, CreditCard, Home, MessageSquare, ChevronLeft, ChevronRight, Search, Bell, Sparkles, Users 
} from 'lucide-react';
import { CommandMenu } from '../../components/ui/command-menu';

export default function OrganizationAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'AI Assistant', href: '/app/agents', icon: Bot },
    { name: 'Knowledge', href: '/app/knowledge', icon: BookOpen },
    { name: 'Live Information', href: '/app/live-updates', icon: Radio },
    { name: 'Requests', href: '/app/requests', icon: MessageSquare },
    { name: 'Residents', href: '/app/residents', icon: Users },
    { name: 'Settings', href: '/app/settings', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex font-sans selection:bg-zinc-200">
      <CommandMenu />

      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-60'} border-r border-zinc-200 bg-white flex flex-col justify-between transition-all duration-200 relative shrink-0`}>
        <div>
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-5 w-5 h-5 rounded-full bg-white border border-zinc-300 text-zinc-500 flex items-center justify-center hover:text-zinc-900 hover:bg-zinc-100 transition-all z-20 shadow-xs"
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>

          {/* Organization & Tenant Selector */}
          <div className="p-4 border-b border-zinc-200 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
              A
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h2 className="font-bold text-xs text-zinc-900 truncate">Azure Hostel Group</h2>
                <span className="text-[10px] text-zinc-500 font-medium truncate block">Azure Palm Hostel</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-semibold border border-zinc-200'
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

        {/* User Profile Footer */}
        <div className="p-3 border-t border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-700 shrink-0">
              AD
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-zinc-900 truncate">Org Admin</p>
                <p className="text-[10px] text-zinc-500 truncate">admin@azurepalm.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-zinc-50/50">
        {/* Global SaaS Header */}
        <header className="border-b border-zinc-200 bg-white/90 px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
          {/* Quick Search & Command Palette Trigger */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="relative w-64 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                readOnly
                placeholder="Search commands... (⌘K)"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-8 pr-8 py-1.5 text-xs text-zinc-800 focus:outline-none cursor-pointer"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200">
                ⌘K
              </span>
            </div>
            <span className="yc-badge-emerald">
              ● Live Shared Runtime
            </span>
          </div>

          {/* 1-Click Unified Portal Switcher */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs font-semibold">
            <Link 
              href="/app/dashboard" 
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname.startsWith('/app') ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🏨 Hostel SaaS Admin
            </Link>
            <Link 
              href="/guest/agt_hostel_01" 
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname.startsWith('/guest') ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              💬 Resident AI Chat
            </Link>
            <Link 
              href="/platform/dashboard" 
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname.startsWith('/platform') ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🛡️ Super Admin
            </Link>
          </div>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
