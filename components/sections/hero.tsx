"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FC } from 'react';

const HeroSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  return (
    <section 
      ref={ref}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景グリッドとグラデーション */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* 装飾的な円形要素 */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[hsl(var(--accent-1))] opacity-10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[hsl(var(--accent-3))] opacity-10 blur-3xl animate-pulse-glow" />
      
      <div className="container relative z-10">
        <motion.div
          style={{ opacity, scale, y }}
          className="flex flex-col items-center text-center space-y-8 md:space-y-10"
        >
          {/* ロゴマーク */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, type: "spring", bounce: 0.5 }}
            className="relative w-24 h-24 mb-4"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-accent opacity-20 animate-pulse-glow" />
            <div className="absolute inset-0 rounded-full glass-effect flex items-center justify-center">
              <Play className="w-12 h-12 text-[hsl(var(--accent-2))] animate-float" />
            </div>
          </motion.div>
          
          {/* メインタイトル */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gradient-accent"
          >
            Crafting Visual Stories
          </motion.h1>
          
          {/* サブタイトル */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed"
          >
            Award-winning video creator specializing in cinematic storytelling and visual artistry
          </motion.p>
          
          {/* CTAボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="text-lg group relative overflow-hidden bg-gradient-accent hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--accent-2))]/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              View Portfolio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg group relative overflow-hidden border-[hsl(var(--accent-2))]/30 hover:border-[hsl(var(--accent-2))]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--accent-2))]/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent-2))]/0 via-[hsl(var(--accent-2))]/10 to-[hsl(var(--accent-2))]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
        
        {/* スクロールダウンインジケーター */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
      
      {/* 背景画像（オーバーレイ付き） */}
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
    </section>
  );
};

export { HeroSection };