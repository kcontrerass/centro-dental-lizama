import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LocationHero from "../components/location/LocationHero";
import LocationMap from "../components/location/LocationMap";
import LocationCTA from "../components/location/LocationCTA";
import Contact from "../components/home/Contact";

import { getHeaderData, getFooterData, getLocationData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function LocationPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData, locationData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language),
        getLocationData(language)
    ]);

    const contentBlocks = locationData?.sections?.find((s: any) => s.type === "content")?.blocks || [];

    // Mapping blocks based on the JSON structure
    const caption = contentBlocks[0]?.content;
    const wazeButton = contentBlocks[1]?.buttons?.[0];
    const address = contentBlocks[2]?.content;

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <LocationHero data={locationData} />
            <LocationMap caption={caption} />
            <LocationCTA button={wazeButton} address={address} />
            <Contact data={locationData} language={language === "ingles" ? "ingles" : "espanol"} />
            <Footer data={footerData} />
        </main>
    );
}
