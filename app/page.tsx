import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import Specialties from "./components/home/Specialties";
import Services from "./components/home/Services";
import Team from "./components/home/Team";
import Contact from "./components/home/Contact";
import { getHomeData } from "@/lib/wordpress";
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
  const homeData = await getHomeData(language);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero key={lang} data={homeData} />
        <Specialties />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
