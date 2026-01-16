"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-amber/20 via-cream to-forest/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-bold text-charcoal mb-6">
            Ready to cross it off your list?
          </h2>
          <p className="text-charcoal-light text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Tell me what's bugging you — big or small. I'll get back to you within 24 hours
            with a plan to fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/quote" variant="primary" size="lg">
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <span className="text-charcoal-light">or</span>
            <a
              href="tel:+15189212971"
              className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call (518) 921-2971
            </a>
          </div>

          <p className="mt-8 text-charcoal-light text-sm">
            Serving Amsterdam, Gloversville, Johnstown, and the greater Mohawk Valley
          </p>
        </motion.div>
      </div>
    </section>
  );
}
