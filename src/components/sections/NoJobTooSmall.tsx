"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const smallJobs = [
  "Hang a picture",
  "Fix a squeaky door",
  "Replace a light switch",
  "Install a smoke detector",
  "Unclog a drain",
  "Patch a small hole",
  "Adjust cabinet hinges",
  "Replace door knobs",
  "Install towel bars",
  "Fix a running toilet",
  "Caulk a bathtub",
  "Replace outlet covers",
];

export function NoJobTooSmall() {
  return (
    <section className="py-20 md:py-32 bg-forest relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-cream mb-6">
              "Is this too small to call about?"
            </h2>
            <p className="text-cream/80 text-lg mb-6 leading-relaxed">
              I get it. You've got that one little thing that's been bugging you
              for months, but it feels silly to call someone about it.
            </p>
            <p className="text-cream/80 text-lg mb-8 leading-relaxed">
              <span className="text-amber font-semibold">Here's the truth:</span>{" "}
              those small jobs are often my favorite. Quick win for you,
              satisfying fix for me. No judgment, no minimum.
            </p>
            <Button href="/quote" variant="secondary" size="lg">
              Yes, I'll Fix That
            </Button>
          </motion.div>

          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-cream/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-cream mb-6">
                Yes, I do that:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {smallJobs.map((job, index) => (
                  <motion.div
                    key={job}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-amber rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-forest" />
                    </div>
                    <span className="text-cream/90 text-sm">{job}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-amber mt-6 font-medium text-sm">
                ...and about 100 other things you haven't thought of yet.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
