"use client"
import { getCldImageUrl } from "next-cloudinary";
import { useState, useEffect } from "react";

type Props = {
  imageUrl?: string;
  id?: string;
  micPrompt: string;
};

function UploadedPhotoGenerated({ id, micPrompt }: Props) {
  const [retryCount, setRetryCount] = useState(0); // Estado para llevar cuenta de los reintentos
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  if (!id) return null;

  const maxRetries = 3; // Número máximo de reintentos

  // Generar la URL de Cloudinary con el prompt para reemplazo de fondo
  useEffect(() => {
    const url = getCldImageUrl({
      src: id,
      replaceBackground: micPrompt,
    });
    setImageUrl(url);
  }, [id, micPrompt, retryCount]);

  // Función para manejar el error de carga
  const handleImageError = () => {
    if (retryCount < maxRetries) {
      // Si no ha alcanzado el límite de reintentos, incrementar el contador
      setRetryCount((prev) => prev + 1);
    } else {
      console.error("La imagen no se pudo cargar después de varios intentos.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={id}
          className="w-1/2 rounded-md"
          onError={handleImageError} // Maneja el error de carga
        />
      )}
    </div>
  );
}

export default UploadedPhotoGenerated;