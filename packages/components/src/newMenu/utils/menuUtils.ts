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
