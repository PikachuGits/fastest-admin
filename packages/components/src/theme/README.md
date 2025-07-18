# 主题系统文档

## 📋 概述

这是一个功能完整的主题管理系统，基于 Material-UI 构建，提供了丰富的主题定制和管理功能。系统支持明暗主题切换、动态布局配置、本地存储持久化等特性，适用于现代 Web 应用的主题需求。

## ✨ 主要特性

- 🎨 **明暗主题切换** - 支持亮色和暗色两种主题模式
- 📐 **动态布局配置** - 可调整头部、侧边栏、页脚等组件尺寸
- 💾 **本地存储持久化** - 自动保存用户的主题偏好
- 🎛️ **主题自定义覆盖** - 支持深度定制主题样式
- 🔄 **CSS 基线重置** - 确保跨浏览器的样式一致性
- 🎯 **完整的 TypeScript 支持** - 提供完整的类型定义
- 📱 **响应式设计** - 支持多种设备和屏幕尺寸
- 🛡️ **错误处理和降级** - 优雅处理存储失败等异常情况

## 🏗️ 架构设计

### 核心模块

```
theme/
├── index.ts                    # 主入口文件
├── create-theme.ts             # 主题创建函数
├── theme-config.ts             # 主题配置常量
├── theme-provider.tsx          # 基础主题提供者
├── EnhancedThemeProvider.tsx   # 增强主题提供者
├── extend-theme-types.d.ts     # 类型扩展
├── types.ts                    # 类型定义
├── hooks/
│   └── useThemeMode.ts         # 主题模式管理 Hook
└── core/
    ├── components.tsx          # 组件样式覆盖
    ├── palette.ts              # 调色板配置
    ├── typography.ts           # 字体配置
    ├── shadows.ts              # 阴影配置
    └── custom-shadows.ts       # 自定义阴影
```

### 设计原则

1. **模块化设计** - 每个功能模块独立，便于维护和扩展
2. **类型安全** - 完整的 TypeScript 支持，编译时错误检查
3. **性能优化** - 使用 useMemo 和 useCallback 优化渲染性能
4. **用户体验** - 平滑的主题切换动画和持久化存储
5. **可扩展性** - 支持自定义主题覆盖和布局配置

## 🚀 快速开始

### 基础使用

```tsx
import React from 'react';
import { EnhancedThemeProvider } from '@fastest/components';

function App() {
  return (
    <EnhancedThemeProvider>
      <YourApp />
    </EnhancedThemeProvider>
  );
}

export default App;
```

### 在组件中使用主题

```tsx
import React from 'react';
import { useEnhancedTheme } from '@fastest/components';
import { Button, Box } from '@mui/material';

function MyComponent() {
  const { isDarkMode, toggleTheme, layoutConfig } = useEnhancedTheme();

  return (
    <Box
      sx={{
        height: layoutConfig.headerHeight,
        padding: layoutConfig.contentPadding / 8, // 转换为 theme.spacing 单位
        backgroundColor: 'background.paper',
      }}
    >
      <Button onClick={toggleTheme} variant="contained">
        切换到 {isDarkMode ? '亮色' : '暗色'} 主题
      </Button>
    </Box>
  );
}
```

## 🎛️ 高级配置

### 自定义主题配置

```tsx
import React from 'react';
import { EnhancedThemeProvider } from '@fastest/components';

function App() {
  return (
    <EnhancedThemeProvider
      initialMode="dark"
      initialLayoutConfig={{
        headerHeight: 80,
        sidebarWidth: 320,
      }}
      themeOverrides={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                main: '#1976d2',
                light: '#42a5f5',
                dark: '#1565c0',
              },
              secondary: {
                main: '#dc004e',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: '#90caf9',
                light: '#bbdefb',
                dark: '#42a5f5',
              },
            },
          },
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        customLayout: {
          headerHeight: 72,
          sidebarWidth: 300,
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

### 使用预设布局

```tsx
import React from 'react';
import { useEnhancedTheme, layoutPresets, applyLayoutPreset } from '@fastest/components';
import { Button, ButtonGroup } from '@mui/material';

function LayoutControls() {
  const { updateLayoutConfig } = useEnhancedTheme();

  return (
    <ButtonGroup variant="outlined">
      <Button onClick={() => applyLayoutPreset(updateLayoutConfig, 'compact')}>
        紧凑布局
      </Button>
      <Button onClick={() => applyLayoutPreset(updateLayoutConfig, 'default')}>
        标准布局
      </Button>
      <Button onClick={() => applyLayoutPreset(updateLayoutConfig, 'spacious')}>
        宽松布局
      </Button>
    </ButtonGroup>
  );
}
```

## 📚 API 文档

### EnhancedThemeProvider

增强主题提供者组件，提供完整的主题管理功能。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 子组件 |
| `initialMode` | `'light' \| 'dark'` | `'light'` | 初始主题模式 |
| `initialLayoutConfig` | `Partial<LayoutConfig>` | - | 初始布局配置 |
| `themeOverrides` | `ThemeOptions` | `{}` | 主题覆盖配置 |
| `enablePersistence` | `boolean` | `true` | 是否启用持久化 |
| `storageKey` | `string` | `'theme-mode'` | 本地存储键名 |
| `enableCssBaseline` | `boolean` | `true` | 是否启用 CSS 基线重置 |
| `disableTransitionOnChange` | `boolean` | `false` | 是否禁用过渡动画 |

### useEnhancedTheme Hook

主题控制 Hook，提供主题状态和控制方法。

#### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| `mode` | `'light' \| 'dark'` | 当前主题模式 |
| `isDarkMode` | `boolean` | 是否为暗色模式 |
| `toggleTheme` | `() => void` | 切换主题模式 |
| `setTheme` | `(mode: ThemeMode) => void` | 设置特定主题模式 |
| `layoutConfig` | `LayoutConfig` | 当前布局配置 |
| `updateLayoutConfig` | `(config: Partial<LayoutConfig>) => void` | 更新布局配置 |
| `resetLayoutConfig` | `() => void` | 重置布局配置 |

### LayoutConfig 接口

布局配置对象的类型定义。

```tsx
interface LayoutConfig {
  headerHeight: number;        // 头部高度 (px)
  sidebarWidth: number;        // 侧边栏宽度 (px)
  sidebarCollapsedWidth: number; // 侧边栏收起宽度 (px)
  footerHeight: number;        // 页脚高度 (px)
  contentPadding: number;      // 内容内边距 (px)
}
```

### 预设布局

系统提供了四种预设布局配置：

| 预设 | 描述 | 适用场景 |
|------|------|----------|
| `default` | 标准布局 | 大多数桌面应用 |
| `compact` | 紧凑布局 | 屏幕空间有限的场景 |
| `spacious` | 宽松布局 | 大屏幕和长时间使用 |
| `mobile` | 移动端布局 | 移动设备和小屏幕 |

## 🎨 主题定制

### 自定义调色板

```tsx
const customTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#dc004e',
          light: '#ff5983',
          dark: '#9a0036',
          contrastText: '#ffffff',
        },
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
          light: '#bbdefb',
          dark: '#42a5f5',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  },
};
```

### 自定义字体

```tsx
const customTypography = {
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
  },
};
```

### 自定义组件样式

```tsx
const customComponents = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
};
```

## 📱 响应式设计

### 断点配置

```tsx
import { useTheme, useMediaQuery } from '@mui/material';
import { useEnhancedTheme, applyLayoutPreset } from '@fastest/components';

function ResponsiveLayout() {
  const theme = useTheme();
  const { updateLayoutConfig } = useEnhancedTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    if (isMobile) {
      applyLayoutPreset(updateLayoutConfig, 'mobile');
    } else {
      applyLayoutPreset(updateLayoutConfig, 'default');
    }
  }, [isMobile, updateLayoutConfig]);

  return (
    <div>
      {/* 你的响应式内容 */}
    </div>
  );
}
```

### 自适应布局

```tsx
function AdaptiveHeader() {
  const { layoutConfig } = useEnhancedTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      sx={{
        height: isMobile ? 56 : layoutConfig.headerHeight,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      {/* 头部内容 */}
    </AppBar>
  );
}
```

## 🔧 最佳实践

### 1. 主题提供者的使用

```tsx
// ✅ 推荐：在应用根部使用 EnhancedThemeProvider
function App() {
  return (
    <EnhancedThemeProvider
      initialMode="light"
      enablePersistence
      storageKey="my-app-theme"
    >
      <Router>
        <Routes>
          {/* 你的路由 */}
        </Routes>
      </Router>
    </EnhancedThemeProvider>
  );
}

// ❌ 避免：在多个地方使用主题提供者
```

### 2. 主题状态的访问

```tsx
// ✅ 推荐：使用 useEnhancedTheme Hook
function MyComponent() {
  const { isDarkMode, layoutConfig } = useEnhancedTheme();
  
  return (
    <div style={{ height: layoutConfig.headerHeight }}>
      {/* 组件内容 */}
    </div>
  );
}

// ❌ 避免：直接访问 localStorage
function BadComponent() {
  const mode = localStorage.getItem('theme-mode'); // 不推荐
}
```

### 3. 性能优化

```tsx
// ✅ 推荐：使用 useMemo 缓存计算结果
function OptimizedComponent() {
  const { layoutConfig } = useEnhancedTheme();
  
  const styles = useMemo(() => ({
    container: {
      height: layoutConfig.headerHeight,
      padding: layoutConfig.contentPadding,
    },
  }), [layoutConfig]);
  
  return <div style={styles.container}>{/* 内容 */}</div>;
}

// ❌ 避免：在每次渲染时创建新对象
function UnoptimizedComponent() {
  const { layoutConfig } = useEnhancedTheme();
  
  return (
    <div
      style={{
        height: layoutConfig.headerHeight, // 每次渲染都创建新对象
        padding: layoutConfig.contentPadding,
      }}
    >
      {/* 内容 */}
    </div>
  );
}
```

### 4. 类型安全

```tsx
// ✅ 推荐：使用类型定义
import type { LayoutConfig, ThemeMode } from '@fastest/components';

interface MyComponentProps {
  mode: ThemeMode;
  layout: LayoutConfig;
}

function TypedComponent({ mode, layout }: MyComponentProps) {
  // 类型安全的组件实现
}

// ❌ 避免：使用 any 类型
function UntypedComponent({ mode, layout }: any) {
  // 缺乏类型安全
}
```

### 5. 错误处理

```tsx
// ✅ 推荐：优雅处理主题加载失败
function RobustComponent() {
  const themeContext = useEnhancedTheme();
  
  if (!themeContext) {
    // 提供降级 UI
    return <div>主题加载中...</div>;
  }
  
  const { isDarkMode, toggleTheme } = themeContext;
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '切换到亮色' : '切换到暗色'}
    </button>
  );
}
```

## 🐛 故障排除

### 常见问题

#### 1. 主题切换不生效

**问题**：点击切换按钮后主题没有变化

**解决方案**：
```tsx
// 确保组件被 EnhancedThemeProvider 包裹
function App() {
  return (
    <EnhancedThemeProvider>
      <MyComponent /> {/* 这里可以使用 useEnhancedTheme */}
    </EnhancedThemeProvider>
  );
}
```

#### 2. 布局配置不生效

**问题**：更新布局配置后界面没有变化

**解决方案**：
```tsx
// 确保正确使用布局配置
function MyComponent() {
  const { layoutConfig } = useEnhancedTheme();
  
  return (
    <div
      style={{
        height: layoutConfig.headerHeight, // 直接使用像素值
        // 或者转换为 theme spacing
        padding: theme => theme.spacing(layoutConfig.contentPadding / 8),
      }}
    >
      {/* 内容 */}
    </div>
  );
}
```

#### 3. 本地存储不工作

**问题**：主题偏好没有被保存

**解决方案**：
```tsx
// 检查是否启用了持久化
<EnhancedThemeProvider
  enablePersistence={true} // 确保启用
  storageKey="unique-key"  // 使用唯一的键名
>
```

#### 4. TypeScript 类型错误

**问题**：使用主题时出现类型错误

**解决方案**：
```tsx
// 确保正确导入类型
import type { Theme } from '@mui/material/styles';
import type { LayoutConfig } from '@fastest/components';

// 使用类型断言（如果必要）
const theme = useTheme() as Theme;
```

### 调试技巧

1. **检查主题对象**：
```tsx
function DebugTheme() {
  const theme = useTheme();
  console.log('Current theme:', theme);
  return null;
}
```

2. **监控布局变化**：
```tsx
function DebugLayout() {
  const { layoutConfig } = useEnhancedTheme();
  
  useEffect(() => {
    console.log('Layout config changed:', layoutConfig);
  }, [layoutConfig]);
  
  return null;
}
```

3. **检查本地存储**：
```tsx
// 在浏览器控制台中检查
localStorage.getItem('theme-mode');
localStorage.getItem('theme-mode-layout');
```

## 🔄 迁移指南

如果你正在从其他主题系统迁移，请参考 [主题系统迁移指南](../../../THEME_MIGRATION_GUIDE.md)。

## 📖 相关文档

- [主题系统分析](../../../THEME_ANALYSIS.md)
- [主题迁移指南](../../../THEME_MIGRATION_GUIDE.md)
- [Material-UI 主题文档](https://mui.com/material-ui/customization/theming/)
- [CSS 变量支持](https://mui.com/material-ui/experimental-api/css-theme-variables/)

---

**享受强大而灵活的主题系统！** 🎉