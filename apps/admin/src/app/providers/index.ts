// src/app/providers/index.ts
/**
 * 主题和布局提供者统一导出
 * Theme and layout providers unified exports
 */

// 主要组件和 Hook
export { AppThemeProvider, useAppTheme } from './ThemeProvider';
export { useAppLayout } from '@fastest/hook';

// 类型定义
export type {
  ThemeContextProps,
  AppThemeProviderProps,
} from './types';

// 从 @fastest/hook 导出布局相关类型
export type { LayoutConfig } from '@fastest/hook';

// 主题定义
export { lightTheme, darkTheme } from './theme';

/**
 * 使用指南：
 * 
 * 1. 基础使用：
 * ```tsx
 * import { AppThemeProvider } from '@/app/providers';
 * 
 * function App() {
 *   return (
 *     <AppThemeProvider>
 *       <YourApp />
 *     </AppThemeProvider>
 *   );
 * }
 * ```
 * 
 * 2. 自定义初始布局：
 * ```tsx
 * import { AppThemeProvider } from '@/app/providers';
 * 
 * function App() {
 *   const initialLayout = {
 *     headerHeight: 80,
 *     sidebarWidth: 320,
 *     sidebarCollapsed: false,
 *   };
 * 
 *   return (
 *     <AppThemeProvider initialLayoutConfig={initialLayout}>
 *       <YourApp />
 *     </AppThemeProvider>
 *   );
 * }
 * ```
 * 
 * 3. 在组件中使用：
 * ```tsx
 * import { useAppTheme, useAppLayout } from '@/app/providers';
 * 
 * function MyComponent() {
 *   // 主题相关
 *   const { isDarkMode, toggleTheme } = useAppTheme();
 *   
 *   // 布局相关
 *   const { 
 *     headerHeight, 
 *     setHeaderHeight, 
 *     toggleSidebar 
 *   } = useAppLayout();
 *   
 *   return <div>...</div>;
 * }
 * ```
 */