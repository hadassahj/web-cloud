'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* HERO SECTION - Imersiv */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Imagine de fundal cu overlay intunecat */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        {/* Continut Hero */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Visual Storytelling <br /> for the Bold.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Finitiv is a creative studio capturing moments that matter. 
            From weddings to commercial projects, we frame your emotions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Butonul care trebuie să fie Alb pe NEGRU */}
            <Link 
              href="/photography" 
              className="bg-white px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
            >
              <span className="text-black">View Portfolio</span> {/* <--- AICI E SCHIMBAREA */}
            </Link>
            
            {/* Butonul secundar (Border Alb) */}
            <Link href="/contact" className="border border-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition duration-300">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION - Minimalist */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Philosophy</h2>
            <div className="w-20 h-1 bg-white mx-auto rounded-full opacity-50"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Artistic Vision", text: "We don't just take photos; we create art that reflects your unique personality." },
              { title: "Timeless Quality", text: "Using state-of-the-art equipment to deliver 4K memories that last forever." },
              { title: "Human Connection", text: "We believe the best shots happen when you feel comfortable and understood." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 hover:border-white/20 transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}