import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  ── UPLOAD GUIDE ──────────────────────────────────────────────
  Folder : public/gallery/
  Videos : video-001.mp4 → video-050.mp4   (vertical 9:16 preferred)

  To add more videos, change VIDEO_COUNT below.
  To use real files just drop them in public/gallery/ with the same naming.
  ─────────────────────────────────────────────────────────────
*/
const VIDEO_COUNT = 30

const buildVideos = () =>
  Array.from({ length: VIDEO_COUNT }, (_, i) => {
    const n = String(i + 1).padStart(3, '0')
    return { id: `video-${n}`, src: `/gallery/video-${n}.mp4` }
  })

export const GALLERY_ITEMS = buildVideos()

/* ── Column speeds (px per frame). Alternating direction per column ── */
const SPEEDS = [0.55, 0.38, 0.48, 0.42, 0.50]
const COLS   = 5

/* ────────────────────────────────────────────────────────────────
   VideoCard — vertical tile with thumbnail + play overlay
──────────────────────────────────────────────────────────────── */
function VideoCard({ item, onClick }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [errored, setErrored] = useState(false)

  // Grab first frame as soon as metadata is available
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onMeta = () => {
      v.currentTime = 0.001  // seek to first frame so browser paints thumbnail
    }
    const onSeeked = () => setReady(true)
    const onErr   = () => setErrored(true)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('seeked', onSeeked)
    v.addEventListener('error', onErr)
    return () => {
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('seeked', onSeeked)
      v.removeEventListener('error', onErr)
    }
  }, [item.src])

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden group"
      style={{ aspectRatio: '9/16', background: '#0a0a0a', borderRadius: 2 }}
      onClick={() => onClick(item)}
    >
      {/* Actual video for thumbnail — hidden controls, muted, no autoplay */}
      {!errored && (
        <video
          ref={videoRef}
          src={item.src}
          preload="metadata"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s' }}
        />
      )}

      {/* Placeholder when no real video or still loading */}
      {(!ready || errored) && (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(160deg,#0f0f0f,#181818)' }}>
          <span className="font-mono text-[10px] tracking-widest opacity-20 select-none" style={{ color: '#fff' }}>
            {item.id.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      )}

      {/* Play button overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(0,0,0,0.35)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)' }}>
          <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   Lightbox — plays video with full audio, keyboard nav
──────────────────────────────────────────────────────────────── */
function Lightbox({ idx, onClose, onPrev, onNext }) {
  const item = GALLERY_ITEMS[idx]
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [idx])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft')  onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="fixed inset-0 z-[900] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(24px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-6 font-mono text-xs tracking-widest transition-colors z-10"
        style={{ color: '#666' }}
        onMouseEnter={e => e.target.style.color = '#fff'}
        onMouseLeave={e => e.target.style.color = '#666'}
        onClick={onClose}
      >
        ESC ✕
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 z-10 transition-colors"
        style={{ color: '#555' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#555'}
        onClick={e => { e.stopPropagation(); onPrev() }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 z-10 transition-colors"
        style={{ color: '#555' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#555'}
        onClick={e => { e.stopPropagation(); onNext() }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Video */}
      <motion.div
        className="relative"
        style={{ maxHeight: '90vh', maxWidth: '90vw' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          key={item.src}
          src={item.src}
          controls
          autoPlay
          playsInline
          style={{
            maxHeight: '88vh',
            maxWidth: 'min(88vw, 540px)',
            borderRadius: 4,
            background: '#000',
            display: 'block',
          }}
        />
        <p className="font-mono text-[10px] text-center mt-2 tracking-widest" style={{ color: '#444' }}>
          {item.id.replace(/-/g, ' ').toUpperCase()} &nbsp;·&nbsp; {idx + 1} / {GALLERY_ITEMS.length}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────
   InfiniteColumn — scroll-driven perpetual loop
──────────────────────────────────────────────────────────────── */
function InfiniteColumn({ items, colIndex, onOpen }) {
  const wrapRef = useRef(null)
  const posRef  = useRef(colIndex % 2 === 0 ? 0 : 9999) // stagger start
  const velRef  = useRef(0)
  const wheelVelRef = useRef(0)
  const pauseRef = useRef(false)
  const afRef   = useRef(null)

  const dir    = colIndex % 2 === 0 ? 1 : -1
  const baseSpeed = SPEEDS[colIndex % SPEEDS.length]

  useEffect(() => {
    const onWheel = (e) => {
      wheelVelRef.current += e.deltaY * 0.25 * dir
    }
    window.addEventListener('wheel', onWheel, { passive: true })

    const onTouch = (() => {
      let lastY = 0
      return {
        start: (e) => { lastY = e.touches[0].clientY },
        move:  (e) => {
          const dy = lastY - e.touches[0].clientY
          wheelVelRef.current += dy * 0.8 * dir
          lastY = e.touches[0].clientY
        },
      }
    })()
    window.addEventListener('touchstart', onTouch.start, { passive: true })
    window.addEventListener('touchmove',  onTouch.move,  { passive: true })

    const tick = () => {
      const el = wrapRef.current
      if (!el || pauseRef.current) { afRef.current = requestAnimationFrame(tick); return }

      // Ease wheel velocity in, decay out
      velRef.current      += (wheelVelRef.current - velRef.current) * 0.08
      wheelVelRef.current *= 0.88

      posRef.current += baseSpeed * dir + velRef.current * 0.06

      // Seamless loop at half-height
      const halfH = el.scrollHeight / 2
      if (halfH > 0) {
        if (posRef.current >  halfH) posRef.current -= halfH
        if (posRef.current < -halfH) posRef.current += halfH
      }
      el.style.transform = `translateY(${-posRef.current}px)`
      afRef.current = requestAnimationFrame(tick)
    }
    afRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(afRef.current)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouch.start)
      window.removeEventListener('touchmove',  onTouch.move)
    }
  }, [dir, baseSpeed])

  // Triple the items so the loop never shows a gap
  const tripled = [...items, ...items, ...items]

  return (
    <div
      className="overflow-hidden h-full relative"
      onMouseEnter={() => { pauseRef.current = true }}
      onMouseLeave={() => { pauseRef.current = false }}
    >
      <div ref={wrapRef} className="flex flex-col gap-2 will-change-transform">
        {tripled.map((item, i) => (
          <VideoCard key={`${item.id}-${i}`} item={item} onClick={onOpen} />
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────
   PhotoWall root
──────────────────────────────────────────────────────────────── */
export default function PhotoWall() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const colCount = typeof window !== 'undefined'
    ? (window.innerWidth < 480 ? 2 : window.innerWidth < 900 ? 3 : COLS)
    : COLS

  // Distribute videos across columns
  const columns = Array.from({ length: colCount }, () => [])
  GALLERY_ITEMS.forEach((item, i) => columns[i % colCount].push(item))

  const openAt   = useCallback((item) => {
    const idx = GALLERY_ITEMS.findIndex(v => v.id === item.id)
    setLightboxIdx(idx >= 0 ? idx : 0)
  }, [])
  const close  = useCallback(() => setLightboxIdx(null), [])
  const prev   = useCallback(() => setLightboxIdx(i => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length), [])
  const next   = useCallback(() => setLightboxIdx(i => (i + 1) % GALLERY_ITEMS.length), [])

  return (
    <div className="fixed inset-0 z-[10]" style={{ background: '#080808' }}>
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 1fr)`, gap: '8px', padding: '0 8px' }}
      >
        {columns.map((col, ci) => (
          <InfiniteColumn key={ci} items={col} colIndex={ci} onOpen={openAt} />
        ))}
      </div>

      {/* Top + bottom soft fade */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-[20]"
        style={{ background: 'linear-gradient(to bottom, #080808, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-[20]"
        style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox key={lightboxIdx} idx={lightboxIdx} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </div>
  )
}

