import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutStats from "../components/about/AboutStats";
import AboutMain from "../components/about/AboutMain";
import AboutTeamSlider from "../components/about/AboutTeamSlider";

export default function QuienesSomosPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AboutHero />
            <AboutStats />
            <AboutMain />
            <AboutTeamSlider />
            <Footer />
        </main>
    );
}
