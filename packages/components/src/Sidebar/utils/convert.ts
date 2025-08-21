// ==================== 工具函数 Utility Functions ====================

import type { MenuItem, NavSection, SidebarData, InternalMenuItem } from "../types";

/**
 * 将 JSON 中的 MenuItem 转换为内部使用的 InternalMenuItem 格式
 * Convert MenuItem from JSON to internal InternalMenuItem format
 */
export const convertMenuItemToInternal = (item: MenuItem, parentPath = ""): InternalMenuItem => {
  const key = parentPath ? `${parentPath}-${item.title}` : item.title;
  
  return {
    ...item,
    key,
    label: item.title,
    badge: item.info ? item.info[1] : undefined,
    children: item.children?.map((child, index) => 
      convertMenuItemToInternal(child, `${key}-${index}`)
    ),
  };
};

/**
 * 标准化菜单数据：将各种格式转换为 NavSection[]
 * Normalize menu data: convert various formats to NavSection[]
 */
// 兼容清理后：不再提供多格式归一化，只接受 NavSection[]
export const normalizeMenuData = (data?: SidebarData): NavSection[] => {
  if (!data) return [];
  return data;
};

/**
 * 将标准化的 NavSection[] 转换为扁平的 InternalMenuItem 数组
 * Convert normalized NavSection[] to flat InternalMenuItem array for legacy compatibility
 */
export const convertNavSectionsToMenuItems = (sections: SidebarData): InternalMenuItem[] => {
  const allItems: InternalMenuItem[] = [];
  
  sections.forEach((section, sectionIndex) => {
    // 为每个分组创建一个分组头
    const sectionKey = `section-${sectionIndex}`;
    const sectionHeader: InternalMenuItem = {
      title: section.subheader,
      path: `#${sectionKey}`,
      key: sectionKey,
      label: section.subheader,
      children: section.items.map((item, itemIndex) => 
        convertMenuItemToInternal(item, `${sectionKey}-item-${itemIndex}`)
      ),
    };
    
    allItems.push(sectionHeader);
  });
  
  return allItems;
};
// 不再提供反向转换（仅保留单一数据流：NavSection[] -> InternalMenuItem[]）
  