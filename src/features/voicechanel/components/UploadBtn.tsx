"use client";
import style from "../css/voicecss.module.css";
import { CldUploadWidget } from "next-cloudinary";
import { ExtendedCloudinaryUploadWidgetResults } from "@/interfaces/cldUploadResults";
import useMicStore from "@/stores/microphoneStore/microphone.store";
import useImageStore from "@/stores/imageStore/image.store";

function UploadBtn() {
  const setResultData = useMicStore((state) => state.setResultData);
  const setMicData = useMicStore((state) => state.setMicData);
  const attemptTokens = useImageStore((state) => state.attemptTokens);
  return (
    <section className="flex items-center justify-center">
      {attemptTokens === 0 || attemptTokens === null ? null : (
        <div className={`${style.inputDiv}`}>
          <CldUploadWidget
            options={{
              sources: ["local"],
              multiple: false,
              maxFiles: 1,
            }}
            uploadPreset="upload-unsinged-images"
            onOpen={() => {
              setResultData(null);
              setMicData("");
            }}
            onClose={() => {
              document.body.style.overflow = "auto"; // Deshabilitar overflow hidden
            }}
            onSuccess={(result) => {
              document.body.style.overflow = "auto"; // Deshabilitar overflow hidden
              const parsedResult =
                result as unknown as ExtendedCloudinaryUploadWidgetResults;
              // Verifica que las propiedades clave existan antes de establecer el estado
              if (parsedResult && parsedResult.info && parsedResult.info.url) {
                setResultData(parsedResult);
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
                    className={`${style.icon} ml-2 text-gray-500`}
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
      )}
    </section>
  );
}
export default UploadBtn;
