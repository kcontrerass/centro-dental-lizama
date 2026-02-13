import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutStats from "../components/about/AboutStats";
import AboutMain from "../components/about/AboutMain";
import AboutTeamSlider from "../components/about/AboutTeamSlider";
import { getAboutData, getHeaderData, getFooterData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function QuienesSomosPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [aboutData, headerData, footerData] = await Promise.all([
        getAboutData(language),
        getHeaderData(language),
        getFooterData(language)
    ]);

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <AboutHero data={aboutData} />
            <AboutStats data={aboutData} />
            <AboutMain data={aboutData} />
            <AboutTeamSlider data={aboutData} />
            <Footer data={footerData} />
        </main>
    );
}
