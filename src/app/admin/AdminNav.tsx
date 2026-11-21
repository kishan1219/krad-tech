'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Inbox, Edit3, LogOut, ShieldCheck, Home } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between pb-8 mb-8 border-b border-border-subtle gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0B1120] border border-[#00D2FE]/40 flex items-center justify-center text-[#00D2FE]">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>KRAD Admin Portal</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D2FE]/10 text-[#00D2FE] border border-[#00D2FE]/20">
              Live CMS
            </span>
          </h1>
          <p className="text-xs text-slate-400">Manage leads, inquiries, and real-time site copy</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/admin"
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            pathname === '/admin'
              ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
              : 'bg-surface-card text-slate-300 hover:text-white border border-border-subtle'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Leads Inbox</span>
        </Link>

        <Link
          href="/admin/content"
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            pathname === '/admin/content'
              ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
              : 'bg-surface-card text-slate-300 hover:text-white border border-border-subtle'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Content & CMS</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl bg-surface-card text-slate-400 hover:text-white border border-border-subtle"
          title="View Public Site"
        >
          <Home className="w-4 h-4" />
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
