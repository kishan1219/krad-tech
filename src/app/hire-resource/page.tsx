import { Metadata } from 'next';
import HireResourceClient from './HireResourceClient';

export const metadata: Metadata = {
  title: 'Hire Dedicated Developers & Technical Teams',
  description:
    'Hire dedicated frontend, React, Next.js, Node.js, Python, full-stack, mobile, AI/ML engineers, and UI/UX designers from KRAD Technology on flexible engagement models.',
};

export default function HireResourcePage() {
  return <HireResourceClient />;
}
