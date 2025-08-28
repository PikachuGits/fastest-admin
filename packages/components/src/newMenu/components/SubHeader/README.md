# SubHeader 组件

Menu 分组标题组件，支持展开/收起状态显示，并根据侧边栏折叠状态自动调整样式和布局。

## 特性

- 🎯 **Zustand 状态管理集成** - 自动响应侧边栏折叠状态
- 🔄 **交互式展开/收起** - 支持平滑动画效果
- 📱 **响应式设计** - 支持移动端适配
- ♿ **可访问性支持** - 完整的 ARIA 属性和键盘导航
- 🎨 **自定义样式** - 支持自定义样式和禁用状态
- 🏷️ **图标支持** - 可选图标显示和箭头指示器

## 安装

```tsx
import { SubHeader } from "@components/newMenu/components";
// 或者
import { SubHeader } from "@components/newMenu";
```

## 基础用法

```tsx
import React, { useState } from "react";
import { SubHeader } from "@components/newMenu/components";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubHeader
      title="Dashboard"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      iconName="dashboard-outline"
    />
  );
}
```

## Props

| 属性名      | 类型         | 默认值  | 描述             |
| ----------- | ------------ | ------- | ---------------- |
| `title`     | `string`     | -       | 标题文本         |
| `onToggle`  | `() => void` | -       | 点击回调函数     |
| `open`      | `boolean`    | `false` | 是否展开         |
| `iconName`  | `string`     | -       | 图标名称（可选） |
| `tabIndex`  | `number`     | `0`     | Tab 索引         |
| `className` | `string`     | -       | 自定义 CSS 类名  |
| `showArrow` | `boolean`    | `true`  | 是否显示箭头图标 |
| `disabled`  | `boolean`    | `false` | 是否禁用         |

## 高级用法

### 带图标和箭头

```tsx
<SubHeader
  title="User Management"
  open={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
  iconName="people-outline"
  showArrow={true}
/>
```

### 禁用状态

```tsx
<SubHeader
  title="Disabled Section"
  open={false}
  onToggle={() => {}}
  iconName="lock-outline"
  disabled={true}
/>
```

### 自定义样式

```tsx
<SubHeader
  title="Custom Styled"
  open={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
  className="my-custom-subheader"
  iconName="color-palette-outline"
/>
```

## 状态管理

组件自动集成了 Zustand store，会根据以下状态自动调整显示：

- `collapsed` - 侧边栏是否折叠
- `isMobile` - 是否为移动设备模式

```tsx
import { useMenuStore } from "@components/newMenu/stores";

function MyComponent() {
  const { collapsed, toggleCollapsed } = useMenuStore();

  return (
    <div>
      <button onClick={toggleCollapsed}>{collapsed ? "展开" : "收起"}</button>
      <SubHeader
        title="Dynamic Layout"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
```

## 主题支持

组件完全支持 MUI 主题系统，所有颜色和动画都会根据当前主题自动调整。

## 可访问性

- 支持键盘导航（Enter 和空格键）
- 完整的 ARIA 属性支持
- 屏幕阅读器友好
- 焦点管理

## 示例

查看 `SubHeader.example.tsx` 了解更多使用示例。
