import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'

const LINES = [
  '> INITIALIZING SECURE CHANNEL...',
  '> LOADING ASSET INTELLIGENCE...',
  '> SYNCING THREAT DATABASE...',
  '> ESTABLISHING IDENTITY...',
  '> DECRYPTING PORTFOLIO...',
  '> SYSTEM READY.',
]

export default function Loader() {
  const setLoading = useStore((s) => s.setLoading)
  const setLoadProgress = useStore((s) => s.setLoadProgress)
  const [progress, setProgress] = useState(0)
  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 100) { p = 100; clearInterval(interval) }
      setProgress(Math.min(p, 100))
      setLoadProgress(Math.min(p, 100))
    }, 220)

    LINES.forEach((line, i) => {
      setTimeout(() => setLines(prev => [...prev, line]), i * 220)
    })

    setTimeout(() => {
      setDone(true)
      setTimeout(() => setLoading(false), 700)
    }, LINES.length * 220 + 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#000813' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff44]" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff44]" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff44]" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff44]" />

      {/* Badge */}
      <motion.div
        className="mb-8 px-3 py-1 border border-[#00d4ff33] font-mono text-[10px] tracking-[0.3em] text-[#00d4ff88]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        SECURE_PORTFOLIO // v2.0
      </motion.div>

      {/* Name */}
      <motion.h1
        className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        BARATH A C
      </motion.h1>
      <motion.p
        className="font-mono text-[#00d4ff] text-sm tracking-[0.2em] mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        SOC ANALYST II &nbsp;·&nbsp; DELOITTE USI
      </motion.p>

      {/* Terminal lines */}
      <div className="w-full max-w-md mb-8 space-y-1">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            className="font-mono text-[11px] text-[#00d4ff88]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {l}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between font-mono text-[10px] text-[#4a7090] mb-1">
          <span>LOADING MODULES</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-[2px] w-full bg-[#0d2d4e] overflow-hidden">
          <motion.div
            className="h-full bg-[#00d4ff]"
            style={{ width: `${progress}%`, boxShadow: '0 0 12px #00d4ff' }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
