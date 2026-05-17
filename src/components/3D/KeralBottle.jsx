import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function KeralBottle({ 
  liquidColor = "#FFD700", 
  emissiveColor = "#FF6B00",
  capColor = "#2D7A2D",
  labelTitle = "Keral",
  labelSubtitle = "Pur jus\nd'Ananas",
  ...props 
}) {
  const group = useRef()

  // Generate points for the bottle profile based on reference sheet dimensions
  // Translated to 3D units (scaled down)
  const points = useMemo(() => {
    const pts = []
    // Bottom to top profile
    pts.push(new THREE.Vector2(0.01, -0.865)) // Center bottom
    pts.push(new THREE.Vector2(0.28, -0.865)) // Bottom edge
    pts.push(new THREE.Vector2(0.30, -0.84)) // Bottom curve
    pts.push(new THREE.Vector2(0.30, -0.3)) // Straight body lower
    pts.push(new THREE.Vector2(0.246, 0.0)) // Waist (middle 15.5cm circ)
    pts.push(new THREE.Vector2(0.29, 0.4)) // Upper body bulge
    pts.push(new THREE.Vector2(0.23, 0.65)) // Neck taper
    pts.push(new THREE.Vector2(0.218, 0.75)) // Neck straight (top 13.7cm circ)
    pts.push(new THREE.Vector2(0.218, 0.85)) // Neck top
    pts.push(new THREE.Vector2(0.23, 0.865)) // Glass lip
    
    // Smooth the curve
    const curve = new THREE.SplineCurve(pts)
    return curve.getPoints(50)
  }, [])

  // Floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.5) * 0.05
      group.current.rotation.y += 0.005 // Slow auto-rotation
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Liquid (Juice) inside the bottle */}
      <mesh position={[0, -0.05, 0]} scale={[0.95, 0.9, 0.95]}>
        <latheGeometry args={[points, 64]} />
        <meshPhysicalMaterial 
          color={liquidColor}
          emissive={emissiveColor}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.1}
          transmission={0.5} // semi-transparent liquid
          thickness={0.5}
        />
      </mesh>

      {/* Glass Bottle */}
      <mesh>
        <latheGeometry args={[points, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={1} // pure glass
          opacity={1}
          metalness={0}
          roughness={0.05}
          ior={1.5}
          thickness={0.1}
          specularIntensity={1}
          specularColor="#ffffff"
          envMapIntensity={1}
        />
      </mesh>

      {/* Metal Cap */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
        <meshStandardMaterial 
          color={capColor}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Label Overlay (HTML) */}
      <Html 
        position={[0, -0.1, 0.3]} 
        transform 
        occlude
        distanceFactor={1.5}
      >
        <div className="w-32 h-40 bg-white/90 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 p-2 flex flex-col items-center justify-center font-display">
          <h2 className="text-keral-orange font-bold text-xl italic tracking-tighter">{labelTitle}</h2>
          <p className="text-[8px] font-sans text-zinc-800 text-center uppercase tracking-widest mt-1 whitespace-pre-line">
            {labelSubtitle}
          </p>
          <div className="mt-2 w-12 h-12 bg-keral-yellow rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-zinc-900">100%</span>
          </div>
          <p className="text-[6px] text-zinc-500 mt-2 font-sans">Sans sucre ajouté</p>
        </div>
      </Html>
    </group>
  )
}
