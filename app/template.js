'use client'
import { motion } from 'framer-motion'

export default function Template({ children }) {
  return (
    <motion.div
      // Cum pornește pagina (invizibilă și puțin mai jos)
      initial={{ opacity: 0, y: 20 }}
      
      // Cum ajunge pe ecran (vizibilă și la locul ei)
      animate={{ opacity: 1, y: 0 }}
      
      // Detaliile mișcării (fluidă, de 0.8 secunde)
      transition={{ ease: 'easeInOut', duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}