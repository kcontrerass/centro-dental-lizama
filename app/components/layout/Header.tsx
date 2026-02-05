"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Quiénes Somos", href: "/quienes-somos" },
        { name: "Servicios", href: "/servicios" },
        { name: "Testimoniales", href: "/testimoniales" },
        { name: "Ubicación", href: "/ubicacion" },
        { name: "Blog", href: "/blog" },
        { name: "Contacto", href: "/contacto" },
    ];

    return (
        <header className="bg-white w-full font-sans border-b border-gray-100">
            {/* Top Row: Logo and Info Section with increased padding */}
            <div className=" px-20 py-8 md:py-5 flex justify-between items-center">
                {/* Logo Section - Now using an Image */}
                <Link href="/" className="flex items-center">
                    <div className="relative w-[280px] h-[75px]">
                        {/* Generic placeholder for dental clinic logo - using a high quality dental logo style */}
                        <Image
                            src="/logo.png"
                            alt="Centro Dental Lizama Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                        {/* Simulation of the specific brand text if image is just an icon */}

                    </div>
                </Link>

                {/* Info & Settings Section */}
                <div className="hidden lg:flex items-center gap-12">
                    {/* Schedule */}
                    <div className="flex items-center gap-4">
                        <div className="text-primary/70">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="text-[13px] leading-tight">
                            <p className="font-bold text-primary mb-0.5">Lunes a viernes 08:00 am - 05:00 pm</p>
                            <p className="text-gray-400">Sábado 07:00 - 02:00 pm</p>
                        </div>
                    </div>

                    <div className="h-12 w-[1px] bg-gray-100/80"></div>

                    {/* Contact */}
                    <div className="flex items-center gap-4">
                        <div className="text-primary/60">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div className="text-[13px] leading-tight text-gray-400">
                            <p className="font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer">+502 2337-2540</p>
                            <p className="hover:text-primary transition-colors cursor-pointer">info@centrodental.com</p>
                        </div>
                    </div>

                    <div className="h-12 w-[1px] bg-gray-100/80"></div>

                    {/* Language Selector */}
                    <Suspense fallback={<div className="text-[13px] text-gray-400">Cargando...</div>}>
                        <LanguageSelector />
                    </Suspense>
                </div>
            </div>

            {/* Navigation Row with increased padding */}
            <div className="border-t border-gray-100 bg-white">
                <div className="px-20">
                    <nav className="flex items-center gap-12 overflow-x-auto no-scrollbar">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-[15px] font-semibold py-6 transition-all relative whitespace-nowrap hover:text-primary ${isActive ? "text-primary active-nav" : "text-primary/70"
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-[5px] bg-primary rounded-t-sm"></div>
                                    )}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
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
            // Check cookie for persistence
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

        // Use window.location.href for a full refresh to ensure the server 
        // receives the updated cookie in the headers.
        window.location.href = `?${params.toString()}`;
    };

    return (
        <div className="flex items-center gap-6 text-[14px]">
            <span
                onClick={() => setLanguage("es")}
                className={`cursor-pointer transition-all ${lang === "es"
                    ? "text-primary font-bold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-gray-400 font-medium hover:text-primary"
                    }`}
            >
                Español
            </span>
            <span className="text-gray-200 font-light">|</span>
            <span
                onClick={() => setLanguage("en")}
                className={`cursor-pointer transition-all ${lang === "en"
                    ? "text-primary font-bold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-gray-400 font-medium hover:text-primary"
                    }`}
            >
                English
            </span>
        </div>
    );
}
