interface PriceItem {
  id: string;
  service: string;
  price: string;
}

export default function Services({ pricingList, loading }: { pricingList: PriceItem[], loading: boolean }) {
  return (
    <section id="hizmetler" className="py-24 px-6 md:px-12 lg:px-24 bg-[#050505] relative flex justify-center min-h-[80vh] items-center">
      
      {/* Duvar Aydınlatması Efekti (Tablonun arkasına vuran spot ışığı gibi) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#050505] opacity-60"></div>

      {/* ASILI TABLO / MENÜ ÇERÇEVESİ */}
      <div className="relative max-w-3xl w-full bg-[#0a0a0a] border border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-8 md:p-16">
        
        {/* İç Altın Çerçeve (Double Frame Efekti) */}
        <div className="absolute inset-3 md:inset-4 border border-[#d4af37]/20 pointer-events-none"></div>

        {/* Tablo Başlığı (Plaket) */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif tracking-[0.15em] uppercase text-[#d4af37] mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#737373]">
            Premium Bakım Ritüelleri
          </p>
          
          {/* Klasik Ayraç (Vintage Süs) */}
          <div className="flex items-center justify-center mt-8 gap-4 opacity-50">
            <div className="h-[1px] w-16 bg-[#d4af37]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-[1px] w-16 bg-[#d4af37]"></div>
          </div>
        </div>

        {/* Fiyat Listesi */}
        {loading ? (
          <div className="text-center text-[#d4af37] text-sm tracking-widest uppercase animate-pulse py-20">
            Menü Hazırlanıyor...
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 relative z-10 px-2 md:px-8">
            {pricingList.map((item) => (
              <div key={item.id} className="flex items-end justify-between group cursor-default">
                
                {/* Hizmet Adı (Arka planı siyah, çizginin üzerine binmesi için) */}
                <div className="bg-[#0a0a0a] pr-4 relative z-10">
                  <h4 className="text-base md:text-xl font-light tracking-widest text-[#e5e5e5] group-hover:text-[#d4af37] transition-colors uppercase">
                    {item.service}
                  </h4>
                </div>
                
                {/* Aradaki Noktalı Çizgiler (Leader Lines) */}
                <div className="flex-1 border-b-2 border-dotted border-[#333] group-hover:border-[#d4af37]/50 transition-colors mb-[6px] md:mb-[8px]"></div>
                
                {/* Fiyat (Arka planı siyah) */}
                <div className="bg-[#0a0a0a] pl-4 relative z-10">
                  <span className="text-lg md:text-2xl font-serif text-[#d4af37]">
                    {item.price}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tablo Alt Notu */}
        <div className="mt-20 text-center relative z-10">
          <p className="text-xs text-[#525252] font-serif italic">
            * Fiyatlarımız uygulanacak tekniğe ve saç yapısına göre değişiklik gösterebilir.
          </p>
        </div>
      </div>
      
    </section>
  );
}