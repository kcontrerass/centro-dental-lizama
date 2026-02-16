import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ServicesHero from "../components/services/ServicesHero";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesGrid from "../components/services/ServicesGrid";
import SecondaryServices from "../components/services/SecondaryServices";

import { getHeaderData, getFooterData, getServicesData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function ServiciosPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData, servicesData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language),
        getServicesData(language)
    ]);

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <ServicesHero data={servicesData} />
            <ServicesIntro data={servicesData} />
            <ServicesGrid data={servicesData} />
            <SecondaryServices data={servicesData} />
            <Footer data={footerData} />
        </main>
    );
}
