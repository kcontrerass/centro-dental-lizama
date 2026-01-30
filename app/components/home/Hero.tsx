"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Simulation of slider for dots
    const slides = [
        {
            image: "/banner.png",
            title: "Atendiendote a ti",
            subtitle: "y tu familia por generaciones."
        },
        {
            image: "/banner.png",
            title: "Tu sonrisa es nuestra prioridad",
            subtitle: "Cuidado dental experto."
        },
        {
            image: "/banner.png",
            title: "Tecnología avanzada",
            subtitle: "Para los mejores resultados."
        }
    ];

    useEffect(() => {
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
                    src={slides[currentSlide].image}
                    alt="Dental Patient"
                    fill
                    className="object-cover object-[center_20%] md:object-left mix-blend-multiply"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className=" relative h-full ml-100 flex items-center">
                <div className="w-full md:w-3/5 ml-auto text-white md:text-left text-center">
                    <h1 className="text-3xl md:text-[60px] font-bold leading-tight mb-2 md:mb-4 drop-shadow-md">
                        {slides[currentSlide].title}
                    </h1>
                    <p className="text-xl md:text-3xl font-light drop-shadow-md">
                        {slides[currentSlide].subtitle}
                    </p>
                </div>
            </div>

            {/* Slider Dots */}
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
