/**
 * 菜单项渲染组件
 * Menu item renderer component
 *
 * 使用 Zustand 进行状态管理的菜单项渲染组件
 * Menu item renderer component using Zustand for state management
 */

import React from "react";
import { Collapse, List } from "@mui/material";
import { MenuItem } from "../MenuItem";
import { hasChildren } from "../../../utils/menuHelpers";
import { useMenuStoreContext } from "../../../context/MenuStoreContext";
import type { NavItem } from "../../../types";
import {
  StyledContainerBox,
  StyledContainerBoxLevelSx,
} from "../../../styles/MenuItemRenderer.styles";

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItemRenderer 组件属性接口（简化版）
 * MenuItemRenderer component props interface (simplified)
 */
interface MenuItemRendererProps {
  item: NavItem;
  itemPath: string;
  level?: number;
}

// ==================== 主组件 Main Component ====================

/**
 * 菜单项渲染组件
 * Menu item renderer component
 *
 * 使用 Zustand 进行状态管理的菜单项渲染组件
 * Menu item renderer component using Zustand for state management
 *
 * @param props - 简化的组件属性 Simplified component props
 * @returns 渲染的菜单项元素 Rendered menu item element
 */
export const MenuItemRenderer: React.FC<MenuItemRendererProps> = ({
  item,
  itemPath,
  level = 0,
}) => {
  // ==================== 状态管理 State Management ====================

  /**
   * 从 Context 获取当前实例的 store
   * Get current instance store from Context
   */
  const store = useMenuStoreContext();
  const openStates = store((state) => state.openStates);
  const handleItemClick = store((state) => state.handleItemClick);
  const handleItemToggle = store((state) => state.handleItemToggle);

  // ==================== 状态计算 State Calculations ====================

  /**
   * 检查当前菜单项是否展开
   * Check if current menu item is expanded
   */
  const isOpen = openStates[itemPath] || false;

  /**
   * 检查是否有子菜单项
   * Check if item has sub-menu items
   */
  const hasSubItems = hasChildren(item);

  // ==================== 渲染函数 Render Functions ====================

  /**
   * 递归渲染子菜单项
   * Recursively render sub-menu items
   *
   * 使用 Collapse 组件实现展开/收起动画效果
   * Uses Collapse component for expand/collapse animation effects
   *
   * @returns 子菜单项的 JSX 元素或 null Sub-menu items JSX element or null
   */
  const renderSubItems = () => {
    if (!hasSubItems || !item.children) return null;

    return (
      <Collapse
        in={isOpen}
        timeout="auto"
        unmountOnExit
        data-level={level === 0 ? "false" : "true"}
        sx={{ paddingLeft: (theme) => theme.spacing(3) }}
      >
        <List
          component="div"
          disablePadding
          sx={{
            paddingLeft: (theme) => theme.spacing(1.5),
            paddingTop: (theme) => theme.spacing(0.5),
          }}
          className="fast-menu-item-container-sub"
        >
          {item.children.map((child, childIndex) => (
            <MenuItemRenderer
              key={`${itemPath}.${childIndex}`}
              item={child}
              itemPath={`${itemPath}.${childIndex}`}
              level={level + 1}
            />
          ))}
        </List>
      </Collapse>
    );
  };

  // ==================== 组件渲染 Component Render ====================

  return (
    <StyledContainerBox
      key={itemPath}
      sx={{
        ...(level === 0 ? StyledContainerBoxLevelSx : undefined),
      }}
    >
      {/* 主菜单项 Main menu item */}
      <MenuItem
        item={item}
        itemPath={itemPath}
        level={level}
        open={isOpen}
        onToggle={hasSubItems ? () => handleItemToggle(itemPath) : undefined}
        onClick={() => handleItemClick(itemPath)}
        disabled={item.disabled || false}
      />
      {/* 子菜单项 Sub-menu items */}
      {renderSubItems()}
    </StyledContainerBox>
  );
};
