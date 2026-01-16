"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

const faqCategories = [
  {
    name: "Pricing & Payment",
    faqs: [
      {
        question: "How much do you charge?",
        answer: "I charge a fair hourly rate for most jobs, with a one-hour minimum. For larger projects, I'll give you a flat quote upfront so there are no surprises. Every estimate is free, so just ask and I'll give you a clear picture of what to expect.",
      },
      {
        question: "Do you give free estimates?",
        answer: "Absolutely. For most jobs, I can give you a ballpark over the phone or via text/email. For bigger or more complex projects, I'll come take a look at no charge and give you a written quote before any work begins.",
      },
      {
        question: "When do I pay?",
        answer: "Payment is due when the job is complete and you're happy with the work. For larger projects, we might split it into milestones. I accept cash, check, Venmo, and all major credit cards.",
      },
      {
        question: "Do you require a deposit?",
        answer: "Not usually. For larger projects that require me to purchase materials upfront, I may ask for a materials deposit, but we'll discuss that before starting.",
      },
    ],
  },
  {
    name: "Scheduling & Availability",
    faqs: [
      {
        question: "How quickly can you come out?",
        answer: "It depends on my current schedule, but I try to respond to all inquiries within 24 hours. For true emergencies, call me directly and I'll do my best to squeeze you in. For regular jobs, I can usually get there within a few days to a week.",
      },
      {
        question: "Do you work weekends?",
        answer: "I try to keep weekends for family, but I understand that's sometimes the only time that works for you. Let me know your situation and we'll figure something out.",
      },
      {
        question: "Do I need to be home while you work?",
        answer: "It depends on the job and your comfort level. Many customers give me a key or garage code and I work while they're at their jobs. Others prefer to be there. Whatever works best for you.",
      },
      {
        question: "What if I need to reschedule?",
        answer: "Life happens. Just give me as much notice as possible (24 hours is ideal) and we'll find another time. No hard feelings.",
      },
    ],
  },
  {
    name: "Services & Capabilities",
    faqs: [
      {
        question: "What kind of work do you do?",
        answer: "General handyman stuff: repairs, assembly, installation, maintenance, and those random projects that don't fit neatly into one category. Check out my Services page for details, but if you're unsure, just ask. If I can't do it, I'll tell you and probably know someone who can.",
      },
      {
        question: "Is there anything you won't do?",
        answer: "Yes — major electrical work, plumbing beyond basic repairs, roofing, HVAC, and anything involving gas lines. These require licensed specialists for your safety. I'm happy to recommend trusted pros for this work.",
      },
      {
        question: "Do you do small jobs?",
        answer: "Those are often my favorite! Hang a picture, fix a squeaky door, install a smoke detector — no job is too small. I have a one-hour minimum, so some folks save up a few small tasks for one visit.",
      },
      {
        question: "Can you help with emergencies?",
        answer: "I'll do my best. If you have a burst pipe or something urgent, call me directly. I can't promise I'll drop everything, but I'll try to help if I can or point you to someone who can.",
      },
    ],
  },
  {
    name: "Trust & Guarantee",
    faqs: [
      {
        question: "Are you licensed and insured?",
        answer: "Yes. I carry full liability insurance and workers' comp. I'm happy to provide proof of insurance if needed for your records or property manager.",
      },
      {
        question: "What if something goes wrong after you leave?",
        answer: "I stand behind my work. If something I fixed isn't working right, call me and I'll come back to make it right — no additional charge for workmanship issues. I want you to feel confident recommending me to your neighbors.",
      },
      {
        question: "Do you clean up after yourself?",
        answer: "Always. I bring drop cloths, clean up debris, and leave your space as clean as (or cleaner than) I found it. You shouldn't even know I was there, except for the fixed stuff.",
      },
      {
        question: "Can I trust you in my home?",
        answer: "I take this seriously. I'm a local guy with a reputation to protect. I've worked in hundreds of homes in this area, and I treat every one like it's my own. Check my reviews — trustworthiness is something my customers mention a lot.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (question: string) => {
    setOpenItems((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cream via-cream to-forest/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl mb-8">
              Got questions? I've got answers. If you don't see what you're looking for,
              just reach out.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-dark-border focus:border-forest focus:outline-none bg-dark-lighter text-charcoal"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-charcoal-light mb-4">
                No questions found matching "{searchQuery}"
              </p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-charcoal mb-6">
                    {category.name}
                  </h2>

                  <div className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => {
                      const isOpen = openItems.includes(faq.question);
                      return (
                        <motion.div
                          key={faq.question}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + faqIndex * 0.05 }}
                          className="bg-dark-lighter rounded-2xl shadow-md shadow-black/20 border border-dark-border overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(faq.question)}
                            className="w-full p-5 flex items-center justify-between text-left hover:bg-forest/5 transition-colors"
                          >
                            <span className="font-medium text-charcoal pr-4">
                              {faq.question}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0"
                            >
                              <ChevronDown className="w-5 h-5 text-forest" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-5 pb-5">
                                  <p className="text-charcoal-light leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-cream mb-6">
              Still Have Questions?
            </h2>
            <p className="text-cream/80 text-lg mb-8 max-w-xl mx-auto">
              I'm always happy to chat. Give me a call, shoot me a text, or fill out
              the quote form and I'll get back to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/quote" variant="secondary" size="lg">
                Ask Your Question
              </Button>
              <span className="text-cream/60">or</span>
              <a
                href="tel:+15189212971"
                className="inline-flex items-center gap-2 text-cream hover:text-amber font-semibold transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call (518) 921-2971
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
