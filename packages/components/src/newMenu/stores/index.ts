import { create } from "zustand";

type MenuStore = {
  expanded: Record<string, boolean>;
  selected: string | null;
  collapsed: boolean;
  isMobile: boolean;
  toggleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileMode: (isMobile: boolean) => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  expanded: {},
  selected: null,
  collapsed: false,
  isMobile: false,

  toggleExpand: (id) =>
    set((state) => ({
      expanded: {
        ...state.expanded,
        [id]: !state.expanded[id],
      },
    })),

  selectItem: (id) =>
    set(() => ({
      selected: id,
    })),

  toggleCollapsed: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),

  setCollapsed: (collapsed) =>
    set(() => ({
      collapsed,
    })),

  setMobileMode: (isMobile) =>
    set(() => ({
      isMobile,
    })),
}));
