"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-forest rounded-lg flex items-center justify-center group-hover:bg-forest-dark transition-colors">
              <Wrench className="w-5 h-5 text-amber" />
            </div>
            <div>
              <span className="font-[family-name:var(--font-outfit)] font-bold text-forest text-sm sm:text-lg">
                Adirondack
              </span>
              <span className="font-[family-name:var(--font-outfit)] text-charcoal text-sm sm:text-lg ml-1">
                Handyman
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-forest transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15189212971"
              className="flex items-center gap-2 text-charcoal hover:text-forest transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(518) 921-2971</span>
            </a>
            <Button href="/quote" variant="primary">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal hover:text-forest transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-t border-dark-border"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-4 text-charcoal hover:text-forest hover:bg-forest/5 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-dark-border" />
              <a
                href="tel:+15189212971"
                className="flex items-center gap-2 py-3 px-4 text-charcoal hover:text-forest transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">(518) 921-2971</span>
              </a>
              <div className="px-4 pt-2">
                <Button href="/quote" variant="primary" className="w-full">
                  Get a Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
