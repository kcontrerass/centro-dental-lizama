"use client";

import { useState } from "react";
import Image from "next/image";

export default function AboutTeamSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            role: "Dra. Ricardo Alvarado",
            testimonial: "Sed risus pretium quam vulputate dignissim suspendisse in est. Nibh venenatis cras sed felis eget velit aliquet sagittis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida.",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
        },
        {
            role: "Dra. Maria Lopez",
            testimonial: "Excellent care and professional service. The team at Centro Dental Lizama makes you feel right at home from the moment you walk in.",
            image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop",
        },
        {
            role: "Dr. Juan Pérez",
            testimonial: "State-of-the-art technology and a very friendly environment. I highly recommend their orthodontic services for both children and adults.",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
        }
    ];

    return (
        <section className="py-20 bg-[#fbfbfb]">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2">
                        <div className="mb-10">
                            <span className="text-[14px] font-bold text-[#70bfa8] uppercase tracking-wider mb-2 block">
                                Lorem Ipsum
                            </span>
                            <h2 className="text-[42px] font-extrabold text-[#70bfa8] leading-tight mb-4">
                                Conoce a nuestro equipo
                            </h2>
                            <p className="text-[18px] text-gray-400 font-medium">
                                Lorem Ipsum is simply dummy text of the printing
                            </p>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-[20px] font-bold text-gray-600 mb-1">
                                Testimonial
                            </h3>
                            <p className="text-[16px] font-bold text-gray-500 mb-6">
                                {slides[currentSlide].role}
                            </p>
                            <p className="text-[16px] text-gray-400 leading-relaxed font-medium italic">
                                "{slides[currentSlide].testimonial}"
                            </p>
                        </div>
                    </div>

                    {/* Right Content: Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                            <Image
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].role}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-16">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-[#70bfa8] scale-125" : "bg-gray-300"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
