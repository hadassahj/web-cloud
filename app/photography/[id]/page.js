'use client'
import { useState, useEffect, use } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'
import Image from 'next/image' // <--- Aici e noutatea
import { ArrowLeft } from 'lucide-react'

export default function ProjectGallery({ params }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [project, setProject] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // 1. Luam detaliile albumului
      const { data: projectData } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()
      setProject(projectData)

      // 2. Luam pozele din galerie
      const { data: imagesData } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('project_id', projectId)
      setGalleryImages(imagesData || [])
      setLoading(false)
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
        
        {/* COPERTA (Optimizata) */}
        {project?.image_url && (
          <div className="relative w-full h-[500px]">
            <Image 
              src={project.image_url} 
              alt="Cover"
              fill 
              className="rounded-sm object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority 
            />
          </div>
        )}

        {/* GALERIA (Optimizata) */}
        {galleryImages.map((img) => (
          <div key={img.id} className="relative w-full h-[500px]">
             <Image 
              src={img.image_url} 
              alt="Gallery item" 
              fill
              className="rounded-sm object-cover hover:opacity-90 transition"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </main>
  )
}