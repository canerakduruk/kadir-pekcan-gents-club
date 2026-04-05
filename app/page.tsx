"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Bileşenlerimiz
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Map from "@/components/site/Map";
import OpeningStatus from "@/components/site/OpeningStatus";
import Image from "next/image";

interface FAQItem { id: string; question: string; answer: string; }
interface PriceItem { id: string; service: string; price: string; }
interface GalleryImage { id: string; url: string; }

export default function Home() {
  // EFENDİM, STATE'LER BURADA (FONKSİYONUN İÇİNDE) OLMALI:
  const [pricingList, setPricingList] = useState<PriceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [faqList, setFaqList] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // SSS Akordeon state'i
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Veritabanından Verileri Çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pricingRef = doc(db, "siteData", "pricing");
        const pricingSnap = await getDoc(pricingRef);
        if (pricingSnap.exists() && pricingSnap.data().list) {
          setPricingList(pricingSnap.data().list);
        }

        const galleryRef = doc(db, "siteData", "gallery");
        const gallerySnap = await getDoc(galleryRef);
        if (gallerySnap.exists() && gallerySnap.data().images) {
          setGallery(gallerySnap.data().images);
        }

        const faqSnap = await getDoc(doc(db, "siteData", "faq"));
        if (faqSnap.exists()) {
          setFaqList(faqSnap.data().questions || []);
        }

      } catch (error) {
        console.error("Veriler çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Slayt İleri-Geri Fonksiyonları
  const nextSlide = () => {
    if (gallery.length > 0) {
      setCurrentSlide((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (gallery.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-[#e5e5e5] font-sans selection:bg-[#d4af37] selection:text-black">

      {/* 1. HERO */}
      <Hero />

      {/* 2. TAM EKRAN SLIDER */}
      {gallery.length > 0 && (
        <section 
          className="relative w-full h-[70vh] md:h-[90vh] bg-[#050505] overflow-hidden group"
          aria-label="Kadir Pekcan Gent's Club Portfolyo Slider"
        >
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            aria-live="polite"
          >
            {gallery.map((slide, index) => (
              <div 
                key={slide.id} 
                className="w-full h-full flex-shrink-0 relative"
                role="group"
                aria-roledescription="slide"
              >
                <Image
                  src={slide.url}
                  alt={`Kadir Pekcan Gent's Club Tasarım - ${index + 1}`}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
              </div>
            ))}
          </div>

          <button onClick={prevSlide} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-3 md:p-5 bg-black/30 hover:bg-[#d4af37] text-white hover:text-black rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <button onClick={nextSlide} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-3 md:p-5 bg-black/30 hover:bg-[#d4af37] text-white hover:text-black rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${currentSlide === index ? "w-8 h-2 bg-[#d4af37]" : "w-2 h-2 bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. FİYAT LİSTESİ */}
      <Services pricingList={pricingList} loading={loading} />

      {/* 5. SSS BÖLÜMÜ */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase mb-4 block">Merak Edilenler</span>
            <h2 className="text-4xl font-light tracking-tighter uppercase">Sıkça Sorulan Sorular</h2>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`border ${openIndex === index ? "border-[#d4af37]/50" : "border-[#222]"} bg-[#111] rounded-2xl overflow-hidden transition-all duration-500`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <h3 className={`text-lg font-medium transition-colors duration-300 ${openIndex === index ? "text-[#d4af37]" : "text-white"}`}>
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform duration-500 ${openIndex === index ? "rotate-45 text-[#d4af37]" : "text-[#a3a3a3]"}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                </button>

                <div className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-[#a3a3a3] text-sm leading-relaxed border-t border-[#222]/50 mt-2">
                      <p className="border-l-2 border-[#d4af37] pl-4">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. İLETİŞİM & HARİTA ALANI */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#111] border-b border-[#222]">
        <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <div>
            <span className="text-sm font-serif italic text-[#d4af37] block mb-2">Bize Ulaşın</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">İletişim & Lokasyon</h2>
          </div>
          <a href="https://wa.me/905397738066" target="_blank" className="text-[#d4af37] hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            WhatsApp'tan Yaz
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          <div className="flex flex-col h-full">
            <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Ziyaret Saatleri</h3>
            <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-[#222] overflow-hidden">
              <OpeningStatus />
            </div>
          </div>
          <div className="flex flex-col h-full">
            <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Konum Detayı</h3>
            <div className="flex-1 h-full min-h-[300px]"><Map /></div>
          </div>
        </div>
      </section>
    </div>
  );
}