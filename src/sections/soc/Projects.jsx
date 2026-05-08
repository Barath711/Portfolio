import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    title: 'OSINT MultiSearch',
    subtitle: 'IOC Automation Tool',
    tags: ['Python', 'VirusTotal', 'AbuseIPDB', 'URLSCAN.io'],
    status: 'DEPLOYED',
    statusColor: '#00ff88',
    impact: '40% faster IOC lookup · Team-wide adoption',
    description: 'Unified desktop tool querying three OSINT APIs simultaneously — eliminates tab-switching during active investigations.',
    bullets: [
      'Async calls + result caching handle high-volume bursts without rate limiting.',
      'Eliminated tab-switching during active investigations; adopted as SOC standard.',
      'Cut IOC lookup time 40%; tripled analyst throughput per shift.',
    ],
    github: 'https://github.com/Barath711',
  },
  {
    title: 'Browser History Parser',
    subtitle: 'Digital Forensics Tool',
    tags: ['Python', 'SQLite', 'XLSX/CSV Export', 'Forensics'],
    status: 'OPERATIONAL',
    statusColor: '#00d4ff',
    impact: 'Chrome · Edge · Brave support',
    description: 'Parses Chromium History & Downloads DBs into a clean Excel export with timestamps, URLs, referrers, and file artifacts.',
    bullets: [
      'Reconstructs click trails — surfaces malvertising chains and suspicious download activity.',
      'Supports Chrome, Edge, and Brave; safe-copy workflow handles locked databases.',
      'Clean Excel export with timestamps, URLs, referrers, and file artifacts.',
    ],
    github: 'https://github.com/Barath711',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">

      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff]">// 04</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">CLASSIFIED OPS</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff33] to-transparent max-w-xs" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((proj, pi) => (
          <motion.div
            key={proj.title}
            className="glass-soc rounded-sm overflow-hidden group"
            style={{ borderColor: 'rgba(0,212,255,0.12)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: pi * 0.15 }}
            whileHover={{ borderColor: 'rgba(0,212,255,0.3)', y: -4 }}
          >
            {/* Top accent bar */}
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${proj.statusColor}, transparent)` }} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-sm"
                      style={{ color: proj.statusColor, background: `${proj.statusColor}12`, border: `1px solid ${proj.statusColor}30` }}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{proj.title}</h3>
                  <p className="font-mono text-xs text-[#00d4ff]">{proj.subtitle}</p>
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-40 hover:opacity-100 transition-opacity text-[#e2f4ff]"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84a9.6 9.6 0 012.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12C22 6.48 17.52 2 12 2z" />
                  </svg>
                </a>
              </div>

              {/* Impact badge */}
              <div
                className="inline-block font-mono text-[10px] px-2 py-0.5 mb-4 rounded-sm"
                style={{ background: `${proj.statusColor}08`, border: `1px solid ${proj.statusColor}22`, color: proj.statusColor }}
              >
                ◆ {proj.impact}
              </div>

              <p className="text-[#9ab5cc] text-sm mb-4 leading-relaxed">{proj.description}</p>

              <ul className="space-y-1.5 mb-5">
                {proj.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-[#6a8fa8] text-xs leading-relaxed">
                    <span className="text-[#4a7090] font-mono mt-0.5">–</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((t) => (
                  <span key={t} className="tag-soc">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
