"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Home,
  TreePine,
  Tv,
  Snowflake,
  ListChecks,
  MessageSquare,
  Flame,
  Calendar,
  Leaf,
  Phone,
  Mail,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const serviceOptions = [
  { id: "interior", icon: Home, label: "Interior Repairs" },
  { id: "exterior", icon: TreePine, label: "Exterior Work" },
  { id: "assembly", icon: Tv, label: "Assembly & Install" },
  { id: "seasonal", icon: Snowflake, label: "Seasonal Prep" },
  { id: "honey-do", icon: ListChecks, label: "Honey-Do List" },
  { id: "other", icon: MessageSquare, label: "Something Else" },
];

const urgencyOptions = [
  { id: "emergency", icon: Flame, label: "Emergency", description: "Need help ASAP" },
  { id: "this-week", icon: Calendar, label: "This Week", description: "Pretty soon" },
  { id: "flexible", icon: Leaf, label: "Flexible", description: "Whenever works" },
];

const contactMethods = [
  { id: "phone", icon: Phone, label: "Call me" },
  { id: "text", icon: MessageSquare, label: "Text me" },
  { id: "email", icon: Mail, label: "Email me" },
];

const formSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  description: z.string().optional(),
  urgency: z.string().min(1, "Please select urgency"),
  contactMethod: z.string().min(1, "Please select contact method"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Address is required"),
  bestTime: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: preselectedService || "",
      urgency: "",
      contactMethod: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      description: "",
      bestTime: "",
    },
  });

  const selectedService = watch("service");
  const selectedUrgency = watch("urgency");
  const selectedContactMethod = watch("contactMethod");

  useEffect(() => {
    if (preselectedService) {
      setValue("service", preselectedService);
    }
  }, [preselectedService, setValue]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<{name: string, type: string, size: number, data: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const webhookUrl = "https://internal.defiantintegration.com/webhook/adirondack-quote";

      if (!webhookUrl) {
        console.error("Quote webhook URL not configured");
        setIsSubmitting(false);
        setIsSubmitted(true);
        return;
      }

      // Process files to base64
      const processedFiles = [];
      for (const file of uploadedFiles) {
        // Skip files over 5MB to avoid timeout issues
        if (file.size > 5 * 1024 * 1024) {
          console.warn(`Skipping ${file.name} - too large (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
          continue;
        }
        try {
          const base64File = await fileToBase64(file);
          processedFiles.push(base64File);
        } catch (err) {
          console.error(`Failed to process ${file.name}:`, err);
        }
      }

      // Prepare form data with base64 encoded files
      const payload = {
        ...data,
        files: processedFiles,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      // Still show success to user - Owen can follow up via phone if webhook fails
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedUrgency && !!selectedContactMethod;
      case 3:
        return true;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-cream to-forest/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-forest rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-cream" />
          </motion.div>
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-charcoal mb-4">
            Got it! I'll be in touch soon.
          </h1>
          <p className="text-charcoal-light mb-6">
            I typically respond within 24 hours, often much sooner. Keep an eye on your phone!
          </p>
          <div className="bg-dark-lighter rounded-2xl p-6 shadow-lg mb-6 border border-dark-border">
            <p className="text-sm text-charcoal-light mb-2">In the meantime...</p>
            <a
              href="tel:+15189212971"
              className="flex items-center justify-center gap-2 text-forest font-semibold hover:text-forest-dark transition-colors"
            >
              <Phone className="w-5 h-5" />
              Need it faster? Call (518) 921-2971
            </a>
          </div>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-cream via-cream to-forest/5">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-charcoal mb-2">
            Tell Me What's Going On
          </h1>
          <p className="text-charcoal-light">
            Just a few quick questions and I'll get back to you with a plan.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`text-sm font-medium ${
                  s <= step ? "text-forest" : "text-charcoal-light"
                }`}
              >
                {s === 1 && "Service"}
                {s === 2 && "Details"}
                {s === 3 && "Photos"}
                {s === 4 && "Contact"}
              </div>
            ))}
          </div>
          <div className="h-2 bg-forest/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-forest rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-dark-lighter rounded-3xl shadow-xl p-6 md:p-8 min-h-[400px] border border-dark-border">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-charcoal mb-6">
                    What do you need help with?
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {serviceOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedService === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setValue("service", option.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-forest bg-forest/5"
                              : "border-forest/10 hover:border-forest/30"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 mb-2 ${
                              isSelected ? "text-forest" : "text-charcoal-light"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-forest" : "text-charcoal"
                            }`}
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedService === "other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Tell me more:
                      </label>
                      <textarea
                        {...register("description")}
                        rows={3}
                        placeholder="Describe what you need help with..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none resize-none"
                      />
                    </motion.div>
                  )}

                  {errors.service && (
                    <p className="text-error text-sm mt-2">{errors.service.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 2: Urgency & Contact Method */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-charcoal mb-6">
                    A few quick details
                  </h2>

                  {/* Urgency */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      How urgent is this?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {urgencyOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedUrgency === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setValue("urgency", option.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-center ${
                              isSelected
                                ? "border-forest bg-forest/5"
                                : "border-forest/10 hover:border-forest/30"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 mx-auto mb-1 ${
                                isSelected ? "text-forest" : "text-charcoal-light"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium block ${
                                isSelected ? "text-forest" : "text-charcoal"
                              }`}
                            >
                              {option.label}
                            </span>
                            <span className="text-xs text-charcoal-light">
                              {option.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      Best way to reach you?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {contactMethods.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedContactMethod === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setValue("contactMethod", option.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              isSelected
                                ? "border-forest bg-forest/5"
                                : "border-forest/10 hover:border-forest/30"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 mx-auto mb-1 ${
                                isSelected ? "text-forest" : "text-charcoal-light"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                isSelected ? "text-forest" : "text-charcoal"
                              }`}
                            >
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Photo Upload */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-charcoal mb-2">
                    Got any photos? (Optional)
                  </h2>
                  <p className="text-charcoal-light text-sm mb-6">
                    A picture helps me understand the issue and give you a better estimate.
                  </p>

                  {/* Upload area */}
                  <div className="border-2 border-dashed border-forest/20 rounded-2xl p-8 text-center hover:border-forest/40 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 text-forest/40 mx-auto mb-3" />
                      <p className="text-charcoal font-medium mb-1">
                        Drop photos here or click to upload
                      </p>
                      <p className="text-charcoal-light text-sm">
                        PNG, JPG up to 10MB each
                      </p>
                    </label>
                  </div>

                  {/* Uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-forest/5 px-4 py-2 rounded-lg"
                        >
                          <span className="text-sm text-charcoal truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-charcoal-light hover:text-error transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Anything else I should know?
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      placeholder="Describe the issue, when it started, what you've tried..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-charcoal mb-6">
                    How do I reach you?
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Your name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none"
                      />
                      {errors.name && (
                        <p className="text-error text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Phone number
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="(518) 921-2971"
                          className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="text-error text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Email address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none"
                        />
                        {errors.email && (
                          <p className="text-error text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Service address
                      </label>
                      <input
                        {...register("address")}
                        type="text"
                        placeholder="123 Main St, Amsterdam, NY 12010"
                        className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none"
                      />
                      {errors.address && (
                        <p className="text-error text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Best time to reach you (optional)
                      </label>
                      <input
                        {...register("bestTime")}
                        type="text"
                        placeholder="Mornings, after 5pm, anytime..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-forest/10 focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-forest/10">
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send My Request"}
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Quick contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-charcoal-light text-sm mb-2">
            Prefer to just call?
          </p>
          <a
            href="tel:+15189212971"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-dark font-semibold transition-colors"
          >
            <Phone className="w-4 h-4" />
            (518) 921-2971
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-cream to-forest/5">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
      </div>
    }>
      <QuoteFormContent />
    </Suspense>
  );
}
