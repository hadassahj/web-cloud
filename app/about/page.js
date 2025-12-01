'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      
      {/* Intro Section - Split Screen */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            We capture <br /> the soul of <br /> the moment.
          </h1>
          <div className="h-1 w-20 bg-white mb-8"></div>
          <p className="font-sans text-gray-400 text-lg leading-relaxed mb-6">
            Finitiv started with a simple idea: that photography shouldn't just document an event, it should interpret it. 
            We are visual narrators obsessed with light, composition, and raw emotion.
          </p>
          <p className="font-sans text-gray-400 text-lg leading-relaxed">
            Whether it's the chaotic joy of a wedding or the structured elegance of a fashion shoot, 
            we bring a cinematic perspective to every frame.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] w-full"
        >
          {/* Imagine artistica despre echipa */}
          <img 
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop" 
            alt="The Team" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 rounded-sm"
          />
          {/* Chenar decorativ */}
          <div className="absolute top-4 -right-4 w-full h-full border border-white/20 -z-10 hidden md:block"></div>
        </motion.div>
      </section>

      {/* Stats / Philosophy */}
      <section className="border-y border-white/10 py-16 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { label: "Years Experience", value: "05+" },
            { label: "Projects Completed", value: "120+" },
            { label: "Happy Clients", value: "100%" }
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="font-serif text-5xl mb-2">{stat.value}</h3>
              <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}