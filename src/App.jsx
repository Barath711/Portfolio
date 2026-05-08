import { AnimatePresence, motion } from 'framer-motion'
import useStore from './store/useStore'
import { useLenis } from './hooks/useLenis'
import { useScrollProgress } from './hooks/useScrollProgress'
import Loader from './components/Loader'
import Navigation from './components/Navigation'
import ModeSwitcher from './components/ModeSwitcher'
import Cursor from './components/Cursor'
import InteractiveBg from './components/InteractiveBg'
import Canvas3D from './three/Canvas3D'
import PhotoWall from './components/PhotoWall'
import SOCContent from './sections/soc/SOCContent'

export default function App() {
  const { mode, loading } = useStore()

  useLenis()
  useScrollProgress()

  const isPhoto = mode === 'photo'

  return (
    <div className={`relative min-h-screen mode-${mode}`} style={{ background: isPhoto ? '#0a0805' : '#000813' }}>
      <Cursor />

      {/* Interactive canvas background (both modes) */}
      <InteractiveBg />

      {/* Three.js scene — SOC only */}
      {!isPhoto && <Canvas3D />}

      {/* Grid overlay — SOC only */}
      {!isPhoto && (
        <div className="fixed inset-0 pointer-events-none z-[1] cyber-grid opacity-50" />
      )}

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {/* UI */}
      {!loading && (
        <>
          {isPhoto ? (
            /* ── PHOTO MODE: full-screen wall, no nav clutter ── */
            <>
              <PhotoWall />
              <ModeSwitcher />
            </>
          ) : (
            /* ── SOC MODE: normal scrollable portfolio ── */
            <>
              <Navigation />
              <ModeSwitcher />
              <AnimatePresence mode="wait">
                <motion.div
                  key="soc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <SOCContent />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </>
      )}
    </div>
  )
}


