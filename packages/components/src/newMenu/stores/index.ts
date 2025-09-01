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
  getExpanded: (id: string) => boolean;
};

export const useMenuStore = create<MenuStore>((set, get) => ({
  expanded: {},
  selected: null,
  collapsed: true,
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

  getExpanded: (id) => {
    const state = get();
    // 当 collapsed 或 isMobile 为 true 时，返回 false
    if (state.collapsed || state.isMobile) {
      return false;
    }
    return state.expanded[id] || false;
  },
}));
