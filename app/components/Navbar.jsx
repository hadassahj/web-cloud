'use client' // Important pentru hook-uri in Next.js
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Detectam scroll-ul pentru a schimba fundalul meniului
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
        FINITIV<span className="text-gray-500">.</span>
      </Link>

      {/* Link-uri Desktop */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        <NavLink href="/">HOME</NavLink>
        <NavLink href="/about">ABOUT</NavLink>
        <NavLink href="/photography">PHOTOGRAPHY</NavLink>
        <NavLink href="/videography">VIDEOGRAPHY</NavLink>
        <NavLink href="/contact">CONTACT</NavLink>
      </div>
    </motion.nav>
  )
}

// Componenta mica pentru link-uri cu efect de hover
function NavLink({ href, children }) {
  return (
    <Link href={href} className="relative group text-gray-300 hover:text-white transition-colors">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}