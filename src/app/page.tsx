
import style from '../features/landing/css/landingcss.module.css'
import Header from '@/features/landing/components/Header';
import Scene from '@/features/landing/components/Scene';
import { nosifer } from '@/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import Members from '@/features/landing/components/Members';
export default function Home() {
  return (
    <div className={`min-h-screen ${style.bg} relative`}> 
      <div className={`${style.radial} absolute flex flex-col top-0 bottom-0 left-0 right-0`}>
        <Header/>

        <div className='grow w-full overflow-y-auto'>

          <section className='flex md:flex-row flex-col'>
            <div className={`gap-12  w-full md:w-3/5 px-14 flex items-center justify-center
              h-[650px] flex-col `}>
              <span className={`${nosifer.className}  text-6xl font-bold text-red-800 tracking-widest`}>Welcome to the Bloody room.</span>
              <p className='text-2xl tracking-widest'>
                Upload a photo, use voice chat, and request your own custom horror montage. Let the terror unfold!
              </p>
            </div>
            <div className='flex items-center justify-center flex-col md:w-2/5 w-full gap-4'>
              <Image
              width={300}
              height={300}
              unoptimized
              src="/images/pentagram.png"
              alt='pentagram image'
              />
              <Link href="/voicechanel" className={`${nosifer.className} hover:text-white hover:bg-red-800 
              text-red-800 bg-white px-5 py-1 rounded-xl transition-colors tracking-widest`}
              >
                Get started
              </Link>
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
                  <Scene/>
                </div>
              </div>
          </section>

          <section className='flex flex-col items-center justify-center  py-20 px-14 '>
            <h3 className={`text-center ${nosifer.className} text-4xl`}>Collaborators</h3>
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
