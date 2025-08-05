import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 主题类型
export type Theme = 'light' | 'dark' | 'system'

// 语言类型
export type Language = 'zh-CN' | 'en-US'

// 应用状态接口
interface AppState {
  // 主题相关
  theme: Theme
  isDarkMode: boolean
  
  // 布局相关
  sidebarCollapsed: boolean
  sidebarOpen: boolean
  
  // 语言相关
  language: Language
  
  // 加载状态
  globalLoading: boolean
  
  // Actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setDarkMode: (isDark: boolean) => void
  
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebarCollapsed: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarOpen: () => void
  
  setLanguage: (language: Language) => void
  
  setGlobalLoading: (loading: boolean) => void
}

// 应用 Store
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        theme: 'system' as Theme,
        isDarkMode: false,
        sidebarCollapsed: false,
        sidebarOpen: true,
        language: 'zh-CN' as Language,
        globalLoading: false,
        
        // 主题相关 Actions
        setTheme: (theme: Theme) => {
          set({ theme })
          // 根据主题设置暗色模式
          if (theme === 'dark') {
            set({ isDarkMode: true })
          } else if (theme === 'light') {
            set({ isDarkMode: false })
          } else {
            // system 主题，检测系统偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            set({ isDarkMode: prefersDark })
          }
        },
        
        toggleTheme: () => {
          const currentTheme = get().theme
          const newTheme = currentTheme === 'light' ? 'dark' : 'light'
          get().setTheme(newTheme)
        },
        
        setDarkMode: (isDarkMode: boolean) => 
          set({ isDarkMode }),
        
        // 侧边栏相关 Actions
        setSidebarCollapsed: (sidebarCollapsed: boolean) => 
          set({ sidebarCollapsed }),
          
        toggleSidebarCollapsed: () => 
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
          
        setSidebarOpen: (sidebarOpen: boolean) => 
          set({ sidebarOpen }),
          
        toggleSidebarOpen: () => 
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        // 语言相关 Actions
        setLanguage: (language: Language) => 
          set({ language }),
        
        // 全局加载状态 Actions
        setGlobalLoading: (globalLoading: boolean) => 
          set({ globalLoading }),
      }),
      {
        name: 'app-storage',
        partialize: (state: AppState) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          language: state.language,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
)

// 系统主题变化监听
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    const { theme, setDarkMode } = useAppStore.getState()
    if (theme === 'system') {
      setDarkMode(e.matches)
    }
  })
}