# Menu 组件迁移指南

本指南帮助您从旧版本的 Menu 组件迁移到优化后的新版本。

## 🔄 迁移概览

### 主要变化

1. **新增重构版本**: `MenuListRefactored` 组件，保留原有 `MenuList` 组件向后兼容
2. **模块化架构**: 代码按功能分离到不同文件夹
3. **配置化设计**: 支持多种预设配置和自定义配置
4. **Hooks 抽离**: 状态管理逻辑独立为 `useMenuState`
5. **工具函数**: 业务逻辑提取为可复用的工具函数

## 📋 迁移步骤

### 1. 基础迁移（推荐）

**旧版本:**
```tsx
import { MenuList } from "@fastest/components";

<MenuList />
```

**新版本:**
```tsx
import { MenuListRefactored } from "@fastest/components";

<MenuListRefactored />
```

### 2. 配置迁移

如果您之前有自定义配置，现在可以使用更结构化的配置方式：

**新版本配置:**
```tsx
import { MenuListRefactored, type MenuConfig } from "@fastest/components";

const config: MenuConfig = {
  defaultOpenItems: ["section-0.0"],
  defaultSelectedItem: "section-0.1",
  enableRoleBasedAccess: true,
  userRoles: ["admin"],
};

<MenuListRefactored config={config} />
```

### 3. 事件处理迁移

**新版本事件处理:**
```tsx
<MenuListRefactored 
  onItemClick={(path, item) => {
    console.log('菜单项被点击:', { path, item });
    // 您的处理逻辑
  }}
  onItemToggle={(path, isOpen) => {
    console.log('菜单项展开状态:', { path, isOpen });
    // 您的处理逻辑
  }}
/>
```

### 4. 样式定制迁移

**新版本样式变体:**
```tsx
// 收起状态
<MenuListRefactored 
  variant="collapsed" 
  styleVariant="collapsed" 
/>

// 双列布局
<MenuListRefactored 
  variant="double" 
  styleVariant="double" 
/>

// 自定义样式
<MenuListRefactored 
  className="custom-menu"
  style={{ maxWidth: 400 }}
/>
```

## 🆕 新功能使用

### 1. 使用预设变体

```tsx
// 管理员菜单
<MenuListRefactored variant="admin" />

// 访客菜单
<MenuListRefactored variant="guest" />

// 收起菜单
<MenuListRefactored 
  variant="collapsed" 
  styleVariant="collapsed" 
/>
```

### 2. 使用状态管理 Hook

```tsx
import { useMenuState } from "@fastest/components";

function CustomMenu() {
  const {
    openStates,
    selectedItem,
    toggleOpen,
    handleItemClick,
    resetStates,
  } = useMenuState(menuData, config);
  
  return (
    <div>
      <button onClick={resetStates}>重置菜单状态</button>
      {/* 自定义菜单渲染 */}
    </div>
  );
}
```

### 3. 使用工具函数

```tsx
import {
  parseInfoBadge,
  getBadgeColor,
  hasPermission,
} from "@fastest/components";

// 在您的组件中使用
const badge = parseInfoBadge(item.info);
const badgeColor = getBadgeColor(badge);
const canAccess = hasPermission(item.roles, userRoles);
```

## ⚠️ 注意事项

### 1. 向后兼容性

- 原有的 `MenuList` 组件仍然可用，不会影响现有代码
- 建议逐步迁移到 `MenuListRefactored` 以获得更好的功能和性能

### 2. 类型变化

新增了以下类型，如果您使用 TypeScript，可能需要更新类型导入：

```tsx
import type {
  MenuConfig,
  MenuVariant,
  MenuStyleVariantType,
  MenuListProps,
  MenuStyleVariant,
} from "@fastest/components";
```

### 3. 样式文件

如果您有自定义样式覆盖，请检查新的 CSS 类名和结构是否需要调整。

## 🚀 推荐迁移路径

### 阶段 1: 基础替换
1. 将 `MenuList` 替换为 `MenuListRefactored`
2. 测试基本功能是否正常

### 阶段 2: 配置优化
1. 使用新的配置系统替换硬编码的配置
2. 利用预设变体简化代码

### 阶段 3: 功能增强
1. 添加事件处理回调
2. 使用新的样式变体
3. 集成权限控制

### 阶段 4: 深度定制
1. 使用 `useMenuState` Hook 进行自定义状态管理
2. 利用工具函数构建自定义菜单组件

## 📞 获取帮助

如果在迁移过程中遇到问题，可以：

1. 查看 `examples/MenuExamples.tsx` 中的完整示例
2. 参考 `README.md` 中的 API 文档
3. 检查类型定义文件 `types/index.ts`

## 🎯 迁移检查清单

- [ ] 替换组件导入
- [ ] 更新配置方式
- [ ] 添加事件处理
- [ ] 测试所有功能
- [ ] 更新样式（如有需要）
- [ ] 更新类型导入（TypeScript 项目）
- [ ] 测试权限控制（如使用）
- [ ] 验证响应式布局

完成以上检查后，您就成功迁移到了新版本的 Menu 组件！