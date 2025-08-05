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
   * 简化的初始化逻辑：只处理配置中指定的展开项
   * Simplified initialization logic: only handle expanded items specified in config
   */
  const initializeOpenStates = useCallback((navData: NavData): OpenStatesRecord => {
    const states: OpenStatesRecord = {};

    // 如果有配置的默认展开项，直接使用
    // If there are configured default open items, use them directly
    if (config?.defaultOpenItems) {
      config.defaultOpenItems.forEach(itemPath => {
        states[itemPath] = true;
      });
      return states;
    }

    // 默认情况下，不展开任何项（用户可以手动展开）
    // By default, don't expand any items (users can manually expand)
    return states;
  }, [config]);

  /**
   * 查找默认选中项
   * Find default selected item
   * 
   * 简化的默认选中逻辑：优先使用配置，否则返回空
   * Simplified default selection logic: prioritize config, otherwise return empty
   */
  const findDefaultSelected = useCallback((navData: NavData): string => {
    // 优先使用配置中指定的默认选中项
    // Prioritize default selected item specified in configuration
    if (config?.defaultSelectedItem) {
      return config.defaultSelectedItem;
    }

    // 默认情况下不选中任何项，让用户主动选择
    // By default, don't select any item, let users actively choose
    return "";
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
   * 简化的点击处理：只设置选中状态，不强制修改展开状态
   * Simplified click handling: only set selection state, don't force modify open states
   * 
   * @param itemKey - 菜单项路径键 Menu item path key
   */
  const handleItemClick = useCallback((itemKey: string) => {
    setSelectedItem(itemKey);
    
    // 可选：确保选中项的父级路径是展开的
    // Optional: ensure parent path of selected item is expanded
    const pathParts = itemKey.split('.');
    if (pathParts.length > 1) {
      setOpenStates(prev => {
        const newStates = { ...prev };
        
        // 只展开必要的父级路径，不关闭其他项
        // Only expand necessary parent paths, don't close other items
        for (let i = 1; i < pathParts.length; i++) {
          const parentPath = pathParts.slice(0, i + 1).join('.');
          if (newStates.hasOwnProperty(parentPath)) {
            newStates[parentPath] = true;
          }
        }
        
        return newStates;
      });
    }
  }, []);

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