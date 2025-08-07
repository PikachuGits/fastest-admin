import React, { useEffect } from "react";
import { useMenuStore } from "../context/MenuStoreContext";
import type { MenuInternalProps } from "../types";
import MenuList from "./MenuList";

/**
 * @description MenuInternalComponent 是菜单的核心逻辑组件。
 * 它接收所有 props，通过 `useEffect` hooks 将这些 props 同步到 Zustand store 中，
 * 并最终渲染出负责展示 UI 的 `MenuList` 组件。
 *
 * 使用多个 `useEffect` 的原因和性能考量:
 * 1.  **关注点分离 (Separation of Concerns)**: 每个 `useEffect` 负责一个独立的逻辑关注点（如静态配置、回调、数据同步等）。
 *     这使得代码更清晰、更易于维护和理解。将所有逻辑塞进一个巨大的 `useEffect` 会使其难以阅读和调试。
 * 2.  **性能优化**: 这是 React 中推荐的性能优化实践。通过为每个 effect 提供精确的依赖项数组，
 *     可以确保只有在相关 props 发生变化时，对应的 effect 才会重新运行。如果使用单个 effect，
 *     任何一个 prop 的变化都会导致所有同步逻辑重新执行，从而造成不必要的计算和 store 更新。
 *     因此，这种写法非但不会影响性能，反而是一种提升性能和可维护性的有效手段。
 */
const MenuInternalComponent: React.FC<MenuInternalProps> = ({
  // 核心标识符
  menuId, // 每个菜单实例的唯一ID，用于从 store 注册表中获取正确的 store

  // 数据与配置
  items, // 菜单项的数据源
  variant = "sidebar", // 变体: 'sidebar' 或 'topbar'
  theme = "light", // 主题: 'light' 或 'dark'
  size = "medium", // 尺寸: 'small', 'medium', 'large'
  collapsible = false, // 是否可折叠
  accordion = false, // 是否开启手风琴模式（一次只展开一个）

  // 非受控模式：用于设置初始状态，仅在组件首次渲染时生效
  defaultSelected, // 默认选中的菜单项的 key
  defaultExpanded, // 默认展开的菜单项的 key 数组

  // 受控模式：允许父组件完全控制菜单的状态
  selectedItem, // 当前选中的菜单项的 key
  expandedItems, // 当前展开的菜单项的 key 数组

  // 事件回调
  onItemClick, // 菜单项点击事件
  onItemSelect, // 菜单项选中事件
  onItemToggle, // 菜单项展开/折叠事件

  // 样式与类名
  className,
  style,
}) => {
  const store = useMenuStore(menuId);
  const {
    setData,
    setVariant,
    setTheme,
    setSize,
    setCollapsible,
    setAccordion,
    selectItem,
    setExpandedItems,
    setCallbacks,
  } = store.getState();

  // --- 副作用 (Side Effects) --- //

  // [Effect 1] 同步静态配置
  // 当菜单的外观和行为配置（如 variant, theme 等）发生变化时，更新 store。
  useEffect(() => {
    console.log(collapsible, "useEffect");

    setVariant(variant);
    setTheme(theme);
    setSize(size);
    setCollapsible(collapsible);
    setAccordion(accordion);
  }, [
    variant,
    theme,
    size,
    collapsible,
    accordion,
    setVariant,
    setTheme,
    setSize,
    setCollapsible,
    setAccordion,
  ]);

  // [Effect 2] 同步回调函数
  // 当父组件传递的回调函数发生变化时，更新 store 中的回调引用。
  useEffect(() => {
    setCallbacks({
      onClick: onItemClick,
      onSelect: onItemSelect,
      onToggle: onItemToggle,
    });
  }, [onItemClick, onItemSelect, onItemToggle, setCallbacks]);

  // [Effect 3] 同步菜单数据
  // 当菜单项数据 `items` 发生变化时，更新 store。
  useEffect(() => {
    setData(items);
  }, [items, setData]);

  // [Effect 4] 处理受控模式下的 `selectedItem`
  // 如果 `selectedItem` prop 被定义（即进入受控模式），则它的变化会强制更新 store 中的选中项。
  useEffect(() => {
    if (selectedItem !== undefined) {
      selectItem(selectedItem);
    }
  }, [selectedItem, selectItem]);

  // [Effect 5] 处理受控模式下的 `expandedItems`
  // 如果 `expandedItems` prop 被定义（即进入受控模式），则它的变化会强制更新 store 中的展开项。
  useEffect(() => {
    if (expandedItems !== undefined) {
      setExpandedItems(expandedItems);
    }
  }, [expandedItems, setExpandedItems]);

  // [Effect 6] 处理非受控模式下的默认值
  // 这个 effect 只在组件首次挂载时运行一次（依赖项数组为空 `[]`）。
  // 它检查是否存在默认值（`defaultSelected`, `defaultExpanded`），并且组件当前不处于受控模式，
  // 如果满足条件，则设置初始的选中和展开状态。
  useEffect(() => {
    if (defaultSelected !== undefined && selectedItem === undefined) {
      selectItem(defaultSelected);
    }
    if (defaultExpanded !== undefined && expandedItems === undefined) {
      setExpandedItems(defaultExpanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空依赖数组确保只在挂载时运行一次

  return <MenuList menuId={menuId} className={className} style={style} />;
};

export default MenuInternalComponent;
