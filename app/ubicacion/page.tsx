import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LocationHero from "../components/location/LocationHero";
import LocationMap from "../components/location/LocationMap";
import LocationCTA from "../components/location/LocationCTA";
import Contact from "../components/home/Contact";

import { getHeaderData, getFooterData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function UbicacionPage({
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
            <LocationHero />
            <LocationMap />
            <LocationCTA />
            <Contact />
            <Footer data={footerData} />
        </main>
    );
}
