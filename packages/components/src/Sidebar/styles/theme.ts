/**
 * Menu 组件统一样式主题系统（重新设计）
 * Unified style theme system for Menu component (Redesigned)
 * 
 * 基于 MUI 主题系统的动态主题配置，支持亮色/暗色模式切换
 * Dynamic theme configuration based on MUI theme system, supports light/dark mode switching
 */

import type { Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

// ==================== 动态颜色主题 Dynamic Color Theme ====================

/**
 * 基于 MUI 主题的动态菜单颜色配置
 * Dynamic menu color configuration based on MUI theme
 * 
 * 使用 MUI 主题的颜色令牌，确保与全局主题保持一致
 * Uses MUI theme color tokens to ensure consistency with global theme
 */
export const createMenuColors = (theme: Theme) => ({
  // 主色调 - 直接使用 MUI 主题的 primary
  // Primary colors - directly use MUI theme primary
  primary: {
    main: theme.palette.primary.main,
    light: theme.palette.primary.light,
    dark: theme.palette.primary.dark,
    contrastText: theme.palette.primary.contrastText,
  },
  
  // 背景色 - 基于 MUI 主题动态生成
  // Background colors - dynamically generated based on MUI theme
  background: {
    default: 'transparent',
    paper: theme.palette.background.paper,
    selected: alpha(theme.palette.primary.main, 0.08), // 8% 透明度的主色
    hover: theme.palette.action.hover,
    focus: theme.palette.action.focus,
  },
  
  // 文本色 - 使用 MUI 主题的文本颜色
  // Text colors - use MUI theme text colors
  text: {
    primary: theme.palette.text.primary,
    secondary: theme.palette.text.secondary,
    selected: theme.palette.primary.main,
    disabled: theme.palette.text.disabled,
  },
  
  // 边框色 - 基于 MUI 主题
  // Border colors - based on MUI theme
  border: {
    default: theme.palette.divider,
    focus: theme.palette.primary.main,
  },
  
  // 图标色 - 语义化颜色定义
  // Icon colors - semantic color definitions
  icon: {
    default: theme.palette.text.secondary,
    selected: theme.palette.primary.main,
    arrow: theme.palette.text.disabled,
  },
  
  // 状态色 - 基于 MUI 动作状态
  // State colors - based on MUI action states
  action: {
    active: theme.palette.action.active,
    hover: theme.palette.action.hover,
    selected: theme.palette.action.selected,
    disabled: theme.palette.action.disabled,
    disabledBackground: theme.palette.action.disabledBackground,
  },
} as const);

// ==================== 间距配置 Spacing Configuration ====================

/**
 * 菜单间距配置
 * Menu spacing configuration
 */
export const menuSpacing = {
  // 基础间距 Basic spacing
  unit: 8, // 基础单位 8px
  
  // 内边距 Padding
  padding: {
    item: '4px 8px 4px 12px',
    itemCollapsed: '4px',
    container: '8px',
    subMenu: '0 0 0 16px',
  },
  
  // 外边距 Margin
  margin: {
    item: '4px 0',
    section: '8px 0',
    icon: '0 12px 0 0',
  },
  
  // 尺寸 Sizes
  size: {
    itemHeight: 44,
    itemHeightCompact: 40,
    iconSize: 24,
    arrowSize: 18,
    borderRadius: 8,
  },
  
  // 宽度 Widths
  width: {
    default: 300,
    collapsed: 64,
    min: 240,
    max: 400,
  },
} as const;

// ==================== 动画配置 Animation Configuration ====================

/**
 * 菜单动画配置
 * Menu animation configuration
 */
export const menuAnimations = {
  // 过渡时间 Transition duration
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
  },
  
  // 缓动函数 Easing functions
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerated: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerated: 'cubic-bezier(0.4, 0.0, 1, 1)',
  },
  
  // 变换 Transforms
  transform: {
    arrowExpanded: 'rotate(0deg)',
    arrowCollapsed: 'rotate(-90deg)',
    scale: 'scale(0.7)',
  },
} as const;

// ==================== 响应式断点 Responsive Breakpoints ====================

/**
 * 菜单响应式断点配置
 * Menu responsive breakpoint configuration
 */
export const menuBreakpoints = {
  // 容器查询断点 Container query breakpoints
  container: {
    collapsed: '100px',
    compact: '200px',
    normal: '300px',
  },
  
  // 媒体查询断点 Media query breakpoints
  media: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
} as const;

// ==================== 动态层级样式 Dynamic Level Styles ====================

/**
 * 基于主题的菜单层级样式配置
 * Theme-based menu level style configuration
 */
export const createMenuLevelStyles = (theme: Theme) => {
  const colors = createMenuColors(theme);
  
  return {
    // 层级0（顶级菜单）
    level0: {
      fontWeight: 600,
      fontSize: '14px',
      padding: '4px 8px 4px 12px',
      backgroundColor: colors.background.selected,
      color: colors.text.selected,
    },
    
    // 层级1+（子菜单）
    levelN: {
      fontWeight: 400,
      fontSize: '14px',
      padding: '4px 8px 4px 24px',
      backgroundColor: 'transparent',
      color: colors.text.primary,
    },
  } as const;
};

// ==================== 动态状态样式 Dynamic State Styles ====================

/**
 * 基于主题的菜单状态样式配置
 * Theme-based menu state style configuration
 */
export const createMenuStateStyles = (theme: Theme) => {
  const colors = createMenuColors(theme);
  
  return {
    // 默认状态 Default state
    default: {
      backgroundColor: colors.background.default,
      color: colors.text.primary,
    },
    
    // 悬停状态 Hover state
    hover: {
      backgroundColor: colors.background.hover,
      transition: `background-color ${menuAnimations.duration.fast} ${menuAnimations.easing.standard}`,
    },
    
    // 选中状态 Selected state
    selected: {
      backgroundColor: colors.background.selected,
      color: colors.text.selected,
      fontWeight: 600,
    },
    
    // 父级选中状态 Parent selected state
    parentSelected: {
      backgroundColor: alpha(colors.primary.main, 0.12),
      color: colors.primary.main,
    },
    
    // 禁用状态 Disabled state
    disabled: {
      color: colors.text.disabled,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  } as const;
};

// ==================== 变体样式 Variant Styles ====================

/**
 * 菜单变体样式配置
 * Menu variant style configuration
 */
export const menuVariantStyles = {
  // 标准样式 Standard style
  standard: {
    width: menuSpacing.width.default,
    itemHeight: menuSpacing.size.itemHeight,
    showIcons: true,
    showBadges: true,
  },
  
  // 收起样式 Collapsed style
  collapsed: {
    width: menuSpacing.width.collapsed,
    itemHeight: menuSpacing.size.itemHeight,
    showIcons: true,
    showBadges: false,
  },
  
  // 紧凑样式 Compact style
  compact: {
    width: menuSpacing.width.default,
    itemHeight: menuSpacing.size.itemHeightCompact,
    showIcons: true,
    showBadges: true,
  },
} as const;

// ==================== 工具函数 Utility Functions ====================

/**
 * 基于主题获取层级样式
 * Get level styles based on theme
 */
export const getLevelStyles = (theme: Theme, level: number) => {
  const levelStyles = createMenuLevelStyles(theme);
  return level === 0 ? levelStyles.level0 : levelStyles.levelN;
};

/**
 * 基于主题获取状态样式
 * Get state styles based on theme
 */
export const getStateStyles = (theme: Theme, state: 'default' | 'hover' | 'selected' | 'parentSelected' | 'disabled') => {
  const stateStyles = createMenuStateStyles(theme);
  return stateStyles[state];
};

/**
 * 获取变体样式
 * Get variant styles
 */
export const getVariantStyles = (variant: keyof typeof menuVariantStyles) => {
  return menuVariantStyles[variant];
};

/**
 * 创建容器查询样式
 * Create container query styles
 */
export const createContainerQuery = (maxWidth: string, styles: Record<string, any>) => {
  return {
    [`@container sidebar (max-width: ${maxWidth})`]: styles,
  };
};

/**
 * 创建过渡样式
 * Create transition styles
 */
export const createTransition = (properties: string[], duration = menuAnimations.duration.normal) => {
  return {
    transition: properties
      .map(prop => `${prop} ${duration} ${menuAnimations.easing.standard}`)
      .join(', '),
  };
};

// ==================== 主题工厂函数 Theme Factory Function ====================

/**
 * 创建完整的菜单主题配置
 * Create complete menu theme configuration
 * 
 * 基于传入的 MUI 主题创建动态的菜单主题
 * Creates dynamic menu theme based on the passed MUI theme
 */
export const createMenuTheme = (theme: Theme) => ({
  colors: createMenuColors(theme),
  spacing: menuSpacing,
  animations: menuAnimations,
  breakpoints: menuBreakpoints,
  levelStyles: createMenuLevelStyles(theme),
  stateStyles: createMenuStateStyles(theme),
  variantStyles: menuVariantStyles,
  utils: {
    getLevelStyles: (level: number) => getLevelStyles(theme, level),
    getStateStyles: (state: Parameters<typeof getStateStyles>[1]) => getStateStyles(theme, state),
    getVariantStyles,
    createContainerQuery,
    createTransition,
  },
} as const);

// ==================== 默认导出 Default Export ====================

/**
 * 兼容性导出 - 使用默认主题
 * Compatibility export - using default theme
 * 
 * @deprecated 推荐使用 createMenuTheme(theme) 以获得完整的主题支持
 * @deprecated Recommend using createMenuTheme(theme) for full theme support
 */
export const menuTheme = {
  // 静态配置
  spacing: menuSpacing,
  animations: menuAnimations,
  breakpoints: menuBreakpoints,
  variantStyles: menuVariantStyles,
  // 动态配置工厂函数
  createColors: createMenuColors,
  createLevelStyles: createMenuLevelStyles,
  createStateStyles: createMenuStateStyles,
  utils: {
    getLevelStyles,
    getStateStyles,
    getVariantStyles,
    createContainerQuery,
    createTransition,
    createMenuTheme,
  },
} as const;

export default createMenuTheme;