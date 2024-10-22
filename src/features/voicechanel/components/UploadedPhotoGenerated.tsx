"use client";
import { nosifer } from "@/fonts/fonts";
import useImageStore from "@/stores/imageStore/image.store";
import { getCldImageUrl } from "next-cloudinary";
import { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import { PiSpinnerBold } from "react-icons/pi";

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
  const [showGeneratedMessage, setShowGeneratedMessage] = useState(false);
  const maxRetries = 3; // Número máximo de reintentos
  const addPhoto = useImageStore((state) => state.addPhoto);
  const photos = useImageStore((state) => state.photos);
  const setAttemptTokens = useImageStore((state) => state.setAttemptTokens);
  const attemptTokens = useImageStore((state) => state.attemptTokens);

  // Generar la URL de Cloudinary con el prompt para reemplazo de fondo
  useEffect(() => {
    if (!id || hasImageLoaded) return;

    if (photos.length === 0) {
      // Lógica para nuevo usuario sin fotos previas
      const url = getCldImageUrl({
        src: id,
        replaceBackground: micPrompt,
        restore: true,
        width: "1870",
        height: "1250",
      });
      setImageUrl(url);
      setLoading(true);
    } else {
      // Lógica para usuario existente
      const url = getCldImageUrl({
        src: id,
        replaceBackground: micPrompt,
        restore: true,
        width: "1870",
        height: "1250",
      });
      setImageUrl(url);
      setLoading(true);
    }
  }, [id, micPrompt, hasImageLoaded]);

  //guardar en el firebase
  const saveImageToFirestore = async (url: string) => {
    if (isSaving) return; // Si ya estamos guardando, evitar múltiples llamadas
    setIsSaving(true);
    try {
      if (photos.includes(url)) {
        return;
      }
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-Agent": "*",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ photourl: url }),
        body: JSON.stringify({ photourl: url }),
      });
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error(
          "Se recibió una página HTML en lugar de JSON. Verifica la ruta API."
        );
        return;
      }
      if (!response.ok) {
        const responseData = await response.json(); // Leer la respuesta del servidor
        if (response.status === 404) {
          console.error(
            "Error 404: Ruta no encontrada. Verifica la API route."
          );
        } else {
          console.error("Error guardando la imagen:", responseData.msg);
        }
        return;
      }

      const responseData = await response.json(); // Si la respuesta es correcta
      console.log("Imagen guardada correctamente:", responseData);
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
      //console.log("La imagen ya ha sido guardada previamente.");
      setLoading(false);
      return;
    }
    try {
      setHasImageLoaded(true); // Solo marcar como cargada la primera vez
      setLoading(false);

      if (photos.length === 0) {
        setAttemptTokens(attemptTokens - 1);
        // Agregar la imagen al store
        addPhoto(imageUrl);
        setLoading(true);
        // Guardar la imagen en Firestore
        await saveImageToFirestore(imageUrl);
        return;
      }
      setAttemptTokens(attemptTokens - 1);
      // Agregar la imagen al store
      addPhoto(imageUrl);
      setLoading(true);
      // Guardar la imagen en Firestore
      await saveImageToFirestore(imageUrl);
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
    }
  };

  const checkImageStatus = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);

      if (!response.ok && response.status === 423) {
        console.log("Imagen aún generándose. Reintentando...");
        setTimeout(checkImageStatus, 5000); // Reintentar después de 5 segundos
      } else if (!response.ok) {
        handleImageError(); // Manejar otros errores
      } else {
        setLoading(false); // Imagen lista, detener el loader
      }
    } catch (error) {
      console.error("Error al cargar la imagen: ", error);
      handleImageError(); // Manejar errores de red
    }
  };
  // useEffect para chequear el estado de la imagen al montar o cuando cambie la URL
  useEffect(() => {
    if (imageUrl) {
      checkImageStatus();
    }
  }, [imageUrl]); // Ejecuta cuando imageUrl cambia

  // Mostrar el mensaje por 5 segundos cuando la imagen esté cargada
  useEffect(() => {
    if (hasImageLoaded) {
      setShowGeneratedMessage(true);
      const timer = setTimeout(() => {
        setShowGeneratedMessage(false); // Ocultar el mensaje después de 5 segundos
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasImageLoaded]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full h-full py-3">
      {loading && imageUrl ? (
        // Mostrar loader mientras la imagen está cargando
        <div className="flex flex-col items-center justify-center w-11/12 h-full rounded-lg">
          <PiSpinnerBold className="animate-spin text-red-800 text-5xl mb-4" />
          <div className={`text-red-800 ${nosifer.className}`}>
            Generating image...{" "}
          </div>
        </div>
      ) : showGeneratedMessage ? (
        // Mostrar mensaje cuando la imagen esté generada por 5 segundos
        <div className={`text-green-400 ${nosifer.className}`}>
          Image generated!{" "}
        </div>
      ) : (
        // Mostrar error si no se puede cargar la imagen después de varios intentos
        !imageUrl && (
          <div className={`text-red-800 ${nosifer.className} text-lg`}>
            <p>The image could not be loaded.</p>
            <p>Reload this page</p>
          </div>
        )
      )}
      {imageUrl && (
        <div className="flex flex-col items-center justify-center">
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
