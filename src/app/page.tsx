"use client";
import style from '../features/landing/css/landingcss.module.css'
import Header from '@/features/landing/components/Header';
import Scene from '@/features/landing/components/Scene';
import { nosifer } from '@/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import Members from '@/features/landing/components/Members';
import { motion } from "framer-motion";
import GhostSvg from '@/features/landing/Icons/GhostSvg';
import { useMouseMovement } from '@/features/landing/hooks/PositionGhost';
import GhostMoveSvg from '@/features/landing/Icons/GhostMoveSvg';
import PhotosPublic from '@/features/landing/components/PhotosPublic';

export default function Home() {
  const title = "Welcome to the Bloody room."
  const { mousePosition, isMoving } = useMouseMovement(200, 15);


  return (
    <div className={`min-h-screen ${style.bg} relative`}>
      <div className={`${style.radial} absolute flex flex-col top-0 bottom-0 left-0 right-0`}>
        <Header />

        <div className='grow w-full overflow-y-auto '>
          <section className='flex md:flex-row flex-col relative overflow-hidden' >
            <motion.div
              className="absolute z-0 "

              animate={{
                x: mousePosition.x - 80,
                y: mousePosition.y - 120,
              }}
              transition={{
                type: 'spring',  
                stiffness: 100,  // Reduzco la rigidez para hacer el retraso más pronunciado
                damping: 25,     // Aumento el damping para suavizar el movimiento
              }}
            >
              <motion.div
                key={isMoving ? "moving" : "static"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} // Transición suave de opacidad
                exit={{ opacity: 0 }} // Al salir, hacer que el elemento se desvaneciera
                transition={{ duration: 0.3 }} // Duración de la transición
                className="relative flex items-center justify-center p-2 rounded-full bg-black shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_50px_rgba(255,0,0,0.5)]"
              >
                {isMoving ? (
                  <GhostMoveSvg width={40} height={40} className="text-red-500" />
                ) : (
                  <GhostSvg width={40} height={40} className="text-red-500" />
                )}

              </motion.div>

            </motion.div>


            <div className={`gap-12  w-full md:w-3/5 px-14 flex items-center justify-center
              h-[650px] flex-col `}>
              <div className="flex flex-wrap items-center justify-center w-full  overflow-hidden">
                {title.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.3,
                    }}
                    className={`${nosifer.className} text-6xl font-bold text-red-800 tracking-wide antialiased`}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                className='text-2xl tracking-widest z-10'>
                Upload a photo, use voice chat, and request your own custom horror montage. Let the terror unfold!
              </motion.p>
            </div>
            <div className='flex items-center justify-center flex-col md:w-2/5 w-full gap-4'>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                <Image
                  width={300}
                  height={300}
                  unoptimized
                  src="/images/pentagram.png"
                  alt='pentagram image'
                  className='z-10'
                />
              </motion.div>
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                
              >
                <Link href="/auth"  className={`${nosifer.className} hover:text-white hover:bg-red-800 
              text-red-800 bg-white px-5 py-1 rounded-xl transition-colors tracking-widest`}
                >
                  Get started
                </Link>
              </motion.button>
            </div>
          </section>

          <section className='flex items-center justify-center bg-slate-200 py-20 px-14 relative'>
            <Image
              width={300}
              height={300}
              className='absolute top-0 left-0'
              unoptimized
              src="/images/dirty_nobg.png"
              alt='Horror movie dirt stain.'
            />
            <Image
              width={300}
              height={300}
              className='absolute top-0 right-0'
              unoptimized
              src="/images/dirty_nobg.png"
              alt='Horror movie dirt stain.'
            />
            <Image
              width={100}
              height={100}
              className='absolute bottom-0 right-[40%]'
              unoptimized
              src="/images/blood.png"
              alt='Horror movie blood stain.'
            />
            <div className='flex w-[80%] '>
              <div className={`text-black font-medium w-3/5  text-2xl flex items-center ${nosifer.className} tracking-widest`}>
                An interactive voice chat web app where you can upload a photo, activate your microphone,
                and request your own custom horror-themed montage. Unleash your imagination and let the fear begin!
              </div>
              <div className='w-2/5 flex items-center justify-start '>
                <Scene />
              </div>
            </div>
          </section>


          <section className='py-20 px-14 flex items-center justify-center '> 
            <div className='space-y-4'>
              <h3 className={`text-center ${nosifer.className} text-4xl text-white`}>Gallery</h3>
              <PhotosPublic/>
            </div>
          </section>

          <section className='flex flex-col items-center justify-center  py-20 px-14 '>
            <h3 className={`text-center ${nosifer.className} text-4xl text-white`}>Collaborators</h3>
            <div className='flex items-center gap-5'>
              <Members/>
              <div>
                <ul className='space-y-4'>
                  <li className={`${nosifer.className} hover:text-red-800`}>
                    <a href="https://github.com/PurpleSavage">
                      PurpleSavage
                    </a>
                  </li>
                  <li className={`${nosifer.className} hover:text-red-800`}>
                    <a href="https://github.com/Ariano2700">
                      Ariano2700
                    </a>
                  </li>
                  <li className={`${nosifer.className} hover:text-red-800`}
                  >
                    <a href="https://github.com/DeyCasGuerrero">
                      DeyCasGuerrero
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
