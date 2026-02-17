"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogPost {
    id: number;
    title: string;
    url: string;
    date: string;
    content: any[];
    date_formatted: string;
}

interface BlogListProps {
    posts: BlogPost[];
    introText?: string;
}

export default function BlogList({ posts = [], introText = "" }: BlogListProps) {
    return (
        <section className="bg-white">
            {/* Header Intro Text Wrapper */}
            <div className="py-20 px-8 border-b border-gray-50">
                <div className="max-w-[1000px] mx-auto text-center mb-10">
                    <p
                        className="text-gray-400 text-[18px] leading-relaxed font-light italic max-w-4xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: introText }}
                    />
                </div>
            </div>

            {/* Blog Items - Alternating backgrounds */}
            <div className="flex flex-col">
                {posts.map((post, index) => {
                    const isDark = index % 2 !== 0;

                    // Extract image and paragraph from content
                    const imageBlock = post.content?.find(block => block.type === "core/image");
                    const paragraphBlock = post.content?.find(block => block.type === "core/paragraph");

                    const imageUrl = imageBlock?.url || "/servicios.png";
                    const excerpt = paragraphBlock?.content || "";

                    // Parse date "febrero 16, 2026" or "16 de febrero de 2026"
                    // Simplest way for now: split by spaces or just use the raw date for more accuracy
                    const dateParts = post.date_formatted.split(" ");
                    let day = "";
                    let month = "";

                    if (dateParts.length >= 2) {
                        // Assuming format like "febrero 16, 2026"
                        month = dateParts[0].substring(0, 3);
                        day = dateParts[1].replace(",", "");
                    }

                    // Get slug from URL
                    const slug = post.url.split("/").filter(Boolean).pop() || post.id.toString();

                    return (
                        <div key={post.id} className={`w-full py-24 px-8 ${isDark ? 'bg-[#f6f6f6]' : 'bg-white'}`}>
                            <div className="max-w-[1000px] mx-auto">
                                <div className="flex flex-col gap-10">
                                    {/* Image Container and Floating Date */}
                                    <div className="relative w-full aspect-[16/8] shadow-sm">
                                        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100/10">
                                            <Image
                                                src={imageUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Date Badge */}
                                        <div className="absolute top-6 -right-6 md:-right-10 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl border border-gray-100 z-10 transition-transform hover:scale-105">
                                            <span className="text-[32px] font-bold text-[#70bfa8] leading-none">{day}</span>
                                            <span className="text-[14px] font-bold text-gray-500 uppercase tracking-tight">{month}</span>
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="space-y-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="space-y-1">
                                                <p className={`text-[12px] font-bold uppercase tracking-widest text-[#a0a0a0]`}>
                                                    Blog
                                                </p>
                                                <Link href={`/blog/${slug}`}>
                                                    <h2
                                                        className={`text-[36px] md:text-[45px] font-bold leading-tight hover:opacity-80 transition-opacity  text-[#70bfa8]`}
                                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                                    />
                                                </Link>
                                            </div>

                                            {/* Category Pill Button */}
                                            <Link href={`/blog/${slug}`} className={`px-10 py-3 bg-[#70bfa8] rounded-full font-bold text-[14px] transition-all hover:brightness-105 self-start md:self-center shadow-md  text-white uppercase`}>
                                                Lorem Ipsum
                                            </Link>
                                        </div>

                                        {/* Body Text Snippet */}
                                        <div
                                            className={`text-[17px] leading-[1.8] font-light max-w-none text-gray-500 line-clamp-3`}
                                            dangerouslySetInnerHTML={{ __html: excerpt }}
                                        />
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
