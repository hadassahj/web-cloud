'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// 1. Importurile Firebase
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function ProjectGallery({ params }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [project, setProject] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Pas 1: Luam detaliile proiectului din colecția "media"
        const docRef = doc(db, 'media', projectId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() })
        }

        // Pas 2: Luam pozele din galerie din colecția "gallery_images"
        const q = query(collection(db, 'gallery_images'), where('project_id', '==', projectId))
        const querySnapshot = await getDocs(q)
        
        const imagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setGalleryImages(imagesData)
      } catch (error) {
        console.error("Eroare la extragerea datelor:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (projectId) fetchData()
  }, [projectId])

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      
      <Link href="/photography" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Portfolio
      </Link>

      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">{project?.title}</h1>
        <p className="font-sans text-gray-400 text-lg uppercase tracking-widest mb-2">{project?.category}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        
        {/* COPERTA */}
        {project?.url && (
          <div className="relative w-full h-[500px]">
            <img 
              src={project.url} 
              alt="Cover"
              className="rounded-sm object-cover w-full h-full"
            />
          </div>
        )}

        {/* GALERIA */}
        {galleryImages.map((img) => (
          <div key={img.id} className="relative w-full h-[500px]">
             <img 
              src={img.url} 
              alt="Gallery item" 
              className="rounded-sm object-cover w-full h-full hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>
    </main>
  )
}