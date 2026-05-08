import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import useStore from '../store/useStore'
import SOCScene from './SOCScene'

export default function Canvas3D() {
  const mode = useStore((s) => s.mode)
  if (mode !== 'soc') return null

  return (
    <div className="fixed inset-0 z-[2]" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <SOCScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
