import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Playfair_Display } from 'next/font/google'
import ScrollToTop from './components/ScrollToTop'
import Script from 'next/script' // <-- NOU: Importăm componenta Script de la Next.js

// Configurare fonturi
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

// --- MAGIA SEO & OPEN GRAPH ---
export const metadata = {
  title: 'Finitiv | Cinematic Visual Storytelling',
  description: 'Finitiv is a creative studio capturing moments that matter. From weddings to commercial projects, we frame your emotions.',
  metadataBase: new URL('https://finitiv.ro'), // Domeniul tău real
  
  openGraph: {
    title: 'Finitiv | Cinematic Visual Storytelling',
    description: 'We don’t just take photos; we create art that reflects your unique personality.',
    url: 'https://finitiv.ro',
    siteName: 'Finitiv Studio',
    images: [
      {
        url: '/og-image.jpg', // <-- Poza din folderul "public"
        width: 1200,
        height: 630,
        alt: 'Finitiv Portfolio Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Finitiv | Cinematic Visual Storytelling',
    description: 'Capturing moments that matter.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased">
        
        <Navbar />
        
        {children}
        
        <Footer /> 
        <ScrollToTop /> 
        <Analytics /> {/* Analytics oficial de la Vercel */}

        {/* --- SCRIPTUL PENTRU MICROSOFT CLARITY --- */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vw3b61rztq"); 
          `}
        </Script>

      </body>
    </html>
  )
}