import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initAdmin } from "@/service/intiFirebase";
import { getAuth } from "firebase-admin/auth";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
export async function POST(req: Request) {
  const body = await req.json();
  const { user } = body;
  const cookie = cookies();
  const authHeader = headers().get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { msg: "No autorizado, faltante o inválido token" },
      { status: 403 }
    );
  }

  try {
    const token = authHeader.split(" ")[1];
    await initAdmin();
    const decodedtoken = await getAuth().verifyIdToken(token);

    if (!decodedtoken) {
      return NextResponse.json({ msg: "Token no válido" }, { status: 403 });
    }

    const firestore = getFirestore();
    const userDoc = await firestore.collection("users").doc(user.uid).get();

    if (!userDoc.exists) {
      await firestore
        .collection("users")
        .doc(user.uid)
        .set({
          photoProfile: user.photoProfile,
          photos: [
            "https://res.cloudinary.com/dekmzfcpp/image/upload/v1729470771/defaultImage_ddqdig.png",
          ],
          attemptTokens: 4,
          createdAt: new Date(),
        });
    }
    const newtoken = await new SignJWT({ uid: user.uid })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(secret);
    cookie.set({
      name: "auth-token",
      value: newtoken,
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
    });
    return NextResponse.json({ photo: user.photoProfile }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
