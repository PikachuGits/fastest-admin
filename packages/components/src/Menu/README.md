# Menu 组件模块

## 🚀 简化的菜单组件

**Menu 组件提供简化的API接口，专注于易用性和性能优化！**

### ✨ 特性

- **🎯 简化API**: 直观易用的接口设计
- **⚡ 性能优化**: 使用 React.memo、useMemo、useCallback 等优化技术
- **📦 智能缓存**: 内置缓存机制，避免重复计算和渲染
- **🎨 灵活配置**: 支持多种预设主题和自定义样式
- **🔧 TypeScript**: 完整的类型支持

## 📁 文件结构

```
Menu/
├── README.md                    # 模块说明文档
├── index.tsx                    # 统一导出文件
├── Menu.tsx                     # 主组件
│
├── components/                  # 组件目录
│   └── private/                # 内部组件
│       ├── MenuList/           # 菜单列表组件
│       ├── MenuItem/           # 菜单项组件
│       ├── NumberChip/         # 数字徽章组件
│       └── GroupHeader/        # 分组头部组件
│
├── hooks/                      # 自定义 Hooks
│   ├── useMenuState.ts         # 状态管理（内部使用）
│   └── useMenu.ts              # 简化的状态管理Hook
│
├── utils/                      # 工具函数
│   └── menuHelpers.ts          # 菜单辅助函数
│
├── config/                     # 配置文件
│   └── presets.ts              # 预设配置
│
├── types/                      # 类型定义
│   ├── index.ts                # 内部类型定义
│   └── public.ts               # 公共类型定义
│
├── data/                       # 数据文件
│   └── menu-data.json          # 示例菜单数据
│
└── styles/                     # 样式文件
    ├── index.less              # 样式定义
    └── theme.ts                # 主题配置
```

## 📖 使用方法

### 基础使用

```tsx
import { Menu } from '@/components/Menu';
import type { MenuItem } from '@/components/Menu';

const menuItems: MenuItem[] = [
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
      {
        key: 'user-list',
        title: '用户列表',
        path: '/users/list'
      },
      {
        key: 'user-roles',
        title: '角色管理',
        path: '/users/roles'
      }
    ]
  }
];

const MyMenu = () => {
  return (
    <Menu 
      items={menuItems}
      variant="sidebar"
      theme="light"
      defaultSelected="dashboard"
      onItemClick={(item) => console.log('点击:', item.title)}
    />
  );
};
```

### 高级配置

```tsx
import { Menu, useMenu } from '@/components/Menu';

const AdvancedMenu = () => {
  const {
    selectedItem,
    expandedItems,
    selectItem,
    toggleItem,
    expandAll,
    collapseAll
  } = useMenu({
    items: menuItems,
    defaultSelected: 'dashboard',
    defaultExpanded: ['users'],
    onItemSelect: (item) => {
      console.log('选中:', item.title);
    }
  });

  return (
    <div>
      <div className="menu-controls">
        <button onClick={expandAll}>展开全部</button>
        <button onClick={collapseAll}>折叠全部</button>
        <span>当前选中: {selectedItem?.title}</span>
      </div>
      
      <Menu 
        items={menuItems}
        selectedItem={selectedItem?.key}
        expandedItems={expandedItems}
        onItemClick={(item) => selectItem(item.key)}
        onItemToggle={(key, isOpen) => toggleItem(key, isOpen)}
      />
    </div>
  );
};
```

### 🎨 主题和样式

```tsx
import { Menu } from '@/components/Menu';

// 不同主题
const LightMenu = () => (
  <Menu 
    items={menuItems}
    variant="sidebar"
    theme="light"
    size="medium"
  />
);

const DarkMenu = () => (
  <Menu 
    items={menuItems}
    variant="sidebar"
    theme="dark"
    size="large"
  />
);

// 折叠菜单
const CollapsedMenu = () => (
  <Menu 
    items={menuItems}
    variant="collapsed"
    collapsible={true}
  />
);

// 水平菜单
const HorizontalMenu = () => (
  <Menu 
    items={menuItems}
    variant="horizontal"
    theme="light"
  />
);
```

## ⚡ 性能优化

### 内置优化特性

1. **React.memo**: 组件级别的浅比较优化
2. **useMemo**: 数据转换和计算结果缓存
3. **useCallback**: 事件处理器稳定引用
4. **WeakMap缓存**: 避免重复的数据转换
5. **批量状态更新**: 优化大量菜单项的展开/折叠操作

### 性能最佳实践

```tsx
// ✅ 推荐：使用稳定的数据引用
const menuItems = useMemo(() => [
  { key: 'item1', title: 'Item 1' },
  { key: 'item2', title: 'Item 2' }
], []);

// ✅ 推荐：使用useCallback稳定事件处理器
const handleItemClick = useCallback((item) => {
  // 处理点击事件
}, []);

// ✅ 推荐：避免在render中创建新对象
const menuStyle = useMemo(() => ({
  width: '240px',
  height: '100vh'
}), []);

<Menu 
  items={menuItems}
  onItemClick={handleItemClick}
  style={menuStyle}
/>
```

## 🎨 样式配置

### 预设配置

```tsx
import { Menu } from '@/components/Menu';

// 使用预设配置
<Menu 
  items={menuItems}
  variant="sidebar"     // sidebar | collapsed | horizontal
  theme="light"        // light | dark
  size="medium"        // small | medium | large
/>
```

### 可用变体

- `sidebar` - 侧边栏菜单
- `collapsed` - 折叠菜单
- `horizontal` - 水平菜单

## 📝 类型定义

### 核心类型

```tsx
// 菜单项类型
interface MenuItem {
  key: string;                    // 唯一标识
  title: string;                  // 显示标题
  icon?: string | React.ReactNode; // 图标
  path?: string;                  // 路径
  badge?: string | number;        // 徽章
  roles?: string[];              // 权限角色
  children?: MenuItem[];         // 子菜单
  disabled?: boolean;            // 是否禁用
  hidden?: boolean;              // 是否隐藏
}

// 菜单属性
interface MenuProps {
  items?: MenuItem[];            // 菜单数据
  variant?: 'sidebar' | 'collapsed' | 'horizontal';
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  defaultSelected?: string;
  defaultExpanded?: string[];
  selectedItem?: string;         // 受控选中项
  expandedItems?: string[];      // 受控展开项
  collapsible?: boolean;
  accordion?: boolean;
  onItemClick?: (item: MenuItem, path: string) => void;
  onItemSelect?: (item: MenuItem, path: string) => void;
  onItemToggle?: (key: string, isOpen: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Hook选项
interface UseMenuOptions {
  items?: MenuItem[];
  defaultSelected?: string;
  defaultExpanded?: string[];
  accordion?: boolean;
  onItemSelect?: (item: MenuItem, key: string) => void;
  onItemToggle?: (key: string, isOpen: boolean) => void;
}

// Hook返回值
interface UseMenuReturn {
  selectedItem: MenuItem | null;
  expandedItems: string[];
  selectItem: (key: string) => void;
  toggleItem: (key: string) => void;
  expandItem: (key: string) => void;
  collapseItem: (key: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  reset: () => void;
  isItemSelected: (key: string) => boolean;
  isItemExpanded: (key: string) => boolean;
  getItemByKey: (key: string) => MenuItem | null;
}
```

## 📊 API 总览

### 组件导出

```tsx
import { 
  Menu,           // 主菜单组件
  useMenu         // 菜单状态管理Hook
} from '@/components/Menu';
```

### 类型导出

```tsx
import type { 
  MenuItem,       // 菜单项类型
  MenuProps,      // 菜单属性类型
  UseMenuOptions, // Hook选项类型
  UseMenuReturn,  // Hook返回值类型
  MenuVariant,    // 菜单变体类型
  MenuTheme,      // 主题类型
  MenuSize        // 尺寸类型
} from '@/components/Menu';
```

## 🤝 贡献

在修改代码时，请遵循以下规范：

1. **性能考虑**: 注意缓存和优化策略
2. **文档同步**: 及时更新文档和示例
3. **类型安全**: 保持完整的TypeScript类型定义
4. **测试覆盖**: 确保新功能有对应的测试

## 📄 许可证

请参考项目根目录的许可证文件。