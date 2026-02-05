"use client";

import Image from "next/image";

export default function TestimonialsHero() {
    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner.png"
                    alt="Testimoniales"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Content Overlay - Text on the right as requested */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center justify-end px-8 md:pr-20">
                <div className="max-w-md text-right">
                    <h1 className="text-[56px] md:text-[72px] font-bold text-[#70bfa8] leading-tight mb-2 drop-shadow-sm">
                        testimoniales
                    </h1>

                </div>
            </div>
        </section>
    );
}
