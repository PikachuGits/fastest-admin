/**
 * MenuList 主组件
 * Main MenuList component
 * 
 * 这是一个重构后的菜单列表组件，采用模块化设计：
 * - 类型定义统一到 ../../types/index.ts
 * - 工具函数独立到 ../../utils/menuHelpers.ts  
 * - 状态管理独立到 ../../hooks/useMenuState.ts
 * - 渲染逻辑拆分到 MenuItemRenderer 和 MenuSectionRenderer
 * 
 * This is a refactored menu list component with modular design:
 * - Type definitions unified in ../../types/index.ts
 * - Utility functions separated to ../../utils/menuHelpers.ts
 * - State management separated to ../../hooks/useMenuState.ts
 * - Rendering logic split into MenuItemRenderer and MenuSectionRenderer
 */

import React, { useState, useCallback, type ReactElement } from 'react';
import { List, styled } from '@mui/material';
import menuData from '../../data/menu-data.json';
import '../../styles/index.less';

// 导入拆分的模块
// Import separated modules
import type { NavData, NavSection, OpenStatesRecord, MenuListProps, NavItem } from '../../types';
import { useMenuState } from '../../hooks/useMenuState';
import { MenuSectionRenderer } from './MenuSectionRenderer';

// ==================== 样式组件 Styled Components ====================

/**
 * 菜单列表容器样式
 * Menu list container styles
 */
const StyledListBox = styled(List)(({ theme }) => ({
  padding: 0,
  margin: 0,
}));

// ==================== 主组件 Main Component ====================

/**
 * MenuList 主组件
 * Main MenuList component
 * 
 * 菜单列表的主要组件，负责整体布局和状态管理
 * Main component for menu list, responsible for overall layout and state management
 * 
 * @param props - 组件属性，包含菜单配置和回调函数 Component props including menu configuration and callbacks
 * @returns 渲染的菜单列表 Rendered menu list
 */
const MenuList: React.FC<MenuListProps> = (props) => {
  // ==================== 状态管理 State Management ====================

  /**
   * 使用自定义 Hook 管理菜单状态
   * Use custom Hook to manage menu state
   */
  const { openStates, selectedItem, toggleOpen, handleItemClick } = useMenuState(
    menuData as NavData,
    props.config
  );

  // ==================== 事件处理 Event Handlers ====================

  /**
   * 处理菜单项点击事件（适配器函数）
   * Handle menu item click events (adapter function)
   */
  const handleMenuItemClickAdapter = (itemKey: string) => {
    handleItemClick(itemKey);
    // 调用外部回调，传递路径和空的 item 对象（因为 MenuSectionRenderer 不提供完整的 item 对象）
    // Call external callback, passing path and empty item object (since MenuSectionRenderer doesn't provide complete item object)
    props.onItemClick?.(itemKey, {} as NavItem);
  };

  /**
   * 处理菜单项展开/折叠事件
   * Handle menu item toggle events
   */
  const handleMenuItemToggle = (path: string) => {
    toggleOpen(path);
    const isOpen = !openStates[path];
    props.onItemToggle?.(path, isOpen);
  };

  // ==================== 渲染函数 Render Functions ====================

  /**
   * 渲染菜单分组
   * Render menu sections
   * 
   * 遍历菜单数据并渲染每个分组
   * Iterates through menu data and renders each section
   */
  const renderMenuSections = () => {
    const data = props.data || (menuData as NavData);

    return data.navItems.map((section: NavSection, index: number) => {
      if (!section) return null; // 空值检查 Null check

      return (
        <MenuSectionRenderer
          key={`section-${index}`}
          section={section}
          sectionIndex={index}
          selectedItem={selectedItem}
          openStates={openStates}
          onToggleOpen={handleMenuItemToggle}
          onItemClick={handleMenuItemClickAdapter}
        />
      );
    });
  };

  // ==================== 组件渲染 Component Render ====================

  return (
    <StyledListBox
      {...props}
      sx={{
        height: '100%',
        pb: (theme: any) => theme.spacing(2),
        ...props.style,
      }}
      className={props.className}
    >
      {renderMenuSections()}
    </StyledListBox>
  );
};

// ==================== 导出 Export ====================

export default MenuList;