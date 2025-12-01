import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // <-- NOU: Import Footer
import { Inter, Playfair_Display } from 'next/font/google'

// Configurare fonturi... (Linii neschimbate)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Finitiv | Visual Storytelling',
  description: 'Professional Photography & Videography Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        {children}
        <Footer /> {/* <-- NOU: Aici apare pe toate paginile */}
      </body>
    </html>
  )
}