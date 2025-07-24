# MenuList 组件

## 概述

MenuList 是一个功能丰富的菜单列表组件，支持多层级菜单、展开/折叠、选中状态管理、徽章显示等功能。

## 文件结构

```
MenuList/
├── index.tsx              # 主组件文件
├── index.ts               # 模块导出文件
├── types.ts               # 类型定义
├── utils.ts               # 工具函数
├── useMenuState.ts        # 状态管理 Hook
├── MenuItemRenderer.tsx   # 菜单项渲染组件
├── MenuSectionRenderer.tsx # 菜单分组渲染组件
└── README.md              # 说明文档
```

## 模块说明

### 1. types.ts - 类型定义

定义了组件使用的所有 TypeScript 接口和类型：

- `NavItem`: 菜单项接口
- `NavSection`: 菜单分组接口
- `NavData`: 菜单数据接口
- `BadgeColor`: 徽章颜色类型
- `OpenStatesRecord`: 展开状态记录类型
- `MenuListProps`: 主组件属性接口

### 2. utils.ts - 工具函数

包含菜单相关的工具函数：

- `parseInfoBadge(info)`: 解析徽章数字
- `getBadgeColor(badge)`: 根据徽章数字获取颜色
- `generateItemPath(sectionIndex, itemIndex, childPath?)`: 生成菜单项唯一路径键
- `hasChildren(item)`: 检查菜单项是否有子项

### 3. useMenuState.ts - 状态管理 Hook

自定义 Hook，管理菜单的状态：

- 展开/折叠状态管理
- 选中项状态管理
- 智能初始化默认状态
- 提供状态操作方法

### 4. MenuItemRenderer.tsx - 菜单项渲染组件

负责渲染单个菜单项：

- 支持多层级嵌套
- 处理选中状态
- 处理展开/折叠
- 徽章显示
- 递归渲染子菜单

### 5. MenuSectionRenderer.tsx - 菜单分组渲染组件

负责渲染菜单分组：

- 分组标题显示
- 分组展开/折叠
- 分组内菜单项渲染

### 6. index.tsx - 主组件

主要的 MenuList 组件：

- 整合所有子模块
- 提供统一的组件接口
- 处理数据流和状态传递

## 使用示例

```tsx
import MenuList from './MenuList';
import type { NavData } from './MenuList/types';

const menuData: NavData = {
  navItems: [
    {
      subheader: '主菜单',
      items: [
        {
          title: '首页',
          icon: 'home',
          children: [
            { title: '子页面1' },
            { title: '子页面2' }
          ]
        }
      ]
    }
  ]
};

function App() {
  return (
    <MenuList />
  );
}
```

## 设计优势

### 1. 模块化设计
- 每个文件职责单一，便于维护
- 类型定义独立，提供良好的 TypeScript 支持
- 工具函数可复用

### 2. 可维护性
- 代码结构清晰，易于理解
- 组件拆分合理，便于单独测试
- 详细的注释说明

### 3. 可扩展性
- Hook 设计便于状态逻辑复用
- 组件化设计便于功能扩展
- 类型定义完善，便于功能增强

### 4. 性能优化
- 使用 React.memo 优化渲染性能
- 合理的状态管理避免不必要的重渲染
- 工具函数缓存优化

## 开发建议

1. **添加新功能时**：优先考虑在对应的模块中添加，保持文件职责单一
2. **修改类型时**：在 `types.ts` 中统一管理，确保类型一致性
3. **添加工具函数时**：在 `utils.ts` 中添加，并编写相应的注释
4. **状态逻辑变更时**：在 `useMenuState.ts` 中修改，保持状态管理的集中性
5. **UI 变更时**：在对应的渲染组件中修改，避免影响其他模块