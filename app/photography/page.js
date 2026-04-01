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

      {/* 3. GRID GALLERY: Am schimbat 'columns' cu 'grid' pentru a le pune una lângă alta */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {photos.map((project, index) => (
            <Link href={`/photography/${project.id}`} key={project.id}> 
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                // Am adăugat aspect-[4/5] ca toate coperțile să aibă exact aceeași dimensiune elegantă
                className="relative group cursor-pointer overflow-hidden rounded-sm aspect-[4/5]"
              >
                <img 
                  src={project.url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                />
                
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