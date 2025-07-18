import { useState, useCallback } from 'react';
import type { NavData, MenuConfig } from '../types';

/**
 * 菜单状态管理 Hook
 * 负责管理菜单的展开/折叠状态和选中状态
 */
export const useMenuState = (data: NavData, config?: MenuConfig) => {
  // 初始化展开状态
  const initializeOpenStates = useCallback((navData: NavData) => {
    const states: Record<string, boolean> = {};

    const processItems = (items: any[], path = "") => {
      items.forEach((item, index) => {
        const itemPath = path ? `${path}.${index}` : `${index}`;

        if (item.children && item.children.length > 0) {
          // 根据配置或默认规则设置展开状态
          const shouldOpen = config?.defaultOpenItems?.includes(itemPath) ||
                           (!config?.defaultOpenItems && (path === "" || item.title === "Level"));
          states[itemPath] = shouldOpen;
          processItems(item.children, itemPath);
        }
      });
    };

    navData.navItems.forEach((section, sectionIndex) => {
      processItems(section.items, `section-${sectionIndex}`);
    });

    return states;
  }, [config]);

  // 查找默认选中项
  const findDefaultSelected = useCallback((navData: NavData): string => {
    if (config?.defaultSelectedItem) {
      return config.defaultSelectedItem;
    }

    // 默认选中逻辑
    for (let sectionIndex = 0; sectionIndex < navData.navItems.length; sectionIndex++) {
      const section = navData.navItems[sectionIndex];
      if (!section?.items) continue;

      for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
        const item = section.items[itemIndex];
        if (!item) continue;

        if (item.title === "Level") {
          return `section-${sectionIndex}.${itemIndex}`;
        }
      }
    }
    return "section-0.0";
  }, [config]);

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    initializeOpenStates(data)
  );
  
  const [selectedItem, setSelectedItem] = useState(() =>
    findDefaultSelected(data)
  );

  const toggleOpen = useCallback((key: string) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleItemClick = useCallback((itemKey: string) => {
    setSelectedItem(itemKey);
  }, []);

  const setOpenState = useCallback((key: string, isOpen: boolean) => {
    setOpenStates((prev) => ({ ...prev, [key]: isOpen }));
  }, []);

  const resetStates = useCallback(() => {
    setOpenStates(initializeOpenStates(data));
    setSelectedItem(findDefaultSelected(data));
  }, [data, initializeOpenStates, findDefaultSelected]);

  return {
    openStates,
    selectedItem,
    toggleOpen,
    handleItemClick,
    setOpenState,
    setSelectedItem,
    resetStates,
  };
};