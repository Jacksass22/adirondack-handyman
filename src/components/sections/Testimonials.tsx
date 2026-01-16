"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
            What Your Neighbors Say
          </h2>
          <p className="text-charcoal-light text-lg">
            Real feedback from real folks in the Mohawk Valley
          </p>
        </motion.div>

        {/* Single testimonial */}
        <div className="max-w-3xl mx-auto">
          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-dark-lighter rounded-3xl shadow-xl p-8 md:p-12 border border-dark-border"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-amber fill-amber" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-charcoal leading-relaxed mb-8">
              "Let me tell you it's refreshing to have a hard working, honest contractor work on our home. Owen walked into a mess and has been working his butt off in this heat to fix our problem. We are so grateful and highly recommend him!"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center">
                <span className="text-forest font-semibold">E</span>
              </div>
              <div>
                <p className="font-semibold text-charcoal">Elissa R.</p>
                <p className="text-charcoal-light text-sm">Amsterdam, NY</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
