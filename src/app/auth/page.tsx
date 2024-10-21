'use client';
import { auth } from '@/service/config';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { nosifer } from '@/fonts/fonts';
import Image from 'next/image';
import { UserFirebaseI } from '@/interfaces/userInterface';
import { useAuthStore } from '@/stores/authstore/authStore';
import { useRouter } from 'next/navigation'


export default function Auth() {
    const setSession=useAuthStore(state=>state.setSession)
    const router = useRouter()

    const signInWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        
        try {
            const result = await signInWithPopup(auth, provider);
            const token =await result.user.getIdToken(); 
            // El usuario autenticado viene en el resultado de signInWithPopup
            const user:Partial<UserFirebaseI> ={
                uid:result.user.uid,
                photoProfile:result.user.photoURL !== null ?result.user.photoURL : ""  ,
            }
            const response = await fetch('/api/register',{
                method:'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({user}) 
            })
            

            if(!response.ok){
                console.log("error al registrase")
                return
            }
            const data= await response.json()
            const {photo}=data
            if(photo.length>0){
                setSession(photo)
            }
            router.push('/voicechanel')

        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-start pt-14 justify-center bg-white">
            <div className='shadow-2xl w-[90%] md:w-3/4 lg:w-1/3 px-4 py-10 space-y-5'>
                <h2 className={`text-2xl text-red-800 ${nosifer.className}`}>Log in to Bloody Room with Google</h2>
                <form onSubmit={signInWithGoogle} >
                    
                    <button type="submit" className={`mx-auto  bg-white text-red-800 py-4 px-10 flex 
                      rounded-lg border border-slate-300 hover:border-red-800  
                      justify-center items-center ${nosifer.className} gap-4 relative`}>
                        <FcGoogle size={25}/> Sign in with google 

                        <Image
                         width={50}
                         height={50}
                         unoptimized
                         src="/images/blood-splatter.png"
                         alt='blood splatter'
                         className='absolute top-0 left-0' 
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}
