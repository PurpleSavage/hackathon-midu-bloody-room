import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { initAdmin } from '@/service/intiFirebase';
import { getFirestore,FieldValue } from "firebase-admin/firestore" 
import { NextResponse } from 'next/server';
export async function POST(req: Request){

    const body = await req.json();
    const {photourl}=body

    const cookie = cookies();
    const token = cookie.get('auth-token'); 

    if (!token) {
        return new Response('No auth token provided', { status: 403 });
    }

    try {
        await initAdmin()
        const decodedtoken=await getAuth().verifyIdToken(token.value)
        if(!decodedtoken){
            return NextResponse.json({ msg: "Token no válido" }, { status: 403 });
        }
        const firestore = getFirestore()
        const userDocRef = await firestore.collection('users').doc(decodedtoken.user_id)
        await userDocRef.update({
            photos: FieldValue.arrayUnion(photourl),
        });
      
       return NextResponse.json({msg:"Guardado correctamente"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}