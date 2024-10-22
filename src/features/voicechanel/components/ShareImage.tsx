import { nosifer } from "@/fonts/fonts";
import { MdShare } from "react-icons/md";

type PropsI = {
  photos: string[];
  activeIndex: number;
};
function ShareImage(props: PropsI) {
  const { activeIndex, photos } = props;

  const handleCopy = () => {
    const photoURL = photos[activeIndex];
    navigator.clipboard.writeText(photoURL).catch((error) => {
      console.error("Error al copiar el enlace: ", error);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`p-2 bg-red-800 text-white hover:bg-slate-300 hover:text-red-800 rounded focus:outline-none ${nosifer.className} transition-all duration-500 flex justify-center`}
    >
      <MdShare className="text-2xl" />
    </button>
  );
}
export default ShareImage;
