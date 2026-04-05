"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü açık/kapalı durumu
  const LOGO_URL = "/logo.png"; 

  // Kaydırma efekti
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ekran büyüdüğünde (masaüstüne geçildiğinde) mobil menüyü otomatik kapat
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222] py-4" : "bg-[#0a0a0a] py-6 md:py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* SOL: Menü Linkleri (Masaüstü) & Hamburger İkonu (Mobil) */}
          <div className="flex-1 flex justify-start items-center">
            
            {/* Masaüstü Linkler */}
            <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#a3a3a3]">
              <Link href="/" className="hover:text-[#d4af37] transition-colors">Anasayfa</Link>
              <Link href="/hizmetler" className="hover:text-[#d4af37] transition-colors">Hizmetler</Link>
              <Link href="/galeri" className="hover:text-[#d4af37] transition-colors">Galeri</Link>
              <Link href="/iletisim" className="hover:text-[#d4af37] transition-colors">Bize Ulaşın</Link>
            </div>

            {/* Mobil Hamburger Butonu */}
            <button 
              className="md:hidden text-[#e5e5e5] hover:text-[#d4af37] transition-colors p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menüyü Aç"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* ORTA: Logo */}
          <div className="flex-none flex justify-center">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img 
                src={LOGO_URL} 
                alt="Kadir Pekcan Gent's Club" 
                // Mobilde h-16/12, Masaüstünde h-32/20 olacak şekilde responsive yapıldı
                className={`w-auto transition-all duration-300 object-contain ${isScrolled ? "h-10 md:h-20" : "h-14 md:h-32"}`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  document.getElementById('fallback-text-logo')!.style.display = 'block';
                }}
              />
              <span id="fallback-text-logo" className="hidden text-[#d4af37] font-serif tracking-widest text-lg md:text-2xl">K.PEKCAN</span>
            </Link>
          </div>

          {/* SAĞ: Randevu Butonu */}
          <div className="flex-1 flex justify-end">
            <a href="https://rande.vu" target="_blank" rel="noopener noreferrer" className="border border-[#d4af37] text-[#d4af37] px-3 py-2 md:px-5 md:py-2 text-[10px] md:text-xs tracking-widest uppercase hover:bg-[#d4af37] hover:text-black transition-colors whitespace-nowrap">
              Randevu Al
            </a>
          </div>

        </div>
      </nav>

      {/* TAM EKRAN MOBİL MENÜ (Sadece Mobilde Çalışır) */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-center items-center transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Kapatma Butonu */}
        <button 
          className="absolute top-8 right-6 text-[#737373] hover:text-[#d4af37] transition-colors p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Menüyü Kapat"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Mobil Linkler */}
        <div className="flex flex-col items-center gap-10 text-xl tracking-[0.3em] uppercase font-light text-[#e5e5e5]">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors">Anasayfa</Link>
          <Link href="/hizmetler" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors">Hizmetler</Link>
          <Link href="/galeri" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors">Galeri</Link>
          <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors">Bize Ulaşın</Link>
        </div>
        
        {/* Mobil Menü Alt İmza */}
        <div className="absolute bottom-12 text-[#d4af37] font-serif italic text-sm opacity-50">
              Kadir Pekcan Gent's Club
        </div>
      </div>
    </>
  );
}