import { create } from "zustand";

type User = {
  nome: string;
  matricula: string;
};

type UserStore = {
  usuario: User | null;
  setUsuario: (user: User) => void;
  limparUsuario: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  usuario: null,
  setUsuario: (user) => set({ usuario: user }),
  limparUsuario: () => set({ usuario: null }),
}));
