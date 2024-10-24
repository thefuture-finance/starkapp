import { create } from "zustand";

export type SidebarState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toogle: () => void;
};

export const useSidebarToogle = create<SidebarState>((set) => ({
  isOpen: true,
  setIsOpen: (isOpen: boolean) => {
    set(() => ({
      isOpen: isOpen,
    }));
  },
  toogle: () => {
    set((state) => ({
      isOpen: !state.isOpen,
    }));
  },
}));
