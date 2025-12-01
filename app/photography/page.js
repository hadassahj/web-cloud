'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react' // Iconita de inchidere

export default function Photography() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Aici vom pune datele din Supabase mai tarziu. Acum folosim placeholderi.
  // Inlocuieste 'src' cu caile catre pozele tale reale din folderul public
  const photos = [
    { id: 1, src: '/photos/t&s wedd (660).jpg', category: 'Wedding' },
    { id: 2, src: '/photos/t&s wedd (698) post.jpg', category: 'Fashion' },
    { id: 3, src: '/photos/t&s wedd (709).jpg', category: 'Nature' },
    { id: 4, src: '/photos/t&s wedd (728).jpg', category: 'Event' },
    // Mai adauga cateva aici ca sa vezi efectul de masonry (macar 6-7 poze)
    { id: 5, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', category: 'Wedding' },
    { id: 6, src: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1974&auto=format&fit=crop', category: 'Nature' },
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-4 pb-10">
      
      {/* Header Pagina */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Selected Works</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          A collection of moments frozen in time. Click on any image to view details.
        </p>
      </div>

      {/* MASONRY GALLERY */}
      {/* Folosim CSS Columns pentru efectul Pinterest */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(photo)}
          >
            <img 
              src={photo.src} 
              alt={photo.category} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
            />
            {/* Overlay la hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
              <span className="text-white font-medium text-sm tracking-wide bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                {photo.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX (Modal Fullscreen cand dai click) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)} // Inchide cand dai click pe fundal
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 bg-white/10 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage.src} 
              alt="Full screen view" 
              className="max-h-[90vh] max-w-[95vw] rounded-md shadow-2xl pointer-events-none" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}