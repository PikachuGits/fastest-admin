// 主题相关 Hook
export { useViewTransitionToggle } from './useTheme/useViewTransitionToggle';

// 布局相关 Hook
export {
  useLayoutConfig,
  useAppLayout,
  DEFAULT_LAYOUT_CONFIG,
  // 别名导出
  useLayout,
  useApplicationLayout,
} from './layout';

// 布局相关类型
export type {
  LayoutConfig,
  LayoutConfigUpdater,
  LayoutConfigSetter,
  UseLayoutConfigReturn,
  UseAppLayoutReturn,
} from './layout';