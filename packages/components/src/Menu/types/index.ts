/**
 * Menu 组件类型定义文件
 * Menu component type definitions
 * 
 * 统一管理所有 Menu 相关的 TypeScript 类型定义
 * Centralized management of all Menu-related TypeScript type definitions
 */

// ==================== 基础数据类型 Basic Data Types ====================

/**
 * 导航菜单项接口
 * Navigation menu item interface
 * 
 * 定义单个菜单项的数据结构
 * Defines the data structure for a single menu item
 */
export interface NavItem {
  /** 菜单项显示标题 Menu item display title */
  title: string;
  /** 菜单项路径或链接 Menu item path or link */
  path: string;
  /** 图标标识符（可选）Icon identifier (optional) */
  icon?: string;
  /** 信息徽章 [信息键, 徽章值] Information badge [info key, badge value] */
  info?: [string, string] | string[];
  /** 访问权限角色列表（可选）Access permission roles list (optional) */
  roles?: string[];
  /** 菜单项描述文字（可选）Menu item description text (optional) */
  caption?: string;
  /** 是否禁用（可选）Whether disabled (optional) */
  disabled?: boolean;
  /** 子菜单项列表（可选）Sub-menu items list (optional) */
  children?: NavItem[];
}

/**
 * 导航菜单分组接口
 * Navigation menu section interface
 * 
 * 定义菜单分组的数据结构
 * Defines the data structure for menu sections
 */
export interface NavSection {
  /** 分组标题（可选）Section title (optional) */
  subheader?: string;
  /** 分组内的菜单项列表 Menu items list within the section */
  items: NavItem[];
}

/**
 * 导航数据根接口
 * Navigation data root interface
 * 
 * 定义整个导航菜单的数据结构
 * Defines the data structure for the entire navigation menu
 */
export interface NavData {
  /** 导航菜单分组列表 Navigation menu sections list */
  navItems: NavSection[];
}

// ==================== 图标相关类型 Icon Related Types ====================

/**
 * 图标映射键类型
 * Icon mapping key type
 * 
 * 定义支持的图标键名
 * Defines supported icon key names
 */
export type IconMapKey = 
  | 'icon.landing'
  | 'icon.services'
  | 'icon.blog'
  | 'icon.about'
  | 'icon.tour'
  | 'icon.menu'
  | 'icon.level2a'
  | 'icon.level2b'
  | 'icon.level2c';

/**
 * 图标映射类型
 * Icon mapping type
 * 
 * 图标键名到实际图标名称的映射
 * Mapping from icon keys to actual icon names
 */
export type IconMap = Record<IconMapKey, string>;

// ==================== 状态管理类型 State Management Types ====================

/**
 * 菜单项状态接口
 * Menu item state interface
 * 
 * 定义单个菜单项的运行时状态
 * Defines the runtime state of a single menu item
 */
export interface MenuItemState {
  /** 是否被选中 Whether selected */
  isSelected: boolean;
  /** 是否展开 Whether expanded */
  isOpen: boolean;
  /** 菜单层级 Menu level */
  level: number;
  /** 是否有子菜单 Whether has children */
  hasChildren: boolean;
}

/**
 * 菜单展开状态记录类型
 * Menu open states record type
 * 
 * 记录所有菜单项的展开状态
 * Records the open state of all menu items
 */
export type OpenStatesRecord = Record<string, boolean>;

// ==================== 配置类型 Configuration Types ====================

/**
 * 菜单配置接口
 * Menu configuration interface
 * 
 * 定义菜单的行为配置选项
 * Defines behavioral configuration options for the menu
 */
export interface MenuConfig {
  /** 默认展开的菜单项路径列表 Default open menu item paths list */
  defaultOpenItems?: string[];
  /** 默认选中的菜单项路径 Default selected menu item path */
  defaultSelectedItem?: string;
  /** 是否启用基于角色的访问控制 Whether to enable role-based access control */
  enableRoleBasedAccess?: boolean;
  /** 用户角色列表 User roles list */
  userRoles?: string[];
}

/**
 * 菜单样式变体接口
 * Menu style variant interface
 * 
 * 定义菜单的视觉样式配置
 * Defines visual style configuration for the menu
 */
export interface MenuStyleVariant {
  /** 菜单宽度 Menu width */
  width: number | string;
  /** 最大宽度（可选）Maximum width (optional) */
  maxWidth?: number | string;
  /** 最小宽度（可选）Minimum width (optional) */
  minWidth?: number | string;
  /** 布局类型 Layout type */
  layout: 'single' | 'double' | 'grid';
  /** 菜单项高度 Menu item height */
  itemHeight: number;
  /** 间距 Spacing */
  spacing: number;
  /** 是否显示图标 Whether to show icons */
  showIcons: boolean;
  /** 是否显示徽章 Whether to show badges */
  showBadges: boolean;
  /** 是否可折叠 Whether collapsible */
  collapsible: boolean;
}

// ==================== 变体类型 Variant Types ====================

/**
 * 菜单变体类型
 * Menu variant type
 * 
 * 定义预设的菜单配置变体
 * Defines preset menu configuration variants
 */
export type MenuVariant = 'default' | 'collapsed' | 'double';

/**
 * 菜单样式变体类型
 * Menu style variant type
 * 
 * 定义预设的菜单样式变体
 * Defines preset menu style variants
 */
export type MenuStyleVariantType = 'standard' | 'collapsed' | 'double' | 'grid';

// ==================== 组件属性类型 Component Props Types ====================

/**
 * MenuList 组件属性接口
 * MenuList component props interface
 * 
 * 定义 MenuList 组件的所有可配置属性
 * Defines all configurable properties for the MenuList component
 */
export interface MenuListProps {
  /** 菜单数据（可选，默认使用内置数据）Menu data (optional, uses built-in data by default) */
  data?: NavData;
  /** 菜单配置（可选）Menu configuration (optional) */
  config?: MenuConfig;
  /** 菜单变体（可选）Menu variant (optional) */
  variant?: MenuVariant;
  /** 样式变体（可选）Style variant (optional) */
  styleVariant?: MenuStyleVariantType;
  /** 菜单项点击回调函数 Menu item click callback */
  onItemClick?: (path: string, item: NavItem) => void;
  /** 菜单项展开/折叠回调函数 Menu item toggle callback */
  onItemToggle?: (path: string, isOpen: boolean) => void;
  /** 自定义 CSS 类名 Custom CSS class name */
  className?: string;
  /** 自定义样式 Custom styles */
  style?: React.CSSProperties;
}

// ==================== 徽章相关类型 Badge Related Types ====================

/**
 * 数字徽章颜色类型
 * Number badge color type
 * 
 * 定义数字徽章支持的颜色选项
 * Defines color options supported by number badges
 */
export type NumberChipColor = "default" | "primary" | "success";