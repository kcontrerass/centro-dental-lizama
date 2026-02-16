"use client";

import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

interface AppointmentHeroProps {
    data: WordPressPage | null;
}

export default function AppointmentHero({ data }: AppointmentHeroProps) {
    let title = "Limpieza dental";
    let subtitle = "Todo comienza con una limpieza dental y evaluación completa";
    let backgroundImage = "/servicios.png";
    let buttonText = "Reservar cita";
    let buttonUrl = "";

    if (data && data.gutenberg_structure) {
        const coverBlock = data.gutenberg_structure.find(block => block.type === "core/cover");
        if (coverBlock) {
            backgroundImage = coverBlock.attributes?.url || coverBlock.url || backgroundImage;
            if (coverBlock.blocks && coverBlock.blocks.length > 0) {
                // First paragraph is title
                title = coverBlock.blocks[0].content || title;

                // Collect other paragraphs for subtitle
                const paragraphs = coverBlock.blocks.filter(b => b.type === "core/paragraph").slice(1);
                if (paragraphs.length > 0) {
                    subtitle = paragraphs.map(p => p.content).join(" ");
                }

                // Check for buttons
                const buttonsBlock = coverBlock.blocks.find(b => b.type === "core/buttons");
                if (buttonsBlock && buttonsBlock.buttons && buttonsBlock.buttons.length > 0) {
                    buttonText = buttonsBlock.buttons[0].text || buttonText;
                    buttonUrl = buttonsBlock.buttons[0].url || "";
                }
            }
        }
    }

    const handleButtonClick = (e: React.MouseEvent) => {
        const targetId = (buttonUrl && buttonUrl.startsWith('#')) ? buttonUrl.substring(1) : 'reserva';
        const element = document.getElementById(targetId);

        if (element) {
            if (buttonUrl && buttonUrl.startsWith('#')) {
                e.preventDefault();
                // Update URL without jump if possible, or just scroll
                window.history.pushState(null, '', buttonUrl);
            }
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full h-[350px] md:h-[600px] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center">
                <div className="w-full md:w-1/2 px-8 md:pl-20 mt-12 md:mt-0">
                    <div className="max-w-xl">
                        <h1 className="text-[56px] md:text-[60px] font-bold text-[#70bfa8] leading-tight mb-2 uppercase">
                            {title}
                        </h1>
                        <p className="text-[18px] md:text-[22px] text-[#70bfa8] font-medium leading-relaxed mb-8 max-w-[400px]">
                            {subtitle}
                        </p>
                        {buttonUrl && !buttonUrl.startsWith('#') ? (
                            <Link
                                href={buttonUrl}
                                className="inline-block bg-[#70bfa8] text-white px-10 py-4 rounded-full font-bold text-[16px] hover:bg-[#5da691] transition-colors"
                            >
                                {buttonText}
                            </Link>
                        ) : (
                            <button
                                onClick={handleButtonClick}
                                className="bg-[#70bfa8] text-white px-10 py-4 rounded-full font-bold text-[16px] hover:bg-[#5da691] transition-colors"
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
