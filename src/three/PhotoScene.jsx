import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { scrollRef } from '../store/useStore'

/* ---------- Bokeh Particles ---------- */
function BokehField() {
  const ref = useRef()
  const count = 2000

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz  = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
      sz[i] = Math.random() * 0.15 + 0.03
    }
    return { positions: pos, sizes: sz }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.025
      ref.current.rotation.z = t * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#f59e0b"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ---------- Floating Photo Frames ---------- */
function FloatingFrames() {
  const frames = useMemo(() => [
    { pos: [-4, 1, -2],  rot: [0.1, 0.3, 0],   w: 2.4, h: 1.8 },
    { pos: [3.5, -0.5, -3], rot: [-0.1, -0.4, 0.05], w: 2, h: 2.6 },
    { pos: [-2, -2, -1], rot: [0.2, 0.2, -0.1], w: 3, h: 2 },
    { pos: [1.5, 2, -4], rot: [0, -0.3, 0.1],   w: 2.2, h: 1.6 },
    { pos: [5, 1, -2],   rot: [0.1, -0.5, 0],   w: 1.8, h: 2.4 },
    { pos: [-5, 0, -4],  rot: [-0.05, 0.4, 0],  w: 2.6, h: 1.8 },
  ], [])

  return (
    <group>
      {frames.map((f, i) => (
        <Float key={i} speed={0.8 + i * 0.2} floatIntensity={0.3} rotationIntensity={0.1}>
          <group position={f.pos} rotation={f.rot}>
            {/* Frame border */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(f.w, f.h, 0.04)]} />
              <lineBasicMaterial color="#f59e0b" transparent opacity={0.4} />
            </lineSegments>
            {/* Inner surface */}
            <mesh>
              <planeGeometry args={[f.w - 0.1, f.h - 0.1]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? '#1a0f00' : i % 3 === 1 ? '#0f0a00' : '#120d02'}
                transparent opacity={0.6}
              />
            </mesh>
            {/* Corner accents */}
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], ci) => (
              <mesh key={ci} position={[sx * (f.w / 2 - 0.1), sy * (f.h / 2 - 0.1), 0.02]}>
                <sphereGeometry args={[0.04, 6, 6]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
            ))}
          </group>
        </Float>
      ))}
    </group>
  )
}

/* ---------- Lens Aperture ---------- */
function LensShape() {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) ref.current.rotation.z = t * 0.08
  })

  return (
    <group ref={ref} position={[2, 0.5, -6]}>
      {[1.8, 2.4, 3.0].map((r, i) => (
        <mesh key={i} rotation={[0, 0, (i / 3) * Math.PI]}>
          <torusGeometry args={[r, 0.012, 4, 60]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.18 - i * 0.04} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Warm Particle Drift ---------- */
function DustDrift() {
  const ref = useRef()
  const count = 800
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.015
      ref.current.position.y = Math.sin(t * 0.05) * 0.3
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ec4899" transparent opacity={0.25} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ---------- Camera Rig ---------- */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const s = scrollRef.current
    state.camera.position.x = Math.sin(t * 0.06) * 1
    state.camera.position.y = Math.cos(t * 0.04) * 0.5 - s * 2
    state.camera.position.z = 12 - s * 3
    state.camera.lookAt(0, -s * 1.5, 0)
  })
  return null
}

export default function PhotoScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 0]}   intensity={1.5} color="#f59e0b" distance={25} />
      <pointLight position={[-4, 3, 0]}  intensity={1}   color="#ec4899" distance={18} />
      <pointLight position={[5, -2, -3]} intensity={0.8} color="#fbbf24" distance={15} />

      <BokehField />
      <FloatingFrames />
      <LensShape />
      <DustDrift />
    </>
  )
}
