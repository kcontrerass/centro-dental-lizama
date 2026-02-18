"use client";

import Image from "next/image";

export default function LocationCTA({ button, address }: { button?: any, address?: string }) {
    return (
        <section className="bg-[#4fb0a2] py-16 px-8">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
                {/* Button */}
                {button && (
                    <a
                        href={button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-transparent border-2 border-white/60 text-white px-10 py-3 rounded-full font-bold text-[16px] hover:bg-white/10 transition-all mb-6 uppercase tracking-wider"
                    >
                        {button.text}
                        <Image
                            src="/waze.svg"
                            alt="Waze Icon"
                            width={24}
                            height={24}
                            className="brightness-0 invert"
                        />
                    </a>
                )}

                {/* Address */}
                {address && (
                    <p className="text-white text-[18px] md:text-[20px] font-medium leading-relaxed opacity-90">
                        {address}
                    </p>
                )}
            </div>
        </section>
    );
}
