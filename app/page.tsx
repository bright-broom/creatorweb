'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/hero';
import { WorksGallery } from '@/components/sections/works';
import { SkillsSection } from '@/components/sections/skills';
import { AchievementsSection } from '@/components/sections/achievements';
import { ContactSection } from '@/components/sections/contact';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

/**
 * ホームページコンポーネント
 * 各セクションをSuspenseでラップして表示
 * @returns {JSX.Element} ホームページのレイアウト
 */
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen pt-16 mx-auto">
      <Suspense fallback={<LoadingSpinner size="lg" color="accent" text="Loading hero section..." />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" color="accent" text="Loading works gallery..." />}>
        <WorksGallery />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" color="accent" text="Loading skills section..." />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" color="accent" text="Loading achievements section..." />}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" color="accent" text="Loading contact section..." />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}