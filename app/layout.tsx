import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ApolloWrapper } from '@/components/ApolloWrapper'
import './globals.css'
import '../src/lib/island-ui/fonts/fonts.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Island Bid Starter',
  description: 'Island.is UI Components',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
