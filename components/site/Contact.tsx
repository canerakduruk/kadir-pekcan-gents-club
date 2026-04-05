export default function Contact() {
  return (
    <>
      <section id="iletisim" className="py-32 px-6 md:px-12 lg:px-24 bg-[#111]">
        <div className="max-w-5xl mx-auto text-center">
           <span className="text-sm font-serif italic text-[#d4af37] mb-4 block">03. İletişim</span>
           <h3 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-12">Bize Ulaşın</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-[#a3a3a3]">
              <div>
                <h4 className="text-[#e5e5e5] tracking-widest uppercase mb-4 text-sm">Lokasyon</h4>
                <p className="font-light">Galipbey Caddesi 11,<br/>Maltepe, 34840<br/>İstanbul, TR</p>
              </div>
              <div>
                <h4 className="text-[#e5e5e5] tracking-widest uppercase mb-4 text-sm">İrtibat</h4>
                <a href="https://wa.me/905397738066" className="block font-light hover:text-[#d4af37] transition-colors mb-2">+90 539 773 80 66</a>
                <a href="https://www.tiktok.com/@kadirpekcangentsclub?_r=1&_t=ZS-95B85gGSbkz" target="_blank" rel="noopener noreferrer" className="block font-light hover:text-[#d4af37] transition-colors">TikTok</a>
              </div>
              <div>
                <h4 className="text-[#e5e5e5] tracking-widest uppercase mb-4 text-sm">Saatler</h4>
                <p className="font-light">Pazartesi - Pazar<br/>09:00 - 20:30</p>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-6 text-center bg-[#050505] text-[#525252] text-xs tracking-widest uppercase">
        <p>© {new Date().getFullYear()} Kadir Pekcan Gent's Club.</p>
      </footer>
    </>
  );
}