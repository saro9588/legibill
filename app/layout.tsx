import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './nav';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LegiBill',
  description: 'Navigate your local legislation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav/>
        <div className='p-4 bg-gray-200 min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}
