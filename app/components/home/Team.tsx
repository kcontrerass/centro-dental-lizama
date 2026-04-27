"use client";

import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";
import { useMemo } from "react";

interface TeamProps {
    data: WordPressPage | null;
}

export default function Team({ data }: TeamProps) {
    const teamData = useMemo(() => {
        if (!data || !data.sections) return null;

        const columnsSection = data.sections.find(s => s.type === "columns");
        if (!columnsSection || !columnsSection.columns) return null;

        const imageCol = columnsSection.columns[0];
        const textCol = columnsSection.columns[1];

        const image = imageCol?.blocks?.find((b: any) => b.type === "core/image")?.url;
        const paragraphs = textCol?.blocks?.filter((b: any) => b.type === "core/paragraph").map((b: any) => b.content) || [];

        return {
            image: image || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
            tag: paragraphs[0] || "Lorem ipsum",
            title: paragraphs[1] || "Conoce a nuestro equipo",
            subtitle: paragraphs[2] || "Lorem Ipsum is simply dummy text of the printing",
            memberTitle: paragraphs[3] || "Dra. Ricardo Alvarado",
            memberDesc: paragraphs[4] || "Somos un centro dental con calidad humana, entregados al servicio íntegro de cada uno de nuestros pacientes."
        };
    }, [data]);

    const info = teamData || {
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
        tag: "Lorem ipsum",
        title: "Conoce a nuestro equipo",
        subtitle: "Lorem Ipsum is simply dummy text of the printing",
        memberTitle: "Dra. Ricardo Alvarado",
        memberDesc: "Somos un centro dental con calidad humana, entregados al servicio íntegro de cada uno de nuestros pacientes."
    };

    return (
        <section className="py-24 bg-white overflow-hidden" id="equipo">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left Side: Team Image */}
                    <div className="w-full md:w-1/2 relative mb-12 md:mb-0">
                        <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-sm">
                            <Image
                                src={info.image}
                                alt="Dental Team"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:w-1/2 text-left">

                        <h2 className="text-[32px] md:text-[44px] font-bold text-gray-900 mb-4 leading-tight">
                            {info.title}
                        </h2>
                        <p className="text-lg text-gray-500 mb-10 max-w-lg">
                            {info.subtitle}
                        </p>


                        <div className="space-y-4 max-w-md border-t pt-10">
                            <h4 className="font-bold text-gray-800 text-[18px]">{info.memberTitle}</h4>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
