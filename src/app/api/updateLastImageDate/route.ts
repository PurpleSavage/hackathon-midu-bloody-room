import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "@/service/intiFirebase";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
export async function PATCH(req: Request) {
  const body = await req.json();
  const { message } = body;

  const cookie = cookies();
  const token = cookie.get("auth-token");
  console.log("Data from body", message);

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
    const lastImageAt = userData?.lastImageAt
      ? userData.lastImageAt.toDate()
      : null;
    if (lastImageAt === null) {
      return NextResponse.json(
        {
          msg: "No existe ultima fecha de imagen",
          attemptTokens: 4,
          status: 200,
        },
        { status: 200 }
      );
    }

    const now = new Date();
    const is24HoursPassed =
      now.getTime() - lastImageAt.getTime() > 24 * 60 * 60 * 1000;

    // Verificar si han pasado 24 horas desde la última imagen
    if (!is24HoursPassed) {
      return NextResponse.json(
        {
          msg: "Aun no han pasado 24 horas desde la ultima imagen",
          attemptTokens: 0,
          status: 400,
        },
        { status: 400 }
      );
    }
    await userDocRef.update({
      lastImageAt: null,
      attemptTokens: 4,
    });
    return NextResponse.json(
      {
        msg: "Ultima fecha actualizada",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la función POST:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
