"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Giriş başarısız! E-posta veya şifre hatalı.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center uppercase tracking-wider">Yönetici Girişi</h2>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 rounded p-3 mb-4 focus:outline-none focus:border-amber-500 transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 rounded p-3 mb-6 focus:outline-none focus:border-amber-500 transition-colors"
          required
        />
        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold py-3 rounded transition-colors">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}