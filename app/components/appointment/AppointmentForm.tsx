"use client";

import { WordPressPage } from "@/lib/wordpress";
import { useState, useEffect } from "react";
import Image from "next/image";

interface AppointmentFormProps {
    data: WordPressPage | null;
    language?: "espanol" | "ingles";
}

export default function AppointmentForm({ data, language = "espanol" }: AppointmentFormProps) {
    let title = language === "ingles" ? "Book your appointment" : "Reserva tu cita";
    let image = "https://centrodentallizamabackend.aumenta.do/wp-content/uploads/2026/02/dental-imagen-1024x683.jpg";

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        "your-name": "",
        "your-phone": "",
        "dentist": "",
        "service": "",
        "appointment-date": "",
        "appointment-time": ""
    });

    // Auto-select service based on page title
    useEffect(() => {
        if (data?.title) {
            const pageTitle = data.title.toLowerCase().trim();
            const normalizedPageTitle = pageTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

            // Find match in either Spanish or English lists
            const esOptions = translations.espanol.serviceOptions;
            const enOptions = translations.ingles.serviceOptions;

            let matchIndex = esOptions.findIndex(opt => {
                const normalizedOpt = opt.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
                return normalizedPageTitle.includes(normalizedOpt) || normalizedOpt.includes(normalizedPageTitle);
            });

            if (matchIndex === -1) {
                matchIndex = enOptions.findIndex(opt => {
                    const normalizedOpt = opt.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
                    return normalizedPageTitle.includes(normalizedOpt) || normalizedOpt.includes(normalizedPageTitle);
                });
            }

            if (matchIndex !== -1) {
                setFormData(prev => ({
                    ...prev,
                    service: esOptions[matchIndex] // Always use Spanish value for CF7
                }));
            }
        }
    }, [data, language]);

    const translations = {
        espanol: {
            name: "Nombre",
            phone: "Teléfono",
            dentist: "Selecciona a tu dentista",
            service: "Tipo de servicio",
            date: "01/02/2025",
            dateLabel: "Ingresa la fecha",
            time: "Selección horario",
            submit: "Reserva ahora",
            success: "¡Cita reservada con éxito!",
            error: "Hubo un error al reservar tu cita. Por favor, inténtalo de nuevo.",
            sending: "Enviando...",
            dentistOptions: ["Dr. López", "Dr. García", "Dr. Martínez"],
            serviceOptions: [
                "Diseño de Sonrisa",
                "Ortodoncia",
                "Alineadores",
                "Examen Dental",
                "Implantes Dentales",
                "Endodoncia",
                "Periodoncia (Tratamiento de encías)",
                "Corona Dental",
                "Carilla Dental",
                "Incrustación Dental",
                "Prótesis Removible",
                "Odontopediatría"
            ],
            timeOptions: [
                "08:00 AM",
                "09:00 AM",
                "10:00 AM",
                "11:00 AM",
                "02:00 PM",
                "03:00 PM",
                "04:00 PM"
            ]
        },
        ingles: {
            name: "Name",
            phone: "Phone",
            dentist: "Select your dentist",
            service: "Service type",
            date: "MM/DD/YYYY",
            dateLabel: "Enter the date",
            time: "Select time",
            submit: "Book now",
            success: "Appointment booked successfully!",
            error: "There was an error booking your appointment. Please try again.",
            sending: "Sending...",
            dentistOptions: ["Dr. López", "Dr. García", "Dr. Martínez"],
            serviceOptions: [
                "Smile Design",
                "Orthodontics",
                "Aligners",
                "Dental Exam",
                "Dental Implants",
                "Endodontics",
                "Periodontics (Gum Treatment)",
                "Dental Crown",
                "Dental Veneer",
                "Dental Inlay",
                "Removable Denture",
                "Pediatric Dentistry"
            ],
            timeOptions: [
                "08:00 AM",
                "09:00 AM",
                "10:00 AM",
                "11:00 AM",
                "02:00 PM",
                "03:00 PM",
                "04:00 PM"
            ]
        }
    };

    const t = translations[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const cf7Data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            cf7Data.append(key, value);
        });

        cf7Data.append("_wpcf7_unit_tag", "wpcf7-f340-p1-v1"); // Typical CF7 requirement

        try {
            const response = await fetch("https://centrodentallizamabackend.aumenta.do//wp-json/contact-form-7/v1/contact-forms/340/feedback", {
                method: "POST",
                body: cf7Data,
            });

            const result = await response.json();

            if (response.ok && result.status === "mail_sent") {
                setStatus("success");
                setFormData({
                    "your-name": "",
                    "your-phone": "",
                    "dentist": "",
                    "service": "",
                    "appointment-date": "",
                    "appointment-time": ""
                });
            } else {
                console.error("Appointment Form CF7 Error:", result);
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === "your-phone") {
            finalValue = value.replace(/[^0-9+]/g, "");
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    if (data && data.gutenberg_structure) {
        // Find the columns block that likely contains the form (has "Book" or "Reserva")
        const formColumns = data.gutenberg_structure.find(block => {
            if (block.type !== "core/columns" || !block.columns) return false;
            return block.columns.some((col: any) =>
                col.blocks?.some((b: any) =>
                    b.type === "core/paragraph" &&
                    (b.content?.toLowerCase().includes("book") || b.content?.toLowerCase().includes("reserva"))
                )
            );
        });

        if (formColumns && formColumns.columns) {
            formColumns.columns.forEach((col: any) => {
                const paragraph = col.blocks?.find((b: any) =>
                    b.type === "core/paragraph" &&
                    (b.content?.toLowerCase().includes("book") || b.content?.toLowerCase().includes("reserva"))
                );
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
    return (
        <section id="reserva" className="w-full bg-white border-t border-b border-gray-100 min-h-auto md:min-h-[600px] flex flex-col md:flex-row items-stretch">
            {/* Form Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 lg:p-24 bg-[#F8FBFA]">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl md:text-[60px] font-bold text-[#4EB99F] mb-8 md:mb-12 leading-tight">
                        {title}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="col-span-1">
                            <input
                                name="your-name"
                                value={formData["your-name"]}
                                onChange={handleInputChange}
                                type="text"
                                placeholder={t.name}
                                required
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                name="your-phone"
                                value={formData["your-phone"]}
                                onChange={handleInputChange}
                                type="tel"
                                placeholder={t.phone}
                                required
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select
                                    name="dentist"
                                    value={formData["dentist"]}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium"
                                >
                                    <option value="">{t.dentist}</option>
                                    {t.dentistOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select
                                    name="service"
                                    value={formData["service"]}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium"
                                >
                                    <option value="">{t.service}</option>
                                    {translations.espanol.serviceOptions.map((optEs, index) => {
                                        const optEn = translations.ingles.serviceOptions[index];
                                        const label = language === "ingles" ? optEn : optEs;
                                        return (
                                            <option key={optEs} value={optEs}>
                                                {label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">

                            <input
                                name="appointment-date"
                                value={formData["appointment-date"]}
                                onChange={handleInputChange}
                                type="date"
                                required
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 font-medium appearance-none block min-h-[48px]"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select
                                    name="appointment-time"
                                    value={formData["appointment-time"]}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium"
                                >
                                    <option value="">{t.time}</option>
                                    {t.timeOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full mt-6">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-[#88D4C0] hover:bg-[#4EB99F] disabled:bg-gray-400 text-white px-10 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105"
                            >
                                {status === "loading" ? t.sending : t.submit}
                            </button>
                        </div>

                        {status === "success" && (
                            <div className="col-span-full mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
                                {t.success}
                            </div>
                        )}
                        {status === "error" && (
                            <div className="col-span-full mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm font-bold">
                                {t.error}
                            </div>
                        )}
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
