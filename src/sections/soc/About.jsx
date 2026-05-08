import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { label: 'Years SOC', value: '3+' },
  { label: 'Security Incidents', value: '2500+' },
  { label: 'IOC Lookup Speed', value: '40%↑' },
  { label: 'Certs Active', value: '2' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">

      {/* Section label */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff]">// 01</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">SYSTEM PROFILE</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff33] to-transparent max-w-xs" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="glass-soc rounded-sm p-6 mb-6">
            <p className="font-mono text-[11px] text-[#00d4ff] mb-3 tracking-[0.2em]">// SUMMARY</p>
            <p className="text-[#9ab5cc] leading-relaxed text-sm">
              SOC Analyst II at <span className="text-[#00d4ff]">Deloitte USI</span> with 3+ years advancing from L1 triage to
              independently leading shifts and owning high-severity client escalations across enterprise and OT environments.
              Deep hands-on experience with Splunk, Microsoft Sentinel (KQL), Cortex XSOAR, CrowdStrike Falcon,
              Trend Micro, Nozomi (ICS/OT), Tanium, and Axonius.
            </p>
          </div>
          <div className="glass-soc rounded-sm p-6">
            <p className="font-mono text-[11px] text-[#00d4ff] mb-3 tracking-[0.2em]">// FOCUS AREAS</p>
            <ul className="space-y-2">
              {[
                'Incident Response & High-Severity Escalation',
                'Threat Hunting & IOC/IOA Analysis',
                'SIEM Tuning & False Positive Reduction',
                'OT/ICS Security — Nozomi Networks',
                'Python-driven SOC Automation',
                'Purple Team Readiness Exercises',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#9ab5cc] text-sm">
                  <span className="text-[#00d4ff] mt-0.5 font-mono">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Stats + badges */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ label, value }) => (
              <div key={label} className="glass-soc rounded-sm p-4 text-center" style={{ borderColor: 'rgba(0,212,255,0.15)' }}>
                <div className="font-display text-3xl font-bold text-[#00d4ff] mb-1" style={{ textShadow: '0 0 20px rgba(0,212,255,0.5)' }}>
                  {value}
                </div>
                <div className="font-mono text-[10px] tracking-[0.15em] text-[#4a7090] uppercase">{label}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="glass-soc rounded-sm p-5">
            <p className="font-mono text-[10px] text-[#00d4ff] mb-3 tracking-[0.2em]">// CERTIFICATIONS</p>
            {[
              { name: 'SC-200 Security Operations Analyst', issuer: 'Microsoft', year: '2025', color: '#00d4ff' },
              { name: 'AI-102 Azure AI Engineer Associate', issuer: 'Microsoft', year: '2026', color: '#00ff88' },
            ].map((cert) => (
              <div key={cert.name} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  <span style={{ color: cert.color, fontSize: 14 }}>★</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e2f4ff]">{cert.name}</p>
                  <p className="font-mono text-[10px] text-[#4a7090]">{cert.issuer} · Active {cert.year}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="glass-soc rounded-sm p-5">
            <p className="font-mono text-[10px] text-[#00d4ff] mb-3 tracking-[0.2em]">// EDUCATION</p>
            {[
              { deg: 'MCA', school: 'SRM University, Chennai', meta: '2023–2025 · CGPA 9.45' },
              { deg: 'BCA', school: 'Loyola College, Chennai', meta: '2019–2022 · CGPA 9.0' },
            ].map((ed) => (
              <div key={ed.deg} className="mb-3 last:mb-0">
                <p className="text-sm font-semibold text-[#e2f4ff]">{ed.deg}</p>
                <p className="text-xs text-[#00d4ff]">{ed.school}</p>
                <p className="font-mono text-[10px] text-[#4a7090]">{ed.meta}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
