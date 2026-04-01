'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function ProjectGallery({ params }) {
  // Despachetăm parametrii (standard Next.js nou)
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [project, setProject] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Ne luăm Cloud Name-ul din variabilele de mediu
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Aducem datele proiectului din Firebase
        const docRef = doc(db, 'media', projectId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const projectData = { id: docSnap.id, ...docSnap.data() }
          setProject(projectData)

          // 2. Magia cu Tag-ul: dacă avem tag, cerem pozele de la Cloudinary
          if (projectData.cloudinary_tag && cloudName) {
            const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${projectData.cloudinary_tag}.json`)
            
            if (res.ok) {
              const data = await res.json()
              // Construim link-urile optimizate automat pentru fiecare poză găsită
              const images = data.resources.map(img => 
                `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v${img.version}/${img.public_id}.${img.format}`
              )
              setGalleryImages(images)
            } else {
              console.warn("Cloudinary nu a returnat lista de poze. Verifică setarea 'Resource List' din Security.")
            }
          }
        }
      } catch (error) {
        console.error("Eroare la extragerea datelor:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (projectId) fetchData()
  }, [projectId, cloudName])

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Se încarcă...</div>

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      <Link href="/photography" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
        <ArrowLeft className="mr-2 w-4 h-4" /> Înapoi la Portofoliu
      </Link>

      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">{project?.title}</h1>
        <p className="font-sans text-gray-400 text-lg uppercase tracking-widest mb-2">{project?.category}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        {/* Poza de copertă (URL-ul pus manual în Firebase) */}
        {project?.url && (
          <div className="relative w-full h-[500px]">
            <img 
              src={project.url} 
              alt="Copertă"
              className="rounded-sm object-cover w-full h-full"
            />
          </div>
        )}

        {/* Galeria (Pozele aduse automat din Cloudinary pe baza tag-ului) */}
        {galleryImages.map((imageUrl, index) => (
          <div key={index} className="relative w-full h-[500px]">
             <img 
              src={imageUrl} 
              alt={`Galerie ${index}`} 
              className="rounded-sm object-cover w-full h-full hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>
    </main>
  )
}