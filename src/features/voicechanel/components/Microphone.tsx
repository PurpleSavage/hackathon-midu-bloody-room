"use client";
import useImageStore from "@/stores/imageStore/image.store";
import useMicStore from "@/stores/microphoneStore/microphone.store";
import { useState, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";

export default function Microphone() {
  const setMicData = useMicStore((state) => state.setMicData);
  const resultData = useMicStore((state) => state.resultData);
  const photos = useImageStore((state) => state.photos);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const attemptTokens = useImageStore((state) => state.attemptTokens);
  const chunks = useRef<Blob[]>([]);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (!resultData || attemptTokens === 0 || attemptTokens === null) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const sendAudio = async () => {
    const audioBlob = new Blob(chunks.current, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");

    try {
      const response = await fetch("/api/audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("Error en la petición");
        return;
      }

      const result = await response.json();
      setMicData(result.msg);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     mediaStream.current = stream;
  //     mediaRecorder.current = new MediaRecorder(stream);

  //     mediaRecorder.current.ondataavailable = (e) => {
  //       if (e.data.size > 0) {
  //         chunks.current.push(e.data);
  //       }
  //     };

  //     mediaRecorder.current.onstop = () => {
  //       sendAudio(); // Enviar el audio al detener la grabación
  //       chunks.current = [];
  //     };

  //     mediaRecorder.current.start();
  //     setIsRecording(true);
  //   } catch (error) {
  //     console.error("Error al acceder al micrófono:", error);
  //   }
  // };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      const maxRecordingTime = 45000; // 45 segundos en milisegundos
      let recordingTimeout: NodeJS.Timeout | null = null; // Tipo explícito

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        sendAudio(); // Enviar el audio al detener la grabación
        chunks.current = [];
        if (recordingTimeout) {
          clearTimeout(recordingTimeout); // Limpiar el temporizador si se detiene manualmente
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);

      // Detener la grabación después de 45 segundos
      recordingTimeout = setTimeout(() => {
        if (
          mediaRecorder.current &&
          mediaRecorder.current.state !== "inactive"
        ) {
          mediaRecorder.current.stop(); // Asegurarse de que no sea null antes de detener
          setIsRecording(false);
        }
      }, maxRecordingTime);
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };
  const tokensAmount = 4;
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-5">
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="text-white p-4 rounded-full hover:bg-red-700 bg-red-500 flex items-center justify-center"
        >
          <FaMicrophone size={25} className="animate-pulse" />
        </button>
      ) : (
        <>
          <button
            className={`text-white p-4 rounded-full group group-hover:text-white
          ${
            !resultData || attemptTokens === 0 || attemptTokens === null
              ? "bg-slate-500"
              : "hover:bg-slate-800 bg-black"
          }
          flex items-center justify-center`}
            onClick={startRecording}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={
              !resultData || attemptTokens === 0 || attemptTokens === null
            }
          >
            <FaMicrophoneSlash size={25} />
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300">
              <div className="rounded-sm bg-black py-1 px-2">
                <p className="whitespace-nowrap">You cannot record now.</p>
              </div>
              <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
