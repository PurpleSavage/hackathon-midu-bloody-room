import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { initAdmin } from "@/service/intiFirebase";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { photourl } = body;

  const cookie = cookies();
  const token = cookie.get("auth-token");
  //console.log("Token recibido:", token); // Verifica el valor del token

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
    const lastImageAt = userData?.lastImageAt
      ? userData.lastImageAt.toDate()
      : null;
    const now = new Date();
    const is24HoursPassed = lastImageAt
      ? now.getTime() - lastImageAt.getTime() > 24 * 60 * 60 * 1000
      : true;

    const totalPhotos = photos.length;
    const attemptTokens = userData?.attemptTokens || null;

    const defaultImageUrl =
      "https://res.cloudinary.com/dekmzfcpp/image/upload/v1729470771/defaultImage_ddqdig.png";

    // Verificar si la photoUrl ya existe en el array de photos
    if (photos.includes(photourl)) {
      return NextResponse.json({
        msg: "La imagen ya ha sido guardada previamente.",
        status: 409, // 409 Conflict
      });
    }

    const isDefaultImagePresent = photos.includes(defaultImageUrl);
    // Actualizar Firestore directamente eliminando la imagen predeterminada
    if (isDefaultImagePresent) {
      await userDocRef.update({
        photos: FieldValue.arrayRemove(defaultImageUrl),
      });
    }

    // Validar si ya pasó el bloque de 24 horas y si ha subido un múltiplo de 4 imágenes
    if (!is24HoursPassed && totalPhotos % 4 === 0) {
      return NextResponse.json({
        msg: "No puedes subir más imágenes hasta que pasen 24 horas",
        status: 403,
      });
    }

    // Si se cumple la condición de múltiplo de 4 (es decir, la 4ta, 8va, 12va imagen), actualizamos `lastImageAt`
    if ((totalPhotos + 1) % 4 === 0) {
      await userDocRef.update({
        photos: FieldValue.arrayUnion(photourl),
        lastImageAt: now,
        attemptTokens: 0,
      });
    } else {
      await userDocRef.update({
        photos: FieldValue.arrayUnion(photourl),
        attemptTokens: attemptTokens - 1,
      });
    }

    return NextResponse.json(
      { msg: "Imagen guardada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la función POST:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
