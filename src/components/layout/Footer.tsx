import Link from "next/link";
import { Wrench, Phone, Mail, MapPin, Facebook } from "lucide-react";

const serviceLinks = [
  { href: "/services#interior", label: "Interior Work" },
  { href: "/services#exterior", label: "Exterior & Structural" },
  { href: "/services#excavation", label: "Excavation Services" },
  { href: "/services#concrete", label: "Concrete & Masonry" },
  { href: "/services#paint", label: "Paint & Stain" },
  { href: "/services#honey-do", label: "Honey-Do Lists" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/quote", label: "Get a Quote" },
];


export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-forest" />
              </div>
              <div>
                <span className="font-[family-name:var(--font-outfit)] font-bold text-cream text-lg">
                  Adirondack
                </span>
                <span className="font-[family-name:var(--font-outfit)] font-medium text-amber text-lg ml-1">
                  Handyman
                </span>
              </div>
            </Link>
            <p className="text-cream/80 text-sm leading-relaxed mb-6">
              Your trusted local handyman serving the Greater Mohawk Valley &
              Adirondack Region. Licensed, insured, and ready to help.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+15189212971"
                className="flex items-center gap-2 text-cream/80 hover:text-amber transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(518) 921-2971</span>
              </a>
              <a
                href="mailto:owenmormile@gmail.com"
                className="flex items-center gap-2 text-cream/80 hover:text-amber transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>owenmormile@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-cream/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>4748 State Highway 30, Amsterdam, NY 12010</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-amber mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-amber mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-amber mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100063972312088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream/80 hover:text-amber transition-colors text-sm"
                >
                  <Facebook className="w-4 h-4" />
                  Follow on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-sm">
              &copy; {new Date().getFullYear()} Adirondack Handyman. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-cream/60 text-sm">Licensed & Insured</span>
              <a
                href="https://defiantintegration.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-amber transition-colors text-sm"
              >
                Web Design by Defiant Integration
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
