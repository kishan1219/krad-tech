import HeroSection from '@/components/home/HeroSection';
import CorePillars from '@/components/home/CorePillars';
import WhatWeBuild from '@/components/home/WhatWeBuild';
import FeaturedCaseStudies from '@/components/home/FeaturedCaseStudies';
import TechStackMatrix from '@/components/home/TechStackMatrix';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import IndustriesSection from '@/components/home/IndustriesSection';
import WhyKrad from '@/components/home/WhyKrad';
import CtaBanner from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CorePillars />
      <WhatWeBuild />
      <FeaturedCaseStudies />
      <TechStackMatrix />
      <ProcessTimeline />
      <IndustriesSection />
      <WhyKrad />
      <CtaBanner />
    </div>
  );
}
