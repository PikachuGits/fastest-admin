import { useMenuStoreById } from '../context/MenuStoreContext';
import { useStore } from 'zustand';

export function useMenuHelpers(menuId: string) {
  const store = useMenuStoreById(menuId);
  
  // ✅ 使用 useStore 进行响应式订阅，而不是 getState()
  const selectItem = useStore(store, (state) => state.selectItem);
  const collapsible = useStore(store, (state) => state.collapsible);
  const selectedItem = useStore(store, (state) => state.selectedItem);
  const setExpandedItems = useStore(store, (state) => state.setExpandedItems);

  return {
    // 状态值（响应式）
    collapsible, // ✅ Sidebar 组件使用 collapsible 而不是 collapsed
    selectedItem,
    
    // 动作函数
    selectItem,
    expandAll: () => setExpandedItems(['all']),
    collapseAll: () => setExpandedItems([]),
    
    // 语义化别名
    collapsed: collapsible, // ✅ 提供 collapsed 别名以保持 API 一致性
    
    // 兼容性方法
    getSelectedItem: () => selectedItem,
  };
}