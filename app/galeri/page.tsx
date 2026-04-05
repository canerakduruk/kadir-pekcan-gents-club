"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "@/components/site/Navbar";
import Gallery from "@/components/site/Gallery";
import Contact from "@/components/site/Contact";

interface GalleryImage { id: string; url: string; }

export default function GaleriPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const docRef = doc(db, "siteData", "gallery");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().images) {
          setGallery(docSnap.data().images);
        }
      } catch (error) {
        console.error("Galeri verisi çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <>
      <title>Galeri & Çalışmalarımız | Kadir Pekcan Gent's Club</title>
      <meta name="description" content="Kadir Pekcan Gent's Club Maltepe premium saç tasarım, sakal kesim ve erkek bakım çalışmalarından oluşan fotoğraf galerisi." />
      
      <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans flex flex-col">
        <main className="flex-1 pt-20">
          {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-[#d4af37] text-sm tracking-widest uppercase animate-pulse">Galeri Hazırlanıyor...</div>
            </div>
          ) : (
            <Gallery gallery={gallery} />
          )}
        </main>
      </div>
    </>
  );
}