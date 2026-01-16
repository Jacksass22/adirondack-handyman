"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  TreePine,
  Hammer,
  Shovel,
  PaintBucket,
  ListChecks,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const services = [
  {
    id: "interior",
    icon: Home,
    title: "Interior Work",
    description: "Complete interior renovations and repairs — from floors to ceilings.",
    whatToExpect: "I'll assess the issue, explain what needs to be done in plain English, and get it fixed right. From small repairs to full bathroom remodels.",
    jobs: [
      "Kitchen renovation",
      "Bathroom renovation",
      "Flooring installation",
      "Subfloor replacement",
      "Drywall & ceiling repair",
      "Door & trim installation",
      "Custom tile work",
      "Vanity & toilet installation",
    ],
  },
  {
    id: "exterior",
    icon: TreePine,
    title: "Exterior & Structural",
    description: "Keeping your home's curb appeal up and structurally sound.",
    whatToExpect: "Weather dependent, but I'll work with you to schedule around Mother Nature. From siding to roofing to full additions.",
    jobs: [
      "Deck building & repair",
      "Siding installation & repair",
      "Chimney repairs & rebuild",
      "Roof repairs & sheathing",
      "Window & door installation",
      "Gutter installation & repair",
      "Custom railings & stairs",
      "Fence repair & installation",
    ],
  },
  {
    id: "excavation",
    icon: Shovel,
    title: "Excavation Services",
    description: "Driveways, land clearing, concrete pads, and more.",
    whatToExpect: "Got a project that needs dirt moved? I've got the equipment and know-how. From driveway prep to land clearing to foundation work.",
    jobs: [
      "Driveway preparation",
      "Land clearing",
      "Concrete pad prep",
      "Grading & leveling",
      "French drain installation",
      "Backfill work",
      "Well & utility access",
      "Foundation prep",
    ],
  },
  {
    id: "concrete",
    icon: Hammer,
    title: "Concrete & Masonry",
    description: "Pouring concrete, chimney work, and all things masonry.",
    whatToExpect: "From small concrete pads to full driveways, chimney rebuilds to foundation repairs. Quality work that'll last for decades.",
    jobs: [
      "Concrete pad pouring",
      "Driveway installation",
      "Chimney rebuild & repair",
      "Walkway installation",
      "Foundation repairs",
      "Retaining walls",
      "Step repairs",
      "Patio installation",
    ],
  },
  {
    id: "paint",
    icon: PaintBucket,
    title: "Paint & Stain",
    description: "Interior and exterior painting, deck staining, and finishing work.",
    whatToExpect: "Prep work is everything. I take the time to do it right so the finish lasts. Houses, decks, fences — you name it.",
    jobs: [
      "Exterior house painting",
      "Interior painting",
      "Deck staining & sealing",
      "Fence staining",
      "Cabinet painting",
      "Trim & detail work",
      "Pressure washing & prep",
      "Touch-ups & repairs",
    ],
  },
  {
    id: "honey-do",
    icon: ListChecks,
    title: "Honey-Do Lists",
    description: "That random collection of stuff that's been bugging you for months.",
    whatToExpect: "Give me your list. I'll knock out as many items as I can in a single visit. This is often the most satisfying type of appointment.",
    jobs: [
      "Fan & vent installation",
      "Light fixture installation",
      "Shelving installation",
      "TV mounting",
      "Caulking & weather stripping",
      "Door locks & hardware",
      "Minor repairs",
      "Whatever else is on your list",
    ],
  },
];

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>("interior");

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cream via-cream to-forest/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-bold text-charcoal mb-6">
              What I Can Do For You
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl">
              From quick fixes to bigger projects, here's the full menu.
              Don't see what you need? Just ask — I probably do that too.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-lighter rounded-2xl shadow-lg shadow-black/20 border border-dark-border overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedService(isExpanded ? null : service.id)}
                    className="w-full p-6 flex items-center gap-4 text-left hover:bg-forest/5 transition-colors"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-forest' : 'bg-forest/10'}`}>
                      <Icon className={`w-7 h-7 transition-colors ${isExpanded ? 'text-cream' : 'text-forest'}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-charcoal">
                        {service.title}
                      </h2>
                      <p className="text-charcoal-light text-sm mt-1">
                        {service.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-6 h-6 text-forest" />
                    </motion.div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          {/* What to expect */}
                          <div className="bg-amber/10 rounded-xl p-4 mb-6">
                            <h3 className="font-semibold text-charcoal mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber" />
                              What to expect
                            </h3>
                            <p className="text-charcoal-light text-sm">
                              {service.whatToExpect}
                            </p>
                          </div>

                          {/* Jobs list */}
                          <div className="grid sm:grid-cols-2 gap-3 mb-6">
                            {service.jobs.map((job) => (
                              <div
                                key={job}
                                className="flex items-center p-3 bg-cream rounded-lg"
                              >
                                <span className="text-charcoal text-sm font-medium">
                                  {job}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <Button href={`/quote?service=${service.id}`} variant="primary">
                            Request This Service
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Not Sure Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-forest rounded-2xl p-8 text-center"
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-cream mb-4">
              Not sure what you need?
            </h2>
            <p className="text-cream/80 mb-6 max-w-xl mx-auto">
              No problem. Just describe your issue and I'll figure out the best approach.
              Sometimes the solution is simpler than you think.
            </p>
            <Button href="/quote" variant="secondary">
              Describe Your Problem
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
