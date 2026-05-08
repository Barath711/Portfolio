import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCE = [
  {
    role: 'SOC Analyst II',
    company: 'Deloitte USI — Cyber & Strategic Risk',
    location: 'Hyderabad, India',
    period: 'Jan 2024 – Present',
    current: true,
    bullets: [
      'Stepped into informal shift lead capacity — coordinating handovers, prioritising queues during peak periods, and serving as first escalation point for L1 analysts.',
      'Own end-to-end incident response for complex, high-severity cases; accountable for containment, RCA, and client-facing communication throughout the incident lifecycle.',
      'Operate Microsoft Defender for Endpoint & Identity for endpoint telemetry, hunting suspicious auth patterns, and correlating identity-based threats with network activity.',
      'Conduct threat hunting and IOC sweeps via Tanium — querying live asset state, validating patch posture, and isolating compromised hosts during active incidents.',
      'Use Axonius for asset inventory reconciliation; identify unmanaged or misconfigured devices and work with clients to close visibility gaps.',
      'Utilise Nozomi Networks for OT/ICS monitoring; detect anomalous lateral movement and protocol deviations in air-gapped segments.',
      'Perform malware and phishing analysis via Trend Micro & Cortex XSOAR playbooks; document findings with full kill-chain context.',
      'Built Python OSINT automation tool (VirusTotal + AbuseIPDB + URLSCAN.io) adopted team-wide — cut IOC investigation time by 40%, tripling analyst throughput per shift.',
      'Actively mentors L1 analysts on triage, tooling, and escalation judgement.',
    ],
    tags: ['Splunk', 'MS Sentinel', 'CrowdStrike', 'Nozomi', 'Cortex XSOAR', 'Python', 'Tanium'],
  },
  {
    role: 'SOC Analyst I',
    company: 'Deloitte USI — Cyber & Strategic Risk',
    location: 'Hyderabad, India',
    period: 'Aug 2022 – Dec 2023',
    current: false,
    bullets: [
      'First-line alert triage across SIEM platforms; escalated confirmed incidents with structured enrichment and initial containment recommendations within SLA windows.',
      'Built hands-on proficiency with Splunk, Cortex XSOAR, CrowdStrike, and Palo Alto across multiple concurrent client environments.',
      'Documented all activity in ServiceNow and Jira; assisted senior analysts in shift reporting, timeline reconstruction, and audit-aligned incident records.',
    ],
    tags: ['Splunk', 'Cortex XSOAR', 'CrowdStrike', 'Palo Alto', 'ServiceNow', 'Jira'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">

      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff]">// 03</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">OPERATIONS LOG</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff33] to-transparent max-w-xs" />
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px ml-3 bg-gradient-to-b from-[#00d4ff44] via-[#00d4ff22] to-transparent" />

        <div className="space-y-10">
          {EXPERIENCE.map((exp, ei) => (
            <motion.div
              key={exp.role + exp.period}
              className="relative pl-10"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: ei * 0.15 }}
            >
              {/* Dot */}
              <div
                className="absolute left-0 top-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: exp.current ? 'rgba(0,212,255,0.15)' : 'rgba(74,112,144,0.15)',
                  border: `1px solid ${exp.current ? '#00d4ff44' : '#4a709044'}`,
                  boxShadow: exp.current ? '0 0 12px rgba(0,212,255,0.3)' : 'none',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: exp.current ? '#00d4ff' : '#4a7090' }}
                />
              </div>

              <div className="glass-soc rounded-sm p-6" style={{ borderColor: exp.current ? 'rgba(0,212,255,0.2)' : 'rgba(74,112,144,0.15)' }}>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-0.5">{exp.role}</h3>
                    <p className="text-[#00d4ff] text-sm font-medium">{exp.company}</p>
                    <p className="font-mono text-[10px] text-[#4a7090] mt-0.5">{exp.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {exp.current && (
                      <span className="flex items-center gap-1 font-mono text-[9px] tracking-[0.2em] text-[#00ff88] px-2 py-1 rounded-sm" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-white px-2 py-1 rounded-sm" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-4">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-[#9ab5cc] text-sm leading-relaxed">
                      <span className="text-[#00d4ff] font-mono mt-0.5 flex-shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span key={t} className="tag-soc">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
