# Menu 组件

重构后的菜单组件系统，支持多级导航、数字标记和基于 JSON 配置的数据驱动设计。

## 组件结构

### MenuList

主菜单容器组件，负责渲染整个菜单结构。

```tsx
import { MenuList } from "@fastest/components";

<MenuList />;
```

### MenuItem

单个菜单项组件，支持图标、文本、数字标记和子菜单。

```tsx
import { MenuItem } from "@fastest/components";

<MenuItem
  icon="solar:home-angle-bold-duotone"
  primary="首页"
  secondary="描述文本"
  level={0}
  selected={false}
  hasSubItems={false}
  numberBadge={3}
  badgeColor="success"
/>;
```

### NumberChip

数字标记组件，用于显示菜单项的计数信息。

```tsx
import { NumberChip } from "@fastest/components";

<NumberChip number={5} color="primary" />;
```

### GroupHeader

分组标题组件，用于显示菜单分组的标题。

```tsx
import { GroupHeader } from "@fastest/components";

<GroupHeader title="TRAVEL" />;
```

## JSON 数据格式

菜单数据使用标准的 JSON 格式定义：

```json
{
  "navItems": [
    {
      "subheader": "Marketing",
      "items": [
        {
          "title": "Landing",
          "path": "#landing",
          "icon": "icon.landing",
          "info": ["info.landing", "+2"],
          "roles": ["admin"],
          "caption": "Display only admin role"
        }
      ]
    }
  ]
}
```

### 字段说明

- `title`: 菜单项标题
- `path`: 路径
- `icon`: 图标键（需要在 iconMap 中定义）
- `info`: 信息数组 [描述, 数字标记]
- `roles`: 权限角色数组
- `caption`: 副标题/描述
- `children`: 子菜单项数组

## 图标映射

在 `List.tsx` 中定义了图标映射：

```typescript
const iconMap: Record<string, string> = {
  "icon.landing": "solar:home-angle-bold-duotone",
  "icon.services": "solar:settings-bold-duotone",
  "icon.blog": "solar:pen-bold",
  // ...
};
```

## 类型定义

所有相关类型都在 `types.ts` 中定义：

```typescript
import type { NavItem, NavData, MenuConfig } from "@fastest/components";
```

## 特性

- ✅ 多级嵌套菜单
- ✅ 数字标记支持
- ✅ 选中状态管理
- ✅ 展开/折叠状态
- ✅ 基于 JSON 的数据驱动
- ✅ TypeScript 类型安全
- ✅ 响应式设计
- ✅ 主题适配

## 使用示例

```tsx
import { MenuList, type NavData } from "@fastest/components";

function App() {
  return (
    <div>
      <MenuList />
    </div>
  );
}
```

## 自定义配置

如果需要使用自定义的菜单数据，可以修改 `menu-data.json` 文件或传入自定义配置。
