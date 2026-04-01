'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function ProjectGallery({ params }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [project, setProject] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'media', projectId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const projectData = { id: docSnap.id, ...docSnap.data() }
          setProject(projectData)

          // Extragem pozele din Cloudinary (Varianta Tag)
          if (projectData.cloudinary_tag && cloudName) {
            const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${projectData.cloudinary_tag}.json`)
            
            if (res.ok) {
              const data = await res.json()
              
              // Sortăm cronologic
              const sortedResources = data.resources.sort((a, b) => a.version - b.version)

              // AICI E SECRETUL: Salvăm URL-ul, dar calculăm și "greutatea" vizuală a pozei (înălțime / lățime)
              const images = sortedResources.map(img => ({
                url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v${img.version}/${img.public_id}.${img.format}`,
                relHeight: img.height / img.width // Ex: o poză verticală va avea o valoare mai mare decât una orizontală
              }))
              setGalleryImages(images)
            } else {

              console.warn("Cloudinary nu a returnat lista de poze. Verifică setarea 'Resource List' din Security.")

            }
          } 
          // Fallback dacă folosești varianta manuală cu Array în Firebase
          else if (projectData.images) {
            const images = projectData.images.map(url => ({
              url: url,
              relHeight: 1 // La array manual nu știm dimensiunile, deci le dăm o valoare fixă
            }))
            setGalleryImages(images)
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

  // --- ALGORITMUL DE ECHILIBRARE A COLOANELOR ---
  const leftColumn = [];
  const rightColumn = [];
  let leftHeight = 0;
  let rightHeight = 0;

  // Împărțim pozele inteligent
  galleryImages.forEach((img) => {
    // Dacă stânga e mai scurtă (sau egală), punem poza în stânga
    if (leftHeight <= rightHeight) {
      leftColumn.push(img.url);
      leftHeight += img.relHeight;
    } else {
      // Altfel, o punem în dreapta
      rightColumn.push(img.url);
      rightHeight += img.relHeight;
    }
  });

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

      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Poza de copertă */}
        {project?.url && (
          <div className="relative w-full mb-8">
            <img 
              src={project.url} 
              alt="Copertă"
              className="rounded-sm w-full h-auto"
            />
          </div>
        )}

        {/* --- Varianta MOBILE (1 coloană) --- */}
        <div className="flex flex-col gap-4 md:hidden">
          {galleryImages.map((img, index) => (
            <img 
              key={`mobile-${index}`}
              src={img.url} 
              alt={`Galerie ${index}`} 
              className="rounded-sm w-full h-auto"
            />
          ))}
        </div>

        {/* --- Varianta DESKTOP (2 coloane echilibrate) --- */}
        <div className="hidden md:flex flex-row gap-4 items-start">
          
          <div className="flex flex-col gap-4 w-1/2">
            {leftColumn.map((url, index) => (
              <img 
                key={`left-${index}`}
                src={url} 
                alt={`Stânga ${index}`} 
                className="rounded-sm w-full h-auto hover:opacity-90 transition cursor-pointer"
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            {rightColumn.map((url, index) => (
              <img 
                key={`right-${index}`}
                src={url} 
                alt={`Dreapta ${index}`} 
                className="rounded-sm w-full h-auto hover:opacity-90 transition cursor-pointer"
              />
            ))}
          </div>

        </div>
      </div>
    </main>
  )
}