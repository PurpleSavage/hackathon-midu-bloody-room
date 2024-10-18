import { nosifer } from "@/fonts/fonts";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import styles from "../css/bgCustomShadow.module.css"
import BloodSvg from "../Icons/BloodSvg";
export default function SectionModel() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section className='h-screen w-full flex flex-col relative items-center justify-center bg-slate-50 overflow-hidden' >
            <motion.div
                animate={inView && { background: inView ? "#000000" : "#ffffff" }} // Cambiar el fondo según la vista
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.3
                }}
                className="w-full h-full relative flex flex-col items-center justify-center"
                style={{
                    boxShadow: inView
                        ? 'inset -50px 0 100px rgba(0, 0, 0, 0.8), inset 50px 0 100px rgba(0, 0, 0, 0.8)'
                        : 'none', // Sin sombra cuando no está en vista
                }}
            >


                <div className="absolute top-0 left-0 flex w-full">
                    {/* Repetir el componente SVG */}
                    {[...Array(3)].map((_, index) => (
                        <BloodSvg key={index} className="flex-shrink-0" /> // Ajusta el tamaño según sea necesario
                    ))}
                </div>

                <div ref={ref} className="flex items-center justify-center relative " > {/* Agregar z-10 para asegurar que el texto esté sobre el fondo */}
                    {inView && (
                        <AnimatePresence>
                            <motion.p
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.9
                                }}
                                className={`text-white ${nosifer.className} text-9xl font-bold`}
                            >
                                Cloud<span>Binary</span>
                            </motion.p>
                        </AnimatePresence>
                    )}
                </div>
            </motion.div>
        </section>

    )
}