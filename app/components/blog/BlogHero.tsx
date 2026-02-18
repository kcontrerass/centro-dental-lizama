"use client";

import Image from "next/image";

interface BlogHeroProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function BlogHero({ title = "Blog", subtitle, backgroundImage = "/banner.png" }: BlogHeroProps) {
    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay for better readability on mobile */}
                <div className="absolute inset-0  from-white/80 via-white/40 to-transparent md:from-white/60 md:to-transparent"></div>
            </div>

            {/* Content Overlay - Text on the left */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center px-8 md:pl-20">
                <div className="max-w-2xl">
                    <h1 className="text-[56px] md:text-[72px] font-bold text-[#70bfa8] leading-tight mb-2 drop-shadow-sm">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className=" text-[18px] md:text-[24px] text-[#70bfa8] mt-4 drop-shadow-md">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
