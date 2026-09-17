import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import MotionProvider from './motion/MotionProvider'
import ScrollToTop from './motion/ScrollToTop'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Galeria from './pages/Galeria'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

// Árbol sin router: lo usan el navegador (BrowserRouter) y el prerenderizado (StaticRouter).
export function AppShell() {
  return (
    <MotionProvider>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppButton />
    </MotionProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
