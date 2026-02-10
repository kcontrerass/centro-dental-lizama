"use client";

import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";
import { useMemo } from "react";

interface SpecialtiesProps {
    data: WordPressPage | null;
}

export default function Specialties({ data }: SpecialtiesProps) {
    // Process data to find specialties
    const specialtiesData = useMemo(() => {
        if (!data || !data.sections) return null;

        let sectionTitle = "Especialidades dentales";
        let sectionSubtitle = "";

        // Find the index of the "Especialidades dentales" title
        const titleIndex = data.sections.findIndex(s =>
            s.type === "content" &&
            s.blocks?.some((b: any) =>
                (b.type === "core/paragraph" || b.type === "core/heading") &&
                (
                    b.content.toLowerCase().includes("especialidades") ||
                    b.content.toLowerCase().includes("dentales") ||
                    b.content.toLowerCase().includes("specialties") ||
                    b.content.toLowerCase().includes("dental")
                )
            )
        );

        if (titleIndex !== -1) {
            const titleSection = data.sections[titleIndex];
            const textBlocks = titleSection.blocks?.filter((b: any) =>
                (b.type === "core/paragraph" || b.type === "core/heading") &&
                b.content?.trim().length > 0
            );

            const titleBlock = textBlocks?.find((b: any) =>
            (
                b.content.toLowerCase().includes("especialidades") ||
                b.content.toLowerCase().includes("dentales") ||
                b.content.toLowerCase().includes("specialties") ||
                b.content.toLowerCase().includes("dental")
            )
            );

            if (titleBlock) {
                sectionTitle = titleBlock.content;

                // Try to find subtitle (next block after title)
                const titleIdx = textBlocks.indexOf(titleBlock);
                if (titleIdx !== -1 && textBlocks[titleIdx + 1]) {
                    sectionSubtitle = textBlocks[titleIdx + 1].content;
                } else if (titleIdx !== -1 && titleIdx < textBlocks.length - 1) {
                    // Search next valid text block
                    for (let i = titleIdx + 1; i < textBlocks.length; i++) {
                        if (textBlocks[i].content?.trim().length > 0) {
                            sectionSubtitle = textBlocks[i].content;
                            break;
                        }
                    }
                }
            }
        } else {
            return null;
        }

        // Search for the "Ver todas" button (or "See all") in the section or following sections
        let buttonText = "Ver todas";
        // We can search for the button in the same way we search for the grid
        for (let i = titleIndex; i < data.sections.length; i++) {
            const section = data.sections[i];
            const buttonBlock = section.blocks?.find((b: any) =>
                b.type === 'core/buttons' || b.type === 'core/button'
            );

            if (buttonBlock) {
                // specific logic to extract text from button block structure
                const extractText = (block: any): string | null => {
                    if (block.type === 'core/button') return block.text;
                    if (block.buttons && block.buttons.length > 0) return block.buttons[0].text;
                    if (block.blocks) {
                        for (const child of block.blocks) {
                            const found = extractText(child);
                            if (found) return found;
                        }
                    }
                    return null;
                };
                const text = extractText(buttonBlock);
                if (text) {
                    buttonText = text;
                    break; // Stop after finding the first button group
                }
            }
        }

        // The grid of specialties should be in the next groups
        const specialtiesGrid: any[] = [];

        // ... (rest of the grid extraction logic remains similar, starting from titleIndex + 1)
        for (let i = titleIndex + 1; i < data.sections.length; i++) {
            // ...
            // (Copying existing logic for brevity in prompt, preserved)
            const section = data.sections[i];
            if (section.type === "group" && section.attributes?.layout?.type === "grid") {
                section.blocks.forEach((groupBlock: any) => {
                    const iconImage = groupBlock.blocks?.find((b: any) => b.type === "core/image");
                    const textGroup = groupBlock.blocks?.find((b: any) => b.type === "core/group");
                    const title = textGroup?.blocks?.find((b: any) => b.type === "core/paragraph" && b.content.length > 50 === false)?.content;
                    const desc = textGroup?.blocks?.find((b: any) => b.type === "core/paragraph" && b.content.includes("Lorem Ipsum"))?.content;

                    if (title) {
                        specialtiesGrid.push({
                            icon: iconImage?.url || "",
                            title: title,
                            desc: desc || "Lorem Ipsum is simply dummy text of the printing and"
                        });
                    }
                });
            } else if (section.type === "content" && section.blocks?.some((b: any) => b.type === "core/buttons")) {
                // Stop if we hit the "VER TODAS" button or next section
                break;
            }
        }

        return {
            title: sectionTitle,
            subtitle: sectionSubtitle,
            buttonText,
            items: specialtiesGrid.length > 0 ? specialtiesGrid : null
        };
    }, [data]);

    // Fallback specialties with manual icons if CMS data is missing
    const fallbackSpecialties = [
        // ... (keep fallback)
        {
            icon: "/icons/smile.svg",
            title: "DISEÑO DE SONRISA(SMILE DESIGN)",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        // ... items
    ];

    const displayItems = specialtiesData?.items || [
        // ... (keep existing fallback items)
        {
            icon: "/icons/smile.svg",
            title: "DISEÑO DE SONRISA(SMILE DESIGN)",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        {
            icon: "/icons/implant.svg",
            title: "IMPLANTES DENTALES",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        {
            icon: "/icons/ortho.svg",
            title: "ORTODONCIA CONVENCIONAL E INVISIBLE",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        {
            icon: "/icons/periodoncia.svg",
            title: "PERIODONCIA (TRATAMIENTO DE ENCÍAS)",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        {
            icon: "/icons/endodoncia.svg",
            title: "ENDODONCIA (TRATAMIENTO DE CANALES)",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        {
            icon: "/icons/rehab.svg",
            title: "REHABILITACIÓN ORAL (PRÓTESIS DENTAL)",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        },
        {
            icon: "/icons/kids.svg",
            title: "ODONTOLOGIA NIÑOS",
            desc: "Lorem Ipsum is simply dummy text of the printing and"
        }
    ];

    const sectionTitle = specialtiesData?.title || "Especialidades dentales";
    const sectionSubtitle = specialtiesData?.subtitle || "";
    const buttonText = specialtiesData?.buttonText || "Ver todas";

    // Split title for styling (First word color 1, rest color 2)
    const titleParts = sectionTitle.trim().split(" ");
    const firstWord = titleParts[0];
    const restOfTitle = titleParts.slice(1).join(" ");

    return (
        <section className="py-24 bg-white" id="especialidades">
            <div className="">
                <div className="text-center mb-24">
                    <h2 className="text-[52px] font-bold inline-block relative">
                        <span className="text-primary">{firstWord}</span>{" "}
                        <span className="text-gray-300">{restOfTitle}</span>
                        <div className="absolute -bottom-4 left-0 w-3/4 h-[4px] bg-primary/20">
                            <div className="w-1/2 h-full bg-primary"></div>
                        </div>
                    </h2>
                    <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-16 max-w-7xl mx-auto px-4">
                    {displayItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-6 group">
                            <div className="flex-shrink-0 bg-[#F2F7F6] p-4 rounded-full flex items-center justify-center w-24 h-24 group-hover:bg-[#E8F2F0] transition-colors duration-300 overflow-hidden">
                                <div className="text-[#72BFA9] relative w-full h-full">
                                    {item.icon.startsWith("<svg") ? (
                                        <div dangerouslySetInnerHTML={{ __html: item.icon }} className="w-full h-full p-2" />
                                    ) : (
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={60}
                                            height={60}
                                            className="object-contain"
                                        />
                                    )}
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
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
}
