import Image from "next/image";

export default function AppointmentForm() {
    return (
        <section id="reserva" className="w-full bg-white border-t border-b border-gray-100 min-h-auto md:min-h-[600px] flex flex-col md:flex-row items-stretch">
            {/* Form Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 lg:p-24 bg-[#F8FBFA]">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl md:text-[60px] font-bold text-[#4EB99F] mb-8 md:mb-12 leading-tight">
                        Reserva tu cita
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Teléfono"
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium">
                                    <option>Selecciona a tu dentista</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium">
                                    <option>Tipo de servicio</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="01/02/2025"
                                className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all text-sm text-gray-800 placeholder:text-gray-900 font-medium"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <select className="w-full px-6 md:px-8 py-3.5 rounded-full border border-gray-400 bg-white focus:outline-none focus:border-[#4EB99F] transition-all appearance-none text-sm text-gray-900 font-medium">
                                    <option>Selección horario</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full mt-6">
                            <button
                                type="submit"
                                className="bg-[#88D4C0] hover:bg-[#4EB99F] text-white px-10 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105"
                            >
                                Reserva ahora
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Side - Hidden on mobile for better flow */}
            <div className="hidden md:block w-full md:w-1/2 relative min-h-[400px]">
                <Image
                    src="/banner.png"
                    alt="Dentista trabajando"
                    fill
                    className="object-cover"
                />
            </div>
        </section>
    );
}
