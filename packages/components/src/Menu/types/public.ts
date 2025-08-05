/**
 * Menu 组件公共类型定义
 * Menu component public type definitions
 * 
 * 提供简化的、面向用户的类型接口
 * Provides simplified, user-facing type interfaces
 */

import React from 'react';

// ==================== 核心数据类型 Core Data Types ====================

/**
 * 简化的菜单项接口
 * Simplified menu item interface
 * 
 * 定义单个菜单项的数据结构，简化了原有的复杂配置
 * Defines the data structure for a single menu item, simplified from complex original configuration
 */
export interface MenuItem {
  /** 菜单项唯一标识 Unique identifier for menu item */
  key: string;
  /** 菜单项显示标题 Menu item display title */
  title: string;
  /** 图标（字符串标识符或React组件）Icon (string identifier or React component) */
  icon?: string | React.ReactNode;
  /** 菜单项路径或链接 Menu item path or link */
  path?: string;
  /** 徽章内容（文字或数字）Badge content (text or number) */
  badge?: string | number;
  /** 子菜单项列表 Sub-menu items list */
  children?: MenuItem[];
  /** 是否禁用 Whether disabled */
  disabled?: boolean;
  /** 是否隐藏 Whether hidden */
  hidden?: boolean;
  /** 访问权限角色列表 Access permission roles list */
  roles?: string[];
}

// ==================== 组件属性类型 Component Props Types ====================

/**
 * 简化的菜单组件属性接口
 * Simplified menu component props interface
 * 
 * 大幅简化了原有的复杂配置，提供直观易用的接口
 * Significantly simplified from complex original configuration, providing intuitive and easy-to-use interface
 */
export interface MenuProps {
  // ==================== 核心数据 Core Data ====================
  
  /** 菜单项数据列表 Menu items data list */
  items?: MenuItem[];
  /** 兼容原有NavData格式 Compatible with original NavData format */
  data?: any;
  
  // ==================== 简化配置 Simplified Configuration ====================
  
  /** 菜单变体类型 Menu variant type */
  variant?: 'sidebar' | 'horizontal' | 'collapsed';
  /** 主题样式 Theme style */
  theme?: 'light' | 'dark';
  /** 尺寸大小 Size */
  size?: 'small' | 'medium' | 'large';
  
  // ==================== 行为配置 Behavior Configuration ====================
  
  /** 默认选中的菜单项key Default selected menu item key */
  defaultSelected?: string;
  /** 默认展开的菜单项key列表 Default expanded menu item keys list */
  defaultExpanded?: string[];
  /** 是否可折叠 Whether collapsible */
  collapsible?: boolean;
  /** 是否手风琴模式（同时只能展开一个）Whether accordion mode (only one can be expanded at a time) */
  accordion?: boolean;
  
  // ==================== 受控状态 Controlled State ====================
  
  /** 受控：当前选中的菜单项key Controlled: currently selected menu item key */
  selectedItem?: string;
  /** 受控：当前展开的菜单项key列表 Controlled: currently expanded menu item keys list */
  expandedItems?: string[];
  
  // ==================== 事件回调 Event Callbacks ====================
  
  /** 菜单项点击回调 Menu item click callback */
  onItemClick?: (item: MenuItem, path: string) => void;
  /** 菜单项选中回调 Menu item select callback */
  onItemSelect?: (item: MenuItem, path: string) => void;
  /** 菜单项展开/折叠回调 Menu item expand/collapse callback */
  onItemToggle?: (key: string, expanded: boolean) => void;
  /** 菜单折叠状态变化回调 Menu collapse state change callback */
  onToggle?: (collapsed: boolean) => void;
  
  // ==================== 样式定制 Style Customization ====================
  
  /** 自定义CSS类名 Custom CSS class name */
  className?: string;
  /** 自定义样式 Custom styles */
  style?: React.CSSProperties;
}

// ==================== Hook 类型 Hook Types ====================

/**
 * useMenu Hook 配置选项
 * useMenu Hook configuration options
 */
export interface UseMenuOptions {
  /** 菜单项数据列表 Menu items data list */
  items?: MenuItem[];
  /** 默认选中的菜单项key Default selected menu item key */
  defaultSelected?: string;
  /** 默认展开的菜单项key列表 Default expanded menu item keys list */
  defaultExpanded?: string[];
  /** 是否手风琴模式 Whether accordion mode */
  accordion?: boolean;
  /** 菜单项选中回调 Menu item select callback */
  onItemSelect?: (item: MenuItem, key: string) => void;
  /** 菜单项展开/折叠回调 Menu item expand/collapse callback */
  onItemToggle?: (key: string, expanded: boolean) => void;
}

/**
 * useMenu Hook 返回值类型
 * useMenu Hook return type
 * 
 * 提供菜单状态管理的简化接口
 * Provides simplified interface for menu state management
 */
export interface UseMenuReturn {
  /** 当前选中的菜单项 Currently selected menu item */
  selectedItem: MenuItem | null;
  /** 当前展开的菜单项key列表 Currently expanded menu item keys list */
  expandedItems: string[];
  /** 选中菜单项 Select menu item */
  selectItem: (key: string) => void;
  /** 切换菜单项展开状态 Toggle menu item expand state */
  toggleItem: (key: string) => void;
  /** 展开菜单项 Expand menu item */
  expandItem: (key: string) => void;
  /** 折叠菜单项 Collapse menu item */
  collapseItem: (key: string) => void;
  /** 展开所有菜单项 Expand all menu items */
  expandAll: () => void;
  /** 折叠所有菜单项 Collapse all menu items */
  collapseAll: () => void;
  /** 重置所有状态 Reset all states */
  reset: () => void;
  /** 检查菜单项是否选中 Check if menu item is selected */
  isItemSelected: (key: string) => boolean;
  /** 检查菜单项是否展开 Check if menu item is expanded */
  isItemExpanded: (key: string) => boolean;
  /** 根据key获取菜单项 Get menu item by key */
  getItemByKey: (key: string) => MenuItem | null;
}

// ==================== 预设配置类型 Preset Configuration Types ====================

/**
 * 菜单预设配置类型
 * Menu preset configuration type
 */
export type MenuVariant = 'sidebar' | 'horizontal' | 'collapsed';

/**
 * 主题类型
 * Theme type
 */
export type MenuTheme = 'light' | 'dark';

/**
 * 尺寸类型
 * Size type
 */
export type MenuSize = 'small' | 'medium' | 'large';