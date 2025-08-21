import { create } from "zustand";

type OpenState = {
  openMap: Record<string, boolean>;
  toggle: (id: string) => void;
  setOpen: (id: string, open: boolean) => void;
  isOpen: (id: string) => boolean;
};

export const useMenuOpenStore = create<OpenState>((set, get) => ({
  openMap: {},
  toggle: (id) =>
    set((s) => {
      const next = !get().isOpen(id);
      return { openMap: { ...s.openMap, [id]: next } };
    }),
  setOpen: (id, open) =>
    set((s) => ({ openMap: { ...s.openMap, [id]: open } })),
  isOpen: (id) => !!get().openMap[id],
}));

// Selectors
export type OpenStore = OpenState;
export const selectIsOpen = (id: string) => (s: OpenState) => s.isOpen(id);
export const selectToggle = (s: OpenState) => s.toggle;
export const selectSetOpen = (s: OpenState) => s.setOpen;



