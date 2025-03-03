"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FC } from "react";

// =============================
// 型定義
// =============================
interface HeroButton {
  label: string;
  variant?: "default" | "outline";
  className?: string;
}

// =============================
// ボタンデータ定義
// =============================
const heroButtons: HeroButton[] = [
  {
    label: "View Portfolio",
    className: "bg-gradient-accent hover:opacity-90 hover:shadow-lg hover:shadow-[hsl(var(--accent-2))]/20",
  },
  {
    label: "Contact Me",
    variant: "outline",
    className: "border-[hsl(var(--accent-2))]/30 hover:border-[hsl(var(--accent-2))]/50 hover:shadow-lg hover:shadow-[hsl(var(--accent-2))]/10",
  },
];

// =============================
// ヒーローセクションコンポーネント
// =============================
const HeroSection: FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景エフェクト */}
      <BackgroundEffects />

      <div className="container relative z-10">
        <motion.div 
          style={{ opacity, scale, y }} 
          className="flex flex-col items-center text-center space-y-8 md:space-y-10"
        >
          {/* ロゴマーク */}
          <LogoIcon />

          {/* タイトル & サブタイトル */}
          <h1 className="text-gradient-accent">
            Crafting Visual Stories
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
            Award-winning video creator specializing in cinematic storytelling and visual artistry
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            {heroButtons.map((btn, index) => (
              <HeroButton key={btn.label} {...btn} index={index} />
            ))}
          </div>
        </motion.div>

        {/* スクロールダウンインジケーター */}
        <ScrollIndicator />
      </div>

      {/* 背景画像 */}
      <BackgroundImage />
    </section>
  );
};

// =============================
// 背景エフェクトコンポーネント
// =============================
const BackgroundEffects: FC = () => (
  <>
    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
    <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[hsl(var(--accent-1))] opacity-10 blur-3xl animate-pulse-glow" />
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[hsl(var(--accent-3))] opacity-10 blur-3xl animate-pulse-glow" />
  </>
);

// =============================
// ロゴアイコンコンポーネント
// =============================
const LogoIcon: FC = () => (
  <div className="relative w-24 h-24 mb-4">
    <div className="absolute inset-0 rounded-full bg-gradient-accent opacity-20" />
    <div className="absolute inset-0 rounded-full glass-effect flex items-center justify-center">
      <Play className="w-12 h-12 text-[hsl(var(--accent-2))]" />
    </div>
  </div>
);

// =============================
// ヒーローボタンコンポーネント
// =============================
const HeroButton: FC<HeroButton & { index: number }> = ({ label, variant = "default", className, index }) => (
  <Button
    key={label}
    size="lg"
    variant={variant}
    className={`text-lg group relative overflow-hidden transition-all duration-300 ${className}`}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    {label}
  </Button>
);

// =============================
// スクロールインジケーターコンポーネント
// =============================
const ScrollIndicator: FC = () => (
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
    <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
    <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
  </div>
);

// =============================
// 背景画像コンポーネント
// =============================
const BackgroundImage: FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ delay: 0.6, duration: 1.5 }}
    className="absolute inset-0 -z-10"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
);

// =============================
// エクスポート
// =============================
export { HeroSection };
