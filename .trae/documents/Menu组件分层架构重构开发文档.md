# Menu组件分层架构重构开发文档

## 1. 项目概述

本文档旨在指导Menu组件从当前复杂的多组件架构重构为分层但简化的架构，在保持所有现有功能的前提下，大幅简化组件的使用方式和学习成本。

**重构目标：**
- 保持现有功能100%兼容
- 简化组件调用接口
- 降低使用者学习成本
- 提升开发体验和维护性

## 2. 当前架构分析

### 2.1 现有组件结构

```
Menu/
├── components/
│   ├── MenuList/           # 主菜单列表组件
│   ├── MenuItem/           # 单个菜单项组件
│   ├── NumberChip/         # 数字徽章组件
│   └── GroupHeader/        # 分组头部组件
├── hooks/
│   └── useMenuState.ts     # 菜单状态管理Hook
├── utils/
│   └── menuHelpers.ts      # 菜单工具函数
├── config/
│   └── menuVariants.ts     # 菜单变体配置
├── types/
│   └── index.ts            # 类型定义
├── data/
│   └── menu-data.json      # 菜单数据
└── styles/
    └── index.less          # 样式文件
```

### 2.2 当前问题分析

**复杂性问题：**
- 导出项过多（20+个导出项）
- 组件职责重叠（MenuList、MenuItem、MenuSectionRenderer等）
- 配置项过于细化（MenuConfig、MenuStyleVariant等）
- 状态管理暴露给使用者

**使用难度：**
- 需要了解多个组件的配合使用
- 配置选项过多，学习成本高
- 类型定义复杂，IDE提示不友好

## 3. 新架构设计

### 3.1 分层架构原则

**三层架构设计：**
1. **表现层（Presentation Layer）** - 简化的组件接口
2. **逻辑层（Logic Layer）** - 内部状态管理和业务逻辑
3. **数据层（Data Layer）** - 数据处理和工具函数

### 3.2 新组件结构

```
Menu/
├── index.tsx               # 统一导出（简化）
├── Menu.tsx                 # 主组件（新增）
├── MenuAdvanced.tsx         # 高级组件（可选）
├── hooks/
│   ├── useMenu.ts          # 简化的公共Hook
│   └── internal/           # 内部Hook（不导出）
│       └── useMenuState.ts
├── components/
│   └── internal/           # 内部组件（不导出）
│       ├── MenuList/
│       ├── MenuItem/
│       └── NumberChip/
├── utils/
│   └── internal/           # 内部工具（不导出）
├── types/
│   ├── public.ts           # 公共类型
│   └── internal.ts         # 内部类型
└── config/
    └── presets.ts          # 预设配置
```

### 3.3 新接口设计

#### 主组件接口

```typescript
// 简化的主组件Props
interface MenuProps {
  // 核心数据
  items: MenuItem[];
  
  // 简化配置
  variant?: 'sidebar' | 'horizontal' | 'collapsed';
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  
  // 行为配置
  defaultSelected?: string;
  defaultExpanded?: string[];
  collapsible?: boolean;
  accordion?: boolean;
  
  // 事件回调
  onItemClick?: (item: MenuItem, path: string) => void;
  onItemSelect?: (item: MenuItem, path: string) => void;
  onToggle?: (collapsed: boolean) => void;
  
  // 样式定制
  className?: string;
  style?: React.CSSProperties;
}

// 简化的菜单项类型
interface MenuItem {
  key: string;
  title: string;
  icon?: string | React.ReactNode;
  path?: string;
  badge?: string | number;
  children?: MenuItem[];
  disabled?: boolean;
  hidden?: boolean;
  roles?: string[];
}

// 高级Hook返回类型
interface UseMenuReturn {
  selectedItem: string | null;
  expandedItems: string[];
  selectItem: (key: string) => void;
  toggleItem: (key: string) => void;
  expandItem: (key: string) => void;
  collapseItem: (key: string) => void;
  reset: () => void;
}
```

## 4. 重构实施步骤

### 4.1 第一阶段：创建新接口层

**目标：** 创建简化的公共接口，不影响现有代码

**任务清单：**
- [ ] 创建 `Menu.tsx` 主组件
- [ ] 创建 `types/public.ts` 简化类型定义
- [ ] 创建 `hooks/useMenu.ts` 简化Hook
- [ ] 创建 `config/presets.ts` 预设配置

**实施细节：**

```typescript
// Menu.tsx - 新的主组件
import React from 'react';
import { MenuList } from './components/MenuList';
import { convertToInternalFormat, getPresetConfig } from './utils/internal';
import type { MenuProps } from './types/public';

export const Menu: React.FC<MenuProps> = (props) => {
  // 将简化的props转换为内部格式
  const internalProps = convertToInternalFormat(props);
  const config = getPresetConfig(props.variant);
  
  // 使用现有的MenuList组件
  return (
    <MenuList
      {...internalProps}
      config={config}
      className={props.className}
      style={props.style}
    />
  );
};
```

### 4.2 第二阶段：内部重构

**目标：** 重构内部实现，优化性能和维护性

**任务清单：**
- [ ] 将现有组件移至 `components/internal/`
- [ ] 优化内部组件的props传递
- [ ] 简化内部状态管理逻辑
- [ ] 统一样式系统

### 4.3 第三阶段：向后兼容

**目标：** 提供平滑的迁移路径

**任务清单：**
- [ ] 创建兼容层适配器
- [ ] 添加废弃警告
- [ ] 更新文档和示例
- [ ] 提供迁移工具

## 5. 新旧接口对比

### 5.1 使用方式对比

**旧版本使用方式：**
```typescript
import { 
  MenuList, 
  useMenuState, 
  getMenuConfig, 
  getMenuStyle,
  type MenuListProps,
  type MenuConfig,
  type MenuStyleVariant
} from '@/components/Menu';

const MyMenu = () => {
  const { openStates, selectedItem, toggleOpen, handleItemClick } = useMenuState(
    menuData,
    {
      defaultOpenItems: ['section-0.0'],
      defaultSelectedItem: 'section-0.0',
      enableRoleBasedAccess: true,
      userRoles: ['admin']
    }
  );
  
  const config = getMenuConfig('admin');
  const style = getMenuStyle('standard');
  
  return (
    <MenuList
      data={menuData}
      config={config}
      variant="admin"
      styleVariant="standard"
      onItemClick={(path, item) => handleItemClick(path)}
      onItemToggle={(path, isOpen) => toggleOpen(path)}
    />
  );
};
```

**新版本使用方式：**
```typescript
import { Menu } from '@/components/Menu';

const MyMenu = () => {
  return (
    <Menu
      items={menuItems}
      variant="sidebar"
      theme="light"
      defaultSelected="dashboard"
      defaultExpanded={['admin']}
      onItemClick={(item, path) => {
        console.log('Clicked:', item.title, path);
      }}
    />
  );
};
```

### 5.2 配置复杂度对比

| 方面 | 旧版本 | 新版本 | 改进 |
|------|--------|--------|---------|
| 导出项数量 | 20+ | 3-5 | 减少80% |
| 必需配置项 | 5-8个 | 1-2个 | 减少70% |
| 类型定义 | 15+ | 5-8 | 减少60% |
| 学习成本 | 高 | 低 | 显著降低 |

## 6. 迁移指南

### 6.1 渐进式迁移策略

**阶段1：并行使用**
- 新旧接口同时存在
- 新项目使用新接口
- 旧项目保持不变

**阶段2：逐步迁移**
- 提供自动迁移工具
- 添加废弃警告
- 更新文档和示例

**阶段3：完全切换**
- 移除旧接口
- 清理冗余代码
- 优化包体积

### 6.2 迁移映射表

| 旧版本 | 新版本 | 说明 |
|--------|--------|---------|
| `MenuList` | `Menu` | 主组件重命名 |
| `useMenuState` | `useMenu` | Hook简化 |
| `MenuConfig.variant` | `MenuProps.variant` | 配置简化 |
| `MenuStyleVariant` | `MenuProps.theme/size` | 样式配置简化 |
| `onItemClick(path, item)` | `onItemClick(item, path)` | 参数顺序调整 |

### 6.3 自动迁移工具

```bash
# 安装迁移工具
npm install -g @your-org/menu-migration-tool

# 运行迁移
menu-migrate --src ./src --dry-run
menu-migrate --src ./src --apply
```

## 7. 使用示例

### 7.1 基础使用

```typescript
import { Menu } from '@/components/Menu';

const BasicMenu = () => {
  const menuItems = [
    {
      key: 'dashboard',
      title: '仪表板',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      key: 'users',
      title: '用户管理',
      icon: 'users',
      children: [
        { key: 'user-list', title: '用户列表', path: '/users' },
        { key: 'user-roles', title: '角色管理', path: '/users/roles' }
      ]
    }
  ];
  
  return (
    <Menu
      items={menuItems}
      variant="sidebar"
      onItemClick={(item, path) => {
        if (item.path) {
          window.location.href = item.path;
        }
      }}
    />
  );
};
```

### 7.2 高级使用

```typescript
import { Menu, useMenu } from '@/components/Menu';

const AdvancedMenu = () => {
  const { selectedItem, selectItem, expandedItems, toggleItem } = useMenu({
    defaultSelected: 'dashboard',
    defaultExpanded: ['users']
  });
  
  return (
    <Menu
      items={menuItems}
      variant="sidebar"
      theme="dark"
      size="large"
      collapsible
      accordion
      selectedItem={selectedItem}
      expandedItems={expandedItems}
      onItemSelect={selectItem}
      onItemToggle={toggleItem}
    />
  );
};
```

### 7.3 自定义主题

```typescript
const ThemedMenu = () => {
  return (
    <Menu
      items={menuItems}
      variant="sidebar"
      theme="light"
      style={{
        '--menu-bg-color': '#f5f5f5',
        '--menu-text-color': '#333',
        '--menu-hover-bg': '#e0e0e0'
      } as React.CSSProperties}
      className="custom-menu"
    />
  );
};
```

## 8. 开发指南

### 8.1 开发环境设置

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev

# 运行测试
bun run test

# 构建组件
bun run build
```

### 8.2 代码规范

**文件命名：**
- 组件文件使用PascalCase：`Menu.tsx`
- Hook文件使用camelCase：`useMenu.ts`
- 工具文件使用camelCase：`menuHelpers.ts`

**导出规范：**
- 公共接口从 `index.tsx` 导出
- 内部模块不对外导出
- 类型定义统一管理

**注释规范：**
- 所有公共接口必须有JSDoc注释
- 复杂逻辑需要行内注释
- 中英文双语注释

### 8.3 测试策略

**单元测试：**
- 组件渲染测试
- Hook功能测试
- 工具函数测试

**集成测试：**
- 组件交互测试
- 状态管理测试
- 事件处理测试

**E2E测试：**
- 完整用户流程测试
- 跨浏览器兼容性测试

## 9. 性能优化

### 9.1 渲染优化

- 使用React.memo优化组件重渲染
- 实现虚拟滚动支持大量菜单项
- 懒加载子菜单内容

### 9.2 包体积优化

- Tree-shaking支持
- 按需加载样式
- 移除未使用的代码

### 9.3 运行时优化

- 缓存计算结果
- 优化事件处理
- 减少DOM操作

## 10. 发布计划

### 10.1 版本规划

- **v2.0.0-alpha** - 新接口预览版
- **v2.0.0-beta** - 功能完整测试版
- **v2.0.0** - 正式发布版
- **v2.1.0** - 移除旧接口

### 10.2 发布检查清单

- [ ] 所有测试通过
- [ ] 文档更新完成
- [ ] 示例代码验证
- [ ] 性能基准测试
- [ ] 兼容性测试
- [ ] 安全审计

## 11. 总结

通过分层架构重构，Menu组件将实现：

**用户体验提升：**
- 学习成本降低80%
- 配置复杂度减少70%
- 开发效率提升50%

**技术债务清理：**
- 代码结构更清晰
- 维护成本降低
- 扩展性增强

**向后兼容保证：**
- 渐进式迁移
- 自动化工具支持
- 详细迁移指南

这个重构方案在保持现有功能完整性的同时，大幅提升了组件的易用性和开发体验，为后续的功能扩展和维护奠定了坚实的基础。