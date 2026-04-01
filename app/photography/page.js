'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// 1. Am adăugat 'orderBy' în import
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase' 

export default function Photography() {
  const [photos, setPhotos] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        // 2. MAGIA ORDONĂRII: Am adăugat orderBy('order', 'asc')
        const q = query(
          collection(db, 'media'), 
          where('type', '==', 'photo'),
          orderBy('order', 'asc')
        )
        const querySnapshot = await getDocs(q)
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setPhotos(data)
      } catch (error) {
        console.error('Eroare la încărcarea pozelor:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-4 pb-20">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-4 tracking-tight">Selected Works</h1>
        <p className="font-sans text-gray-400 max-w-xl mx-auto">
          Database Connected. Real-time portfolio.
        </p>
      </div>

      {/* --- GALERIE FLEXIBILĂ (RATIO REAL & CENTRARE) --- 
        Am schimbat 'grid' cu 'flex flex-wrap'.
        'justify-center' centrează elementele pe ultimul rând.
      */}
      {!loading && (
        <div className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto">
          {photos.map((project, index) => (
            <Link href={`/photography/${project.id}`} key={project.id} className="block"> 
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                // --- SCHIMBĂRI IMPORTANTE AICI ---
                // 1. Am șters 'aspect-[4/5]'. Acum ratio-ul e real.
                // 2. Am setat o lățime de bază flexibilă (ex: 350px).
                // 3. 'flex-grow' îi permite să se lărească puțin ca să umple spațiul gol, dacă e nevoie.
                className="relative group cursor-pointer overflow-hidden rounded-sm flex-grow min-w-[300px] max-w-[400px] h-auto"
              >
                <img 
                  src={project.url} 
                  alt={project.title} 
                  // 'h-auto' asigură păstrarea proporțiilor originale
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                />
                
                {/* Overlay-ul cu text rămâne la fel */}
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