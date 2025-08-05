/**
 * Menu 主组件
 * Main Menu component
 * 
 * 这是重构后的简化菜单组件，作为现有复杂组件的封装层
 * This is the refactored simplified menu component, serving as a wrapper for existing complex components
 * 
 * 设计原则：
 * - 提供简化的、直观的API接口
 * - 内部使用现有的MenuList组件，保证功能完整性
 * - 将简化的props转换为内部复杂格式
 * - 保持100%向后兼容
 * 
 * Design principles:
 * - Provide simplified, intuitive API interface
 * - Use existing MenuList component internally to ensure functional completeness
 * - Convert simplified props to internal complex format
 * - Maintain 100% backward compatibility
 */

import React, { useMemo, useCallback } from 'react';
import MenuList from './components/internal/MenuList';
import { useMenuState } from './hooks/useMenuState';
import type { MenuProps, MenuItem } from './types/public';
import type { NavData, NavSection, NavItem, MenuConfig } from './types';

// ==================== 工具函数 Utility Functions ====================

/**
 * 将简化的MenuItem转换为内部NavItem格式
 * Convert simplified MenuItem to internal NavItem format
 */
const convertMenuItemToNavItem = (item: MenuItem): NavItem => {
  return {
    title: item.title,
    path: item.path || `#${item.key}`,
    icon: typeof item.icon === 'string' ? item.icon : undefined,
    info: item.badge ? ['badge', String(item.badge)] : undefined,
    roles: item.roles,
    children: item.children?.map(convertMenuItemToNavItem),
  };
};

/**
 * 将简化的items转换为内部NavData格式
 * Convert simplified items to internal NavData format
 */
const convertItemsToNavData = (items: MenuItem[]): NavData => {
  const navItems: NavSection[] = [
    {
      items: items.map(convertMenuItemToNavItem),
    },
  ];
  
  return { navItems };
};

/**
 * 根据variant获取内部配置
 * Get internal configuration based on variant
 */
const getInternalConfig = (props: MenuProps): MenuConfig => {
  const {
    variant = 'sidebar',
    defaultSelected,
    defaultExpanded = [],
    accordion = false,
  } = props;
  
  // 将简化的key转换为内部路径格式
  const convertKeyToPath = (key: string) => {
    // 简单的转换逻辑，实际可能需要更复杂的映射
    return `section-0.${key}`;
  };
  
  return {
    defaultSelectedItem: defaultSelected ? convertKeyToPath(defaultSelected) : undefined,
    defaultOpenItems: defaultExpanded.map(convertKeyToPath),
    enableRoleBasedAccess: false,
    userRoles: [],
  };
};

// ==================== 主组件 Main Component ====================

/**
 * Menu 主组件
 * Main Menu component
 * 
 * 简化的菜单组件，提供直观易用的API
 * Simplified menu component providing intuitive and easy-to-use API
 * 
 * @param props - 简化的组件属性 Simplified component props
 * @returns 渲染的菜单组件 Rendered menu component
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const {
    items,
    data,
    variant = 'sidebar',
    theme = 'light',
    size = 'medium',
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
  
  // ==================== 数据转换 Data Conversion ====================
  
  /**
   * 将简化的items转换为内部NavData格式，或直接使用data
   * Convert simplified items to internal NavData format, or use data directly
   */
  const navData = useMemo(() => {
    // 如果提供了data，直接使用
    if (data) {
      return data;
    }
    // 否则转换items
    if (items && items.length > 0) {
      return convertItemsToNavData(items);
    }
    // 默认空数据
    return { navItems: [] };
  }, [items, data]);
  
  /**
   * 获取内部配置
   * Get internal configuration
   */
  const internalConfig = useMemo(() => getInternalConfig(props), [
    variant,
    defaultSelected,
    defaultExpanded,
    accordion,
  ]);
  
  // ==================== 事件处理 Event Handling ====================
  
  /**
   * 处理菜单项点击事件
   * Handle menu item click events
   */
  const handleItemClick = useCallback(
    (path: string, item: NavItem) => {
      // 从path反推出原始的key
      const key = path.replace('section-0.', '');
      
      // 查找对应的MenuItem
      const findMenuItem = (items: MenuItem[], targetKey: string): MenuItem | null => {
        for (const menuItem of items) {
          if (menuItem.key === targetKey) {
            return menuItem;
          }
          if (menuItem.children) {
            const found = findMenuItem(menuItem.children, targetKey);
            if (found) return found;
          }
        }
        return null;
      };
      
      if (items) {
        const menuItem = findMenuItem(items, key);
        if (menuItem) {
          onItemClick?.(menuItem, path);
          onItemSelect?.(menuItem, path);
        }
      } else {
        // 如果使用data格式，直接调用回调
        onItemClick?.({ key, title: item.title, path } as MenuItem, path);
        onItemSelect?.({ key, title: item.title, path } as MenuItem, path);
      }
    },
    [items, onItemClick, onItemSelect]
  );
  
  /**
   * 处理菜单项展开/折叠事件
   * Handle menu item toggle events
   */
  const handleItemToggle = useCallback(
    (path: string, isOpen: boolean) => {
      const key = path.replace('section-0.', '');
      onItemToggle?.(key, isOpen);
    },
    [onItemToggle]
  );
  
  // ==================== 样式处理 Style Handling ====================
  
  /**
   * 根据variant和theme生成样式类名
   * Generate style class names based on variant and theme
   */
  const menuClassName = useMemo(() => {
    const classes = ['menu-v2'];
    
    if (variant) classes.push(`menu-v2--${variant}`);
    if (theme) classes.push(`menu-v2--${theme}`);
    if (size) classes.push(`menu-v2--${size}`);
    if (collapsible) classes.push('menu-v2--collapsible');
    if (className) classes.push(className);
    
    return classes.join(' ');
  }, [variant, theme, size, collapsible, className]);
  
  /**
   * 合并样式
   * Merge styles
   */
  const menuStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      // 根据variant设置基础样式
      ...(variant === 'collapsed' && { width: '64px' }),
      ...(variant === 'horizontal' && { flexDirection: 'row' }),
    };
    
    return { ...baseStyle, ...style };
  }, [variant, style]);
  
  // ==================== 组件渲染 Component Render ====================
  
  return (
    <MenuList
      data={navData}
      config={internalConfig}
      collapsed={variant === 'collapsed'}
      onItemClick={handleItemClick}
      onItemToggle={handleItemToggle}
      className={menuClassName}
      style={menuStyle}
    />
  );
};

// ==================== 默认导出 Default Export ====================

export default Menu;