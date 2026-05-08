import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PhotoAbout() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="ph-about" ref={ref} className="relative z-10 min-h-[70vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">

      <div className="max-w-3xl">
        <motion.p
          className="font-mono text-[10px] tracking-[0.3em] mb-6"
          style={{ color: '#f59e0b88' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // THE ARTIST
        </motion.p>

        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold leading-tight mb-8"
          style={{ color: '#fef3c7' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Every frame is a<br />
          <span style={{ color: '#f59e0b' }}>decision.</span>
        </motion.h2>

        <motion.p
          className="text-base leading-relaxed mb-6"
          style={{ color: '#78716c' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          By day, I hunt threats and secure enterprise networks. By lens, I chase the decisive moment — the intersection
          of light, geometry, and human connection that makes a photograph feel inevitable.
        </motion.p>

        <motion.p
          className="text-base leading-relaxed mb-10"
          style={{ color: '#78716c' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          My analytical mind translates into photography as an obsession with composition, pattern, and the stories
          hidden in plain sight. From urban architecture to candid portraits — each image is built with intention.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {['Portrait', 'Architecture', 'Street', 'Product', 'Documentary', 'Motion'].map(tag => (
            <span key={tag} className="tag-photo">{tag}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
