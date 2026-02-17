import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlogHero from "../components/blog/BlogHero";
import BlogList from "../components/blog/BlogList";

import { getHeaderData, getFooterData, getBlogData } from "@/lib/wordpress";
import { cookies } from "next/headers";

export default async function BlogListingPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData, blogData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language),
        getBlogData(language)
    ]);

    // Extract cover data
    const coverBlock = blogData?.gutenberg_structure?.find((block: any) => block.type === "core/cover");
    const heroTitle = coverBlock?.blocks?.[0]?.content || "Blog";
    const heroSubtitle = coverBlock?.blocks?.slice(1).map((b: any) => b.content).join(" ") || "";
    const heroImage = coverBlock?.attributes?.url || "/banner.png";

    // Extract posts
    const latestPostsBlock = blogData?.gutenberg_structure?.find((block: any) => block.type === "core/latest-posts");
    const posts = (latestPostsBlock as any)?.posts || [];

    // Extract description from the paragraphs after cover but before latest-posts
    const introBlocks = blogData?.gutenberg_structure?.filter((block: any, index: number) =>
        block.type === "core/paragraph" && index > 0
    );
    const introText = introBlocks?.map((b: any) => b.content).join("<br/>") || "Nuestro blog";

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            <BlogHero title={heroTitle} subtitle={heroSubtitle} backgroundImage={heroImage} />
            <BlogList posts={posts} introText={introText} />
            <Footer data={footerData} />
        </main>
    );
}
