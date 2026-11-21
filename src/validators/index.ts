import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid business email address'),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy to submit',
  }),
  // Honeypot field for bot trapping
  _hp_company_field: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export const ResourceHireSchema = z.object({
  name: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Please enter a valid work email'),
  company: z.string().optional().or(z.literal('')),
  role: z.string().min(2, 'Please select a role'),
  skills: z.array(z.string()).optional().default([]),
  seniority: z.enum(['Mid-Level', 'Senior', 'Lead / Architect']),
  num_resources: z.number().min(1).max(20).default(1),
  engagement_type: z.string().min(2, 'Please select an engagement type'),
  start_date: z.string().optional().or(z.literal('')),
  description: z.string().max(2000).optional().or(z.literal('')),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
  _hp_company_field: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export const ProjectRequirementSchema = z.object({
  // Step 1: Contact
  client_name: z.string().min(2, 'Full name is required').max(100),
  work_email: z.string().email('Please enter a valid business email'),
  phone: z.string().min(7, 'Please enter a valid telephone number'),
  company_name: z.string().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),

  // Step 2: Project Info
  project_title: z.string().min(3, 'Project title is required').max(150),
  service_category: z.string().min(2, 'Please select a primary service category'),
  description: z.string().min(15, 'Please provide at least 15 characters describing your project'),

  // Step 3: Technical
  target_platforms: z.array(z.string()).min(1, 'Please select at least one target platform'),
  preferred_stack: z.string().optional().or(z.literal('')),

  // Step 4: Budget & Timeline
  estimated_budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a target timeline'),
  priority: z.string().optional().default('Standard'),

  // Step 5: Notes & Consent
  scope_notes: z.string().max(3000).optional().or(z.literal('')),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
  _hp_company_field: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export const AdminLoginSchema = z.object({
  username: z.string().min(3, 'Username required'),
  password: z.string().min(6, 'Password required'),
});

export const ContentOverrideSchema = z.object({
  id: z.string().min(2),
  category: z.string().min(2),
  locale: z.string().min(2),
  value: z.string().min(1),
});
