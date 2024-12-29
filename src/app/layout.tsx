import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { metadata as siteMetadata } from './metadata'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {process.env.NODE_ENV === 'production' ? (
          GA_MEASUREMENT_ID ? (
            <GoogleAnalytics />
          ) : (
            console.warn('Google Analytics Measurement ID is not configured')
          )
        ) : (
          process.env.NODE_ENV === 'development' &&
          console.log('Google Analytics is disabled in development')
        )}
        {children}
      </body>
    </html>
  )
}