import { nosifer } from "@/fonts/fonts";
import { MdOutlineFileDownload } from "react-icons/md";

type PropsI = {
  photos: string[];
  activeIndex: number;
};
function DownloadImage(props: PropsI) {
  const { activeIndex, photos } = props;
  const downloadImage = (url: string) => {
    // Agregar un retraso de 500 ms antes de iniciar la descarga
    fetch(url, {
      mode: "cors",
    })
      .then((response) => response.blob()) // Obtener los datos como un blob
      .then((blob) => {
        const urlBlob = window.URL.createObjectURL(blob); // Crear URL a partir del blob
        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = `image_${activeIndex + 1}.png`;
        document.body.appendChild(a);
        a.click(); // Simular el click
        document.body.removeChild(a);
      })
      .catch((err) => console.error("Error al descargar la imagen:", err))
      .finally(() => {});
  };
  return (
    <button
      onClick={() => downloadImage(photos[activeIndex])}
      className={`p-2 rounded-md flex items-center justify-center ${nosifer.className} bg-red-800 text-white hover:bg-slate-300 hover:text-red-800 transition-all duration-500`}
    >
      <MdOutlineFileDownload className="text-2xl" />
    </button>
  );
}
export default DownloadImage;
