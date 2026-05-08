import { useEffect } from 'react'
import { scrollRef } from '../store/useStore'

export function useScrollProgress() {
  useEffect(() => {
    const handle = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      scrollRef.current = total > 0 ? window.scrollY / total : 0
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
}
