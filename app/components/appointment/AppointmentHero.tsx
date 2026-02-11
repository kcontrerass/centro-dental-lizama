import Image from "next/image";
import Link from "next/link";

export default function AppointmentHero() {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner-quienes-somos.png"
                    alt="Dental cleaning banner"
                    fill
                    className="object-cover object-right md:object-center"
                    priority
                />
                <div className="absolute from-white/95 via-white/80 md:via-white/50 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className=" md:px-30 relative z-10">
                <div className="max-w-2xl px-4 md:px-0">
                    <h1 className="text-3xl md:text-6xl font-bold text-[#4EB99F] leading-tight mb-4 md:mb-6 drop-shadow-sm">
                        Limpieza dental
                    </h1>
                    <p className="text-lg md:text-3xl text-[#4EB99F] font-light mb-8 md:mb-12 max-w-lg leading-snug">
                        Todo comienza con una limpieza dental y evaluación completa.
                    </p>
                    <Link
                        href="#reserva"
                        className="inline-block bg-[#88D4C0] hover:bg-[#4EB99F] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                        Reserva cita
                    </Link>
                </div>
            </div>
        </section>
    );
}
