/**
 * 菜单工具函数
 */

/**
 * 检查菜单项是否包含指定的选中项（递归检查所有子项）
 * @param menuItem 菜单项
 * @param selectedId 选中的菜单项ID
 * @returns 是否包含选中项
 */
export const isMenuItemContainsSelected = (
  menuItem: any,
  selectedId: string | null
): boolean => {
  if (!selectedId || !menuItem) return false;

  // 如果当前项就是选中项
  if (menuItem.id.toString() === selectedId) {
    return true;
  }

  // 递归检查子项
  if (menuItem.children && Array.isArray(menuItem.children)) {
    return menuItem.children.some((child: any) =>
      isMenuItemContainsSelected(child, selectedId)
    );
  }

  return false;
};

/**
 * 检查菜单项是否应该显示选中状态（自身选中或包含选中的子项）
 * @param menuItem 菜单项
 * @param selectedId 选中的菜单项ID
 * @returns 是否应该显示选中状态
 */
export const shouldMenuItemShowSelected = (
  menuItem: any,
  selectedId: string | null
): boolean => {
  return isMenuItemContainsSelected(menuItem, selectedId);
};

/**
 * 检查菜单项是否是直接选中的（不是因为包含子项而选中）
 * @param menuItem 菜单项
 * @param selectedId 选中的菜单项ID
 * @returns 是否直接选中
 */
export const isMenuItemDirectlySelected = (
  menuItem: any,
  selectedId: string | null
): boolean => {
  if (!selectedId || !menuItem) return false;
  return menuItem.id.toString() === selectedId;
};

/**
 * 检查菜单分组是否包含选中项
 * @param menuSection 菜单分组
 * @param selectedId 选中的菜单项ID
 * @returns 是否包含选中项
 */
export const isMenuSectionContainsSelected = (
  menuSection: any,
  selectedId: string | null
): boolean => {
  if (!selectedId || !menuSection || !menuSection.items) return false;

  // 检查分组下的所有菜单项
  return menuSection.items.some((item: any) =>
    isMenuItemContainsSelected(item, selectedId)
  );
};

/**
 * 获取包含指定选中项的所有父级ID（包括分组ID和菜单项ID）
 * @param menuData 完整的菜单数据
 * @param selectedId 选中的菜单项ID
 * @returns 包含选中项的所有父级ID数组
 */
export const getParentIdsForSelectedItem = (
  menuData: any[],
  selectedId: string | null
): string[] => {
  if (!selectedId || !menuData) return [];

  const parentIds: string[] = [];

  // 递归查找父级ID的辅助函数
  const findParentIds = (items: any[], parentId?: string): boolean => {
    for (const item of items) {
      // 如果找到了选中项
      if (item.id.toString() === selectedId) {
        if (parentId) {
          parentIds.push(parentId);
        }
        return true;
      }

      // 如果有子项，递归查找
      if (item.children && Array.isArray(item.children)) {
        if (findParentIds(item.children, item.id.toString())) {
          // 如果在子项中找到了，将当前项ID加入父级ID列表
          if (parentId) {
            parentIds.push(parentId);
          }
          return true;
        }
      }
    }
    return false;
  };

  // 遍历所有菜单分组
  for (const section of menuData) {
    if (findParentIds(section.items, section.id.toString())) {
      // 如果在该分组中找到了选中项，跳出循环
      break;
    }
  }

  return parentIds;
};
