import { Metadata } from 'next';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata: Metadata = {
  title: 'Architecture Blueprints & Case Studies',
  description:
    'Explore KRAD Technology\'s technical case studies and conceptual architecture blueprints across Generative AI, Telemedicine, Fleet Logistics, and FinTech.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
