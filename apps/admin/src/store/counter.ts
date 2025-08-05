import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Counter 状态接口
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: (count: number) => void
}

// Counter Store
export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        setCount: (count: number) => set({ count }),
      }),
      {
        name: 'counter-storage', // 本地存储的 key
      }
    ),
    {
      name: 'counter-store', // DevTools 中显示的名称
    }
  )
)