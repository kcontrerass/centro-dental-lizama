import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";

interface SecondaryServicesProps {
    data: WordPressPage | null;
}

interface Service {
    title: string;
    description: string;
    icon?: React.ReactNode;
    iconUrl?: string;
    highlighted: boolean;
}

const fallbackSecondaryServices: Service[] = [
    {
        title: "ODONTOPEDIATRÍA",
        description: "Técnicas modernas y seguras para el manejo de niños, eliminando estrés y miedo.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10l.01 0" />
                <path d="M15 10l.01 0" />
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "PERIODONCIA (TRATAMIENTO DE ENCÍAS)",
        description: "Limpieza profunda: elimina sarro, manchas y fortalece el esmalte.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4c-3 0-5 2-5 5 0 3 2 4.5 2 6.5s1 2.5 3 2.5 3-.5 3-2.5 2-3.5 2-6.5c0-3-2-5-5-5z" />
                <path d="M9 13c1 0 1 1 3 1s2-1 3-1" />
                <rect x="13" y="10" width="1" height="4" />
                <path d="M13 14v2" />
            </svg>
        ),
        highlighted: true
    },
    {
        title: "CORONA DENTAL",
        description: "Restauración total para dientes desgastados o fracturados, preservándolos al máximo.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4c-3 0-5 2-5 5h10c0-3-2-5-5-5z" />
                <path d="M7 9v8c0 2 2 3 5 3s5-1 5-3V9" />
                <path d="M11 15h2M12 14v2" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "IMPLANTES DENTALES",
        description: "Colocamos tornillos de titanio e implantamos coronas con tecnología 3D para máxima precisión.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10c0-2 2-3 5-3s5 1 5 3" />
                <path d="M12 10v10" />
                <path d="M8 12h8" />
                <path d="M9 15h6" />
                <path d="M10 18h4" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "ENDODONCIA",
        description: "Se extrae el nervio, se limpia, sella y restaura el diente.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4c-3 0-5 2-5 5h10c0-3-2-5-5-5z" />
                <path d="M12 9v7" />
                <path d="M10 16c0 1 2 2 2 2s2-1 2-2" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "PRÓTESIS REMOVIBLE",
        description: "Alternativa estética y higiénica para pacientes que no pueden usar prótesis fijas o implantes.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 10c1 4 3 6 7 6s6-2 7-6" />
                <path d="M8 10c0 3 2 4 4 4s4-1 4-4" />
                <path d="M6 10a6 6 0 0 1 12 0" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "CARILLA DENTAL",
        description: "Restauración frontal para mejorar estética, cerrar espacios y rejuvenecer tu sonrisa.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10c0-3 2-5 5-5s5 2 5 5v5c0 2-2 3-5 3s-5-1-5-3v-5z" />
                <path d="M7 12h10M12 5v13" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "INCRUSTACIÓN DENTAL",
        description: "Restauración frontal para mejorar estética, cerrar espacios y rejuvenecer tu sonrisa.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M8 9h8" />
                <path d="M12 9a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0v-2a4 4 0 0 1 4-4z" />
            </svg>
        ),
        highlighted: false
    },
    {
        title: "ALINEADORES",
        description: "Alineación dental con tecnología 3D y acetatos transparentes, sin brackets.",
        icon: (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#70bfa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 10a7 7 0 0 1 14 0" />
                <path d="M5 10c1 4 3 6 7 6s6-2 7-6" />
                <path d="M9 10v2M12 10v3M15 10v2" />
            </svg>
        ),
        highlighted: false
    }
];

export default function SecondaryServices({ data }: SecondaryServicesProps) {
    let services: any[] = fallbackSecondaryServices;
    let title = "Conoce más de nuestros servicios";

    if (data && data.gutenberg_structure) {
        // Find title - first paragraph after the first columns block
        const firstColumnsIndex = data.gutenberg_structure.findIndex(b => b.type === "core/columns");
        const titleParagraph = data.gutenberg_structure.find((b, idx) => idx > firstColumnsIndex && b.type === "core/paragraph");
        if (titleParagraph) {
            title = titleParagraph.content || title;
        }

        // Find all columns after the title
        const titleBlockIndex = data.gutenberg_structure.findIndex(b => b.content === title);
        const columnsBlocks = data.gutenberg_structure.filter((b, idx) => idx > titleBlockIndex && b.type === "core/columns");

        if (columnsBlocks.length > 0) {
            const extractedServices: any[] = [];
            columnsBlocks.forEach(block => {
                if (block.columns) {
                    block.columns.forEach((col: any) => {
                        const group = col.blocks?.find((b: any) => b.type === "core/group");
                        if (group && group.blocks) {
                            const imageBlock = group.blocks.find((b: any) => b.type === "core/image");
                            const paragraphs = group.blocks.filter((b: any) => b.type === "core/paragraph");
                            extractedServices.push({
                                title: paragraphs[0]?.content || "",
                                description: paragraphs[1]?.content || "",
                                iconUrl: imageBlock?.attributes?.url || imageBlock?.url,
                                highlighted: false // Custom logic for highlighting can be added if needed
                            });
                        }
                    });
                }
            });

            if (extractedServices.length > 0) {
                // Keep the special highlighting for the second item if it's the fallback or if we want to preserve that style
                // For now, let's just use the extracted ones
                services = extractedServices;
            }
        }
    }

    return (
        <section className="py-20 px-8 bg-white">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-[32px] md:text-[40px] font-bold text-[#70bfa8] text-center mb-24 uppercase">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-8 relative shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${service.highlighted ? 'bg-[#70bfa8]' : 'bg-[#f4fbfc]'}`}>
                                {service.iconUrl ? (
                                    <Image src={service.iconUrl} alt={service.title} width={45} height={45} className="w-[45px] h-[45px] object-contain" />
                                ) : (
                                    (service as any).icon
                                )}
                            </div>

                            <h3 className="text-[20px] font-extrabold text-[#70bfa8] mb-4 tracking-wider leading-tight max-w-[200px] uppercase">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-[18px] leading-relaxed max-w-[280px] font-light">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
