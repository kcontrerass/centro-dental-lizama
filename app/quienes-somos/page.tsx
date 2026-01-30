import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutStats from "../components/about/AboutStats";
import AboutMain from "../components/about/AboutMain";
import AboutTeamSlider from "../components/about/AboutTeamSlider";
import { getAboutData } from "@/lib/wordpress";
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
    const aboutData = await getAboutData(language);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AboutHero data={aboutData} />
            <AboutStats />
            <AboutMain />
            <AboutTeamSlider />
            <Footer />
        </main>
    );
}
