import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

// Home ships in the main bundle (it is the LCP route); the rest split out.
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const jumpToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden="true" />
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        {/*
          `mode="wait"` lets the outgoing route finish fading before the next
          mounts, and onExitComplete resets scroll at the moment the old page
          is gone — so navigation never flashes the new page mid-scroll.
        */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={jumpToTop}>
          <Suspense key={location.pathname} fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/work" element={<Work />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
