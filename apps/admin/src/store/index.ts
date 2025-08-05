// 导出所有 store
export { useCounterStore } from './counter'
export { useUserStore } from './user'
export { useAppStore } from './app'

// 导出类型
export type { Theme, Language } from './app'
export type { User } from './user'

// 导入 stores 用于工具函数
import { useCounterStore } from './counter'
import { useUserStore } from './user'
import { useAppStore } from './app'
import type { Theme, Language } from './app'

// Store 工具函数
export const resetAllStores = () => {
  // 重置所有 store 到初始状态
  useCounterStore.getState().reset()
  useUserStore.getState().logout()
  useAppStore.setState({
    theme: 'system' as Theme,
    isDarkMode: false,
    sidebarCollapsed: false,
    sidebarOpen: true,
    language: 'zh-CN' as Language,
    globalLoading: false,
  })
}

// 清除所有持久化数据
export const clearAllPersistedData = () => {
  localStorage.removeItem('counter-storage')
  localStorage.removeItem('user-storage')
  localStorage.removeItem('app-storage')
}