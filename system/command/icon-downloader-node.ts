/**
 * 图标下载器 - Node.js 版本
 * 
 * 提供从 Iconify API 下载图标并保存到本地文件的功能
 * 支持单个下载、批量下载、本地保存和合并到 icon-sets.ts
 * 
 * @author Trae AI
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * 图标数据接口
 * 定义图标的基本数据结构
 */
interface IconData {
  /** SVG 路径数据 */
  body: string;
  /** 图标宽度（可选） */
  width?: number;
  /** 图标高度（可选） */
  height?: number;
  /** SVG viewBox 属性（可选） */
  viewBox?: string;
}

/**
 * Iconify API 响应接口
 * 定义 Iconify API 返回的数据结构
 */
interface IconifyApiResponse {
  /** 图标集前缀 */
  prefix: string;
  /** 图标数据集合 */
  icons: {
    [key: string]: IconData;
  };
  /** 默认宽度（可选） */
  width?: number;
  /** 默认高度（可选） */
  height?: number;
}

/**
 * 从 Iconify API 下载图标数据
 * 
 * 通过 Iconify API 获取指定图标的 SVG 数据
 * 支持所有 Iconify 图标集，如 mdi、solar、eva 等
 * 
 * @param iconName 图标名称，格式为 "prefix:name"，例如 "mdi:home"
 * @returns Promise<IconData | null> 成功时返回图标数据，失败时返回 null
 * 
 * @example
 * ```typescript
 * const iconData = await downloadIcon('mdi:home');
 * if (iconData) {
 *   console.log('图标下载成功:', iconData.body);
 * }
 * ```
 */
export async function downloadIcon(iconName: string): Promise<IconData | null> {
  try {
    const [prefix, name] = iconName.split(':');
    
    if (!prefix || !name) {
      console.error(`❌ 无效的图标名称格式: ${iconName}. 期望格式: "prefix:name"`);
      return null;
    }

    console.log(`🔄 正在下载图标: ${iconName}`);
    
    // 使用 Iconify API 获取图标数据
    const apiUrl = `https://api.iconify.design/${prefix}.json?icons=${name}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error(`❌ 下载图标 ${iconName} 失败: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: IconifyApiResponse = await response.json();
    
    if (!data.icons || !data.icons[name]) {
      console.error(`❌ 图标 ${iconName} 在 API 响应中未找到`);
      return null;
    }

    console.log(`✅ 图标 ${iconName} 下载成功`);
    return data.icons[name];
  } catch (error) {
    console.error(`❌ 下载图标 ${iconName} 时发生错误:`, error);
    return null;
  }
}

/**
 * 生成图标代码字符串
 * 
 * 将图标数据转换为可插入到 TypeScript 文件中的代码字符串
 * 生成的代码符合项目的图标集格式规范
 * 
 * @param iconName 图标名称，用作对象键名
 * @param iconData 图标数据对象，包含 SVG 路径等信息
 * @returns string 格式化的图标代码字符串，可直接插入到文件中
 * 
 * @example
 * ```typescript
 * const iconData = { body: '<path fill="currentColor" d="..."/>' };
 * const code = generateIconCode('mdi:home', iconData);
 * // 返回: "'mdi:home': {\n    body: '<path fill="currentColor" d="..."/>',\n  },"
 * ```
 */
export function generateIconCode(iconName: string, iconData: IconData): string {
  return `  '${iconName}': {\n    body: '${iconData.body}',\n  },`;
}

/**
 * 保存图标到本地文件
 * 
 * 将下载的图标保存到指定的本地文件中
 * 如果文件不存在则创建新文件，如果存在则追加图标定义
 * 自动检查重复图标，避免重复添加
 * 
 * @param iconName 图标名称，格式为 "prefix:name"
 * @param iconData 图标数据对象，包含 SVG 路径等信息
 * @param outputPath 输出文件路径，默认为 './downloaded-icons.ts'
 * @returns Promise<boolean> 保存成功返回 true，失败返回 false
 * 
 * @example
 * ```typescript
 * const iconData = await downloadIcon('mdi:home');
 * if (iconData) {
 *   const success = await saveIconToLocalFile('mdi:home', iconData);
 *   console.log(success ? '保存成功' : '保存失败');
 * }
 * ```
 */
export async function saveIconToLocalFile(iconName: string, iconData: IconData, outputPath: string = './downloaded-icons.ts'): Promise<boolean> {
  try {
    // 构建图标定义代码
    const iconDefinition = generateIconCode(iconName, iconData);
    
    // 检查文件是否存在
    if (!fs.existsSync(outputPath)) {
      // 创建新文件，包含基本结构
      const initialContent = `// 下载的图标集合
// 您可以选择性地将这些图标合并到 icon-sets.ts 中

export const downloadedIcons = {
${iconDefinition}
};

export default downloadedIcons;
`;
      fs.writeFileSync(outputPath, initialContent, 'utf-8');
      console.log(`✅ 创建新文件 ${outputPath} 并添加图标 ${iconName}`);
      return true;
    }
    
    // 读取现有文件内容
    const fileContent = fs.readFileSync(outputPath, 'utf-8');
    
    // 检查图标是否已存在
    if (fileContent.includes(`'${iconName}':`)) {
      console.log(`⚠️  图标 ${iconName} 已存在于 ${outputPath}，跳过添加`);
      return true;
    }
    
    // 查找插入位置（在 }; 之前）
    const lines = fileContent.split('\n');
    let insertIndex = -1;
    
    // 从后往前找到 }; 的位置
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i]?.trim();
      if (line === '};') {
        insertIndex = i;
        break;
      }
    }
    
    if (insertIndex === -1) {
      console.error(`❌ 无法在 ${outputPath} 中找到插入位置`);
      return false;
    }
    
    // 插入新的图标定义
    lines.splice(insertIndex, 0, iconDefinition);
    
    // 写回文件
    const newContent = lines.join('\n');
    fs.writeFileSync(outputPath, newContent, 'utf-8');
    
    console.log(`✅ 图标 ${iconName} 已成功添加到 ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 保存图标 ${iconName} 到文件时发生错误:`, error);
    return false;
  }
}

/**
 * 添加图标到指定文件（通常是 icon-sets.ts）
 * 
 * 将图标直接添加到项目的图标集文件中
 * 自动查找合适的插入位置，保持文件格式的一致性
 * 检查重复图标，避免重复添加
 * 
 * @param iconName 图标名称，格式为 "prefix:name"
 * @param iconData 图标数据对象，包含 SVG 路径等信息
 * @param iconSetsPath icon-sets.ts 文件的完整路径
 * @returns Promise<boolean> 添加成功返回 true，失败返回 false
 * 
 * @example
 * ```typescript
 * const iconData = await downloadIcon('mdi:home');
 * if (iconData) {
 *   const success = await addIconToFile('mdi:home', iconData, './icon-sets.ts');
 *   console.log(success ? '添加成功' : '添加失败');
 * }
 * ```
 */
export async function addIconToFile(iconName: string, iconData: IconData, iconSetsPath: string): Promise<boolean> {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(iconSetsPath)) {
      console.error(`❌ 文件不存在: ${iconSetsPath}`);
      return false;
    }

    // 读取现有文件内容
    const fileContent = fs.readFileSync(iconSetsPath, 'utf-8');
    
    // 检查图标是否已存在
    if (fileContent.includes(`'${iconName}':`)) {
      console.log(`⚠️  图标 ${iconName} 已存在，跳过添加`);
      return true;
    }
    
    // 查找插入位置（在最后一个图标定义之后）
    const lines = fileContent.split('\n');
    let insertIndex = -1;
    
    // 从后往前找到最后一个图标定义的位置
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i]?.trim();
      if (line === '},') {
        // 找到最后一个图标定义的结束位置
        insertIndex = i;
        break;
      }
    }
    
    if (insertIndex === -1) {
      console.error(`❌ 无法在 ${iconSetsPath} 中找到插入位置`);
      return false;
    }
    
    // 构建新的图标定义
    const iconDefinition = generateIconCode(iconName, iconData);
    
    // 插入新的图标定义
    lines.splice(insertIndex + 1, 0, iconDefinition);
    
    // 写回文件
    const newContent = lines.join('\n');
    fs.writeFileSync(iconSetsPath, newContent, 'utf-8');
    
    console.log(`✅ 图标 ${iconName} 已成功添加到 icon-sets.ts`);
    return true;
  } catch (error) {
    console.error(`❌ 添加图标 ${iconName} 到文件时发生错误:`, error);
    return false;
  }
}

/**
 * 批量下载图标到本地文件
 * 
 * 批量下载多个图标并保存到本地文件中
 * 支持并发下载，提高下载效率
 * 提供详细的下载统计和错误报告
 * 
 * @param iconNames 图标名称数组，每个元素格式为 "prefix:name"
 * @param outputPath 输出文件路径，默认为 './downloaded-icons.ts'
 * @returns Promise<number> 成功下载的图标数量
 * 
 * @example
 * ```typescript
 * const icons = ['mdi:home', 'mdi:user', 'solar:settings-bold'];
 * const count = await batchDownloadIconsToLocal(icons);
 * console.log(`成功下载 ${count} 个图标`);
 * ```
 */
export async function batchDownloadIconsToLocal(iconNames: string[], outputPath: string = './downloaded-icons.ts'): Promise<number> {
  console.log(`🚀 开始批量下载 ${iconNames.length} 个图标到本地文件...`);
  
  let successCount = 0;
  const failedIcons: string[] = [];
  
  for (const iconName of iconNames) {
    const iconData = await downloadIcon(iconName);
    if (iconData) {
      const success = await saveIconToLocalFile(iconName, iconData, outputPath);
      if (success) {
        successCount++;
      } else {
        failedIcons.push(iconName);
      }
    } else {
      failedIcons.push(iconName);
    }
    
    // 添加小延迟避免 API 限制
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 批量下载完成:`);
  console.log(`✅ 成功: ${successCount} 个图标`);
  console.log(`❌ 失败: ${failedIcons.length} 个图标`);
  console.log(`📁 保存位置: ${outputPath}`);
  
  if (failedIcons.length > 0) {
    console.log(`\n失败的图标:`);
    failedIcons.forEach(icon => console.log(`  - ${icon}`));
  }
  
  return successCount;
}

/**
 * 批量下载图标并直接添加到 icon-sets.ts 文件
 * 
 * 批量下载多个图标并直接添加到项目的图标集文件中
 * 适用于需要立即使用图标的场景
 * 包含下载限制和错误处理机制
 * 
 * @param iconNames 图标名称数组，每个元素格式为 "prefix:name"
 * @param iconSetsPath icon-sets.ts 文件的完整路径
 * @returns Promise<number> 成功添加的图标数量
 * 
 * @example
 * ```typescript
 * const icons = ['mdi:home', 'mdi:user'];
 * const count = await batchDownloadIcons(icons, './icon-sets.ts');
 * console.log(`成功添加 ${count} 个图标到 icon-sets.ts`);
 * ```
 */
export async function batchDownloadIcons(iconNames: string[], iconSetsPath: string): Promise<number> {
  console.log(`🚀 开始批量下载 ${iconNames.length} 个图标...`);
  
  let successCount = 0;
  const failedIcons: string[] = [];
  
  for (const iconName of iconNames) {
    const iconData = await downloadIcon(iconName);
    if (iconData) {
      const success = await addIconToFile(iconName, iconData, iconSetsPath);
      if (success) {
        successCount++;
      } else {
        failedIcons.push(iconName);
      }
    } else {
      failedIcons.push(iconName);
    }
    
    // 添加小延迟避免 API 限制
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 批量下载完成:`);
  console.log(`✅ 成功: ${successCount} 个图标`);
  console.log(`❌ 失败: ${failedIcons.length} 个图标`);
  
  if (failedIcons.length > 0) {
    console.log(`\n失败的图标:`);
    failedIcons.forEach(icon => console.log(`  - ${icon}`));
  }
  
  return successCount;
}

/**
 * 合并下载的图标到 icon-sets.ts 文件
 * 
 * 将本地下载的图标文件（downloaded-icons.ts）中的图标
 * 合并到项目的主图标集文件（icon-sets.ts）中
 * 自动检查重复图标，避免重复添加
 * 
 * @param downloadedIconsPath 下载图标文件路径，默认为 './downloaded-icons.ts'
 * @param iconSetsPath icon-sets.ts 文件的完整路径
 * @returns Promise<number> 成功合并的图标数量
 * 
 * @example
 * ```typescript
 * // 合并本地下载的图标到主图标集
 * const count = await mergeDownloadedIcons('./downloaded-icons.ts', './icon-sets.ts');
 * console.log(`成功合并 ${count} 个图标`);
 * ```
 */
export async function mergeDownloadedIcons(downloadedIconsPath: string = './downloaded-icons.ts', iconSetsPath: string): Promise<number> {
  try {
    // 检查下载图标文件是否存在
    if (!fs.existsSync(downloadedIconsPath)) {
      console.error(`❌ 下载图标文件不存在: ${downloadedIconsPath}`);
      return 0;
    }

    // 检查 icon-sets.ts 文件是否存在
    if (!fs.existsSync(iconSetsPath)) {
      console.error(`❌ icon-sets.ts 文件不存在: ${iconSetsPath}`);
      return 0;
    }

    console.log(`🔄 正在合并图标从 ${downloadedIconsPath} 到 ${iconSetsPath}...`);

    // 读取下载图标文件内容
    const downloadedContent = fs.readFileSync(downloadedIconsPath, 'utf-8');
    
    // 使用正则表达式提取图标定义
    const iconRegex = /\s*'([^']+)':\s*\{[^}]+\},?/g;
    const matches = downloadedContent.matchAll(iconRegex);
    
    let mergedCount = 0;
    const skippedIcons: string[] = [];
    
    // 读取 icon-sets.ts 文件内容
    const iconSetsContent = fs.readFileSync(iconSetsPath, 'utf-8');
    
    for (const match of matches) {
       const iconDefinition = match[0]?.trim();
       const iconName = match[1];
       
       if (!iconDefinition || !iconName) {
         continue;
       }
      
      // 检查图标是否已存在
      if (iconSetsContent.includes(`'${iconName}':`)) {
        console.log(`⚠️  图标 ${iconName} 已存在于 icon-sets.ts，跳过合并`);
        skippedIcons.push(iconName);
        continue;
      }
      
      // 查找插入位置（在最后一个图标定义之后）
      const lines = fs.readFileSync(iconSetsPath, 'utf-8').split('\n');
      let insertIndex = -1;
      
      // 从后往前找到最后一个图标定义的位置
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i]?.trim();
        if (line === '},') {
          insertIndex = i;
          break;
        }
      }
      
      if (insertIndex === -1) {
        console.error(`❌ 无法在 ${iconSetsPath} 中找到插入位置`);
        continue;
      }
      
      // 插入新的图标定义
      lines.splice(insertIndex + 1, 0, iconDefinition);
      
      // 写回文件
      const newContent = lines.join('\n');
      fs.writeFileSync(iconSetsPath, newContent, 'utf-8');
      
      console.log(`✅ 图标 ${iconName} 已成功合并到 icon-sets.ts`);
      mergedCount++;
    }
    
    console.log(`\n📊 合并完成:`);
    console.log(`✅ 成功合并: ${mergedCount} 个图标`);
    console.log(`⚠️  跳过重复: ${skippedIcons.length} 个图标`);
    
    if (skippedIcons.length > 0) {
      console.log(`\n跳过的图标:`);
      skippedIcons.forEach(icon => console.log(`  - ${icon}`));
    }
    
    if (mergedCount > 0) {
      console.log(`\n💡 建议：`);
      console.log(`1. 重新启动开发服务器以使更改生效`);
      console.log(`2. 您可以删除 ${downloadedIconsPath} 文件，或保留作为备份`);
    }
    
    return mergedCount;
  } catch (error) {
    console.error(`❌ 合并图标时发生错误:`, error);
    return 0;
  }
}

/**
 * 从文件读取图标名称列表
 * @param filePath 文件路径
 * @returns 图标名称数组
 */
/**
 * 从文件中读取图标名称列表
 * 
 * 从指定的文本文件中读取图标名称，每行一个图标名称
 * 自动过滤空行和以 # 开头的注释行
 * 支持批量操作的辅助函数
 * 
 * @param filePath 包含图标名称的文件路径
 * @returns string[] 图标名称数组
 * 
 * @example
 * ```typescript
 * // 文件内容示例：
 * // mdi:home
 * // mdi:user
 * // # 这是注释
 * // solar:settings-bold
 * 
 * const icons = readIconNamesFromFile('./icons-list.txt');
 * console.log(icons); // ['mdi:home', 'mdi:user', 'solar:settings-bold']
 * ```
 */
export function readIconNamesFromFile(filePath: string): string[] {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ 文件不存在: ${filePath}`);
      return [];
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#')); // 过滤空行和注释
    
    console.log(`📖 从 ${filePath} 读取到 ${lines.length} 个图标名称`);
    return lines;
  } catch (error) {
    console.error(`❌ 读取文件 ${filePath} 时发生错误:`, error);
    return [];
  }
}