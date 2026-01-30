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
            <div className="absolute bottom-8 right-8 z-20">
                <a
                    href="https://wa.me/50223372540"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform block"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
