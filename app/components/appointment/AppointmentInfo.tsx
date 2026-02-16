import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";

interface AppointmentInfoProps {
    data: WordPressPage | null;
}

type ContentBlock =
    | { type: "paragraph"; content: string }
    | { type: "list"; items: string[] };

interface InfoSection {
    title: string | null;
    blocks: ContentBlock[];
    image: string;
    imageLeft: boolean;
}

const fallbackInfo: InfoSection[] = [
    {
        title: "¿Por qué es importante la limpieza dental cada 6 meses?",
        blocks: [
            {
                type: "paragraph",
                content: "Muchas veces hemos escuchado de amigos o pacientes las expresiones, \"¿Por qué vas tantas veces al dentista a limpiarte tus dientes?\", o \"yo solo voy una vez al año con eso basta y sobra\"; o peor aún, \"yo nunca he ido al dentista por una limpieza dental porque siento que no la necesito\"."
            },
            {
                type: "paragraph",
                content: "Podemos tener alguna enfermedad y no precisamente tener algún síntoma, por lo que es necesario examinar clínica y radiográficamente dientes y encías para descartar caries, fracturas, gingivitis, periodontitis, entre otros. Científicamente está comprobado que cada 6 meses debemos de realizarnos una limpieza dental profunda la cual nos va a permitir como profesionales de salud poder eliminar sarro, calculo dental, manchas por alimentos, entre otros. Al momento de tener los dientes totalmente limpios, nos permite examinar de una manera detallada los dientes y encías y así poder interceptar situaciones que podrías llegar a ser más complejas y dolorosas."
            }
        ],
        image: "https://centrodentallizamabackend.aumenta.do/wp-content/uploads/2026/02/dental-1-1024x682.jpg",
        imageLeft: true
    },
    {
        title: null,
        blocks: [
            {
                type: "paragraph",
                content: "En algunos casos el tiempo entre limpiezas dentales puede ser menos de 6 meses. Por ejemplo, algunos pacientes pueden llegar a necesitar limpieza dental cada 3 o 4 meses, y esto puede deberse a algunos padecimientos sistémicos, físicos o psicológicos que hacen que el paciente genere más sarro de lo normal o que el paciente necesite cuidado más minucioso de parte de nosotros como clínicos. Los pacientes que pueden entrar en este rubro son:"
            },
            {
                type: "list",
                items: ["Diabéticos", "Hipertensos", "Demencia Senil", "Alzheimer", "Parkinson", "Fumador"]
            },
            {
                type: "paragraph",
                content: "Pacientes con capacidades especiales: autismo, Síndrome de Dawn, etc. Si tienes alguna duda o pregunta, no dudes en comunicarte con nosotros, será un gusto poder solucionarlas y tenerte con nosotros."
            }
        ],
        image: "http://centrodentallizamabackend.aumenta.do/wp-content/uploads/2026/02/dental2-1024x682.jpg",
        imageLeft: false
    }
];

export default function AppointmentInfo({ data }: AppointmentInfoProps) {
    let infoSections: InfoSection[] = fallbackInfo;

    if (data && data.gutenberg_structure) {
        const columnsBlocks = data.gutenberg_structure.filter(block => block.type === "core/columns");
        if (columnsBlocks.length >= 2) {
            infoSections = columnsBlocks.slice(0, 2).map((block, idx) => {
                const imageLeft = idx === 0;
                let title: string | null = null;
                let blocks: ContentBlock[] = [];
                let image = "";

                if (block.columns) {
                    block.columns.forEach((col: any) => {
                        const imageBlock = col.blocks?.find((b: any) => b.type === "core/image");
                        if (imageBlock) {
                            image = imageBlock.url || imageBlock.attributes?.url || "";
                        }

                        // Extract blocks in order
                        col.blocks?.forEach((b: any) => {
                            if (b.type === "core/paragraph") {
                                // First paragraph of the first section might be a title
                                if (idx === 0 && !title && b.content.includes("?")) {
                                    title = b.content;
                                } else if (b.content) {
                                    blocks.push({ type: "paragraph", content: b.content });
                                }
                            } else if (b.type === "core/list") {
                                blocks.push({ type: "list", items: b.items || [] });
                            }
                        });
                    });
                }

                if (!image) image = idx === 0 ? fallbackInfo[0].image : fallbackInfo[1].image;
                if (blocks.length === 0) blocks = idx === 0 ? fallbackInfo[0].blocks : fallbackInfo[1].blocks;

                return { title, blocks, image, imageLeft };
            });
        }
    }

    return (
        <section className="py-20 px-8 bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto space-y-32">
                {infoSections.map((section, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${section.imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
                    >
                        {/* Image Column */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                                <Image
                                    src={section.image}
                                    alt={section.title || "Agendar cita info"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Decorative element */}
                            <div className={`absolute -z-10 w-full h-full border-2 border-[#70bfa8]/20 rounded-3xl ${section.imageLeft ? '-top-6 -left-6' : '-bottom-6 -right-6'}`}></div>
                        </div>

                        {/* Text Column */}
                        <div className="w-full md:w-1/2 space-y-6">
                            {section.title && (
                                <h2 className="text-[20px] md:text-[20px] font-bold  leading-tight mb-8">
                                    {section.title}
                                </h2>
                            )}
                            <div className="space-y-6">
                                {section.blocks.map((block, bIndex) => (
                                    block.type === "paragraph" ? (
                                        <p
                                            key={bIndex}
                                            className="text-gray-400 text-[18px] leading-relaxed font-light"
                                        >
                                            {block.content}
                                        </p>
                                    ) : (
                                        <ul key={bIndex} className="list-none space-y-2">
                                            {block.items.map((item, iIndex) => (
                                                <li key={iIndex} className="text-gray-400 text-[18px] leading-relaxed font-light flex items-start gap-2">
                                                    <span className="text-[#70bfa8] ">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
