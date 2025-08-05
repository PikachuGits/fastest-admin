import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 用户信息接口
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: string
}

// 用户状态接口
interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  
  // Actions
  setUser: (user: User) => void
  setToken: (token: string) => void
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (updates: Partial<User>) => void
}

// 用户 Store
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        
        setUser: (user: User) => 
          set({ user, isAuthenticated: true }),
          
        setToken: (token: string) => 
          set({ token }),
          
        login: (user: User, token: string) => 
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          }),
          
        logout: () => 
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            isLoading: false 
          }),
          
        setLoading: (isLoading: boolean) => 
          set({ isLoading }),
          
        updateUser: (updates: Partial<User>) => {
          const currentUser = get().user
          if (currentUser) {
            set({ user: { ...currentUser, ...updates } })
          }
        },
      }),
      {
        name: 'user-storage',
        partialize: (state: UserState) => ({ 
          user: state.user, 
          token: state.token, 
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
)