/**
 * Menu 主组件
 * Main Menu component
 *
 * 使用 Zustand 进行状态管理的简化菜单组件
 * Simplified menu component using Zustand for state management
 *
 * 设计原则：
 * - 使用 Zustand 集中管理状态，减少 props 传递
 * - 提供简化的、直观的API接口
 * - 内部使用现有的MenuList组件，保证功能完整性
 * - 保持100%向后兼容
 *
 * Design principles:
 * - Use Zustand for centralized state management, reducing props drilling
 * - Provide simplified, intuitive API interface
 * - Use existing MenuList component internally to ensure functional completeness
 * - Maintain 100% backward compatibility
 */

import React, { useEffect, memo } from "react";
import MenuList from "./components/private/MenuList";
import {
  MenuStoreProvider,
  useMenuStoreContext,
} from "./context/MenuStoreContext";
import { createMenuStore } from "./stores/createMenuStore";
import type { MenuProps, MenuItem } from "./types/public";
import type { NavData, NavItem } from "./types";
import defaultMenuData from "./data/menu-data.json";

// ==================== 工具函数 Utility Functions ====================

/**
 * 将简化的MenuItem转换为内部NavItem格式
 * Convert simplified MenuItem to internal NavItem format
 */
const convertMenuItemToNavItem = (item: MenuItem): NavItem => {
  return {
    title: item.title,
    path: item.path || `#${item.key}`,
    icon: typeof item.icon === "string" ? item.icon : undefined,
    info: item.badge ? ["badge", String(item.badge)] : undefined,
    roles: item.roles,
    children: item.children?.map(convertMenuItemToNavItem),
  };
};

/**
 * 将简化的items转换为内部NavData格式
 * Convert simplified items to internal NavData format
 */
const convertItemsToNavData = (items: MenuItem[]): NavData => {
  return {
    navItems: [
      {
        items: items.map(convertMenuItemToNavItem),
      },
    ],
  };
};

// ==================== 主组件 Main Component ====================

/**
 * Menu 内部组件（处理 store 逻辑）
 * Internal Menu component (handles store logic)
 *
 * @param props - 组件属性 Component props
 * @returns 渲染的菜单组件 Rendered menu component
 */
const MenuInternalComponent: React.FC<MenuProps> = (props) => {
  const {
    items,
    data,
    variant = "sidebar",
    theme = "light",
    size = "medium",
    defaultSelected,
    defaultExpanded,
    collapsible = false,
    accordion = false,
    selectedItem,
    expandedItems,
    onItemClick,
    onItemSelect,
    onItemToggle,
    onToggle,
    className,
    style,
  } = props;

  // 从 Context 获取当前实例的 store
  const store = useMenuStoreContext();

  // 获取 store 方法
  const setData = store((state) => state.setData);
  const setItems = store((state) => state.setItems);
  const setVariant = store((state) => state.setVariant);
  const setTheme = store((state) => state.setTheme);
  const setSize = store((state) => state.setSize);
  const setAccordion = store((state) => state.setAccordion);
  const setCollapsible = store((state) => state.setCollapsible);
  const selectItem = store((state) => state.selectItem);
  const setExpandedItems = store((state) => state.setExpandedItems);
  const setCallbacks = store((state) => state.setCallbacks);

  // ==================== 初始化状态 Initialize State ====================

  useEffect(() => {
    // 设置基础配置
    setVariant(variant);
    setTheme(theme);
    setSize(size);
    setAccordion(accordion);
    setCollapsible(collapsible);

    // 设置回调函数
    setCallbacks({
      onItemClick: onItemClick
        ? (key: string) => {
            // 需要根据key找到对应的MenuItem
            // 这里暂时传递简化的参数
            onItemClick({ key, title: "", path: key } as MenuItem, key);
          }
        : undefined,
      onItemSelect: onItemSelect
        ? (key: string) => {
            // 需要根据key找到对应的MenuItem
            // 这里暂时传递简化的参数
            onItemSelect({ key, title: "", path: key } as MenuItem, key);
          }
        : undefined,
      onItemToggle: onItemToggle
        ? (key: string) => {
            // onItemToggle 需要两个参数，这里需要获取展开状态
            const { expandedItems } = store.getState();
            const expanded = !expandedItems.includes(key);
            onItemToggle(key, expanded);
          }
        : undefined,
      onToggle,
    });
  }, [
    variant,
    theme,
    size,
    accordion,
    collapsible,
    onItemClick,
    onItemSelect,
    onItemToggle,
    onToggle,
    setVariant,
    setTheme,
    setSize,
    setAccordion,
    setCollapsible,
    setCallbacks,
  ]);

  useEffect(() => {
    // 设置数据
    if (data) {
      setData(data);
    } else if (items && items.length > 0) {
      // 将 MenuItem[] 转换为 NavData 格式
      const navData = convertItemsToNavData(items);
      setData(navData);
    } else {
      // 如果没有传入任何数据，使用默认数据
      setData(defaultMenuData as NavData);
    }
  }, [items, data, setData, setItems]);

  useEffect(() => {
    // 设置选中项
    if (selectedItem !== undefined) {
      selectItem(selectedItem);
    } else if (defaultSelected) {
      selectItem(defaultSelected);
    }
  }, [selectedItem, defaultSelected, selectItem]);

  useEffect(() => {
    // 设置展开项
    if (expandedItems !== undefined) {
      setExpandedItems(expandedItems);
    } else if (defaultExpanded && defaultExpanded.length > 0) {
      setExpandedItems(defaultExpanded);
    }
  }, [expandedItems, defaultExpanded, setExpandedItems]);

  // ==================== 样式处理 Style Handling ====================

  /**
   * 根据variant和theme生成样式类名
   * Generate style class names based on variant and theme
   */
  const menuClassName = [
    "menu-v2",
    variant && `menu-v2--${variant}`,
    theme && `menu-v2--${theme}`,
    size && `menu-v2--${size}`,
    collapsible && "menu-v2--collapsible",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /**
   * 合并样式
   * Merge styles
   */
  const menuStyle: React.CSSProperties = {
    // 根据variant设置基础样式
    ...(variant === "collapsed" && { width: "64px" }),
    ...(variant === "horizontal" && { flexDirection: "row" }),
    ...style,
  };

  // ==================== 组件渲染 Component Render ====================

  return <MenuList className={menuClassName} style={menuStyle} />;
};

// ==================== 主组件包装 Main Component Wrapper ====================

/**
 * Menu 主组件
 * Main Menu component
 *
 * 用 MenuStoreProvider 包装内部组件，为每个实例提供独立状态
 * Wraps internal component with MenuStoreProvider to provide isolated state for each instance
 *
 * @param props - 组件属性 Component props
 * @returns 包装后的菜单组件 Wrapped menu component
 */
const MenuComponent: React.FC<MenuProps> = (props) => {
  return (
    <MenuStoreProvider>
      <MenuInternalComponent {...props} />
    </MenuStoreProvider>
  );
};

// ==================== 性能优化包装 Performance Optimization Wrapper ====================

/**
 * 使用React.memo包装组件，进行性能优化
 * Wrap component with React.memo for performance optimization
 */
export const Menu = memo(MenuComponent);

// ==================== 默认导出 Default Export ====================

export default Menu;
