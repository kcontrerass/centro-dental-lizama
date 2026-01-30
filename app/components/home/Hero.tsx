"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { WordPressPage, GutenbergBlock } from "@/lib/wordpress";

interface HeroProps {
    data: WordPressPage | null;
}

export default function Hero({ data }: HeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Default slides if no data is available
    const defaultSlides = [
        {
            image: "/banner.png",
            title: "Atendiendote a ti",
            subtitle: "y tu familia por generaciones."
        }
    ];

    // Process Gutenberg structure to extract slides
    const slides = useMemo(() => {
        if (!data || !data.gutenberg_structure) return defaultSlides;

        const processedSlides: { image: string; title: string; subtitle: string }[] = [];

        // The structure provided in the request has a core/group with vertical flex
        // containing multiple paragraphs and images.
        data.gutenberg_structure.forEach((block: GutenbergBlock) => {
            if (block.type === "core/group" && block.blocks) {
                let currentSlideInfo: { image: string; title: string; subtitle: string } | null = null;
                let textBuffer: string[] = [];

                block.blocks.forEach((innerBlock) => {
                    if (innerBlock.type === "core/paragraph") {
                        textBuffer.push(innerBlock.content || "");
                    } else if (innerBlock.type === "core/image") {
                        // When an image is found, create a slide with collected text
                        processedSlides.push({
                            image: innerBlock.url || "/banner.png",
                            title: textBuffer[0] || "Atendiendote a ti",
                            subtitle: textBuffer[1] || "y tu familia por generaciones."
                        });
                        textBuffer = []; // Reset buffer for next slide
                    }
                });
            }
        });

        return processedSlides.length > 0 ? processedSlides : defaultSlides;
    }, [data]);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="relative h-[400px] md:h-[630px] w-full  overflow-hidden">
            {/* Background slide */}
            <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
                <Image
                    src={slides[currentSlide]?.image || "/banner.png"}
                    alt="Dental Patient"
                    fill
                    className="object-cover object-[center_20%] md:object-left mix-blend-multiply"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className=" relative h-full ml-0 md:ml-100 flex items-center">
                <div className="w-full md:w-3/5 ml-auto text-white md:text-left text-center px-4 md:px-0">
                    <h1 className="text-3xl md:text-[60px] font-bold leading-tight mb-2 md:mb-4 drop-shadow-md">
                        {slides[currentSlide]?.title || "Atendiendote a ti"}
                    </h1>
                    <p className="text-xl md:text-3xl font-light drop-shadow-md">
                        {slides[currentSlide]?.subtitle || "y tu familia por generaciones."}
                    </p>
                </div>
            </div>

            {/* Slider Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-10 left-10 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all border border-white/50 ${currentSlide === index ? "bg-white scale-110 shadow-lg" : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* WhatsApp Button Floating */}
            <a
                href="https://wa.me/50222372540"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-30"
            >
                <MessageCircle size={40} className="fill-white" />
            </a>
        </section>
    );
}
