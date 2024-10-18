import { NextResponse } from "next/server";
import { responseWhisperI } from "@/interfaces/responsesAiInterface";

export async function POST(req: Request) {
  const formData = await req.formData();
  formData.append("model", "whisper-1");
  formData.append("language", "es");
  try {
    const url = "https://api.openai.com/v1/audio/transcriptions";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Error al transcribir el audio");
      return NextResponse.json({ msg: "Error al transcribir tu audio" });
    }

    const transcript: responseWhisperI = await response.json();
    return NextResponse.json({ msg: transcript.text }, { status: 200 });
  } catch (error) {
    console.error("Error interno:", error);
    return NextResponse.json({ msg: "Error interno", status: 500 });
  }
}
