"use client";


export default function ContactFormMap() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div className="space-y-8">
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#4fb0a2] transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Correo"
                            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#4fb0a2] transition-colors"
                        />
                        <select className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#4fb0a2] transition-colors bg-white appearance-none text-gray-400">
                            <option value="">Qué tipo de producto le interesa</option>
                            <option value="implantes">Implantes</option>
                            <option value="ortodoncia">Ortodoncia</option>
                        </select>
                        <input
                            type="tel"
                            placeholder="Teléfono"
                            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#4fb0a2] transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-12 py-3 bg-[#4fb0a2] text-white rounded-full font-bold hover:brightness-105 transition-all"
                        >
                            Enviar
                        </button>
                    </form>
                </div>

                {/* Map */}
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4452440915!2d-90.505541!3d14.593639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3ac83c6b22b%3A0xc3f3456789abcdef!2sCentro%20Dental%20Lizama!5e0!3m2!1ses!2sgt!4v1710311200000!5m2!1ses!2sgt"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
