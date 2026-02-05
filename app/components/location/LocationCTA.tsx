"use client";

import { Smile } from "lucide-react";

export default function LocationCTA() {
    return (
        <section className="bg-[#4fb0a2] py-16 px-8">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
                {/* Button */}
                <a
                    href="https://maps.app.goo.gl/..." // Placeholder for real Gmaps link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-transparent border-2 border-white/60 text-white px-10 py-3 rounded-full font-bold text-[16px] hover:bg-white/10 transition-all mb-6 uppercase tracking-wider"
                >
                    Visítanos <Smile className="w-6 h-6" /> Haz click aquí
                </a>

                {/* Address */}
                <p className="text-white text-[18px] md:text-[20px] font-medium leading-relaxed opacity-90">
                    23 avenida 17-18 zona 10, enfrente de Plaza Decorisima.
                </p>
            </div>
        </section>
    );
}
