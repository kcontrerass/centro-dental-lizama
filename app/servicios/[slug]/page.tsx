import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AppointmentHero from "../../components/appointment/AppointmentHero";
import AppointmentInfo from "../../components/appointment/AppointmentInfo";
import AppointmentForm from "../../components/appointment/AppointmentForm";

import { getHeaderData, getFooterData, getServiceDetails } from "@/lib/wordpress";
import { cookies } from "next/headers";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ lang?: string }>;
};

export default async function ServiceDetailPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData, serviceData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language),
        getServiceDetails(language, slug)
    ]);

    if (!serviceData) {
        return (
            <main className="min-h-screen bg-white">
                <Header data={headerData} />
                <section className="pt-32 pb-20 px-8 text-center text-primary font-bold">
                    <h1 className="text-4xl uppercase">{lang === "en" ? "Service not found" : "Servicio no encontrado"}</h1>
                </section>
                <Footer data={footerData} />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <AppointmentHero data={serviceData} />
            <AppointmentInfo data={serviceData} />
            <AppointmentForm data={serviceData} language={language === "ingles" ? "ingles" : "espanol"} />
            <Footer data={footerData} />
        </main>
    );
}
