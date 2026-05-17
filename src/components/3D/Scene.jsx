import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float, PresentationControls } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import KeralBottle from './KeralBottle'

function Rig() {
  const ref = useRef()
  useFrame((state) => {
    // Make the camera slightly follow the mouse
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.05)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 10, 0.05)
  })
  return <group ref={ref} />
}

import * as THREE from 'three'

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={['#09090b']} /> {/* zinc-950 */}
        
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={2} color="#FFD700" />
        <spotLight position={[-5, 5, -5]} angle={0.15} penumbra={1} intensity={2} color="#2D7A2D" />
        
        <Suspense fallback={null}>
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0.3, 0]} 
            polar={[-Math.PI / 3, Math.PI / 3]} 
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Float rotationIntensity={0.4} floatIntensity={2} speed={1.5}>
              <KeralBottle scale={1.2} />
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -1.4, 0]} opacity={0.7} scale={10} blur={2.5} far={4} color="#FF6B00" />
          
          <Environment preset="studio" />
        </Suspense>

        {/* Postprocessing for cinematic look */}
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={0.8} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
        
        <Rig />
      </Canvas>
    </div>
  )
}
