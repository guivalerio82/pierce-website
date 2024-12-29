import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { metadata as siteMetadata } from './metadata'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ConsentManager from '@/components/ConsentManager'

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
  console.log('Current Environment:', process.env.NODE_ENV)
  console.log('GA Measurement ID:', GA_MEASUREMENT_ID)
  console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL)

  const renderAnalytics = () => {
    if (process.env.NODE_ENV === 'production') {
      if (GA_MEASUREMENT_ID) {
        return (
          <>
            <ConsentManager />
            <GoogleAnalytics />
            <div className="hidden">
              Environment: {process.env.NODE_ENV}
              GA ID: {GA_MEASUREMENT_ID}
            </div>
          </>
        )
      }
      console.warn('Google Analytics Measurement ID is not configured')
      return <ConsentManager />
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Google Analytics is disabled in development')
    }
    return null
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {renderAnalytics()}
        {children}
      </body>
    </html>
  )
}