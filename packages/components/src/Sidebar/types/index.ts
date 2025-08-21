import type { ReactNode, CSSProperties } from 'react';
import type { SxProps, Theme } from '@mui/material';

// ==================== 数据结构定义 (Data Structures) ====================

/**
 * @description 描述单个菜单项的数据结构，这是供外部传入的基础类型。
 */
export interface MenuItem {
  /**
   * @description 菜单项显示的标题文本。
   */
  title: string;

  /**
   * @description 导航路径，用于路由跳转。
   */
  path: string;

  /**
   * @description 显示在文本前的图标（图标名称字符串）。
   */
  icon?: string;

  /**
   * @description 信息标识，用于显示徽章或通知，格式为 [key, displayValue]。
   */
  info?: [string, string];

  /**
   * @description 角色定义，用于权限控制。
   */
  roles?: string[];

  /**
   * @description 菜单项的说明文字或备注。
   */
  caption?: string;

  /**
   * @description 菜单项的子菜单列表。
   */
  children?: MenuItem[];
}

/**
 * @description 导航分组，包含分组标题和菜单项列表。
 */
export interface NavSection {
  /**
   * @description 分组的子标题。
   */
  subheader: string;

  /**
   * @description 该分组下的菜单项列表。
   */
  items: MenuItem[];
}

/**
 * @description 完整的导航数据结构。可以是包装格式或直接数组格式。
 */
/**
 * @description 统一的导航数据类型：仅支持分组数组格式
 * 例如：[{ subheader: 'xxx', items: [...] }, ...]
 */
export type SidebarData = NavSection[];

/**
 * @description 内部使用的菜单项类型，扩展了基础菜单项。
 */
export interface InternalMenuItem extends MenuItem {
  /**
   * @description 菜单项的唯一标识符（内部生成）。
   */
  key: string;

  /**
   * @description 菜单项显示的文本内容（React 节点）。
   */
  label: ReactNode;

  /**
   * @description 是否禁用该菜单项。
   */
  disabled?: boolean;

  /**
   * @description 徽标，可用于显示通知数量等。
   */
  badge?: string | number;

  /**
   * @description 子菜单项（内部结构）。
   */
  children?: InternalMenuItem[];
}

// ==================== 状态管理 (Zustand Store) ====================

/**
 * @description 定义了菜单组件 Zustand store 的完整状态和可执行的 actions。
 */
export interface MenuStoreState {
  // --- State --- //

  /**
   * @description 菜单的变体（外观样式）。
   * - `sidebar`: 标准侧边栏
   * - `topbar`: 顶部水平导航栏
   */
  variant: 'sidebar' | 'topbar';

  /**
   * @description 菜单的主题。
   */
  theme: 'light' | 'dark';

  /**
   * @description 菜单的尺寸。
   */
  size: 'small' | 'medium' | 'large';

  /**
   * @description 是否允许整个菜单折叠（仅在 `sidebar` 变体下有效）。
   */
  collapsible: boolean;

  /**
   * @description 是否开启手风琴模式（一次只展开一个子菜单）。
   */
  accordion: boolean;

  /**
   * @description 当前选中的菜单项的 key。
   */
  selectedItem?: string;

  /**
   * @description 当前展开的菜单项的 key 数组。
   */
  expandedItems: string[];

  /**
   * @description 菜单项的数据源（仅支持 NavSection[]）。
   */
  data?: SidebarData;

  /**
   * @description 存储由外部传入的事件回调函数。
   */
  callbacks: {
    onSelect?: (key: string, item: InternalMenuItem) => void;
    onClick?: (item: InternalMenuItem) => void;
    onToggle?: (key: string, expanded: boolean) => void;
  };

  // --- Actions --- //

  /**
   * @description 设置菜单的变体。
   */
  setVariant: (v: MenuStoreState['variant']) => void;

  /**
   * @description 设置菜单的主题。
   */
  setTheme: (t: MenuStoreState['theme']) => void;

  /**
   * @description 设置菜单的尺寸。
   */
  setSize: (s: MenuStoreState['size']) => void;

  /**
   * @description 设置是否可折叠。
   */
  setCollapsible: (c: boolean) => void;

  /**
   * @description 设置是否开启手风琴模式。
   */
  setAccordion: (a: boolean) => void;

  /**
   * @description 设置菜单的数据源。
   */
  setData: (d?: SidebarData) => void;

  /**
   * @description 注册回调函数。
   */
  setCallbacks: (cb: Partial<MenuStoreState['callbacks']>) => void;

  /**
   * @description 选中一个菜单项。
   */
  selectItem: (key: string) => void;

  /**
   * @description 设置当前展开的菜单项。
   */
  setExpandedItems: (keys: string[]) => void;

  /**
   * @description 切换一个菜单项的展开/折叠状态。
   */
  toggleItem: (key: string) => void;
}

// ==================== 组件属性 (Component Props) ====================

/**
 * @description `Menu` 组件的公开 props，用于配置菜单的行为和外观。
 */
export interface MenuProps {
  /**
   * @description 菜单项的数据源（仅支持 NavSection[]）。
   */
  items?: SidebarData;

  /**
   * @description 菜单的变体，默认为 `'sidebar'`。
   */
  variant?: MenuStoreState['variant'];

  /**
   * @description 菜单的主题，默认为 `'light'`。
   */
  theme?: MenuStoreState['theme'];

  /**
   * @description 菜单的尺寸，默认为 `'medium'`。
   */
  size?: MenuStoreState['size'];

  /**
   * @description 是否可折叠，默认为 `false`。
   */
  collapsible?: boolean;

  /**
   * @description 是否开启手风琴模式，默认为 `false`。
   */
  accordion?: boolean;

  // --- 非受控模式 (Uncontrolled Mode) --- //
  /**
   * @description 默认选中的菜单项的 key（非受控）。
   */
  defaultSelected?: string;

  /**
   * @description 默认展开的菜单项的 key 数组（非受控）。
   */
  defaultExpanded?: string[];

  // --- 受控模式 (Controlled Mode) --- //
  /**
   * @description 当前选中的菜单项的 key（受控）。如果设置此项，组件的选中状态将由外部控制。
   */
  selectedItem?: string;

  /**
   * @description 当前展开的菜单项的 key 数组（受控）。如果设置此项，组件的展开状态将由外部控制。
   */
  expandedItems?: string[];

  // --- 事件回调 (Event Callbacks) --- //
  /**
   * @description 任何菜单项被点击时触发的回调。
   */
  onItemClick?: (item: InternalMenuItem) => void;

  /**
   * @description 菜单项被选中时触发的回调。
   */
  onItemSelect?: (key: string, item: InternalMenuItem) => void;

  /**
   * @description 菜单项展开/折叠状态切换时触发的回调。
   */
  onItemToggle?: (key: string, expanded: boolean) => void;

  // --- 样式 --- //
  /**
   * @description 自定义 CSS 类名。
   */
  className?: string;

  /**
   * @description 自定义内联样式。
   */
  style?: CSSProperties;
}

/**
 * @description 内部 `MenuInternalComponent` 组件的 props，比 `MenuProps` 额外增加了 `menuId`。
 */
export interface MenuInternalProps extends MenuProps {
  /**
   * @description 菜单实例的唯一ID，用于在 store 注册表中定位正确的 store 实例。
   */
  menuId: string;
}


export interface GroupHeaderProps {
  title: string;
  onClick?: () => void;
  open: boolean;
  icon?: string;
  sx?: SxProps<Theme>;
}