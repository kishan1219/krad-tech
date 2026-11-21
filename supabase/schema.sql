-- ==============================================================================
-- KRAD Technology - Supabase PostgreSQL Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'NEW', -- NEW, CONTACTED, IN_PROGRESS, RESOLVED, ARCHIVED
  notes TEXT
);

-- 2. Dedicated Resource Hiring Table
CREATE TABLE IF NOT EXISTS public.resource_hires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  seniority TEXT NOT NULL DEFAULT 'Senior',
  num_resources INT DEFAULT 1,
  engagement_type TEXT NOT NULL,
  start_date TEXT,
  description TEXT,
  status TEXT DEFAULT 'NEW'
);

-- 3. 5-Step Project Requirements Table
CREATE TABLE IF NOT EXISTS public.project_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  country TEXT,
  project_title TEXT NOT NULL,
  service_category TEXT NOT NULL,
  description TEXT NOT NULL,
  target_platforms TEXT[] DEFAULT '{}',
  preferred_stack TEXT,
  estimated_budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  priority TEXT DEFAULT 'Standard',
  scope_notes TEXT,
  status TEXT DEFAULT 'NEW'
);

-- 4. Dynamic Site Content & Translation Overrides (Admin CMS)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'general',
  locale TEXT NOT NULL DEFAULT 'en',
  content_value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Distributed Rate Limiting Table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  identifier TEXT PRIMARY KEY,
  requests_count INT DEFAULT 1,
  last_request_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial default content seeds for Admin CMS
INSERT INTO public.site_content (id, category, locale, content_value)
VALUES 
  ('hero_headline_en', 'hero', 'en', 'Engineering Digital Experiences. Building What''s Next.'),
  ('hero_subtext_en', 'hero', 'en', 'From intelligent AI solutions to powerful web and mobile applications, KRAD Technology helps businesses transform ideas into scalable digital products.'),
  ('contact_phone', 'contact', 'en', '+91 91110 21438'),
  ('whatsapp_number', 'contact', 'en', '919111021438'),
  ('contact_email', 'contact', 'en', 'contact@kradtechnology.com')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions for service role and anon
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_hires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow anon to insert leads
CREATE POLICY "Allow public insert to contact_inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to resource_hires" ON public.resource_hires FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to project_requirements" ON public.project_requirements FOR INSERT WITH CHECK (true);

-- Allow public read of site_content
CREATE POLICY "Allow public read site_content" ON public.site_content FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Service role full access inquiries" ON public.contact_inquiries USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access hires" ON public.resource_hires USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access requirements" ON public.project_requirements USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access site_content" ON public.site_content USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access rate_limits" ON public.rate_limits USING (true) WITH CHECK (true);
