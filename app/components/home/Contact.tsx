"use client";

import { MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-24 bg-[#F2F6F5]">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-20 items-stretch">
                    {/* Left Side: Contact Info */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-[54px] font-bold text-primary mb-12 leading-none">Contáctanos</h2>

                        <div className="space-y-8 text-gray-500 text-[14px] font-light">
                            <div className="space-y-1">
                                <p>Lunes a viernes 08:00 - 05:00</p>
                                <p>Sábado y domingo 07:00 - 02:00</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <a href="tel:+50223372540" className="hover:text-primary transition-colors text-gray-600 font-medium">+502 2337-2540</a>
                                <span className="text-gray-300">|</span>
                                <a href="tel:+50241515161" className="hover:text-primary transition-colors text-gray-600 font-medium">+502 4151-5161</a>
                            </div>

                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#94D4BB]/20 p-2 rounded-full">
                                            <MessageCircle size={18} className="text-[#3a5a40]" />
                                        </div>
                                        <a href="https://wa.me/50241515161" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-bold text-gray-600">
                                            +502 4151-5161
                                        </a>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#94D4BB]/20 p-2 rounded-full">
                                            <MapPin size={18} className="text-[#3a5a40]" />
                                        </div>
                                        <span className="font-bold text-gray-600">Ciudad de Guatemala</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-6">
                                    <a href="#" className="p-3 rounded-full  text-primary hover:scale-110 transition-transform">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="#" className="p-3  rounded-full  text-primary hover:scale-110 transition-transform">
                                        <Facebook size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="md:w-1/2 w-full  p-8 md:p-12 ">
                        <form className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Correo"
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div>
                                <select
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-black shadow-inner appearance-none"
                                >
                                    <option className="text-black">Qué tipo de producto le interesa</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Teléfono"
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="bg-[#56B291] text-white px-14 py-4 rounded-full hover:bg-primary-hover active:scale-95 transition-all font-bold text-[16px] shadow-lg shadow-primary/20"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
