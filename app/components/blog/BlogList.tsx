"use client";

import Image from "next/image";
import Link from "next/link";

const blogPosts = [
    {
        slug: "lorem-ipsum-1",
        title: "Lorem Ipsum",
        category: "Lorem Ipsum",
        date: "23",
        month: "enero",
        description: "Lorem ipsum is simply dummy text of the printing",
        content: "Sed risus pretium quam vulputate dignissim suspendisse in est. Nibh venenatis cras sed felis eget velit aliquet sagittis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida.",
        image: "/servicios.png"
    },
    {
        slug: "lorem-ipsum-2",
        title: "Lorem Ipsum",
        category: "Lorem Ipsum",
        date: "24",
        month: "enero",
        description: "Lorem ipsum is simply dummy text of the printing",
        content: "Sed risus pretium quam vulputate dignissim suspendisse in est. Nibh venenatis cras sed felis eget velit aliquet sagittis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida.",
        image: "/banner.png"
    },
    {
        slug: "lorem-ipsum-3",
        title: "Lorem Ipsum",
        category: "Lorem Ipsum",
        date: "23",
        month: "enero",
        description: "Lorem ipsum is simply dummy text of the printing",
        content: "Sed risus pretium quam vulputate dignissim suspendisse in est. Nibh venenatis cras sed felis eget velit aliquet sagittis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida.",
        image: "/servicios.png"
    },
    {
        slug: "lorem-ipsum-4",
        title: "Lorem Ipsum",
        category: "Lorem Ipsum",
        date: "24",
        month: "enero",
        description: "Lorem ipsum is simply dummy text of the printing",
        content: "Sed risus pretium quam vulputate dignissim suspendisse in est. Nibh venenatis cras sed felis eget velit aliquet sagittis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida.",
        image: "/banner.png"
    }
];

export default function BlogList() {
    return (
        <section className="bg-white">
            {/* Header Intro Text Wrapper */}
            <div className="py-20 px-8 border-b border-gray-50">
                <div className="max-w-[1000px] mx-auto text-center mb-10">
                    <p className="text-gray-400 text-[18px] leading-relaxed font-light italic max-w-4xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi enim ad minim veniam, qui laore nostrud ctetur adipiscing elit, sed do eiusmod exerci tation wisi enim met cins.
                    </p>
                </div>
            </div>

            {/* Blog Items - Alternating backgrounds */}
            <div className="flex flex-col">
                {blogPosts.map((post, index) => {
                    const isDark = index % 2 !== 0;
                    return (
                        <div key={index} className={`w-full py-24 px-8 ${isDark ? 'bg-[#f6f6f6]' : 'bg-white'}`}>
                            <div className="max-w-[1000px] mx-auto">
                                <div className="flex flex-col gap-10">
                                    {/* Image Container and Floating Date */}
                                    <div className="relative w-full aspect-[16/8] shadow-sm">
                                        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100/10">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Date Badge */}
                                        <div className="absolute top-6 -right-6 md:-right-10 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl border border-gray-100 z-10 transition-transform hover:scale-105">
                                            <span className="text-[32px] font-bold text-[#70bfa8] leading-none">{post.date}</span>
                                            <span className="text-[14px] font-bold text-gray-500 uppercase tracking-tight">{post.month}</span>
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="space-y-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="space-y-1">
                                                <p className={`text-[12px] font-bold uppercase tracking-widest text-[#a0a0a0]`}>
                                                    {post.category}
                                                </p>
                                                <Link href={`/blog/${post.slug}`}>
                                                    <h2 className={`text-[36px] md:text-[45px] font-bold leading-tight hover:opacity-80 transition-opacity  text-[#70bfa8]`}>
                                                        {post.title}
                                                    </h2>
                                                </Link>
                                                <p className={`text-[15px] font-light text-gray-400`}>
                                                    {post.description}
                                                </p>
                                            </div>

                                            {/* Category Pill Button */}
                                            <button className={`px-10 py-3 bg-[#70bfa8] rounded-full font-bold text-[14px] transition-all hover:brightness-105 self-start md:self-center shadow-md  text-white`}>
                                                {post.category}
                                            </button>
                                        </div>

                                        {/* Body Text Snippet */}
                                        <p className={`text-[17px] leading-[1.8] font-light max-w-none text-gray-500`}>
                                            {post.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
