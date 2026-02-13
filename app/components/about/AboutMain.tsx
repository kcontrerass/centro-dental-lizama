"use client";

import { WordPressPage } from "@/lib/wordpress";
import { useSearchParams } from "next/navigation";

interface AboutMainProps {
    data: WordPressPage | null;
}

export default function AboutMain({ data }: AboutMainProps) {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "es";

    let title = lang === "en" ? "Who we are" : "Quiénes somoss";
    let description = lang === "en"
        ? "We are a dental center with more than 30 years of experience in Guatemala, counting with specialists in all branches of modern dentistry to offer dental treatments of high quality standards, from the smallest to the largest in the family."
        : "Somos un centro dental con más de 30 años de experiencia en Guatemala, contando con especialistas en todas las ramas de la odontología moderna para ofrecer tratamientos dentales de altos estándares de calidad, desde los más pequeños hasta los más grandes de la familia.";

    if (data && data.gutenberg_structure) {

        // Collect all paragraphs recursively (top level + one level deep groups)
        const allParagraphs: any[] = [];
        data.gutenberg_structure.forEach(block => {
            if (block.type === "core/paragraph") {
                allParagraphs.push(block);
            } else if (block.blocks) {
                block.blocks.forEach(inner => {
                    if (inner.type === "core/paragraph") {
                        allParagraphs.push(inner);
                    }
                });
            }
        });

        // Hero takes paragraphs 0 and 1. AboutMain takes 2 and 3 if available.
        if (allParagraphs.length >= 4) {
            let rawTitle = allParagraphs[2]?.content;
            let rawDescription = allParagraphs[3]?.content;

            // If the title from API is still in Spanish but we are in English, use the fallback
            if (lang === "en" && (rawTitle === "Quiénes somos" || !rawTitle)) {
                title = "Who we are";
            } else {
                console.log(rawTitle);
                title = rawTitle || title;
            }

            description = rawDescription || description;
        } else if (allParagraphs.length === 3) {
            description = allParagraphs[2]?.content || description;
        }
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Boxed Title */}
                <div className="inline-block px-8 py-3 mb-10">
                    <h2 className="text-[36px] font-extrabold text-[#70bfa8] uppercase tracking-wide" >
                        {data?.gutenberg_structure[1].content}
                    </h2>
                </div>

                {/* Description Text */}
                <div className="text-[20px] text-gray-400 leading-[1.6] font-medium max-w-5xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </section>
    );
}
