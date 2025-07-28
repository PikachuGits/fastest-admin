/**
 * Menu 状态管理 Hook
 * Menu state management Hook
 * 
 * 提供菜单组件的状态管理功能，包括展开/折叠状态和选中状态
 * Provides state management functionality for menu components, including expand/collapse and selection states
 */

import { useState, useCallback } from 'react';
import type { NavData, MenuConfig, OpenStatesRecord } from '../types';

/**
 * 菜单状态管理 Hook
 * Menu state management Hook
 * 
 * 负责管理菜单的展开/折叠状态和选中状态
 * Manages menu expand/collapse states and selection state
 * 
 * @param data - 菜单数据 Menu data
 * @param config - 菜单配置（可选）Menu configuration (optional)
 * @returns 菜单状态和操作方法 Menu states and operation methods
 */
export const useMenuState = (data: NavData, config?: MenuConfig) => {
  // ==================== 初始化函数 Initialization Functions ====================
  
  /**
   * 初始化菜单展开状态
   * Initialize menu open states
   * 
   * 根据配置和默认规则初始化所有菜单项的展开状态
   * Initializes open states for all menu items based on configuration and default rules
   */
  const initializeOpenStates = useCallback((navData: NavData): OpenStatesRecord => {
    const states: OpenStatesRecord = {};

    /**
     * 递归处理菜单项
     * Recursively process menu items
     */
    const processItems = (items: any[], path = "") => {
      items.forEach((item, index) => {
        if (!item) return; // 空值检查 Null check
        
        const itemPath = path ? `${path}.${index}` : `${index}`;

        if (item.children && item.children.length > 0) {
          // 根据配置或默认规则设置展开状态
          // Set open state based on configuration or default rules
          const shouldOpen = config?.defaultOpenItems?.includes(itemPath) ||
                           (!config?.defaultOpenItems && (path === "" || item.title === "Level"));
          states[itemPath] = shouldOpen;
          processItems(item.children, itemPath);
        }
      });
    };

    // 处理所有分组
    // Process all sections
    navData.navItems.forEach((section, sectionIndex) => {
      if (section?.items) {
        processItems(section.items, `section-${sectionIndex}`);
      }
    });

    return states;
  }, [config]);

  /**
   * 查找默认选中项
   * Find default selected item
   * 
   * 根据配置或默认规则确定初始选中的菜单项
   * Determines initially selected menu item based on configuration or default rules
   */
  const findDefaultSelected = useCallback((navData: NavData): string => {
    // 优先使用配置中指定的默认选中项
    // Prioritize default selected item specified in configuration
    if (config?.defaultSelectedItem) {
      return config.defaultSelectedItem;
    }

    // 默认选中逻辑：查找标题为"Level"的菜单项
    // Default selection logic: find menu item with title "Level"
    for (let sectionIndex = 0; sectionIndex < navData.navItems.length; sectionIndex++) {
      const section = navData.navItems[sectionIndex];
      if (!section?.items) continue;

      for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
        const item = section.items[itemIndex];
        if (!item) continue;

        if (item.title === "Level") {
          return `section-${sectionIndex}.${itemIndex}`;
        }
      }
    }
    
    // 如果没有找到特定项，默认选中第一个菜单项
    // If no specific item found, default to first menu item
    return "section-0.0";
  }, [config]);

  // ==================== 状态定义 State Definitions ====================
  
  /**
   * 菜单项展开状态
   * Menu items open states
   */
  const [openStates, setOpenStates] = useState<OpenStatesRecord>(() =>
    initializeOpenStates(data)
  );
  
  /**
   * 当前选中的菜单项
   * Currently selected menu item
   */
  const [selectedItem, setSelectedItem] = useState<string>(() =>
    findDefaultSelected(data)
  );

  // ==================== 操作函数 Operation Functions ====================

  /**
   * 切换菜单项展开状态
   * Toggle menu item open state
   * 
   * @param key - 菜单项路径键 Menu item path key
   */
  const toggleOpen = useCallback((key: string) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /**
   * 处理菜单项点击
   * Handle menu item click
   * 
   * 实现手风琴效果：收起其他同级菜单，展开选中项的父级路径
   * Implements accordion effect: collapse other sibling menus, expand parent path of selected item
   * 
   * @param itemKey - 菜单项路径键 Menu item path key
   */
  const handleItemClick = useCallback((itemKey: string) => {
    setSelectedItem(itemKey);
    
    // 获取选中项的路径层级
    // Get path levels of selected item
    const pathParts = itemKey.split('.');
    const newOpenStates: OpenStatesRecord = {};
    
    // 首先关闭所有菜单项
    // First close all menu items
    Object.keys(openStates).forEach(key => {
      newOpenStates[key] = false;
    });
    
    // 展开选中项的完整父级路径
    // Expand complete parent path of selected item
    for (let i = 1; i < pathParts.length; i++) {
      const parentPath = pathParts.slice(0, i + 1).join('.');
      if (openStates.hasOwnProperty(parentPath)) {
        newOpenStates[parentPath] = true;
      }
    }
    
    setOpenStates(newOpenStates);
  }, [openStates]);

  /**
   * 设置特定菜单项的展开状态
   * Set specific menu item's open state
   * 
   * @param key - 菜单项路径键 Menu item path key
   * @param isOpen - 是否展开 Whether to open
   */
  const setOpenState = useCallback((key: string, isOpen: boolean) => {
    setOpenStates((prev) => ({ ...prev, [key]: isOpen }));
  }, []);

  /**
   * 重置所有状态到初始值
   * Reset all states to initial values
   */
  const resetStates = useCallback(() => {
    setOpenStates(initializeOpenStates(data));
    setSelectedItem(findDefaultSelected(data));
  }, [data, initializeOpenStates, findDefaultSelected]);

  // ==================== 返回值 Return Values ====================

  /**
   * 返回菜单状态和操作方法
   * Return menu states and operation methods
   */
  return {
    /** 菜单项展开状态记录 Menu items open states record */
    openStates,
    /** 当前选中的菜单项路径 Currently selected menu item path */
    selectedItem,
    /** 切换菜单项展开状态 Toggle menu item open state */
    toggleOpen,
    /** 处理菜单项点击 Handle menu item click */
    handleItemClick,
    /** 设置菜单项展开状态 Set menu item open state */
    setOpenState,
    /** 设置选中的菜单项 Set selected menu item */
    setSelectedItem,
    /** 重置所有状态 Reset all states */
    resetStates,
  };
};