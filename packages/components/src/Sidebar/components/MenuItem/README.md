# MenuItemGroup 组件

## 概述

`MenuItemGroup` 是一个封装了菜单项组渲染逻辑的可复用组件。它将原本在 `Menu.tsx` 中重复的代码片段抽象成一个独立的组件，提供了更好的代码组织和可维护性。

## 特性

- **递归渲染**: 支持多层级菜单嵌套
- **状态管理**: 智能的展开状态管理
- **性能优化**: 使用 `useMemo` 优化事件处理器
- **类型安全**: 完整的 TypeScript 类型定义
- **可配置**: 灵活的属性配置选项

## 属性接口

```typescript
interface MenuItemGroupProps {
  /** 菜单项列表 */
  items: MenuItemType[];

  /** 是否展开 */
  open: boolean;

  /** 递归层级（可选，用于控制嵌套样式） */
  level?: number;

  /** 菜单项点击回调 */
  onItemClick?: (item: MenuItemType, index: number) => void;

  /** 子菜单展开状态映射 */
  expandedStates?: Record<string, boolean>;

  /** 控制子菜单展开的回调 */
  onToggleSubMenu?: (itemPath: string) => void;
}
```

## 使用示例

### 基本用法

```tsx
import { MenuItemGroup } from "@components/newMenu/components";

const MyMenu = () => {
  const [open, setOpen] = useState(true);
  const [expandedStates, setExpandedStates] = useState({});

  const handleItemClick = (item, index) => {
    console.log("点击了菜单项:", item);
  };

  const handleToggleSubMenu = (itemPath) => {
    setExpandedStates((prev) => ({
      ...prev,
      [itemPath]: !prev[itemPath],
    }));
  };

  return (
    <MenuItemGroup
      items={menuItems}
      open={open}
      onItemClick={handleItemClick}
      expandedStates={expandedStates}
      onToggleSubMenu={handleToggleSubMenu}
    />
  );
};
```

### 在 Menu 组件中的使用

```tsx
// 原来的代码片段
<Collapse in={open} timeout="auto" unmountOnExit>
  <List>
    {value.items.map((item, index) => (
      <Box sx={sxStyled(MenuItemSx)}>
        <MenuItem
          key={index}
          item={item}
          isLast={index === value.items.length - 1}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {item.children?.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </List>
        </Collapse>
      </Box>
    ))}
  </List>
</Collapse>

// 使用 MenuItemGroup 后
<MenuItemGroup
  items={value.items}
  open={open}
  level={0}
  onItemClick={handleItemClick}
  expandedStates={expandedStates}
  onToggleSubMenu={handleToggleSubMenu}
/>
```

## 核心功能

### 1. 递归渲染

组件支持无限层级的菜单嵌套，每个子菜单都会递归调用 `MenuItemGroup` 组件。

### 2. 路径生成

自动为每个菜单项生成唯一的路径标识，格式为：`{level}-{index}-{path || title}`

### 3. 状态管理

- 支持全局展开状态控制
- 支持独立的子菜单展开状态管理
- 智能的状态回退机制

### 4. 性能优化

- 使用 `useMemo` 缓存事件处理器
- 避免不必要的重渲染
- 优化的 key 生成策略

## 文件结构

```
MenuItemGroup/
├── MenuItemGroup.tsx  # 主组件文件
├── index.ts          # 导出文件
└── README.md         # 说明文档
```

## 类型定义

组件使用的类型定义位于 `../../types/index.ts` 中，包括：

- `MenuItem`: 菜单项接口
- `MenuItemGroupProps`: 组件属性接口

## 样式

组件使用 `MenuItemSx` 样式，定义在 `../../styles/Menu.sx.ts` 中。

## 封装带来的优势

1. **代码复用**: 消除了重复的菜单渲染逻辑
2. **可维护性**: 逻辑集中管理，易于修改和调试
3. **可测试性**: 独立组件更容易进行单元测试
4. **类型安全**: 完整的 TypeScript 类型定义
5. **性能优化**: 更好的渲染性能和内存使用
