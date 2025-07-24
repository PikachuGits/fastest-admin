# 布局系统迁移指南

本指南帮助您从应用层的布局系统迁移到 `@fastest/hook` 包中的布局管理功能。

## 迁移概述

### 迁移前（应用层）
```tsx
// apps/admin/src/app/providers/
import { useAppLayout } from '@/app/providers';
```

### 迁移后（共享包）
```tsx
// packages/hook/src/layout/
import { useAppLayout } from '@fastest/hook';
```

## 详细迁移步骤

### 1. 安装依赖

确保您的应用已经安装了 `@fastest/hook` 包：

```bash
# 如果使用 bun
bun add @fastest/hook

# 如果使用 npm
npm install @fastest/hook

# 如果使用 yarn
yarn add @fastest/hook
```

### 2. 更新导入语句

**迁移前：**
```tsx
// ❌ 旧的导入方式
import { useAppLayout, useLayoutConfig } from '@/app/providers';
import type { LayoutConfig } from '@/app/providers/types';
```

**迁移后：**
```tsx
// ✅ 新的导入方式
import { useAppLayout, useLayoutConfig } from '@fastest/hook';
import type { LayoutConfig } from '@fastest/hook';
```

### 3. API 兼容性

好消息！所有的 API 都保持完全兼容，您不需要修改任何使用代码：

```tsx
// 这些代码无需修改，只需要更新导入路径
function MyComponent() {
  const {
    headerHeight,
    sidebarWidth,
    setHeaderHeight,
    toggleSidebar,
    updateLayoutConfig
  } = useAppLayout();

  // 使用方式完全相同
  return (
    <div style={{ marginTop: headerHeight }}>
      {/* 组件内容 */}
    </div>
  );
}
```

### 4. 类型定义迁移

**迁移前：**
```tsx
// ❌ 旧的类型导入
import type { 
  LayoutConfig, 
  ThemeContextProps 
} from '@/app/providers/types';
```

**迁移后：**
```tsx
// ✅ 新的类型导入
import type { 
  LayoutConfig,
  UseAppLayoutReturn,
  UseLayoutConfigReturn
} from '@fastest/hook';

// 注意：ThemeContextProps 仍然在应用层，因为它包含主题相关的逻辑
import type { ThemeContextProps } from '@/app/providers/types';
```

### 5. 主题集成迁移

如果您在 `ThemeProvider` 中使用了布局配置，需要进行以下调整：

**迁移前：**
```tsx
// apps/admin/src/app/providers/ThemeProvider.tsx
import { useLayoutConfig } from './useLayoutConfig';
```

**迁移后：**
```tsx
// apps/admin/src/app/providers/ThemeProvider.tsx
import { useLayoutConfig } from '@fastest/hook';
```

### 6. 独立使用（推荐）

新的布局系统支持独立使用，不依赖主题提供者：

```tsx
// ✅ 可以在任何组件中独立使用
import { useAppLayout } from '@fastest/hook';

function IndependentComponent() {
  const layout = useAppLayout({
    headerHeight: 80,
    sidebarWidth: 300
  });

  return (
    <div style={{
      marginTop: layout.headerHeight,
      marginLeft: layout.contentMarginLeft
    }}>
      独立的布局组件
    </div>
  );
}
```

## 迁移检查清单

- [ ] 安装 `@fastest/hook` 依赖
- [ ] 更新所有布局相关的导入语句
- [ ] 更新类型导入
- [ ] 测试所有使用布局功能的组件
- [ ] 验证主题集成仍然正常工作
- [ ] 运行构建确保没有类型错误
- [ ] 清理旧的布局文件（可选）

## 性能优化建议

### 1. 按需导入

```tsx
// ✅ 推荐：按需导入
import { useAppLayout } from '@fastest/hook';

// ❌ 避免：导入整个包
import * as FastestHook from '@fastest/hook';
```

### 2. 合理使用初始配置

```tsx
// ✅ 推荐：提供合理的初始配置
const layout = useAppLayout({
  headerHeight: 64,
  sidebarWidth: 280
});

// ❌ 避免：频繁的配置更新
// 在组件渲染过程中避免频繁调用 updateLayoutConfig
```

### 3. 使用计算属性

```tsx
// ✅ 推荐：使用提供的计算属性
const { contentMarginLeft, currentSidebarWidth } = useAppLayout();

// ❌ 避免：手动计算
const { sidebarWidth, sidebarCollapsed, sidebarCollapsedWidth } = useAppLayout();
const manualWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;
```

## 故障排除

### 常见问题

1. **类型错误：找不到模块**
   ```
   Module '"@fastest/hook"' has no exported member 'useAppLayout'
   ```
   
   **解决方案：** 确保已正确安装依赖并重启 TypeScript 服务。

2. **运行时错误：Hook 不存在**
   ```
   TypeError: useAppLayout is not a function
   ```
   
   **解决方案：** 检查导入语句是否正确，确保包已正确构建。

3. **样式问题：布局不正确**
   
   **解决方案：** 检查是否正确使用了计算属性，如 `contentMarginLeft`、`currentSidebarWidth` 等。

### 调试技巧

```tsx
// 添加调试信息
function DebugLayout() {
  const layout = useAppLayout();
  
  console.log('Layout Config:', layout.layoutConfig);
  console.log('Computed Values:', {
    currentSidebarWidth: layout.currentSidebarWidth,
    contentMarginLeft: layout.contentMarginLeft,
    contentMarginTop: layout.contentMarginTop
  });
  
  return <div>{/* 组件内容 */}</div>;
}
```

## 回滚计划

如果迁移过程中遇到问题，可以快速回滚：

1. **保留旧文件**：在迁移完成前，不要删除原有的布局文件
2. **分步迁移**：一次迁移一个组件，便于定位问题
3. **版本控制**：使用 Git 分支进行迁移，便于回滚

```bash
# 创建迁移分支
git checkout -b layout-migration

# 如果需要回滚
git checkout main
```

## 后续优化

迁移完成后，您可以考虑以下优化：

1. **清理旧文件**：删除 `apps/admin/src/app/providers` 中的布局相关文件
2. **统一配置**：在应用入口处提供全局的布局配置
3. **主题解耦**：考虑将主题系统也进行类似的抽离
4. **文档更新**：更新项目文档，反映新的架构

---

如果您在迁移过程中遇到任何问题，请参考 [布局系统文档](./README.md) 或提交 Issue。