"use client";

import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";

interface ServicesHeroProps {
    data: WordPressPage | null;
}

export default function ServicesHero({ data }: ServicesHeroProps) {
    let title = "Servicios";
    let description = "Tratamientos especializados del más alto nivel.";
    let backgroundImage = "/servicios.png";

    if (data && data.gutenberg_structure) {
        const coverBlock = data.gutenberg_structure.find(block => block.type === "core/cover");
        if (coverBlock) {
            backgroundImage = coverBlock.attributes?.url || coverBlock.url || backgroundImage;
            if (coverBlock.blocks && coverBlock.blocks.length > 0) {
                title = coverBlock.blocks[0].content || title;
                if (coverBlock.blocks.length > 1) {
                    description = coverBlock.blocks.slice(1).map(b => b.content).join(" ") || description;
                }
            }
        }
    }

    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            {/* Background Image - Covers full space */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover object-center md:object-[center_25%]"
                    priority
                />
                {/* Subtle overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-white/10 md:bg-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center">
                <div className="w-full md:w-1/2 px-8 md:pl-20">
                    <div className="max-w-xl">
                        <h1 className="text-[56px] md:text-[72px] font-bold text-[#70bfa8] leading-tight mb-2 drop-shadow-sm">
                            {title}
                        </h1>
                        <p className="text-[18px] md:text-[22px] text-[#70bfa8] md:w-[400px] font-medium leading-relaxed drop-shadow-sm">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* WhatsApp Floating Button */}

        </section>
    );
}
