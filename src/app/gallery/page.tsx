"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
  before?: string;
  after?: string;
  isBeforeAfter?: boolean;
}

const projects: Project[] = [
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
    before: "/gallery/project-5-before.jpg",
    after: "/gallery/project-5-after.jpg",
    isBeforeAfter: true,
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
  {
    id: 8,
    title: "Basement Framing & Renovation",
    category: "interior",
    description: "Complete basement framing with new walls and ceiling. Transforming unfinished space into usable living area.",
    image: "/gallery/project-8.jpg",
  },
  {
    id: 9,
    title: "Basement Flooring Installation",
    category: "interior",
    description: "High-quality vinyl plank flooring installation in basement renovation. Clean, professional finish.",
    image: "/gallery/project-9.jpg",
  },
  {
    id: 10,
    title: "Basement Floor Complete",
    category: "interior",
    description: "Wide view of completed basement flooring. Durable, waterproof flooring that looks great.",
    image: "/gallery/project-10.jpg",
  },
  {
    id: 11,
    title: "Custom Deck with Privacy Wall",
    category: "exterior",
    description: "Beautiful deck construction with built-in privacy wall and professional railings.",
    image: "/gallery/project-11.jpg",
  },
  {
    id: 12,
    title: "Complete Deck Build",
    category: "exterior",
    description: "Full view of custom deck project with quality craftsmanship throughout.",
    image: "/gallery/project-12.jpg",
  },
  {
    id: 13,
    title: "Roof & Tree Service",
    category: "exterior",
    description: "Professional tree work and roof services using proper equipment for safe, quality results.",
    image: "/gallery/project-13.jpg",
  },
  {
    id: 14,
    title: "Foundation Drainage & Stone Work",
    category: "exterior",
    description: "Proper drainage installation with decorative stone veneer on foundation. Protects your home while looking great.",
    image: "/gallery/project-14.jpg",
  },
  {
    id: 15,
    title: "Bathroom Tile Work - In Progress",
    category: "interior",
    description: "Custom tile installation for shower. Precision work that's both beautiful and watertight.",
    image: "/gallery/project-15.jpg",
  },
  {
    id: 16,
    title: "Bathroom Tile - Completed",
    category: "interior",
    description: "Finished bathroom tile work with modern design and professional installation.",
    image: "/gallery/project-16.jpg",
  },
  {
    id: 18,
    title: "Covered Deck with Stairs",
    category: "exterior",
    description: "Beautiful covered deck with quality railings and stairs. Perfect outdoor living space.",
    image: "/gallery/project-18.jpg",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "assembly", label: "Assembly" },
];

// Component for modal before/after images
function ModalBeforeAfterImage({ project }: { project: Project }) {
  const [showBefore, setShowBefore] = useState(true);

  useEffect(() => {
    if (!project.isBeforeAfter) return;

    const interval = setInterval(() => {
      setShowBefore(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [project.isBeforeAfter]);

  if (!project.isBeforeAfter || !project.before || !project.after) {
    return (
      <Image
        src={project.image || ""}
        alt={project.title}
        fill
        className="object-cover rounded-3xl"
        sizes="(max-width: 768px) 100vw, 896px"
      />
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={showBefore ? "before" : "after"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={showBefore ? project.before : project.after}
            alt={`${project.title} - ${showBefore ? "Before" : "After"}`}
            fill
            className="object-cover rounded-3xl"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </motion.div>
      </AnimatePresence>

      {/* Before/After Badge */}
      <div className="absolute top-6 left-6 z-10">
        <motion.div
          key={showBefore ? "before-badge" : "after-badge"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-2 bg-charcoal/90 text-cream text-sm font-semibold rounded-full"
        >
          {showBefore ? "BEFORE" : "AFTER"}
        </motion.div>
      </div>
    </>
  );
}

// Component for rotating before/after images
function BeforeAfterImage({ project }: { project: Project }) {
  const [showBefore, setShowBefore] = useState(true);

  useEffect(() => {
    if (!project.isBeforeAfter) return;

    const interval = setInterval(() => {
      setShowBefore(prev => !prev);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [project.isBeforeAfter]);

  if (!project.isBeforeAfter || !project.before || !project.after) {
    return (
      <Image
        src={project.image || ""}
        alt={project.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={showBefore ? "before" : "after"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={showBefore ? project.before : project.after}
            alt={`${project.title} - ${showBefore ? "Before" : "After"}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Before/After Badge */}
      <div className="absolute top-3 left-3 z-10">
        <motion.div
          key={showBefore ? "before-badge" : "after-badge"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-3 py-1 bg-charcoal/90 text-cream text-xs font-semibold rounded-full"
        >
          {showBefore ? "BEFORE" : "AFTER"}
        </motion.div>
      </div>
    </>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                      <BeforeAfterImage project={project} />
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
                <ModalBeforeAfterImage project={selectedProject} />

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

    </div>
  );
}
