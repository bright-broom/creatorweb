"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { works } from "@/lib/works";
import type { Work } from "@/lib/work";
import type { FC } from "react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================
// 型定義
// =============================
interface WorkCategory {
  id: string;
  label: string;
}

interface WorkOverlayProps {
  work: Work
  hovered: boolean
}

// =============================
// カテゴリーリスト（`id` を追加）
// =============================
const categories: WorkCategory[] = [
  { id: "all", label: "All" },
  { id: "commercial", label: "Commercial" },
  { id: "documentary", label: "Documentary" },
  { id: "music-video", label: "Music Video" },
  { id: "short-film", label: "Short Film" },
];

// =============================
// 作品ギャラリーコンポーネント
// =============================
const WorksGallery: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  // カテゴリー変更処理
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // ホバー処理
  const handleMouseEnter = (workId: string) => {
    setHoveredWork(workId);
  };
  const handleMouseLeave = () => {
    setHoveredWork(null);
  };

  // `work.id` の型を `string` に統一する
  const filteredWorks = works.filter(
    (work) => selectedCategory === "all" || work.category.toLowerCase() === selectedCategory
  );
  
  // 最大9枚のみ表示
  const displayedWorks = filteredWorks.slice(0, 9);

  return (
    <section id="works" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* 背景エフェクト */}
      <BackgroundEffects />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-16">
          {/* セクションタイトル */}
          <SectionHeader />

          {/* カテゴリーフィルター */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryClick(category.id)}
                className={`text-sm md:text-base rounded-full px-5 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-accent hover:opacity-90"
                    : "hover:border-[hsl(var(--accent-2))]/50 hover:text-[hsl(var(--accent-2))]"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* 作品グリッド */}
          <AnimatePresence mode="wait">
            <motion.div key={selectedCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedWorks.map((work) => (
                <WorkItem key={work.id} work={work} hoveredWork={hoveredWork} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} router={router} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* もっと見るボタン - フィルタリングされた作品が9以上ある場合のみ表示 */}
          {filteredWorks.length > 9 && <ViewMoreButton />}
        </motion.div>
      </div>
    </section>
  );
};

// =============================
// 作品アイテムコンポーネント
// =============================
const WorkItem: FC<{ work: Work; hoveredWork: string | null; onMouseEnter: (id: string) => void; onMouseLeave: () => void; router: ReturnType<typeof useRouter> }> = ({ work, hoveredWork, onMouseEnter, onMouseLeave, router }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="group relative aspect-video overflow-hidden rounded-xl bg-muted hover:shadow-lg"
    onMouseEnter={() => onMouseEnter(work.id.toString())}
    onMouseLeave={onMouseLeave}
    onClick={() => router.push(`/works/${work.id}`)}
    style={{ cursor: "pointer" }}
  >
    <img src={work.thumbnail} alt={work.title} className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" />
    <WorkOverlay work={work} hovered={hoveredWork === work.id.toString()} />
  </motion.div>
);

// =============================
// 必要なコンポーネントを追加
// =============================
const BackgroundEffects: FC = () => <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background opacity-50" />;

const SectionHeader: FC = () => (
  <div className="text-center space-y-4">
    <h2 className="section-title text-gradient-accent">Featured Works</h2>
    <p className="section-description mx-auto">Explore my portfolio of visual storytelling across different genres and styles</p>
  </div>
);

const ViewMoreButton: FC = () => {
  const router = useRouter();
  
  return (
    <div className="flex justify-center mt-8">
      <Button 
        variant="outline" 
        size="lg" 
        onClick={() => router.push('/works')}
      >
        View All Projects <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

const WorkOverlay: React.FC<WorkOverlayProps> = ({ work, hovered }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-black/60 flex flex-col justify-end p-6 transition-opacity duration-300",
        hovered ? "opacity-100" : "opacity-0"
      )}
    >
      <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
      <p className="text-white/80 text-sm line-clamp-2">{work.description}</p>
      <div className="flex gap-2 mt-4">
        {work.role.map((role) => (
          <span
            key={role}
            className="px-2 py-1 text-xs rounded-full bg-white/20 text-white"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  )
}

export { WorksGallery };
