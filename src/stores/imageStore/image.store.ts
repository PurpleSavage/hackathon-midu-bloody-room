import { create } from "zustand";

interface ImageStore {
  photos: string[];
  attemptTokens: number;
  setAttemptTokens: (token: number) => void;
  addPhoto: (url: string) => void;
  setPhotos: (urls: string[]) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  photos: [],
  attemptTokens: 0,
  setAttemptTokens: (attemptTokens) => set({ attemptTokens: attemptTokens }),
  addPhoto: (url) =>
    set((state) => {
      if (!state.photos.includes(url)) {
        return { photos: [...state.photos, url] };
      }
      return state;
    }),
  setPhotos: (urls) => set({ photos: urls }),
}));

export default useImageStore;
