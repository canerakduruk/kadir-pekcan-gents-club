"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [loading, setLoading] = useState(true);

  // Düzenleme durumu için yeni stateler efendim
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const docSnap = await getDoc(doc(db, "siteData", "faq"));
        if (docSnap.exists()) setFaqs(docSnap.data().questions || []);
      } catch (error) {
        console.error("SSS çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const saveToFirebase = async (updatedFaqs: FAQItem[]) => {
    try {
      await setDoc(doc(db, "siteData", "faq"), { questions: updatedFaqs });
    } catch (error) {
      alert("Veritabanına kaydedilirken bir hata oluştu!");
    }
  };

  const addFAQ = async () => {
    if (!newQ || !newA) return;
    const updated = [...faqs, { id: Date.now().toString(), question: newQ, answer: newA }];
    setFaqs(updated);
    await saveToFirebase(updated);
    setNewQ(""); setNewA("");
  };

  const removeFAQ = async (id: string) => {
    if (!window.confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    await saveToFirebase(updated);
  };

  // Düzenleme modunu başlatan fonksiyon
  const startEditing = (faq: FAQItem) => {
    setEditingId(faq.id);
    setEditQ(faq.question);
    setEditA(faq.answer);
  };

  // Düzenlemeyi kaydeden fonksiyon
  const saveEdit = async (id: string) => {
    const updated = faqs.map(f => 
      f.id === id ? { ...f, question: editQ, answer: editA } : f
    );
    setFaqs(updated);
    await saveToFirebase(updated);
    setEditingId(null);
  };

  if (loading) return <div className="text-zinc-500 animate-pulse">Soru-Cevap yükleniyor...</div>;

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-amber-500 mb-4 uppercase tracking-tighter">Soru-Cevap Yönetimi</h2>
      
      {/* Yeni Soru Ekleme Formu */}
      <div className="space-y-3 mb-6 bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50">
        <input 
          value={newQ} onChange={(e) => setNewQ(e.target.value)}
          placeholder="Yeni Soru..." 
          className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-zinc-200 focus:border-amber-500 outline-none transition-all"
        />
        <textarea 
          value={newA} onChange={(e) => setNewA(e.target.value)}
          placeholder="Cevap..." 
          className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-zinc-200 h-20 focus:border-amber-500 outline-none transition-all resize-none"
        />
        <button onClick={addFAQ} className="w-full bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold py-3 rounded transition-all text-xs uppercase tracking-widest">
          LİSTEYE EKLE
        </button>
      </div>

      {/* Soru Listesi */}
      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
        {faqs.map((f) => (
          <div key={f.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg relative group transition-all hover:border-zinc-700">
            {editingId === f.id ? (
              /* Düzenleme Modu Görünümü */
              <div className="space-y-3">
                <input 
                  value={editQ} onChange={(e) => setEditQ(e.target.value)}
                  className="w-full bg-zinc-900 border border-amber-500/50 p-2 rounded text-sm text-white outline-none"
                />
                <textarea 
                  value={editA} onChange={(e) => setEditA(e.target.value)}
                  className="w-full bg-zinc-900 border border-amber-500/50 p-2 rounded text-sm text-zinc-300 h-20 outline-none resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(f.id)} className="flex-grow bg-green-700 hover:bg-green-600 text-white text-[10px] font-bold py-2 rounded uppercase">Kaydet</button>
                  <button onClick={() => setEditingId(null)} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-bold py-2 rounded uppercase">İptal</button>
                </div>
              </div>
            ) : (
              /* Normal Görünüm */
              <>
                <h4 className="text-amber-500 text-sm font-medium pr-16">{f.question}</h4>
                <p className="text-zinc-400 text-xs mt-2 leading-relaxed italic">"{f.answer}"</p>
                
                {/* Aksiyon Butonları */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => startEditing(f)} 
                    className="p-2 bg-zinc-800 text-blue-400 rounded hover:bg-blue-900/30 transition-colors"
                    title="Düzenle"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button 
                    onClick={() => removeFAQ(f.id)} 
                    className="p-2 bg-zinc-800 text-red-500 rounded hover:bg-red-900/30 transition-colors"
                    title="Sil"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="text-center py-10 border border-dashed border-zinc-800 rounded-lg text-zinc-600 text-sm italic">
            Henüz soru eklenmemiş efendim.
          </div>
        )}
      </div>
    </div>
  );
}