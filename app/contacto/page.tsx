import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactFormMap from "../components/contact/ContactFormMap";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <ContactHero />
            <ContactInfo />
            <ContactFormMap />
            <Footer />
        </main>
    );
}
