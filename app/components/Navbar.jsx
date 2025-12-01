'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react' // NOU: Iconite pentru meniu

// Componenta mica pentru link-uri cu efect de hover
function NavLink({ href, children, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="relative group text-gray-300 hover:text-white transition-colors uppercase tracking-wide text-sm md:text-base"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // NOU: Stare meniu mobil

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Inchide meniul dupa click pe un link
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-3 flex justify-between items-center ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        {/* Logo (Vizibil mereu) */}
        <Link href="/" className="block">
          <img 
            src="/logo.png" 
            alt="Finitiv Logo" 
            className="h-16 object-contain filter-white" /* NOU: Inversat in ALB (vizibil pe negru) */
          />
        </Link>

        {/* Link-uri Desktop (Ascuns pe mobil) */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <NavLink href="/">HOME</NavLink>
          <NavLink href="/about">ABOUT</NavLink>
          <NavLink href="/photography">PHOTOGRAPHY</NavLink>
          <NavLink href="/videography">VIDEOGRAPHY</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
        </div>

        {/* Buton Hamburger (Vizibil doar pe mobil) */}
        <button 
          className="md:hidden text-white z-50 p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </motion.nav>

      {/* NOU: MENIUL OVERLAY PENTRU MOBIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center pt-24"
          >
            <div className="flex flex-col gap-8 text-xl font-serif text-center">
              <NavLink href="/" onClick={closeMenu}>HOME</NavLink>
              <NavLink href="/about" onClick={closeMenu}>ABOUT</NavLink>
              <NavLink href="/photography" onClick={closeMenu}>PHOTOGRAPHY</NavLink>
              <NavLink href="/videography" onClick={closeMenu}>VIDEOGRAPHY</NavLink>
              <NavLink href="/contact" onClick={closeMenu}>CONTACT</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}