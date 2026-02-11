"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import { WordPressPage, GutenbergBlock } from "@/lib/wordpress";

interface HeaderProps {
    data?: WordPressPage | null;
}

export default function Header({ data }: HeaderProps) {
    const pathname = usePathname();

    // Helper to find specific blocks in the Gutenberg structure
    const findBlocksByType = (blocks: GutenbergBlock[], type: string): GutenbergBlock[] => {
        let results: GutenbergBlock[] = [];
        for (const block of blocks) {
            if (block.type === type) {
                results.push(block);
            }
            if (block.blocks) {
                results = [...results, ...findBlocksByType(block.blocks, type)];
            }
            if (block.columns) {
                for (const column of block.columns) {
                    results = [...results, ...findBlocksByType(column.blocks, type)];
                }
            }
            if (block.buttons) {
                results = [...results, ...findBlocksByType(block.buttons, type)];
            }
        }
        return results;
    };

    const structure = data?.gutenberg_structure || [];

    // Extract Logo
    const logoBlock = findBlocksByType(structure, "core/image")[0];
    const logoUrl = logoBlock?.url || "/logo.png";

    // Extract Schedule (usually in paragraphs)
    const paragraphs = findBlocksByType(structure, "core/paragraph");
    let scheduleItems = paragraphs
        .filter(p => {
            const content = p.content?.toLowerCase() || "";
            return content.includes("day") || content.includes("sábado") || content.includes("monday") || content.includes("lunes") || content.includes("friday") || content.includes("viernes");
        })
        .map(p => p.content || "");

    const isSpanish = data?.link?.includes("/espanol/") || !data?.link?.includes("/ingles/");

    // Debug
    if (typeof window === "undefined") {
        console.log(`[Header] Language: ${isSpanish ? "Spanish" : "English"}`);
        console.log(`[Header] Schedule items found: ${scheduleItems.length}`);
    }

    // Manual translation if API provides English for Spanish version
    if (isSpanish) {
        scheduleItems = scheduleItems.map(item => {
            let translated = item;
            // Case-insensitive replacements for common schedule terms
            translated = translated.replace(/monday to friday/gi, "Lunes a viernes");
            translated = translated.replace(/monday/gi, "Lunes");
            translated = translated.replace(/friday/gi, "Viernes");
            translated = translated.replace(/saturday/gi, "Sábado");
            translated = translated.replace(/sunday/gi, "Domingo");
            translated = translated.replace(/\bto\b/gi, "a");
            translated = translated.replace(/\b(am)\b/gi, "AM");
            translated = translated.replace(/\b(pm)\b/gi, "PM");
            return translated;
        });
    }

    const scheduleLine1 = scheduleItems[0] || (isSpanish ? "Lunes a viernes 08:00 AM - 05:00 PM" : "Monday to Friday 08:00 AM - 05:00 PM");
    const scheduleLine2 = scheduleItems[1] || (isSpanish ? "Sábado 07:00 AM - 02:00 PM" : "Saturday 07:00 AM - 02:00 PM");

    // Extract Contact
    const buttons = findBlocksByType(structure, "core/button");
    const phoneBtn = buttons.find(b => b.url?.startsWith("tel:"));
    const emailBtn = buttons.find(b => b.url?.startsWith("mailto:"));

    const phoneNumber = phoneBtn?.text || "+502 2337-2540";
    const phoneUrl = phoneBtn?.url || "tel:+50223372540";
    const emailAddress = emailBtn?.text || "info@centrodental.com";
    const emailUrl = emailBtn?.url || "mailto:info@centrodental.com";

    // Extract Nav Items
    const navButtons = buttons.filter(b => !b.url?.startsWith("tel:") && !b.url?.startsWith("mailto:"));

    const navItems = navButtons.length > 0
        ? navButtons.map(b => {
            let href = b.url || "";
            const text = b.text?.toLowerCase() || "";

            if (!href || href === "" || href === "#") {
                // Better mapping with normalization
                const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if (normalizedText.includes("home") || normalizedText.includes("inicio")) href = "/";
                else if (normalizedText.includes("quienes")) href = "/quienes-somos";
                else if (normalizedText.includes("testimoniales")) href = "/testimoniales";
                else if (normalizedText.includes("servicio") && !normalizedText.includes("agendar")) href = "/servicios";
                else if (normalizedText.includes("ubicacion") || normalizedText.includes("locacion")) href = "/ubicacion";
                else if (normalizedText.includes("blog")) href = "/blog";
                else if (normalizedText.includes("contacto") || normalizedText.includes("agendar")) href = "/contacto";
                else if (normalizedText.includes("servicio")) href = "/servicios"; // Fallback for other services
            }

            // Ensure unique refs for common items if they still fall back
            if (!href || href === "" || href === "#") {
                href = "/#"; // Avoid matching home path "/"
            }

            return { name: b.text || "", href };
        })
        : [
            { name: "Home", href: "/" },
            { name: "Quiénes Somos", href: "/quienes-somos" },
            { name: "Servicios", href: "/servicios" },
            { name: "Testimoniales", href: "/testimoniales" },
            { name: "Ubicación", href: "/ubicacion" },
            { name: "Blog", href: "/blog" },
            { name: "Contacto", href: "/contacto" },
        ];

    if (typeof window === "undefined") {
        console.log(`[Header] Nav items mapped: ${navItems.length}`);
        navItems.forEach(item => console.log(`[Header] - ${item.name}: ${item.href}`));
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header className="bg-white w-full font-sans border-b border-gray-100 relative z-50">
            {/* Top Row: Logo and Info Section */}
            <div className="px-6 md:px-20 py-4 md:py-8 flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center">
                    <div className="relative w-[200px] h-[55px] md:w-[280px] md:h-[75px]">
                        <Image
                            src={logoUrl}
                            alt="Centro Dental Lizama Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Info & Settings Section (Desktop) */}
                <div className="hidden lg:flex items-center gap-12">
                    {/* Schedule */}
                    <div className="flex items-center gap-4">
                        <div className="text-primary/70">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="text-[13px] leading-tight">
                            <p className="font-bold text-primary mb-0.5">{scheduleLine1}</p>
                            <p className="text-gray-400">{scheduleLine2}</p>
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
                            <Link href={phoneUrl} className="font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer block">{phoneNumber}</Link>
                            <Link href={emailUrl} className="hover:text-primary transition-colors cursor-pointer block">{emailAddress}</Link>
                        </div>
                    </div>

                    <div className="h-12 w-[1px] bg-gray-100/80"></div>

                    {/* Language Selector */}
                    <Suspense fallback={<div className="text-[13px] text-gray-400">Cargando...</div>}>
                        <LanguageSelector />
                    </Suspense>
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-primary"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </div>

            {/* Navigation Row (Desktop) */}
            <div className="hidden lg:block border-t border-gray-100 bg-white">
                <div className="px-20">
                    <nav className="flex items-center gap-12">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={`${item.name}-${index}`}
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

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed inset-x-0 top-[88px] bottom-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                } overflow-y-auto`}>
                <div className="px-6 py-8 flex flex-col gap-8">
                    {/* Nav Items */}
                    <nav className="flex flex-col gap-6">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={`${item.name}-${index}`}
                                    href={item.href}
                                    className={`text-xl font-bold transition-all ${isActive ? "text-primary" : "text-primary/70"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="h-[1px] w-full bg-gray-100"></div>

                    {/* Info Section */}
                    <div className="flex flex-col gap-6">
                        {/* Schedule */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Horario</p>
                            <p className="font-bold text-primary">{scheduleLine1}</p>
                            <p className="text-gray-500 text-sm">{scheduleLine2}</p>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Contacto</p>
                            <Link href={phoneUrl} className="font-bold text-gray-700 text-lg">{phoneNumber}</Link>
                            <Link href={emailUrl} className="text-gray-500 font-medium">{emailAddress}</Link>
                        </div>

                        {/* Language Selector */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Idioma</p>
                            <Suspense fallback={<div className="text-[13px] text-gray-400">Cargando...</div>}>
                                <LanguageSelector />
                            </Suspense>
                        </div>
                    </div>
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
