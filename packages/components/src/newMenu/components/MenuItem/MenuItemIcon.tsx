/**
 * MenuItem 图标子组件
 * MenuItem Icon sub-component
 *
 * 专门负责渲染菜单项图标的独立组件
 * Independent component specifically responsible for rendering menu item icons
 */

import React from "react";
import { ListItemIcon } from "@mui/material";
import { Iconify } from "@components/iconify/iconify";
import type { SxProps, Theme } from "@mui/material";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItemIcon 组件属性接口
 * MenuItemIcon component props interface
 */
export interface MenuItemIconProps {
  /** 图标名称 Icon name */
  iconName: string;
  /** 自定义样式 Custom styles */
  sx?: SxProps<Theme>;
  /** CSS 类名 CSS class name */
  className?: string;
}

// ==================== 组件实现 Component Implementation ====================

/**
 * MenuItem 图标组件
 * MenuItem Icon component
 *
 * 渲染菜单项的图标部分，支持自定义样式和图标名称
 * Renders the icon part of menu items, supports custom styles and icon names
 *
 * @param props - 组件属性 Component props
 * @returns 渲染的图标组件 Rendered icon component
 */
export const MenuItemIcon: React.FC<MenuItemIconProps> = React.memo(
  ({ iconName, sx, className }) => {
    return (
      <ListItemIcon
        className={className}
        sx={{
          minWidth: "0",
          height: "auto",
          padding: 0,
          margin: 0,
        }}
      >
        <Iconify icon={iconName as any} sx={{ ...sx, height: "100%" }} />
      </ListItemIcon>
    );
  }
);

MenuItemIcon.displayName = "MenuItemIcon";
