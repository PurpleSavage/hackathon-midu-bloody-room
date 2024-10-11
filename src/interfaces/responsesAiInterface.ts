export interface responseWhisperI{
    text:string
}


export type objtDataResponseGPT={
    role:string
    content:string
}
export interface responseTextToSpeechI{
    audioBlob:string;
    data:objtDataResponseGPT
}