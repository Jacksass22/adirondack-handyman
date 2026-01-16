"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Wrench,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const values = [
  {
    icon: Clock,
    title: "Reliable & Punctual",
    description: "When I schedule a time, I'm there. No waiting around wondering when the contractor will show up.",
  },
  {
    icon: Wrench,
    title: "Quality Workmanship",
    description: "Every job gets my full attention. I use proper techniques, quality materials, and leave your space clean.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "Clear quotes upfront with no hidden fees. If something changes, we discuss it before moving forward.",
  },
];

const doList = [
  "Deck building, repair & staining",
  "Chimney repairs & rebuilds",
  "Siding, gutters & windows",
  "Flooring installation",
  "Bathroom renovations",
  "Interior & exterior painting",
  "Excavation services",
  "Concrete work & masonry",
  "Roof repairs & sheathing",
  "Fan, vent & light installation",
];

const dontList = [
  "Major electrical panel work (hire a licensed electrician)",
  "Plumbing beyond basic repairs (hire a plumber)",
  "HVAC installation or major repairs",
  "Gas line work of any kind",
  "Anything requiring permits I can't pull",
];

const serviceAreas = [
  { name: "Amsterdam", primary: true },
  { name: "Gloversville", primary: true },
  { name: "Johnstown", primary: true },
  { name: "Fonda", primary: false },
  { name: "Canajoharie", primary: false },
  { name: "Fort Plain", primary: false },
  { name: "Tribes Hill", primary: false },
  { name: "Hagaman", primary: false },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-dark-lighter py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/5] bg-dark rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 border border-dark-border relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-forest/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-light text-sm">
                      Photo placeholder
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-1 lg:order-2"
            >

              <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-bold text-charcoal mb-6">
                About Adirondack Handyman
              </h1>
              <div className="space-y-4 text-charcoal-light text-lg leading-relaxed">
                <p>
                  Adirondack Handyman provides reliable, professional home repair and improvement services for homeowners and businesses in the Amsterdam, NY area and beyond. We handle a wide range of projects, from deck building and painting to flooring, masonry, and more.
                </p>
                <p>
                  Our focus is on quality workmanship, clear communication, and honest pricing. Whether you need a small repair or a larger renovation, you can count on us to get the job done efficiently and with care.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-dark px-4 py-2 rounded-full border border-dark-border">
                  <Shield className="w-5 h-5 text-forest" />
                  <span className="font-medium text-charcoal">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 bg-dark px-4 py-2 rounded-full border border-dark-border">
                  <MapPin className="w-5 h-5 text-forest" />
                  <span className="font-medium text-charcoal">Amsterdam, NY</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
              My Commitment to You
            </h2>
            <p className="text-charcoal-light text-lg">
              The standards I hold myself to on every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-lighter rounded-2xl p-6 border border-dark-border text-center"
                >
                  <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-forest" />
                  </div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-charcoal-light">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What I Do / Don't Do */}
      <section className="py-16 md:py-24 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Services Overview
            </h2>
            <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
              A clear breakdown of the work I handle and what's best left to licensed specialists.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Services List Only */}
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-2xl p-6 md:p-8 border border-dark-border w-full"
            >
              <h3 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-forest mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Handyman & Renovation Services
              </h3>
              <ul className="space-y-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-white mb-4">
              Service Area
            </h2>
            <p className="text-white/80 text-lg">
              Serving the Mohawk Valley and surrounding communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-2xl aspect-video flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-amber mx-auto mb-2" />
                <p className="text-white/60 text-sm">Map coming soon</p>
              </div>
            </motion.div>

            {/* Areas list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area.name}
                    className={`px-4 py-3 rounded-lg ${
                      area.primary
                        ? "bg-amber text-dark font-medium"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {area.name}, NY
                  </div>
                ))}
              </div>
              <p className="mt-6 text-white/80 text-sm">
                Location not listed? Contact me — I may be able to accommodate depending on the project scope.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-charcoal-light text-lg mb-8">
              Contact me for a free estimate on your next project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="tel:+15189212971"
                className="flex items-center gap-2 bg-dark-lighter px-6 py-3 rounded-full hover:bg-dark-border transition-colors border border-dark-border"
              >
                <Phone className="w-5 h-5 text-forest" />
                <span className="font-semibold text-charcoal">(518) 921-2971</span>
              </a>
              <a
                href="mailto:owenmormile@gmail.com"
                className="flex items-center gap-2 bg-dark-lighter px-6 py-3 rounded-full hover:bg-dark-border transition-colors border border-dark-border"
              >
                <Mail className="w-5 h-5 text-forest" />
                <span className="font-semibold text-charcoal">owenmormile@gmail.com</span>
              </a>
            </div>

            <Button href="/quote" variant="primary" size="lg">
              Get a Free Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
