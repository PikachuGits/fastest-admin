/**
 * Menu 组件统一样式主题系统
 * Unified style theme system for Menu component
 * 
 * 统一管理所有Menu相关的样式配置，包括颜色、间距、动画等
 * Centrally manages all Menu-related style configurations including colors, spacing, animations, etc.
 */

import type { Theme } from '@mui/material';

// ==================== 颜色主题 Color Theme ====================

/**
 * 菜单颜色配置
 * Menu color configuration
 */
export const menuColors = {
  // 主色调 Primary colors
  primary: {
    main: '#2E7D32',
    light: 'rgba(46, 125, 50, 0.08)',
    hover: 'rgba(46, 125, 50, 0.12)',
    text: '#2E7D32',
  },
  
  // 背景色 Background colors
  background: {
    default: 'transparent',
    paper: '#ffffff',
    selected: 'rgba(46, 125, 50, 0.08)',
    hover: 'rgba(0, 0, 0, 0.04)',
    glass: 'rgba(255, 255, 255, 0.1)',
  },
  
  // 文本色 Text colors
  text: {
    primary: 'inherit',
    secondary: '#666666',
    selected: '#2E7D32',
    disabled: '#999999',
  },
  
  // 边框色 Border colors
  border: {
    default: 'rgba(0, 0, 0, 0.12)',
    focus: '#2E7D32',
  },
  
  // 图标色 Icon colors
  icon: {
    default: '#666666',
    selected: '#2E7D32',
    arrow: '#999999',
  },
} as const;

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

// ==================== 层级样式 Level Styles ====================

/**
 * 菜单层级样式配置
 * Menu level style configuration
 */
export const menuLevelStyles = {
  // 层级0（顶级菜单）
  level0: {
    fontWeight: 600,
    fontSize: '14px',
    padding: '4px 8px 4px 12px',
    backgroundColor: menuColors.background.selected,
    color: menuColors.text.selected,
  },
  
  // 层级1+（子菜单）
  levelN: {
    fontWeight: 400,
    fontSize: '14px',
    padding: '4px 8px 4px 24px',
    backgroundColor: 'transparent',
    color: menuColors.text.primary,
  },
} as const;

// ==================== 状态样式 State Styles ====================

/**
 * 菜单状态样式配置
 * Menu state style configuration
 */
export const menuStateStyles = {
  // 默认状态 Default state
  default: {
    backgroundColor: menuColors.background.default,
    color: menuColors.text.primary,
  },
  
  // 悬停状态 Hover state
  hover: {
    backgroundColor: menuColors.background.hover,
    transition: `background-color ${menuAnimations.duration.fast} ${menuAnimations.easing.standard}`,
  },
  
  // 选中状态 Selected state
  selected: {
    backgroundColor: menuColors.background.selected,
    color: menuColors.text.selected,
    fontWeight: 600,
  },
  
  // 父级选中状态 Parent selected state
  parentSelected: {
    backgroundColor: menuColors.primary.light,
    color: menuColors.primary.text,
  },
  
  // 禁用状态 Disabled state
  disabled: {
    color: menuColors.text.disabled,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
} as const;

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
 * 获取层级样式
 * Get level styles
 */
export const getLevelStyles = (level: number) => {
  return level === 0 ? menuLevelStyles.level0 : menuLevelStyles.levelN;
};

/**
 * 获取状态样式
 * Get state styles
 */
export const getStateStyles = (state: keyof typeof menuStateStyles) => {
  return menuStateStyles[state];
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

// ==================== 默认导出 Default Export ====================

/**
 * 完整的菜单主题配置
 * Complete menu theme configuration
 */
export const menuTheme = {
  colors: menuColors,
  spacing: menuSpacing,
  animations: menuAnimations,
  breakpoints: menuBreakpoints,
  levelStyles: menuLevelStyles,
  stateStyles: menuStateStyles,
  variantStyles: menuVariantStyles,
  utils: {
    getLevelStyles,
    getStateStyles,
    getVariantStyles,
    createContainerQuery,
    createTransition,
  },
} as const;

export default menuTheme;