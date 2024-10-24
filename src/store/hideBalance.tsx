import { create } from "zustand";

export type HideBalanceState = {
  isHide: boolean;
  setIsHide: (isHide: boolean) => void;
  toogle: () => void;
};

export const useHideBalance = create<HideBalanceState>((set) => ({
  isHide: true,
  setIsHide: (isHide: boolean) => {
    set(() => ({
      isHide: isHide,
    }));
  },
  toogle: () => {
    set((state) => ({
      isHide: !state.isHide,
    }));
  },
}));
