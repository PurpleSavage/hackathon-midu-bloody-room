import { nosifer } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import PhotoUser from "@/features/shared/PhotoUser";
import CountData from "@/features/voicechanel/components/CountData";
import ProfileMenu from "./ProfileMenu";
export default function Header() {
  return (
    <header className="flex items-center border-b border-slate-700  py-4 md:px-4 w-full ">
      <Link href="/" className=" gap-4 items-center cursor-pointer md:flex hidden">
        <Image
          width={30}
          height={30}
          unoptimized
          src="/images/bloody-hand.png"
          alt="bloody hand"
        />
        <span
          className={`block py-2 text-red-800 tracking-widest font-bold ${nosifer.className}`}
        >
          Bloody Room
        </span>
      </Link>
      <div className="grow flex items-center justify-between md:justify-end px-4 md:pr-10 gap-2 py-2 ">
        <CountData />
        <PhotoUser />
        <ProfileMenu/>
      </div>
    </header>
  );
}
