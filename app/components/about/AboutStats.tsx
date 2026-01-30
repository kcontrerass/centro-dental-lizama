"use client";

export default function AboutStats() {
    const stats = [
        {
            title: "30 años",
            subtitle: "De experiencia",
        },
        {
            title: "Lorem ipsum",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and",
        },
        {
            title: "Lorem ipsum",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Tooth Icon Circle */}
                            <div className="w-20 h-20 rounded-full border-2 border-[#70bfa8]/30 flex items-center justify-center mb-6">
                                <div className="text-[#70bfa8]">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 11c.67 0 1.33-.33 2-1 1-1 2-2 3-2s2 1 3 2c.67.67 1.33 1 2 1h1V4h-2a3 3 0 0 0-3 3 1 1 0 0 1-2 0 3 3 0 0 0-3-3H4v7h1z" />
                                        <path d="M4 11v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7" />
                                        <path d="M12 21v-4" />
                                        <path d="M7 21h10" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[24px] font-bold text-[#70bfa8] mb-2">
                                {stat.title}
                            </h3>
                            <p className="text-[14px] text-gray-400 font-medium max-w-[200px]">
                                {stat.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
