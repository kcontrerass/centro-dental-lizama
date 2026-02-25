"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { WordPressPage, GutenbergBlock } from "@/lib/wordpress";

interface FooterProps {
    data?: WordPressPage | null;
}

export default function Footer({ data }: FooterProps) {
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
    const isSpanish = data?.link?.includes("/espanol/") || !data?.link?.includes("/ingles/");

    // Extract Logo (usually the first image)
    const images = findBlocksByType(structure, "core/image");
    const logoUrl = images[0]?.url || "";
    const agencyLogoUrl = images[images.length - 1]?.url; // Usually the last image is the agency logo

    // Extract Links (core/buttons in the first column group)
    const buttons = findBlocksByType(structure, "core/button");

    // Split buttons into Nav and Contact
    const phoneBtn = buttons.find(b => b.url?.startsWith("tel:"));
    const navButtons = buttons.filter(b => !b.url?.startsWith("tel:") && !b.url?.startsWith("mailto:"));

    const navItems = navButtons.length > 0
        ? navButtons.map(b => {
            let href = b.url || "";
            const text = b.text?.toLowerCase() || "";

            if (!href || href === "" || href === "#") {
                const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (normalizedText.includes("home") || normalizedText.includes("inicio")) href = "/";
                else if (normalizedText.includes("quienes")) href = "/quienes-somos";
                else if (normalizedText.includes("testimoniales")) href = "/testimoniales";
                else if (normalizedText.includes("servicio")) href = "/servicios";
                else if (normalizedText.includes("ubicacion") || normalizedText.includes("locacion")) href = "/ubicacion";
                else if (normalizedText.includes("blog")) href = "/blog";
                else if (normalizedText.includes("contacto")) href = "/contacto";
                else href = "/#";
            }
            return { name: b.text || "", href };
        })
        : [
            { name: "Inicio", href: "/" },
            { name: "Quiénes somos", href: "/quienes-somos" },
            { name: "Testimoniales", href: "/testimoniales" },
            { name: "Servicios", href: "/servicios" },
            { name: "Ubicación", href: "/ubicacion" },
            { name: "Blog", href: "/blog" },
            { name: "Contacto", href: "/contacto" },
        ];

    // Extract Paragraphs (Teaser and Copyright)
    const paragraphs = findBlocksByType(structure, "core/paragraph");
    const teaserParagraph = paragraphs.find(p => p.content?.includes("?") || p.content?.includes("¿"));
    const copyrightParagraph = paragraphs.find(p => p.content?.toLowerCase().includes("all right") || p.content?.toLowerCase().includes("todos los derechos") || p.content?.toLowerCase().includes("rights reserved"));

    const teaserText = teaserParagraph?.content || (isSpanish ? "¿Vienes del extranjero?" : "Are you from abroad?");
    const copyrightText = copyrightParagraph?.content || "POWERED BY";
    const phoneNumber = phoneBtn?.text || "+502 2337-2540";
    const phoneUrl = phoneBtn?.url || "tel:+50223372540";
    console.log(copyrightText)
    return (
        <footer className="w-full text-white">
            {/* Top Section */}
            <div className="bg-black pt-16 pb-16 px-8 md:px-20">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left">
                    {/* Logo Column */}
                    <div className="flex justify-center md:justify-start min-w-[220px]">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-[220px] h-[60px]">
                                <Image
                                    src={logoUrl}
                                    alt="Centro Dental Lizama Logo"
                                    fill
                                    className="object-contain object-center md:object-left filter brightness-0 invert"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Links Column */}
                    <div>
                        <ul className="space-y-1 text-[13px] text-gray-200">
                            {navItems.map((item, index) => (
                                <li key={`${item.name}-${index}`}>
                                    <Link href={item.href} className="hover:text-primary transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Question Column */}
                    <div className="max-w-xs">
                        <h4 className="font-bold text-[15px] leading-tight" dangerouslySetInnerHTML={{ __html: teaserText }}></h4>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <Link href={phoneUrl} className="text-white font-bold text-[16px] hover:text-primary transition-colors tracking-wide">
                            {phoneNumber}
                        </Link>
                    </div>

                    {/* Language Selector */}
                    <div className="flex flex-col items-center md:items-end">
                        <Suspense fallback={<div className="text-xs text-gray-500">...</div>}>
                            <LanguageSelector />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Full Width with different background */}
            <div className="bg-[#1a1a1a] py-8 px-8 md:px-20">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] text-white uppercase tracking-[0.2em] font-medium">
                    <p dangerouslySetInnerHTML={{ __html: copyrightText }} className="text-center"></p>
                    <div className="flex items-center gap-2">
                        {agencyLogoUrl && (
                            <div className="relative w-[80px] h-[20px]">
                                <Link href="https://aumenta.do" target="_blank">
                                    <Image
                                        src={agencyLogoUrl}
                                        alt="Agency Logo"
                                        fill
                                        className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </Link>
                            </div>
                        )}
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
