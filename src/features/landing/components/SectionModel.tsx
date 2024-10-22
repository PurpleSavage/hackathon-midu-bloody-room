"use client"
import { nosifer } from "@/fonts/fonts";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import styles from "../css/animetionLoader.module.css"

import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaMicrophoneSlash } from "react-icons/fa";


export default function SectionModel() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [isClicked, setIsClicked] = useState(false);
    const [isClickScreen, setIsClickScreen] = useState(false);

     
    return (
        <section className='h-screen w-full flex flex-col relative items-center justify-center overflow-hidden' >
            <motion.div
                animate={inView && { background: inView ? "#000000" : "#ffffff" }} // Cambiar el fondo según la vista
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.3
                }}
                className={`w-full h-full relative flex items-center justify-center flex-col gap-10`}
            >

                <div ref={ref}
                    className="flex items-center justify-center w-full  max-lg:ml-0 "> {/* Agregar z-10 para asegurar que el texto esté sobre el fondo */}
                    <AnimatePresence>
                        {inView && (
                            <motion.p
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={isClicked
                                    ? { opacity: 1, scale: 0.5, x: "-25%" }
                                    : { opacity: 1, scale: 1 }
                                }
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.4
                                }}
                                className={`text-white ${nosifer.className}  text-9xl max-xl:text-8xl max-lg:text-4xl  font-bold`}
                            >
                                Bloody
                                <motion.span
                                    initial={{ color: "#FFFFFF", x: 0 }}
                                    animate={isClicked
                                        ? { color: "#FF0000", scale: 0.5, x: "-100%" }
                                        : { color: "#FF0000", scale: 1 }
                                    }
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                        delay: 1.4,
                                    }}
                                >
                                    Room
                                </motion.span>
                            </motion.p>

                        )}
                    </AnimatePresence>

                </div>
                <AnimatePresence>
                    {!isClicked && ( // Renderiza el botón solo si no está clickeado
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                                delay: 0.2
                            }}
                        >
                            <button
                                onClick={() => setIsClicked(true)}
                                className={`${nosifer.className} bg-red-700 px-3 py-2 rounded-xl text-white font-bold hover:bg-red-800`}
                            >
                                What is this?
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isClicked && ( // Renderiza el botón solo si no está clickeado
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{
                                opacity: 1,
                                borderRadius: isClickScreen ? 0 : 400,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                scale: isClickScreen ? 1 : 0.6, // Cambia la escala solo si isClickScreen es verdadero
                                width: '100%',
                                height: '100%',
                                background: "#ffffff",

                            }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            ref={ref}
                            onClick={() => setIsClickScreen(true)}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="flex max-md:flex-col items-center max-md:pb-5 p-4 cursor-pointer"
                        >
                            <AnimatePresence>
                                {isClickScreen && (
                                    <motion.div 
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                    >
                                        <div className={`${nosifer.className} text-black w-[500px] max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-4`}>
                                            <span className="text-3xl mt-10">Bloodyroom</span>
                                            <p className="max-md:text-center max-md:text-lg max-md:font-bold max-md::flex max-md:flex-wrap max-md:w-64">
                                                An interactive voice chat web app where you can upload a photo, activate your microphone,
                                                and request your own custom horror-themed montage. Unleash your imagination and let the fear begin!
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div
                                className="relative m-10 overflow-hidden z-20  text-black flex justify-center h-[300px] w-[160px] border-4 border-black rounded-2xl bg-gray-50"
                            >
                                <span className="border border-black z-20 bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"></span>
                                <span className="absolute -right-2 top-14 border-4 z-20 border-black h-7 rounded-md"></span>
                                <span className="absolute -right-2 bottom-36 border-4 z-20 border-black h-10 rounded-md"></span>
                                <div className="flex flex-col items-center justify-end w-full bg-white absolute top-0 bottom-0">

                                    <div className={styles.loader}>
                                        <span className={styles.bar}></span>
                                        <span className={styles.bar}></span>
                                        <span className={styles.bar}></span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 w-full justify-center pb-4">
                                        <div className="bg-white border-2 shadow-2xl shadow-red-500 rounded-full border-red-500 flex items-center justify-center w-10 h-10 mr-2">
                                            <IoCloudDownloadOutline color="red" size={20} />
                                        </div>
                                        <div className="p-1 bg-gray-700 rounded-full flex items-center justify-center w-7 h-7 mr-2">
                                            <FaMicrophoneSlash color="black" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


            </motion.div>
        </section>

    )
}