import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CONTACT_ITEMS = [
  {
    label: 'EMAIL',
    value: 'barath0711@outlook.com',
    href: 'mailto:barath0711@outlook.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="18" height="14" rx="2"/>
        <polyline points="1,1 10,9 19,1"/>
      </svg>
    ),
  },
  {
    label: 'PHONE',
    value: '+91 63030 72416',
    href: 'tel:+916303072416',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0122 16.9z"/>
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/barath07',
    href: 'https://linkedin.com/in/barath07',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GITHUB',
    value: 'github.com/Barath711',
    href: 'https://github.com/Barath711',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84a9.6 9.6 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12C22 6.48 17.52 2 12 2z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">

      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff]">// 05</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">ESTABLISH LINK</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff33] to-transparent max-w-xs" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl">
        {/* Left: terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-soc rounded-sm overflow-hidden">
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#0d2d4e]">
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
              ))}
              <span className="font-mono text-[10px] text-[#4a7090] ml-2">secure_channel.sh</span>
            </div>
            <div className="p-5 font-mono text-xs space-y-2">
              <p><span className="text-[#4a7090]">$ </span><span className="text-[#00ff88]">ping</span><span className="text-[#e2f4ff]"> barath.ac</span></p>
              <p className="text-[#4a7090]">Establishing secure channel...</p>
              <p><span className="text-[#4a7090]">$ </span><span className="text-[#00ff88]">cat</span><span className="text-[#e2f4ff]"> ./contact.json</span></p>
              <div className="pl-2 space-y-1 text-[#9ab5cc]">
                <p><span className="text-[#00d4ff]">"status"</span>: <span className="text-[#00ff88]">"open_to_opportunities"</span>,</p>
                <p><span className="text-[#00d4ff]">"response_time"</span>: <span className="text-[#f59e0b]">"&lt; 24h"</span>,</p>
                <p><span className="text-[#00d4ff]">"domain"</span>: <span className="text-[#f59e0b]">"SOC / Threat Intel"</span></p>
              </div>
              <p><span className="text-[#4a7090]">$ </span><span className="text-[#e2f4ff] animate-pulse">_</span></p>
            </div>
          </div>
        </motion.div>

        {/* Right: contact items */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CONTACT_ITEMS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-4 p-4 glass-soc rounded-sm group transition-all duration-300"
              style={{ borderColor: 'rgba(0,212,255,0.1)' }}
              whileHover={{ borderColor: 'rgba(0,212,255,0.3)', x: 4 }}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <div className="text-[#00d4ff] group-hover:scale-110 transition-transform">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#4a7090] mb-0.5">{item.label}</p>
                <p className="text-sm text-[#e2f4ff] truncate">{item.value}</p>
              </div>
              <svg className="w-4 h-4 text-[#4a7090] group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          ))}

          {/* Location */}
          <div className="flex items-center gap-3 p-4 rounded-sm" style={{ border: '1px solid rgba(74,112,144,0.15)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a7090" strokeWidth="1.5">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#4a7090] mb-0.5">LOCATION</p>
              <p className="text-sm text-[#6a8fa8]">Chennai / Hyderabad, India</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-20 pt-8 border-t border-[#0d2d4e] flex flex-wrap items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <p className="font-mono text-[10px] text-[#4a7090]">
          © 2026 BARATH A C · SOC ANALYST II
        </p>
        <p className="font-mono text-[10px] text-[#4a7090]">
          BUILT WITH <span className="text-[#00d4ff]">THREE.JS</span> + <span className="text-[#00d4ff]">REACT</span>
        </p>
      </motion.div>
    </section>
  )
}
