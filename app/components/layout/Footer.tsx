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
    const logoUrl = images[0]?.url || "/logo-white.png";
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
    const copyrightText = copyrightParagraph?.content || "2024 Fair trade Workforce. All right reserved.";
    const phoneNumber = phoneBtn?.text || "+502 2337-2540";
    const phoneUrl = phoneBtn?.url || "tel:+50223372540";

    return (
        <footer className="bg-black text-white pt-16 pb-6">
            <div className="px-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16 items-start">
                    {/* Logo Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-[220px] h-[60px]">
                                <Image
                                    src={logoUrl}
                                    alt="Centro Dental Lizama Logo"
                                    fill
                                    className="object-contain object-left filter brightness-0 invert"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Links Column */}
                    <div className="md:col-span-1">
                        <ul className="space-y-2 text-sm text-gray-400">
                            {navItems.map((item, index) => (
                                <li key={`${item.name}-${index}`}>
                                    <Link href={item.href} className="hover:text-white transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Question Column */}
                    <div className="md:col-span-1">
                        <h4 className="font-bold text-sm mb-4" dangerouslySetInnerHTML={{ __html: teaserText }}></h4>
                    </div>

                    {/* Contact/Lang Column */}
                    <div className="text-center">
                        <Link href={phoneUrl} className="text-white font-bold text-sm hover:text-primary transition-colors">
                            {phoneNumber}
                        </Link>
                    </div>
                    <div className="md:col-span-1 flex flex-col items-end gap-4">

                        <Suspense fallback={<div className="text-xs text-gray-500">...</div>}>
                            <LanguageSelector />
                        </Suspense>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
                    <p dangerouslySetInnerHTML={{ __html: copyrightText }}></p>
                    <div className="flex items-center gap-2">
                        {agencyLogoUrl && (
                            <div className="relative w-[80px] h-[20px]">
                                <Link href="https://aumenta.do" target="_blank">
                                    <Image
                                        src={agencyLogoUrl}
                                        alt="Agency Logo"
                                        fill
                                        className="object-contain"
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
