import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import JusPurAnanas from './pages/JusPurAnanas'
import JusAnamasPassion from './pages/JusAnamasPassion'
import JusAnanaGingembre from './pages/JusAnanaGingembre'
import JusAnanasMangue from './pages/JusAnanasMangue'
import TheMoringa from './pages/TheMoringa'
import TisaneTurmeriMove from './pages/TisaneTurmeriMove'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#CCCCCC] font-sans selection:bg-keral-orange selection:text-white flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/jus-pur-ananas" element={<JusPurAnanas />} />
            <Route path="/jus-ananas-passion" element={<JusAnamasPassion />} />
            <Route path="/jus-ananas-gingembre" element={<JusAnanaGingembre />} />
            <Route path="/jus-ananas-mangue" element={<JusAnanasMangue />} />
            <Route path="/the-moringa" element={<TheMoringa />} />
            <Route path="/tisane-turmerimove" element={<TisaneTurmeriMove />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
