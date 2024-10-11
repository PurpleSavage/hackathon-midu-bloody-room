
import { NextResponse } from 'next/server';
import { responseWhisperI,responseTextToSpeechI } from '@/interfaces/responsesAiInterface';



async function gptRequest(trasncript: string) {
    const objtBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": trasncript}],
        "temperature": 0.7
    };

    try {
        const responseAssitant = await fetch("https://api.openai.com/v1/chat/completions",{
            method: "POST",
            body: JSON.stringify(objtBody),
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!responseAssitant.ok) {
            console.error("Error en la respuesta de gpt");
            return undefined;
        }

        const context = await responseAssitant.json();
        return context;
    } catch (error) {
        console.error("Error interno:", error);
        return undefined;
    }
}

async function textToSpeechRequest(text: string): Promise<Blob | undefined> {
    try {
        const response = await fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            body: JSON.stringify({
                model: "tts-1",
                voice: "alloy",
                input: text
            }),
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error("Error al generar el audio de la respuesta");
            return undefined;
        }

        const responseSpeech = await response.blob();
  
        return responseSpeech ;

    } catch (error) {
        console.error("Error interno:", error);
        return undefined;
    }
}



export async function POST(req: Request){
    const formData = await req.formData();
    formData.append("model", "whisper-1");
    formData.append('language', 'es');
    try {
        const url = "https://api.openai.com/v1/audio/transcriptions";
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error("Error al transcribir el audio");
            return NextResponse.json({ msg: "Error al transcribir tu audio" });
        }

        const transcript: responseWhisperI = await response.json();
        const data = await gptRequest(transcript.text);
        const responseSpeech = await textToSpeechRequest(data.choices[0].message.content);

        if (!responseSpeech) {
            console.error("Error al generar el audio de la respuesta");
            return NextResponse.json({ msg: "Error al generar el audio de la respuesta" });
        }
        


       if(!responseSpeech)  {
            console.error("Error al generar el audio de la respuesta");
            return NextResponse.json({ msg: "Error al generar el audio de la respuesta" });
        }

        // Convert the Blob to base64
        const audioBuffer = await responseSpeech.arrayBuffer();
        const audioBase64 = Buffer.from(audioBuffer).toString('base64');

        

        const responseUser: responseTextToSpeechI = {
            audioBlob: audioBase64 ,
            data: data.choices[0].message
        };

        const respuesta = NextResponse.json(responseUser)
        return respuesta;

    } catch (error) {
        console.error("Error interno:", error);
        return NextResponse.json({ msg: "Error interno", status: 500 });
    }
}