"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  url: string;
}

export default function Gallery({ gallery }: { gallery: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % gallery.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <section id="galeri" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-white">
            Galeri
          </h1>
          <div className="w-12 h-[1px] bg-[#d4af37] mt-4"></div>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {gallery.map((img, index) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedIndex(index)}
              className={`relative overflow-hidden group cursor-zoom-in bg-[#171717] rounded-sm transition-all duration-500 hover:ring-1 hover:ring-[#d4af37]/30 
                w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] aspect-[3/4]`}
            >
              <Image 
                src={img.url} 
                alt={`Kadir Pekcan Gent's Club Maltepe Erkek Saç Tasarım Çalışması - Görsel ${index + 1}`} 
                fill
                priority={index < 2} // Sayfa başındaki ilk 2 resim hızlı yüklenir
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button aria-label="Galeriyi Kapat" className="absolute top-8 right-8 text-white/50 hover:text-white z-[110] transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <button 
            aria-label="Önceki Görsel"
            onClick={handlePrev}
            className="absolute left-4 md:left-10 p-4 text-white/30 hover:text-[#d4af37] transition-all z-[110]"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image 
              src={gallery[selectedIndex].url} 
              alt={`Kadir Pekcan Gent's Club Büyük Boy Görsel - ${selectedIndex + 1}`} 
              fill
              className="object-contain shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>

          <button 
            aria-label="Sonraki Görsel"
            onClick={handleNext}
            className="absolute right-4 md:right-10 p-4 text-white/30 hover:text-[#d4af37] transition-all z-[110]"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div className="absolute bottom-10 text-white/40 text-xs tracking-[0.4em] uppercase" aria-live="polite">
            {selectedIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </section>
  );
}