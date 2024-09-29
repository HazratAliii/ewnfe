import { create } from "zustand";

type Store = {
  authToken: string;
  setAuthToken: (token:string) => void;
};

const useStore = create<Store>()((set) => ({
  authToken: "",
  setAuthToken: (token: string) => set((state) => ({ authToken: token })),
}));

