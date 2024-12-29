import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://meetpierce.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Pierce AI - Your AI-Powered Coach for Lasting Success',
  description: 'Get clear, personalised plans and support to help you stay on track. Powered by advanced AI and backed by Neuroscientists from King\'s College London.',
  
  // OpenGraph metadata
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'Pierce AI - Your AI-Powered Coach for Lasting Success',
    description: 'Transform big goals into manageable tasks with Pierce AI. Get personalized guidance, daily action plans, and 24/7 accountability support to achieve your goals.',
    siteName: 'Pierce AI',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pierce AI - Your Personal Goal Achievement Assistant',
      }
    ],
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Pierce AI - Your AI-Powered Coach for Lasting Success',
    description: 'Transform big goals into manageable tasks with Pierce AI. Get personalized guidance, daily action plans, and 24/7 accountability support.',
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@PierceAI',
    site: '@PierceAI',
  },

  // Additional metadata
  keywords: [
    'AI goal coach',
    'personal development',
    'goal achievement',
    'AI accountability',
    'productivity',
    'motivation',
    'goal planning',
    'daily action plans',
    'goal tracking',
    'personal AI assistant'
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