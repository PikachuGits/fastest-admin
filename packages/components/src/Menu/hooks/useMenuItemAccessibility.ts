/**
 * MenuItem 无障碍性自定义 Hook
 * MenuItem accessibility custom hook
 * 
 * 提供菜单项的无障碍性支持，包括键盘导航和屏幕阅读器支持
 * Provides accessibility support for menu items, including keyboard navigation and screen reader support
 */

import { useMemo, useCallback } from 'react';

// ==================== 类型定义 Type Definitions ====================

/**
 * 无障碍性 Hook 参数接口
 * Accessibility hook parameters interface
 */
export interface UseMenuItemAccessibilityParams {
  /** 是否被选中 Whether selected */
  isSelected: boolean;
  /** 是否有子菜单 Whether has sub-menu */
  hasSubItems: boolean;
  /** 是否展开 Whether expanded */
  open: boolean;
  /** 是否禁用 Whether disabled */
  disabled: boolean;
  /** 菜单项路径 Menu item path */
  itemPath: string;
  /** 菜单项标题 Menu item title */
  title?: string;
  /** 菜单项描述 Menu item description */
  caption?: string;
  /** 点击处理器 Click handler */
  onClick?: () => void;
}

/**
 * 无障碍性 Hook 返回值接口
 * Accessibility hook return value interface
 */
export interface UseMenuItemAccessibilityReturn {
  /** ARIA 属性 ARIA attributes */
  ariaProps: {
    role: string;
    'aria-expanded'?: boolean;
    'aria-disabled': boolean;
    'aria-selected': boolean;
    'aria-label': string;
    'aria-describedby'?: string;
    tabIndex: number;
  };
  /** 键盘事件处理器 Keyboard event handlers */
  keyboardHandlers: {
    onKeyDown: (event: React.KeyboardEvent) => void;
  };
}

// ==================== 自定义 Hook Custom Hook ====================

/**
 * MenuItem 无障碍性 Hook
 * MenuItem accessibility hook
 * 
 * 提供完整的无障碍性支持，包括 ARIA 属性和键盘导航
 * Provides complete accessibility support including ARIA attributes and keyboard navigation
 * 
 * @param params - Hook 参数 Hook parameters
 * @returns 无障碍性属性和处理器 Accessibility attributes and handlers
 */
export const useMenuItemAccessibility = ({
  isSelected,
  hasSubItems,
  open,
  disabled,
  itemPath,
  title,
  caption,
  onClick,
}: UseMenuItemAccessibilityParams): UseMenuItemAccessibilityReturn => {
  
  // ==================== ARIA 属性计算 ARIA Attributes Calculation ====================
  
  /**
   * 计算 ARIA 标签
   * Calculate ARIA label
   */
  const ariaLabel = useMemo(() => {
    let label = title || 'Menu item';
    
    if (caption) {
      label += `, ${caption}`;
    }
    
    if (hasSubItems) {
      label += `, has submenu`;
      if (open) {
        label += ', expanded';
      } else {
        label += ', collapsed';
      }
    }
    
    if (disabled) {
      label += ', disabled';
    }
    
    return label;
  }, [title, caption, hasSubItems, open, disabled]);

  /**
   * 计算描述 ID
   * Calculate description ID
   */
  const descriptionId = useMemo(() => {
    return caption ? `menu-item-${itemPath}-description` : undefined;
  }, [caption, itemPath]);

  /**
   * 计算 ARIA 属性
   * Calculate ARIA attributes
   */
  const ariaProps = useMemo(() => ({
    role: 'menuitem' as const,
    'aria-expanded': hasSubItems ? open : undefined,
    'aria-disabled': disabled,
    'aria-selected': isSelected,
    'aria-label': ariaLabel,
    'aria-describedby': descriptionId,
    tabIndex: disabled ? -1 : 0,
  }), [hasSubItems, open, disabled, isSelected, ariaLabel, descriptionId]);

  // ==================== 键盘导航处理 Keyboard Navigation Handling ====================
  
  /**
   * 键盘事件处理器
   * Keyboard event handler
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ': // Space key
        event.preventDefault();
        event.stopPropagation();
        if (onClick) {
          onClick();
        }
        break;
        
      case 'ArrowRight':
        // 展开子菜单或进入子菜单
        // Expand submenu or enter submenu
        if (hasSubItems && !open) {
          event.preventDefault();
          event.stopPropagation();
          if (onClick) {
            onClick();
          }
        }
        break;
        
      case 'ArrowLeft':
        // 折叠子菜单或返回父菜单
        // Collapse submenu or return to parent menu
        if (hasSubItems && open) {
          event.preventDefault();
          event.stopPropagation();
          if (onClick) {
            onClick();
          }
        }
        break;
        
      case 'Escape':
        // 折叠子菜单
        // Collapse submenu
        if (hasSubItems && open) {
          event.preventDefault();
          event.stopPropagation();
          if (onClick) {
            onClick();
          }
        }
        break;
        
      default:
        // 其他键不处理
        // Don't handle other keys
        break;
    }
  }, [disabled, onClick, hasSubItems, open]);

  /**
   * 键盘处理器对象
   * Keyboard handlers object
   */
  const keyboardHandlers = useMemo(() => ({
    onKeyDown: handleKeyDown,
  }), [handleKeyDown]);

  // ==================== 返回结果 Return Results ====================
  
  return {
    ariaProps,
    keyboardHandlers,
  };
};