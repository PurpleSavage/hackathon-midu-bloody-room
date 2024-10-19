import { ExtendedCloudinaryUploadWidgetResults } from "@/interfaces/cldUploadResults";
import { create } from "zustand";

interface MicStoreState {
  micData: string;
  resultData: ExtendedCloudinaryUploadWidgetResults | null;
  showUploadedPhoto: boolean;
  setMicData: (data: string) => void;
  setResultData: (data: ExtendedCloudinaryUploadWidgetResults | null) => void;
  setShowUploadedPhoto: (value: boolean) => void;
}

const useMicStore = create<MicStoreState>((set) => ({
  micData: "",
  resultData: null,
  showUploadedPhoto: true,
  setMicData: (data) => set({ micData: data }),
  setResultData: (data) => set({ resultData: data }),
  setShowUploadedPhoto: (value) => set({ showUploadedPhoto: value }),
}));

export default useMicStore;
