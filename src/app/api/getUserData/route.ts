import { initAdmin } from "@/service/intiFirebase";
import { jwtVerify } from 'jose';
import { getFirestore } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get("auth-token")?.value;

  if (!token) {
    return new Response("No auth token provided", { status: 403 });
  }

  try {
    await initAdmin();
    const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
    const decodedtoken = await jwtVerify(token, secret);
    if (!decodedtoken) {
      return NextResponse.json({ msg: "Token no válido" }, { status: 403 });
    }
    const uid = decodedtoken.payload?.uid as string;
    if (!uid) {
      return NextResponse.json({ msg: "Token no válido" }, { status: 403 });
    }
    const firestore = getFirestore();
    const userDocRef = firestore.collection("users").doc(uid);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { msg: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    const photos = userData?.photos || [];
    const lastImageAt = userData?.lastImageAt || null;
    const attemptTokens = userData?.attemptTokens || null;

    return NextResponse.json(
      { photos, lastImageAt, attemptTokens },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
