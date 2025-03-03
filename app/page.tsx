'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/hero';
import { WorksGallery } from '@/components/sections/works';
import { SkillsSection } from '@/components/sections/skills';
import { AchievementsSection } from '@/components/sections/achievements';
import { ContactSection } from '@/components/sections/contact';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// =============================
// Suspense でラップする汎用コンポーネント
// =============================
interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallbackText: string;
}

const SuspenseWrapper = ({ children, fallbackText }: SuspenseWrapperProps) => (
  <Suspense fallback={<LoadingSpinner size="lg" text={fallbackText} />}>
    {children}
  </Suspense>
);

// =============================
// 各セクションを配列で管理
// =============================
const sections = [
  { id: 'hero', component: <HeroSection />, label: 'Loading hero section...' },
  { id: 'works', component: <WorksGallery />, label: 'Loading works gallery...' },
  { id: 'skills', component: <SkillsSection />, label: 'Loading skills section...' },
  { id: 'achievements', component: <AchievementsSection />, label: 'Loading achievements section...' },
  { id: 'contact', component: <ContactSection />, label: 'Loading contact section...' },
];

// =============================
// ホームページコンポーネント
// =============================
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen pt-16 mx-auto">
      {sections.map(({ id, component, label }) => (
        <SuspenseWrapper key={id} fallbackText={label}>
          {component}
        </SuspenseWrapper>
      ))}
    </main>
  );
}
