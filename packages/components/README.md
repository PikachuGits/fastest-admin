# Components Package

这个包提供了一套完整的 UI 组件和主题系统，基于 Material-UI 构建。

## 目录

- [Iconify 图标系统](#iconify-图标系统)
  - [基础用法](#基础用法)
  - [图标注册](#图标注册)
  - [可用图标](#可用图标)
  - [自定义样式](#自定义样式)
- [Theme 主题系统](#theme-主题系统)
  - [ThemeProvider](#themeprovider)
  - [创建主题](#创建主题)
  - [调色板配置](#调色板配置)
  - [排版系统](#排版系统)
  - [阴影系统](#阴影系统)
  - [自定义组件样式](#自定义组件样式)
  - [CSS 变量](#css-变量)
  - [类名生成](#类名生成)

## Iconify 图标系统

### 基础用法

```tsx
import { Iconify } from '@packages/components';

// 基础使用
function MyComponent() {
  return (
    <div>
      <Iconify icon="solar:home-bold" />
      <Iconify icon="eva:search-fill" width={24} height={24} />
      <Iconify icon="solar:user-bold" width="2em" />
    </div>
  );
}

// 带样式
function StyledIcon() {
  return (
    <Iconify 
      icon="solar:heart-bold" 
      sx={{ 
        color: 'red', 
        fontSize: '2rem',
        '&:hover': {
          color: 'pink'
        }
      }} 
    />
  );
}

// 自定义类名
function CustomIcon() {
  return (
    <Iconify 
      icon="solar:star-bold" 
      className="my-custom-icon"
      width={32}
      height={32}
    />
  );
}
```

### 图标注册

图标系统会自动注册所有可用的图标集。如果使用未注册的图标，会显示警告并从在线加载。

```tsx
import { registerIcons, allIconNames } from '@packages/components';

// 手动注册图标（通常不需要，组件会自动调用）
registerIcons();

// 获取所有可用图标名称
console.log(allIconNames);

// 检查图标是否已注册
const isRegistered = allIconNames.includes('solar:home-bold');
```

### 可用图标

系统支持多个图标集：

- **Solar Icons**: `solar:*` (如 `solar:home-bold`, `solar:user-bold`)
- **Eva Icons**: `eva:*` (如 `eva:search-fill`, `eva:heart-outline`)
- **Carbon Icons**: `carbon:*` (如 `carbon:chevron-sort`)
- **Mingcute Icons**: `mingcute:*` (如 `mingcute:add-line`)
- **Iconify Icons**: `ic:*` (如 `ic:round-filter-list`)
- **Social Icons**: `socials:*` (如 `socials:github`, `socials:linkedin`)
- **Custom Icons**: `custom:*` (如 `custom:menu-duotone`)

### 自定义样式

```tsx
import { Iconify } from '@packages/components';
import { styled } from '@mui/material/styles';

// 使用 styled 组件
const StyledIcon = styled(Iconify)(({ theme }) => ({
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    color: theme.palette.secondary.main,
  },
}));

// 使用
function Component() {
  return <StyledIcon icon="solar:star-bold" />;
}
```

## Theme 主题系统

### ThemeProvider

```tsx
import { ThemeProvider } from '@packages/components';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <YourAppContent />
    </ThemeProvider>
  );
}

// 自定义主题覆盖
function AppWithCustomTheme() {
  const themeOverrides = {
    palette: {
      primary: {
        main: '#ff5722',
      },
    },
  };

  return (
    <ThemeProvider themeOverrides={themeOverrides}>
      <CssBaseline />
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### 创建主题

```tsx
import { createTheme } from '@packages/components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// 创建自定义主题
const customTheme = createTheme({
  themeOverrides: {
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196f3',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <YourAppContent />
    </MuiThemeProvider>
  );
}
```

### 调色板配置

```tsx
import { themeConfig } from '@packages/components';

// 查看默认调色板配置
console.log(themeConfig.palette);

// 自定义调色板
const customPalette = {
  primary: {
    lighter: '#E3F2FD',
    light: '#64B5F6',
    main: '#2196F3',
    dark: '#1976D2',
    darker: '#0D47A1',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#F3E5F5',
    light: '#CE93D8',
    main: '#9C27B0',
    dark: '#7B1FA2',
    darker: '#4A148C',
    contrastText: '#FFFFFF',
  },
};

// 在组件中使用
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.palette.primary.main }}>
      Primary color text
    </div>
  );
}
```

### 排版系统

```tsx
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function TypographyExample() {
  const theme = useTheme();
  
  return (
    <div>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="body1">Body text</Typography>
      <Typography variant="caption">Caption text</Typography>
      
      {/* 自定义字体 */}
      <Typography 
        sx={{ 
          fontFamily: theme.typography.fontSecondaryFamily,
          fontWeight: theme.typography.fontWeightSemiBold 
        }}
      >
        Secondary font text
      </Typography>
    </div>
  );
}
```

### 阴影系统

```tsx
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

function ShadowExample() {
  const theme = useTheme();
  
  return (
    <div>
      {/* 使用标准阴影 */}
      <Box sx={{ boxShadow: theme.shadows[4] }}>
        Standard shadow
      </Box>
      
      {/* 使用自定义阴影 */}
      <Box sx={{ boxShadow: theme.customShadows.card }}>
        Card shadow
      </Box>
      
      <Box sx={{ boxShadow: theme.customShadows.primary }}>
        Primary color shadow
      </Box>
      
      <Box sx={{ boxShadow: theme.customShadows.dropdown }}>
        Dropdown shadow
      </Box>
    </div>
  );
}
```

### 自定义组件样式

```tsx
import { styled } from '@mui/material/styles';
import { Button, Card } from '@mui/material';

// 自定义按钮
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightSemiBold,
  boxShadow: theme.customShadows.z8,
  '&:hover': {
    boxShadow: theme.customShadows.z16,
  },
}));

// 自定义卡片
const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.customShadows.card,
  background: theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.customShadows.z20,
    transform: 'translateY(-4px)',
    transition: 'all 0.3s ease',
  },
}));
```

### CSS 变量

```tsx
// 主题配置中的 CSS 变量设置
import { themeConfig } from '@packages/components';

console.log(themeConfig.cssVariables);
// {
//   cssVarPrefix: '',
//   colorSchemeSelector: 'data-color-scheme'
// }

// 在 CSS 中使用
/* styles.css */
.my-component {
  background-color: var(--palette-primary-main);
  color: var(--palette-primary-contrastText);
}

// 在 JavaScript 中使用
function Component() {
  return (
    <div 
      style={{
        backgroundColor: 'var(--palette-background-paper)',
        color: 'var(--palette-text-primary)',
      }}
    >
      Content
    </div>
  );
}
```

### 类名生成

```tsx
import { createClasses } from '@packages/components';

// 生成带前缀的类名
const classes = {
  root: createClasses('my-component__root'),
  header: createClasses('my-component__header'),
  content: createClasses('my-component__content'),
};

// 结果:
// {
//   root: 'minimal__my-component__root',
//   header: 'minimal__my-component__header',
//   content: 'minimal__my-component__content'
// }

function MyComponent() {
  return (
    <div className={classes.root}>
      <header className={classes.header}>Header</header>
      <main className={classes.content}>Content</main>
    </div>
  );
}
```

## 高级用法

### 响应式设计

```tsx
import { useTheme, useMediaQuery } from '@mui/material';
import { Iconify } from '@packages/components';

function ResponsiveComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <div>
      <Iconify 
        icon="solar:menu-bold" 
        width={isMobile ? 20 : 24}
      />
      {!isMobile && (
        <Iconify icon="solar:search-bold" />
      )}
    </div>
  );
}
```

### 主题切换

```tsx
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@packages/components';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const theme = createTheme({
    themeOverrides: {
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

## 安装和使用

```bash
# 在 monorepo 中，这个包会被自动链接
# 在其他应用中使用：
import { 
  Iconify, 
  ThemeProvider, 
  createTheme, 
  themeConfig 
} from '@packages/components';
```

## 类型定义

```tsx
import type { 
  IconifyProps, 
  IconifyName,
  ThemeProviderProps,
  ThemeOptions,
  CustomShadows 
} from '@packages/components';

// 图标组件属性
interface MyIconProps {
  icon: IconifyName;
  size?: number;
}

function MyIcon({ icon, size = 24 }: MyIconProps) {
  return <Iconify icon={icon} width={size} height={size} />;
}
```