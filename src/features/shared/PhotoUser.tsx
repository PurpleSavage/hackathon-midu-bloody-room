'use client'
import { TbUserOff } from "react-icons/tb";
import { useAuthStore } from "@/stores/authstore/authStore";
import { nosifer } from '@/fonts/fonts';
import { useRouter } from 'next/navigation'

export default function PhotoUser() {
  const  photo=useAuthStore(state=>state.photo)
  const setSession = useAuthStore(state=>state.setSession)
  const router = useRouter()
  
  const logOut = async()=>{
    const response =await fetch('/api/logout')
    if(!response.ok){
      console.log('ocurrió un problema')
      return
    }
    setSession(null)
    localStorage.removeItem('authStore');
    router.push('/')
  }
  return (
    <div className="w-full flex justify-end gap-4">
      {
        photo ? 
        <div className="md:flex  hidden size-[45px]   items-center justify-center rounded-full p-1 bg-slate-200">
            {
            photo && photo.length?
              <img 
                src={photo}
                className="h-full w-gull rounded-full"
              />
      
              :<TbUserOff />
            }
        </div> :null
      }
      {
        photo ? <button className={`bg-red-800 md:inline-block hidden text-white px-4 py-1 rounded-lg flex-none
           ${nosifer.className} text-xs md:text-base hover:text-red-800 hover:bg-slate-300 `}
           onClick={logOut}>log out</button>:null 
      }
    </div>
  )
}
