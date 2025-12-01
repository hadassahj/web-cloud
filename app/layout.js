import './globals.css'
import Navbar from './components/Navbar' // <--- Aici e cheia. Importam din folderul components
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Finitiv',
  description: 'Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar /> {/* <--- Aici il afisam efectiv */}
        {children}
      </body>
    </html>
  )
}