"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "@/components/site/Navbar";
import Services from "@/components/site/Services";
import Contact from "@/components/site/Contact";

interface PriceItem { id: string; service: string; price: string; }

export default function HizmetlerPage() {
  const [pricingList, setPricingList] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const docRef = doc(db, "siteData", "pricing");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().list) {
          setPricingList(docSnap.data().list);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  return (
    <>
      <title>Hizmet Fiyatları | Kadir Pekcan Gent's Club</title>
      <meta name="description" content="Kadir Pekcan Gent's Club premium saç kesimi, sakal tasarımı ve modern erkek bakım hizmetleri güncel fiyat listesi." />

      <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans">
        <div className="pt-24"> {/* Menünün arkasında kalmaması için boşluk */}
          <Services pricingList={pricingList} loading={loading} />
        </div>
      </div>
    </>
  );
}