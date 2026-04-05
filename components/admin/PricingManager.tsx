"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface PriceItem {
  id: string;
  service: string;
  price: string;
}

export default function PricingManager() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Yeni eklenecek hizmet için state'ler
  const [newService, setNewService] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Firestore'dan mevcut fiyatları çek
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const docRef = doc(db, "siteData", "pricing");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().list) {
          setPrices(docSnap.data().list);
        }
      } catch (error) {
        console.error("Fiyatlar çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  // Değişiklikleri Firestore'a kaydet
  const saveToDatabase = async (updatedList: PriceItem[]) => {
    try {
      await setDoc(doc(db, "siteData", "pricing"), { list: updatedList });
    } catch (error) {
      alert("Fiyatlar kaydedilirken hata oluştu!");
    }
  };

  // Yeni Hizmet Ekle
  const handleAddPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.trim() || !newPrice.trim()) return;

    const newItem: PriceItem = {
      id: Date.now().toString(),
      service: newService,
      price: newPrice,
    };

    const updatedPrices = [...prices, newItem];
    setPrices(updatedPrices);
    saveToDatabase(updatedPrices);
    
    // Formu temizle
    setNewService("");
    setNewPrice("");
  };

  // Fiyat/Hizmet Güncelle (Input'tan çıkıldığında otomatik kaydeder)
  const handleUpdate = (id: string, field: 'service' | 'price', value: string) => {
    const updatedPrices = prices.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setPrices(updatedPrices);
  };

  const handleBlur = () => {
    // Inputtan odak kalktığında veritabanına kaydet
    saveToDatabase(prices);
  };

  // Hizmet Sil
  const removePrice = (idToRemove: string) => {
    if (!window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    const updatedPrices = prices.filter(item => item.id !== idToRemove);
    setPrices(updatedPrices);
    saveToDatabase(updatedPrices);
  };

  // Sıralama Değiştir
  const movePrice = (index: number, direction: 'up' | 'down') => {
    const updatedPrices = [...prices];
    if (direction === 'up' && index > 0) {
      [updatedPrices[index - 1], updatedPrices[index]] = [updatedPrices[index], updatedPrices[index - 1]];
    } else if (direction === 'down' && index < updatedPrices.length - 1) {
      [updatedPrices[index + 1], updatedPrices[index]] = [updatedPrices[index], updatedPrices[index + 1]];
    }
    setPrices(updatedPrices);
    saveToDatabase(updatedPrices);
  };

  if (loading) return <div className="text-zinc-400">Yükleniyor...</div>;

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-amber-500 mb-2">Fiyat Listesi Yönetimi</h2>
      <p className="text-sm text-zinc-400 mb-6">Mevcut fiyatların üzerine tıklayarak düzenleyebilir, yeni hizmet ekleyebilir veya sıralarını değiştirebilirsiniz.</p>
      
      {/* Yeni Hizmet Ekleme Formu */}
      <form onSubmit={handleAddPrice} className="flex gap-2 mb-6 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
        <input 
          type="text" 
          placeholder="Hizmet Adı (Örn: Saç Kesimi)" 
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 text-zinc-200 rounded p-2 text-sm focus:outline-none focus:border-amber-500"
        />
        <input 
          type="text" 
          placeholder="Fiyat (Örn: 900 TL)" 
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-1/3 bg-zinc-900 border border-zinc-700 text-zinc-200 rounded p-2 text-sm focus:outline-none focus:border-amber-500"
        />
        <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold px-4 py-2 rounded text-sm transition-colors">
          Ekle
        </button>
      </form>

      {/* Fiyat Listesi */}
      <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {prices.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 bg-zinc-950 p-2 rounded border border-zinc-800 hover:border-zinc-700 transition-colors">
            
            {/* Sıralama Butonları */}
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => movePrice(index, 'up')} 
                disabled={index === 0}
                className="text-zinc-500 hover:text-amber-500 disabled:opacity-30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
              </button>
              <button 
                onClick={() => movePrice(index, 'down')} 
                disabled={index === prices.length - 1}
                className="text-zinc-500 hover:text-amber-500 disabled:opacity-30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>

            {/* Hizmet ve Fiyat Inputları (Üzerine tıklanıp düzenlenebilir) */}
            <input 
              type="text" 
              value={item.service}
              onChange={(e) => handleUpdate(item.id, 'service', e.target.value)}
              onBlur={handleBlur}
              className="flex-1 bg-transparent border-none text-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-2 py-1"
            />
            <input 
              type="text" 
              value={item.price}
              onChange={(e) => handleUpdate(item.id, 'price', e.target.value)}
              onBlur={handleBlur}
              className="w-24 text-right font-medium text-amber-500 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-2 py-1 text-sm"
            />

            {/* Silme Butonu */}
            <button 
              onClick={() => removePrice(item.id)}
              className="p-2 text-zinc-600 hover:text-red-500 transition-colors ml-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        ))}
        {prices.length === 0 && (
          <p className="text-zinc-500 text-sm text-center py-8 border border-dashed border-zinc-800 rounded">Henüz fiyat eklenmemiş.</p>
        )}
      </div>
    </div>
  );
}