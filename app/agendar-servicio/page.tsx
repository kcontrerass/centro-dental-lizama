import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AppointmentHero from "../components/appointment/AppointmentHero";
import AppointmentInfo from "../components/appointment/AppointmentInfo";
import AppointmentForm from "../components/appointment/AppointmentForm";

import { getHeaderData, getFooterData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function AgendarServicioPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language)
    ]);

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <AppointmentHero />
            <AppointmentInfo />
            <AppointmentForm />
            <Footer data={footerData} />
        </main>
    );
}
