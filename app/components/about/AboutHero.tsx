"use client";

import Image from "next/image";
import { WordPressPage } from "@/lib/wordpress";
import { useSearchParams } from "next/navigation";

interface AboutHeroProps {
    data: WordPressPage | null;
}

export default function AboutHero({ data }: AboutHeroProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "es";

    // Extract content from data
    let bannerUrl = "/banner-quienes-somos.png";
    let title = lang === "en" ? "Who we are" : "Quiénes somos";
    let description = lang === "en"
        ? "With over 30 years of experience in Guatemala, counting with specialists in all branches of dentistry"
        : "Con más de 30 años de experiencia en Guatemala, contando con especialistas en todas las ramas de la odontología";

    if (data && data.gutenberg_structure) {
        // Find the banner image
        const imageBlock = data.gutenberg_structure.find(b => b.type === "core/image" || (b.type === "core/group" && b.blocks?.some(sb => sb.type === "core/image")));
        if (imageBlock) {
            if (imageBlock.type === "core/image" && imageBlock.url) {
                bannerUrl = imageBlock.url;
            } else if (imageBlock.blocks) {
                const innerImage = imageBlock.blocks.find(sb => sb.type === "core/image");
                if (innerImage && innerImage.url) {
                    bannerUrl = innerImage.url;
                }
            }
        }

        // Find paragraphs for title and description
        const paragraphBlocks = data.gutenberg_structure.filter(b => b.type === "core/paragraph");
        if (paragraphBlocks.length > 0) {
            title = paragraphBlocks[0].content || title;
            if (paragraphBlocks.length > 1) {
                description = paragraphBlocks[1].content || description;
            }
        }
    }

    return (
        <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bannerUrl}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center">
                <div className="w-full md:w-1/2 px-8 md:pl-20 md:ml-auto">
                    <div className="max-w-md">
                        <h1 className="text-[52px] font-extrabold text-[#70bfa8] leading-tight mb-4 drop-shadow-sm">
                            {title}
                        </h1>
                        <p className="text-[20px] text-[#70bfa8] font-medium leading-[1.3] opacity-90 drop-shadow-sm">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* WhatsApp Floating Button */}

        </section>
    );
}
