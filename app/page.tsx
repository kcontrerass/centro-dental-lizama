import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import Specialties from "./components/home/Specialties";
import Services from "./components/home/Services";
import Team from "./components/home/Team";
import Contact from "./components/home/Contact";
import { getHomeData, getHeaderData, getFooterData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: langParam } = await searchParams;
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;

  const lang = langParam || langCookie || "es";
  const language = lang === "en" ? "ingles" : "espanol";

  const [homeData, headerData, footerData] = await Promise.all([
    getHomeData(language),
    getHeaderData(language),
    getFooterData(language)
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header data={headerData} />
      <main>
        <Hero key={lang} data={homeData} />
        <Specialties data={homeData} />
        <Services data={homeData} />
        <Team data={homeData} />
        <Contact data={homeData} language={language === "ingles" ? "ingles" : "espanol"} />
      </main>
      <Footer data={footerData} />
    </div>
  );
}
