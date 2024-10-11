'use client'
import { useState,useRef } from "react";
import {FaMicrophone,FaMicrophoneSlash   } from "react-icons/fa6";


export default function Microphone() {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const mediaStream = useRef<MediaStream | null>(null);
    const chunks = useRef<Blob[]>([]);


    const sendAudio = async () => {
        const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.webm");
    
        try {
          const response = await fetch('/api/audio', {
            method: "POST",
            body: formData
          });
    
          if (!response.ok) {
            console.log("Error en la petición");
            return;
          }
    
          const result= await response.json();
          console.log(result)
        } catch (error) {
          console.log(error);
        }
      };
    const startRecording = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStream.current = stream;
          mediaRecorder.current = new MediaRecorder(stream);
    
          mediaRecorder.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.current.push(e.data);
            }
          };
    
          mediaRecorder.current.onstop = () => {
            sendAudio();  // Enviar el audio al detener la grabación
            chunks.current = [];
          };
    
          mediaRecorder.current.start();
          setIsRecording(true);
        } catch (error) {
          console.error('Error al acceder al micrófono:', error);
        }
      };
      const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
          mediaRecorder.current.stop();
        }
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
      };
    return (
        <div className="w-full flex justify-center items-center py-10">
            {isRecording ? (
            <button
              onClick={stopRecording}
              className="text-white p-4 rounded-full hover:bg-slate-800 bg-black flex items-center justify-center"
            >
              <FaMicrophone size={25}/>
            </button>
          ) : (
            <button
              className="text-white p-4 rounded-full hover:bg-slate-800 bg-black flex items-center justify-center"
              onClick={startRecording}
            >
              <FaMicrophoneSlash size={25}/>
            </button>
          )}
        </div>
    )
}
