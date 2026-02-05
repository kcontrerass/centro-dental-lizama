"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-6">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 items-start">
                    {/* Logo Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="text-white font-bold text-2xl tracking-tighter flex items-baseline">
                                <span className="text-3xl">G</span>
                                <div className="flex flex-col -ml-1 leading-[0.8]">
                                    <span className="text-[10px] tracking-[0.2em] font-light">CENTRO DENTAL</span>
                                    <span className="text-sm tracking-[0.3em] font-semibold">LIZAMA</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Links Column */}
                    <div className="md:col-span-1">
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                            <li><Link href="/quienes-somos" className="hover:text-white transition-colors">Quiénes somos</Link></li>
                            <li><Link href="/testimoniales" className="hover:text-white transition-colors">Testimoniales</Link></li>
                            <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
                            <li><Link href="/ubicacion" className="hover:text-white transition-colors">Ubicación</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Question Column */}
                    <div className="md:col-span-1">
                        <h4 className="font-bold text-sm mb-4">¿Vienes del extranjero?</h4>
                    </div>

                    {/* Contact/Lang Column */}
                    <div className="md:col-span-1 flex flex-col items-end gap-4">
                        <a href="tel:+50223372540" className="text-white font-bold text-sm hover:text-primary transition-colors">+502 2337-2540</a>
                        <Suspense fallback={<div className="text-xs text-gray-500">...</div>}>
                            <LanguageSelector />
                        </Suspense>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
                    <p>2024 Fair trade Workforce. All right reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>By</span>
                        {/* Minimalist logo placeholder for the agency */}
                        <div className="flex items-center gap-1 font-bold text-white">

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function LanguageSelector() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [lang, setLangState] = useState<string>("es");

    useEffect(() => {
        const queryLang = searchParams.get("lang");
        if (queryLang) {
            setLangState(queryLang);
        } else {
            // Check cookie
            const cookieLang = document.cookie
                .split("; ")
                .find((row) => row.startsWith("lang="))
                ?.split("=")[1];
            if (cookieLang) {
                setLangState(cookieLang);
            }
        }
    }, [searchParams]);

    const setLanguage = (newLang: string) => {
        // Set cookie for persistence
        document.cookie = `lang=${newLang}; path=/; max-age=${60 * 60 * 24 * 30}`;

        const params = new URLSearchParams(searchParams.toString());
        if (newLang === "es") {
            params.delete("lang");
        } else {
            params.set("lang", newLang);
        }

        // Use window.location.href for a full refresh
        window.location.href = `?${params.toString()}`;
    };

    return (
        <div className="flex gap-4 text-xs">
            <span
                onClick={() => setLanguage("es")}
                className={`cursor-pointer transition-colors ${lang === "es" ? "text-white font-bold" : "text-gray-400 hover:text-white"
                    }`}
            >
                Español
            </span>
            <span className="text-gray-600">|</span>
            <span
                onClick={() => setLanguage("en")}
                className={`cursor-pointer transition-colors ${lang === "en" ? "text-white font-bold" : "text-gray-400 hover:text-white"
                    }`}
            >
                English
            </span>
        </div>
    );
}
