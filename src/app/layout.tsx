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

export const metadata = {
  title: 'Pierce - Your AI goal achievement coach',
  description: 'Pierce helps you achieve your goals with AI-powered coaching and personalised support.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://meetpierce.com'),
  
  // OpenGraph metadata
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://meetpierce.com',
    title: 'Pierce AI - Your AI-Powered coach for lasting success',
    description: 'Transform big goals into manageable tasks with Pierce AI. Get personalized guidance, daily action plans, and 24/7 accountability support to achieve your goals.',
    siteName: 'Pierce AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pierce AI - Your Personal Goal Achievement Assistant',
      }
    ],
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Pierce AI - Your AI-Powered coach for lasting success',
    description: 'Transform big goals into manageable tasks with Pierce AI. Get personalized guidance, daily action plans, and 24/7 accountability support.',
    images: ['/og-image.jpg'],
    creator: '@PierceAI',
    site: '@PierceAI',
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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