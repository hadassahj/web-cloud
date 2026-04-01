'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

// Componentă reutilizabilă pentru a afișa o imagine fără "sărituri" (Zero CLS)
const GalleryImage = ({ img, altText }) => (
  <div 
    className="relative w-full bg-neutral-900 rounded-sm overflow-hidden"
    // Aici este secretul: rezervăm spațiul exact înainte ca poza să se încarce!
    style={{ aspectRatio: img.aspectRatio || '2/3' }} 
  >
    <img 
      src={img.url} 
      alt={altText} 
      loading="lazy"
      // Poza este invizibilă (opacity-0) până se descarcă toți pixelii
      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out cursor-pointer "
      onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
    />
  </div>
);

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

          if (projectData.cloudinary_tag && cloudName) {
            const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${projectData.cloudinary_tag}.json`)
            
            if (res.ok) {
              const data = await res.json()
              const sortedResources = data.resources.sort((a, b) => a.version - b.version)

              const images = sortedResources.map(img => ({
                url: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v${img.version}/${img.public_id}.${img.format}`,
                relHeight: img.height / img.width,
                // Salvăm proporția exactă pentru a rezolva "săritul" pozelor
                aspectRatio: `${img.width} / ${img.height}` 
              }))
              setGalleryImages(images)
            }
          } 
          else if (projectData.images) {
            const images = projectData.images.map(url => ({
              url: url,
              relHeight: 1.5, // Presupunem un format portret standard (2:3) ca fallback
              aspectRatio: '2/3'
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

  galleryImages.forEach((img) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(img); // Acum punem tot obiectul, nu doar URL-ul
      leftHeight += img.relHeight;
    } else {
      rightColumn.push(img);
      rightHeight += img.relHeight;
    }
  });

  // 1. ECRANUL DE ÎNCĂRCARE (Skeleton Loader)
  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-24 px-4 pb-20 flex flex-col items-center">
        {/* Buton back fake */}
        <div className="w-full max-w-7xl mb-8">
          <div className="w-40 h-5 bg-neutral-900 animate-pulse rounded-md"></div>
        </div>
        {/* Titlu fake */}
        <div className="w-3/4 max-w-2xl h-16 md:h-20 bg-neutral-900 animate-pulse rounded-md mb-6"></div>
        <div className="w-1/4 max-w-xs h-6 bg-neutral-900 animate-pulse rounded-md mb-16"></div>
        {/* Galerie fake (Cutii care pulsează) */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 h-[60vh] bg-neutral-900 animate-pulse rounded-sm"></div>
          <div className="hidden md:block w-1/2 h-[80vh] bg-neutral-900 animate-pulse rounded-sm mt-10"></div>
        </div>
      </main>
    )
  }

  // 2. GALERIA REALĂ
  return (
    
    <main className="min-h-screen bg-black text-white pt-24 pb-20">

      {/* --- HEADER SECTION (Copertă Bleed + Titlu) --- */}
      <div className="w-full relative mb-16 md:mb-24">

        {/* BUTONUL NOU: Minimalist, în engleză, plutitor peste imagine cu efect de sticlă (blur) */}
        <div className="absolute top-24 md:top-8 left-4 md:left-8 z-20">
          <Link href="/photography" className="inline-flex items-center text-white/70 hover:text-white transition group bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-white/10">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </Link>
        </div>

        {/* POZA DE COPERTĂ (care acum începe din marginea de sus a telefonului/monitorului) */}
        {project?.url && (
          <div className="relative w-full h-[70vh] md:h-[90vh] bg-black overflow-hidden flex items-center justify-center">
            
             {/* Fundal blurat din culorile pozei */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110"
              style={{ backgroundImage: `url(${project.url})` }}
            />
            
            {/* Imaginea principală (cu fade-in smooth) */}
            <img 
              src={project.url} 
              alt={project?.title || "Copertă"}
              className="relative z-10 w-auto h-full max-w-full object-contain object-top shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-[1.02] opacity-0"
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            />

{/* OVERLAY SUS: Ultra-Smooth Scrim Gradient pentru a elimina banding-ul pe alb */}
<div 
  className="absolute top-0 left-0 w-full h-32 md:h-40 z-10 pointer-events-none"
  style={{
    backgroundImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.85) 5%,
      rgba(0, 0, 0, 0.65) 10%,
      rgba(0, 0, 0, 0.45) 15%,
      rgba(0, 0, 0, 0.30) 20%,
      rgba(0, 0, 0, 0.20) 25%,
      rgba(0, 0, 0, 0.13) 30%,
      rgba(0, 0, 0, 0.08) 35%,
      rgba(0, 0, 0, 0.05) 40%,
      rgba(0, 0, 0, 0.03) 45%,
      rgba(0, 0, 0, 0.018) 50%,
      rgba(0, 0, 0, 0.011) 55%,
      rgba(0, 0, 0, 0.006) 60%,
      rgba(0, 0, 0, 0.003) 65%,
      rgba(0, 0, 0, 0.001) 70%,
      rgba(0, 0, 0, 0.0005) 75%,
      rgba(0, 0, 0, 0.0002) 80%,
      rgba(0, 0, 0, 0.0001) 85%,
      transparent 100%
    )`
  }}
/>




            {/* Gradient de jos în sus pentru ca titlul să fie mereu lizibil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-20" />
          </div>
          
        )}

        {/* TITLUL (Urcă elegant peste imaginea de copertă) */}
        <div className={`absolute bottom-12 md:bottom-15 left-0 w-full z-30 text-center px-4`}>
           <h1 className="font-serif text-5xl md:text-8xl mb-4 tracking-[0.05em] drop-shadow-lg text-white">
            {project?.title}
          </h1>
          <p className="font-sans text-gray-400 text-sm md:text-base uppercase tracking-[0.3em] font-medium drop-shadow-md">
            {project?.category}
          </p>
        </div>
      </div>

      {/* --- GALERIA DE POZE --- */}
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-0 px-4">
        
        {/* Varianta MOBILE (1 coloană) */}
        <div className="flex flex-col gap-4 md:hidden">
          {galleryImages.map((img, index) => (
            <GalleryImage key={`mobile-${index}`} img={img} altText={`Foto ${index}`} />
          ))}
        </div>

        {/* Varianta DESKTOP (2 coloane) */}
        <div className="hidden md:flex flex-row gap-4 items-start">
          <div className="flex flex-col gap-4 w-1/2">
            {leftColumn.map((img, index) => (
              <GalleryImage key={`left-${index}`} img={img} altText={`Foto Stânga ${index}`} />
            ))}
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            {rightColumn.map((img, index) => (
              <GalleryImage key={`right-${index}`} img={img} altText={`Foto Dreapta ${index}`} />
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}