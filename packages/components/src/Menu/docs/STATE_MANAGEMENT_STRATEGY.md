# Menu 组件状态管理策略

## 🚨 问题：混合状态管理架构

### 原始问题

之前的实现中存在 **Zustand Store** 和 **Props 传递** 混用的问题：

```tsx
// ❌ 问题架构：混合状态管理
// useMenuItemLogic Hook 中
const store = useMenuStoreContext();
const collapsed = store((state) => state.collapsed); // 从 store 获取

// MenuItem 组件中
<MenuItemActions
  collapsed={collapsed}  // 通过 props 传递给子组件
  badge={badge}
/>

// MenuItemActions 组件中
export const MenuItemActions = ({ collapsed, ... }) => {
  // 通过 props 接收，可能与 store 状态不同步！
}
```

### 问题根因

1. **状态来源混乱**: Store 和 Props 两个数据源
2. **同步延迟**: Props 传递可能比 Store 订阅更新慢
3. **React.memo 缓存**: 可能阻止 props 更新传递
4. **状态不一致**: 子组件收到的可能是过期的 props 值

## ✅ 解决方案：统一状态管理

### 新架构：统一使用 Zustand Store

```tsx
// ✅ 正确架构：统一状态管理
// useMenuItemLogic Hook 中
const store = useMenuStoreContext();
const collapsed = store((state) => state.collapsed); // 从 store 获取

// MenuItem 组件中
<MenuItemActions
  // collapsed={collapsed}  // ❌ 不再通过 props 传递
  badge={badge}
  badgeColor={badgeColor}
  hasSubItems={hasSubItems}
  open={open}
/>;

// MenuItemActions 组件中
export const MenuItemActions = ({ badge, badgeColor, hasSubItems, open }) => {
  // ✅ 直接从 store 订阅，确保实时同步
  const store = useMenuStoreContext();
  const collapsed = store((state) => state.collapsed);

  // 组件会在 collapsed 状态变化时自动重新渲染
};
```

## 🎯 优势分析

### 1. **状态一致性**

```tsx
// ✅ 所有组件都从同一个 store 获取状态
const collapsed = store((state) => state.collapsed);
// 确保状态完全一致，没有传递延迟
```

### 2. **自动响应性**

```tsx
// ✅ Zustand 的订阅机制确保状态变化时组件自动重新渲染
useEffect(() => {
  // 当 store.collapsed 变化时，这个 useEffect 会自动触发
}, [collapsed]);
```

### 3. **减少 Props 传递**

```tsx
// ✅ 减少了 props 的层级传递，降低组件间耦合
interface MenuItemActionsProps {
  // collapsed: boolean;  // ❌ 不再需要
  badge?: number;
  badgeColor: NumberChipColor;
  hasSubItems: boolean;
  open: boolean;
}
```

### 4. **避免 React.memo 问题**

```tsx
// ✅ 即使使用 React.memo，store 订阅仍然会触发重新渲染
export const MenuItemActions = React.memo(
  ({ badge, badgeColor, hasSubItems, open }) => {
    const collapsed = store((state) => state.collapsed); // 直接订阅，绕过 memo 缓存
  }
);
```

## 📊 性能对比

### 原始架构（混合）

```
State Change → Store Update → Hook Update → Props Passing → Component Re-render
     ↓              ↓            ↓             ↓                ↓
   Instant      Instant    May Delay    May Cache        May Skip
```

### 新架构（统一 Store）

```
State Change → Store Update → All Subscribers Update Simultaneously
     ↓              ↓                    ↓
   Instant      Instant              Instant
```

## 🔧 实施细节

### Store 订阅模式

```tsx
// 每个需要 collapsed 状态的组件都这样写：
const store = useMenuStoreContext();
const collapsed = store((state) => state.collapsed);

// Zustand 会自动：
// 1. 跟踪这个组件对 collapsed 的依赖
// 2. 当 collapsed 变化时通知这个组件
// 3. 触发组件重新渲染
```

### 状态隔离

```tsx
// ✅ 每个 Menu 实例都有独立的 store
<MenuStoreProvider>  {/* Menu A 的独立状态 */}
  <MenuInternalComponent {...propsA} />
</MenuStoreProvider>

<MenuStoreProvider>  {/* Menu B 的独立状态 */}
  <MenuInternalComponent {...propsB} />
</MenuStoreProvider>
```

## 🎯 最佳实践

### 1. **组件状态获取原则**

- ✅ **共享状态**: 从 Store 获取 (collapsed, selectedItem, etc.)
- ✅ **局部配置**: 通过 Props 传递 (badge, hasSubItems, etc.)

### 2. **Store 选择器优化**

```tsx
// ✅ 只订阅需要的状态，避免不必要的重新渲染
const collapsed = store((state) => state.collapsed);
const selectedItem = store((state) => state.selectedItem);

// ❌ 避免订阅整个 state
const state = store((state) => state); // 会导致所有状态变化都触发重渲染
```

### 3. **Props vs Store 判断标准**

- **Props**: 静态配置、父组件计算的值、回调函数
- **Store**: 全局状态、跨组件共享的状态、用户交互状态

## 🚀 效果

修复后，当用户切换 `collapsed` 状态时：

1. Store 状态立即更新
2. 所有订阅 `collapsed` 的组件同时更新
3. 不再有状态传递延迟或不一致问题
4. `MenuItemActions` 组件会正确地显示/隐藏

这样就彻底解决了您遇到的"监听的 collapsed 没有检测到变更"的问题！
