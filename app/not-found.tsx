import Link from "next/link";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { getHeaderData, getFooterData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function NotFound() {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;
    const lang = langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language)
    ]);

    const t = {
        es: {
            title: "404",
            subtitle: "Página no encontrada",
            description: "Lo sentimos, la página que estás buscando no existe o ha sido movida.",
            button: "Volver al inicio"
        },
        en: {
            title: "404",
            subtitle: "Page Not Found",
            description: "Sorry, the page you are looking for does not exist or has been moved.",
            button: "Back to Home"
        }
    }[lang as "es" | "en"] || t.es;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header data={headerData} />
            <main className="flex-grow flex items-center justify-center px-6 py-24 md:py-32">
                <div className="text-center max-w-2xl">
                    <h1 className="text-9xl font-bold text-primary opacity-10 mb-[-60px] md:mb-[-100px] select-none">
                        {t.title}
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 relative">
                        {t.subtitle}
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl mb-10">
                        {t.description}
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        {t.button}
                    </Link>
                </div>
            </main>
            <Footer data={footerData} />
        </div>
    );
}
