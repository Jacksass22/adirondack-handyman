"use client";

import { motion } from "framer-motion";
import {
  Home,
  TreePine,
  Shovel,
  Hammer,
  PaintBucket,
  ListChecks,
} from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

const services = [
  {
    icon: Home,
    title: "Interior Work",
    description: "Complete interior renovations and repairs",
    items: [
      "Kitchen & bathroom remodels",
      "Flooring installation",
      "Drywall & ceiling repair",
      "Door & trim work",
      "Tile work",
    ],
    href: "/services#interior",
  },
  {
    icon: TreePine,
    title: "Exterior & Structural",
    description: "Keeping your home's curb appeal up",
    items: [
      "Deck building & repair",
      "Siding & window installation",
      "Roof repairs & sheathing",
      "Chimney repairs",
      "Custom railings & stairs",
    ],
    href: "/services#exterior",
  },
  {
    icon: Shovel,
    title: "Excavation Services",
    description: "Driveways, land clearing, and more",
    items: [
      "Driveway preparation",
      "Land clearing",
      "Concrete pad prep",
      "Grading & leveling",
      "French drain installation",
    ],
    href: "/services#excavation",
  },
  {
    icon: Hammer,
    title: "Concrete & Masonry",
    description: "Quality work that lasts for decades",
    items: [
      "Concrete pad pouring",
      "Driveway installation",
      "Chimney rebuild & repair",
      "Retaining walls",
      "Patio installation",
    ],
    href: "/services#concrete",
  },
  {
    icon: PaintBucket,
    title: "Paint & Stain",
    description: "Interior and exterior finishing work",
    items: [
      "House painting (interior/exterior)",
      "Deck staining & sealing",
      "Cabinet painting",
      "Pressure washing & prep",
      "Trim & detail work",
    ],
    href: "/services#paint",
  },
  {
    icon: ListChecks,
    title: "Honey-Do Lists",
    description: "Knocking out your to-do list",
    items: [
      "Fan & light installation",
      "TV mounting & shelving",
      "Caulking & weather stripping",
      "Door locks & hardware",
      "Minor repairs",
    ],
    href: "/services#honey-do",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-32 bg-cream-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
            What I Can Help With
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
            From quick fixes to full-day projects, I've got you covered.
            Here's a taste of what I do.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-charcoal-light mb-4">
            Don't see what you need? Just ask.
          </p>
          <Button href="/services" variant="outline">
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
