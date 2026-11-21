export type SupportedLocale = 'en' | 'es' | 'de' | 'fr' | 'hi' | 'ar';

export interface LocaleInfo {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export interface ServiceCategory {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  subcategories: {
    title: string;
    items: string[];
  }[];
  useCases: string[];
  benefits: string[];
  technologies: string[];
  relatedServices: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Web Development' | 'Mobile Applications' | 'AI Solutions' | 'SaaS Platforms' | 'Custom Software' | 'UI/UX Design';
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  outcomes: string[];
  isConceptualDemo: boolean;
  demoLabel: string;
}

export interface ResourceRole {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Mobile' | 'AI / Data' | 'Design & Creative' | 'DevOps & QA';
  description: string;
  skills: string[];
  commonStacks: string[];
}

export interface EngagementModel {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bestFor: string;
  features: string[];
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  service?: string;
  message: string;
  status?: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  created_at?: string;
  notes?: string;
}

export interface ResourceHire {
  id?: string;
  name: string;
  email: string;
  company?: string;
  role: string;
  skills: string[];
  seniority: 'Mid-Level' | 'Senior' | 'Lead / Architect';
  num_resources: number;
  engagement_type: string;
  start_date?: string;
  description?: string;
  status?: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  created_at?: string;
}

export interface ProjectRequirement {
  id?: string;
  client_name: string;
  work_email: string;
  phone: string;
  company_name?: string;
  country?: string;
  project_title: string;
  service_category: string;
  description: string;
  target_platforms: string[];
  preferred_stack?: string;
  estimated_budget: string;
  timeline: string;
  priority?: string;
  scope_notes?: string;
  status?: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  created_at?: string;
}

export interface SiteContentItem {
  id: string;
  category: string;
  locale: string;
  content_value: string;
  updated_at?: string;
}

export interface GlobalSettings {
  companyName: string;
  contactPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  address?: string;
  announcement?: string;
  announcementEnabled?: boolean;
}
