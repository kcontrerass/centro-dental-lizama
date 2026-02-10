"use client";

import { WordPressPage } from "@/lib/wordpress";
import Image from "next/image";
import { useMemo } from "react";

interface ServicesProps {
  data: WordPressPage | null;
}

export default function Services({ data }: ServicesProps) {
  // Process data to find services
  const servicesData = useMemo(() => {
    if (!data || !data.sections) return null;

    let sectionTitle = "Servicios";
    let sectionSubtitle = "Tratamientos especializados del más alto nivel.";
    let buttonText = "Agendar cita";
    let servicesList: any[] = [];

    // Find the section that contains the title (case-insensitive)
    const targetSection = data.sections.find(s =>
      s.blocks?.some((b: any) =>
        (b.type === "core/paragraph" || b.type === "core/heading") &&
        (
          b.content?.toLowerCase().includes("servicio") ||
          b.content?.toLowerCase().includes("services")
        )
      )
    );

    if (targetSection) {
      // Find all text blocks in this section
      const textBlocks = targetSection.blocks.filter((b: any) => b.type === "core/paragraph" || b.type === "core/heading");

      // The first one containing our keywords is the title
      const titleBlock = textBlocks.find((b: any) =>
        b.content?.toLowerCase().includes("servicio") ||
        b.content?.toLowerCase().includes("services")
      );
      if (titleBlock) {
        sectionTitle = titleBlock.content;

        // The one AFTER the title block is likely the subtitle
        const titleIdx = textBlocks.indexOf(titleBlock);
        if (titleIdx !== -1 && textBlocks[titleIdx + 1]) {
          sectionSubtitle = textBlocks[titleIdx + 1].content;
        }
      }

      // Recursive helper to find button block
      const findButtonBlock = (blocks: any[]): any => {
        for (const block of blocks) {
          // If we found the specific button type
          if (block.type === "core/button") {
            return block;
          }

          // If we found a buttons container
          if (block.type === "core/buttons") {
            if (block.buttons && block.buttons.length > 0) return block.buttons[0];
            if (block.blocks) {
              const innerButton = block.blocks.find((b: any) => b.type === "core/button");
              if (innerButton) return innerButton;
            }
          }

          // Recursively search children
          if (block.blocks) {
            const found = findButtonBlock(block.blocks);
            if (found) return found;
          }
        }
        return null;
      };

      // Extract button text: Ensure provided structure (VER TODAS -> Title -> Subtitle -> Agendar citaS) handled
      // We look for button AFTER the title block
      if (titleBlock) {
        const titleIdx = targetSection.blocks.indexOf(titleBlock);
        // Search only blocks appearing AFTER title
        const remainingBlocks = targetSection.blocks.slice(titleIdx + 1);
        const buttonBlock = findButtonBlock(remainingBlocks);

        if (buttonBlock && buttonBlock.text) {
          buttonText = buttonBlock.text;
        }
      } else if (targetSection.blocks) {
        // Fallback if title not found but section is somehow matched
        // Search specifically for button containing keywords
        const allButtons = targetSection.blocks.filter((b: any) => b.type === 'core/buttons' || b.type === 'core/button');

        let foundButton = null;

        // Use the helper on each potential container to extract text
        for (const b of allButtons) {
          const btn = findButtonBlock([b]);
          if (btn && btn.text) {
            const txt = btn.text.toLowerCase();
            if (txt.includes('agendar') || txt.includes('schedule') || txt.includes('book') || txt.includes('appointment') || txt.includes('contact') || txt.includes('consult')) {
              foundButton = btn;
              break;
            }
          }
        }

        if (foundButton) {
          buttonText = foundButton.text;
        } else if (allButtons.length > 0) {
          // Fallback: Just take the last button found in this section
          // (Usually "Agendar cita" is the last button in the Services block)
          const lastBtn = findButtonBlock([allButtons[allButtons.length - 1]]);
          if (lastBtn && lastBtn.text) {
            buttonText = lastBtn.text;
          }
        }
      }

      // Search for services in subsequent sections
      const titleIndex = data.sections.indexOf(targetSection);
      for (let i = titleIndex + 1; i < data.sections.length; i++) {
        const section = data.sections[i];
        if (section.type === "group" && section.attributes?.layout?.type === "flex") {
          section.blocks.forEach((groupBlock: any) => {
            const imageBlock = groupBlock.blocks?.find((b: any) => b.type === "core/image");
            const titleBlock = groupBlock.blocks?.find((b: any) => b.type === "core/paragraph");

            if (titleBlock) {
              servicesList.push({
                title: titleBlock.content,
                image: imageBlock?.url || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
              });
            }
          });
        } else if (section.type === "columns" || section.type === "content") {
          // Stop if we hit a different major section
          if (i > titleIndex + 1 && servicesList.length > 0) break;
        }
      }
    }

    return {
      title: sectionTitle,
      subtitle: sectionSubtitle,
      buttonText: buttonText,
      items: servicesList.length > 0 ? servicesList : null
    };
  }, [data]);

  const defaultServices = [
    {
      title: "Diseño de sonrisa",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Implantes dentales",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Limpieza Dental",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Blanqueamiento",
      image: "https://images.unsplash.com/photo-1445510491599-c391e8046a68?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  const currentServices = servicesData?.items || defaultServices;
  const sectionTitle = servicesData?.title || "Servicios";
  const sectionSubtitle = servicesData?.subtitle || "Tratamientos especializados del más alto nivel.";
  const buttonText = servicesData?.buttonText || "Agendar cita";
  const infiniteServices = [...currentServices, ...currentServices];

  return (
    <section className="bg-[#F4F7F6] overflow-hidden flex flex-col md:flex-row min-h-[500px]" id="servicios">
      {/* Left Side: Info (Static) */}
      <div className="md:w-2/5 p-12 md:p-24 flex flex-col justify-center items-start z-20 bg-[#F4F7F6] relative">
        <h2 className="text-[48px] font-bold text-primary mb-2 leading-none">{sectionTitle}</h2>
        <p className="text-gray-400 text-[14px] mb-12 max-w-[280px] leading-relaxed font-light">
          {sectionSubtitle}
        </p>

        <button className="flex items-center gap-3 bg-[#94D4BB] text-white px-7 py-3 rounded-full font-bold text-[14px] transition-all hover:brightness-105 active:scale-95 shadow-sm">
          {buttonText}
          <div className="flex items-center gap-1">
            <Image src="/Grupo 17.svg" alt="Icon 17" width={20} height={20} />
            <Image src="/Grupo 25.svg" alt="Icon 25" width={20} height={20} />
          </div>
        </button>
      </div>

      {/* Right Side: Image Gallery (Infinite Fluid Slider) */}
      <div className="md:w-3/5 overflow-hidden relative">
        <div className="flex animate-scroll hover:pause-scroll items-center gap-0 h-full">
          {infiniteServices.map((service, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[80vw] md:w-[320px] h-[580px] border-l-[3px] border-white first:border-l-0"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              {/* Overlay for text */}
              <div className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/40 to-transparent">
                <h3 className="text-white text-[18px] font-bold tracking-tight uppercase">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * ${currentServices.length}));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .pause-scroll:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          @keyframes scroll-mobile {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-80vw * ${currentServices.length}));
            }
          }
          .animate-scroll {
            animation: scroll-mobile 20s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
