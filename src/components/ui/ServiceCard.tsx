"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  href: string;
  delay?: number;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  items,
  href,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href} className="block group h-full">
        <motion.div
          className="relative h-full bg-dark-lighter rounded-2xl p-6 shadow-lg shadow-black/20 border border-dark-border overflow-hidden"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-forest/5 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />

          {/* Icon */}
          <div className="relative mb-4">
            <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center group-hover:bg-forest group-hover:scale-110 transition-all duration-300">
              <Icon className="w-7 h-7 text-forest group-hover:text-cream transition-colors duration-300" />
            </div>
          </div>

          {/* Content */}
          <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-xl text-charcoal mb-2 group-hover:text-forest transition-colors">
            {title}
          </h3>
          <p className="text-charcoal-light text-sm mb-4 leading-relaxed">
            {description}
          </p>

          {/* Items list - revealed on hover */}
          <div className="space-y-1">
            {items.slice(0, 4).map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0.7, x: 0 }}
                whileHover={{ opacity: 1, x: 4 }}
                className="flex items-center gap-2 text-sm text-charcoal-light"
              >
                <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                {item}
              </motion.div>
            ))}
            {items.length > 4 && (
              <span className="text-sm text-forest font-medium">
                +{items.length - 4} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-forest/10">
            <span className="text-forest font-medium text-sm group-hover:text-forest-dark transition-colors inline-flex items-center gap-1">
              Learn more
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
