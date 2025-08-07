/**
 * MenuList 主组件
 * Main MenuList component
 *
 * 使用 Zustand 进行状态管理的菜单列表组件：
 * - 使用 Zustand store 管理所有状态
 * - 简化 props 接口，移除状态传递
 * - 保持模块化设计和渲染逻辑
 *
 * Menu list component using Zustand for state management:
 * - Use Zustand store to manage all states
 * - Simplified props interface, removed state passing
 * - Maintain modular design and rendering logic
 */

import React from "react";
import { List, styled } from "@mui/material";
import defaultMenuData from "../../../data/menu-data.json";
import "../../../styles/index.less";

// 导入拆分的模块
// Import separated modules
import type { NavData, NavSection } from "../../../types";
import { useMenuStoreContext } from "../../../context/MenuStoreContext";
import { MenuSectionRenderer } from "./MenuSectionRenderer";

// ==================== 样式组件 Styled Components ====================

/**
 * 菜单列表容器样式
 * Menu list container styles
 */
const StyledListBox = styled(List)(({ theme }) => ({
  padding: 0,
  margin: 0,
}));

// ==================== 类型定义 Type Definitions ====================

/**
 * MenuList 组件属性接口（简化版）
 * MenuList component props interface (simplified)
 */
interface MenuListProps {
  className?: string;
  style?: React.CSSProperties;
}

// ==================== 主组件 Main Component ====================

/**
 * MenuList 主组件
 * Main MenuList component
 *
 * 使用 Zustand 进行状态管理的菜单列表组件
 * Menu list component using Zustand for state management
 *
 * @param props - 简化的组件属性 Simplified component props
 * @returns 渲染的菜单列表 Rendered menu list
 */
const MenuList: React.FC<MenuListProps> = (props) => {
  // ==================== 状态管理 State Management ====================

  /**
   * 从 Context 获取当前实例的 store
   * Get current instance store from Context
   */
  const store = useMenuStoreContext();
  const data = store((state) => state.data);
  const selectedItem = store((state) => state.selectedItem);
  const openStates = store((state) => state.openStates);
  const collapsed = store((state) => state.collapsed);
  const handleItemClick = store((state) => state.handleItemClick);
  const handleItemToggle = store((state) => state.handleItemToggle);

  /**
   * 获取菜单数据，优先使用 store 中的数据，如果没有则使用默认数据
   * Get menu data, prioritize data from store, fallback to default data
   */
  const menuData = data || defaultMenuData;

  /**
   * 处理收起状态的菜单展开状态
   * Handle menu open states for collapsed state
   */
  const effectiveOpenStates = collapsed ? {} : openStates;

  // ==================== 事件处理 Event Handlers ====================
  // 事件处理逻辑已移至 Zustand store 中
  // Event handling logic has been moved to Zustand store

  // ==================== 渲染函数 Render Functions ====================

  /**
   * 渲染菜单分组
   * Render menu sections
   *
   * 遍历菜单数据并渲染每个分组
   * Iterates through menu data and renders each section
   */
  const renderMenuSections = () => {
    // 添加空值检查，确保 navItems 存在
    // Add null check to ensure navItems exists
    if (!menuData?.navItems) {
      return null;
    }

    return menuData.navItems.map((section: NavSection, index: number) => {
      if (!section) return null; // 空值检查 Null check

      return (
        <MenuSectionRenderer
          key={`section-${index}`}
          section={section}
          sectionIndex={index}
        />
      );
    });
  };

  // ==================== 组件渲染 Component Render ====================

  return (
    <StyledListBox
      sx={{
        height: "100%",
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
