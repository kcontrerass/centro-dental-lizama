"use client";

import Image from "next/image";

export default function Team() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center gap-20">
                    {/* Left Side: Team Image */}
                    <div className="md:w-1/2 relative">
                        <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-sm">
                            <Image
                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop"
                                alt="Dental Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="md:w-1/2 text-left">
                        <span className="text-gray-400 font-bold uppercase tracking-tight text-[13px] mb-2 block">Lorem ipsum</span>
                        <h2 className="text-[44px] font-bold text-gray-900 mb-4 leading-tight">
                            Conoce a nuestro equipo
                        </h2>
                        <p className="text-gray-400 text-[14px] mb-12 leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing
                        </p>

                        <div className="space-y-4 max-w-md border-t pt-10">
                            <h4 className="font-bold text-gray-800 text-[18px]">Dra. Ricardo Alvarado</h4>
                            <p className="text-gray-400 leading-relaxed text-[13px] font-light">
                                Somos un centro dental con calidad humana, entregados al servicio íntegro de cada uno de nuestros pacientes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
