import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FRAMES = [
  { label: 'Golden Hour', aspect: '3:2', style: 'Portrait' },
  { label: 'Urban Geometry', aspect: '16:9', style: 'Architecture' },
  { label: 'Motion Blur', aspect: '1:1', style: 'Street' },
  { label: 'Candid Moments', aspect: '4:5', style: 'Documentary' },
]

export default function PhotoHero() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="ph-hero" className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16">

      {/* Badge */}
      <motion.div
        className="flex items-center gap-2 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#f59e0b88] uppercase">Barath A C · Visual Artist</span>
      </motion.div>

      {/* Heading */}
      <div className="overflow-hidden mb-3">
        <motion.h1
          className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-none tracking-tight"
          style={{ color: '#fef3c7' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          FRAME.
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-3">
        <motion.h1
          className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-none tracking-tight"
          style={{ color: '#f59e0b', textShadow: '0 0 40px rgba(245,158,11,0.3)' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          CAPTURE.
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-10">
        <motion.h1
          className="font-display font-bold text-[clamp(3rem,10vw,7rem)] leading-none tracking-tight"
          style={{ color: '#ec4899', textShadow: '0 0 40px rgba(236,72,153,0.3)' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          STORY.
        </motion.h1>
      </div>

      {/* Cycling frame label */}
      <motion.div
        key={frame}
        className="font-mono text-sm text-[#f59e0b88] tracking-[0.2em] mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {FRAMES[frame].label} &nbsp;·&nbsp; {FRAMES[frame].aspect} &nbsp;·&nbsp; {FRAMES[frame].style}
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <a
          href="#ph-gallery"
          onClick={e => { e.preventDefault(); document.querySelector('#ph-gallery')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0a0805] transition-all duration-300"
        >
          View Work
        </a>
        <a
          href="#ph-contact"
          onClick={e => { e.preventDefault(); document.querySelector('#ph-contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase border border-[#2d2010] text-[#78716c] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-300"
        >
          Collaborate
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#f59e0b44] to-transparent" />
      </motion.div>
    </section>
  )
}
