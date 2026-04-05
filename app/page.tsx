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
interface PriceItem { id: string; service: string; price: string; }
interface GalleryImage { id: string; url: string; }

export default function Home() {
  const [pricingList, setPricingList] = useState<PriceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Slider için hangi fotoğrafta olduğumuzu tutan state
  const [currentSlide, setCurrentSlide] = useState(0);

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

      {/* 1. HERO (Kahraman Alanı) */}
      <Hero />

    {/* 2. TAM EKRAN SLIDER (Vitrin) */}
{gallery.length > 0 && (
  <section 
    className="relative w-full h-[70vh] md:h-[90vh] bg-[#050505] overflow-hidden group"
    aria-label="Kadir Pekcan Gent's Club Portfolyo Slider"
  >
    {/* Fotoğrafların Kaydığı Konteyner */}
    <div
      className="flex w-full h-full transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      aria-live="polite"
    >
      {/* "img" ismini "slide" olarak değiştirdik (ts(2607) hatasının kesin çözümü) */}
      {gallery.map((slide, index) => (
        <div 
          key={slide.id} 
          className="w-full h-full flex-shrink-0 relative"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${gallery.length}`}
        >
          <Image
            src={slide.url}
            alt={`Kadir Pekcan Gent's Club Maltepe Erkek Kuaförü Tasarım - ${index + 1}`}
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

    {/* Sol Ok */}
    <button
      onClick={prevSlide}
      aria-label="Önceki Görsel"
      className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-3 md:p-5 bg-black/30 hover:bg-[#d4af37] text-white hover:text-black rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
    >
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    {/* Sağ Ok */}
    <button
      onClick={nextSlide}
      aria-label="Sonraki Görsel"
      className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-3 md:p-5 bg-black/30 hover:bg-[#d4af37] text-white hover:text-black rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
    >
      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    {/* Alt Göstergeler (Noktalar) */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
      {gallery.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`transition-all duration-300 rounded-full ${
            currentSlide === index ? "w-8 h-2 bg-[#d4af37]" : "w-2 h-2 bg-white/50 hover:bg-white"
          }`}
          aria-label={`Görsel ${index + 1} git`}
          aria-current={currentSlide === index ? "true" : "false"}
        />
      ))}
    </div>
  </section>
)}

      {/* 4. FİYAT LİSTESİ (Tablo/Pano Tasarımı) */}
      <Services pricingList={pricingList} loading={loading} />
      {/* 3. İLETİŞİM & HARİTA ALANI */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#111] border-b border-[#222]">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <span className="text-sm font-serif italic text-[#d4af37] block mb-2">Bize Ulaşın</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">İletişim & Lokasyon</h2>
            </div>
            <a href="https://wa.me/905397738066" target="_blank" className="text-[#d4af37] hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              WhatsApp'tan Yaz
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col h-full">
              <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Ziyaret Saatleri</h3>
              <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-[#222] overflow-hidden">
                <OpeningStatus />
              </div>
            </div>

            <div className="flex flex-col h-full">
              <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Konum Detayı</h3>
              <div className="flex-1 h-full min-h-[300px]">
                <Map />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}