import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ServicesHero from "../components/services/ServicesHero";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesGrid from "../components/services/ServicesGrid";
import SecondaryServices from "../components/services/SecondaryServices";

export default function ServiciosPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <ServicesHero />
            <ServicesIntro />
            <ServicesGrid />
            <SecondaryServices />
            <Footer />
        </main>
    );
}
