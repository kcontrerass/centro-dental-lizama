"use client";

export default function AboutMain() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Boxed Title */}
                <div className="inline-block px-8 py-3 mb-10">
                    <h2 className="text-[36px] font-extrabold text-[#70bfa8] uppercase tracking-wide">
                        Quiénes somos
                    </h2>
                </div>

                {/* Description Text */}
                <p className="text-[20px] text-gray-400 leading-[1.6] font-medium max-w-5xl mx-auto px-4">
                    Somos un centro dental con más de 30 años de experiencia en Guatemala, contando con especialistas en todas las ramas de la odontología moderna para ofrecer tratamientos dentales de altos estándares de calidad, desde los más pequeños hasta los más grandes de la familia.
                </p>
            </div>
        </section>
    );
}
