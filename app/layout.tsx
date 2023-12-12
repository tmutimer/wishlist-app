import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header' 
import { getServerSession } from 'next-auth'

import SessionProvider from '@/components/sessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wishlist App',
  description: 'A place to create your christmas and birthday lists, and more',
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
        <SessionProvider session={session}>
          <main>
            <Header />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
