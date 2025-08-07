# MenuItem 组件重构说明

# MenuItem Component Refactoring Documentation

## 🎯 重构目标 Refactoring Goals

原始 MenuItem 组件存在以下问题：

- 代码结构混乱，单一组件承担过多职责
- 状态逻辑复杂，难以维护和测试
- 样式逻辑与业务逻辑耦合
- 缺乏性能优化
- 无障碍性支持不足

The original MenuItem component had the following issues:

- Messy code structure with a single component handling too many responsibilities
- Complex state logic that's hard to maintain and test
- Coupling between style logic and business logic
- Lack of performance optimization
- Insufficient accessibility support

## 🏗️ 重构架构 Refactored Architecture

### 1. 自定义 Hooks Custom Hooks

#### `useMenuItemLogic`

- **职责**: 处理菜单项的业务逻辑
- **功能**: 状态计算、事件处理、图标解析、徽章处理
- **优势**: 逻辑复用、易于测试

**Responsibility**: Handle menu item business logic
**Features**: State calculation, event handling, icon parsing, badge processing
**Benefits**: Logic reuse, easy to test

#### `useMenuItemStyles`

- **职责**: 计算菜单项的样式
- **功能**: 根据状态计算图标、文本、容器样式
- **优势**: 样式逻辑分离、性能优化

**Responsibility**: Calculate menu item styles
**Features**: Calculate icon, text, and container styles based on state
**Benefits**: Style logic separation, performance optimization

#### ~~`useMenuItemSelector`~~ (已移除 Removed)

- ~~**职责**: 优化状态选择~~
- ~~**功能**: 精确的状态选择，减少不必要的重渲染~~
- ~~**优势**: 性能提升、渲染优化~~
- **原因**: 导致无限循环，已用直接状态访问替代

~~**Responsibility**: Optimize state selection~~
~~**Features**: Precise state selection, reduce unnecessary re-renders~~
~~**Benefits**: Performance improvement, render optimization~~
**Reason**: Caused infinite loops, replaced with direct state access

#### `useMenuItemAccessibility`

- **职责**: 无障碍性支持
- **功能**: ARIA 属性管理、键盘导航
- **优势**: 完整的无障碍性支持、符合 WAI-ARIA 标准

**Responsibility**: Accessibility support
**Features**: ARIA attributes management, keyboard navigation
**Benefits**: Complete accessibility support, WAI-ARIA compliant

### 2. 子组件拆分 Sub-component Breakdown

#### `MenuItemIcon`

- **职责**: 渲染菜单项图标
- **特点**: 独立组件、支持自定义样式
- **优化**: React.memo 包装

**Responsibility**: Render menu item icon
**Features**: Independent component, custom style support
**Optimization**: React.memo wrapped

#### `MenuItemContent`

- **职责**: 渲染菜单项文本内容
- **特点**: 主标题和副标题支持、响应式布局
- **优化**: React.memo 包装

**Responsibility**: Render menu item text content
**Features**: Primary and secondary title support, responsive layout
**Optimization**: React.memo wrapped

#### `MenuItemActions`

- **职责**: 渲染右侧操作区域
- **特点**: 徽章和箭头组件、条件渲染
- **优化**: React.memo 包装

**Responsibility**: Render right action area
**Features**: Badge and arrow components, conditional rendering
**Optimization**: React.memo wrapped

## 🚀 性能优化 Performance Optimizations

### 1. 组件记忆化 Component Memoization

- 所有子组件使用 `React.memo` 包装
- 主组件使用 `React.memo` 优化重渲染

All sub-components are wrapped with `React.memo`
Main component uses `React.memo` to optimize re-renders

### 2. 状态选择优化 State Selection Optimization

- 使用精确的状态选择器
- 浅比较函数避免不必要的更新

Uses precise state selectors
Shallow comparison functions to avoid unnecessary updates

### 3. 计算缓存 Computation Caching

- 使用 `useMemo` 缓存复杂计算
- 使用 `useCallback` 缓存事件处理器

Uses `useMemo` to cache complex calculations
Uses `useCallback` to cache event handlers

## ♿ 无障碍性改进 Accessibility Improvements

### 1. ARIA 属性 ARIA Attributes

- `role="menuitem"` - 明确组件角色
- `aria-expanded` - 展开状态
- `aria-selected` - 选中状态
- `aria-disabled` - 禁用状态
- `aria-label` - 完整描述

### 2. 键盘导航 Keyboard Navigation

- **Enter/Space**: 激活菜单项
- **ArrowRight**: 展开子菜单
- **ArrowLeft**: 折叠子菜单
- **Escape**: 折叠子菜单

### 3. 焦点管理 Focus Management

- 适当的 `tabIndex` 设置
- 禁用项目的焦点管理

## 📁 文件结构 File Structure

```
MenuItem/
├── index.tsx                 # 主组件 Main component
├── MenuItemIcon.tsx         # 图标子组件 Icon sub-component
├── MenuItemContent.tsx      # 内容子组件 Content sub-component
├── MenuItemActions.tsx      # 操作子组件 Actions sub-component
└── README.md               # 文档 Documentation

hooks/
├── useMenuItemLogic.ts      # 业务逻辑 Hook
├── useMenuItemStyles.ts     # 样式计算 Hook
├── useMenuItemSelector.ts   # 状态选择 Hook
├── useMenuItemAccessibility.ts # 无障碍性 Hook
└── index.ts                # 统一导出 Unified export
```

## 🔄 使用方式 Usage

重构后的组件保持了与原组件相同的 API，无需修改现有调用代码：

The refactored component maintains the same API as the original, no need to modify existing calling code:

```tsx
<MenuItem
  item={menuItem}
  itemPath="section-0.1"
  level={0}
  open={false}
  onToggle={() => {}}
  onClick={() => {}}
  disabled={false}
/>
```

## ✅ 重构收益 Refactoring Benefits

1. **可维护性** - 代码结构清晰，职责分离
2. **可测试性** - 逻辑分离，易于单元测试
3. **性能** - 减少重渲染，优化计算
4. **无障碍性** - 完整的无障碍性支持
5. **可扩展性** - 模块化设计，易于扩展新功能

6. **Maintainability** - Clear code structure, separation of concerns
7. **Testability** - Logic separation, easy unit testing
8. **Performance** - Reduced re-renders, optimized calculations
9. **Accessibility** - Complete accessibility support
10. **Extensibility** - Modular design, easy to extend new features
