# Menu 组件模块

## 📁 文件结构重新规划

经过重新规划，Menu 模块现在采用更清晰的模块化架构：

```
Menu/
├── README.md                    # 模块说明文档
├── index.tsx                    # 统一导出文件
├── MIGRATION.md                 # 迁移指南
│
├── components/                  # 组件目录
│   ├── MenuList/               # 菜单列表组件
│   │   ├── index.tsx           # 主组件
│   │   ├── MenuItemRenderer.tsx # 菜单项渲染器
│   │   └── MenuSectionRenderer.tsx # 菜单分组渲染器
│   ├── MenuItem/               # 菜单项组件
│   │   └── index.tsx
│   ├── NumberChip/             # 数字徽章组件
│   │   └── index.tsx
│   └── GroupHeader/            # 分组头部组件
│       └── index.tsx
│
├── hooks/                      # 自定义 Hooks
│   └── useMenuState.ts         # 菜单状态管理
│
├── utils/                      # 工具函数
│   └── menuHelpers.ts          # 菜单辅助函数
│
├── config/                     # 配置文件
│   └── menuVariants.ts         # 菜单变体配置
│
├── types/                      # 类型定义
│   └── index.ts                # 统一类型导出
│
├── data/                       # 数据文件
│   └── menu-data.json          # 菜单数据
│
├── styles/                     # 样式文件
│   └── index.less              # 样式定义
│

```

## 🔧 主要改进

### 1. 类型定义统一化
- 将所有类型定义统一到 `types/index.ts`
- 添加了详细的 JSDoc 注释（中英文双语）
- 新增了 `OpenStatesRecord`、`MenuVariant` 等类型

### 2. 工具函数优化
- 重构 `utils/menuHelpers.ts`，添加了 `hasChildren` 函数
- 所有函数都有详细的注释和示例
- 改进了类型安全性

### 3. 状态管理增强
- `useMenuState` Hook 支持更多配置选项
- 添加了完整的 JSDoc 文档
- 改进了状态初始化逻辑

### 4. 组件模块化
- 每个组件都有清晰的职责分工
- 添加了详细的组件注释
- 改进了导入路径的一致性

### 5. 代码注释规范
- 所有文件都添加了文件头注释
- 函数和组件都有详细的 JSDoc 注释
- 采用中英文双语注释，提高可读性

## 📖 使用方法

### 基础使用

```tsx
import { MenuList, useMenuState } from '@/components/Menu';
import type { NavData } from '@/components/Menu';

const MyMenu = () => {
  return (
    <MenuList 
      data={menuData}
      config={{
        variant: 'standard',
        allowMultipleOpen: true
      }}
    />
  );
};
```

### 自定义菜单状态

```tsx
import { useMenuState, MenuItem } from '@/components/Menu';

const CustomMenu = ({ data }: { data: NavData }) => {
  const {
    openStates,
    selectedItem,
    toggleOpen,
    handleItemClick
  } = useMenuState(data);

  // 自定义渲染逻辑
  return (
    <div>
      {/* 自定义菜单渲染 */}
    </div>
  );
};
```

### 工具函数使用

```tsx
import { 
  parseInfoBadge, 
  getBadgeColor, 
  hasChildren,
  findMenuItem 
} from '@/components/Menu';

// 解析徽章信息
const badge = parseInfoBadge('5');
const color = getBadgeColor(badge);

// 检查是否有子项
const hasSubItems = hasChildren(menuItem);

// 查找菜单项
const foundItem = findMenuItem(menuData, 'item-path');
```

## 🎨 样式配置

### 菜单变体

```tsx
import { getMenuConfig, getMenuStyle } from '@/components/Menu';

// 获取不同变体的配置
const config = getMenuConfig('collapsed');
const style = getMenuStyle('doubleColumn');
```

### 可用变体

- `standard` - 标准菜单
- `collapsed` - 折叠菜单
- `doubleColumn` - 双列菜单
- `grid` - 网格菜单

## 🔄 迁移指南

如果你正在从旧版本迁移，请参考 `MIGRATION.md` 文件获取详细的迁移指南。

## 📝 类型定义

所有类型定义都在 `types/index.ts` 中，包括：

- `NavItem` - 导航项
- `NavSection` - 导航分组
- `NavData` - 导航数据
- `MenuConfig` - 菜单配置
- `MenuListProps` - 菜单列表属性
- 等等...

## 🤝 贡献

在修改代码时，请遵循以下规范：

1. 保持代码注释的中英文双语格式
2. 为新增的函数和组件添加 JSDoc 注释
3. 确保类型定义的完整性
4. 遵循现有的文件组织结构

## 📄 许可证

请参考项目根目录的许可证文件。