import type { IconifyJSON } from '@iconify/react';

import { addCollection } from '@iconify/react';

import allIcons from './icon-sets';

// ----------------------------------------------------------------------

/**
 * 图标名称类型，基于 icon-sets 中定义的所有图标键
 */
export type IconifyName = keyof typeof allIcons;

/**
 * 图标集配置接口
 */
interface IconSetConfig extends IconifyJSON {
  prefix: string;
  width: number;
  height: number;
}

export const iconSets = Object.entries(allIcons).reduce((acc, [key, value]) => {
  const parts = key.split(':');
  const prefix = parts[0];
  const iconName = parts[1];

  // 验证 prefix 和 iconName 是否存在
  if (!prefix || !iconName) {
    console.warn(`Invalid icon key format: ${key}. Expected format: 'prefix:iconName'`);
    return acc;
  }

  const existingPrefix = acc.find(item => item.prefix === prefix);

  if (existingPrefix) {
    existingPrefix.icons[iconName] = value;
  } else {
    acc.push({
      prefix,
      icons: {
        [iconName]: value,
      },
    } as IconifyJSON);
  }

  return acc;
}, [] as IconifyJSON[]);

/**
 * 所有可用的图标名称列表
 */
export const allIconNames = Object.keys(allIcons) as IconifyName[];

// ----------------------------------------------------------------------

/**
 * 标记图标是否已经注册的状态
 */
let areIconsRegistered = false;

/**
 * 注册所有图标集到 Iconify
 * 
 * 该函数会将所有图标集注册到 Iconify 中，确保图标可以正常显示。
 * 使用单例模式，避免重复注册。
 * 
 * @throws {Error} 当图标注册失败时抛出错误
 * 
 * @example
 * ```typescript
 * import { registerIcons } from './register-icons';
 * 
 * // 注册所有图标
 * registerIcons();
 * ```
 */
export function registerIcons() {
  if (areIconsRegistered) {
    return;
  }

  try {
    for (const iconSet of iconSets) {
      const iconSetConfig = {
        ...iconSet,
        width: iconSet.prefix === 'carbon' ? 32 : 24,
        height: iconSet.prefix === 'carbon' ? 32 : 24,
      };

      addCollection(iconSetConfig);
    }

    areIconsRegistered = true;
    console.log(`Successfully registered ${iconSets.length} icon sets`);
  } catch (error) {
    console.error('Failed to register icons:', error);
    throw error;
  }
}
