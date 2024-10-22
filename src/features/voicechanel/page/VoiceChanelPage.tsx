import Microphone from "@/features/voicechanel/components/Microphone";
import Header from "@/features/landing/components/Header";
import Image from "next/image";
import UploadBtn from "@/features/voicechanel/components/UploadBtn";
import UploadedPhoto from "../components/UploadedPhoto";
function VoiceChanelPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Image
        width={200}
        height={100}
        className="absolute top-0 left-[20%] drop-shadow-lg"
        unoptimized
        src="/images/grieta-1.png"
        alt="Horror movie blood stain."
      />
      <Image
        width={200}
        height={100}
        className="absolute bottom-0 right-20 drop-shadow-lg"
        unoptimized
        src="/images/grieta-2.png"
        alt="Horror movie blood stain."
      />
      <Image
        width={300}
        height={100}
        className="absolute -top-20 right-72 drop-shadow-lg hidden"
        unoptimized
        src="/images/blood-voice-chanel-1.png"
        alt="Horror movie blood stain."
      />

      <div className="absolute z-10 flex flex-col bottom-0 right-0 left-0 top-0">
        <Header />
        <div className="grow overflow-y-auto">
          <div className=" flex flex-col justify-center items-center">
            <UploadedPhoto />
          </div>
          <UploadBtn />
          <Microphone />
        </div>
      </div>
    </div>
  );
}
export default VoiceChanelPage;
