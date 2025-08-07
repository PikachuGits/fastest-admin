/**
 * MenuItem 样式计算自定义 Hook
 * MenuItem styles calculation custom hook
 * 
 * 封装菜单项的样式计算逻辑，提供更好的性能和可维护性
 * Encapsulates menu item style calculation logic for better performance and maintainability
 */

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { createMenuTheme } from '../styles/theme';
import type { SxProps, Theme } from '@mui/material';

// ==================== 类型定义 Type Definitions ====================

/**
 * 菜单项样式状态接口
 * Menu item style state interface
 */
export interface MenuItemStyleState {
  /** 是否被选中 Whether selected */
  isSelected: boolean;
  /** 是否为父级选中状态 Whether parent is selected */
  isParentSelected: boolean;
  /** 是否有子菜单 Whether has sub-menu */
  hasSubItems: boolean;
  /** 是否为收起状态 Whether collapsed */
  collapsed: boolean;
  /** 是否禁用 Whether disabled */
  disabled: boolean;
  /** 菜单层级 Menu level */
  level: number;
}

/**
 * 菜单项样式 Hook 返回值接口
 * Menu item styles hook return value interface
 */
export interface UseMenuItemStylesReturn {
  /** 图标样式 Icon styles */
  iconStyles: SxProps<Theme>;
  /** 文本样式 Text styles */
  textStyles: SxProps<Theme>;
  /** 容器样式 Container styles */
  containerStyles: SxProps<Theme>;
}

// ==================== 样式常量 Style Constants ====================
// 移除硬编码的颜色常量，改为使用主题系统
// Remove hardcoded color constants, use theme system instead

// ==================== 自定义 Hook Custom Hook ====================

/**
 * MenuItem 样式计算 Hook
 * MenuItem styles calculation hook
 * 
 * 根据菜单项状态计算相应的样式，优化性能和可维护性
 * Calculates corresponding styles based on menu item state, optimizing performance and maintainability
 * 
 * @param styleState - 样式状态 Style state
 * @returns 计算后的样式对象 Calculated style objects
 */
export const useMenuItemStyles = (
  styleState: MenuItemStyleState
): UseMenuItemStylesReturn => {
  const {
    isSelected,
    isParentSelected,
    hasSubItems,
    collapsed,
    disabled,
    level,
  } = styleState;

  // ==================== 主题获取 Theme Retrieval ====================
  
  /**
   * 获取当前主题并创建菜单主题
   * Get current theme and create menu theme
   */
  const theme = useTheme();
  const menuTheme = useMemo(() => createMenuTheme(theme), [theme]);

  // ==================== 图标样式计算 Icon Styles Calculation ====================
  
  /**
   * 计算图标样式
   * Calculate icon styles
   */
  const iconStyles = useMemo<SxProps<Theme>>(() => {
    let color = menuTheme.colors.icon.default;
    
    if (disabled) {
      color = menuTheme.colors.text.disabled;
    } else if (isSelected || isParentSelected) {
      color = menuTheme.colors.icon.selected;
    }

    return {
      color,
      transition: menuTheme.animations.duration.normal,
      width: '100%',
      height: '100%',
    };
  }, [isSelected, isParentSelected, disabled, menuTheme]);

  // ==================== 文本样式计算 Text Styles Calculation ====================
  
  /**
   * 计算文本样式
   * Calculate text styles
   */
  const textStyles = useMemo<SxProps<Theme>>(() => {
    return {
      flex: 1,
      '& .MuiListItemText-primary': {
        fontSize: '14px',
        fontWeight: isSelected || isParentSelected ? 600 : 400,
        color: 'inherit',
        transition: `all ${menuTheme.animations.duration.fast} ${menuTheme.animations.easing.standard}`,
      },
      '& .MuiListItemText-secondary': {
        fontSize: '12px',
        opacity: collapsed ? 0 : 1,
        transition: `opacity ${menuTheme.animations.duration.fast} ${menuTheme.animations.easing.standard}`,
      },
    };
  }, [isSelected, isParentSelected, collapsed, menuTheme]);

  // ==================== 容器样式计算 Container Styles Calculation ====================
  
  /**
   * 计算容器样式
   * Calculate container styles
   */
  const containerStyles = useMemo<SxProps<Theme>>(() => {
    const baseStyles = {
      transition: `all ${menuTheme.animations.duration.fast} ${menuTheme.animations.easing.standard}`,
      borderRadius: 1,
      mb: 0.5,
      minHeight: menuTheme.spacing.size.itemHeight,
      ...(level > 0 && {
        ml: level * 2,
      }),
    };

    // 收起状态样式
    if (collapsed) {
      return {
        ...baseStyles,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: menuTheme.spacing.width.collapsed,
        px: 1,
        py: 1,
      };
    }

    // 选中状态样式
    if (isSelected) {
      return {
        ...baseStyles,
        backgroundColor: menuTheme.colors.background.selected,
        color: menuTheme.colors.text.selected,
        '&:hover': {
          backgroundColor: menuTheme.colors.background.focus,
        },
      };
    }

    // 父级选中状态样式
    if (isParentSelected) {
      return {
        ...baseStyles,
        backgroundColor: menuTheme.colors.primary.light,
        color: menuTheme.colors.primary.main,
        '&:hover': {
          backgroundColor: menuTheme.colors.background.focus,
        },
      };
    }

    // 禁用状态样式
    if (disabled) {
      return {
        ...baseStyles,
        opacity: 0.5,
        cursor: 'not-allowed',
        color: menuTheme.colors.text.disabled,
      };
    }

    // 默认样式
    return {
      ...baseStyles,
      '&:hover': {
        backgroundColor: menuTheme.colors.background.hover,
      },
    };
  }, [isSelected, isParentSelected, collapsed, disabled, level, menuTheme]);

  // ==================== 返回结果 Return Results ====================
  
  return {
    iconStyles,
    textStyles,
    containerStyles,
  };
};