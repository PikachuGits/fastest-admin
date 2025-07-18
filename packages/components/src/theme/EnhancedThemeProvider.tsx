/**
 * 增强主题提供者模块
 * Enhanced Theme Provider Module
 * 
 * 这个模块提供了一个功能丰富的主题管理系统，包括：
 * - 🎨 明暗主题模式切换
 * - 📐 动态布局配置管理
 * - 💾 本地存储持久化
 * - 🎛️ 主题自定义覆盖
 * - 🔄 CSS 基线重置
 * - 🎯 完整的 TypeScript 支持
 * 
 * @module EnhancedThemeProvider
 * @version 1.0.0
 * @author Trae AI
 */

import React, { createContext, useContext, type ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useThemeMode, type UseThemeModeReturn, type UseThemeModeOptions } from './hooks/useThemeMode';

import type {} from './extend-theme-types';

// ----------------------------------------------------------------------

/**
 * 增强主题上下文类型
 * Enhanced theme context type
 * 
 * 扩展了基础的主题模式返回类型，添加了初始化状态标识。
 * 这个接口定义了通过 useEnhancedTheme Hook 可以访问的所有功能。
 * 
 * @interface EnhancedThemeContextValue
 * @extends UseThemeModeReturn
 */
export interface EnhancedThemeContextValue extends UseThemeModeReturn {
  /** 
   * 主题系统是否已初始化
   * 
   * 用于判断主题系统是否已经完成初始化，包括：
   * - 本地存储数据的读取
   * - 初始主题模式的设置
   * - 布局配置的应用
   * 
   * @default true
   */
  isInitialized: boolean;
}

/**
 * 增强主题提供者属性
 * Enhanced theme provider props
 * 
 * 定义了 EnhancedThemeProvider 组件的所有可配置属性。
 * 继承了 UseThemeModeOptions 的所有选项，并添加了额外的 UI 控制选项。
 * 
 * @interface EnhancedThemeProviderProps
 * @extends UseThemeModeOptions
 */
export interface EnhancedThemeProviderProps extends UseThemeModeOptions {
  /** 
   * 子组件
   * 
   * 需要被主题系统包裹的 React 组件树。
   * 所有子组件都可以通过 useEnhancedTheme Hook 访问主题功能。
   */
  children: ReactNode;
  
  /** 
   * 是否启用 CSS 基线重置
   * 
   * 启用后会应用 MUI 的 CssBaseline 组件，提供：
   * - 跨浏览器的样式一致性
   * - 合理的默认样式重置
   * - 响应式字体大小
   * 
   * @default true
   */
  enableCssBaseline?: boolean;
  
  /** 
   * 是否禁用过渡动画
   * 
   * 禁用后，主题切换时不会有过渡动画效果。
   * 适用于性能敏感的场景或用户偏好设置。
   * 
   * @default false
   */
  disableTransitionOnChange?: boolean;
}

// ----------------------------------------------------------------------

/**
 * 增强主题上下文
 * Enhanced theme context
 */
const EnhancedThemeContext = createContext<EnhancedThemeContextValue | undefined>(undefined);

/**
 * 使用增强主题 Hook
 * 
 * 提供完整的主题管理功能，包括模式切换、布局配置等
 * 
 * @returns 增强主题上下文值
 * @throws 如果在 EnhancedThemeProvider 外部使用会抛出错误
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isDarkMode, toggleTheme, layoutConfig } = useEnhancedTheme();
 *   
 *   return (
 *     <div style={{ height: layoutConfig.headerHeight }}>
 *       <button onClick={toggleTheme}>
 *         {isDarkMode ? '切换到亮色' : '切换到暗色'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useEnhancedTheme(): EnhancedThemeContextValue {
  const context = useContext(EnhancedThemeContext);
  
  if (!context) {
    throw new Error(
      'useEnhancedTheme must be used within an EnhancedThemeProvider. ' +
      'Please wrap your component tree with <EnhancedThemeProvider>.'
    );
  }
  
  return context;
}

/**
 * 增强主题提供者组件
 * 
 * 提供完整的主题管理功能，包括：
 * - 明暗主题切换
 * - 布局配置管理
 * - 本地存储持久化
 * - CSS 基线重置
 * - 主题覆盖支持
 * 
 * @param props - 组件属性
 * @returns JSX 元素
 * 
 * @example
 * ```tsx
 * // 基础使用
 * function App() {
 *   return (
 *     <EnhancedThemeProvider>
 *       <YourApp />
 *     </EnhancedThemeProvider>
 *   );
 * }
 * 
 * // 自定义配置
 * function App() {
 *   return (
 *     <EnhancedThemeProvider
 *       initialMode="dark"
 *       initialLayoutConfig={{ headerHeight: 80 }}
 *       themeOverrides={{
 *         shape: { borderRadius: 12 },
 *         palette: {
 *           primary: { main: '#custom-color' }
 *         }
 *       }}
 *       enablePersistence={true}
 *     >
 *       <YourApp />
 *     </EnhancedThemeProvider>
 *   );
 * }
 * ```
 */
export function EnhancedThemeProvider({
  children,
  enableCssBaseline = true,
  disableTransitionOnChange = false,
  ...themeOptions
}: EnhancedThemeProviderProps) {
  // 使用主题模式管理 Hook
  const themeControls = useThemeMode(themeOptions);
  
  // 创建上下文值
  const contextValue: EnhancedThemeContextValue = {
    ...themeControls,
    isInitialized: true,
  };
  
  return (
    <EnhancedThemeContext.Provider value={contextValue}>
      <MuiThemeProvider 
        theme={themeControls.theme} 
        disableTransitionOnChange={disableTransitionOnChange}
      >
        {enableCssBaseline && <CssBaseline />}
        {children}
      </MuiThemeProvider>
    </EnhancedThemeContext.Provider>
  );
}

// ----------------------------------------------------------------------

/**
 * 主题模式切换器组件
 * Theme mode toggle component
 */
export interface ThemeToggleProps {
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 亮色模式图标 */
  lightIcon?: React.ReactNode;
  /** 暗色模式图标 */
  darkIcon?: React.ReactNode;
  /** 按钮大小 */
  size?: 'small' | 'medium' | 'large';
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 主题模式切换器
 * 
 * 提供一个简单的按钮来切换明暗主题
 * 
 * @param props - 组件属性
 * @returns JSX 元素
 * 
 * @example
 * ```tsx
 * import { ThemeToggle } from '@fastest/components';
 * 
 * function Header() {
 *   return (
 *     <div>
 *       <h1>My App</h1>
 *       <ThemeToggle />
 *     </div>
 *   );
 * }
 * ```
 */
export function ThemeToggle({
  className,
  style,
  lightIcon = '🌞',
  darkIcon = '🌙',
  size = 'medium',
  disabled = false,
  onClick,
}: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useEnhancedTheme();
  
  const handleClick = () => {
    toggleTheme();
    onClick?.();
  };
  
  const buttonStyle: React.CSSProperties = {
    border: 'none',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px',
    padding: size === 'small' ? '4px' : size === 'large' ? '12px' : '8px',
    borderRadius: '4px',
    opacity: disabled ? 0.5 : 1,
    transition: 'opacity 0.2s ease',
    ...style,
  };
  
  return (
    <button
      className={className}
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled}
      title={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? lightIcon : darkIcon}
    </button>
  );
}

// ----------------------------------------------------------------------

/**
 * 布局配置面板属性
 * Layout config panel props
 */
export interface LayoutConfigPanelProps {
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示重置按钮 */
  showResetButton?: boolean;
  /** 是否显示预设选择器 */
  showPresets?: boolean;
}

/**
 * 布局配置面板
 * 
 * 提供一个简单的面板来调整布局配置
 * 
 * @param props - 组件属性
 * @returns JSX 元素
 * 
 * @example
 * ```tsx
 * import { LayoutConfigPanel } from '@fastest/components';
 * 
 * function SettingsPage() {
 *   return (
 *     <div>
 *       <h2>布局设置</h2>
 *       <LayoutConfigPanel showPresets />
 *     </div>
 *   );
 * }
 * ```
 */
export function LayoutConfigPanel({
  className,
  style,
  showResetButton = true,
  showPresets = false,
}: LayoutConfigPanelProps) {
  const { layoutConfig, updateLayoutConfig, resetLayoutConfig } = useEnhancedTheme();
  
  const panelStyle: React.CSSProperties = {
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    ...style,
  };
  
  const inputStyle: React.CSSProperties = {
    width: '80px',
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };
  
  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '14px',
  };
  
  return (
    <div className={className} style={panelStyle}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>布局配置</h4>
      
      <div style={labelStyle}>
        <span>头部高度:</span>
        <input
          type="number"
          value={layoutConfig.headerHeight}
          onChange={(e) => updateLayoutConfig({ headerHeight: Number(e.target.value) })}
          style={inputStyle}
          min="40"
          max="120"
        />
        <span>px</span>
      </div>
      
      <div style={labelStyle}>
        <span>侧边栏宽度:</span>
        <input
          type="number"
          value={layoutConfig.sidebarWidth}
          onChange={(e) => updateLayoutConfig({ sidebarWidth: Number(e.target.value) })}
          style={inputStyle}
          min="200"
          max="400"
        />
        <span>px</span>
      </div>
      
      <div style={labelStyle}>
        <span>内容边距:</span>
        <input
          type="number"
          value={layoutConfig.contentPadding}
          onChange={(e) => updateLayoutConfig({ contentPadding: Number(e.target.value) })}
          style={inputStyle}
          min="8"
          max="48"
        />
        <span>px</span>
      </div>
      
      {showPresets && (
        <div style={labelStyle}>
          <span>预设:</span>
          <select
            onChange={(e) => {
              const presetValue = e.target.value;
              if (presetValue && presetValue !== 'custom') {
                const preset = presetValue as keyof typeof import('./hooks/useThemeMode').layoutPresets;
                import('./hooks/useThemeMode').then(({ layoutPresets, applyLayoutPreset }) => {
                  applyLayoutPreset(updateLayoutConfig, preset);
                });
              }
            }}
            style={{ ...inputStyle, width: 'auto' }}
          >
            <option value="custom">自定义</option>
            <option value="default">默认</option>
            <option value="compact">紧凑</option>
            <option value="spacious">宽松</option>
            <option value="mobile">移动端</option>
          </select>
        </div>
      )}
      
      {showResetButton && (
        <button
          onClick={resetLayoutConfig}
          style={{
            marginTop: '12px',
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          重置为默认
        </button>
      )}
    </div>
  );
}