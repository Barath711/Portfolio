import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  'SOC Analyst II',
  'Incident Responder',
  'Threat Hunter',
  'Detection Engineer',
]

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [wait, setWait] = useState(false)

  useEffect(() => {
    const word = words[idx % words.length]
    const speed = deleting ? 45 : 80

    if (wait) { setTimeout(() => setWait(false), 1400); return }

    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) setWait(true), setDeleting(true)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setIdx(i => i + 1) }
      }
    }, speed)

    return () => clearTimeout(t)
  }, [text, deleting, wait, idx, words])

  return (
    <span>
      {text}
      <span className="animate-pulse" style={{ color: '#00d4ff' }}>_</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-16">

      {/* Status badge */}
      <motion.div
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" style={{ boxShadow: '0 0 8px #00ff88' }} />
        <span className="font-mono text-[11px] tracking-[0.25em] text-[#00ff88] uppercase">System Online</span>
        <span className="font-mono text-[11px] text-[#4a7090] ml-2">// Deloitte USI · Hyderabad</span>
      </motion.div>

      {/* Main heading */}
      <div className="overflow-hidden mb-2">
        <motion.h1
          className="font-display font-bold text-[clamp(3rem,10vw,7.5rem)] leading-none tracking-tight text-white glitch"
          data-text="BARATH"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          BARATH
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-6">
        <motion.h1
          className="font-display font-bold text-[clamp(3rem,10vw,7.5rem)] leading-none tracking-tight"
          style={{ color: '#00d4ff', textShadow: '0 0 40px rgba(0,212,255,0.4)' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          A C
        </motion.h1>
      </div>

      {/* Typewriter role */}
      <motion.p
        className="font-mono text-xl md:text-2xl text-[#e2f4ff] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Typewriter words={ROLES} />
      </motion.p>

      {/* Sub-info */}
      <motion.div
        className="flex flex-wrap gap-3 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {['Deloitte USI', 'SC-200 Certified', 'AI-102 Certified', '3+ Years SOC'].map((tag) => (
          <span key={tag} className="tag-soc">{tag}</span>
        ))}
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <a
          href="#about"
          onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#000813] transition-all duration-300"
        >
          Access Intel
        </a>
        <a
          href="mailto:barath0711@outlook.com"
          className="px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase border border-[#4a7090] text-[#4a7090] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-300"
        >
          Contact
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#4a7090] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00d4ff44] to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
