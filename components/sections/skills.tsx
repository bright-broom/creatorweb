"use client";

import { motion } from "framer-motion";
import { Camera, Edit, Film, Music, Star, Video, Lightbulb, Eye } from "lucide-react";
import type { FC } from "react";

// =============================
// 型定義
// =============================
interface Skill {
  id: string;
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
}

// =============================
// スキルデータ（`id` を追加）
// =============================
const skills: Skill[] = [
  { id: "cinematography", icon: Camera, title: "Cinematography", description: "Expert in camera work, lighting, and composition" },
  { id: "post-production", icon: Edit, title: "Post-Production", description: "Professional video editing and color grading" },
  { id: "film-direction", icon: Film, title: "Film Direction", description: "Creative direction and storytelling" },
  { id: "sound-design", icon: Music, title: "Sound Design", description: "Audio mixing and soundtrack selection" },
  { id: "motion-graphics", icon: Video, title: "Motion Graphics", description: "Dynamic visual effects and animations" },
  { id: "creative-vision", icon: Star, title: "Creative Vision", description: "Unique artistic perspective and style" },
  { id: "vision-direction", icon: Lightbulb, title: "Vision & Direction", description: "Direction and storytelling" },
  { id: "visual-direction", icon: Eye, title: "Visual Direction", description: "Expert in visual composition and aesthetics" },
];

// =============================
// スキルアイテムコンポーネント
// =============================
const SkillItem: FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      whileHover={{ y: -5 }}
    >
      {/* アイコン部分 */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors duration-300" />
        <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
          <skill.icon className="w-8 h-8 text-primary transform group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
      {/* タイトルと説明 */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
        {skill.title}
      </h3>
      <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
        {skill.description}
      </p>
    </motion.div>
  );
};

// =============================
// スキルセクションコンポーネント
// =============================
const SkillsSection: FC = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* セクションタイトル */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Expertise</h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-[600px] text-muted-foreground md:text-xl text-center mx-auto"
            >
              Comprehensive skillset in video production and visual direction
            </motion.p>
          </div>

          {/* スキルリスト */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillItem key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// =============================
// エクスポート
// =============================
export { SkillsSection };
