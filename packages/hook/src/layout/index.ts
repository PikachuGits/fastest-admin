// packages/hook/src/layout/index.ts

// 类型导出
export type {
  LayoutConfig,
  LayoutConfigUpdater,
  LayoutConfigSetter,
  UseLayoutConfigReturn,
  UseAppLayoutReturn,
} from './types';

// Hook 导出
export { useLayoutConfig, DEFAULT_LAYOUT_CONFIG } from './useLayoutConfig';
export { useAppLayout } from './useAppLayout';

// 便捷的重新导出，保持向后兼容
export {
  useLayoutConfig as useLayout,
} from './useLayoutConfig';

export {
  useAppLayout as useApplicationLayout,
} from './useAppLayout';