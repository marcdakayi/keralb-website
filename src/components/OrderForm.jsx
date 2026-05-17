import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, CheckCircle, MapPin, Phone, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function OrderForm({ productName, price = 2500, colorCode }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    quantity: 1
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const handleQuantity = (delta) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          { 
            product: productName, 
            customer_name: formData.name,
            phone: formData.phone,
            address: formData.city,
            quantity: formData.quantity,
            total_price: price * formData.quantity,
            status: 'pending'
          }
        ])

      if (error) throw error
      setStatus('success')
    } catch (error) {
      console.error('Erreur:', error)
      setStatus('error')
    }
  }

  return (
    <div className="relative w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden mx-auto">
      
      {/* Decorative Blur */}
      <div 
        className="absolute -top-10 -right-10 w-48 h-48 blur-[80px] opacity-20 pointer-events-none" 
        style={{ backgroundColor: colorCode }} 
      />

      <h3 className="text-3xl font-display font-bold text-white mb-8">Commander</h3>
      
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-6" />
            </motion.div>
            <h4 className="text-2xl font-bold font-display text-white mb-2">Commande confirmée</h4>
            <p className="text-zinc-400 font-sans">
              Merci {formData.name} ! Nous vous appellerons au {formData.phone} pour la livraison à {formData.city}.
            </p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit} 
            className="space-y-5 relative z-10"
          >
            {/* Nom */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="text" required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-sans"
                placeholder="Votre nom complet"
              />
            </div>
            
            {/* Téléphone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="tel" required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-sans"
                placeholder="Numéro de téléphone"
              />
            </div>

            {/* Ville/Quartier */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="text" required
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-sans"
                placeholder="Ville ou Quartier"
              />
            </div>

            {/* Quantité Animée */}
            <div className="flex items-center justify-between bg-zinc-950/60 border border-white/10 rounded-xl p-2">
              <span className="pl-4 text-zinc-400 font-sans uppercase text-xs font-bold tracking-widest">Quantité</span>
              <div className="flex items-center gap-4">
                <motion.button 
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantity(-1)}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-8 text-center text-xl font-display font-bold text-white">
                  {formData.quantity}
                </span>
                <motion.button 
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantity(1)}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 flex justify-between items-end">
              <span className="text-zinc-500 font-sans text-sm">Total à payer</span>
              <div className="text-right">
                <span className="text-3xl font-bold font-display text-white">
                  {(price * formData.quantity).toLocaleString('fr-FR')} <span className="text-lg">FCFA</span>
                </span>
              </div>
            </div>

            {/* Liquid Submit Button */}
            <motion.button 
              type="submit" 
              disabled={status === 'submitting'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative px-8 py-5 mt-4 rounded-xl overflow-hidden group disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-zinc-800 transition-colors"></div>
              <div 
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-80"
                style={{ backgroundColor: colorCode }}
              />
              <span className="relative z-10 font-bold font-sans uppercase tracking-widest text-white">
                {status === 'submitting' ? 'Traitement...' : 'Commander Maintenant'}
              </span>
            </motion.button>

          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
