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
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
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
        <h1 className="font-serif text-5xl md:text-6xl mb-4 tracking-tight">Selected Works</h1>
      </div>

      {!loading && (
        /* FOLOSIM FLEX-WRAP CU ÎNĂLȚIME FIXĂ PE RÂND 
           Asta face ca pozele să nu mai fie "zimțate".
        */
        <div className="flex flex-wrap gap-4 justify-center max-w-[1600px] mx-auto">
          {photos.map((project, index) => (
            <Link 
              href={`/photography/${project.id}`} 
              key={project.id} 
              className="relative group cursor-pointer overflow-hidden rounded-sm"
              style={{ 
                // Aici e secretul: Setăm o înălțime fixă pe rând (ex: 300px sau 400px)
                // flex-grow le permite să se lărească proporțional ca să umple rândul
                height: '400px', 
                flexGrow: '1',
                flexBasis: 'auto'
              }}
            >
              <img 
                src={project.url} 
                alt={project.title} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              
              {/* Overlay-ul tău */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <h3 className="font-serif text-xl text-white">{project.title}</h3>
                <span className="font-sans text-xs tracking-widest text-gray-300 uppercase mt-2">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
          {/* Un mic truc: adăugăm un element gol la final ca ultimul rând să nu se lărească exagerat */}
          <div className="flex-[100] grow-[100]"></div>
        </div>
      )}
    </main>
  )
}