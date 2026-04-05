"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import LoginForm from "@/components/admin/LoginForm";
import ImageManager from "@/components/admin/ImageManager";
import PricingManager from "@/components/admin/PricingManager"; 

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
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-amber-500">Yükleniyor...</div>;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-amber-500 uppercase tracking-widest">Yönetim Paneli</h1>
          <button 
            onClick={() => signOut(auth)} 
            className="bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white px-5 py-2 rounded font-semibold transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Bileşenleri yan yana diziyoruz */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageManager />
          <PricingManager /> {/* YENİ EKLENEN BİLEŞEN */}
        </div>
      </div>
    </div>
  );
}