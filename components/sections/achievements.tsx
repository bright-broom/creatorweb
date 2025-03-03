"use client";

import { motion } from "framer-motion";
import { Award, Users, Play, Trophy } from "lucide-react";
import type { FC } from 'react';

const achievements = [
  {
    icon: Award,
    number: "15+",
    label: "Industry Awards",
  },
  {
    icon: Users,
    number: "100+",
    label: "Satisfied Clients",
  },
  {
    icon: Play,
    number: "200+",
    label: "Projects Completed",
  },
  {
    icon: Trophy,
    number: "5M+",
    label: "Views Generated",
  },
];

const clients = [
  "Netflix",
  "Universal",
  "Sony Pictures",
  "Warner Bros",
  "Disney",
  "Paramount",
];

const AchievementsSection: FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-12 h-12 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors duration-300 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                    <achievement.icon className="w-6 h-6 text-primary transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {achievement.number}
                  </div>
                  <div className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {achievement.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Trusted by Industry Leaders</h3>
              <p className="text-muted-foreground">Collaborating with top studios and production houses</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clients.map((client, index) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center h-12 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xl font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {client}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { AchievementsSection };