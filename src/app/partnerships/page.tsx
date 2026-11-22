import { Metadata } from 'next';
import PartnershipsClient from './PartnershipsClient';

export const metadata: Metadata = {
  title: 'Strategic Technology Partnerships & MOA Program | KRAD Technology',
  description:
    'Join the KRAD Technology Certified Partner Network. Scale technical delivery, white-label AI and web engineering squads, and embed the official Verified Association Badge under formal Memorandum of Association (MOA) terms.',
  openGraph: {
    title: 'Strategic Technology Partnerships & MOA Program | KRAD Technology',
    description:
      'Scale your agency, integrate enterprise SaaS, and access verified KRAD engineering squads under bilateral MOA agreements.',
    url: 'https://kradtechnology.com/partnerships',
  },
};

export default function PartnershipsPage() {
  return <PartnershipsClient />;
}
