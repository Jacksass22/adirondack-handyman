"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    id: 1,
    title: "Chimney Rebuild & Repair",
    category: "exterior",
    description: "Rebuilt chimney with three new layers of brick and mortar. Clean, professional masonry work that will stand up to the elements for years.",
    image: "/gallery/project-1.jpg",
  },
  {
    id: 3,
    title: "New Deck Steps & Railings",
    category: "exterior",
    description: "Built new deck steps with sturdy white vinyl railings. Safe, code-compliant, and built to last through years of foot traffic and weather.",
    image: "/gallery/project-3.jpg",
  },
  {
    id: 4,
    title: "Deck Steps - Completed",
    category: "exterior",
    description: "Another angle of the finished deck steps project. Clean lines, solid construction, and railings that will stay white for years to come.",
    image: "/gallery/project-4.jpg",
  },
  {
    id: 5,
    title: "Roof Repair & Sheathing",
    category: "exterior",
    description: "Replaced damaged roof sheathing with new plywood. Catching these problems early saves you from much bigger headaches down the road.",
    image: "/gallery/project-5.jpg",
  },
  {
    id: 6,
    title: "Exterior Siding & Windows",
    category: "exterior",
    description: "New siding and window installation. Properly insulated and looking sharp for years to come.",
    image: "/gallery/project-6.jpg",
  },
  {
    id: 7,
    title: "Flooring Installation",
    category: "interior",
    description: "Installed new luxury vinyl plank flooring. Durable, waterproof, and looks like real hardwood. Perfect for high-traffic areas.",
    image: "/gallery/project-7.jpg",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "assembly", label: "Assembly" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(p => p.category === filter);

  const currentIndex = selectedProject
    ? filteredProjects.findIndex(p => p.id === selectedProject.id)
    : -1;

  const goToNext = () => {
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1]);
    }
  };

  return (
    <div className="pt-20">
      {/* Gallery */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  filter === category.id
                    ? "bg-forest text-cream"
                    : "bg-forest/10 text-charcoal hover:bg-forest/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="rounded-2xl shadow-lg shadow-black/20 overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Project Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-3xl"
                  sizes="(max-width: 768px) 100vw, 896px"
                />

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-charcoal/80 rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
                >
                  <X className="w-5 h-5 text-cream" />
                </button>

                {/* Nav arrows */}
                {currentIndex > 0 && (
                  <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/80 rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-cream" />
                  </button>
                )}
                {currentIndex < filteredProjects.length - 1 && (
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/80 rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-cream" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-cream mb-6">
              Ready to be my next success story?
            </h2>
            <p className="text-cream/80 text-lg mb-8">
              Let's turn your project into another happy customer story.
            </p>
            <Button href="/quote" variant="secondary" size="lg">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
