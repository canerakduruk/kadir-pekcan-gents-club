"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const docSnap = await getDoc(doc(db, "siteData", "schedule"));
      if (docSnap.exists()) setSchedule(docSnap.data().days);
      else {
        // Varsayılan değerler
        const initial = DAYS.reduce((acc, day) => ({ ...acc, [day]: { open: "09:00", close: "20:00", isClosed: false } }), {});
        setSchedule(initial);
      }
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  const saveSchedule = async () => {
    await setDoc(doc(db, "siteData", "schedule"), { days: schedule });
    alert("Çalışma saatleri güncellendi!");
  };

  if (loading) return null;

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
      <h2 className="text-xl font-semibold text-amber-500 mb-4">Çalışma Saatleri</h2>
      <div className="space-y-3">
        {DAYS.map((day) => (
          <div key={day} className="flex items-center justify-between bg-zinc-950 p-3 rounded border border-zinc-800">
            <span className="text-sm font-medium text-zinc-300 w-24">{day}</span>
            <div className="flex items-center gap-2">
              {!schedule[day]?.isClosed ? (
                <>
                  <input type="time" value={schedule[day]?.open} onChange={(e) => setSchedule({...schedule, [day]: {...schedule[day], open: e.target.value}})} className="bg-zinc-900 border border-zinc-800 text-xs p-1 rounded text-zinc-300"/>
                  <span className="text-zinc-600">-</span>
                  <input type="time" value={schedule[day]?.close} onChange={(e) => setSchedule({...schedule, [day]: {...schedule[day], close: e.target.value}})} className="bg-zinc-900 border border-zinc-800 text-xs p-1 rounded text-zinc-300"/>
                </>
              ) : (
                <span className="text-red-900 text-xs font-bold uppercase tracking-widest px-4">KAPALI</span>
              )}
              <button 
                onClick={() => setSchedule({...schedule, [day]: {...schedule[day], isClosed: !schedule[day]?.isClosed}})}
                className={`ml-4 text-[10px] px-2 py-1 rounded border ${schedule[day]?.isClosed ? 'border-green-900 text-green-500' : 'border-red-900 text-red-500'}`}
              >
                {schedule[day]?.isClosed ? "AÇ" : "KAPAT"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={saveSchedule} className="w-full mt-6 bg-zinc-100 hover:bg-white text-black font-bold py-2 rounded transition-colors text-sm">
        AYARLARI KAYDET
      </button>
    </div>
  );
}