# 🎨 统一主题系统演示页面

这个目录包含了完整的统一主题系统测试和演示页面，展示了 MUI 和 UnoCSS 的完美融合。

## 📁 文件结构

```
demo/
├── index.tsx           # 演示页面入口和导航
├── theme-test.tsx      # 完整的主题系统测试页面
└── README.md          # 说明文档
```

## 🚀 快速开始

### 1. 访问演示页面

在你的路由配置中添加以下路由：

```tsx
// 在你的路由配置文件中
import DemoIndexPage from '@/pages/demo';
import ThemeTestPage from '@/pages/demo/theme-test';

const routes = [
  {
    path: '/demo',
    element: <DemoIndexPage />
  },
  {
    path: '/demo/theme-test',
    element: <ThemeTestPage />
  }
];
```

### 2. 导航到演示页面

- 访问 `/demo` 查看所有演示页面
- 访问 `/demo/theme-test` 直接进入主题测试页面

## 🎯 主要功能

### 🎨 颜色系统测试
- **主色系展示**: 展示 primary、secondary 等主要颜色
- **语义色系**: success、warning、error、info 等状态颜色
- **UnoCSS 原子类**: 展示所有可用的颜色原子类
- **MUI 组件**: 验证 MUI 组件的颜色主题

### 🧩 组件样式测试
- **表单组件**: 输入框、按钮等表单元素的统一样式
- **布局组件**: flex、grid 等布局工具类
- **卡片样式**: 不同变体的卡片样式展示
- **混合使用**: MUI 组件与 UnoCSS 类名的完美结合

### 📐 布局系统测试
- **间距系统**: 统一的间距标准展示
- **响应式断点**: 不同屏幕尺寸的适配
- **布局配置**: 头部、侧边栏等布局参数

### 🔧 迁移工具测试
- **迁移示例**: 展示如何从旧主题迁移
- **检查清单**: 迁移过程中需要注意的事项
- **兼容性验证**: 确保新旧系统的兼容性

## 🛠️ 技术特性

### 统一设计令牌
```tsx
// 所有颜色、间距、字体都基于统一的设计令牌
const designTokens = {
  colors: {
    primary: {
      light: '#42a5f5',
      main: '#1976d2',
      dark: '#1565c0'
    }
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  }
};
```

### 双向兼容
```tsx
// MUI 组件
<Button color="primary" variant="contained">
  MUI 按钮
</Button>

// UnoCSS 类名
<button className="btn-primary">
  UnoCSS 按钮
</button>
```

### 主题切换
```tsx
// 支持亮色/暗色主题切换
const [isDarkMode, setIsDarkMode] = useState(false);

const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
  // 主题会自动应用到所有组件
};
```

## 📱 响应式设计

所有演示页面都完全响应式，在不同设备上都有良好的显示效果：

- **手机** (xs: 0px+): 单列布局，紧凑间距
- **平板** (md: 900px+): 双列布局，适中间距
- **桌面** (lg: 1200px+): 多列布局，宽松间距

## 🎨 样式系统

### UnoCSS 快捷类
```css
/* 按钮样式 */
.btn-primary { @apply px-4 py-2 bg-primary-main text-white rounded hover:bg-primary-dark transition-colors; }
.btn-success { @apply px-4 py-2 bg-success-main text-white rounded hover:bg-success-dark transition-colors; }

/* 卡片样式 */
.card { @apply p-4 bg-white rounded-lg shadow-sm border border-gray-200; }
.card-hover { @apply card hover:shadow-md transition-shadow; }

/* 布局样式 */
.flex-center { @apply flex items-center justify-center; }
.flex-between { @apply flex items-center justify-between; }
```

### MUI 主题配置
```tsx
const muiTheme = createTheme({
  palette: {
    primary: {
      light: designTokens.colors.primary.light,
      main: designTokens.colors.primary.main,
      dark: designTokens.colors.primary.dark,
    },
  },
  spacing: (factor: number) => designTokens.spacing[factor] || factor * 8,
  breakpoints: {
    values: designTokens.breakpoints,
  },
});
```

## 🔍 测试功能

### 实时测试日志
演示页面包含实时测试日志功能，可以：
- 记录所有测试操作
- 显示测试结果和时间戳
- 清空测试历史
- 验证功能正常性

### 交互式测试
- **主题切换**: 实时切换亮色/暗色主题
- **颜色测试**: 点击测试各种颜色系统
- **组件测试**: 验证表单、布局等组件
- **响应式测试**: 调整浏览器窗口大小查看效果

## 🚀 使用建议

1. **开发时**: 使用这些演示页面作为参考，确保新组件符合设计规范
2. **测试时**: 在不同设备和主题下测试你的组件
3. **迁移时**: 参考迁移工具和示例进行平滑过渡
4. **培训时**: 用作团队培训材料，展示最佳实践

## 📚 相关文档

- [统一主题指南](../../../packages/components/src/theme/UNIFIED_THEME_GUIDE.md)
- [设计令牌](../../../packages/components/src/theme/design-tokens.ts)
- [UnoCSS 配置](../../../packages/components/src/theme/unocss-theme.ts)
- [迁移工具](../../../packages/components/src/theme/migration-helper.ts)

## 🤝 贡献

如果你发现问题或有改进建议，欢迎：
1. 提交 Issue
2. 创建 Pull Request
3. 参与讨论和优化

---

💡 **提示**: 这个演示系统展示了现代前端开发中主题管理的最佳实践，结合了 MUI 的组件生态和 UnoCSS 的原子化 CSS 优势。