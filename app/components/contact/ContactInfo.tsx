"use client";

import { Instagram, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { WordPressPage } from "@/lib/wordpress";

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.445L0 24l6.835-1.793a11.83 11.83 0 005.212 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

interface ContactInfoProps {
    data: WordPressPage | null;
}

export default function ContactInfo({ data }: ContactInfoProps) {
    const contentBlock = data?.sections?.find((s: any) => s.type === "content");
    const blocks = contentBlock?.blocks || [];

    // Map blocks based on the structure provided in the prompt
    // Block 0: Title
    // Block 1: Schedule 1
    // Block 2: Schedule 2
    // Block 3: Phones (with |)
    // Block 4: WhatsApp | Location
    // Block 5: Social Links

    const title = blocks[0]?.content || "Contáctanos";
    const schedule1 = blocks[1]?.content;
    const schedule2 = blocks[2]?.content;
    const phones = blocks[3]?.content;
    const whatsappAndLocation = blocks[4]?.content || "";

    // Split WhatsApp and Location if they are combined with |
    const [whatsappText, locationText] = whatsappAndLocation.split("|").map((s: string) => s.trim());

    const socialLinksBlock = blocks.find((b: any) => b.type === "core/social-links");
    const socialLinks = socialLinksBlock?.blocks || [];

    const phoneLinks = phones?.split("|").map((p: string) => p.trim()) || [];
    const formatWhatsAppLink = (text: string) => {
        const cleaned = text.replace(/\D/g, "");
        console.log(cleaned);
        return `https://wa.me/${cleaned}`;
    };

    return (
        <section className="bg-[#4fb0a2] py-16 px-8 text-white">
            <h1 className="text-[40px] md:text-[72px] font-bold text-center mb-10">{title}</h1>
            <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">

                {/* Schedules */}
                <div className="flex flex-col gap-2 mb-8 text-[16px] md:text-[18px] font-medium opacity-90">
                    {schedule1 && <p>{schedule1}</p>}
                    {schedule2 && <p>{schedule2}</p>}
                </div>

                {/* Phones */}
                <div className="mb-10 text-[18px] md:text-[16px] font-bold">
                    {phoneLinks.length > 0 && (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                            {phoneLinks.map((p: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`tel:${p.replace(/\s+/g, "")}`}
                                            className="hover:underline transition-all"
                                        >
                                            {p}
                                        </a>
                                    </div>
                                    {idx < phoneLinks.length - 1 && (
                                        <span className="hidden md:block opacity-50">|</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* WhatsApp and Location */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12 text-[18px] font-bold">
                    {whatsappText && (
                        <a
                            href={formatWhatsAppLink(whatsappText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline transition-all"
                        >
                            <WhatsAppIcon className="w-5 h-5 text-white" />
                            <span>{whatsappText}</span>
                        </a>
                    )}
                    {whatsappText && locationText && <span className="hidden md:block opacity-50">|</span>}
                    {locationText && (
                        <div className="flex items-center gap-2">
                            <span>{locationText}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    {socialLinks.map((social: any, idx: number) => {
                        const isInstagram = social.attributes?.service === "instagram";
                        if (!isInstagram) {
                            return (
                                <a
                                    key={idx}
                                    href={social.attributes?.url || "#"}
                                    className="text-white hover:opacity-80 transition-opacity"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/facebookwhite.png"
                                        alt="Facebook"
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain"
                                    />
                                </a>
                            );
                        }

                        const Icon = Instagram;
                        return (
                            <a
                                key={idx}
                                href={social.attributes?.url || "#"}
                                className="text-white hover:opacity-80 transition-opacity"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon className="w-8 h-8" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
