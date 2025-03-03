"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { works } from "@/lib/works";
import type { Work } from "@/lib/work";
import type { FC } from 'react';
import { ArrowRight, Play } from "lucide-react";

const categories = ["All", "Commercial", "Documentary", "Music Video", "Short Film"];

const WorksGallery: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const filteredWorks = works.filter(
    (work) => selectedCategory === "All" || work.category === selectedCategory
  );

  return (
    <section id="works" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[hsl(var(--accent-2))] opacity-5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[hsl(var(--accent-1))] opacity-5 blur-3xl" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* セクションヘッダー */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-2"
            >
              <span className="px-3 py-1 text-sm rounded-full bg-[hsl(var(--accent-2))]/10 text-[hsl(var(--accent-2))]">
                PORTFOLIO
              </span>
            </motion.div>
            <h2 className="section-title text-gradient-accent">Featured Works</h2>
            <p className="section-description mx-auto">
              Explore my portfolio of visual storytelling across different genres and styles
            </p>
          </div>

          {/* カテゴリーフィルター */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm md:text-base rounded-full px-5 transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-gradient-accent hover:opacity-90" 
                    : "hover:border-[hsl(var(--accent-2))]/50 hover:text-[hsl(var(--accent-2))]"
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* 作品グリッド */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="group relative aspect-video overflow-hidden rounded-xl bg-muted transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl"
                  onMouseEnter={() => setHoveredWork(work.id)}
                  onMouseLeave={() => setHoveredWork(null)}
                  onClick={() => router.push(`/works/${work.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {/* サムネイル画像 */}
                  <motion.img
                    src={work.thumbnail}
                    alt={work.title}
                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-110"
                  />
                  
                  {/* オーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-[hsl(var(--accent-2))]/20 text-white/90 mb-2"
                      >
                        {work.category}
                      </motion.span>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-white font-bold text-xl group-hover:text-[hsl(var(--accent-2))] transition-colors duration-300"
                      >
                        {work.title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-white/80 text-sm mt-1 line-clamp-2"
                      >
                        {work.description}
                      </motion.p>
                      
                      {/* 詳細を見るボタン */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-3 flex items-center text-[hsl(var(--accent-2))] text-sm font-medium"
                      >
                        View Details <ArrowRight className="ml-1 w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* 再生ボタン（ホバー時） */}
                  {hoveredWork === work.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-white fill-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* もっと見るボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-[hsl(var(--accent-2))]/30 hover:border-[hsl(var(--accent-2))]/50 hover:bg-[hsl(var(--accent-2))]/5 transition-all duration-300"
            >
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { WorksGallery };