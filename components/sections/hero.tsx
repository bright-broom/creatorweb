"use client";

import { useRef } from "react";
import type { FC } from "react";

// =============================
// ヒーローセクションコンポーネント
// =============================
const HeroSection: FC = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section 
      ref={ref} 
      id="hero" 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <BackgroundVideo />
    </section>
  );
};

// =============================
// 背景動画コンポーネント - Vimeoをフルスクリーン表示
// =============================
const BackgroundVideo: FC = () => (
  <div className="w-full h-full absolute inset-0">
    <iframe
      src="https://player.vimeo.com/video/667542636?autoplay=1&muted=1"
      width="100%"
      height="100%"
      frameBorder="0"
      allow="autoplay; fullscreen"
      className="absolute top-0 left-0 w-full h-full"
      title="Vimeo Background Video"
    />
  </div>
);

// =============================
// エクスポート
// =============================
export { HeroSection };
