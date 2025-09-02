/**
 * NewMenu 组件类型定义文件
 * NewMenu component type definitions
 */

// ==================== 基础数据类型 Basic Data Types ====================

/**
 * 菜单项接口
 * Menu item interface
 */
export interface MenuItem {
  /** 菜单项唯一标识符 Menu item unique identifier */
  id: number;
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
  children?: MenuItem[];
}

/**
 * 菜单分组接口
 * Menu section interface
 */
export interface MenuSection {
  /** 菜单项唯一标识符 Menu item unique identifier */
  id: number;
  /** 分组标题（可选）Section title (optional) */
  subheader: string;
  /** 分组图标（可选）Section icon (optional) */
  icon?: string;
  /** 分组内的菜单项列表 Menu items list within the section */
  items: MenuItem[];
}

/**
 * 菜单数据根接口
 * Menu data root interface
 */
export interface MenuData {
  /** 菜单分组列表 Menu sections list */
  sections: MenuSection[];
}

// ==================== Store 状态类型 Store State Types ====================

/**
 * 侧边栏展开状态类型
 * Sidebar collapsed state type
 */
export type SidebarCollapsedState = "expanded" | "collapsed";

/**
 * 设备类型
 * Device type
 */
export type DeviceType = "desktop" | "mobile";

/**
 * 展开状态映射类型
 * Expanded states mapping type
 */
export type ExpandedStatesMap = Record<string, boolean>;

/**
 * 选中状态映射类型
 * Selected states mapping type
 */
export type SelectedStatesMap = Record<string, boolean>;

/**
 * 菜单项路径数组类型
 * Menu item path array type
 */
export type MenuPath = string[];

// ==================== Store 接口定义 Store Interface Definitions ====================

/**
 * 菜单Store状态接口
 * Menu Store state interface
 */
export interface MenuStoreState {
  /** 侧边栏是否折叠 Whether sidebar is collapsed */
  collapsed: boolean;
  /** 是否为移动设备模式 Whether in mobile mode */
  isMobile: boolean;
  /** 各菜单项的展开状态映射 Expanded states mapping for menu items */
  expandedStates: ExpandedStatesMap;
  /** 各菜单项的选中状态映射 Selected states mapping for menu items */
  selectedStates: SelectedStatesMap;
  /** 当前选中的菜单项路径 Currently selected menu item path */
  activeItemPath: string | null;
  /** 菜单数据 Menu data */
  menuData: MenuSection[];
}

/**
 * 菜单Store动作接口
 * Menu Store actions interface
 */
export interface MenuStoreActions {
  // 侧边栏控制 Sidebar controls
  /** 切换侧边栏展开/收起状态 Toggle sidebar expanded/collapsed state */
  toggleCollapsed: () => void;
  /** 设置侧边栏展开/收起状态 Set sidebar expanded/collapsed state */
  setCollapsed: (collapsed: boolean) => void;

  // 设备模式控制 Device mode controls
  /** 设置移动设备模式 Set mobile device mode */
  setMobileMode: (isMobile: boolean) => void;

  // 展开状态控制 Expanded state controls
  /** 切换菜单项展开状态 Toggle menu item expanded state */
  toggleExpanded: (itemPath: string) => void;
  /** 设置菜单项展开状态 Set menu item expanded state */
  setExpanded: (itemPath: string, expanded: boolean) => void;
  /** 展开到指定路径的所有父级菜单 Expand all parent menus to specified path */
  expandToPath: (targetPath: string) => void;
  /** 获取菜单项是否展开 Get whether menu item is expanded */
  isExpanded: (itemPath: string) => boolean;

  // 选中状态控制 Selected state controls
  /** 设置选中的菜单项 Set selected menu item */
  setSelected: (itemPath: string) => void;
  /** 清除所有选中状态 Clear all selected states */
  clearSelected: () => void;
  /** 获取菜单项是否选中 Get whether menu item is selected */
  isSelected: (itemPath: string) => boolean;
  /** 获取菜单项是否处于选中路径中（父级选中） Get whether menu item is in selected path (parent selected) */
  isInSelectedPath: (itemPath: string) => boolean;

  // 数据控制 Data controls
  /** 设置菜单数据 Set menu data */
  setMenuData: (data: MenuSection[]) => void;

  // 辅助方法 Helper methods
  /** 获取菜单项的所有父级路径 Get all parent paths of menu item */
  getParentPaths: (itemPath: string) => string[];
  /** 获取菜单项的所有子级路径 Get all child paths of menu item */
  getChildPaths: (itemPath: string) => string[];
  /** 重置所有状态到初始值 Reset all states to initial values */
  reset: () => void;
}

/**
 * 完整的菜单Store类型
 * Complete menu store type
 */
export type MenuStore = MenuStoreState & MenuStoreActions;

// ==================== 组件属性类型 Component Props Types ====================

/**
 * Menu组件属性接口
 * Menu component props interface
 */
export interface MenuProps {
  /** 初始菜单数据（可选）Initial menu data (optional) */
  data?: MenuSection[];
  /** 初始折叠状态（可选）Initial collapsed state (optional) */
  initialCollapsed?: boolean;
  /** 初始选中项路径（可选）Initial selected item path (optional) */
  initialSelectedPath?: string;
  /** 菜单项点击回调 Menu item click callback */
  onItemClick?: (path: string, item: MenuItem) => void;
  /** 菜单项展开回调 Menu item expand callback */
  onItemExpand?: (path: string, expanded: boolean) => void;
  /** 侧边栏折叠状态变化回调 Sidebar collapsed state change callback */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 自定义CSS类名 Custom CSS class name */
  className?: string;
  /** 自定义样式 Custom styles */
  style?: React.CSSProperties;
}

/**
 * MenuItem组件属性接口
 * MenuItem component props interface
 */
export interface MenuItemProps {
  /** 菜单项数据 Menu item data */
  item: MenuItem;
  /** 菜单项路径 Menu item path */
  path: string;
  /** 菜单层级 Menu level */
  level: number;
  /** 是否展开 Whether expanded */
  expanded: boolean;
  /** 是否选中 Whether selected */
  selected: boolean;
  /** 是否在选中路径中 Whether in selected path */
  inSelectedPath: boolean;
  /** 点击回调 Click callback */
  onClick: (path: string, item: MenuItem) => void;
  /** 展开切换回调 Expand toggle callback */
  onToggleExpand: (path: string) => void;
}

/**
 * SubHeader组件属性接口
 * SubHeader component props interface
 */
export interface SubHeaderProps {
  /** 标题文本 Title text */
  title: string;
  /** 是否展开 Whether expanded */
  open?: boolean;
  /** 点击回调 Click callback */
  onToggle: () => void;
  /** 图标名称 Icon name */
  iconName?: string;
  /** tab索引 Tab index */
  tabIndex?: number;
  /** 自定义CSS类名 Custom CSS class name */
  className?: string;
  /** 是否显示箭头图标 Whether to show arrow icon */
  showArrow?: boolean;
  /** 是否禁用 Whether disabled */
  disabled?: boolean;
  /** 是否选中（当分组下有选中项时显示选中状态）Whether selected (show selected state when section has selected items) */
  selected?: boolean;
}

// ==================== 工具类型 Utility Types ====================

/**
 * 选择器函数类型
 * Selector function type
 */
export type MenuStoreSelector<T> = (state: MenuStore) => T;

/**
 * 路径解析结果类型
 * Path parsing result type
 */
export interface ParsedPath {
  /** 完整路径 Full path */
  fullPath: string;
  /** 路径段数组 Path segments array */
  segments: string[];
  /** 路径深度 Path depth */
  depth: number;
  /** 父级路径 Parent path */
  parentPath: string | null;
}
