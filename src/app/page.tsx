"use client";
import style from '../features/landing/css/landingcss.module.css'
import Header from '@/features/landing/components/Header';
import Scene from '@/features/landing/components/Scene';
import { nosifer } from '@/fonts/fonts';
import Image from 'next/image';
import Members from '@/features/landing/components/Members';
import { motion } from "framer-motion";
import GhostSvg from '@/features/landing/Icons/GhostSvg';
import { useMouseMovement } from '@/features/landing/hooks/PositionGhost';
import GhostMoveSvg from '@/features/landing/Icons/GhostMoveSvg';
import PhotosPublic from '@/features/landing/components/PhotosPublic';
import SectionModel from '@/features/landing/components/SectionModel';
import { useRouter } from 'next/navigation'
import { FaGithub, FaLinkedinIn } from "react-icons/fa";




const title = "Welcome to the Bloody room."
export default function Home() {
  
  const { mousePosition, isMoving } = useMouseMovement(200, 15);
  const router = useRouter()
  const handleClick = () => {
    const photourl = localStorage.getItem('authStore');
    if (!photourl) {
      router.push('/auth')
      return
    }
    router.push('/voicechanel')
  }

  return (
    <div className={`min-h-screen ${style.bg} relative`}>
      <div className={`${style.radial} absolute flex flex-col top-0 bottom-0 left-0 right-0`}>
        <Header />

        <div className='grow w-full overflow-y-auto '>
          <section className='flex md:flex-row flex-col relative overflow-hidden' >
            <motion.div
              className="absolute z-0 max-md:hidden"

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


            <div className={`gap-12  w-full md:w-3/5 lg:px-14 px-5 flex items-center justify-center mt-10
              md:h-[650px] flex-col `}>
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
                    className={`${nosifer.className} text-4xl md:text-6xl font-bold text-red-800 tracking-wide antialiased`}
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
                className='text-lg md:text-2xl tracking-widest z-10 text-white'>
                Upload a photo, use voice chat, and request your own custom horror montage. Let the terror unfold!
              </motion.p>
            </div>
            <div className='flex items-center justify-center my-10 md:my-0 flex-col md:w-2/5 w-full gap-4'>

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className='sm:block hidden'
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
                <div onClick={handleClick} className={`${nosifer.className} hover:text-white hover:bg-red-800 
              text-red-800 bg-white px-5 py-1 rounded-xl transition-colors tracking-widest`}
                >
                  Get started
                </div>
              </motion.button>
            </div>
          </section>

          <SectionModel />

          <section className='flex items-center justify-center bg-slate-200 py-20 md:px-14 relative mt-10'>
            <Image
              width={300}
              height={300}
              className='absolute top-0 left-0 md:block hidden'
              unoptimized
              src="/images/dirty_nobg.png"
              alt='Horror movie dirt stain.'
            />
            <Image
              width={100}
              height={100}
              className='absolute top-0 left-0 md:hidden block'
              unoptimized
              src="/images/dirty_nobg.png"
              alt='Horror movie dirt stain.'
            />
            <Image
              width={100}
              height={100}
              className='absolute top-0 right-0 md:hidden block'
              unoptimized
              src="/images/dirty_nobg.png"
              alt='Horror movie dirt stain.'
            />
            <Image
              width={300}
              height={300}
              className='absolute top-0 right-0 md:block hidden'
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
            <div className='flex w-full  justify-center md:w-[80%] relative z-20'>
              <div className={`text-black font-medium md:w-3/5 text-lg md:text-2xl flex items-center text-center  ${nosifer.className} tracking-widest`}>
                What are you waiting for? This Halloween, dive into our app and create the best photo edits with ease. Get spooky in seconds!
              </div>
              <div className='w-2/5 items-center justify-start md:flex hidden '>
                <Scene />
              </div>
            </div>
          </section>


          <section className='py-20 px-14 flex items-center justify-center  overflow-hidden'>
            <div className='space-y-4'>
              <h3 className={`text-center ${nosifer.className} text-3xl md:text-4xl text-white`}>Gallery</h3>
              <PhotosPublic />
            </div>
          </section>

          <section className='flex overflow-hidden flex-col items-center justify-center px-4  py-20 md:px-14 '>
            <h3 className={`text-center ${nosifer.className} md:text-4xl text-white text-3xl`}>Collaborators</h3>
            <div className='flex flex-col md:flex-row  items-center gap-1 w-full '>
              <div className='flex w-full md:w-1/2 justify-center md:justify-end relative'>
                <Members />
                <div className='absolute bottom-0 top-0 left-0 right-0'>  

                </div>
              </div>
              <div className='flex flex-col items-start gap-4 md:w-1/2  h-auto p-1 w-full '>
                <div className={`${nosifer.className} bg-black flex items-center border px-4 py-4 w-full  md:w-[400px] rounded border-red-800 `}>
                  <img
                    src={`https://avatars.githubusercontent.com/u/132533056?v=4`}
                    alt='wa'
                    className='w-10 h-10 rounded-full'
                  >
                  </img>
                  <div className='flex flex-col gap-3 items-center justify-center w-full h-full'>
                    <p className='w-full text-center text-white  text-xs truncate'>
                      Deyvis Catillo
                    </p>
                    <div className='w-full flex items-center justify-center gap-4'>
                      <div >
                        <a href={`https://github.com/DeyCasGuerrero`} target="_blank" rel="noopener noreferrer">
                          <FaGithub size={30} className='text-white hover:text-red-800 p-1' />
                        </a>
                      </div>
                      <div >
                        <a href={`https://www.linkedin.com/in/jeferson-castillo-276774323/`} target="_blank" rel="noopener noreferrer">
                          <FaLinkedinIn size={25} className='text-white hover:text-red-800 p-1' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${nosifer.className} bg-black flex items-center border px-4 py-4  w-full  md:w-[400px]  rounded border-red-800 `}>
                  <img
                    src={`https://avatars.githubusercontent.com/u/143843252?v=4`}
                    alt='wa'
                    className='w-10 h-10 rounded-full'
                  >
                  </img>
                  <div className='flex flex-col gap-3 items-center justify-center w-full h-full'>
                    <p className='w-full text-xs text-white   text-center'>
                      Ariano Alban
                    </p>
                    <div className='w-full flex items-center justify-center gap-4'>
                      <div >
                        <a href={`https://github.com/Ariano2700`} target="_blank" rel="noopener noreferrer">
                          <FaGithub size={30} className='text-white hover:text-red-800 p-1' />
                        </a>
                      </div>
                      <div >
                        <a href={`https://www.linkedin.com/in/ariano-selim-alban-gomez-073325332/`} target="_blank" rel="noopener noreferrer">
                          <FaLinkedinIn size={25} className='text-white hover:text-red-800 p-1' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${nosifer.className} bg-black flex items-center border px-4 py-4  w-full  md:w-[400px]  rounded border-red-800 `}>
                  <img
                    src={`https://avatars.githubusercontent.com/u/131500236?v=4`}
                    alt='wa'
                    className='w-10 h-10 rounded-full'
                  >
                  </img>
                  <div className='flex flex-col gap-3 items-center justify-center w-full h-full'>
                    <p className='w-full text-xs text-white  text-center'>
                      Jean Paul
                    </p>
                    <div className='w-full flex items-center justify-center gap-4'>
                      <div >
                        <a href={`https://github.com/purplesavage`} target="_blank" rel="noopener noreferrer">
                          <FaGithub size={30} className='text-white hover:text-red-800 p-1' />
                        </a>
                      </div>
                      <div >
                        <a href={`https://www.linkedin.com/in/jean-paul-zurita-palomino-0411072a3/`} target="_blank" rel="noopener noreferrer">
                          <FaLinkedinIn size={25} className='text-white hover:text-red-800 p-1' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div >
    </div >
  );
}
