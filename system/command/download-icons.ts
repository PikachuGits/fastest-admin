#!/usr/bin/env bun

/**
 * 图标下载命令行工具
 * 
 * 提供多种图标下载方式：
 * - 直接下载到项目图标集文件
 * - 下载到本地文件供后续合并
 * - 单个图标下载
 * - 批量图标下载
 * - 缺失图标检测和下载
 * 
 * @author 系统
 * @version 1.0.0
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { 
  batchDownloadIcons, 
  batchDownloadIconsToLocal,
  readIconNamesFromFile,
  downloadIcon,
  addIconToFile,
  saveIconToLocalFile,
  mergeDownloadedIcons 
} from './icon-downloader-node';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// icon-sets.ts 文件路径
const ICON_SETS_PATH = path.resolve(__dirname, '../../packages/components/src/iconify/icon-sets.ts');

/**
 * 显示帮助信息
 * 
 * 打印所有可用命令和使用示例
 * 包含直接下载和本地下载两种模式的说明
 */
function showHelp() {
  console.log(`
📦 图标下载工具

用法:
  bun run download-icons <command> [options]

命令:
  single <icon-name>           下载单个图标到 icon-sets.ts
  batch <file-path>            从文件批量下载图标到 icon-sets.ts
  list <icon-names...>         下载指定的图标列表到 icon-sets.ts
  
  local-single <icon-name>     下载单个图标到当前目录
  local-batch <file-path>      从文件批量下载图标到当前目录
  local-list <icon-names...>   下载指定的图标列表到当前目录
  missing                      显示缺失的图标列表（从浏览器记录中读取）
  merge                        将下载的图标合并到 icon-sets.ts

示例:
  # 直接添加到 icon-sets.ts
  bun run download-icons single "solar:home-bold"
  bun run download-icons batch ./icons-to-download.txt
  bun run download-icons list "solar:home-bold" "eva:settings-fill" "mdi:account"
  
  # 下载到当前目录的 downloaded-icons.ts
  bun run download-icons local-single "solar:home-bold"
  bun run download-icons local-batch ./icons-to-download.txt
  bun run download-icons local-list "solar:home-bold" "eva:settings-fill" "mdi:account"
  bun run download-icons merge

文件格式 (用于 batch 命令):
  每行一个图标名称，支持注释行（以 # 开头）
  
  示例文件内容:
  # 常用图标
  solar:home-bold
  solar:user-bold
  eva:settings-fill
  # 更多图标...
  mdi:account
`);
}

/**
 * 下载单个图标到 icon-sets.ts
 * 
 * 下载指定图标并直接添加到项目的图标集文件中
 * 适用于需要立即使用图标的场景
 * 
 * @param iconName 图标名称，格式为 "prefix:name"
 */
async function downloadSingleIcon(iconName: string) {
  console.log(`🎯 下载单个图标: ${iconName}`);
  
  const iconData = await downloadIcon(iconName);
  if (!iconData) {
    process.exit(1);
  }
  
  const success = await addIconToFile(iconName, iconData, ICON_SETS_PATH);
  if (success) {
    console.log(`\n🎉 图标 ${iconName} 已成功添加到 icon-sets.ts`);
    console.log(`💡 请重新启动开发服务器以使更改生效`);
  } else {
    process.exit(1);
  }
}

/**
 * 从文件批量下载图标到 icon-sets.ts
 * 
 * 从指定文件读取图标名称列表并批量下载到项目图标集
 * 文件格式：每行一个图标名称，支持 # 开头的注释行
 * 
 * @param filePath 包含图标名称的文件路径
 */
async function downloadFromFile(filePath: string) {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  console.log(`📁 从文件批量下载: ${resolvedPath}`);
  
  const iconNames = readIconNamesFromFile(resolvedPath);
  if (iconNames.length === 0) {
    console.error(`❌ 没有找到有效的图标名称`);
    process.exit(1);
  }
  
  const successCount = await batchDownloadIcons(iconNames, ICON_SETS_PATH);
  
  if (successCount > 0) {
    console.log(`\n🎉 成功添加 ${successCount} 个图标到 icon-sets.ts`);
    console.log(`💡 请重新启动开发服务器以使更改生效`);
  }
  
  if (successCount < iconNames.length) {
    process.exit(1);
  }
}

/**
 * 下载图标列表
 */
async function downloadIconList(iconNames: string[]) {
  console.log(`📋 下载图标列表: ${iconNames.join(', ')}`);
  
  const successCount = await batchDownloadIcons(iconNames, ICON_SETS_PATH);
  
  if (successCount > 0) {
    console.log(`\n🎉 成功添加 ${successCount} 个图标到 icon-sets.ts`);
    console.log(`💡 请重新启动开发服务器以使更改生效`);
  }
}

/**
 * 下载单个图标到本地文件
 */
async function downloadSingleIconToLocal(iconName: string) {
  console.log(`🎯 下载单个图标到本地: ${iconName}`);
  
  const iconData = await downloadIcon(iconName);
  if (!iconData) {
    process.exit(1);
  }
  
  const success = await saveIconToLocalFile(iconName, iconData);
  if (success) {
    console.log(`\n🎉 图标 ${iconName} 已成功保存到 downloaded-icons.ts`);
    console.log(`💡 您可以选择性地将图标合并到 icon-sets.ts 中`);
  } else {
    process.exit(1);
  }
}

/**
 * 从文件批量下载图标到本地
 */
async function downloadFromFileToLocal(filePath: string) {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  console.log(`📁 从文件批量下载到本地: ${resolvedPath}`);
  
  const iconNames = readIconNamesFromFile(resolvedPath);
  if (iconNames.length === 0) {
    console.error(`❌ 没有找到有效的图标名称`);
    process.exit(1);
  }
  
  const successCount = await batchDownloadIconsToLocal(iconNames);
  
  if (successCount > 0) {
    console.log(`\n🎉 成功下载 ${successCount} 个图标到 downloaded-icons.ts`);
    console.log(`💡 您可以选择性地将图标合并到 icon-sets.ts 中`);
  }
  
  if (successCount < iconNames.length) {
    process.exit(1);
  }
}

/**
 * 下载图标列表到本地
 */
async function downloadIconListToLocal(iconNames: string[]) {
  console.log(`📋 下载图标列表到本地: ${iconNames.join(', ')}`);
  
  const successCount = await batchDownloadIconsToLocal(iconNames);
  
  if (successCount > 0) {
    console.log(`\n🎉 成功下载 ${successCount} 个图标到 downloaded-icons.ts`);
    console.log(`💡 您可以选择性地将图标合并到 icon-sets.ts 中`);
  }
  
  if (successCount < iconNames.length) {
    process.exit(1);
  }
}

/**
 * 显示缺失图标信息和下载建议
 */
function showMissingIcons() {
  console.log(`
📋 缺失图标信息

缺失的图标信息存储在浏览器的 localStorage 中。
要查看和下载缺失的图标，请按以下步骤操作：

1. 在浏览器开发者工具的控制台中运行：
   localStorage.getItem('missing-icons')

2. 复制输出的图标列表，然后运行：
   bun run download-icons local-list <图标名称1> <图标名称2> ...

3. 或者，您可以在浏览器控制台中运行以下代码来生成完整的下载命令：
   const missingIcons = JSON.parse(localStorage.getItem('missing-icons') || '[]');
   console.log('bun run download-icons local-list ' + missingIcons.join(' '));

💡 提示：
- 缺失图标会在您使用未注册的图标时自动记录
- 每次使用缺失图标时，控制台都会显示当前的缺失列表和下载命令
- 下载后的图标会保存在 downloaded-icons.ts 文件中
`);
}

/**
 * 合并下载的图标到 icon-sets.ts
 */
async function mergeIcons() {
  console.log('\n🔄 开始合并下载的图标...');
  
  const downloadedIconsPath = './downloaded-icons.ts';
  const iconSetsPath = ICON_SETS_PATH;
  
  const mergedCount = await mergeDownloadedIcons(downloadedIconsPath, iconSetsPath);
  
  if (mergedCount > 0) {
    console.log(`\n✅ 成功合并 ${mergedCount} 个图标到 icon-sets.ts`);
  } else {
    console.log('\n❌ 没有图标被合并');
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }
  
  const command = args[0];
  
  switch (command) {
    case 'single':
      if (args.length < 2 || !args[1]) {
        console.error(`❌ 缺少图标名称参数`);
        console.log(`用法: bun run download-icons single <icon-name>`);
        process.exit(1);
      }
      await downloadSingleIcon(args[1]);
      break;
      
    case 'batch':
      if (args.length < 2 || !args[1]) {
        console.error(`❌ 缺少文件路径参数`);
        console.log(`用法: bun run download-icons batch <file-path>`);
        process.exit(1);
      }
      await downloadFromFile(args[1]);
      break;
      
    case 'list':
      if (args.length < 2) {
        console.error(`❌ 缺少图标名称参数`);
        console.log(`用法: bun run download-icons list <icon-names...>`);
        process.exit(1);
      }
      await downloadIconList(args.slice(1));
      break;
      
    case 'local-single':
      if (args.length < 2 || !args[1]) {
        console.error(`❌ 缺少图标名称参数`);
        console.log(`用法: bun run download-icons local-single <icon-name>`);
        process.exit(1);
      }
      await downloadSingleIconToLocal(args[1]);
      break;
      
    case 'local-batch':
      if (args.length < 2 || !args[1]) {
        console.error(`❌ 缺少文件路径参数`);
        console.log(`用法: bun run download-icons local-batch <file-path>`);
        process.exit(1);
      }
      await downloadFromFileToLocal(args[1]);
      break;
      
    case 'local-list':
      if (args.length < 2) {
        console.error(`❌ 缺少图标名称参数`);
        console.log(`用法: bun run download-icons local-list <icon-names...>`);
        process.exit(1);
      }
      await downloadIconListToLocal(args.slice(1));
      break;
      
    case 'missing':
      showMissingIcons();
      break;
      
    case 'merge':
      await mergeIcons();
      break;
      
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    default:
      console.error(`❌ 未知命令: ${command}`);
      showHelp();
      process.exit(1);
  }
}

// 运行主函数
main().catch((error) => {
  console.error(`❌ 发生错误:`, error);
  process.exit(1);
});