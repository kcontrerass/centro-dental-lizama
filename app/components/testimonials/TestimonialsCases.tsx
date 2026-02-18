import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

interface TestimonialsCasesProps {
    data?: any;
}

export default function TestimonialsCases({ data }: TestimonialsCasesProps) {
    const structure = data?.gutenberg_structure || [];

    // Find the intro title (paragraph after cover)
    const introBlock = structure.find((block: any, index: number) =>
        block.type === "core/paragraph" && index > 0
    );
    const introTitle = introBlock?.content || "Pacientes felices, sonrisas radiantes";

    // Find all case study blocks (core/columns)
    const caseBlocks = structure.filter((block: any) => block.type === "core/columns");

    return (
        <section className="bg-white">
            {/* Header section with title */}
            <div className="py-20 px-8 text-center">
                <h2
                    className="text-[32px] md:text-[45px] font-bold text-[#70bfa8]"
                    dangerouslySetInnerHTML={{ __html: introTitle }}
                />
            </div>

            {/* Testimonials Rows */}
            <div className="flex flex-col">
                {caseBlocks.map((caseBlock: any, index: number) => {
                    const columns = caseBlock.columns || [];
                    if (columns.length < 2) return null;

                    // Support for alternating layouts (Image left/right)
                    // In WordPress it might be defined by the order of columns
                    const firstColumn = columns[0];
                    const secondColumn = columns[1];

                    const isImageFirst = firstColumn.blocks.some((b: any) => b.type === "core/image");

                    const imageBlock = (isImageFirst ? firstColumn : secondColumn).blocks.find((b: any) => b.type === "core/image");
                    const textBlocks = (isImageFirst ? secondColumn : firstColumn).blocks;

                    const titleBlock = textBlocks.find((b: any) => b.type === "core/paragraph");
                    const descriptionBlock = textBlocks.find((b: any, i: number) => b.type === "core/paragraph" && i > 0);

                    const highlightsGroup = textBlocks.find((b: any) => b.type === "core/group");
                    const highlights = highlightsGroup?.blocks?.map((group: any) => {
                        const iconBlock = group.blocks?.find((b: any) => b.type === "core/image");
                        const labelBlock = group.blocks?.find((b: any) => b.type === "core/paragraph");
                        const descBlock = group.blocks?.find((b: any, i: number) => b.type === "core/paragraph" && i > 0);

                        return {
                            icon: iconBlock?.url || "/servicios.png",
                            title: labelBlock?.content || "",
                            text: descBlock?.content || ""
                        };
                    }) || [];

                    const buttonBlock = textBlocks.find((b: any) => b.type === "core/buttons")?.buttons?.[0];

                    const isReverse = !isImageFirst;
                    const isDark = index % 2 !== 0;

                    return (
                        <div key={index} className={`flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] ${isReverse ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image Part - Occupies exactly half of the layout */}
                            <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
                                <Image
                                    src={imageBlock?.url || "/servicios.png"}
                                    alt={titleBlock?.content || "Case study"}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Text Part - Occupies the other half */}
                            <div className={`w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-16 md:py-0 ${isDark ? 'bg-[#F4F7F6]' : 'bg-white'}`}>
                                <div className="max-w-xl">
                                    <h3
                                        className="text-[34px] md:text-[45px] font-bold text-[#70bfa8] mb-4 leading-tight"
                                        dangerouslySetInnerHTML={{ __html: titleBlock?.content || "" }}
                                    />
                                    <p
                                        className="text-gray-400 text-[16px] md:text-[18px] leading-relaxed mb-10 font-light"
                                        dangerouslySetInnerHTML={{ __html: descriptionBlock?.content || "" }}
                                    />

                                    {/* Highlights Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                        {highlights.map((highlight: any, idx: number) => (
                                            <div key={idx} className="flex flex-col items-center text-center ">
                                                <div className="w-14 h-14 bg-[#EDEDED] backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center mb-4 border border-gray-100 p-3">
                                                    <Image
                                                        src={highlight.icon}
                                                        alt={highlight.title}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </div>
                                                <h4 className="text-[18px] font-bold text-[#70bfa8] mb-1 leading-tight">{highlight.title}</h4>
                                                <p className="text-gray-400 text-[13px] leading-snug">{highlight.text}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    {buttonBlock && (
                                        <div className="flex justify-start">
                                            <Link
                                                href={buttonBlock.url || "/agendar-servicio"}
                                                className="flex items-center gap-2 bg-[#94D4BB] text-white px-8 py-3 rounded-[12px] font-bold text-[14px] transition-all hover:brightness-105 active:scale-95 shadow-sm"
                                            >
                                                {buttonBlock.text}
                                                <div className="bg-white/20 p-1 rounded-md ml-2">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

