import { motion } from 'framer-motion'
import useStore from '../store/useStore'

export default function ModeSwitcher() {
  const { mode, setMode } = useStore()
  const isSoc = mode === 'soc'

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ color: isSoc ? '#00d4ff88' : '#f59e0b88' }}>
        {isSoc ? 'SOC MODE' : 'PHOTO MODE'}
      </span>

      {/* Toggle pill */}
      <button
        onClick={() => setMode(isSoc ? 'photo' : 'soc')}
        className="relative w-14 h-7 rounded-full transition-colors duration-500"
        style={{
          background: isSoc ? 'rgba(0,212,255,0.15)' : 'rgba(245,158,11,0.15)',
          border: `1px solid ${isSoc ? 'rgba(0,212,255,0.3)' : 'rgba(245,158,11,0.3)'}`,
        }}
        data-hover
      >
        <motion.div
          className="absolute top-[3px] w-[18px] h-[18px] rounded-full"
          style={{ background: isSoc ? '#00d4ff' : '#f59e0b', boxShadow: `0 0 8px ${isSoc ? '#00d4ff' : '#f59e0b'}` }}
          animate={{ left: isSoc ? '4px' : '28px' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </button>

      {/* Icon labels */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px]" style={{ opacity: isSoc ? 1 : 0.3, color: '#00d4ff' }}>⚡</span>
        <span className="text-[10px]" style={{ opacity: isSoc ? 0.3 : 1, color: '#f59e0b' }}>📷</span>
      </div>
    </motion.div>
  )
}
