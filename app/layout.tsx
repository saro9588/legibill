import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './nav';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LegiBill',
  description: 'Navigate your local legislation',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav session={!!session}/>
        <div className='p-4 bg-gray-200 min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}
