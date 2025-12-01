'use client'
import { useState, useEffect } from 'react' // Importam useState si useEffect
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase' // NOU: Conexiunea la DB!

export default function Videography() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      // CEREM DOAR PROIECTELE DE TIP 'video' DIN TABELUL 'projects'
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('type', 'video') // <--- FILTRUL MAGIC
        .order('id', { ascending: false })

      if (error) console.error('Eroare la incarcarea video:', error)
      else setVideos(data)
      
      setLoading(false)
    }
    fetchVideos()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Motion Pictures</h1>
        <p className="font-sans text-gray-400 tracking-wide uppercase text-sm">Cinematic storytelling</p>
      </div>

      {loading && <div className="text-center animate-pulse text-gray-500">Loading portfolio from database...</div>}

      <div className="flex flex-col gap-24 max-w-5xl mx-auto">
        {!loading && videos.map((video) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Header Video */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 px-2 border-b border-white/10 pb-2">
              <h2 className="font-serif text-3xl">{video.title}</h2>
              <span className="font-sans text-gray-500 text-sm uppercase tracking-widest">{video.category}</span>
            </div>

            {/* Player Video */}
            <div className="relative w-full aspect-video bg-gray-900 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <iframe 
                src={video.image_url} // Aici trage link-ul din DB
                title={video.title} 
                className="absolute top-0 left-0 w-full h-full" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        ))}
        {videos.length === 0 && !loading && (
             <div className="text-center text-gray-500 py-10">Nu sunt clipuri video adăugate în baza de date.</div>
        )}
      </div>
    </main>
  )
}