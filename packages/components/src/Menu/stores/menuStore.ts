/**
 * Menu 组件 Zustand Store
 * Menu component Zustand Store
 * 
 * 统一管理菜单组件的所有状态，减少组件间的 props 传递
 * Centralized management of all menu component states, reducing props passing between components
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { NavItem, NavData, MenuConfig, OpenStatesRecord } from '../types';

// ==================== 类型别名 Type Aliases ====================

/** 菜单变体类型 Menu variant type */
export type MenuVariant = 'sidebar' | 'horizontal' | 'collapsed';

/** 菜单主题类型 Menu theme type */
export type MenuTheme = 'light' | 'dark';

/** 菜单尺寸类型 Menu size type */
export type MenuSize = 'small' | 'medium' | 'large';
// ==================== 状态接口定义 State Interface Definition ====================
/**
 * 菜单状态接口
 * Menu state interface
 */
export interface MenuState {
  // ==================== 核心状态 Core State ====================
  
  /** 菜单数据 Menu data */
  data: NavData | null;
  /** 菜单项列表 Menu items list */
  items: NavItem[];
  /** 菜单配置 Menu configuration */
  config: MenuConfig | null;
  
  // ==================== 显示状态 Display State ====================
  
  /** 菜单变体 Menu variant */
  variant: MenuVariant;
  /** 是否折叠 Whether collapsed */
  collapsed: boolean;
  /** 主题 Theme */
  theme: MenuTheme;
  /** 尺寸 Size */
  size: MenuSize;
  
  // ==================== 交互状态 Interaction State ====================
  
  /** 当前选中的菜单项 Currently selected menu item */
  selectedItem: string | null;
  /** 展开的菜单项记录 Expanded menu items record */
  expandedItems: string[];
  /** 菜单项展开状态记录 Menu items open states record */
  openStates: OpenStatesRecord;
  
  // ==================== 行为配置 Behavior Configuration ====================
  
  /** 是否手风琴模式 Whether accordion mode */
  accordion: boolean;
  /** 是否可折叠 Whether collapsible */
  collapsible: boolean;
  /** 回调函数 Callbacks */
  callbacks?: {
    onItemClick?: (key: string) => void;
    onItemSelect?: (key: string) => void;
    onItemToggle?: (key: string) => void;
    onToggle?: (collapsed: boolean) => void;
  };
}

/**
 * 菜单操作接口
 * Menu actions interface
 */
export interface MenuActions {
  // ==================== 数据操作 Data Operations ====================
  
  /** 设置菜单数据 Set menu data */
  setData: (data: NavData) => void;
  /** 设置菜单项 Set menu items */
  setItems: (items: NavItem[]) => void;
  /** 设置菜单配置 Set menu configuration */
  setConfig: (config: MenuConfig) => void;
  
  // ==================== 显示控制 Display Control ====================
  
  /** 设置菜单变体 Set menu variant */
  setVariant: (variant: MenuVariant) => void;
  /** 切换折叠状态 Toggle collapsed state */
  toggleCollapsed: () => void;
  /** 设置折叠状态 Set collapsed state */
  setCollapsed: (collapsed: boolean) => void;
  /** 设置主题 Set theme */
  setTheme: (theme: MenuTheme) => void;
  /** 设置尺寸 Set size */
  setSize: (size: MenuSize) => void;
  
  // ==================== 选择操作 Selection Operations ====================
  
  /** 选择菜单项 Select menu item */
  selectItem: (key: string) => void;
  /** 清除选择 Clear selection */
  clearSelection: () => void;
  /** 检查是否选中 Check if selected */
  isItemSelected: (key: string) => boolean;
  
  // ==================== 展开操作 Expansion Operations ====================
  
  /** 切换菜单项展开状态 Toggle menu item expansion */
  toggleItem: (key: string) => void;
  /** 展开菜单项 Expand menu item */
  expandItem: (key: string) => void;
  /** 折叠菜单项 Collapse menu item */
  collapseItem: (key: string) => void;
  /** 展开所有菜单项 Expand all menu items */
  expandAll: () => void;
  /** 折叠所有菜单项 Collapse all menu items */
  collapseAll: () => void;
  /** 批量设置展开状态 Batch set expansion states */
  batchSetOpenStates: (updates: Record<string, boolean>) => void;
  /** 检查是否展开 Check if expanded */
  isItemExpanded: (key: string) => boolean;
  
  // ==================== 事件处理 Event Handlers ====================
  
  /** 处理菜单项点击 Handle menu item click */
  handleItemClick: (key: string) => void;
  /** 处理菜单项切换 Handle menu item toggle */
  handleItemToggle: (key: string) => void;
  
  /** 设置展开项 Set expanded items */
  setExpandedItems: (items: string[]) => void;
  
  /** 设置回调函数 Set callbacks */
  setCallbacks: (callbacks: {
    onItemClick?: (key: string) => void;
    onItemSelect?: (key: string) => void;
    onItemToggle?: (key: string) => void;
    onToggle?: (collapsed: boolean) => void;
  }) => void;
  
  // ==================== 行为配置 Behavior Configuration ====================
  
  /** 设置手风琴模式 Set accordion mode */
  setAccordion: (accordion: boolean) => void;
  /** 设置可折叠 Set collapsible */
  setCollapsible: (collapsible: boolean) => void;
  
  // ==================== 重置操作 Reset Operations ====================
  
  /** 重置所有状态 Reset all states */
  reset: () => void;
  /** 重置选择状态 Reset selection state */
  resetSelection: () => void;
  /** 重置展开状态 Reset expansion state */
  resetExpansion: () => void;
}

/**
 * 完整的菜单 Store 类型
 * Complete menu store type
 */
export type MenuStore = MenuState & MenuActions;

// ==================== 默认状态 Default State ====================

/**
 * 默认菜单状态
 * Default menu state
 */
const defaultState: MenuState = {
  // 核心状态
  data: null,
  items: [],
  config: null,
  
  // 显示状态
  variant: 'sidebar',
  collapsed: false,
  theme: 'light',
  size: 'medium',
  
  // 交互状态
  selectedItem: null,
  expandedItems: [],
  openStates: {},
  
  // 行为配置
  accordion: false,
  collapsible: true,
  callbacks: undefined,
};

// ==================== Store 创建 Store Creation ====================

/**
 * 创建菜单 Store
 * Create menu store
 */
export const useMenuStore = create<MenuStore>()(
  devtools(
    (set, get) => ({
      ...defaultState,
      
      // ==================== 数据操作 Data Operations ====================
      
      setData: (data: NavData) => {
        set({ data }, false, 'setData');
      },
      
      setItems: (items: NavItem[]) => {
        set({ items }, false, 'setItems');
      },
      
      setConfig: (config: MenuConfig) => {
        set({ config }, false, 'setConfig');
      },
      
      // ==================== 显示控制 Display Control ====================
      
      setVariant: (variant: MenuVariant) => {
        const collapsed = variant === 'collapsed';
        set({ variant, collapsed }, false, 'setVariant');
      },
      
      toggleCollapsed: () => {
        const { collapsed } = get() as MenuState;
        const newCollapsed = !collapsed;
        const variant = newCollapsed ? 'collapsed' : 'sidebar';
        set({ collapsed: newCollapsed, variant }, false, 'toggleCollapsed');
      },
      
      setCollapsed: (collapsed: boolean) => {
        const variant = collapsed ? 'collapsed' : 'sidebar';
        set({ collapsed, variant }, false, 'setCollapsed');
      },
      
      setTheme: (theme: MenuTheme) => {
        set({ theme }, false, 'setTheme');
      },
      
      setSize: (size: MenuSize) => {
        set({ size }, false, 'setSize');
      },
      
      // ==================== 选择操作 Selection Operations ====================
      
      selectItem: (key: string | null) => {
        set({ selectedItem: key }, false, 'selectItem');
      },
      
      clearSelection: () => {
        set({ selectedItem: null }, false, 'clearSelection');
      },
      
      isItemSelected: (key: string) => {
        const { selectedItem } = get() as MenuState;
        return selectedItem === key;
      },
      
      // ==================== 展开操作 Expansion Operations ====================
      
      toggleItem: (key: string) => {
        const { expandedItems, accordion } = get() as MenuState;
        const isExpanded = expandedItems.includes(key);
        
        let newExpandedItems: string[];
        let newOpenStates: OpenStatesRecord;
        
        if (isExpanded) {
          // 折叠项目
          newExpandedItems = expandedItems.filter(item => item !== key);
          newOpenStates = { ...(get() as MenuState).openStates, [key]: false };
        } else {
          // 展开项目
          if (accordion) {
            // 手风琴模式：只保留当前项目
            newExpandedItems = [key];
            newOpenStates = { [key]: true };
          } else {
            // 普通模式：添加到列表
            newExpandedItems = [...expandedItems, key];
            newOpenStates = { ...(get() as MenuState).openStates, [key]: true };
          }
        }
        
        set({ 
          expandedItems: newExpandedItems, 
          openStates: newOpenStates 
        }, false, 'toggleItem');
      },
      
      expandItem: (key: string) => {
        const { expandedItems, openStates } = get() as MenuState;
        if (!expandedItems.includes(key)) {
          set({ 
            expandedItems: [...expandedItems, key],
            openStates: { ...openStates, [key]: true }
          }, false, 'expandItem');
        }
      },
      
      collapseItem: (key: string) => {
        const { expandedItems, openStates } = get() as MenuState;
        const newExpandedItems = expandedItems.filter((item: string) => item !== key);
        const newOpenStates = { ...openStates, [key]: false };
        
        set({ 
          expandedItems: newExpandedItems,
          openStates: newOpenStates
        }, false, 'collapseItem');
      },
      
      expandAll: () => {
        const { items } = get() as MenuState;
        const allKeys: string[] = [];
        const allOpenStates: OpenStatesRecord = {};
        
        // 递归收集所有有子项的菜单项
        const collectExpandableKeys = (menuItems: NavItem[]) => {
          menuItems.forEach(item => {
            if (item.children && item.children.length > 0) {
              allKeys.push(item.path);
              allOpenStates[item.path] = true;
              collectExpandableKeys(item.children);
            }
          });
        };
        
        collectExpandableKeys(items);
        
        set({ 
          expandedItems: allKeys,
          openStates: allOpenStates
        }, false, 'expandAll');
      },
      
      collapseAll: () => {
        set({ 
          expandedItems: [],
          openStates: {}
        }, false, 'collapseAll');
      },
      
      batchSetOpenStates: (updates: Record<string, boolean>) => {
        const { openStates, expandedItems } = get() as MenuState;
        const newOpenStates = { ...openStates, ...updates };
        
        // 更新 expandedItems 以保持一致性
        const newExpandedItems = Object.entries(newOpenStates)
          .filter(([, isOpen]) => isOpen)
          .map(([key]) => key);
        
        set({ 
          openStates: newOpenStates,
          expandedItems: newExpandedItems
        }, false, 'batchSetOpenStates');
      },
      
      isItemExpanded: (key: string) => {
        const { expandedItems } = get() as MenuState;
        return expandedItems.includes(key);
      },
      
      // ==================== 事件处理 Event Handlers ====================
      
      handleItemClick: (key: string) => {
        // 选中菜单项
        set({ selectedItem: key }, false, 'handleItemClick');
      },
      
      handleItemToggle: (key: string) => {
        const { expandedItems, accordion } = get() as MenuState;
        const isExpanded = expandedItems.includes(key);
        
        let newExpandedItems: string[];
        let newOpenStates: OpenStatesRecord;
        
        if (isExpanded) {
          // 折叠项目
          newExpandedItems = expandedItems.filter(item => item !== key);
          newOpenStates = { ...(get() as MenuState).openStates, [key]: false };
        } else {
          // 展开项目
          if (accordion) {
            // 手风琴模式：只保留当前项目
            newExpandedItems = [key];
            newOpenStates = { [key]: true };
          } else {
            // 普通模式：添加到列表
            newExpandedItems = [...expandedItems, key];
            newOpenStates = { ...(get() as MenuState).openStates, [key]: true };
          }
        }
        
        set({ 
          expandedItems: newExpandedItems, 
          openStates: newOpenStates 
        }, false, 'handleItemToggle');
       },
       
       setExpandedItems: (items: string[]) => {
         const openStates: OpenStatesRecord = {};
         items.forEach(key => {
           openStates[key] = true;
         });
         set({ 
           expandedItems: items, 
           openStates 
         }, false, 'setExpandedItems');
       },
       
       setCallbacks: (callbacks: {
         onItemClick?: (key: string) => void;
         onItemSelect?: (key: string) => void;
         onItemToggle?: (key: string) => void;
         onToggle?: (collapsed: boolean) => void;
       }) => {
         // 存储回调函数到状态中
         set({ 
           callbacks 
         }, false, 'setCallbacks');
       },
       
       // ==================== 行为配置 Behavior Configuration ====================
      
      setAccordion: (accordion: boolean) => {
        set({ accordion }, false, 'setAccordion');
      },
      
      setCollapsible: (collapsible: boolean) => {
        set({ collapsible }, false, 'setCollapsible');
      },
      
      // ==================== 重置操作 Reset Operations ====================
      
      reset: () => {
        set(defaultState, false, 'reset');
      },
      
      resetSelection: () => {
        set({ selectedItem: null }, false, 'resetSelection');
      },
      
      resetExpansion: () => {
        set({ 
          expandedItems: [],
          openStates: {}
        }, false, 'resetExpansion');
      },
    }),
    {
      name: 'menu-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ==================== 选择器 Hooks Selectors ====================

/**
 * 获取菜单基本状态的选择器
 * Selector for basic menu state
 */
export const useMenuBasicState = () => useMenuStore((state) => ({
  variant: state.variant,
  collapsed: state.collapsed,
  theme: state.theme,
  size: state.size,
}));

/**
 * 获取菜单交互状态的选择器
 * Selector for menu interaction state
 */
export const useMenuInteractionState = () => useMenuStore((state) => ({
  selectedItem: state.selectedItem,
  expandedItems: state.expandedItems,
  openStates: state.openStates,
}));

/**
 * 获取菜单操作方法的选择器
 * Selector for menu action methods
 */
export const useMenuActions = () => useMenuStore((state) => ({
  selectItem: state.selectItem,
  toggleItem: state.toggleItem,
  expandItem: state.expandItem,
  collapseItem: state.collapseItem,
  expandAll: state.expandAll,
  collapseAll: state.collapseAll,
  toggleCollapsed: state.toggleCollapsed,
  setCollapsed: state.setCollapsed,
  reset: state.reset,
}));

/**
 * 获取菜单检查方法的选择器
 * Selector for menu check methods
 */
export const useMenuCheckers = () => useMenuStore((state) => ({
  isItemSelected: state.isItemSelected,
  isItemExpanded: state.isItemExpanded,
}));