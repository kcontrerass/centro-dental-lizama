"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

const cases = [
    {
        id: 1,
        title: "Caso #1",
        description: "Nuestra paciente nos visita de Estados Unidos, para un tratamiento dental estético en corto tiempo. Se realizó Prótesis Fija en Zirconio y tratamientos de canales, por ausencia de piezas.",
        image: "/servicios.png",
        highlights: [
            { title: "Lorem ipsum", text: "Lorem ipsum is simply dummy text of the printing and" },
            { title: "Lorem ipsum", text: "Lorem ipsum is simply dummy text of the printing and" }
        ],
        reverse: false,
        bgColor: "bg-[#F4F7F6]"
    },
    {
        id: 2,
        title: "Caso #2",
        description: "Lorem ipsum is simply dummy text of the printing",
        image: "/banner.png",
        highlights: [
            { title: "Lorem ipsum", text: "Lorem ipsum is simply dummy text of the printing and" },
            { title: "Lorem ipsum", text: "Lorem ipsum is simply dummy text of the printing and" },
            { title: "Lorem ipsum", text: "Lorem ipsum is simply dummy text of the printing and" }
        ],
        reverse: true,
        bgColor: "bg-white"
    }
];

export default function TestimonialsCases() {
    return (
        <section className="bg-white">
            {/* Header section with title */}
            <div className="py-20 px-8 text-center">
                <h2 className="text-[32px] md:text-[45px] font-bold text-[#70bfa8]">
                    Pacientes felices, sonrisas radiantes
                </h2>
            </div>

            {/* Testimonials Rows */}
            <div className="flex flex-col">
                {item_mapping(cases)}
            </div>
        </section>
    );
}

function item_mapping(items: any[]) {
    return items.map((item) => (
        <div key={item.id} className={`flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] ${item.reverse ? 'md:flex-row-reverse' : ''}`}>
            {/* Image Part - Occupies exactly half of the layout */}
            <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Text Part - Occupies the other half */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-16 md:py-0 ${item.bgColor}`}>
                <div className="max-w-xl">
                    <p className="text-[#a0a0a0] text-[14px] uppercase tracking-widest font-bold mb-2">Lorem Ipsum</p>
                    <h3 className="text-[42px] md:text-[54px] font-bold text-[#70bfa8] mb-4 leading-none">
                        {item.title}
                    </h3>
                    <p className="text-gray-400 text-[16px] md:text-[18px] leading-relaxed mb-10 font-light">
                        {item.description}
                    </p>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {item.highlights.map((highlight: any, idx: number) => (
                            <div key={idx} className="flex flex-col items-center text-center ">
                                <div className="w-14 h-14 bg-[#EDEDED] backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000ff" strokeWidth="1.5">
                                        <path d="M12 4c-3 0-5 2-5 5 0 3 2 4.5 2 6.5s1 2.5 3 2.5 3-.5 3-2.5 2-3.5 2-6.5c0-3-2-5-5-5z" />
                                    </svg>
                                </div>
                                <h4 className="text-[20px] font-bold text-[#70bfa8] mb-1 leading-tight">{highlight.title}</h4>
                                <p className="text-gray-400 text-[13px] leading-snug">{highlight.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-start">
                        <button className="flex items-center gap-2 bg-[#94D4BB] text-white px-8 py-3 rounded-[12px] font-bold text-[14px] transition-all hover:brightness-105 active:scale-95 shadow-sm">
                            Agendar cita
                            <div className="bg-white/20 p-1 rounded-md ml-2">
                                <Calendar className="w-4 h-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ));
}
