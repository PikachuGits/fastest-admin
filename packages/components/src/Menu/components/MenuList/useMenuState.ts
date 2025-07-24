/**
 * MenuList 组件的状态管理 Hook
 * State management hook for MenuList component
 */

import { useState, useCallback } from 'react';
import type { NavData, NavItem, OpenStatesRecord } from './types';

/**
 * useMenuState Hook 的返回值接口
 * Return type interface for useMenuState hook
 */
export interface UseMenuStateReturn {
  /** 菜单项展开状态记录 */
  openStates: OpenStatesRecord;
  /** 当前选中的菜单项路径 */
  selectedItem: string;
  /** 切换菜单项展开状态 */
  toggleOpen: (key: string) => void;
  /** 处理菜单项点击事件 */
  handleItemClick: (itemKey: string) => void;
}

/**
 * 初始化菜单展开状态
 * Initialize menu open states
 * 
 * @param data - 导航数据
 * @returns 初始化的展开状态记录
 */
const initializeOpenStates = (data: NavData): OpenStatesRecord => {
  const states: OpenStatesRecord = {};

  /**
   * 递归处理菜单项，设置默认展开状态
   * Recursively process menu items and set default open states
   */
  const processItems = (items: NavItem[], path = "") => {
    items.forEach((item, index) => {
      const itemPath = path ? `${path}.${index}` : `${index}`;

      if (item.children && item.children.length > 0) {
        // 默认展开第一层有子项的菜单项，或者标题为 "Level" 的菜单项
        // Default expand first-level items with children, or items with title "Level"
        states[itemPath] = path === "" || item.title === "Level";
        processItems(item.children, itemPath);
      }
    });
  };

  // 处理所有分组
  data.navItems.forEach((section, sectionIndex) => {
    processItems(section.items, `section-${sectionIndex}`);
  });

  return states;
};

/**
 * 查找默认选中的菜单项
 * Find default selected menu item
 * 
 * @param data - 导航数据
 * @returns 默认选中项的路径
 */
const findDefaultSelected = (data: NavData): string => {
  // 默认选中标题为 "Level" 的菜单项
  // Default select menu item with title "Level"
  for (let sectionIndex = 0; sectionIndex < data.navItems.length; sectionIndex++) {
    const section = data.navItems[sectionIndex];
    if (!section || !section.items) continue;

    for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
      const item = section.items[itemIndex];
      if (!item) continue;

      if (item.title === "Level") {
        return `section-${sectionIndex}.${itemIndex}`;
      }
    }
  }
  
  // 如果没有找到 "Level" 项，返回第一个菜单项
  // If "Level" item not found, return first menu item
  return "section-0.0";
};

/**
 * 菜单状态管理 Hook
 * Menu state management hook
 * 
 * @param menuData - 菜单数据
 * @returns 菜单状态和操作函数
 * 
 * @example
 * const { openStates, selectedItem, toggleOpen, handleItemClick } = useMenuState(menuData);
 */
export const useMenuState = (menuData: NavData): UseMenuStateReturn => {
  // 初始化展开状态
  const [openStates, setOpenStates] = useState<OpenStatesRecord>(() =>
    initializeOpenStates(menuData)
  );
  
  // 初始化选中状态
  const [selectedItem, setSelectedItem] = useState(() =>
    findDefaultSelected(menuData)
  );

  /**
   * 切换菜单项的展开状态
   * Toggle menu item open state
   */
  const toggleOpen = useCallback((key: string) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /**
   * 处理菜单项点击事件
   * Handle menu item click event
   */
  const handleItemClick = useCallback((itemKey: string) => {
    setSelectedItem(itemKey);
  }, []);

  return {
    openStates,
    selectedItem,
    toggleOpen,
    handleItemClick,
  };
};