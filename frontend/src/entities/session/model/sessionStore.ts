import { create } from "zustand";

interface AuthStore {
  accessToken: null | string;
  setAccessToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  clearToken: () => set({ accessToken: null }),
}));
