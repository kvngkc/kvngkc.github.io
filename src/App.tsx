import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Footer from './components/Footer'
import ScorecardApp from './Victor Linkedin/ScorecardApp'

function PortfolioApp() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black">
      <nav className="fixed top-0 w-full z-50 glass border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Victor K. Okoye</span>
          <div className="space-x-6 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#systems" className="hover:text-white transition-colors">Systems</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (route === '/scorecard' || route === '/scorecard.html') {
    return <ScorecardApp />;
  }

  return <PortfolioApp />;
}
