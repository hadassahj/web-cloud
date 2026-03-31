'use client'
import { useState, useEffect } from 'react' 
import { motion } from 'framer-motion'

// 1. Noile importuri pentru Firebase
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase' 

export default function Videography() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        // 2. Cerem DOAR documentele de tip 'video' din colecția 'media'
        const q = query(collection(db, 'media'), where('type', '==', 'video'))
        const querySnapshot = await getDocs(q)
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setVideos(data)
      } catch (error) {
        console.error('Eroare la incarcarea video:', error)
      } finally {
        setLoading(false)
      }
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
                src={video.url} // <--- 3. Aici am modificat din image_url în url
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