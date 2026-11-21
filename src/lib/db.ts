import { supabaseAdmin } from './supabase';
import { ContactInquiry, ResourceHire, ProjectRequirement, SiteContentItem } from '@/types';
import fs from 'fs';
import path from 'path';

// Local disk fallback directory for development safety
const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOCAL_DATA_FILE = path.join(LOCAL_STORAGE_DIR, 'local_db.json');

interface LocalDbSchema {
  contact_inquiries: (ContactInquiry & { id: string; created_at: string })[];
  resource_hires: (ResourceHire & { id: string; created_at: string })[];
  project_requirements: (ProjectRequirement & { id: string; created_at: string })[];
  site_content: Record<string, string>;
}

function getLocalData(): LocalDbSchema {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DATA_FILE)) {
      const initial: LocalDbSchema = {
        contact_inquiries: [],
        resource_hires: [],
        project_requirements: [],
        site_content: {},
      };
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      contact_inquiries: [],
      resource_hires: [],
      project_requirements: [],
      site_content: {},
    };
  }
}

function saveLocalData(data: LocalDbSchema) {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write local fallback data:', err);
  }
}

// ==========================================
// 1. Contact Inquiries
// ==========================================
export async function saveContactInquiry(item: ContactInquiry) {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_inquiries')
      .insert({
        name: item.name,
        email: item.email,
        phone: item.phone || null,
        subject: item.subject,
        service: item.service || null,
        message: item.message,
        status: 'NEW',
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert warning (falling back to local storage):', error.message);
      return saveLocalContactInquiry(item);
    }
    return data;
  } catch (err) {
    console.warn('Supabase connection error (falling back to local storage):', err);
    return saveLocalContactInquiry(item);
  }
}

function saveLocalContactInquiry(item: ContactInquiry) {
  const local = getLocalData();
  const newEntry = {
    ...item,
    id: 'local-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
    status: (item.status || 'NEW') as 'NEW',
  };
  local.contact_inquiries.unshift(newEntry);
  saveLocalData(local);
  return newEntry;
}

export async function getContactInquiries(statusFilter?: string) {
  try {
    let query = supabaseAdmin.from('contact_inquiries').select('*').order('created_at', { ascending: false });
    if (statusFilter && statusFilter !== 'ALL') {
      query = query.eq('status', statusFilter);
    }
    const { data, error } = await query;
    if (error || !data) {
      return getLocalContactInquiries(statusFilter);
    }
    return data;
  } catch {
    return getLocalContactInquiries(statusFilter);
  }
}

function getLocalContactInquiries(statusFilter?: string) {
  const local = getLocalData();
  if (statusFilter && statusFilter !== 'ALL') {
    return local.contact_inquiries.filter((x) => x.status === statusFilter);
  }
  return local.contact_inquiries;
}

export async function updateLeadStatus(type: 'contact' | 'hire' | 'project', id: string, status: string, notes?: string) {
  const tableMap = {
    contact: 'contact_inquiries',
    hire: 'resource_hires',
    project: 'project_requirements',
  };
  try {
    const payload: Record<string, string> = { status };
    if (notes !== undefined) payload.notes = notes;

    const { data, error } = await supabaseAdmin
      .from(tableMap[type])
      .update(payload)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch {
    // Update locally
    const local = getLocalData();
    if (type === 'contact') {
      const idx = local.contact_inquiries.findIndex((x) => x.id === id);
      if (idx !== -1) {
        local.contact_inquiries[idx].status = status as ContactInquiry['status'];
        if (notes) local.contact_inquiries[idx].notes = notes;
      }
    } else if (type === 'hire') {
      const idx = local.resource_hires.findIndex((x) => x.id === id);
      if (idx !== -1) local.resource_hires[idx].status = status as ResourceHire['status'];
    } else if (type === 'project') {
      const idx = local.project_requirements.findIndex((x) => x.id === id);
      if (idx !== -1) local.project_requirements[idx].status = status as ProjectRequirement['status'];
    }
    saveLocalData(local);
    return [{ id, status }];
  }
}

// ==========================================
// 2. Resource Hires
// ==========================================
export async function saveResourceHire(item: ResourceHire) {
  try {
    const { data, error } = await supabaseAdmin
      .from('resource_hires')
      .insert({
        name: item.name,
        email: item.email,
        company: item.company || null,
        role: item.role,
        skills: item.skills || [],
        seniority: item.seniority,
        num_resources: item.num_resources || 1,
        engagement_type: item.engagement_type,
        start_date: item.start_date || null,
        description: item.description || null,
        status: 'NEW',
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase hire insert warning (falling back to local):', error.message);
      return saveLocalResourceHire(item);
    }
    return data;
  } catch (err) {
    console.warn('Supabase connection error (falling back to local):', err);
    return saveLocalResourceHire(item);
  }
}

function saveLocalResourceHire(item: ResourceHire) {
  const local = getLocalData();
  const newEntry = {
    ...item,
    id: 'local-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
    status: (item.status || 'NEW') as 'NEW',
  };
  local.resource_hires.unshift(newEntry);
  saveLocalData(local);
  return newEntry;
}

export async function getResourceHires(statusFilter?: string) {
  try {
    let query = supabaseAdmin.from('resource_hires').select('*').order('created_at', { ascending: false });
    if (statusFilter && statusFilter !== 'ALL') {
      query = query.eq('status', statusFilter);
    }
    const { data, error } = await query;
    if (error || !data) {
      const local = getLocalData();
      return statusFilter && statusFilter !== 'ALL'
        ? local.resource_hires.filter((x) => x.status === statusFilter)
        : local.resource_hires;
    }
    return data;
  } catch {
    const local = getLocalData();
    return statusFilter && statusFilter !== 'ALL'
      ? local.resource_hires.filter((x) => x.status === statusFilter)
      : local.resource_hires;
  }
}

// ==========================================
// 3. Project Requirements (5-Step Wizard)
// ==========================================
export async function saveProjectRequirement(item: ProjectRequirement) {
  try {
    const { data, error } = await supabaseAdmin
      .from('project_requirements')
      .insert({
        client_name: item.client_name,
        work_email: item.work_email,
        phone: item.phone,
        company_name: item.company_name || null,
        country: item.country || null,
        project_title: item.project_title,
        service_category: item.service_category,
        description: item.description,
        target_platforms: item.target_platforms || [],
        preferred_stack: item.preferred_stack || null,
        estimated_budget: item.estimated_budget,
        timeline: item.timeline,
        priority: item.priority || 'Standard',
        scope_notes: item.scope_notes || null,
        status: 'NEW',
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase project requirement warning (falling back to local):', error.message);
      return saveLocalProjectRequirement(item);
    }
    return data;
  } catch (err) {
    console.warn('Supabase error (falling back to local):', err);
    return saveLocalProjectRequirement(item);
  }
}

function saveLocalProjectRequirement(item: ProjectRequirement) {
  const local = getLocalData();
  const newEntry = {
    ...item,
    id: 'local-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
    status: (item.status || 'NEW') as 'NEW',
  };
  local.project_requirements.unshift(newEntry);
  saveLocalData(local);
  return newEntry;
}

export async function getProjectRequirements(statusFilter?: string) {
  try {
    let query = supabaseAdmin.from('project_requirements').select('*').order('created_at', { ascending: false });
    if (statusFilter && statusFilter !== 'ALL') {
      query = query.eq('status', statusFilter);
    }
    const { data, error } = await query;
    if (error || !data) {
      const local = getLocalData();
      return statusFilter && statusFilter !== 'ALL'
        ? local.project_requirements.filter((x) => x.status === statusFilter)
        : local.project_requirements;
    }
    return data;
  } catch {
    const local = getLocalData();
    return statusFilter && statusFilter !== 'ALL'
      ? local.project_requirements.filter((x) => x.status === statusFilter)
      : local.project_requirements;
  }
}

// ==========================================
// 4. Site Content & Translation Overrides (Admin CMS)
// ==========================================
export async function getSiteContentOverrides(locale: string = 'en') {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('*')
      .eq('locale', locale);

    if (error || !data) {
      const local = getLocalData();
      return local.site_content;
    }
    const map: Record<string, string> = {};
    data.forEach((item: SiteContentItem) => {
      map[item.id] = item.content_value;
    });
    return map;
  } catch {
    const local = getLocalData();
    return local.site_content;
  }
}

export async function updateSiteContentOverride(id: string, category: string, locale: string, value: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .upsert({
        id,
        category,
        locale,
        content_value: value,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) throw error;
    return data;
  } catch {
    const local = getLocalData();
    local.site_content[id] = value;
    saveLocalData(local);
    return [{ id, content_value: value }];
  }
}

// ==========================================
// 5. Admin KPI Statistics
// ==========================================
export async function getLeadStats() {
  const [contacts, hires, projects] = await Promise.all([
    getContactInquiries(),
    getResourceHires(),
    getProjectRequirements(),
  ]);

  const newContacts = contacts.filter((x) => x.status === 'NEW').length;
  const newHires = hires.filter((x) => x.status === 'NEW').length;
  const newProjects = projects.filter((x) => x.status === 'NEW').length;

  return {
    totalInquiries: contacts.length,
    newInquiries: newContacts,
    totalHires: hires.length,
    newHires,
    totalProjects: projects.length,
    newProjects,
    totalLeads: contacts.length + hires.length + projects.length,
    pendingLeads: newContacts + newHires + newProjects,
  };
}
