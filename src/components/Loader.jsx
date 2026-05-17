import React from 'react'
import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center">
      {/* Liquid Wave Animation for the Logo */}
      <div className="relative overflow-hidden w-48 h-16 flex items-center justify-center mb-4">
        <h1 className="text-4xl font-display font-bold text-white z-10 mix-blend-difference">
          KERAL-B
        </h1>
        
        {/* Animated Liquid Background */}
        <motion.div 
          animate={{ 
            y: ['0%', '-50%', '0%'],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 top-8 bg-gradient-to-t from-keral-yellow via-keral-orange to-transparent w-[200%] -left-1/2 rounded-[40%]"
        />
      </div>

      <div className="flex gap-2">
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
          className="w-2 h-2 rounded-full bg-keral-yellow"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
          className="w-2 h-2 rounded-full bg-keral-orange"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
          className="w-2 h-2 rounded-full bg-keral-green"
        />
      </div>
    </div>
  )
}
