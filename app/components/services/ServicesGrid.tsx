"use client";

const primaryServices = [
    {
        title: "Diseño de sonrisa",
        description: "Mejoramos tu sonrisa con carillas, coronas y cirugía periodontal.",
        icon: (
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10c.667-2 2-3.333 4-4s3.333.667 4 4" />
                <path d="M18 13c-.5 3-2.5 5-6 5s-5.5-2-6-5" />
                <path d="M9 13s.5 2 3 2 3-2 3-2" />
                <path d="M10 13v2M12 13v2M14 13v2" />
            </svg>
        )
    },
    {
        title: "Ortodoncia",
        description: "Alineación dental con brackets metálicos, cerámicos o de zafiro, mejorando estética y función.",
        icon: (
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 10c.667-2 2-3.333 4-4s3.333.667 4 4c.667 2 2 3.333 4 4s3.333-.667 4-4" />
                <path d="M19 13c-.5 3-2.5 5-7 5s-6.5-2-7-5" />
                <rect x="7" y="12" width="2" height="2" rx="0.5" />
                <rect x="11" y="13" width="2" height="2" rx="0.5" />
                <rect x="15" y="12" width="2" height="2" rx="0.5" />
                <path d="M5 13h14" />
            </svg>
        )
    },
    {
        title: "Examen dental",
        description: "Evaluación exhaustiva de tu salud oral para prevenir y detectar problemas a tiempo.",
        icon: (
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M11 8v6M8 11h6" />
            </svg>
        )
    }
];

export default function ServicesGrid() {
    return (
        <section className="pb-20 pt-0 px-8 bg-white">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {primaryServices.map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-28 h-28 bg-[#f4fbfc] rounded-full flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                                {service.icon}
                            </div>
                            <h3 className="text-[22px] font-bold text-[#70bfa8] mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-[15px] leading-relaxed max-w-[280px] font-light">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
