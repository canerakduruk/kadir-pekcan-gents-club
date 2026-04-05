"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import LoginForm from "@/components/admin/LoginForm";
import ImageManager from "@/components/admin/ImageManager";
import PricingManager from "@/components/admin/PricingManager"; 
import FAQManager from "@/components/admin/FAQManager";
import ScheduleManager from "@/components/admin/ScheduleManager";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-amber-500 font-serif tracking-[0.3em] uppercase">
          Yükleniyor...
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    /* Efendim, flex-col ve min-h-screen ile yapıyı dikeyde sabitledik */
    <div className="flex flex-col min-h-screen bg-black text-zinc-100">
      
      {/* İçerik Alanı - flex-grow ile footer'ı aşağı itiyoruz */}
      <main className="flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full">
        
        {/* Üst Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-zinc-900 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-light text-white uppercase tracking-[0.2em]">
              Yönetim <span className="text-amber-500 font-bold">Paneli</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-2 tracking-widest italic">Kadir Pekcan Gent's Club</p>
          </div>
          <button 
            onClick={() => signOut(auth)} 
            className="border border-zinc-800 hover:border-red-600 hover:bg-red-600/10 text-zinc-500 hover:text-red-500 px-8 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-widest"
          >
            Güvenli Çıkış
          </button>
        </div>

        {/* Bileşen Grid Yapısı */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
          {/* Efendim, 'items-start' ekleyerek bir panel uzadığında diğerinin boyunun bozulmasını engelledik */}
          
          <section className="space-y-10">
            {/* Panellerin kendi içinde taşmaması için div ile sarmalayıp max-height verebilirsiniz */}
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar rounded-xl">
              <ImageManager />
            </div>
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar rounded-xl">
              <FAQManager />
            </div>
          </section>

          <section className="space-y-10">
            <PricingManager />
            <ScheduleManager />
          </section>
        </div>
      </main>

     
    </div>
  );
}