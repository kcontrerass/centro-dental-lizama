import { WordPressPage } from "@/lib/wordpress";
import { MapPin, MessageCircle, Instagram, Facebook, Twitter, Linkedin, Youtube, Globe } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface ContactProps {
    data?: WordPressPage | null;
    language?: "espanol" | "ingles";
}

export default function Contact({ data = null, language = "espanol" }: ContactProps) {
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

        // Find social links block
        let socialLinks: any[] = [];
        const socialLinksBlock = targetSection.blocks.find((b: any) => b.type === "core/social-links");
        if (socialLinksBlock && socialLinksBlock.blocks) {
            socialLinks = socialLinksBlock.blocks.map((b: any) => ({
                service: b.attributes?.service,
                url: b.attributes?.url
            }));
        }

        if (paragraphs.length < 3) return null;

        // Paragraphs: Title, Hours 1, Hours 2, Phone Group, Location Group
        return {
            title: paragraphs[0] || "Contáctanos",
            hours1: paragraphs[1] || "Lunes a viernes 08:00 - 05:00",
            hours2: paragraphs[2] || "Sábado y domingo 07:00 - 02:00",
            phones: paragraphs[3] || "+502 2337-2540 | +502 4151-5161",
            location: paragraphs[4] || "+502 4151-5161 | Ciudad de Guatemala",
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
            case 'facebook': return <Facebook size={24} />;
            case 'twitter': return <Twitter size={24} />;
            case 'linkedin': return <Linkedin size={24} />;
            case 'youtube': return <Youtube size={24} />;
            default: return <Globe size={24} />;
        }
    };

    const isEnglish = info?.title?.toLowerCase().includes("contact") && !info?.title?.toLowerCase().includes("contáctanos");

    return (
        <section className="py-24 bg-[#F2F6F5]" id="contacto">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-20 items-stretch">
                    {/* Left Side: Contact Info */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-[54px] font-bold text-primary mb-12 leading-none">{info.title}</h2>

                        <div className="space-y-8 text-gray-500 text-[14px] font-light">
                            <div className="space-y-1">
                                <p>{info.hours1}</p>
                                <p>{info.hours2}</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                {phoneNumbers.map((phone: string, idx: number) => (
                                    <span key={idx} className="flex items-center gap-4">
                                        <a href={`tel:${phone.replace(/[^0-9+]/g, "")} `} className="hover:text-primary transition-colors text-gray-600 font-medium">
                                            {phone}
                                        </a>
                                        {idx < phoneNumbers.length - 1 && <span className="text-gray-300">|</span>}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#94D4BB]/20 p-2 rounded-full">
                                            <MessageCircle size={18} className="text-[#3a5a40]" />
                                        </div>
                                        <a href={`https://wa.me/${waPhone.replace(/[^0-9+]/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary font-bold text-gray-600">
                                            {waPhone}
                                        </a >
                                    </div >
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#94D4BB]/20 p-2 rounded-full">
                                            <MapPin size={18} className="text-[#3a5a40]" />
                                        </div>
                                        <span className="font-bold text-gray-600">{city}</span>
                                    </div>
                                </div >

                                <div className="flex items-center gap-4 pt-6">
                                    {info.socialLinks && info.socialLinks.length > 0 ? (
                                        info.socialLinks.map((link: any, idx: number) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full text-[#3ea99e] hover:bg-[#94D4BB]/20 transition-all hover:scale-110"
                                            >
                                                {getSocialIcon(link.service)}
                                            </a>
                                        ))
                                    ) : (
                                        <>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full text-[#3ea99e] hover:bg-[#94D4BB]/20 transition-all hover:scale-110">
                                                <Instagram size={24} />
                                            </a>
                                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full text-[#3ea99e] hover:bg-[#94D4BB]/20 transition-all hover:scale-110">
                                                <Facebook size={24} />
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="md:w-1/2 w-full px-8 md:p-12 ">
                        <form className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    placeholder={language === "ingles" ? "Name" : "Nombre"}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder={language === "ingles" ? "Email" : "Correo"}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div>
                                <select
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-black shadow-inner appearance-none"
                                >
                                    <option value="" className="text-black">{language === "ingles" ? "What type of product are you interested in?" : "Qué tipo de producto le interesa"}</option>
                                    <option value="smile">{language === "ingles" ? "Smile Design" : "Diseño de Sonrisa"}</option>
                                    <option value="implants">{language === "ingles" ? "Dental Implants" : "Implantes Dentales"}</option>
                                    <option value="ortho">{language === "ingles" ? "Orthodontics" : "Ortodoncia"}</option>
                                    <option value="kids">{language === "ingles" ? "Children's Dentistry" : "Odontología Niños"}</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder={language === "ingles" ? "Phone" : "Teléfono"}
                                    required
                                    className="w-full px-8 py-4 rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-primary/20 text-[14px] text-gray-600 placeholder:text-black shadow-inner"
                                />
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="bg-[#56B291] text-white px-14 py-4 rounded-full hover:bg-primary-hover active:scale-95 transition-all font-bold text-[16px] shadow-lg shadow-primary/20"
                                >
                                    {language === "ingles" ? "Submit" : "Enviar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
