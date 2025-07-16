# Bun + Turborepo + Nx + Vite Monorepo

一个基于 Bun、Turborepo、Nx 和 Vite 的现代化 Monorepo 项目模板。

## 📋 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [启动命令](#启动命令)
- [Nx 用法](#nx-用法)
- [Turbo 用法](#turbo-用法)
- [包管理](#包管理)
- [开发指南](#开发指南)

## 🚀 快速开始

### 安装依赖

```bash
bun install
```

### 启动开发服务器

```bash
# 启动 web 应用
bun run dev:web

# 或使用 Nx 启动 admin 应用
nx dev admin
```

## 📁 项目结构

```
├── apps/                    # 应用目录
│   ├── admin/              # 管理后台应用
│   └── web/                # Web 前端应用
├── packages/               # 共享包目录
│   ├── components/         # 共享组件库
│   ├── ui/                 # UI 组件库
│   ├── utils/              # 工具函数库
│   └── plugins/            # 插件库
├── nx.json                 # Nx 配置文件
├── turbo.json              # Turbo 配置文件
└── package.json            # 根包配置
```

## 🎯 启动命令

### 根目录命令

```bash
# 启动 web 应用开发服务器
bun run dev:web

# 清理所有构建产物和依赖
bun run clean

# 运行入口文件
bun run index.ts
```

### 应用特定命令

```bash
# 进入应用目录启动
cd apps/admin && bun run dev
cd apps/web && bun run dev

# 构建应用
cd apps/admin && bun run build
cd apps/web && bun run build
```

## 🔧 Nx 用法

### 基本命令

```bash
# 运行特定项目的任务
nx <target> <project>

# 启动 admin 应用开发服务器
nx dev admin

# 构建 admin 应用
nx build admin

# 查看项目依赖图
nx graph

# 查看所有项目
nx show projects

# 运行受影响的项目
nx affected:build
nx affected:test
nx affected:lint
```

### Nx 配置说明

- **npmScope**: `fastest-admin` - 项目的 npm 作用域
- **appsDir**: `apps` - 应用目录
- **libsDir**: `packages` - 库目录
- **defaultBase**: `main` - 默认基础分支

## ⚡ Turbo 用法

### 基本命令

```bash
# 构建所有项目
turbo build

# 运行开发服务器
turbo dev

# 运行测试
turbo test

# 运行 lint
turbo lint

# 清理缓存
turbo clean

# 查看缓存状态
turbo run build --dry-run
```

### Turbo 任务配置

- **build**: 构建任务，支持依赖缓存
- **dev**: 开发任务，禁用缓存
- **test**: 测试任务，输出覆盖率报告
- **lint**: 代码检查任务
- **clean**: 清理任务，禁用缓存

## 📦 包管理

### 安装内部包

```bash
# 安装内部组件库
bun add "@fastest/ui@workspace:*"
bun add "@fastest/components@workspace:*"
bun add "@fastest/utils@workspace:*"
```

### 添加外部依赖

```bash
# 在根目录添加开发依赖
bun add -D <package-name>

# 在特定应用中添加依赖
cd apps/admin && bun add <package-name>

# 在特定包中添加依赖
cd packages/components && bun add <package-name>
```

## 🛠 开发指南

### 创建新应用

1. 在 `apps/` 目录下创建新应用
2. 添加 `project.json` 配置文件
3. 配置构建和开发任务

### 创建新包

1. 在 `packages/` 目录下创建新包
2. 添加 `package.json` 文件
3. 配置包的导出和依赖

### 环境要求

- **Bun**: v1.2.18+
- **Node.js**: v18+
- **TypeScript**: v5+

### 相关链接

- [Bun 官方文档](https://bun.sh)
- [Nx 官方文档](https://nx.dev)
- [Turborepo 官方文档](https://turbo.build)
- [Vite 官方文档](https://vitejs.dev)

---

*本项目使用 `bun init` 在 Bun v1.2.18 中创建。*