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

import React, { useMemo, useCallback, memo } from 'react';
import MenuList from './components/private/MenuList';
import { useMenuState } from './hooks/useMenuState';
import type { MenuProps, MenuItem } from './types/public';
import type { NavData, NavSection, NavItem, MenuConfig } from './types';

// ==================== 工具函数 Utility Functions ====================

/**
 * 将简化的MenuItem转换为内部NavItem格式
 * Convert simplified MenuItem to internal NavItem format
 * 
 * 使用缓存优化，避免重复转换相同的MenuItem
 * Use caching optimization to avoid repeated conversion of the same MenuItem
 */
const menuItemCache = new WeakMap<MenuItem, NavItem>();

const convertMenuItemToNavItem = (item: MenuItem): NavItem => {
  // 检查缓存
  if (menuItemCache.has(item)) {
    return menuItemCache.get(item)!;
  }
  
  const navItem: NavItem = {
    title: item.title,
    path: item.path || `#${item.key}`,
    icon: typeof item.icon === 'string' ? item.icon : undefined,
    info: item.badge ? ['badge', String(item.badge)] : undefined,
    roles: item.roles,
    children: item.children?.map(convertMenuItemToNavItem),
  };
  
  // 缓存结果
  menuItemCache.set(item, navItem);
  return navItem;
};

/**
 * 将简化的items转换为内部NavData格式
 * Convert simplified items to internal NavData format
 * 
 * 使用缓存优化，避免重复转换相同的items数组
 * Use caching optimization to avoid repeated conversion of the same items array
 */
const navDataCache = new WeakMap<MenuItem[], NavData>();

const convertItemsToNavData = (items: MenuItem[]): NavData => {
  // 检查缓存
  if (navDataCache.has(items)) {
    return navDataCache.get(items)!;
  }
  
  const navData: NavData = {
    navItems: [
      {
        items: items.map(convertMenuItemToNavItem),
      },
    ],
  };
  
  // 缓存结果
  navDataCache.set(items, navData);
  return navData;
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
 * 使用React.memo进行性能优化，避免不必要的重新渲染
 * Use React.memo for performance optimization to avoid unnecessary re-renders
 * 
 * @param props - 简化的组件属性 Simplified component props
 * @returns 渲染的菜单组件 Rendered menu component
 */
const MenuComponent: React.FC<MenuProps> = (props) => {
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
   * 查找MenuItem的缓存函数
   * Cached function for finding MenuItem
   */
  const findMenuItem = useCallback(
    (items: MenuItem[], targetKey: string): MenuItem | null => {
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
    },
    []
  );
  
  /**
   * 处理菜单项点击事件
   * Handle menu item click events
   */
  const handleItemClick = useCallback(
    (path: string, item: NavItem) => {
      // 从path反推出原始的key
      const key = path.replace('section-0.', '');
      
      if (items) {
        const menuItem = findMenuItem(items, key);
        if (menuItem) {
          onItemClick?.(menuItem, path);
          onItemSelect?.(menuItem, path);
        }
      } else {
        // 如果使用data格式，直接调用回调
        const fallbackMenuItem = { key, title: item.title, path } as MenuItem;
        onItemClick?.(fallbackMenuItem, path);
        onItemSelect?.(fallbackMenuItem, path);
      }
    },
    [items, findMenuItem, onItemClick, onItemSelect]
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
  
  // ==================== 受控状态处理 Controlled State Handling ====================
  
  /**
   * 处理受控状态的转换
   * Handle controlled state conversion
   */
  const controlledState = useMemo(() => {
    if (!selectedItem && !expandedItems) {
      // 非受控模式
      return {};
    }
    
    const state: any = {};
    
    // 处理选中状态
    if (selectedItem) {
      state.selectedItem = `section-0.${selectedItem}`;
    }
    
    // 处理展开状态
    if (expandedItems) {
      const openStates: Record<string, boolean> = {};
      expandedItems.forEach(key => {
        openStates[`section-0.${key}`] = true;
      });
      state.openStates = openStates;
    }
    
    return state;
  }, [selectedItem, expandedItems]);
  
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
      {...controlledState}
    />
  );
};

// ==================== 性能优化包装 Performance Optimization Wrapper ====================

/**
 * 使用React.memo包装组件，进行浅比较优化
 * Wrap component with React.memo for shallow comparison optimization
 * 
 * 自定义比较函数，优化特定props的比较
 * Custom comparison function to optimize comparison of specific props
 */
export const Menu = memo(MenuComponent, (prevProps, nextProps) => {
  // 基础props比较
  if (
    prevProps.variant !== nextProps.variant ||
    prevProps.theme !== nextProps.theme ||
    prevProps.size !== nextProps.size ||
    prevProps.collapsible !== nextProps.collapsible ||
    prevProps.accordion !== nextProps.accordion ||
    prevProps.defaultSelected !== nextProps.defaultSelected ||
    prevProps.selectedItem !== nextProps.selectedItem ||
    prevProps.className !== nextProps.className
  ) {
    return false;
  }
  
  // 数组props的深度比较
  if (prevProps.defaultExpanded?.length !== nextProps.defaultExpanded?.length) {
    return false;
  }
  
  if (prevProps.defaultExpanded && nextProps.defaultExpanded) {
    for (let i = 0; i < prevProps.defaultExpanded.length; i++) {
      if (prevProps.defaultExpanded[i] !== nextProps.defaultExpanded[i]) {
        return false;
      }
    }
  }
  
  if (prevProps.expandedItems?.length !== nextProps.expandedItems?.length) {
    return false;
  }
  
  if (prevProps.expandedItems && nextProps.expandedItems) {
    for (let i = 0; i < prevProps.expandedItems.length; i++) {
      if (prevProps.expandedItems[i] !== nextProps.expandedItems[i]) {
        return false;
      }
    }
  }
  
  // items数组的引用比较（如果引用相同，认为内容相同）
  if (prevProps.items !== nextProps.items) {
    return false;
  }
  
  // data对象的引用比较
  if (prevProps.data !== nextProps.data) {
    return false;
  }
  
  // 函数props的引用比较
  if (
    prevProps.onItemClick !== nextProps.onItemClick ||
    prevProps.onItemSelect !== nextProps.onItemSelect ||
    prevProps.onItemToggle !== nextProps.onItemToggle ||
    prevProps.onToggle !== nextProps.onToggle
  ) {
    return false;
  }
  
  // 样式对象的浅比较
  if (prevProps.style !== nextProps.style) {
    if (!prevProps.style && !nextProps.style) {
      return true;
    }
    if (!prevProps.style || !nextProps.style) {
      return false;
    }
    
    const prevKeys = Object.keys(prevProps.style);
    const nextKeys = Object.keys(nextProps.style);
    
    if (prevKeys.length !== nextKeys.length) {
      return false;
    }
    
    for (const key of prevKeys) {
       const prevValue = prevProps.style[key as keyof React.CSSProperties];
       const nextValue = nextProps.style[key as keyof React.CSSProperties];
       if (prevValue !== nextValue) {
         return false;
       }
     }
  }
  
  return true;
});

// ==================== 默认导出 Default Export ====================

export default Menu;