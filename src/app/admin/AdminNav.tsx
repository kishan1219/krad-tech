'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Inbox, Edit3, LogOut, ShieldCheck, Home, AlertOctagon } from 'lucide-react';

interface AdminNavProps {
  activeTab?: 'leads' | 'cms' | 'logs';
  onTabChange?: (tab: 'leads' | 'cms' | 'logs') => void;
  errorCount?: number;
  newLeadsCount?: number;
}

export default function AdminNav({
  activeTab = 'leads',
  onTabChange,
  errorCount = 0,
  newLeadsCount = 0,
}: AdminNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Non-blocking
    }
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('krad_admin_token');
      localStorage.removeItem('krad_admin_token');
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between pb-8 mb-8 border-b border-border-subtle gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE] shadow-cyan-glow">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>KRAD Admin Command Center</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Edge Control
            </span>
          </h1>
          <p className="text-xs text-slate-400">Manage client requests, live homepage copy, and system error telemetry</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Leads Tab */}
        <button
          onClick={() => onTabChange?.('leads')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'leads'
              ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
              : 'bg-surface-card text-slate-300 hover:text-white border border-border-subtle'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Client Requests</span>
          {newLeadsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-bold">
              {newLeadsCount}
            </span>
          )}
        </button>

        {/* Homepage CMS Tab */}
        <button
          onClick={() => onTabChange?.('cms')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'cms'
              ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
              : 'bg-surface-card text-slate-300 hover:text-white border border-border-subtle'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Homepage CMS</span>
        </button>

        {/* System Error Logs Tab */}
        <button
          onClick={() => onTabChange?.('logs')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'logs'
              ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
              : 'bg-surface-card text-slate-300 hover:text-white border border-border-subtle'
          }`}
        >
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <span>System Error Logs</span>
          {errorCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
              {errorCount}
            </span>
          )}
        </button>

        {/* View Public Site */}
        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl bg-surface-card text-slate-400 hover:text-white border border-border-subtle transition-colors"
          title="Open Public Homepage"
        >
          <Home className="w-4 h-4" />
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all ml-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
