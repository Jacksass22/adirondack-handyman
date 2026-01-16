import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/ChatWidget";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adirondack Handyman | Your Trusted Local Handyman in Amsterdam, NY",
  description:
    "Professional handyman services in Amsterdam, NY and the Mohawk Valley. Home repairs, assembly, maintenance, and more. Licensed, insured, and ready to help.",
  keywords: [
    "handyman",
    "Amsterdam NY",
    "Mohawk Valley",
    "home repair",
    "handyman services",
    "Adirondack",
    "home maintenance",
  ],
  openGraph: {
    title: "Adirondack Handyman | Your Trusted Local Handyman",
    description:
      "Professional handyman services in Amsterdam, NY and the Mohawk Valley. Licensed, insured, and ready to help.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${dmSans.variable} antialiased bg-cream text-charcoal`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
