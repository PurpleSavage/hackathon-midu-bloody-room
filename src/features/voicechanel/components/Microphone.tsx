"use client";
import useImageStore from "@/stores/imageStore/image.store";
import useMicStore from "@/stores/microphoneStore/microphone.store";
import { useState, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";
import { Toaster, toast } from "sonner";

export default function Microphone() {
  const setMicData = useMicStore((state) => state.setMicData);
  const resultData = useMicStore((state) => state.resultData);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const attemptTokens = useImageStore((state) => state.attemptTokens);
  const chunks = useRef<Blob[]>([]);

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
    } catch (error) {
      console.log(error);
    }
  };
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
            onClick={() => {
              if (
                !resultData ||
                attemptTokens === 0 ||
                attemptTokens === null
              ) {
                toast.error("No credits available or no image data.",{
                  className: "text-red-800",
                });
              } else {
                startRecording();
              }
            }}
          >
            <FaMicrophoneSlash size={25} />
          </button>
          <Toaster className="text-red-800" position="top-right" />
        </>
      )}
    </div>
  );
}
