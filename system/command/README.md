# 图标下载命令工具

这是一个用于批量下载和管理 Iconify 图标的命令行工具，支持多种下载模式和工作流程。

## 📦 功能特点

- ✅ **单个下载**: 下载指定的单个图标
- ✅ **批量下载**: 从文件批量下载图标列表
- ✅ **列表下载**: 从命令行参数下载多个图标
- ✅ **本地下载**: 下载到本地文件供后续合并
- ✅ **合并功能**: 将本地下载的图标合并到项目中
- ✅ **缺失检测**: 检测和下载项目中缺失的图标
- ✅ **自动添加**: 下载的图标会自动添加到 `icon-sets.ts`
- ✅ **重复检测**: 自动跳过已存在的图标
- ✅ **错误处理**: 优雅处理下载失败的图标

## 🚀 使用方法

### 从 components 包运行

```bash
cd packages/components
bun run download-icons <command> [options]
```

### 直接运行

```bash
cd system/command
bun run download-icons.ts <command> [options]
```

## 📋 命令列表

### 直接下载模式（立即添加到 icon-sets.ts）

#### 1. 下载单个图标
```bash
bun run download-icons single "solar:home-bold"
```

#### 2. 从文件批量下载
```bash
bun run download-icons batch icons-example.txt
```

#### 3. 下载指定图标列表
```bash
bun run download-icons list "solar:star-bold" "mdi:heart" "eva:bookmark-fill"
```

### 本地下载模式（下载到 downloaded-icons.ts）

#### 4. 下载单个图标到本地
```bash
bun run download-icons local-single "solar:home-bold"
```

#### 5. 从文件批量下载到本地
```bash
bun run download-icons local-batch icons-example.txt
```

#### 6. 下载指定图标列表到本地
```bash
bun run download-icons local-list "solar:star-bold" "mdi:heart" "eva:bookmark-fill"
```

### 管理功能

#### 7. 合并本地下载的图标
```bash
bun run download-icons merge
```

#### 8. 显示缺失的图标
```bash
bun run download-icons missing
```

#### 9. 查看帮助信息
```bash
bun run download-icons help
```

## 🔄 工作流程

### 推荐工作流程

1. **开发阶段**: 使用本地下载模式
   ```bash
   # 下载需要的图标到本地文件
   bun run download-icons local-single "mdi:home"
   bun run download-icons local-list "mdi:user" "mdi:settings"
   ```

2. **测试阶段**: 合并到项目
   ```bash
   # 将本地下载的图标合并到项目中
   bun run download-icons merge
   ```

3. **团队协作**: 共享图标文件
   - 将 `downloaded-icons.ts` 文件提交到版本控制
   - 团队成员可以直接合并这些图标

### 使用场景

- **直接模式**: 需要立即使用图标时
- **本地模式**: 开发阶段收集图标，统一合并
- **缺失检测**: 检查项目中使用但未定义的图标

## 📄 文件格式

批量下载时，图标列表文件格式如下：

```txt
# 常用系统图标
solar:home-bold-duotone
solar:user-bold-duotone
solar:settings-bold-duotone

# 操作图标
eva:edit-fill
eva:save-fill

# 状态图标
mdi:check-circle
mdi:alert-circle
```

- 每行一个图标名称
- 支持注释行（以 `#` 开头）
- 空行会被自动忽略

## 📁 文件结构

```
system/command/
├── package.json              # 包配置文件
├── README.md                 # 说明文档
├── download-icons.ts         # 主命令脚本
├── icon-downloader-node.ts   # Node.js 图标下载器
├── examples.ts               # 快捷调用方法示例
├── downloaded-icons.ts       # 本地下载的图标（运行时生成）
└── test/                     # 测试文件目录
    ├── downloaded-icons.ts   # 测试用的下载图标文件
    └── icons-example.txt     # 示例图标列表
```

## 🔧 技术实现

- **运行时**: Bun
- **语言**: TypeScript
- **API**: Iconify API
- **目标**: `packages/components/src/iconify/icon-sets.ts`

## 🔧 API 参考

### 核心函数

#### `downloadIcon(iconName: string): Promise<IconData | null>`
下载单个图标数据

#### `saveIconToLocalFile(iconName: string, iconData: IconData, outputPath?: string): Promise<boolean>`
保存图标到本地文件

#### `addIconToFile(iconName: string, iconData: IconData, iconSetsPath: string): Promise<boolean>`
添加图标到指定文件

#### `batchDownloadIconsToLocal(iconNames: string[], outputPath?: string): Promise<number>`
批量下载图标到本地文件

#### `mergeDownloadedIcons(downloadedIconsPath?: string, iconSetsPath: string): Promise<number>`
合并下载的图标到项目文件

### 快捷调用方法

```typescript
import { 
  downloadIcon, 
  saveIconToLocalFile, 
  addIconToFile,
  batchDownloadIconsToLocal,
  mergeDownloadedIcons 
} from './icon-downloader-node';

// 下载单个图标
const iconData = await downloadIcon('mdi:home');
if (iconData) {
  await saveIconToLocalFile('mdi:home', iconData);
}

// 批量下载
const icons = ['mdi:home', 'mdi:user', 'mdi:settings'];
const count = await batchDownloadIconsToLocal(icons);
console.log(`下载了 ${count} 个图标`);

// 合并图标
const mergedCount = await mergeDownloadedIcons('./downloaded-icons.ts', './icon-sets.ts');
console.log(`合并了 ${mergedCount} 个图标`);
```

### 完整示例

查看 <mcfile name="examples.ts" path="/Users/dongzhuo/Desktop/web/bun-Turborepo-Nx-vite-monorepo/system/command/examples.ts"></mcfile> 文件获取更多详细的使用示例，包括：

- 单个图标下载示例
- 批量下载示例  
- 从文件读取并下载示例
- 完整工作流程示例
- 错误处理示例

运行示例：
```bash
bun run examples.ts
```

## 📝 注意事项

1. 下载的图标会自动添加到 `packages/components/src/iconify/icon-sets.ts` 文件
2. 如果图标已存在，会自动跳过
3. 下载完成后需要重启开发服务器以使更改生效
4. 确保图标名称格式正确：`集合名:图标名`
5. 本地下载的图标保存在 `downloaded-icons.ts` 文件中
6. 使用 `merge` 命令可以将本地图标合并到项目中

system/command/
├── package.json              # 包配置文件
├── README.md                 # 完整的说明文档
├── download-icons.ts         # 主命令脚本（已添加注释）
├── icon-downloader-node.ts   # 核心功能模块（已添加详细注释）
├── examples.ts               # 快捷调用方法示例
├── downloaded-icons.ts       # 本地下载的图标（运行时生成）
└── test/                     # 测试文件目录
    ├── downloaded-icons.ts   # 测试用的下载图标文件
    └── icons-example.txt     # 示例图标列表