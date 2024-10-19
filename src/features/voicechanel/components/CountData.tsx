"use client";
import useImageStore from "@/stores/imageStore/image.store";
import { useEffect, useState } from "react";

function CountData() {
  const [lastImageAt, setLastImageAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("Calculando...");
  const photos = useImageStore((state) => state.photos);
  const attemptTokens = useImageStore((state) => state.attemptTokens);
  const setAttemptTokens = useImageStore((state) => state.setAttemptTokens);

  const calculateTimeRemaining = (lastDate: Date) => {
    const now = new Date();
    const timeDiffMs = now.getTime() - lastDate.getTime();

    // Comprobamos que el tiempo no es negativo
    if (timeDiffMs < 0) {
      return "En unos segundos...";
    }

    const timeDiffHrs = 24 - timeDiffMs / (1000 * 60 * 60); // Diferencia en horas

    // Si el tiempo restante es negativo o cero, ya pasaron 24h
    if (timeDiffHrs <= 0) {
      return "En unos segundos...";
    }

    if (timeDiffHrs >= 1) {
      return `${Math.floor(timeDiffHrs)}h`;
    } else {
      const timeDiffMins = Math.floor(timeDiffHrs * 60);
      return `${timeDiffMins}m`;
    }
  };

  //inicializa con la verificacion si es que ya pasaron las 24 horas o si lastImageAt es null y actualiza el dato
  useEffect(() => {
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
        console.log("Error en el fetch del PATCH", response);
        console.log("Error en el fetch", await response.json());
        return;
      }
      const result = await response.json();
      console.log("Update lastImageDate", result);
    };
    fetchUpdateLastImage();
  }, []);

  //Inicializa el dato de lastImageAt
  useEffect(() => {
    const fetchLastImageAt = async () => {
      const response = await fetch("/api/getUserData");
      if (response.ok) {
        const data = await response.json();
        console.log("fecha", data.lastImageAt);
        console.log("intentos restantes", data.attemptTokens);
        setAttemptTokens(data.attemptTokens);
        // if (!data.attemptTokens === null) {
        //   setAttemptTokens(data.attemptTokens);
        // } else {
        //   setAttemptTokens(0);
        // }
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

    fetchLastImageAt();
  }, [photos]);

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
    <div className="w-11/12 mb-12">
      {attemptTokens === 0 || attemptTokens === null ? (
        <div className="flex items-center justify-between">
          {lastImageAt !== null ? (
            <p className="font-medium text-xl">
              {" "}
              {`Recarga de tokens en: ${timeRemaining}`}
            </p>
          ) : null}
          <p className="font-medium text-xl">
            ¡Te quedaste sin{" "}
            <span className="font-bold text-red-600">toknes! </span>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <p className="font-medium text-xl">
            {attemptTokens === 1 ? `Te queda ` : `Te quedan `}
            <span className="font-bold text-red-600">
              {attemptTokens === 1
                ? `${attemptTokens} token`
                : `${attemptTokens} tokens`}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
export default CountData;
