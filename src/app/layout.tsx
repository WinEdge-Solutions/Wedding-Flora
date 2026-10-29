import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { GlobalAurora } from "@/components/ui/GlobalAurora";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Flora | Luxury Indian Wedding Planning & Royal Floral Artistry",
  description:
    "Premier luxury wedding planning, royal palace celebrations, opulent floral mandaps, and bespoke Sangeet productions across Udaipur, Jaipur, Jodhpur, and Goa.",
  icons: {
    icon: "/images/logo-emblem.png",
    shortcut: "/images/logo-emblem.png",
    apple: "/images/logo-emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable} bg-[#030308]`}
    >
      <head>
        <link rel="preload" href="/videos/hero-bg.mp4" as="video" type="video/mp4" />
      </head>
      <body className="bg-[#030308] text-[#FAF7F2] font-sans min-h-screen flex flex-col selection:bg-gold selection:text-black relative">
        <LenisProvider>
          {/* Google Stitch full-site responsive aurora gradient */}
          <GlobalAurora />
          {/* Custom luxury gold cursor — desktop only, skipped on touch */}
          <MagneticCursor />
          <Navbar />
          <div className="flex-1 relative z-10">{children}</div>
          <FloatingWhatsApp />
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
