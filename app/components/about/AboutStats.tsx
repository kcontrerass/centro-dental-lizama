"use client";

import Image from "next/image";
import { WordPressPage } from "@/lib/wordpress";
import { useSearchParams } from "next/navigation";

interface AboutStatsProps {
    data: WordPressPage | null;
}

export default function AboutStats({ data }: AboutStatsProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "es";

    let stats: { title: string; subtitle: string; icon: string | null }[] = lang === "en" ? [
        {
            title: "30 years",
            subtitle: "Of experience",
            icon: null,
        },
        {
            title: "Lorem ipsum",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and",
            icon: null,
        },
        {
            title: "Lorem ipsum",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and",
            icon: null,
        },
    ] : [
        {
            title: "30 años",
            subtitle: "De experiencia",
            icon: null,
        },
        {
            title: "Lorem ipsum",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and",
            icon: null,
        },
        {
            title: "Lorem ipsum",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and",
            icon: null,
        },
    ];

    if (data && data.gutenberg_structure) {
        // Find the columns block that contains stats
        const statsBlock = data.gutenberg_structure.find(b => b.type === "core/columns" && b.columns && b.columns.length > 0);
        if (statsBlock && statsBlock.columns) {
            stats = statsBlock.columns.map(col => {
                const group = col.blocks.find(b => b.type === "core/group");
                const blocks = group ? group.blocks : col.blocks;

                const image = blocks?.find(b => b.type === "core/image");
                const paragraphs = blocks?.filter(b => b.type === "core/paragraph") || [];

                return {
                    title: paragraphs[0]?.content || "Lorem ipsum",
                    subtitle: paragraphs[1]?.content || "",
                    icon: image?.url || null,
                };
            });
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Icon Circle */}
                            <div className="w-20 h-20 rounded-full border-2 border-[#70bfa8]/30 flex items-center justify-center mb-6 overflow-hidden p-4">
                                {stat.icon ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={stat.icon}
                                            alt={stat.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-[#70bfa8]">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 11c.67 0 1.33-.33 2-1 1-1 2-2 3-2s2 1 3 2c.67.67 1.33 1 2 1h1V4h-2a3 3 0 0 0-3 3 1 1 0 0 1-2 0 3 3 0 0 0-3-3H4v7h1z" />
                                            <path d="M4 11v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7" />
                                            <path d="M12 21v-4" />
                                            <path d="M7 21h10" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-[24px] font-bold text-[#70bfa8] mb-2" dangerouslySetInnerHTML={{ __html: stat.title }} />
                            <div className="text-[14px] text-gray-400 font-medium max-w-[200px]" dangerouslySetInnerHTML={{ __html: stat.subtitle }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
