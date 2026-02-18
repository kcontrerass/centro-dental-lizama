"use client";

import Image from "next/image";
import { WordPressPage } from "@/lib/wordpress";

interface ContactHeroProps {
    data: WordPressPage | null;
}

export default function ContactHero({ data }: ContactHeroProps) {
    // Extract data from Gutenberg structure
    const coverBlock = data?.sections?.find((s: any) => s.type === "cover");
    const bgImage = coverBlock?.attributes?.url || "/banner.png";
    const title = coverBlock?.blocks?.[0]?.content || "Contáctanos";

    return (
        <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden mb-20">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    className="object-cover object-center "
                    priority
                />
            </div>

            {/* Content Overlay - Text on the right */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center justify-end px-8 md:pr-20">
                <div className="max-w-md text-right">
                    <h1 className="text-[42px] md:text-[86px] font-bold text-white leading-tight drop-shadow-lg">
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    );
}
