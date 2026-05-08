import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORKS = [
  { title: 'Golden Hour', genre: 'Portrait', aspect: '3:2', col: 'col-span-2 row-span-2', bg: 'from-[#7c3d00] to-[#2d1600]' },
  { title: 'Urban Lines',  genre: 'Architecture', aspect: '16:9', col: '', bg: 'from-[#1a1200] to-[#0d0900]' },
  { title: 'Still Life',  genre: 'Product', aspect: '1:1', col: '', bg: 'from-[#0d1a00] to-[#080d00]' },
  { title: 'Motion',      genre: 'Street', aspect: '4:5', col: 'row-span-2', bg: 'from-[#1a0020] to-[#0d0015]' },
  { title: 'Candid',      genre: 'Documentary', aspect: '3:4', col: '', bg: 'from-[#001a14] to-[#000d0a]' },
  { title: 'Bokeh',       genre: 'Abstract', aspect: '1:1', col: '', bg: 'from-[#1a0d00] to-[#0d0600]' },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="ph-gallery" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24" style={{ background: 'rgba(10,8,5,0.4)' }}>

      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: '#fef3c7' }}>SELECTED WORKS</h2>
        <div className="flex-1 h-px max-w-xs" style={{ background: 'linear-gradient(to right, rgba(245,158,11,0.3), transparent)' }} />
      </motion.div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-3 gap-3 auto-rows-[160px]">
        {WORKS.map((work, i) => (
          <motion.div
            key={work.title}
            className={`relative overflow-hidden rounded-sm group cursor-pointer ${work.col}`}
            style={{ border: '1px solid rgba(245,158,11,0.1)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ borderColor: 'rgba(245,158,11,0.35)' }}
          >
            {/* Gradient placeholder */}
            <div className={`absolute inset-0 bg-gradient-to-br ${work.bg}`} />

            {/* Film grain */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
            }} />

            {/* Corner marks */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l opacity-60" style={{ borderColor: '#f59e0b' }} />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r opacity-60" style={{ borderColor: '#f59e0b' }} />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l opacity-60" style={{ borderColor: '#f59e0b' }} />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-60" style={{ borderColor: '#f59e0b' }} />

            {/* Hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4"
              style={{ background: 'linear-gradient(to top, rgba(10,8,5,0.9), transparent)' }}>
              <p className="font-display font-bold text-lg" style={{ color: '#fef3c7' }}>{work.title}</p>
              <p className="font-mono text-xs" style={{ color: '#f59e0b' }}>{work.genre} · {work.aspect}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
