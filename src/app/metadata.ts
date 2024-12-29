import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pierceai.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Pierce AI - Your AI-Powered Goal Achievement Companion',
  description: 'Transform your dreams into reality with Pierce AI. Get personalized guidance, break down goals into actionable steps, and stay motivated with AI-powered support.',
  
  // OpenGraph metadata
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'Pierce AI - Your AI-Powered Goal Achievement Companion',
    description: 'Transform your dreams into reality with Pierce AI. Get personalized guidance, break down goals into actionable steps, and stay motivated with AI-powered support.',
    siteName: 'Pierce AI',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`, // Make sure to create this image
        width: 1200,
        height: 630,
        alt: 'Pierce AI - Goal Achievement Platform',
      }
    ],
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Pierce AI - Your AI-Powered Goal Achievement Companion',
    description: 'Transform your dreams into reality with Pierce AI. Get personalized guidance, break down goals into actionable steps, and stay motivated with AI-powered support.',
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@PierceAI', // Replace with your Twitter handle
    site: '@PierceAI', // Replace with your Twitter handle
  },

  // Additional metadata
  keywords: [
    'AI goal setting',
    'personal development',
    'goal achievement',
    'AI assistant',
    'productivity',
    'personal growth',
    'motivation',
    'goal tracking'
  ],
  authors: [{ name: 'Pierce AI Team' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'G-LPYMQG5BRE',
  },
} 