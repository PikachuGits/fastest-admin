# 主题系统迁移指南

## 📋 概述

本指南将帮助你从应用层的简单主题实现迁移到组件库的增强主题系统。新系统提供了更完整的功能、更好的类型安全性和更强的扩展性。

## 🔄 迁移步骤

### 步骤 1: 安装依赖

确保你的应用已经安装了最新版本的组件库：

```bash
# 如果使用 bun
bun install @fastest/components@latest

# 如果使用 npm
npm install @fastest/components@latest
```

### 步骤 2: 替换主题提供者

#### 旧的实现 (apps/admin/src/app/providers/ThemeProvider.tsx)

```tsx
// ❌ 旧的实现
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
};

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const theme = useMemo(() => {
    const base = isDarkMode ? darkTheme : lightTheme;
    return {
      ...base,
      customLayout: {
        ...base.customLayout,
        headerHeight,
      },
    };
  }, [isDarkMode, headerHeight]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, theme, headerHeight, setHeaderHeight }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
```

#### 新的实现

```tsx
// ✅ 新的实现
import { EnhancedThemeProvider } from '@fastest/components';

// 简单替换 - 基础功能
export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <EnhancedThemeProvider
      initialMode="light"
      enablePersistence={true}
      storageKey="app-theme-mode"
    >
      {children}
    </EnhancedThemeProvider>
  );
}

// 或者保持更多自定义配置
export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <EnhancedThemeProvider
      initialMode="light"
      initialLayoutConfig={{
        headerHeight: 64,
        sidebarWidth: 280,
      }}
      themeOverrides={{
        shape: { borderRadius: 8 },
        palette: {
          primary: { main: '#1976d2' },
        },
      }}
      enablePersistence={true}
      storageKey="app-theme-mode"
    >
      {children}
    </EnhancedThemeProvider>
  );
}
```

### 步骤 3: 更新 Hook 使用

#### 旧的 Hook 使用

```tsx
// ❌ 旧的使用方式
import { useAppTheme } from '../providers/ThemeProvider';

function MyComponent() {
  const { isDarkMode, toggleTheme, headerHeight, setHeaderHeight } = useAppTheme();
  
  return (
    <div style={{ height: headerHeight }}>
      <button onClick={toggleTheme}>
        {isDarkMode ? '亮色' : '暗色'}
      </button>
      <button onClick={() => setHeaderHeight(80)}>
        增加头部高度
      </button>
    </div>
  );
}
```

#### 新的 Hook 使用

```tsx
// ✅ 新的使用方式
import { useEnhancedTheme } from '@fastest/components';

function MyComponent() {
  const { 
    isDarkMode, 
    toggleTheme, 
    layoutConfig, 
    updateLayoutConfig 
  } = useEnhancedTheme();
  
  return (
    <div style={{ height: layoutConfig.headerHeight }}>
      <button onClick={toggleTheme}>
        {isDarkMode ? '亮色' : '暗色'}
      </button>
      <button onClick={() => updateLayoutConfig({ headerHeight: 80 })}>
        增加头部高度
      </button>
    </div>
  );
}
```

### 步骤 4: 移除旧文件

迁移完成后，可以安全删除以下文件：

```bash
# 删除旧的主题文件
rm apps/admin/src/app/providers/theme.ts
rm apps/admin/src/app/providers/ThemeProvider.tsx
```

## 🆕 新功能使用

### 1. 主题模式切换组件

```tsx
import { ThemeToggle } from '@fastest/components';

function Header() {
  return (
    <div>
      <h1>My App</h1>
      <ThemeToggle size="medium" />
    </div>
  );
}
```

### 2. 布局配置面板

```tsx
import { LayoutConfigPanel } from '@fastest/components';

function SettingsPage() {
  return (
    <div>
      <h2>设置</h2>
      <LayoutConfigPanel 
        showPresets 
        showResetButton 
      />
    </div>
  );
}
```

### 3. 高级主题配置

```tsx
import { EnhancedThemeProvider, layoutPresets } from '@fastest/components';

function App() {
  return (
    <EnhancedThemeProvider
      initialMode="dark"
      initialLayoutConfig={layoutPresets.compact}
      themeOverrides={{
        palette: {
          primary: {
            main: '#1877F2',
            light: '#73BAFB',
            dark: '#0C44AE',
          },
          secondary: {
            main: '#8E33FF',
          },
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
        shape: {
          borderRadius: 12,
        },
        customLayout: {
          headerHeight: 72,
          sidebarWidth: 320,
        },
      }}
      enablePersistence
      storageKey="my-app-theme"
    >
      <YourApp />
    </EnhancedThemeProvider>
  );
}
```

### 4. 访问完整主题对象

```tsx
import { useTheme } from '@mui/material/styles';
import { useEnhancedTheme } from '@fastest/components';

function MyComponent() {
  // 访问 MUI 主题对象
  const theme = useTheme();
  
  // 访问增强主题控制
  const { layoutConfig, updateLayoutConfig } = useEnhancedTheme();
  
  return (
    <div
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.customShadows.card,
        height: theme.customLayout.headerHeight,
      }}
    >
      <p>主题色: {theme.palette.primary.main}</p>
      <p>头部高度: {layoutConfig.headerHeight}px</p>
      <p>侧边栏宽度: {layoutConfig.sidebarWidth}px</p>
    </div>
  );
}
```

## 📊 功能对比表

| 功能 | 旧系统 | 新系统 |
|------|--------|--------|
| 明暗主题切换 | ✅ | ✅ |
| 布局配置 | 部分支持 | ✅ 完整支持 |
| 本地存储持久化 | ❌ | ✅ |
| TypeScript 类型安全 | 部分 | ✅ 完整 |
| 组件样式统一 | ❌ | ✅ |
| 设计系统支持 | ❌ | ✅ |
| 响应式字体 | ❌ | ✅ |
| 自定义阴影 | ❌ | ✅ |
| 预设配置 | ❌ | ✅ |
| 主题覆盖 | 基础 | ✅ 高级 |

## 🔧 故障排除

### 问题 1: 类型错误

如果遇到类型错误，确保导入了正确的类型：

```tsx
// ✅ 正确的类型导入
import type { Theme } from '@mui/material/styles';
import type { LayoutConfig } from '@fastest/components';
```

### 问题 2: 主题值未生效

确保组件被 `EnhancedThemeProvider` 包裹：

```tsx
// ✅ 确保正确包裹
function App() {
  return (
    <EnhancedThemeProvider>
      <MyComponent /> {/* 这里可以使用 useEnhancedTheme */}
    </EnhancedThemeProvider>
  );
}
```

### 问题 3: 布局配置不生效

检查是否正确访问了布局配置：

```tsx
// ❌ 错误的访问方式
const theme = useTheme();
const headerHeight = theme.customLayout?.headerHeight; // 可能为 undefined

// ✅ 正确的访问方式
const { layoutConfig } = useEnhancedTheme();
const headerHeight = layoutConfig.headerHeight; // 总是有值
```

## 🎯 最佳实践

### 1. 统一使用增强主题系统

```tsx
// ✅ 推荐：统一使用新系统
import { EnhancedThemeProvider, useEnhancedTheme } from '@fastest/components';

// ❌ 避免：混合使用新旧系统
```

### 2. 合理使用主题覆盖

```tsx
// ✅ 推荐：只覆盖必要的配置
<EnhancedThemeProvider
  themeOverrides={{
    palette: {
      primary: { main: '#custom-color' }
    }
  }}
>

// ❌ 避免：过度覆盖默认配置
```

### 3. 利用预设配置

```tsx
// ✅ 推荐：使用预设配置
import { layoutPresets } from '@fastest/components';

<EnhancedThemeProvider
  initialLayoutConfig={layoutPresets.compact}
>

// ❌ 避免：手动配置所有参数
```

### 4. 启用持久化

```tsx
// ✅ 推荐：启用主题持久化
<EnhancedThemeProvider
  enablePersistence
  storageKey="your-app-theme"
>
```

## 📚 相关文档

- [主题系统分析文档](./THEME_ANALYSIS.md)
- [组件库主题配置](./packages/components/src/theme/README.md)
- [Material-UI 主题文档](https://mui.com/material-ui/customization/theming/)

---

**迁移完成后，你将获得一个更强大、更灵活、更易维护的主题系统！** 🎉