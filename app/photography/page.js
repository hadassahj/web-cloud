'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function Photography() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const q = query(
          collection(db, 'media'),
          where('type', '==', 'photo'),
          orderBy('order', 'asc')
        )
        const querySnapshot = await getDocs(q)
        
        // Luăm datele și încercăm să deducem formatul dacă avem dimensiunile în URL sau Metadata
        const data = querySnapshot.docs.map(doc => {
          const project = doc.data();
          return {
            id: doc.id,
            ...project,
            // Dacă lățimea e mai mare decât înălțimea, e landscape
            // Notă: Dacă nu ai width/height în Firebase, poți adăuga un câmp manual 'layout': 'full' sau 'half'
            isLandscape: project.width > project.height 
          }
        })
        setPhotos(data)
      } catch (error) {
        console.error('Eroare:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-4 pb-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-4 tracking-tight font-light">Selected Works</h1>
      </div>

      {!loading && (
        <div className="flex flex-wrap gap-6 max-w-7xl mx-auto justify-center">
          {photos.map((project, index) => (
          <Link 
            href={`/photography/${project.id}`} 
            key={project.id}
            className={`relative group overflow-hidden rounded-sm transition-all duration-500
              ${project.isLandscape ? 'w-full' : 'flex-none'} 
            `}
            style={{
              // Forțăm o înălțime fixă (ex: 60% din ecran)
              // Lățimea se va ajusta singură pentru a păstra proporția originală
              height: '65vh', 
              maxWidth: '100%'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full w-auto"
            >
              <img 
                src={project.url} 
                alt={project.title} 
                // h-full și w-auto fac ca poza să fie întreagă, fără crop
                className="h-full w-auto object-contain transform group-hover:scale-105 transition duration-700"
              />
              
              {/* Overlay Text - acum se va mula exact pe lățimea pozei */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="font-serif text-3xl text-white">{project.title}</h3>
                <p className="text-gray-300 uppercase tracking-widest text-xs mt-2">{project.category}</p>
              </div>
            </motion.div>
          </Link>
          ))}
        </div>
      )}
    </main>
  )
}