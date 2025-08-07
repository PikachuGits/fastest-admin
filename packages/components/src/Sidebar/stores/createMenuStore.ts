import { createStore } from 'zustand/vanilla';
import type { MenuStoreState, InternalMenuItem, MenuData } from '../types';
import { normalizeMenuData, convertNavSectionsToMenuItems } from '../utils/convert';

// 递归查找指定 key 的菜单项
const findItem = (items: InternalMenuItem[], key: string): InternalMenuItem | undefined => {
  for (const item of items) {
    if (item.key === key) return item;
    if (item.children) {
      const found = findItem(item.children, key);
      if (found) return found;
    }
  }
  return undefined;
};

// 辅助函数：将 data 标准化为 InternalMenuItem 数组
const normalizeData = (data?: MenuData | InternalMenuItem[]): InternalMenuItem[] => {
  if (!data) return [];
  
  // 如果是旧格式的 InternalMenuItem[] 数组，直接返回
  if (Array.isArray(data) && data.length > 0 && 'key' in data[0]) {
    return data as InternalMenuItem[];
  }
  
  // 否则标准化为 NavSection[]，然后转换为 InternalMenuItem[]
  const sections = normalizeMenuData(data);
  return convertNavSectionsToMenuItems(sections);
};

export const createMenuStore = () =>
  createStore<MenuStoreState>((set, get) => ({
    // ===================================================================
    //                              STATE
    // ===================================================================
    variant: 'sidebar',
    theme: 'light',
    size: 'medium',
    collapsible: false,
    accordion: false,
    selectedItem: undefined,
    expandedItems: [],
    data: undefined,
    callbacks: {},

    // ===================================================================
    //                              ACTIONS
    // ===================================================================
    setVariant: (v) => set({ variant: v }),
    setTheme: (t) => set({ theme: t }),
    setSize: (s) => set({ size: s }),
    setCollapsible: (c) => set({ collapsible: c }),
    setAccordion: (a) => set({ accordion: a }),
    setData: (d) => set({ data: d }),
    setCallbacks: (cb) =>
      set((state) => ({ callbacks: { ...state.callbacks, ...cb } })),

    // Core interaction logic
    selectItem: (key) => {
      const { data, callbacks } = get();
      const normalizedData = normalizeData(data);
      const item = findItem(normalizedData, key);
      if (item) {
        set({ selectedItem: key });
        callbacks.onSelect?.(key, item);
        callbacks.onClick?.(item);
      }
    },
    setExpandedItems: (keys) => {
      set({ expandedItems: keys });
    },
    toggleItem: (key) => {
      const { expandedItems, accordion, callbacks } = get();
      const isCurrentlyExpanded = expandedItems.includes(key);
      const newExpandedItems = isCurrentlyExpanded
        ? expandedItems.filter((k) => k !== key)
        : accordion
        ? [key]
        : [...expandedItems, key];

      set({ expandedItems: newExpandedItems });
      callbacks.onToggle?.(key, !isCurrentlyExpanded);
    },
  }));