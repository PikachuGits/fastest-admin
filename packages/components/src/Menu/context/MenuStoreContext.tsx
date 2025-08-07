/**
 * Menu Store Context
 * 菜单状态管理上下文
 *
 * 提供菜单 store 实例的 React Context，实现状态隔离
 * Provides React Context for menu store instances to achieve state isolation
 */

import React, { createContext, useContext, useMemo } from "react";
import {
  createMenuStore,
  type MenuStoreInstance,
} from "../stores/createMenuStore";
import type { MenuState } from "../stores/menuStore";

// ==================== Context 定义 Context Definition ====================

/**
 * 菜单 Store Context
 * Menu Store Context
 */
const MenuStoreContext = createContext<MenuStoreInstance | null>(null);

// ==================== Provider 组件 Provider Component ====================

/**
 * MenuStoreProvider 组件属性接口
 * MenuStoreProvider component props interface
 */
export interface MenuStoreProviderProps {
  /** 子组件 Child components */
  children: React.ReactNode;
  /** 初始状态（可选）Initial state (optional) */
  initialState?: Partial<MenuState>;
  /** 自定义 store 实例（可选）Custom store instance (optional) */
  store?: MenuStoreInstance;
}

/**
 * MenuStoreProvider 组件
 * MenuStoreProvider component
 *
 * 为每个 Menu 实例提供独立的状态管理
 * Provides independent state management for each Menu instance
 *
 * @param props - 组件属性 Component props
 * @returns Provider 组件 Provider component
 */
export const MenuStoreProvider: React.FC<MenuStoreProviderProps> = ({
  children,
  initialState,
  store,
}) => {
  /**
   * 创建或使用传入的 store 实例
   * Create or use the passed store instance
   */
  const storeInstance = useMemo(() => {
    if (store) {
      return store;
    }
    return createMenuStore(initialState);
  }, [store, initialState]);

  return (
    <MenuStoreContext.Provider value={storeInstance}>
      {children}
    </MenuStoreContext.Provider>
  );
};

// ==================== Hook ====================

/**
 * 使用菜单 Store 的 Hook
 * Hook for using menu store
 *
 * 获取当前上下文中的菜单 store 实例
 * Gets the menu store instance from current context
 *
 * @returns Store 实例 Store instance
 * @throws 如果在 Provider 外部使用则抛出错误 Throws error if used outside Provider
 */
export const useMenuStoreContext = (): MenuStoreInstance => {
  const store = useContext(MenuStoreContext);

  if (!store) {
    throw new Error(
      "useMenuStoreContext must be used within a MenuStoreProvider. " +
        "Please wrap your Menu component with MenuStoreProvider."
    );
  }

  return store;
};

/**
 * 可选的菜单 Store Hook
 * Optional menu store hook
 *
 * 获取当前上下文中的菜单 store 实例，如果不存在则返回 null
 * Gets the menu store instance from current context, returns null if not exists
 *
 * @returns Store 实例或 null Store instance or null
 */
export const useOptionalMenuStoreContext = (): MenuStoreInstance | null => {
  return useContext(MenuStoreContext);
};

// ==================== 高阶组件 HOC ====================

/**
 * withMenuStore 高阶组件
 * withMenuStore HOC
 *
 * 为组件自动包装 MenuStoreProvider
 * Automatically wraps component with MenuStoreProvider
 *
 * @param Component - 要包装的组件 Component to wrap
 * @param initialState - 初始状态（可选）Initial state (optional)
 * @returns 包装后的组件 Wrapped component
 */
export const withMenuStore = <P extends object>(
  Component: React.ComponentType<P>,
  initialState?: Partial<MenuState>
) => {
  const WithMenuStoreComponent = (props: P) => (
    <MenuStoreProvider initialState={initialState}>
      <Component {...props} />
    </MenuStoreProvider>
  );

  WithMenuStoreComponent.displayName = `withMenuStore(${
    Component.displayName || Component.name
  })`;

  return WithMenuStoreComponent;
};
