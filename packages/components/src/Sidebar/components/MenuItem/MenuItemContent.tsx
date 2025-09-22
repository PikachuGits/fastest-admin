/**
 * MenuItem 内容子组件
 * MenuItem Content sub-component
 *
 * 专门负责渲染菜单项文本内容的独立组件
 * Independent component specifically responsible for rendering menu item text content
 */

import React from "react";
import { Box } from "@mui/material";
import { StyledListItemText } from "../../styles/MenuItem.styles";
import type { SxProps, Theme } from "@mui/material";
import { sxStyled } from "@components/utils/sx";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItemContent 组件属性接口
 * MenuItemContent component props interface
 */
export interface MenuItemContentProps {
  /** 主标题 Primary title */
  title?: string;
  /** 副标题 Secondary title */
  caption?: string;
  /** 是否折叠状态 - true: 折叠, false: 展开 */
  collapsed: boolean;
  /** 自定义样式 Custom styles */
  sx?: SxProps<Theme>;
  /** CSS 类名 CSS class name */
  className?: string;
}

// ==================== 组件实现 Component Implementation ====================

/**
 * MenuItem 内容组件
 * MenuItem Content component
 *
 * 渲染菜单项的文本内容，包括主标题和副标题
 * Renders the text content of menu items, including primary and secondary titles
 *
 * @param props - 组件属性 Component props
 * @returns 渲染的内容组件 Rendered content component
 */
export const MenuItemContent: React.FC<MenuItemContentProps> = React.memo(
  ({ title, caption, collapsed, sx, className }) => {
    // ==================== 渲染逻辑 Render Logic ====================

    /**
     * 渲染主标题
     * Render primary title
     */
    const renderPrimaryText = () =>
      title ? (
        <span className="text-sm truncate color-inherit">{title}</span>
      ) : null;

    /**
     * 渲染副标题
     * Render secondary title
     */
    const renderSecondaryText = () =>
      caption && !collapsed ? (
        <span className="inline-block text-xs truncate w-full color-inherit">
          {caption}
        </span>
      ) : null;

    // ==================== 组件渲染 Component Render ====================

    return (
      <StyledListItemText
        sx={sxStyled(sx)}
        className={className}
        primary={renderPrimaryText()}
        secondary={renderSecondaryText()}
      />
    );
  }
);

MenuItemContent.displayName = "MenuItemContent";
