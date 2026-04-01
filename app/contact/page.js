'use client'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
// Noile importuri pentru Firebase:
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'success', 'error', 'sending'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Setăm statusul pe 'sending' ca să schimbăm textul de pe buton
    setStatus('sending')
    
    try {
      // 1. BACKUP: Salvarea în baza de date Firebase
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date()
      })

      // 2. EMAIL: Trimiterea mesajului direct în Inbox-ul tău
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Tragem cheia automat din fișierul .env.local
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, 
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Mesaj nou de la ${formData.name} (Finitiv Portfolio)`,
          from_name: "Finitiv Website"
        }),
      });

      const result = await response.json();

      // Dacă email-ul a plecat cu succes
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' }) // Curățăm câmpurile
        
        // Ascundem mesajul verde după 5 secunde pentru un look curat
        setTimeout(() => setStatus(null), 5000)
      } else {
        console.error("Web3Forms Error:", result.message);
        setStatus('error')
      }
      
    } catch (error) {
      console.error('Eroare la trimiterea mesajului:', error)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Partea Stanga - Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Let's create <br /> together.</h1>
          <p className="font-sans text-gray-400 text-lg mb-12 max-w-md">
            Have a project in mind? We'd love to hear about it. Drop us a line and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-6 font-sans">
            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="w-5 h-5" />
              {/* <span>contact@finitiv.ro</span> */}
              <span>finitiv.ro@gmail.com</span>
              
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <Phone className="w-5 h-5" />
              <span>+40 755 351 338</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <MapPin className="w-5 h-5" />
              <span>Based in Romania / Available Worldwide</span>
            </div>
          </div>
        </motion.div>

        {/* Partea Dreapta - Formular Minimalist */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-neutral-900/30 p-8 md:p-12 rounded-2xl border border-white/5 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8"> {/* NOU: onSubmit */}
            
            {/* INPUT NAME */}
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Name</label>
              <input 
                type="text" 
                name="name" // NOU
                value={formData.name} // NOU
                onChange={handleChange} // NOU
                className="w-full bg-transparent border-b border-gray-700 text-white p-2 focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            {/* INPUT EMAIL */}
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Email</label>
              <input 
                type="email" 
                name="email" // NOU
                value={formData.email} // NOU
                onChange={handleChange} // NOU
                className="w-full bg-transparent border-b border-gray-700 text-white p-2 focus:outline-none focus:border-white transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* TEXTAREA MESSAGE */}
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Message</label>
              <textarea 
                rows="4"
                name="message" // NOU
                value={formData.message} // NOU
                onChange={handleChange} // NOU
                className="w-full bg-transparent border-b border-gray-700 text-white p-2 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            {/* MESAJ STATUS */}
            {status === 'success' && <p className="text-sm text-green-400">Message sent successfully! We will contact you soon.</p>}
            {status === 'error' && <p className="text-sm text-red-400">Error sending message. Please try again later.</p>}


            {/* BUTON SUBMIT */}
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="mt-4 bg-white text-black py-4 px-8 rounded-full font-bold tracking-wide hover:bg-gray-200 transition-colors self-start disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'SEND MESSAGE'}
            </button>
          </form>
        </motion.div>

      </div>
    </main>
  )
}