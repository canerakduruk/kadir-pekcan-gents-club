"use client";

export default function Map() {
  const address = "Galipbey Caddesi 11, Maltepe, 34840, İstanbul";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="w-full h-[400px] bg-[#171717] rounded-2xl overflow-hidden border border-[#222] relative group">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.28859345717!2d29.1308333!3d40.9213889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac40da714d66b%3A0x62c07049c66e2c36!2sGalipbey%20Cd.%20No%3A11%2C%20Maltepe%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1712315000000!5m2!1str!2str"
        width="100%"
        height="100%"
        allowFullScreen={true}
        loading="lazy"
        title="Kadir Pekcan Gent's Club Harita Konumu"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <div className="absolute bottom-4 right-4">
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#d4af37] text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Yol Tarifi Al
        </a>
      </div>
    </div>
  );
}