"use client";
import useImageStore from "@/stores/imageStore/image.store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DownloadImage from "./DownloadImage";
import ShareImage from "./ShareImage";

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
    <section className="flex max-md:flex-col gap-2 max-md:gap-3 items-center justify-center">
      <div className="relative flex items-center justify-center">
        {photos.length > 0 && (
          <>
            <div className="absolute flex flex-col gap-3 top-0 right-0">
              <DownloadImage activeIndex={activeIndex} photos={photos} />
              <ShareImage activeIndex={activeIndex} photos={photos} />
            </div>
            <div className="flex items-center justify-center flex-col gap-6 h-[570px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[activeIndex]} // Mostrar la imagen activa
                alt={`Generated image ${activeIndex + 1}`}
                className="w-[520px] h-[570px] rounded-md aspect-auto"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </>
        )}
      </div>

      {/* Galería de imágenes con scroll vertical u horizontal */}
      <motion.div
        className="flex flex-col items-center overflow-x-hidden overflow-y-auto max-h-[570px] max-md:max-h-[500px] max-md:flex-row max-md:w-[500px] max-[550px]:w-[400px] max-[440px]:w-[300px] max-md:overflow-x-auto max-md:overflow-y-hidden"
        layout
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
      >
        <motion.div
          className="flex flex-col max-md:flex-row items-center gap-0 py-0"
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.5, 1] }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 flex items-center justify-center cursor-pointer w-auto`}
              onClick={() => setActiveIndex(index)} // Cambiar imagen al hacer clic
              initial={{ scale: 0.9 }}
              animate={{
                scale: activeIndex === index ? 0.9 : 0.8,
                zIndex: activeIndex === index ? 30 : 20,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.8, 0.5, 1],
              }}
            >
              <div className="w-64 h-auto flex items-center justify-center py-0">
                <div className="w-full h-full relative overflow-hidden max-md:rounded-none rounded-lg m-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`Generated image ${index + 1}`}
                    className="h-full w-full max-md:h-[230px] max-md:w-[230px] object-cover m-0"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ImageCarousel;
