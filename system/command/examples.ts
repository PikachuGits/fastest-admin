/**
 * 图标下载工具快捷调用方法示例
 * 
 * 本文件展示了如何在代码中直接使用图标下载功能
 * 适用于自动化脚本、构建工具集成等场景
 * 
 * @author 系统
 * @version 1.0.0
 */

import { 
  downloadIcon, 
  saveIconToLocalFile, 
  addIconToFile,
  batchDownloadIconsToLocal,
  batchDownloadIcons,
  mergeDownloadedIcons,
  readIconNamesFromFile 
} from './icon-downloader-node';

// 图标集文件路径
const ICON_SETS_PATH = '../../packages/components/src/iconify/icon-sets.ts';

/**
 * 示例 1: 下载单个图标到本地
 */
export async function downloadSingleIconExample() {
  console.log('📥 示例 1: 下载单个图标到本地');
  
  const iconName = 'mdi:home';
  const iconData = await downloadIcon(iconName);
  
  if (iconData) {
    const success = await saveIconToLocalFile(iconName, iconData);
    console.log(success ? '✅ 下载成功' : '❌ 下载失败');
  } else {
    console.log('❌ 图标不存在');
  }
}

/**
 * 示例 2: 批量下载图标到本地
 */
export async function batchDownloadExample() {
  console.log('📥 示例 2: 批量下载图标到本地');
  
  const iconNames = [
    'mdi:home',
    'mdi:user', 
    'mdi:settings',
    'solar:star-bold',
    'eva:heart-fill'
  ];
  
  const count = await batchDownloadIconsToLocal(iconNames);
  console.log(`✅ 成功下载 ${count} 个图标`);
}

/**
 * 示例 3: 从文件读取并下载图标
 */
export async function downloadFromFileExample() {
  console.log('📥 示例 3: 从文件读取并下载图标');
  
  const filePath = './test/icons-example.txt';
  const iconNames = readIconNamesFromFile(filePath);
  
  if (iconNames.length > 0) {
    const count = await batchDownloadIconsToLocal(iconNames);
    console.log(`✅ 从文件读取并下载了 ${count} 个图标`);
  } else {
    console.log('❌ 文件中没有找到有效的图标名称');
  }
}

/**
 * 示例 4: 直接下载到项目图标集
 */
export async function downloadDirectlyExample() {
  console.log('📥 示例 4: 直接下载到项目图标集');
  
  const iconNames = ['mdi:account', 'mdi:cog'];
  const count = await batchDownloadIcons(iconNames, ICON_SETS_PATH);
  console.log(`✅ 直接添加了 ${count} 个图标到项目中`);
}

/**
 * 示例 5: 合并本地下载的图标
 */
export async function mergeIconsExample() {
  console.log('🔄 示例 5: 合并本地下载的图标');
  
  const mergedCount = await mergeDownloadedIcons('./downloaded-icons.ts', ICON_SETS_PATH);
  console.log(`✅ 合并了 ${mergedCount} 个图标到项目中`);
}

/**
 * 示例 6: 完整工作流程
 */
export async function completeWorkflowExample() {
  console.log('🔄 示例 6: 完整工作流程');
  
  // 1. 下载一些图标到本地
  console.log('步骤 1: 下载图标到本地...');
  const icons = ['mdi:home', 'mdi:user', 'solar:settings-bold'];
  const downloadCount = await batchDownloadIconsToLocal(icons);
  console.log(`下载了 ${downloadCount} 个图标`);
  
  // 2. 合并到项目中
  console.log('步骤 2: 合并到项目中...');
  const mergedCount = await mergeDownloadedIcons('./downloaded-icons.ts', ICON_SETS_PATH);
  console.log(`合并了 ${mergedCount} 个图标`);
  
  console.log('✅ 完整工作流程完成');
}

/**
 * 示例 7: 错误处理
 */
export async function errorHandlingExample() {
  console.log('⚠️ 示例 7: 错误处理');
  
  try {
    // 尝试下载不存在的图标
    const iconData = await downloadIcon('invalid:icon-name');
    if (!iconData) {
      console.log('❌ 图标不存在，已优雅处理');
    }
    
    // 尝试从不存在的文件读取
    const iconNames = readIconNamesFromFile('./non-existent-file.txt');
    console.log(`从不存在的文件读取到 ${iconNames.length} 个图标名称`);
    
  } catch (error) {
    console.error('❌ 发生错误:', error);
  }
}

/**
 * 运行所有示例
 */
export async function runAllExamples() {
  console.log('🚀 开始运行所有示例...\n');
  
  await downloadSingleIconExample();
  console.log('');
  
  await batchDownloadExample();
  console.log('');
  
  await downloadFromFileExample();
  console.log('');
  
  await downloadDirectlyExample();
  console.log('');
  
  await mergeIconsExample();
  console.log('');
  
  await completeWorkflowExample();
  console.log('');
  
  await errorHandlingExample();
  console.log('');
  
  console.log('✅ 所有示例运行完成');
}

// 如果直接运行此文件，则执行所有示例
if (import.meta.main) {
  runAllExamples().catch(console.error);
}