"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import RotatingText from "@/components/ui/RotatingText";
import { BeforeAfterShowcase } from "@/components/ui/BeforeAfterShowcase";
import ShinyText from "@/components/ui/ShinyText";

const showcaseProjects = [
  {
    id: "project-1",
    title: "Patio Door & Deck Steps",
    before: "/Project-1-before.jpg",
    after: "/project-1-after.jpg",
  },
  {
    id: "project-2",
    title: "Entry Door Replacement",
    before: "/project-2-before.jpg",
    after: "/project-2-after.jpg",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-forest/5" />

      {/* Animated shapes */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-amber/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-forest/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6"
            >
              <ShinyText
                text="Professional"
                speed={3}
                color="#FFFFFF"
                shineColor="#A0A0A0"
                spread={120}
                direction="left"
                delay={1}
                className="text-forest"
              />
              <br />
              <RotatingText
                texts={["Home Repairs", "Deck Building", "Siding & Gutters", "Flooring", "Excavation", "Paint & Stain", "Bathroom Remodels", "Roof Repairs", "Windows & Doors"]}
                mainClassName="text-amber overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-charcoal-light mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Home repairs and maintenance in Amsterdam and surrounding areas.
              Licensed and insured.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button href="/quote" variant="primary" size="lg">
                Get a Free Estimate Online
              </Button>
              <Button href="tel:+15189212971" variant="outline" size="lg">
                Call or Text
              </Button>
            </motion.div>

          </div>

          {/* Visual/Image side - Before/After Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <BeforeAfterShowcase
              projects={showcaseProjects}
              rotationInterval={5000}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
