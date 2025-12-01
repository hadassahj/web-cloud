'use client'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Partea Stanga - Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Let's create <br /> together.</h1>
          <p className="font-sans text-gray-400 text-lg mb-12 max-w-md">
            Have a project in mind? We'd love to hear about it. Drop us a line and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-6 font-sans">
            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="w-5 h-5" />
              <span>contact@finitiv.ro</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <Phone className="w-5 h-5" />
              <span>+40 700 123 456</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <MapPin className="w-5 h-5" />
              <span>Bucharest / Cluj / Craiova</span>
            </div>
          </div>
        </motion.div>

        {/* Partea Dreapta - Formular Minimalist */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-neutral-900/30 p-8 md:p-12 rounded-2xl border border-white/5 backdrop-blur-sm"
        >
          <form className="flex flex-col gap-8">
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-700 text-white p-2 focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-gray-700 text-white p-2 focus:outline-none focus:border-white transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-transparent border-b border-gray-700 text-white p-2 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-4 bg-white text-black py-4 px-8 rounded-full font-bold tracking-wide hover:bg-gray-200 transition-colors self-start"
            >
              SEND MESSAGE
            </button>
          </form>
        </motion.div>

      </div>
    </main>
  )
}