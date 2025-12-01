import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    // Am facut fundalul putin mai inchis si am marit padding-ul pe verticala
    <footer className="bg-neutral-950 border-t border-white/10 py-16 px-6">
      
      {/* Container Principal - Aliniaza vertical si separa spatiile mari pe desktop */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-center text-gray-400 md:gap-16">
        
        {/* LOGO & COPYRIGHT BLOCK (Stanga) */}
        <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/4">
          
          {/* LOGO */}
          <Link href="/" className="block mb-4">
            <img 
              src="/logo.png"
              alt="Finitiv Logo" 
              className="h-16 object-contain invert mx-auto md:mx-0" // Centram logo-ul pe mobil
            />
          </Link>
          
          {/* COPYRIGHT */}
          <p className="text-xs text-gray-500 mt-4 md:mt-2">
            © {new Date().getFullYear()} Finitiv. All rights reserved.
          </p>
        </div>

        {/* LINKURI RAPIDE (Centru) */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-sm mb-8 md:mb-0 md:w-1/2">
          {/* Am adaugat uppercase si font medium pentru a arata mai profesional */}
          <Link href="/about" className="text-white hover:text-gray-300 transition-colors uppercase font-medium tracking-wide">About</Link>
          <Link href="/photography" className="text-white hover:text-gray-300 transition-colors uppercase font-medium tracking-wide">Photography</Link>
          <Link href="/videography" className="text-white hover:text-gray-300 transition-colors uppercase font-medium tracking-wide">Videography</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition-colors uppercase font-medium tracking-wide">Contact</Link>
        </nav>

        {/* SOCIAL MEDIA ICONS (Dreapta) */}
        <div className="flex gap-6 md:gap-8 justify-center md:justify-end md:w-1/4">
          <a href="URL-INSTAGRAM" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
            <Instagram size={28} /> {/* Am marit iconitele */}
          </a>
          <a href="URL-FACEBOOK" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
            <Facebook size={28} /> {/* Am marit iconitele */}
          </a>
        </div>
      </div>
    </footer>
  )
}