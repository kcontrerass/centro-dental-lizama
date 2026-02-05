"use client";

import { MessageCircle, Instagram, Facebook, MapPin } from "lucide-react";

export default function ContactInfo() {
    return (
        <section className="bg-[#4fb0a2] py-16 px-8 text-white">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
                <h2 className="text-[42px] md:text-[56px] font-bold mb-8">Contáctanos</h2>

                {/* Schedule and Phones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10 text-[16px] md:text-[18px] font-light">
                    <div className="space-y-2">
                        <p>Lunes a viernes 08:00 – 05:00</p>
                        <p className="font-bold">+502 2337-2540    |    +502 4151-5161</p>
                    </div>
                    <div className="space-y-2">
                        <p>Sábado y domingo 07:00 – 02:00</p>
                        <p className="font-bold">+502 4151-5161</p>
                    </div>
                </div>

                {/* WhatsApp and Location */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-8 text-[18px] font-bold">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6" />
                        <span>+502 4151-5161</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6" />
                        <span>Ciudad de Guatemala</span>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:opacity-80 transition-opacity">
                        <Instagram className="w-8 h-8" />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                        <Facebook className="w-8 h-8" />
                    </a>
                </div>
            </div>
        </section>
    );
}
