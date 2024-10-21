import { create } from "zustand";

interface ImageStore {
  photos: string[];
  attemptTokens: number;
  setAttemptTokens: (token: number) => void;
  addPhoto: (url: string) => void;
  setPhotos: (urls: string[]) => void;
}
const defaultImageUrl =
  "https://res.cloudinary.com/dekmzfcpp/image/upload/v1729470771/defaultImage_ddqdig.png";

const useImageStore = create<ImageStore>((set) => ({
  photos: [],
  attemptTokens: 0,
  setAttemptTokens: (attemptTokens) => set({ attemptTokens: attemptTokens }),
  addPhoto: (url) =>
    set((state) => {
      let updatedPhotos = [...state.photos];
      if (updatedPhotos.includes(defaultImageUrl)) {
        updatedPhotos = updatedPhotos.filter(
          (photo) => photo !== defaultImageUrl
        );
      }
      if (!updatedPhotos.includes(url)) {
        updatedPhotos.push(url);
      }
      return { photos: updatedPhotos };
    }),
  setPhotos: (urls) => set({ photos: urls }),
}));

export default useImageStore;
