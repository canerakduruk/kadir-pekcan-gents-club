"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OpeningStatus() {
  const [schedule, setSchedule] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const DAYS_ORDER = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const docSnap = await getDoc(doc(db, "siteData", "schedule"));
        if (docSnap.exists()) {
          const data = docSnap.data().days;
          setSchedule(data);
          checkIfOpen(data);
        }
      } catch (error) {
        console.error("Çalışma saatleri yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkIfOpen = (daysData: any) => {
      const now = new Date();
      // JS'de 0 Pazar, 1 Pazartesi... Bizim sıralamaya uyduralım:
      const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
      const todayName = DAYS_ORDER[dayIndex];
      const todayData = daysData[todayName];

      if (!todayData || todayData.isClosed) {
        setIsOpen(false);
        return;
      }

      const [openH, openM] = todayData.open.split(":").map(Number);
      const [closeH, closeM] = todayData.close.split(":").map(Number);
      
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const openTime = openH * 60 + openM;
      const closeTime = closeH * 60 + closeM;

      setIsOpen(currentTime >= openTime && currentTime < closeTime);
    };

    fetchSchedule();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center text-[#d4af37] animate-pulse">Saatler Yükleniyor...</div>;

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-xl h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-3 h-3 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
        <span className={`text-lg font-medium uppercase tracking-widest ${isOpen ? "text-green-500" : "text-red-500"}`}>
          {isOpen ? "Şu An Açığız" : "Şu An Kapalıyız"}
        </span>
      </div>

      <div className="space-y-4">
        {DAYS_ORDER.map((day) => {
          const dayData = schedule?.[day];
          return (
            <div key={day} className="flex justify-between items-center text-sm border-b border-[#222] pb-3 last:border-0">
              <span className="text-[#a3a3a3] flex items-center gap-2">
                <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {day}
              </span>
              <span className={`font-medium ${dayData?.isClosed ? "text-red-900" : "text-white"}`}>
                {dayData?.isClosed ? "KAPALI" : `${dayData?.open} - ${dayData?.close}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}