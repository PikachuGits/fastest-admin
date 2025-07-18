# 统一主题系统使用指南

## 概述

本指南详细介绍如何在项目中使用统一的 MUI 和 UnoCSS 主题系统。通过设计令牌（Design Tokens）的方式，我们实现了两个样式系统的完美统一，确保设计的一致性和开发的高效性。

## 🎯 核心特性

- **统一设计令牌**: 所有颜色、间距、字体等设计元素都来自同一套设计令牌
- **双向兼容**: 同时支持 MUI 组件和 UnoCSS 原子类
- **主题切换**: 支持亮色/暗色主题无缝切换
- **响应式设计**: 内置响应式断点和布局配置
- **类型安全**: 完整的 TypeScript 类型支持
- **性能优化**: 按需加载和样式优化

## 🚀 快速开始

### 1. 安装依赖

```bash
# 如果还没有安装 UnoCSS
bun add -D unocss @unocss/preset-wind @unocss/preset-attributify @unocss/preset-animations
```

### 2. 配置 UnoCSS

更新你的 `uno.config.ts` 文件：

```typescript
import { defineConfig } from 'unocss';
import { createResponsiveUnocssConfig } from '@fastest/components/theme/unocss-theme';

const { theme, rules, shortcuts, variants } = createResponsiveUnocssConfig();

export default defineConfig({
  // 内容匹配规则
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts,jsx,tsx}',
        'packages/components/src/**/*.{js,ts,jsx,tsx}',
      ],
    },
  },
  
  // 使用统一主题配置
  theme,
  rules,
  shortcuts,
  variants,
  
  // 预设
  presets: [
    presetWind3(),
    presetAttributify(),
    presetAnimations(),
  ],
  
  // 安全列表 - 确保主题相关类名不被清除
  safelist: [
    // 颜色类
    'bg-primary-main', 'bg-primary-light', 'bg-primary-dark',
    'bg-secondary-main', 'bg-secondary-light', 'bg-secondary-dark',
    'bg-success-main', 'bg-warning-main', 'bg-error-main', 'bg-info-main',
    'text-primary-main', 'text-secondary-main',
    // 间距类
    'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8',
    'm-1', 'm-2', 'm-3', 'm-4', 'm-6', 'm-8',
    // 布局类
    'flex-center', 'flex-between', 'card', 'btn-primary',
  ],
});
```

### 3. 配置应用主题提供者

在你的应用根组件中使用 `EnhancedThemeProvider`：

```tsx
import React from 'react';
import { EnhancedThemeProvider } from '@fastest/components';
import { CssBaseline } from '@mui/material';
import 'uno.css'; // 引入 UnoCSS 样式

function App() {
  return (
    <EnhancedThemeProvider
      initialMode="light"
      enablePersistence
      enableCssBaseline
    >
      <CssBaseline />
      <YourAppContent />
    </EnhancedThemeProvider>
  );
}

export default App;
```

## 🎨 设计令牌系统

### 颜色系统

所有颜色都基于统一的设计令牌，支持亮色和暗色主题：

```typescript
// 在组件中使用
import { designTokens, colorTokens, darkColorTokens } from '@fastest/components';

// 获取当前主题的颜色
const currentColors = isDarkMode ? darkColorTokens : colorTokens;
```

#### 可用颜色类

**主色系 (Primary)**
- `bg-primary-light` / `text-primary-light`
- `bg-primary-main` / `text-primary-main`
- `bg-primary-dark` / `text-primary-dark`

**辅助色系 (Secondary)**
- `bg-secondary-light` / `text-secondary-light`
- `bg-secondary-main` / `text-secondary-main`
- `bg-secondary-dark` / `text-secondary-dark`

**语义色系**
- `bg-success-main` / `text-success-main`
- `bg-warning-main` / `text-warning-main`
- `bg-error-main` / `text-error-main`
- `bg-info-main` / `text-info-main`

**中性色系**
- `bg-neutral` / `text-neutral`
- `bg-surface` / `text-surface`
- `bg-background` / `text-background`

### 间距系统

基于 4px 基准的间距系统：

```css
/* 内边距 */
.p-1  /* 4px */
.p-2  /* 8px */
.p-3  /* 12px */
.p-4  /* 16px */
.p-6  /* 24px */
.p-8  /* 32px */

/* 外边距 */
.m-1  /* 4px */
.m-2  /* 8px */
.m-3  /* 12px */
.m-4  /* 16px */
.m-6  /* 24px */
.m-8  /* 32px */
```

### 字体系统

```css
/* 字体大小 */
.text-xs    /* 12px */
.text-sm    /* 14px */
.text-base  /* 16px */
.text-lg    /* 18px */
.text-xl    /* 20px */
.text-2xl   /* 24px */
.text-3xl   /* 30px */

/* 字体粗细 */
.font-light   /* 300 */
.font-normal  /* 400 */
.font-medium  /* 500 */
.font-semibold /* 600 */
.font-bold    /* 700 */
```

## 🧩 组件样式快捷方式

### 布局快捷方式

```css
/* Flexbox 布局 */
.flex-center   /* display: flex; align-items: center; justify-content: center; */
.flex-between  /* display: flex; align-items: center; justify-content: space-between; */
.flex-start    /* display: flex; align-items: center; justify-content: flex-start; */
.flex-end      /* display: flex; align-items: center; justify-content: flex-end; */
```

### 卡片样式

```css
.card {
  /* 基础卡片样式 */
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.card-hover {
  /* 带悬停效果的卡片 */
  transition: var(--transition-base);
}

.card-hover:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### 按钮样式

```css
.btn-primary   /* 主色按钮 */
.btn-secondary /* 辅助色按钮 */
.btn-success   /* 成功按钮 */
.btn-warning   /* 警告按钮 */
.btn-error     /* 错误按钮 */
.btn-outline   /* 轮廓按钮 */
```

### 输入框样式

```css
.input         /* 标准输入框 */
.input-error   /* 错误状态输入框 */
.input-success /* 成功状态输入框 */
```

## 💡 最佳实践

### 1. 混合使用 MUI 和 UnoCSS

```tsx
import React from 'react';
import { Button, Typography, Box } from '@mui/material';

function ExampleComponent() {
  return (
    <Box className="p-6 bg-surface rounded-lg">
      {/* MUI 组件 + UnoCSS 类名 */}
      <Typography 
        variant="h5" 
        className="mb-4 text-primary-main"
      >
        标题文本
      </Typography>
      
      {/* MUI 按钮 + UnoCSS 间距 */}
      <Button 
        variant="contained" 
        color="primary"
        className="mr-2"
      >
        MUI 按钮
      </Button>
      
      {/* 纯 UnoCSS 按钮 */}
      <button className="btn-outline">
        UnoCSS 按钮
      </button>
    </Box>
  );
}
```

### 2. 响应式设计

```tsx
function ResponsiveComponent() {
  return (
    <div className="
      p-4 
      sm:p-6 
      md:p-8 
      bg-surface 
      rounded-lg
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      gap-4
    ">
      {/* 响应式网格内容 */}
    </div>
  );
}
```

### 3. 主题感知组件

```tsx
import { useEnhancedTheme } from '@fastest/components';

function ThemeAwareComponent() {
  const { isDarkMode, currentTheme } = useEnhancedTheme();
  
  return (
    <div className={`
      p-6 
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      rounded-lg
    `}>
      <p>当前主题: {isDarkMode ? '暗色' : '亮色'}</p>
    </div>
  );
}
```

### 4. 自定义主题扩展

```typescript
// 扩展设计令牌
import { designTokens } from '@fastest/components';

const customTokens = {
  ...designTokens,
  colors: {
    ...designTokens.colors,
    brand: {
      primary: '#your-brand-color',
      secondary: '#your-secondary-color',
    },
  },
};
```

## 🔧 高级配置

### 自定义 UnoCSS 规则

```typescript
// uno.config.ts
import { createResponsiveUnocssConfig } from '@fastest/components/theme/unocss-theme';

const { theme, rules, shortcuts, variants } = createResponsiveUnocssConfig();

export default defineConfig({
  theme,
  rules: [
    ...rules,
    // 添加自定义规则
    ['brand-gradient', { background: 'linear-gradient(45deg, #your-colors)' }],
  ],
  shortcuts: [
    ...shortcuts,
    // 添加自定义快捷方式
    ['hero-section', 'min-h-screen flex-center bg-gradient-to-r from-primary-main to-secondary-main'],
  ],
});
```

### 主题覆盖

```tsx
import { EnhancedThemeProvider } from '@fastest/components';

const themeOverrides = {
  palette: {
    primary: {
      main: '#your-custom-primary',
    },
  },
  typography: {
    fontFamily: 'Your Custom Font',
  },
};

function App() {
  return (
    <EnhancedThemeProvider themeOverrides={themeOverrides}>
      <YourApp />
    </EnhancedThemeProvider>
  );
}
```

## 🐛 故障排除

### 常见问题

1. **UnoCSS 类名不生效**
   - 检查 `uno.config.ts` 中的 `content` 配置
   - 确保文件路径包含在匹配规则中
   - 检查 `safelist` 是否包含需要的类名

2. **主题切换不生效**
   - 确保使用了 `EnhancedThemeProvider`
   - 检查 `enablePersistence` 配置
   - 清除浏览器本地存储缓存

3. **颜色不一致**
   - 确保 MUI 和 UnoCSS 都使用了统一的设计令牌
   - 检查 CSS 变量是否正确定义
   - 验证主题配置是否正确导入

### 调试技巧

```tsx
// 调试当前主题状态
import { useEnhancedTheme } from '@fastest/components';

function DebugTheme() {
  const themeState = useEnhancedTheme();
  
  return (
    <pre>
      {JSON.stringify(themeState, null, 2)}
    </pre>
  );
}
```

## 📚 API 参考

### EnhancedThemeProvider

```typescript
interface EnhancedThemeProviderProps {
  children: React.ReactNode;
  initialMode?: 'light' | 'dark' | 'system';
  initialLayoutConfig?: Partial<LayoutConfig>;
  themeOverrides?: Partial<Theme>;
  enablePersistence?: boolean;
  storageKey?: string;
  enableCssBaseline?: boolean;
  disableTransitionOnChange?: boolean;
}
```

### useEnhancedTheme

```typescript
interface EnhancedThemeContextValue {
  // 主题模式
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  
  // MUI 主题
  currentTheme: Theme;
  
  // 布局配置
  layoutConfig: LayoutConfig;
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void;
  applyLayoutPreset: (preset: keyof typeof layoutPresets) => void;
  
  // 设计令牌
  designTokens: typeof designTokens;
  colorTokens: ColorTokens;
}
```

## 🎉 总结

通过统一的主题系统，你可以：

- ✅ 在同一个项目中无缝使用 MUI 组件和 UnoCSS 原子类
- ✅ 确保设计的一致性和品牌统一
- ✅ 提高开发效率和代码可维护性
- ✅ 支持完整的主题切换和响应式设计
- ✅ 享受完整的 TypeScript 类型安全

开始使用统一主题系统，让你的应用设计更加一致和专业！