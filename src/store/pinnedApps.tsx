import { create } from "zustand";

export type PinnedAppsState = {
  pinnedAppIds: string[];
  addPinnedApp: (id: string) => void;
  removePinnedApp: (id: string) => void;
};

export const usePinnedAppsStore = create<PinnedAppsState>((set) => ({
  pinnedAppIds: [],
  addPinnedApp: (id: string) =>
    set((state) => ({
      pinnedAppIds: [...state.pinnedAppIds, id], // Ensures no duplicates
    })),
  removePinnedApp: (id: string) =>
    set((state) => ({
      pinnedAppIds: state.pinnedAppIds.filter((appId) => appId !== id),
    })),
}));
