import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function KeralCarton({
  primaryColor = "#FFD700",
  labelTitle = "Thé de Moringa",
  labelSubtitle = "SANTÉ\nBEAUTÉ",
  ...props
}) {
  const group = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.5) * 0.05
      group.current.rotation.y += 0.005
    }
  })

  // Dimensions basées sur la fiche: 12cm(L) x 6.7cm(H) x 5.4cm(W)
  // Scalées à l'échelle de la scène (~ * 0.15)
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Boîte Principale */}
      <mesh>
        <boxGeometry args={[1.8, 1.0, 0.81]} />
        <meshStandardMaterial 
          color={primaryColor}
          roughness={0.9} // Le carton est mat
          metalness={0.0}
        />
      </mesh>
      
      {/* Étiquette / Design Frontal (HTML 3D) */}
      <Html 
        position={[0, 0, 0.41]} 
        transform 
        occlude
        distanceFactor={1.5}
      >
        <div className="w-48 h-[100px] bg-gradient-to-br from-white to-zinc-100 rounded-sm shadow-inner flex flex-col justify-center p-3 font-display relative overflow-hidden border border-black/5">
           <div className="absolute top-0 right-0 w-16 h-16 bg-keral-yellow rounded-bl-full opacity-20"></div>
           <div className="z-10 flex items-center justify-between">
             <div>
               <h2 className="text-keral-green font-bold text-xl leading-tight">{labelTitle}</h2>
               <p className="text-keral-yellow text-[9px] uppercase font-bold mt-1 whitespace-pre-line tracking-wider">{labelSubtitle}</p>
             </div>
             <div className="w-9 h-9 rounded-full bg-keral-green flex items-center justify-center text-white text-[8px] font-bold text-center leading-tight shadow-md">
               100%<br/>BIO
             </div>
           </div>
           <div className="mt-2 pt-2 border-t border-zinc-200 text-[6px] text-zinc-500 font-sans uppercase tracking-widest">
             20 Sachets de thé
           </div>
        </div>
      </Html>
    </group>
  )
}
