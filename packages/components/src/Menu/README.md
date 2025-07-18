# Menu 组件

重构后的菜单组件系统，支持多级导航、数字标记、多种变体配置和基于 JSON 配置的数据驱动设计。

## 🚀 优化亮点

- ✅ **模块化架构**: 清晰的文件夹结构，便于维护和扩展
- ✅ **多变体支持**: 支持收起状态、双列布局、网格布局等多种显示模式
- ✅ **配置化设计**: 通过配置文件轻松切换不同的菜单行为
- ✅ **Hooks 抽离**: 状态管理逻辑独立，便于复用和测试
- ✅ **工具函数**: 业务逻辑与UI逻辑分离，提高代码可读性
- ✅ **权限控制**: 内置角色权限管理
- ✅ **TypeScript**: 完整的类型定义，开发体验更佳

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

## 📁 文件结构

```
Menu/
├── components/          # 组件文件
│   ├── GroupHeader/     # 分组标题组件
│   ├── MenuItem/        # 菜单项组件
│   ├── MenuList/        # 菜单列表组件
│   │   ├── index.tsx    # 原始版本
│   │   └── MenuListRefactored.tsx  # 重构版本
│   └── NumberChip/      # 数字标记组件
├── config/              # 配置文件
│   └── menuVariants.ts  # 菜单变体配置
├── data/                # 数据文件
│   └── menu-data.json   # 菜单数据
├── examples/            # 使用示例
│   └── MenuExamples.tsx # 示例组件
├── hooks/               # 自定义Hooks
│   └── useMenuState.ts  # 菜单状态管理
├── styles/              # 样式文件
│   └── index.less       # 样式定义
├── types/               # 类型定义
│   └── index.ts         # 所有类型
├── utils/               # 工具函数
│   └── menuHelpers.ts   # 菜单相关工具
└── index.tsx            # 主入口文件
```

## 🎯 快速开始

### 基础使用

```tsx
import { MenuListRefactored } from "@fastest/components";

// 默认菜单
<MenuListRefactored />

// 收起状态菜单
<MenuListRefactored 
  variant="collapsed" 
  styleVariant="collapsed" 
/>

// 双列布局菜单
<MenuListRefactored 
  variant="double" 
  styleVariant="double" 
/>
```

### 自定义配置

```tsx
import { MenuListRefactored, type MenuConfig } from "@fastest/components";

const customConfig: MenuConfig = {
  defaultOpenItems: ["section-0.0"],
  defaultSelectedItem: "section-0.1",
  enableRoleBasedAccess: true,
  userRoles: ["admin"],
};

<MenuListRefactored 
  config={customConfig}
  onItemClick={(path, item) => console.log('Clicked:', path, item)}
  onItemToggle={(path, isOpen) => console.log('Toggled:', path, isOpen)}
/>
```

### 使用Hooks

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
  
  // 自定义菜单逻辑
}
```

## 📋 API 文档

### MenuListRefactored Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `data` | `NavData` | `menuData` | 菜单数据 |
| `config` | `MenuConfig` | - | 菜单配置 |
| `variant` | `MenuVariant` | `'default'` | 功能变体 |
| `styleVariant` | `MenuStyleVariantType` | `'standard'` | 样式变体 |
| `onItemClick` | `(path: string, item: NavItem) => void` | - | 菜单项点击回调 |
| `onItemToggle` | `(path: string, isOpen: boolean) => void` | - | 菜单项展开回调 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

### 菜单变体 (MenuVariant)

- `'default'`: 默认配置
- `'collapsed'`: 收起状态配置
- `'double'`: 双列布局配置
- `'admin'`: 管理员配置
- `'guest'`: 访客配置

### 样式变体 (MenuStyleVariantType)

- `'standard'`: 标准单列样式 (360px)
- `'collapsed'`: 收起样式 (64px)
- `'double'`: 双列网格样式 (720px)
- `'grid'`: 网格布局样式 (800px)

## 🛠️ 工具函数

```tsx
import {
  parseInfoBadge,
  getBadgeColor,
  parseIcon,
  hasPermission,
  findMenuItem,
} from "@fastest/components";

// 解析数字标记
const badge = parseInfoBadge(["info", "+5"]); // 5

// 获取标记颜色
const color = getBadgeColor(3); // "success"

// 解析图标
const icon = parseIcon("icon.home"); // "solar:home-angle-bold-duotone"

// 权限检查
const canAccess = hasPermission(["admin"], ["admin", "user"]); // true

// 查找菜单项
const found = findMenuItem(items, item => item.title === "Dashboard");
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
- ✅ 多种显示变体
- ✅ 权限控制
- ✅ 配置化设计

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

Menu/
├── components/           # 组件文件夹
│   ├── GroupHeader/      # 分组标题组件
│   │   ├── index.ts
│   │   └── index.tsx
│   ├── MenuItem/         # 菜单项组件
│   │   ├── index.ts
│   │   └── index.tsx
│   ├── MenuList/         # 主菜单容器组件
│   │   ├── index.ts
│   │   └── index.tsx
│   └── NumberChip/       # 数字标记组件
│       ├── index.ts
│       └── index.tsx
├── data/                 # 数据文件
│   └── menu-data.json
├── styles/               # 样式文件
│   └── index.less
├── types/                # 类型定义
│   └── index.ts
├── index.tsx             # 主入口文件
└── README.md             # 文档