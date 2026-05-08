import { useEffect, useRef } from 'react'
import useStore from '../store/useStore'

/*
  InteractiveBg — SOC mode only.
  110 nodes forming a live network graph.
  Nodes repel from mouse cursor, edges glow cyan/green/purple.
  Mouse ripple follows cursor.
*/

export default function InteractiveBg() {
  const canvasRef = useRef(null)
  const mode = useStore((s) => s.mode)

  useEffect(() => {
    if (mode !== 'soc') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf
    let W = 0, H = 0
    const mouse = { x: -9999, y: -9999 }

    const NODE_COUNT = 110
    let nodes = []

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.6 + 0.7,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > 0.6
          ? [0, 212, 255]
          : Math.random() > 0.45
          ? [0, 255, 136]
          : [121, 40, 202],
      }))
    }

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      initNodes()
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }

    const CONNECT_DIST = 130
    const REPEL_DIST   = 150

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)

      // Vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.08, W / 2, H / 2, H * 0.9)
      vig.addColorStop(0, 'rgba(0,8,19,0)')
      vig.addColorStop(1, 'rgba(0,8,19,0.9)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      const mx = mouse.x, my = mouse.y

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.pulse += 0.016

        // Repel from cursor
        const dx = n.x - mx, dy = n.y - my
        const d2 = dx * dx + dy * dy
        if (d2 < REPEL_DIST * REPEL_DIST && d2 > 0) {
          const d = Math.sqrt(d2)
          const f = (REPEL_DIST - d) / REPEL_DIST * 1.1
          n.vx += (dx / d) * f
          n.vy += (dy / d) * f
        }

        n.vx *= 0.984; n.vy *= 0.984
        n.x  += n.vx;  n.y  += n.vy

        // Wrap
        if (n.x < -20) n.x = W + 20
        if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20
        if (n.y > H + 20) n.y = -20

        // Edges
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const ex = m.x - n.x, ey = m.y - n.y
          const ed = Math.sqrt(ex * ex + ey * ey)
          if (ed < CONNECT_DIST) {
            const [r, g, b] = n.color
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - ed / CONNECT_DIST) * 0.2})`
            ctx.lineWidth = 0.6
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        }

        // Glow + core
        const [r, g, b] = n.color
        const a    = 0.5 + Math.sin(n.pulse) * 0.25
        const size = n.r + Math.sin(n.pulse * 0.7) * 0.3

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, size * 4)
        grd.addColorStop(0, `rgba(${r},${g},${b},${a})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(n.x, n.y, size * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd; ctx.fill()

        ctx.beginPath(); ctx.arc(n.x, n.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${a + 0.25})`; ctx.fill()
      }

      // Cursor ripple
      if (mx > 0 && my > 0) {
        const rr = 80 + Math.sin(t * 0.003) * 18
        const rip = ctx.createRadialGradient(mx, my, 0, mx, my, rr)
        rip.addColorStop(0,   'rgba(0,212,255,0.1)')
        rip.addColorStop(0.5, 'rgba(0,212,255,0.04)')
        rip.addColorStop(1,   'rgba(0,212,255,0)')
        ctx.beginPath(); ctx.arc(mx, my, rr, 0, Math.PI * 2)
        ctx.fillStyle = rip; ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [mode])

  if (mode !== 'soc') return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1]"
      style={{ pointerEvents: 'none', display: 'block' }}
    />
  )
}

