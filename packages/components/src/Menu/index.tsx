// 组件导出
export { default as MenuList } from "./components/MenuList";
export { MenuListRefactored } from "./components/MenuList/MenuListRefactored";
export { MenuItem } from "./components/MenuItem";
export { NumberChip } from "./components/NumberChip";
export { GroupHeader } from "./components/GroupHeader";

// 示例组件
export { MenuExamples } from "./examples/MenuExamples";

// Hooks 导出
export { useMenuState } from "./hooks/useMenuState";

// 工具函数导出
export {
  parseInfoBadge,
  getBadgeColor,
  parseIcon,
  hasPermission,
  generateItemPath,
  findMenuItem,
} from "./utils/menuHelpers";

// 配置导出
export {
  getMenuConfig,
  getMenuStyle,
  defaultMenuConfig,
  collapsedMenuConfig,
  doubleColumnConfig,
  adminMenuConfig,
  guestMenuConfig,
  standardStyle,
  collapsedStyle,
  doubleColumnStyle,
  gridStyle,
} from "./config/menuVariants";

// 类型导出
export type { MenuItemProps } from "./components/MenuItem";
export type { NumberChipProps, NumberChipColor } from "./components/NumberChip";
export type { GroupHeaderProps } from "./components/GroupHeader";
export type {
  NavItem,
  NavSection,
  NavData,
  IconMapKey,
  IconMap,
  MenuItemState,
  MenuConfig,
  MenuStyleVariant,
  MenuVariant,
  MenuStyleVariantType,
  MenuListProps,
} from "./types/index";
