import { initAdmin } from "@/service/intiFirebase";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = cookies();
  const token = cookie.get("auth-token");

  if (!token) {
    return new Response("No auth token provided", { status: 403 });
  }

  try {
    await initAdmin();
    const decodedtoken = await getAuth().verifyIdToken(token.value);
    if (!decodedtoken) {
      return NextResponse.json({ msg: "Token no válido" }, { status: 403 });
    }
    const firestore = getFirestore();
    const userDocRef = firestore.collection("users").doc(decodedtoken.user_id);
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
