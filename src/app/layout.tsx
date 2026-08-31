import type { Metadata } from 'next';
import { Alegreya, Belleza } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const fontBody = Alegreya({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headline',
});

// Comprehensive SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://global-wellness-guide.web.app'),
  title: {
    default: 'Global Wellness Guide | AI Personal Health & Holistic Recovery Plans',
    template: '%s | Global Wellness Guide',
  },
  description:
    'Generate personalized, AI-powered educational recovery plans using natural therapies. Your ultimate guide to holistic wellness, symptom analysis, and natural healing.',
  keywords: [
    'health guide',
    'wellness plan',
    'holistic recovery',
    'natural therapies',
    'symptom checker',
    'AI health analysis',
    'personalized health plan',
    'diet and recovery',
    'wellness advice',
  ],
  authors: [{ name: 'Global Wellness Team' }],
  creator: 'Global Wellness Guide',
  publisher: 'Global Wellness Guide',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Global Wellness Guide | AI Personal Health & Holistic Recovery',
    description:
      'Generate personalized, educational recovery plans using natural therapies. Your guide to holistic wellness.',
    type: 'website',
    url: 'https://global-wellness-guide.web.app',
    siteName: 'Global Wellness Guide',
    locale: 'en_US',
    images: [
      {
        url: 'https://global-wellness-guide.web.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Global Wellness Guide - Holistic Health Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Wellness Guide | AI Personal Health Plans',
    description:
      'Generate personalized, educational recovery plans using natural therapies.',
    images: ['https://global-wellness-guide.web.app/twitter-image.jpg'],
  },
};

// JSON-LD Structured Data for Google Search Engine Optimization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Global Wellness Guide',
  url: 'https://global-wellness-guide.web.app',
  description:
    'AI-powered personalized health and holistic recovery plan generator using natural therapies.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '150',
    priceCurrency: 'INR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
