'use client'
import { useAuthStore } from "@/stores/authstore/authStore"
import { TbUserOff } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function ProfileMenu() {
    const [open,setOpen]=useState(false)
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
    <>
      {
         photo ? 
         <div 
         onClick={()=>setOpen(!open)}
         className="md:hidden  flex w-[60px] h-[40px]  items-center justify-center rounded-full  bg-slate-200 relative">
            {
             photo && photo.length?
               <img 
                 src={photo}
                 className="w-[60px] h-[40px]   rounded-full"
               />
       
               :<TbUserOff />
            }
            <div className={`z-10 bg-white rounded-lg shadow-xl -bottom-[80px] -left-[40px] 
                ${open? "absolute":"hidden"}`}>
                <ul className="px-4 py-4 space-y-2">
                    <li className="text-nowrap text-black">
                        <Link href='/' className="hover:text-red-800 font-medium">Go home</Link>
                    </li>
                    <li className="text-nowrap text-black">
                        <button onClick={logOut} className="hover:text-red-800 font-medium">
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
        </div> :null
      }
    </>
  )
}
