import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Technology Services & Digital Capabilities',
  description:
    'Explore KRAD Technology\'s 11 core service verticals: Web & Mobile Engineering, Generative AI & WhatsApp Business API, Custom Software ERPs, UI/UX, and Digital Production.',
};

export default function ServicesPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Technology Development & Digital Services',
    provider: {
      '@type': 'Organization',
      name: 'KRAD Technology',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KRAD Technology Services Catalog',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Application Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Application Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Business Solutions & WhatsApp API' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design & Prototyping' } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
