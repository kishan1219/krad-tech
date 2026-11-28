'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminNav from './AdminNav';
import {
  Inbox,
  UserCheck,
  FileCode,
  Search,
  Mail,
  Loader2,
  Calendar,
  MessageCircle,
  Save,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  Server,
  Database,
  Shield,
  Activity,
  Globe,
} from 'lucide-react';

interface LeadItem {
  id: string;
  name?: string;
  client_name?: string;
  email?: string;
  work_email?: string;
  phone?: string;
  company?: string;
  company_name?: string;
  country?: string;
  role?: string;
  project_title?: string;
  subject?: string;
  service?: string;
  service_category?: string;
  message?: string;
  description?: string;
  scope_notes?: string;
  status: string;
  created_at: string;
  target_platforms?: string[];
  preferred_stack?: string;
  skills?: string[];
  seniority?: string;
  num_resources?: number;
  engagement_type?: string;
  estimated_budget?: string;
  timeline?: string;
  priority?: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  source: string;
  message: string;
  details?: Record<string, unknown> | string;
  path?: string;
  ip?: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'cms' | 'logs'>('leads');
  const [loading, setLoading] = useState(true);

  // Leads State
  const [leadData, setLeadData] = useState<{
    contacts: LeadItem[];
    hires: LeadItem[];
    projects: LeadItem[];
    stats: Record<string, number>;
  }>({
    contacts: [],
    hires: [],
    projects: [],
    stats: {},
  });
  const [subTab, setSubTab] = useState<'contacts' | 'hires' | 'projects'>('contacts');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // CMS State
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({
    hero_headline: 'Engineering Digital Experiences. Building What\'s Next.',
    hero_subtext: 'From intelligent AI solutions to powerful web and mobile applications, KRAD Technology helps businesses transform ideas into scalable digital products.',
    contact_phone: '+91 91110 21438',
    whatsapp_number: '919111021438',
    contact_email: 'info@kradtechnology.com',
    stat_uptime: '99.98%',
    stat_delivered: '45+',
    stat_latency: 'Sub-40ms',
  });
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [cmsSuccess, setCmsSuccess] = useState('');
  const [cmsError, setCmsError] = useState('');

  // Logs State
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logLevelFilter, setLogLevelFilter] = useState<'ALL' | 'ERROR' | 'WARN' | 'INFO'>('ALL');
  const [logSearch, setLogSearch] = useState('');

  // Helper for auth headers (relies on HttpOnly cookie)
  const getAuthHeaders = (): HeadersInit => {
    return { 'Content-Type': 'application/json' };
  };

  // 1. Fetch Leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${statusFilter}`, {
        headers: getAuthHeaders(),
      });
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setLeadData(json);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  // 2. Fetch CMS Content
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content?locale=en', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          setCmsContent((prev) => ({
            ...prev,
            hero_headline: data['hero_headline_en'] || data['hero_headline'] || prev.hero_headline,
            hero_subtext: data['hero_subtext_en'] || data['hero_subtext'] || prev.hero_subtext,
            contact_phone: data['contact_phone'] || prev.contact_phone,
            whatsapp_number: data['whatsapp_number'] || prev.whatsapp_number,
            contact_email: data['contact_email'] || prev.contact_email,
            stat_uptime: data['stat_uptime'] || prev.stat_uptime,
            stat_delivered: data['stat_delivered'] || prev.stat_delivered,
            stat_latency: data['stat_latency'] || prev.stat_latency,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch CMS content:', err);
    }
  }, []);

  // 3. Fetch Error Logs
  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const res = await fetch('/api/admin/logs', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.logs && Array.isArray(data.logs)) {
          setLogs(data.logs);
        }
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLogsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    fetchContent();
    fetchLogs();
  }, [fetchLeads, fetchContent, fetchLogs]);

  // Handle Lead Status Updates
  const handleStatusChange = async (type: 'contact' | 'hire' | 'project', id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ type, id, status: newStatus }),
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle CMS Content Save
  const handleSaveField = async (id: string, category: string, value: string) => {
    setSavingKey(id);
    setCmsSuccess('');
    setCmsError('');

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          id,
          category,
          locale: 'en',
          value,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update content.');
      }
      setCmsSuccess(`"${id}" updated successfully! Changes take effect immediately.`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error updating content';
      setCmsError(message);
    } finally {
      setSavingKey(null);
    }
  };

  // Handle Clear Logs
  const handleClearLogs = async () => {
    if (!confirm('Are you sure you want to clear all system error logs?')) return;
    try {
      const res = await fetch('/api/admin/logs', {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        fetchLogs();
      }
    } catch (err) {
      console.error('Failed to clear logs:', err);
    }
  };

  // Filter Leads
  const filterLeads = (items: LeadItem[]) => {
    if (!searchQuery) return items;
    return items.filter((item) => {
      const text = JSON.stringify(item).toLowerCase();
      return text.includes(searchQuery.toLowerCase());
    });
  };

  const currentLeads =
    subTab === 'contacts'
      ? filterLeads(leadData.contacts || [])
      : subTab === 'hires'
      ? filterLeads(leadData.hires || [])
      : filterLeads(leadData.projects || []);

  // Filter Logs
  const filteredLogs = logs.filter((log) => {
    const matchesLevel = logLevelFilter === 'ALL' || log.level === logLevelFilter;
    const matchesSearch =
      !logSearch ||
      log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.source.toLowerCase().includes(logSearch.toLowerCase()) ||
      (log.path && log.path.toLowerCase().includes(logSearch.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const totalErrors = logs.filter((l) => l.level === 'ERROR').length;
  const newLeadsCount =
    (leadData.stats?.newInquiries || 0) +
    (leadData.stats?.newHires || 0) +
    (leadData.stats?.newProjects || 0);

  return (
    <div className="pt-32 pb-24 bg-[#050814] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Bar */}
        <AdminNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          errorCount={totalErrors}
          newLeadsCount={newLeadsCount}
        />

        {/* ============================================================ */}
        {/* TAB 1: CLIENT MESSAGE REQUESTS & LEADS INBOX                */}
        {/* ============================================================ */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">Total Inbound Leads</span>
                  <Inbox className="w-4 h-4 text-[#00D2FE]" />
                </div>
                <span className="text-2xl font-bold text-white">{leadData.stats?.totalLeads || 0}</span>
                <span className="text-[10px] text-emerald-400 block mt-1 font-mono">100% Edge captured</span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">Contact Inquiries</span>
                  <Mail className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <span className="text-2xl font-bold text-white">{leadData.stats?.totalInquiries || 0}</span>
                <span className="text-[10px] text-amber-400 block mt-1 font-mono">
                  {leadData.stats?.newInquiries || 0} pending review
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">Resource Hires</span>
                  <UserCheck className="w-4 h-4 text-[#818CF8]" />
                </div>
                <span className="text-2xl font-bold text-white">{leadData.stats?.totalHires || 0}</span>
                <span className="text-[10px] text-amber-400 block mt-1 font-mono">
                  {leadData.stats?.newHires || 0} pending review
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">Project Scopes</span>
                  <FileCode className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <span className="text-2xl font-bold text-white">{leadData.stats?.totalProjects || 0}</span>
                <span className="text-[10px] text-amber-400 block mt-1 font-mono">
                  {leadData.stats?.newProjects || 0} pending review
                </span>
              </div>
            </div>

            {/* Sub-tabs & Search Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-card border border-border-subtle">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setSubTab('contacts')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    subTab === 'contacts'
                      ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Contact Messages ({leadData.contacts?.length || 0})
                </button>

                <button
                  onClick={() => setSubTab('hires')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    subTab === 'hires'
                      ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Hire Requests ({leadData.hires?.length || 0})
                </button>

                <button
                  onClick={() => setSubTab('projects')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    subTab === 'projects'
                      ? 'bg-[#00D2FE] text-slate-900 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Project Scopes ({leadData.projects?.length || 0})
                </button>
              </div>

              {/* Search & Status Filter */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search client name, email, scope..."
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

            {/* Leads List Items */}
            {loading ? (
              <div className="p-16 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#00D2FE] mx-auto mb-2" />
                <span className="text-xs font-mono text-slate-400">Loading client inquiry database...</span>
              </div>
            ) : currentLeads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-surface-card border border-border-subtle text-slate-500 text-xs">
                No inquiries matching the selected criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {currentLeads.map((item: LeadItem) => {
                  const clientName = item.name || item.client_name || 'Anonymous Client';
                  const clientEmail = item.email || item.work_email || '';
                  const clientPhone = item.phone || '';
                  const cleanPhone = clientPhone.replace(/[^0-9]/g, '');

                  return (
                    <div
                      key={item.id}
                      className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-[#00D2FE]/40 transition-all shadow-md space-y-4"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                        <div className="flex flex-wrap items-center gap-3">
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
                          <h3 className="text-sm font-bold text-white">{clientName}</h3>
                          {item.company_name && (
                            <span className="text-xs text-slate-400 font-mono">({item.company_name})</span>
                          )}
                          {item.country && (
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">
                              📍 {item.country}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.created_at || Date.now()).toLocaleString()}
                          </span>

                          {/* Status Dropdown */}
                          <select
                            value={item.status || 'NEW'}
                            disabled={updatingId === item.id}
                            onChange={(e) => {
                              const type =
                                subTab === 'contacts' ? 'contact' : subTab === 'hires' ? 'hire' : 'project';
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

                      {/* Client Meta Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500 block mb-0.5">Email Address:</span>
                          {clientEmail ? (
                            <a href={`mailto:${clientEmail}`} className="text-[#00D2FE] hover:underline font-mono">
                              {clientEmail}
                            </a>
                          ) : (
                            <span className="text-slate-500">Not provided</span>
                          )}
                        </div>

                        <div>
                          <span className="text-slate-500 block mb-0.5">Phone / WhatsApp:</span>
                          {clientPhone ? (
                            <span className="text-slate-200 font-mono">{clientPhone}</span>
                          ) : (
                            <span className="text-slate-500">Not provided</span>
                          )}
                        </div>

                        {item.service_category && (
                          <div>
                            <span className="text-slate-500 block mb-0.5">Service Category:</span>
                            <span className="text-white font-semibold">{item.service_category}</span>
                          </div>
                        )}

                        {item.estimated_budget && (
                          <div>
                            <span className="text-slate-500 block mb-0.5">Budget & Timeline:</span>
                            <span className="text-emerald-400 font-mono font-semibold">{item.estimated_budget}</span>
                            <span className="text-slate-400 block text-[11px]">({item.timeline || 'Flexible'})</span>
                          </div>
                        )}

                        {item.role && (
                          <div>
                            <span className="text-slate-500 block mb-0.5">Requested Role:</span>
                            <span className="text-white font-semibold">{item.role}</span>
                            <span className="text-slate-400 block text-[11px]">
                              {item.engagement_type} • {item.seniority}
                            </span>
                          </div>
                        )}

                        {item.target_platforms && item.target_platforms.length > 0 && (
                          <div className="lg:col-span-2">
                            <span className="text-slate-500 block mb-0.5">Target Platforms:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.target_platforms.map((p) => (
                                <span
                                  key={p}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#00D2FE]/10 text-[#00D2FE] border border-[#00D2FE]/20 font-mono"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="p-3.5 rounded-xl bg-[#050814] border border-border-subtle text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-500 font-mono block mb-1">Client Scope / Description:</span>
                        <p>{item.message || item.description || item.scope_notes || 'No description provided.'}</p>
                      </div>

                      {/* 1-Click Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hello ${clientName}, thank you for reaching out to KRAD Technology regarding your ${
                                item.project_title || item.service_category || 'project'
                              }. I am following up on your inquiry.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all text-xs font-semibold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply via WhatsApp</span>
                          </a>
                        )}

                        {clientEmail && (
                          <a
                            href={`mailto:${clientEmail}?subject=${encodeURIComponent(
                              `KRAD Technology - Follow up on your ${item.project_title || 'inquiry'}`
                            )}&body=${encodeURIComponent(
                              `Hi ${clientName},\n\nThank you for reaching out to KRAD Technology regarding your project.\n\nBest regards,\nKRAD Technology Team`
                            )}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-border-subtle text-slate-200 hover:text-white hover:border-[#00D2FE]/40 transition-all text-xs font-semibold"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#00D2FE]" />
                            <span>Send Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: HOMEPAGE DIRECT CONTENT MANAGER (LIVE CMS)           */}
        {/* ============================================================ */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#00D2FE]" />
                <span>Homepage Direct Content Manager</span>
              </h2>
              <p className="text-xs text-slate-400">
                Modify display headlines, contact touchpoints, and trust statistics in real-time. Changes are stored in Supabase and update the public homepage immediately.
              </p>
            </div>

            {cmsSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{cmsSuccess}</span>
              </div>
            )}

            {cmsError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{cmsError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Headline */}
              <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#00D2FE] uppercase font-bold mb-1">
                    Hero Display Headline
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Primary banner headline shown to first-time desktop and mobile visitors.
                  </p>
                  <input
                    type="text"
                    value={cmsContent.hero_headline}
                    onChange={(e) => setCmsContent({ ...cmsContent, hero_headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  />
                </div>
                <button
                  onClick={() => handleSaveField('hero_headline_en', 'hero', cmsContent.hero_headline)}
                  disabled={savingKey === 'hero_headline_en'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] transition-colors"
                >
                  {savingKey === 'hero_headline_en' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Headline</span>
                </button>
              </div>

              {/* Hero Subtext */}
              <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#00D2FE] uppercase font-bold mb-1">
                    Hero Subtitle & Value Proposition
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Supporting copy under the main display headline.
                  </p>
                  <textarea
                    rows={3}
                    value={cmsContent.hero_subtext}
                    onChange={(e) => setCmsContent({ ...cmsContent, hero_subtext: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none leading-relaxed"
                  />
                </div>
                <button
                  onClick={() => handleSaveField('hero_subtext_en', 'hero', cmsContent.hero_subtext)}
                  disabled={savingKey === 'hero_subtext_en'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] transition-colors"
                >
                  {savingKey === 'hero_subtext_en' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Subtitle</span>
                </button>
              </div>

              {/* Contact Phone & WhatsApp */}
              <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#00D2FE] uppercase font-bold mb-1">
                    Direct Contact Phone & WhatsApp
                  </label>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Display Phone:</span>
                      <input
                        type="text"
                        value={cmsContent.contact_phone}
                        onChange={(e) => setCmsContent({ ...cmsContent, contact_phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-[#050814] border border-border-subtle text-white text-xs outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">WhatsApp International Number (digits only):</span>
                      <input
                        type="text"
                        value={cmsContent.whatsapp_number}
                        onChange={(e) => setCmsContent({ ...cmsContent, whatsapp_number: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-[#050814] border border-border-subtle text-white text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSaveField('contact_phone', 'contact', cmsContent.contact_phone);
                    handleSaveField('whatsapp_number', 'contact', cmsContent.whatsapp_number);
                  }}
                  disabled={Boolean(savingKey)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Phone Touchpoints</span>
                </button>
              </div>

              {/* Trust Metrics & Counters */}
              <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#00D2FE] uppercase font-bold mb-1">
                    Live Engineering Trust Metrics
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Uptime SLA:</span>
                      <input
                        type="text"
                        value={cmsContent.stat_uptime}
                        onChange={(e) => setCmsContent({ ...cmsContent, stat_uptime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#050814] border border-border-subtle text-white text-xs outline-none font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Systems:</span>
                      <input
                        type="text"
                        value={cmsContent.stat_delivered}
                        onChange={(e) => setCmsContent({ ...cmsContent, stat_delivered: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#050814] border border-border-subtle text-white text-xs outline-none font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Edge Latency:</span>
                      <input
                        type="text"
                        value={cmsContent.stat_latency}
                        onChange={(e) => setCmsContent({ ...cmsContent, stat_latency: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#050814] border border-border-subtle text-white text-xs outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSaveField('stat_uptime', 'stats', cmsContent.stat_uptime);
                    handleSaveField('stat_delivered', 'stats', cmsContent.stat_delivered);
                    handleSaveField('stat_latency', 'stats', cmsContent.stat_latency);
                  }}
                  disabled={Boolean(savingKey)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-[#00D2FE] hover:bg-[#38BDF8] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Metrics</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: SYSTEM ERROR LOGS & HEALTH TELEMETRY                 */}
        {/* ============================================================ */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            {/* Health Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Edge Gateway</span>
                  <span className="text-xs font-bold text-white">Cloudflare Pages Worker</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00D2FE]/10 border border-[#00D2FE]/20 flex items-center justify-center text-[#00D2FE]">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Database Cluster</span>
                  <span className="text-xs font-bold text-white">Supabase REST API</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Auth Session</span>
                  <span className="text-xs font-bold text-white">Timing-Safe Bearer / Cookie</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Active Errors</span>
                  <span className="text-xs font-bold text-white">{totalErrors} Detected</span>
                </div>
              </div>
            </div>

            {/* Filter and Action Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-card border border-border-subtle">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setLogLevelFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    logLevelFilter === 'ALL'
                      ? 'bg-[#00D2FE] text-slate-900'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  All ({logs.length})
                </button>
                <button
                  onClick={() => setLogLevelFilter('ERROR')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    logLevelFilter === 'ERROR'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  Errors ({totalErrors})
                </button>
                <button
                  onClick={() => setLogLevelFilter('WARN')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    logLevelFilter === 'WARN'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  Warnings
                </button>
                <button
                  onClick={() => setLogLevelFilter('INFO')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    logLevelFilter === 'INFO'
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  Info
                </button>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search error messages..."
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#050814] border border-border-subtle focus:border-[#00D2FE] text-white text-xs outline-none"
                  />
                </div>

                <button
                  onClick={fetchLogs}
                  disabled={logsLoading}
                  className="p-2 rounded-xl bg-surface-card hover:bg-white/10 border border-border-subtle text-slate-300"
                  title="Refresh Logs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${logsLoading ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleClearLogs}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Logs</span>
                </button>
              </div>
            </div>

            {/* Logs List */}
            {logsLoading ? (
              <div className="p-16 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#00D2FE] mx-auto mb-2" />
                <span className="text-xs font-mono text-slate-400">Loading diagnostic logs...</span>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-surface-card border border-border-subtle text-slate-500 text-xs">
                No error logs recorded. All systems operating within normal parameters.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-xl bg-surface-card border border-border-subtle font-mono text-xs space-y-2 hover:border-[#00D2FE]/30 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.level === 'ERROR'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                              : log.level === 'WARN'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          }`}
                        >
                          {log.level}
                        </span>
                        <span className="text-slate-300 font-semibold">{log.source}</span>
                        {log.path && <span className="text-slate-500 text-[11px]">{log.path}</span>}
                      </div>

                      <span className="text-slate-500 text-[11px]">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-slate-200 break-words">{log.message}</div>

                    {log.details && (
                      <pre className="p-2.5 rounded-lg bg-[#050814] border border-border-subtle text-[11px] text-slate-400 overflow-x-auto">
                        {typeof log.details === 'object'
                          ? JSON.stringify(log.details, null, 2)
                          : String(log.details)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
