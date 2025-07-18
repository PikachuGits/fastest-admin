// 菜单数据类型定义

export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  info?: [string, string]; // [infoKey, badge]
  roles?: string[];
  caption?: string;
  children?: NavItem[];
}

export interface NavSection {
  subheader?: string;
  items: NavItem[];
}

export interface NavData {
  navItems: NavSection[];
}

// 图标映射类型
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

export type IconMap = Record<IconMapKey, string>;

// 菜单项状态类型
export interface MenuItemState {
  isSelected: boolean;
  isOpen: boolean;
  level: number;
  hasChildren: boolean;
}

// 菜单配置类型
export interface MenuConfig {
  defaultOpenItems?: string[];
  defaultSelectedItem?: string;
  enableRoleBasedAccess?: boolean;
  userRoles?: string[];
} 