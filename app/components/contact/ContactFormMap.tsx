"use client";

import { useState } from "react";

interface ContactFormMapProps {
    language?: "espanol" | "ingles";
}

export default function ContactFormMap({ language = "espanol" }: ContactFormMapProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        "your-name": "",
        "your-email": "",
        "product-type": "",
        "your-phone": ""
    });

    const translations = {
        espanol: {
            name: "Nombre",
            email: "Correo",
            interest: "Qué tipo de servicio le interesa",
            smile: "Diseño de Sonrisa",
            orthodontics: "Ortodoncia",
            aligners: "Alineadores",
            exam: "Examen Dental",
            implants: "Implantes Dentales",
            endodontics: "Endodoncia",
            periodontics: "Periodoncia",
            crown: "Corona Dental",
            veneer: "Carilla Dental",
            inlay: "Incrustación Dental",
            denture: "Prótesis Removible",
            children: "Odontopediatría",
            phone: "Teléfono",
            submit: "Enviar",
            success: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
            error: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
            sending: "Enviando..."
        },
        ingles: {
            name: "Name",
            email: "Email",
            interest: "What type of service are you interested in?",
            smile: "Smile Design",
            orthodontics: "Orthodontics",
            aligners: "Aligners",
            exam: "Dental Exam",
            implants: "Dental Implants",
            endodontics: "Endodontics",
            periodontics: "Periodontics",
            crown: "Dental Crown",
            veneer: "Dental Veneer",
            inlay: "Dental Inlay",
            denture: "Removable Denture",
            children: "Pediatric Dentistry",
            phone: "Phone",
            submit: "Submit",
            success: "Message sent successfully. We will contact you soon.",
            error: "There was an error sending the message. Please try again.",
            sending: "Sending..."
        }
    };

    const t = translations[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const cf7Data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            cf7Data.append(key, value as string);
        });

        cf7Data.append("_wpcf7_unit_tag", "wpcf7-f341-p1-v1");

        try {
            const response = await fetch("https://centrodentallizamabackend.aumenta.do//wp-json/contact-form-7/v1/contact-forms/341/feedback", {
                method: "POST",
                body: cf7Data,
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    "your-name": "",
                    "your-email": "",
                    "product-type": "",
                    "your-phone": ""
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setStatus("error");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === "your-phone") {
            finalValue = value.replace(/[^0-9+]/g, "");
        }

        setFormData((prev: any) => ({ ...prev, [name]: finalValue }));
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div className="space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            name="your-name"
                            value={formData["your-name"]}
                            onChange={handleInputChange}
                            type="text"
                            placeholder={t.name}
                            required
                            className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-[#4fb0a2]/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                        />
                        <input
                            name="your-email"
                            value={formData["your-email"]}
                            onChange={handleInputChange}
                            type="email"
                            placeholder={t.email}
                            required
                            className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-[#4fb0a2]/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                        />
                        <select
                            name="product-type"
                            value={formData["product-type"]}
                            onChange={handleInputChange}
                            required
                            className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-[#4fb0a2]/20 text-[14px] text-black shadow-inner appearance-none bg-white"
                        >
                            <option value="">{t.interest}</option>
                            <option value="Diseño de Sonrisa">{t.smile}</option>
                            <option value="Ortodoncia">{t.orthodontics}</option>
                            <option value="Alineadores">{t.aligners}</option>
                            <option value="Examen Dental">{t.exam}</option>
                            <option value="Implantes Dentales">{t.implants}</option>
                            <option value="Endodoncia">{t.endodontics}</option>
                            <option value="Periodoncia">{t.periodontics}</option>
                            <option value="Corona Dental">{t.crown}</option>
                            <option value="Carilla Dental">{t.veneer}</option>
                            <option value="Incrustación Dental">{t.inlay}</option>
                            <option value="Prótesis Removible">{t.denture}</option>
                            <option value="Odontopediatría">{t.children}</option>
                        </select>
                        <input
                            name="your-phone"
                            value={formData["your-phone"]}
                            onChange={handleInputChange}
                            type="tel"
                            placeholder={t.phone}
                            required
                            className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-[#4fb0a2]/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                        />
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-[#56B291] text-white px-14 py-4 rounded-full hover:bg-[#4EB99F] active:scale-95 disabled:bg-gray-400 transition-all font-bold text-[16px] shadow-lg shadow-[#4fb0a2]/20"
                            >
                                {status === "loading" ? t.sending : t.submit}
                            </button>
                        </div>

                        {status === "success" && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
                                {t.success}
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm font-bold">
                                {t.error}
                            </div>
                        )}
                    </form>
                </div>

                {/* Map */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4452440915!2d-90.505541!3d14.593639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3ac83c6b22b%3A0xc3f3456789abcdef!2sCentro%20Dental%20Lizama!5e0!3m2!1ses!2sgt!4v1710311200000!5m2!1ses!2sgt"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
