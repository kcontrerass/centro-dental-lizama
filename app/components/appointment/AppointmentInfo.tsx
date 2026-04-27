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

export default function AppointmentInfo({ data }: AppointmentInfoProps) {
    let infoSections: InfoSection[] = [];

    if (data && data.gutenberg_structure) {
        const columnsBlocks = data.gutenberg_structure.filter(block => block.type === "core/columns");
        if (columnsBlocks.length > 0) {
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

                return { title, blocks, image, imageLeft };
            });
        }
    }

    if (infoSections.length === 0) return null;

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
                            {section.image && (
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 relative">
                                    <Image
                                        src={section.image}
                                        alt={section.title || ""}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
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
