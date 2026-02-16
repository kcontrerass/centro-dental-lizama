import { WordPressPage } from "@/lib/wordpress";

interface ServicesIntroProps {
    data: WordPressPage | null;
}

export default function ServicesIntro({ data }: ServicesIntroProps) {
    let content = "Todos nuestros tratamientos son realizados con amor por uno de nuestros especialistas para garantizar tu satisfacción.";

    if (data && data.gutenberg_structure) {
        // Find the first paragraph that is NOT inside a cover or complex block
        // In the JSON provided, it's the second top-level block
        const introParagraph = data.gutenberg_structure.find((block, index) =>
            index > 0 && block.type === "core/paragraph"
        );
        if (introParagraph) {
            content = introParagraph.content || content;
        }
    }

    return (
        <section className="py-20 px-8 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-[#a0a0a0] text-[18px] md:text-[22px] leading-relaxed font-light">
                    {content}
                </p>
            </div>
        </section>
    );
}
