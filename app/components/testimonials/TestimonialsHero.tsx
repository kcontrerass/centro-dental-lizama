import Image from "next/image";

interface TestimonialsHeroProps {
    data?: any;
}

export default function TestimonialsHero({ data }: TestimonialsHeroProps) {
    const structure = data?.gutenberg_structure || [];
    const coverBlock = structure.find((block: any) => block.type === "core/cover");

    const title = coverBlock?.blocks?.[0]?.content || "testimoniales";
    const backgroundImage = coverBlock?.attributes?.url || "/banner.png";

    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Content Overlay - Text on the right as requested */}
            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center justify-end px-8 md:pr-20">
                <div className="max-w-xl text-right">
                    <h1
                        className="text-[46px] md:text-[72px] font-bold text-[#70bfa8] leading-tight mb-2 drop-shadow-sm"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>
            </div>
        </section>
    );
}

