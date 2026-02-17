import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Contact from "../../components/home/Contact";
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

    // Extract image and title
    const imageBlock = postData.gutenberg_structure?.find((block: any) => block.type === "core/image");
    const imageUrl = imageBlock?.url || "/servicios.png";

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />

            <section className="pt-40 pb-20 px-8">
                <div className="max-w-[800px] mx-auto">
                    <h1
                        className="text-[48px] md:text-[60px] font-bold text-[#70bfa8] mb-8 leading-tight"
                        dangerouslySetInnerHTML={{ __html: postData.title }}
                    />

                    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
                        <Image
                            src={imageUrl}
                            alt={postData.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-500 font-light leading-relaxed">
                        {postData.gutenberg_structure?.map((block: any, index: number) => {
                            if (block.type === "core/paragraph") {
                                return (
                                    <p
                                        key={index}
                                        className="mb-6"
                                        dangerouslySetInnerHTML={{ __html: block.content }}
                                    />
                                );
                            }
                            if (block.type === "core/heading") {
                                return (
                                    <h2
                                        key={index}
                                        className="text-2xl font-bold text-[#70bfa8] mt-10 mb-6"
                                        dangerouslySetInnerHTML={{ __html: block.content }}
                                    />
                                );
                            }
                            // Add more block types if needed
                            return null;
                        })}
                    </div>
                </div>
            </section>

            <Footer data={footerData} />
        </main>
    );
}

