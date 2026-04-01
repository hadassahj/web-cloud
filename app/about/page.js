'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function About() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Încărcăm echipa din Firebase
  useEffect(() => {
    async function fetchTeam() {
      try {
        const q = query(collection(db, 'team'), orderBy('order', 'asc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTeamMembers(data)
      } catch (error) {
        console.error('Eroare la încărcarea echipei:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  const imageHoverClass = "w-full h-full object-cover hover:grayscale transition duration-700 opacity-0"; 

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      
      {/* Intro Section - Split Screen */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            We capture <br /> the soul of <br /> the moment.
          </h1>
          <div className="h-1 w-20 bg-white mb-8"></div>
          <p className="font-sans text-gray-400 text-lg leading-relaxed mb-6">
            Finitiv started with a simple idea: that photography shouldn't just document an event, it should interpret it. 
            We are visual narrators obsessed with light, composition, and raw emotion.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] w-full"
        >
          {/* Imaginea principală de About - o lăsăm hardcodată pentru viteză maximă (LCP) */}
          <img 
            src="/photos/about.jpg" 
            alt="The Team" 
            loading="eager"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700 rounded-sm"
          />
          <div className="absolute top-4 -right-4 w-full h-full border border-white/20 -z-10 hidden md:block"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/10 py-16 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { label: "Years Experience", value: "05+" },
            { label: "Projects Completed", value: "30+" },
            { label: "Happy Clients", value: "100%" }
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="font-serif text-5xl mb-2">{stat.value}</h3>
              <p className="font-sans text-gray-500 uppercase tracking-widest text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secțiunea Echipa (Team) - Dinamică din Firebase */}
      <section className="py-20 max-w-7xl mx-auto">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-serif text-4xl mb-16"
        >
            Meet the Visual Storytellers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {!loading && teamMembers.map((member, index) => (
            <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
            >
                <div className="relative w-full max-w-sm h-96 overflow-hidden rounded-md mb-6 bg-neutral-900">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        loading="lazy"
                        className={imageHoverClass}
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                    />
                </div>

                <h3 className="font-serif text-3xl mb-1 text-white">{member.name}</h3>
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">{member.role}</p>
                <p className="font-sans text-gray-400 max-w-xs">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}