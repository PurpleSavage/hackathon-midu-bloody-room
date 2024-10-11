import { nosifer } from '@/fonts/fonts';
import Image from "next/image"
export default function Header() {
  return (
    <header className="flex items-center border-b border-slate-700 py-4 px-4 w-full">
        <div className="flex gap-4 items-center">
          <Image
            width={30}
            height={30}
            unoptimized
            src="/images/bloody-hand.png"
            alt='bloody hand'
          />
          <span className={`block py-2 text-red-800 tracking-widest font-bold ${nosifer.className}`}>
              Bloody Room
          </span>  
        </div> 
        <div className="grow flex items-center justify-end  py-2">
            <button className="border bg-black border-red-900 rounded-xl px-4 py-2 text-white tracking-widest">
                Login with google
            </button>
        </div>
    </header>
  )
}
