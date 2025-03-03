"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Work } from "@/lib/work";

export function WorkDetails({ work }: { work: Work }) {
  const router = useRouter();

  return (
    <main className="min-h-screen pt-16 mx-auto">
      <div className="container px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-7xl mx-auto"
        >
          <Button
            variant="ghost"
            className="group"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Works
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden group">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" className="gap-2">
                    <Play className="w-5 h-5" />
                    Play Video
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={work.thumbnail}
                      alt={`${work.title} thumbnail ${i}`}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl font-bold mb-2">{work.title}</h1>
                <p className="text-muted-foreground">{work.category}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">About the Project</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {work.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Client</h3>
                  <p className="text-muted-foreground">{work.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Date</h3>
                  <p className="text-muted-foreground">{work.date}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Role</h3>
                  <p className="text-muted-foreground">{work.role.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">{work.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Technical Details</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {work.technicalDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}