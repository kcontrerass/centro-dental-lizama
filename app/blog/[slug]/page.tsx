import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Contact from "../../components/home/Contact";
import Image from "next/image";

const blogPosts = [
    {
        slug: "lorem-ipsum-1",
        title: "Lorem Ipsum 1",
        content: "Detailed content for Lorem Ipsum 1...",
        image: "/servicios.png"
    },
    {
        slug: "lorem-ipsum-2",
        title: "Lorem Ipsum 2",
        content: "Detailed content for Lorem Ipsum 2...",
        image: "/banner.png"
    },
    {
        slug: "lorem-ipsum-3",
        title: "Lorem Ipsum 3",
        content: "Detailed content for Lorem Ipsum 3...",
        image: "/servicios.png"
    },
    {
        slug: "lorem-ipsum-4",
        title: "Lorem Ipsum 4",
        content: "Detailed content for Lorem Ipsum 4...",
        image: "/banner.png"
    }
];

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

import { getHeaderData, getFooterData } from "@/lib/wordpress";
import { cookies } from "next/headers";

// ... blogPosts and generateStaticParams remain unchanged ...

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

    const [headerData, footerData] = await Promise.all([
        getHeaderData(language),
        getFooterData(language)
    ]);

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <main className="min-h-screen bg-white">
            <Header data={headerData} />
            {/* ... rest of the component remains unchanged ... */}

            <section className="pt-32 pb-20 px-8">
                <div className="max-w-[800px] mx-auto">
                    <h1 className="text-[48px] md:text-[60px] font-bold text-[#70bfa8] mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-500 font-light leading-relaxed">
                        <p>
                            Sed risus pretium quam vulputate dignissim suspendisse in est. Nibh venenatis cras sed felis eget velit aliquet sagittis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida.
                        </p>
                        <p>
                            Ullamcorper malesuada fames ac turpis egestas integer eget aliquet. Quis lectus nulla at volutpat diam ut venenatis tellus. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Lectus arcu bibendum at varius vel pharetra vel turpis nunc.
                        </p>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer data={footerData} />
        </main>
    );
}
