"use client";

import { WordPressPage } from "@/lib/wordpress";
import { MapPin, MessageCircle, Instagram, Twitter, Linkedin, Youtube, Globe } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface ContactProps {
    data?: WordPressPage | null;
    language?: "espanol" | "ingles";
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.445L0 24l6.835-1.793a11.83 11.83 0 005.212 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Contact({ data = null, language = "espanol" }: ContactProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        "your-name": "",
        "your-email": "",
        "product-type": "",
        "your-phone": ""
    });

    const contactData = useMemo(() => {
        if (!data || !data.sections) return null;

        // Try to find the *Contact* section specifically by content
        let targetSection = data.sections.find(s =>
            s.type === 'content' &&
            s.blocks?.some((b: any) =>
                (b.type === 'core/paragraph' || b.type === 'core/heading') &&
                (b.content.toLowerCase().includes('contáctanos') || b.content.toLowerCase().includes('contact'))
            )
        );

        // Fallback: The contact data is usually in the last "content" section
        if (!targetSection) {
            const contentSections = data.sections.filter(s => s.type === "content");
            targetSection = contentSections[contentSections.length - 1];
        }

        if (!targetSection || !targetSection.blocks) return null;

        const paragraphs = targetSection.blocks
            .filter((b: any) => b.type === "core/paragraph")
            .map((b: any) => b.content)
            .filter((c: string) => c.length > 0);

        // Find the index of the title "Contáctanos" or "Contact Us"
        const titleIndex = paragraphs.findIndex((p: string) =>
            p.toLowerCase().includes("contáctanos") ||
            p.toLowerCase().includes("contact us")
        );

        // Slice paragraphs from the title onwards
        const baseParagraphs = titleIndex !== -1 ? paragraphs.slice(titleIndex) : paragraphs;

        // Find social links block
        let socialLinks: any[] = [];
        const socialLinksBlock = targetSection.blocks.find((b: any) => b.type === "core/social-links");
        if (socialLinksBlock && socialLinksBlock.blocks) {
            socialLinks = socialLinksBlock.blocks.map((b: any) => ({
                service: b.attributes?.service,
                url: b.attributes?.url
            }));
        }

        if (baseParagraphs.length < 3) return null;

        // Paragraphs: Title, Hours 1, Hours 2, Phone Group, Location Group
        return {
            title: baseParagraphs[0] || "Contáctanos",
            hours1: baseParagraphs[1] || "Lunes a viernes 08:00 - 05:00",
            hours2: baseParagraphs[2] || "Sábado y domingo 07:00 - 02:00",
            phones: baseParagraphs[3] || "+502 2337-2540 | +502 4151-5161",
            location: baseParagraphs[4] || "+502 4151-5161 | Ciudad de Guatemala",
            socialLinks
        };
    }, [data]);

    const info = contactData || {
        title: "Contáctanos",
        hours1: "Lunes a viernes 08:00 - 05:00",
        hours2: "Sábado y domingo 07:00 - 02:00",
        phones: "+502 2337-2540 | +502 4151-5161",
        location: "+502 4151-5161 | Ciudad de Guatemala",
        socialLinks: []
    };

    // Helper to get phone numbers from string
    const phoneNumbers = info.phones.split("|").map((p: string) => p.trim());
    const locationParts = info.location.split("|").map((p: string) => p.trim());
    const city = locationParts.length > 1 ? locationParts[1] : locationParts[0];
    const waPhone = locationParts[0].startsWith("+") ? locationParts[0] : phoneNumbers[1] || phoneNumbers[0];

    const getSocialIcon = (service: string) => {
        switch (service) {
            case 'instagram': return <Instagram size={24} />;
            case 'facebook': return (
                <Image
                    src="/face.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                />
            );
            case 'twitter': return <Twitter size={24} />;
            case 'linkedin': return <Linkedin size={24} />;
            case 'youtube': return <Youtube size={24} />;
            default: return <Globe size={24} />;
        }
    };

    const isEnglish = info?.title?.toLowerCase().includes("contact") && !info?.title?.toLowerCase().includes("contáctanos");

    const feedback = {
        espanol: {
            success: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
            error: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
            sending: "Enviando..."
        },
        ingles: {
            success: "Message sent successfully. We will contact you soon.",
            error: "There was an error sending the message. Please try again.",
            sending: "Sending..."
        }
    }[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const cf7Data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            cf7Data.append(key, value);
        });

        cf7Data.append("_wpcf7_unit_tag", "wpcf7-f341-p1-v1");

        try {
            const response = await fetch("https://centrodentallizamabackend.aumenta.do//wp-json/contact-form-7/v1/contact-forms/341/feedback", {
                method: "POST",
                body: cf7Data,
            });

            if (response.ok) {
                console.log(response)
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

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    return (
        <section className="py-24 bg-[#F2F6F5]" id="contacto">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-20 items-stretch">
                    {/* Left Side: Contact Info */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h2
                            className="text-[40px] md:text-[72px] font-bold mb-12 leading-none"
                            style={{ color: '#4fb0a2' }}
                        >
                            {info.title}
                        </h2>

                        <div className="space-y-6 text-[#555555] text-[18px] md:text-[20px] font-medium">
                            <div className="space-y-1">
                                <p>{info.hours1}</p>
                                <p>{info.hours2}</p>
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                                {phoneNumbers.map((phone: string, idx: number) => (
                                    <span key={idx} className="flex items-center gap-4">
                                        <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[#4fb0a2] transition-colors">
                                            {phone}
                                        </a>
                                        {idx < phoneNumbers.length - 1 && <span className="text-gray-300 font-light">|</span>}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-6 pt-2">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <WhatsAppIcon className="w-7 h-7 text-[#4fb0a2]" />
                                        <a href={`https://wa.me/${waPhone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#4fb0a2] font-bold">
                                            {waPhone}
                                        </a>
                                    </div>
                                    <span className="text-gray-300 font-light">|</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{city}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    {info.socialLinks && info.socialLinks.length > 0 ? (
                                        info.socialLinks.map((link: any, idx: number) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#4fb0a2] hover:opacity-80 transition-all hover:scale-110"
                                            >
                                                {getSocialIcon(link.service)}
                                            </a>
                                        ))
                                    ) : (
                                        <>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#4fb0a2] hover:opacity-80 transition-all hover:scale-110">
                                                <Instagram size={24} />
                                            </a>
                                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#4fb0a2] hover:opacity-80 transition-all hover:scale-110">
                                                <Image
                                                    src="/face.png"
                                                    alt="Facebook"
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="md:w-1/2 w-full px-8 md:p-12 ">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    name="your-name"
                                    value={formData["your-name"]}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder={language === "ingles" ? "Name" : "Nombre"}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div>
                                <input
                                    name="your-email"
                                    value={formData["your-email"]}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder={language === "ingles" ? "Email" : "Correo"}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div>
                                <select
                                    name="product-type"
                                    value={formData["product-type"]}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-black shadow-inner appearance-none"
                                >
                                    <option value="" className="text-black">{language === "ingles" ? "What type of product/service are you interested in?" : "Qué tipo de producto/servicio le interesa"}</option>
                                    <option value="Diseño de Sonrisa">{language === "ingles" ? "Smile Design" : "Diseño de Sonrisa"}</option>
                                    <option value="Ortodoncia">{language === "ingles" ? "Orthodontics" : "Ortodoncia"}</option>
                                    <option value="Alineadores">{language === "ingles" ? "Aligners" : "Alineadores"}</option>
                                    <option value="Examen Dental">{language === "ingles" ? "Dental Exam" : "Examen Dental"}</option>
                                    <option value="Implantes Dentales">{language === "ingles" ? "Dental Implants" : "Implantes Dentales"}</option>
                                    <option value="Endodoncia">{language === "ingles" ? "Endodontics" : "Endodoncia"}</option>
                                    <option value="Periodoncia">{language === "ingles" ? "Periodontics" : "Periodoncia"}</option>
                                    <option value="Corona Dental">{language === "ingles" ? "Dental Crown" : "Corona Dental"}</option>
                                    <option value="Carilla Dental">{language === "ingles" ? "Dental Veneer" : "Carilla Dental"}</option>
                                    <option value="Incrustación Dental">{language === "ingles" ? "Dental Inlay" : "Incrustación Dental"}</option>
                                    <option value="Prótesis Removible">{language === "ingles" ? "Removable Denture" : "Prótesis Removible"}</option>
                                    <option value="Odontopediatría">{language === "ingles" ? "Pediatric Dentistry" : "Odontopediatría"}</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    name="your-phone"
                                    value={formData["your-phone"]}
                                    onChange={handleInputChange}
                                    type="tel"
                                    placeholder={language === "ingles" ? "Phone" : "Teléfono"}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="bg-[#56B291] text-white px-14 py-4 rounded-full hover:bg-[#4EB99F] active:scale-95 disabled:bg-gray-400 transition-all font-bold text-[16px] shadow-lg shadow-primary/20"
                                >
                                    {status === "loading" ? feedback.sending : (language === "ingles" ? "Submit" : "Enviar")}
                                </button>
                            </div>

                            {status === "success" && (
                                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
                                    {feedback.success}
                                </div>
                            )}
                            {status === "error" && (
                                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm font-bold">
                                    {feedback.error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
