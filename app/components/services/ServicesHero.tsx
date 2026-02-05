"use client";

import Image from "next/image";

export default function ServicesHero() {
    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            {/* Background Image - Covers full space */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/servicios.png"
                    alt="Servicios Dentales"
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
                    <div className="max-w-md">
                        <h1 className="text-[56px] md:text-[72px] font-bold text-[#70bfa8] leading-tight mb-2 drop-shadow-sm">
                            Servicios
                        </h1>
                        <p className="text-[18px] md:text-[22px] text-[#70bfa8] w-[300px] font-medium leading-relaxed drop-shadow-sm">
                            Tratamientos especializados del más alto nivel.
                        </p>
                    </div>
                </div>
            </div>

            {/* WhatsApp Floating Button */}

        </section>
    );
}
