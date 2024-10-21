"use client";
import { nosifer } from '@/fonts/fonts';
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

type PropsI = {
  photos: string[];
  activeIndex: number;
};
function DownloadImage(props: PropsI) {
  const { activeIndex, photos } = props;
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadImage = (url: string) => {
    setIsDownloading(true); // Activar spinner

    // Agregar un retraso de 500 ms antes de iniciar la descarga
    setTimeout(() => {
      fetch(url, {
        mode: "cors",
      })
        .then((response) => response.blob()) // Obtener los datos como un blob
        .then((blob) => {
          const urlBlob = window.URL.createObjectURL(blob); // Crear URL a partir del blob
          const a = document.createElement("a"); // Crear elemento de ancla
          a.href = urlBlob;
          a.download = `image_${activeIndex + 1}.jpg`; // Nombre de archivo para la descarga
          document.body.appendChild(a);
          a.click(); // Simular el click
          document.body.removeChild(a); // Eliminar el enlace temporal
        })
        .catch((err) => console.error("Error al descargar la imagen:", err))
        .finally(() => {
          setIsDownloading(false); // Desactivar spinner
        });
    }, 500); // Retraso de 500 ms
  };
  return (
    <button
      onClick={() => downloadImage(photos[activeIndex])} // Llamar a la función de descarga
      className={`mt-4 px-4 py-2 bg-red-500 text-red-800 rounded-md flex items-center justify-center ${nosifer.className} hover:bg-red-800 hover:text-slate-200 transition-all duration-500`}
      disabled={isDownloading} // Desactivar botón mientras descarga
    >
      {isDownloading ? (
        <>
          <FaSpinner className="animate-spin mr-2" /> {/* Spinner de carga */}
          Downloading...
        </>
      ) : (
        "Descargar Imagen"
      )}
    </button>
  );
}
export default DownloadImage;
