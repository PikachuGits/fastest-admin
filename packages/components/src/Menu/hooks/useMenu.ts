/**
 * useMenu Hook
 * 
 * 简化的菜单状态管理Hook
 * Simplified menu state management hook
 * 
 * 这是重构后的简化Hook，作为现有useMenuState的封装层
 * This is the refactored simplified hook, serving as a wrapper for existing useMenuState
 * 
 * 设计原则：
 * - 提供简化的、直观的API接口
 * - 内部使用现有的useMenuState，保证功能完整性
 * - 将简化的参数转换为内部复杂格式
 * - 保持100%向后兼容
 * 
 * Design principles:
 * - Provide simplified, intuitive API interface
 * - Use existing useMenuState internally to ensure functional completeness
 * - Convert simplified parameters to internal complex format
 * - Maintain 100% backward compatibility
 */

import { useMemo, useCallback, useRef } from 'react';
import { useMenuState } from './useMenuState';
import type { UseMenuOptions, UseMenuReturn, MenuItem } from '../types/public';
import type { NavData, NavSection, NavItem } from '../types';

// ==================== 工具函数 Utility Functions ====================

/**
 * 将简化的MenuItem转换为内部NavItem格式
 * Convert simplified MenuItem to internal NavItem format
 * 
 * 使用缓存优化，避免重复转换相同的MenuItem
 * Use caching optimization to avoid repeated conversion of the same MenuItem
 */
const menuItemToNavItemCache = new WeakMap<MenuItem, NavItem>();

const convertMenuItemToNavItem = (item: MenuItem): NavItem => {
  // 检查缓存
  if (menuItemToNavItemCache.has(item)) {
    return menuItemToNavItemCache.get(item)!;
  }
  
  const navItem: NavItem = {
    title: item.title,
    path: item.path || `#${item.key}`,
    icon: typeof item.icon === 'string' ? item.icon : undefined,
    info: item.badge ? ['badge', String(item.badge)] : undefined,
    roles: item.roles,
    children: item.children?.map(convertMenuItemToNavItem),
  };
  
  // 缓存结果
  menuItemToNavItemCache.set(item, navItem);
  return navItem;
};

/**
 * 将简化的items转换为内部NavData格式
 * Convert simplified items to internal NavData format
 * 
 * 使用缓存优化，避免重复转换相同的items数组
 * Use caching optimization to avoid repeated conversion of the same items array
 */
const itemsToNavDataCache = new WeakMap<MenuItem[], NavData>();

const convertItemsToNavData = (items: MenuItem[]): NavData => {
  // 检查缓存
  if (itemsToNavDataCache.has(items)) {
    return itemsToNavDataCache.get(items)!;
  }
  
  const navData: NavData = {
    navItems: [
      {
        items: items.map(convertMenuItemToNavItem),
      },
    ],
  };
  
  // 缓存结果
  itemsToNavDataCache.set(items, navData);
  return navData;
};

/**
 * 将简化的key转换为内部路径格式
 * Convert simplified key to internal path format
 */
const convertKeyToPath = (key: string): string => {
  return `section-0.${key}`;
};

/**
 * 将内部路径转换为简化的key格式
 * Convert internal path to simplified key format
 */
const convertPathToKey = (path: string): string => {
  return path.replace('section-0.', '');
};

/**
 * 在MenuItem树中查找指定key的项
 * Find item with specified key in MenuItem tree
 * 
 * 使用缓存优化查找性能
 * Use caching to optimize search performance
 */
const menuItemSearchCache = new Map<string, WeakMap<MenuItem[], MenuItem | null>>();

const findMenuItemByKey = (items: MenuItem[], targetKey: string): MenuItem | null => {
  // 检查缓存
  if (!menuItemSearchCache.has(targetKey)) {
    menuItemSearchCache.set(targetKey, new WeakMap());
  }
  
  const keyCache = menuItemSearchCache.get(targetKey)!;
  if (keyCache.has(items)) {
    return keyCache.get(items)!;
  }
  
  // 执行查找
  let result: MenuItem | null = null;
  for (const item of items) {
    if (item.key === targetKey) {
      result = item;
      break;
    }
    if (item.children) {
      const found = findMenuItemByKey(item.children, targetKey);
      if (found) {
        result = found;
        break;
      }
    }
  }
  
  // 缓存结果
  keyCache.set(items, result);
  return result;
};

// ==================== 主Hook Main Hook ====================

/**
 * useMenu Hook
 * 
 * 简化的菜单状态管理Hook
 * Simplified menu state management hook
 * 
 * @param options - Hook配置选项 Hook configuration options
 * @returns 菜单状态和操作方法 Menu state and operation methods
 */
export const useMenu = (options: UseMenuOptions = {}): UseMenuReturn => {
  const {
    items = [],
    defaultSelected,
    defaultExpanded = [],
    accordion = false,
    onItemSelect,
    onItemToggle,
  } = options;
  
  // 使用ref缓存稳定的引用，避免不必要的重新计算
  const stableItemsRef = useRef<MenuItem[]>(items);
  const stableCallbacksRef = useRef({ onItemSelect, onItemToggle });
  
  // 更新稳定引用
  if (items !== stableItemsRef.current) {
    stableItemsRef.current = items;
  }
  stableCallbacksRef.current = { onItemSelect, onItemToggle };
  
  // ==================== 数据转换 Data Conversion ====================
  
  /**
   * 将简化的items转换为内部NavData格式
   * Convert simplified items to internal NavData format
   * 
   * 使用稳定引用避免不必要的重新计算
   * Use stable reference to avoid unnecessary recalculation
   */
  const navData = useMemo(() => convertItemsToNavData(stableItemsRef.current), [stableItemsRef.current]);
  
  /**
   * 转换默认选中项
   * Convert default selected item
   */
  const internalDefaultSelected = useMemo(() => {
    return defaultSelected ? convertKeyToPath(defaultSelected) : undefined;
  }, [defaultSelected]);
  
  /**
   * 转换默认展开项
   * Convert default expanded items
   */
  const internalDefaultExpanded = useMemo(() => {
    return defaultExpanded.map(convertKeyToPath);
  }, [defaultExpanded]);
  
  // ==================== 内部状态管理 Internal State Management ====================
  
  /**
   * 使用内部的useMenuState Hook
   * Use internal useMenuState hook
   */
  const {
    openStates,
    selectedItem: internalSelectedItem,
    toggleOpen,
    handleItemClick: internalHandleItemClick,
    setOpenState,
    resetStates,
  } = useMenuState(navData, {
    defaultSelectedItem: internalDefaultSelected,
    defaultOpenItems: internalDefaultExpanded,
  });
  
  // ==================== 状态转换 State Conversion ====================
  
  /**
   * 将内部选中项转换为简化格式
   * Convert internal selected item to simplified format
   * 
   * 使用缓存优化，避免重复查找
   * Use caching optimization to avoid repeated searches
   */
  const selectedItem = useMemo(() => {
    if (!internalSelectedItem) return null;
    const key = convertPathToKey(internalSelectedItem);
    return findMenuItemByKey(stableItemsRef.current, key);
  }, [internalSelectedItem, stableItemsRef.current]);
  
  /**
   * 将内部展开状态转换为简化格式
   * Convert internal open states to simplified format
   */
  const expandedItems = useMemo(() => {
    const expanded: string[] = [];
    Object.entries(openStates).forEach(([path, isOpen]) => {
      if (isOpen) {
        const key = convertPathToKey(path);
        expanded.push(key);
      }
    });
    return expanded;
  }, [openStates]);
  
  // ==================== 事件处理 Event Handling ====================
  
  /**
   * 处理菜单项选择
   * Handle menu item selection
   * 
   * 使用稳定引用和缓存优化
   * Use stable references and caching optimization
   */
  const handleItemSelect = useCallback(
    (key: string) => {
      const path = convertKeyToPath(key);
      const menuItem = findMenuItemByKey(stableItemsRef.current, key);
      
      if (menuItem) {
        // 调用内部处理函数
        internalHandleItemClick(path);
        
        // 调用外部回调
        stableCallbacksRef.current.onItemSelect?.(menuItem, key);
      }
    },
    [internalHandleItemClick]
  );
  
  /**
   * 处理菜单项展开/折叠
   * Handle menu item toggle
   * 
   * 使用稳定引用优化
   * Use stable references for optimization
   */
  const handleItemToggle = useCallback(
    (key: string, isOpen?: boolean) => {
      const path = convertKeyToPath(key);
      
      if (isOpen !== undefined) {
        setOpenState(path, isOpen);
      } else {
        toggleOpen(path);
      }
      
      // 调用外部回调
      const finalIsOpen = isOpen !== undefined ? isOpen : !openStates[path];
      stableCallbacksRef.current.onItemToggle?.(key, finalIsOpen);
    },
    [toggleOpen, setOpenState, openStates]
  );
  
  /**
   * 展开指定菜单项
   * Expand specified menu item
   */
  const expandItem = useCallback(
    (key: string) => {
      handleItemToggle(key, true);
    },
    [handleItemToggle]
  );
  
  /**
   * 折叠指定菜单项
   * Collapse specified menu item
   */
  const collapseItem = useCallback(
    (key: string) => {
      handleItemToggle(key, false);
    },
    [handleItemToggle]
  );
  
  /**
   * 展开所有菜单项
   * Expand all menu items
   * 
   * 使用稳定引用和批量更新优化
   * Use stable references and batch updates for optimization
   */
  const expandAll = useCallback(() => {
    const pathsToExpand: string[] = [];
    
    const collectExpandablePaths = (menuItems: MenuItem[]) => {
      menuItems.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const path = convertKeyToPath(item.key);
          pathsToExpand.push(path);
          collectExpandablePaths(item.children);
        }
      });
    };
    
    collectExpandablePaths(stableItemsRef.current);
    
    // 批量设置状态
    pathsToExpand.forEach(path => setOpenState(path, true));
  }, [setOpenState]);
  
  /**
   * 折叠所有菜单项
   * Collapse all menu items
   * 
   * 使用稳定引用和批量更新优化
   * Use stable references and batch updates for optimization
   */
  const collapseAll = useCallback(() => {
    const pathsToCollapse: string[] = [];
    
    const collectCollapsiblePaths = (menuItems: MenuItem[]) => {
      menuItems.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const path = convertKeyToPath(item.key);
          pathsToCollapse.push(path);
          collectCollapsiblePaths(item.children);
        }
      });
    };
    
    collectCollapsiblePaths(stableItemsRef.current);
    
    // 批量设置状态
    pathsToCollapse.forEach(path => setOpenState(path, false));
  }, [setOpenState]);
  
  /**
   * 重置所有状态
   * Reset all states
   */
  const reset = useCallback(() => {
    resetStates();
  }, [resetStates]);
  
  // ==================== 返回值 Return Value ====================
  
  return {
    // 状态 States
    selectedItem,
    expandedItems,
    
    // 操作方法 Operation Methods
    selectItem: handleItemSelect,
    toggleItem: handleItemToggle,
    expandItem,
    collapseItem,
    expandAll,
    collapseAll,
    reset,
    
    // 工具方法 Utility Methods
    isItemSelected: useCallback(
      (key: string) => selectedItem?.key === key,
      [selectedItem]
    ),
    isItemExpanded: useCallback(
      (key: string) => expandedItems.includes(key),
      [expandedItems]
    ),
    getItemByKey: useCallback(
      (key: string) => findMenuItemByKey(stableItemsRef.current, key),
      []
    ),
  };
};

// ==================== 默认导出 Default Export ====================

export default useMenu;