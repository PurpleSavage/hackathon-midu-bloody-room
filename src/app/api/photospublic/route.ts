
import { NextResponse } from 'next/server';
import { initAdmin } from '@/service/intiFirebase';
import { getFirestore } from 'firebase-admin/firestore';
export async function GET() {
    try {
        await initAdmin()
        const firestore = getFirestore()
        const photosCollection = await firestore.collection('photosdemo').get();
        const photos = photosCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return NextResponse.json({photos}, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}