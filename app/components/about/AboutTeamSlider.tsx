"use client";

import { useState } from "react";
import Image from "next/image";
import { WordPressPage } from "@/lib/wordpress";
import { useSearchParams } from "next/navigation";

interface AboutTeamSliderProps {
    data: WordPressPage | null;
}

export default function AboutTeamSlider({ data }: AboutTeamSliderProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "es";
    const [currentSlide, setCurrentSlide] = useState(0);

    let sectionTitle = lang === "en" ? "Meet our team" : "Conoce a nuestro equipo";
    let sectionSubtitle = lang === "en" ? "" : "";
    let sectionDescription = lang === "en" ? "" : "";

    let slides = [
        {
            role: lang === "en" ? "Dr. Ricardo Alvarado" : "Dra. Ricardo Alvarado",
            testimonial: lang === "en"
                ? "Soy odontólogo egresado de la Pontificia Universidad Católica Madre y Maestra (PUCMM), con 18 años de experiencia en el área de la salud oral. He realizado múltiples cursos de actualización profesional, tanto en República Dominicana como en el extranjero, para mantenerme al día con los últimos avances en odontología. Mi objetivo principal es ofrecer a mis pacientes una atención odontológica de alta calidad, personalizada y con un enfoque integral, abarcando desde la prevención hasta el tratamiento de casos complejos. Me esfuerzo por crear un ambiente de confianza y comodidad, donde cada paciente reciba el mejor cuidado posible para lograr una sonrisa saludable y radiante."
                : "Soy odontólogo egresado de la Pontificia Universidad Católica Madre y Maestra (PUCMM), con 18 años de experiencia en el área de la salud oral. He realizado múltiples cursos de actualización profesional, tanto en República Dominicana como en el extranjero, para mantenerme al día con los últimos avances en odontología. Mi objetivo principal es ofrecer a mis pacientes una atención odontológica de alta calidad, personalizada y con un enfoque integral, abarcando desde la prevención hasta el tratamiento de casos complejos. Me esfuerzo por crear un ambiente de confianza y comodidad, donde cada paciente reciba el mejor cuidado posible para lograr una sonrisa saludable y radiante.",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
            testimonialLabel: lang === "en" ? "Testimonial" : "Testimonial"
        }
    ];

    if (data && data.gutenberg_structure) {
        // Find the group that contains multiple core/columns (the last block usually)
        const teamGroup = data.gutenberg_structure.find(b => b.type === "core/group" && b.blocks?.some(sb => sb.type === "core/columns"));

        if (teamGroup && teamGroup.blocks) {
            const columnsBlocks = teamGroup.blocks.filter(b => b.type === "core/columns");

            if (columnsBlocks.length > 0) {
                slides = columnsBlocks.map(block => {
                    const textCol = block.columns?.[0];
                    const imageCol = block.columns?.[1];

                    const paragraphs = textCol?.blocks?.filter(b => b.type === "core/paragraph") || [];
                    const imageBlock = imageCol?.blocks?.find(b => b.type === "core/image");

                    if (paragraphs.length >= 2) {
                        sectionSubtitle = paragraphs[0].content || sectionSubtitle;
                        sectionTitle = paragraphs[1].content || sectionTitle;
                    }

                    return {
                        testimonialLabel: paragraphs[2]?.content || "Testimonial",
                        testimonial: paragraphs[3]?.content || "",
                        role: "", // The JSON doesn't seem to have a specific role field separate from testimonial label in this structure
                        image: imageBlock?.url || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop"
                    };
                });
            }
        }
    }

    if (slides.length === 0) return null;

    return (
        <section className="py-20 bg-[#fbfbfb]">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2">
                        <div className="mb-10">
                            <div className="text-[14px] font-bold text-[#70bfa8] uppercase tracking-wider mb-2 block" dangerouslySetInnerHTML={{ __html: sectionSubtitle }} />
                            <h2 className="text-[42px] font-extrabold text-[#70bfa8] leading-tight mb-4" dangerouslySetInnerHTML={{ __html: sectionTitle }} />

                        </div>

                        <div className="mt-12">
                            <h3 className="text-[20px] font-bold text-gray-600 mb-1" dangerouslySetInnerHTML={{ __html: slides[currentSlide].testimonialLabel }} />
                            <p className="text-[16px] font-bold text-gray-500 mb-6">
                                {slides[currentSlide].role}
                            </p>
                            <div className="text-[16px] text-gray-400 leading-relaxed font-medium italic">
                                "<span dangerouslySetInnerHTML={{ __html: slides[currentSlide].testimonial }} />"
                            </div>
                        </div>
                    </div>

                    {/* Right Content: Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto rounded-sm overflow-hidden shadow-2xl">
                            <Image
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].role || "Team member"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                {slides.length > 1 && (
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
                )}
            </div>
        </section>
    );
}
