import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  {
    label: 'SIEM & Monitoring',
    items: ['Splunk', 'MS Sentinel', 'KQL', 'Log Correlation', 'Alert Triage', 'Threat Hunting'],
    color: '#00d4ff',
  },
  {
    label: 'EDR / XDR / EPP',
    items: ['CrowdStrike Falcon', 'Cortex XDR', 'Cortex XSOAR', 'MS Defender', 'Trend Micro'],
    color: '#00ff88',
  },
  {
    label: 'Asset & Visibility',
    items: ['Axonius', 'Tanium', 'Nozomi Networks'],
    color: '#7928ca',
  },
  {
    label: 'Threat Intelligence',
    items: ['OSINT', 'CTI', 'MITRE ATT&CK', 'IOC / IOA', 'Threat Feeds'],
    color: '#00d4ff',
  },
  {
    label: 'Network Security',
    items: ['Palo Alto', 'Firewall Analysis', 'IDS / IPS', 'Packet Analysis'],
    color: '#00ff88',
  },
  {
    label: 'Automation & Scripting',
    items: ['Python', 'PowerShell'],
    color: '#f59e0b',
  },
  {
    label: 'Identity & Cloud',
    items: ['Azure AD', 'IAM', 'MS Purview', 'DLP', 'MFA / SSO'],
    color: '#00d4ff',
  },
  {
    label: 'Malware & Forensics',
    items: ['Phishing Analysis', 'Sandbox', 'VirusTotal', 'AbuseIPDB', 'URLSCAN'],
    color: '#ff6b6b',
  },
  {
    label: 'Ticketing & Reporting',
    items: ['ServiceNow', 'Jira', 'RCA Reports', 'Exec Summaries'],
    color: '#00ff88',
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">

      {/* Section label */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#00d4ff]">// 02</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">CAPABILITY MATRIX</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff33] to-transparent max-w-xs" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            className="glass-soc rounded-sm p-5"
            style={{ borderColor: `${group.color}22` }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: gi * 0.07 }}
            whileHover={{ borderColor: `${group.color}44`, y: -2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 6px ${group.color}` }} />
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: group.color }}>
                {group.label}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 font-mono text-[11px] rounded-sm border transition-all duration-200"
                  style={{
                    background: `${group.color}08`,
                    borderColor: `${group.color}22`,
                    color: '#9ab5cc',
                  }}
                  onMouseEnter={e => { e.target.style.color = group.color; e.target.style.borderColor = `${group.color}55` }}
                  onMouseLeave={e => { e.target.style.color = '#9ab5cc'; e.target.style.borderColor = `${group.color}22` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
