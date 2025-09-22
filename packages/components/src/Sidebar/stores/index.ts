import { create } from "zustand";
import { getParentIdsForSelectedItem } from "../utils/menuUtils";

/**
 * 菜单状态管理类型定义
 * Menu state management type definitions
 */
type MenuStore = {
  /** 菜单项展开状态记录，key为菜单项id，value为是否展开 */
  expanded: Record<string, boolean>;

  /** 当前选中的菜单项id */
  selected: string | null;

  /** 侧边栏是否折叠 - true: 折叠, false: 展开 */
  collapsed: boolean;

  /** 是否为移动端模式 */
  isMobile: boolean;

  /** 切换菜单项的展开/收起状态（在收起状态下自动禁用） */
  toggleExpand: (id: string) => void;

  /** 选中菜单项（选中时会自动收起其他展开项，但保持选中项的父级展开） */
  selectItem: (id: string, menuData?: any[]) => void;

  /** 切换侧边栏折叠/展开状态 */
  toggleCollapsed: () => void;

  /** 设置侧边栏折叠状态 - true: 折叠, false: 展开 */
  setCollapsed: (collapsed: boolean) => void;

  /** 设置移动端模式 */
  setMobileMode: (isMobile: boolean) => void;

  /** 获取指定菜单项的展开状态（考虑collapsed和isMobile状态） */
  getExpanded: (id: string) => boolean;
};

/**
 * 菜单状态管理 Store
 * Menu state management store using Zustand
 */
export const useMenuStore = create<MenuStore>((set, get) => ({
  /** 初始化展开状态为空对象 */
  expanded: {},

  /** 初始化选中项为空 */
  selected: null,

  /** 初始化为折叠状态 */
  collapsed: true,

  /** 初始化为非移动端模式 */
  isMobile: false,

  /**
   * 切换菜单项展开状态
   * 当侧边栏折叠时，禁用展开功能
   * @param id 菜单项的唯一标识符
   */
  toggleExpand: (id) =>
    set((state) => {
      // 当侧边栏折叠或移动端模式时，禁用展开功能
      if (state.collapsed || state.isMobile) {
        return state; // 返回当前状态，不做任何修改
      }

      return {
        expanded: {
          ...state.expanded,
          [id]: !state.expanded[id],
        },
      };
    }),

  /**
   * 选中菜单项，选中时自动收起其他展开项，但保持选中项的父级展开
   * @param id 要选中的菜单项id
   * @param menuData 菜单数据（可选，用于计算需要保持展开的父级）
   */
  selectItem: (id, menuData) =>
    set((state) => {
      if (!menuData) {
        // 如果没有菜单数据，使用原来的逻辑（清空所有展开状态）
        return {
          selected: id,
          expanded: {},
        };
      }

      // 获取选中项的所有父级ID
      const parentIds = getParentIdsForSelectedItem(menuData, id);

      // 创建新的展开状态，只保留选中项的父级展开状态
      const newExpanded: Record<string, boolean> = {};
      parentIds.forEach((parentId) => {
        newExpanded[parentId] = true;
      });

      return {
        selected: id,
        expanded: newExpanded,
      };
    }),

  /**
   * 切换侧边栏折叠/展开状态
   */
  toggleCollapsed: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
  /**
   * 设置侧边栏折叠状态
   * @param collapsed 是否折叠侧边栏 - true: 折叠, false: 展开
   */
  setCollapsed: (collapsed) =>
    set(() => ({
      collapsed,
    })),
  /**
   * 设置移动端模式
   * @param isMobile 是否为移动端模式
   */
  setMobileMode: (isMobile) =>
    set(() => ({
      isMobile,
    })),

  /**
   * 获取指定菜单项的展开状态
   * 当侧边栏折叠或处于移动端模式时，强制返回 false
   * @param id 菜单项id
   * @returns 是否展开
   */
  getExpanded: (id) => {
    const state = get();
    // 当 collapsed 或 isMobile 为 true 时，返回 false
    if (state.collapsed || state.isMobile) {
      return false;
    }
    return state.expanded[id] || false;
  },
}));
