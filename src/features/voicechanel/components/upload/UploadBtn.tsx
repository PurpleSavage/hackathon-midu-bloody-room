"use client";
import { useEffect, useState } from "react";
import "./style.css";
import { CldUploadWidget } from "next-cloudinary";
import { ExtendedCloudinaryUploadWidgetResults } from "@/interfaces/cldUploadResults";
import UploadedPhotoGenerated from "../UploadedPhotoGenerated";

function UploadBtn({
  micData,
  setMicData,
}: {
  micData: string;
  setMicData: (data: string) => void;
}) {
  const [resultData, setResultData] =
    useState<ExtendedCloudinaryUploadWidgetResults | null>(null);

  const [showUploadedPhoto, setShowUploadedPhoto] = useState(true);

  // Ocultar el componente cuando el resultData cambia
  useEffect(() => {
    if (resultData) {
      setShowUploadedPhoto(false); // Oculta UploadedPhotoGenerated cuando cambia el resultData
      setMicData("");
    }
  }, [resultData]);

  // Mostrar UploadedPhotoGenerated nuevamente cuando micData cambie
  useEffect(() => {
    if (micData) {
      setShowUploadedPhoto(true);
    }
  }, [micData]);
  return (
    <section className="flex flex-col gap-10 items-center justify-center">
      <div
        className={`flex ${
          resultData && micData ? "justify-between" : "justify-center"
        }`}
      >
        {resultData && (
          <div
            className={`${
              micData ? "w-1/2" : "w-full"
            } flex items-center justify-center`}
          >
            <img
              src={resultData.info.url}
              alt={resultData.info.public_id}
              className="w-1/2 rounded-md"
            />
          </div>
        )}
        {micData && showUploadedPhoto && (
          <div
            className={`${
              resultData ? "w-1/2" : "w-full"
            } flex items-center justify-center`}
          >
            <UploadedPhotoGenerated
              id={resultData?.info.public_id}
              micPrompt={micData}
            />
          </div>
        )}
      </div>

      <div className="input-div">
        <CldUploadWidget
          options={{
            sources: ["local", "camera", "google_drive", "dropbox"],
            multiple: false,
            maxFiles: 1,
          }}
          uploadPreset="upload-unsinged-images"
          onSuccess={(result) => {
            const parsedResult =
              result as unknown as ExtendedCloudinaryUploadWidgetResults;
            // Verifica que las propiedades clave existan antes de establecer el estado
            if (parsedResult && parsedResult.info && parsedResult.info.url) {
              setResultData(parsedResult);
              console.log("INFO", parsedResult.info);
            } else {
              console.error(
                "El resultado no tiene la estructura esperada",
                result
              );
            }
          }}
        >
          {({ open }) => {
            return (
              <button
                className="w-full h-full flex items-center justify-center -ml-1"
                onClick={() => open()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="icon ml-2 text-gray-500"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line y2="21" x2="12" y1="12" x1="12"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </section>
  );
}
export default UploadBtn;
