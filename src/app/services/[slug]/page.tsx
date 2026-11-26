import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CreativeStudioShowcase from '@/components/services/CreativeStudioShowcase';

const CREATIVE_IDS = new Set([
  'graphic-design',
  'video-editing',
  'animation-vfx',
  'logo-branding',
  'ui-ux-design',
  'mobile-app-design',
]);

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_CATEGORIES.find((s) => s.id === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kradtechnology.com';

  return {
    title: `${service.title} Services`,
    description: `${service.tagline} ${service.description}`,
    keywords: [
      service.title,
      ...service.technologies,
      ...service.useCases,
      'KRAD Technology',
    ],
    alternates: {
      canonical: `${siteUrl}/services/${service.id}`,
    },
    openGraph: {
      title: `${service.title} | KRAD Technology`,
      description: service.tagline,
      url: `${siteUrl}/services/${service.id}`,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICE_CATEGORIES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const isCreative = CREATIVE_IDS.has(service.id);
  const accentText = isCreative ? 'text-[#8B5CF6]' : 'text-[#06B6D4]';
  const accentBg = isCreative
    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-violet-glow'
    : 'bg-[#06B6D4] hover:bg-[#22D3EE] text-slate-950 shadow-cyan-glow';

  const related = SERVICE_CATEGORIES.filter((s) =>
    service.relatedServices.includes(s.id)
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kradtechnology.com';
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'KRAD Technology',
      url: siteUrl,
    },
    areaServed: 'Worldwide',
    serviceType: service.title,
  };

  return (
    <div className="pt-32 bg-[#05070E] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>
          <span>/</span>
          <span className={accentText}>{isCreative ? 'Creative & Motion' : 'Engineering & AI'}</span>
          <span>/</span>
          <span className="text-slate-200">{service.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-5">
            <span
              className={`inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest ${accentText}`}
            >
              {isCreative ? (
                <Sparkles className="w-3.5 h-3.5" />
              ) : (
                <Cpu className="w-3.5 h-3.5" />
              )}
              <span>
                {isCreative ? 'Creative & Motion Studio' : 'Engineering & AI Pillar'} &bull; Vertical {service.code}
              </span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-lg text-slate-300 font-medium">{service.tagline}</p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl">
              {service.description}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href={`/project-requirements?category=${encodeURIComponent(service.title)}`}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold transition-all ${accentBg}`}
              >
                <span>Start {service.title} Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/hire-resource?role=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-200 bg-[#0B101E] hover:bg-[#121A2E] border border-white/10 transition-colors"
              >
                <span>Hire Dedicated {isCreative ? 'Creative' : 'Engineering'} Talent</span>
              </Link>
            </div>
          </div>

          {/* Quick Tech Stack Card */}
          <div className="lg:col-span-4">
            <SpotlightCard
              variant={isCreative ? 'creative' : 'engineering'}
              className="p-6 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <Layers className={`w-4 h-4 ${accentText}`} />
                <span>Core Stack &amp; Tooling</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#05070E] text-slate-200 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Subcategories Breakdown */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Capabilities &amp; Technical Scope</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subcategories.map((sub, idx) => (
              <ScrollReveal key={sub.title} index={idx}>
                <SpotlightCard
                  variant={isCreative ? 'creative' : 'engineering'}
                  className="p-6 h-full space-y-3"
                >
                  <h3 className={`text-sm font-bold ${accentText}`}>{sub.title}</h3>
                  <ul className="space-y-2">
                    {sub.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accentText}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Use Cases & Measurable Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard variant={isCreative ? 'creative' : 'engineering'} className="p-7 space-y-4">
            <h3 className="text-lg font-bold text-white">Enterprise Use Cases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.useCases.map((uc) => (
                <div
                  key={uc}
                  className="p-3 rounded-xl bg-[#05070E] border border-white/[0.08] text-xs text-slate-300 font-medium"
                >
                  {uc}
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard variant={isCreative ? 'creative' : 'engineering'} className="p-7 space-y-4">
            <h3 className="text-lg font-bold text-white">Measurable Business Outcomes</h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>

        {/* Related Services */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Complementary Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relCreative = CREATIVE_IDS.has(rel.id);
                return (
                  <Link key={rel.id} href={`/services/${rel.id}`} className="block group">
                    <SpotlightCard
                      variant={relCreative ? 'creative' : 'engineering'}
                      className="p-5 h-full flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider ${
                            relCreative ? 'text-[#8B5CF6]' : 'text-[#06B6D4]'
                          }`}
                        >
                          {relCreative ? 'Creative Studio' : 'Engineering & AI'}
                        </span>
                        <h3 className="text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors mt-1">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{rel.tagline}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-300 inline-flex items-center gap-1 pt-2">
                        Explore Service <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Visual Proof Showcase for Creative & Motion Services */}
      {isCreative && <CreativeStudioShowcase />}
    </div>
  );
}
