"use client";
import useImageStore from "@/stores/imageStore/image.store";
import UploadedPhotoGenerated from "./UploadedPhotoGenerated";
import useMicStore from "@/stores/microphoneStore/microphone.store";
import { FaImage } from "react-icons/fa";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
function UploadedPhoto() {
  const setPhotos = useImageStore((state) => state.setPhotos);
  const resultData = useMicStore((state) => state.resultData);
  const micData = useMicStore((state) => state.micData);
  const showUploadedPhoto = useMicStore((state) => state.showUploadedPhoto);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch("/api/getUserData");
      if (response.ok) {
        const data = await response.json();
        console.log("Data del firebase", data);
        //console.log("Data del firebase solo photos", data.photos);
        setPhotos(data.photos); // Establece las fotos obtenidas en el estado
      } else {
        console.error("Error al cargar las fotos:", response.statusText);
      }
    };
    try {
      setLoading(true);
      fetchPhotos(); // Cargar las fotos cuando el componente se monte
    } catch (error) {
      setLoading(false);
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const photos = useImageStore((state) => state.photos);
  return (
    <>
      {/* Si NO hay micData, mostrar imagen subida o el carrusel */}
      {!micData ? (
        <div className="relative w-11/12 h-5/6 flex flex-col items-center justify-center rounded-lg">
          {resultData ? (
            // Mostrar imagen subida si existe
            <img
              src={resultData.info.url}
              alt={resultData.info.public_id}
              className="w-full max-w-xl rounded-md max-h-max"
            />
          ) : loading === true ? (
            <div className="flex flex-col items-center justify-center w-11/12 h-full rounded-lg">
              <FaSpinner className="animate-spin text-slate-500 text-5xl mb-4" />
              <div className="text-slate-500">
                Verficando imagenes existentes...
              </div>
            </div>
          ) : photos.length > 0 ? (
            // Mostrar el carrusel si hay fotos en el array
            <div className="w-full flex flex-col gap-6 items-center justify-center">
              <ImageCarousel
                handleImageLoad={() => {}}
                handleImageError={() => {}}
              />
            </div>
          ) : (
            // Mostrar placeholder si no hay imagen subida ni fotos en el carrusel
            <div className="bg-gray-300 w-1/2 rounded-lg h-full flex flex-col items-center justify-center">
              <FaImage size={80} className="text-white mb-4" />
              <div className="text-white text-lg">Empieza a subir imagenes</div>
            </div>
          )}
        </div>
      ) : (
        // Mostrar imagen generada si existe
        <div className="w-full flex items-center justify-center">
          {showUploadedPhoto && (
            <UploadedPhotoGenerated
              id={resultData?.info.public_id}
              micPrompt={micData}
            />
          )}
        </div>
      )}
    </>
  );
}

export default UploadedPhoto;
