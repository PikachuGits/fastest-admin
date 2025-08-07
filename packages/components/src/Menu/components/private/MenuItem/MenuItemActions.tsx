/**
 * MenuItem 操作区域子组件
 * MenuItem Actions sub-component
 *
 * 专门负责渲染菜单项右侧操作区域的独立组件
 * Independent component specifically responsible for rendering the right action area of menu items
 */

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { NumberChip } from "../NumberChip";
import { StyledArrowIcon } from "../../../styles/MenuItem.styles";
import { useMenuStoreContext } from "../../../context/MenuStoreContext";
import type { NumberChipColor } from "../../../types";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItemActions 组件属性接口
 * MenuItemActions component props interface
 */
export interface MenuItemActionsProps {
  /** 徽章数字 Badge number */
  badge?: number;
  /** 徽章颜色 Badge color */
  badgeColor: NumberChipColor;
  /** 是否有子菜单 Whether has sub-menu */
  hasSubItems: boolean;
  /** 是否展开 Whether expanded */
  open: boolean;
  /** CSS 类名 CSS class name */
  className?: string;
}

// ==================== 组件实现 Component Implementation ====================

/**
 * MenuItem 操作区域组件
 * MenuItem Actions component
 *
 * 渲染菜单项的右侧操作区域，包括徽章和展开箭头
 * Renders the right action area of menu items, including badges and expand arrows
 *
 * @param props - 组件属性 Component props
 * @returns 渲染的操作区域组件 Rendered actions component
 */
export const MenuItemActions: React.FC<MenuItemActionsProps> = ({
  badge,
  badgeColor,
  hasSubItems,
  open,
  className,
}) => {
  // ==================== 从 Store 获取状态 Get State from Store ====================

  /**
   * 直接从 Zustand store 获取 collapsed 状态
   * Get collapsed state directly from Zustand store
   */
  const store = useMenuStoreContext();
  const collapsed = store((state) => state.collapsed);

  useEffect(() => {
    // console.log(collapsed, "collapsed");
  }, [collapsed]);
  // ==================== 状态响应性 State Reactivity ====================
  //
  // 🎯 重要：这里直接从 store 订阅 collapsed 状态，确保状态变化时组件会重新渲染
  // Important: Subscribe to collapsed state directly from store to ensure component re-renders on state changes

  // 如果处于收起状态，不渲染操作区域
  // Don't render actions area if collapsed
  if (collapsed) {
    return null;
  }

  // ==================== 渲染逻辑 Render Logic ====================

  /**
   * 渲染数字徽章
   * Render number badge
   */
  const renderBadge = () =>
    badge ? <NumberChip number={badge} color={badgeColor} /> : null;

  /**
   * 渲染展开箭头
   * Render expand arrow
   */
  const renderArrow = () =>
    hasSubItems ? (
      <StyledArrowIcon
        icon="eva:arrow-ios-downward-fill"
        open={open}
        className="icon-arrow"
      />
    ) : null;

  // ==================== 组件渲染 Component Render ====================

  return (
    <Box
      sx={{
        display: collapsed ? "none" : "flex",
        alignItems: "center",
        gap: 1,
      }}
      className={className}
    >
      {renderBadge()}
      {renderArrow()}
    </Box>
  );
};

MenuItemActions.displayName = "MenuItemActions";
