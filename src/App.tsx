import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './contexts/ThemeContext'
import { useSEO } from './hooks/useSEO'
import ErrorBoundary from './components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { LazyMotion, domAnimation } from 'framer-motion'

function App() {
  useSEO()

  return (
    <ThemeProvider>
      {/* Components use the lightweight m.* elements; strict errors if a full motion.* sneaks back in */}
      <LazyMotion features={domAnimation} strict>
        <ErrorBoundary>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </ErrorBoundary>
      </LazyMotion>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}

export default App
