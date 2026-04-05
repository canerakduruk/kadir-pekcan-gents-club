import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";


export const metadata: Metadata = {
  title: "Kadir Pekcan Gent's Club | Maltepe Premium Erkek Kuaförü",
  description: "Galipbey Caddesi'nde sıradanlığı reddeden beyefendilerin kulübü. Premium saç ve sakal tasarımı, eksiksiz modern erkek bakım merkezi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Kadir Pekcan Gent's Club",
    "image": "https://www.senindomainin.com/logo.png",
    "url": "https://www.senindomainin.com",
    "telephone": "+905397738066",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Galipbey Caddesi No: 11",
      "addressLocality": "Maltepe",
      "addressRegion": "İstanbul",
      "postalCode": "34840",
      "addressCountry": "TR"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "20:30"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/kadirpekcangentsclub/",
      "https://www.tiktok.com/@kadirpekcangentsclub"
    ]
  };

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* JSON-LD kodunu sitenin arka planına (görünmez şekilde) gömüyoruz */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#e5e5e5] font-sans selection:bg-[#d4af37] selection:text-black flex flex-col min-h-screen">
        <Navbar /> 
        
        <main className="flex-1 w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}