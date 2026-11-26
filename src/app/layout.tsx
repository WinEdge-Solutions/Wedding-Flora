import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getPublishedCmsData } from "@/lib/cms/server";
import { buildThemeCssVars } from "@/lib/cms/theme";
import { CmsProvider } from "@/components/cms/CmsProvider";
import { SiteChromeShell } from "@/components/layout/SiteChromeShell";

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

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getPublishedCmsData();
  const homePage = cms.pages.home;

  return {
    title: homePage.seoTitle || `${cms.site.name} | ${cms.site.tagline}`,
    description: homePage.seoDescription || cms.site.description,
    icons: {
      icon: cms.site.logoEmblemUrl || "/images/logo-emblem.png",
      shortcut: cms.site.logoEmblemUrl || "/images/logo-emblem.png",
      apple: cms.site.logoEmblemUrl || "/images/logo-emblem.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsData = await getPublishedCmsData();
  const cssVars = buildThemeCssVars(cmsData.theme) as React.CSSProperties;

  return (
    <html
      lang="en"
      style={cssVars}
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable} bg-[#FDFAF5]`}
    >
      <head>
        <link rel="preload" href="/videos/hero-bg.mp4" as="video" type="video/mp4" />
      </head>
      <body
        className="font-sans min-h-screen flex flex-col selection:bg-gold selection:text-white relative"
        style={{
          backgroundColor: "var(--wf-paper, #FDFAF5)",
          color: "var(--wf-ink, #1A1209)",
          fontSize: "var(--wf-body-size, 16px)",
        }}
      >
        <CmsProvider initialData={cmsData}>
          <SiteChromeShell>{children}</SiteChromeShell>
        </CmsProvider>
      </body>
    </html>
  );
}
