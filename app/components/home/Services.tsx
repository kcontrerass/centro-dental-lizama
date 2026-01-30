"use client";

import Image from "next/image";

const services = [
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

// Double the services array to create an infinite scroll effect
const infiniteServices = [...services, ...services];

export default function Services() {
  return (
    <section className="bg-[#F4F7F6] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
      {/* Left Side: Info (Static) */}
      <div className="md:w-2/5 p-12 md:p-24 flex flex-col justify-center items-start z-20 bg-[#F4F7F6] relative">
        <h2 className="text-[48px] font-bold text-primary mb-2 leading-none">Servicios</h2>
        <p className="text-gray-400 text-[14px] mb-12 max-w-[280px] leading-relaxed font-light">
          Tratamientos especializados del más alto nivel.
        </p>

        <button className="flex items-center gap-2 bg-[#94D4BB] text-white px-7 py-3 rounded-full font-bold text-[14px] transition-all hover:brightness-105 active:scale-95 shadow-sm">
          Agendar cita
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
            <path d="M16 2V6M8 2V6M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 18l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
                <h3 className="text-white text-[18px] font-bold tracking-tight">{service.title}</h3>
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
            transform: translateX(calc(-320px * ${services.length}));
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
              transform: translateX(calc(-80vw * ${services.length}));
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
