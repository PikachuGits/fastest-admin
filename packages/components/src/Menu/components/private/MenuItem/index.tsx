/**
 * MenuItem 组件（重构版）
 * MenuItem Component (Refactored)
 *
 * 使用自定义 Hooks 和子组件的现代化菜单项组件
 * Modern menu item component using custom hooks and sub-components
 */

import React from "react";
import { StyledListItemButton } from "../../../styles/MenuItem.styles";
import { useMenuItemLogic } from "../../../hooks/useMenuItemLogic";
import { useMenuItemStyles } from "../../../hooks/useMenuItemStyles";
import { useMenuItemAccessibility } from "../../../hooks/useMenuItemAccessibility";
import { MenuItemIcon } from "./MenuItemIcon";
import { MenuItemContent } from "./MenuItemContent";
import { MenuItemActions } from "./MenuItemActions";
import type { NavItem } from "../../../types";
import type { SxProps, Theme } from "@mui/material";
import "../../../styles/index.less";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItem 组件属性接口（重构版）
 * MenuItem component props interface (refactored)
 */
export interface MenuItemProps {
  /** 菜单项数据 Menu item data */
  item: NavItem;
  /** 菜单项路径 Menu item path */
  itemPath: string;
  /** 菜单层级 Menu level */
  level?: number;
  /** 是否展开 Whether expanded */
  open?: boolean;
  /** 切换回调 Toggle callback */
  onToggle?: () => void;
  /** 点击回调 Click callback */
  onClick?: () => void;
  /** 是否禁用 Whether disabled */
  disabled?: boolean;
  /** 自定义样式 Custom styles */
  sx?: SxProps<Theme>;
  /** CSS 类名 CSS class name */
  className?: string;
}

// ==================== 主组件 Main Component ====================

/**
 * MenuItem 主组件（重构版）
 * Main MenuItem component (refactored)
 *
 * 使用现代化架构的菜单项组件，具有更好的可维护性和性能
 * Menu item component with modern architecture for better maintainability and performance
 *
 * @param props - 组件属性 Component props
 * @returns 渲染的菜单项 Rendered menu item
 */
export const MenuItem: React.FC<MenuItemProps> = React.memo(
  ({
    item,
    itemPath,
    level = 0,
    open = false,
    onToggle,
    onClick,
    disabled = false,
    sx,
    className = "fast-menu-item-container-sub-child",
  }) => {
    // ==================== 业务逻辑 Hook Business Logic Hook ====================

    /**
     * 使用自定义 Hook 处理菜单项业务逻辑
     * Use custom hook to handle menu item business logic
     */
    const {
      isSelected,
      hasSubItems,
      isParentSelected,
      collapsed,
      badge,
      badgeColor,
      iconName,
      handleClick,
    } = useMenuItemLogic({
      item,
      itemPath,
      level,
      open,
      disabled,
      onClick,
      onToggle,
    });

    // ==================== 样式计算 Hook Styles Calculation Hook ====================

    /**
     * 使用自定义 Hook 计算样式
     * Use custom hook to calculate styles
     */
    const { iconStyles, textStyles, containerStyles } = useMenuItemStyles({
      isSelected,
      isParentSelected,
      hasSubItems,
      collapsed,
      disabled,
      level,
    });

    // ==================== 无障碍性 Hook Accessibility Hook ====================

    /**
     * 使用自定义 Hook 处理无障碍性
     * Use custom hook to handle accessibility
     */
    const { ariaProps, keyboardHandlers } = useMenuItemAccessibility({
      isSelected,
      hasSubItems,
      open,
      disabled,
      itemPath,
      title: item.title,
      caption: item.caption,
      onClick: handleClick,
    });

    // ==================== 组件渲染 Component Render ====================

    return (
      <StyledListItemButton
        level={level}
        selected={isSelected}
        parentSelected={isParentSelected}
        hasSubItems={hasSubItems}
        onClick={handleClick}
        disabled={disabled}
        collapsed={collapsed}
        data-level={level === 0 ? "false" : "true"}
        className={className}
        sx={sx}
        {...ariaProps}
        {...keyboardHandlers}
      >
        {/* 菜单项图标 Menu item icon */}
        {iconName && <MenuItemIcon iconName={iconName} sx={iconStyles} />}

        {/* 菜单项文本内容 Menu item text content */}
        <MenuItemContent
          title={item.title}
          caption={item.caption}
          collapsed={collapsed}
          sx={textStyles}
        />

        {/* 右侧操作区域 Right action area */}
        <MenuItemActions
          badge={badge}
          badgeColor={badgeColor}
          hasSubItems={hasSubItems}
          open={open}
        />
      </StyledListItemButton>
    );
  }
);

MenuItem.displayName = "MenuItem";
