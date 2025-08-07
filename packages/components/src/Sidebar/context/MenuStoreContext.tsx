/**
 * 该文件负责创建和管理菜单组件的状态存储（Store），并使用 React Context 将其提供给子组件。
 * 这种设计模式允许多个独立的菜单实例在同一个应用中存在，每个实例都有自己独立的状态。
 */

import React, { createContext, useContext } from 'react';
import { createMenuStore } from '../stores/createMenuStore';
import { useStore } from 'zustand';

// 从 createMenuStore 推断出 store 的类型，避免直接依赖外部类型定义
type MenuStore = ReturnType<typeof createMenuStore>;
type MenuState = ReturnType<MenuStore['getState']>;

/**
 * @description 全局注册表，用于存储所有菜单实例的 store。
 * @key 菜单实例的唯一ID (string)
 * @value 对应ID的Zustand store实例 (MenuStore)
 */
const storeRegistry = new Map<string, MenuStore>();

/**
 * @description 全局注册表，用于存储每个菜单实例对应的React Context。
 * @key 菜单实例的唯一ID (string)
 * @value 对应ID的React Context对象 (React.Context<MenuStore>)
 */
const storeContexts = new Map<string, React.Context<MenuStore>>();

/**
 * @description 菜单状态存储的提供者组件 (Provider)。
 * 它的核心职责是为每个菜单实例创建一个独立的 store 和 Context，
 * 并通过 Context.Provider 将 store 注入到 React 组件树中。
 */
export const MenuStoreProvider: React.FC<{
  id: string; // 每个菜单实例的唯一标识符
  children: React.ReactNode; // 需要访问此 store 的子组件
}> = ({ id, children }) => {
  // 延迟初始化：只有当某个ID的Menu组件首次渲染时，才为其创建和注册store和context。
  // 这避免了不必要的预先创建，并保证了每个菜单实例的状态隔离。
  if (!storeRegistry.has(id)) {
    // 1. 调用 createMenuStore 工厂函数，创建一个新的 Zustand store 实例。
    const store = createMenuStore();
    // 2. 使用唯一ID作为键，将新创建的 store 实例存入全局注册表。
    storeRegistry.set(id, store);
    // 3. 为这个 store 实例创建一个专用的 React Context 对象，并存入 Context 注册表。
    storeContexts.set(id, createContext(store));
  }

  // 从 Context 注册表中获取与当前ID匹配的 Context 对象。
  // '!' 非空断言操作符表示我们确信在此处 context 总是存在的。
  const StoreContext = storeContexts.get(id)!;

  // 渲染 React Context Provider，并将注册表中对应的 store 实例作为 `value` 传入。
  // 这使得组件树中深层的任何子组件都能够通过对应的 hook 访问到这个 store。
  return (
    <StoreContext.Provider value={storeRegistry.get(id)!}>
      {children}
    </StoreContext.Provider>
  );
};

/**
 * @description 一个自定义Hook，用于根据唯一ID从全局注册表中检索特定的菜单 store。
 * 这个 Hook 提供了对 Zustand store 实例的直接访问，允许在 React 组件外部（例如，在辅助函数或事件处理器中）与 store 进行交互。
 *
 * @param id - 目标菜单实例的唯一ID。
 * @returns 返回与该ID关联的 Zustand store 实例 (`StoreApi`)。
 * @throws 如果找不到对应ID的 store，则会抛出一个错误，以防止潜在的运行时错误。
 */
/**
 * @description 一个在 React 组件内部使用的 Hook，用于从 Context 中获取当前菜单的 store。
 * 这个 Hook 依赖于 React 的 Context，因此只能在 `MenuStoreProvider` 的子组件中使用。
 * 
 * @param id - 目标菜单实例的唯一ID。
 * @returns 返回与该ID关联的 Zustand store 实例 (`StoreApi`)。
 * @throws 如果找不到对应的 Context，说明组件不在 `MenuStoreProvider` 内部，会抛出错误。
 */
export const useMenuStore = (id: string): MenuStore => {
  const StoreContext = storeContexts.get(id);
  if (!StoreContext) {
    throw new Error(`未找到ID为 "${id}" 的菜单 Context。请确保该组件是 <MenuStoreProvider> 的子组件。`);
  }
  return useContext(StoreContext);
};

/**
 * @description 一个便捷的 Hook，用于从特定菜单的 store 中订阅并选择状态。
 * 这是在组件中消费 store 状态的主要方式，它会自动处理组件的重新渲染。
 * 
 * @param id - 目标菜单实例的唯一ID。
 * @param selector - 一个函数，用于从 store 状态中选择需要的部分。 `(state: MenuState) => T`
 * @returns 返回 selector 选择的状态。
 */
export const useMenuState = <T,>(id: string, selector: (state: MenuState) => T): T => {
  const store = useMenuStore(id);
  return useStore(store, selector);
};

export const useMenuStoreById = (id: string): MenuStore => {
  const store = storeRegistry.get(id);
  if (!store) {
    // 抛出更详细的错误信息，帮助开发者调试 store 未找到的问题。
    // 这种情况通常发生在 `useMenuStoreById` 被调用时，对应的菜单组件还未渲染，或者ID不正确。
    throw new Error(`未找到ID为 "${id}" 的菜单 store。请确保具有此ID的 <Menu> 组件已经被渲染。`);
  }
  return store;
};