/**
 * Menu Store Factory
 * 菜单状态管理工厂函数
 * 
 * 为每个 Menu 实例创建独立的 Zustand store，避免状态共享问题
 * Creates independent Zustand store for each Menu instance to avoid state sharing issues
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { NavItem, NavData, MenuConfig, OpenStatesRecord } from '../types';
import type { MenuState, MenuActions, MenuStore } from './menuStore';

// ==================== 类型别名 Type Aliases ====================

/** 菜单变体类型 Menu variant type */
export type MenuVariant = 'sidebar' | 'horizontal' | 'collapsed';

/** 菜单主题类型 Menu theme type */
export type MenuTheme = 'light' | 'dark';

/** 菜单尺寸类型 Menu size type */
export type MenuSize = 'small' | 'medium' | 'large';

// ==================== 默认状态 Default State ====================

/**
 * 默认菜单状态
 * Default menu state
 */
const getDefaultState = (): MenuState => ({
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
});

// ==================== Store Factory ====================

/**
 * 创建菜单 Store 实例
 * Create menu store instance
 * 
 * 为每个 Menu 组件创建独立的状态管理实例
 * Creates independent state management instance for each Menu component
 * 
 * @param initialState - 初始状态（可选）Initial state (optional)
 * @returns Zustand store 实例 Zustand store instance
 */
export const createMenuStore = (initialState?: Partial<MenuState>) => {
  const defaultState = getDefaultState();
  const combinedState = { ...defaultState, ...initialState };

  return create<MenuStore>()(
    devtools(
      (set, get) => ({
        ...combinedState,
        
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
          set(getDefaultState(), false, 'reset');
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
        name: `menu-store-${Date.now()}`,
        enabled: process.env.NODE_ENV === 'development',
      }
    )
  );
};

// ==================== 类型导出 Type Exports ====================

export type MenuStoreInstance = ReturnType<typeof createMenuStore>;