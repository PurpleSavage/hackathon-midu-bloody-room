"use client";
import useImageStore from "@/stores/imageStore/image.store";
import { getCldImageUrl } from "next-cloudinary";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import ImageCarousel from "./ImageCarousel";

type Props = {
  imageUrl?: string;
  id?: string;
  micPrompt: string;
};

function UploadedPhotoGenerated({ id, micPrompt }: Props) {
  const [retryCount, setRetryCount] = useState(0); // Estado para llevar cuenta de los reintentos
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const maxRetries = 3; // Número máximo de reintentos
  const addPhoto = useImageStore((state) => state.addPhoto);
  const photos = useImageStore((state) => state.photos);

  // Generar la URL de Cloudinary con el prompt para reemplazo de fondo
  useEffect(() => {
    if (!id || hasImageLoaded) return;

    const url = getCldImageUrl({
      src: id,
      replaceBackground: micPrompt,
      restore: true,
      width: "1870",
      height: "1250",
    });
    setImageUrl(url);
    setLoading(true);
  }, [id, micPrompt, hasImageLoaded]);

  //guardar en el firebase
  const saveImageToFirestore = async (url: string) => {
    if (isSaving) return; // Si ya estamos guardando, evitar múltiples llamadas
    setIsSaving(true);
    try {
      if (photos.includes(url)) {
        console.log("La imagen ya ha sido guardada previamente.");
        return;
      }
      console.log("Enviando URL a Firestore:", url);
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photourl: url }),
      });
      const responseData = await response.json(); // Leer la respuesta como JSON
      if (!response.ok) {
        console.error("Error guardando la imagen:", responseData.msg);
      } else {
        console.log("Imagen guardada correctamente:", responseData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsSaving(false); // Resetear el estado de guardando
    }
  };

  // Función para manejar el error de carga
  const handleImageError = () => {
    if (retryCount < maxRetries) {
      // Si no ha alcanzado el límite de reintentos, incrementar el contador
      setRetryCount((prev) => prev + 1);
    } else {
      console.error("La imagen no se pudo cargar después de varios intentos.");
      setLoading(false); // Desactivar el loader si falla después de varios intentos
    }
  };

  // Manejar cuando la imagen se carga correctamente
  const handleImageLoad = async () => {
    if (hasImageLoaded || !imageUrl) return; // Asegurarse de que solo se ejecute una vez
    if (photos.includes(imageUrl)) {
      console.log("La imagen ya ha sido guardada previamente.");
      return;
    }
    try {
      setHasImageLoaded(true); // Solo marcar como cargada la primera vez
      setLoading(false);

      // Guardar la imagen en Firestore
      await saveImageToFirestore(imageUrl);
      // Agregar la imagen al store
      addPhoto(imageUrl);

    } catch (error) {
      console.error("Error al guardar la imagen:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {loading ? (
        // Mostrar loader mientras la imagen está cargando
        <div className="flex flex-col items-center justify-center w-11/12 h-full rounded-lg">
          <FaSpinner className="animate-spin text-slate-500 text-5xl mb-4" />
          <div className="text-slate-500">Generando imagen...</div>
        </div>
      ) : (
        // Mostrar error si no se puede cargar la imagen después de varios intentos
        !imageUrl && (
          <div className="text-red-500 text-lg">
            No se pudo cargar la imagen.
          </div>
        )
      )}
      {imageUrl && (
        <div className="flex flex-col items-center justify-center gap-6">
          <ImageCarousel
            handleImageError={handleImageError}
            handleImageLoad={handleImageLoad}
          />
        </div>
      )}
    </div>
  );
}

export default UploadedPhotoGenerated;
