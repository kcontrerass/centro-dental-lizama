"use client";

import { Smile, Activity, Stethoscope, BriefcaseMedical, Baby } from "lucide-react";

// Custom SVG Icons for the Specialties to match the image more closely
const specialties = [
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 12c.5-2.5 2.5-4.5 5-4.5s4.5 2 5 4.5c.5 2-1 6-5 6s-5.5-4-5-6z" />
                <path d="M7 12c-2 2-1 6 1 7s4 1 4 1 2 0 4-1 3-5 1-7" />
            </svg>
        ),
        title: "DISEÑO DE SONRISA(SMILE DESIGN)",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6" /><path d="M8 8h8v4a4 4 0 0 1-8 0V8z" /><path d="M12 16v6" /><path d="M9 22h6" />
            </svg>
        ),
        title: "IMPLANTES DENTALES",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 10c0-3 2-5 7-5s7 2 7 5c0 4-2 9-7 9s-7-5-7-9z" /><path d="M5 10h14" /><path d="M12 5v9" />
            </svg>
        ),
        title: "ORTODONCIA CONVENCIONAL E INVISIBLE",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10c0-3 2-5 5-5s5 2 5 5c0 6-5 9-5 9s-5-3-5-9z" /><path d="M3 14h18" />
            </svg>
        ),
        title: "PERIODONCIA (TRATAMIENTO DE ENCÍAS)",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6" /><path d="M8 12c0-3 2-5 4-5s4 2 4 5-1 6-4 6-4-3-4-6z" /><path d="M12 17v5" />
            </svg>
        ),
        title: "ENDODONCIA (TRATAMIENTO DE CANALES)",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12c0-4 3-7 7-7s7 3 7 7-2 8-7 8-7-4-7-8z" /><rect x="9" y="5" width="6" height="4" rx="1" />
            </svg>
        ),
        title: "REHABILITACIÓN ORAL (PRÓTESIS DENTAL)",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    },
    {
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M9 10h.01" /><path d="M15 10h.01" /><path d="M8 15s1.5 2 4 2 4-2 4-2" />
            </svg>
        ),
        title: "ODONTOLOGIA NIÑOS",
        desc: "Lorem Ipsum is simply dummy text of the printing and"
    }
];

export default function Specialties() {
    return (
        <section className="py-24 bg-white">
            <div className="">
                <div className="text-center mb-24">
                    <h2 className="text-[52px] font-bold inline-block relative">
                        <span className="text-primary">Especialidades</span>{" "}
                        <span className="text-gray-300">dentales</span>
                        <div className="absolute -bottom-4 left-0 w-3/4 h-[4px] bg-primary/20">
                            <div className="w-1/2 h-full bg-primary"></div>
                        </div>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-16 max-w-7xl mx-auto px-4">
                    {specialties.map((item, index) => (
                        <div key={index} className="flex items-start gap-6 group">
                            <div className="flex-shrink-0 bg-[#F2F7F6] p-6 rounded-full flex items-center justify-center w-24 h-24 group-hover:bg-[#E8F2F0] transition-colors duration-300">
                                <div className="text-[#72BFA9]">
                                    {item.icon}
                                </div>
                            </div>
                            <div className="pt-2">
                                <h3 className="font-bold text-[18px] text-[#4A5568] uppercase tracking-tight mb-2 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-[14px] text-gray-400 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="px-16 py-4 border-2 border-[#72BFA9] text-[#72BFA9] rounded-full hover:bg-[#72BFA9] hover:text-white transition-all text-[14px] font-bold uppercase tracking-widest">
                        Ver todas
                    </button>
                </div>
            </div>
        </section>
    );
}
