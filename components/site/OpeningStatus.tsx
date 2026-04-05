"use client";

import { useState, useEffect } from "react";

export default function OpeningStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const hours = [
    { day: "Pazartesi", time: "09:00 - 20:30" },
    { day: "Salı", time: "09:00 - 20:30" },
    { day: "Çarşamba", time: "09:00 - 20:30" },
    { day: "Perşembe", time: "09:00 - 20:30" },
    { day: "Cuma", time: "09:00 - 20:30" },
    { day: "Cumartesi", time: "09:00 - 20:30" },
    { day: "Pazar", time: "09:00 - 20:30" },
  ];

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60;
      setIsOpen(currentTime >= 9 && currentTime < 20.5);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-3 h-3 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
        <span className={`text-lg font-medium uppercase tracking-widest ${isOpen ? "text-green-500" : "text-red-500"}`}>
          {isOpen ? "Şu An Açığız" : "Şu An Kapalıyız"}
        </span>
      </div>

      <div className="space-y-4">
        {hours.map((h, i) => (
          <div key={i} className="flex justify-between items-center text-sm border-b border-[#222] pb-2 last:border-0">
            <span className="text-[#a3a3a3] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {h.day}
            </span>
            <span className="text-white font-medium">{h.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}