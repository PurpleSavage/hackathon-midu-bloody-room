import Microphone from "@/features/voicechanel/components/Microphone"
import Header from "@/features/landing/components/Header"
export default function VoiceChanel() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
        <Header/>
        <div className="grow">

        </div>
        <Microphone/>
    </div>
  )
}
