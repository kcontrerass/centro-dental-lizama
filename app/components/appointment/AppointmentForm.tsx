"use client";

import { WordPressPage } from "@/lib/wordpress";
import { useState } from "react";
import Image from "next/image";

interface AppointmentFormProps {
    data: WordPressPage | null;
    language?: "espanol" | "ingles";
}

export default function AppointmentForm({ data, language = "espanol" }: AppointmentFormProps) {
    let title = language === "ingles" ? "Book your appointment" : "Reserva tu cita";
    let image = "https://centrodentallizamabackend.aumenta.do/wp-content/uploads/2026/02/dental-imagen-1024x683.jpg";

    const translations = {
        espanol: {
            name: "Nombre",
            phone: "Teléfono",
            dentist: "Selecciona a tu dentista",
            service: "Tipo de servicio",
            date: "01/02/2025",
            time: "Selección horario",
            submit: "Reserva ahora"
        },
        ingles: {
            name: "Name",
            phone: "Phone",
            dentist: "Select your dentist",
            service: "Service type",
            date: "MM/DD/YYYY",
            time: "Select time",
            submit: "Book now"
        }
    };

    const t = translations[language];

    if (data && data.gutenberg_structure) {
        const columnsBlocks = data.gutenberg_structure.filter(block => block.type === "core/columns");
        if (columnsBlocks.length >= 3) {
            const formColumns = columnsBlocks[2];
            if (formColumns.columns) {
                formColumns.columns.forEach((col: any) => {
                    const paragraph = col.blocks?.find((b: any) => b.type === "core/paragraph");
                    if (paragraph) {
                        title = paragraph.content || title;
                    }
                    const imageBlock = col.blocks?.find((b: any) => b.type === "core/image");
                    if (imageBlock) {
                        image = imageBlock.url || imageBlock.attributes?.url || image;
                    }
                });
            }
        }
    }
    return (
        <section id="reserva" className="w-full bg-white border-t border-b border-gray-100 min-h-auto md:min-h-[600px] flex flex-col md:flex-row items-stretch">
            {/* Form Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 lg:p-24 bg-[#F8FBFA]">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl md:text-[60px] font-bold text-[#4EB99F] mb-8 md:mb-12 leading-tight">
                        {title}
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder={t.name}
                                required
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="tel"
                                placeholder={t.phone}
                                required
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select required className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium">
                                    <option value="">{t.dentist}</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select required className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium">
                                    <option value="">{t.service}</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <input
                                type="date"
                                placeholder={t.date}
                                required
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select required className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium">
                                    <option value="">{t.time}</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full mt-6">
                            <button
                                type="submit"
                                className="bg-[#88D4C0] hover:bg-[#4EB99F] text-white px-10 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105"
                            >
                                {t.submit}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Side - Hidden on mobile for better flow */}
            <div className="hidden md:block w-full md:w-1/2 relative min-h-[400px]">
                <Image
                    src={image}
                    alt="Dentista trabajando"
                    fill
                    className="object-cover"
                />
            </div>
        </section>
    );
}
