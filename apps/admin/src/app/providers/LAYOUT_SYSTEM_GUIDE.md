# 布局系统使用指南

## 📋 概述

新的布局系统提供了统一、类型安全、可扩展的布局配置管理方案，解决了原有系统中属性分散、难以维护的问题。

## 🚀 主要特性

- **统一管理**：所有布局相关状态集中管理
- **类型安全**：完整的 TypeScript 类型支持
- **易于扩展**：新增布局属性无需修改多个文件
- **便捷使用**：提供多个层次的 Hook 接口
- **向后兼容**：保持原有 API 的兼容性

## 📁 文件结构

```
src/app/providers/
├── index.ts                 # 统一导出
├── types.ts                 # 类型定义
├── ThemeProvider.tsx        # 主题提供者（重构）
├── useLayoutConfig.ts       # 布局配置管理 Hook
├── useAppLayout.ts          # 应用布局便捷 Hook
└── LAYOUT_SYSTEM_GUIDE.md   # 使用指南
```

## 🔧 使用方法

### 1. 基础设置

```tsx
// App.tsx
import { AppThemeProvider } from '@/app/providers';

function App() {
  return (
    <AppThemeProvider>
      <YourAppContent />
    </AppThemeProvider>
  );
}
```

### 2. 自定义初始布局

```tsx
// App.tsx
import { AppThemeProvider } from '@/app/providers';

function App() {
  const initialLayout = {
    headerHeight: 80,
    sidebarWidth: 320,
    sidebarCollapsed: false,
    contentPadding: 32,
  };

  return (
    <AppThemeProvider initialLayoutConfig={initialLayout}>
      <YourAppContent />
    </AppThemeProvider>
  );
}
```

### 3. 在组件中使用

#### 方式一：使用 `useAppLayout`（推荐）

```tsx
import { useAppLayout } from '@/app/providers';

function MyComponent() {
  const { 
    headerHeight, 
    sidebarWidth,
    setHeaderHeight, 
    toggleSidebar,
    contentMarginLeft,
    contentMarginTop 
  } = useAppLayout();

  return (
    <div 
      style={{
        marginLeft: contentMarginLeft,
        marginTop: contentMarginTop,
        padding: contentPadding,
      }}
    >
      <button onClick={toggleSidebar}>切换侧边栏</button>
      <button onClick={() => setHeaderHeight(100)}>设置头部高度</button>
    </div>
  );
}
```

#### 方式二：使用 `useAppTheme`

```tsx
import { useAppTheme } from '@/app/providers';

function MyComponent() {
  const { 
    layoutConfig, 
    updateLayoutConfig,
    isDarkMode,
    toggleTheme 
  } = useAppTheme();

  const handleUpdateLayout = () => {
    updateLayoutConfig({
      headerHeight: 100,
      sidebarWidth: 350,
    });
  };

  return (
    <div>
      <p>当前头部高度: {layoutConfig.headerHeight}</p>
      <button onClick={handleUpdateLayout}>更新布局</button>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
}
```

#### 方式三：使用 MUI `useTheme`（访问主题数据）

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  // 访问布局配置
  const { headerHeight, sidebarWidth } = theme.customLayout;
  
  return (
    <div style={{ marginTop: headerHeight }}>
      内容区域
    </div>
  );
}
```

## 📊 API 参考

### LayoutConfig 接口

```typescript
interface LayoutConfig {
  headerHeight: number;           // 头部高度
  sidebarWidth: number;          // 侧边栏宽度
  sidebarCollapsedWidth: number; // 侧边栏收起时宽度
  footerHeight: number;          // 页脚高度
  contentPadding: number;        // 内容区域内边距
  showSidebar: boolean;          // 是否显示侧边栏
  sidebarCollapsed: boolean;     // 侧边栏是否收起
  showFooter: boolean;           // 是否显示页脚
}
```

### useAppLayout Hook

```typescript
function useAppLayout() {
  return {
    // 布局状态
    layoutConfig: LayoutConfig;
    headerHeight: number;
    sidebarWidth: number;
    // ... 其他属性
    
    // 计算属性
    currentSidebarWidth: number;
    contentMarginLeft: number;
    contentMarginTop: number;
    contentMarginBottom: number;
    
    // 更新函数
    updateLayoutConfig: (updates: Partial<LayoutConfig>) => void;
    setHeaderHeight: (height: number) => void;
    setSidebarWidth: (width: number) => void;
    toggleSidebar: () => void;
    // ... 其他函数
  };
}
```

## 🔄 迁移指南

### 从旧系统迁移

**旧代码：**
```tsx
// ❌ 旧方式
import { useAppTheme } from '@/app/providers/ThemeProvider';

function MyComponent() {
  const { headerHeight, setHeaderHeight, sidebarWidth, setSidebarWidth } = useAppTheme();
  // ...
}
```

**新代码：**
```tsx
// ✅ 新方式
import { useAppLayout } from '@/app/providers';

function MyComponent() {
  const { headerHeight, setHeaderHeight, sidebarWidth, setSidebarWidth } = useAppLayout();
  // ...
}
```

### 添加新的布局属性

1. **更新 `types.ts` 中的 `LayoutConfig` 接口**
2. **更新 `vite-env.d.ts` 中的主题类型定义**
3. **在 `useLayoutConfig.ts` 中添加默认值**
4. **在 `useAppLayout.ts` 中添加便捷函数（可选）**

示例：添加 `toolbarHeight` 属性

```typescript
// 1. types.ts
interface LayoutConfig {
  // ... 现有属性
  toolbarHeight: number; // 新增
}

// 2. vite-env.d.ts
declare module '@mui/material/styles' {
  interface Theme {
    customLayout: {
      // ... 现有属性
      toolbarHeight: number; // 新增
    };
  }
}

// 3. useLayoutConfig.ts
const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  // ... 现有属性
  toolbarHeight: 48, // 新增默认值
};

// 4. useAppLayout.ts（可选）
export function useAppLayout() {
  // ...
  const setToolbarHeight = (height: number) => {
    updateLayoutConfig({ toolbarHeight: height });
  };
  
  return {
    // ...
    toolbarHeight,
    setToolbarHeight,
  };
}
```

## 💡 最佳实践

1. **优先使用 `useAppLayout`**：提供最便捷的布局操作接口
2. **批量更新**：使用 `updateLayoutConfig` 一次性更新多个属性
3. **类型安全**：充分利用 TypeScript 类型检查
4. **性能优化**：避免频繁的布局更新，考虑使用防抖
5. **响应式设计**：结合 MUI 的断点系统实现响应式布局

## 🐛 常见问题

### Q: 如何在组件外部访问布局配置？
A: 布局配置通过 Context 提供，只能在 `AppThemeProvider` 内部的组件中访问。

### Q: 如何持久化布局配置？
A: 可以结合 localStorage 或其他存储方案，在 `useLayoutConfig` 中添加持久化逻辑。

### Q: 如何实现响应式布局？
A: 结合 MUI 的 `useMediaQuery` 和布局配置更新函数实现响应式调整。

```tsx
import { useMediaQuery, useTheme } from '@mui/material';
import { useAppLayout } from '@/app/providers';

function ResponsiveComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { updateLayoutConfig } = useAppLayout();
  
  useEffect(() => {
    updateLayoutConfig({
      sidebarWidth: isMobile ? 240 : 280,
      headerHeight: isMobile ? 56 : 64,
    });
  }, [isMobile, updateLayoutConfig]);
}
```