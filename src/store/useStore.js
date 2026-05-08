import { create } from 'zustand'

export const scrollRef = { current: 0 }

const useStore = create((set) => ({
  mode: 'soc',          // 'soc' | 'photo'
  loading: true,
  loadProgress: 0,
  transitioning: false,
  setMode: (mode) => set({ mode, transitioning: true }),
  setTransitioning: (v) => set({ transitioning: v }),
  setLoading: (v) => set({ loading: v }),
  setLoadProgress: (v) => set({ loadProgress: v }),
}))

export default useStore
