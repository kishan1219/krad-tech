import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppPill from '@/components/layout/WhatsAppPill';
import ClarityWebVitals from '@/components/analytics/ClarityWebVitals';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kradtechnology.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KRAD Technology | Engineering Digital Experiences. Building What\'s Next.',
    template: '%s | KRAD Technology',
  },
  description:
    'KRAD Technology is a premier technology solutions company specializing in modern web applications, mobile apps, generative AI agents, custom enterprise software, and WhatsApp Business API automations.',
  keywords: [
    'KRAD Technology',
    'Software Development Company',
    'Web Development Company',
    'Mobile App Development',
    'AI Development Services',
    'WhatsApp Business API',
    'Custom Software Development',
    'SaaS Development',
    'Dedicated Developers',
    'UI/UX Design Services',
  ],
  authors: [{ name: 'KRAD Technology' }],
  creator: 'KRAD Technology',
  publisher: 'KRAD Technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'KRAD Technology',
    title: 'KRAD Technology | Engineering Digital Experiences. Building What\'s Next.',
    description:
      'Premier technology partner for startups, enterprises, and global clients delivering web, mobile, AI, and enterprise software solutions.',
    images: [
      {
        url: '/brand/krad-logo-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'KRAD Technology - WhatsApp Business API | AI Chatbots | Automation | AI Voice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KRAD Technology | Engineering Digital Experiences',
    description:
      'Full-service technology company engineering web applications, mobile apps, AI solutions, and dedicated technical teams.',
    images: ['/brand/krad-logo-banner.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/favicon.svg' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050814',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kradtechnology.com';
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KRAD Technology',
    url: currentSiteUrl,
    logo: `${currentSiteUrl}/brand/logo.svg`,
    description:
      'Full-service technology company delivering web applications, mobile applications, AI solutions, custom software, and digital production services.',
    telephone: '+919111021438',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9111021438',
      contactType: 'customer support',
      availableLanguage: ['English', 'Spanish', 'German', 'French', 'Hindi', 'Arabic'],
    },
    sameAs: ['https://wa.me/919111021438'],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "zhnmwcosqz");
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#050814] text-slate-100 flex flex-col font-sans selection:bg-[#00D2FE]/20 selection:text-[#00D2FE]">
        <ClarityWebVitals />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppPill />
        </LanguageProvider>
      </body>
    </html>
  );
}
