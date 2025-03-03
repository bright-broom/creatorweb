"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import type { FC } from 'react';

const ContactSection: FC = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center relative"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern opacity-50" />
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Let's Work Together
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Have a project in mind? Let's discuss how we can bring your vision to life.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                    <Mail className="w-6 h-6 text-primary transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">Email</h3>
                  <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    contact@example.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                    <MessageSquare className="w-6 h-6 text-primary transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">Social Media</h3>
                  <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    @videodirector
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 bg-card p-8 rounded-lg border border-border/50 shadow-lg backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                className="bg-background/50 border-border/50 input-glow"
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-background/50 border-border/50 input-glow"
              />
              <Input
                type="text"
                placeholder="Project Type"
                className="bg-background/50 border-border/50 input-glow"
              />
              <Textarea
                placeholder="Tell me about your project"
                className="min-h-[150px] bg-background/50 border-border/50 input-glow resize-none"
              />
            </div>
            <Button
              className="w-full relative overflow-hidden group/button hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              size="lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-500" />
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { ContactSection };