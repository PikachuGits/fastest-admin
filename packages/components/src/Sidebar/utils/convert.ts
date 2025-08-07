// ==================== 工具函数 Utility Functions ====================

import type { MenuItem, NavData, NavSection, MenuData, InternalMenuItem } from "../types";

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
export const normalizeMenuData = (data: MenuData | InternalMenuItem[]): NavSection[] => {
  if (!data) return [];

  // 如果是 InternalMenuItem 数组（旧格式），需要特殊处理
  if (Array.isArray(data) && data.length > 0 && data[0] && 'key' in data[0]) {
    // 这是旧的 InternalMenuItem[] 格式，需要特殊处理
    const internalItems = data as InternalMenuItem[];
    return [{
      subheader: "菜单",
      items: internalItems.map(item => ({
        title: item.title,
        path: item.path,
        icon: item.icon,
        info: item.badge ? ["badge", String(item.badge)] : undefined,
        roles: item.roles,
        caption: item.caption,
        children: item.children?.map((child) => ({
          title: child.title,
          path: child.path,
          icon: child.icon,
          info: child.info,
          roles: child.roles,
          caption: child.caption,
        })),
      }))
    }];
  }

  // 如果是 NavSection 数组（新的 index.ts 格式）
  if (Array.isArray(data)) {
    return data as NavSection[];
  }

  // 如果是 NavData 对象（包装格式）
  return (data as NavData).navItems;
};

/**
 * 将标准化的 NavSection[] 转换为扁平的 InternalMenuItem 数组
 * Convert normalized NavSection[] to flat InternalMenuItem array for legacy compatibility
 */
export const convertNavSectionsToMenuItems = (sections: NavSection[]): InternalMenuItem[] => {
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

/**
 * 反向转换：将简化的 MenuItem 数组转换为标准的 NavData 格式
 * Reverse conversion: Convert simplified MenuItem array to standard NavData format
 */
export const convertMenuItemsToNavData = (items: InternalMenuItem[], defaultSubheader = "Menu"): NavData => {
  return {
    navItems: [
      {
        subheader: defaultSubheader,
        items: items.map(item => ({
          title: item.title,
          path: item.path,
          icon: item.icon,
          info: item.info,
          roles: item.roles,
          caption: item.caption,
          children: item.children?.map(child => ({
            title: child.title,
            path: child.path,
            icon: child.icon,
            info: child.info,
            roles: child.roles,
            caption: child.caption,
          })),
        })),
      },
    ],
  };
};
  