"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { works } from "@/lib/works";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================
// 型定義
// =============================
interface WorkCategory {
  id: string;
  label: string;
}

// =============================
// カテゴリーリスト
// =============================
const categories: WorkCategory[] = [
  { id: "all", label: "すべて" },
  { id: "commercial", label: "コマーシャル" },
  { id: "documentary", label: "ドキュメンタリー" },
  { id: "music-video", label: "ミュージックビデオ" },
  { id: "short-film", label: "短編映画" },
];

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const router = useRouter();

  // カテゴリー変更処理
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // フィルタリングされた作品
  const filteredWorks = works.filter(
    (work) => selectedCategory === "all" || work.category.toLowerCase() === selectedCategory
  );

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="group"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              トップに戻る
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">Portfolio</h1>
          </div>

          {/* カテゴリーフィルター */}
          <div className="flex flex-wrap justify-center gap-3 my-8">
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
          </div>

          {/* 作品グリッド */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-video overflow-hidden rounded-xl bg-muted hover:shadow-lg cursor-pointer"
                onMouseEnter={() => setHoveredWork(work.id)}
                onMouseLeave={() => setHoveredWork(null)}
                onClick={() => router.push(`/works/${work.id}`)}
              >
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black/60 flex flex-col justify-end p-6 transition-opacity duration-300",
                    hoveredWork === work.id ? "opacity-100" : "opacity-0"
                  )}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{work.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 