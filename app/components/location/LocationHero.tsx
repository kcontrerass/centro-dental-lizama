"use client";

import Image from "next/image";

export default function LocationHero() {
    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/ubicacion.png" // Using the same smiling woman image for consistency or /servicios.png
                    alt="Ubicación"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Content Overlay - Text on the left */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center px-8 md:pl-20">
                <div className="max-w-md">
                    <h1 className="text-[56px] md:text-[72px] font-bold text-[#70bfa8] leading-tight mb-2 drop-shadow-sm">
                        Ubicación
                    </h1>

                </div>
            </div>
        </section>
    );
}
