import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import Specialties from "./components/home/Specialties";
import Services from "./components/home/Services";
import Team from "./components/home/Team";
import Contact from "./components/home/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Specialties />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
