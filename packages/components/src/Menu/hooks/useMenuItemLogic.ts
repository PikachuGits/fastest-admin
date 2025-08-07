/**
 * MenuItem 业务逻辑自定义 Hook
 * MenuItem business logic custom hook
 * 
 * 封装菜单项的状态计算和事件处理逻辑
 * Encapsulates menu item state calculations and event handling logic
 */

import { useMemo, useCallback } from 'react';
import { useMenuStoreContext } from '../context/MenuStoreContext';
import {
  parseInfoBadge,
  getBadgeColor,
  hasChildren,
  parseIcon,
} from '../utils/menuHelpers';
import type { NavItem } from '../types';

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItem 逻辑 Hook 参数接口
 * MenuItem logic hook parameters interface
 */
export interface UseMenuItemLogicParams {
  /** 菜单项数据 Menu item data */
  item: NavItem;
  /** 菜单项路径 Menu item path */
  itemPath: string;
  /** 菜单层级 Menu level */
  level?: number;
  /** 是否展开 Whether expanded */
  open?: boolean;
  /** 是否禁用 Whether disabled */
  disabled?: boolean;
  /** 点击回调 Click callback */
  onClick?: () => void;
  /** 切换回调 Toggle callback */
  onToggle?: () => void;
}

/**
 * MenuItem 逻辑 Hook 返回值接口
 * MenuItem logic hook return value interface
 */
export interface UseMenuItemLogicReturn {
  // ==================== 状态数据 State Data ====================
  /** 是否被选中 Whether selected */
  isSelected: boolean;
  /** 是否有子菜单 Whether has sub-menu */
  hasSubItems: boolean;
  /** 是否为父级选中状态 Whether parent is selected */
  isParentSelected: boolean;
  /** 是否为收起状态 Whether collapsed */
  collapsed: boolean;
  /** 徽章数字 Badge number */
  badge: number | undefined;
  /** 徽章颜色 Badge color */
  badgeColor: 'default' | 'primary' | 'success';
  /** 解析后的图标名称 Parsed icon name */
  iconName: string | undefined;
  
  // ==================== 事件处理 Event Handlers ====================
  /** 处理点击事件 Handle click event */
  handleClick: () => void;
}

// ==================== 自定义 Hook Custom Hook ====================

/**
 * MenuItem 业务逻辑 Hook
 * MenuItem business logic hook
 * 
 * 封装菜单项的所有业务逻辑，包括状态计算和事件处理
 * Encapsulates all business logic for menu items, including state calculations and event handling
 * 
 * @param params - Hook 参数 Hook parameters
 * @returns 逻辑处理结果 Logic processing results
 */
export const useMenuItemLogic = ({
  item,
  itemPath,
  level = 0,
  open = false,
  disabled = false,
  onClick,
  onToggle,
}: UseMenuItemLogicParams): UseMenuItemLogicReturn => {
  // ==================== 状态计算 State Calculations ====================
  
  /**
   * 计算是否有子菜单项
   * Calculate if has sub-menu items
   */
  const hasSubItems = useMemo(
    () => hasChildren(item),
    [item.children]
  );

  /**
   * 从 Context 获取当前实例的 store
   * Get current instance store from Context
   */
  const store = useMenuStoreContext();
  const selectedItem = store((state) => state.selectedItem);
  const collapsed = store((state) => state.collapsed);

  /**
   * 计算是否被选中
   * Calculate if selected
   */
  const isSelected = useMemo(
    () => selectedItem === itemPath,
    [selectedItem, itemPath]
  );

  /**
   * 计算是否为父级选中状态
   * Calculate if parent is selected
   */
  const isParentSelected = useMemo(() => {
    return Boolean(
      hasSubItems &&
      selectedItem &&
      selectedItem.startsWith(itemPath + ".") &&
      selectedItem !== itemPath
    );
  }, [hasSubItems, selectedItem, itemPath]);

  /**
   * 解析徽章信息
   * Parse badge information
   */
  const badge = useMemo(
    () => parseInfoBadge(item.info),
    [item.info]
  );

  /**
   * 计算徽章颜色
   * Calculate badge color
   */
  const badgeColor = useMemo(
    () => getBadgeColor(badge),
    [badge]
  );

  /**
   * 解析图标名称
   * Parse icon name
   */
  const iconName = useMemo(
    () => parseIcon(item.icon),
    [item.icon]
  );

  // ==================== 事件处理 Event Handlers ====================
  
  /**
   * 处理菜单项点击事件
   * Handle menu item click event
   * 
   * 根据是否有子项决定是切换展开状态还是触发点击事件
   * Decides whether to toggle expand state or trigger click event based on whether has sub-items
   */
  const handleClick = useCallback(() => {
    if (disabled) return;
    
    if (hasSubItems && onToggle) {
      onToggle();
    } else if (onClick) {
      onClick();
    }
  }, [hasSubItems, onToggle, onClick, disabled]);

  // ==================== 返回结果 Return Results ====================
  
  return {
    // 状态数据
    isSelected,
    hasSubItems,
    isParentSelected,
    collapsed,
    badge,
    badgeColor,
    iconName,
    
    // 事件处理
    handleClick,
  };
};