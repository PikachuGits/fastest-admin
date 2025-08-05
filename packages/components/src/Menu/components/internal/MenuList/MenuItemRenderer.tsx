/**
 * 菜单项渲染组件
 * Menu item renderer component
 */

/**
 * MenuItemRenderer 组件
 * MenuItemRenderer Component
 * 
 * 负责渲染单个菜单项及其子菜单项，支持多层级嵌套
 * Responsible for rendering individual menu items and their sub-items, supporting multi-level nesting
 */

import React, { type ReactElement } from 'react';
import { Collapse, List } from '@mui/material';
import { MenuItem } from '../MenuItem';
import { parseInfoBadge, getBadgeColor, hasChildren } from '../../../utils/menuHelpers';
import {
  StyledContainerBox,
  StyledSubMenuList,
  StyledContainerBoxLevelSx,
  type MenuItemRendererProps,
} from './MenuItemRenderer.styles';

// ==================== 主组件 Main Component ====================

/**
 * 菜单项渲染组件
 * Menu item renderer component
 * 
 * 负责渲染单个菜单项及其子菜单项，支持多层级嵌套
 * Responsible for rendering individual menu items and their sub-items, supports multi-level nesting
 * 
 * @param props - 组件属性 Component props
 * @returns 渲染的菜单项元素 Rendered menu item element
 */
export const MenuItemRenderer: React.FC<MenuItemRendererProps> = ({
  item,
  itemPath,
  level = 0,
  selectedItem,
  openStates,
  onToggleOpen,
  onItemClick,
}) => {
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
          sx={{ paddingLeft: (theme) => theme.spacing(1.5) }}
          className="fast-menu-item-container-sub"
        >
          {item.children.map((child, childIndex) => (
            <MenuItemRenderer
              key={`${itemPath}.${childIndex}`}
              item={child}
              itemPath={`${itemPath}.${childIndex}`}
              level={level + 1}
              selectedItem={selectedItem}
              openStates={openStates}
              onToggleOpen={onToggleOpen}
              onItemClick={onItemClick}
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
      sx={level === 0 ? StyledContainerBoxLevelSx : undefined}
    >
      {/* 主菜单项 Main menu item */}
      <MenuItem
        item={item}
        itemPath={itemPath}
        level={level}
        selectedItem={selectedItem}
        hasSubItems={hasSubItems}
        open={isOpen}
        onToggle={hasSubItems ? () => onToggleOpen(itemPath) : undefined}
        onClick={() => onItemClick(itemPath)}
        disabled={false}
      />

      {/* 子菜单项 Sub-menu items */}
      {renderSubItems()}
    </StyledContainerBox>
  );
};