"use client";

import Image from "next/image";

export default function ContactHero() {
    return (
        <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden mb-20">
            {/* Background Image/Overlay - Using a placeholder or existing banner */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner.png" // Placeholder for the smiling man image
                    alt="Contáctanos"
                    fill
                    className="object-cover object-center "
                    priority
                />
            </div>

            {/* Content Overlay - Text on the right */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center justify-end px-8 md:pr-20">
                <div className="max-w-md text-right">
                    <h1 className="text-[56px] md:text-[86px] font-bold text-white leading-tight drop-shadow-lg">
                        Contáctanos
                    </h1>
                </div>
            </div>
        </section>
    );
}
