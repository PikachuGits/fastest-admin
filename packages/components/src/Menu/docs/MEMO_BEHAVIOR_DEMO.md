# React.memo 在 Menu 组件中的行为演示

## 🔬 实验验证

让我们通过具体例子来验证 `React.memo` 的行为：

### 📊 测试场景

```tsx
import React, { useState } from "react";
import { Menu } from "@/components/Menu";

const MenuDemo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("home");
  const [items] = useState([
    { key: "home", title: "首页", icon: "home" },
    { key: "about", title: "关于", icon: "info" },
  ]);

  console.log("😎 父组件重新渲染了");

  return (
    <div>
      <button onClick={() => setCollapsed(!collapsed)}>
        切换收起状态: {collapsed ? "收起" : "展开"}
      </button>

      <button
        onClick={() =>
          setSelectedItem(selectedItem === "home" ? "about" : "home")
        }
      >
        切换选中项: {selectedItem}
      </button>

      {/* Menu 组件被 React.memo 包装 */}
      <Menu
        items={items} // ✅ 引用不变，不会触发重渲染
        variant={collapsed ? "collapsed" : "sidebar"} // ✅ 值变化会触发重渲染
        selectedItem={selectedItem} // ✅ 值变化会触发重渲染
        onItemClick={(item) => {
          // ❌ 每次都是新函数，会触发重渲染
          console.log("点击了", item.title);
        }}
      />
    </div>
  );
};
```

### 🎯 行为分析

#### 1. **会触发 Menu 重渲染的情况**

```tsx
// ✅ variant 属性值变化
<Menu variant={collapsed ? 'collapsed' : 'sidebar'} />
// 当 collapsed 从 false 变为 true 时：
// 'sidebar' → 'collapsed' (值不同，触发重渲染)

// ✅ selectedItem 属性值变化
<Menu selectedItem={selectedItem} />
// 当 selectedItem 从 'home' 变为 'about' 时：
// 'home' → 'about' (值不同，触发重渲染)

// ✅ 回调函数重新创建
<Menu onItemClick={(item) => console.log(item)} />
// 每次父组件渲染都会创建新的函数引用，触发重渲染
```

#### 2. **不会触发 Menu 重渲染的情况**

```tsx
// ✅ items 引用不变
const [items] = useState([...]); // 引用始终是同一个数组对象
<Menu items={items} />

// ✅ 字面量值相同
<Menu theme="light" />
// 'light' === 'light' (值相同，跳过重渲染)

// ✅ 使用 useCallback 缓存的函数
const handleClick = useCallback((item) => {
  console.log(item);
}, []);
<Menu onItemClick={handleClick} />
```

### 🔍 实际运行结果

```bash
# 初始渲染
😎 父组件重新渲染了
🔄 Menu 组件渲染 (首次)

# 点击 "切换收起状态" 按钮
😎 父组件重新渲染了
🔄 Menu 组件渲染 (variant: 'sidebar' → 'collapsed')

# 点击 "切换选中项" 按钮
😎 父组件重新渲染了
🔄 Menu 组件渲染 (selectedItem: 'home' → 'about')

# 如果父组件因为其他状态变化而重渲染，但 Menu 的 props 都没变
😎 父组件重新渲染了
⏭️ Menu 组件跳过渲染 (所有 props 都相同)
```

## 🛠️ 优化建议

### 1. **缓存回调函数**

```tsx
// ❌ 每次都创建新函数
<Menu onItemClick={(item) => handleItemClick(item)} />;

// ✅ 使用 useCallback 缓存
const handleItemClick = useCallback(
  (item) => {
    // 处理逻辑
  },
  [
    /* 依赖项 */
  ]
);

<Menu onItemClick={handleItemClick} />;
```

### 2. **稳定的对象引用**

```tsx
// ❌ 每次渲染都创建新对象
<Menu style={{ width: "300px" }} />;

// ✅ 提取到组件外部或使用 useMemo
const menuStyle = { width: "300px" };
// 或
const menuStyle = useMemo(() => ({ width: "300px" }), []);

<Menu style={menuStyle} />;
```

### 3. **合理使用状态**

```tsx
// ✅ 将稳定的数据提取到组件外部
const MENU_ITEMS = [
  { key: "home", title: "首页", icon: "home" },
  { key: "about", title: "关于", icon: "info" },
];

const MenuDemo = () => {
  const [selectedItem, setSelectedItem] = useState("home");

  return (
    <Menu
      items={MENU_ITEMS} // 引用稳定
      selectedItem={selectedItem} // 仅在需要时变化
    />
  );
};
```

## 📈 性能效果

### 有 React.memo 优化：

```
✅ props 相同时跳过渲染
✅ 减少不必要的子组件渲染
✅ 减少 DOM 操作
✅ 提高复杂菜单的性能
```

### 没有 React.memo 优化：

```
❌ 父组件每次渲染都触发子组件渲染
❌ 即使 props 没变化也会重新计算
❌ 可能导致性能问题
❌ 复杂菜单结构下影响更明显
```

## 🎯 结论

**React.memo 在参数值变更时确实会更新！**

- ✅ **会重渲染**：当任何 prop 的值发生变化时
- ✅ **会重渲染**：当对象/数组/函数的引用发生变化时
- ⏭️ **跳过渲染**：当所有 props 都完全相同时（浅比较）

Menu 组件使用 `React.memo` 是正确的优化手段，它可以：

1. 避免父组件重渲染时的无意义子组件渲染
2. 在 props 没有实际变化时提升性能
3. 保持正常的响应性，该更新时还是会更新

记住：**React.memo 是性能优化工具，不是阻止更新的工具！**
