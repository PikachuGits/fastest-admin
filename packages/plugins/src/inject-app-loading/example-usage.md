# Vite Plugin App Loading 使用示例

## 安装

```bash
# 如果插件在 monorepo 内部
bun add "@fastest/plugins@workspace:*"

# 或者如果是独立包
bun add vite-plugin-app-loading
```

## 基本使用

在你的 `vite.config.ts` 文件中：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { vitePluginAppLoading } from '@fastest/plugins/inject-app-loading'

export default defineConfig({
  plugins: [
    react(),
    vitePluginAppLoading({
      title: '我的应用',
      loadingTemplate: './src/assets/custom-loading.html'
    })
  ],
})
```

或者使用主入口：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { vitePluginAppLoading } from '@fastest/plugins'

export default defineConfig({
  plugins: [
    react(),
    vitePluginAppLoading({
      title: '我的应用',
      loadingTemplate: './src/assets/custom-loading.html'
    })
  ],
})
```

## 配置选项

### PluginOptions

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `process.env.LOADING_APP_TITLE \|\| ''` | 应用标题，会替换模板中的 `<%= LOADING_APP_TITLE %>` |
| `loadingTemplate` | `string` | `undefined` | 自定义 loading 模板路径，相对于项目根目录 |

## 模板变量

插件支持在 HTML 模板中使用以下变量：

- `<%= LOADING_APP_TITLE %>` - 应用标题

## 自定义 Loading 模板

创建一个自定义的 loading HTML 文件：

```html
<!-- src/assets/custom-loading.html -->
<div id="__app-loading__" class="app-loading">
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <h2><%= LOADING_APP_TITLE %></h2>
    <p>正在加载中...</p>
  </div>
</div>

<style>
.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-container {
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

## 移除 Loading

在你的应用启动后，使用提供的工具函数移除 loading：

```typescript
import { unmountGlobalLoading } from '@fastest/plugins/inject-app-loading/unmount-global-loading'

// 在应用完全加载后调用
unmountGlobalLoading()
```

## 环境变量支持

你也可以通过环境变量设置标题：

```bash
# .env
LOADING_APP_TITLE=我的应用名称
```

插件会按以下优先级获取标题：
1. 插件选项中的 `title`
2. 环境变量 `LOADING_APP_TITLE`
3. 空字符串

## 注意事项

1. 插件会在 HTML 的 `</body>` 标签前插入 loading 内容
2. 使用 `buildStart` 钩子预处理模板，`transformIndexHtml` 钩子注入 HTML
3. 支持开发和生产环境
4. 模板路径相对于项目根目录（`process.cwd()`）
5. Loading HTML 在构建开始时预处理，提高运行时性能