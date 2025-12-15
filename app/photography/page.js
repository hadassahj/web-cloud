'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link' // <--- NOU: Import Link
import { supabase } from '../lib/supabase'

export default function Photography() {
  // NU MAI AVEM selectedImage, am sters si useState-ul de sus!
  const [photos, setPhotos] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('type', 'photo')
        .order('id', { ascending: false })

      if (error) console.error('Eroare la incarcarea pozelor:', error)
      else setPhotos(data)
      setLoading(false)
    }
    fetchPhotos()
  }, [])
// ... (restul codului, inclusiv fetch-ul Supabase)

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-4 pb-20">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-4 tracking-tight">Selected Works</h1>
        <p className="font-sans text-gray-400 max-w-xl mx-auto">
          Database Connected. Real-time portfolio.
        </p>
      </div>

      {/* ... (Loading State) ... */}

      {/* MASONRY GALLERY */}
      {!loading && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
          {photos.map((project, index) => (
            <Link href={`/photography/${project.id}`} key={project.id}> 
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
              >
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                />
                
                {/* Overlay cu ajustările pentru Mobile/Link */}
                <div className="absolute inset-0 bg-black/60 opacity-100 sm:opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-xl text-white translate-y-0 sm:translate-y-4 group-hover:translate-y-0 transition duration-500 delay-75">{project.title}</h3>
                  <span className="font-sans text-xs tracking-widest text-gray-300 uppercase mt-2 translate-y-0 sm:translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}

    </main>
  )
}