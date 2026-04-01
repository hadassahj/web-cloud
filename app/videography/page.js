'use client'
import { useState, useEffect } from 'react' 
import { motion } from 'framer-motion'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase' 

// FUNCȚIA MAGICĂ: Transformă orice link în formatul corect
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null; // <-- Am schimbat '' cu null
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
  }
  
  return url;
}

export default function Videography() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const q = query(
          collection(db, 'media'), 
          where('type', '==', 'video'),
          orderBy('order', 'asc')
        )
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
        <p className="font-sans text-gray-400 tracking-[0.3em] uppercase text-xs">Cinematic storytelling</p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-sans text-sm">Loading visual stories...</p>
        </div>
      )}

      <div className="flex flex-col gap-32 max-w-5xl mx-auto">
        {!loading && videos.map((video, index) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full group"
          >
            {/* Header Video - Categoria mutată în dreapta */}
              <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4 px-2">
                <div>
                  <h2 className="font-serif text-3xl md:text-5xl mb-1 tracking-tight">
                    {video.title || 'Untitled Project'}
                  </h2>
                  {/* Am scos categoria de aici ca să nu se repete */}
                </div>
                
                {/* Categoria în dreapta, cu aspect de watermark/label */}
                <div className="text-right">
                  <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-500 font-medium">
                    {video.category || 'Cinematic'}
                  </span>
                </div>
              </div>

           {/* Player Video */}
            <div className="relative w-full aspect-video bg-neutral-900 rounded-sm overflow-hidden group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-shadow duration-700">
              {/* Afișăm iframe-ul DOAR dacă avem un URL valid procesat */}
              {getYouTubeEmbedUrl(video.url) ? (
                <iframe 
                  src={getYouTubeEmbedUrl(video.url)} 
                  title={video.title} 
                  className="absolute top-0 left-0 w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                // Dacă în Firebase ai uitat să pui link-ul, arătăm un ecran negru elegant
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                  <svg className="w-12 h-12 mb-2 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span className="font-sans text-xs uppercase tracking-widest">Video Unavailable</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {!loading && videos.length === 0 && (
            <div className="text-center text-gray-600 py-20 font-serif italic text-xl">
              The screen is empty. New stories coming soon.
            </div>
        )}
      </div>
    </main>
  )
}