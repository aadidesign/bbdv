import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { site } from "@/content/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Cosmetic Surgery Holidays to India`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cosmetic surgery India",
    "plastic surgery holiday",
    "medical tourism India",
    "cosmetic surgery Bangalore",
    "surgery tours from Australia",
    "Body By Design Vacations",
  ],
  openGraph: {
    title: `${site.name} | Cosmetic Surgery Holidays to India`,
    description: site.description,
    type: "website",
    locale: "en_AU",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="overflow-clip">{children}</main>
          <Footer />
          <WhatsAppFab />
          <ChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
