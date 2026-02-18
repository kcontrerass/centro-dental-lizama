import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactFormMap from "../components/contact/ContactFormMap";

import { getHeaderData, getFooterData, getContactData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData, contactData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language),
        getContactData(language)
    ]);

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <ContactHero data={contactData} />
            <ContactInfo data={contactData} />
            <ContactFormMap language={language === "ingles" ? "ingles" : "espanol"} />
            <Footer data={footerData} />
        </main>
    );
}
