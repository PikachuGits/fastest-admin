# @fastest/hook

一个高性能、类型安全的 React Hook 集合，专为现代 Web 应用设计。

## 特性

- 🚀 **高性能**：优化的 Hook 实现，最小化重渲染
- 🔒 **类型安全**：完整的 TypeScript 支持
- 🎨 **主题系统**：支持视图过渡的主题切换
- 📐 **布局管理**：强大的布局配置管理系统
- 🔧 **易于使用**：简洁的 API 设计
- 📦 **轻量级**：最小化的包大小

## 安装

```bash
# 使用 bun
bun add @fastest/hook

# 使用 npm
npm install @fastest/hook

# 使用 yarn
yarn add @fastest/hook
```

## 快速开始

### 主题切换

```tsx
import { useViewTransitionToggle } from '@fastest/hook';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = useViewTransitionToggle(isDark, setIsDark);

  return (
    <button onClick={toggleTheme}>
      {isDark ? '🌙' : '☀️'} 切换主题
    </button>
  );
}
```

### 布局管理

```tsx
import { useAppLayout } from '@fastest/hook';

function Layout() {
  const {
    headerHeight,
    sidebarWidth,
    currentSidebarWidth,
    contentMarginLeft,
    setHeaderHeight,
    toggleSidebar
  } = useAppLayout({
    headerHeight: 64,
    sidebarWidth: 280
  });

  return (
    <div>
      <header style={{ height: headerHeight }}>
        <button onClick={() => setHeaderHeight(80)}>
          增加头部高度
        </button>
        <button onClick={toggleSidebar}>
          切换侧边栏
        </button>
      </header>
      
      <aside style={{ width: currentSidebarWidth }}>
        侧边栏内容
      </aside>
      
      <main style={{ 
        marginLeft: contentMarginLeft, 
        marginTop: headerHeight 
      }}>
        主要内容
      </main>
    </div>
  );
}
```

## API 文档

### 主题相关

#### `useViewTransitionToggle(isDark, setIsDark)`

支持视图过渡动画的主题切换 Hook。

**参数：**
- `isDark: boolean` - 当前是否为暗色主题
- `setIsDark: (value: boolean) => void` - 设置主题状态的函数

**返回值：**
- `toggleTheme: (e: any) => void` - 切换主题的函数

### 布局相关

#### `useLayoutConfig(initialConfig?)`

基础的布局配置管理 Hook。

**参数：**
- `initialConfig?: Partial<LayoutConfig>` - 初始布局配置

**返回值：**
```tsx
{
  layoutConfig: LayoutConfig;
  updateLayoutConfig: (updates: Partial<LayoutConfig>) => void;
  resetLayoutConfig: () => void;
  setHeaderHeight: (height: number) => void;
  setSidebarWidth: (width: number) => void;
  toggleSidebar: () => void;
  setFooterHeight: (height: number) => void;
}
```

#### `useAppLayout(initialConfig?)`

增强的应用布局管理 Hook，包含计算属性和便捷方法。

**参数：**
- `initialConfig?: Partial<LayoutConfig>` - 初始布局配置

**返回值：**
```tsx
{
  // 基础配置
  layoutConfig: LayoutConfig;
  headerHeight: number;
  sidebarWidth: number;
  sidebarCollapsedWidth: number;
  footerHeight: number;
  contentPadding: number;
  showSidebar: boolean;
  sidebarCollapsed: boolean;
  showFooter: boolean;
  
  // 计算属性
  currentSidebarWidth: number;
  contentMarginLeft: number;
  contentMarginTop: number;
  contentMarginBottom: number;
  
  // 更新方法
  updateLayoutConfig: (updates: Partial<LayoutConfig>) => void;
  resetLayoutConfig: () => void;
  setHeaderHeight: (height: number) => void;
  setSidebarWidth: (width: number) => void;
  toggleSidebar: () => void;
  setFooterHeight: (height: number) => void;
  toggleSidebarVisibility: () => void;
  toggleFooterVisibility: () => void;
  setContentPadding: (padding: number) => void;
}
```

### 类型定义

#### `LayoutConfig`

```tsx
interface LayoutConfig {
  headerHeight: number;           // 头部高度
  sidebarWidth: number;          // 侧边栏宽度
  sidebarCollapsedWidth: number; // 侧边栏收起时的宽度
  footerHeight: number;          // 页脚高度
  contentPadding: number;        // 内容区域内边距
  showSidebar: boolean;          // 是否显示侧边栏
  sidebarCollapsed: boolean;     // 侧边栏是否收起
  showFooter: boolean;           // 是否显示页脚
}
```

## 高级用法

### 自定义布局配置

```tsx
import { useAppLayout, DEFAULT_LAYOUT_CONFIG } from '@fastest/hook';

// 自定义默认配置
const customConfig = {
  ...DEFAULT_LAYOUT_CONFIG,
  headerHeight: 80,
  sidebarWidth: 320,
  contentPadding: 32
};

function CustomLayout() {
  const layout = useAppLayout(customConfig);
  
  return (
    <div>
      {/* 布局内容 */}
    </div>
  );
}
```

### 响应式布局

```tsx
import { useAppLayout } from '@fastest/hook';
import { useMediaQuery } from '@mui/material';

function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const layout = useAppLayout({
    headerHeight: isMobile ? 56 : 64,
    sidebarWidth: isMobile ? 240 : 280,
    showSidebar: !isMobile
  });

  // 响应式调整
  useEffect(() => {
    if (isMobile) {
      layout.updateLayoutConfig({
        headerHeight: 56,
        showSidebar: false
      });
    } else {
      layout.updateLayoutConfig({
        headerHeight: 64,
        showSidebar: true
      });
    }
  }, [isMobile]);

  return (
    <div>
      {/* 响应式布局内容 */}
    </div>
  );
}
```

### 与状态管理集成

```tsx
// 与 Zustand 集成
import { create } from 'zustand';
import { useAppLayout } from '@fastest/hook';

const useLayoutStore = create((set) => ({
  config: DEFAULT_LAYOUT_CONFIG,
  updateConfig: (updates) => set((state) => ({
    config: { ...state.config, ...updates }
  }))
}));

function IntegratedLayout() {
  const { config, updateConfig } = useLayoutStore();
  const layout = useAppLayout(config);
  
  // 同步到全局状态
  useEffect(() => {
    updateConfig(layout.layoutConfig);
  }, [layout.layoutConfig]);
  
  return (
    <div>
      {/* 集成布局内容 */}
    </div>
  );
}
```

## 性能优化

### 1. 使用计算属性

```tsx
// ✅ 推荐：使用提供的计算属性
const { contentMarginLeft, currentSidebarWidth } = useAppLayout();

// ❌ 避免：手动计算
const { sidebarWidth, sidebarCollapsed, sidebarCollapsedWidth } = useAppLayout();
const manualWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;
```

### 2. 合理的初始配置

```tsx
// ✅ 推荐：提供稳定的初始配置
const LAYOUT_CONFIG = {
  headerHeight: 64,
  sidebarWidth: 280
};

function Component() {
  const layout = useAppLayout(LAYOUT_CONFIG);
  // ...
}

// ❌ 避免：每次渲染都创建新对象
function Component() {
  const layout = useAppLayout({
    headerHeight: 64,
    sidebarWidth: 280
  });
  // ...
}
```

### 3. 避免频繁更新

```tsx
// ✅ 推荐：批量更新
const handleResize = useCallback(() => {
  layout.updateLayoutConfig({
    headerHeight: newHeight,
    sidebarWidth: newWidth,
    contentPadding: newPadding
  });
}, [layout]);

// ❌ 避免：多次单独更新
const handleResize = () => {
  layout.setHeaderHeight(newHeight);
  layout.setSidebarWidth(newWidth);
  layout.setContentPadding(newPadding);
};
```

## 迁移指南

如果您正在从应用层的布局系统迁移，请参考 [迁移指南](./LAYOUT_MIGRATION_GUIDE.md)。

## 浏览器支持

- Chrome >= 88
- Firefox >= 87
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v0.0.1

- 🎉 初始版本发布
- ✨ 添加 `useViewTransitionToggle` Hook
- ✨ 添加布局管理系统
- 📚 完善文档和示例