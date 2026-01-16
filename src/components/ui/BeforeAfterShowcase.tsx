"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  before: string;
  after: string;
}

interface BeforeAfterShowcaseProps {
  projects: Project[];
  rotationInterval?: number;
}

export function BeforeAfterShowcase({
  projects,
  rotationInterval = 5000,
}: BeforeAfterShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    // Toggle between before and after every half of the rotation interval
    const toggleInterval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, rotationInterval / 2);

    return () => clearInterval(toggleInterval);
  }, [rotationInterval]);

  useEffect(() => {
    // Move to next project when showing "before" (after the after has been shown)
    if (!showAfter) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [showAfter, projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <div className="relative">
      {/* Main image container */}
      <div className="aspect-[4/3] bg-gradient-to-br from-forest/20 to-forest/5 rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentProject.id}-${showAfter ? "after" : "before"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={showAfter ? currentProject.after : currentProject.before}
              alt={`${currentProject.title} - ${showAfter ? "After" : "Before"}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Before/After Label */}
            <div className="absolute top-4 left-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-4 py-2 rounded-full font-semibold text-sm shadow-lg ${
                  showAfter
                    ? "bg-forest text-cream"
                    : "bg-charcoal/80 text-cream"
                }`}
              >
                {showAfter ? "After" : "Before"}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project title card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 flex items-center justify-center gap-3"
      >
        <p className="text-charcoal font-medium text-sm">{currentProject.title}</p>
        <div className="flex gap-1.5 items-center">
          {projects.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-5 bg-amber"
                  : "w-1.5 bg-forest/30"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
