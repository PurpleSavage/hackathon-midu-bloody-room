
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
    photo: string | null 
    setSession: (photo: string | null) => void
}

export const useAuthStore = create<AuthState >()(
  devtools(
    persist(
      (set) => ({
        photo: null,
        setSession: (photo) => set(() => ({ photo: photo })),
      }),
      { name: 'authStore' },
    ),
  ),
)