"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image"; // Next.js Image bileşeni eklendi

interface ImageData {
    id: string;
    url: string;
}

export default function ImageManager() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Bilgileri .env dosyasından çekiyoruz
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const docRef = doc(db, "siteData", "gallery");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setImages(docSnap.data().images || []);
                }
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const saveToDatabase = async (newImages: ImageData[]) => {
        try {
            await setDoc(doc(db, "siteData", "gallery"), { images: newImages });
        } catch (error) {
            alert("Değişiklikler kaydedilirken hata oluştu!");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET || "");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            const newImage: ImageData = {
                id: Date.now().toString(),
                url: data.secure_url,
            };

            const updatedImages = [...images, newImage];
            setImages(updatedImages);
            await saveToDatabase(updatedImages);

        } catch (error) {
            alert("Yükleme sırasında bir hata oluştu.");
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const removeImage = (idToRemove: string) => {
        if (!window.confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) return;
        const updatedImages = images.filter(img => img.id !== idToRemove);
        setImages(updatedImages);
        saveToDatabase(updatedImages);
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        const updatedImages = [...images];
        if (direction === 'up' && index > 0) {
            [updatedImages[index - 1], updatedImages[index]] = [updatedImages[index], updatedImages[index - 1]];
        } else if (direction === 'down' && index < updatedImages.length - 1) {
            [updatedImages[index + 1], updatedImages[index]] = [updatedImages[index], updatedImages[index + 1]];
        }
        setImages(updatedImages);
        saveToDatabase(updatedImages);
    };

    if (loading) return <div className="text-zinc-400">Yükleniyor...</div>;

    return (
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">Galeri Yönetimi</h2>
            
            <div className="mb-8 p-4 border border-dashed border-zinc-700 rounded-lg text-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-zinc-950 hover:file:bg-amber-500 cursor-pointer"
                />
                {uploading && <p className="text-amber-500 mt-3 font-medium animate-pulse">Fotoğraf Yükleniyor...</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, index) => (
                    <div key={img.id} className="relative bg-zinc-950 border border-zinc-800 rounded-lg p-2 flex flex-col">
                        {/* <img> yerine <Image> kullanıldı */}
                        <div className="relative w-full h-40 mb-3 overflow-hidden rounded">
                            <Image 
                                src={img.url} 
                                alt="Galeri Görseli" 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                            <div className="flex gap-2">
                                <button onClick={() => moveImage(index, 'up')} disabled={index === 0} className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-30">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <button onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1} className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-30">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                            <button onClick={() => removeImage(img.id)} className="p-2 bg-red-900/50 text-red-500 rounded hover:bg-red-600 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}