import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Image from "next/image";
import { getHeaderData, getFooterData, getPostData } from "@/lib/wordpress";
import { cookies } from "next/headers";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ lang?: string }>;
};



export default async function BlogPostPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { lang: langParam } = await searchParams;
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value;

    const lang = langParam || langCookie || "es";
    const language = lang === "en" ? "ingles" : "espanol";

    const [headerData, footerData, postData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language),
        getPostData(slug)
    ]);

    if (!postData) {
        return (
            <main className="min-h-screen bg-white">
                <Header data={headerData} />
                <section className="pt-32 pb-20 px-8 text-center">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                </section>
                <Footer data={footerData} />
            </main>
        );
    }

    // Use the first image block as hero image
    const heroImageUrl: string =
        postData.gutenberg_structure?.find((b: any) => b.type === "core/image")?.url || "/servicios.png";

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />

            <section className="pt-40 pb-20 px-8">
                <div className="max-w-[800px] mx-auto">
                    <h1
                        className="text-[32px] md:text-[60px] font-bold text-[#70bfa8] mb-8 leading-tight"
                        dangerouslySetInnerHTML={{ __html: postData.title }}
                    />

                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: postData.content || "" }}
                    />
                </div>
            </section>

            <Footer data={footerData} />
        </main>
    );
}

