import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { scrollRef } from '../store/useStore'

/* ---------- Particle Field ---------- */
function ParticleField() {
  const ref = useRef()
  const count = 3000

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      const t = Math.random()
      // mix cyan and green
      col[i * 3]     = 0
      col[i * 3 + 1] = t > 0.5 ? 0.83 : 1.0
      col[i * 3 + 2] = t > 0.5 ? 1.0  : 0.53
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const s = scrollRef.current
    if (ref.current) {
      ref.current.rotation.y = t * 0.04 + s * 0.5
      ref.current.rotation.x = s * 0.2
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ---------- Network Graph ---------- */
const NODE_COUNT = 22

function NetworkGraph() {
  const groupRef = useRef()

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes = Array.from({ length: NODE_COUNT }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 6,
    ))

    const lines = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 5.5) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z)
          lines.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    return {
      nodePositions: nodes,
      linePositions: new Float32Array(lines),
    }
  }, [])

  const nodePhases = useMemo(() => nodePositions.map(() => Math.random() * Math.PI * 2), [nodePositions])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const s = scrollRef.current
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05 + s * 0.8
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.08 + s * 0.2
      groupRef.current.children.forEach((child, i) => {
        if (child.userData.isNode) {
          const phase = nodePhases[i - 1] || 0
          child.position.y = nodePositions[i - 1]?.y + Math.sin(t * 0.6 + phase) * 0.18
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.18} />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos} userData={{ isNode: true }}>
          <sphereGeometry args={[0.08 + Math.random() * 0.06, 8, 8]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? '#00ff88' : '#00d4ff'}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Central Globe ---------- */
function ThreatGlobe() {
  const outerRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const s = scrollRef.current
    const scale = 1 + s * 0.3
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12
      outerRef.current.rotation.x = t * 0.05
      outerRef.current.scale.setScalar(scale)
    }
    if (ring1Ref.current) { ring1Ref.current.rotation.z = t * 0.3; ring1Ref.current.scale.setScalar(scale) }
    if (ring2Ref.current) { ring2Ref.current.rotation.x = t * 0.2; ring2Ref.current.scale.setScalar(scale) }
    if (ring3Ref.current) { ring3Ref.current.rotation.y = t * 0.15; ring3Ref.current.scale.setScalar(scale) }
  })

  return (
    <group position={[4, 0, -4]}>
      {/* Core sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.4, 28, 28]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.04} />
      </mesh>

      {/* Orbit rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.008, 4, 80]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[2.4, 0.005, 4, 80]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[-0.5, 0.8, 0]}>
        <torusGeometry args={[2.8, 0.005, 4, 80]} />
        <meshBasicMaterial color="#7928ca" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

/* ---------- Floating Hex Nodes ---------- */
function HexNodes() {
  return (
    <group position={[-5, -1, -2]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={0.3}
          floatIntensity={0.5}
          floatingRange={[-0.4, 0.4]}
        >
          <mesh
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 2.2,
              Math.sin((i / 6) * Math.PI * 2) * 1.5,
              i * 0.3,
            ]}
          >
            <cylinderGeometry args={[0.25, 0.25, 0.08, 6]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00d4ff' : '#00ff88'} transparent opacity={0.5} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ---------- Camera Controller ---------- */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const s = scrollRef.current
    // Gentle drift + scroll-driven Z pull
    state.camera.position.x = Math.sin(t * 0.08) * 0.8
    state.camera.position.y = Math.cos(t * 0.06) * 0.5 - s * 2
    state.camera.position.z = 12 - s * 4
    state.camera.lookAt(0, -s * 1.5, 0)
  })
  return null
}

/* ---------- SOC Scene Root ---------- */
export default function SOCScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 0]}   intensity={2}   color="#00d4ff" distance={20} />
      <pointLight position={[4, 2, -4]}  intensity={1.5} color="#00ff88" distance={15} />
      <pointLight position={[-4, -2, 0]} intensity={0.8} color="#7928ca" distance={12} />

      <Stars radius={80} depth={40} count={2000} factor={2} saturation={0} fade speed={0.5} />
      <ParticleField />
      <NetworkGraph />
      <ThreatGlobe />
      <HexNodes />
    </>
  )
}
