'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import {
  Inbox,
  UserCheck,
  FileCode,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
} from 'lucide-react';

export default function AdminLeadsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    contacts: any[];
    hires: any[];
    projects: any[];
    stats: any;
  }>({
    contacts: [],
    hires: [],
    projects: [],
    stats: {},
  });

  const [activeTab, setActiveTab] = useState<'contacts' | 'hires' | 'projects'>('contacts');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${statusFilter}`);
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleStatusChange = async (type: 'contact' | 'hire' | 'project', id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status: newStatus }),
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter items by search
  const filterList = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter((item) => {
      const text = JSON.stringify(item).toLowerCase();
      return text.includes(searchQuery.toLowerCase());
    });
  };

  const currentList =
    activeTab === 'contacts'
      ? filterList(data.contacts || [])
      : activeTab === 'hires'
      ? filterList(data.hires || [])
      : filterList(data.projects || []);

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminNav />

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">Total Leads</span>
              <Inbox className="w-4 h-4 text-[#00D2FE]" />
            </div>
            <span className="text-2xl font-bold text-white">{data.stats?.totalLeads || 0}</span>
          </div>

          <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">Contact Inquiries</span>
              <Mail className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <span className="text-2xl font-bold text-white">{data.stats?.totalInquiries || 0}</span>
            <span className="text-[10px] text-amber-400 block mt-1 font-mono">{data.stats?.newInquiries || 0} new</span>
          </div>

          <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">Resource Hires</span>
              <UserCheck className="w-4 h-4 text-[#818CF8]" />
            </div>
            <span className="text-2xl font-bold text-white">{data.stats?.totalHires || 0}</span>
            <span className="text-[10px] text-amber-400 block mt-1 font-mono">{data.stats?.newHires || 0} new</span>
          </div>

          <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">Project Scopes</span>
              <FileCode className="w-4 h-4 text-[#A78BFA]" />
            </div>
            <span className="text-2xl font-bold text-white">{data.stats?.totalProjects || 0}</span>
            <span className="text-[10px] text-amber-400 block mt-1 font-mono">{data.stats?.newProjects || 0} new</span>
          </div>
        </div>

        {/* Tab Controls & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-card border border-border-subtle mb-6">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact Messages ({data.contacts?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('hires')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'hires'
                  ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Hire Requests ({data.hires?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Project Scopes ({data.projects?.length || 0})
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#050814] border border-border-subtle text-slate-300 text-xs outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Lead List Items */}
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#00D2FE] mx-auto mb-2" />
            <span className="text-xs font-mono text-slate-400">Loading lead database...</span>
          </div>
        ) : currentList.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface-card border border-border-subtle text-slate-500 text-xs">
            No leads found matching the selected criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((item: any) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-[#00D2FE]/40 transition-all shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold ${
                        item.status === 'NEW'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                          : item.status === 'CONTACTED'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/25'
                          : item.status === 'RESOLVED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                          : 'bg-white/5 text-slate-400 border border-border-subtle'
                      }`}
                    >
                      {item.status || 'NEW'}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {item.name || item.client_name}
                    </h3>
                    {item.company && (
                      <span className="text-xs text-slate-400 font-mono">({item.company})</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.created_at || Date.now()).toLocaleDateString()}
                    </span>

                    {/* Status Dropdown */}
                    <select
                      value={item.status || 'NEW'}
                      disabled={updatingId === item.id}
                      onChange={(e) => {
                        const type = activeTab === 'contacts' ? 'contact' : activeTab === 'hires' ? 'hire' : 'project';
                        handleStatusChange(type, item.id, e.target.value);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#050814] border border-border-subtle text-slate-300 text-xs outline-none"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Lead Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Contact Email:</span>
                    <a
                      href={`mailto:${item.email || item.work_email}`}
                      className="text-[#00D2FE] hover:underline font-mono"
                    >
                      {item.email || item.work_email}
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-0.5">Telephone:</span>
                    <a
                      href={`tel:${item.phone}`}
                      className="text-slate-300 hover:text-white font-mono"
                    >
                      {item.phone || 'N/A'}
                    </a>
                  </div>

                  {item.role && (
                    <div>
                      <span className="text-slate-500 block mb-0.5">Role & Model:</span>
                      <span className="text-white font-semibold">{item.role}</span>
                      <span className="text-slate-400 block text-[11px]">({item.engagement_type} • {item.seniority})</span>
                    </div>
                  )}

                  {item.project_title && (
                    <div>
                      <span className="text-slate-500 block mb-0.5">Project Scope:</span>
                      <span className="text-white font-semibold">{item.project_title}</span>
                      <span className="text-slate-400 block text-[11px]">
                        Budget: {item.estimated_budget} • Timeline: {item.timeline}
                      </span>
                    </div>
                  )}

                  {item.subject && (
                    <div>
                      <span className="text-slate-500 block mb-0.5">Subject:</span>
                      <span className="text-white font-semibold">{item.subject}</span>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className="p-3.5 rounded-xl bg-[#050814] border border-border-subtle text-xs text-slate-300 leading-relaxed">
                  <span className="text-slate-500 font-mono block mb-1">Inquiry Content:</span>
                  <p>{item.message || item.description || 'No additional text provided.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
