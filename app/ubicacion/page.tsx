import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LocationHero from "../components/location/LocationHero";
import LocationMap from "../components/location/LocationMap";
import LocationCTA from "../components/location/LocationCTA";
import Contact from "../components/home/Contact";

export default function UbicacionPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <LocationHero />
            <LocationMap />
            <LocationCTA />
            <div className="bg-white">
                <Contact />
            </div>
            <Footer />
        </main>
    );
}
