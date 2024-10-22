"use client";
import useImageStore from "@/stores/imageStore/image.store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { calculateTimeRemaining } from "@/utils/calculateTimeRemaining";
function CountData() {
  const [lastImageAt, setLastImageAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("Calculando...");
  const photos = useImageStore((state) => state.photos);
  const attemptTokens = useImageStore((state) => state.attemptTokens);
  const setAttemptTokens = useImageStore((state) => state.setAttemptTokens);
  const pathname = usePathname();

  //inicializa con la verificacion si es que ya pasaron las 24 horas o si lastImageAt es null y actualiza el dato
  useEffect(() => {
    const authStore = localStorage.getItem("authStore");
    if (!authStore) return;
    if (attemptTokens > 0) return;
    const fetchUpdateLastImage = async () => {
      const response = await fetch("/api/updateLastImageDate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Init lastImage" }),
      });
      if (!response.ok) {
        console.log("Error en la imagen");
        return;
      }
    };
    fetchUpdateLastImage();
  }, [attemptTokens]);

  //Inicializa el dato de lastImageAt
  useEffect(() => {
    const authStore = localStorage.getItem("authStore");
    if (!authStore) return;
    const fetchLastImageAt = async () => {
      const response = await fetch("/api/getUserData");
      if (response.ok) {
        const data = await response.json();
        setAttemptTokens(data.attemptTokens);
        if (data.lastImageAt) {
          // Convertir los segundos y nanosegundos de Firebase a una fecha válida
          const lastImageTimestamp = data.lastImageAt._seconds * 1000; // Convertimos los segundos a milisegundos
          const lastImageDate = new Date(lastImageTimestamp); // Crear una instancia Date
          setLastImageAt(lastImageDate);
          // Calcular tiempo restante cuando cargue la fecha
          const remainingTime = calculateTimeRemaining(lastImageDate);
          setTimeRemaining(remainingTime);
        }
      } else {
        console.error("Error al cargar la última fecha:", response.statusText);
      }
    };
    setTimeout(() => {
      fetchLastImageAt();
    }, 1000);
  }, [photos,setAttemptTokens]);

  // Actualizar cada minuto el contador si es que hay
  useEffect(() => {
    if (lastImageAt) {
      const intervalId = setInterval(() => {
        const remainingTime = calculateTimeRemaining(lastImageAt);
        setTimeRemaining(remainingTime);
      }, 60000); // Actualizar cada minuto

      return () => clearInterval(intervalId);
    }
  }, [lastImageAt]);
  return (
    <>
      {pathname !== "/" ? (
        <div className="">
          {attemptTokens === 0 || attemptTokens === null ? (
            <div className="flex items-center justify-between text-nowrap flex-col">
              {lastImageAt !== null ? (
                <p className="font-medium text-xl text-black">
                  {" "}
                  {`Reload: ${timeRemaining}`}
                </p>
              ) : null}
              <p className="font-medium text-xl text-black">
                No <span className="font-bold text-red-600">credits! </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center text-nowrap">
              <p className="font-medium text-xl text-black">
                {attemptTokens === 1 ? `Credit ` : `Credits `}
                <span className="font-bold text-red-800">
                  {attemptTokens === 1
                    ? `${attemptTokens}`
                    : `${attemptTokens}`}
                </span>
              </p>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
export default CountData;
