import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PhotoContact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="ph-contact" ref={ref} className="relative z-10 min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-24">

      <motion.p
        className="font-mono text-[10px] tracking-[0.3em] mb-6"
        style={{ color: '#f59e0b88' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        // COLLABORATE
      </motion.p>

      <motion.h2
        className="font-display text-4xl md:text-5xl font-bold mb-6"
        style={{ color: '#fef3c7' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        Let's create something<br />
        <span style={{ color: '#f59e0b' }}>unforgettable.</span>
      </motion.h2>

      <motion.a
        href="mailto:barath0711@outlook.com"
        className="px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0a0805] transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        barath0711@outlook.com
      </motion.a>

      <motion.p
        className="mt-16 font-mono text-[10px] text-[#78716c]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        © 2026 BARATH A C · SOC ANALYST & VISUAL ARTIST
      </motion.p>
    </section>
  )
}
