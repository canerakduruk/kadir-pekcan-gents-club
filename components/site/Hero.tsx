"use client";

export default function Hero() {
  return (
    // DİKKAT: min-h-[70vh] yerine min-h-[90vh] yaptık ki alanı tamamen kaplasın ve alttaki section'ı aşağı itsin.
    <section id="anasayfa" className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pb-16 pt-10 overflow-hidden">
      
      {/* Arka Plan Efektleri */}
      <div className="absolute inset-0 bg-[#0a0a0a] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-950/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Tipografi Odaklı Başlık */}
        {/* Yazıları dev logodan biraz daha uzaklaştırmak için mt-10 md:mt-16 ekledik */}
        <div className="max-w-4xl flex flex-col items-center mt-10 md:mt-16">
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-extralight tracking-tighter text-[#e5e5e5] uppercase">
            Sıradanlığı <br/>
            <span className="font-serif italic text-[#d4af37] md:pl-[12%]">Reddet.</span>
          </h1>
          
          <p className="mt-12 text-sm md:text-base md:text-lg max-w-lg text-[#a3a3a3] font-light leading-relaxed border-t border-[#333] pt-6">
            <span className="text-[#d4af37] font-medium">Kadir Pekcan Gent's Club</span>, klasik berber algısını yıkıyor. Maltepe'de, sadece saç ve sakal değil, modern erkeğe dair eksiksiz bir bakım kültürü sunuyoruz. Kusursuz vizyon ve tamamen size özel bir deneyim için buradayız.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs tracking-[0.3em] uppercase">
             <a href="https://www.kolayrandevu.com/isletme/kadir-pekcan-gents-club?website=1" target="_blank" className="bg-[#d4af37] text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
               Hemen Randevu Al
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </a>
             <a href="https://wa.me/905397738066" target="_blank" className="border border-[#333] px-6 py-3 rounded-full hover:bg-white/5 transition-colors">WhatsApp Ulaşım</a>
          </div>
        </div>

      </div>
      
    </section>
  );
}