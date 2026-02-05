import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlogHero from "../components/blog/BlogHero";
import BlogList from "../components/blog/BlogList";

export default function BlogListingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <BlogHero />
            <BlogList />
            <Footer />
        </main>
    );
}
