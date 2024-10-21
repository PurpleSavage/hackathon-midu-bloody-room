"use client";
import useImageStore from "@/stores/imageStore/image.store";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DownloadImage from "./DownloadImage";

type Props = {
  handleImageLoad: () => void;
  handleImageError: () => void;
};

function ImageCarousel(props: Props) {
  const { handleImageError, handleImageLoad } = props;
  const photos = useImageStore((state) => state.photos);
  const setPhotos = useImageStore((state) => state.setPhotos);

  //////////////////////
  const [activeIndex, setActiveIndex] = useState(0);
  const numSlides = photos.length;
  const startXRef = useRef<number | null>(null);

  const handleStart = (
    e: React.PointerEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
  };
  const handleEnd = (
    e: React.PointerEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (startXRef.current === null) return;

    const clientX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = startXRef.current - clientX;

    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }

    startXRef.current = null; // Reseteamos la posición inicial
  };

  // Función para manejar cuando se mueve hacia la izquierda
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  // Función para manejar cuando se mueve hacia la derecha
  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < numSlides - 1 ? prevIndex + 1 : numSlides - 1
    );
  };
  ////////////////////
  useEffect(() => {
    if (photos.length > 0) return;
    const fetchPhotos = async () => {
      const response = await fetch("/api/getUserData");
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos); // Establece las fotos obtenidas en el estado
      } else {
        console.error("Error al cargar las fotos:", response.statusText);
      }
    };

    fetchPhotos(); // Cargar las fotos cuando el componente se monte
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        {photos.length > 0 && (
          <div className="flex items-center justify-center mb-6 flex-col gap-6 min-h-[570px]">
            <img
              src={photos[activeIndex]} // Mostrar la imagen activa
              alt={`Generated image ${activeIndex + 1}`}
              className="w-full max-w-xl max-h-[570px] rounded-md"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <DownloadImage activeIndex={activeIndex} photos={photos} />
          </div>
        )}
      </div>
      <motion.div
        className="relative w-full flex flex-col items-center overflow-hidden"
        layout
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
      >
        <div
          onPointerDown={handleStart}
          onPointerUp={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          className="w-full overflow-hidden flex justify-center py-7"
        >
          <motion.div
            className="flex items-center"
            animate={{
              // Aquí calculamos el desplazamiento dinámico
              x: `calc(50% - ${activeIndex * (100 / photos.length)}%)`,
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.5, 1] }}
          >
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
                onClick={() => setActiveIndex(index)} // Mover al hacer click en la imagen
                initial={{ scale: 0.9, opacity: 0.5 }} // Escala y opacidad inicial
                animate={{
                  scale: activeIndex === index ? 1.2 : 1, // Escala suave para el elemento activo
                  zIndex: activeIndex === index ? 30 : 10,
                  opacity: activeIndex === index ? 1 : 0.5, // Transición de opacidad
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.8, 0.5, 1],
                }}
              >
                <div className="w-64 h-auto flex items-center justify-center py-2">
                  <div className="w-full h-full relative overflow-hidden rounded-lg">
                    <img
                      src={photo}
                      alt={`Generated image ${index + 1}`}
                      className="w-full max-sm:w-[70%] h-full object-cover"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default ImageCarousel;
