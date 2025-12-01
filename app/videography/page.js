'use client'
import { motion } from 'framer-motion'

export default function Videography() {
  const videos = [
    { 
      title: 'Eternal Vows', 
      subtitle: 'Andrei & Ioana Wedding', 
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
    },
    { 
      title: 'Urban Rhythm', 
      subtitle: 'Fashion Campaign 2025', 
      src: 'https://www.youtube.com/embed/3JZ_D3ELwOQ' 
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Motion Pictures</h1>
        <p className="font-sans text-gray-400 tracking-wide uppercase text-sm">Cinematic storytelling</p>
      </div>

      <div className="flex flex-col gap-24 max-w-5xl mx-auto">
        {videos.map((video, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Titluri pozitionate artistic deasupra video-ului */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 px-2 border-b border-white/10 pb-2">
              <h2 className="font-serif text-3xl">{video.title}</h2>
              <span className="font-sans text-gray-500 text-sm">{video.subtitle}</span>
            </div>

            {/* Container Video */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <iframe 
                src={video.src} 
                title={video.title} 
                className="absolute top-0 left-0 w-full h-full" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  )
}