import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import JusPurAnanas from './pages/JusPurAnanas'
import JusAnanaPassion from './pages/JusAnanaPassion'
import JusAnanaGingembre from './pages/JusAnanaGingembre'
import JusAnanasMangue from './pages/JusAnanasMangue'
import TheMoringa from './pages/TheMoringa'
import TisaneTurmerimove from './pages/TisaneTurmerimove'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/"                    element={<Home />} />
          <Route path="/jus-pur-ananas"      element={<JusPurAnanas />} />
          <Route path="/jus-ananas-passion"  element={<JusAnanaPassion />} />
          <Route path="/jus-ananas-gingembre" element={<JusAnanaGingembre />} />
          <Route path="/jus-ananas-mangue"   element={<JusAnanasMangue />} />
          <Route path="/the-moringa"         element={<TheMoringa />} />
          <Route path="/tisane-turmerimove"  element={<TisaneTurmerimove />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen" style={{ background: 'var(--dark)' }}>
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </div>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#0E0E0E',
                color: 'var(--gold)',
                border: '1px solid rgba(255,215,0,0.15)',
                fontFamily: 'DM Sans',
                fontSize: '13px',
              }
            }}
          />
        </BrowserRouter>
      )}
    </>
  )
}
