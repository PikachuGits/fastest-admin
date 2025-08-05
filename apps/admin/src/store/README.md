# Zustand 状态管理

本项目使用 Zustand 进行状态管理，提供了简洁、类型安全的状态管理解决方案。

## 📁 Store 结构

```
src/store/
├── index.ts          # 统一导出入口
├── counter.ts        # 计数器状态
├── user.ts          # 用户状态
├── app.ts           # 应用全局状态
└── README.md        # 说明文档
```

## 🚀 快速开始

### 基本使用

```tsx
import { useCounterStore, useUserStore, useAppStore } from '@/store'

function MyComponent() {
  // 使用 counter store
  const { count, increment, decrement } = useCounterStore()
  
  // 使用 user store
  const { user, isAuthenticated, login } = useUserStore()
  
  // 使用 app store
  const { theme, setTheme, sidebarCollapsed } = useAppStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

### 选择性订阅

```tsx
// 只订阅特定状态，避免不必要的重渲染
const count = useCounterStore(state => state.count)
const increment = useCounterStore(state => state.increment)

// 或者使用 shallow 比较
import { shallow } from 'zustand/shallow'

const { count, increment } = useCounterStore(
  state => ({ count: state.count, increment: state.increment }),
  shallow
)
```

## 📊 Store 详解

### Counter Store

计数器状态管理，支持持久化存储。

```tsx
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: (count: number) => void
}
```

**特性：**
- ✅ 持久化存储（localStorage）
- ✅ DevTools 支持
- ✅ 类型安全

### User Store

用户认证和信息管理。

```tsx
interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  
  setUser: (user: User) => void
  setToken: (token: string) => void
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (updates: Partial<User>) => void
}
```

**特性：**
- ✅ 用户信息管理
- ✅ 认证状态跟踪
- ✅ Token 管理
- ✅ 部分持久化（排除敏感状态）

### App Store

应用全局配置管理。

```tsx
interface AppState {
  theme: Theme
  isDarkMode: boolean
  sidebarCollapsed: boolean
  sidebarOpen: boolean
  language: Language
  globalLoading: boolean
  
  // ... actions
}
```

**特性：**
- ✅ 主题管理（light/dark/system）
- ✅ 布局状态管理
- ✅ 多语言支持
- ✅ 系统主题自动检测
- ✅ 持久化配置

## 🛠️ 高级用法

### 中间件

所有 store 都配置了以下中间件：

1. **DevTools**: 开发工具支持
2. **Persist**: 持久化存储

### 工具函数

```tsx
import { resetAllStores, clearAllPersistedData } from '@/store'

// 重置所有 store 到初始状态
resetAllStores()

// 清除所有持久化数据
clearAllPersistedData()
```

### 在组件外使用

```tsx
import { useUserStore } from '@/store'

// 在 API 拦截器中使用
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
```

## 🎯 最佳实践

### 1. 状态设计

- 保持状态扁平化
- 避免嵌套过深的对象
- 合理拆分 store

### 2. 性能优化

```tsx
// ✅ 好的做法：选择性订阅
const count = useCounterStore(state => state.count)

// ❌ 避免：订阅整个 store
const store = useCounterStore()
```

### 3. 类型安全

```tsx
// 定义明确的接口
interface User {
  id: string
  username: string
  email: string
  role: string
}

// 使用泛型确保类型安全
const useUserStore = create<UserState>()(/* ... */)
```

### 4. 错误处理

```tsx
const login = async (credentials: LoginCredentials) => {
  try {
    setLoading(true)
    const { user, token } = await authAPI.login(credentials)
    login(user, token)
  } catch (error) {
    // 处理错误
    console.error('Login failed:', error)
  } finally {
    setLoading(false)
  }
}
```

## 🔧 配置说明

### 持久化配置

```tsx
persist(
  stateCreator,
  {
    name: 'storage-key', // localStorage key
    partialize: (state) => ({ 
      // 只持久化特定字段
      theme: state.theme,
      language: state.language 
    }),
  }
)
```

### DevTools 配置

```tsx
devtools(
  stateCreator,
  {
    name: 'store-name', // DevTools 中显示的名称
  }
)
```

## 📝 示例组件

查看 `src/components/StoreExample.tsx` 了解完整的使用示例。

## 🔗 相关链接

- [Zustand 官方文档](https://github.com/pmndrs/zustand)
- [TypeScript 支持](https://github.com/pmndrs/zustand#typescript)
- [中间件指南](https://github.com/pmndrs/zustand#middleware)