"use client";

import Map from "@/components/site/Map";
import OpeningStatus from "@/components/site/OpeningStatus";

export default function IletisimPage() {
  return (
    <>
      <title>İletişim ve Lokasyon | Kadir Pekcan Gent's Club</title>
      <meta name="description" content="Maltepe'nin en iyi erkek kuaförü Kadir Pekcan Gent's Club adres, yol tarifi, WhatsApp iletişim bilgileri ve ziyaret saatleri." />

      <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans selection:bg-[#d4af37] selection:text-black flex flex-col">
        <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
          {/* Başlık Bölümü */}
          <div className="mb-16">
            <span className="text-sm font-serif italic text-[#d4af37] block mb-2">Bize Ulaşın</span>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase">
              İletişim & <br />
              <span className="text-[#d4af37] italic font-serif">Lokasyon</span>
            </h1>
          </div>

          {/* ÜST BÖLÜM: Harita ve Çalışma Saatleri Yan Yana */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Konum Detayı</h3>
              <Map />
            </div>
            <div>
              <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-6">Ziyaret Saatleri</h3>
              <OpeningStatus />
            </div>
          </div>

          {/* ALT BÖLÜM: Merkezimiz ve Dijital Kanallar */}
          <div className="grid grid-cols-1 gap-12 pt-12 border-t border-[#222]">

            {/* Merkezimiz (Adres) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase mb-4">Adresimiz</h3>
                <p className="text-2xl md:text-3xl font-light leading-tight">
                  Galipbey Caddesi No: 11 Altıntepe Mahallesi<br/>
                  Maltepe / İstanbul
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-[#222] mx-12"></div>
              <div className="text-right">
                <p className="text-[#737373] text-xs tracking-widest uppercase mb-1">Müşteri Hattı</p>
                <a href="tel:+905397738066" aria-label="Telefonla Ara" className="text-xl hover:text-[#d4af37] transition-colors">+90 539 773 80 66</a>
              </div>
            </div>

            {/* Dijital Kanallar (Yan Yana Kartlar) */}
            <div className="space-y-6">
              <h3 className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Dijital Kanallar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* WhatsApp */}
                <a href="https://wa.me/905397738066" target="_blank" aria-label="WhatsApp üzerinden mesaj gönder" className="flex items-center gap-5 group p-6 bg-[#111] rounded-2xl border border-[#222] hover:border-green-500 transition-all transform hover:-translate-y-1">
                  <div className="p-4 bg-green-500/10 text-green-500 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-all">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#737373] uppercase tracking-widest mb-1">WhatsApp</p>
                    <p className="text-white font-medium group-hover:text-green-500 transition-colors">Hızlı Randevu</p>
                  </div>
                </a>

                {/* TikTok */}
                <a href="https://www.tiktok.com/@kadirpekcangentsclub" target="_blank" aria-label="TikTok hesabımızı ziyaret et" className="flex items-center gap-5 group p-6 bg-[#111] rounded-2xl border border-[#222] hover:border-white transition-all transform hover:-translate-y-1">
                  <div className="p-4 bg-white/10 text-white rounded-xl group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.33 6.33 6.33 6.33 0 006.33-6.33V8.45a8.27 8.27 0 004.33 1.2V6.2a4.48 4.48 0 01-2.4-.71z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#737373] uppercase tracking-widest mb-1">TikTok</p>
                    <p className="text-white font-medium">Keşfet</p>
                  </div>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/kadirpekcangentsclub/" target="_blank" aria-label="Instagram hesabımızı ziyaret et" className="flex items-center gap-5 group p-6 bg-[#111] rounded-2xl border border-[#222] hover:border-pink-500 transition-all transform hover:-translate-y-1">
                  <div className="p-4 bg-pink-500/10 text-pink-500 rounded-xl group-hover:bg-pink-500 group-hover:text-white transition-all">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#737373] uppercase tracking-widest mb-1">Instagram</p>
                    <p className="text-white font-medium group-hover:text-pink-500 transition-colors">Portfolyo</p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}