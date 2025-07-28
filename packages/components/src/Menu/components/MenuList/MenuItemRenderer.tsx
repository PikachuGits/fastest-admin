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
import { Collapse, List, styled } from '@mui/material';
import { MenuItem } from '../MenuItem';
import type { NavItem, OpenStatesRecord } from '../../types';
import { parseInfoBadge, getBadgeColor, hasChildren } from '../../utils/menuHelpers';

// ==================== 样式组件 Styled Components ====================

/**
 * 容器样式组件
 * Container styled component
 * 
 * 为菜单项提供基础容器样式，支持多层级嵌套
 * Provides basic container styles for menu items, supporting multi-level nesting
 */
const ContainerBox = styled('div')(({ theme }) => ({}));

/**
 * 子菜单容器样式
 * Sub-menu container styles
 * 
 * 为子菜单项提供适当的缩进和间距
 * Provides appropriate indentation and spacing for sub-menu items
 */
const SubMenuList = styled(List)(({ theme }: { theme: any }) => ({
  paddingLeft: theme.spacing(2),
  paddingTop: 0,
  paddingBottom: 0,
}));

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuItemRenderer 组件属性接口
 * MenuItemRenderer component props interface
 * 
 * 定义菜单项渲染器的所有必需和可选属性
 * Defines all required and optional properties for the menu item renderer
 */
export interface MenuItemRendererProps {
  /** 菜单项数据 Menu item data */
  item: NavItem;
  /** 菜单项路径 Menu item path */
  itemPath: string;
  /** 菜单层级深度 Menu nesting level depth */
  level: number;
  /** 当前选中的菜单项路径 Currently selected menu item path */
  selectedItem: string;
  /** 菜单项展开状态记录 Menu item open states record */
  openStates: OpenStatesRecord;
  /** 切换展开状态的回调函数 Callback function to toggle open state */
  onToggleOpen: (key: string) => void;
  /** 菜单项点击回调函数 Menu item click callback function */
  onItemClick: (itemKey: string) => void;
}

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
   * 检查当前菜单项是否被选中
   * Check if current menu item is selected
   */
  const isSelected = selectedItem === itemPath;
  
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
  
  /**
   * 检查是否有子菜单被选中（父级选中状态）
   * Check if any sub-menu item is selected (parent selected state)
   * 
   * 检查选中项的路径是否包含当前项的路径，实现完整路径上所有父级的选中效果
   * Check if selected item path contains current item path, implementing selection effect for all parents in complete path
   */
  const isParentSelected = hasSubItems && selectedItem.startsWith(itemPath + '.') && selectedItem !== itemPath;
  
  /**
   * 解析徽章数字
   * Parse badge number from item info
   */
  const badge = parseInfoBadge(item.info);
  
  /**
   * 获取图标（如果存在）
   * Get icon if exists
   */
  const actualIcon = item.icon ? item.icon : undefined;

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
        sx={{
          paddingLeft: "24px",
        }}
      >
        <List
          component="div"
          disablePadding
          sx={{ paddingLeft: "12px" }}
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
    <ContainerBox
      key={itemPath}
      sx={
        level === 0
          ? {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)", // Safari 兼容性 Safari compatibility
              marginTop: 1,
              borderRadius: 1,
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: "10000 !important",
              boxShadow: "rgba(0, 0, 0, 0.35) 1px 2px 5px",
              padding: "2px 2px",
            }
          : {}
      }
    >
      {/* 主菜单项 Main menu item */}
      <MenuItem
        icon={actualIcon as any}
        primary={item.title}
        secondary={item.caption}
        level={level}
        selected={isSelected}
        parentSelected={isParentSelected}
        hasSubItems={hasSubItems}
        open={isOpen}
        onToggle={hasSubItems ? () => onToggleOpen(itemPath) : undefined}
        onClick={() => onItemClick(itemPath)}
        numberBadge={badge}
        badgeColor={getBadgeColor(badge)}
        disabled={false}
      />
      
      {/* 子菜单项 Sub-menu items */}
      {renderSubItems()}
    </ContainerBox>
  );
};