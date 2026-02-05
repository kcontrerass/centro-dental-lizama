"use client";

import Image from "next/image";

export default function LocationMap() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-8">
                {/* Map Container */}
                <div className="relative w-full aspect-[2/1] bg-gray-100 rounded-3xl overflow-hidden  mb-12 border-4 border-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1930.2227230495!2d-90.50554100000001!3d14.5936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3ac83c6b22b%3A0xc3f3456789abcdef!2sCentro%20Dental%20Lizama!5e0!3m2!1ses!2sgt!4v1710311200000!5m2!1ses!2sgt"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>

                {/* Caption */}
                <div className="text-center">
                    <p className="text-[#a0a0a0] text-[18px] md:text-[22px] font-light italic">
                        Ubicados en la zona médica más importante de Guatemala
                    </p>
                </div>
            </div>
        </section>
    );
}
