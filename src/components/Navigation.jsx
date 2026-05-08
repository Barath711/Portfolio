import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'

const SOC_LINKS  = ['System', 'Intel', 'Operations', 'Projects', 'Contact']
const PHOTO_LINKS = ['Work', 'About', 'Motion', 'Contact']
const SOC_IDS    = ['#hero', '#about', '#skills', '#projects', '#contact']
const PHOTO_IDS  = ['#ph-hero', '#ph-gallery', '#ph-about', '#ph-contact']

export default function Navigation() {
  const { mode } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links  = mode === 'soc' ? SOC_LINKS  : PHOTO_LINKS
  const ids    = mode === 'soc' ? SOC_IDS    : PHOTO_IDS
  const accent = mode === 'soc' ? '#00d4ff'  : '#f59e0b'
  const bg     = mode === 'soc' ? 'rgba(1,13,31,0.85)'  : 'rgba(20,16,8,0.85)'

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 h-16 flex items-center justify-between"
      style={{
        background: scrolled ? bg : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${accent}18` : 'none',
        transition: 'all 0.4s ease',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-display font-bold text-lg tracking-widest"
        style={{ color: accent }}
      >
        BAC<span className="opacity-40">_</span>
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l, i) => (
          <button
            key={l}
            onClick={() => scrollTo(ids[i])}
            className="font-mono text-xs tracking-[0.15em] uppercase transition-all duration-200"
            style={{ color: '#4a7090' }}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = '#4a7090'}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
      >
        {[0,1,2].map(i => (
          <span key={i} className="block w-6 h-[1px]" style={{ background: accent }} />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="absolute top-16 left-0 right-0 flex flex-col p-6 gap-4"
          style={{ background: bg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${accent}18` }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {links.map((l, i) => (
            <button key={l} onClick={() => scrollTo(ids[i])}
              className="font-mono text-xs tracking-[0.15em] uppercase text-left"
              style={{ color: accent }}>
              {l}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
