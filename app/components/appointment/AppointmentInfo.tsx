import Image from "next/image";

export default function AppointmentInfo() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container-custom">
                {/* Section 1: Why it's important */}
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-20 md:mb-32">
                    <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative rounded-3xl overflow-hidden shadow-sm">
                        <Image
                            src="/servicios.png"
                            alt="Limpieza dental profesional"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight">
                            ¿Por qué es importante la limpieza dental cada 6 meses?
                        </h2>
                        <div className="space-y-6 text-gray-500 text-sm md:text-base leading-relaxed">
                            <p>
                                Muchas veces hemos escuchado de amigos o pacientes las expresiones: "¿Por qué vas tantas veces al dentista a limpiarte los dientes?", o "yo solo voy una vez al año con eso basta y sobra"; o peor aún, "yo nunca he ido al dentista por una limpieza dental porque siento que no la necesito".
                            </p>
                            <p>
                                Podemos tener alguna enfermedad y no precisamente tener algún síntoma, por lo que es necesario examinar clínica y radiográficamente dientes y encías para descartar caries, fracturas, gingivitis, periodontitis, entre otros. Científicamente está comprobado que cada 6 meses debemos de realizarnos una limpieza dental profunda la cual nos va a permitir como profesionales de salud poder eliminar sarro, calculo dental, manchas por alimentos, entre otros. Al momento de tener los dientes totalmente limpios, nos permite examinar de una manera detallada los dientes y encías y así poder interceptar situaciones que podrían llegar a ser más complejas y dolorosas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Special cases and lists */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
                    <div className="w-full md:w-1/2 h-[250px] md:h-[400px] relative rounded-3xl overflow-hidden shadow-sm">
                        <Image
                            src="/ubicacion.png"
                            alt="Dentista trabajando with paciente"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="space-y-4 md:space-y-6 text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                            <p>
                                En algunos casos el tiempo entre limpiezas dentales puede ser menos de 6 meses. Por ejemplo, algunos pacientes pueden llegar a necesitar limpieza dental cada 3 o 4 meses, y esto puede deberse a algunos padecimientos sistémicos, físicos o psicológicos que hacen que el paciente genere más sarro de lo normal o que el paciente necesite cuidado más minucioso de parte de nosotros como clínicos. Los pacientes que pueden entrar en este rubro son:
                            </p>
                            <ul className="list-disc list-outside ml-4 space-y-1">
                                <li>Diabéticos</li>
                                <li>Hipertensos</li>
                                <li>Demencia Senil</li>
                                <li>Alzheimer</li>
                                <li>Parkinson</li>
                                <li>Fumador</li>
                            </ul>
                            <p>
                                Pacientes con capacidades especiales: autismo, Síndrome de Down, etc.
                            </p>
                            <p>
                                Si tienes alguna duda o pregunta, no dudes en comunicarte con nosotros, será un gusto poder solucionarlos y tenerte con nosotros.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
