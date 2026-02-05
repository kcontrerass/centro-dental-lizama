import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TestimonialsHero from "../components/testimonials/TestimonialsHero";
import TestimonialsCases from "../components/testimonials/TestimonialsCases";
import Contact from "../components/home/Contact";

export default function TestimonialesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <TestimonialsHero />
            <TestimonialsCases />
            <Contact />
            <Footer />
        </main>
    );
}
